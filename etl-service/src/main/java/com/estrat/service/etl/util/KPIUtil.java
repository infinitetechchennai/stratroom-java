/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.etl.dto.CustomPerformance
 *  com.estrat.service.etl.dto.FormulaBuilder
 *  com.estrat.service.etl.dto.InitiativesDTO
 *  com.estrat.service.etl.dto.KPICriteria
 *  com.estrat.service.etl.dto.KPIDTO
 *  com.estrat.service.etl.dto.KPIFormula
 *  com.estrat.service.etl.dto.KpiStatusNotification
 *  com.estrat.service.etl.dto.RiskDTO
 *  com.estrat.service.etl.service.InitiativeService
 *  com.estrat.service.etl.service.KPIService
 *  com.estrat.service.etl.service.RiskDetailsService
 *  com.estrat.service.etl.service.ScoreCardService
 *  com.estrat.service.etl.util.DateUtil
 *  com.estrat.service.etl.util.FormulaUtil
 *  com.estrat.service.etl.util.KPIThreadLocal
 *  com.estrat.service.etl.util.KPIUtil
 *  com.estrat.service.etl.util.NotificationUtil
 *  com.estrat.service.etl.util.UserThreadLocal
 *  org.apache.commons.collections4.CollectionUtils
 *  org.apache.commons.lang3.StringUtils
 *  org.apache.log4j.Logger
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.scheduling.annotation.Async
 *  org.springframework.stereotype.Component
 */
package com.estrat.service.etl.util;

import com.estrat.service.etl.dto.CustomPerformance;
import com.estrat.service.etl.dto.FormulaBuilder;
import com.estrat.service.etl.dto.InitiativesDTO;
import com.estrat.service.etl.dto.KPICriteria;
import com.estrat.service.etl.dto.KPIDTO;
import com.estrat.service.etl.dto.KPIFormula;
import com.estrat.service.etl.dto.KpiStatusNotification;
import com.estrat.service.etl.dto.RiskDTO;
import com.estrat.service.etl.service.InitiativeService;
import com.estrat.service.etl.service.KPIService;
import com.estrat.service.etl.service.RiskDetailsService;
import com.estrat.service.etl.service.ScoreCardService;
import com.estrat.service.etl.util.DateUtil;
import com.estrat.service.etl.util.FormulaUtil;
import com.estrat.service.etl.util.KPIThreadLocal;
import com.estrat.service.etl.util.NotificationUtil;
import com.estrat.service.etl.util.UserThreadLocal;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.function.BiFunction;
import java.util.function.BiPredicate;
import java.util.function.Predicate;
import java.util.stream.Collectors;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

@Component
public class KPIUtil {
    @Autowired
    private KPIService kpiService;
    @Autowired
    private DateUtil dateUtil;
    @Autowired
    private ScoreCardService scoreCardService;
    @Autowired
    private NotificationUtil notificationUtil;
    @Autowired
    private InitiativeService initiativeService;
    @Autowired
    private RiskDetailsService riskDetailsService;
    private static String quarterFrequency = "quarter,quarterly";
    private static String halfYearFrequency = "halfyear,half year,half yearly,halfyearly";
    private Logger logger = LoggerFactory.getLogger(KPIUtil.class);
    private Predicate<String> validateDataKey = dataKey -> !StringUtils.isEmpty((CharSequence)dataKey) && !"Not Available".equalsIgnoreCase((String)dataKey);
    private Map<String, String> statusLightKeyMap = new HashMap();
    BiPredicate<String, String> freqFunction = (frequency, validateFreq) -> StringUtils.isNotEmpty((CharSequence)frequency) && Arrays.asList(validateFreq.split(",")).contains(frequency.toLowerCase());
    BiFunction<BigDecimal, BigDecimal, BigDecimal> targetFunction = (actual, updatedTarget) -> updatedTarget.intValue() != 0 ? actual.divide((BigDecimal)updatedTarget, 2, RoundingMode.HALF_EVEN).multiply(new BigDecimal(100)) : actual;

    public Map<String, String> getStatusKeyMap() {
        this.statusLightKeyMap.put("green fas fa-flag", "GREEN");
        this.statusLightKeyMap.put("yellow fas fa-flag", "YELLOW");
        this.statusLightKeyMap.put("red fas fa-flag", "RED");
        return this.statusLightKeyMap;
    }

    @Async
    public void sendKPIDataNotifications(String orgId) {
        if (this.dateUtil.isTodayEligibleForDataNotification()) {
            this.logger.debug("Notification batch started");
            HashMap commonHeaders = new HashMap();
            commonHeaders.put("USER_ORG_ID", orgId);
            UserThreadLocal.set(commonHeaders);
            this.dateUtil.populateCalendarYear();
            Map<String, List<Object>> periodMap = new HashMap<>();
            periodMap.put("Quarterly", this.dateUtil.findPeriodFromCurrentDate("Quarterly"));
            periodMap.put("HalfYearly", this.dateUtil.findPeriodFromCurrentDate("HalfYearly"));
            periodMap.put("Monthly", this.dateUtil.findPeriodFromCurrentDate("Monthly"));
            periodMap.put("Yearly", this.dateUtil.findPeriodFromCurrentDate("Yearly"));
            List kpiList = this.kpiService.retrieveKpiList(orgId);
            HashMap messageMap = new HashMap();
            messageMap.put("Quarterly", "The quarterly data for %s is due for update");
            messageMap.put("HalfYearly", "The half yearly data for %s is due for update");
            messageMap.put("Monthly", "The monthly data for %s is due for update");
            messageMap.put("Yearly", "The annual data for %s is due for update\u201d");
            if (CollectionUtils.isNotEmpty((Collection)kpiList)) {
                kpiList.forEach(kpi -> this.findEligibleKPI((com.estrat.service.etl.dto.KPIDTO)kpi, periodMap, messageMap));
            }
            UserThreadLocal.set(null);
            KPIThreadLocal.set(null);
            this.logger.debug("Notification batch ended");
        }
    }

