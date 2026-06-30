package com.estrat.backend.db.scv2;

import java.math.BigDecimal;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * JdbcTemplate-based CRUD for the sc_ scorecard hierarchy. Payloads are plain
 * Maps (JSON bodies), matching the gold-standard controller style. Deletes are
 * hard deletes that rely on the FK ON DELETE CASCADE defined in the schema.
 */
@Service
public class ScorecardCrudService {

    private final JdbcTemplate jdbc;
    private final KpiImportKeyResolver kpiImportKeyResolver;

    @Autowired
    public ScorecardCrudService(JdbcTemplate jdbc, KpiImportKeyResolver kpiImportKeyResolver) {
        this.jdbc = jdbc;
        this.kpiImportKeyResolver = kpiImportKeyResolver;
    }

    @PostConstruct
    public void initSchema() {
        try { jdbc.execute("ALTER TABLE sc_scorecards ADD COLUMN formula TEXT"); } catch (Exception ignore) {}
        try { jdbc.execute("ALTER TABLE sc_perspectives ADD COLUMN formula TEXT"); } catch (Exception ignore) {}
        try { jdbc.execute("ALTER TABLE sc_objectives ADD COLUMN formula TEXT"); } catch (Exception ignore) {}
        try { jdbc.execute("ALTER TABLE sc_kpis ADD COLUMN formula TEXT"); } catch (Exception ignore) {}
        // Separate storage for the KPI Actual and YTD calculators (formula = Performance).
        try { jdbc.execute("ALTER TABLE sc_kpis ADD COLUMN actual_formula TEXT"); } catch (Exception ignore) {}
        try { jdbc.execute("ALTER TABLE sc_kpis ADD COLUMN ytd_formula TEXT"); } catch (Exception ignore) {}
        // Audit display names (who created / last modified the KPI).
        try { jdbc.execute("ALTER TABLE sc_kpis ADD COLUMN created_by TEXT"); } catch (Exception ignore) {}
        try { jdbc.execute("ALTER TABLE sc_kpis ADD COLUMN updated_by TEXT"); } catch (Exception ignore) {}
        // Extra KPI attributes collected in the modal (rollup numbers, source, owner,
        // and the per-KPI RAG threshold band values as a JSON array).
        try { jdbc.execute("ALTER TABLE sc_kpis ADD COLUMN contribution NUMERIC"); } catch (Exception ignore) {}
        try { jdbc.execute("ALTER TABLE sc_kpis ADD COLUMN sub_weight NUMERIC"); } catch (Exception ignore) {}
        try { jdbc.execute("ALTER TABLE sc_kpis ADD COLUMN data_source TEXT"); } catch (Exception ignore) {}
        try { jdbc.execute("ALTER TABLE sc_kpis ADD COLUMN owner TEXT"); } catch (Exception ignore) {}
        try { jdbc.execute("ALTER TABLE sc_kpis ADD COLUMN thresholds TEXT"); } catch (Exception ignore) {}
        // Lead/Lag indicator classification (separate from `polarity`, which is the
        // scoring direction HIGHER/LOWER/TARGET/RANGE used by AchievementCalculator).
        try { jdbc.execute("ALTER TABLE sc_kpis ADD COLUMN indicator_type TEXT"); } catch (Exception ignore) {}
        try { jdbc.execute("ALTER TABLE sc_sub_kpis ADD COLUMN indicator_type TEXT"); } catch (Exception ignore) {}
        try { jdbc.execute("ALTER TABLE sc_sub_kpis ADD COLUMN formula TEXT"); } catch (Exception ignore) {}
        try { jdbc.execute("ALTER TABLE sc_sub_kpis ADD COLUMN actual_formula TEXT"); } catch (Exception ignore) {}
        try { jdbc.execute("ALTER TABLE sc_sub_kpis ADD COLUMN ytd_formula TEXT"); } catch (Exception ignore) {}
        // Add target_value to sub_kpi_history so values-file imports can store targets per period
        try { jdbc.execute("ALTER TABLE sc_sub_kpi_history ADD COLUMN target_value NUMERIC"); } catch (Exception ignore) {}
    }

    /** Ensures sc_sub_kpi_history has target_value column + unique index for ON CONFLICT upserts. */
    private void ensureSubKpiHistorySchema() {
        try { jdbc.execute("ALTER TABLE sc_sub_kpi_history ADD COLUMN IF NOT EXISTS target_value NUMERIC"); } catch (Exception ignore) {}
        try { jdbc.execute("ALTER TABLE sc_kpi_history ADD COLUMN IF NOT EXISTS target_value NUMERIC"); } catch (Exception ignore) {}
        try { jdbc.execute("CREATE UNIQUE INDEX IF NOT EXISTS uq_sc_subkpihist ON sc_sub_kpi_history (sub_kpi_id, period_start, period_end)"); } catch (Exception ignore) {}
        try { jdbc.execute("CREATE UNIQUE INDEX IF NOT EXISTS uq_sc_kpihist ON sc_kpi_history (kpi_id, period_start, period_end)"); } catch (Exception ignore) {}
    }

    // ---------------- SCORECARD ----------------

    @Transactional
    public long createScorecard(Map<String, Object> b) {
        return insert(
                "INSERT INTO sc_scorecards (page_id, name, description, owner_id, department_id, "
                        + "classification_type, created_by, formula) VALUES (?,?,?,?,?,?,?,?)",
                lng(b, "pageId", 0L), str(b, "name", "Scorecard"), str(b, "description", null),
                lng(b, "ownerId", 0L), lngOrNull(b, "departmentId"),
                str(b, "classificationType", "THREE_COLOR"), lng(b, "createdBy", 0L), str(b, "formula", null));
    }

    @Transactional
    public boolean updateScorecard(long id, Map<String, Object> b) {
        String incomingName = str(b, "name", null);
        String nameToSave = (incomingName == null || incomingName.isBlank())
                ? jdbc.queryForObject("SELECT name FROM sc_scorecards WHERE id=?", String.class, id)
                : incomingName;
        // Preserve the existing description when the caller doesn't supply one (e.g. the
        // formula-only save from the calculator), so it isn't wiped.
        String incomingDesc = str(b, "description", null);
        String descToSave = (incomingDesc == null || incomingDesc.isBlank())
                ? jdbc.queryForObject("SELECT description FROM sc_scorecards WHERE id=?", String.class, id)
                : incomingDesc;
        return jdbc.update(
                "UPDATE sc_scorecards SET name=?, description=?, classification_type=?, updated_by=?, formula=? WHERE id=?",
                nameToSave, descToSave,
                str(b, "classificationType", "THREE_COLOR"), lng(b, "updatedBy", 0L), str(b, "formula", null), id) > 0;
    }

    @Transactional
    public boolean deleteScorecard(long id) {
        return jdbc.update("DELETE FROM sc_scorecards WHERE id=?", id) > 0;
    }

    // ---------------- PERSPECTIVE ----------------

