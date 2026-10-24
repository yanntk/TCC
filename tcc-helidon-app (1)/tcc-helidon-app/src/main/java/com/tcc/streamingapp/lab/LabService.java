package com.tcc.streamingapp.lab;

import com.tcc.streamingapp.dto.TituloDetalhesResponse;
import com.tcc.streamingapp.service.TituloService;
import com.zaxxer.hikari.HikariDataSource;
import com.zaxxer.hikari.HikariPoolMXBean;

import javax.sql.DataSource;
import java.util.concurrent.Semaphore;
import java.util.concurrent.TimeUnit;

/**
 * Fachada do laboratório (versão Helidon SE — sem Spring).
 * Junta LabWorkloads + fluxo real do banco + semáforo "porteiro".
 */
public class LabService {

    private static final int CONSULTAS_POR_REQUISICAO = 4;

    private final LabWorkloads workloads = new LabWorkloads();
    private final TituloService tituloService;
    private final DataSource dataSource;
    private final Semaphore semaforoDb;
    private final int permitsDb;
    private final long semaforoTimeoutMs;

    public LabService(TituloService tituloService,
                      DataSource dataSource,
                      int permitsDb,
                      long semaforoTimeoutMs) {
        this.tituloService = tituloService;
        this.dataSource = dataSource;
        this.permitsDb = permitsDb;
        this.semaforoDb = new Semaphore(permitsDb, true);
        this.semaforoTimeoutMs = semaforoTimeoutMs;
    }

    public LabWorkloads workloads() {
        return workloads;
    }

    /**
     * Mesmo fluxo de GET /titulos/{id}/detalhes, com limite de concorrência no banco.
     * Lança RuntimeException com mensagem "SEM_PERMITS" se o semáforo saturar (mapeado para 503).
     */
    public TituloDetalhesResponse detalhesComSemaforo(long id) {
        try {
            if (!semaforoDb.tryAcquire(semaforoTimeoutMs, TimeUnit.MILLISECONDS)) {
                throw new RuntimeException("SEM_PERMITS: Semáforo do banco saturado (timeout de "
                        + semaforoTimeoutMs + "ms)");
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new RuntimeException("SEM_PERMITS: Requisição interrompida");
        }
        try {
            return tituloService.buscarDetalhes(id);
        } finally {
            semaforoDb.release();
        }
    }

    public InfoLab info() {
        Runtime rt = Runtime.getRuntime();
        Integer max = null, ativas = null, ociosas = null, aguardando = null;
        HikariDataSource hikari = hikari();
        if (hikari != null) {
            max = hikari.getMaximumPoolSize();
            HikariPoolMXBean pool = hikari.getHikariPoolMXBean();
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

    public TetoLab teto(int concorrencia, int latenciaMs, int iteracoes, int dbMs) {
        int cpus = Runtime.getRuntime().availableProcessors();
        int parallelism = Integer.getInteger("jdk.virtualThreadScheduler.parallelism", cpus);
        int conc = Math.max(1, concorrencia);
        int lat = Math.max(1, latenciaMs);

        double tempoCpuMs = Math.max(0.001, workloads.medirTempoCpuMs(iteracoes));

        double tetoIo = conc * 1000.0 / lat;
        double tetoCpu = Math.min(cpus, parallelism) * 1000.0 / tempoCpuMs;
        double tetoPorLatencia = conc * 1000.0 / (lat + tempoCpuMs);
        double tetoIoCpu = Math.min(tetoPorLatencia, tetoCpu);
        String gargalo = tetoCpu < tetoPorLatencia ? "CPU (carrier threads)" : "latência/concorrência";
        double tetoPinningSync = 1000.0 / lat;

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

    private HikariDataSource hikari() {
        if (dataSource instanceof HikariDataSource h) {
            return h;
        }
        try {
            if (dataSource.isWrapperFor(HikariDataSource.class)) {
                return dataSource.unwrap(HikariDataSource.class);
            }
        } catch (Exception ignored) {
        }
        return null;
    }

    private static double round(double v) {
        return Math.round(v * 100.0) / 100.0;
    }
}