    public void findEligibleKPI(KPIDTO kpidto, Map<String, List<Object>> periodMap, Map<String, String> messageMap) {
        if (Objects.nonNull(kpidto.getKpiFormula()) && StringUtils.isNotEmpty((CharSequence)kpidto.getKpiFormula().getFormula())) {
            String kpiFrequency = kpidto.getKpiValue().get("kpi_measurement").toString();
            String frequencyValue = this.getFrequency(kpiFrequency);
            List<Object> periodList = periodMap.get(frequencyValue);
            boolean shouldProcess = this.shouldProcessFrequency(kpiFrequency, LocalDate.now());
            if (shouldProcess) {
                String message = messageMap.get(frequencyValue);
                Set measureNameList = new FormulaUtil().getNodeKeyListFromFormula(kpidto.getKpiFormula().getFormula());
                List<String> nodeKeyList = (List<String>)measureNameList.stream().map(measureName -> this.kpiService.lookupNodeKey((String)measureName)).collect(Collectors.toList());
                this.logger.debug("nodeKeyList" + nodeKeyList);
                this.logger.debug("periodList" + periodList);
                if (CollectionUtils.isNotEmpty(nodeKeyList) && CollectionUtils.isNotEmpty(periodList)) {
                    KPICriteria kpiCriteria = new KPICriteria();
                    kpiCriteria.setRealDates(periodList);
                    kpiCriteria.setNodeKeyList(nodeKeyList);
                    kpiCriteria.setEmployeeIds(Arrays.asList(kpidto.getOwner()));
                    kpiCriteria.setRetrieveRowCount(true);
                    List<Map<String, Object>> kpiRowCount = this.kpiService.retrieveOrgKPIDetails(kpiCriteria);
                    if (CollectionUtils.isNotEmpty((Collection)kpiRowCount)) {
                        boolean flag = kpiRowCount.stream().filter(map -> Objects.nonNull(map.get("NODE_KEY"))).allMatch(map -> nodeKeyList.contains(map.get("NODE_KEY").toString()));
                        if (!flag) {
                            kpidto.getKpiValue().put("message", String.format(message, kpidto.getKpiId()));
                            this.notificationUtil.saveBatchNotification((Object)kpidto, "KPIDataReminder");
                        }
                    } else {
                        kpidto.getKpiValue().put("message", String.format(message, kpidto.getKpiId()));
                        this.notificationUtil.saveBatchNotification((Object)kpidto, "KPIDataReminder");
                    }
                }
            }
        }
    }

    public void findEligibleKPIMonthly(KPIDTO kpidto, Map<String, List<Object>> periodMap, String formattedDate) {
        if (Objects.nonNull(kpidto.getKpiFormula()) && StringUtils.isNotEmpty((CharSequence)kpidto.getKpiFormula().getFormula())) {
            String kpiFrequency = kpidto.getKpiValue().get("kpi_measurement").toString();
            String frequencyValue = this.getFrequency(kpiFrequency);
            List<Object> periodList = periodMap.get(frequencyValue);
            boolean shouldProcess = this.shouldProcessFrequency(kpiFrequency, LocalDate.now());
            if (shouldProcess) {
                Set measureNameList = new FormulaUtil().getNodeKeyListFromFormula(kpidto.getKpiFormula().getFormula());
                List<String> nodeKeyList = (List<String>)measureNameList.stream().map(measureName -> this.kpiService.lookupNodeKey((String)measureName)).collect(Collectors.toList());
                this.logger.debug("nodeKeyList" + nodeKeyList);
                this.logger.debug("periodList" + periodList);
                if (CollectionUtils.isNotEmpty(nodeKeyList) && CollectionUtils.isNotEmpty(periodList)) {
                    KPICriteria kpiCriteria = new KPICriteria();
                    kpiCriteria.setRealDates(periodList);
                    kpiCriteria.setNodeKeyList(nodeKeyList);
                    kpiCriteria.setEmployeeIds(Arrays.asList(kpidto.getOwner()));
                    kpiCriteria.setRetrieveRowCount(true);
                    List<Map<String, Object>> kpiRowCount = this.kpiService.retrieveOrgKPIDetails(kpiCriteria);
                    if (CollectionUtils.isNotEmpty((Collection)kpiRowCount)) {
                        boolean flag = kpiRowCount.stream().filter(map -> Objects.nonNull(map.get("NODE_KEY"))).allMatch(map -> nodeKeyList.contains(map.get("NODE_KEY").toString()));
                        if (!flag) {
                            KpiStatusNotification kpiStatusNotification = new KpiStatusNotification();
                            kpiStatusNotification.setActualValue(String.valueOf(kpidto.getKpiValue().getOrDefault("actual", "")));
                            kpiStatusNotification.setTargetValue(String.valueOf(kpidto.getKpiValue().getOrDefault("target", "")));
                            kpiStatusNotification.setKpiId(kpidto.getKpiId());
                            kpiStatusNotification.setKpiName(kpidto.getKpiName());
                            kpiStatusNotification.setMonthYear(formattedDate);
                            kpiStatusNotification.setOwner(Long.valueOf(kpidto.getOwner()));
                            kpiStatusNotification.setFrequency(kpidto.getKpiValue().get("kpi_measurement").toString());
                            kpiStatusNotification.setNotificationType(Integer.valueOf(2));
                            this.scoreCardService.sendnotification(kpiStatusNotification);
                        }
                    } else {
                        KpiStatusNotification kpiStatusNotification = new KpiStatusNotification();
                        kpiStatusNotification.setActualValue(String.valueOf(kpidto.getKpiValue().getOrDefault("actual", "")));
                        kpiStatusNotification.setTargetValue(String.valueOf(kpidto.getKpiValue().getOrDefault("target", "")));
                        kpiStatusNotification.setKpiId(kpidto.getKpiId());
                        kpiStatusNotification.setKpiName(kpidto.getKpiName());
                        kpiStatusNotification.setMonthYear(formattedDate);
                        kpiStatusNotification.setFrequency(kpidto.getKpiValue().get("kpi_measurement").toString());
                        kpiStatusNotification.setOwner(Long.valueOf(kpidto.getOwner()));
                        kpiStatusNotification.setNotificationType(Integer.valueOf(2));
                        this.scoreCardService.sendnotification(kpiStatusNotification);
                    }
                }
            }
        }
    }

    public String getFrequency(String kpiFrequency) {
        String finalFreqValue = null;
        finalFreqValue = this.freqFunction.test(kpiFrequency, quarterFrequency) ? "Quarterly" : (this.freqFunction.test(kpiFrequency, halfYearFrequency) ? "HalfYearly" : (kpiFrequency.equalsIgnoreCase("Monthly") ? "Monthly" : "Yearly"));
        return finalFreqValue;
    }

    public boolean shouldProcessFrequency(String kpiFrequency, LocalDate currentDate) {
        switch (kpiFrequency) {
            case "Monthly": {
                return true;
            }
            case "Quarterly": {
                return currentDate.getMonthValue() % 3 == 0;
            }
            case "HalfYearly": {
                return currentDate.getMonthValue() == 6 || currentDate.getMonthValue() == 12;
            }
            case "Yearly": {
                return currentDate.getMonthValue() == 12;
            }
        }
        return false;
    }

