package com.tcc.streamingapp.lab;

import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;
import java.util.concurrent.locks.ReentrantLock;

/**
 * Cargas sintéticas do laboratório (portadas de ThreadBenchmark e ThreadPinningDemo,
 * do repositório java-virtual-threads-pitfalls).
 *
 * Classe Java pura, sem dependência do Spring, para poder ser testada isoladamente.
 * O estado compartilhado (monitor, lock, contadores) é de propósito: é ele que
 * produz o pinning e permite medir a concorrência real atingida.
 */
public class LabWorkloads {

    /** Teto de segurança para não deixar uma requisição presa por tempo absurdo. */
    public static final int LIMITE_MS = 10_000;
    public static final int LIMITE_ITERACOES = 10_000_000;

    @FunctionalInterface
    private interface Trabalho {
        double executar() throws InterruptedException;
    }

    // --- estado compartilhado dos cenários de pinning -------------------------------
    private final Object monitor = new Object();
    private final ReentrantLock lock = new ReentrantLock();
    private volatile long registrosSynchronized; // escrito só dentro do synchronized
    private volatile long registrosLock;         // escrito só com o lock adquirido

    // --- instrumentação de concorrência ---------------------------------------------
    private final AtomicInteger emAndamento = new AtomicInteger();
    private final AtomicInteger pico = new AtomicInteger();
    private final AtomicLong totalExecucoes = new AtomicLong();
    @SuppressWarnings("unused")
    private volatile double sorvedouro; // impede o JIT de eliminar o loop de CPU

    // =================================================================================
    // CENÁRIOS
    // =================================================================================

    /** I/O-bound: Thread.sleep simula uma query/HTTP. Virtual Thread é desmontada aqui. */
    public ResultadoLab io(int ms) throws InterruptedException {
        int espera = limitar(ms, LIMITE_MS);
        return executar("io", () -> {
            Thread.sleep(espera);
            return 1;
        });
    }

    /** CPU-bound: loop aritmético. Nunca desmonta; disputa as carrier threads. */
    public ResultadoLab cpu(int iteracoes) throws InterruptedException {
        int n = limitar(iteracoes, LIMITE_ITERACOES);
        return executar("cpu", () -> loopAritmetico(n));
    }

    /** I/O seguido de CPU (Cenário B do benchmark original). */
    public ResultadoLab ioMaisCpu(int ms, int iteracoes) throws InterruptedException {
        int espera = limitar(ms, LIMITE_MS);
        int n = limitar(iteracoes, LIMITE_ITERACOES);
        return executar("io-cpu", () -> {
            Thread.sleep(espera);
            return loopAritmetico(n);
        });
    }

    /**
     * PINNING: o I/O acontece DENTRO de synchronized. Em Java 21 a Virtual Thread não
     * consegue desmontar, prende a carrier e, como o monitor é único, tudo vira serial.
     */
    public ResultadoLab pinningSynchronized(int ms) throws InterruptedException {
        int espera = limitar(ms, LIMITE_MS);
        return executar("pinning-synchronized", () -> {
            synchronized (monitor) {
                Thread.sleep(espera);
                registrosSynchronized++;
            }
            return 1;
        });
    }

    /** CORREÇÃO: I/O fora do lock; o ReentrantLock protege só a seção crítica em memória. */
    public ResultadoLab pinningLock(int ms) throws InterruptedException {
        int espera = limitar(ms, LIMITE_MS);
        return executar("pinning-lock", () -> {
            Thread.sleep(espera);
            lock.lock();
            try {
                registrosLock++;
            } finally {
                lock.unlock();
            }
            return 1;
        });
    }

    // =================================================================================
    // MEDIÇÃO DO TETO (CPU)
    // =================================================================================

    /** Tempo médio, em ms, de UM loop aritmético com a máquina ociosa (após aquecimento). */
    public double medirTempoCpuMs(int iteracoes) {
        int n = limitar(iteracoes, LIMITE_ITERACOES);
        for (int i = 0; i < 30; i++) {
            sorvedouro = loopAritmetico(n);
        }
        final int rodadas = 30;
        long inicio = System.nanoTime();
        for (int i = 0; i < rodadas; i++) {
            sorvedouro = loopAritmetico(n);
        }
        return (System.nanoTime() - inicio) / 1_000_000.0 / rodadas;
    }

    // =================================================================================
    // ESTADO / INSTRUMENTAÇÃO
    // =================================================================================

    public int picoConcorrencia()       { return pico.get(); }
    public int emAndamento()            { return emAndamento.get(); }
    public long totalExecucoes()        { return totalExecucoes.get(); }
    public long registrosSynchronized() { return registrosSynchronized; }
    public long registrosLock()         { return registrosLock; }

    public void resetar() {
        pico.set(emAndamento.get());
        totalExecucoes.set(0);
        registrosSynchronized = 0;
        registrosLock = 0;
    }

    // =================================================================================
    // INTERNOS
    // =================================================================================

    private ResultadoLab executar(String cenario, Trabalho trabalho) throws InterruptedException {
        int atual = emAndamento.incrementAndGet();
        pico.accumulateAndGet(atual, Math::max);
        totalExecucoes.incrementAndGet();
        long inicio = System.nanoTime();
        try {
            sorvedouro = trabalho.executar();
            Thread t = Thread.currentThread();
            return new ResultadoLab(
                    cenario,
                    t.isVirtual(),
                    t.toString(),
                    (System.nanoTime() - inicio) / 1_000_000,
                    pico.get());
        } finally {
            emAndamento.decrementAndGet();
        }
    }

    private static double loopAritmetico(int iteracoes) {
        double r = 0;
        for (int i = 0; i < iteracoes; i++) {
            r += Math.sqrt(i) * Math.sin(i);
        }
        return r;
    }

    private static int limitar(int valor, int maximo) {
        return Math.max(0, Math.min(valor, maximo));
    }
}
