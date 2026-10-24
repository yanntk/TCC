import java.time.Instant;
import java.time.format.DateTimeFormatter;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.locks.ReentrantLock;

/**
 * =============================================================================
 * Thread Pinning — O Problema e a Solução
 * =============================================================================
 *
 * Pré-requisito: Java 21+
 * Como rodar:    java ThreadPinningDemo.java
 *
 * Para ver o pinning sendo reportado pela JVM, rode com a flag:
 *    java -Djdk.tracePinnedThreads=full ThreadPinningDemo.java
 *
 * O que este demo mostra:
 *   - Cenário 1: synchronized + I/O → Carrier Threads ficam presas (pinning)
 *                O throughput despenca porque as Carrier Threads não ficam
 *                livres para executar outras Virtual Threads.
 *
 *   - Cenário 2: ReentrantLock + I/O → Virtual Threads são desmontadas
 *                corretamente durante o I/O. Carrier Threads livres para
 *                executar outras. Throughput muito superior.
 *
 * =============================================================================
 */
public class ThreadPinningDemo {

    // =========================================================================
    // ⚙️  CONFIGURAÇÕES
    // =========================================================================

    /** Número de Virtual Threads disparadas simultaneamente. */
    private static final int CONCURRENT_REQUESTS = 20;

    /**
     * Latência simulada de I/O em milissegundos.
     * Representa uma query ao banco, chamada HTTP, leitura de arquivo etc.
     */
    private static final int IO_LATENCY_MS = 300;

    // =========================================================================
    // ESTADO COMPARTILHADO — simula um recurso com acesso concorrente
    // =========================================================================

    /** Simula um contador de registros processados (recurso compartilhado). */
    private static int processedRecords = 0;

    /** Lock para o Cenário 2 — substitui o synchronized. */
    private static final ReentrantLock lock = new ReentrantLock();

    /** Conta quantas threads completaram em cada cenário. */
    private static final AtomicInteger completedThreads = new AtomicInteger(0);

    // =========================================================================
    // PONTO DE ENTRADA
    // =========================================================================

    public static void main(String[] args) throws InterruptedException {

        printHeader();

        runScenario1_Pinning();

        Thread.sleep(500); // pausa para leitura entre os cenários
        System.out.println();

        runScenario2_ReentrantLock();

        printConclusion();
    }

    // =========================================================================
    // CENÁRIO 1 — synchronized + I/O = Thread Pinning
    // =========================================================================

    /**
     * O problema:
     *
     * O método é 'synchronized'. Quando a Virtual Thread entra nele e chama
     * Thread.sleep() (simulando I/O), ela NÃO consegue ser desmontada da
     * Carrier Thread. A Carrier Thread fica "pinada" — presa — esperando
     * o I/O terminar junto com a Virtual Thread.
     *
     * Como temos poucas Carrier Threads (= nº de CPUs), rapidamente todas
     * ficam pinadas. As demais Virtual Threads aguardam na fila sem conseguir
     * executar. O resultado: o tempo total escala com o número de threads,
     * exatamente como acontecia com Platform Threads.
     */
    private static synchronized void processWithSynchronized(int threadId)
            throws InterruptedException {

        log("🔒 Thread #" + threadId + " ENTROU no bloco synchronized");
        log("   Thread #" + threadId + " iniciando I/O (simulado)... [Carrier Thread PINADA aqui]");

        // ⚠️ Ponto crítico: dentro do synchronized, a Virtual Thread NÃO
        // consegue ser desmontada. A Carrier Thread fica bloqueada junto.
        Thread.sleep(IO_LATENCY_MS);

        processedRecords++;
        log("✅ Thread #" + threadId + " CONCLUIU — registros processados: " + processedRecords);
    }