    public void buildStatusLight(KPIDTO kpidto) {
        try {
            KPICriteria kpiCriteria = new KPICriteria();
            String status = Objects.nonNull(kpidto.getKpiValue().get("status")) ? kpidto.getKpiValue().get("status").toString() : "";
            boolean firstStatus = status.equalsIgnoreCase("First");
            boolean second = status.equalsIgnoreCase("Second");
            boolean weighted = status.equalsIgnoreCase("Weighted");
            boolean third = status.equalsIgnoreCase("Third");
            boolean manual = status.equalsIgnoreCase("Manual");
            if (firstStatus) {
                this.buildKPIStatusLight(kpidto, kpiCriteria, null);
                this.buildStatusLightForRisk(kpidto, false);
            } else if (second) {
                this.buildStatusLightForInitiative(kpidto, null);
                this.buildStatusLightForRisk(kpidto, false);
            } else if (weighted) {
                Map<String, Integer> countMap = this.buildStatusLightForRisk(kpidto, false);
                countMap = this.buildStatusLightForInitiative(kpidto, countMap);
                if (Objects.nonNull(countMap = this.buildKPIStatusLight(kpidto, kpiCriteria, countMap))) {
                    String statusLight = this.calculateStatusLight(countMap);
                    if ("GREEN".equalsIgnoreCase(statusLight)) {
                        kpidto.getKpiValue().put("statusLight", "green fas fa-flag");
                    } else if ("YELLOW".equalsIgnoreCase(statusLight)) {
                        kpidto.getKpiValue().put("statusLight", "yellow fas fa-flag");
                    } else {
                        kpidto.getKpiValue().put("statusLight", "red fas fa-flag");
                    }
                }
            } else {
                this.buildStatusLightForRisk(kpidto, true);
            }
        }
        catch (Exception e) {
            this.logger.error("Exception while building status light", e);
        }
    }

    public Map<String, Integer> buildKPIStatusLight(KPIDTO kpidto, KPICriteria kpiCriteria, Map<String, Integer> countMap) {
        BigDecimal actual;
        Object targetObj;
        String value;
        int greenCount = 0;
        int redCount = 0;
        int yellowCount = 0;
        if (countMap == null) {
            countMap = new HashMap<String, Integer>();
            countMap.put("RED", 0);
            countMap.put("GREEN", 0);
            countMap.put("YELLOW", 0);
        } else {
            greenCount = countMap.get("GREEN");
            yellowCount = countMap.get("YELLOW");
            redCount = countMap.get("RED");
        }
        String threshold = Objects.nonNull(kpidto.getKpiValue().get("threshold")) ? kpidto.getKpiValue().get("threshold").toString().replaceAll("_", "") : "";
        String range1 = Objects.nonNull(kpidto.getKpiValue().get(threshold + "color1")) ? kpidto.getKpiValue().get(threshold + "color1").toString() : null;
        String range2 = Objects.nonNull(kpidto.getKpiValue().get(threshold + "color2")) ? kpidto.getKpiValue().get(threshold + "color2").toString() : null;
        String range3 = Objects.nonNull(kpidto.getKpiValue().get(threshold + "color3")) ? kpidto.getKpiValue().get(threshold + "color3").toString() : null;
        String thresholdDisplay1 = StringUtils.stripToEmpty((String)range1);
        String thresholdDisplay2 = StringUtils.stripToEmpty((String)range2);
        String thresholdDisplay3 = StringUtils.stripToEmpty(range3);
        kpidto.getKpiValue().put("threshold1", thresholdDisplay1);
        kpidto.getKpiValue().put("threshold2", String.join((CharSequence)"<= ", thresholdDisplay1, thresholdDisplay2));
        kpidto.getKpiValue().put("threshold3", thresholdDisplay3);
        boolean percentCheckThreshold = thresholdDisplay1.contains("%") || thresholdDisplay2.contains("%") || thresholdDisplay3.contains("%");
        BigDecimal threshold1 = null;
        BigDecimal threshold2 = null;
        BigDecimal threshold3 = null;
        if (percentCheckThreshold) {
            threshold1 = StringUtils.isNotEmpty((CharSequence)thresholdDisplay1) ? new BigDecimal(thresholdDisplay1.substring(0, thresholdDisplay1.length() - "%".length())) : new BigDecimal(0);
            threshold2 = StringUtils.isNotEmpty((CharSequence)thresholdDisplay2) ? new BigDecimal(thresholdDisplay2.substring(0, thresholdDisplay2.length() - "%".length())) : new BigDecimal(0);
            threshold3 = StringUtils.isNotEmpty((CharSequence)thresholdDisplay3) ? new BigDecimal(thresholdDisplay3.substring(0, thresholdDisplay3.length() - "%".length())) : new BigDecimal(0);
        } else {
            String modifiedVal1 = this.formattedToOriginal(thresholdDisplay1);
            String modifiedVal2 = this.formattedToOriginal(thresholdDisplay2);
            String modifiedVal3 = this.formattedToOriginal(thresholdDisplay3);
            threshold1 = StringUtils.isNotEmpty((CharSequence)modifiedVal1) ? new BigDecimal(modifiedVal1) : new BigDecimal(0);
            threshold2 = StringUtils.isNotEmpty((CharSequence)modifiedVal2) ? new BigDecimal(modifiedVal2) : new BigDecimal(0);
            threshold3 = StringUtils.isNotEmpty((CharSequence)modifiedVal3) ? new BigDecimal(modifiedVal3) : new BigDecimal(0);
        }
        boolean dataHasPercent = Objects.nonNull(kpidto.getKpiValue().get("target")) ? kpidto.getKpiValue().get("target").toString().contains("%") : false;
        boolean percentageCheck = Objects.nonNull(kpidto.getKpiValue().get("dataType")) ? "Percentage".equalsIgnoreCase(kpidto.getKpiValue().get("dataType").toString()) : false;
        BigDecimal target = null;
        target = dataHasPercent ? (StringUtils.isNotEmpty((CharSequence)(value = kpidto.getKpiValue().get("target").toString().substring(0, "%".length()))) ? new BigDecimal(value) : new BigDecimal(0)) : (Objects.nonNull(targetObj = kpidto.getKpiValue().get("target")) && StringUtils.isNotEmpty((CharSequence)targetObj.toString()) ? new BigDecimal(targetObj.toString()) : new BigDecimal(0));
        Map subMap = this.buildKPIDataFeed(kpidto);
        BigDecimal bigDecimal = actual = Objects.nonNull(subMap.get("actual")) ? new BigDecimal(subMap.get("actual").toString()) : new BigDecimal(0);
        if (actual.intValue() != 0) {
            int fragment;
            int n = fragment = Objects.nonNull(subMap.get("fragment")) ? Integer.valueOf(subMap.get("fragment").toString()) : 0;
            if (fragment == 0) {
                fragment = 1;
            }
            String kpiType = Objects.nonNull(kpidto.getKpiValue().get("kpiType")) ? kpidto.getKpiValue().get("kpiType").toString() : "";
            BigDecimal updatedTarget = target.multiply(new BigDecimal(fragment));
            boolean thresholdCheck = threshold1.intValue() != 0 || threshold2.intValue() != 0 || threshold3.intValue() != 0;
            BigDecimal finalTarget = Objects.nonNull(subMap.get("target")) ? new BigDecimal(subMap.get("target").toString()) : updatedTarget;
            boolean etlPercentageCheck = Objects.nonNull(subMap.get("dataType")) && "Percentage".equalsIgnoreCase(subMap.get("dataType").toString());
            BigDecimal finalResult = percentCheckThreshold || etlPercentageCheck ? (BigDecimal)this.targetFunction.apply(actual, finalTarget) : finalTarget.subtract(actual);
            int targetCheck = 0;
            if (!thresholdCheck) {
                finalResult = finalTarget.intValue() != 0 ? actual.divide(finalTarget, 2, RoundingMode.HALF_EVEN).multiply(new BigDecimal(100)) : new BigDecimal(0);
                targetCheck = finalResult.compareTo(new BigDecimal(100));
            }
            kpidto.getKpiValue().put("actual", etlPercentageCheck ? String.join((CharSequence)"", this.formatdecimal(actual), "%") : this.convertResult(actual, subMap));
            kpidto.getKpiValue().put("target", etlPercentageCheck && Objects.nonNull(subMap.get("target")) ? String.join((CharSequence)"", this.formatdecimal(finalTarget), "%") : this.convertResult(finalTarget, subMap));
            int result = 0;
            if (thresholdCheck) {
                BigDecimal updatedThreshol3;
                String customValue = this.applyKPICustomThreshold(kpidto, actual.toPlainString(), finalTarget.toPlainString());
                finalResult = StringUtils.isNotEmpty((CharSequence)customValue) ? new BigDecimal(customValue) : finalResult;
                BigDecimal updatedThreshold1 = percentCheckThreshold ? threshold1 : threshold1.multiply(new BigDecimal(fragment));
                BigDecimal updatedThreshold2 = percentCheckThreshold ? threshold2 : threshold2.multiply(new BigDecimal(fragment));
                BigDecimal bigDecimal2 = updatedThreshol3 = percentCheckThreshold ? threshold3 : threshold3.multiply(new BigDecimal(fragment));
                if (this.between(finalResult, new BigDecimal(0), updatedThreshold1)) {
                    String statusClass = kpiType.equalsIgnoreCase("lag") ? "green fas fa-flag" : "red fas fa-flag";
                    result = kpiType.equalsIgnoreCase("lag") ? countMap.put("GREEN", greenCount + 1) : countMap.put("RED", redCount + 1);
                    kpidto.getKpiValue().put("statusLight", statusClass);
                } else if (this.between(finalResult, updatedThreshold1, updatedThreshold2)) {
                    kpidto.getKpiValue().put("statusLight", "yellow fas fa-flag");
                    countMap.put("YELLOW", yellowCount + 1);
                } else if (this.between(finalResult, updatedThreshold2, updatedThreshol3) || finalResult.compareTo(updatedThreshol3) >= 0) {
                    String statusClass = kpiType.equalsIgnoreCase("lag") ? "red fas fa-flag" : "green fas fa-flag";
                    result = kpiType.equalsIgnoreCase("lag") ? countMap.put("RED", redCount + 1) : countMap.put("GREEN", greenCount + 1);
                    kpidto.getKpiValue().put("statusLight", statusClass);
                } else {
                    String statusClass = kpiType.equalsIgnoreCase("lag") ? "green fas fa-flag" : "red fas fa-flag";
                    result = kpiType.equalsIgnoreCase("lag") ? countMap.put("GREEN", greenCount + 1) : countMap.put("RED", redCount + 1);
                    kpidto.getKpiValue().put("statusLight", statusClass);
                }
            } else {
                double defaultThreshold1 = 30.0;
                double defaultThreshold2 = 70.0;
                if (finalResult.doubleValue() >= defaultThreshold2) {
                    String statusClass = kpiType.equalsIgnoreCase("lag") ? "red fas fa-flag" : "green fas fa-flag";
                    result = kpiType.equalsIgnoreCase("lag") ? countMap.put("RED", redCount + 1) : countMap.put("GREEN", greenCount + 1);
                    kpidto.getKpiValue().put("statusLight", statusClass);
                } else if (finalResult.doubleValue() > defaultThreshold1 && finalResult.doubleValue() < defaultThreshold2) {
                    kpidto.getKpiValue().put("statusLight", "yellow fas fa-flag");
                    countMap.put("YELLOW", yellowCount + 1);
                } else {
                    String statusClass = kpiType.equalsIgnoreCase("lag") ? "green fas fa-flag" : "red fas fa-flag";
                    result = kpiType.equalsIgnoreCase("lag") ? countMap.put("GREEN", greenCount + 1) : countMap.put("RED", redCount + 1);
                    kpidto.getKpiValue().put("statusLight", statusClass);
                }
            }
        } else {
            boolean etlPercentageCheck = Objects.nonNull(subMap.get("dataType")) && "Percentage".equalsIgnoreCase(subMap.get("dataType").toString());
            BigDecimal actualData = Objects.nonNull(subMap.get("actual")) ? new BigDecimal(subMap.get("actual").toString()) : new BigDecimal(0);
            kpidto.getKpiValue().put("actual", etlPercentageCheck ? String.join((CharSequence)"", this.formatdecimal(actualData), "%") : actualData);
            if (Objects.nonNull(subMap.get("target")) && StringUtils.isNotEmpty((CharSequence)subMap.get("target").toString())) {
                BigDecimal targetData = new BigDecimal(subMap.get("target").toString());
                kpidto.getKpiValue().put("target", etlPercentageCheck ? String.join((CharSequence)"", this.formatdecimal(targetData), "%") : targetData);
            } else if (!percentageCheck) {
                kpidto.getKpiValue().put("target", this.convertResult(target, kpidto.getKpiValue()));
            } else {
                kpidto.getKpiValue().put("target", String.join((CharSequence)"", this.formatdecimal(target), "%"));
            }
            kpidto.getKpiValue().put("statusLight", "");
        }
        return countMap;
    }