    public boolean renamePerspective(long id, String name) {
        if (name == null || name.isBlank()) return false;
        return jdbc.update("UPDATE sc_perspectives SET name=? WHERE id=?", name.trim(), id) > 0;
    }

    public Map<String, Object> getPerspective(long id) {
        List<Map<String, Object>> rows = jdbc.queryForList(
                "SELECT id, scorecard_id, code, name, description, weight, aggregation_method, "
                        + "classification_type, formula, display_order FROM sc_perspectives WHERE id = ?", id);
        return rows.isEmpty() ? java.util.Collections.emptyMap() : rows.get(0);
    }

    @Transactional
    public long createPerspective(Map<String, Object> b) {
        return insert(
                "INSERT INTO sc_perspectives (scorecard_id, code, name, description, display_order, weight, "
                        + "aggregation_method, classification_type, formula) VALUES (?,?,?,?,?,?,?,?,?)",
                lng(b, "scorecardId", 0L), str(b, "code", null), str(b, "name", "Perspective"),
                str(b, "description", null), intg(b, "displayOrder", 0), dec(b, "weight", BigDecimal.ZERO),
                str(b, "aggregationMethod", "WEIGHTED"), str(b, "classificationType", "THREE_COLOR"),
                str(b, "formula", null));
    }

    @Transactional
    public boolean updatePerspective(long id, Map<String, Object> b) {
        String incomingName = str(b, "name", null);
        String nameToSave = (incomingName == null || incomingName.isBlank())
                ? jdbc.queryForObject("SELECT name FROM sc_perspectives WHERE id=?", String.class, id)
                : incomingName;
        return jdbc.update(
                "UPDATE sc_perspectives SET name=?, description=?, weight=?, aggregation_method=?, "
                        + "classification_type=?, display_order=?, formula=? WHERE id=?",
                nameToSave, str(b, "description", null), dec(b, "weight", BigDecimal.ZERO),
                str(b, "aggregationMethod", "WEIGHTED"), str(b, "classificationType", "THREE_COLOR"),
                intg(b, "displayOrder", 0), str(b, "formula", null), id) > 0;
    }

    @Transactional
    public boolean deletePerspective(long id) {
        return jdbc.update("DELETE FROM sc_perspectives WHERE id=?", id) > 0;
    }

    // ---------------- OBJECTIVE ----------------

    public Map<String, Object> getObjective(long id) {
        List<Map<String, Object>> rows = jdbc.queryForList(
                "SELECT id, perspective_id, code, name, description, weight, aggregation_method, "
                        + "classification_type, knockout_enabled, knockout_threshold, pass_rate_threshold, "
                        + "display_order, formula FROM sc_objectives WHERE id = ?", id);
        return rows.isEmpty() ? java.util.Collections.emptyMap() : rows.get(0);
    }

    @Transactional
    public long createObjective(Map<String, Object> b) {
        return insert(
                "INSERT INTO sc_objectives (perspective_id, code, name, description, display_order, weight, "
                        + "aggregation_method, classification_type, knockout_enabled, knockout_threshold, "
                        + "pass_rate_threshold, formula) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
                lng(b, "perspectiveId", 0L), str(b, "code", null), str(b, "name", "Objective"),
                str(b, "description", null), intg(b, "displayOrder", 0), dec(b, "weight", BigDecimal.ZERO),
                str(b, "aggregationMethod", "WEIGHTED"), str(b, "classificationType", "THREE_COLOR"),
                bln(b, "knockoutEnabled"), dec(b, "knockoutThreshold", new BigDecimal("80")),
                dec(b, "passRateThreshold", new BigDecimal("95")), str(b, "formula", null));
    }

    @Transactional
    public boolean updateObjective(long id, Map<String, Object> b) {
        String incomingName = str(b, "name", null);
        String nameToSave = (incomingName == null || incomingName.isBlank())
                ? jdbc.queryForObject("SELECT name FROM sc_objectives WHERE id=?", String.class, id)
                : incomingName;
        return jdbc.update(
                "UPDATE sc_objectives SET name=?, description=?, weight=?, aggregation_method=?, "
                        + "classification_type=?, knockout_enabled=?, knockout_threshold=?, pass_rate_threshold=?, "
                        + "display_order=?, formula=? WHERE id=?",
                nameToSave, str(b, "description", null), dec(b, "weight", BigDecimal.ZERO),
                str(b, "aggregationMethod", "WEIGHTED"), str(b, "classificationType", "THREE_COLOR"),
                bln(b, "knockoutEnabled"), dec(b, "knockoutThreshold", new BigDecimal("80")),
                dec(b, "passRateThreshold", new BigDecimal("95")), intg(b, "displayOrder", 0), str(b, "formula", null), id) > 0;
    }

    @Transactional
    public boolean deleteObjective(long id) {
        return jdbc.update("DELETE FROM sc_objectives WHERE id=?", id) > 0;
    }

    // ---------------- KPI ----------------

    public Map<String, Object> getKpi(long id) {
        List<Map<String, Object>> rows = jdbc.queryForList(
                "SELECT id, objective_id, code, name, description, polarity, target_value, min_target, "
                        + "max_target, data_type, currency_code, weight, measurement_frequency, "
                        + "null_handling, achievement_cap, classification_type, formula, actual_formula, "
                        + "ytd_formula, display_order, created_by, updated_by, created_at, updated_at, "
                        + "contribution, sub_weight, data_source, owner, thresholds, indicator_type "
                        + "FROM sc_kpis WHERE id = ?", id);
        return rows.isEmpty() ? java.util.Collections.emptyMap() : rows.get(0);
    }

    @Transactional
    public long createKpi(Map<String, Object> b) {
        return insert(
                "INSERT INTO sc_kpis (objective_id, code, name, description, polarity, target_value, min_target, "
                        + "max_target, data_type, currency_code, weight, measurement_frequency, null_handling, "
                        + "achievement_cap, classification_type, display_order, formula, actual_formula, ytd_formula, "
                        + "created_by, updated_by, contribution, sub_weight, data_source, owner, thresholds, indicator_type) "
                        + "VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
                lng(b, "objectiveId", 0L), str(b, "code", null), str(b, "name", "KPI"), str(b, "description", null),
                // polarity = scoring direction (HIGHER/LOWER/TARGET/RANGE); Lead/Lag goes to indicator_type
                str(b, "direction", "HIGHER"), dec(b, "targetValue", BigDecimal.ZERO), decOrNull(b, "minTarget"),
                decOrNull(b, "maxTarget"), str(b, "dataType", "NUMBER"), str(b, "currencyCode", null),
                dec(b, "weight", BigDecimal.ZERO), str(b, "measurementFrequency", null),
                str(b, "nullHandling", "EXCLUDE"), dec(b, "achievementCap", new BigDecimal("150")),
                str(b, "classificationType", "THREE_COLOR"), intg(b, "displayOrder", 0), str(b, "formula", null),
                str(b, "actualFormula", null), str(b, "ytdFormula", null),
                str(b, "createdByName", null), str(b, "createdByName", null),
                decOrNull(b, "contribution"), decOrNull(b, "subWeight"), str(b, "dataSource", null),
                str(b, "owner", null), str(b, "thresholds", null), str(b, "indicatorType", null));
    }

