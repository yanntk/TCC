import java.time.Duration;
import java.time.Instant;
import java.util.concurrent.Semaphore;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * =============================================================================
 * Virtual Threads — O Efeito Manada na Prática
 * =============================================================================
 *
 * Demonstração do risco de usar Virtual Threads sem controle de concorrência
 * em recursos compartilhados (ex: banco de dados).
 *
 * Pré-requisito: Java 21+
 * Como rodar:    java VirtualThreadsDemo.java
 *
 * O que este demo simula:
 *   - Um "banco de dados" com limite máximo de 80 conexões simultâneas.
 *   - 500 requisições chegando ao mesmo tempo.
 *   - Cenário 1: sem controle → conexões estouram → requisições rejeitadas.
 *   - Cenário 2: com Semaphore → tudo controlado → zero rejeições.
 *
 * =============================================================================
 */
public class VirtualThreadsDemo {

    // -------------------------------------------------------------------------
    // Configurações da simulação
    // -------------------------------------------------------------------------

    /** Total de requisições simultâneas chegando na aplicação. */
    private static final int TOTAL_REQUESTS = 500;

    /** Limite máximo de conexões que o "banco" suporta. */
    private static final int MAX_DB_CONNECTIONS = 80;

    /** Latência simulada de uma query ao banco (ms). */
    private static final int DB_QUERY_LATENCY_MS = 200;

    // -------------------------------------------------------------------------
    // Estado compartilhado do "banco de dados" simulado
    // -------------------------------------------------------------------------

    /** Contador de conexões abertas no momento. */
    private static final AtomicInteger activeConnections = new AtomicInteger(0);

    /** Pico de conexões simultâneas registrado durante a execução. */
    private static final AtomicInteger peakConnections = new AtomicInteger(0);

    /** Contador de requisições rejeitadas pelo banco (conexão recusada). */
    private static final AtomicInteger rejectedRequests = new AtomicInteger(0);

    /** Contador de requisições concluídas com sucesso. */
    private static final AtomicInteger successfulRequests = new AtomicInteger(0);

    // =========================================================================
    // PONTO DE ENTRADA
    // =========================================================================

    public static void main(String[] args) throws InterruptedException {

        System.out.println("=".repeat(65));
        System.out.println("  Virtual Threads — Efeito Manada na Prática");
        System.out.println("  Java " + System.getProperty("java.version"));
        System.out.println("=".repeat(65));
        System.out.printf("%n  Simulação: %d requisições simultâneas%n", TOTAL_REQUESTS);
        System.out.printf("  Banco suporta: %d conexões simultâneas%n", MAX_DB_CONNECTIONS);
        System.out.printf("  Latência de query: %dms%n%n", DB_QUERY_LATENCY_MS);

        // --- Cenário 1 ---
        runScenario(
                "CENÁRIO 1: Virtual Threads SEM controle (Efeito Manada)",
                false
        );

        // Pausa entre os cenários para leitura
        Thread.sleep(1000);

        // --- Cenário 2 ---
        runScenario(
                "CENÁRIO 2: Virtual Threads COM Semaphore (Controlado)",
                true
        );

        System.out.println("\n" + "=".repeat(65));
        System.out.println("  Conclusão:");
        System.out.println("  Virtual Threads são poderosas, mas recursos escassos");
        System.out.println("  (banco, APIs externas) precisam de um porteiro.");
        System.out.println("  Pare de controlar threads. Controle recursos.");
        System.out.println("=".repeat(65));
    }

    // =========================================================================
    // CENÁRIOS
    // =========================================================================

