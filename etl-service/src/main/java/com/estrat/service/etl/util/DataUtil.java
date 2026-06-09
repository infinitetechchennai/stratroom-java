/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.etl.dto.CustomPerformance
 *  com.estrat.service.etl.dto.KPIDTO
 *  com.estrat.service.etl.dto.ObjectivesDTO
 *  com.estrat.service.etl.dto.ScoreCardDTO
 *  com.estrat.service.etl.dto.ScoreCardResponseDTO
 *  com.estrat.service.etl.util.DataUtil
 *  com.estrat.service.etl.util.FormulaUtil
 *  com.estrat.service.etl.util.KPIThreadLocal
 *  com.estrat.service.etl.util.KPIUtil
 *  com.estrat.service.etl.util.NotificationUtil
 *  com.estrat.service.etl.util.UserThreadLocal
 *  com.google.common.base.Predicate
 *  org.apache.commons.collections4.CollectionUtils
 *  org.apache.commons.lang3.StringUtils
 *  org.apache.log4j.Logger
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Component
 */
package com.estrat.service.etl.util;

import com.estrat.service.etl.dto.CustomPerformance;
import com.estrat.service.etl.dto.KPIDTO;
import com.estrat.service.etl.dto.ObjectivesDTO;
import com.estrat.service.etl.dto.ScoreCardDTO;
import com.estrat.service.etl.dto.ScoreCardResponseDTO;
import com.estrat.service.etl.util.FormulaUtil;
import com.estrat.service.etl.util.KPIThreadLocal;
import com.estrat.service.etl.util.KPIUtil;
import com.estrat.service.etl.util.NotificationUtil;
import com.estrat.service.etl.util.UserThreadLocal;
import java.util.function.Predicate;
import java.math.BigDecimal;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.function.Function;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class DataUtil {
    private Logger log = LoggerFactory.getLogger(DataUtil.class);
    private KPIUtil kpiUtil;
    @Autowired
    protected NotificationUtil notificationUtil;

    @Autowired
    public DataUtil(KPIUtil kpiUtil) {
        this.kpiUtil = kpiUtil;
    }

    public String customPerformanceStatusLight(ScoreCardDTO scoreCardDTO, Map<String, KPIDTO> kpiMap, Map<String, ObjectivesDTO> objectivesMap) {
        CustomPerformance customPerformance = (CustomPerformance)KPIThreadLocal.get().get("customPerformance");
        if (customPerformance.isCustomPerformance() && customPerformance.isCustomPerspective()) {
            BigDecimal threshold1 = new BigDecimal(customPerformance.getThreshold1());
            BigDecimal threshold2 = new BigDecimal(customPerformance.getThreshold2());
            BigDecimal threshold3 = new BigDecimal(customPerformance.getThreshold3());
            boolean isKpi = "KPI".equalsIgnoreCase(customPerformance.getDerivation());
            if (scoreCardDTO.getScoreCardValue().get("thresholdFormula") != null && StringUtils.isNotEmpty((CharSequence)scoreCardDTO.getScoreCardValue().get("thresholdFormula").toString())) {
                FormulaUtil formulaUtil = new FormulaUtil();
                String thresholdFormula = scoreCardDTO.getScoreCardValue().get("thresholdFormula").toString();
                Matcher periodPattern = Pattern.compile("\\[(.*?)\\]").matcher(thresholdFormula);
                LinkedHashSet<String> searchList = new LinkedHashSet<String>();
                while (periodPattern.find()) {
                    if (searchList.contains(periodPattern.group(1))) continue;
                    String nodeKey = periodPattern.group(1);
                    if (nodeKey.contains(",")) {
                        searchList.addAll(Arrays.asList(nodeKey.split("\\,")));
                        continue;
                    }
                    searchList.add(nodeKey);
                }
                List replaceList = searchList.stream().map(search -> isKpi ? this.getThresholdValue(((KPIDTO)kpiMap.get(search)).getKpiValue(), true) : this.getThresholdValue(((ObjectivesDTO)objectivesMap.get(search)).getObjectivesValue(), false)).collect(Collectors.toList());
                searchList.add("[");
                searchList.add("]");
                replaceList.add("(");
                replaceList.add(")");
                String[] searchStrArray = (String[])searchList.stream().toArray(String[]::new);
                String[] replaceStringArray = (String[])replaceList.stream().toArray(String[]::new);
                thresholdFormula = StringUtils.replaceEach((String)thresholdFormula, (String[])searchStrArray, (String[])replaceStringArray);
                BigDecimal result = null;
                try {
                    result = new BigDecimal(formulaUtil.applyExpression(thresholdFormula));
                }
                catch (Exception ex) {
                    result = new BigDecimal(0);
                    this.log.error("Exception while processing custom performance", ex);
                }
                if (customPerformance.isWeightEnbled()) {
                    String weight = Objects.nonNull(scoreCardDTO.getScoreCardValue().get("weight")) && StringUtils.isNotEmpty((CharSequence)scoreCardDTO.getScoreCardValue().get("weight").toString()) ? scoreCardDTO.getScoreCardValue().get("weight").toString() : "0";
                    result = result.multiply(new BigDecimal(weight));
                }
                scoreCardDTO.getScoreCardValue().put("thresholdResult", result);
                return this.applyThreshold(result, threshold1, threshold2, threshold3);
            }
            return this.getScoreCardStatusLight(scoreCardDTO.getObjectiveList());
        }
        return this.getScoreCardStatusLight(scoreCardDTO.getObjectiveList());
    }

    private String getThresholdValue(Map<String, Object> mapObject, boolean isKpi) {
        if (isKpi) {
            return Objects.nonNull(mapObject.get("thresholdResult")) && StringUtils.isNotEmpty((CharSequence)mapObject.get("thresholdResult").toString()) ? mapObject.get("thresholdResult").toString().replaceAll("%", "") : mapObject.get("actual").toString().replaceAll("%", "");
        }
        return Objects.nonNull(mapObject.get("thresholdResult")) && StringUtils.isNotEmpty((CharSequence)mapObject.get("thresholdResult").toString()) ? mapObject.get("thresholdResult").toString().replaceAll("%", "") : "0";
    }

    public String applyThreshold(BigDecimal finalResult, BigDecimal updatedThreshold1, BigDecimal updatedThreshold2, BigDecimal updatedThreshol3) {
        if (this.kpiUtil.between(finalResult, new BigDecimal(0), updatedThreshold1)) {
            return "red fas fa-flag";
        }
        if (this.kpiUtil.between(finalResult, updatedThreshold1, updatedThreshold2)) {
            return "yellow fas fa-flag";
        }
        if (this.kpiUtil.between(finalResult, updatedThreshold2, updatedThreshol3) || finalResult.compareTo(updatedThreshol3) >= 0) {
            return "green fas fa-flag";
        }
        return "red fas fa-flag";
    }

    public String applyOverallThreshold(BigDecimal finalResult, BigDecimal updatedThreshold1, BigDecimal updatedThreshold2, BigDecimal updatedThreshol3) {
        if (this.kpiUtil.between(finalResult, new BigDecimal(0), updatedThreshold1)) {
            return (String)this.kpiUtil.getStatusKeyMap().get("red fas fa-flag");
        }
        if (this.kpiUtil.between(finalResult, updatedThreshold1, updatedThreshold2)) {
            return (String)this.kpiUtil.getStatusKeyMap().get("yellow fas fa-flag");
        }
        if (this.kpiUtil.between(finalResult, updatedThreshold2, updatedThreshol3) || finalResult.compareTo(updatedThreshol3) >= 0) {
            return (String)this.kpiUtil.getStatusKeyMap().get("green fas fa-flag");
        }
        return (String)this.kpiUtil.getStatusKeyMap().get("red fas fa-flag");
    }

    public Map<String, ScoreCardDTO> calculateStatusLight(List<ScoreCardDTO> scoreCardList) {
        HashMap<String, ScoreCardDTO> scoreCardMap = new HashMap<String, ScoreCardDTO>();
        for (ScoreCardDTO scoreCardDTO : scoreCardList) {
            HashMap<String, KPIDTO> kpiMap = new HashMap<String, KPIDTO>();
            HashMap<String, ObjectivesDTO> objectiveMap = new HashMap<String, ObjectivesDTO>();
            scoreCardMap.put(scoreCardDTO.getPerspectiveType(), scoreCardDTO);
            if (!CollectionUtils.isNotEmpty((Collection)scoreCardDTO.getObjectiveList())) continue;
            for (ObjectivesDTO objectivesDTO : scoreCardDTO.getObjectiveList()) {
                objectiveMap.put(objectivesDTO.getObjectiveId(), objectivesDTO);
                if (!CollectionUtils.isNotEmpty((Collection)objectivesDTO.getKpiList())) continue;
                for (KPIDTO kpidto : objectivesDTO.getKpiList()) {
                    kpiMap.put(kpidto.getKpiId(), kpidto);
                    if (Objects.nonNull(kpidto.getKpiValue().get("kpi_measurement")) && StringUtils.isNotEmpty((CharSequence)kpidto.getKpiValue().get("kpi_measurement").toString())) {
                        String kpiFrequency = kpidto.getKpiValue().get("kpi_measurement").toString();
                        String frequencyValue = this.kpiUtil.getFrequency(kpiFrequency);
                        Map periodMap = (Map)KPIThreadLocal.get().get("periodMap");
                        UserThreadLocal.get().put("DATE_PERIOD", (String)periodMap.get(frequencyValue));
                    }
                    UserThreadLocal.get().put("LOGGED_IN_EMPLOYEE_ID", String.valueOf(kpidto.getOwner()));
                    this.kpiUtil.buildStatusLight(kpidto);
                    String status = Objects.nonNull(kpidto.getKpiValue().get("status")) ? kpidto.getKpiValue().get("status").toString() : "";
                    boolean firstStatus = status.equalsIgnoreCase("First");
                    boolean weighted = status.equalsIgnoreCase("Weighted");
                    if (!firstStatus && !weighted) {
                        Map subMap = this.kpiUtil.buildKPIDataFeed(kpidto);
                        boolean etlPercentageCheck = Objects.nonNull(subMap.get("dataType")) && "Percentage".equalsIgnoreCase(subMap.get("dataType").toString());
                        BigDecimal actual = Objects.nonNull(subMap.get("actual")) ? new BigDecimal(subMap.get("actual").toString()) : new BigDecimal(0);
                        kpidto.getKpiValue().put("actual", etlPercentageCheck ? String.join((CharSequence)"", this.kpiUtil.formatdecimal(actual), "%") : this.kpiUtil.convertResult(actual, subMap));
                        if (Objects.nonNull(subMap.get("target")) && StringUtils.isNotEmpty((CharSequence)subMap.get("target").toString())) {
                            BigDecimal target = new BigDecimal(subMap.get("target").toString());
                            kpidto.getKpiValue().put("target", etlPercentageCheck ? String.join((CharSequence)"", this.kpiUtil.formatdecimal(target), "%") : this.kpiUtil.convertResult(target, subMap));
                        } else {
                            boolean checkFlag;
                            boolean percentageCheck = Objects.nonNull(kpidto.getKpiValue().get("target")) ? kpidto.getKpiValue().get("target").toString().contains("%") : false;
                            BigDecimal target = null;
                            Object targetObj = kpidto.getKpiValue().get("target");
                            if (percentageCheck) {
                                checkFlag = Objects.nonNull(targetObj) && StringUtils.isNotEmpty((CharSequence)targetObj.toString().substring(0, "%".length()));
                                target = checkFlag ? new BigDecimal(targetObj.toString().replaceAll("%", "")) : new BigDecimal(0);
                            } else {
                                checkFlag = Objects.nonNull(targetObj) && StringUtils.isNotEmpty((CharSequence)targetObj.toString());
                                BigDecimal bigDecimal = target = checkFlag ? new BigDecimal(targetObj.toString()) : new BigDecimal(0);
                            }
                            if (!percentageCheck) {
                                kpidto.getKpiValue().put("target", this.kpiUtil.convertResult(target, kpidto.getKpiValue()));
                            } else {
                                kpidto.getKpiValue().put("target", String.join((CharSequence)"", this.kpiUtil.formatdecimal(target), "%"));
                            }
                        }
                    }
                    this.notificationUtil.saveStatuslightNotification((Object)kpidto);
                    UserThreadLocal.get().remove("LOGGED_IN_EMPLOYEE_ID");
                    UserThreadLocal.get().remove("DATE_PERIOD");
                }
                String objStatusLight = this.customPerformanceStatusLight(objectivesDTO, kpiMap);
                objectivesDTO.getObjectivesValue().put("statusLight", objStatusLight);
            }
            String scoreCardStatusLight = this.customPerformanceStatusLight(scoreCardDTO, kpiMap, objectiveMap);
            scoreCardDTO.getScoreCardValue().put("statusLight", this.kpiUtil.getStatusKeyMap().get(scoreCardStatusLight));
            this.notificationUtil.saveStatuslightNotification((Object)scoreCardDTO);
        }
        return scoreCardMap;
    }

    public String customPerformanceStatusLight(ObjectivesDTO objectivesDTO, Map<String, KPIDTO> kpiMap) {
        CustomPerformance customPerformance = (CustomPerformance)KPIThreadLocal.get().get("customPerformance");
        if (customPerformance.isCustomPerformance() && customPerformance.isCustomObjective()) {
            BigDecimal threshold1 = new BigDecimal(customPerformance.getThreshold1());
            BigDecimal threshold2 = new BigDecimal(customPerformance.getThreshold2());
            BigDecimal threshold3 = new BigDecimal(customPerformance.getThreshold3());
            if (objectivesDTO.getObjectivesValue().get("thresholdFormula") != null && StringUtils.isNotEmpty((CharSequence)objectivesDTO.getObjectivesValue().get("thresholdFormula").toString())) {
                FormulaUtil formulaUtil = new FormulaUtil();
                String thresholdFormula = objectivesDTO.getObjectivesValue().get("thresholdFormula").toString();
                Matcher periodPattern = Pattern.compile("\\[(.*?)\\]").matcher(thresholdFormula);
                LinkedHashSet<String> searchList = new LinkedHashSet<String>();
                while (periodPattern.find()) {
                    if (searchList.contains(periodPattern.group(1))) continue;
                    String nodeKey = periodPattern.group(1);
                    if (nodeKey.contains(",")) {
                        searchList.addAll(Arrays.asList(nodeKey.split("\\,")));
                        continue;
                    }
                    searchList.add(nodeKey);
                }
                List replaceList = searchList.stream().map(search -> this.getThresholdValue(((KPIDTO)kpiMap.get(search)).getKpiValue(), true)).collect(Collectors.toList());
                searchList.add("[");
                searchList.add("]");
                replaceList.add("(");
                replaceList.add(")");
                String[] searchStrArray = (String[])searchList.stream().toArray(String[]::new);
                String[] replaceStringArray = (String[])replaceList.stream().toArray(String[]::new);
                thresholdFormula = StringUtils.replaceEach((String)thresholdFormula, (String[])searchStrArray, (String[])replaceStringArray);
                BigDecimal result = null;
                try {
                    result = new BigDecimal(formulaUtil.applyExpression(thresholdFormula));
                }
                catch (Exception ex) {
                    result = new BigDecimal(0);
                    this.log.error("Exception while processing custom performance", ex);
                }
                if (customPerformance.isWeightEnbled()) {
                    String weight = Objects.nonNull(objectivesDTO.getObjectivesValue().get("weight")) && StringUtils.isNotEmpty((CharSequence)objectivesDTO.getObjectivesValue().get("weight").toString()) ? objectivesDTO.getObjectivesValue().get("weight").toString() : "0";
                    result = result.multiply(new BigDecimal(weight));
                }
                objectivesDTO.getObjectivesValue().put("thresholdResult", result);
                return this.applyThreshold(result, threshold1, threshold2, threshold3);
            }
            return this.getObjectiveStatusLight(objectivesDTO.getKpiList());
        }
        return this.getObjectiveStatusLight(objectivesDTO.getKpiList());
    }

    public String getObjectiveStatusLight(List<KPIDTO> kpiList) {
        boolean oneKey;
        Function<KPIDTO, String> kpiFunction = kpi -> kpi.getKpiValue().get("statusLight").toString();
        Function<KPIDTO, Double> weightFunction = kpi -> Double.valueOf(kpi.getKpiValue().get("weight").toString());
        Map<String, Double> statusMap = kpiList.stream().filter(kpi -> Objects.nonNull(kpi.getKpiValue().get("statusLight")) && StringUtils.isNotEmpty((CharSequence)kpi.getKpiValue().get("statusLight").toString())).map(kpi -> {
            if (Objects.isNull(kpi.getKpiValue().get("weight")) || StringUtils.isEmpty((CharSequence)kpi.getKpiValue().get("weight").toString())) {
                kpi.getKpiValue().put("weight", "0");
            }
            return kpi;
        }).collect(Collectors.groupingBy(kpi -> (String)kpiFunction.apply((KPIDTO)kpi), Collectors.averagingDouble(kpi -> (Double)weightFunction.apply((KPIDTO)kpi))));
        boolean bl = oneKey = statusMap.keySet().size() == 1;
        if (oneKey) {
            String statusLight = (String)statusMap.keySet().stream().findFirst().get();
            return StringUtils.isNotEmpty((CharSequence)statusLight) ? statusLight : "yellow fas fa-flag";
        }
        java.util.function.Predicate<java.util.Map.Entry<String, Double>> maxWeightPredicate = e -> e.getValue() >= 100.0;
        String maxWeightStatus = statusMap.entrySet().stream().filter(e -> maxWeightPredicate.test(e)).map(Map.Entry::getKey).findFirst().orElse("");
        if (StringUtils.isNotEmpty((CharSequence)maxWeightStatus)) {
            return maxWeightStatus;
        }
        java.util.function.Predicate<java.util.Map.Entry<String, Double>> statusPredicate = e -> e.getKey().contains("red") && e.getValue() >= 50.0;
        String statusLight = statusMap.entrySet().stream().filter(e -> statusPredicate.test(e)).map(Map.Entry::getKey).findFirst().orElse("");
        return StringUtils.isNotEmpty((CharSequence)statusLight) ? statusLight : "yellow fas fa-flag";
    }

    public String getScoreCardStatusLight(List<ObjectivesDTO> objList) {
        boolean oneKey;
        Function<ObjectivesDTO, String> kpiFunction = kpi -> kpi.getObjectivesValue().get("statusLight").toString();
        Function<ObjectivesDTO, Double> weightFunction = kpi -> Double.valueOf(kpi.getObjectivesValue().get("weight").toString());
        Map<String, Double> statusMap = objList.stream().filter(kpi -> Objects.nonNull(kpi.getObjectivesValue().get("statusLight"))).map(kpi -> {
            if (Objects.isNull(kpi.getObjectivesValue().get("weight")) || StringUtils.isEmpty((CharSequence)kpi.getObjectivesValue().get("weight").toString())) {
                kpi.getObjectivesValue().put("weight", "0");
            }
            return kpi;
        }).collect(Collectors.groupingBy(kpi -> (String)kpiFunction.apply((ObjectivesDTO)kpi), Collectors.averagingDouble(kpi -> (Double)weightFunction.apply((ObjectivesDTO)kpi))));
        boolean bl = oneKey = statusMap.keySet().size() == 1;
        if (oneKey) {
            String statusLight = (String)statusMap.keySet().stream().findFirst().get();
            return StringUtils.isNotEmpty((CharSequence)statusLight) ? statusLight : "yellow fas fa-flag";
        }
        java.util.function.Predicate<java.util.Map.Entry<String, Double>> maxWeightPredicate = e -> e.getValue() >= 100.0;
        String maxWeightStatus = statusMap.entrySet().stream().filter(e -> maxWeightPredicate.test(e)).map(Map.Entry::getKey).findFirst().orElse("");
        if (StringUtils.isNotEmpty((CharSequence)maxWeightStatus)) {
            return maxWeightStatus;
        }
        java.util.function.Predicate<java.util.Map.Entry<String, Double>> statusPredicate = e -> e.getKey().contains("red") && e.getValue() >= 50.0;
        String statusLight = statusMap.entrySet().stream().filter(e -> statusPredicate.test(e)).map(Map.Entry::getKey).findFirst().orElse("");
        return StringUtils.isNotEmpty((CharSequence)statusLight) ? statusLight : "yellow fas fa-flag";
    }

    public String getOverallStatusLight(List<ScoreCardDTO> scoreCardList) {
        boolean oneKey;
        Function<ScoreCardDTO, String> kpiFunction = kpi -> kpi.getScoreCardValue().get("statusLight").toString();
        Function<ScoreCardDTO, Double> weightFunction = kpi -> Double.valueOf(kpi.getScoreCardValue().get("weight").toString());
        Map<String, Double> statusMap = scoreCardList.stream().filter(kpi -> Objects.nonNull(kpi.getScoreCardValue().get("statusLight"))).map(kpi -> {
            if (Objects.isNull(kpi.getScoreCardValue().get("weight")) || StringUtils.isEmpty((CharSequence)kpi.getScoreCardValue().get("weight").toString())) {
                kpi.getScoreCardValue().put("weight", "0");
            }
            return kpi;
        }).collect(Collectors.groupingBy(kpi -> (String)kpiFunction.apply((ScoreCardDTO)kpi), Collectors.averagingDouble(kpi -> (Double)weightFunction.apply((ScoreCardDTO)kpi))));
        boolean bl = oneKey = statusMap.keySet().size() == 1;
        if (oneKey) {
            return (String)statusMap.keySet().stream().findFirst().get();
        }
        java.util.function.Predicate<java.util.Map.Entry<String, Double>> maxWeightPredicate = e -> e.getValue() >= 100.0;
        String maxWeightStatus = statusMap.entrySet().stream().filter(e -> maxWeightPredicate.test(e)).map(Map.Entry::getKey).findFirst().orElse("");
        if (StringUtils.isNotEmpty((CharSequence)maxWeightStatus)) {
            return maxWeightStatus;
        }
        java.util.function.Predicate<java.util.Map.Entry<String, Double>> statusPredicate = e -> e.getKey().contains("red") && e.getValue() >= 50.0;
        String statusLight = statusMap.entrySet().stream().filter(e -> statusPredicate.test(e)).map(Map.Entry::getKey).findFirst().orElse("");
        return StringUtils.isNotEmpty((CharSequence)statusLight) ? (String)this.kpiUtil.getStatusKeyMap().get(statusLight) : (String)this.kpiUtil.getStatusKeyMap().get("yellow fas fa-flag");
    }

    public void populateOverallStatusLight(ScoreCardResponseDTO responseDTO, Map<String, ScoreCardDTO> scoreCardMap) {
        CustomPerformance customPerformance = (CustomPerformance)KPIThreadLocal.get().get("customPerformance");
        String overAllStatusLight = null;
        if (customPerformance.isCustomPerformance()) {
            BigDecimal threshold1 = new BigDecimal(customPerformance.getThreshold1());
            BigDecimal threshold2 = new BigDecimal(customPerformance.getThreshold2());
            BigDecimal threshold3 = new BigDecimal(customPerformance.getThreshold3());
            if (StringUtils.isNotEmpty((CharSequence)this.getScoreCardFormula(responseDTO.getCardDetailsDTO().getScoreCardDTOS()))) {
                FormulaUtil formulaUtil = new FormulaUtil();
                String thresholdFormula = this.getScoreCardFormula(responseDTO.getCardDetailsDTO().getScoreCardDTOS());
                Matcher periodPattern = Pattern.compile("\\[(.*?)\\]").matcher(thresholdFormula);
                LinkedHashSet<String> searchList = new LinkedHashSet<String>();
                while (periodPattern.find()) {
                    if (searchList.contains(periodPattern.group(1))) continue;
                    String nodeKey = periodPattern.group(1);
                    if (nodeKey.contains(",")) {
                        searchList.addAll(Arrays.asList(nodeKey.split("\\,")));
                        continue;
                    }
                    searchList.add(nodeKey);
                }
                List replaceList = searchList.stream().map(search -> this.getThresholdValue(((ScoreCardDTO)scoreCardMap.get(search)).getScoreCardValue(), false)).collect(Collectors.toList());
                searchList.add("[");
                searchList.add("]");
                replaceList.add("(");
                replaceList.add(")");
                String[] searchStrArray = (String[])searchList.stream().toArray(String[]::new);
                String[] replaceStringArray = (String[])replaceList.stream().toArray(String[]::new);
                thresholdFormula = StringUtils.replaceEach((String)thresholdFormula, (String[])searchStrArray, (String[])replaceStringArray);
                BigDecimal result = new BigDecimal(formulaUtil.applyExpression(thresholdFormula));
                String scoreCardWeight = this.getScoreCardWeight(responseDTO.getCardDetailsDTO().getScoreCardDTOS());
                if (customPerformance.isWeightEnbled()) {
                    result = result.multiply(new BigDecimal(scoreCardWeight));
                }
                overAllStatusLight = this.applyOverallThreshold(result, threshold1, threshold2, threshold3);
            } else {
                overAllStatusLight = this.getOverallStatusLight(responseDTO.getCardDetailsDTO().getScoreCardDTOS());
            }
        } else {
            overAllStatusLight = this.getOverallStatusLight(responseDTO.getCardDetailsDTO().getScoreCardDTOS());
        }
        responseDTO.setStatusLight(overAllStatusLight);
    }

    public String getScoreCardFormula(List<ScoreCardDTO> scoreCardList) {
        if (CollectionUtils.isNotEmpty(scoreCardList)) {
            ScoreCardDTO scoreCardDTO = scoreCardList.get(0);
            return Objects.nonNull(scoreCardDTO.getScoreCardValue().get("scorecardFormula")) ? scoreCardDTO.getScoreCardValue().get("scorecardFormula").toString() : "";
        }
        return "";
    }

    public String getScoreCardWeight(List<ScoreCardDTO> scoreCardList) {
        if (CollectionUtils.isNotEmpty(scoreCardList)) {
            ScoreCardDTO scoreCardDTO = scoreCardList.get(0);
            return Objects.nonNull(scoreCardDTO.getScoreCardValue().get("scorecardweight")) ? scoreCardDTO.getScoreCardValue().get("scorecardweight").toString() : "0";
        }
        return "0";
    }
}