    @Transactional
    public boolean updateKpi(long id, Map<String, Object> b) {
        // Non-destructive update: the edit form only carries a subset of fields, so any
        // column the caller doesn't supply keeps its current DB value (instead of being
        // reset to a default, which would wipe target/min/max/dataType/etc.).
        List<Map<String, Object>> exRows = jdbc.queryForList(
                "SELECT name, description, polarity, target_value, min_target, max_target, data_type, "
                        + "currency_code, weight, measurement_frequency, null_handling, achievement_cap, "
                        + "classification_type, display_order, formula, actual_formula, ytd_formula, created_by, "
                        + "contribution, sub_weight, data_source, owner, thresholds, indicator_type "
                        + "FROM sc_kpis WHERE id = ?", id);
        Map<String, Object> ex = exRows.isEmpty() ? java.util.Collections.emptyMap() : exRows.get(0);
        Integer exDisplay = ex.get("display_order") == null ? 0 : ((Number) ex.get("display_order")).intValue();
        return jdbc.update(
                "UPDATE sc_kpis SET name=?, description=?, polarity=?, target_value=?, min_target=?, max_target=?, "
                        + "data_type=?, currency_code=?, weight=?, measurement_frequency=?, null_handling=?, "
                        + "achievement_cap=?, classification_type=?, display_order=?, formula=?, "
                        + "actual_formula=?, ytd_formula=?, updated_by=?, contribution=?, sub_weight=?, "
                        + "data_source=?, owner=?, thresholds=?, indicator_type=?, updated_at=CURRENT_TIMESTAMP WHERE id=?",
                str(b, "name", (String) ex.get("name")),
                str(b, "description", (String) ex.get("description")),
                str(b, "direction", (String) ex.get("polarity")),
                dec(b, "targetValue", (BigDecimal) ex.get("target_value")),
                dec(b, "minTarget", (BigDecimal) ex.get("min_target")),
                dec(b, "maxTarget", (BigDecimal) ex.get("max_target")),
                str(b, "dataType", (String) ex.get("data_type")),
                str(b, "currencyCode", (String) ex.get("currency_code")),
                dec(b, "weight", (BigDecimal) ex.get("weight")),
                str(b, "measurementFrequency", (String) ex.get("measurement_frequency")),
                str(b, "nullHandling", (String) ex.get("null_handling")),
                dec(b, "achievementCap", (BigDecimal) ex.get("achievement_cap")),
                str(b, "classificationType", (String) ex.get("classification_type")),
                intg(b, "displayOrder", exDisplay),
                str(b, "formula", (String) ex.get("formula")),
                str(b, "actualFormula", (String) ex.get("actual_formula")),
                str(b, "ytdFormula", (String) ex.get("ytd_formula")),
                str(b, "updatedByName", (String) ex.get("created_by")),
                dec(b, "contribution", (BigDecimal) ex.get("contribution")),
                dec(b, "subWeight", (BigDecimal) ex.get("sub_weight")),
                str(b, "dataSource", (String) ex.get("data_source")),
                str(b, "owner", (String) ex.get("owner")),
                str(b, "thresholds", (String) ex.get("thresholds")),
                str(b, "indicatorType", (String) ex.get("indicator_type")), id) > 0;
    }

    @Transactional
    public boolean deleteKpi(long id) {
        return jdbc.update("DELETE FROM sc_kpis WHERE id=?", id) > 0;
    }

    // ---------------- SUB-KPI ----------------

    public Map<String, Object> getSubKpi(long id) {
        List<Map<String, Object>> rows = jdbc.queryForList(
                "SELECT id, kpi_id, code, name, target_value, polarity, weight, data_type, "
                        + "achievement_cap, display_order, indicator_type, formula, actual_formula, ytd_formula FROM sc_sub_kpis WHERE id = ?", id);
        return rows.isEmpty() ? java.util.Collections.emptyMap() : rows.get(0);
    }

    @Transactional
    public long createSubKpi(Map<String, Object> b) {
        return insert(
                "INSERT INTO sc_sub_kpis (kpi_id, code, name, target_value, polarity, weight, data_type, "
                        + "achievement_cap, display_order, indicator_type, formula, actual_formula, ytd_formula) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)",
                lng(b, "kpiId", 0L), str(b, "code", null), str(b, "name", "Sub-KPI"),
                dec(b, "targetValue", BigDecimal.ZERO), str(b, "direction", "HIGHER"),
                dec(b, "weight", BigDecimal.ONE), str(b, "dataType", "NUMBER"),
                dec(b, "achievementCap", new BigDecimal("150")), intg(b, "displayOrder", 0),
                str(b, "indicatorType", null), str(b, "formula", null), str(b, "actualFormula", null), str(b, "ytdFormula", null));
    }

    @Transactional
    public boolean updateSubKpi(long id, Map<String, Object> b) {
        // Non-destructive: the edit form only carries a subset of fields, so any column the
        // caller doesn't supply keeps its current DB value instead of being reset to a default.
        List<Map<String, Object>> exRows = jdbc.queryForList(
                "SELECT name, target_value, polarity, weight, data_type, achievement_cap, "
                        + "display_order, indicator_type, formula, actual_formula, ytd_formula FROM sc_sub_kpis WHERE id = ?", id);
        Map<String, Object> ex = exRows.isEmpty() ? java.util.Collections.emptyMap() : exRows.get(0);
        Integer exDisplay = ex.get("display_order") == null ? 0 : ((Number) ex.get("display_order")).intValue();
        return jdbc.update(
                "UPDATE sc_sub_kpis SET name=?, target_value=?, polarity=?, weight=?, data_type=?, "
                        + "achievement_cap=?, display_order=?, indicator_type=?, formula=?, actual_formula=?, ytd_formula=? WHERE id=?",
                str(b, "name", (String) ex.get("name")),
                dec(b, "targetValue", (BigDecimal) ex.get("target_value")),
                str(b, "direction", (String) ex.get("polarity")),
                dec(b, "weight", (BigDecimal) ex.get("weight")),
                str(b, "dataType", (String) ex.get("data_type")),
                dec(b, "achievementCap", (BigDecimal) ex.get("achievement_cap")),
                intg(b, "displayOrder", exDisplay),
                str(b, "indicatorType", (String) ex.get("indicator_type")),
                str(b, "formula", (String) ex.get("formula")),
                str(b, "actualFormula", (String) ex.get("actual_formula")),
                str(b, "ytdFormula", (String) ex.get("ytd_formula")), id) > 0;
    }

