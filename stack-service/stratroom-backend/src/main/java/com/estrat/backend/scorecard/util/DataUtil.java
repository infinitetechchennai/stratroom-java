/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.scorecard.dto.CustomPerformance
 *  com.estrat.backend.scorecard.dto.KPIDTO
 *  com.estrat.backend.scorecard.dto.ObjectivesDTO
 *  com.estrat.backend.scorecard.dto.ScoreCardDTO
 *  com.estrat.backend.scorecard.dto.ScoreCardDetailsDTO
 *  com.estrat.backend.scorecard.dto.ScoreCardResponseDTO
 *  com.estrat.backend.scorecard.dto.SubKPIDTO
 *  com.estrat.backend.scorecard.service.KPIService
 *  com.estrat.backend.scorecard.util.DataUtil
 *  com.estrat.backend.scorecard.util.FormulaUtil
 *  com.estrat.backend.scorecard.util.KPIUtil
 *  com.google.common.base.Predicate
 *  org.apache.commons.collections4.CollectionUtils
 *  org.apache.commons.lang3.StringUtils
 *  Logger
 *  org.slf4j.Logger
 *  org.slf4j.LoggerFactory
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Component
 */
package com.estrat.backend.scorecard.util;

import com.estrat.backend.scorecard.dto.CustomPerformance;
import com.estrat.backend.scorecard.dto.KPIDTO;
import com.estrat.backend.scorecard.dto.ObjectivesDTO;
import com.estrat.backend.scorecard.dto.ScoreCardDTO;
import com.estrat.backend.scorecard.dto.ScoreCardDetailsDTO;
import com.estrat.backend.scorecard.dto.ScoreCardResponseDTO;
import com.estrat.backend.scorecard.dto.SubKPIDTO;
import com.estrat.backend.scorecard.service.KPIService;
import com.estrat.backend.scorecard.util.FormulaUtil;
import com.estrat.backend.scorecard.util.KPIUtil;
import java.util.function.Predicate;
import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Locale;
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
    private Logger logger = log;
    @Autowired
    private KPIUtil kpiUtil;
    @Autowired
    public KPIService kpiService;

    public Object formatThreshold(KPIDTO kpidto, SubKPIDTO supKpidto, String flageType) {
        String range5;
        String range4;
        String range3;
        String range2;
        String range1;
        if (flageType.equalsIgnoreCase("subKpi")) {
            String threshold = Objects.nonNull(supKpidto.getSubKpiValue().get("threshold")) ? supKpidto.getSubKpiValue().get("threshold").toString().replaceAll("_", "") : "";
            range1 = Objects.nonNull(supKpidto.getSubKpiValue().get("threshold1")) ? supKpidto.getSubKpiValue().get("threshold1").toString() : null;
            range2 = Objects.nonNull(supKpidto.getSubKpiValue().get("threshold2")) ? supKpidto.getSubKpiValue().get("threshold2").toString() : null;
            range3 = Objects.nonNull(supKpidto.getSubKpiValue().get("threshold3")) ? supKpidto.getSubKpiValue().get("threshold3").toString() : null;
            range4 = Objects.nonNull(supKpidto.getSubKpiValue().get("threshold4")) ? supKpidto.getSubKpiValue().get("threshold4").toString() : null;
            range5 = Objects.nonNull(supKpidto.getSubKpiValue().get("threshold5")) ? supKpidto.getSubKpiValue().get("threshold5").toString() : null;
        } else {
            String threshold = Objects.nonNull(kpidto.getKpiValue().get("threshold")) ? kpidto.getKpiValue().get("threshold").toString().replaceAll("_", "") : "";
            range1 = Objects.nonNull(kpidto.getKpiValue().get("threshold1")) ? kpidto.getKpiValue().get("threshold1").toString() : null;
            range2 = Objects.nonNull(kpidto.getKpiValue().get("threshold2")) ? kpidto.getKpiValue().get("threshold2").toString() : null;
            range3 = Objects.nonNull(kpidto.getKpiValue().get("threshold3")) ? kpidto.getKpiValue().get("threshold3").toString() : null;
            range4 = Objects.nonNull(kpidto.getKpiValue().get("threshold4")) ? kpidto.getKpiValue().get("threshold4").toString() : null;
            range5 = Objects.nonNull(kpidto.getKpiValue().get("threshold5")) ? kpidto.getKpiValue().get("threshold5").toString() : null;
        }
        String thresholdDisplay1 = StringUtils.stripToEmpty((String)range1);
        String thresholdDisplay2 = StringUtils.stripToEmpty((String)range2);
        String thresholdDisplay3 = StringUtils.stripToEmpty((String)range3);
        String thresholdDisplay4 = StringUtils.stripToEmpty((String)range4);
        String thresholdDisplay5 = StringUtils.stripToEmpty((String)range5);
        boolean percentCheckThreshold = thresholdDisplay1.contains("%") || thresholdDisplay2.contains("%") || thresholdDisplay3.contains("%") || thresholdDisplay4.contains("%") || thresholdDisplay5.contains("%");
        BigDecimal threshold1 = null;
        BigDecimal threshold2 = null;
        BigDecimal threshold3 = null;
        BigDecimal threshold4 = null;
        BigDecimal threshold5 = null;
        if (percentCheckThreshold) {
            threshold1 = StringUtils.isNotEmpty((CharSequence)thresholdDisplay1) ? new BigDecimal(thresholdDisplay1.substring(0, thresholdDisplay1.length() - "%".length())) : new BigDecimal(0);
            threshold2 = StringUtils.isNotEmpty((CharSequence)thresholdDisplay2) ? new BigDecimal(thresholdDisplay2.substring(0, thresholdDisplay2.length() - "%".length())) : new BigDecimal(0);
            threshold3 = StringUtils.isNotEmpty((CharSequence)thresholdDisplay3) ? new BigDecimal(thresholdDisplay3.substring(0, thresholdDisplay3.length() - "%".length())) : new BigDecimal(0);
            threshold4 = StringUtils.isNotEmpty((CharSequence)thresholdDisplay4) ? new BigDecimal(thresholdDisplay4.substring(0, thresholdDisplay4.length() - "%".length())) : new BigDecimal(0);
            BigDecimal bigDecimal = threshold5 = StringUtils.isNotEmpty((CharSequence)thresholdDisplay5) ? new BigDecimal(thresholdDisplay5.substring(0, thresholdDisplay5.length() - "%".length())) : new BigDecimal(0);
            if (flageType.equalsIgnoreCase("subKpi")) {
                if (threshold1.intValue() != 0) {
                    supKpidto.getSubKpiValue().put("threshold1", String.join((CharSequence)"", this.kpiUtil.formatdecimal(threshold1), "%"));
                }
                if (threshold2.intValue() != 0) {
                    supKpidto.getSubKpiValue().put("threshold2", String.join((CharSequence)"", this.kpiUtil.formatdecimal(threshold2), "%"));
                }
                if (threshold3.intValue() != 0) {
                    supKpidto.getSubKpiValue().put("threshold3", String.join((CharSequence)"", this.kpiUtil.formatdecimal(threshold3), "%"));
                }
                if (threshold4.intValue() != 0) {
                    supKpidto.getSubKpiValue().put("threshold4", String.join((CharSequence)"", this.kpiUtil.formatdecimal(threshold4), "%"));
                }
                if (threshold5.intValue() != 0) {
                    supKpidto.getSubKpiValue().put("threshold5", String.join((CharSequence)"", this.kpiUtil.formatdecimal(threshold5), "%"));
                }
            } else {
                if (threshold1.intValue() != 0) {
                    kpidto.getKpiValue().put("threshold1", String.join((CharSequence)"", this.kpiUtil.formatdecimal(threshold1), "%"));
                }
                if (threshold2.intValue() != 0) {
                    kpidto.getKpiValue().put("threshold2", String.join((CharSequence)"", this.kpiUtil.formatdecimal(threshold2), "%"));
                }
                if (threshold3.intValue() != 0) {
                    kpidto.getKpiValue().put("threshold3", String.join((CharSequence)"", this.kpiUtil.formatdecimal(threshold3), "%"));
                }
                if (threshold4.intValue() != 0) {
                    kpidto.getKpiValue().put("threshold4", String.join((CharSequence)"", this.kpiUtil.formatdecimal(threshold4), "%"));
                }
                if (threshold5.intValue() != 0) {
                    kpidto.getKpiValue().put("threshold5", String.join((CharSequence)"", this.kpiUtil.formatdecimal(threshold5), "%"));
                }
            }
        } else {
            String modifiedVal1 = this.kpiUtil.formattedToOriginal(thresholdDisplay1);
            String modifiedVal2 = this.kpiUtil.formattedToOriginal(thresholdDisplay2);
            String modifiedVal3 = this.kpiUtil.formattedToOriginal(thresholdDisplay3);
            String modifiedVal4 = this.kpiUtil.formattedToOriginal(thresholdDisplay4);
            String modifiedVal5 = this.kpiUtil.formattedToOriginal(thresholdDisplay5);
            threshold1 = StringUtils.isNotEmpty((CharSequence)modifiedVal1) ? new BigDecimal(modifiedVal1) : new BigDecimal(0);
            threshold2 = StringUtils.isNotEmpty((CharSequence)modifiedVal2) ? new BigDecimal(modifiedVal2) : new BigDecimal(0);
            threshold3 = StringUtils.isNotEmpty((CharSequence)modifiedVal3) ? new BigDecimal(modifiedVal3) : new BigDecimal(0);
            threshold4 = StringUtils.isNotEmpty((CharSequence)modifiedVal4) ? new BigDecimal(modifiedVal4) : new BigDecimal(0);
            BigDecimal bigDecimal = threshold5 = StringUtils.isNotEmpty((CharSequence)modifiedVal5) ? new BigDecimal(modifiedVal5) : new BigDecimal(0);
            if (flageType.equalsIgnoreCase("subKpi")) {
                if (threshold1.intValue() != 0) {
                    supKpidto.getSubKpiValue().put("threshold1", this.kpiUtil.convertResult(threshold1, kpidto.getKpiValue()));
                }
                if (threshold2.intValue() != 0) {
                    supKpidto.getSubKpiValue().put("threshold2", this.kpiUtil.convertResult(threshold2, kpidto.getKpiValue()));
                }
                if (threshold3.intValue() != 0) {
                    supKpidto.getSubKpiValue().put("threshold3", this.kpiUtil.convertResult(threshold3, kpidto.getKpiValue()));
                }
                if (threshold4.intValue() != 0) {
                    supKpidto.getSubKpiValue().put("threshold4", this.kpiUtil.convertResult(threshold4, kpidto.getKpiValue()));
                }
                if (threshold5.intValue() != 0) {
                    supKpidto.getSubKpiValue().put("threshold5", this.kpiUtil.convertResult(threshold5, kpidto.getKpiValue()));
                }
            } else {
                if (threshold1.intValue() != 0) {
                    kpidto.getKpiValue().put("threshold1", this.kpiUtil.convertResult(threshold1, kpidto.getKpiValue()));
                }
                if (threshold2.intValue() != 0) {
                    kpidto.getKpiValue().put("threshold2", this.kpiUtil.convertResult(threshold2, kpidto.getKpiValue()));
                }
                if (threshold3.intValue() != 0) {
                    kpidto.getKpiValue().put("threshold3", this.kpiUtil.convertResult(threshold3, kpidto.getKpiValue()));
                }
                if (threshold4.intValue() != 0) {
                    kpidto.getKpiValue().put("threshold4", this.kpiUtil.convertResult(threshold4, kpidto.getKpiValue()));
                }
                if (threshold5.intValue() != 0) {
                    kpidto.getKpiValue().put("threshold5", this.kpiUtil.convertResult(threshold5, kpidto.getKpiValue()));
                }
            }
        }
        if (flageType.equalsIgnoreCase("subKpi")) {
            return supKpidto;
        }
        return kpidto;
    }

    public String customPerformanceStatusLight(ScoreCardDTO scoreCardDTO, Map<String, KPIDTO> kpiMap, Map<String, ObjectivesDTO> objectivesMap, String dateRange) {
        CustomPerformance customPerformance = this.kpiService.findCustomPerformanceByOrgId();
        if (customPerformance != null && customPerformance.isCustomPerformance() && customPerformance.isCustomPerspective()) {
            BigDecimal threshold1 = new BigDecimal(customPerformance.getThreshold1());
            BigDecimal threshold2 = new BigDecimal(customPerformance.getThreshold2());
            BigDecimal threshold3 = new BigDecimal(customPerformance.getThreshold3());
            BigDecimal threshold4 = null;
            BigDecimal threshold5 = null;
            if (customPerformance.getThreshold4() != null) {
                threshold4 = new BigDecimal(customPerformance.getThreshold4());
            }
            if (customPerformance.getThreshold5() != null) {
                threshold5 = new BigDecimal(customPerformance.getThreshold5());
            }
            boolean isKpi = "KPI".equalsIgnoreCase(customPerformance.getDerivation());
            String[] dataRanges = null;
            String startDate = null;
            String endDate = null;
            Date firstDate = null;
            Date secondDate = null;
            if (Objects.nonNull(dateRange)) {
                String[] stringArray = dataRanges = dateRange.contains("-") ? dateRange.split("-") : dateRange.split(",");
            }
            if (dataRanges != null && dataRanges.length > 1) {
                SimpleDateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy");
                try {
                    startDate = dataRanges[0].trim();
                    endDate = dataRanges[1].trim();
                    firstDate = dateFormat.parse(dataRanges[0].trim());
                    secondDate = dateFormat.parse(dataRanges[1].trim());
                }
                catch (ParseException e) {
                    throw new RuntimeException(e);
                }
            }
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
                ArrayList<String> replaceList = new ArrayList<String>();
                for (String s : searchList) {
                    if (isKpi) {
                        if (kpiMap.containsKey(s)) {
                            if (secondDate != null && firstDate != null && kpiMap.get(s).getStartDate().compareTo(secondDate) > 0 && kpiMap.get(s).getEndDate().compareTo(firstDate) < 0) {
                                replaceList.add("noData");
                                continue;
                            }
                            if (!this.validatekpieligibility(kpiMap.get(s), startDate, endDate)) {
                                replaceList.add("noData");
                                continue;
                            }
                            replaceList.add(this.getThresholdValue(kpiMap.get(s).getKpiValue(), true));
                            continue;
                        }
                        replaceList.add("noData");
                        continue;
                    }
                    if (objectivesMap.containsKey(s)) {
                        replaceList.add(this.getThresholdValue(objectivesMap.get(s).getObjectivesValue(), true));
                        continue;
                    }
                    replaceList.add("noData");
                }
                try {
                    String weightval = "0";
                    if (Objects.nonNull(scoreCardDTO.getScoreCardValue().get("weight")) && StringUtils.isNotEmpty((CharSequence)scoreCardDTO.getScoreCardValue().get("weight").toString())) {
                        double temp = Double.parseDouble(scoreCardDTO.getScoreCardValue().get("weight").toString()) / 100.0;
                        weightval = String.valueOf(temp);
                    }
                    searchList.add("[");
                    searchList.add("]");
                    searchList.add("Weight");
                    searchList.add("weight");
                    searchList.add("WEIGHT");
                    replaceList.add("(");
                    replaceList.add(")");
                    replaceList.add(weightval);
                    replaceList.add(weightval);
                    replaceList.add(weightval);
                    String[] searchStrArray = (String[])searchList.stream().toArray(String[]::new);
                    String[] replaceStringArray = (String[])replaceList.stream().toArray(String[]::new);
                    thresholdFormula = StringUtils.replaceEach((String)thresholdFormula, (String[])searchStrArray, (String[])replaceStringArray);
                    thresholdFormula = thresholdFormula.replaceAll(",noData", "");
                    thresholdFormula = thresholdFormula.replaceAll("noData", "");
                    BigDecimal result = null;
                    try {
                        result = new BigDecimal(formulaUtil.applyExpression(thresholdFormula));
                    }
                    catch (Exception ex) {
                        result = new BigDecimal(0);
                        ex.printStackTrace();
                        this.log.error("Exception while processing custom performance", ex);
                    }
                    if (customPerformance.isWeightEnbled()) {
                        String weight = Objects.nonNull(scoreCardDTO.getScoreCardValue().get("weight")) && StringUtils.isNotEmpty((CharSequence)scoreCardDTO.getScoreCardValue().get("weight").toString()) ? scoreCardDTO.getScoreCardValue().get("weight").toString() : "0";
                        result = result.multiply(new BigDecimal(weight));
                    }
                    scoreCardDTO.getScoreCardValue().put("thresholdResult", result);
                    return this.applyThreshold(result, threshold1, threshold2, threshold3, threshold4, threshold5);
                }
                catch (Exception e) {
                    e.printStackTrace();
                    return this.getScoreCardStatusLight(scoreCardDTO.getObjectiveList());
                }
            }
            return this.getScoreCardStatusLight(scoreCardDTO.getObjectiveList());
        }
        return this.getScoreCardStatusLight(scoreCardDTO.getObjectiveList());
    }

    private String getThresholdValue(Map<String, Object> mapObject, boolean isKpi) {
        if (isKpi) {
            if (Objects.nonNull(mapObject)) {
                String temp = Objects.nonNull(mapObject.get("actual")) ? mapObject.get("actual").toString().replaceAll("%", "") : "0";
                String result = Objects.nonNull(mapObject.get("thresholdResult")) && StringUtils.isNotEmpty((CharSequence)mapObject.get("thresholdResult").toString()) ? mapObject.get("thresholdResult").toString().replaceAll("%", "") : temp;
                return result.contains("M") ? result.replaceAll("M", "") : result;
            }
            return "0";
        }
        String result = Objects.nonNull(mapObject.get("thresholdResult")) && StringUtils.isNotEmpty((CharSequence)mapObject.get("thresholdResult").toString()) ? mapObject.get("thresholdResult").toString().replaceAll("%", "") : "0";
        return result.contains("M") ? result.replaceAll("M", "") : result;
    }

    public String applyThreshold(BigDecimal finalResult, BigDecimal updatedThreshold1, BigDecimal updatedThreshold2, BigDecimal updatedThreshol3, BigDecimal updatedThreshol4, BigDecimal updatedThreshol5) {
        if (updatedThreshol4 != null) {
            if (this.kpiUtil.lessthan(finalResult, updatedThreshold1)) {
                return "red fas fa-flag";
            }
            if (this.kpiUtil.between(finalResult, updatedThreshold1, updatedThreshold2)) {
                return "red fas fa-flag";
            }
            if (this.kpiUtil.between(finalResult, updatedThreshold2, updatedThreshol3)) {
                return "lightred fas fa-flag";
            }
            if (this.kpiUtil.between(finalResult, updatedThreshol3, updatedThreshol4)) {
                return "yellow fas fa-flag";
            }
            if (this.kpiUtil.between(finalResult, updatedThreshol4, updatedThreshol5)) {
                return "lightgreen fas fa-flag";
            }
            if (finalResult.compareTo(updatedThreshol5) >= 0) {
                return "green fas fa-flag";
            }
            return "red fas fa-flag";
        }
        if (this.kpiUtil.lessthan(finalResult, updatedThreshold2)) {
            return "red fas fa-flag";
        }
        if (this.kpiUtil.between(finalResult, updatedThreshold2, updatedThreshol3)) {
            return "yellow fas fa-flag";
        }
        if (finalResult.compareTo(updatedThreshol3) >= 0) {
            return "green fas fa-flag";
        }
        return "red fas fa-flag";
    }

    public String applyOverallThreshold(BigDecimal finalResult, BigDecimal updatedThreshold1, BigDecimal updatedThreshold2, BigDecimal updatedThreshol3, BigDecimal updatedThreshold4, BigDecimal updatedThreshold5) {
        if (updatedThreshold4 != null) {
            if (this.kpiUtil.lessthan(finalResult, updatedThreshold2)) {
                return "red fas fa-flag";
            }
            if (this.kpiUtil.between(finalResult, updatedThreshold2, updatedThreshol3)) {
                return "lightred fas fa-flag";
            }
            if (this.kpiUtil.between(finalResult, updatedThreshol3, updatedThreshold4)) {
                return "yellow fas fa-flag";
            }
            if (this.kpiUtil.between(finalResult, updatedThreshold4, updatedThreshold5)) {
                return "lightgreen fas fa-flag";
            }
            if (finalResult.compareTo(updatedThreshold5) >= 0) {
                return "green fas fa-flag";
            }
            return "red fas fa-flag";
        }
        if (this.kpiUtil.lessthan(finalResult, updatedThreshold1)) {
            return "red fas fa-flag";
        }
        if (this.kpiUtil.between(finalResult, updatedThreshold2, updatedThreshol3)) {
            return "yellow fas fa-flag";
        }
        if (finalResult.compareTo(updatedThreshol3) >= 0) {
            return "green fas fa-flag";
        }
        return "red fas fa-flag";
    }

    public Map<String, ScoreCardDTO> calculateStatusLight(List<ScoreCardDTO> scoreCardList, String dateRange, String empId, Long departmentId) {
        if (departmentId != null && departmentId > 0L) {
            for (ScoreCardDTO sc : scoreCardList) {
                if (sc.getObjectiveList() == null) continue;
                for (ObjectivesDTO obj : sc.getObjectiveList()) {
                    if (obj.getKpiList() == null) continue;
                    for (KPIDTO kpi : obj.getKpiList()) {
                        kpi.setDepartmentId(departmentId.longValue());
                    }
                }
            }
        }
        this.kpiUtil.prefetchKPIStatusLightData(scoreCardList, empId);
        HashMap<String, ScoreCardDTO> scoreCardMap = new HashMap<String, ScoreCardDTO>();
        for (ScoreCardDTO scoreCardDTO : scoreCardList) {
            HashMap<String, KPIDTO> kpiMap = new HashMap<String, KPIDTO>();
            HashMap<String, ObjectivesDTO> objectiveMap = new HashMap<String, ObjectivesDTO>();
            if (CollectionUtils.isNotEmpty((Collection)scoreCardDTO.getObjectiveList())) {
                for (ObjectivesDTO objectivesDTO : scoreCardDTO.getObjectiveList()) {
                    objectiveMap.put(objectivesDTO.getObjectiveId(), objectivesDTO);
                    if (!CollectionUtils.isNotEmpty((Collection)objectivesDTO.getKpiList())) continue;
                    for (KPIDTO kpidto : objectivesDTO.getKpiList()) {
                        kpidto.setDepartmentId(departmentId.longValue());
                        if (kpidto.getSubKpiList() != null) {
                            for (SubKPIDTO subkpidto : kpidto.getSubKpiList()) {
                                this.kpiUtil.buildStatusLight(null, subkpidto, empId, "subkpi");
                                String status = Objects.nonNull(subkpidto.getSubKpiValue().get("status")) ? subkpidto.getSubKpiValue().get("status").toString() : "";
                                boolean firstStatus = status.equalsIgnoreCase("First");
                                boolean weighted = status.equalsIgnoreCase("Weighted");
                                if (!firstStatus && !weighted) {
                                    this.logger.info("466 check buildKpidatafeed(subkpi) api  start timing: {} ", (Object)LocalDateTime.now());
                                    Map subMap = this.kpiUtil.buildKPIDataFeed(null, subkpidto, "subkpi", empId, null);
                                    this.logger.info("469 check buildKpidatafeed(subkpi) end timing: {} ", (Object)LocalDateTime.now());
                                    boolean etlPercentageCheck = Objects.nonNull(subMap.get("dataType")) && "Percentage".equalsIgnoreCase(subMap.get("dataType").toString());
                                    BigDecimal actual = Objects.nonNull(subMap.get("actual")) ? new BigDecimal(subMap.get("actual").toString()) : new BigDecimal(0);
                                    subkpidto.getSubKpiValue().put("actual", etlPercentageCheck ? String.join((CharSequence)"", this.kpiUtil.formatdecimal(actual), "%") : this.kpiUtil.convertResult(actual, subMap));
                                    if (Objects.nonNull(subMap.get("target")) && StringUtils.isNotEmpty((CharSequence)subMap.get("target").toString())) {
                                        BigDecimal target = new BigDecimal(subMap.get("target").toString());
                                        subkpidto.getSubKpiValue().put("target", etlPercentageCheck ? String.join((CharSequence)"", this.kpiUtil.formatdecimal(target), "%") : this.kpiUtil.convertResult(target, subMap));
                                    } else {
                                        boolean checkFlag;
                                        boolean percentageCheck = Objects.nonNull(subkpidto.getSubKpiValue().get("target")) ? subkpidto.getSubKpiValue().get("target").toString().contains("%") : false;
                                        BigDecimal target = null;
                                        Object targetObj = subkpidto.getSubKpiValue().get("target");
                                        if (percentageCheck) {
                                            checkFlag = Objects.nonNull(targetObj) && StringUtils.isNotEmpty((CharSequence)targetObj.toString().substring(0, "%".length()));
                                            target = checkFlag ? new BigDecimal(targetObj.toString()) : new BigDecimal(0);
                                        } else {
                                            checkFlag = Objects.nonNull(targetObj) && StringUtils.isNotEmpty((CharSequence)targetObj.toString());
                                            BigDecimal bigDecimal = target = checkFlag ? new BigDecimal(targetObj.toString()) : new BigDecimal(0);
                                        }
                                        if (!percentageCheck) {
                                            subkpidto.getSubKpiValue().put("target", this.kpiUtil.convertResult(target, subkpidto.getSubKpiValue()));
                                        } else {
                                            subkpidto.getSubKpiValue().put("target", String.join((CharSequence)"", this.kpiUtil.formatdecimal(target), "%"));
                                        }
                                    }
                                }
                                String ytd = this.kpiUtil.retrieveYTD(null, subkpidto, "subkpi", empId);
                                subkpidto.getSubKpiValue().put("ytdvalue", ytd);
                            }
                        }
                        kpiMap.put(kpidto.getKpiId(), kpidto);
                        this.logger.info("520 check builtstatuslight  start timing: {} ", (Object)LocalDateTime.now());
                        this.kpiUtil.buildStatusLight(kpidto, null, empId, "");
                        this.logger.info("522 check builtstatuslight end timing: {} ", (Object)LocalDateTime.now());
                        String status = Objects.nonNull(kpidto.getKpiValue().get("status")) ? kpidto.getKpiValue().get("status").toString() : "";
                        boolean firstStatus = status.equalsIgnoreCase("First");
                        boolean weighted = status.equalsIgnoreCase("Weighted");
                        if (!firstStatus && !weighted) {
                            this.logger.info("529 check buildKpidatafeed(kpi)  start timing: {} ", (Object)LocalDateTime.now());
                            Map subMap = this.kpiUtil.buildKPIDataFeed(kpidto, null, "kpi", empId, null);
                            this.logger.info("531 check buildKpidatafeed(kpi) end timing: {} ", (Object)LocalDateTime.now());
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
                                    target = checkFlag ? new BigDecimal(targetObj.toString()) : new BigDecimal(0);
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
                        String ytd = this.kpiUtil.retrieveYTD(kpidto, null, "kpi", empId);
                        kpidto.getKpiValue().put("ytdvalue", ytd);
                    }
                    this.logger.info("573 check kpi custompaerformavelight  start timing: {} ", (Object)LocalDateTime.now());
                    String objStatusLight = this.customPerformanceStatusLight(objectivesDTO, kpiMap, dateRange);
                    this.logger.info("575 check kpi custompaerformancelight end timing: {} ", (Object)LocalDateTime.now());
                    objectivesDTO.getObjectivesValue().put("statusLight", objStatusLight);
                    objectivesDTO.getObjectivesValue().put("statusLightFlag", this.kpiUtil.updateStatusCustomColorObjective(objStatusLight));
                }
                this.logger.info("581 check custompaerformavelight  start timing: {} ", (Object)LocalDateTime.now());
                String scoreCardStatusLight = this.customPerformanceStatusLight(scoreCardDTO, kpiMap, objectiveMap, dateRange);
                this.logger.info("583 check custompaerformancelight end timing: {} ", (Object)LocalDateTime.now());
                scoreCardDTO.getScoreCardValue().put("statusLight", this.kpiUtil.getStatusKeyMap().get(scoreCardStatusLight));
                scoreCardDTO.getScoreCardValue().put("statusLightFlagvalue", scoreCardStatusLight);
                String statusflag = (String)this.kpiUtil.getStatusKeyMap().get(scoreCardStatusLight);
                scoreCardDTO.getScoreCardValue().put("statusLightFlag", this.kpiUtil.updateStatusCustomColorScorecard(statusflag));
            }
            scoreCardMap.put(scoreCardDTO.getScoreCardValue().get("name").toString(), scoreCardDTO);
        }
        return scoreCardMap;
    }

    private BigDecimal getBigDecimal(Object obj) {
        try {
            return obj != null ? new BigDecimal(obj.toString()) : BigDecimal.ZERO;
        }
        catch (Exception e) {
            return BigDecimal.ZERO;
        }
    }

    public String customPerformanceStatusLight(ObjectivesDTO objectivesDTO, Map<String, KPIDTO> kpiMap, String dateRange) {
        CustomPerformance customPerformance = this.kpiService.findCustomPerformanceByOrgId();
        if (customPerformance != null && customPerformance.isCustomPerformance() && customPerformance.isCustomObjective()) {
            BigDecimal threshold1 = new BigDecimal(customPerformance.getThreshold1());
            BigDecimal threshold2 = new BigDecimal(customPerformance.getThreshold2());
            BigDecimal threshold3 = new BigDecimal(customPerformance.getThreshold3());
            BigDecimal threshold4 = new BigDecimal(customPerformance.getThreshold4());
            BigDecimal threshold5 = new BigDecimal(customPerformance.getThreshold5());
            String[] dataRanges = null;
            String startDate = null;
            String endDate = null;
            Date firstDate = null;
            Date secondDate = null;
            if (Objects.nonNull(dateRange)) {
                String[] stringArray = dataRanges = dateRange.contains("-") ? dateRange.split("-") : dateRange.split(",");
            }
            if (dataRanges != null && dataRanges.length > 1) {
                SimpleDateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy");
                try {
                    startDate = dataRanges[0].trim();
                    endDate = dataRanges[1].trim();
                    firstDate = dateFormat.parse(dataRanges[0].trim());
                    secondDate = dateFormat.parse(dataRanges[1].trim());
                }
                catch (ParseException e) {
                    throw new RuntimeException(e);
                }
            }
            if (objectivesDTO.getObjectivesValue().get("thresholdFormula") != null && StringUtils.isNotEmpty((CharSequence)objectivesDTO.getObjectivesValue().get("thresholdFormula").toString())) {
                String thresholdFormula;
                FormulaUtil formulaUtil = new FormulaUtil();
                String exactThresholdFormula = thresholdFormula = objectivesDTO.getObjectivesValue().get("thresholdFormula").toString();
                Matcher periodPattern = Pattern.compile("\\[(.*?)\\]").matcher(thresholdFormula);
                LinkedHashSet<Object> searchList = new LinkedHashSet<Object>();
                while (periodPattern.find()) {
                    if (searchList.contains(periodPattern.group(1))) continue;
                    String nodeKey = periodPattern.group(1);
                    Object checkKey = nodeKey.replaceAll("\\(", "");
                    checkKey = ((String)checkKey).replaceAll("\\)", "");
                    thresholdFormula = thresholdFormula.replace(nodeKey, (CharSequence)checkKey);
                    if (((String)checkKey).contains(",")) {
                        searchList.addAll(Arrays.asList(((String)checkKey).split("\\,")));
                        continue;
                    }
                    searchList.add(checkKey);
                }
                ArrayList<String> replaceList = new ArrayList<String>();
                for (String string : (java.util.List<String>)(java.util.List)searchList) {
                    if (kpiMap.containsKey(string)) {
                        if (secondDate != null && firstDate != null && kpiMap.get(string).getStartDate().compareTo(secondDate) > 0 && kpiMap.get(string).getEndDate().compareTo(firstDate) < 0) {
                            replaceList.add("noData");
                            continue;
                        }
                        if (!this.validatekpieligibility(kpiMap.get(string), startDate, endDate)) {
                            replaceList.add("noData");
                            continue;
                        }
                        replaceList.add(this.getThresholdValue(kpiMap.get(string).getKpiValue(), true));
                        continue;
                    }
                    replaceList.add("noData");
                }
                String weightval = "0";
                if (Objects.nonNull(objectivesDTO.getObjectivesValue().get("weight")) && StringUtils.isNotEmpty((CharSequence)objectivesDTO.getObjectivesValue().get("weight").toString())) {
                    double d = Double.parseDouble(objectivesDTO.getObjectivesValue().get("weight").toString()) / 100.0;
                    weightval = String.valueOf(d);
                }
                searchList.add("[");
                searchList.add("]");
                searchList.add("Weight");
                searchList.add("weight");
                searchList.add("WEIGHT");
                replaceList.add("(");
                replaceList.add(")");
                replaceList.add(weightval);
                replaceList.add(weightval);
                replaceList.add(weightval);
                String[] stringArray = (String[])searchList.stream().toArray(String[]::new);
                String[] replaceStringArray = (String[])replaceList.stream().toArray(String[]::new);
                thresholdFormula = StringUtils.replaceEach((String)thresholdFormula, (String[])stringArray, (String[])replaceStringArray);
                thresholdFormula = thresholdFormula.replaceAll(",noData", "");
                thresholdFormula = thresholdFormula.replaceAll("noData", "");
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
                objectivesDTO.getObjectivesValue().put("exactThresholdFormula", exactThresholdFormula);
                return this.applyThreshold(result, threshold1, threshold2, threshold3, threshold4, threshold5);
            }
            return this.getObjectiveStatusLight(objectivesDTO.getKpiList());
        }
        return this.getObjectiveStatusLight(objectivesDTO.getKpiList());
    }

    private boolean validatekpieligibility(KPIDTO kpidto, String firstDate, String secondDate) {
        if (Objects.nonNull(firstDate) || Objects.nonNull(secondDate)) {
            return true;
        }
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM/dd/yyyy", Locale.ENGLISH);
        DateTimeFormatter formatter_validate = DateTimeFormatter.ofPattern("MMM-yyyy", Locale.ENGLISH);
        YearMonth startDate = YearMonth.parse(firstDate, formatter);
        YearMonth endDate = YearMonth.parse(secondDate, formatter);
        YearMonth ym = YearMonth.now();
        if (kpidto.getKpiValue().get("kpi_measurement").toString().toLowerCase().contains("quarter")) {
            while (startDate.isBefore(endDate) && startDate.isBefore(ym)) {
                if (startDate.format(formatter_validate).contains("Mar") || startDate.format(formatter_validate).contains("Jun") || startDate.format(formatter_validate).contains("Sep") || startDate.format(formatter_validate).contains("Dec")) {
                    return true;
                }
                startDate = startDate.plusMonths(1L);
            }
        } else if (kpidto.getKpiValue().get("kpi_measurement").toString().toLowerCase().contains("half")) {
            while (startDate.isBefore(endDate) && startDate.isBefore(ym)) {
                if (startDate.format(formatter_validate).contains("Jun") || startDate.format(formatter_validate).contains("Dec")) {
                    return true;
                }
                startDate = startDate.plusMonths(1L);
            }
        } else if (kpidto.getKpiValue().get("kpi_measurement").toString().toLowerCase().contains("annual")) {
            if (startDate.format(formatter_validate).contains("Dec")) {
                return true;
            }
            startDate = startDate.plusMonths(1L);
        } else {
            return true;
        }
        return false;
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
            return StringUtils.isNotEmpty((CharSequence)statusLight) ? statusLight : "red fas fa-flag";
        }
        java.util.function.Predicate<java.util.Map.Entry> maxWeightPredicate = e -> (Double)e.getValue() >= 100.0;
        String maxWeightStatus = ((java.util.Map<String,Double>)statusMap).entrySet().stream().filter(e -> maxWeightPredicate.test(e)).map(e -> e.getKey()).findFirst().orElse("");
        if (StringUtils.isNotEmpty((CharSequence)maxWeightStatus)) {
            return maxWeightStatus;
        }
        java.util.function.Predicate<java.util.Map.Entry> statusPredicate = e -> ((String)e.getKey()).contains("red") && (Double)e.getValue() >= 50.0;
        String statusLight = ((java.util.Map<String,Double>)statusMap).entrySet().stream().filter(e -> statusPredicate.test(e)).map(e -> e.getKey()).findFirst().orElse("");
        return StringUtils.isNotEmpty((CharSequence)statusLight) ? statusLight : "red fas fa-flag";
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
            return StringUtils.isNotEmpty((CharSequence)statusLight) ? statusLight : "red fas fa-flag";
        }
        java.util.function.Predicate<java.util.Map.Entry> maxWeightPredicate = e -> (Double)e.getValue() >= 100.0;
        String maxWeightStatus = ((java.util.Map<String,Double>)statusMap).entrySet().stream().filter(e -> maxWeightPredicate.test(e)).map(e -> e.getKey()).findFirst().orElse("");
        if (StringUtils.isNotEmpty((CharSequence)maxWeightStatus)) {
            return maxWeightStatus;
        }
        java.util.function.Predicate<java.util.Map.Entry> statusPredicate = e -> ((String)e.getKey()).contains("red") && (Double)e.getValue() >= 50.0;
        String statusLight = ((java.util.Map<String,Double>)statusMap).entrySet().stream().filter(e -> statusPredicate.test(e)).map(e -> e.getKey()).findFirst().orElse("");
        return StringUtils.isNotEmpty((CharSequence)statusLight) ? statusLight : "red fas fa-flag";
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
        java.util.function.Predicate<java.util.Map.Entry> maxWeightPredicate = e -> (Double)e.getValue() >= 100.0;
        String maxWeightStatus = ((java.util.Map<String,Double>)statusMap).entrySet().stream().filter(e -> maxWeightPredicate.test(e)).map(e -> e.getKey()).findFirst().orElse("");
        if (StringUtils.isNotEmpty((CharSequence)maxWeightStatus)) {
            return maxWeightStatus;
        }
        java.util.function.Predicate<java.util.Map.Entry> statusPredicate = e -> ((String)e.getKey()).contains("red") && (Double)e.getValue() >= 50.0;
        String statusLight = ((java.util.Map<String,Double>)statusMap).entrySet().stream().filter(e -> statusPredicate.test(e)).map(e -> e.getKey()).findFirst().orElse("");
        return StringUtils.isNotEmpty((CharSequence)statusLight) ? (String)this.kpiUtil.getStatusKeyMap().get(statusLight) : (String)this.kpiUtil.getStatusKeyMap().get("red fas fa-flag");
    }

    public void populateOverallStatusLight(ScoreCardResponseDTO responseDTO, List<ScoreCardDTO> scoreCardDTOList, Map<String, ScoreCardDTO> scoreCardMap) {
        CustomPerformance customPerformance = this.kpiService.findCustomPerformanceByOrgId();
        String overAllStatusLight = null;
        if (customPerformance != null && customPerformance.isCustomPerformance()) {
            BigDecimal threshold1 = new BigDecimal(customPerformance.getThreshold1());
            BigDecimal threshold2 = new BigDecimal(customPerformance.getThreshold2());
            BigDecimal threshold3 = new BigDecimal(customPerformance.getThreshold3());
            BigDecimal threshold4 = null;
            BigDecimal threshold5 = null;
            if (customPerformance.getThreshold4() != null) {
                threshold4 = new BigDecimal(customPerformance.getThreshold4());
            }
            if (customPerformance.getThreshold5() != null) {
                threshold5 = new BigDecimal(customPerformance.getThreshold5());
            }
            if (StringUtils.isNotEmpty((CharSequence)this.getScoreCardDetailsFormula(responseDTO.getCardDetailsDTO()))) {
                BigDecimal result;
                FormulaUtil formulaUtil = new FormulaUtil();
                String thresholdFormula = this.getScoreCardDetailsFormula(responseDTO.getCardDetailsDTO());
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
                ArrayList<String> replaceList = new ArrayList<String>();
                for (String val : searchList) {
                    if (val == null) continue;
                    if (scoreCardMap.containsKey(val)) {
                        String test = this.getThresholdValue(scoreCardMap.get(val).getScoreCardValue(), false);
                        replaceList.add(test);
                        continue;
                    }
                    replaceList.add("noData");
                }
                String weightval = "0";
                if (Objects.nonNull(this.getScoreCardWeight(scoreCardDTOList)) && StringUtils.isNotEmpty((CharSequence)this.getScoreCardWeight(scoreCardDTOList))) {
                    weightval = this.getScoreCardWeight(scoreCardDTOList);
                }
                searchList.add("[");
                searchList.add("]");
                searchList.add("Weight");
                searchList.add("weight");
                searchList.add("WEIGHT");
                replaceList.add("(");
                replaceList.add(")");
                replaceList.add(weightval);
                replaceList.add(weightval);
                replaceList.add(weightval);
                String[] searchStrArray = (String[])searchList.stream().toArray(String[]::new);
                String[] replaceStringArray = (String[])replaceList.stream().toArray(String[]::new);
                if (StringUtils.isNotEmpty((CharSequence)thresholdFormula)) {
                    thresholdFormula = StringUtils.replaceEach((String)thresholdFormula, (String[])searchStrArray, (String[])replaceStringArray);
                    thresholdFormula = thresholdFormula.replaceAll(",noData", "");
                    thresholdFormula = thresholdFormula.replaceAll("noData", "");
                    result = new BigDecimal(formulaUtil.applyExpression(thresholdFormula));
                    String scoreCardWeight = this.getScoreCardWeight(scoreCardDTOList);
                    if (customPerformance.isWeightEnbled()) {
                        result = result.multiply(new BigDecimal(scoreCardWeight));
                    }
                    responseDTO.setThresholdResult(result.toPlainString());
                } else {
                    result = new BigDecimal(0);
                }
                overAllStatusLight = this.applyOverallThreshold(result, threshold1, threshold2, threshold3, threshold4, threshold5);
            } else {
                overAllStatusLight = this.getOverallStatusLight(scoreCardDTOList);
            }
        } else {
            overAllStatusLight = this.getOverallStatusLight(scoreCardDTOList);
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

    public String getScoreCardDetailsFormula(ScoreCardDetailsDTO cardDetailsDTO) {
        if (cardDetailsDTO != null) {
            return Objects.nonNull(cardDetailsDTO.getScoreCardDetailsValue().get("scorecardFormula")) ? cardDetailsDTO.getScoreCardDetailsValue().get("scorecardFormula").toString() : "";
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

    public String getKpistatuslight(List<KPIDTO> kpiList) {
        boolean oneKey;
        Function<KPIDTO, String> kpiFunction = kpi -> kpi.getKpiValue().get("statusLight").toString();
        Function<KPIDTO, Double> weightFunction = kpi -> Double.valueOf(kpi.getKpiValue().get("weight").toString());
        Map<String, Double> statusMap = kpiList.stream().filter(kpi -> Objects.nonNull(kpi.getKpiValue().get("statusLight"))).map(kpi -> {
            if (Objects.isNull(kpi.getKpiValue().get("weight")) || StringUtils.isEmpty((CharSequence)kpi.getKpiValue().get("weight").toString())) {
                kpi.getKpiValue().put("weight", "0");
            }
            return kpi;
        }).collect(Collectors.groupingBy(kpi -> (String)kpiFunction.apply((KPIDTO)kpi), Collectors.averagingDouble(kpi -> (Double)weightFunction.apply((KPIDTO)kpi))));
        boolean bl = oneKey = statusMap.keySet().size() == 1;
        if (oneKey) {
            String statusLight = (String)statusMap.keySet().stream().findFirst().get();
            return StringUtils.isNotEmpty((CharSequence)statusLight) ? statusLight : "red fas fa-flag";
        }
        java.util.function.Predicate<java.util.Map.Entry> statusPredicate = e -> ((String)e.getKey()).contains("red") && (Double)e.getValue() >= 50.0;
        String statusLight = ((java.util.Map<String,Double>)statusMap).entrySet().stream().filter(e -> statusPredicate.test(e)).map(e -> e.getKey()).findFirst().orElse("");
        return StringUtils.isNotEmpty((CharSequence)statusLight) ? (String)this.kpiUtil.getStatusKeyMap().get(statusLight) : (String)this.kpiUtil.getStatusKeyMap().get("red fas fa-flag");
    }

    public Map<String, ScoreCardDTO> calculateStatusLightForScore(List<ScoreCardDTO> scoreCardList, String dateRange, String empId) {
        this.kpiUtil.prefetchKPIStatusLightData(scoreCardList, empId);
        HashMap<String, ScoreCardDTO> scoreCardMap = new HashMap<String, ScoreCardDTO>();
        for (ScoreCardDTO scoreCardDTO : scoreCardList) {
            HashMap<String, KPIDTO> kpiMap = new HashMap<String, KPIDTO>();
            HashMap<String, ObjectivesDTO> objectiveMap = new HashMap<String, ObjectivesDTO>();
            if (CollectionUtils.isNotEmpty((Collection)scoreCardDTO.getObjectiveList())) {
                for (ObjectivesDTO objectivesDTO : scoreCardDTO.getObjectiveList()) {
                    objectiveMap.put(objectivesDTO.getObjectiveId(), objectivesDTO);
                    if (!CollectionUtils.isNotEmpty((Collection)objectivesDTO.getKpiList())) continue;
                    for (KPIDTO kpidto : objectivesDTO.getKpiList()) {
                        this.kpiUtil.buildStatusLight(kpidto, null, empId, "");
                        String status = Objects.nonNull(kpidto.getKpiValue().get("status")) ? kpidto.getKpiValue().get("status").toString() : "";
                        boolean firstStatus = status.equalsIgnoreCase("First");
                        boolean weighted = status.equalsIgnoreCase("Weighted");
                        if (!firstStatus && !weighted) {
                            Map subMap = this.kpiUtil.buildKPIDataFeed(kpidto, null, "kpi", empId, null);
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
                                    target = checkFlag ? new BigDecimal(targetObj.toString()) : new BigDecimal(0);
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
                        kpiMap.put(kpidto.getKpiId(), kpidto);
                        String ytd = this.kpiUtil.retrieveYTD(kpidto, null, "kpi", empId);
                        kpidto.getKpiValue().put("ytdvalue", ytd);
                    }
                    String objStatusLight = this.customPerformanceStatusLight(objectivesDTO, kpiMap, dateRange);
                    objectivesDTO.getObjectivesValue().put("statusLight", objStatusLight);
                    objectivesDTO.getObjectivesValue().put("statusLightFlag", this.kpiUtil.updateStatusCustomColorObjective(objStatusLight));
                }
                String scoreCardStatusLight = this.customPerformanceStatusLight(scoreCardDTO, kpiMap, objectiveMap, dateRange);
                scoreCardDTO.getScoreCardValue().put("statusLight", this.kpiUtil.getStatusKeyMap().get(scoreCardStatusLight));
                String statusflag = (String)this.kpiUtil.getStatusKeyMap().get(scoreCardStatusLight);
                scoreCardDTO.getScoreCardValue().put("statusLightFlag", this.kpiUtil.updateStatusCustomColorScorecard(statusflag));
            }
            scoreCardMap.put(scoreCardDTO.getScoreCardValue().get("name").toString(), scoreCardDTO);
        }
        return scoreCardMap;
    }
}