    public Map<String, Object> buildKPIDataFeed(KPIDTO kpiObj) {
        HashMap<String, Object> subMap = new HashMap<String, Object>();
        FormulaBuilder builder = new FormulaBuilder();
        if (StringUtils.isNotEmpty((CharSequence)((CharSequence)UserThreadLocal.get().get("DATE_PERIOD")))) {
            builder.setPeriod((String)UserThreadLocal.get().get("DATE_PERIOD"));
        } else if (kpiObj.getKpiFormula() != null) {
            builder.setPeriod(kpiObj.getKpiFormula().getPeriod());
        }
        FormulaUtil formulaUtil = new FormulaUtil();
        CustomPerformance customPerformance = (CustomPerformance)KPIThreadLocal.get().get("customPerformance");
        String loggedInEmpId = (String)UserThreadLocal.get().get("LOGGED_IN_EMPLOYEE_ID");
        if (!customPerformance.isAggregation()) {
            builder.setEmployeeIds(Arrays.asList(loggedInEmpId));
        } else if (customPerformance.isCustomAggregation() && customPerformance.isAggregation()) {
            List<Object> employeeIds = StringUtils.isNotEmpty((CharSequence)kpiObj.getCustomReportees()) ? Arrays.asList(loggedInEmpId, kpiObj.getCustomReportees()) : Arrays.asList(loggedInEmpId);
            builder.setEmployeeIds(employeeIds);
        } else if (StringUtils.isNotEmpty((CharSequence)((CharSequence)UserThreadLocal.get().get("ALL_REPORTEE_ID")))) {
            builder.setEmployeeIds(Arrays.asList(UserThreadLocal.get().get("ALL_REPORTEE_ID")));
        }
        KPICriteria kpiCriteria = formulaUtil.buildCriteria(builder, null);
        if (!kpiCriteria.getRealDates().isEmpty()) {
            Date startDate = (Date)kpiCriteria.getRealDates().get(0);
            Date endDate = (Date)kpiCriteria.getRealDates().get(1);
            int fragment = 0;
            try {
                String frequency = null;
                frequency = kpiObj.getKpiValue().get("kpi_measurement") != null ? kpiObj.getKpiValue().get("kpi_measurement").toString() : "Annually";
                String finalFreqValue = null;
                if (this.freqFunction.test(frequency, quarterFrequency)) {
                    finalFreqValue = "Quarterly";
                    fragment = this.dateUtil.findTotalFrequency(startDate, endDate, finalFreqValue);
                } else if (this.freqFunction.test(frequency, halfYearFrequency)) {
                    finalFreqValue = "HalfYearly";
                    fragment = this.dateUtil.findTotalFrequency(startDate, endDate, finalFreqValue);
                } else if (frequency.equalsIgnoreCase("Monthly")) {
                    finalFreqValue = "Monthly";
                    fragment = this.dateUtil.findTotalFrequency(startDate, endDate, finalFreqValue);
                } else {
                    finalFreqValue = "Yearly";
                    fragment = this.dateUtil.findTotalFrequency(startDate, endDate, finalFreqValue);
                }
                List<Object> updatedDateList = Arrays.asList(this.dateUtil.updateStartDate(startDate, finalFreqValue), this.dateUtil.updateEndDate(endDate, finalFreqValue));
                kpiCriteria.setRealDates(updatedDateList);
                this.applyFormula(kpiObj, kpiCriteria, subMap);
            }
            catch (Exception e) {
                throw new RuntimeException(e);
            }
            subMap.put("fragment", fragment);
        }
        return subMap;
    }

