SET synchronous_commit = off;

INSERT INTO genero (nome) VALUES
  ('Ação'),('Aventura'),('Comédia'),('Drama'),('Ficção Científica'),
  ('Suspense'),('Terror'),('Romance'),('Documentário'),('Animação'),
  ('Fantasia'),('Mistério'),('Guerra'),('Faroeste'),('Musical'),
  ('Policial'),('Biografia'),('Esporte'),('Família'),('História');

INSERT INTO titulo (nome, sinopse, tipo, ano_lancamento, classificacao_indicativa, duracao_minutos)
SELECT 'Filme ' || g, 'Sinopse do filme ' || g || '.', 'FILME',
       (1950 + (g * 7) % 74)::smallint,
       (ARRAY[0,10,12,14,16,18])[1 + (g % 6)::int]::smallint,
       (80 + (g % 80))::smallint
FROM generate_series(1, 7000) g;

INSERT INTO titulo (nome, sinopse, tipo, ano_lancamento, classificacao_indicativa, duracao_minutos)
SELECT 'Serie ' || g, 'Sinopse da serie ' || g || '.', 'SERIE',
       (1990 + (g * 3) % 34)::smallint,
       (ARRAY[0,10,12,14,16,18])[1 + (g % 6)::int]::smallint,
       NULL
FROM generate_series(1, 3000) g;

INSERT INTO titulo_genero (titulo_id, genero_id)
SELECT DISTINCT t.id, 1 + ((t.id * k) % 20)::int
FROM titulo t
CROSS JOIN generate_series(1, 2 + (t.id % 3)::int) k
ON CONFLICT (titulo_id, genero_id) DO NOTHING;

INSERT INTO temporada (titulo_id, numero, nome, ano_lancamento)
SELECT t.id, s.n::smallint, 'Temporada ' || s.n, (t.ano_lancamento + s.n - 1)::smallint
FROM titulo t
CROSS JOIN LATERAL generate_series(1, 3 + (t.id % 3)::int) s(n)
WHERE t.tipo = 'SERIE';

INSERT INTO episodio (temporada_id, numero, nome, sinopse, duracao_minutos)
SELECT tp.id, e.n::smallint, 'Episodio ' || e.n,
       'Sinopse do episodio ' || e.n, (40 + (e.n % 20))::smallint
FROM temporada tp
CROSS JOIN LATERAL generate_series(1, 8 + (tp.id % 5)::int) e(n);

INSERT INTO avaliacao (titulo_id, nota, comentario, data_hora)
SELECT 1 + (random() * 9999)::bigint,
       (1 + floor(random() * 5))::smallint,
       'Comentario ' || g,
       NOW() - (random() * interval '365 days')
FROM generate_series(1, 1000000) g;

ANALYZE;
