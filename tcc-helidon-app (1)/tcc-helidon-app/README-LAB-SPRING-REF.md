# TCC — Laboratório de Virtual Threads (Java 21 + Spring Boot + JMeter)
Este repositório contém o código-fonte, scripts de automação, planos de teste do JMeter e laboratórios de concorrência sintética para comparação entre Virtual Threads (Project Loom) e Platform Threads em Java 21 com Spring Boot. O intuito aqui não é uma programação limpa, mas identificar o comportamento das threads usando o Apache JMeter e o JDK, com dois terminais: um com Spring Boot e outro com Helidon, usando o mesmo banco de dados e o mesmo programa de streaming com algoritmos parecidos. Todo o experimento foi desenhado para ser sequencial e isolado: o script de automação sobe um framework, roda a bateria de 7 cenários, coleta o arquivo de evidência (JFR) e o log do JMeter, e desliga a JVM. Só depois que a máquina está 100% livre de processos é que eu subo o segundo framework. Além disso, ambos usam exatamente o mesmo banco de dados, o mesmo driver (42.5.0) e a mesma carga de usuários no JMeter, garantindo que a única variável alterada seja a arquitetura do framework.

---
Aplicação de streaming (títulos, gêneros, temporadas, episódios, avaliações) em Spring Boot com
**Virtual Threads**, PostgreSQL e HikariCP, mais um laboratório que mede, com JMeter, o efeito de
I/O-bound, CPU-bound, **pinning** (`synchronized`) e estado **pendente** (deadlock), comparando a
vazão medida com o **teto otimista** (Lei de Little).

## Requisitos
- JDK 21 e Maven
- PostgreSQL com o banco `tcc_streaming` (usuário/senha em `src/main/resources/application.properties`)
- **JMeter 5.x** (o pacote `apt` instala o 2.13, que NÃO lê o plano). Se não estiver no PATH: `JMETER=/caminho/apache-jmeter-5.x/bin/jmeter`

## 1. Banco (uma vez)
```bash
createdb -U postgres tcc_streaming          # se ainda não existir
psql -U postgres -d tcc_streaming -f src/main/resources/db/01-schema.sql   # recria as tabelas (DROP TABLE!)
psql -U postgres -d tcc_streaming -f src/main/resources/db/02-seed.sql     # 10.000 títulos e 1.000.000 de avaliações
```

## 2. Rodar tudo com UM comando
```bash
mvn -DskipTests package                      # só na primeira vez
scripts/executar-tudo.sh                     # Virtual Threads (~9 min)
MODO=platform scripts/executar-tudo.sh       # baseline com threads de plataforma
DURATION=30 scripts/executar-tudo.sh         # versão rápida
```
O script sobe o servidor, roda os 7 cenários, para o servidor (grava o `.jfr`), gera
**`relatorio/index.html`** e abre no navegador. A pasta `relatorio/` é **substituída a cada
execução**; se uma execução falhar, o relatório anterior permanece. Use `ARQUIVAR=1` para guardar
uma cópia em `resultados/<data>/`.

Conteúdo de `relatorio/`: `index.html` (tabela, gráficos, leituras automáticas), `resumo.csv`
(abre no LibreOffice/Excel pt-BR), `teto.json`, `info-inicio.json`, `pinning-<modo>.jfr` e uma
pasta por cenário com o painel do JMeter (`painel/index.html`), o `resultado.jtl` e o `info-fim.json`.

Passo a passo manual: `scripts/iniciar-app.sh virtual` (um terminal) e `scripts/rodar-testes.sh` (outro).