    public void applyFormula(KPIDTO kpidto, KPICriteria kpiCriteria, Map<String, Object> subMap) {
        FormulaBuilder formulaBuilder = null;
        FormulaUtil formulaUtil = new FormulaUtil();
        KPIFormula kpiFormula = null;
        if (kpiCriteria.isRetrieveYTD()) {
            kpiFormula = new KPIFormula();
            String ytdFormula = kpidto.getKpiValue().get("ytdFormula") != null ? kpidto.getKpiValue().get("ytdFormula").toString() : "";
            kpiFormula.setFormula(ytdFormula);
        } else {
            kpiFormula = kpidto.getKpiFormula();
        }
        kpiCriteria.setIncludeReportees(kpidto.isIncludeReportee());
        kpiCriteria.setCustomReportees(kpidto.getCustomReportees());
        if (Objects.nonNull(kpiFormula) && StringUtils.isNotEmpty((CharSequence)kpiFormula.getFormula())) {
            formulaBuilder = formulaUtil.extractFormulaExpression(kpiFormula, kpiCriteria);
            KPICriteria kpiFormulaCriteria = formulaUtil.buildCriteria(formulaBuilder, null);
            if (kpiFormulaCriteria.getRealDates().isEmpty()) {
                kpiFormulaCriteria.setRealDates(kpiCriteria.getRealDates());
            }
            kpiFormulaCriteria.setGroupBy(kpiCriteria.getGroupBy());
            kpiFormulaCriteria.setDeptName(kpiCriteria.getDeptName());
            kpiFormulaCriteria.setMetricCode(kpidto.getKpiId());
            Map dataMap = this.getExpressionValue(formulaBuilder, kpiFormulaCriteria, formulaUtil, kpidto);
            subMap.put("actual", dataMap.get("actual"));
            subMap.put("target", dataMap.get("target"));
            subMap.put("dataType", dataMap.get("dataType"));
            subMap.put("currency", Objects.nonNull(dataMap.get("currency")) ? dataMap.get("currency").toString() : "");
        } else if (StringUtils.isNotEmpty((CharSequence)((CharSequence)UserThreadLocal.get().get("DATE_PERIOD")))) {
            kpiCriteria.setMetricCode(kpidto.getKpiId());
            Map dataMap = this.populateActualData(kpiCriteria, formulaUtil, kpidto);
            subMap.put("actual", dataMap.get("actual"));
            subMap.put("target", dataMap.get("target"));
            subMap.put("dataType", dataMap.get("dataType"));
            subMap.put("currency", Objects.nonNull(dataMap.get("currency")) ? dataMap.get("currency").toString() : "");
        }
    }

    public Map<String, Object> populateActualData(KPICriteria kpiCriteria, FormulaUtil formulaUtil, KPIDTO kpidto) {
        Object currencyObj;
        HashMap<String, Object> dataMap = new HashMap<String, Object>();
        List<Map<String, Object>> kpiDetailsList = this.kpiService.retrieveOrgKPIDetails(kpiCriteria);
        ArrayList<String> dataList = new ArrayList<String>();
        ArrayList<String> targetList = new ArrayList<String>();
        String dataType = null;
        String currency = KPIThreadLocal.get().get("globalCurrency").toString();
        for (Map<String, Object> kpiDetailObj : (List<Map<String, Object>>)kpiDetailsList) {
            if (this.validateDataKey.test(kpiDetailObj.get("A").toString())) {
                dataList.add(kpiDetailObj.get("A").toString());
            }
            if (this.validateDataKey.test(kpiDetailObj.get("T").toString())) {
                targetList.add(kpiDetailObj.get("T").toString());
            }
            String string = dataType = Objects.nonNull(kpiDetailObj.get("dataType")) ? kpiDetailObj.get("dataType").toString() : "";
            Object currencyObj2 = kpiDetailObj.get("currency");
            if (!Objects.nonNull(currencyObj2) || !StringUtils.isNotEmpty((CharSequence)currencyObj2.toString())) continue;
            currency = String.join((CharSequence)"", currencyObj2.toString(), " ");
        }
        String kpiDataType = Objects.nonNull(kpidto.getKpiValue().get("dataType")) ? kpidto.getKpiValue().get("dataType").toString() : "";
        dataType = StringUtils.isNotEmpty((CharSequence)kpiDataType) ? kpiDataType : StringUtils.stripToEmpty(dataType);
        boolean isPercentage = "Percentage".equalsIgnoreCase(dataType);
        String function = isPercentage ? "AVG" : "SUM";
        String actual = formulaUtil.applyExpression(function + "(" + String.join((CharSequence)",", dataList) + ")");
        dataMap.put("actual", actual);
        if (CollectionUtils.isNotEmpty(targetList)) {
            String target = formulaUtil.applyExpression(function + "(" + String.join((CharSequence)",", targetList) + ")");
            dataMap.put("target", target);
        }
        if (Objects.nonNull(currencyObj = kpidto.getKpiValue().get("kpiCurrency")) && StringUtils.isNotEmpty((CharSequence)currencyObj.toString())) {
            currency = String.join((CharSequence)"", currencyObj.toString(), " ");
        }
        currency = "Currency".equalsIgnoreCase(dataType) ? currency : "";
        dataMap.put("currency", currency);
        dataMap.put("dataType", dataType);
        if (StringUtils.isNotEmpty((CharSequence)currency)) {
            kpidto.getKpiValue().put("actualCurrency", currency);
            kpidto.getKpiValue().put("targetCurrency", currency);
        } else {
            kpidto.getKpiValue().put("actualCurrency", "");
            kpidto.getKpiValue().put("targetCurrency", "");
        }
        return dataMap;
    }

