package com.tcc.streamingapp.dto;

import java.util.List;

public record TituloDetalhesResponse(
        long id,
        String nome,
        String sinopse,
        String tipo,
        Integer anoLancamento,
        String classificacaoIndicativa,
        Integer duracaoMinutos,
        List<String> generos,
        long quantidadeAvaliacoes,
        Double notaMedia,
        List<AvaliacaoResponse> avaliacoesRecentes) {
}
