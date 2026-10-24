package com.tcc.streamingapp.lab;

import com.tcc.streamingapp.dto.TituloDetalhesResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * Endpoints do laboratório de Virtual Threads. Todos os de carga aceitam parâmetros
 * com valores padrão iguais aos do benchmark original (100ms de I/O, 50.000 iterações).
 *
 *   GET  /lab/io?ms=100                     I/O-bound (Thread.sleep)
 *   GET  /lab/cpu?iteracoes=50000           CPU-bound (loop aritmético)
 *   GET  /lab/io-cpu?ms=100&iteracoes=50000 I/O + CPU
 *   GET  /lab/pinning/synchronized?ms=300   I/O dentro de synchronized (pinning)
 *   GET  /lab/pinning/lock?ms=300           I/O fora do lock (correção)
 *   GET  /lab/db/{id}/com-semaforo          fluxo real do banco com porteiro
 *        (sem porteiro: o endpoint original GET /titulos/{id}/detalhes)
 *   GET  /lab/info                          ambiente, scheduler, Hikari, semáforo
 *   GET  /lab/teto                          tetos otimistas de vazão
 *   POST /lab/reset                         zera contadores e pico de concorrência
 */
@RestController
@RequestMapping("/lab")
public class LabController {

    private final LabService service;

    public LabController(LabService service) {
        this.service = service;
    }

    @GetMapping("/io")
    public ResultadoLab io(@RequestParam(defaultValue = "100") int ms) throws InterruptedException {
        return service.workloads().io(ms);
    }

    @GetMapping("/cpu")
    public ResultadoLab cpu(@RequestParam(defaultValue = "50000") int iteracoes) throws InterruptedException {
        return service.workloads().cpu(iteracoes);
    }

    @GetMapping("/io-cpu")
    public ResultadoLab ioCpu(@RequestParam(defaultValue = "100") int ms,
                              @RequestParam(defaultValue = "50000") int iteracoes) throws InterruptedException {
        return service.workloads().ioMaisCpu(ms, iteracoes);
    }

    @GetMapping("/pinning/synchronized")
    public ResultadoLab pinningSynchronized(@RequestParam(defaultValue = "300") int ms) throws InterruptedException {
        return service.workloads().pinningSynchronized(ms);
    }

    @GetMapping("/pinning/lock")
    public ResultadoLab pinningLock(@RequestParam(defaultValue = "300") int ms) throws InterruptedException {
        return service.workloads().pinningLock(ms);
    }

    @GetMapping("/db/{id}/com-semaforo")
    public TituloDetalhesResponse dbComSemaforo(@PathVariable long id) {
        return service.detalhesComSemaforo(id);
    }

    @GetMapping("/info")
    public InfoLab info() {
        return service.info();
    }

    @GetMapping("/teto")
    public TetoLab teto(@RequestParam(defaultValue = "200") int concorrencia,
                        @RequestParam(defaultValue = "100") int latenciaMs,
                        @RequestParam(defaultValue = "50000") int iteracoes,
                        @RequestParam(defaultValue = "0") int dbMs) {
        return service.teto(concorrencia, latenciaMs, iteracoes, dbMs);
    }

    @PostMapping("/reset")
    public InfoLab reset() {
        service.workloads().resetar();
        return service.info();
    }
}