    public Map<String, Object> getExpressionValue(FormulaBuilder formulaBuilder, KPICriteria kpiCriteria, FormulaUtil formulaUtil, KPIDTO kpidto) {
        String finalExpression = formulaBuilder.getExpression();
        String targetExpression = formulaBuilder.getExpression();
        HashMap<String, Object> dataMap = new HashMap<String, Object>();
        String dataType = null;
        String currency = KPIThreadLocal.get().get("globalCurrency").toString();
        for (String nodeKey : formulaBuilder.getNodeKeyList()) {
            kpiCriteria.setNodeKey(this.kpiService.lookupNodeKey(nodeKey));
            List<Map<String, Object>> kpiDetailsList = this.kpiService.retrieveOrgKPIDetails(kpiCriteria);
            ArrayList<String> dataList = new ArrayList<String>();
            ArrayList<String> finalList = new ArrayList<String>();
            for (Map<String, Object> kpiDetailObj : (List<Map<String, Object>>)kpiDetailsList) {
                if (this.validateDataKey.test(kpiDetailObj.get("A").toString())) {
                    dataList.add(kpiDetailObj.get("A").toString());
                }
                if (this.validateDataKey.test(kpiDetailObj.get("T").toString())) {
                    finalList.add(kpiDetailObj.get("T").toString());
                }
                String string = dataType = Objects.nonNull(kpiDetailObj.get("dataType")) ? kpiDetailObj.get("dataType").toString() : "";
                Object currencyObj = kpiDetailObj.get("currency");
                if (!Objects.nonNull(currencyObj) || !StringUtils.isNotEmpty((CharSequence)currencyObj.toString())) continue;
                currency = String.join((CharSequence)"", currencyObj.toString(), " ");
            }
            finalExpression = finalExpression.replace(nodeKey, String.join((CharSequence)",", dataList));
            String targetValue = CollectionUtils.isNotEmpty(finalList) ? String.join((CharSequence)",", finalList) : "0";
            targetExpression = targetExpression.replace(nodeKey, targetValue);
        }
        finalExpression = finalExpression.replaceAll("\\[", "(").replaceAll("\\]", ")");
        BigDecimal target = new BigDecimal(formulaUtil.applyExpression(targetExpression = targetExpression.replaceAll("\\[", "(").replaceAll("\\]", ")")));
        if (target.intValue() != 0) {
            dataMap.put("target", target.toPlainString());
        }
        String actual = formulaUtil.applyExpression(finalExpression);
        dataMap.put("actual", actual);
        String kpiDataType = Objects.nonNull(kpidto.getKpiValue().get("dataType")) ? kpidto.getKpiValue().get("dataType").toString() : "";
        dataType = StringUtils.isNotEmpty((CharSequence)kpiDataType) ? kpiDataType : StringUtils.stripToEmpty(dataType);
        Object currencyObj = kpidto.getKpiValue().get("kpiCurrency");
        if (Objects.nonNull(currencyObj) && StringUtils.isNotEmpty((CharSequence)currencyObj.toString())) {
            currency = String.join((CharSequence)"", currencyObj.toString(), " ");
        }
        currency = "Currency".equalsIgnoreCase(dataType) ? currency : "";
        dataMap.put("currency", currency);
        dataMap.put("dataType", dataType);
        if (StringUtils.isNotEmpty((CharSequence)currency)) {
            kpidto.getKpiValue().put("actualCurrency", currency);
            kpidto.getKpiValue().put("targetCurrency", currency);
        } else {
            kpidto.getKpiValue().put("actualCurrency", "");
            kpidto.getKpiValue().put("targetCurrency", "");
        }
        return dataMap;
    }

    public String applyKPICustomThreshold(KPIDTO kpidto, String actual, String target) {
        if (kpidto.getKpiValue().get("thresholdFormula") != null && StringUtils.isNotEmpty((CharSequence)kpidto.getKpiValue().get("thresholdFormula").toString())) {
            FormulaUtil formulaUtil = new FormulaUtil();
            String weight = "0";
            if (Objects.nonNull(kpidto.getKpiValue().get("weight")) && StringUtils.isNotEmpty((CharSequence)kpidto.getKpiValue().get("weight").toString())) {
                weight = kpidto.getKpiValue().get("weight").toString();
            }
            String[] searchStrArray = new String[]{"actual", "Actual", "ACTUAL", "target", "Target", "TARGET", "%", "weight", "WEIGHT", "Weight"};
            String[] replaceStringArray = new String[]{actual, actual, actual, target, target, target, "/100", weight, weight, weight};
            String thresholdFormula = kpidto.getKpiValue().get("thresholdFormula").toString();
            thresholdFormula = StringUtils.replaceEach((String)thresholdFormula, (String[])searchStrArray, (String[])replaceStringArray);
            String result = formulaUtil.applyExpression(thresholdFormula);
            kpidto.getKpiValue().put("thresholdResult", result);
        }
        return null;
    }

    public Map<String, Integer> buildStatusLightForInitiative(KPIDTO kpidto, Map<String, Integer> countMap) {
        List initiativesDTOList = this.initiativeService.findImpactedInitiatives(kpidto.getId());
        for (com.estrat.service.etl.dto.InitiativesDTO initiativesDTO : (java.util.List<com.estrat.service.etl.dto.InitiativesDTO>)initiativesDTOList) {
            countMap = this.buildInitiativeStatusData(initiativesDTO, countMap);
        }
        if (Objects.nonNull(countMap)) {
            String statusLight = this.calculateStatusLight(countMap);
            if ("GREEN".equalsIgnoreCase(statusLight)) {
                kpidto.getKpiValue().put("statusLight", "green fas fa-flag");
            } else if ("YELLOW".equalsIgnoreCase(statusLight)) {
                kpidto.getKpiValue().put("statusLight", "yellow fas fa-flag");
            } else {
                kpidto.getKpiValue().put("statusLight", "red fas fa-flag");
            }
        }
        return countMap;
    }

