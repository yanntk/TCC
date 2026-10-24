package com.tcc.streamingapp.lab;

/**
 * Resposta padrão dos endpoints de carga sintética.
 *
 * @param cenario          nome do cenário executado (io, cpu, io-cpu, pinning-synchronized...)
 * @param threadVirtual    true se a requisição foi atendida por uma Virtual Thread
 * @param thread           Thread.toString() — para virtual mostra a carrier (ForkJoinPool-1-worker-N)
 * @param duracaoMs        tempo gasto dentro do handler
 * @param picoConcorrencia maior nº de execuções simultâneas observado desde o último /lab/reset
 */
public record ResultadoLab(
        String cenario,
        boolean threadVirtual,
        String thread,
        long duracaoMs,
        int picoConcorrencia) {
}
