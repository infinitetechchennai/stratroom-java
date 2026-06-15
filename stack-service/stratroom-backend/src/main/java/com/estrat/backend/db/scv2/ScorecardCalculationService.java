package com.estrat.backend.db.scv2;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Reads the sc_ scorecard hierarchy and computes scores bottom-up, producing the
 * nested payload the React scorecard UI expects:
 *
 *   { flag, message, scoreCardName, thresholdResult, statusLight,
 *     cardDetailsDTO: { id, scorecardName, scoreCardDTOS: [ perspective... ] } }
 *
 * Performance: the entire tree (perspectives, objectives, KPIs, sub-KPIs) and all
 * KPI history are loaded in a fixed handful of bulk queries, then assembled in
 * memory — no per-node (N+1) queries — so even a 500+ KPI scorecard responds fast.
 */
@Service
public class ScorecardCalculationService {

    private final JdbcTemplate jdbc;
    private final AchievementCalculator achievementCalculator;
    private final AggregatorService aggregatorService;
    private final RAGStatusService ragStatusService;

    @Autowired
    public ScorecardCalculationService(JdbcTemplate jdbc,
                                       AchievementCalculator achievementCalculator,
                                       AggregatorService aggregatorService,
                                       RAGStatusService ragStatusService) {
        this.jdbc = jdbc;
        this.achievementCalculator = achievementCalculator;
        this.aggregatorService = aggregatorService;
        this.ragStatusService = ragStatusService;
    }

    @Transactional(readOnly = true)
    public Map<String, Object> calculateByPage(Long pageId, String dateRange) {
        LocalDate start = parseStart(dateRange);
        LocalDate end = parseEnd(dateRange);

        List<Map<String, Object>> scRows = jdbc.queryForList(
                "SELECT id, page_id, name, classification_type FROM sc_scorecards "
                        + "WHERE page_id = ? AND is_active = 1 AND is_deleted = 0 ORDER BY id LIMIT 1",
                pageId);
        if (scRows.isEmpty()) {
            return emptyResponse(pageId);
        }
        Map<String, Object> sc = scRows.get(0);
        Long scorecardId = num(sc.get("id"));
        String scorecardName = str(sc.get("name"));
        String scClass = str(sc.get("classification_type"));

        // ---- bulk-load the whole tree ----
        List<Map<String, Object>> perspectives = jdbc.queryForList(
                "SELECT id, name, code, weight, aggregation_method, classification_type "
                        + "FROM sc_perspectives WHERE scorecard_id = ? AND is_active = 1 ORDER BY display_order, id",
                scorecardId);
        List<Long> perspectiveIds = ids(perspectives);

        Map<Long, List<Map<String, Object>>> objByPersp = groupBy(
                queryIn("SELECT id, name, code, weight, aggregation_method, classification_type, knockout_enabled, "
                        + "knockout_threshold, pass_rate_threshold, perspective_id FROM sc_objectives "
                        + "WHERE is_active = 1 AND perspective_id IN (%s) ORDER BY display_order, id", perspectiveIds),
                "perspective_id");
        List<Long> objectiveIds = objByPersp.values().stream().flatMap(List::stream).map(m -> num(m.get("id"))).collect(Collectors.toList());

        Map<Long, List<Map<String, Object>>> kpiByObj = groupBy(
                queryIn("SELECT id, name, code, polarity, target_value, min_target, max_target, weight, data_type, "
                        + "currency_code, measurement_frequency, null_handling, achievement_cap, classification_type, objective_id "
                        + "FROM sc_kpis WHERE is_deleted = 0 AND objective_id IN (%s) ORDER BY display_order, id", objectiveIds),
                "objective_id");
        List<Long> kpiIds = kpiByObj.values().stream().flatMap(List::stream).map(m -> num(m.get("id"))).collect(Collectors.toList());

        Map<Long, List<Map<String, Object>>> subByKpi = groupBy(
                queryIn("SELECT id, name, code, target_value, polarity, weight, data_type, achievement_cap, kpi_id "
                        + "FROM sc_sub_kpis WHERE is_deleted = 0 AND kpi_id IN (%s) ORDER BY display_order, id", kpiIds),
                "kpi_id");

        // all KPI history for these KPIs, ordered, grouped — current & previous picked in memory
        Map<Long, List<Map<String, Object>>> histByKpi = groupBy(
                queryIn("SELECT kpi_id, period_start, period_end, actual_value, target_value, baseline_value "
                        + "FROM sc_kpi_history WHERE kpi_id IN (%s) ORDER BY kpi_id, period_end", kpiIds),
                "kpi_id");

        // ---- assemble + compute ----
        List<Map<String, Object>> perspectiveDtos = new ArrayList<>();
        List<BigDecimal> perspectiveScores = new ArrayList<>();
        List<BigDecimal> perspectiveWeights = new ArrayList<>();

        for (Map<String, Object> p : perspectives) {
            Map<String, Object> pDto = buildPerspective(p, objByPersp, kpiByObj, subByKpi, histByKpi, start, end, scClass);
            perspectiveDtos.add(pDto);
            BigDecimal score = (BigDecimal) pDto.get("score");
            if (score != null) {
                perspectiveScores.add(score);
                perspectiveWeights.add(dec(p.get("weight")));
            }
        }

        BigDecimal overall = aggregatorService.aggregate(perspectiveScores, perspectiveWeights, "WEIGHTED", null);
        RAGStatusService.RAGResult overallRag = ragStatusService.determineStatus(overall, scClass);

        Map<String, Object> cardDetails = new LinkedHashMap<>();
        cardDetails.put("id", scorecardId);
        cardDetails.put("scorecardName", scorecardName);
        cardDetails.put("scoreCardName", scorecardName);
        cardDetails.put("statusLight", overallRag.getStatus());
        cardDetails.put("thresholdResult", formatPct(overall));
        cardDetails.put("scoreCardDTOS", perspectiveDtos);

        Map<String, Object> response = new LinkedHashMap<>();
        response.put("flag", true);
        response.put("message", "Success");
        response.put("scoreCardName", scorecardName);
        response.put("thresholdResult", formatPct(overall));
        response.put("statusLight", overallRag.getStatus());
        response.put("cardDetailsDTO", cardDetails);
        return response;
    }