    private static void runScenario(String title, boolean withSemaphore)
            throws InterruptedException {

        // Reset dos contadores para cada cenário
        activeConnections.set(0);
        peakConnections.set(0);
        rejectedRequests.set(0);
        successfulRequests.set(0);

        // O Semaphore é o "porteiro do banco": só MAX_DB_CONNECTIONS passam por vez
        Semaphore semaphore = new Semaphore(MAX_DB_CONNECTIONS);

        System.out.println("-".repeat(65));
        System.out.println("  " + title);
        System.out.println("-".repeat(65));

        Instant start = Instant.now();

        // Criamos uma thread por requisição — exatamente como frameworks modernos
        // (Spring Boot 3.2+ com server.tomcat.threads.virtual=true) fazem.
        Thread[] threads = new Thread[TOTAL_REQUESTS];

        for (int i = 0; i < TOTAL_REQUESTS; i++) {
            final int requestId = i + 1;

            threads[i] = Thread.ofVirtual().start(() -> {
                if (withSemaphore) {
                    handleRequestWithControl(requestId, semaphore);
                } else {
                    handleRequestWithoutControl(requestId);
                }
            });
        }

        // Aguarda todas as Virtual Threads terminarem
        for (Thread thread : threads) {
            thread.join();
        }

        Duration elapsed = Duration.between(start, Instant.now());

        // Resultado
        System.out.printf("  ✅ Sucesso:          %d requisições%n", successfulRequests.get());
        System.out.printf("  ❌ Rejeitadas:       %d requisições%n", rejectedRequests.get());
        System.out.printf("  📈 Pico de conexões: %d (limite: %d)%n",
                peakConnections.get(), MAX_DB_CONNECTIONS);
        System.out.printf("  ⏱  Tempo total:      %dms%n%n", elapsed.toMillis());
    }

    // =========================================================================
    // HANDLERS
    // =========================================================================

    /**
     * Requisição SEM controle.
     *
     * Cada Virtual Thread tenta abrir uma conexão diretamente.
     * Se o banco já atingiu o limite, rejeita — igual ao erro:
     * "FATAL: remaining connection slots are reserved for superuser"
     */
    private static void handleRequestWithoutControl(int requestId) {
        int current = activeConnections.incrementAndGet();

        // Atualiza o pico de conexões simultâneas
        peakConnections.updateAndGet(peak -> Math.max(peak, current));

        // Simula o limite do banco de dados
        if (current > MAX_DB_CONNECTIONS) {
            activeConnections.decrementAndGet();
            rejectedRequests.incrementAndGet();

            // Em produção, isso seria: PSQLException: FATAL: connection limit exceeded
            // System.out.printf("  [Request %d] ❌ REJEITADA — banco lotado (%d conexões)%n",
            //     requestId, current);
            return;
        }

        try {
            simulateDatabaseQuery(requestId);
            successfulRequests.incrementAndGet();
        } finally {
            activeConnections.decrementAndGet();
        }
    }

    /**
     * Requisição COM controle via Semaphore.
     *
     * O Semaphore age como porteiro: no máximo MAX_DB_CONNECTIONS
     * Virtual Threads chegam ao banco ao mesmo tempo. As demais aguardam
     * na fila — e a Virtual Thread que aguarda é DESMONTADA da Carrier Thread,
     * não bloqueando CPU. Zero desperdício.
     */
    private static void handleRequestWithControl(int requestId, Semaphore semaphore) {
        try {
            // Aguarda uma vaga. Se não houver, a Virtual Thread é suspensa
            // (desmontada da Carrier Thread) — sem bloquear nada.
            semaphore.acquire();
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            rejectedRequests.incrementAndGet();
            return;
        }

        try {
            int current = activeConnections.incrementAndGet();
            peakConnections.updateAndGet(peak -> Math.max(peak, current));

            simulateDatabaseQuery(requestId);
            successfulRequests.incrementAndGet();

        } finally {
            activeConnections.decrementAndGet();
            semaphore.release(); // Libera a vaga para a próxima na fila
        }
    }

    // =========================================================================
    // SIMULAÇÃO DE QUERY
    // =========================================================================

    /**
     * Simula a latência de uma query ao banco de dados.
     *
     * Em Virtual Threads, Thread.sleep() é um ponto de desmontagem:
     * a JVM suspende esta Virtual Thread e libera a Carrier Thread
     * para executar outras. Não há bloqueio de thread do SO.
     */
    private static void simulateDatabaseQuery(int requestId) {
        try {
            // Representa: SELECT * FROM products WHERE id = ?  (~200ms de latência)
            Thread.sleep(DB_QUERY_LATENCY_MS);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}