# TCC — Laboratório das Threads com Helidon SE (Java 21)

Documentação técnica  do projeto **tcc-helidon-app**: aplicação de streaming
(títulos, gêneros, avaliações) em **Helidon SE 4.5**, com PostgreSQL, HikariCP e laboratório
de concorrência medido via JMeter — comparável ao projeto Spring Boot irmão (porta 8080).

| Item | Valor |
|------|--------|
| Framework | Helidon SE 4.5.5 (Níma / Virtual Threads nativas) |
| Linguagem | Java 21 |
| Porta | **8081** (Spring Boot usa 8080) |
| Banco | PostgreSQL 16 — schema `tcc_streaming` (compartilhado) |
| Pool | HikariCP máximo 30 conexões |
| Driver JDBC | PostgreSQL 42.5.0 (fixo para evidenciar pinning) |
| Carga | Apache JMeter 5.x — `jmeter/plano-lab.jmx` |

---

## Sumário

1. [Arquitetura de componentes](#1-arquitetura-de-componentes)
2. [Estrutura de diretórios / árvore de arquivos](#2-estrutura-de-diretórios--árvore-de-arquivos)
3. [Fluxo do `executar-tudo.sh` (orquestração)](#3-fluxo-do-executar-tudosh-orquestração)
4. [Ciclo de vida de uma requisição (pinning e semáforo)](#4-ciclo-de-vida-de-uma-requisição-pinning-vs-semáforo)
5. [Modelo de dados (ER)](#5-modelo-de-dados-er)
6. [Matriz de cenários](#6-matriz-de-cenários)
7. [Estrutura de pacotes](#7-estrutura-de-pacotes)
8. [Quadro-resumo: Helidon SE × Spring Boot × Platform Threads](#8-quadro-resumo)
9. [Programação e algoritmos](#9-programação-e-algoritmos)
10. [Engenharia de requisitos](#10-engenharia-de-requisitos)
11. [Projeto e arquitetura de software](#11-projeto-e-arquitetura-de-software)
12. [Qualidade e testes de software](#12-qualidade-e-testes-de-software)
13. [Gerência de projetos](#13-gerência-de-projetos)
14. [Banco de dados](#14-banco-de-dados)
15. [Metodologias de desenvolvimento](#15-metodologias-de-desenvolvimento)
16. [Como executar](#16-como-executar)
17. [Evidências para o TCC](#17-evidências-para-o-tcc)

---

## 1. Arquitetura de componentes

A arquitetura isola **dois eixos**: (A) fluxo de negócio do catálogo e (B) laboratório
sintético de concorrência. Ambos compartilham o mesmo pool HikariCP e o mesmo PostgreSQL
usado pelo Spring Boot.

```
+-----------------------------------------------------------------------------------+
|                                CLIENTE / JMETER                                   |
|               (Simulação de carga — 200 usuários, ramp-up, duração)               |
+-----------------------------------------------------------------------------------+
                                          |
                                          | HTTP (REST) → porta 8081
                                          v
+-----------------------------------------------------------------------------------+
|                     HELIDON SE 4.5 (JAVA 21 / VIRTUAL THREADS NATIVAS)            |
|                              Main.java — WebServer + rotas                        |
|                                                                                   |
|  +---------------------------+                 +-------------------------------+  |
|  |  GET /titulos/{id}/       |                 |  GET /lab/*                   |  |
|  |       detalhes            |                 |  (cargas sintéticas + info)   |  |
|  +-------------+-------------+                 +---------------+---------------+  |
|                |                                               |                  |
|                v                                               v                  |
|  +---------------------------+                 +-------------------------------+  |
|  |      TituloService        |                 |          LabService           |  |
|  | (orquestra 4 consultas)   |                 | (porteiro / métricas / tetos) |  |
|  +-------------+-------------+                 +-------+---------------+-------+  |
|                |                                       |               |          |
|                |                                       v               v          |
|                |                             +-----------------+ +-------------+  |
|                |                             |  Semaphore(30)  | |LabWorkloads |  |
|                |                             | (throttling DB) | | (locks/sync)|  |
|                |                             +--------+--------+ +-------------+  |
|                v                                      |                           |
|  +----------------------------------------------------+                           |
|  |              TituloRepository (JDBC puro + HikariCP)                           |
|  +-------------------------------------+------------------------------------------+
                                         |
                                         | Pool HikariCP (máx. 30 conexões)
                                         v
+-----------------------------------------------------------------------------------+
|                                BANCO POSTGRESQL 16                                |
|        (10.000 títulos, 1.000.000 avaliações, gêneros, temporadas, episódios)     |
+-----------------------------------------------------------------------------------+
```

### Componentes principais

| Componente | Papel |
|------------|--------|
| **Main** | Sobe o `WebServer`, configura HikariCP, instancia serviços e registra rotas programáticas (sem anotações). |
| **TituloService** | Caso de uso de negócio: monta `TituloDetalhesResponse` com 4 consultas sequenciais. |
| **TituloRepository** | Acesso a dados via JDBC puro (`PreparedStatement` / `ResultSet`). |
| **LabService** | Fachada do laboratório: semáforo “porteiro”, `/lab/info`, cálculo de teto (Lei de Little). |
| **LabWorkloads** | Cargas sintéticas puras (I/O, CPU, `synchronized`, `ReentrantLock`) + contadores de concorrência. |
| **HikariCP** | Pool de conexões JDBC (tamanho 30, alinhado ao semáforo). |
| **JMeter + scripts** | Orquestram carga, gravam `.jtl`/JFR e geram `relatorio/index.html`. |

### Diferença em relação ao Spring Boot

| Aspecto | Spring Boot | Helidon SE (este projeto) |
|---------|-------------|----------------------------|
| Modelo web | Anotações (`@RestController`, `@GetMapping`) | Roteamento programático em `Main` |
| DI | Container IoC (`@Autowired`, `@Service`) | Instanciação manual no `main` |
| JDBC | `JdbcTemplate` | JDBC puro |
| Threads | `spring.threads.virtual.enabled=true` | Virtual Threads nativas do servidor Níma |
| Porta | 8080 | **8081** |

---

## 2. Estrutura de diretórios / árvore de arquivos

```
tcc-helidon-app/                              // Raiz do projeto Helidon SE
├── pom.xml                                   // Maven: Helidon SE 4.5.5, HikariCP, PG 42.5.0
├── README.md                                 // Guia rápido de uso
├── DOCUMENTACAO-TCC-HELIDON.md               // Este documento (completo para o TCC)
│
├── jmeter/
│   └── plano-lab.jmx                         // Plano JMeter parametrizado (-Jhost, -Jport, …)
│
├── relatorio/                                // Resultados (amostra inclusa; regenerado pelos scripts)
│   ├── index.html                            // Dashboard unificado (abra este no navegador)
│   ├── resumo.csv                            // Tabela consolidada (Excel / LibreOffice)
│   ├── teto.json                             // Tetos otimistas (Lei de Little)
│   ├── info-inicio.json                      // Snapshot /lab/info no início
│   ├── AMOSTRA.txt                           // Marca que a pasta pode ser amostra de referência
│   ├── io/  cpu/  io-cpu/                    // Um diretório por cenário
│   ├── pinning-sync/  pinning-lock/
│   ├── db/  db-semaforo/
│   │   ├── resultado.jtl                     // Log bruto do JMeter
│   │   ├── info-fim.json                     // /lab/info ao final do cenário
│   │   └── painel/index.html                 // Painel HTML do JMeter
│   └── (pinning-helidon.jfr)                 // Gerado ao rodar executar-tudo.sh
│
├── resultados/                               // Histórico quando ARQUIVAR=1
│
├── scripts/
│   ├── executar-tudo.sh                      // Orquestra: build → sobe app → JMeter → relatório
│   ├── iniciar-app.sh                        // Sobe o JAR com JFR e opções de scheduler
│   ├── rodar-testes.sh                       // Dispara os 7 cenários no JMeter (PORT=8081)
│   └── resumo.py                             // Consolida .jtl + teto → index.html / resumo.csv
│
└── src/main/
    ├── java/com/tcc/streamingapp/
    │   ├── Main.java                         // Entry point: Hikari + rotas + start servidor
    │   ├── dto/                              // Records de resposta JSON
    │   ├── repository/TituloRepository.java  // JDBC puro
    │   ├── service/TituloService.java        // Orquestração das 4 queries
    │   ├── lab/                              // LabWorkloads, LabService, records de lab
    │   └── exception/                        // TituloNaoEncontradoException
    └── resources/
        ├── application.yaml                  // Porta 8081, URL do PG, pool, semáforo
        └── db/
            ├── 01-schema.sql                 // DDL (mesmo do Spring)
            └── 02-seed.sql                   // Seed (10k títulos, 1M avaliações)
```

### Onde está o HTML dos resultados?

```
tcc-helidon-app/relatorio/index.html
```

Essa pasta vem com **amostra de referência**. Ao rodar `scripts/rodar-testes.sh` ou
`scripts/executar-tudo.sh`, ela é **substituída** pelos resultados reais do Helidon.

---

## 3. Fluxo do `executar-tudo.sh` (orquestração)

```
[ Início: scripts/executar-tudo.sh ]
   │
   ├─► 1. mvn -DskipTests package
   │       Gera target/tcc-helidon-app.jar + target/libs/
   │
   ├─► 2. Verifica se http://localhost:8081/lab/info já responde
   │       ├─ SIM → reutiliza o processo em execução
   │       └─ NÃO → scripts/iniciar-app.sh em background
   │                 • -XX:StartFlightRecording=...pinning-helidon.jfr
   │                 • opcional: PARALLELISM, TRACE_PINNING
   │                 • espera até 90s pelo /lab/info
   │
   ├─► 3. scripts/rodar-testes.sh
   │       Para cada cenário em CENARIOS (padrão: 7):
   │         a) POST /lab/reset
   │         b) jmeter -n -t plano-lab.jmx -Jport=8081 -Jcenario=...
   │         c) salva resultado.jtl + painel/ + GET /lab/info → info-fim.json
   │       Ao final: python3 scripts/resumo.py → relatorio/index.html
   │
   ├─► 4. Encerra o app (SIGTERM) para flush do arquivo .jfr
   │
   └─► 5. Copia pinning-helidon.jfr para relatorio/ (se este script subiu o app)
[ Fim ]
```

### Variáveis úteis

| Variável | Padrão | Efeito |
|----------|--------|--------|
| `PORT` | 8081 | Porta do alvo dos testes |
| `THREADS` | 200 | Usuários virtuais no JMeter |
| `RAMPUP` | 10 | Segundos de ramp-up |
| `DURATION` | 60 | Duração de cada cenário (s) |
| `CENARIOS` | io cpu io-cpu pinning-sync pinning-lock db db-semaforo | Subconjunto dos testes |
| `PARALLELISM` | (padrão JVM) | Limita carrier threads do scheduler de VT |
| `DESTINO` | relatorio | Pasta de saída |
| `ARQUIVAR` | 0 | Se 1, copia para `resultados/helidon-<timestamp>/` |

---

## 4. Ciclo de vida de uma requisição (pinning vs semáforo)

### Cenário A — Thread Pinning (`GET /lab/pinning/synchronized`)

```
Req HTTP ──► [Virtual Thread (VT-1)]
                  │
                  ▼
          Entra em synchronized(monitor)     ← monitor único compartilhado
                  │
                  ▼
          Thread.sleep(ms)  (I/O simulado)
                  │
                  ▼
         88 PINNING: a VT NÃO desmonta da Carrier Thread
             A carrier fica paralisada até o sleep acabar.
                  │
                  ▼
          Efeito dominó: com N carriers ≈ nº de CPUs,
          as demais VTs ficam PENDENTES (sem carrier livre).
          Vazão cai para ~ serial (≈ 1000/ms req/s).
```

### Cenário B — Correção com lock (`GET /lab/pinning/lock`)

```
Req HTTP ──► [Virtual Thread]
                  │
                  ▼
          Thread.sleep(ms)     ← FORA do lock: VT desmonta, carrier livre
                  │
                  ▼
          lock.lock()
             registrosLock++
          lock.unlock()        ← seção crítica só em memória
                  │
                  ▼
          Vazão volta ao patamar do cenário io.
```

### Cenário C — Banco com semáforo porteiro (`GET /lab/db/{id}/com-semaforo`)

```
Req HTTP ──► [Virtual Thread]
                  │
                  ▼
          Semaphore(30).tryAcquire(timeout)
                  │
         ┌────────┴────────┐
         │   tem permit?   │
         └────────┬────────┘
        SIM       │       NÃO
   ┌──────────────┘       └──────────────────────────────┐
   ▼                                                     ▼
TituloService.buscarDetalhes(id)              VT espera desmontada (sem
  4× JDBC via Hikari (máx. 30)                ocupar carrier). Timeout → 503.
release() ao terminar
```

O endpoint **sem** semáforo (`GET /titulos/{id}/detalhes`) permite que milhares de VTs
disputem as 30 conexões do pool → timeouts e fila no Hikari.

---

## 5. Modelo de dados (ER)

```
 +------------------------+             +------------------------+
 |         titulo         |             |        genero          |
 +------------------------+             +------------------------+
 | PK  id                 |<----+       | PK  id                 |<----+
 |     nome               |     |       |     nome (UNIQUE)      |     |
 |     sinopse            |     |       +------------------------+     |
 |     tipo (FILME/SERIE) |     |                                      |
 |     ano_lancamento     |     |       +------------------------+     |
 |     classificacao      |     |       |     titulo_genero      |     |
 |     duracao_minutos    |     |       +------------------------+     |
 +------------------------+     +-------| PK,FK1  titulo_id      |     |
      |             |                   | PK,FK2  genero_id      |-----+
      |             |                   +------------------------+
      |             |
      |             |                   +------------------------+
      |             +------------------>|       avaliacao        |
      |                                 +------------------------+
      |                                 | PK  id                 |
      |                                 | FK  titulo_id          |
      |                                 |     nota (1..5)        |
      |                                 |     comentario         |
      |                                 |     data_hora          |
      |                                 +------------------------+
      v
 +------------------------+             +------------------------+
 |       temporada        |             |        episodio        |
 +------------------------+             +------------------------+
 | PK  id                 |<------------| PK  id                 |
 | FK  titulo_id          |             | FK  temporada_id       |
 |     numero             |             |     numero             |
 |     nome               |             |     nome               |
 |     ano_lancamento     |             |     duracao_minutos    |
 +------------------------+             |     sinopse            |
                                        +------------------------+
```

### Volume do seed (`02-seed.sql`)

| Entidade | Quantidade aproximada |
|----------|------------------------|
| Gêneros | 20 |
| Títulos | 10.000 (≈7.000 filmes + ≈3.000 séries) |
| Episódios | > 30.000 |
| Avaliações | 1.000.000 |

O endpoint de detalhes executa **4 consultas** por requisição:

1. `titulo` por id  
2. gêneros (join `titulo_genero`)  
3. estatísticas (`COUNT` / `AVG` em `avaliacao`)  
4. avaliações recentes (`ORDER BY data_hora DESC LIMIT 10`)

---

## 6. Matriz de cenários

| ID | Endpoint | Tipo de carga | Mecanismo | Comportamento esperado (VT) |
|----|----------|---------------|-----------|------------------------------|
| **io** | `/lab/io?ms=100` | I/O-bound | `Thread.sleep` | VT desmonta; vazão ≈ concorrência / latência |
| **cpu** | `/lab/cpu?iteracoes=50000` | CPU-bound | loop aritmético | Não desmonta; limite ≈ nº de CPUs / carriers |
| **io-cpu** | `/lab/io-cpu` | Misto | sleep + loop | Menor entre limite de I/O e de CPU |
| **pinning-sync** | `/lab/pinning/synchronized` | I/O + pinning | `synchronized` + sleep | Serialização; vazão ~ 1000/ms; p95 alto |
| **pinning-lock** | `/lab/pinning/lock` | I/O corrigido | sleep fora do `ReentrantLock` | Volta ao nível de **io** |
| **db** | `/titulos/{id}/detalhes` | Banco real | 4 SQL, pool 30 | Disputa pelo pool; possíveis timeouts |
| **db-semaforo** | `/lab/db/{id}/com-semaforo` | Banco controlado | `Semaphore(30)` + 4 SQL | Fila de VTs desmontadas; erros de pool ≈ 0 |

**Eficiência** = vazão medida ÷ teto otimista do cenário (Lei de Little).  
O teto de `pinning-sync` já é o serial; a prova do pinning é a **comparação** com
`pinning-lock` e `io`, mais o pico de concorrência no handler.

---

## 7. Estrutura de pacotes

```
com.tcc.streamingapp
├── Main                         // bootstrap Helidon SE
├── dto
│   ├── TituloDetalhesResponse   // resposta agregada do catálogo
│   ├── AvaliacaoResponse
│   └── EstatisticasAvaliacao
├── repository
│   └── TituloRepository         // JDBC puro + record TituloBasico
├── service
│   └── TituloService            // orquestra as 4 consultas
├── lab
│   ├── LabWorkloads             // cargas sintéticas + atomics de concorrência
│   ├── LabService               // semáforo, info, teto
│   ├── ResultadoLab             // DTO de carga sintética
│   ├── InfoLab                  // snapshot do ambiente
│   └── TetoLab                  // tetos otimistas
└── exception
    └── TituloNaoEncontradoException
```

Não há camada de “controller” separada: as rotas HTTP estão no `Main` (estilo Helidon SE).
Isso deixa explícita a ausência de framework de anotações e facilita comparar o custo
estrutural com o Spring Boot.

---

## 8. Quadro-resumo

| Aspecto | Platform Threads | Spring Boot + VT | Helidon SE + VT |
|---------|------------------|------------------|-----------------|
| Modelo de thread | Pool Tomcat (~200) | VT sob demanda | VT nativas (Níma) |
| Memória por thread | ~1 MB (stack SO) | Centenas de bytes | Centenas de bytes |
| I/O bloqueante | Bloqueia thread do SO | Desmonta VT | Desmonta VT |
| `synchronized` + I/O | Sem pinning de VT | **Pinning** | **Pinning** (mesmo efeito JVM) |
| Correção típica | — | `ReentrantLock` / semáforo | Idem |
| Banco (pool 30) | Limitado pelo pool de threads | Risco de estouro sem controle | Idem + semáforo no lab |
| DI / web | Anotações Spring | Anotações Spring | Código imperativo |
| Porta neste TCC | — | 8080 | **8081** |

O ponto científico do TCC **não** é “Helidon é mais rápido que Spring”, e sim:

1. Virtual Threads elevam concorrência em cargas I/O-bound.  
2. Pinning por `synchronized` anula o benefício.  
3. Padrões (lock fino, semáforo alinhado ao pool) restauram a vazão.  
4. O mesmo fenômeno aparece em **dois stacks** (Spring e Helidon), reforçando que a causa é a JVM / API de concorrência, não um framework isolado.

---

## 9. Programação e algoritmos

### Lógica central do laboratório

- **Medição de concorrência:** `AtomicInteger` (`emAndamento`, `pico`) e `AtomicLong`
  (`totalExecucoes`) atualizados em torno de cada carga em `LabWorkloads.executar`.
- **Limitação de parâmetros:** função `limitar(valor, maximo)` evita sleeps ou loops
  absurdos sob teste.
- **Teto otimista (Lei de Little):**  
  \(\text{vazão máx} \approx \dfrac{\text{concorrência}}{\text{latência}}\)  
  implementado em `LabService.teto` para I/O, CPU, misto, pinning serial e banco.

### Estruturas de dados

| Estrutura | Uso |
|-----------|-----|
| `record` Java | DTOs imutáveis (`TituloDetalhesResponse`, `ResultadoLab`, …) |
| `Optional` | Resultado de busca por id no repositório |
| `List` / `ArrayList` | Gêneros e avaliações recentes |
| `Semaphore` (fair) | Fila FIFO de acesso ao banco |
| `ReentrantLock` | Seção crítica sem pinning de I/O |
| `Object` monitor | Demonstração deliberada de pinning com `synchronized` |

### Orientação a objetos

- **Separação de responsabilidades:** Repository (SQL), Service (caso de uso), Lab (experimento), Main (composição).
- **Injeção por construtor** (mesmo sem container): facilita testes e deixa dependências visíveis.
- **Records** como value objects de API — imutabilidade e igualdade estrutural.

### Resolução de problemas (do sintoma à correção)

| Problema observado | Hipótese | Experimento | Correção |
|--------------------|----------|-------------|----------|
| Vazão cai com VT sob “I/O” | Pinning | `pinning-sync` vs `pinning-lock` + JFR `VirtualThreadPinned` | Tirar I/O do `synchronized`; usar `ReentrantLock` |
| Timeouts no pool Hikari | Manada de VT | `db` vs `db-semaforo` | `Semaphore` = tamanho do pool |
| CPU não escala com VT | CPU-bound não desmonta | cenário `cpu` + paralelismo do scheduler | Aceitar limite de carriers; não esperar milagre de VT |

---

## 10. Engenharia de requisitos

### Requisitos funcionais (RF)

| ID | Requisito |
|----|-----------|
| RF01 | Consultar detalhes de um título por id (dados básicos, gêneros, estatísticas, avaliações recentes). |
| RF02 | Expor endpoints sintéticos de carga: I/O, CPU, I/O+CPU, pinning synchronized, pinning lock. |
| RF03 | Expor fluxo de banco com e sem semáforo de concorrência. |
| RF04 | Expor `/lab/info` e `/lab/teto` para instrumentação e comparação com tetos teóricos. |
| RF05 | Permitir `POST /lab/reset` para zerar contadores entre cenários. |

### Requisitos não funcionais (RNF)

| ID | Requisito |
|----|-----------|
| RNF01 | Executar em Java 21 com Virtual Threads. |
| RNF02 | Coexistir com o app Spring na mesma máquina (porta 8081). |
| RNF03 | Compartilhar o mesmo schema PostgreSQL e o mesmo plano JMeter. |
| RNF04 | Gerar relatório HTML/CSV reproduzível via scripts. |
| RNF05 | Gravar JFR com eventos de pinning durante a bateria de testes. |
| RNF06 | Driver JDBC fixo em 42.5.0 para reprodutibilidade do experimento de pinning. |

### Levantamento e validação

- **Fonte:** pergunta de pesquisa do TCC (efeito de VT, pinning e controle de concorrência em app JDBC).  
- **Validação:** critérios objetivos de vazão, latência (p50/p95/p99), taxa de erro e eventos JFR — não opinião subjetiva de “parecer rápido”.  
- **Rastreabilidade:** cada cenário da matriz mapeia a pelo menos um RF/RNF e a uma evidência em `relatorio/`.

---

## 11. Projeto e arquitetura de software

### Estilo arquitetural

- **Camadas clássicas** (apresentação HTTP → aplicação → infraestrutura JDBC), com o detalhe de que a “apresentação” no Helidon SE é código de roteamento no `Main`, não controllers anotados.
- **Hexagonal light:** o núcleo (`LabWorkloads`, regras de montagem do DTO) não depende de Helidon; só as bordas (HTTP, DataSource) dependem de frameworks.

### Princípios SOLID (aplicação prática)

| Princípio | Como aparece no projeto |
|-----------|---------------------------|
| **S**ingle Responsibility | `TituloRepository` só SQL; `LabWorkloads` só cargas; `resumo.py` só relatório. |
| **O**pen/Closed | Novos cenários de lab = novos métodos em `LabWorkloads` + uma rota, sem reescrever o pipeline JMeter. |
| **L**iskov | DTOs/records estáveis; contratos de resposta JSON preservados entre Spring e Helidon. |
| **I**nterface Segregation | APIs HTTP pequenas e focadas (`/lab/io`, `/lab/cpu`, …) em vez de um endpoint “faz-tudo”. |
| **D**ependency Inversion | Serviços recebem `DataSource` / `TituloRepository` pelo construtor; não criam o pool internamente. |

### Padrões de projeto

- **Facade:** `LabService` unifica workloads, semáforo e tetos.  
- **Template Method (informal):** `LabWorkloads.executar` padroniza medição em torno de qualquer carga.  
- **DTO / Record:** transporte imutável na borda HTTP.  
- **Object Pool:** HikariCP como pool de conexões.  
- **Throttling:** `Semaphore` como porteiro alinhado ao recurso escasso.

---

## 12. Qualidade e testes de software

### Estratégia de testes neste TCC

| Tipo | O que cobre | Ferramenta |
|------|-------------|------------|
| Smoke manual | App sobe; `/lab/info` e `/lab/io` respondem | `curl` |
| Teste de carga | 7 cenários, 200 usuários | JMeter 5.x |
| Comparação com oráculo | Vazão ≤ teto otimista | `LabService.teto` + `resumo.py` |
| Diagnóstico forense | Eventos de pinning | JFR / JDK Mission Control |
| Reprodutibilidade | Mesmo plano, mesmas flags, dois frameworks | Scripts shell |

### Métricas de qualidade observadas

- Vazão (req/s), latência p50/p95/p99, taxa de erro (%).  
- Pico de concorrência dentro do handler (`InfoLab.picoConcorrencia`).  
- Contagem de eventos `jdk.VirtualThreadPinned` no `.jfr`.  
- Eficiência = medida / teto.

### Revisões

- Revisão de código focada em: I/O dentro de `synchronized`, tamanho do pool × semáforo, timeouts.  
- Revisão experimental: mesma máquina para carga e servidor distorce CPU — declarado na metodologia.

---

## 13. Gerência de projetos

### Escopo do experimento (baseline)

| Entrega | Estimativa orientativa |
|---------|------------------------|
| App Spring Boot + lab | Já existente (projeto irmão) |
| Port para Helidon SE (este repo) | 1–2 dias (reuso de domain/lab) |
| Scripts alinhados à porta 8081 | Meio dia |
| Bateria completa JMeter (7 cenários × 60s) | ~9–12 min por framework |
| Análise JFR + tabelas do TCC | 1–2 dias |

### Riscos

| Risco | Impacto | Mitigação |
|-------|---------|-----------|
| JMeter 2.x do `apt` | Plano não roda | Exigir JMeter 5.x no README |
| PG não populado | Cenários `db*` falham | Documentar seed; smoke em `/titulos/1/detalhes` |
| Carga na mesma máquina | Subestima CPU | Registrar na metodologia; opcional máquina separada |
| Driver JDBC diferente | Pinning some/muda | Fixar 42.5.0 no `pom.xml` |

### Métricas de projeto (não só de software)

- Tempo de build, tempo de bateria, taxa de cenários verdes.  
- Rastreabilidade requisito → cenário → arquivo em `relatorio/`.

---

## 14. Banco de dados

### Modelagem

- Normalização clássica 3FN para título/gênero/avaliação/temporada/episódio.  
- Constraints `CHECK` (tipo FILME/SERIE, nota 1–5, duração obrigatória só em filme).  
- FKs com `ON DELETE CASCADE` onde faz sentido no domínio de catálogo.

### SQL relevante (repositório)

- Ponto de acesso por **chave primária** e joins indexáveis (`titulo_id`).  
- Agregação `COUNT`/`AVG` em `avaliacao` — custo depende de volume e índices.  
- `LIMIT` nas avaliações recentes evita transferir 1M de linhas.

### Administração no experimento

- Pool **pequeno de propósito** (30): o gargalo deixa de ser “milhões de threads” e passa a ser o recurso real.  
- Mesmo banco para Spring e Helidon → elimina viés de dados na comparação.  
- Seed pesado (1M avaliações) aproxima o laboratório de um catálogo realista.

---

## 15. Metodologias de desenvolvimento

### Processo adotado (híbrido enxuto)

1. **Pergunta de pesquisa** clara (efeito de VT / pinning / controle).  
2. **MVP experimental** no Spring Boot.  
3. **Replicação** no Helidon SE (mesmo contrato HTTP e mesmo banco).  
4. **Medição automatizada** (scripts + JMeter + resumo).  
5. **Análise** com evidência (HTML, CSV, JFR).

### Traços ágeis presentes

- Ciclos curtos: mudar um cenário (`CENARIOS=pinning-sync`) e medir de novo.  
- Feedback objetivo (métricas), não só demonstração manual.  
- Documentação viva no repositório (`README`, este arquivo, comentários de lab).

### Traços tradicionais presentes

- Documentação de requisitos e arquitetura antes/alongside da medição.  
- Matriz de cenários e critérios de aceite experimentais fixos.  
- Rastreabilidade para o texto do TCC.

Não se afirma que o TCC “foi feito em Scrum”; afirma-se que a **disciplina experimental**
mistura planejamento (requisitos, matriz) com iteração rápida de medição (scripts).

---

## 16. Como executar

### Pré-requisitos

- JDK 21+, Maven 3.8+  
- PostgreSQL com `tcc_streaming` (mesmo do Spring)  
- JMeter 5.x  
- Python 3 (para `resumo.py`)

### Banco (uma vez)

```bash
psql -U postgres -d tcc_streaming -f src/main/resources/db/01-schema.sql
psql -U postgres -d tcc_streaming -f src/main/resources/db/02-seed.sql
```

### Subir e testar

```bash
cd tcc-helidon-app
mvn -DskipTests package
scripts/iniciar-app.sh              # http://localhost:8081
# outro terminal:
curl -s http://localhost:8081/lab/info | jq .
curl -s http://localhost:8081/titulos/1/detalhes | jq .

# bateria completa:
scripts/executar-tudo.sh
# relatório:
#   relatorio/index.html
```

### Comparar com Spring Boot

1. Spring: `scripts/executar-tudo.sh` → `relatorio/` (8080)  
2. Helidon: `scripts/executar-tudo.sh` → `relatorio/` (8081)  
3. Colocar `resumo.csv` / tabelas lado a lado no TCC  

---

## 17. Evidências para o TCC

| Evidência | Onde obter |
|-----------|------------|
| Vazão e latência | `relatorio/index.html`, painéis JMeter, `resumo.csv` |
| Tetos teóricos | `relatorio/teto.json`, endpoint `/lab/teto` |
| Pinning (forense) | `jfr print --events jdk.VirtualThreadPinned relatorio/pinning-helidon.jfr` |
| Ambiente da JVM | `relatorio/*/info-fim.json` e `/lab/info` |
| Comparativo de stacks | Dois `resumo.csv` (Spring × Helidon) nas mesmas condições |

### Comandos JFR úteis

```bash
jfr summary relatorio/pinning-helidon.jfr | grep -i VirtualThreadPinned
jfr print --events jdk.VirtualThreadPinned relatorio/pinning-helidon.jfr | head -40
```

---

## Referências de apoio (para a bibliografia do TCC)

- JEP 444: Virtual Threads  
- Documentação Helidon SE 4 (WebServer / Níma)  
- Documentação HikariCP (pool sizing)  
- Lei de Little (teoria de filas) aplicada a vazão ≈ L / W  
- Repositório público *java-virtual-threads-pitfalls* (inspirou cargas sintéticas de pinning)

---

*Documento gerado para o projeto tcc-helidon-app — uso acadêmico no TCC de Virtual Threads.*