## Cenários
| Cenário | Endpoint | O que demonstra | Esperado |
|---|---|---|---|
| `io` | `/lab/io?ms=100` | I/O-bound: a VT desmonta no `sleep` | vazão próxima do teto (200 ÷ 0,1 s = 2000 req/s) |
| `cpu` | `/lab/cpu?iteracoes=50000` | CPU-bound: nada desmonta | limite = nº de CPUs; o JMeter divide as CPUs com o servidor |
| `io-cpu` | `/lab/io-cpu` | I/O seguido de CPU | o menor entre os dois limites |
| `pinning-sync` | `/lab/pinning/synchronized` | I/O dentro de `synchronized` | execução serial: ~10 req/s e p95 de vários segundos |
| `pinning-lock` | `/lab/pinning/lock` | correção (I/O fora do lock) | volta ao nível do `io` |
| `db` | `/titulos/{id}/detalhes` | fluxo real, sem controle | 200 usuários disputando 30 conexões |
| `db-semaforo` | `/lab/db/{id}/com-semaforo` | mesmo fluxo com `Semaphore` | sem estouro do pool; a fila vira latência |

**Eficiência** = vazão medida ÷ teto otimista do próprio cenário. O teto do `pinning-sync` já é o
serial (1000 ÷ ms), então a prova do pinning é a **comparação**: `pinning-sync` contra
`pinning-lock` e `io`, e o pico de concorrência dentro do handler (≈ nº de carriers contra 200).

## Evidências para o TCC
- **Vazão e latência:** `relatorio/index.html` e os painéis do JMeter (gráfico *Throughput*).
- **JFR (prova forense):** `jfr summary relatorio/pinning-virtual.jfr | grep VirtualThreadPinned` e
  `jfr print --events jdk.VirtualThreadPinned relatorio/pinning-virtual.jfr | head -40`
  (cada evento traz o stack trace da linha que prendeu a thread). Para separar `io` de `pinning-sync`,
  grave um arquivo por cenário: `JFR_ARQUIVO=jfr-io.jfr scripts/iniciar-app.sh virtual` + `CENARIOS=io scripts/rodar-testes.sh`.
- **Thread dump com virtual threads:** com o app sob carga, `jcmd <pid> Thread.dump_to_file -format=text dump.txt`
  (`jps` mostra o pid). O "Dump Threads" do IntelliJ costuma listar só threads de plataforma.
- **Estado pendente (deadlock):** `scripts/rodar-deadlock.sh` roda numa JVM separada com `parallelism=1`, detecta o
  travamento por timeout, grava `threaddump-pendente-*.txt` e encerra a JVM.

## Estrutura
```
src/main/java/.../lab/       cargas sintéticas, teto otimista, info do ambiente, semáforo do banco
src/main/resources/db/       schema e seed do PostgreSQL
jmeter/plano-lab.jmx         plano único parametrizado por -J (substitui o teste.jmx)
scripts/                     executar-tudo, iniciar-app, rodar-testes, resumo.py, rodar-deadlock
demos/                       demos do repositório java-virtual-threads-pitfalls (sem alteração) + DeadlockPendingDemo
```

## Observações
- O driver PostgreSQL fica fixo em 42.5.0 (pom) para provocar pinning.
- Rodar o gerador de carga na mesma máquina do servidor distorce os cenários de CPU; registre isso na metodologia.
- Os demos de `demos/` vêm do repositório público *java-virtual-threads-pitfalls*; cite-o nas referências.


## Laboratório Experimental plataforma de  Streaming App - (Virtual Threads) 

Este repositório contém o código-fonte, a suíte de testes de carga e o ambiente experimental para análise comparativa de desempenho entre **Virtual Threads (Project Loom / Java 21)** e **Platform Threads (Modelo Tradicional)** em uma aplicação Spring Boot 3.3.5 integrada ao banco de dados PostgreSQL 16.



### Pré-requisitos
* **Java 21+** instalado e configurado no `PATH`.
* **Apache Maven 3.8+**.
* **PostgreSQL 16** em execução na porta `5432` com a base `tcc_streaming` criada e populada.
* **Apache JMeter 5.x** (caso o binário não esteja no `PATH`, defina a variável `JMETER=/caminho/para/jmeter`).
* **Python 3.x** para execução do gerador de relatórios (`scripts/resumo.py`).

---

## 2. Arquitetura do Sistema e Fluxo de Dados

A arquitetura foi projetada para avaliar a concorrência sob diferentes classes de gargalo (I/O bloqueante, processamento intensivo de CPU, contenção de locks e limite de conexões a banco de dados relacional).