    @Transactional
    public boolean deleteSubKpi(long id) {
        return jdbc.update("DELETE FROM sc_sub_kpis WHERE id=?", id) > 0;
    }


    // ---------------- sc_sub_measures ----------------

    @Transactional
    public Long createSubMeasure(Map<String, Object> b) {
        jdbc.update(
                "INSERT INTO sc_sub_measures (sub_kpi_id, code, name, target_value, polarity, weight, data_type, "
                        + "achievement_cap, display_order) VALUES (?,?,?,?,?,?,?,?,?)",
                lng(b, "subKpiId", 0L), str(b, "code", null), str(b, "name", "Sub-Measure"),
                dec(b, "targetValue", java.math.BigDecimal.ZERO), str(b, "polarity", "HIGHER"),
                dec(b, "weight", java.math.BigDecimal.ONE), str(b, "dataType", "NUMBER"),
                dec(b, "achievementCap", new java.math.BigDecimal("150")), intg(b, "displayOrder", 0));
        return jdbc.queryForObject("SELECT LAST_INSERT_ID()", Long.class);
    }

    @Transactional
    public boolean updateSubMeasure(long id, Map<String, Object> b) {
        return jdbc.update(
                "UPDATE sc_sub_measures SET name=?, target_value=?, polarity=?, weight=?, data_type=?, "
                        + "achievement_cap=?, display_order=? WHERE id=?",
                str(b, "name", "Sub-Measure"), dec(b, "targetValue", java.math.BigDecimal.ZERO),
                str(b, "polarity", "HIGHER"), dec(b, "weight", java.math.BigDecimal.ONE),
                str(b, "dataType", "NUMBER"), dec(b, "achievementCap", new java.math.BigDecimal("150")),
                intg(b, "displayOrder", 0), id) > 0;
    }

    @Transactional
    public boolean deleteSubMeasure(long id) {
        return jdbc.update("DELETE FROM sc_sub_measures WHERE id=?", id) > 0;
    }

    public List<Map<String, Object>> getSubMeasureHistory(Long subMeasureId, String dateRange) {
        return jdbc.queryForList(
                "SELECT period_start, period_end, actual_value "
                        + "FROM sc_sub_measure_history WHERE sub_measure_id = ? ORDER BY period_end", subMeasureId);
    }

    @Transactional
    public void recordSubMeasureActualBatch(Map<String, Object> body) {
        Long subMeasureId = lng(body, "subMeasureId", 0L);
        List<Map<String, Object>> actuals = (List<Map<String, Object>>) body.get("actuals");
        if (actuals == null || actuals.isEmpty()) return;

        List<Object[]> batchArgs = actuals.stream().map(a -> new Object[]{
                subMeasureId, str(a, "periodStart", null), str(a, "periodEnd", null), decOrNull(a, "actualValue")
        }).collect(java.util.stream.Collectors.toList());

        jdbc.batchUpdate(
                "INSERT INTO sc_sub_measure_history (sub_measure_id, period_start, period_end, actual_value) VALUES (?,cast(? as date),cast(? as date),?) "
                        + "ON CONFLICT (sub_measure_id, period_start, period_end) DO UPDATE SET actual_value=EXCLUDED.actual_value, calculated_at=NOW()",
                batchArgs);
    }

    // ---------------- ACTUALS (kpi_history) ----------------

    @Transactional
    public void recordKpiActualBatch(Map<String, Object> body) {
        Long kpiId = lng(body, "kpiId", 0L);
        List<Map<String, Object>> actuals = (List<Map<String, Object>>) body.get("actuals");
        if (actuals == null || actuals.isEmpty()) return;
        
        List<Object[]> batchArgs = actuals.stream().map(a -> new Object[]{
                kpiId, str(a, "periodStart", null), str(a, "periodEnd", null), decOrNull(a, "actualValue")
        }).collect(java.util.stream.Collectors.toList());

        jdbc.batchUpdate(
                "INSERT INTO sc_kpi_history (kpi_id, period_start, period_end, actual_value) VALUES (?,cast(? as date),cast(? as date),?) "
                        + "ON CONFLICT (kpi_id, period_start, period_end) DO UPDATE SET actual_value=EXCLUDED.actual_value, calculated_at=NOW()",
                batchArgs);
    }

    @Transactional
    public void recordSubKpiActualBatch(Map<String, Object> body) {
        Long subKpiId = lng(body, "subKpiId", 0L);
        List<Map<String, Object>> actuals = (List<Map<String, Object>>) body.get("actuals");
        if (actuals == null || actuals.isEmpty()) return;

        List<Object[]> batchArgs = actuals.stream().map(a -> new Object[]{
                subKpiId, str(a, "periodStart", null), str(a, "periodEnd", null), decOrNull(a, "actualValue")
        }).collect(java.util.stream.Collectors.toList());

        jdbc.batchUpdate(
                "INSERT INTO sc_sub_kpi_history (sub_kpi_id, period_start, period_end, actual_value) VALUES (?,cast(? as date),cast(? as date),?) "
                        + "ON CONFLICT (sub_kpi_id, period_start, period_end) DO UPDATE SET actual_value=EXCLUDED.actual_value, calculated_at=NOW()",
                batchArgs);
    }


    public List<Map<String, Object>> getKpiHistory(Long kpiId, String dateRange) {
        return jdbc.queryForList(
                "SELECT period_start, period_end, actual_value "
                        + "FROM sc_kpi_history WHERE kpi_id = ? ORDER BY period_end", kpiId);
    }

    public List<Map<String, Object>> getSubKpiHistory(Long subKpiId, String dateRange) {
        return jdbc.queryForList(
                "SELECT period_start, period_end, actual_value "
                        + "FROM sc_sub_kpi_history WHERE sub_kpi_id = ? ORDER BY period_end", subKpiId);
    }


    @Transactional
    public void recordKpiActual(Map<String, Object> b) {
        jdbc.update(
                "INSERT INTO sc_kpi_history (kpi_id, period_start, period_end, actual_value) VALUES (?,cast(? as date),cast(? as date),?) "
                        + "ON CONFLICT (kpi_id, period_start, period_end) DO UPDATE SET actual_value=EXCLUDED.actual_value, calculated_at=NOW()",
                lng(b, "kpiId", 0L), str(b, "periodStart", null), str(b, "periodEnd", null),
                decOrNull(b, "actualValue"));
    }

    @Transactional
    public void recordSubKpiActual(Map<String, Object> b) {
        jdbc.update(
                "INSERT INTO sc_sub_kpi_history (sub_kpi_id, period_start, period_end, actual_value) VALUES (?,cast(? as date),cast(? as date),?) "
                        + "ON CONFLICT (sub_kpi_id, period_start, period_end) DO UPDATE SET actual_value=EXCLUDED.actual_value, calculated_at=NOW()",
                lng(b, "subKpiId", 0L), str(b, "periodStart", null), str(b, "periodEnd", null),
                decOrNull(b, "actualValue"));
    }

