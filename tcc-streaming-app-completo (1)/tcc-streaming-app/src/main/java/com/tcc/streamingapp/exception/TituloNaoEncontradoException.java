package com.tcc.streamingapp.exception;

public class TituloNaoEncontradoException extends RuntimeException {

    public TituloNaoEncontradoException(long id) {
        super("Título não encontrado: " + id);
    }
}