    public Map<String, Integer> buildStatusLightForRisk(KPIDTO kpidto, boolean updateKpiStatus) {
        List riskDTOList = this.riskDetailsService.findImpactedRiskDetails(kpidto.getId());
        LinkedHashMap<String, Integer> countMap = null;
        for (com.estrat.service.etl.dto.RiskDTO riskDTO : (java.util.List<com.estrat.service.etl.dto.RiskDTO>)riskDTOList) {
            int score;
            if (!Objects.nonNull(riskDTO.getRiskValue()) || (score = Objects.nonNull(riskDTO.getRiskValue().get("score")) ? Integer.valueOf(riskDTO.getRiskValue().get("score").toString()) : 0) == 0) continue;
            int greenCount = 0;
            int redCount = 0;
            int yellowCount = 0;
            if (countMap == null) {
                countMap = new LinkedHashMap<String, Integer>();
                countMap.put("GREEN", 0);
                countMap.put("YELLOW", 0);
                countMap.put("RED", 0);
            } else {
                greenCount = (Integer)countMap.get("GREEN");
                yellowCount = (Integer)countMap.get("YELLOW");
                redCount = (Integer)countMap.get("RED");
            }
            if (score == 1) {
                countMap.put("GREEN", greenCount + 1);
                continue;
            }
            if (score == 4) {
                countMap.put("YELLOW", yellowCount + 1);
                continue;
            }
            if (score >= 5 && score <= 10) {
                countMap.put("RED", redCount + 1);
                continue;
            }
            if (score < 16) continue;
            countMap.put("RED", redCount + 1);
        }
        if (Objects.nonNull(countMap)) {
            String statusLight = this.calculateStatusLight(countMap);
            if ("GREEN".equalsIgnoreCase(statusLight)) {
                if (updateKpiStatus) {
                    kpidto.getKpiValue().put("statusLight", "green fas fa-flag");
                }
                kpidto.getKpiValue().put("riskStatusLight", "green fas fa-flag");
            } else if ("YELLOW".equalsIgnoreCase(statusLight)) {
                if (updateKpiStatus) {
                    kpidto.getKpiValue().put("statusLight", "yellow fas fa-flag");
                }
                kpidto.getKpiValue().put("riskStatusLight", "yellow fas fa-flag");
            } else {
                if (updateKpiStatus) {
                    kpidto.getKpiValue().put("statusLight", "red fas fa-flag");
                }
                kpidto.getKpiValue().put("riskStatusLight", "red fas fa-flag");
            }
        } else {
            kpidto.getKpiValue().put("riskStatusLight", "");
        }
        return countMap;
    }

    public Map<String, Integer> buildInitiativeStatusData(InitiativesDTO initiativesDTO, Map<String, Integer> countMap) {
        return this.updateStatus(initiativesDTO.getInitiativeValue(), countMap);
    }

    public Map<String, Integer> updateStatus(Map<String, Object> stringObjectsMap, Map<String, Integer> countMap) {
        String dateRange;
        int greenCount = 0;
        int redCount = 0;
        int yellowCount = 0;
        if (countMap == null) {
            countMap = new LinkedHashMap<String, Integer>();
            countMap.put("GREEN", 0);
            countMap.put("YELLOW", 0);
            countMap.put("RED", 0);
        } else {
            greenCount = countMap.get("GREEN");
            yellowCount = countMap.get("YELLOW");
            redCount = countMap.get("RED");
        }
        double perDayValue = 0.0;
        double expecedPercent = 0.0;
        double defaultThreshold1 = 30.0;
        double defaultThreshold2 = 70.0;
        String[] dataRanges = null;
        double progress = 0.0;
        boolean dueDateCrossed = false;
        try {
            double d = progress = Objects.nonNull(stringObjectsMap.get("progressval")) ? Double.valueOf(stringObjectsMap.get("progressval").toString()) : 0.0;
            if (progress == 0.0) {
                progress = Objects.nonNull(stringObjectsMap.get("progress")) ? Double.valueOf(stringObjectsMap.get("progress").toString()) : 0.0;
            }
        }
        catch (NumberFormatException nfe) {
            progress = 0.0;
        }
        String string = dateRange = stringObjectsMap.get("daterange") != null && StringUtils.isNotEmpty((CharSequence)stringObjectsMap.get("daterange").toString()) ? stringObjectsMap.get("daterange").toString() : null;
        if (dateRange == null) {
            String string2 = dateRange = stringObjectsMap.get("dateRange") != null && StringUtils.isNotEmpty((CharSequence)stringObjectsMap.get("dateRange").toString()) ? stringObjectsMap.get("dateRange").toString() : null;
        }
        if (Objects.nonNull(dateRange)) {
            String[] stringArray = dataRanges = dateRange.contains("-") ? dateRange.split("-") : dateRange.split(",");
        }
        if (dataRanges != null && dataRanges.length > 1) {
            String startDate = dataRanges[0].trim();
            String endDate = dataRanges[1].trim();
            ArrayList<SimpleDateFormat> knownPatterns = new ArrayList<SimpleDateFormat>();
            knownPatterns.add(new SimpleDateFormat("MM/dd/yyyy"));
            knownPatterns.add(new SimpleDateFormat("MMM dd, yyyy"));
            Date firstDate = null;
            Date secondDate = null;
            for (SimpleDateFormat pattern : knownPatterns) {
                try {
                    firstDate = pattern.parse(startDate);
                    secondDate = pattern.parse(endDate);
                }
                catch (ParseException pe) {
                    this.logger.error("parser exception for unknown pattern " + pattern);
                }
            }
            Long difference = ChronoUnit.DAYS.between(firstDate.toInstant(), secondDate.toInstant());
            perDayValue = Integer.valueOf(((Object)difference).toString()) == 0 ? 100.0 : (double)(100 / Integer.valueOf(((Object)difference).toString()));
            Date curDate = new Date();
            if (curDate.after(secondDate)) {
                dueDateCrossed = true;
                curDate = secondDate;
            }
            Long diffFromCurrentDate = ChronoUnit.DAYS.between(firstDate.toInstant(), curDate.toInstant());
            expecedPercent = perDayValue * (double)Integer.valueOf(((Object)diffFromCurrentDate).toString()).intValue();
        }
        if (progress == 100.0) {
            stringObjectsMap.put("statusLight", "progress-bar-success width-per-100 rounded-pill bar_height");
            stringObjectsMap.put("statusIndicator", "GREEN");
            countMap.put("GREEN", greenCount + 1);
        } else if (dueDateCrossed && progress < 100.0) {
            stringObjectsMap.put("statusLight", "progress-bar width-per-15 rounded-pill bar_height orange_bar");
            stringObjectsMap.put("statusIndicator", "RED");
            countMap.put("RED", redCount + 1);
        } else if (progress >= defaultThreshold2 || progress >= expecedPercent) {
            stringObjectsMap.put("statusLight", "progress-bar progress-bar-success width-per-85 rounded-pill bar_height");
            stringObjectsMap.put("statusIndicator", "GREEN");
            countMap.put("GREEN", greenCount + 1);
        } else if (progress > defaultThreshold1 && progress < defaultThreshold2) {
            stringObjectsMap.put("statusLight", "progress-bar width-per-40 rounded-pill bar_height yellow_bar");
            stringObjectsMap.put("statusIndicator", "YELLOW");
            countMap.put("YELLOW", yellowCount + 1);
        } else {
            stringObjectsMap.put("statusLight", "progress-bar width-per-15 rounded-pill bar_height orange_bar");
            stringObjectsMap.put("statusIndicator", "RED");
            countMap.put("RED", redCount + 1);
        }
        return countMap;
    }