    // ---------------- Excel import (Actual/Target only) ----------------

    /**
     * Applies Actual/Target values from an uploaded scorecard Excel to the sc_
     * schema. Each row carries a KPI code (e.g. "BOARD.1.1.1"); it's resolved to
     * the KPI on the given page's scorecard and upserted into sc_kpi_history for
     * the selected reporting period. Blank values are left untouched.
     */
    @Transactional
    public Map<String, Object> importActuals(Long pageId, String dateRange, List<Map<String, Object>> rows) {
        Map<String, Object> result = new HashMap<>();
        int kpiUpdated = 0, subKpiUpdated = 0, skipped = 0, unmatched = 0;

        // Ensure schema is ready — idempotent, safe to run every time
        ensureSubKpiHistorySchema();

        if (rows == null || rows.isEmpty()) {
            result.put("updated", 0); result.put("skipped", 0); result.put("unmatched", 0);
            return result;
        }
        LocalDate[] range = parseRange(dateRange);
        String defaultPeriodStart = range[0].toString();
        String defaultPeriodEnd   = range[1].toString();

        // Load KPI codes for THIS scorecard (page-scoped)
        List<Map<String, Object>> sc = jdbc.queryForList(
                "SELECT id FROM sc_scorecards WHERE page_id = ? AND is_active = true AND is_deleted = false ORDER BY id LIMIT 1",
                pageId);
        Map<String, Long> kpiCodeToId = new HashMap<>();
        if (!sc.isEmpty()) {
            Long scorecardId = ((Number) sc.get(0).get("id")).longValue();
            kpiCodeToId = loadCodeToIdMap(scorecardId);
        }

        // Also load ALL SubKPI codes globally (SubKPIs are always identified by their own unique code)
        Map<String, Long> subKpiCodeToId = new HashMap<>();
        jdbc.queryForList("SELECT id, code FROM sc_sub_kpis WHERE code IS NOT NULL")
            .forEach(r -> {
                String c = r.get("code") != null ? r.get("code").toString().trim() : null;
                if (c != null && !c.isEmpty()) subKpiCodeToId.put(c, ((Number) r.get("id")).longValue());
            });

        List<HistoryUpsert> kpiUpserts = new ArrayList<>();
        for (Map<String, Object> row : rows) {
            BigDecimal actual = parseNumber(firstPresent(row, "actual", "Actual Field", "Actual", "ACTUAL"));
            BigDecimal target = parseNumber(firstPresent(row, "target", "Target Field", "Target", "TARGET"));
            if (actual == null && target == null) { skipped++; continue; }

            // Period: support "Period" (values file), "periodStart", "Period Start", "period_start"
            Object periodStrObj = firstPresent(row, "Period", "period", "periodStart", "Period Start", "period_start");
            String periodStr   = periodStrObj != null ? periodStrObj.toString() : null;
            String periodStart = parseRowDate(periodStr, defaultPeriodStart);
            String frequency   = firstNonBlank(row, "Frequency", "frequency", "Measurement Frequency");
            Object periodEndObj = firstPresent(row, "periodEnd", "Period End", "period_end");
            String periodEndRaw = periodEndObj != null ? periodEndObj.toString() : null;
            String periodEnd;
            if (periodEndRaw != null && !periodEndRaw.isBlank()) {
                periodEnd = parseRowDate(periodEndRaw, defaultPeriodEnd);
            } else {
                // Calculate from frequency when not explicitly provided
                periodEnd = calcPeriodEnd(periodStart, frequency);
            }

            // ---- SubKPI row? (has SubKPI ID column) ----
            String subKpiCode = firstNonBlank(row, "SubKPI ID", "Sub KPI ID", "SUBKPIID", "subKpiId");
            if (subKpiCode != null && !subKpiCode.isBlank()) {
                Long subKpiId = subKpiCodeToId.get(subKpiCode.trim());

                // Auto-create the SubKPI if it doesn't exist yet — the values file may define
                // SubKPIs (Sub-K2, Sub-K3...) that weren't in the structure file.
                if (subKpiId == null) {
                    String kpiCode = firstNonBlank(row, "KPI ID", "KPIID", "Kpi ID");
                    Long kpiId = kpiCode != null ? kpiCodeToId.get(kpiCode.trim()) : null;
                    if (kpiId == null) {
                        // Try global lookup if not on this page
                        if (kpiCode != null) {
                            List<Map<String, Object>> kpiRows = jdbc.queryForList(
                                "SELECT id FROM sc_kpis WHERE code = ? AND is_deleted = false LIMIT 1", kpiCode.trim());
                            if (!kpiRows.isEmpty()) kpiId = ((Number) kpiRows.get(0).get("id")).longValue();
                        }
                    }
                    if (kpiId != null) {
                        String skName = firstNonBlank(row, "SubKPI Name", "SubKPI  NAME", "SubKPI NAME", "Sub KPI Name");
                        String skFreq = firstNonBlank(row, "Frequency", "frequency");
                        String skDtRaw = firstNonBlank(row, "Data Type", "DataType");
                        String skDt = skDtRaw != null ? skDtRaw.toUpperCase().replace("PERCENTAGE", "PERCENTAGE")
                                                                              .replace("NUMBER", "NUMBER")
                                                                              .replace("TEXT", "TEXT") : "NUMBER";
                        // Insert new SubKPI
                        KeyHolder kh = new GeneratedKeyHolder();
                        final long fKpiId = kpiId;
                        final String fCode = subKpiCode.trim();
                        final String fName = (skName != null && !skName.isBlank()) ? skName : subKpiCode.trim();
                        final String fDt   = skDt;
                        jdbc.update(con -> {
                            // Ask only for the "id" column. With Statement.RETURN_GENERATED_KEYS,
                            // PostgreSQL returns every column of the new row, which makes
                            // KeyHolder.getKey() throw ("multiple keys") and 500s the whole import.
                            PreparedStatement ps = con.prepareStatement(
                                "INSERT INTO sc_sub_kpis (kpi_id, code, name, target_value, polarity, weight, data_type, "
                                + "null_handling, achievement_cap, display_order) "
                                + "VALUES (?,?,?,0,'HIGHER',0,?,'EXCLUDE',150,1)",
                                new String[]{"id"});
                            ps.setLong(1, fKpiId);
                            ps.setString(2, fCode);
                            ps.setString(3, fName);
                            ps.setString(4, fDt);
                            return ps;
                        }, kh);
                        Number generatedId = kh.getKey();
                        if (generatedId != null) {
                            subKpiId = generatedId.longValue();
                            subKpiCodeToId.put(subKpiCode.trim(), subKpiId);
                            System.out.println("[SubKPI Auto-Create] code='" + subKpiCode + "' id=" + subKpiId + " kpi_id=" + kpiId);
                        }
                    }
                }

                if (subKpiId == null) { unmatched++; continue; }
                jdbc.update(
                    "INSERT INTO sc_sub_kpi_history (sub_kpi_id, period_start, period_end, actual_value, target_value) "
                    + "VALUES (?,CAST(? AS DATE),CAST(? AS DATE),?,?) "
                    + "ON CONFLICT (sub_kpi_id, period_start, period_end) DO UPDATE SET "
                    + "actual_value = COALESCE(EXCLUDED.actual_value, sc_sub_kpi_history.actual_value), "
                    + "target_value = COALESCE(EXCLUDED.target_value, sc_sub_kpi_history.target_value), "
                    + "calculated_at = NOW()",
                    subKpiId, periodStart, periodEnd, actual, target);
                subKpiUpdated++;
                continue;
            }

            // ---- KPI row (no SubKPI ID — match by KPI ID / node key) ----
            String lookupKey = firstNonBlank(row, "kpiId", "nodeKey", "kpiCode", "KPI ID", "KPI ID ");
            Long kpiId = kpiImportKeyResolver.resolveDbId(lookupKey, kpiCodeToId);
            if (kpiId == null) { unmatched++; skipped++; continue; }
            kpiUpserts.add(new HistoryUpsert(kpiId, periodStart, periodEnd, actual, target));
        }

        batchUpsertHistory(kpiUpserts);
        kpiUpdated = kpiUpserts.size();

        int total = kpiUpdated + subKpiUpdated;
        result.put("updated", total);
        result.put("kpiRowsUpdated", kpiUpdated);
        result.put("subKpiRowsUpdated", subKpiUpdated);
        result.put("skipped", skipped);
        result.put("unmatched", unmatched);
        result.put("matchedKpis", kpiCodeToId.size());
        result.put("matchedSubKpis", subKpiCodeToId.size());
        result.put("periodStart", defaultPeriodStart);
        result.put("periodEnd", defaultPeriodEnd);
        if (total == 0 && unmatched > 0) {
            result.put("message",
                    "No rows matched. Check that KPI IDs and SubKPI IDs in your file match the codes in the database. "
                    + "Sample KPI codes on this page: " + sampleCodes(kpiCodeToId)
                    + ". SubKPIs matched globally (" + subKpiCodeToId.size() + " in DB).");
        }
        return result;
    }

