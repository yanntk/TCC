package com.tcc.streamingapp.dto;

/**
 * Resumo das avaliações de um título.
 * {@code media} é null quando o título ainda não possui avaliações.
 */
public record EstatisticasAvaliacao(
        long quantidade,
        Double media) {
}
