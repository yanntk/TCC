package com.tcc.streamingapp.repository;

import com.tcc.streamingapp.dto.AvaliacaoResponse;
import com.tcc.streamingapp.dto.EstatisticasAvaliacao;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * JDBC puro (sem Spring JdbcTemplate). Mesmas queries do projeto Spring Boot.
 */
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

    private final DataSource dataSource;

    public TituloRepository(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    public Optional<TituloBasico> buscarPorId(long id) {
        try (Connection c = dataSource.getConnection();
             PreparedStatement ps = c.prepareStatement(SQL_TITULO)) {
            ps.setLong(1, id);
            try (ResultSet rs = ps.executeQuery()) {
                if (!rs.next()) {
                    return Optional.empty();
                }
                return Optional.of(new TituloBasico(
                        rs.getLong("id"),
                        rs.getString("nome"),
                        rs.getString("sinopse"),
                        rs.getString("tipo"),
                        (Integer) rs.getObject("ano_lancamento"),
                        (Integer) rs.getObject("classificacao_indicativa"),
                        (Integer) rs.getObject("duracao_minutos")));
            }
        } catch (SQLException e) {
            throw new RuntimeException("Erro ao buscar título " + id, e);
        }
    }

    public List<String> buscarGeneros(long tituloId) {
        try (Connection c = dataSource.getConnection();
             PreparedStatement ps = c.prepareStatement(SQL_GENEROS)) {
            ps.setLong(1, tituloId);
            try (ResultSet rs = ps.executeQuery()) {
                List<String> generos = new ArrayList<>();
                while (rs.next()) {
                    generos.add(rs.getString(1));
                }
                return generos;
            }
        } catch (SQLException e) {
            throw new RuntimeException("Erro ao buscar gêneros do título " + tituloId, e);
        }
    }

    public EstatisticasAvaliacao buscarEstatisticas(long tituloId) {
        try (Connection c = dataSource.getConnection();
             PreparedStatement ps = c.prepareStatement(SQL_ESTATISTICAS)) {
            ps.setLong(1, tituloId);
            try (ResultSet rs = ps.executeQuery()) {
                rs.next();
                long qtd = rs.getLong("quantidade");
                double media = rs.getDouble("media");
                Double mediaObj = rs.wasNull() ? null : media;
                return new EstatisticasAvaliacao(qtd, mediaObj);
            }
        } catch (SQLException e) {
            throw new RuntimeException("Erro ao buscar estatísticas do título " + tituloId, e);
        }
    }

    public List<AvaliacaoResponse> buscarAvaliacoesRecentes(long tituloId, int limite) {
        try (Connection c = dataSource.getConnection();
             PreparedStatement ps = c.prepareStatement(SQL_AVALIACOES_RECENTES)) {
            ps.setLong(1, tituloId);
            ps.setInt(2, limite);
            try (ResultSet rs = ps.executeQuery()) {
                List<AvaliacaoResponse> lista = new ArrayList<>();
                while (rs.next()) {
                    Timestamp ts = rs.getTimestamp("data_hora");
                    lista.add(new AvaliacaoResponse(
                            rs.getLong("id"),
                            rs.getDouble("nota"),
                            rs.getString("comentario"),
                            ts != null ? ts.toInstant() : null));
                }
                return lista;
            }
        } catch (SQLException e) {
            throw new RuntimeException("Erro ao buscar avaliações do título " + tituloId, e);
        }
    }
}