    private Map<String, Object> buildPerspective(Map<String, Object> p,
            Map<Long, List<Map<String, Object>>> objByPersp,
            Map<Long, List<Map<String, Object>>> kpiByObj,
            Map<Long, List<Map<String, Object>>> subByKpi,
            Map<Long, List<Map<String, Object>>> histByKpi,
            LocalDate start, LocalDate end, String scClass) {
        Long perspectiveId = num(p.get("id"));
        String name = str(p.get("name"));
        String classType = firstNonBlank(str(p.get("classification_type")), scClass);
        String aggMethod = str(p.get("aggregation_method"));

        List<Map<String, Object>> objectiveDtos = new ArrayList<>();
        List<BigDecimal> objScores = new ArrayList<>();
        List<BigDecimal> objWeights = new ArrayList<>();

        for (Map<String, Object> o : objByPersp.getOrDefault(perspectiveId, List.of())) {
            Map<String, Object> oDto = buildObjective(o, kpiByObj, subByKpi, histByKpi, start, end, classType);
            objectiveDtos.add(oDto);
            BigDecimal score = (BigDecimal) oDto.get("score");
            if (score != null) {
                objScores.add(score);
                objWeights.add(dec(o.get("weight")));
            }
        }

        BigDecimal score = aggregatorService.aggregate(objScores, objWeights, aggMethod, null);
        RAGStatusService.RAGResult rag = ragStatusService.determineStatus(score, classType);

        Map<String, Object> value = new LinkedHashMap<>();
        value.put("name", name);
        value.put("thresholdResult", formatPct(score));
        value.put("statusLight", rag.getStatus());

        Map<String, Object> dto = new LinkedHashMap<>();
        dto.put("id", perspectiveId);
        dto.put("perspectiveType", name);
        dto.put("scoreCardValue", value);
        dto.put("objectiveList", objectiveDtos);
        dto.put("score", score);
        return dto;
    }

