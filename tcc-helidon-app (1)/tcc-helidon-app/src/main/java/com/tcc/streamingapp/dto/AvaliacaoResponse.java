package com.tcc.streamingapp.dto;

import java.time.Instant;

public record AvaliacaoResponse(
        long id,
        double nota,
        String comentario,
        Instant dataHora) {
}