    /**
     * Imports Target + Actual values from the values/actuals Excel file format.
     * Each row has: KPI ID, SubKPI ID, Period (date), Target, Actual, Frequency.
     * Looks up SubKPIs by code and upserts into sc_sub_kpi_history + sc_kpi_history.
     *
     * Values file columns: Department ID, Scorecard, Perspective ID, Perspective,
     *   Objective ID, Objective, KPI ID, KPI Name, ..., SubKPI ID, SubKPI Name,
     *   SubKPI Weight, Frequency, Data Type, Period, Target, Actual
     */
    @Transactional
    public Map<String, Object> importValuesFile(List<Map<String, Object>> rows) {
        int kpiUpdated = 0, subKpiUpdated = 0, unmatched = 0, skipped = 0;

        // Ensure schema is ready — idempotent, safe to run every time
        ensureSubKpiHistorySchema();

        // Build code->id maps by scanning the whole database once (all KPIs + SubKPIs)
        Map<String, Long> kpiCodeToId = new HashMap<>();
        jdbc.queryForList("SELECT id, code FROM sc_kpis WHERE code IS NOT NULL AND is_deleted = false")
            .forEach(r -> {
                String c = r.get("code") != null ? r.get("code").toString().trim() : null;
                if (c != null && !c.isEmpty()) kpiCodeToId.put(c, ((Number) r.get("id")).longValue());
            });

        Map<String, Long> subKpiCodeToId = new HashMap<>();
        jdbc.queryForList("SELECT id, code FROM sc_sub_kpis WHERE code IS NOT NULL")
            .forEach(r -> {
                String c = r.get("code") != null ? r.get("code").toString().trim() : null;
                if (c != null && !c.isEmpty()) subKpiCodeToId.put(c, ((Number) r.get("id")).longValue());
            });

        for (Map<String, Object> row : rows) {
            String kpiCode    = firstNonBlank(row, "KPI ID", "KPIID", "Kpi ID");
            String subKpiCode = firstNonBlank(row, "SubKPI ID", "Sub KPI ID", "SUBKPIID");
            String periodStr  = firstNonBlank(row, "Period", "period", "Period Start", "PeriodStart");
            String frequency  = firstNonBlank(row, "Frequency", "frequency", "Measurement Frequency");
            BigDecimal target = parseNumber(firstPresent(row, "Target", "TARGET", "target"));
            BigDecimal actual = parseNumber(firstPresent(row, "Actual", "ACTUAL", "actual"));

            if (target == null && actual == null) { skipped++; continue; }
            if (periodStr == null || periodStr.isBlank()) { skipped++; continue; }

            String periodStart = parseRowDate(periodStr, null);
            if (periodStart == null) { skipped++; continue; }
            String periodEnd = calcPeriodEnd(periodStart, frequency);

            // ---- SubKPI history (auto-create if missing) ----
            if (subKpiCode != null && !subKpiCode.isBlank()) {
                Long subKpiId = subKpiCodeToId.get(subKpiCode.trim());

                if (subKpiId == null) {
                    // SubKPI not in DB — auto-create it under the parent KPI
                    Long kpiId = kpiCode != null ? kpiCodeToId.get(kpiCode.trim()) : null;
                    if (kpiId == null && kpiCode != null) {
                        List<Map<String, Object>> kpiRows = jdbc.queryForList(
                            "SELECT id FROM sc_kpis WHERE code = ? AND is_deleted = false LIMIT 1", kpiCode.trim());
                        if (!kpiRows.isEmpty()) kpiId = ((Number) kpiRows.get(0).get("id")).longValue();
                    }
                    if (kpiId != null) {
                        String skName = firstNonBlank(row, "SubKPI Name", "SubKPI  NAME", "SubKPI NAME", "Sub KPI Name");
                        String skDtRaw = firstNonBlank(row, "Data Type", "DataType");
                        String skDt = skDtRaw != null ? skDtRaw.toUpperCase() : "NUMBER";
                        final long fKpiId = kpiId;
                        final String fCode = subKpiCode.trim();
                        final String fName = (skName != null && !skName.isBlank()) ? skName : subKpiCode.trim();
                        final String fDt = skDt;
                        KeyHolder kh = new GeneratedKeyHolder();
                        jdbc.update(con -> {
                            // Ask only for the "id" column. With Statement.RETURN_GENERATED_KEYS,
                            // PostgreSQL returns every column of the new row, which makes
                            // KeyHolder.getKey() throw ("multiple keys") and 500s the whole import.
                            PreparedStatement ps = con.prepareStatement(
                                "INSERT INTO sc_sub_kpis (kpi_id, code, name, target_value, polarity, weight, data_type, "
                                + "null_handling, achievement_cap, display_order) "
                                + "VALUES (?,?,?,0,'HIGHER',0,?,'EXCLUDE',150,1)",
                                new String[]{"id"});
                            ps.setLong(1, fKpiId);
                            ps.setString(2, fCode);
                            ps.setString(3, fName);
                            ps.setString(4, fDt);
                            return ps;
                        }, kh);
                        Number generatedId = kh.getKey();
                        if (generatedId != null) {
                            subKpiId = generatedId.longValue();
                            subKpiCodeToId.put(subKpiCode.trim(), subKpiId);
                            System.out.println("[SubKPI Auto-Create] code='" + subKpiCode + "' id=" + subKpiId + " kpi_id=" + kpiId);
                        }
                    }
                }

                if (subKpiId != null) {
                    jdbc.update(
                        "INSERT INTO sc_sub_kpi_history (sub_kpi_id, period_start, period_end, actual_value, target_value) "
                        + "VALUES (?,CAST(? AS DATE),CAST(? AS DATE),?,?) "
                        + "ON CONFLICT (sub_kpi_id, period_start, period_end) DO UPDATE SET "
                        + "actual_value = COALESCE(EXCLUDED.actual_value, sc_sub_kpi_history.actual_value), "
                        + "target_value = COALESCE(EXCLUDED.target_value, sc_sub_kpi_history.target_value), "
                        + "calculated_at = NOW()",
                        subKpiId, periodStart, periodEnd, actual, target);
                    subKpiUpdated++;
                } else {
                    unmatched++;
                }
            }

            // ---- KPI history ----
            if (kpiCode != null && !kpiCode.isBlank()) {
                Long kpiId = kpiCodeToId.get(kpiCode.trim());
                if (kpiId != null) {
                    jdbc.update(
                        "INSERT INTO sc_kpi_history (kpi_id, period_start, period_end, actual_value, target_value) "
                        + "VALUES (?,CAST(? AS DATE),CAST(? AS DATE),?,?) "
                        + "ON CONFLICT (kpi_id, period_start, period_end) DO UPDATE SET "
                        + "actual_value = COALESCE(EXCLUDED.actual_value, sc_kpi_history.actual_value), "
                        + "target_value = COALESCE(EXCLUDED.target_value, sc_kpi_history.target_value), "
                        + "calculated_at = NOW()",
                        kpiId, periodStart, periodEnd, actual, target);
                    kpiUpdated++;
                }
            }
        }

        Map<String, Object> result = new HashMap<>();
        result.put("kpiRowsUpdated", kpiUpdated);
        result.put("subKpiRowsUpdated", subKpiUpdated);
        result.put("unmatched", unmatched);
        result.put("skipped", skipped);
        result.put("totalRows", rows.size());
        return result;
    }

