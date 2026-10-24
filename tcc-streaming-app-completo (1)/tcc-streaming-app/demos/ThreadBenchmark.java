import java.time.Duration;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.Executors;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;

/**

 * Platform Threads vs Virtual Threads — Benchmark Comparativo


 * Pré-requisito: Java 21+
 * Como rodar:    java ThreadBenchmark.java

 * O que este benchmark mede:
 *   - Tempo total de execução
 *   - Throughput (requisições/segundo)
 *   - Memória consumida (antes e depois de cada rodada)
 *   - Número de threads criadas

 * Dois cenários de carga:
 *   - Cenário A: I/O puro (simula latência de banco/HTTP)
 *   - Cenário B: I/O + trabalho em memória (simula processamento real)

 * =============================================================================
 */
public class ThreadBenchmark {

    // =================================================
    //   CONFIGURAÇÕES — ajuste aqui antes de rodar
    // =================================================

    /** Volumes de requisições simultâneas a testar em sequência. */
    private static final int[] WORKLOADS = { 100, 500, 1_000, 5_000, 10_000 };

    /** Latência simulada de I/O em milissegundos (ex: query ao banco, HTTP externo). */
    private static final int IO_LATENCY_MS = 100;

    /** Número de operações de trabalho em memória no Cenário B (iterações de cálculo). */
    private static final int CPU_WORK_ITERATIONS = 50_000;

    /** Número de warm-up rounds antes de medir (descartados do relatório). */
    private static final int WARMUP_ROUNDS = 1;

    // =======================================
    // PONTO DE ENTRADA
    // =======================================

    public static void main(String[] args) throws InterruptedException {

        printHeader();

        // Warm-up: prepara a JVM antes de medir
        if (WARMUP_ROUNDS > 0) {
            System.out.println("   Aquecendo a JVM (" + WARMUP_ROUNDS + " rodada(s) descartada(s))...\n");
            for (int i = 0; i < WARMUP_ROUNDS; i++) {
                runSilent(100, Scenario.IO_ONLY);
                runSilent(100, Scenario.IO_PLUS_CPU);
            }
        }

        // ---- Cenário A: I/O puro ----
        printScenarioHeader(
                "CENÁRIO A — I/O Puro",
                "Simula chamadas a banco de dados ou APIs externas (Thread.sleep de " + IO_LATENCY_MS + "ms).",
                "Aqui o ganho das Virtual Threads é mais expressivo: elas são desmontadas\n" +
                        "  durante o I/O e a Carrier Thread fica livre para executar outras."
        );

        List<BenchmarkResult> resultsA_platform = new ArrayList<>();
        List<BenchmarkResult> resultsA_virtual  = new ArrayList<>();

        for (int load : WORKLOADS) {
            resultsA_platform.add(run(load, ThreadType.PLATFORM, Scenario.IO_ONLY));
            resultsA_virtual.add(run(load, ThreadType.VIRTUAL, Scenario.IO_ONLY));
            System.out.println();
        }

        // ---- Cenário B: I/O + CPU ----
        printScenarioHeader(
                "CENÁRIO B — I/O + Trabalho em Memória",
                "Simula processamento real: I/O (" + IO_LATENCY_MS + "ms) + " + CPU_WORK_ITERATIONS + " iterações de cálculo em memória.",
                "Mostra que Virtual Threads não são bala de prata para cargas CPU-bound:\n" +
                        "  o ganho existe, mas é menos dramático."
        );

        List<BenchmarkResult> resultsB_platform = new ArrayList<>();
        List<BenchmarkResult> resultsB_virtual  = new ArrayList<>();

        for (int load : WORKLOADS) {
            resultsB_platform.add(run(load, ThreadType.PLATFORM, Scenario.IO_PLUS_CPU));
            resultsB_virtual.add(run(load, ThreadType.VIRTUAL, Scenario.IO_PLUS_CPU));
            System.out.println();
        }

        // ---- Relatório final ----
        printFinalReport(resultsA_platform, resultsA_virtual, "CENÁRIO A — I/O Puro");
        printFinalReport(resultsB_platform, resultsB_virtual, "CENÁRIO B — I/O + Trabalho em Memória");

        printConclusion();
    }