    private Map<String, Object> buildObjective(Map<String, Object> o,
            Map<Long, List<Map<String, Object>>> kpiByObj,
            Map<Long, List<Map<String, Object>>> subByKpi,
            Map<Long, List<Map<String, Object>>> histByKpi,
            LocalDate start, LocalDate end, String parentClass) {
        Long objectiveId = num(o.get("id"));
        String name = str(o.get("name"));
        String classType = firstNonBlank(str(o.get("classification_type")), parentClass);
        String aggMethod = str(o.get("aggregation_method"));
        boolean knockout = bool(o.get("knockout_enabled"));
        BigDecimal knockoutThreshold = dec(o.get("knockout_threshold"));
        BigDecimal passRate = dec(o.get("pass_rate_threshold"));

        List<Map<String, Object>> kpiDtos = new ArrayList<>();
        List<BigDecimal> kpiScores = new ArrayList<>();
        List<BigDecimal> kpiWeights = new ArrayList<>();

        for (Map<String, Object> k : kpiByObj.getOrDefault(objectiveId, List.of())) {
            Map<String, Object> kDto = buildKpi(k, subByKpi, histByKpi, start, end, classType);
            kpiDtos.add(kDto);
            BigDecimal score = (BigDecimal) kDto.get("score");
            if (score != null) {
                kpiScores.add(score);
                kpiWeights.add(dec(k.get("weight")));
            }
        }

        BigDecimal score;
        String statusOverride = null;
        if (knockout && knockoutThreshold != null) {
            Optional<BigDecimal> failing = kpiScores.stream().filter(s -> s.compareTo(knockoutThreshold) < 0).findFirst();
            if (failing.isPresent()) {
                score = BigDecimal.ZERO;
                statusOverride = "red";
            } else {
                score = aggregatorService.aggregate(kpiScores, kpiWeights, aggMethod, passRate);
            }
        } else {
            score = aggregatorService.aggregate(kpiScores, kpiWeights, aggMethod, passRate);
        }

        RAGStatusService.RAGResult rag = ragStatusService.determineStatus(score, classType);
        String status = statusOverride != null ? statusOverride : rag.getStatus();

        Map<String, Object> value = new LinkedHashMap<>();
        value.put("name", name);
        value.put("thresholdResult", formatPct(score));
        value.put("statusLight", status);

        Map<String, Object> dto = new LinkedHashMap<>();
        dto.put("id", objectiveId);
        dto.put("objectiveId", str(o.get("code")) != null ? str(o.get("code")) : String.valueOf(objectiveId));
        dto.put("objectivesValue", value);
        dto.put("kpiList", kpiDtos);
        dto.put("score", score);
        return dto;
    }

