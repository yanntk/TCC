package com.tcc.streamingapp.service;

import com.tcc.streamingapp.dto.AvaliacaoResponse;
import com.tcc.streamingapp.dto.EstatisticasAvaliacao;
import com.tcc.streamingapp.dto.TituloDetalhesResponse;
import com.tcc.streamingapp.exception.TituloNaoEncontradoException;
import com.tcc.streamingapp.repository.TituloRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TituloService {

    private final TituloRepository repository;

    public TituloService(TituloRepository repository) {
        this.repository = repository;
    }

    public TituloDetalhesResponse buscarDetalhes(long id) {
        // 1. Busca dados básicos
        var titulo = repository.buscarPorId(id)
                .orElseThrow(() -> new TituloNaoEncontradoException(id));

        // 2. Busca gêneros
        List<String> generos = repository.buscarGeneros(id);

        // 3. Busca estatísticas
        EstatisticasAvaliacao stats = repository.buscarEstatisticas(id);

        // 4. Busca avaliações recentes
        List<AvaliacaoResponse> avaliacoes = repository.buscarAvaliacoesRecentes(id, 10);

        // 5. Monta o DTO de resposta
        return new TituloDetalhesResponse(
                titulo.id(),
                titulo.nome(),
                titulo.sinopse(),
                titulo.tipo(),
                titulo.anoLancamento(),
                titulo.classificacaoIndicativa() != null ? titulo.classificacaoIndicativa().toString() : null,
                titulo.duracaoMinutos(),
                generos,
                stats.quantidade(),
                stats.media(),
                avaliacoes
        );
    }
}