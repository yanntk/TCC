package com.tcc.streamingapp.lab;

import com.tcc.streamingapp.dto.TituloDetalhesResponse;
import com.tcc.streamingapp.service.TituloService;
import com.zaxxer.hikari.HikariDataSource;
import com.zaxxer.hikari.HikariPoolMXBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.sql.DataSource;
import java.sql.SQLException;
import java.util.concurrent.Semaphore;
import java.util.concurrent.TimeUnit;

/**
 * Fachada do laboratório: junta as cargas sintéticas (LabWorkloads) com o fluxo real
 * do app (TituloService / banco), o "porteiro" Semaphore e os cálculos de teto.
 */
@Service
public class LabService {

    /** TituloService.buscarDetalhes faz 4 consultas JDBC sequenciais por requisição. */
    private static final int CONSULTAS_POR_REQUISICAO = 4;

    private final LabWorkloads workloads = new LabWorkloads();
    private final TituloService tituloService;
    private final DataSource dataSource;
    private final Semaphore semaforoDb;
    private final int permitsDb;
    private final long semaforoTimeoutMs;

    public LabService(TituloService tituloService,
                      DataSource dataSource,
                      @Value("${lab.db.permits:30}") int permitsDb,
                      @Value("${lab.db.semaforo-timeout-ms:10000}") long semaforoTimeoutMs) {
        this.tituloService = tituloService;
        this.dataSource = dataSource;
        this.permitsDb = permitsDb;
        this.semaforoDb = new Semaphore(permitsDb, true); // fair: fila FIFO, latência previsível
        this.semaforoTimeoutMs = semaforoTimeoutMs;
    }

    public LabWorkloads workloads() {
        return workloads;
    }

    // ---------------------------------------------------------------------------------
    // Fluxo real do app com porteiro
    // ---------------------------------------------------------------------------------

    /**
     * Mesmo fluxo de GET /titulos/{id}/detalhes, mas com no máximo {@code lab.db.permits}
     * requisições dentro do banco ao mesmo tempo. As demais esperam desmontadas (sem
     * ocupar carrier). Comparar com o endpoint original mostra o efeito manada.
     */
    public TituloDetalhesResponse detalhesComSemaforo(long id) {
        try {
            if (!semaforoDb.tryAcquire(semaforoTimeoutMs, TimeUnit.MILLISECONDS)) {
                throw new ResponseStatusException(HttpStatus.SERVICE_UNAVAILABLE,
                        "Semáforo do banco saturado (timeout de " + semaforoTimeoutMs + "ms)");
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new ResponseStatusException(HttpStatus.SERVICE_UNAVAILABLE, "Requisição interrompida");
        }
        try {
            return tituloService.buscarDetalhes(id);
        } finally {
            semaforoDb.release();
        }
    }

    // ---------------------------------------------------------------------------------
    // Ambiente
    // ---------------------------------------------------------------------------------

    public InfoLab info() {
        Runtime rt = Runtime.getRuntime();
        Integer max = null, ativas = null, ociosas = null, aguardando = null;
        HikariDataSource hikari = hikari();
        if (hikari != null) {
            max = hikari.getMaximumPoolSize();
            HikariPoolMXBean pool = hikari.getHikariPoolMXBean(); // null até a 1ª conexão
            if (pool != null) {
                ativas = pool.getActiveConnections();
                ociosas = pool.getIdleConnections();
                aguardando = pool.getThreadsAwaitingConnection();
            }
        }
        return new InfoLab(
                System.getProperty("java.version"),
                rt.availableProcessors(),
                Thread.currentThread().isVirtual(),
                System.getProperty("jdk.virtualThreadScheduler.parallelism", "padrão (= nº de CPUs)"),
                System.getProperty("jdk.virtualThreadScheduler.maxPoolSize", "padrão (256)"),
                (rt.totalMemory() - rt.freeMemory()) / (1024 * 1024),
                rt.maxMemory() / (1024 * 1024),
                workloads.picoConcorrencia(),
                workloads.emAndamento(),
                workloads.totalExecucoes(),
                workloads.registrosSynchronized(),
                workloads.registrosLock(),
                max, ativas, ociosas, aguardando,
                permitsDb,
                semaforoDb.availablePermits());
    }

    // ---------------------------------------------------------------------------------
    // Teto otimista (Lei de Little: vazão máxima = concorrência / latência)
    // ---------------------------------------------------------------------------------

    /** Rode com a máquina ociosa: mede o tempo do loop de CPU nesta JVM. */
    public TetoLab teto(int concorrencia, int latenciaMs, int iteracoes, int dbMs) {
        int cpus = Runtime.getRuntime().availableProcessors();
        int parallelism = Integer.getInteger("jdk.virtualThreadScheduler.parallelism", cpus);
        int conc = Math.max(1, concorrencia);
        int lat = Math.max(1, latenciaMs);

        double tempoCpuMs = Math.max(0.001, workloads.medirTempoCpuMs(iteracoes));

        // I/O puro: só a concorrência limita. Com 200 VTs e 100ms => 2000 req/s.
        double tetoIo = conc * 1000.0 / lat;

        // CPU puro: limitado pelas carrier threads (uma por CPU, a menos que o parallelism mude).
        double tetoCpu = Math.min(cpus, parallelism) * 1000.0 / tempoCpuMs;

        // I/O + CPU: vale o menor entre o limite por latência total e o limite de CPU.
        double tetoPorLatencia = conc * 1000.0 / (lat + tempoCpuMs);
        double tetoIoCpu = Math.min(tetoPorLatencia, tetoCpu);
        String gargalo = tetoCpu < tetoPorLatencia ? "CPU (carrier threads)" : "latência/concorrência";

        // synchronized + I/O com monitor único: execução serial => 1 requisição por 'lat' ms.
        double tetoPinningSync = 1000.0 / lat;

        // Banco: pool Hikari limita as consultas simultâneas; cada requisição faz 4 consultas.
        Double tetoBanco = null;
        HikariDataSource hikari = hikari();
        if (dbMs > 0 && hikari != null) {
            int simultaneas = Math.min(hikari.getMaximumPoolSize(), conc);
            tetoBanco = simultaneas * 1000.0 / (CONSULTAS_POR_REQUISICAO * dbMs);
        }

        return new TetoLab(conc, lat, iteracoes, cpus, parallelism, tempoCpuMs,
                round(tetoIo), round(tetoCpu), round(tetoIoCpu), gargalo,
                round(tetoPinningSync), tetoBanco == null ? null : round(tetoBanco),
                "Teto otimista: ignora HTTP, GC e escalonamento. Vazão medida acima dele indica erro de medição.");
    }

    // ---------------------------------------------------------------------------------

    private HikariDataSource hikari() {
        try {
            if (dataSource.isWrapperFor(HikariDataSource.class)) {
                return dataSource.unwrap(HikariDataSource.class);
            }
        } catch (SQLException ignorada) {
            // DataSource não é Hikari: seguimos sem as métricas do pool
        }
        return null;
    }

    private static double round(double v) {
        return Math.round(v * 100.0) / 100.0;
    }
}
