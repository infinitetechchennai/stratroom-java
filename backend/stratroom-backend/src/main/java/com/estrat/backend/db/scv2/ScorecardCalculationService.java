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
                "SELECT id, page_id, name, description, classification_type, formula FROM sc_scorecards "
                        + "WHERE page_id = ? AND is_active = true AND is_deleted = false ORDER BY id LIMIT 1",
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
                "SELECT id, name, code, weight, aggregation_method, classification_type, formula "
                        + "FROM sc_perspectives WHERE scorecard_id = ? AND is_active = true ORDER BY display_order, id",
                scorecardId);
        List<Long> perspectiveIds = ids(perspectives);

        Map<Long, List<Map<String, Object>>> objByPersp = groupBy(
                queryIn("SELECT id, name, code, weight, aggregation_method, classification_type, knockout_enabled, "
                        + "knockout_threshold, pass_rate_threshold, formula, perspective_id FROM sc_objectives "
                        + "WHERE is_active = true AND perspective_id IN (%s) ORDER BY display_order, id", perspectiveIds),
                "perspective_id");
        List<Long> objectiveIds = objByPersp.values().stream().flatMap(List::stream).map(m -> num(m.get("id"))).collect(Collectors.toList());

        Map<Long, List<Map<String, Object>>> kpiByObj = groupBy(
                queryIn("SELECT id, name, code, polarity, target_value, min_target, max_target, weight, data_type, "
                        + "currency_code, measurement_frequency, null_handling, achievement_cap, classification_type, objective_id, formula, thresholds "
                        + "FROM sc_kpis WHERE is_deleted = false AND objective_id IN (%s) ORDER BY display_order, id", objectiveIds),
                "objective_id");
        List<Long> kpiIds = kpiByObj.values().stream().flatMap(List::stream).map(m -> num(m.get("id"))).collect(Collectors.toList());

        Map<Long, List<Map<String, Object>>> subByKpi = groupBy(
                queryIn("SELECT id, name, code, target_value, polarity, weight, data_type, achievement_cap, kpi_id "
                        + "FROM sc_sub_kpis WHERE is_deleted = false AND kpi_id IN (%s) ORDER BY display_order, id", kpiIds),
                "kpi_id");


        List<Long> subKpiIds = subByKpi.values().stream().flatMap(java.util.List::stream).map(m -> num(m.get("id"))).collect(java.util.stream.Collectors.toList());
        // 4th-level sub-measures (sc_sub_measures) do NOT exist in this schema. The load runs
        // inside a single transaction, so issuing a query against a missing table aborts the
        // entire transaction (SQLSTATE 25P02) and every later query fails. A try/catch is not
        // enough — the DB transaction is already poisoned. So we skip the query entirely and
        // treat sub-measures as empty. Re-enable once an sc_sub_measures table exists.
        Map<Long, List<Map<String, Object>>> subMeasureBySubKpi = new java.util.HashMap<>();

        // all KPI history for these KPIs, ordered, grouped — current & previous picked in memory
        Map<Long, List<Map<String, Object>>> histByKpi = groupBy(
                queryIn("SELECT kpi_id, period_start, period_end, actual_value "
                        + "FROM sc_kpi_history WHERE kpi_id IN (%s) ORDER BY kpi_id, period_end", kpiIds),
                "kpi_id");

        // ---- assemble + compute ----
        List<Map<String, Object>> perspectiveDtos = new ArrayList<>();
        List<BigDecimal> perspectiveScores = new ArrayList<>();
        List<BigDecimal> perspectiveWeights = new ArrayList<>();

        for (Map<String, Object> p : perspectives) {
            Map<String, Object> pDto = buildPerspective(p, objByPersp, kpiByObj, subByKpi, subMeasureBySubKpi, histByKpi, start, end, scClass);
            perspectiveDtos.add(pDto);
            BigDecimal score = (BigDecimal) pDto.get("score");
            if (score != null) {
                perspectiveScores.add(score);
                perspectiveWeights.add(dec(p.get("weight")));
            }
        }

        BigDecimal overall = aggregatorService.aggregate(perspectiveScores, perspectiveWeights, "WEIGHTED", null);
        String formula = str(scRows.get(0).get("formula"));
        if (formula != null && !formula.isBlank()) {
            BigDecimal formulaResult = evaluateFormula(formula, perspectiveDtos);
            if (formulaResult != null) overall = formulaResult;
        }

        RAGStatusService.RAGResult overallRag = ragStatusService.determineStatus(overall, scClass);

        Map<String, Object> cardDetails = new LinkedHashMap<>();
        cardDetails.put("id", scorecardId);
        cardDetails.put("pageId", pageId);
        cardDetails.put("scorecardName", scorecardName);
        cardDetails.put("scoreCardName", scorecardName);
        cardDetails.put("description", str(sc.get("description")));
        cardDetails.put("formula", str(sc.get("formula")));
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
            Map<Long, List<Map<String, Object>>> subMeasureBySubKpi,
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
            Map<String, Object> oDto = buildObjective(o, kpiByObj, subByKpi, subMeasureBySubKpi, histByKpi, start, end, classType);
            objectiveDtos.add(oDto);
            BigDecimal score = (BigDecimal) oDto.get("score");
            if (score != null) {
                objScores.add(score);
                objWeights.add(dec(o.get("weight")));
            }
        }

        aggMethod = str(p.get("aggregation_method"));
        BigDecimal score = aggregatorService.aggregate(objScores, objWeights, aggMethod, null);
        String formula = str(p.get("formula"));
        if ("FORMULA".equalsIgnoreCase(aggMethod) && formula != null && !formula.isBlank()) {
            BigDecimal formulaResult = evaluateFormula(formula, objectiveDtos);
            if (formulaResult != null) score = formulaResult;
        }
        RAGStatusService.RAGResult rag = ragStatusService.determineStatus(score, classType);

        Map<String, Object> value = new LinkedHashMap<>();
        value.put("name", name);
        value.put("thresholdResult", formatPct(score));
        value.put("statusLight", rag.getStatus());

        Map<String, Object> dto = new LinkedHashMap<>();
        dto.put("id", perspectiveId);
        dto.put("perspectiveType", name);
        dto.put("code", str(p.get("code")));
        dto.put("scoreCardValue", value);
        dto.put("objectiveList", objectiveDtos);
        dto.put("score", score);
        return dto;
    }

    private Map<String, Object> buildObjective(Map<String, Object> o,
            Map<Long, List<Map<String, Object>>> kpiByObj,
            Map<Long, List<Map<String, Object>>> subByKpi,
            Map<Long, List<Map<String, Object>>> subMeasureBySubKpi,
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
            Map<String, Object> kDto = buildKpi(k, subByKpi, subMeasureBySubKpi, histByKpi, start, end, classType);
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
        String formula = str(o.get("formula"));
        if ("FORMULA".equalsIgnoreCase(aggMethod) && formula != null && !formula.isBlank()) {
            BigDecimal formulaResult = evaluateFormula(formula, kpiDtos);
            if (formulaResult != null) score = formulaResult;
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
            Map<Long, List<Map<String, Object>>> subMeasureBySubKpi,
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

                List<Map<String, Object>> sms = subMeasureBySubKpi.getOrDefault(subId, List.of());
                List<Map<String, Object>> smDtos = new ArrayList<>();
                for (Map<String, Object> sm : sms) {
                    Map<String, Object> smDto = new LinkedHashMap<>();
                    smDto.put("id", num(sm.get("id")));
                    smDto.put("name", str(sm.get("name")));
                    smDto.put("targetValue", dec(sm.get("target_value")));
                    smDtos.add(smDto);
                }
                subDto.put("subMeasureList", smDtos);

                subKpiDtos.add(subDto);
            }
            achievement = aggregatorService.aggregate(subScores, subWeights, "WEIGHTED", null);
        } else {
            List<Map<String, Object>> hist = histByKpi.getOrDefault(kpiId, List.of());
            // Prefer the latest in-range period that actually has a reported value, so a
            // wide range (e.g. a whole financial year) surfaces the real actual instead of
            // an empty trailing month. Fall back to the latest in-range period (for the
            // target/baseline display) only when no value was reported within the range.
            Map<String, Object> current = latestActualInRange(hist, start, end, frequency);
            if (current == null) {
                current = latestInRange(hist, start, end, frequency);
            }
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

            // If user set a custom performance formula, evaluate it with Actual/Target/Weight/Contribution
            String kpiFormula = str(k.get("formula"));
            if (kpiFormula != null && !kpiFormula.isBlank()) {
                BigDecimal safeActual = actual != null ? actual : BigDecimal.ZERO;
                BigDecimal safeTarget = target != null ? target : BigDecimal.ZERO;
                BigDecimal safeWeight = dec(k.get("weight")) != null ? dec(k.get("weight")) : BigDecimal.ZERO;
                List<Map<String, Object>> perfVars = new ArrayList<>();
                perfVars.add(makeVar("Contribution", BigDecimal.ZERO));
                perfVars.add(makeVar("Actual", safeActual));
                perfVars.add(makeVar("Target", safeTarget));
                perfVars.add(makeVar("Weight", safeWeight));
                BigDecimal formulaResult = evaluateFormula(kpiFormula, perfVars);
                if (formulaResult != null) achievement = formulaResult;
            }
        }

        // Trend: compare the two most recent reported (non-null) periods within the
        // selected range, so the up/down arrow reflects the real movement. Falls back
        // to the latest reported period before the range when only one value is in range.
        BigDecimal previous = null;
        List<Map<String, Object>> reported = new ArrayList<>();
        for (Map<String, Object> row : histByKpi.getOrDefault(kpiId, List.of())) {
            LocalDate ps = toLocalDate(row.get("period_start"));
            LocalDate pe = toLocalDate(row.get("period_end"));
            if (ps != null && pe != null && !ps.isBefore(start) && !pe.isAfter(end) && dec(row.get("actual_value")) != null) {
                reported.add(row);
            }
        }
        Map<String, Object> prev = reported.size() >= 2
                ? reported.get(reported.size() - 2)
                : previousBefore(histByKpi.getOrDefault(kpiId, List.of()), start);
        if (prev != null) {
            BigDecimal prevTarget = dec(prev.get("target_value"));
            previous = achievementCalculator.calculate(dec(prev.get("actual_value")),
                    prevTarget != null ? prevTarget : target, polarity, minTarget, maxTarget, cap);
        }
        List<BigDecimal> bands = parseBands(str(k.get("thresholds")));
        RAGStatusService.RAGResult rag = ragStatusService.determineStatus(achievement, classType, bands);
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

    private Map<String, Object> latestInRange(List<Map<String, Object>> hist, LocalDate start, LocalDate end, String frequency) {
        Map<String, Object> chosen = null;
        for (Map<String, Object> row : hist) {
            LocalDate ps = toLocalDate(row.get("period_start"));
            LocalDate pe = toLocalDate(row.get("period_end"));
            if (ps != null && pe != null && !ps.isAfter(end) && !pe.isBefore(start) && matchesFrequency(ps, pe, frequency)) {
                chosen = row;
            }
        }
        return chosen;
    }

    // Latest in-range period that has a non-null reported actual value.
    private Map<String, Object> latestActualInRange(List<Map<String, Object>> hist, LocalDate start, LocalDate end, String frequency) {
        Map<String, Object> chosen = null;
        for (Map<String, Object> row : hist) {
            LocalDate ps = toLocalDate(row.get("period_start"));
            LocalDate pe = toLocalDate(row.get("period_end"));
            if (ps != null && pe != null && !ps.isAfter(end) && !pe.isBefore(start) && matchesFrequency(ps, pe, frequency) && dec(row.get("actual_value")) != null) {
                chosen = row; // list is ascending by period_end, so last match wins (latest with a value)
            }
        }
        return chosen;
    }

    /** Returns true when the history row's period duration matches the KPI measurement frequency. */
    private boolean matchesFrequency(LocalDate ps, LocalDate pe, String frequency) {
        if (frequency == null || frequency.isBlank()) return true;
        long days = java.time.temporal.ChronoUnit.DAYS.between(ps, pe) + 1;
        switch (frequency.toLowerCase().replace("-", " ").trim()) {
            case "daily":       return days <= 1;
            case "weekly":      return days >= 6  && days <= 8;
            case "monthly":     return days >= 28 && days <= 31;
            case "quarterly":   return days >= 89 && days <= 92;
            case "half yearly": return days >= 181 && days <= 184;
            case "annual":      return days >= 365 && days <= 366;
            default:            return true;
        }
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

    /**
     * Story-card detail for a single KPI, read from the same sc_ schema the
     * scorecard tab uses. Returns the KPI header (legacy-compatible kpiValue
     * shape) plus its monthly actual/target history within the requested range
     * — the source for the Data Table, Actual-vs-Target chart and Data Drill.
     */
    @Transactional(readOnly = true)
    public Map<String, Object> kpiStoryCard(Long kpiId, String dateRange) {
        Map<String, Object> result = new LinkedHashMap<>();
        List<Map<String, Object>> kpiRows = jdbc.queryForList(
                "SELECT k.id, k.name, k.code, k.polarity, k.target_value, k.min_target, k.max_target, k.weight, "
                        + "k.data_type, k.currency_code, k.measurement_frequency, k.null_handling, k.achievement_cap, "
                        + "k.classification_type, k.objective_id, k.description, "
                        + "o.name AS objective_name, p.name AS perspective_name "
                        + "FROM sc_kpis k "
                        + "LEFT JOIN sc_objectives o ON k.objective_id = o.id "
                        + "LEFT JOIN sc_perspectives p ON o.perspective_id = p.id "
                        + "WHERE k.id = ? AND k.is_deleted = false", kpiId);
        if (kpiRows.isEmpty()) {
            result.put("kpi", null);
            result.put("series", new ArrayList<>());
            return result;
        }
        Map<String, Object> k = kpiRows.get(0);
        String dataType = str(k.get("data_type"));
        String currency = str(k.get("currency_code"));
        BigDecimal kpiTarget = dec(k.get("target_value"));

        Map<String, Object> value = new LinkedHashMap<>();
        value.put("name", str(k.get("name")));
        value.put("target", formatValue(kpiTarget, dataType, currency));
        value.put("kpi_measurement", str(k.get("measurement_frequency")));
        value.put("dataType", dataType);
        value.put("currency", currency);
        value.put("threshold", str(k.get("classification_type")));
        value.put("polarity", str(k.get("polarity")));
        value.put("weight", str(k.get("weight")));
        value.put("description", str(k.get("description")));
        value.put("alignedPerspective", str(k.get("perspective_name")));
        value.put("alignmentObjectives", str(k.get("objective_name")));

        Map<String, Object> kpiDto = new LinkedHashMap<>();
        kpiDto.put("id", num(k.get("id")));
        kpiDto.put("kpiId", str(k.get("code")));
        kpiDto.put("kpiName", str(k.get("name")));
        kpiDto.put("kpiValue", value);
        result.put("kpi", kpiDto);

        LocalDate start = parseStart(dateRange);
        LocalDate end = parseEnd(dateRange);
        List<Map<String, Object>> hist = jdbc.queryForList(
                "SELECT period_start, period_end, actual_value "
                        + "FROM sc_kpi_history WHERE kpi_id = ? ORDER BY period_end", kpiId);
        DateTimeFormatter label = DateTimeFormatter.ofPattern("MMM yyyy");
        List<Map<String, Object>> series = new ArrayList<>();
        BigDecimal runningActual = BigDecimal.ZERO;
        for (Map<String, Object> h : hist) {
            LocalDate periodEnd = toLocalDate(h.get("period_end"));
            if (periodEnd != null && (periodEnd.isBefore(start) || periodEnd.isAfter(end))) {
                continue;
            }
            BigDecimal actual = dec(h.get("actual_value"));
            BigDecimal target = dec(h.get("target_value"));
            if (target == null) {
                target = kpiTarget;
            }
            BigDecimal gap = (actual != null && target != null) ? actual.subtract(target) : null;
            if (actual != null) {
                runningActual = runningActual.add(actual);
            }
            Map<String, Object> point = new LinkedHashMap<>();
            point.put("period", periodEnd != null ? periodEnd.format(label) : str(h.get("period_end")));
            point.put("actual", actual);
            point.put("target", target);
            point.put("gap", gap);
            point.put("ytd", runningActual);
            point.put("baseline", dec(h.get("baseline_value")));
            point.put("currency", currency);
            point.put("measureName", str(k.get("name")));
            series.add(point);
        }
        result.put("series", series);
        return result;
    }

    /**
     * Retrieves all active elements in the scorecard hierarchy (Scorecard, Perspectives,
     * Objectives, KPIs, Sub-KPIs) formatted for the formula calculators.
     * 
     * Applies hierarchical filtering:
     * - SCORECARD: returns its Perspectives
     * - PERSPECTIVE: returns its Objectives
     * - OBJECTIVE: returns its KPIs
     * - KPI: returns its Sub-KPIs
     * - SUBKPI: returns nothing
     */
    @Transactional(readOnly = true)
    // Builds one measure-list row. measureKey carries the element's UNIQUE code (falling
    // back to the display name when a code is absent) so formulas can address elements that
    // share the same display name — e.g. several KPIs all called "Planning Cycle Duration".
    private Map<String, Object> nk(Object name, Object code, String measureType, String elementType) {
        Map<String, Object> m = new java.util.HashMap<>();
        String n = str(name);
        String c = str(code);
        m.put("measureName", n);
        m.put("measureKey", (c == null || c.isBlank()) ? n : c);
        m.put("measureType", measureType);
        m.put("elementType", elementType);
        return m;
    }

    public List<Map<String, Object>> retrieveNodeKeyList(Long pageId, String dateRange, String nodeType, String nodeId) {
        List<Map<String, Object>> result = new ArrayList<>();
        // No date-range filter for the definition itself, as the UI needs to see all variables
        // that are active for this scorecard.

        List<Map<String, Object>> scRows = jdbc.queryForList(
                "SELECT id, name FROM sc_scorecards "
                        + "WHERE page_id = ? AND is_active = true AND is_deleted = false ORDER BY id LIMIT 1",
                pageId);
        if (scRows.isEmpty()) {
            return result;
        }
        Long scorecardId = num(scRows.get(0).get("id"));

        if ("SCORECARD".equalsIgnoreCase(nodeType)) {
            List<Map<String, Object>> perspectives = jdbc.queryForList(
                    "SELECT id, name, code FROM sc_perspectives WHERE scorecard_id = ? AND is_active = true", scorecardId);
            for (Map<String, Object> p : perspectives) {
                result.add(nk(p.get("name"), p.get("code"), "0", "PERSPECTIVE"));
            }
        } else if ("PERSPECTIVE".equalsIgnoreCase(nodeType)) {
            if (nodeId != null && !nodeId.trim().isEmpty()) {
                List<Map<String, Object>> objectives = jdbc.queryForList(
                        "SELECT id, name, code FROM sc_objectives WHERE perspective_id = ? AND is_active = true", Long.parseLong(nodeId));
                for (Map<String, Object> o : objectives) {
                    result.add(nk(o.get("name"), o.get("code"), "0", "OBJECTIVE"));
                }
            } else {
                List<Map<String, Object>> perspectives = jdbc.queryForList(
                        "SELECT id FROM sc_perspectives WHERE scorecard_id = ? AND is_active = true", scorecardId);
                if (!perspectives.isEmpty()) {
                    List<Map<String, Object>> objectives = queryIn(
                            "SELECT id, name, code FROM sc_objectives WHERE perspective_id IN (%s) AND is_active = true", ids(perspectives));
                    for (Map<String, Object> o : objectives) {
                        result.add(nk(o.get("name"), o.get("code"), "0", "OBJECTIVE"));
                    }
                }
            }
        } else if ("OBJECTIVE".equalsIgnoreCase(nodeType)) {
            if (nodeId != null && !nodeId.trim().isEmpty()) {
                // Objective calculator: that objective's KPIs (measure) + those KPIs' sub-KPIs (sub measure).
                List<Map<String, Object>> kpis = jdbc.queryForList(
                        "SELECT id, name, code FROM sc_kpis WHERE objective_id = ? AND is_deleted = false", Long.parseLong(nodeId));
                for (Map<String, Object> k : kpis) {
                    result.add(nk(k.get("name"), k.get("code"), "0", "KPI"));
                }
                List<Long> objKpiIds = ids(kpis);
                if (!objKpiIds.isEmpty()) {
                    List<Map<String, Object>> subKpis = queryIn(
                            "SELECT id, name, code FROM sc_sub_kpis WHERE kpi_id IN (%s) AND is_deleted = false", objKpiIds);
                    for (Map<String, Object> sk : subKpis) {
                        result.add(nk(sk.get("name"), sk.get("code"), "1", "SUBKPI"));
                    }
                }
            } else {
                List<Map<String, Object>> perspectives = jdbc.queryForList(
                        "SELECT id FROM sc_perspectives WHERE scorecard_id = ? AND is_active = true", scorecardId);
                if (!perspectives.isEmpty()) {
                    List<Map<String, Object>> objectives = queryIn(
                            "SELECT id FROM sc_objectives WHERE perspective_id IN (%s) AND is_active = true", ids(perspectives));
                    if (!objectives.isEmpty()) {
                        List<Map<String, Object>> kpis = queryIn(
                                "SELECT id, name, code FROM sc_kpis WHERE objective_id IN (%s) AND is_deleted = false", ids(objectives));
                        for (Map<String, Object> k : kpis) {
                            result.add(nk(k.get("name"), k.get("code"), "0", "KPI"));
                        }
                    }
                }
            }
        } else if ("KPI".equalsIgnoreCase(nodeType)) {
            if (nodeId != null && !nodeId.trim().isEmpty()) {
                List<Map<String, Object>> subKpis = jdbc.queryForList(
                        "SELECT id, name, code FROM sc_sub_kpis WHERE kpi_id = ? AND is_deleted = false", Long.parseLong(nodeId));
                for (Map<String, Object> sk : subKpis) {
                    result.add(nk(sk.get("name"), sk.get("code"), "1", "SUBKPI"));
                }
            } else {
                // For KPI, normally handled by full fallback, but if called explicitly, return all SubKPIs in scorecard
                List<Map<String, Object>> perspectives = jdbc.queryForList(
                        "SELECT id FROM sc_perspectives WHERE scorecard_id = ? AND is_active = true", scorecardId);
                if (!perspectives.isEmpty()) {
                    List<Map<String, Object>> objectives = queryIn(
                            "SELECT id FROM sc_objectives WHERE perspective_id IN (%s) AND is_active = true", ids(perspectives));
                    if (!objectives.isEmpty()) {
                        List<Map<String, Object>> kpis = queryIn(
                                "SELECT id FROM sc_kpis WHERE objective_id IN (%s) AND is_deleted = false", ids(objectives));
                        if (!kpis.isEmpty()) {
                            List<Map<String, Object>> subKpis = queryIn(
                                    "SELECT id, name, code FROM sc_sub_kpis WHERE kpi_id IN (%s) AND is_deleted = false", ids(kpis));
                            for (Map<String, Object> sk : subKpis) {
                                result.add(nk(sk.get("name"), sk.get("code"), "1", "SUBKPI"));
                            }
                        }
                    }
                }
            }
        } else if ("SUBKPI".equalsIgnoreCase(nodeType)) {
            // Sub KPIs have no child elements to calculate from
        } else {
            // Fallback: return everything (e.g. for legacy testing)
            List<Map<String, Object>> perspectives = jdbc.queryForList(
                    "SELECT id, name, code FROM sc_perspectives WHERE scorecard_id = ? AND is_active = true", scorecardId);
            List<Long> pIds = ids(perspectives);

            List<Map<String, Object>> objectives = queryIn(
                    "SELECT id, name, code FROM sc_objectives WHERE perspective_id IN (%s) AND is_active = true", pIds);
            List<Long> oIds = ids(objectives);

            List<Map<String, Object>> kpis = queryIn(
                    "SELECT id, name, code FROM sc_kpis WHERE objective_id IN (%s) AND is_deleted = false", oIds);
            List<Long> kIds = ids(kpis);

            List<Map<String, Object>> subKpis = queryIn(
                    "SELECT id, name, code FROM sc_sub_kpis WHERE kpi_id IN (%s) AND is_deleted = false", kIds);

            for (Map<String, Object> p : perspectives) {
                result.add(nk(p.get("name"), p.get("code"), "0", "PERSPECTIVE"));
            }
            for (Map<String, Object> o : objectives) {
                result.add(nk(o.get("name"), o.get("code"), "0", "OBJECTIVE"));
            }
            for (Map<String, Object> k : kpis) {
                result.add(nk(k.get("name"), k.get("code"), "0", "KPI"));
            }
            for (Map<String, Object> sk : subKpis) {
                result.add(nk(sk.get("name"), sk.get("code"), "1", "SUBKPI"));
            }
        }

        return result;
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

    /** Parse a JSON-ish array of numbers ("[50,80,100]") into ascending band cutoffs. */
    private static List<BigDecimal> parseBands(String json) {
        List<BigDecimal> bands = new ArrayList<>();
        if (json == null || json.isBlank()) {
            return bands;
        }
        String body = json.trim().replaceAll("^\\[|\\]$", "");
        for (String part : body.split(",")) {
            String t = part.trim().replaceAll("^\"|\"$", "");
            if (t.isEmpty()) {
                continue;
            }
            try {
                bands.add(new BigDecimal(t));
            } catch (NumberFormatException ignore) {
                // skip non-numeric entries
            }
        }
        return bands;
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

    private BigDecimal evaluateFormula(String formula, List<Map<String, Object>> childDtos) {
        if (formula == null || formula.trim().isEmpty()) return null;
        String evalStr = formula;

        // Replace each child's TOKEN with its score. We match on the unique code first
        // (so KPIs sharing the same display name are still addressable), then fall back to
        // the display name (legacy formulas built before codes were used). Tokens are
        // replaced longest-first so a shorter code/name can't clobber a longer one, and the
        // brackets are converted to parentheses afterwards (we no longer strip "[token]",
        // which previously broke single-argument calls like avg[KPI]).
        java.util.List<String[]> tokenScores = new ArrayList<>(); // [token, score]
        for (Map<String, Object> child : childDtos) {
            BigDecimal score = (BigDecimal) child.get("score");
            if (score == null) score = BigDecimal.ZERO;
            String sc = score.toPlainString();
            String code = getCodeFromChild(child);
            String name = getNameFromChild(child);
            // Use the code only when it is a real (alphanumeric) code. Code-less elements
            // (perspectives/objectives) fall back to a numeric id which the UI never inserts
            // and which, as a short digit string, could corrupt score numbers during
            // substitution (e.g. id "58" inside score "158"); skip those — the name matches.
            if (code != null && !code.isBlank() && !code.matches("\\d+")) tokenScores.add(new String[]{code, sc});
            if (name != null && !name.isBlank()) tokenScores.add(new String[]{name, sc});
        }
        tokenScores.sort((a, b) -> Integer.compare(b[0].length(), a[0].length()));
        for (String[] ts : tokenScores) {
            evalStr = evalStr.replace(ts[0], ts[1]);
        }

        // Replace list brackets with parentheses for EvalEx functions e.g. avg[10, 20] -> avg(10, 20)
        evalStr = evalStr.replace("[", "(").replace("]", ")");

        try {
            com.estrat.backend.scorecard.util.FormulaUtil util = new com.estrat.backend.scorecard.util.FormulaUtil();
            return new BigDecimal(util.applyExpression(evalStr));
        } catch (Exception e) {
            System.err.println("Formula evaluation failed for " + formula + ": " + e.getMessage());
            return null;
        }
    }

    // Unique identifier for a child DTO (perspective/objective/KPI/sub-KPI). The build*
    // methods store the element's code (falling back to its numeric id) under these keys.
    private String getCodeFromChild(Map<String, Object> child) {
        if (child.containsKey("kpiId")) return str(child.get("kpiId"));
        if (child.containsKey("objectiveId")) return str(child.get("objectiveId"));
        if (child.containsKey("subKpiId")) return str(child.get("subKpiId"));
        if (child.containsKey("code")) return str(child.get("code"));
        return null;
    }

    private Map<String, Object> makeVar(String name, BigDecimal value) {
        Map<String, Object> m = new LinkedHashMap<>();
        m.put("name", name);
        m.put("score", value);
        return m;
    }

    private String getNameFromChild(Map<String, Object> child) {
        if (child.containsKey("objectivesValue")) {
            return str(((Map<?,?>)child.get("objectivesValue")).get("name"));
        } else if (child.containsKey("kpiValue")) {
            return str(((Map<?,?>)child.get("kpiValue")).get("name"));
        } else if (child.containsKey("scoreCardValue")) {
            return str(((Map<?,?>)child.get("scoreCardValue")).get("name"));
        } else {
            return str(child.get("name"));
        }
    }
}
