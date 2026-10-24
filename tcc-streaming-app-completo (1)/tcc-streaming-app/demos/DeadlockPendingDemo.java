import com.sun.management.HotSpotDiagnosticMXBean;
import com.sun.management.HotSpotDiagnosticMXBean.ThreadDumpFormat;

import java.lang.management.ManagementFactory;
import java.time.Duration;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.locks.ReentrantLock;

/**
 * =============================================================================
 * Virtual Threads — Estado PENDENTE (deadlock por pinning)
 * =============================================================================
 *
 * Como rodar (os dois -D são OBRIGATÓRIOS para o travamento ser determinístico):
 *
 *   java -Djdk.virtualThreadScheduler.parallelism=1 \
 *        -Djdk.virtualThreadScheduler.maxPoolSize=1 \
 *        demos/DeadlockPendingDemo.java
 *
 * (ou: scripts/rodar-deadlock.sh)
 *
 * O que acontece:
 *   - VT-A pega um ReentrantLock e faz I/O (sleep). Ao dormir ela é DESMONTADA
 *     da carrier thread, mas continua dona do lock.
 *   - VT-B entra em um bloco synchronized e tenta pegar o MESMO lock. Como está
 *     dentro de synchronized, ela PINA a única carrier thread enquanto espera.
 *   - Quando A acorda, precisa de uma carrier para continuar e liberar o lock.
 *     A única carrier está presa por B, e B só sai quando A liberar o lock.
 *     => A e B ficam PENDENTES para sempre. Nenhuma exceção, nenhum log.
 *
 * Na JVM comum (várias carriers) o mesmo código só trava se TODAS as carriers
 * forem pinadas ao mesmo tempo — por isso em produção aparece "do nada" sob carga.
 *
 * Este demo roda primeiro a versão CORRIGIDA (conclui), depois a TRAVADA. Um
 * watchdog em thread de plataforma detecta o estado pendente, grava um thread
 * dump (que inclui as virtual threads) e encerra a JVM.
 *
 * Pré-requisito: Java 21+
 * =============================================================================
 */
public class DeadlockPendingDemo {

    private static final int IO_MS = 300;
    private static final Duration TIMEOUT = Duration.ofSeconds(5);

    public static void main(String[] args) throws Exception {
        String par = System.getProperty("jdk.virtualThreadScheduler.parallelism");
        String max = System.getProperty("jdk.virtualThreadScheduler.maxPoolSize");
        System.out.println("=".repeat(70));
        System.out.println("  Estado PENDENTE com Virtual Threads — Java " + System.getProperty("java.version"));
        System.out.println("  parallelism=" + par + " | maxPoolSize=" + max);
        System.out.println("=".repeat(70));

        if (!"1".equals(par) || !"1".equals(max)) {
            System.out.println("""

              ⚠️  Rode com -Djdk.virtualThreadScheduler.parallelism=1
                          -Djdk.virtualThreadScheduler.maxPoolSize=1
              Sem isso o scheduler tem mais carrier threads e o travamento
              pode não ocorrer (o demo seguirá mesmo assim).
              """);
        }

        // 1) Versão corrigida: ninguém segura monitor enquanto espera o lock.
        System.out.println("\n[1/2] CORRIGIDO — ReentrantLock sem synchronized em volta");
        boolean ok = executar(false);
        System.out.println(ok
                ? "   ✅ Concluiu: B esperou o lock desmontada e A pôde continuar."
                : "   ❌ Inesperado: a versão corrigida ficou pendente.");

        // 2) Versão com defeito: lock adquirido dentro de synchronized.
        System.out.println("\n[2/2] TRAVADO — ReentrantLock.lock() dentro de synchronized");
        boolean concluiu = executar(true);
        if (concluiu) {
            System.out.println("   ⚠️  Concluiu (o scheduler tinha carrier livre). Use parallelism=1.");
            return;
        }

        String arquivo = "threaddump-pendente-" + System.currentTimeMillis() + ".txt";
        ManagementFactory.getPlatformMXBean(HotSpotDiagnosticMXBean.class)
                .dumpThreads(java.nio.file.Path.of(arquivo).toAbsolutePath().toString(),
                        ThreadDumpFormat.TEXT_PLAIN);
        System.out.println("   📄 Thread dump (inclui virtual threads) em: " + arquivo);
        System.out.println("\n  Conclusão: nenhuma exceção, nenhum erro — só a requisição que nunca volta.");
        System.out.println("  Correção: não adquira locks/espere I/O dentro de synchronized (ou use JDK 24+, JEP 491).");

        // As VTs presas não morrem sozinhas: encerra a JVM à força.
        Runtime.getRuntime().halt(0);
    }

    /** @return true se as duas virtual threads terminaram dentro do timeout. */
    private static boolean executar(boolean seguraMonitor) throws Exception {
        final ReentrantLock lock = new ReentrantLock();
        final Object monitor = new Object();
        final CountDownLatch aTemOLock = new CountDownLatch(1);
        long inicio = System.currentTimeMillis();

        Thread a = Thread.ofVirtual().name("vt-A-dona-do-lock").start(() -> {
            lock.lock();
            try {
                aTemOLock.countDown();
                log("A", "pegou o lock; vai fazer I/O de " + IO_MS + "ms (será desmontada)");
                Thread.sleep(IO_MS);
                log("A", "acordou e vai liberar o lock");
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            } finally {
                lock.unlock();
            }
        });

        aTemOLock.await();

        Thread b = Thread.ofVirtual().name("vt-B-" + (seguraMonitor ? "pinada" : "livre")).start(() -> {
            if (seguraMonitor) {
                synchronized (monitor) {
                    log("B", "dentro do synchronized; pedindo o lock (PINA a carrier)");
                    lock.lock();
                    lock.unlock();
                }
            } else {
                log("B", "pedindo o lock (sem synchronized; será desmontada)");
                lock.lock();
                lock.unlock();
            }
            log("B", "terminou");
        });

        // Prazo TOTAL de TIMEOUT para as duas (não soma um timeout por thread).
        long limite = System.nanoTime() + TIMEOUT.toNanos();
        boolean aOk = a.join(TIMEOUT);
        boolean bOk = b.join(Duration.ofNanos(Math.max(1_000_000L, limite - System.nanoTime())));
        long gasto = System.currentTimeMillis() - inicio;

        System.out.printf("   Estado após %dms -> A: %s | B: %s%n", gasto, a.getState(), b.getState());
        if (!aOk || !bOk) {
            System.out.println("   🔒 PENDENTE: A espera uma carrier para liberar o lock; B segura a carrier esperando o lock.");
        }
        return aOk && bOk;
    }

    private static void log(String quem, String msg) {
        System.out.printf("   [%tT.%<tL] [%s] %s%n", System.currentTimeMillis(), quem, msg);
    }
}
