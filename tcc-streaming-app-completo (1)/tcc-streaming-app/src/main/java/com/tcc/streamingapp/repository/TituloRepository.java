package com.tcc.streamingapp.repository;

import com.tcc.streamingapp.dto.AvaliacaoResponse;
import com.tcc.streamingapp.dto.EstatisticasAvaliacao;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class TituloRepository {

    public record TituloBasico(
            long id,
            String nome,
            String sinopse,
            String tipo,
            Integer anoLancamento,
            Integer classificacaoIndicativa,
            Integer duracaoMinutos) {
    }

    private static final String SQL_TITULO = """
            SELECT id, nome, sinopse, tipo, ano_lancamento,
                   classificacao_indicativa, duracao_minutos
            FROM titulo
            WHERE id = ?
            """;

    private static final String SQL_GENEROS = """
            SELECT g.nome
            FROM genero g
            JOIN titulo_genero tg ON tg.genero_id = g.id
            WHERE tg.titulo_id = ?
            ORDER BY g.nome
            """;

    private static final String SQL_ESTATISTICAS = """
            SELECT COUNT(*) AS quantidade, AVG(nota) AS media
            FROM avaliacao
            WHERE titulo_id = ?
            """;

    private static final String SQL_AVALIACOES_RECENTES = """
            SELECT id, nota, comentario, data_hora
            FROM avaliacao
            WHERE titulo_id = ?
            ORDER BY data_hora DESC
            LIMIT ?
            """;

    private final JdbcTemplate jdbcTemplate;

    public TituloRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public Optional<TituloBasico> buscarPorId(long id) {
        return jdbcTemplate.query(SQL_TITULO, (rs, i) -> new TituloBasico(
                        rs.getLong("id"),
                        rs.getString("nome"),
                        rs.getString("sinopse"),
                        rs.getString("tipo"),
                        rs.getObject("ano_lancamento", Integer.class),
                        rs.getObject("classificacao_indicativa", Integer.class),
                        rs.getObject("duracao_minutos", Integer.class)), id)
                .stream()
                .findFirst();
    }

    public List<String> buscarGeneros(long tituloId) {
        return jdbcTemplate.queryForList(SQL_GENEROS, String.class, tituloId);
    }

    public EstatisticasAvaliacao buscarEstatisticas(long tituloId) {
        return jdbcTemplate.queryForObject(SQL_ESTATISTICAS, (rs, i) -> new EstatisticasAvaliacao(
                rs.getLong("quantidade"),
                rs.getDouble("media")), tituloId); // CORRIGIDO AQUI
    }

    public List<AvaliacaoResponse> buscarAvaliacoesRecentes(long tituloId, int limite) {
        return jdbcTemplate.query(SQL_AVALIACOES_RECENTES, (rs, i) -> new AvaliacaoResponse(
                rs.getLong("id"),
                rs.getDouble("nota"),
                rs.getString("comentario"),
                rs.getTimestamp("data_hora").toInstant()), tituloId, limite);
    }
}