    public void updateStatusByProgress(Map<String, Object> stringObjectsMap) {
        String status;
        String dateRange;
        String endDate = null;
        String[] dataRanges = null;
        String string = dateRange = stringObjectsMap.get("daterange") != null && StringUtils.isNotEmpty((CharSequence)stringObjectsMap.get("daterange").toString()) ? stringObjectsMap.get("daterange").toString() : null;
        if (dateRange == null) {
            String string2 = dateRange = stringObjectsMap.get("dateRange") != null && StringUtils.isNotEmpty((CharSequence)stringObjectsMap.get("dateRange").toString()) ? stringObjectsMap.get("dateRange").toString() : null;
        }
        if (Objects.nonNull(dateRange)) {
            dataRanges = dateRange.contains("-") ? dateRange.split("-") : dateRange.split(",");
        }
        String string3 = status = Objects.nonNull(stringObjectsMap.get("status")) ? stringObjectsMap.get("status").toString() : "";
        if (dataRanges != null && dataRanges.length > 1) {
            endDate = dataRanges[1].trim();
        } else if (dataRanges != null && dataRanges.length > 0) {
            endDate = dataRanges[0].trim();
        }
        ArrayList<SimpleDateFormat> knownPatterns = new ArrayList<SimpleDateFormat>();
        knownPatterns.add(new SimpleDateFormat("MM/dd/yyyy"));
        knownPatterns.add(new SimpleDateFormat("MMM dd, yyyy"));
        Date endDateObj = null;
        boolean dueDateCrossed = false;
        for (SimpleDateFormat pattern : knownPatterns) {
            try {
                Date curDate = new Date();
                endDateObj = pattern.parse(endDate);
                if (!curDate.after(endDateObj)) continue;
                dueDateCrossed = true;
            }
            catch (Exception pe) {
                this.logger.error("parser exception for unknown pattern " + pattern);
            }
        }
        if (dueDateCrossed) {
            if ("Completed".equalsIgnoreCase(status)) {
                stringObjectsMap.put("statusLight", "progress-bar progress-bar-success width-per-85 rounded-pill bar_height");
                stringObjectsMap.put("statusIndicator", "GREEN");
            } else {
                stringObjectsMap.put("statusLight", "progress-bar width-per-15 rounded-pill bar_height orange_bar");
                stringObjectsMap.put("statusIndicator", "RED");
            }
        } else {
            stringObjectsMap.put("statusLight", "progress-bar progress-bar-success width-per-85 rounded-pill bar_height");
            stringObjectsMap.put("statusIndicator", "GREEN");
        }
    }

    private String calculateStatusLight(Map<String, Integer> countMap) {
        boolean oneKey;
        Map<String, Integer> filteredMap = countMap.entrySet().stream().filter(entry -> (Integer)entry.getValue() != 0).collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
        if (filteredMap == null || filteredMap.isEmpty()) {
            return "RED";
        }
        boolean bl = oneKey = filteredMap.keySet().size() == 1;
        if (oneKey) {
            return (String)filteredMap.keySet().stream().findFirst().get();
        }
        long max = countMap.values().stream().max(Comparator.naturalOrder()).get().intValue();
        String statusLight = countMap.entrySet().stream().filter(e -> (long)((Integer)e.getValue()).intValue() == max).map(Map.Entry::getKey).findFirst().get();
        return statusLight.equalsIgnoreCase("RED") ? statusLight : "YELLOW";
    }

    public String convertResult(BigDecimal decimal, Map<String, Object> subMap) {
        String type;
        DecimalFormat decimalFormat = new DecimalFormat("###,###.##");
        String string = type = subMap != null && Objects.nonNull(subMap.get("dataType")) ? subMap.get("dataType").toString() : "";
        if ("Currency".equalsIgnoreCase(type)) {
            String finalValue = null;
            if (decimal.longValue() < 0L) {
                finalValue = String.join((CharSequence)"", "-", this.formatResult(new BigDecimal(Math.abs(decimal.doubleValue()))));
            } else {
                if (decimal.longValue() == 0L) {
                    return decimal.toPlainString();
                }
                if (decimal.longValue() < 100000L) {
                    return this.formatResult(decimal);
                }
                finalValue = this.formatResult(decimal);
            }
            if (finalValue.indexOf("M") != -1) {
                String[] splitVal = finalValue.split("M");
                String formattedValue = decimalFormat.format(Double.valueOf(StringUtils.trimToEmpty((String)splitVal[0])));
                return String.join((CharSequence)"", formattedValue, " M");
            }
            return decimalFormat.format(Double.valueOf(finalValue));
        }
        return decimalFormat.format(decimal.doubleValue());
    }

    public String formatResult(BigDecimal decimal) {
        if (decimal.longValue() < 10L) {
            return String.format("%.7f M", decimal.doubleValue() / 1000000.0);
        }
        if (decimal.longValue() < 100L) {
            return String.format("%.6f M", decimal.doubleValue() / 1000000.0);
        }
        if (decimal.longValue() < 1000L) {
            return String.format("%.5f M", decimal.doubleValue() / 1000000.0);
        }
        if (decimal.longValue() < 10000L) {
            return String.format("%.4f M", decimal.doubleValue() / 1000000.0);
        }
        if (decimal.longValue() < 100000L) {
            return String.format("%.3f M", decimal.doubleValue() / 1000000.0);
        }
        if (decimal.longValue() < 1000000L) {
            return String.format("%.2f M", decimal.doubleValue() / 1000000.0);
        }
        int exp = (int)(Math.log(decimal.doubleValue()) / Math.log(1000000.0));
        return String.format("%.2f %c", decimal.doubleValue() / Math.pow(1000000.0, exp), Character.valueOf("M".charAt(exp - 1)));
    }

    public String formatdecimal(BigDecimal decimal) {
        DecimalFormat df = new DecimalFormat("#.##");
        String formatted = df.format(decimal);
        return formatted;
    }

    public String formattedToOriginal(String result) {
        try {
            if (StringUtils.isEmpty((CharSequence)result)) {
                return result;
            }
            DecimalFormat decimalFormat = new DecimalFormat("###,###.##");
            if (result.contains("M")) {
                String removedValue = result.replaceAll("M", "").trim();
                BigDecimal value = new BigDecimal(decimalFormat.parse(removedValue).toString());
                return value.multiply(new BigDecimal(1000000)).toPlainString();
            }
            return decimalFormat.parse(result).toString();
        }
        catch (ParseException e) {
            this.logger.error("Exception while parsing the decimal data", e);
            throw new RuntimeException(e);
        }
    }

    public boolean between(BigDecimal value, BigDecimal min, BigDecimal max) {
        return value.compareTo(min) >= 0 && value.compareTo(max) <= 0;
    }
}

