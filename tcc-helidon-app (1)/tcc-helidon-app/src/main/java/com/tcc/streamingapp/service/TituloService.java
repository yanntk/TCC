package com.tcc.streamingapp.service;

import com.tcc.streamingapp.dto.AvaliacaoResponse;
import com.tcc.streamingapp.dto.EstatisticasAvaliacao;
import com.tcc.streamingapp.dto.TituloDetalhesResponse;
import com.tcc.streamingapp.exception.TituloNaoEncontradoException;
import com.tcc.streamingapp.repository.TituloRepository;

import java.util.List;

/**
 * Mesma lógica do Spring Boot — 4 consultas JDBC sequenciais por requisição.
 */
public class TituloService {

    private final TituloRepository repository;

    public TituloService(TituloRepository repository) {
        this.repository = repository;
    }

    public TituloDetalhesResponse buscarDetalhes(long id) {
        var titulo = repository.buscarPorId(id)
                .orElseThrow(() -> new TituloNaoEncontradoException(id));

        List<String> generos = repository.buscarGeneros(id);
        EstatisticasAvaliacao stats = repository.buscarEstatisticas(id);
        List<AvaliacaoResponse> avaliacoes = repository.buscarAvaliacoesRecentes(id, 10);

        return new TituloDetalhesResponse(
                titulo.id(),
                titulo.nome(),
                titulo.sinopse(),
                titulo.tipo(),
                titulo.anoLancamento(),
                titulo.classificacaoIndicativa() != null
                        ? titulo.classificacaoIndicativa().toString()
                        : null,
                titulo.duracaoMinutos(),
                generos,
                stats.quantidade(),
                stats.media(),
                avaliacoes
        );
    }
}