```
+-----------------------------------------------------------------------------------+
|                                CLIENTE / JMETER                                   |
|               (Simulação de Carga com Concorrência Configurável)                  |
+-----------------------------------------------------------------------------------+
                                          |
                                          | HTTP (REST)
                                          v
+-----------------------------------------------------------------------------------+
|                        SPRING BOOT 3.3.5 (JAVA 21 / VIRTUAL THREADS)              |
|                                                                                   |
|  +---------------------------+                 +-------------------------------+  |
|  |    TituloController       |                 |        LabController          |  |
|  |  (Endpoints Negócio)      |                 |    (Endpoints Sintéticos)     |  |
|  +-------------+-------------+                 +---------------+---------------+  |
|                |                                               |                  |
|                v                                               v                  |
|  +---------------------------+                 +-------------------------------+  |
|  |      TituloService        |                 |          LabService           |  |
|  | (Orquestra 4 Consultas)   |                 | (Porteiro / Métricas / Tetos) |  |
|  +-------------+-------------+                 +-------+---------------+-------+  |
|                |                                       |               |          |
|                |                                       v               v          |
|                |                             +-----------------+ +-------------+  |
|                |                             |   Semaphore(30) | |LabWorkloads |  |
|                |                             | (Throttling DB) | | (Locks/Sync)|  |
|                |                             +--------+--------+ +-------------+  |
|                v                                      |                           |
|  +----------------------------------------------------+                           |
|  |                       TituloRepository (JdbcTemplate)                          |
|  +-------------------------------------+------------------------------------------+
                                         |
                                         | Pool HikariCP (30 conexões)
                                         v
+-----------------------------------------------------------------------------------+
|                                BANCO POSTGRESQL 16                                |
|        (10.000 Títulos, 1.000.000 Avaliações, Gêneros, Temporadas, Episódios)     |
+-----------------------------------------------------------------------------------+
```

### Componentes Principais
```
TituloController` & `TituloService`**: Camada de negócio do catálogo. Cada requisição no endpoint `/titulos/{id}/detalhes` executa $4$ consultas JDBC sequenciais para montar o objeto completo.
LabController` & `LabService`**: Camada de testes sintéticos que expõe rotas para isolar comportamentos de I/O (`Thread.sleep`), CPU (loops numéricos), `synchronized` (Thread Pinning) e `ReentrantLock`.
LabWorkloads`**: Implementação das cargas computacionais sintéticas com medição precisa de concorrência em tempo real.
Semáforo Porteiro (`Semaphore`)**: Mecanismo de controle de concorrência ($30$ permissões) para alinhar a quantidade de Virtual Threads ativas ao tamanho máximo do pool HikariCP.
Driver PostgreSQL (`42.5.0`)**: Versão utilizada para evidenciar os impactos de *Thread Pinning* durante bloqueios de I/O de rede dentro de blocos sincronizados da biblioteca JDBC.
```
---

## 🛠️ 3. Detalhamento dos Scripts de Automação

O diretório `scripts/` contém a automação completa do ciclo de vida dos testes:

```
[ Início: scripts/executar-tudo.sh ]
   │
   ├─► 1. Lê variáveis de ambiente (MODO=virtual|platform, THREADS=200, DURATION=60).
   ├─► 2. Valida se o app está no ar (/lab/info); se não, compila o JAR e executa scripts/iniciar-app.sh.
   ├─► 3. O scripts/iniciar-app.sh habilita o Java Flight Recorder (JFR) com gravação de pinning.
   ├─► 4. Invoca scripts/rodar-testes.sh para disparar o JMeter em modo CLI nos 7 cenários.
   ├─► 5. Envia SIGTERM (kill) para a JVM, forçando o flush do arquivo .jfr para o disco.
   ├─► 6. Executa scripts/resumo.py para processar os logs .jtl, comparar com /lab/teto e gerar o HTML.
   └─► 7. Abre o relatório relatorio/index.html automaticamente no navegador.