    /** Calculate period_end from period_start + frequency. */
    private static String calcPeriodEnd(String periodStart, String frequency) {
        try {
            LocalDate d = LocalDate.parse(periodStart);
            if (frequency != null) {
                String f = frequency.toLowerCase();
                if (f.contains("annual") || f.contains("year")) return d.plusMonths(12).minusDays(1).toString();
                if (f.contains("quarter"))                        return d.plusMonths(3).minusDays(1).toString();
                if (f.contains("semi"))                           return d.plusMonths(6).minusDays(1).toString();
            }
            // Default: Monthly
            return d.plusMonths(1).minusDays(1).toString();
        } catch (Exception e) {
            return periodStart;
        }
    }

    // private Map<String, Long> loadCodeToIdMap(Long scorecardId) {
    //     List<Map<String, Object>> kpiRows = jdbc.queryForList(
    //             "SELECT k.id, k.code FROM sc_kpis k "
    //                     + "JOIN sc_objectives o ON k.objective_id = o.id "
    //                     + "JOIN sc_perspectives p ON o.perspective_id = p.id "
    //                     + "WHERE p.scorecard_id = ? AND k.is_deleted = false",
    //             scorecardId);
    //     Map<String, Long> codeToId = new HashMap<>();
    //     for (Map<String, Object> kr : kpiRows) {
    //         Object code = kr.get("code");
    //         if (code == null) {
    //             continue;
    //         }
    //         jdbc.update(
    //                 "INSERT INTO sc_kpi_history (kpi_id, period_start, period_end, actual_value, target_value) "
    //                         + "VALUES (?,cast(? as date),cast(? as date),?,?) "
    //                         + "ON CONFLICT (kpi_id, period_start, period_end) DO UPDATE SET "
    //                         + "actual_value = COALESCE(EXCLUDED.actual_value, sc_kpi_history.actual_value), "
    //                         + "target_value = COALESCE(EXCLUDED.target_value, sc_kpi_history.target_value), "
    //                         + "calculated_at = NOW()",
    //                 kpiId, periodStart, periodEnd, actual, target);
    //         updated++;
    //         String trimmed = code.toString().trim();
    //         codeToId.putIfAbsent(trimmed, ((Number) kr.get("id")).longValue());
    //         String normalized = KpiImportKeyResolver.normalizeKpiCode(trimmed);
    //         if (!normalized.equals(trimmed)) {
    //             codeToId.putIfAbsent(normalized, ((Number) kr.get("id")).longValue());
    //         }
    //     }
    //     return codeToId;
    // }

    private Map<String, Long> loadCodeToIdMap(Long scorecardId) {
    List<Map<String, Object>> kpiRows = jdbc.queryForList(
            "SELECT k.id, k.code FROM sc_kpis k "
                    + "JOIN sc_objectives o ON k.objective_id = o.id "
                    + "JOIN sc_perspectives p ON o.perspective_id = p.id "
                    + "WHERE p.scorecard_id = ? AND k.is_deleted = false",
            scorecardId);
    Map<String, Long> codeToId = new HashMap<>();
    for (Map<String, Object> kr : kpiRows) {
        Object code = kr.get("code");
        if (code == null) {
            continue;
        }
        // jdbc.update(                          // ← DELETE from here
        //         "INSERT INTO sc_kpi_history...",
        //         kpiId, periodStart, periodEnd, actual, target);
        // updated++;                            // ← to here (these 4 lines)
        String trimmed = code.toString().trim();
        codeToId.putIfAbsent(trimmed, ((Number) kr.get("id")).longValue());
        String normalized = KpiImportKeyResolver.normalizeKpiCode(trimmed);
        if (!normalized.equals(trimmed)) {
            codeToId.putIfAbsent(normalized, ((Number) kr.get("id")).longValue());
        }
    }
    return codeToId;
}

