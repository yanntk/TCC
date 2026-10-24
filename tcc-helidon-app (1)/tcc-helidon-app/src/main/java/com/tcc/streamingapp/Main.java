package com.tcc.streamingapp;

import com.tcc.streamingapp.dto.TituloDetalhesResponse;
import com.tcc.streamingapp.exception.TituloNaoEncontradoException;
import com.tcc.streamingapp.lab.InfoLab;
import com.tcc.streamingapp.lab.LabService;
import com.tcc.streamingapp.lab.ResultadoLab;
import com.tcc.streamingapp.lab.TetoLab;
import com.tcc.streamingapp.repository.TituloRepository;
import com.tcc.streamingapp.service.TituloService;
import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import io.helidon.config.Config;
import io.helidon.logging.common.LogConfig;
import io.helidon.webserver.WebServer;
import io.helidon.webserver.http.HttpRouting;
import io.helidon.webserver.http.ServerRequest;
import io.helidon.webserver.http.ServerResponse;

/**
 * Helidon SE — equivalente ao StreamingAppApplication + controllers do Spring Boot.
 * Porta 8081 para rodar em paralelo com o Spring (8080).
 *
 * Endpoints (iguais ao Spring):
 *   GET  /titulos/{id}/detalhes
 *   GET  /lab/io?ms=100
 *   GET  /lab/cpu?iteracoes=50000
 *   GET  /lab/io-cpu?ms=100&iteracoes=50000
 *   GET  /lab/pinning/synchronized?ms=300
 *   GET  /lab/pinning/lock?ms=300
 *   GET  /lab/db/{id}/com-semaforo
 *   GET  /lab/info
 *   GET  /lab/teto?concorrencia=200&latenciaMs=100&iteracoes=50000&dbMs=0
 *   POST /lab/reset
 */
public final class Main {

    private Main() {
    }

    public static void main(String[] args) {
        LogConfig.configureRuntime();

        Config config = Config.create();
        Config.global(config);

        // --- HikariCP (mesmas configurações do Spring) ---
        Config db = config.get("db");
        HikariConfig hikariCfg = new HikariConfig();
        hikariCfg.setJdbcUrl(db.get("url").asString().orElse("jdbc:postgresql://localhost:5432/tcc_streaming"));
        hikariCfg.setUsername(db.get("username").asString().orElse("postgres"));
        hikariCfg.setPassword(db.get("password").asString().orElse("postgres"));
        hikariCfg.setMaximumPoolSize(db.get("maximum-pool-size").asInt().orElse(30));
        hikariCfg.setMinimumIdle(db.get("minimum-idle").asInt().orElse(5));
        hikariCfg.setConnectionTimeout(db.get("connection-timeout").asLong().orElse(5000L));
        hikariCfg.setPoolName("tcc-helidon-pool");
        hikariCfg.setInitializationFailTimeout(-1); // sobe mesmo se o PG ainda não estiver no ar
        HikariDataSource dataSource = new HikariDataSource(hikariCfg);

        // --- Camada de negócio (instanciação manual — sem @Autowired) ---
        TituloRepository repository = new TituloRepository(dataSource);
        TituloService tituloService = new TituloService(repository);

        Config labDb = config.get("lab").get("db");
        int permits = labDb.get("permits").asInt().orElse(30);
        long timeoutMs = labDb.get("semaforo-timeout-ms").asLong().orElse(10_000L);
        LabService labService = new LabService(tituloService, dataSource, permits, timeoutMs);

        int port = config.get("server").get("port").asInt().orElse(8081);

        WebServer server = WebServer.builder()
                .port(port)
                .routing(r -> routing(r, tituloService, labService))
                .build()
                .start();

        System.out.println("Helidon SE no ar! http://localhost:" + server.port());
        System.out.println("  GET /titulos/{id}/detalhes");
        System.out.println("  GET /lab/info");
        System.out.println("  GET /lab/io | /lab/cpu | /lab/io-cpu | /lab/pinning/* | /lab/db/{id}/com-semaforo");
    }