    // =========================================================================
    // ENGINE DE EXECUÇÃO
    // =========================================================================

    enum ThreadType { PLATFORM, VIRTUAL }
    enum Scenario   { IO_ONLY, IO_PLUS_CPU }

    record BenchmarkResult(
            int         requests,
            ThreadType  threadType,
            Scenario    scenario,
            long        elapsedMs,
            double      throughput,
            long        memoryBeforeMb,
            long        memoryAfterMb,
            long        memoryDeltaMb,
            int         threadsCreated
    ) {}

    /** Roda uma medição completa e imprime progresso em tempo real. */
    private static BenchmarkResult run(int requests, ThreadType type, Scenario scenario)
            throws InterruptedException {

        String label = type == ThreadType.PLATFORM ? "Platform Threads" : "Virtual Threads ";
        System.out.printf("  [%-16s | %6d req] Iniciando...%n", label, requests);

        System.gc();
        Thread.sleep(100); // deixa o GC trabalhar antes de medir

        Runtime runtime = Runtime.getRuntime();
        long memBefore = usedMemoryMb(runtime);

        AtomicInteger threadsCreated = new AtomicInteger(0);
        AtomicLong    totalWork      = new AtomicLong(0); // evita dead-code elimination
        CountDownLatch latch         = new CountDownLatch(requests);

        Instant start = Instant.now();

        try (var executor = type == ThreadType.PLATFORM
                ? Executors.newThreadPerTaskExecutor(
                Thread.ofPlatform().factory())       // 1 platform thread por tarefa
                : Executors.newVirtualThreadPerTaskExecutor()) {

            for (int i = 0; i < requests; i++) {
                executor.submit(() -> {
                    threadsCreated.incrementAndGet();
                    try {
                        totalWork.addAndGet(executeWork(scenario));
                    } catch (InterruptedException e) {
                        Thread.currentThread().interrupt();
                    } finally {
                        latch.countDown();
                    }
                });
            }

            latch.await();
        }

        long elapsedMs  = Duration.between(start, Instant.now()).toMillis();
        long memAfter   = usedMemoryMb(runtime);
        double throughput = requests / (elapsedMs / 1000.0);

        BenchmarkResult result = new BenchmarkResult(
                requests, type, scenario,
                elapsedMs, throughput,
                memBefore, memAfter,
                memAfter - memBefore,
                threadsCreated.get()
        );

        printRunResult(result);
        return result;
    }

    /** Executa o trabalho do cenário e retorna um valor para evitar otimização do compilador. */
    private static long executeWork(Scenario scenario) throws InterruptedException {
        // I/O simulado — ponto de desmontagem para Virtual Threads
        Thread.sleep(IO_LATENCY_MS);

        if (scenario == Scenario.IO_PLUS_CPU) {
            // Trabalho em memória: simula processamento após receber dados do banco/API
            long result = 0;
            for (int i = 0; i < CPU_WORK_ITERATIONS; i++) {
                result += Math.sqrt(i) * Math.sin(i);
            }
            return result;
        }
        return 1L;
    }

