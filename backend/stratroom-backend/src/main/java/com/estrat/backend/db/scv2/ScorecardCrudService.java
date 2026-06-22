package com.estrat.backend.db.scv2;

import java.math.BigDecimal;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import jakarta.annotation.PostConstruct;
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

    @PostConstruct
    public void initSchema() {
        try { jdbc.execute("ALTER TABLE sc_scorecards ADD COLUMN formula TEXT"); } catch (Exception ignore) {}
        try { jdbc.execute("ALTER TABLE sc_perspectives ADD COLUMN formula TEXT"); } catch (Exception ignore) {}
        try { jdbc.execute("ALTER TABLE sc_objectives ADD COLUMN formula TEXT"); } catch (Exception ignore) {}
        try { jdbc.execute("ALTER TABLE sc_kpis ADD COLUMN formula TEXT"); } catch (Exception ignore) {}
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
        return jdbc.update(
                "UPDATE sc_scorecards SET name=?, description=?, classification_type=?, updated_by=?, formula=? WHERE id=?",
                nameToSave, str(b, "description", null),
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
                bln(b, "knockoutEnabled") ? 1 : 0, dec(b, "knockoutThreshold", new BigDecimal("80")),
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
                bln(b, "knockoutEnabled") ? 1 : 0, dec(b, "knockoutThreshold", new BigDecimal("80")),
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
                        + "null_handling, achievement_cap, classification_type, formula, display_order "
                        + "FROM sc_kpis WHERE id = ?", id);
        return rows.isEmpty() ? java.util.Collections.emptyMap() : rows.get(0);
    }

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
                        + "achievement_cap=?, classification_type=?, display_order=?, formula=? WHERE id=?",
                str(b, "name", "KPI"), str(b, "description", null), str(b, "polarity", "HIGHER"),
                dec(b, "targetValue", BigDecimal.ZERO), decOrNull(b, "minTarget"), decOrNull(b, "maxTarget"),
                str(b, "dataType", "NUMBER"), str(b, "currencyCode", null), dec(b, "weight", BigDecimal.ZERO),
                str(b, "measurementFrequency", null), str(b, "nullHandling", "EXCLUDE"),
                dec(b, "achievementCap", new BigDecimal("150")), str(b, "classificationType", "THREE_COLOR"),
                intg(b, "displayOrder", 0), str(b, "formula", null), id) > 0;
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
        int updated = 0;
        int skipped = 0;
        if (rows == null || rows.isEmpty()) {
            result.put("updated", 0);
            result.put("skipped", 0);
            return result;
        }
        LocalDate[] range = parseRange(dateRange);
        String periodStart = range[0].toString();
        String periodEnd = range[1].toString();

        List<Map<String, Object>> sc = jdbc.queryForList(
                "SELECT id FROM sc_scorecards WHERE page_id = ? AND is_active = 1 AND is_deleted = 0 ORDER BY id LIMIT 1",
                pageId);
        if (sc.isEmpty()) {
            result.put("error", "No scorecard found for page " + pageId);
            result.put("updated", 0);
            result.put("skipped", rows.size());
            return result;
        }
        Long scorecardId = ((Number) sc.get(0).get("id")).longValue();

        List<Map<String, Object>> kpiRows = jdbc.queryForList(
                "SELECT k.id, k.code FROM sc_kpis k "
                        + "JOIN sc_objectives o ON k.objective_id = o.id "
                        + "JOIN sc_perspectives p ON o.perspective_id = p.id "
                        + "WHERE p.scorecard_id = ? AND k.is_deleted = 0",
                scorecardId);
        Map<String, Long> codeToId = new HashMap<>();
        for (Map<String, Object> kr : kpiRows) {
            Object code = kr.get("code");
            if (code != null) {
                codeToId.put(code.toString().trim(), ((Number) kr.get("id")).longValue());
            }
        }

        for (Map<String, Object> row : rows) {
            Object codeObj = row.get("kpiId");
            Long kpiId = codeObj == null ? null : codeToId.get(codeObj.toString().trim());
            BigDecimal actual = parseNumber(row.get("actual"));
            BigDecimal target = parseNumber(row.get("target"));
            if (kpiId == null || (actual == null && target == null)) {
                skipped++;
                continue;
            }
            jdbc.update(
                    "INSERT INTO sc_kpi_history (kpi_id, period_start, period_end, actual_value, target_value) "
                            + "VALUES (?,cast(? as date),cast(? as date),?,?) "
                            + "ON CONFLICT (kpi_id, period_start, period_end) DO UPDATE SET "
                            + "actual_value = COALESCE(EXCLUDED.actual_value, sc_kpi_history.actual_value), "
                            + "target_value = COALESCE(EXCLUDED.target_value, sc_kpi_history.target_value), "
                            + "calculated_at = NOW()",
                    kpiId, periodStart, periodEnd, actual, target);
            updated++;
        }
        result.put("updated", updated);
        result.put("skipped", skipped);
        result.put("periodStart", periodStart);
        result.put("periodEnd", periodEnd);
        return result;
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
        for (DateTimeFormatter f : new DateTimeFormatter[]{
                DateTimeFormatter.ofPattern("MM/dd/yyyy"),
                DateTimeFormatter.ofPattern("yyyy-MM-dd")}) {
            try {
                return LocalDate.parse(s, f);
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
