package com.estrat.backend.db.scv2;

import java.math.BigDecimal;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
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

    @Autowired
    public ScorecardCrudService(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    // ---------------- SCORECARD ----------------

    @Transactional
    public long createScorecard(Map<String, Object> b) {
        return insert(
                "INSERT INTO sc_scorecards (page_id, name, description, owner_id, department_id, "
                        + "classification_type, created_by) VALUES (?,?,?,?,?,?,?)",
                lng(b, "pageId", 0L), str(b, "name", "Scorecard"), str(b, "description", null),
                lng(b, "ownerId", 0L), lngOrNull(b, "departmentId"),
                str(b, "classificationType", "THREE_COLOR"), lng(b, "createdBy", 0L));
    }

    @Transactional
    public boolean updateScorecard(long id, Map<String, Object> b) {
        return jdbc.update(
                "UPDATE sc_scorecards SET name=?, description=?, classification_type=?, updated_by=? WHERE id=?",
                str(b, "name", "Scorecard"), str(b, "description", null),
                str(b, "classificationType", "THREE_COLOR"), lng(b, "updatedBy", 0L), id) > 0;
    }

    @Transactional
    public boolean deleteScorecard(long id) {
        return jdbc.update("DELETE FROM sc_scorecards WHERE id=?", id) > 0;
    }

    // ---------------- PERSPECTIVE ----------------

    @Transactional
    public long createPerspective(Map<String, Object> b) {
        return insert(
                "INSERT INTO sc_perspectives (scorecard_id, code, name, description, display_order, weight, "
                        + "aggregation_method, classification_type) VALUES (?,?,?,?,?,?,?,?)",
                lng(b, "scorecardId", 0L), str(b, "code", null), str(b, "name", "Perspective"),
                str(b, "description", null), intg(b, "displayOrder", 0), dec(b, "weight", BigDecimal.ZERO),
                str(b, "aggregationMethod", "WEIGHTED"), str(b, "classificationType", "THREE_COLOR"));
    }

    @Transactional
    public boolean updatePerspective(long id, Map<String, Object> b) {
        return jdbc.update(
                "UPDATE sc_perspectives SET name=?, description=?, weight=?, aggregation_method=?, "
                        + "classification_type=?, display_order=? WHERE id=?",
                str(b, "name", "Perspective"), str(b, "description", null), dec(b, "weight", BigDecimal.ZERO),
                str(b, "aggregationMethod", "WEIGHTED"), str(b, "classificationType", "THREE_COLOR"),
                intg(b, "displayOrder", 0), id) > 0;
    }

    @Transactional
    public boolean deletePerspective(long id) {
        return jdbc.update("DELETE FROM sc_perspectives WHERE id=?", id) > 0;
    }

    // ---------------- OBJECTIVE ----------------

    @Transactional
    public long createObjective(Map<String, Object> b) {
        return insert(
                "INSERT INTO sc_objectives (perspective_id, code, name, description, display_order, weight, "
                        + "aggregation_method, classification_type, knockout_enabled, knockout_threshold, "
                        + "pass_rate_threshold) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
                lng(b, "perspectiveId", 0L), str(b, "code", null), str(b, "name", "Objective"),
                str(b, "description", null), intg(b, "displayOrder", 0), dec(b, "weight", BigDecimal.ZERO),
                str(b, "aggregationMethod", "WEIGHTED"), str(b, "classificationType", "THREE_COLOR"),
                bln(b, "knockoutEnabled") ? 1 : 0, dec(b, "knockoutThreshold", new BigDecimal("80")),
                dec(b, "passRateThreshold", new BigDecimal("95")));
    }

    @Transactional
    public boolean updateObjective(long id, Map<String, Object> b) {
        return jdbc.update(
                "UPDATE sc_objectives SET name=?, description=?, weight=?, aggregation_method=?, "
                        + "classification_type=?, knockout_enabled=?, knockout_threshold=?, pass_rate_threshold=?, "
                        + "display_order=? WHERE id=?",
                str(b, "name", "Objective"), str(b, "description", null), dec(b, "weight", BigDecimal.ZERO),
                str(b, "aggregationMethod", "WEIGHTED"), str(b, "classificationType", "THREE_COLOR"),
                bln(b, "knockoutEnabled") ? 1 : 0, dec(b, "knockoutThreshold", new BigDecimal("80")),
                dec(b, "passRateThreshold", new BigDecimal("95")), intg(b, "displayOrder", 0), id) > 0;
    }

    @Transactional
    public boolean deleteObjective(long id) {
        return jdbc.update("DELETE FROM sc_objectives WHERE id=?", id) > 0;
    }

    // ---------------- KPI ----------------

    @Transactional
    public long createKpi(Map<String, Object> b) {
        return insert(
                "INSERT INTO sc_kpis (objective_id, code, name, description, polarity, target_value, min_target, "
                        + "max_target, data_type, currency_code, weight, measurement_frequency, null_handling, "
                        + "achievement_cap, classification_type, display_order) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
                lng(b, "objectiveId", 0L), str(b, "code", null), str(b, "name", "KPI"), str(b, "description", null),
                str(b, "polarity", "HIGHER"), dec(b, "targetValue", BigDecimal.ZERO), decOrNull(b, "minTarget"),
                decOrNull(b, "maxTarget"), str(b, "dataType", "NUMBER"), str(b, "currencyCode", null),
                dec(b, "weight", BigDecimal.ZERO), str(b, "measurementFrequency", null),
                str(b, "nullHandling", "EXCLUDE"), dec(b, "achievementCap", new BigDecimal("150")),
                str(b, "classificationType", "THREE_COLOR"), intg(b, "displayOrder", 0));
    }

    @Transactional
    public boolean updateKpi(long id, Map<String, Object> b) {
        return jdbc.update(
                "UPDATE sc_kpis SET name=?, description=?, polarity=?, target_value=?, min_target=?, max_target=?, "
                        + "data_type=?, currency_code=?, weight=?, measurement_frequency=?, null_handling=?, "
                        + "achievement_cap=?, classification_type=?, display_order=? WHERE id=?",
                str(b, "name", "KPI"), str(b, "description", null), str(b, "polarity", "HIGHER"),
                dec(b, "targetValue", BigDecimal.ZERO), decOrNull(b, "minTarget"), decOrNull(b, "maxTarget"),
                str(b, "dataType", "NUMBER"), str(b, "currencyCode", null), dec(b, "weight", BigDecimal.ZERO),
                str(b, "measurementFrequency", null), str(b, "nullHandling", "EXCLUDE"),
                dec(b, "achievementCap", new BigDecimal("150")), str(b, "classificationType", "THREE_COLOR"),
                intg(b, "displayOrder", 0), id) > 0;
    }

    @Transactional
    public boolean deleteKpi(long id) {
        return jdbc.update("DELETE FROM sc_kpis WHERE id=?", id) > 0;
    }

    // ---------------- SUB-KPI ----------------

    @Transactional
    public long createSubKpi(Map<String, Object> b) {
        return insert(
                "INSERT INTO sc_sub_kpis (kpi_id, code, name, target_value, polarity, weight, data_type, "
                        + "achievement_cap, display_order) VALUES (?,?,?,?,?,?,?,?,?)",
                lng(b, "kpiId", 0L), str(b, "code", null), str(b, "name", "Sub-KPI"),
                dec(b, "targetValue", BigDecimal.ZERO), str(b, "polarity", "HIGHER"),
                dec(b, "weight", BigDecimal.ONE), str(b, "dataType", "NUMBER"),
                dec(b, "achievementCap", new BigDecimal("150")), intg(b, "displayOrder", 0));
    }

    @Transactional
    public boolean updateSubKpi(long id, Map<String, Object> b) {
        return jdbc.update(
                "UPDATE sc_sub_kpis SET name=?, target_value=?, polarity=?, weight=?, data_type=?, "
                        + "achievement_cap=?, display_order=? WHERE id=?",
                str(b, "name", "Sub-KPI"), dec(b, "targetValue", BigDecimal.ZERO), str(b, "polarity", "HIGHER"),
                dec(b, "weight", BigDecimal.ONE), str(b, "dataType", "NUMBER"),
                dec(b, "achievementCap", new BigDecimal("150")), intg(b, "displayOrder", 0), id) > 0;
    }

    @Transactional
    public boolean deleteSubKpi(long id) {
        return jdbc.update("DELETE FROM sc_sub_kpis WHERE id=?", id) > 0;
    }

    // ---------------- ACTUALS (kpi_history) ----------------

    @Transactional
    public void recordKpiActual(Map<String, Object> b) {
        jdbc.update(
                "INSERT INTO sc_kpi_history (kpi_id, period_start, period_end, actual_value) VALUES (?,?,?,?) "
                        + "ON DUPLICATE KEY UPDATE actual_value=VALUES(actual_value), calculated_at=NOW()",
                lng(b, "kpiId", 0L), str(b, "periodStart", null), str(b, "periodEnd", null),
                decOrNull(b, "actualValue"));
    }

    @Transactional
    public void recordSubKpiActual(Map<String, Object> b) {
        jdbc.update(
                "INSERT INTO sc_sub_kpi_history (sub_kpi_id, period_start, period_end, actual_value) VALUES (?,?,?,?) "
                        + "ON DUPLICATE KEY UPDATE actual_value=VALUES(actual_value), calculated_at=NOW()",
                lng(b, "subKpiId", 0L), str(b, "periodStart", null), str(b, "periodEnd", null),
                decOrNull(b, "actualValue"));
    }

    // ---------------- helpers ----------------

    private long insert(String sql, Object... args) {
        KeyHolder kh = new GeneratedKeyHolder();
        jdbc.update(con -> {
            PreparedStatement ps = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            for (int i = 0; i < args.length; i++) {
                ps.setObject(i + 1, args[i]);
            }
            return ps;
        }, kh);
        Number key = kh.getKey();
        return key == null ? -1L : key.longValue();
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
