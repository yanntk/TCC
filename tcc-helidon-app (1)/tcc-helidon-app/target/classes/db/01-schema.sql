DROP TABLE IF EXISTS episodio, temporada, avaliacao, titulo_genero, genero, titulo CASCADE;

CREATE TABLE titulo (
    id                       BIGSERIAL PRIMARY KEY,
    nome                     VARCHAR(200) NOT NULL,
    sinopse                  TEXT NOT NULL,
    tipo                     VARCHAR(10) NOT NULL CHECK (tipo IN ('FILME','SERIE')),
    ano_lancamento           SMALLINT NOT NULL,
    classificacao_indicativa SMALLINT NOT NULL,
    duracao_minutos          SMALLINT,
    CONSTRAINT chk_titulo_duracao CHECK (
        (tipo = 'FILME' AND duracao_minutos IS NOT NULL) OR
        (tipo = 'SERIE' AND duracao_minutos IS NULL))
);

CREATE TABLE genero (
    id   SERIAL PRIMARY KEY,
    nome VARCHAR(80) NOT NULL UNIQUE
);

CREATE TABLE titulo_genero (
    titulo_id BIGINT NOT NULL REFERENCES titulo(id) ON DELETE CASCADE,
    genero_id INT    NOT NULL REFERENCES genero(id) ON DELETE CASCADE,
    PRIMARY KEY (titulo_id, genero_id)
);

CREATE TABLE avaliacao (
    id         BIGSERIAL PRIMARY KEY,
    titulo_id  BIGINT NOT NULL REFERENCES titulo(id) ON DELETE CASCADE,
    nota       SMALLINT NOT NULL CHECK (nota BETWEEN 1 AND 5),
    comentario VARCHAR(1000),
    data_hora  TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE temporada (
    id             BIGSERIAL PRIMARY KEY,
    titulo_id      BIGINT NOT NULL REFERENCES titulo(id) ON DELETE CASCADE,
    numero         SMALLINT NOT NULL,
    nome           VARCHAR(150),
    ano_lancamento SMALLINT,
    UNIQUE (titulo_id, numero)
);

CREATE TABLE episodio (
    id              BIGSERIAL PRIMARY KEY,
    temporada_id    BIGINT NOT NULL REFERENCES temporada(id) ON DELETE CASCADE,
    numero          SMALLINT NOT NULL,
    nome            VARCHAR(200) NOT NULL,
    sinopse         TEXT,
    duracao_minutos SMALLINT NOT NULL,
    UNIQUE (temporada_id, numero)
);

CREATE INDEX idx_titulo_tipo_ano       ON titulo (tipo, ano_lancamento);
CREATE INDEX idx_titulo_genero_genero  ON titulo_genero (genero_id, titulo_id);
CREATE INDEX idx_avaliacao_titulo      ON avaliacao (titulo_id);
CREATE INDEX idx_avaliacao_titulo_data ON avaliacao (titulo_id, data_hora DESC);
CREATE INDEX idx_temporada_titulo      ON temporada (titulo_id, numero);
CREATE INDEX idx_episodio_temporada    ON episodio (temporada_id, numero);
