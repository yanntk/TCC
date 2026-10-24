package com.tcc.streamingapp.controller;

import com.tcc.streamingapp.dto.TituloDetalhesResponse;
import com.tcc.streamingapp.service.TituloService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/titulos")
public class TituloController {

    private final TituloService service;

    public TituloController(TituloService service) {
        this.service = service;
    }

    @GetMapping("/{id}/detalhes")
    public TituloDetalhesResponse detalhes(@PathVariable long id) {
        return service.buscarDetalhes(id);
    }
}