    /** Versão silenciosa para warm-up. */
    private static void runSilent(int requests, Scenario scenario) throws InterruptedException {
        CountDownLatch latch = new CountDownLatch(requests);
        try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
            for (int i = 0; i < requests; i++) {
                executor.submit(() -> {
                    try { executeWork(scenario); }
                    catch (InterruptedException e) { Thread.currentThread().interrupt(); }
                    finally { latch.countDown(); }
                });
            }
            latch.await();
        }
    }

    // =========================================================================
    // RELATÓRIO
    // =========================================================================

    private static void printRunResult(BenchmarkResult r) {
        System.out.printf(
                "  [%-16s | %6d req] ✅ %5dms | %7.1f req/s | mem: %+3dMB | threads: %d%n",
                r.threadType() == ThreadType.PLATFORM ? "Platform Threads" : "Virtual Threads ",
                r.requests(),
                r.elapsedMs(),
                r.throughput(),
                r.memoryDeltaMb(),
                r.threadsCreated()
        );
    }

    private static void printFinalReport(
            List<BenchmarkResult> platform,
            List<BenchmarkResult> virtual,
            String scenarioTitle) {

        System.out.println("\n" + "═".repeat(78));
        System.out.println("  📊 RELATÓRIO COMPARATIVO — " + scenarioTitle);
        System.out.println("═".repeat(78));
        System.out.printf(
                "  %-8s │ %-10s %-10s │ %-14s %-14s │ %-12s %-12s%n",
                "Reqs", "Tempo (PT)", "Tempo (VT)", "Thrput (PT)", "Thrput (VT)", "Mem (PT)", "Mem (VT)"
        );
        System.out.println("  " + "─".repeat(76));

        for (int i = 0; i < platform.size(); i++) {
            BenchmarkResult pt = platform.get(i);
            BenchmarkResult vt = virtual.get(i);

            double speedup     = (double) pt.elapsedMs() / vt.elapsedMs();
            double thrputGain  = ((vt.throughput() - pt.throughput()) / pt.throughput()) * 100;

            System.out.printf(
                    "  %-8d │ %7dms    %7dms  │ %8.1f/s     %8.1f/s  │ %+6dMB      %+6dMB%n",
                    pt.requests(),
                    pt.elapsedMs(),  vt.elapsedMs(),
                    pt.throughput(), vt.throughput(),
                    pt.memoryDeltaMb(), vt.memoryDeltaMb()
            );
            System.out.printf(
                    "           │  VT foi %.1fx mais rápido │ Throughput: %+.0f%%                     │%n",
                    speedup, thrputGain
            );
            System.out.println("  " + "─".repeat(76));
        }
    }

    private static void printConclusion() {
        System.out.println("\n" + "═".repeat(78));
        System.out.println("   INTERPRETANDO OS RESULTADOS");
        System.out.println("═".repeat(78));
        System.out.println("""
          Platform Threads bloqueiam a thread do SO durante o I/O.
          Com muitas requisições, a fila cresce e o tempo escala linearmente.

          Virtual Threads são desmontadas durante o I/O — a Carrier Thread fica
          livre para executar outras. O tempo não escala da mesma forma.

          ⚠️  Mas atenção aos números de memória:
            - Platform Threads: stack (~1MB) fora da Heap → pressão no SO
            - Virtual Threads:  stack na Heap             → pressão no GC

          Em cargas CPU-bound (Cenário B), o ganho é menor porque o gargalo
          não é o bloqueio de I/O, e sim o número de Carrier Threads disponíveis.

          ─────────────────────────────────────────────────────────────────────
          Regra de ouro: Virtual Threads brilham em I/O-bound.
                         Para CPU-bound, avalie com cuidado.
          ═════════════════════════════════════════════════════════════════════
        """);
    }

    // =========================================================================
    // UTILITÁRIOS
    // =========================================================================

    private static long usedMemoryMb(Runtime runtime) {
        return (runtime.totalMemory() - runtime.freeMemory()) / (1024 * 1024);
    }

    private static void printHeader() {
        System.out.println("\n" + "═".repeat(78));
        System.out.println("  ⚡ Platform Threads vs Virtual Threads — Benchmark Comparativo");
        System.out.println("  Java " + System.getProperty("java.version"));
        System.out.println("  CPUs disponíveis: " + Runtime.getRuntime().availableProcessors());
        System.out.printf ("  Latência I/O simulada: %dms | CPU work: %,d iterações%n",
                IO_LATENCY_MS, CPU_WORK_ITERATIONS);
        System.out.println("═".repeat(78) + "\n");
    }

    private static void printScenarioHeader(String title, String desc, String note) {
        System.out.println("\n" + "─".repeat(78));
        System.out.println("   " + title);
        System.out.println("  " + desc);
        System.out.println("  " + note);
        System.out.println("─".repeat(78) + "\n");
    }
}