
## 🎓 Apresentação Interativa 

Simulador interativo desenvolvido para demonstrar o funcionamento das **Virtual Threads no Java 21**, os efeitos do *Thread Pinning* e os impactos no acesso ao banco de dados utilizando JDBC.

###  Acessar o simulador

<p align="center">
  <a href="https://sites.google.com/dcx.ufpb.br/simuladorinterativo-defesatccv/full-page-embed">
    <img src="https://img.shields.io/badge/ACESSAR-SIMULADOR%20INTERATIVO-blue?style=for-the-badge&logo=googlechrome" alt="Acessar simulador">
  </a>
</p>

###  Conteúdo da apresentação

- Arquitetura das Virtual Threads (JEP 444).
- Execução sem Thread Pinning.
- Efeitos do Thread Pinning com `synchronized`.
- Análise do acesso JDBC com PostgreSQL.
- Controle de concorrência utilizando Semaphore.
- Comparação dos resultados experimentais.

###  Tecnologias utilizadas

- Java 21
- Spring Boot
- Helidon SE
- PostgreSQL
- JDBC
- Apache JMeter

### Ordem de execução do experimento
1. Preparar o ambiente
   
   Java, Maven, PostgreSQL e JMeter.
2. Preparar o banco
   
   Criar tcc_streaming e importar o esquema e os dados.
3. Compilar a aplicação
   
   mvn -DskipTests package
4. Executar os servidores
   
   Iniciar as configurações de execução utilizadas no experimento.
5. Executar os testes de carga
   
   Utilizar os planos JMeter.
6. Gerar os resultados
   
   Executar o relatório Python e analisar os dados e gravações JFR.