[ Fim ]
```

### Descrição dos Scripts
1. **`scripts/executar-tudo.sh`**: Script mestre de orquestração E2E.
2. **`scripts/iniciar-app.sh`**: Inicializa a aplicação Spring Boot configurando as opções da JVM:
  * `-XX:StartFlightRecording=filename=pinning-<modo>.jfr,settings=profile`
  * `-Djdk.virtualThreadScheduler.parallelism=N` (permite limitar o total de *carrier threads*).
  * `-Djdk.tracePinnedThreads=full` (opcional: imprime o stack trace do pinning no console).
3. **`scripts/rodar-testes.sh`**: Dispara a bateria de $7$ cenários de teste contra o JMeter CLI, coletando snapshots em formato `.jtl` e `info-fim.json`.
4. **`scripts/rodar-deadlock.sh`**: Executa a demonstração em JVM isolada com $1$ *carrier thread* para reproduzir o travamento determinístico por *Thread Pinning*.
5. **`scripts/resumo.py`**: Analisador Python que consolida as estatísticas ($p50$, $p95$, $p99$, vazão por segundo e taxa de erro) gerando `relatorio/index.html` e `relatorio/resumo.csv`.

---

## 4. Ciclo de Vida da Requisição: Pinning vs. Semáforo

### Cenário A: Thread Pinning em Bloco `synchronized` (`/lab/pinning/synchronized`)

```
Req HTTP ──► [Virtual Thread (VT-1)]
                  │
                  ▼
          Entra em bloco `synchronized(monitor)`
                  │
                  ▼
          Executa operação de I/O bloqueante (`Thread.sleep` ou Soquete JDBC)
                  │
                  ▼
          🔴 THREAD PINNING DETECTADO!
          A Virtual Thread NÃO pode ser desmontada da Carrier Thread (ForkJoinWorkerThread).
          A Carrier Thread fica 100% PARALISADA aguardando o I/O terminar.
                  │
                  ▼
          Efeito dominó: Se o número de VTs em pinning igualar o número de CPUs,
          o Scheduler esgota as Carrier Threads. Todas as demais VTs entram no estado PENDENTE.
```

### Cenário B: Controle com Semáforo (`/lab/db/{id}/com-semaforo`)

```
Req HTTP ──► [Virtual Thread (VT-2)]
                  │
                  ▼
          Solicita permissão ao `Semaphore(30)`
                  │
         ┌────────┴────────┐
         │ Tem permissão?  │
         └────────┬────────┘
        SIM       │       NÃO
   ┌──────────────┘       └─────────────────────────────┐
   ▼                                                    ▼
Acessa o pool HikariCP (30)                 A Virtual Thread é DESMONTADA
Executa as 4 consultas JDBC                 da Carrier Thread sem bloqueá-la.
Libera a permissão ao terminar              A Carrier Thread fica LIVRE para
                                            atender outras requisições HTTP.