    private static void runScenario1_Pinning() throws InterruptedException {
        processedRecords = 0;
        completedThreads.set(0);

        printScenarioHeader(
                "CENÁRIO 1 — synchronized + I/O (Thread Pinning)",
                "Cada Virtual Thread pina a Carrier Thread durante o I/O.",
                "Observe: as threads executam praticamente em série, não em paralelo."
        );

        CountDownLatch latch = new CountDownLatch(CONCURRENT_REQUESTS);
        long start = System.currentTimeMillis();

        for (int i = 1; i <= CONCURRENT_REQUESTS; i++) {
            final int threadId = i;
            Thread.ofVirtual()
                    .name("vt-pinning-" + threadId)
                    .start(() -> {
                        try {
                            processWithSynchronized(threadId);
                            completedThreads.incrementAndGet();
                        } catch (InterruptedException e) {
                            Thread.currentThread().interrupt();
                        } finally {
                            latch.countDown();
                        }
                    });
        }

        latch.await();
        long elapsed = System.currentTimeMillis() - start;

        printScenarioResult(elapsed, completedThreads.get(),
                "Com pinning, as Carrier Threads ficam presas durante o I/O.\n" +
                        "  O tempo total ≈ CONCURRENT_REQUESTS × IO_LATENCY (" +
                        CONCURRENT_REQUESTS + " × " + IO_LATENCY_MS + "ms = ~" +
                        (CONCURRENT_REQUESTS * IO_LATENCY_MS) + "ms esperado)."
        );
    }

    // =========================================================================
    // CENÁRIO 2 — ReentrantLock + I/O = Desmontagem correta
    // =========================================================================

    /**
     * A solução:
     *
     * Duas mudanças combinadas:
     *   1. Substituímos 'synchronized' por ReentrantLock.
     *   2. O I/O acontece FORA do lock — o lock protege apenas a seção
     *      crítica real: a atualização do contador (operação em memória, rápida).
     *
     * O que acontece agora:
     * 1. Virtual Thread inicia o I/O sem segurar nenhum lock
     * 2. JVM desmonta a Virtual Thread da Carrier Thread ← ponto chave
     * 3. Carrier Thread fica LIVRE para executar OUTRA Virtual Thread
     * 4. Todas as 20 threads fazem o I/O em paralelo (~300ms cada)
     * 5. Ao terminar o I/O, a VT adquire o lock, atualiza o contador e libera
     *
     * Resultado: o I/O de todas as threads ocorre concorrentemente.
     * O lock é disputado apenas por microssegundos, não por 300ms.
     */
    private static void processWithReentrantLock(int threadId)
            throws InterruptedException {

        log("⏳ Thread #" + threadId + " iniciando I/O... [Virtual Thread será DESMONTADA aqui]");

        // ✅ I/O fora do lock: todas as VTs executam este sleep concorrentemente.
        // Cada uma é desmontada da Carrier Thread e remontada ao terminar.
        Thread.sleep(IO_LATENCY_MS);

        // Lock protege apenas a seção crítica em memória — disputado por microssegundos.
        lock.lock();
        try {
            processedRecords++;
            log("✅ Thread #" + threadId + " CONCLUIU — registros processados: " + processedRecords);
        } finally {
            lock.unlock(); // SEMPRE no finally — garante liberação mesmo em exceções
        }
    }

    private static void runScenario2_ReentrantLock() throws InterruptedException {
        processedRecords = 0;
        completedThreads.set(0);

        printScenarioHeader(
                "CENÁRIO 2 — ReentrantLock + I/O (Desmontagem correta)",
                "Virtual Threads são desmontadas durante o I/O.",
                "Observe: as threads progridem concorrentemente — muito mais rápido."
        );

        CountDownLatch latch = new CountDownLatch(CONCURRENT_REQUESTS);
        long start = System.currentTimeMillis();

        for (int i = 1; i <= CONCURRENT_REQUESTS; i++) {
            final int threadId = i;
            Thread.ofVirtual()
                    .name("vt-reentrant-" + threadId)
                    .start(() -> {
                        try {
                            processWithReentrantLock(threadId);
                            completedThreads.incrementAndGet();
                        } catch (InterruptedException e) {
                            Thread.currentThread().interrupt();
                        } finally {
                            latch.countDown();
                        }
                    });
        }

        latch.await();
        long elapsed = System.currentTimeMillis() - start;

        printScenarioResult(elapsed, completedThreads.get(),
                "Com I/O fora do lock, todas as VTs executam o sleep em paralelo.\n" +
                        "  Tempo esperado ≈ IO_LATENCY (" + IO_LATENCY_MS + "ms) — independente\n" +
                        "  do número de threads. Compare com ~" +
                        (CONCURRENT_REQUESTS * IO_LATENCY_MS) + "ms do Cenário 1."
        );
    }

