package com.estrat.backend.db.scv2;

import java.math.BigDecimal;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Statement;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
                bln(b, "knockoutEnabled"), dec(b, "knockoutThreshold", new BigDecimal("80")),
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
                bln(b, "knockoutEnabled"), dec(b, "knockoutThreshold", new BigDecimal("80")),
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
                "INSERT INTO sc_kpi_history (kpi_id, period_start, period_end, actual_value) VALUES (?,CAST(? AS DATE),CAST(? AS DATE),?) "
                        + "ON CONFLICT (kpi_id, period_start, period_end) DO UPDATE SET actual_value=EXCLUDED.actual_value, calculated_at=NOW()",
                lng(b, "kpiId", 0L), str(b, "periodStart", null), str(b, "periodEnd", null),
                decOrNull(b, "actualValue"));
    }

    @Transactional
    public void recordSubKpiActual(Map<String, Object> b) {
        jdbc.update(
                "INSERT INTO sc_sub_kpi_history (sub_kpi_id, period_start, period_end, actual_value) VALUES (?,CAST(? AS DATE),CAST(? AS DATE),?) "
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
        int skipped = 0;
        int unmatched = 0;
        if (rows == null || rows.isEmpty()) {
            result.put("updated", 0);
            result.put("skipped", 0);
            result.put("unmatched", 0);
            return result;
        }
        LocalDate[] range = parseRange(dateRange);
        String defaultPeriodStart = range[0].toString();
        String defaultPeriodEnd = range[1].toString();

        List<Map<String, Object>> sc = jdbc.queryForList(
                "SELECT id FROM sc_scorecards WHERE page_id = ? AND is_active = true AND is_deleted = false ORDER BY id LIMIT 1",
                pageId);
        if (sc.isEmpty()) {
            result.put("error", "No scorecard found for page " + pageId);
            result.put("updated", 0);
            result.put("skipped", rows.size());
            result.put("unmatched", rows.size());
            return result;
        }
        Long scorecardId = ((Number) sc.get(0).get("id")).longValue();
        Map<String, Long> codeToId = loadCodeToIdMap(scorecardId);

        List<HistoryUpsert> upserts = new ArrayList<>();
        for (Map<String, Object> row : rows) {
            String lookupKey = firstNonBlank(row, "kpiId", "nodeKey", "kpiCode", "KPI ID", "KPI ID ");
            Long kpiId = kpiImportKeyResolver.resolveDbId(lookupKey, codeToId);
            BigDecimal actual = parseNumber(firstPresent(row, "actual", "Actual Field", "Actual", "ACTUAL"));
            BigDecimal target = parseNumber(firstPresent(row, "target", "Target Field", "Target", "TARGET"));

            if (kpiId == null) {
                unmatched++;
                skipped++;
                continue;
            }
            if (actual == null && target == null) {
                skipped++;
                continue;
            }

            String periodStart = parseRowDate(firstPresent(row, "periodStart", "Period Start", "period_start"), defaultPeriodStart);
            String periodEnd = parseRowDate(firstPresent(row, "periodEnd", "Period End", "period_end"), defaultPeriodEnd);
            upserts.add(new HistoryUpsert(kpiId, periodStart, periodEnd, actual, target));
        }

        int updated = upserts.size();
        batchUpsertHistory(upserts);
        result.put("updated", updated);
        result.put("skipped", skipped);
        result.put("unmatched", unmatched);
        result.put("matchedKpis", codeToId.size());
        result.put("periodStart", defaultPeriodStart);
        result.put("periodEnd", defaultPeriodEnd);
        if (updated == 0 && unmatched > 0) {
            result.put("message",
                    "No rows matched KPIs on this scorecard. Use KPI codes for this page (e.g. "
                            + sampleCodes(codeToId) + ") or ETL node keys (STRATROOM-…). "
                            + "Org-wide data files only update rows for the open scorecard.");
        }
        return result;
    }

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
        for (DateTimeFormatter f : new DateTimeFormatter[]{
                DateTimeFormatter.ofPattern("MM/dd/yyyy"),
                DateTimeFormatter.ofPattern("yyyy-MM-dd"),
                DateTimeFormatter.ofPattern("MMM d, yyyy", java.util.Locale.ENGLISH)}) {
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
        
        Map<String, Object> keys = kh.getKeys();
        if (keys != null && keys.containsKey("id")) {
            return ((Number) keys.get("id")).longValue();
        }
        
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