```

---

## 5. Modelo de Dados Relacional (PostgreSQL)

O banco de dados relacional foi modelado com integridade referencial completa e restrições de verificação (*CHECK constraints*).

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
      |                                 |     nota (1 a 5)       |
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

### Volume de Dados Populado (`02-seed.sql`)
* **Gêneros**: $20$ categorias.
* **Títulos**: $10.000$ registros ($7.000$ Filmes e $3.000$ Séries).
* **Temporadas e Episódios**: Mais de $30.000$ episódios associados às séries.
* **Avaliações**: $1.000.000$ de notas e comentários distribuídos entre os títulos.

---

##  6. Matriz dos 7 Cenários do Laboratório

| ID Cenário | Rota Endpoint | Tipo de Carga | Mecanismo de Execução | Comportamento sob Carga (Virtual Threads) |
| :--- | :--- | :--- | :--- | :--- |
| **`io`** | `/lab/io?ms=100` | I/O-bound | `Thread.sleep(100)` | Desmontagem eficiente da VT. Alta vazão e baixa latência. |
| **`cpu`** | `/lab/cpu?iteracoes=50000` | CPU-bound | Loop aritmético puro | Não desmonta a VT. Limitado estritamente pelo número de núcleos físicos de CPU. |
| **`io-cpu`** | `/lab/io-cpu` | Misto | I/O (100ms) + CPU ($50.000$ iter) | Comportamento híbrido: desativação no I/O e contenção na CPU. |
| **`pinning-sync`** | `/lab/pinning/synchronized` | I/O com Pinning | `synchronized(monitor)` | Trava a Carrier Thread no I/O. Provoca queda acentuada na vazão. |
| **`pinning-lock`** | `/lab/pinning/lock` | I/O Corrigido | `ReentrantLock` | Desmonta a VT durante o I/O. Restabelece a vazão ao nível ideal. |
| **`db`** | `/titulos/{id}/detalhes` | Banco Real | $4$ SQLs via HikariCP ($30$) | Milhares de VTs disputam $30$ conexões. Ocorre estouro no tempo de espera do pool. |
| **`db-semaforo`** | `/lab/db/{id}/com-semaforo` | Banco Controlado | SQLs com `Semaphore(30)` | Enfileiramento de VTs sem bloquear a Carrier Thread. Zero erros de timeout. |

---

## 7. Árvore Completa de Diretórios e Pacotes

```
tcc-streaming-app-completo/
├── .idea/                                    // Configurações do ambiente da IDE IntelliJ
│   ├── .gitignore
│   └── workspace.xml
│
└── tcc-streaming-app/                         // Raiz da aplicação Spring Boot
    ├── .gitignore                             // Regras de exclusão do Git
    ├── pom.xml                                // Dependências Maven (Spring Boot 3.3.5, Java 21)
    ├── README-LAB.md                          // Guia simplificado do laboratório
    ├── README.md                              // Documentação técnica completa
    ├── teste.jmx                              // Plano de teste individual do JMeter
    │
    ├── demos/                                 // Experimentos em JVM separada
    │   ├── DeadlockPendingDemo.java           // Demo de deadlock por pinning em 1 carrier
    │   ├── ThreadBenchmark.java               // Benchmark isolado sem HTTP
    │   ├── ThreadPinningDemo.java             // Comparativo synchronized vs ReentrantLock
    │   └── VirtualThreadsDemo.java            // Exemplo conceitual de Virtual Threads
    │
    ├── jmeter/                                // Planos de teste de carga
    │   └── plano-lab.jmx                      // Plano mestre parametrizado
    │
    ├── relatorio/                             // Resultados dos testes (gerado em tempo de execução)
    │   ├── cpu/                               // Resultados do cenário CPU
    │   │   ├── info-fim.json
    │   │   ├── resultado.jtl
    │   │   └── painel/
    │   │       └── index.html
    │   ├── db/                                // Resultados do cenário DB
    │   │   ├── info-fim.json
    │   │   ├── resultado.jtl
    │   │   └── painel/
    │   │       └── index.html
    │   ├── db-semaforo/                       // Resultados do cenário DB com Semáforo
    │   │   ├── info-fim.json
    │   │   ├── resultado.jtl
    │   │   └── painel/
    │   │       └── index.html
    │   ├── io/                                // Resultados do cenário I/O
    │   │   ├── info-fim.json
    │   │   ├── resultado.jtl
    │   │   └── painel/
    │   │       └── index.html
    │   ├── io-cpu/                            // Resultados do cenário Misto
    │   │   ├── info-fim.json
    │   │   ├── resultado.jtl
    │   │   └── painel/
    │   │       └── index.html
    │   ├── pinning-lock/                      // Resultados do cenário ReentrantLock
    │   │   ├── info-fim.json
    │   │   ├── resultado.jtl
    │   │   └── painel/
    │   │       └── index.html
    │   ├── pinning-sync/                      // Resultados do cenário Synchronized (Pinning)
    │   │   ├── info-fim.json
    │   │   ├── resultado.jtl
    │   │   └── painel/
    │   │       └── index.html
    │   ├── index.html                         // Dashboard principal unificado
    │   ├── info-inicio.json                   // Métricas iniciais da aplicação
    │   ├── pinning-virtual.jfr                // Gravação do Java Flight Recorder
    │   ├── resumo.csv                         // Consolidação em tabela CSV
    │   └── teto.json                          // Cálculo do teto teórico de vazão
    │
    ├── resultados/                            // Histórico de relatórios arquivados (ARQUIVAR=1)
    │
    ├── scripts/                               // Scripts de automação
    │   ├── executar-tudo.sh                   // Script mestre de execução
    │   ├── iniciar-app.sh                     // Inicializador com flags JVM/JFR
    │   ├── resumo.py                          // Processador dos relatórios em Python
    │   ├── rodar-deadlock.sh                  // Script para o teste de deadlock
    │   └── rodar-testes.sh                    // Executor do JMeter CLI
    │
    ├── src/                                   // Código-fonte da aplicação
    │   └── main/
    │       ├── java/com/tcc/streamingapp/
    │       │   ├── StreamingAppApplication.java
    │       │   ├── controller/                // Endpoints REST de negócio
    │       │   │   └── TituloController.java
    │       │   ├── dto/                       // Data Transfer Objects (Java Records)
    │       │   │   ├── AvaliacaoResponse.java
    │       │   │   ├── EstatisticasAvaliacao.java
    │       │   │   └── TituloDetalhesResponse.java
    │       │   ├── exception/                 // Tratamento centralizado de erros
    │       │   │   ├── GlobalExceptionHandler.java
    │       │   │   └── TituloNaoEncontradoException.java
    │       │   ├── lab/                       // Módulo experimental
    │       │   │   ├── InfoLab.java
    │       │   │   ├── LabController.java
    │       │   │   ├── LabService.java
    │       │   │   ├── LabWorkloads.java
    │       │   │   ├── ResultadoLab.java
    │       │   │   └── TetoLab.java
    │       │   ├── repository/                // Acesso ao banco de dados
    │       │   │   └── TituloRepository.java
    │       │   └── service/                   // Regras de negócio
    │       │       └── TituloService.java
    │       └── resources/
    │           ├── application.properties     // Configurações do Spring Boot e HikariCP
    │           └── db/                        // Scripts SQL de Schema e Seed
    │               ├── 01-schema.sql
    │               └── 02-seed.sql
    │
    └── target/                                // Arquivos compilados pelo Maven
        ├── classes/
        └── tcc-streaming-app-1.0.0.jar