    private Map<String, Object> buildKpi(Map<String, Object> k,
            Map<Long, List<Map<String, Object>>> subByKpi,
            Map<Long, List<Map<String, Object>>> histByKpi,
            LocalDate start, LocalDate end, String parentClass) {
        Long kpiId = num(k.get("id"));
        String name = str(k.get("name"));
        String classType = firstNonBlank(str(k.get("classification_type")), parentClass);
        String polarity = str(k.get("polarity"));
        BigDecimal target = dec(k.get("target_value"));
        BigDecimal minTarget = dec(k.get("min_target"));
        BigDecimal maxTarget = dec(k.get("max_target"));
        BigDecimal cap = dec(k.get("achievement_cap"));
        String dataType = str(k.get("data_type"));
        String currency = str(k.get("currency_code"));
        String frequency = str(k.get("measurement_frequency"));
        String nullHandling = str(k.get("null_handling"));

        List<Map<String, Object>> subKpis = subByKpi.getOrDefault(kpiId, List.of());
        BigDecimal achievement;
        BigDecimal actual = null;
        BigDecimal baseline = null;
        List<Map<String, Object>> subKpiDtos = new ArrayList<>();

        if (!subKpis.isEmpty()) {
            List<BigDecimal> subScores = new ArrayList<>();
            List<BigDecimal> subWeights = new ArrayList<>();
            for (Map<String, Object> sk : subKpis) {
                Long subId = num(sk.get("id"));
                BigDecimal subTarget = dec(sk.get("target_value"));
                BigDecimal subCap = dec(sk.get("achievement_cap"));
                BigDecimal subAch = achievementCalculator.calculate(null, subTarget, str(sk.get("polarity")), null, null, subCap);
                if (subAch != null) {
                    subScores.add(subAch);
                    subWeights.add(dec(sk.get("weight")));
                }
                RAGStatusService.RAGResult subRag = ragStatusService.determineStatus(subAch, classType);
                Map<String, Object> subVal = new LinkedHashMap<>();
                subVal.put("subMeasureName", str(sk.get("name")));
                subVal.put("name", str(sk.get("name")));
                subVal.put("actual", "");
                subVal.put("target", formatValue(subTarget, str(sk.get("data_type")), null));
                subVal.put("thresholdResult", formatPct(subAch));
                subVal.put("statusLight", subRag.getStatus());
                Map<String, Object> subDto = new LinkedHashMap<>();
                subDto.put("id", subId);
                subDto.put("subKpiId", str(sk.get("code")) != null ? str(sk.get("code")) : String.valueOf(subId));
                subDto.put("subKpiValue", subVal);
                subKpiDtos.add(subDto);
            }
            achievement = aggregatorService.aggregate(subScores, subWeights, "WEIGHTED", null);
        } else {
            List<Map<String, Object>> hist = histByKpi.getOrDefault(kpiId, List.of());
            Map<String, Object> current = latestInRange(hist, start, end);
            if (current != null) {
                actual = dec(current.get("actual_value"));
                BigDecimal histTarget = dec(current.get("target_value"));
                if (histTarget != null) {
                    target = histTarget;
                }
                baseline = dec(current.get("baseline_value"));
            }
            if (actual == null) {
                actual = applyNullHandling(nullHandling, target);
            }
            achievement = achievementCalculator.calculate(actual, target, polarity, minTarget, maxTarget, cap);
        }

        // trend vs the most recent prior period
        BigDecimal previous = null;
        Map<String, Object> prev = previousBefore(histByKpi.getOrDefault(kpiId, List.of()), start);
        if (prev != null) {
            BigDecimal prevTarget = dec(prev.get("target_value"));
            previous = achievementCalculator.calculate(dec(prev.get("actual_value")),
                    prevTarget != null ? prevTarget : target, polarity, minTarget, maxTarget, cap);
        }
        RAGStatusService.RAGResult rag = ragStatusService.determineStatus(achievement, classType);
        String trend = ragStatusService.calculateTrend(achievement, previous);

        Map<String, Object> value = new LinkedHashMap<>();
        value.put("name", name);
        value.put("actual", formatValue(actual, dataType, currency));
        value.put("target", formatValue(target, dataType, currency));
        value.put("baseline", formatValue(baseline, dataType, currency));
        value.put("kpi_measurement", frequency);
        value.put("thresholdResult", formatPct(achievement));
        value.put("statusLight", rag.getStatus());
        value.put("trend", trend);
        value.put("riskStatusLight", "green");
        value.put("ragColorHex", rag.getColorHex());

        Map<String, Object> dto = new LinkedHashMap<>();
        dto.put("id", kpiId);
        dto.put("kpiId", str(k.get("code")) != null ? str(k.get("code")) : String.valueOf(kpiId));
        dto.put("kpiValue", value);
        dto.put("score", achievement);
        if (!subKpiDtos.isEmpty()) {
            dto.put("subKpiList", subKpiDtos);
        }
        return dto;
    }

    // ----- in-memory history selection (history list is ordered by period_end asc) -----

    private Map<String, Object> latestInRange(List<Map<String, Object>> hist, LocalDate start, LocalDate end) {
        Map<String, Object> chosen = null;
        for (Map<String, Object> row : hist) {
            LocalDate ps = toLocalDate(row.get("period_start"));
            LocalDate pe = toLocalDate(row.get("period_end"));
            if (ps != null && pe != null && !ps.isBefore(start) && !pe.isAfter(end)) {
                chosen = row; // list is ascending by period_end, so last match wins (latest)
            }
        }
        return chosen;
    }

    private Map<String, Object> previousBefore(List<Map<String, Object>> hist, LocalDate start) {
        Map<String, Object> chosen = null;
        for (Map<String, Object> row : hist) {
            LocalDate pe = toLocalDate(row.get("period_end"));
            if (pe != null && pe.isBefore(start)) {
                chosen = row; // ascending, so last one before start is the most recent prior period
            }
        }
        return chosen;
    }

    private BigDecimal applyNullHandling(String nullHandling, BigDecimal target) {
        if (nullHandling == null) {
            return null;
        }
        switch (nullHandling.toUpperCase()) {
            case "ZERO":
                return BigDecimal.ZERO;
            case "TARGET":
                return target;
            case "EXCLUDE":
            default:
                return null;
        }
    }

    // ----- bulk query helpers -----

    private List<Map<String, Object>> queryIn(String sqlTemplate, List<Long> ids) {
        if (ids == null || ids.isEmpty()) {
            return List.of();
        }
        String inList = ids.stream().map(String::valueOf).collect(Collectors.joining(","));
        return jdbc.queryForList(String.format(sqlTemplate, inList));
    }

