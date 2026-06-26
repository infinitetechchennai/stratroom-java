package com.estrat.backend.db.config;

import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.init.ScriptUtils;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.Connection;

/**
 * Ensures sc_* scorecard V2 tables exist on PostgreSQL. Sibi's scorecard engine
 * (calculator, Excel import, V2 CRUD) depends on these tables.
 */
@Component
public class ScorecardV2SchemaInitializer {

    private static final Logger log = LoggerFactory.getLogger(ScorecardV2SchemaInitializer.class);

    @Autowired
    private JdbcTemplate jdbc;

    @Autowired
    private DataSource dataSource;

    @Value("${spring.datasource.url:}")
    private String jdbcUrl;

    @PostConstruct
    public void ensureSchema() {
        if (jdbcUrl == null || !jdbcUrl.contains("postgresql")) {
            return;
        }
        if (isSchemaReady()) {
            log.info("Scorecard V2 schema verified (sc_* tables ready).");
        } else {
            try {
                log.info("Applying scorecard V2 PostgreSQL schema (sc_* tables)…");
                try (Connection con = dataSource.getConnection()) {
                    con.createStatement().execute("SET search_path TO orgstructure");
                    ScriptUtils.executeSqlScript(con, new ClassPathResource("sql/scorecard_v2_schema_pg.sql"));
                }
                if (isSchemaReady()) {
                    log.info("Scorecard V2 schema ready.");
                } else {
                    log.warn("Scorecard V2 schema script ran but owner_id column is still missing on sc_scorecards.");
                }
            } catch (Exception e) {
                log.error("Failed to apply scorecard V2 schema — scorecard import/V2 APIs may not work", e);
            }
        }
        normalizeBooleanFlagColumns();
        ensureImportIndexes();
    }

    /** Required for ON CONFLICT upserts during actuals import. */
    private void ensureImportIndexes() {
        try {
            if (!tableExists("sc_kpi_history")) {
                return;
            }
            jdbc.execute(
                    "CREATE UNIQUE INDEX IF NOT EXISTS uq_sc_kpihist "
                            + "ON sc_kpi_history (kpi_id, period_start, period_end)");
            if (tableExists("sc_sub_kpi_history")) {
                jdbc.execute(
                        "CREATE UNIQUE INDEX IF NOT EXISTS uq_sc_subkpihist "
                                + "ON sc_sub_kpi_history (sub_kpi_id, period_start, period_end)");
            }
        } catch (Exception e) {
            log.warn("Could not ensure sc_kpi_history unique indexes: {}", e.getMessage());
        }
    }

    /**
     * Legacy sc_* tables may have is_active / is_deleted as smallint (0/1). V2 queries
     * compare to boolean literals, which PostgreSQL rejects (smallint = boolean).
     */
    private void normalizeBooleanFlagColumns() {
        String[][] targets = {
                {"sc_scorecards", "is_active"},
                {"sc_scorecards", "is_deleted"},
                {"sc_perspectives", "is_active"},
                {"sc_objectives", "is_active"},
                {"sc_kpis", "is_deleted"},
                {"sc_sub_kpis", "is_deleted"},
        };
        for (String[] target : targets) {
            coerceColumnToBoolean(target[0], target[1]);
        }
    }

    private void coerceColumnToBoolean(String table, String column) {
        try {
            if (!tableExists(table) || !columnExists(table, column)) {
                return;
            }
            String dataType = jdbc.queryForObject(
                    "SELECT data_type FROM information_schema.columns "
                            + "WHERE table_schema = current_schema() AND table_name = ? AND column_name = ?",
                    String.class, table, column);
            if (!"smallint".equals(dataType) && !"integer".equals(dataType)) {
                return;
            }
            log.info("Migrating {}.{} from {} to boolean", table, column, dataType);
            jdbc.execute("ALTER TABLE " + table + " ALTER COLUMN " + column + " DROP DEFAULT");
            jdbc.execute(String.format(
                    "ALTER TABLE %s ALTER COLUMN %s TYPE BOOLEAN USING (COALESCE(%s::int, 0) != 0)",
                    table, column, column));
            String defaultLiteral = column.startsWith("is_deleted") ? "FALSE" : "TRUE";
            jdbc.execute("ALTER TABLE " + table + " ALTER COLUMN " + column + " SET DEFAULT " + defaultLiteral);
        } catch (Exception e) {
            log.warn("Could not normalize {}.{} to boolean: {}", table, column, e.getMessage());
        }
    }

    private boolean isSchemaReady() {
        try {
            if (!tableExists("sc_scorecards")) {
                return false;
            }
            return columnExists("sc_scorecards", "owner_id")
                    && columnExists("sc_kpi_history", "target_value");
        } catch (DataAccessException e) {
            return false;
        }
    }

    private boolean tableExists(String table) {
        Integer count = jdbc.queryForObject(
                "SELECT COUNT(*) FROM information_schema.tables "
                        + "WHERE table_schema = current_schema() AND table_name = ?",
                Integer.class, table);
        return count != null && count > 0;
    }

    private boolean columnExists(String table, String column) {
        if (!tableExists(table)) {
            return false;
        }
        Integer count = jdbc.queryForObject(
                "SELECT COUNT(*) FROM information_schema.columns "
                        + "WHERE table_schema = current_schema() AND table_name = ? AND column_name = ?",
                Integer.class, table, column);
        return count != null && count > 0;
    }
}