```

---

##  8. Quadro Comparativo: Platform Threads vs. Virtual Threads

| Aspecto / Métrica | Platform Threads (Modelo Tradicional) | Virtual Threads Sem Controle | Virtual Threads + Semáforo / Lock |
| :--- | :--- | :--- | :--- |
| **Uso de Memória por Thread** | Alto (~$1\text{ MB}$ por stack no SO) | Mínimo (~centenas de bytes) | Mínimo (~centenas de bytes) |
| **Limite de Concorrência** | Restrito pelo pool de Threads do Tomcat ($200$) | Praticamente ilimitado ($> 100.000$) | Controlado na camada de recurso crítico |
| **Comportamento em I/O Bloqueante** | Bloqueia a Thread do SO | Desmonta a Virtual Thread da Carrier | Desmonta a Virtual Thread da Carrier |
| **Sensibilidade a `synchronized`** | Nenhuma (Thread nativa do SO) | **Crítica** (Causa *Thread Pinning*) | Eliminada trocando por `ReentrantLock` |
| **Impacto no Banco de Dados** | Protegido indiretamente pelo limite do Tomcat | Estoura o pool de conexões (HikariCP) | Protegido eficientemente via `Semaphore` |

---

## 9. Diagnóstico de Thread Pinning com JDK Mission Control

Para analisar as gravações do Java Flight Recorder (`.jfr`) geradas automaticamente durante a execução do script:

1. Baixe e abra o **JDK Mission Control (JMC)** ou a extensão do IntelliJ / VS Code.
2. Abra o arquivo `relatorio/pinning-virtual.jfr`.
3. Navegue até a aba **Event Browser** $\rightarrow$ **JVM System** $\rightarrow$ **Virtual Threads**.
4. Filtre pelo evento `jdk.VirtualThreadPinned`:
  * **Cause**: Exibe o trecho do código responsável pelo bloqueio (`synchronized`).
  * **Duration**: Mostra o tempo exato em que a *Carrier Thread* permaneceu paralisada.