    static void routing(HttpRouting.Builder routing,
                        TituloService tituloService,
                        LabService labService) {

        // ----- Títulos -----
        routing.get("/titulos/{id}/detalhes", (req, res) -> {
            try {
                long id = Long.parseLong(req.path().pathParameters().get("id"));
                TituloDetalhesResponse detalhes = tituloService.buscarDetalhes(id);
                res.send(detalhes);
            } catch (TituloNaoEncontradoException e) {
                res.status(404).send(e.getMessage());
            } catch (NumberFormatException e) {
                res.status(400).send("id inválido");
            } catch (Exception e) {
                res.status(500).send("erro interno: " + e.getMessage());
            }
        });

        // ----- Lab: cargas sintéticas -----
        routing.get("/lab/io", (req, res) -> {
            try {
                int ms = queryInt(req, "ms", 100);
                ResultadoLab r = labService.workloads().io(ms);
                res.send(r);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                res.status(503).send("interrompido");
            }
        });

        routing.get("/lab/cpu", (req, res) -> {
            try {
                int iteracoes = queryInt(req, "iteracoes", 50_000);
                ResultadoLab r = labService.workloads().cpu(iteracoes);
                res.send(r);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                res.status(503).send("interrompido");
            }
        });

        routing.get("/lab/io-cpu", (req, res) -> {
            try {
                int ms = queryInt(req, "ms", 100);
                int iteracoes = queryInt(req, "iteracoes", 50_000);
                ResultadoLab r = labService.workloads().ioMaisCpu(ms, iteracoes);
                res.send(r);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                res.status(503).send("interrompido");
            }
        });

        routing.get("/lab/pinning/synchronized", (req, res) -> {
            try {
                int ms = queryInt(req, "ms", 300);
                ResultadoLab r = labService.workloads().pinningSynchronized(ms);
                res.send(r);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                res.status(503).send("interrompido");
            }
        });

        routing.get("/lab/pinning/lock", (req, res) -> {
            try {
                int ms = queryInt(req, "ms", 300);
                ResultadoLab r = labService.workloads().pinningLock(ms);
                res.send(r);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                res.status(503).send("interrompido");
            }
        });

        // ----- Lab: banco com semáforo -----
        routing.get("/lab/db/{id}/com-semaforo", (req, res) -> {
            try {
                long id = Long.parseLong(req.path().pathParameters().get("id"));
                TituloDetalhesResponse detalhes = labService.detalhesComSemaforo(id);
                res.send(detalhes);
            } catch (TituloNaoEncontradoException e) {
                res.status(404).send(e.getMessage());
            } catch (RuntimeException e) {
                if (e.getMessage() != null && e.getMessage().startsWith("SEM_PERMITS")) {
                    res.status(503).send(e.getMessage());
                } else {
                    res.status(500).send(e.getMessage());
                }
            } catch (Exception e) {
                res.status(500).send("erro interno: " + e.getMessage());
            }
        });

        // ----- Lab: info / teto / reset -----
        routing.get("/lab/info", (req, res) -> {
            InfoLab info = labService.info();
            res.send(info);
        });

        routing.get("/lab/teto", (req, res) -> {
            int concorrencia = queryInt(req, "concorrencia", 200);
            int latenciaMs = queryInt(req, "latenciaMs", 100);
            int iteracoes = queryInt(req, "iteracoes", 50_000);
            int dbMs = queryInt(req, "dbMs", 0);
            TetoLab teto = labService.teto(concorrencia, latenciaMs, iteracoes, dbMs);
            res.send(teto);
        });

        routing.post("/lab/reset", (req, res) -> {
            labService.workloads().resetar();
            res.send(labService.info());
        });
    }

    private static int queryInt(ServerRequest req, String name, int defaultValue) {
        return req.query().first(name).map(Integer::parseInt).orElse(defaultValue);
    }
}