    // =========================================================================
    // UTILITÁRIOS DE LOG E FORMATAÇÃO
    // =========================================================================

    private static final DateTimeFormatter TIME_FMT =
            DateTimeFormatter.ofPattern("HH:mm:ss.SSS");

    private static void log(String message) {
        String time = TIME_FMT.format(java.time.LocalTime.now());
        String thread = Thread.currentThread().getName();
        System.out.printf("  [%s] [%-22s] %s%n", time, thread, message);
    }

    private static void printHeader() {
        int cpus = Runtime.getRuntime().availableProcessors();
        System.out.println("\n" + "═".repeat(72));
        System.out.println("  🧵 Thread Pinning — O Problema e a Solução");
        System.out.println("  Java " + System.getProperty("java.version"));
        System.out.println("  CPUs / Carrier Threads disponíveis: " + cpus);
        System.out.println("  Virtual Threads simultâneas: " + CONCURRENT_REQUESTS);
        System.out.println("  Latência I/O simulada: " + IO_LATENCY_MS + "ms");
        System.out.println();
        System.out.println("  ⚠️  Com apenas " + cpus + " Carrier Thread(s), o pinning vai travar");
        System.out.println("  rapidamente quando todas ficarem presas no I/O.");
        System.out.println("═".repeat(72) + "\n");
    }

    private static void printScenarioHeader(String title, String problem, String hint) {
        System.out.println("─".repeat(72));
        System.out.println("  📌 " + title);
        System.out.println("  " + problem);
        System.out.println("  💡 " + hint);
        System.out.println("─".repeat(72));
    }

    private static void printScenarioResult(long elapsedMs, int completed, String explanation) {
        System.out.println();
        System.out.println("  " + "─".repeat(70));
        System.out.printf ("  ⏱  Tempo total:         %dms%n", elapsedMs);
        System.out.printf ("  ✅ Threads concluídas:  %d/%d%n", completed, CONCURRENT_REQUESTS);
        System.out.println("  📝 " + explanation);
        System.out.println("  " + "─".repeat(70));
    }

    private static void printConclusion() {
        System.out.println("\n" + "═".repeat(72));
        System.out.println("  📊 CONCLUSÃO");
        System.out.println("═".repeat(72));
        System.out.println("""
          synchronized + I/O  →  Carrier Thread PINADA durante todo o I/O.
                                 Demais Virtual Threads ficam na fila.
                                 Tempo ≈ N_threads × IO_latency (serial).

          ReentrantLock fora  →  Virtual Thread DESMONTADA durante o I/O.
          do I/O                 Todas as VTs executam o I/O em paralelo.
                                 Tempo ≈ IO_latency (independente de N).

          Regra prática:
            ✅ synchronized é seguro para operações RÁPIDAS em memória.
            ❌ synchronized envolvendo I/O demorado = pinning garantido.
            ✅ Mova o I/O para fora do lock. Proteja apenas o estado compartilhado.
            ✅ Use ReentrantLock quando precisar de lock + I/O no mesmo fluxo.

          Dica: rode com -Djdk.tracePinnedThreads=full para ver o pinning
          sendo reportado pela própria JVM em tempo real.
        """);
        System.out.println("═".repeat(72));
    }
}