    private void batchUpsertHistory(List<HistoryUpsert> upserts) {
        if (upserts.isEmpty()) {
            return;
        }
        final String sql =
                "INSERT INTO sc_kpi_history (kpi_id, period_start, period_end, actual_value, target_value) "
                        + "VALUES (?,CAST(? AS DATE),CAST(? AS DATE),?,?) "
                        + "ON CONFLICT (kpi_id, period_start, period_end) DO UPDATE SET "
                        + "actual_value = COALESCE(EXCLUDED.actual_value, sc_kpi_history.actual_value), "
                        + "target_value = COALESCE(EXCLUDED.target_value, sc_kpi_history.target_value), "
                        + "calculated_at = NOW()";
        final int batchSize = 250;
        for (int offset = 0; offset < upserts.size(); offset += batchSize) {
            int end = Math.min(offset + batchSize, upserts.size());
            List<HistoryUpsert> slice = upserts.subList(offset, end);
            jdbc.batchUpdate(sql, new BatchPreparedStatementSetter() {
                @Override
                public void setValues(PreparedStatement ps, int i) throws SQLException {
                    HistoryUpsert u = slice.get(i);
                    ps.setLong(1, u.kpiId());
                    ps.setString(2, u.periodStart());
                    ps.setString(3, u.periodEnd());
                    ps.setObject(4, u.actual());
                    ps.setObject(5, u.target());
                }

                @Override
                public int getBatchSize() {
                    return slice.size();
                }
            });
        }
    }

    private record HistoryUpsert(Long kpiId, String periodStart, String periodEnd, BigDecimal actual, BigDecimal target) {}

    private static String sampleCodes(Map<String, Long> codeToId) {
        return codeToId.keySet().stream().limit(3).reduce((a, b) -> a + ", " + b).orElse("see exported template");
    }

    private static String firstNonBlank(Map<String, Object> row, String... keys) {
        for (String key : keys) {
            Object v = row.get(key);
            if (v != null && !v.toString().isBlank()) {
                return v.toString().trim();
            }
        }
        return null;
    }

    private static Object firstPresent(Map<String, Object> row, String... keys) {
        for (String key : keys) {
            if (row.containsKey(key) && row.get(key) != null && !"".equals(row.get(key))) {
                return row.get(key);
            }
        }
        return null;
    }

    private String parseRowDate(Object raw, String fallback) {
        if (raw == null || raw.toString().isBlank()) {
            return fallback;
        }
        LocalDate parsed = parseOne(raw.toString().trim(), null);
        return parsed != null ? parsed.toString() : fallback;
    }

    private static LocalDate[] parseRange(String dateRange) {
        LocalDate start = LocalDate.now().withDayOfMonth(1);
        LocalDate end = LocalDate.now();
        if (dateRange != null && dateRange.contains("-")) {
            String[] parts = dateRange.split("-");
            if (parts.length >= 2) {
                start = parseOne(parts[0].trim(), start);
                end = parseOne(parts[1].trim(), end);
            }
        }
        return new LocalDate[]{start, end};
    }

    private static LocalDate parseOne(String s, LocalDate fallback) {
        if (s == null || s.isBlank()) return fallback;

        // Excel serial date number (e.g., 45923 → date). XLSX.js sends these as numbers.
        try {
            double serial = Double.parseDouble(s.trim());
            if (serial > 1000 && serial < 100000) { // sanity check: valid Excel serial range
                // Excel epoch is 1899-12-30 (with a leap year bug)
                return LocalDate.of(1899, 12, 30).plusDays((long) serial);
            }
        } catch (NumberFormatException ignore) { /* not a number */ }

        // Truncate ISO timestamp to date part: "2026-01-01T00:00:00.000Z" → "2026-01-01"
        String clean = s.contains("T") ? s.substring(0, s.indexOf('T')) : s.trim();

        for (DateTimeFormatter f : new DateTimeFormatter[]{
                DateTimeFormatter.ofPattern("yyyy-MM-dd"),
                DateTimeFormatter.ofPattern("MM/dd/yyyy"),
                DateTimeFormatter.ofPattern("dd/MM/yyyy"),
                DateTimeFormatter.ofPattern("dd-MM-yyyy"),
                DateTimeFormatter.ofPattern("yyyy/MM/dd"),
                DateTimeFormatter.ofPattern("MMM d, yyyy", java.util.Locale.ENGLISH),
                DateTimeFormatter.ofPattern("d MMM yyyy", java.util.Locale.ENGLISH)}) {
            try {
                return LocalDate.parse(clean, f);
            } catch (Exception ignore) {
                // try next
            }
        }
        return fallback;
    }

    private static BigDecimal parseNumber(Object v) {
        if (v == null) {
            return null;
        }
        String s = v.toString().replaceAll("[,%$\\s]", "").trim();
        if (s.isEmpty()) {
            return null;
        }
        try {
            return new BigDecimal(s);
        } catch (NumberFormatException e) {
            return null;
        }
    }

    // ---------------- helpers ----------------

    private long insert(String sql, Object... args) {
        KeyHolder kh = new GeneratedKeyHolder();
        jdbc.update(con -> {
            // Ask only for the "id" column; PostgreSQL otherwise returns every column,
            // which makes KeyHolder.getKey() throw ("multiple keys").
            PreparedStatement ps = con.prepareStatement(sql, new String[]{"id"});
            for (int i = 0; i < args.length; i++) {
                ps.setObject(i + 1, args[i]);
            }
            return ps;
        }, kh);
        Map<String, Object> keys = kh.getKeys();
        Object id = null;
        if (keys != null) {
            id = keys.containsKey("id") ? keys.get("id")
                    : (keys.size() == 1 ? keys.values().iterator().next() : null);
        }
        return id instanceof Number ? ((Number) id).longValue() : -1L;
    }

    private static String str(Map<String, Object> b, String k, String def) {
        Object v = b.get(k);
        return v == null ? def : v.toString();
    }

    private static Long lng(Map<String, Object> b, String k, Long def) {
        Object v = b.get(k);
        if (v == null) return def;
        if (v instanceof Number) return ((Number) v).longValue();
        try { return Long.parseLong(v.toString()); } catch (NumberFormatException e) { return def; }
    }

    private static Long lngOrNull(Map<String, Object> b, String k) {
        return lng(b, k, null);
    }

    private static int intg(Map<String, Object> b, String k, int def) {
        Object v = b.get(k);
        if (v == null) return def;
        if (v instanceof Number) return ((Number) v).intValue();
        try { return Integer.parseInt(v.toString()); } catch (NumberFormatException e) { return def; }
    }

    private static boolean bln(Map<String, Object> b, String k) {
        Object v = b.get(k);
        if (v == null) return false;
        if (v instanceof Boolean) return (Boolean) v;
        if (v instanceof Number) return ((Number) v).intValue() != 0;
        return Boolean.parseBoolean(v.toString());
    }

    private static BigDecimal dec(Map<String, Object> b, String k, BigDecimal def) {
        Object v = b.get(k);
        if (v == null) return def;
        if (v instanceof BigDecimal) return (BigDecimal) v;
        if (v instanceof Number) return new BigDecimal(v.toString());
        try { return new BigDecimal(v.toString()); } catch (NumberFormatException e) { return def; }
    }

    private static BigDecimal decOrNull(Map<String, Object> b, String k) {
        return dec(b, k, null);
    }
}
