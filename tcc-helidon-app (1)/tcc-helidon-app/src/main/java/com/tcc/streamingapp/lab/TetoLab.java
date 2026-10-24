package com.tcc.streamingapp.lab;

/**
 * Tetos "otimistas" de vazão (req/s): o máximo teórico, ignorando overhead de HTTP,
 * GC e escalonamento. Se a vazão medida no JMeter passar disso, há erro de medição.
 */
public record TetoLab(
        int concorrencia,
        int latenciaMs,
        int iteracoes,
        int cpus,
        int schedulerParallelism,
        double tempoCpuMsMedido,
        double tetoIoReqPorSeg,
        double tetoCpuReqPorSeg,
        double tetoIoMaisCpuReqPorSeg,
        String gargaloIoMaisCpu,
        double tetoPinningSynchronizedReqPorSeg,
        Double tetoBancoReqPorSeg,
        String observacao) {
}