    private Map<Long, List<Map<String, Object>>> groupBy(List<Map<String, Object>> rows, String key) {
        Map<Long, List<Map<String, Object>>> map = new HashMap<>();
        for (Map<String, Object> row : rows) {
            Long k = num(row.get(key));
            map.computeIfAbsent(k, x -> new ArrayList<>()).add(row);
        }
        return map;
    }

    private List<Long> ids(List<Map<String, Object>> rows) {
        return rows.stream().map(m -> num(m.get("id"))).collect(Collectors.toList());
    }

    // ----- response helpers -----

    private Map<String, Object> emptyResponse(Long pageId) {
        Map<String, Object> cardDetails = new LinkedHashMap<>();
        cardDetails.put("scoreCardDTOS", new ArrayList<>());
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("flag", false);
        response.put("message", "No scorecard found for page " + pageId);
        response.put("scoreCardName", "Scorecard");
        response.put("thresholdResult", "0%");
        response.put("statusLight", "unknown");
        response.put("cardDetailsDTO", cardDetails);
        return response;
    }

    private String formatPct(BigDecimal value) {
        if (value == null) {
            return "N/A";
        }
        return value.setScale(1, RoundingMode.HALF_UP).stripTrailingZeros().toPlainString() + "%";
    }

    private String formatValue(BigDecimal value, String dataType, String currency) {
        if (value == null) {
            return "";
        }
        if ("PERCENTAGE".equalsIgnoreCase(dataType)) {
            return value.setScale(1, RoundingMode.HALF_UP).stripTrailingZeros().toPlainString() + "%";
        }
        if ("CURRENCY".equalsIgnoreCase(dataType) && currency != null) {
            return currency + " " + value.setScale(2, RoundingMode.HALF_UP).toPlainString();
        }
        return value.setScale(2, RoundingMode.HALF_UP).stripTrailingZeros().toPlainString();
    }

    // ----- value coercion helpers -----

    private static Long num(Object o) {
        return o == null ? null : ((Number) o).longValue();
    }

    private static BigDecimal dec(Object o) {
        if (o == null) {
            return null;
        }
        if (o instanceof BigDecimal) {
            return (BigDecimal) o;
        }
        if (o instanceof Number) {
            return new BigDecimal(o.toString());
        }
        return null;
    }

    private static boolean bool(Object o) {
        if (o == null) {
            return false;
        }
        if (o instanceof Boolean) {
            return (Boolean) o;
        }
        if (o instanceof Number) {
            return ((Number) o).intValue() != 0;
        }
        return Boolean.parseBoolean(o.toString());
    }

    private static String str(Object o) {
        return o == null ? null : o.toString();
    }

    private static String firstNonBlank(String a, String b) {
        return (a != null && !a.isEmpty()) ? a : b;
    }

    private static LocalDate toLocalDate(Object o) {
        if (o == null) {
            return null;
        }
        if (o instanceof java.sql.Date) {
            return ((java.sql.Date) o).toLocalDate();
        }
        if (o instanceof java.util.Date) {
            return new java.sql.Date(((java.util.Date) o).getTime()).toLocalDate();
        }
        if (o instanceof LocalDate) {
            return (LocalDate) o;
        }
        try {
            return LocalDate.parse(o.toString());
        } catch (Exception e) {
            return null;
        }
    }

    private LocalDate parseStart(String dateRange) {
        LocalDate fallback = LocalDate.now().withDayOfYear(1);
        if (dateRange == null || dateRange.isEmpty()) {
            return fallback;
        }
        String[] parts = dateRange.split("-");
        return parts.length >= 1 ? parseDate(parts[0].trim(), fallback) : fallback;
    }

    private LocalDate parseEnd(String dateRange) {
        LocalDate fallback = LocalDate.now();
        if (dateRange == null || dateRange.isEmpty()) {
            return fallback;
        }
        String[] parts = dateRange.split("-");
        return parts.length >= 2 ? parseDate(parts[1].trim(), fallback) : fallback;
    }

    private LocalDate parseDate(String s, LocalDate fallback) {
        for (DateTimeFormatter fmt : new DateTimeFormatter[]{
                DateTimeFormatter.ofPattern("MM/dd/yyyy"),
                DateTimeFormatter.ofPattern("yyyy-MM-dd"),
                DateTimeFormatter.ofPattern("MMM d, yyyy")}) {
            try {
                return LocalDate.parse(s, fmt);
            } catch (Exception ignored) {
                // try next
            }
        }
        return fallback;
    }
}
