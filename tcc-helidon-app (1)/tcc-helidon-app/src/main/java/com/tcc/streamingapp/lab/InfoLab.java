package com.tcc.streamingapp.lab;

/** Foto do ambiente: máquina, JVM, scheduler das Virtual Threads, pool Hikari e semáforo. */
public record InfoLab(
        String javaVersion,
        int cpus,
        boolean threadDaRequisicaoEhVirtual,
        String schedulerParallelism,
        String schedulerMaxPoolSize,
        long heapUsadoMb,
        long heapMaxMb,
        int picoConcorrencia,
        int emAndamento,
        long totalExecucoes,
        long registrosSynchronized,
        long registrosLock,
        Integer hikariMaxPool,
        Integer hikariAtivas,
        Integer hikariOciosas,
        Integer hikariThreadsAguardando,
        int semaforoDbPermitsTotal,
        int semaforoDbPermitsLivres) {
}
