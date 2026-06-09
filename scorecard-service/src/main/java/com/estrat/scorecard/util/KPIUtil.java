/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.scorecard.dto.ControlPanelGeneralDTO
 *  com.estrat.scorecard.dto.CustomPerformance
 *  com.estrat.scorecard.dto.DepartmentChartDTO
 *  com.estrat.scorecard.dto.FormulaBuilder
 *  com.estrat.scorecard.dto.InitiativesDTO
 *  com.estrat.scorecard.dto.KPICriteria
 *  com.estrat.scorecard.dto.KPICriteriaDTO
 *  com.estrat.scorecard.dto.KPIDTO
 *  com.estrat.scorecard.dto.KPIDetailsDTO
 *  com.estrat.scorecard.dto.KPIElementDTO
 *  com.estrat.scorecard.dto.KPIFormula
 *  com.estrat.scorecard.dto.KPIResponseDTO
 *  com.estrat.scorecard.dto.ObjectivesDTO
 *  com.estrat.scorecard.dto.RiskDTO
 *  com.estrat.scorecard.dto.ScoreCardDTO
 *  com.estrat.scorecard.dto.SubKPIDTO
 *  com.estrat.scorecard.service.InitiativeService
 *  com.estrat.scorecard.service.KPIService
 *  com.estrat.scorecard.service.ObjectiveService
 *  com.estrat.scorecard.service.RiskDetailsService
 *  com.estrat.scorecard.service.SubKPIService
 *  com.estrat.scorecard.util.DateUtil
 *  com.estrat.scorecard.util.FormulaUtil
 *  com.estrat.scorecard.util.KPIThreadLocal
 *  com.estrat.scorecard.util.KPIUtil
 *  com.estrat.scorecard.util.UserThreadLocal
 *  org.apache.commons.collections4.CollectionUtils
 *  org.apache.commons.lang3.StringUtils
 *  Logger
 *  org.slf4j.Logger
 *  org.slf4j.LoggerFactory
 *  org.springframework.beans.BeanUtils
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Qualifier
 *  org.springframework.core.task.TaskExecutor
 *  org.springframework.stereotype.Component
 */
package com.estrat.scorecard.util;

import com.estrat.scorecard.dto.ControlPanelGeneralDTO;
import com.estrat.scorecard.dto.CustomPerformance;
import com.estrat.scorecard.dto.DepartmentChartDTO;
import com.estrat.scorecard.dto.FormulaBuilder;
import com.estrat.scorecard.dto.InitiativesDTO;
import com.estrat.scorecard.dto.KPICriteria;
import com.estrat.scorecard.dto.KPICriteriaDTO;
import com.estrat.scorecard.dto.KPIDTO;
import com.estrat.scorecard.dto.KPIDetailsDTO;
import com.estrat.scorecard.dto.KPIElementDTO;
import com.estrat.scorecard.dto.KPIFormula;
import com.estrat.scorecard.dto.KPIResponseDTO;
import com.estrat.scorecard.dto.ObjectivesDTO;
import com.estrat.scorecard.dto.RiskDTO;
import com.estrat.scorecard.dto.ScoreCardDTO;
import com.estrat.scorecard.dto.SubKPIDTO;
import com.estrat.scorecard.service.InitiativeService;
import com.estrat.scorecard.service.KPIService;
import com.estrat.scorecard.service.ObjectiveService;
import com.estrat.scorecard.service.RiskDetailsService;
import com.estrat.scorecard.service.SubKPIService;
import com.estrat.scorecard.util.DateUtil;
import com.estrat.scorecard.util.FormulaUtil;
import com.estrat.scorecard.util.KPIThreadLocal;
import com.estrat.scorecard.util.UserThreadLocal;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.net.URLDecoder;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Collection;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.Executor;
import java.util.concurrent.TimeUnit;
import java.util.function.BiFunction;
import java.util.function.BiPredicate;
import java.util.function.Predicate;
import java.util.stream.Collectors;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.core.task.TaskExecutor;
import org.springframework.stereotype.Component;

/*
 * Exception performing whole class analysis ignored.
 */
@Component
public class KPIUtil {
    @Autowired
    private KPIService kpiService;
    @Autowired
    private DateUtil dateUtil;
    @Autowired
    private InitiativeService initiativeService;
    @Autowired
    private RiskDetailsService riskDetailsService;
    @Autowired
    private ObjectiveService objectiveService;
    @Autowired
    private SubKPIService subKPIService;
    @Autowired
    @Qualifier(value="executorA")
    private TaskExecutor kpiExecutor;
    private static String quarterFrequency = "quarter,quarterly";
    private static String halfYearFrequency = "halfyear,half year,half yearly,halfyearly";
    private Logger log = LoggerFactory.getLogger(KPIUtil.class);
    private Logger logger = log;
    private Predicate<String> validateDataKey = dataKey -> !StringUtils.isEmpty((CharSequence)dataKey) && !"Not Available".equalsIgnoreCase((String)dataKey);
    private Map<String, String> statusLightKeyMap = new HashMap();
    BiPredicate<String, String> freqFunction = (frequency, validateFreq) -> StringUtils.isNotEmpty((CharSequence)frequency) && Arrays.asList(validateFreq.split(",")).contains(frequency.toLowerCase());
    BiFunction<BigDecimal, BigDecimal, BigDecimal> targetFunction = (actual, updatedTarget) -> updatedTarget.doubleValue() != 0.0 ? actual.divide((BigDecimal)updatedTarget, 2, RoundingMode.HALF_EVEN).multiply(new BigDecimal(100)) : actual;

    public Map<String, String> getStatusKeyMap() {
        this.statusLightKeyMap.put("green fas fa-flag", "GREEN");
        this.statusLightKeyMap.put("yellow fas fa-flag", "YELLOW");
        this.statusLightKeyMap.put("red fas fa-flag", "RED");
        this.statusLightKeyMap.put("lightgreen fas fa-flag", "LIGHTGREEN");
        this.statusLightKeyMap.put("lightred fas fa-flag", "LIGHTRED");
        return this.statusLightKeyMap;
    }

    public Map<String, Object> getActualVsTargetData(KPICriteria kpiCriteria, KPICriteriaDTO criteriaDTO, KPIDTO kpiObj, SubKPIDTO subkpidto, String flagtype) {
        boolean subkpi = false;
        if (flagtype.equalsIgnoreCase("subkpi")) {
            subkpi = true;
        }
        LinkedHashMap<String, Object> outMap = new LinkedHashMap<String, Object>();
        BigDecimal target = null;
        BigDecimal contribution = null;
        if (subkpi) {
            if (subkpidto.getSubKpiValue().get("target") != null) {
                try {
                    target = new BigDecimal(subkpidto.getSubKpiValue().get("target").toString());
                }
                catch (NumberFormatException e) {
                    target = new BigDecimal(0);
                }
            }
            if (subkpidto.getSubKpiValue().get("contribution") != null) {
                try {
                    contribution = new BigDecimal(subkpidto.getSubKpiValue().get("contribution").toString());
                }
                catch (NumberFormatException e) {
                    contribution = new BigDecimal(0);
                }
            }
        } else {
            if (kpiObj.getKpiValue().get("target") != null) {
                try {
                    target = new BigDecimal(kpiObj.getKpiValue().get("target").toString());
                }
                catch (NumberFormatException e) {
                    target = new BigDecimal(0);
                }
            }
            if (kpiObj.getKpiValue().get("contribution") != null) {
                try {
                    contribution = new BigDecimal(kpiObj.getKpiValue().get("contribution").toString());
                }
                catch (NumberFormatException e) {
                    contribution = new BigDecimal(0);
                }
            }
        }
        String period = criteriaDTO.getPeriod();
        String frequency = criteriaDTO.getFrequency();
        SimpleDateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy");
        Date periodEndDate = null;
        Date periodStartDate = null;
        try {
            periodStartDate = dateFormat.parse(period.split("\\-")[0].trim());
            periodEndDate = dateFormat.parse(period.split("\\-")[1].trim());
        }
        catch (ParseException e) {
            throw new RuntimeException(e);
        }
        CustomPerformance customPerformance = this.kpiService.findCustomPerformanceByOrgId();
        String loggedInEmpId = (String)UserThreadLocal.get().get("LOGGED_IN_EMPLOYEE_ID");
        if (kpiCriteria != null && !customPerformance.isAggregation()) {
            kpiCriteria.setEmployeeIds(Arrays.asList(loggedInEmpId));
        } else if (kpiCriteria != null && customPerformance.isCustomAggregation()) {
            List<Object> employeeIds = StringUtils.isNotEmpty((CharSequence)kpiCriteria.getCustomReportees()) ? Arrays.asList(loggedInEmpId, kpiCriteria.getCustomReportees()) : Arrays.asList(loggedInEmpId);
            kpiCriteria.setEmployeeIds(employeeIds);
            if (subkpi) {
                kpiCriteria.setDeptReportee(subkpidto.getCustomReportees());
            } else {
                kpiCriteria.setDeptReportee(kpiObj.getCustomReportees());
            }
        } else if (StringUtils.isNotEmpty((CharSequence)((CharSequence)UserThreadLocal.get().get("ALL_REPORTEE_ID")))) {
            kpiCriteria.setEmployeeIds(Arrays.asList(UserThreadLocal.get().get("ALL_REPORTEE_ID")));
        }
        String ytd = null;
        ytd = subkpi ? this.retrieveYTD(null, subkpidto, "subkpi", loggedInEmpId) : this.retrieveYTD(kpiObj, null, "kpi", loggedInEmpId);
        try {
            String finalFreqValue = null;
            finalFreqValue = this.freqFunction.test(frequency, quarterFrequency) ? "Quarterly" : (this.freqFunction.test(frequency, halfYearFrequency) ? "HalfYearly" : (frequency.equalsIgnoreCase("Monthly") ? "Monthly" : "Yearly"));
            String deptId = null;
            deptId = subkpi ? this.kpiService.getKpiDeptId(Long.valueOf(subkpidto.getId())) : this.kpiService.getKpiDeptId(Long.valueOf(kpiObj.getId()));
            System.out.println("deptId - f -- 1 - " + deptId);
            if (Objects.nonNull(criteriaDTO.getDepartmentId()) && !criteriaDTO.getDepartmentId().equals("0")) {
                System.out.println("Enter in formula cockpit :: deptId :: " + criteriaDTO.getDepartmentId());
                deptId = criteriaDTO.getDepartmentId();
            }
            System.out.println("deptId - f -- 2- " + deptId);
            if (Objects.nonNull(deptId) && !deptId.equals("0")) {
                kpiCriteria.setDepartmentId(Long.parseLong(deptId));
            } else {
                deptId = String.valueOf(this.kpiService.getDeptId(Long.valueOf(Long.parseLong((String)UserThreadLocal.get().get("LOGGED_IN_EMPLOYEE_ID")))));
                kpiCriteria.setDepartmentId(Long.parseLong(deptId));
            }
            Map periodMap = this.dateUtil.populatePeriod(periodStartDate, periodEndDate, finalFreqValue);
            for (String key : (java.util.Set<String>)periodMap.keySet()) {
                List periodList = (List)periodMap.get(key);
                kpiCriteria.setRealDates(periodList);
                kpiCriteria.setGroupBy(criteriaDTO.getGroupBy());
                kpiCriteria.setOriginOrg(criteriaDTO.getOriginOrg());
                kpiCriteria.setDeptName(criteriaDTO.getDeptName());
                HashMap<String, Object> subMap = new HashMap<String, Object>();
                HashMap dataMap = new HashMap();
                if (subkpi) {
                    this.applyFormula(null, subkpidto, "subkpi", kpiCriteria, dataMap);
                } else {
                    this.applyFormula(kpiObj, null, "kpi", kpiCriteria, dataMap);
                }
                boolean isPercentageType = Objects.nonNull(dataMap.get("dataType")) && "Percentage".equalsIgnoreCase(dataMap.get("dataType").toString());
                String actual = Objects.nonNull(dataMap.get("actual")) ? dataMap.get("actual").toString() : "-";
                BigDecimal updatedTarget = Objects.nonNull(dataMap.get("target")) ? new BigDecimal(dataMap.get("target").toString()) : target;
                BigDecimal bigDecimal = updatedTarget = updatedTarget == null ? new BigDecimal(0) : updatedTarget;
                if (actual.equals("-")) {
                    subMap.put("actual", actual);
                } else {
                    subMap.put("actual", isPercentageType ? String.join((CharSequence)"", this.formatdecimal(new BigDecimal(actual)), "%") : this.convertResult(new BigDecimal(actual), dataMap));
                }
                subMap.put("target", isPercentageType ? String.join((CharSequence)"", this.formatdecimal(updatedTarget), "%") : this.convertResult(updatedTarget, dataMap));
                subMap.put("contribution", contribution);
                BigDecimal gap = new BigDecimal(0);
                if (!actual.equals("-")) {
                    BigDecimal actualval = new BigDecimal(actual);
                    gap = actualval.subtract(updatedTarget);
                }
                if (gap.doubleValue() != 0.0) {
                    subMap.put("gap", isPercentageType ? String.join((CharSequence)"", this.formatdecimal(gap), "%") : this.convertResult(gap, dataMap));
                } else {
                    subMap.put("gap", isPercentageType ? String.join((CharSequence)"", "0", "%") : Double.valueOf(gap.doubleValue()));
                }
                subMap.put("ytd", ytd);
                subMap.put("currency", dataMap.get("currency"));
                outMap.put(key, subMap);
            }
        }
        catch (Exception e) {
            throw new RuntimeException(e);
        }
        return outMap;
    }

    public String retrieveYTD(KPIDTO kpiObj, SubKPIDTO subkpidto, String flagtype, String empId) {
        KPICriteria kpiCriteria = new KPICriteria();
        String finalValue = null;
        Object finalcialPeriodStart = KPIThreadLocal.get().get("financialPeriodStart");
        if (Objects.nonNull(finalcialPeriodStart)) {
            String deptId;
            Object finalcialPeriodEnd = KPIThreadLocal.get().get("financialPeriodEnd");
            kpiCriteria.getRealDates().add(((Calendar)finalcialPeriodStart).getTime());
            kpiCriteria.getRealDates().add(((Calendar)finalcialPeriodEnd).getTime());
            Object ytdFormulaObj = null;
            if (flagtype.equalsIgnoreCase("subkpi")) {
                deptId = this.kpiService.getKpiDeptId(Long.valueOf(subkpidto.getId()));
                ytdFormulaObj = subkpidto.getSubKpiValue().get("ytdFormula");
            } else {
                deptId = this.kpiService.getKpiDeptId(Long.valueOf(kpiObj.getId()));
                ytdFormulaObj = kpiObj.getKpiValue().get("ytdFormula");
            }
            if (Objects.nonNull(deptId) && !deptId.equals("0")) {
                kpiCriteria.setDepartmentId(Long.parseLong(deptId));
            } else {
                deptId = String.valueOf(this.kpiService.getDeptId(Long.valueOf(Long.parseLong((String)UserThreadLocal.get().get("LOGGED_IN_EMPLOYEE_ID")))));
                kpiCriteria.setDepartmentId(Long.parseLong(deptId));
            }
            if (Objects.nonNull(ytdFormulaObj) && StringUtils.isNotEmpty((CharSequence)ytdFormulaObj.toString())) {
                String ytdFormula = ytdFormulaObj.toString();
                if (ytdFormula.toUpperCase().contains("MAX") || ytdFormula.toUpperCase().contains("AVG")) {
                    FormulaUtil formulaUtil = new FormulaUtil();
                    KPIFormula kpiFormula = new KPIFormula();
                    kpiFormula.setFormula(ytdFormulaObj.toString());
                    FormulaBuilder builder = formulaUtil.extractFormulaExpression(kpiFormula, null);
                    if (CollectionUtils.isNotEmpty((Collection)builder.getNodeKeyList())) {
                        List nodeKeyList = builder.getNodeKeyList().stream().map(nodeKey -> this.kpiService.lookupNodeKey(nodeKey)).collect(Collectors.toList());
                        kpiCriteria.setNodeKeyList(nodeKeyList);
                        String type = ytdFormula.toUpperCase().contains("AVG") ? "Percentage" : "Number";
                        kpiCriteria.setKpiType(type);
                        finalValue = flagtype.equalsIgnoreCase("subkpi") ? this.applyYTDByQuery(null, subkpidto, flagtype, kpiCriteria, empId) : this.applyYTDByQuery(kpiObj, null, "kpi", kpiCriteria, empId);
                    }
                } else {
                    kpiCriteria.setRetrieveYTD(true);
                    HashMap subMap = new HashMap();
                    if (flagtype.equalsIgnoreCase("subkpi")) {
                        this.applyFormula(null, subkpidto, "subkpi", kpiCriteria, subMap);
                    } else {
                        this.applyFormula(kpiObj, null, "kpi", kpiCriteria, subMap);
                    }
                    if (subMap.get("actual") != null) {
                        String ytd = new BigDecimal(subMap.get("actual").toString()).setScale(2, RoundingMode.HALF_UP).toPlainString();
                        String dataType = Objects.nonNull(subMap.get("dataType")) ? subMap.get("dataType").toString() : "";
                        subMap.put("dataType", dataType);
                        boolean isPercentageType = "Percentage".equalsIgnoreCase(dataType);
                        finalValue = isPercentageType ? String.join((CharSequence)"", this.formatdecimal(new BigDecimal(ytd)), "%") : this.convertResult(new BigDecimal(ytd), subMap);
                    }
                }
            } else if (flagtype.equalsIgnoreCase("subkpi")) {
                if (StringUtils.isNotEmpty((CharSequence)subkpidto.getSubKpiId())) {
                    finalValue = this.applyYTDByQuery(null, subkpidto, flagtype, kpiCriteria, empId);
                }
            } else if (StringUtils.isNotEmpty((CharSequence)kpiObj.getKpiId())) {
                finalValue = this.applyYTDByQuery(kpiObj, null, "kpi", kpiCriteria, empId);
            }
        }
        return StringUtils.isNotEmpty(finalValue) ? finalValue : "0";
    }

    private String applyYTDByQuery(KPIDTO kpiObj, SubKPIDTO subkpidto, String flagtype, KPICriteria kpiCriteria, String empId) {
        List ytdList;
        String finalValue = null;
        String loggedInEmpId = null;
        CustomPerformance customPerformance = this.kpiService.findCustomPerformanceByOrgId();
        if (empId != null && !empId.equalsIgnoreCase("")) {
            loggedInEmpId = (String)UserThreadLocal.get().get("LOGGED_IN_EMPLOYEE_ID");
            if (empId.equalsIgnoreCase(loggedInEmpId)) {
                this.logger.debug("emp id and logged empId same");
            } else {
                loggedInEmpId = empId;
            }
        } else {
            loggedInEmpId = (String)UserThreadLocal.get().get("LOGGED_IN_EMPLOYEE_ID");
        }
        if (!customPerformance.isAggregation()) {
            kpiCriteria.setEmployeeIds(Arrays.asList(loggedInEmpId));
        } else if (customPerformance.isCustomAggregation() && customPerformance.isAggregation()) {
            List<Object> employeeIds = StringUtils.isNotEmpty((CharSequence)kpiCriteria.getCustomReportees()) ? Arrays.asList(loggedInEmpId, kpiCriteria.getCustomReportees()) : Arrays.asList(loggedInEmpId);
            kpiCriteria.setEmployeeIds(employeeIds);
            if (flagtype.equalsIgnoreCase("subkpi")) {
                kpiCriteria.setDeptReportee(subkpidto.getCustomReportees());
            } else {
                kpiCriteria.setDeptReportee(kpiObj.getCustomReportees());
            }
        } else if (StringUtils.isNotEmpty((CharSequence)((CharSequence)UserThreadLocal.get().get("ALL_REPORTEE_ID")))) {
            kpiCriteria.setEmployeeIds(Arrays.asList(UserThreadLocal.get().get("ALL_REPORTEE_ID")));
        }
        String dataType = null;
        if (flagtype.equalsIgnoreCase("subkpi")) {
            kpiCriteria.setMetricCode(subkpidto.getSubKpiId());
            dataType = Objects.nonNull(subkpidto.getSubKpiValue().get("dataType")) ? subkpidto.getSubKpiValue().get("dataType").toString() : "";
        } else {
            kpiCriteria.setMetricCode(kpiObj.getKpiId());
            dataType = Objects.nonNull(kpiObj.getKpiValue().get("dataType")) ? kpiObj.getKpiValue().get("dataType").toString() : "";
        }
        kpiCriteria.setRetrieveYTD(true);
        if (StringUtils.isEmpty((CharSequence)kpiCriteria.getKpiType())) {
            kpiCriteria.setKpiType(dataType);
        }
        if (CollectionUtils.isNotEmpty((Collection)(ytdList = this.kpiService.retrieveOrgKPIDetails(kpiCriteria))) && ((Map)ytdList.get(0)).get("YTD") != null) {
            Map subMap = (Map)ytdList.get(0);
            String ytd = new BigDecimal(subMap.get("YTD").toString()).setScale(2, RoundingMode.HALF_UP).toPlainString();
            if (StringUtils.isEmpty((CharSequence)dataType)) {
                dataType = Objects.nonNull(subMap.get("type")) ? subMap.get("type").toString() : "";
            }
            subMap.put("dataType", dataType);
            boolean isPercentageType = "Percentage".equalsIgnoreCase(dataType);
            finalValue = isPercentageType ? String.join((CharSequence)"", this.formatdecimal(new BigDecimal(ytd)), "%") : this.convertResult(new BigDecimal(ytd), subMap);
        }
        return finalValue;
    }

    private Map<String, String> retrieveAnnualTarget(String period, KPIDTO kpiObj) {
        KPICriteria kpiCriteria = new KPICriteria();
        HashMap annualTarget = null;
        SimpleDateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy");
        Date periodEndDate = null;
        Date periodStartDate = null;
        try {
            periodStartDate = dateFormat.parse(period.split("\\-")[0].trim());
            periodEndDate = dateFormat.parse(period.split("\\-")[1].trim());
        }
        catch (ParseException e) {
            throw new RuntimeException(e);
        }
        kpiCriteria.setKpiId(kpiObj.getId());
        kpiCriteria.getRealDates().add(periodStartDate);
        kpiCriteria.getRealDates().add(periodEndDate);
        kpiCriteria.setRetrieveKpiTarget(true);
        List targetList = this.kpiService.retrieveOrgKPIDetails(kpiCriteria);
        if (CollectionUtils.isNotEmpty((Collection)targetList) && ((Map)targetList.get(0)).get("target") != null) {
            annualTarget = new HashMap<String, String>();
            Map subMap = (Map)targetList.get(0);
            String target = new BigDecimal(subMap.get("target").toString()).setScale(2, RoundingMode.HALF_UP).toPlainString();
            String dataType = Objects.nonNull(kpiObj.getKpiValue().get("dataType")) ? kpiObj.getKpiValue().get("dataType").toString() : "";
            boolean isPercentageType = "Percentage".equalsIgnoreCase(dataType);
            if (StringUtils.isEmpty((CharSequence)dataType)) {
                dataType = Objects.nonNull(subMap.get("TYPE")) ? subMap.get("TYPE").toString() : "";
            }
            subMap.put("dataType", dataType);
            String finalValue = isPercentageType ? String.join((CharSequence)"", this.formatdecimal(new BigDecimal(target)), "%") : this.convertResult(new BigDecimal(target), subMap);
            String globalCurrency = this.getGlobalCurrency();
            String currencyObj = kpiObj.getKpiValue().get("kpiCurrency") != null ? kpiObj.getKpiValue().get("kpiCurrency").toString() : globalCurrency;
            annualTarget.put("target", finalValue);
            currencyObj = "Currency".equalsIgnoreCase(dataType) ? currencyObj : "";
            annualTarget.put("currency", currencyObj);
        }
        return annualTarget;
    }

    public String[] QuarterSort(String[] input) {
        String temp = "0";
        HashMap dateval = new HashMap();
        dateval.put("Q1", "01-01-");
        dateval.put("Q2", "01-03-");
        dateval.put("Q3", "01-06-");
        dateval.put("Q4", "01-09-");
        for (int i = 0; i < input.length; ++i) {
            for (int j = 0; j < input.length - 1; ++j) {
                String temp2;
                String temp1 = input[j + 1];
                if (temp1.split(" ").length > 0) {
                    temp1 = (String)dateval.get(temp1.split(" ")[0]) + temp1.split(" ")[1];
                }
                if ((temp2 = input[j]).split(" ").length > 0) {
                    temp2 = (String)dateval.get(temp2.split(" ")[0]) + temp2.split(" ")[1];
                }
                try {
                    Date date1 = new SimpleDateFormat("dd-MM-yyyy").parse(temp1);
                    Date date2 = new SimpleDateFormat("dd-MM-yyyy").parse(temp2);
                    if (date1.compareTo(date2) != -1) continue;
                    temp = input[j + 1];
                    input[j + 1] = input[j];
                    input[j] = temp;
                    continue;
                }
                catch (ParseException e) {
                    e.printStackTrace();
                }
            }
        }
        return input;
    }

    public Map<String, Object> getKpiTableData(KPICriteria kpiCriteria, KPICriteriaDTO criteriaDTO, KPIDTO kpiObj, SubKPIDTO subkpidto, String flagtype, boolean cockpit) {
        boolean subkpi = false;
        if (flagtype.equalsIgnoreCase("subkpi")) {
            subkpi = true;
        }
        String deptId = null;
        deptId = subkpi ? this.kpiService.getKpiDeptId(Long.valueOf(subkpidto.getId())) : this.kpiService.getKpiDeptId(Long.valueOf(kpiObj.getId()));
        System.out.println("dept --1 -- : " + deptId);
        if (Objects.nonNull(criteriaDTO.getDepartmentId()) && criteriaDTO.getDepartmentId().equals("0")) {
            deptId = criteriaDTO.getDepartmentId();
        }
        System.out.println("dept --2 -- : " + deptId);
        if (Objects.nonNull(deptId) && !deptId.equals("0")) {
            kpiCriteria.setDepartmentId(Long.parseLong(deptId));
        } else {
            deptId = String.valueOf(this.kpiService.getDeptId(Long.valueOf(Long.parseLong((String)UserThreadLocal.get().get("LOGGED_IN_EMPLOYEE_ID")))));
            kpiCriteria.setDepartmentId(Long.parseLong(deptId));
        }
        System.out.println();
        System.out.println("Department Id in Kpi Services ::  " + deptId + " ::: " + (String)UserThreadLocal.get().get("LOGGED_IN_DEPT_ID"));
        String period = criteriaDTO.getPeriod();
        String frequency = criteriaDTO.getFrequency();
        if (cockpit) {
            frequency = subkpi ? subkpidto.getSubKpiValue().get("kpi_measurement").toString() : kpiObj.getKpiValue().get("kpi_measurement").toString();
        }
        String kpiFrequency = "";
        if (subkpi) {
            if (subkpidto.getSubKpiValue().get("kpi_measurement") != null) {
                kpiFrequency = subkpidto.getSubKpiValue().get("kpi_measurement").toString();
            }
        } else if (kpiObj.getKpiValue().get("kpi_measurement") != null) {
            kpiFrequency = kpiObj.getKpiValue().get("kpi_measurement").toString();
        }
        if (!kpiFrequency.equalsIgnoreCase(frequency) && frequency.equals("monthly")) {
            frequency = kpiFrequency;
            kpiCriteria.setMonthlyBreakDown(true);
        }
        frequency = frequency != null ? frequency.replaceAll(" ", "") : "";
        SimpleDateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy");
        Date periodEndDate = null;
        Date periodStartDate = null;
        try {
            periodStartDate = dateFormat.parse(period.split("\\-")[0].trim());
            periodEndDate = dateFormat.parse(period.split("\\-")[1].trim());
        }
        catch (ParseException e) {
            throw new RuntimeException(e);
        }
        CustomPerformance customPerformance = this.kpiService.findCustomPerformanceByOrgId();
        String loggedInEmpId = (String)UserThreadLocal.get().get("LOGGED_IN_EMPLOYEE_ID");
        if (kpiCriteria != null && !customPerformance.isAggregation()) {
            kpiCriteria.setEmployeeIds(Arrays.asList(loggedInEmpId));
        } else if (kpiCriteria != null && customPerformance.isCustomAggregation()) {
            List<Object> employeeIds = StringUtils.isNotEmpty((CharSequence)kpiCriteria.getCustomReportees()) ? Arrays.asList(loggedInEmpId, kpiCriteria.getCustomReportees()) : Arrays.asList(loggedInEmpId);
            kpiCriteria.setEmployeeIds(employeeIds);
            if (subkpi) {
                kpiCriteria.setDeptReportee(subkpidto.getCustomReportees());
            } else {
                kpiCriteria.setDeptReportee(kpiObj.getCustomReportees());
            }
        } else if (StringUtils.isNotEmpty((CharSequence)((CharSequence)UserThreadLocal.get().get("ALL_REPORTEE_ID")))) {
            kpiCriteria.setEmployeeIds(Arrays.asList(UserThreadLocal.get().get("ALL_REPORTEE_ID")));
        }
        try {
            List<String> periodout;
            LinkedHashMap<String, Map<String, Object>> finalresult;
            String finalFreqValue = null;
            finalFreqValue = this.freqFunction.test(frequency, quarterFrequency) ? "Quarterly" : (this.freqFunction.test(frequency, halfYearFrequency) || frequency.toLowerCase().contains("half") ? "HalfYearly" : (frequency.equalsIgnoreCase("Monthly") ? "Monthly" : (frequency.equalsIgnoreCase("Yearly") || frequency.equalsIgnoreCase("Annually") || frequency.equalsIgnoreCase("Annual") ? "Yearly" : "Monthly")));
            Map periodMap = this.dateUtil.populatePeriod(periodStartDate, periodEndDate, finalFreqValue);
            for (String key : (java.util.Set<String>)periodMap.keySet()) {
                List periodList = (List)periodMap.get(key);
                kpiCriteria.setRealDates(periodList);
                kpiCriteria.setGroupBy(criteriaDTO.getGroupBy());
                kpiCriteria.setDeptName(criteriaDTO.getDeptName());
                kpiCriteria.setResponseGroupBy(criteriaDTO.getResponseGroupBy());
                kpiCriteria.setResponseKey(key);
                kpiCriteria.setOriginOrg(criteriaDTO.getOriginOrg());
                kpiCriteria.setTableType(criteriaDTO.getTableType());
                if (subkpi) {
                    this.applyFormulaForBreakDown(null, subkpidto, flagtype, kpiCriteria);
                    continue;
                }
                this.applyFormulaForBreakDown(kpiObj, null, "kpi", kpiCriteria);
            }
            HashMap<String, Object> resultMap = new HashMap<String, Object>();
            resultMap.put("actual", "-");
            resultMap.put("score", "-");
            resultMap.put("dataType", "-");
            resultMap.put("gap", "-");
            resultMap.put("currency", "-");
            resultMap.put("gapStatus", "fas fa-arrow-down");
            resultMap.put("target", "-");
            resultMap.put("contribution", "-");
            HashMap<String, KPIElementDTO> masterlist = new HashMap<String, KPIElementDTO>();
            HashMap<String, DepartmentChartDTO> departmentmasterlist = new HashMap<String, DepartmentChartDTO>();
            if (kpiCriteria.getGroupBy() != null && kpiCriteria.getGroupBy().equals("Measure")) {
                List kpiElementDTOs = null;
                kpiElementDTOs = subkpi ? (List)this.kpiService.kpiElementsDto(subkpidto.getId()).getBody() : (List)this.kpiService.kpiElementsDto(kpiObj.getId()).getBody();
                if (kpiElementDTOs != null && kpiElementDTOs.size() > 0) {
                    for (KPIElementDTO kpielem : (java.util.List<KPIElementDTO>)kpiElementDTOs) {
                        masterlist.put(kpielem.getMeasureName(), kpielem);
                    }
                }
            } else if (kpiCriteria.getGroupBy() != null && kpiCriteria.getGroupBy().equals("Dept") && cockpit) {
                System.out.println("############");
                System.out.println("KPI CHECK " + kpiCriteria.getGroupBy());
                System.out.println("############");
                System.out.println("############");
                if (kpiCriteria.getDeptName() != null && kpiCriteria.getDeptName().contains("-")) {
                    String[] dept = kpiCriteria.getDeptName().split("-");
                    List departmentChartDTOs = (List)this.kpiService.deptimmediatereportees(Long.parseLong(dept[1])).getBody();
                    if (departmentChartDTOs != null && departmentChartDTOs.size() > 0) {
                        java.util.Iterator<DepartmentChartDTO> kpielem = ((java.util.List<DepartmentChartDTO>)departmentChartDTOs).iterator();
                        while (kpielem.hasNext()) {
                            DepartmentChartDTO departmentChartDTO = kpielem.next();
                            departmentmasterlist.put(departmentChartDTO.getDeptName() + "-" + departmentChartDTO.getDeptId(), departmentChartDTO);
                        }
                    }
                } else {
                    List departmentChartDTOs = (List)this.kpiService.deptimmediatereportees(kpiCriteria.getDepartmentId()).getBody();
                    if (departmentChartDTOs != null && departmentChartDTOs.size() > 0) {
                        for (DepartmentChartDTO departmentChartDTO : (java.util.List<DepartmentChartDTO>)departmentChartDTOs) {
                            if (kpiCriteria.getDepartmentId() != departmentChartDTO.getDeptId().longValue()) continue;
                            departmentmasterlist.put(departmentChartDTO.getDeptName() + "-" + departmentChartDTO.getDeptId(), departmentChartDTO);
                        }
                    }
                }
            }
            System.out.println("#######################");
            System.out.println("   Department detail   " + kpiCriteria.getResponseObject().keySet());
            System.out.println("#######################");
            for (String Department : kpiCriteria.getResponseObject().keySet()) {
                System.out.println("#######################");
                System.out.println("#######################");
                System.out.println("   Department   " + Department);
                System.out.println("#######################");
                System.out.println("#######################");
                System.out.println("#######################");
                resultMap = new HashMap();
                resultMap.put("actual", "-");
                resultMap.put("score", "-");
                resultMap.put("dataType", "-");
                resultMap.put("gap", "-");
                resultMap.put("currency", "-");
                resultMap.put("gapStatus", "fas fa-arrow-down");
                resultMap.put("target", "-");
                resultMap.put("contribution", "-");
                finalresult = new LinkedHashMap();
                Map resultdata = (Map)kpiCriteria.getResponseObject().get(Department);
                for (String key : (java.util.Set<String>)periodMap.keySet()) {
                    List periodout2 = new ArrayList<String>();
                    if (!finalFreqValue.equals("Monthly") && cockpit) {
                        periodout2 = this.monthsplit(key, finalFreqValue, periodStartDate, periodEndDate);
                    } else {
                        periodout2.add(key);
                    }
                    if (resultdata == null || resultdata.size() <= 0) continue;
                    for (String period_val : (java.util.List<String>)periodout2) {
                        if (resultdata.get(key) == null) {
                            if (kpiCriteria.getGroupBy().equals("Measure")) {
                                resultMap.put("nodeKey", String.valueOf(((KPIElementDTO)masterlist.get(Department)).getNodeKey()));
                                resultMap.put("measureKey", String.valueOf(((KPIElementDTO)masterlist.get(Department)).getMeasureKey()));
                                resultMap.put("measureType", ((KPIElementDTO)masterlist.get(Department)).getMeasureType());
                                if (subkpi) {
                                    resultMap.put("kpi", subkpidto.getId());
                                    resultMap.put("contribution", subkpidto.getSubKpiValue().get("contribution").toString());
                                } else {
                                    resultMap.put("kpi", kpiObj.getId());
                                    resultMap.put("contribution", kpiObj.getKpiValue().get("contribution").toString());
                                }
                                resultMap.put("kpistatus", "RED");
                            }
                            finalresult.put(period_val, resultMap);
                            continue;
                        }
                        Map<String, String> resultMap_update = new HashMap();
                        resultMap_update = (Map)resultdata.get(key);
                        String actualvalue = "-";
                        String targetvalue = "-";
                        String contributionvalue = "-";
                        if (Objects.nonNull(resultMap_update.get("actual"))) {
                            actualvalue = resultMap_update.get("actual").toString().replace("%", "");
                        } else {
                            resultMap_update.put("actual", "-");
                        }
                        if (Objects.nonNull(resultMap_update.get("target"))) {
                            targetvalue = resultMap_update.get("target").toString().replace("%", "");
                        } else {
                            resultMap_update.put("target", "-");
                        }
                        if (subkpi) {
                            if (subkpidto != null && subkpidto.getSubKpiValue() != null) {
                                String subkpiContribution = this.getContrbutionValue(kpiObj, Department);
                                subkpidto.getSubKpiValue().put("aggregateContribution", subkpiContribution);
                                resultMap_update.put("contribution", subkpiContribution);
                            }
                        } else if (kpiObj.getKpiValue() != null) {
                            String kpiContribution = this.getContrbutionValue(kpiObj, Department);
                            kpiObj.getKpiValue().put("aggregateContribution", kpiContribution);
                            resultMap_update.put("contribution", kpiContribution);
                        }
                        String score = null;
                        String statusflag = null;
                        if (subkpi) {
                            score = this.applyKPICustomThreshold(subkpidto, actualvalue, targetvalue);
                            statusflag = this.buildKPIStatusLightTable(null, subkpidto, flagtype, actualvalue, targetvalue, score);
                        } else {
                            score = this.applyKPICustomThreshold(kpiObj, actualvalue, targetvalue);
                            statusflag = this.buildKPIStatusLightTable(kpiObj, null, "kpi", actualvalue, targetvalue, score);
                        }
                        resultMap_update.put("score", score);
                        resultMap_update.put("kpistatus", statusflag);
                        finalresult.put(period_val, (java.util.Map)resultMap_update);
                    }
                }
                if (kpiCriteria.getGroupBy().equals("Measure")) {
                    if (masterlist.get(Department) != null) {
                        masterlist.remove(Department);
                    }
                } else if (kpiCriteria.getGroupBy().equals("Dept") && departmentmasterlist.get(Department) != null) {
                    departmentmasterlist.remove(Department);
                }
                kpiCriteria.getResponseObject().put(Department, finalresult);
            }
            if (kpiCriteria.getGroupBy().equals("Measure")) {
                for (String Department : masterlist.keySet()) {
                    if (((KPIElementDTO)masterlist.get(Department)).getMeasureType() == 1) continue;
                    finalresult = new LinkedHashMap<String, Map<String, Object>>();
                    resultMap = new HashMap();
                    resultMap.put("actual", "-");
                    resultMap.put("score", "-");
                    resultMap.put("dataType", "-");
                    resultMap.put("gap", "-");
                    resultMap.put("currency", "-");
                    resultMap.put("gapStatus", "fas fa-arrow-down");
                    resultMap.put("target", "-");
                    resultMap.put("contribution", "-");
                    for (String key : (java.util.Set<String>)periodMap.keySet()) {
                        periodout = new ArrayList<String>();
                        if (!finalFreqValue.equals("Monthly") && cockpit) {
                            periodout = this.monthsplit(key, finalFreqValue, periodStartDate, periodEndDate);
                        } else {
                            periodout.add(key);
                        }
                        for (String period_val : periodout) {
                            resultMap.put("nodeKey", String.valueOf(((KPIElementDTO)masterlist.get(Department)).getNodeKey()));
                            resultMap.put("measureKey", String.valueOf(((KPIElementDTO)masterlist.get(Department)).getMeasureKey()));
                            resultMap.put("measureType", ((KPIElementDTO)masterlist.get(Department)).getMeasureType());
                            if (subkpi) {
                                resultMap.put("kpi", subkpidto.getId());
                                resultMap.put("contribution", subkpidto.getSubKpiValue().get("contribution").toString());
                            } else {
                                resultMap.put("kpi", kpiObj.getId());
                                resultMap.put("contribution", kpiObj.getKpiValue().get("contribution").toString());
                            }
                            resultMap.put("kpistatus", "RED");
                            finalresult.put(period_val, resultMap);
                        }
                    }
                    kpiCriteria.getResponseObject().put(Department, finalresult);
                }
            } else if (kpiCriteria.getGroupBy().equals("Dept") && cockpit) {
                resultMap = new HashMap();
                resultMap.put("actual", "-");
                resultMap.put("score", "-");
                resultMap.put("dataType", "-");
                resultMap.put("gap", "-");
                resultMap.put("currency", "-");
                resultMap.put("gapStatus", "fas fa-arrow-down");
                resultMap.put("target", "-");
                resultMap.put("contribution", "-");
                for (String Department : departmentmasterlist.keySet()) {
                    finalresult = new LinkedHashMap();
                    for (String key : (java.util.Set<String>)periodMap.keySet()) {
                        periodout = new ArrayList();
                        if (!finalFreqValue.equals("Monthly") && cockpit) {
                            periodout = this.monthsplit(key, finalFreqValue, periodStartDate, periodEndDate);
                        } else {
                            periodout.add(key);
                        }
                        for (String period_val : periodout) {
                            finalresult.put(period_val, resultMap);
                        }
                    }
                    kpiCriteria.getResponseObject().put(Department, finalresult);
                    System.out.println("-==> finalresult ;; " + finalresult);
                }
            }
        }
        catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
        System.out.println("-==> kpiCriteria.getResponseObject() ;; " + kpiCriteria.getResponseObject());
        return kpiCriteria.getResponseObject();
    }

    private void setDepartmentId(KPICriteria kpiCriteria, KPIDTO kpiObj) {
        String deptId = this.kpiService.getKpiDeptId(Long.valueOf(kpiObj.getId()));
        if (Objects.nonNull(deptId) && !"0".equals(deptId)) {
            kpiCriteria.setDepartmentId(Long.parseLong(deptId));
        } else {
            deptId = String.valueOf(this.kpiService.getDeptId(Long.valueOf(Long.parseLong((String)UserThreadLocal.get().get("LOGGED_IN_EMPLOYEE_ID")))));
            kpiCriteria.setDepartmentId(Long.parseLong(deptId));
        }
    }

    private String determineFrequency(KPICriteria kpiCriteria, KPICriteriaDTO criteriaDTO, KPIDTO kpiObj, boolean cockpit) {
        String kpiFrequency;
        String frequency = criteriaDTO.getFrequency();
        if (cockpit) {
            frequency = kpiObj.getKpiValue().get("kpi_measurement").toString();
        }
        if (!(kpiFrequency = kpiObj.getKpiValue().getOrDefault("kpi_measurement", "").toString()).equalsIgnoreCase(frequency) && "monthly".equalsIgnoreCase(frequency)) {
            kpiCriteria.setMonthlyBreakDown(true);
            return kpiFrequency;
        }
        return frequency != null ? frequency.replaceAll(" ", "") : "";
    }

    private Date parseDate(String period, int index) {
        try {
            return new SimpleDateFormat("MM/dd/yyyy").parse(period.split("-")[index].trim());
        }
        catch (ParseException e) {
            throw new RuntimeException(e);
        }
    }

    private void setEmployeeIds(KPICriteria kpiCriteria, CustomPerformance customPerformance, KPIDTO kpiObj) {
        String loggedInEmpId = (String)UserThreadLocal.get().get("LOGGED_IN_EMPLOYEE_ID");
        if (!customPerformance.isAggregation()) {
            kpiCriteria.setEmployeeIds(Arrays.asList(loggedInEmpId));
        } else if (customPerformance.isCustomAggregation()) {
            List<Object> employeeIds = Arrays.asList(loggedInEmpId, kpiCriteria.getCustomReportees());
            kpiCriteria.setEmployeeIds(employeeIds);
            kpiCriteria.setDeptReportee(kpiObj.getCustomReportees());
        } else if (StringUtils.isNotEmpty((CharSequence)((CharSequence)UserThreadLocal.get().get("ALL_REPORTEE_ID")))) {
            kpiCriteria.setEmployeeIds(Arrays.asList(UserThreadLocal.get().get("ALL_REPORTEE_ID")));
        }
    }

    private String getFinalFrequencyValue(String frequency) {
        if (this.freqFunction.test(frequency, quarterFrequency)) {
            return "Quarterly";
        }
        if (this.freqFunction.test(frequency, halfYearFrequency) || frequency.toLowerCase().contains("half")) {
            return "HalfYearly";
        }
        if ("Monthly".equalsIgnoreCase(frequency)) {
            return "Monthly";
        }
        if ("Yearly".equalsIgnoreCase(frequency) || "Annually".equalsIgnoreCase(frequency)) {
            return "Yearly";
        }
        return "Monthly";
    }

    private Map<String, Object> initializeResultMap() {
        HashMap<String, Object> resultMap = new HashMap<String, Object>();
        resultMap.put("actual", "-");
        resultMap.put("score", "-");
        resultMap.put("dataType", "-");
        resultMap.put("gap", "-");
        resultMap.put("currency", "-");
        resultMap.put("gapStatus", "fas fa-arrow-down");
        resultMap.put("target", "-");
        return resultMap;
    }

    private void populateGroupSpecificData(KPICriteria kpiCriteria, KPIDTO kpiObj, boolean cockpit, Map<String, KPIElementDTO> masterlist, Map<String, DepartmentChartDTO> departmentmasterlist) {
        block4: {
            List departmentChartDTOs;
            block3: {
                if (!"Measure".equals(kpiCriteria.getGroupBy())) break block3;
                List kpiElementDTOs = (List)this.kpiService.kpiElementsDto(kpiObj.getId()).getBody();
                if (kpiElementDTOs == null) break block4;
                for (KPIElementDTO elem : (java.util.List<KPIElementDTO>)kpiElementDTOs) {
                    masterlist.put(elem.getMeasureName(), elem);
                }
                break block4;
            }
            if ("Dept".equals(kpiCriteria.getGroupBy()) && cockpit && (departmentChartDTOs = (List)this.kpiService.deptimmediatereportees(kpiCriteria.getDepartmentId()).getBody()) != null) {
                for (DepartmentChartDTO dept : (java.util.List<DepartmentChartDTO>)departmentChartDTOs) {
                    departmentmasterlist.put(dept.getDeptName() + "-" + dept.getDeptId(), dept);
                }
            }
        }
    }

    private void processPeriodMap(KPICriteria kpiCriteria, Map<String, Object> periodMap, String finalFreqValue, Date periodStartDate, Date periodEndDate, boolean cockpit, Map<String, KPIElementDTO> masterlist, Map<String, DepartmentChartDTO> departmentmasterlist, Map<String, Object> resultMap, KPIDTO kpiObj) {
        for (String department : kpiCriteria.getResponseObject().keySet()) {
            resultMap = this.initializeResultMap();
            LinkedHashMap<String, Map> finalResult = new LinkedHashMap<String, Map>();
            Map resultData = (Map)kpiCriteria.getResponseObject().get(department);
            for (String key : periodMap.keySet()) {
                List periodOut = !finalFreqValue.equals("Monthly") && cockpit ? this.monthsplit(key, finalFreqValue, periodStartDate, periodEndDate) : Arrays.asList(key);
                for (String periodVal : (java.util.List<String>)periodOut) {
                    if (resultData != null && resultData.get(key) != null) {
                        Map resultMapUpdate = (Map)resultData.get(key);
                        String actualValue = Objects.toString(resultMapUpdate.get("actual"), "-").replace("%", "");
                        String targetValue = Objects.toString(resultMapUpdate.get("target"), "-").replace("%", "");
                        String score = this.applyKPICustomThreshold(kpiObj, actualValue, targetValue);
                        String statusFlag = this.buildKPIStatusLightTable(kpiObj, null, "kpi", actualValue, targetValue, score);
                        resultMapUpdate.put("score", score);
                        resultMapUpdate.put("kpistatus", statusFlag);
                        finalResult.put(periodVal, resultMapUpdate);
                        continue;
                    }
                    finalResult.put(periodVal, resultMap);
                }
            }
            if ("Measure".equals(kpiCriteria.getGroupBy())) {
                masterlist.remove(department);
            } else if ("Dept".equals(kpiCriteria.getGroupBy())) {
                departmentmasterlist.remove(department);
            }
            kpiCriteria.getResponseObject().put(department, finalResult);
        }
    }

    private List<String> monthsplit(String input, String frequency, Date StartDate, Date EndDate) {
        ArrayList<String> period;
        block6: {
            String[] months;
            String[] yearmap;
            int endMonth;
            int startMonth;
            block7: {
                block5: {
                    period = new ArrayList<String>();
                    Calendar startCal = Calendar.getInstance();
                    startCal.setTime(StartDate);
                    startMonth = startCal.get(2);
                    int startYear = startCal.get(1);
                    Calendar endCal = Calendar.getInstance();
                    endCal.setTime(EndDate);
                    endMonth = endCal.get(2);
                    int endYear = endCal.get(1);
                    yearmap = input.split(" ");
                    months = new String[]{"JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"};
                    if (!frequency.equals("Yearly")) break block5;
                    for (int i = startMonth; i <= endMonth; ++i) {
                        period.add(months[i] + " " + yearmap[0]);
                    }
                    break block6;
                }
                if (!frequency.equals("Quarterly")) break block7;
                String[][] quarters = new String[][]{{"JAN", "FEB", "MAR"}, {"APR", "MAY", "JUN"}, {"JUL", "AUG", "SEP"}, {"OCT", "NOV", "DEC"}};
                for (int i = 0; i < quarters.length; ++i) {
                    if (!input.contains("Q" + (i + 1))) continue;
                    for (String month : quarters[i]) {
                        int monthIndex = Arrays.asList(months).indexOf(month);
                        if (monthIndex < startMonth || monthIndex > endMonth) continue;
                        period.add(month + " " + yearmap[1]);
                    }
                }
                break block6;
            }
            if (!frequency.equals("HalfYearly")) break block6;
            String[][] halves = new String[][]{{"JAN", "FEB", "MAR", "APR", "MAY", "JUN"}, {"JUL", "AUG", "SEP", "OCT", "NOV", "DEC"}};
            for (int i = 0; i < halves.length; ++i) {
                if (!input.contains("H" + (i + 1))) continue;
                for (String month : halves[i]) {
                    int monthIndex = Arrays.asList(months).indexOf(month);
                    if (monthIndex < startMonth || monthIndex > endMonth) continue;
                    period.add(month + " " + yearmap[1]);
                }
            }
        }
        return period;
    }

    private Map<String, Object> populateMonthlyBreakdown(KPICriteria kpiCriteria, int fragment, String currentKey) {
        for (String key : kpiCriteria.getResponseObject().keySet()) {
            Map responseObject = (Map)kpiCriteria.getResponseObject().get(key);
            HashMap resultMap = new HashMap();
            if (responseObject.get(kpiCriteria.getResponseKey()) == null) {
                responseObject.put(currentKey, responseObject.get(kpiCriteria.getPreviousKey()));
                continue;
            }
            Map actualMap = (Map)responseObject.get(kpiCriteria.getResponseKey());
            boolean addPercent = actualMap.get("actual").toString().contains("%");
            BigDecimal actual = new BigDecimal(actualMap.get("actual").toString().replaceAll("%", ""));
            BigDecimal target = Objects.nonNull(actualMap.get("target")) ? new BigDecimal(actualMap.get("target").toString().replaceAll("%", "")) : new BigDecimal("0");
            BigDecimal gap = Objects.nonNull(actualMap.get("gap")) ? new BigDecimal(actualMap.get("gap").toString().replaceAll("%", "")) : new BigDecimal("0");
            BigDecimal calculatedActual = actual.doubleValue() != 0.0 ? actual.divide(new BigDecimal(fragment), 2, RoundingMode.HALF_DOWN) : actual;
            BigDecimal calculatedTarget = target.doubleValue() != 0.0 ? target.divide(new BigDecimal(fragment), 2, RoundingMode.HALF_DOWN) : target;
            BigDecimal calculatedGap = gap.doubleValue() != 0.0 ? gap.divide(new BigDecimal(fragment), 2, RoundingMode.HALF_DOWN) : gap;
            resultMap.put("actual", addPercent ? String.join((CharSequence)"", this.formatdecimal(calculatedActual), "%") : this.convertResult(calculatedActual, actualMap));
            resultMap.put("target", addPercent ? String.join((CharSequence)"", this.formatdecimal(calculatedTarget), "%") : this.convertResult(calculatedTarget, actualMap));
            resultMap.put("gap", addPercent ? String.join((CharSequence)"", this.formatdecimal(calculatedGap), "%") : this.convertResult(calculatedGap, actualMap));
            resultMap.put("dataType", actualMap.get("dataType").toString());
            resultMap.put("currency", Objects.nonNull(actualMap.get("currency")) ? actualMap.get("currency").toString() : "");
            responseObject.put(currentKey, resultMap);
            kpiCriteria.setPreviousKey(currentKey);
            responseObject.remove(kpiCriteria.getResponseKey());
        }
        return kpiCriteria.getResponseObject();
    }

    public void applyFormula(KPIDTO kpidto, SubKPIDTO subkpidto, String flagtype, KPICriteria kpiCriteria, Map<String, Object> subMap) {
        String ytdFormula;
        FormulaBuilder formulaBuilder = null;
        FormulaUtil formulaUtil = new FormulaUtil();
        KPIFormula kpiFormula = null;
        if (kpiCriteria.isRetrieveYTD()) {
            kpiFormula = new KPIFormula();
            ytdFormula = flagtype.equalsIgnoreCase("subkpi") ? (subkpidto.getSubKpiValue().get("ytdFormula") != null ? subkpidto.getSubKpiValue().get("ytdFormula").toString() : "") : (kpidto.getKpiValue().get("ytdFormula") != null ? kpidto.getKpiValue().get("ytdFormula").toString() : "");
            kpiFormula.setFormula(ytdFormula);
        } else if (flagtype.equalsIgnoreCase("subkpi")) {
            if (subkpidto.getKpiFormula() != null) {
                kpiFormula = subkpidto.getKpiFormula();
            } else if (subkpidto.getSubKpiValue().get("ytdFormula") != null) {
                kpiFormula = new KPIFormula();
                ytdFormula = subkpidto.getSubKpiValue().get("ytdFormula") != null ? subkpidto.getSubKpiValue().get("ytdFormula").toString() : "";
                kpiFormula.setFormula(ytdFormula);
            }
        } else if (kpidto.getKpiFormula() != null) {
            kpiFormula = kpidto.getKpiFormula();
        } else if (kpidto.getKpiValue().get("ytdFormula") != null) {
            kpiFormula = new KPIFormula();
            ytdFormula = kpidto.getKpiValue().get("ytdFormula") != null ? kpidto.getKpiValue().get("ytdFormula").toString() : "";
            kpiFormula.setFormula(ytdFormula);
        }
        if (flagtype.equalsIgnoreCase("subkpi")) {
            kpiCriteria.setIncludeReportees(subkpidto.isIncludeReportee());
            kpiCriteria.setCustomReportees(subkpidto.getCustomReportees());
        } else {
            kpiCriteria.setIncludeReportees(kpidto.isIncludeReportee());
            kpiCriteria.setCustomReportees(kpidto.getCustomReportees());
        }
        if (Objects.nonNull(kpiFormula) && StringUtils.isNotEmpty((CharSequence)kpiFormula.getFormula())) {
            formulaBuilder = formulaUtil.extractFormulaExpression(kpiFormula, kpiCriteria);
            KPICriteria kpiFormulaCriteria = formulaUtil.buildCriteria(formulaBuilder, null);
            if (kpiFormulaCriteria.getRealDates().isEmpty()) {
                kpiFormulaCriteria.setRealDates(kpiCriteria.getRealDates());
            }
            kpiFormulaCriteria.setEmpId(kpiCriteria.getEmpId());
            kpiFormulaCriteria.setGroupBy(kpiCriteria.getGroupBy());
            kpiFormulaCriteria.setOriginOrg(kpiCriteria.getOriginOrg());
            kpiFormulaCriteria.setDeptName(kpiCriteria.getDeptName());
            kpiFormulaCriteria.setDepartmentId(kpiCriteria.getDepartmentId());
            kpiFormulaCriteria.setDeptReportee(kpiCriteria.getDeptReportee());
            Map dataMap = null;
            if (flagtype.equalsIgnoreCase("subkpi")) {
                kpiFormulaCriteria.setMetricCode(subkpidto.getSubKpiId());
                this.log.info("1197 check expressionvalue subkpi methd  start timing: {} ", (Object)LocalDateTime.now());
                dataMap = this.getExpressionValue(formulaBuilder, kpiFormulaCriteria, formulaUtil, null, subkpidto, "subkpi");
                this.log.info("1199 check expressionvaluea subkpi end timing: {} ", (Object)LocalDateTime.now());
            } else {
                kpiFormulaCriteria.setMetricCode(kpidto.getKpiId());
                this.log.info("1202 check expressionValue subkpi methd  start timing: {} ", (Object)LocalDateTime.now());
                long startTime = System.currentTimeMillis();
                dataMap = this.getExpressionValue(formulaBuilder, kpiFormulaCriteria, formulaUtil, kpidto, null, "kpi");
                long endTime = System.currentTimeMillis();
                System.out.println("expression (1206) formula Name took: " + startTime + " | endTime::" + endTime + (endTime - startTime) + "ms");
                this.log.info("1204 check ExpressionValue subkpi end timing: {} ", (Object)LocalDateTime.now());
            }
            System.out.println("dataMap.get(\"actual\") = " + dataMap.get("actual"));
            System.out.println("dataMap.get(\"target\") = " + dataMap.get("target"));
            if (dataMap.get("actual") != null) {
                subMap.put("actual", dataMap.get("actual"));
            }
            subMap.put("target", dataMap.get("target"));
            subMap.put("dataType", dataMap.get("dataType"));
            subMap.put("currency", Objects.nonNull(dataMap.get("currency")) ? dataMap.get("currency").toString() : "");
            if (Objects.nonNull(dataMap.get("actualThreshold"))) {
                if (!dataMap.get("actualThreshold").equals("0.00") && subMap.get("actualThreshold") != null) {
                    subMap.put("actualThreshold", dataMap.get("actualThreshold"));
                } else if (!dataMap.get("actualThreshold").equals("0.00")) {
                    subMap.put("actualThreshold", dataMap.get("actualThreshold"));
                }
            }
            if (Objects.nonNull(dataMap.get("targetThreshold"))) {
                if (!dataMap.get("targetThreshold").equals("0.00") && subMap.get("targetThreshold") != null) {
                    subMap.put("targetThreshold", dataMap.get("targetThreshold"));
                } else if (!dataMap.get("targetThreshold").equals("0.00")) {
                    subMap.put("targetThreshold", dataMap.get("targetThreshold"));
                }
            }
        } else if (StringUtils.isNotEmpty((CharSequence)((CharSequence)UserThreadLocal.get().get("DATE_PERIOD")))) {
            Map dataMap = null;
            if (flagtype.equalsIgnoreCase("subkpi")) {
                kpiCriteria.setMetricCode(subkpidto.getSubKpiId());
                dataMap = this.populateActualData(kpiCriteria, formulaUtil, null, subkpidto, "subkpi");
            } else {
                kpiCriteria.setMetricCode(kpidto.getKpiId());
                dataMap = this.populateActualData(kpiCriteria, formulaUtil, kpidto, null, "kpi");
            }
            if (Objects.nonNull(dataMap.get("actual"))) {
                subMap.put("actual", dataMap.get("actual"));
            }
            if (Objects.nonNull(dataMap.get("actualthreshold"))) {
                if (!dataMap.get("actualThreshold").equals("0.00") && subMap.get("actualthreshold") != null) {
                    subMap.put("actualThreshold", dataMap.get("actualThreshold"));
                } else if (!dataMap.get("actualThreshold").equals("0.00")) {
                    subMap.put("actualThreshold", dataMap.get("actualThreshold"));
                }
            }
            if (Objects.nonNull(dataMap.get("targetThreshold"))) {
                if (!dataMap.get("targetThreshold").equals("0.00") && subMap.get("targetThreshold") != null) {
                    subMap.put("targetThreshold", dataMap.get("targetThreshold"));
                } else if (!dataMap.get("targetThreshold").equals("0.00")) {
                    subMap.put("targetThreshold", dataMap.get("targetThreshold"));
                }
            }
            subMap.put("target", dataMap.get("target"));
            subMap.put("dataType", dataMap.get("dataType"));
            subMap.put("currency", Objects.nonNull(dataMap.get("currency")) ? dataMap.get("currency").toString() : "");
        }
    }

    public Map<String, Object> applyFormulaForBreakDown(KPIDTO kpidto, SubKPIDTO subkpidto, String flagtype, KPICriteria kpiCriteria) {
        FormulaBuilder formulaBuilder = null;
        FormulaUtil formulaUtil = new FormulaUtil();
        Map dataMap = null;
        if (flagtype.equalsIgnoreCase("subkpi")) {
            kpiCriteria.setIncludeReportees(subkpidto.isIncludeReportee());
            kpiCriteria.setCustomReportees(subkpidto.getCustomReportees());
            if (Objects.nonNull(subkpidto.getKpiFormula()) && StringUtils.isNotEmpty((CharSequence)subkpidto.getKpiFormula().getFormula())) {
                formulaBuilder = formulaUtil.extractFormulaExpression(subkpidto.getKpiFormula(), kpiCriteria);
                KPICriteria kpiFormulaCriteria = formulaUtil.buildCriteria(formulaBuilder, null);
                if (kpiFormulaCriteria.getRealDates().isEmpty()) {
                    kpiFormulaCriteria.setRealDates(kpiCriteria.getRealDates());
                }
                kpiFormulaCriteria.setResponseKey(kpiCriteria.getResponseKey());
                kpiFormulaCriteria.setResponseObject(kpiCriteria.getResponseObject());
                kpiFormulaCriteria.setMonthlyBreakDown(kpiCriteria.isMonthlyBreakDown());
                kpiFormulaCriteria.setMetricCode(subkpidto.getSubKpiId());
                kpiFormulaCriteria.setGroupBy(kpiCriteria.getGroupBy());
                kpiFormulaCriteria.setOriginOrg(kpiCriteria.getOriginOrg());
                kpiFormulaCriteria.setDeptName(kpiCriteria.getDeptName());
                kpiFormulaCriteria.setTableType(kpiCriteria.getTableType());
                kpiFormulaCriteria.setNodeKey(kpiCriteria.getNodeKey());
                kpiFormulaCriteria.setResponseGroupBy(kpiCriteria.getResponseGroupBy());
                kpiFormulaCriteria.setDepartmentId(kpiCriteria.getDepartmentId());
                dataMap = this.populateIndividualActualData(formulaBuilder, kpiFormulaCriteria, formulaUtil, null, subkpidto, "subkpi");
            } else if (StringUtils.isNotEmpty((CharSequence)((CharSequence)UserThreadLocal.get().get("DATE_PERIOD")))) {
                formulaBuilder = new FormulaBuilder();
                dataMap = this.populateIndividualActualData(formulaBuilder, kpiCriteria, formulaUtil, null, subkpidto, "subkpi");
            }
        } else {
            kpiCriteria.setIncludeReportees(kpidto.isIncludeReportee());
            kpiCriteria.setCustomReportees(kpidto.getCustomReportees());
            if (Objects.nonNull(kpidto.getKpiFormula()) && StringUtils.isNotEmpty((CharSequence)kpidto.getKpiFormula().getFormula())) {
                formulaBuilder = formulaUtil.extractFormulaExpression(kpidto.getKpiFormula(), kpiCriteria);
                KPICriteria kpiFormulaCriteria = formulaUtil.buildCriteria(formulaBuilder, null);
                if (kpiFormulaCriteria.getRealDates().isEmpty()) {
                    kpiFormulaCriteria.setRealDates(kpiCriteria.getRealDates());
                }
                kpiFormulaCriteria.setResponseKey(kpiCriteria.getResponseKey());
                kpiFormulaCriteria.setResponseObject(kpiCriteria.getResponseObject());
                kpiFormulaCriteria.setMonthlyBreakDown(kpiCriteria.isMonthlyBreakDown());
                kpiFormulaCriteria.setMetricCode(kpidto.getKpiId());
                kpiFormulaCriteria.setGroupBy(kpiCriteria.getGroupBy());
                kpiFormulaCriteria.setOriginOrg(kpiCriteria.getOriginOrg());
                kpiFormulaCriteria.setDeptName(kpiCriteria.getDeptName());
                kpiFormulaCriteria.setTableType(kpiCriteria.getTableType());
                kpiFormulaCriteria.setNodeKey(kpiCriteria.getNodeKey());
                kpiFormulaCriteria.setResponseGroupBy(kpiCriteria.getResponseGroupBy());
                kpiFormulaCriteria.setDepartmentId(kpiCriteria.getDepartmentId());
                dataMap = this.populateIndividualActualData(formulaBuilder, kpiFormulaCriteria, formulaUtil, kpidto, null, "kpi");
            } else if (StringUtils.isNotEmpty((CharSequence)((CharSequence)UserThreadLocal.get().get("DATE_PERIOD")))) {
                formulaBuilder = new FormulaBuilder();
                dataMap = this.populateIndividualActualData(formulaBuilder, kpiCriteria, formulaUtil, kpidto, null, "kpi");
            }
        }
        return dataMap;
    }

    public Map<String, Object> getExpressionValue(FormulaBuilder formulaBuilder, KPICriteria kpiCriteria, FormulaUtil formulaUtil, KPIDTO kpidto, SubKPIDTO subkpidto, String flagtype) {
        Object nodeKey2 = null;
        String rawExpression = formulaBuilder.getExpression();
        HashMap<String, Object> dataMap = new HashMap<String, Object>();
        String dataType = null;
        String currency = this.getGlobalCurrency();
        boolean actuallistempty = true;
        String exprRaw = rawExpression;
        String exprThreshold = rawExpression;
        String exprTargetRaw = rawExpression;
        String exprTargetThreshold = rawExpression;
        long totalforstartTime = System.currentTimeMillis();
        HashMap capturedUserCtx = UserThreadLocal.get() != null ? new HashMap(UserThreadLocal.get()) : new HashMap();
        HashMap capturedKpiCtx = new HashMap(KPIThreadLocal.get());
        Set nodeKeyList = formulaBuilder.getNodeKeyList();
        HashMap<Object, CompletableFuture<Object>> nodeKeyFutures = new HashMap<Object, CompletableFuture<Object>>();
        Map exprCache = (Map)KPIThreadLocal.get().get("exprCache");
        for (Object nodeKey3 : nodeKeyList) {
            KPICriteria localCriteria = this.cloneCriteria(kpiCriteria);
            String resolvedKey = this.kpiService.lookupNodeKey((String)nodeKey3);
            localCriteria.setNodeKey(resolvedKey);
            if (resolvedKey != null && this.checkType(resolvedKey)) {
                localCriteria.setMetricCode("");
            }
            String cacheKey = this.buildExprCacheKey(resolvedKey, localCriteria);
            if (exprCache != null && exprCache.containsKey(cacheKey)) {
                nodeKeyFutures.put(nodeKey2, CompletableFuture.completedFuture(exprCache.get(cacheKey)));
                continue;
            }
            nodeKeyFutures.put(nodeKey2, CompletableFuture.supplyAsync(() -> {
                UserThreadLocal.set((Map)capturedUserCtx);
                KPIThreadLocal.set((Map)capturedKpiCtx);
                try {
                    List list = this.kpiService.retrieveOrgKPIDetailsByReportees(localCriteria);
                    return list;
                }
                finally {
                    UserThreadLocal.set(null);
                    KPIThreadLocal.set(null);
                }
            }, (Executor)this.kpiExecutor));
        }
        HashMap<String, List> fetchedByNodeKey = new HashMap<String, List>();
        java.util.Iterator nodeKeyIter = nodeKeyList.iterator();
        while (nodeKeyIter.hasNext()) {
            String nodeKey3;
            List details = (List)((CompletableFuture)nodeKeyFutures.get(nodeKey3 = (String)nodeKeyIter.next())).join();
            fetchedByNodeKey.put(nodeKey3, details != null ? details : new ArrayList());
        }
        Set allDeptIds = (java.util.Set)fetchedByNodeKey.values().stream().flatMap(Collection::stream).map(d -> ((java.util.Map)d).get("dept_id")).filter(Objects::nonNull).map(Object::toString).collect(Collectors.toSet());
        Long kpiIdForContrib = Objects.nonNull(subkpidto) ? subkpidto.getId() : (Objects.nonNull(kpidto) ? Long.valueOf(kpidto.getId()) : null);
        String typeForContrib = Objects.nonNull(subkpidto) ? "subkpi" : "kpi";
        String contribCacheKey = "contribCache_" + kpiIdForContrib + "_" + typeForContrib;
        Map contributionCache = (Map)KPIThreadLocal.get().computeIfAbsent(contribCacheKey, k -> new HashMap());
        if (!allDeptIds.isEmpty() && kpiIdForContrib != null) {
            HashSet missing = new HashSet(allDeptIds);
            missing.removeAll(contributionCache.keySet());
            if (!missing.isEmpty()) {
                try {
                    Map bulkContrib = this.kpiService.kpiContributionPercentagesBulk(kpiIdForContrib, new ArrayList(missing), typeForContrib);
                    if (bulkContrib != null) {
                        bulkContrib.forEach((dId, pct) -> {
                            String c = StringUtils.isEmpty((CharSequence)pct.toString()) || "0".equals(pct.toString()) ? "100" : pct.toString();
                            contributionCache.put(dId, new BigDecimal(c).divide(BigDecimal.valueOf(100L)));
                        });
                    }
                }
                catch (Exception e) {
                    this.log.warn("Bulk contribution fetch failed: {}", (Object)e.getMessage());
                }
            }
        }
        for (Object nodeKey4_obj : nodeKeyList) { String nodeKey4 = (String)nodeKey4_obj;
            List kpiDetailsList = (List)fetchedByNodeKey.get(nodeKey4);
            this.log.info("nodeKey={} details size={}", (Object)nodeKey4, (Object)kpiDetailsList.size());
            ArrayList<String> rawList = new ArrayList<String>();
            ArrayList<String> thresholdList = new ArrayList<String>();
            ArrayList<String> targetRawList = new ArrayList<String>();
            ArrayList<String> targetThresholdList = new ArrayList<String>();
            BigDecimal contributionFactor = BigDecimal.ONE;
            for (Map detail : (java.util.List<java.util.Map>)kpiDetailsList) {
                String deptIdStr;
                String string = deptIdStr = Objects.nonNull(detail.get("dept_id")) ? detail.get("dept_id").toString() : null;
                if (Objects.nonNull(deptIdStr)) {
                    String deptIdKey = deptIdStr;
                    contributionFactor = (java.math.BigDecimal)contributionCache.computeIfAbsent(deptIdKey, id -> {
                        String c = Objects.nonNull(subkpidto) ? (id.equals("-") ? this.getContrbutionValue(subkpidto, (String)id) : this.getContrbutionValuebyId(subkpidto, (String)id)) : (Objects.nonNull(kpidto) ? (id.equals("-") ? this.getContrbutionValue(kpidto, (String)id) : this.getContrbutionValuebyId(kpidto, (String)id)) : "100");
                        if (StringUtils.isEmpty((CharSequence)c) || "0".equals(c)) {
                            c = "100";
                        }
                        return new BigDecimal(c).divide(BigDecimal.valueOf(100L));
                    });
                }
                if (detail.get("A") != null && this.validateDataKey.test(detail.get("A").toString())) {
                    String valA = detail.get("A").toString() != null ? detail.get("A").toString().toString() : null;
                    rawList.add(valA);
                    BigDecimal thA = new BigDecimal(valA).multiply(contributionFactor);
                    thresholdList.add(thA.toPlainString());
                }
                if (detail.get("T") != null && this.validateDataKey.test(detail.get("T").toString())) {
                    String valT = detail.get("T").toString() != null ? detail.get("T").toString().toString() : null;
                    targetRawList.add(valT);
                    BigDecimal thT = new BigDecimal(valT).multiply(contributionFactor);
                    targetThresholdList.add(thT.toPlainString());
                }
                String string2 = dataType = Objects.nonNull(detail.get("dataType")) ? detail.get("dataType").toString() : dataType;
                Object currObj = detail.get("currency");
                if (currObj == null || !StringUtils.isNotEmpty((CharSequence)currObj.toString())) continue;
                currency = currObj.toString() + " ";
            }
            if (!rawList.isEmpty()) {
                actuallistempty = false;
            }
            String rawConcat = rawList.isEmpty() ? "0" : String.join((CharSequence)",", rawList);
            String threshConcat = thresholdList.isEmpty() ? "0" : String.join((CharSequence)",", thresholdList);
            String tRawConcat = targetRawList.isEmpty() ? "0" : String.join((CharSequence)",", targetRawList);
            String tThreshConcat = targetThresholdList.isEmpty() ? "0" : String.join((CharSequence)",", targetThresholdList);
            exprRaw = exprRaw.replace(nodeKey4, rawConcat);
            exprThreshold = exprThreshold.replace(nodeKey4, threshConcat);
            exprTargetRaw = exprTargetRaw.replace(nodeKey4, tRawConcat);
            exprTargetThreshold = exprTargetThreshold.replace(nodeKey4, tThreshConcat);
        }
        long totalforendTime = System.currentTimeMillis();
        this.log.info("getExpressionValue nodeKey loop took {} ms", (Object)(totalforendTime - totalforstartTime));
        exprRaw = exprRaw.replaceAll("\\[", "(").replaceAll("\\]", ")");
        exprThreshold = exprThreshold.replaceAll("\\[", "(").replaceAll("\\]", ")");
        exprTargetRaw = exprTargetRaw.replaceAll("\\[", "(").replaceAll("\\]", ")");
        exprTargetThreshold = exprTargetThreshold.replaceAll("\\[", "(").replaceAll("\\]", ")");
        BigDecimal rawTarget = new BigDecimal(formulaUtil.applyExpression(exprTargetRaw));
        BigDecimal threshTarget = new BigDecimal(formulaUtil.applyExpression(exprTargetThreshold));
        String rawActualStr = actuallistempty ? null : formulaUtil.applyExpression(exprRaw);
        BigDecimal rawActual = rawActualStr != null ? new BigDecimal(rawActualStr) : BigDecimal.ZERO;
        BigDecimal threshActual = new BigDecimal(formulaUtil.applyExpression(exprThreshold));
        if (rawTarget.doubleValue() != 0.0) {
            dataMap.put("target", rawTarget.toPlainString());
        }
        dataMap.put("actual", rawActualStr);
        if (!actuallistempty) {
            dataMap.put("targetThreshold", threshTarget.toPlainString());
            dataMap.put("actualThreshold", threshActual.toPlainString());
        }
        dataMap.put("currency", "Currency".equalsIgnoreCase(dataType) ? currency : "");
        dataMap.put("dataType", dataType);
        if ("subkpi".equalsIgnoreCase(flagtype)) {
            subkpidto.getSubKpiValue().put("actualCurrency", dataMap.get("currency"));
            subkpidto.getSubKpiValue().put("targetCurrency", dataMap.get("currency"));
        } else {
            kpidto.getKpiValue().put("actualCurrency", dataMap.get("currency"));
            kpidto.getKpiValue().put("targetCurrency", dataMap.get("currency"));
        }
        return dataMap;
    }

    private KPICriteria cloneCriteria(KPICriteria original) {
        KPICriteria clone = new KPICriteria();
        BeanUtils.copyProperties((Object)original, (Object)clone);
        return clone;
    }

    public Map<String, Object> buildKPIDataFeed(KPIDTO kpiObj, SubKPIDTO supkpidto, String flagtype, String empId, String period) {
        String loggedInEmpId;
        Long departmentId;
        HashMap<String, Object> subMap = new HashMap<String, Object>();
        FormulaBuilder builder = new FormulaBuilder();
        this.dateUtil.populateCalendar();
        String threadPeriod = (String)UserThreadLocal.get().get("DATE_PERIOD");
        if (flagtype.equalsIgnoreCase("subkpi")) {
            builder.setPeriod(StringUtils.isNotEmpty((CharSequence)threadPeriod) ? threadPeriod : (supkpidto.getKpiFormula() != null ? supkpidto.getKpiFormula().getPeriod() : null));
            departmentId = supkpidto.getDepartmentId();
        } else {
            builder.setPeriod(StringUtils.isNotEmpty((CharSequence)threadPeriod) ? threadPeriod : (kpiObj.getKpiFormula() != null ? kpiObj.getKpiFormula().getPeriod() : null));
            departmentId = kpiObj.getDepartmentId();
        }
        if (period != null) {
            builder.setPeriod(period);
        }
        boolean navigatedEmp = !StringUtils.equalsIgnoreCase((CharSequence)empId, (CharSequence)(loggedInEmpId = (String)StringUtils.defaultIfEmpty((CharSequence)empId, (CharSequence)((CharSequence)UserThreadLocal.get().get("LOGGED_IN_EMPLOYEE_ID")))));
        CustomPerformance customPerformance = this.kpiService.findCustomPerformanceByOrgId();
        if (customPerformance != null) {
            if (flagtype.equalsIgnoreCase("subkpi")) {
                this.handleCustomPerformanceAggregation(customPerformance, null, supkpidto, flagtype, builder, loggedInEmpId, navigatedEmp);
            } else {
                this.handleCustomPerformanceAggregation(customPerformance, kpiObj, null, "kpi", builder, loggedInEmpId, navigatedEmp);
            }
        } else if (navigatedEmp) {
            List reporteeList = this.kpiService.getAllReporteeList(loggedInEmpId).stream().map(Object.class::cast).collect(Collectors.toList());
            builder.setEmployeeIds(reporteeList);
        } else {
            builder.setEmployeeIds(Arrays.asList(UserThreadLocal.get().get("ALL_REPORTEE_ID")));
        }
        KPICriteria kpiCriteria = new FormulaUtil().buildCriteria(builder, null);
        System.out.println("loggedInEmpId = " + loggedInEmpId);
        kpiCriteria.setEmpId(loggedInEmpId);
        kpiCriteria.setDepartmentId(departmentId.longValue());
        if (!kpiCriteria.getRealDates().isEmpty()) {
            Date startDate = (Date)kpiCriteria.getRealDates().get(0);
            Date endDate = (Date)kpiCriteria.getRealDates().get(1);
            String frequency = flagtype.equalsIgnoreCase("subkpi") ? supkpidto.getSubKpiValue().getOrDefault("kpi_measurement", "Annually").toString() : kpiObj.getKpiValue().getOrDefault("kpi_measurement", "Annually").toString();
            String finalFreqValue = this.determineFrequency(frequency);
            System.out.println(" finalFreqValue sub ::: " + finalFreqValue);
            int fragment = this.dateUtil.findTotalFrequency(startDate, endDate, finalFreqValue);
            List<Object> updatedDates = Arrays.asList(this.dateUtil.updateStartDate(startDate, finalFreqValue), this.dateUtil.updateEndDate(endDate, finalFreqValue));
            kpiCriteria.setRealDates(updatedDates);
            if (flagtype.equalsIgnoreCase("subkpi")) {
                System.out.println("----------------------applayformula subkpi------------");
                this.log.info("1580 check applayfaorula subkpi methd  start timing: {} ", (Object)LocalDateTime.now());
                this.applyFormula(null, supkpidto, "subkpi", kpiCriteria, subMap);
                this.log.info("1584 check applayfaorula subkpi end timing: {} ", (Object)LocalDateTime.now());
                System.out.println("---------------------- end applayformula subkpi------------");
                System.out.println("-------------- populate subkpi trnd brgin-------------------");
                this.log.info("1588 check applayfaorula subkpi methd  start timing: {} ", (Object)LocalDateTime.now());
                this.populateTrend(null, supkpidto, "subkpi", kpiCriteria, subMap);
                this.log.info("1592 check applayfaorula subkpi end timing: {} ", (Object)LocalDateTime.now());
                System.out.println("-------------- populate subkpi trnd end-------------------");
            } else {
                System.out.println("----------------------applayformula kpi------------");
                this.log.info("1596 check applayfaorula kpi Start timing: {} ", (Object)LocalDateTime.now());
                long startTime = System.currentTimeMillis();
                this.applyFormula(kpiObj, null, "kpi", kpiCriteria, subMap);
                long endTime = System.currentTimeMillis();
                System.out.println("applay (1611) formula Name took: startTime" + startTime + "|endTime " + endTime + " total" + (endTime - startTime) + "ms");
                this.log.info("1600 check applayfaorula kpi end timing: {} ", (Object)LocalDateTime.now());
                System.out.println("----------------------applayformula kpi------------");
                System.out.println("-------------- populate kpi trnd brgin-------------------");
                this.log.info("1604 check poplatetrend kpi kpi Start timing: {} ", (Object)LocalDateTime.now());
                long populatetrendstartTime = System.currentTimeMillis();
                this.populateTrend(kpiObj, null, "kpi", kpiCriteria, subMap);
                long populateTrendendTime = System.currentTimeMillis();
                System.out.println("applay (1620) formula Name took: " + populatetrendstartTime + "|populateTrendendTime" + populateTrendendTime + "total :" + (populateTrendendTime - populatetrendstartTime) + "ms");
                this.log.info("1606 check populateTrent kpi end timing: {} ", (Object)LocalDateTime.now());
                System.out.println("-------------- populate kpi trnd brgin-------------------");
            }
            subMap.put("fragment", fragment);
        }
        return subMap;
    }

    private void handleCustomPerformanceAggregation(CustomPerformance customPerformance, KPIDTO kpiObj, SubKPIDTO supKpidto, String flagtype, FormulaBuilder builder, String loggedInEmpId, boolean navigatedEmp) {
        if (!customPerformance.isAggregation()) {
            builder.setEmployeeIds(Arrays.asList(loggedInEmpId));
        } else if (customPerformance.isCustomAggregation()) {
            List<Object> employeeIds = null;
            if (flagtype.equalsIgnoreCase("subkpi")) {
                employeeIds = StringUtils.isNotEmpty((CharSequence)supKpidto.getCustomReportees()) ? Arrays.asList(loggedInEmpId, supKpidto.getCustomReportees()) : Arrays.asList(loggedInEmpId);
                builder.setDeptReportee(supKpidto.getCustomReportees());
            } else {
                employeeIds = StringUtils.isNotEmpty((CharSequence)kpiObj.getCustomReportees()) ? Arrays.asList(loggedInEmpId, kpiObj.getCustomReportees()) : Arrays.asList(loggedInEmpId);
                builder.setDeptReportee(kpiObj.getCustomReportees());
            }
            builder.setEmployeeIds(employeeIds);
        } else if (navigatedEmp) {
            List reporteeList = this.kpiService.getAllReporteeList(loggedInEmpId).stream().map(Object.class::cast).collect(Collectors.toList());
            builder.setEmployeeIds(reporteeList);
        }
    }

    private String determineFrequency(String frequency) {
        if (this.freqFunction.test(frequency, quarterFrequency)) {
            return "Quarterly";
        }
        if (this.freqFunction.test(frequency, halfYearFrequency)) {
            return "HalfYearly";
        }
        if (frequency.equalsIgnoreCase("Monthly")) {
            return "Monthly";
        }
        return "Yearly";
    }

    public Map<String, Object> buildKPIDataFeedDept(KPIDTO kpiObj, String deptId, String period) {
        String loggedInEmpId = null;
        this.dateUtil.populateCalendar();
        HashMap<String, Object> subMap = new HashMap<String, Object>();
        FormulaBuilder builder = new FormulaBuilder();
        if (period != null) {
            builder.setPeriod(period);
        }
        if (StringUtils.isNotEmpty((CharSequence)((CharSequence)UserThreadLocal.get().get("DATE_PERIOD")))) {
            builder.setPeriod((String)UserThreadLocal.get().get("DATE_PERIOD"));
        } else if (kpiObj.getKpiFormula() != null) {
            builder.setPeriod(kpiObj.getKpiFormula().getPeriod());
        }
        FormulaUtil formulaUtil = new FormulaUtil();
        CustomPerformance customPerformance = this.kpiService.findCustomPerformanceByOrgId();
        ArrayList<Long> reporteeList = new ArrayList<Long>();
        boolean navigatoremp = false;
        if (customPerformance != null && !customPerformance.isAggregation()) {
            builder.setEmployeeIds(Arrays.asList(loggedInEmpId));
        } else if (customPerformance != null && customPerformance.isCustomAggregation() && customPerformance.isAggregation()) {
            List<Object> employeeIds = StringUtils.isNotEmpty((CharSequence)kpiObj.getCustomReportees()) ? Arrays.asList(loggedInEmpId, kpiObj.getCustomReportees()) : Arrays.asList(loggedInEmpId);
            builder.setEmployeeIds(employeeIds);
            builder.setDeptReportee(kpiObj.getCustomReportees());
        } else if (navigatoremp) {
            List employeeReportees = this.kpiService.getAllReporteeList(loggedInEmpId);
            if (Objects.nonNull(employeeReportees) && employeeReportees.size() > 0) {
                for (Long emp : (java.util.List<Long>)(java.util.List)employeeReportees) {
                    reporteeList.add(emp);
                }
            }
            builder.setEmployeeIds((java.util.List)reporteeList);
        } else if (StringUtils.isNotEmpty((CharSequence)((CharSequence)UserThreadLocal.get().get("ALL_REPORTEE_ID")))) {
            builder.setEmployeeIds(Arrays.asList(UserThreadLocal.get().get("ALL_REPORTEE_ID")));
        }
        KPICriteria kpiCriteria = formulaUtil.buildCriteria(builder, null);
        kpiCriteria.setEmpId(loggedInEmpId);
        kpiCriteria.setDepartmentId(kpiObj.getDepartmentId());
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
                this.applyFormula(kpiObj, null, "kpi", kpiCriteria, subMap);
                this.populateTrend(kpiObj, null, "kpi", kpiCriteria, subMap);
            }
            catch (Exception e) {
                e.printStackTrace();
            }
            subMap.put("fragment", fragment);
        }
        return subMap;
    }

    private void populateTrend(KPIDTO kpidto, SubKPIDTO subkpidto, String flagtype, KPICriteria kpiCriteria, Map<String, Object> subMap) {
        BigDecimal actual;
        BigDecimal bigDecimal = actual = Objects.nonNull(subMap.get("actual")) ? new BigDecimal(subMap.get("actual").toString()) : new BigDecimal(0);
        if (CollectionUtils.isNotEmpty((Collection)kpiCriteria.getRealDates()) && actual.doubleValue() != 0.0) {
            boolean flag;
            String deptId;
            Date startDate = (Date)kpiCriteria.getRealDates().get(0);
            Date endDate = (Date)kpiCriteria.getRealDates().get(1);
            int months = this.dateUtil.monthsBetween(startDate, endDate);
            if (flagtype.equalsIgnoreCase("subkpi")) {
                this.log.info("1772 check Trend get deails in subkpikpi methd  start timing: {} ", (Object)LocalDateTime.now());
                deptId = this.subKPIService.getsubKpiDeptId(Long.valueOf(subkpidto.getId()));
                this.log.info("1774 check Trend get deails in subkpikpi end timing: {} ", (Object)LocalDateTime.now());
            } else {
                this.log.info("1776 check Trend get deails in kpi methd  start timing: {} ", (Object)LocalDateTime.now());
                deptId = this.kpiService.getKpiDeptId(Long.valueOf(kpidto.getId()));
                this.log.info("1778 check Trend get deails in kpi end timing: {} ", (Object)LocalDateTime.now());
            }
            if (Objects.nonNull(deptId)) {
                kpiCriteria.setDepartmentId(Long.parseLong(deptId));
            }
            Calendar previousEndDate = Calendar.getInstance();
            previousEndDate.setTime(startDate);
            Calendar previousStartDate = Calendar.getInstance();
            previousStartDate.setTime(startDate);
            previousStartDate.set(2, previousStartDate.get(2) - (months + 1));
            kpiCriteria.setRealDates(Arrays.asList(previousStartDate, previousEndDate));
            HashMap trendMap = new HashMap();
            if (flagtype.equalsIgnoreCase("subkpi")) {
                this.log.info("1793 check Trend get applayformula subkpi methd  start timing: {} ", (Object)LocalDateTime.now());
                this.applyFormula(null, subkpidto, "subkpi", kpiCriteria, trendMap);
                this.log.info("1795 check Trend get applayformula subkpikpi end timing: {} ", (Object)LocalDateTime.now());
            } else {
                this.log.info("1797 check Trend get applayformula kpi methd  start timing: {} ", (Object)LocalDateTime.now());
                this.applyFormula(kpidto, null, "kpi", kpiCriteria, trendMap);
                this.log.info("1799 check Trend get applayformula in kpi end timing: {} ", (Object)LocalDateTime.now());
            }
            BigDecimal previousActual = Objects.nonNull(trendMap.get("actual")) ? new BigDecimal(trendMap.get("actual").toString()) : new BigDecimal(0);
            BigDecimal previousTarget = Objects.nonNull(trendMap.get("target")) ? new BigDecimal(trendMap.get("target").toString()) : new BigDecimal(0);
            boolean bl = flag = previousActual.doubleValue() == 0.0 && previousTarget.doubleValue() == 0.0;
            if (!flag) {
                if (flagtype.equalsIgnoreCase("subkpi")) {
                    int finalResult = actual.compareTo(previousActual);
                    String kpiType = Objects.nonNull(subkpidto.getSubKpiValue().get("kpiType")) ? subkpidto.getSubKpiValue().get("kpiType").toString() : "";
                    String trend = "";
                    trend = finalResult >= 0 ? (kpiType.equalsIgnoreCase("lag") ? "fas fa-arrow-down" : "fas fa-arrow-up") : (kpiType.equalsIgnoreCase("lag") ? "fas fa-arrow-up" : "fas fa-arrow-down");
                    subkpidto.getSubKpiValue().put("trend", trend);
                } else {
                    int finalResult = actual.compareTo(previousActual);
                    String kpiType = Objects.nonNull(kpidto.getKpiValue().get("kpiType")) ? kpidto.getKpiValue().get("kpiType").toString() : "";
                    String trend = "";
                    trend = finalResult >= 0 ? (kpiType.equalsIgnoreCase("lag") ? "fas fa-arrow-down" : "fas fa-arrow-up") : (kpiType.equalsIgnoreCase("lag") ? "fas fa-arrow-up" : "fas fa-arrow-down");
                    kpidto.getKpiValue().put("trend", trend);
                }
            }
        }
    }

    public void buildStatusLight(KPIDTO kpidto, SubKPIDTO subKpidto, String empId, String flagType) {
        try {
            String status;
            KPICriteria kpiCriteria = new KPICriteria();
            if (flagType.equalsIgnoreCase("subkpi")) {
                status = Objects.nonNull(subKpidto.getSubKpiValue().get("status")) ? subKpidto.getSubKpiValue().get("status").toString() : "";
                subKpidto.getSubKpiValue().put("statusLight", "red fas fa-flag");
            } else {
                status = Objects.nonNull(kpidto.getKpiValue().get("status")) ? kpidto.getKpiValue().get("status").toString() : "";
                kpidto.getKpiValue().put("statusLight", "red fas fa-flag");
            }
            boolean firstStatus = status.equalsIgnoreCase("First");
            boolean second = status.equalsIgnoreCase("Second");
            boolean weighted = status.equalsIgnoreCase("Weighted");
            boolean third = status.equalsIgnoreCase("Third");
            boolean manual = status.equalsIgnoreCase("Manual");
            CustomPerformance stringObjectsMap = this.kpiService.findCustomPerformanceByOrgId();
            if (flagType.equalsIgnoreCase("subkpi")) {
                if (firstStatus) {
                    this.buildKPIStatusLight(null, kpiCriteria, subKpidto, flagType, null, empId, null);
                    this.buildStatusLightForRisk(null, subKpidto, flagType, false);
                } else if (second) {
                    this.buildStatusLightForInitiative(null, subKpidto, flagType, null);
                    this.buildStatusLightForRisk(null, subKpidto, flagType, false);
                } else if (weighted) {
                    Map countMap = new HashMap();
                    if (Objects.nonNull(countMap = this.buildKPIStatusLight(null, kpiCriteria, subKpidto, flagType, countMap, empId, null))) {
                        String statusLight = this.calculateStatusLight(countMap);
                        if ("GREEN".equalsIgnoreCase(statusLight)) {
                            subKpidto.getSubKpiValue().put("statusLight", "green fas fa-flag");
                            this.updateStatusCustomColor(subKpidto, "GREEN", stringObjectsMap);
                        } else if ("LIGHTGREEN".equalsIgnoreCase(statusLight)) {
                            subKpidto.getSubKpiValue().put("statusLight", "lightgreen fas fa-flag");
                            this.updateStatusCustomColor(subKpidto, "LIGHTGREEN", stringObjectsMap);
                        } else if ("YELLOW".equalsIgnoreCase(statusLight)) {
                            subKpidto.getSubKpiValue().put("statusLight", "yellow fas fa-flag");
                            this.updateStatusCustomColor(subKpidto, "YELLOW", stringObjectsMap);
                        } else if ("LIGHTRED".equalsIgnoreCase(statusLight)) {
                            subKpidto.getSubKpiValue().put("statusLight", "lightred fas fa-flag");
                            this.updateStatusCustomColor(subKpidto, "LIGHTRED", stringObjectsMap);
                        } else {
                            subKpidto.getSubKpiValue().put("statusLight", "red fas fa-flag");
                            this.updateStatusCustomColor(subKpidto, "RED", stringObjectsMap);
                        }
                    }
                } else {
                    this.buildStatusLightForRisk(null, subKpidto, flagType, true);
                }
            } else if (firstStatus) {
                this.buildKPIStatusLight(kpidto, kpiCriteria, null, "kpi", null, empId, null);
                this.buildStatusLightForRisk(kpidto, null, "kpi", false);
            } else if (second) {
                this.buildStatusLightForInitiative(kpidto, null, "kpi", null);
                this.buildStatusLightForRisk(kpidto, null, "kpi", false);
            } else if (weighted) {
                Map countMap = new HashMap();
                if (Objects.nonNull(countMap = this.buildKPIStatusLight(kpidto, kpiCriteria, null, "", countMap, empId, null))) {
                    String statusLight = this.calculateStatusLight(countMap);
                    if ("GREEN".equalsIgnoreCase(statusLight)) {
                        kpidto.getKpiValue().put("statusLight", "green fas fa-flag");
                        this.updateStatusCustomColor(kpidto, "GREEN", stringObjectsMap);
                    } else if ("LIGHTGREEN".equalsIgnoreCase(statusLight)) {
                        kpidto.getKpiValue().put("statusLight", "lightgreen fas fa-flag");
                        this.updateStatusCustomColor(kpidto, "LIGHTGREEN", stringObjectsMap);
                    } else if ("YELLOW".equalsIgnoreCase(statusLight)) {
                        kpidto.getKpiValue().put("statusLight", "yellow fas fa-flag");
                        this.updateStatusCustomColor(kpidto, "YELLOW", stringObjectsMap);
                    } else if ("LIGHTRED".equalsIgnoreCase(statusLight)) {
                        kpidto.getKpiValue().put("statusLight", "lightred fas fa-flag");
                        this.updateStatusCustomColor(kpidto, "LIGHTRED", stringObjectsMap);
                    } else {
                        kpidto.getKpiValue().put("statusLight", "red fas fa-flag");
                        this.updateStatusCustomColor(kpidto, "RED", stringObjectsMap);
                    }
                }
            } else {
                this.buildStatusLightForRisk(kpidto, null, "kpi", true);
            }
        }
        catch (Exception e) {
            this.logger.error("Exception while building status light", e);
        }
    }

    public void buildStatusLightDept(KPIDTO kpidto, String deptId) {
        try {
            KPICriteria kpiCriteria = new KPICriteria();
            String status = Objects.nonNull(kpidto.getKpiValue().get("status")) ? kpidto.getKpiValue().get("status").toString() : "";
            boolean firstStatus = status.equalsIgnoreCase("First");
            boolean second = status.equalsIgnoreCase("Second");
            boolean weighted = status.equalsIgnoreCase("Weighted");
            boolean third = status.equalsIgnoreCase("Third");
            boolean manual = status.equalsIgnoreCase("Manual");
            CustomPerformance stringObjectsMap = this.kpiService.findCustomPerformanceByOrgId();
            if (firstStatus) {
                this.buildKPIStatusLightDept(kpidto, kpiCriteria, null, deptId, null);
                this.buildStatusLightForRisk(kpidto, null, "kpi", false);
            } else if (second) {
                this.buildStatusLightForInitiative(kpidto, null, "kpi", null);
                this.buildStatusLightForRisk(kpidto, null, "kpi", false);
            } else if (weighted) {
                Map countMap = new HashMap();
                if (Objects.nonNull(countMap = this.buildKPIStatusLightDept(kpidto, kpiCriteria, countMap, deptId, null))) {
                    String statusLight = this.calculateStatusLight(countMap);
                    if ("GREEN".equalsIgnoreCase(statusLight)) {
                        kpidto.getKpiValue().put("statusLight", "green fas fa-flag");
                        this.updateStatusCustomColor(kpidto, "GREEN", stringObjectsMap);
                    } else if ("LIGHTGREEN".equalsIgnoreCase(statusLight)) {
                        kpidto.getKpiValue().put("statusLight", "lightgreen fas fa-flag");
                        this.updateStatusCustomColor(kpidto, "LIGHTGREEN", stringObjectsMap);
                    } else if ("YELLOW".equalsIgnoreCase(statusLight)) {
                        kpidto.getKpiValue().put("statusLight", "yellow fas fa-flag");
                        this.updateStatusCustomColor(kpidto, "YELLOW", stringObjectsMap);
                    } else if ("LIGHTRED".equalsIgnoreCase(statusLight)) {
                        kpidto.getKpiValue().put("statusLight", "lightred fas fa-flag");
                        this.updateStatusCustomColor(kpidto, "LIGHTRED", stringObjectsMap);
                    } else {
                        kpidto.getKpiValue().put("statusLight", "red fas fa-flag");
                        this.updateStatusCustomColor(kpidto, "RED", stringObjectsMap);
                    }
                }
            } else {
                this.buildStatusLightForRisk(kpidto, null, "kpi", true);
            }
        }
        catch (Exception e) {
            this.logger.error("Exception while building status light", e);
        }
    }

    public String buildStatusLight_count(KPIDTO kpidto, String empId, String period) {
        try {
            KPICriteria kpiCriteria = new KPICriteria();
            CustomPerformance stringObjectsMap = this.kpiService.findCustomPerformanceByOrgId();
            String status = Objects.nonNull(kpidto.getKpiValue().get("status")) ? kpidto.getKpiValue().get("status").toString() : "";
            boolean firstStatus = status.equalsIgnoreCase("First");
            boolean second = status.equalsIgnoreCase("Second");
            boolean weighted = status.equalsIgnoreCase("Weighted");
            if (firstStatus) {
                this.buildKPIStatusLight(kpidto, kpiCriteria, null, "", null, empId, period);
                this.buildStatusLightForRisk(kpidto, null, "kpi", false);
            } else if (second) {
                this.buildStatusLightForInitiative(kpidto, null, "kpi", null);
                this.buildStatusLightForRisk(kpidto, null, "kpi", false);
            } else if (weighted) {
                Map countMap = this.buildStatusLightForRisk(kpidto, null, "kpi", false);
                countMap = this.buildStatusLightForInitiative(kpidto, null, "kpi", countMap);
                if (Objects.nonNull(countMap = this.buildKPIStatusLight(kpidto, kpiCriteria, null, "", countMap, empId, period))) {
                    String statusLight = this.calculateStatusLight(countMap);
                    if ("GREEN".equalsIgnoreCase(statusLight)) {
                        kpidto.getKpiValue().put("statusLight", "green fas fa-flag");
                        this.updateStatusCustomColor(kpidto, "GREEN", stringObjectsMap);
                    } else if ("YELLOW".equalsIgnoreCase(statusLight)) {
                        kpidto.getKpiValue().put("statusLight", "yellow fas fa-flag");
                        this.updateStatusCustomColor(kpidto, "YELLOW", stringObjectsMap);
                    } else if ("LIGHTRED".equalsIgnoreCase(statusLight)) {
                        kpidto.getKpiValue().put("statusLight", "lightred fas fa-flag");
                        this.updateStatusCustomColor(kpidto, "LIGHTRED", stringObjectsMap);
                    } else if ("LIGHTGREEN".equalsIgnoreCase(statusLight)) {
                        kpidto.getKpiValue().put("statusLight", "lightgreen fas fa-flag");
                        this.updateStatusCustomColor(kpidto, "LIGHTGREEN", stringObjectsMap);
                    } else {
                        kpidto.getKpiValue().put("statusLight", "red fas fa-flag");
                        this.updateStatusCustomColor(kpidto, "RED", stringObjectsMap);
                    }
                } else {
                    kpidto.getKpiValue().put("statusLight", "red fas fa-flag");
                    this.updateStatusCustomColor(kpidto, "RED", stringObjectsMap);
                }
            } else {
                this.buildStatusLightForRisk(kpidto, null, "kpi", true);
            }
        }
        catch (Exception e) {
            this.logger.error("Exception while building status light", e);
        }
        return (String)kpidto.getKpiValue().get("statusLight");
    }

    public boolean between(BigDecimal value, BigDecimal min, BigDecimal max) {
        return value.compareTo(min) >= 0 && value.compareTo(max) < 0;
    }

    public boolean lessthan(BigDecimal value, BigDecimal min) {
        return value.compareTo(min) <= 0;
    }

    public boolean greaterthan(BigDecimal value, BigDecimal max) {
        return value.compareTo(max) >= 0;
    }

    public Map<String, Object> populateActualData(KPICriteria kpiCriteria, FormulaUtil formulaUtil, KPIDTO kpidto, SubKPIDTO subkpidto, String flagtype) {
        String kpiDataType;
        HashMap<String, Object> dataMap = new HashMap<String, Object>();
        List kpiDetailsList = this.kpiService.retrieveOrgKPIDetails(kpiCriteria);
        ArrayList<String> dataList = new ArrayList<String>();
        ArrayList<String> targetList = new ArrayList<String>();
        String dataType = null;
        String currency = this.getGlobalCurrency();
        for (Map kpiDetailObj : (java.util.List<java.util.Map>)(java.util.List)kpiDetailsList) {
            if (kpiDetailObj.get("A") != null && this.validateDataKey.test(kpiDetailObj.get("A").toString())) {
                dataList.add(kpiDetailObj.get("A").toString());
            }
            if (this.validateDataKey.test(kpiDetailObj.get("T").toString())) {
                targetList.add(kpiDetailObj.get("T").toString());
            }
            String string = dataType = Objects.nonNull(kpiDetailObj.get("dataType")) ? kpiDetailObj.get("dataType").toString() : "";
            Object currencyObj = kpiDetailObj.get("currency");
            if (!Objects.nonNull(currencyObj) || !StringUtils.isNotEmpty((CharSequence)currencyObj.toString())) continue;
            currency = String.join((CharSequence)"", currencyObj.toString(), " ");
        }
        Object currencyObj = null;
        if (flagtype.equalsIgnoreCase("subkpi")) {
            kpiDataType = Objects.nonNull(subkpidto.getSubKpiValue().get("dataType")) ? subkpidto.getSubKpiValue().get("dataType").toString() : "";
            currencyObj = subkpidto.getSubKpiValue().get("kpiCurrency");
        } else {
            kpiDataType = Objects.nonNull(kpidto.getKpiValue().get("dataType")) ? kpidto.getKpiValue().get("dataType").toString() : "";
            currencyObj = kpidto.getKpiValue().get("kpiCurrency");
        }
        dataType = StringUtils.isNotEmpty((CharSequence)kpiDataType) ? kpiDataType : StringUtils.stripToEmpty((String)dataType);
        boolean isPercentage = "Percentage".equalsIgnoreCase(dataType);
        String function = isPercentage ? "AVG" : "SUM";
        System.out.println("dataList :: > " + dataList);
        if (!dataList.isEmpty()) {
            String actual = formulaUtil.applyExpression(function + "(" + String.join((CharSequence)",", dataList) + ")");
            dataMap.put("actual", actual);
        } else {
            dataMap.put("actual", null);
        }
        if (CollectionUtils.isNotEmpty(targetList)) {
            String target = formulaUtil.applyExpression(function + "(" + String.join((CharSequence)",", targetList) + ")");
            dataMap.put("target", target);
        }
        if (Objects.nonNull(currencyObj) && StringUtils.isNotEmpty((CharSequence)currencyObj.toString())) {
            currency = String.join((CharSequence)"", currencyObj.toString(), " ");
        }
        currency = "Currency".equalsIgnoreCase(dataType) ? currency : "";
        dataMap.put("currency", currency);
        dataMap.put("dataType", dataType);
        if (StringUtils.isNotEmpty((CharSequence)currency)) {
            if (flagtype.equalsIgnoreCase("subkpi")) {
                subkpidto.getSubKpiValue().put("actualCurrency", currency);
                subkpidto.getSubKpiValue().put("targetCurrency", currency);
            } else {
                kpidto.getKpiValue().put("actualCurrency", currency);
                kpidto.getKpiValue().put("targetCurrency", currency);
            }
        } else if (flagtype.equalsIgnoreCase("subkpi")) {
            subkpidto.getSubKpiValue().put("actualCurrency", "");
            subkpidto.getSubKpiValue().put("targetCurrency", "");
        } else {
            kpidto.getKpiValue().put("actualCurrency", "");
            kpidto.getKpiValue().put("targetCurrency", "");
        }
        return dataMap;
    }

    public Map<String, Object> populateIndividualActualData(FormulaBuilder formulaBuilder, KPICriteria kpiCriteria, FormulaUtil formulaUtil, KPIDTO kpidto, SubKPIDTO subkpidto, String flagtype) {
        String drillDownDataKey;
        KPIDetailsDTO detailsDTO;
        BigDecimal gap;
        String currency;
        String globalCurrency;
        Object currencyObj;
        HashMap<String, Object> resultMap;
        Object target;
        String targetValue;
        List targetList;
        Map targetNodeKeyMap;
        Map actualNodeKeyMap;
        String targetFormulaExpression;
        String actualFormulaExpression;
        String function;
        boolean isPercentage;
        String perCentage;
        List<Object> nodeKeyList;
        BigDecimal exstingGap;
        Map responseObject;
        String finalKey;
        boolean subkpi = false;
        if (flagtype.equalsIgnoreCase("subkpi")) {
            subkpi = true;
        }
        HashMap actualMap = new HashMap();
        HashMap targetMap = new HashMap();
        String deptid = null;
        String contribution = "0";
        if (subkpi) {
            deptid = this.kpiService.getKpiDeptId(Long.valueOf(subkpidto.getId()));
            if (subkpidto.getSubKpiValue().containsKey("contribution") && subkpidto.getSubKpiValue().get("contribution").toString() != null && !subkpidto.getSubKpiValue().get("contribution").toString().isEmpty()) {
                contribution = subkpidto.getSubKpiValue().get("contribution").toString();
            }
        } else {
            deptid = this.kpiService.getKpiDeptId(Long.valueOf(kpidto.getId()));
            if (kpidto.getKpiValue().containsKey("contribution") && kpidto.getKpiValue().get("contribution").toString() != null && !kpidto.getKpiValue().get("contribution").toString().isEmpty()) {
                contribution = kpidto.getKpiValue().get("contribution").toString();
            }
        }
        if (Objects.nonNull(deptid)) {
            kpiCriteria.setDepartmentId(Long.parseLong(deptid));
        }
        boolean periodGrouping = "Period".equalsIgnoreCase(kpiCriteria.getResponseGroupBy());
        if (formulaBuilder != null && CollectionUtils.isNotEmpty((Collection)formulaBuilder.getNodeKeyList())) {
            for (String nodeKey : formulaBuilder.getNodeKeyList()) {
                this.updateBreakDownData(kpiCriteria, actualMap, targetMap, nodeKey.trim());
            }
        } else if (subkpi) {
            this.updateBreakDownData(kpiCriteria, actualMap, targetMap, subkpidto.getSubKpiName());
        } else {
            this.updateBreakDownData(kpiCriteria, actualMap, targetMap, kpidto.getKpiName());
        }
        if (actualMap != null && actualMap.size() > 0) {
            for (String key : ((java.util.Map<String,Object>)actualMap).keySet()) {
                if (!(actualMap.get(key) instanceof HashMap)) continue;
                finalKey = periodGrouping ? kpiCriteria.getResponseKey() : key;
                responseObject = kpiCriteria.getResponseObject(finalKey);
                System.out.println("Final Key Actual Map ::: " + finalKey);
                exstingGap = null;
                exstingGap = responseObject.get("overallGap") != null ? (BigDecimal)responseObject.get("overallGap") : new BigDecimal(0);
                List<Object> list = nodeKeyList = CollectionUtils.isNotEmpty((Collection)formulaBuilder.getNodeKeyList()) ? Arrays.asList(formulaBuilder.getNodeKeyList().toArray()) : Arrays.asList("DummyNodeKey");
                perCentage = subkpi ? (Objects.nonNull(subkpidto.getSubKpiValue().get("dataType")) ? subkpidto.getSubKpiValue().get("dataType").toString() : "") : (Objects.nonNull(kpidto.getKpiValue().get("dataType")) ? kpidto.getKpiValue().get("dataType").toString() : "");
                perCentage = StringUtils.isEmpty((CharSequence)perCentage) && Objects.nonNull(actualMap.get("dataType")) ? actualMap.get("dataType").toString() : perCentage;
                isPercentage = "Percentage".equalsIgnoreCase(perCentage);
                function = isPercentage ? "AVG" : "SUM";
                actualFormulaExpression = StringUtils.isNotEmpty((CharSequence)formulaBuilder.getExpression()) ? formulaBuilder.getExpression() : function + "[DummyNodeKey]";
                targetFormulaExpression = StringUtils.isNotEmpty((CharSequence)formulaBuilder.getExpression()) ? formulaBuilder.getExpression() : function + "[DummyNodeKey]";
                for (Object nodeKey : nodeKeyList) {
                    actualNodeKeyMap = (Map)actualMap.get(key);
                    targetNodeKeyMap = (Map)targetMap.get(key);
                    System.out.println("Target Map :::  " + targetMap);
                    List actualList = (List)actualNodeKeyMap.get(nodeKey.toString());
                    List targetList2 = (List)targetNodeKeyMap.get(nodeKey.toString());
                    String actualValue = CollectionUtils.isNotEmpty((Collection)actualList) ? String.join((CharSequence)",", actualList) : "0";
                    String targetValue2 = CollectionUtils.isNotEmpty((Collection)targetList2) ? String.join((CharSequence)",", targetList2) : "0";
                    actualFormulaExpression = actualFormulaExpression.replace(nodeKey.toString(), actualValue);
                    targetFormulaExpression = targetFormulaExpression.replace(nodeKey.toString(), targetValue2);
                }
                actualFormulaExpression = actualFormulaExpression.replaceAll("\\[", "(").replaceAll("\\]", ")");
                targetFormulaExpression = targetFormulaExpression.replaceAll("\\[", "(").replaceAll("\\]", ")");
                String actual = formulaUtil.applyExpression(actualFormulaExpression);
                String target2 = formulaUtil.applyExpression(targetFormulaExpression);
                HashMap<String, Object> resultMap2 = new HashMap<String, Object>();
                resultMap2.put("dataType", perCentage);
                Object currencyObj2 = null;
                String globalCurrency2 = this.getGlobalCurrency();
                currencyObj2 = subkpi ? (subkpidto.getSubKpiValue().get("kpiCurrency") != null ? (Object)subkpidto.getSubKpiValue().get("kpiCurrency") : (Object)actualMap.get("currency")) : (kpidto.getKpiValue().get("kpiCurrency") != null ? (Object)kpidto.getKpiValue().get("kpiCurrency") : (Object)actualMap.get("currency"));
                String currency2 = Objects.nonNull(currencyObj2) && StringUtils.isNotEmpty((CharSequence)currencyObj2.toString()) ? String.join((CharSequence)"", currencyObj2.toString(), " ") : globalCurrency2;
                currency2 = "Currency".equalsIgnoreCase(perCentage) ? currency2 : "";
                resultMap2.put("currency", currency2);
                BigDecimal gap2 = new BigDecimal(0);
                if (StringUtils.isNotEmpty((CharSequence)target2)) {
                    gap2 = new BigDecimal(actual).subtract(new BigDecimal(target2));
                    resultMap2.put("gapStatus", gap2.doubleValue() <= 0.0 ? "fas fa-arrow-down" : "fas fa-arrow-up");
                    if (gap2.doubleValue() != 0.0) {
                        resultMap2.put("gap", "Percentage".equalsIgnoreCase(perCentage) ? String.join((CharSequence)"", this.formatdecimal(gap2), "%") : this.convertResult(gap2, resultMap2));
                    } else {
                        resultMap2.put("gap", "Percentage".equalsIgnoreCase(perCentage) ? String.join((CharSequence)"", "0", "%") : Double.valueOf(gap2.doubleValue()));
                    }
                }
                if (kpiCriteria.getGroupBy().equals("Measure")) {
                    KPIDetailsDTO detailsDTO2 = this.kpiService.lookupNodeKeyDetail(key);
                    if (detailsDTO2 != null) {
                        resultMap2.put("nodeKey", detailsDTO2.getNodeKey());
                        resultMap2.put("measureKey", detailsDTO2.getMeasureKey());
                        resultMap2.put("measureType", detailsDTO2.getMeasureType());
                    } else {
                        resultMap2.put("nodeKey", "0");
                        resultMap2.put("measureKey", "0");
                        resultMap2.put("measureType", 0);
                    }
                }
                if (subkpi) {
                    resultMap2.put("kpi", subkpidto.getId());
                } else {
                    resultMap2.put("kpi", kpidto.getId());
                }
                resultMap2.put("actual", "Percentage".equalsIgnoreCase(perCentage) ? String.join((CharSequence)"", this.formatdecimal(new BigDecimal(actual)), "%") : this.convertResult(new BigDecimal(actual), resultMap2));
                resultMap2.put("target", "Percentage".equalsIgnoreCase(perCentage) ? String.join((CharSequence)"", this.formatdecimal(new BigDecimal(target2)), "%") : this.convertResult(new BigDecimal(target2), resultMap2));
                resultMap2.put("contribution", "Percentage".equalsIgnoreCase(perCentage) ? String.join((CharSequence)"", this.formatdecimal(new BigDecimal(contribution)), "%") : this.convertResult(new BigDecimal(contribution), resultMap2));
                String drillDownDataKey2 = periodGrouping ? key : kpiCriteria.getResponseKey();
                responseObject.put(drillDownDataKey2, resultMap2);
                exstingGap = exstingGap.add(gap2);
                responseObject.put("overallGap", exstingGap);
                responseObject.put("gapStatus", exstingGap.doubleValue() <= 0.0 ? "fas fa-arrow-down" : "fas fa-arrow-up");
                kpiCriteria.setResponseObject(finalKey, responseObject);
            }
        } else if (targetMap != null && targetMap.size() > 0) {
            for (String key : ((java.util.Map<String,Object>)targetMap).keySet()) {
                if (!(targetMap.get(key) instanceof HashMap)) continue;
                finalKey = periodGrouping ? kpiCriteria.getResponseKey() : key;
                responseObject = kpiCriteria.getResponseObject(finalKey);
                exstingGap = null;
                exstingGap = responseObject.get("overallGap") != null ? (BigDecimal)responseObject.get("overallGap") : new BigDecimal(0);
                List<Object> list = nodeKeyList = CollectionUtils.isNotEmpty((Collection)formulaBuilder.getNodeKeyList()) ? Arrays.asList(formulaBuilder.getNodeKeyList().toArray()) : Arrays.asList("DummyNodeKey");
                perCentage = subkpi ? (Objects.nonNull(subkpidto.getSubKpiValue().get("dataType")) ? subkpidto.getSubKpiValue().get("dataType").toString() : "") : (Objects.nonNull(kpidto.getKpiValue().get("dataType")) ? kpidto.getKpiValue().get("dataType").toString() : "");
                perCentage = StringUtils.isEmpty((CharSequence)perCentage) && Objects.nonNull(targetMap.get("dataType")) ? targetMap.get("dataType").toString() : perCentage;
                isPercentage = "Percentage".equalsIgnoreCase(perCentage);
                function = isPercentage ? "AVG" : "SUM";
                actualFormulaExpression = StringUtils.isNotEmpty((CharSequence)formulaBuilder.getExpression()) ? formulaBuilder.getExpression() : function + "[DummyNodeKey]";
                targetFormulaExpression = StringUtils.isNotEmpty((CharSequence)formulaBuilder.getExpression()) ? formulaBuilder.getExpression() : function + "[DummyNodeKey]";
                for (Object nodeKey : nodeKeyList) {
                    actualNodeKeyMap = new HashMap();
                    targetNodeKeyMap = (Map)targetMap.get(key);
                    targetList = (List)targetNodeKeyMap.get(nodeKey.toString());
                    targetValue = CollectionUtils.isNotEmpty((Collection)targetList) ? String.join((CharSequence)",", targetList) : "0";
                    targetFormulaExpression = targetFormulaExpression.replace(nodeKey.toString(), targetValue);
                }
                actualFormulaExpression = actualFormulaExpression.replaceAll("\\[", "(").replaceAll("\\]", ")");
                targetFormulaExpression = targetFormulaExpression.replaceAll("\\[", "(").replaceAll("\\]", ")");
                target = formulaUtil.applyExpression(targetFormulaExpression);
                resultMap = new HashMap<String, Object>();
                resultMap.put("dataType", perCentage);
                currencyObj = null;
                globalCurrency = this.getGlobalCurrency();
                currencyObj = subkpi ? (subkpidto.getSubKpiValue().get("kpiCurrency") != null ? (Object)subkpidto.getSubKpiValue().get("kpiCurrency") : (Object)actualMap.get("currency")) : (kpidto.getKpiValue().get("kpiCurrency") != null ? (Object)kpidto.getKpiValue().get("kpiCurrency") : (Object)actualMap.get("currency"));
                currency = Objects.nonNull(currencyObj) && StringUtils.isNotEmpty((CharSequence)currencyObj.toString()) ? String.join((CharSequence)"", currencyObj.toString(), " ") : globalCurrency;
                currency = "Currency".equalsIgnoreCase(perCentage) ? currency : "";
                resultMap.put("currency", currency);
                gap = new BigDecimal(0);
                if (StringUtils.isNotEmpty((CharSequence)target)) {
                    gap = new BigDecimal(0);
                    resultMap.put("gapStatus", gap.doubleValue() <= 0.0 ? "fas fa-arrow-down" : "fas fa-arrow-up");
                    if (gap.doubleValue() != 0.0) {
                        resultMap.put("gap", "Percentage".equalsIgnoreCase(perCentage) ? String.join((CharSequence)"", this.formatdecimal(gap), "%") : this.convertResult(gap, resultMap));
                    } else {
                        resultMap.put("gap", "Percentage".equalsIgnoreCase(perCentage) ? String.join((CharSequence)"", "0", "%") : Double.valueOf(gap.doubleValue()));
                    }
                }
                if (kpiCriteria.getGroupBy().equals("Measure")) {
                    detailsDTO = this.kpiService.lookupNodeKeyDetail(key);
                    if (detailsDTO != null) {
                        resultMap.put("nodeKey", detailsDTO.getNodeKey());
                        resultMap.put("measureKey", detailsDTO.getMeasureKey());
                        resultMap.put("measureType", detailsDTO.getMeasureType());
                    } else {
                        resultMap.put("nodeKey", "0");
                        resultMap.put("measureKey", "0");
                        resultMap.put("measureType", 0);
                    }
                }
                if (subkpi) {
                    resultMap.put("kpi", subkpidto.getId());
                } else {
                    resultMap.put("kpi", kpidto.getId());
                }
                resultMap.put("actual", null);
                resultMap.put("target", "Percentage".equalsIgnoreCase(perCentage) ? String.join((CharSequence)"", this.formatdecimal(new BigDecimal((String)target)), "%") : this.convertResult(new BigDecimal((String)target), resultMap));
                drillDownDataKey = periodGrouping ? key : kpiCriteria.getResponseKey();
                responseObject.put(drillDownDataKey, resultMap);
                exstingGap = exstingGap.add(gap);
                responseObject.put("overallGap", exstingGap);
                responseObject.put("gapStatus", exstingGap.doubleValue() <= 0.0 ? "fas fa-arrow-down" : "fas fa-arrow-up");
                kpiCriteria.setResponseObject(finalKey, responseObject);
            }
        }
        System.out.println(" Actual Size " + actualMap.size() + " Target Map Size :: " + targetMap.size());
        if (actualMap != null && actualMap.size() > 0) {
            for (String key : ((java.util.Map<String,Object>)targetMap).keySet()) {
                if (!Objects.isNull(actualMap.get(key))) continue;
                System.out.println(key);
                if (!(targetMap.get(key) instanceof HashMap)) continue;
                finalKey = periodGrouping ? kpiCriteria.getResponseKey() : key;
                responseObject = kpiCriteria.getResponseObject(finalKey);
                exstingGap = null;
                exstingGap = responseObject.get("overallGap") != null ? (BigDecimal)responseObject.get("overallGap") : new BigDecimal(0);
                List<Object> list = nodeKeyList = CollectionUtils.isNotEmpty((Collection)formulaBuilder.getNodeKeyList()) ? Arrays.asList(formulaBuilder.getNodeKeyList().toArray()) : Arrays.asList("DummyNodeKey");
                perCentage = subkpi ? (Objects.nonNull(subkpidto.getSubKpiValue().get("dataType")) ? subkpidto.getSubKpiValue().get("dataType").toString() : "") : (Objects.nonNull(kpidto.getKpiValue().get("dataType")) ? kpidto.getKpiValue().get("dataType").toString() : "");
                perCentage = StringUtils.isEmpty((CharSequence)perCentage) && Objects.nonNull(targetMap.get("dataType")) ? targetMap.get("dataType").toString() : perCentage;
                isPercentage = "Percentage".equalsIgnoreCase(perCentage);
                function = isPercentage ? "AVG" : "SUM";
                actualFormulaExpression = StringUtils.isNotEmpty((CharSequence)formulaBuilder.getExpression()) ? formulaBuilder.getExpression() : function + "[DummyNodeKey]";
                targetFormulaExpression = StringUtils.isNotEmpty((CharSequence)formulaBuilder.getExpression()) ? formulaBuilder.getExpression() : function + "[DummyNodeKey]";
                for (Object nodeKey : nodeKeyList) {
                    actualNodeKeyMap = new HashMap();
                    targetNodeKeyMap = (Map)targetMap.get(key);
                    targetList = (List)targetNodeKeyMap.get(nodeKey.toString());
                    targetValue = CollectionUtils.isNotEmpty((Collection)targetList) ? String.join((CharSequence)",", targetList) : "0";
                    targetFormulaExpression = targetFormulaExpression.replace(nodeKey.toString(), targetValue);
                }
                actualFormulaExpression = actualFormulaExpression.replaceAll("\\[", "(").replaceAll("\\]", ")");
                targetFormulaExpression = targetFormulaExpression.replaceAll("\\[", "(").replaceAll("\\]", ")");
                target = formulaUtil.applyExpression(targetFormulaExpression);
                resultMap = new HashMap();
                resultMap.put("dataType", perCentage);
                currencyObj = null;
                globalCurrency = this.getGlobalCurrency();
                currencyObj = subkpi ? (subkpidto.getSubKpiValue().get("kpiCurrency") != null ? subkpidto.getSubKpiValue().get("kpiCurrency") : actualMap.get("currency")) : (kpidto.getKpiValue().get("kpiCurrency") != null ? kpidto.getKpiValue().get("kpiCurrency") : actualMap.get("currency"));
                currency = Objects.nonNull(currencyObj) && StringUtils.isNotEmpty((CharSequence)currencyObj.toString()) ? String.join((CharSequence)"", currencyObj.toString(), " ") : globalCurrency;
                currency = "Currency".equalsIgnoreCase(perCentage) ? currency : "";
                resultMap.put("currency", currency);
                gap = new BigDecimal(0);
                if (StringUtils.isNotEmpty((CharSequence)target)) {
                    gap = new BigDecimal(0);
                    resultMap.put("gapStatus", gap.doubleValue() <= 0.0 ? "fas fa-arrow-down" : "fas fa-arrow-up");
                    if (gap.doubleValue() != 0.0) {
                        resultMap.put("gap", "Percentage".equalsIgnoreCase(perCentage) ? String.join((CharSequence)"", this.formatdecimal(gap), "%") : this.convertResult(gap, resultMap));
                    } else {
                        resultMap.put("gap", "Percentage".equalsIgnoreCase(perCentage) ? String.join((CharSequence)"", "0", "%") : Double.valueOf(gap.doubleValue()));
                    }
                }
                if (kpiCriteria.getGroupBy().equals("Measure")) {
                    detailsDTO = this.kpiService.lookupNodeKeyDetail(key);
                    if (detailsDTO != null) {
                        resultMap.put("nodeKey", detailsDTO.getNodeKey());
                        resultMap.put("measureKey", detailsDTO.getMeasureKey());
                        resultMap.put("measureType", detailsDTO.getMeasureType());
                    } else {
                        resultMap.put("nodeKey", "0");
                        resultMap.put("measureKey", "0");
                        resultMap.put("measureType", 0);
                    }
                }
                if (subkpi) {
                    resultMap.put("kpi", subkpidto.getId());
                } else {
                    resultMap.put("kpi", kpidto.getId());
                }
                resultMap.put("actual", null);
                resultMap.put("target", "Percentage".equalsIgnoreCase(perCentage) ? String.join((CharSequence)"", this.formatdecimal(new BigDecimal((String)target)), "%") : this.convertResult(new BigDecimal((String)target), resultMap));
                drillDownDataKey = periodGrouping ? key : kpiCriteria.getResponseKey();
                responseObject.put(drillDownDataKey, resultMap);
                exstingGap = exstingGap.add(gap);
                responseObject.put("overallGap", exstingGap);
                responseObject.put("gapStatus", exstingGap.doubleValue() <= 0.0 ? "fas fa-arrow-down" : "fas fa-arrow-up");
                kpiCriteria.setResponseObject(finalKey, responseObject);
            }
        }
        System.out.println("Response Object :::: " + kpiCriteria.getResponseObject());
        return kpiCriteria.getResponseObject();
    }

    private void updateBreakDownData(KPICriteria kpiCriteria, Map<String, Object> actualMap, Map<String, Object> targetMap, String nodeKey) {
        if (!Objects.isNull(nodeKey)) {
            kpiCriteria.setNodeKey(this.kpiService.lookupNodeKey(nodeKey));
        }
        List kpiDetailsList = this.kpiService.retrieveOrgKPIDetails(kpiCriteria);
        System.out.println("#############");
        System.out.println("ALG TEST = " + kpiDetailsList);
        System.out.println("#############");
        System.out.println("KPI detail list ::: " + kpiDetailsList);
        for (Map kpiDetailObj : (java.util.List<java.util.Map>)(java.util.List)kpiDetailsList) {
            HashMap<String, ArrayList<String>> nodeKeyActualMap = null;
            HashMap<String, ArrayList<String>> nodeKeyTargetMap = null;
            ArrayList<String> actualList = new ArrayList<String>();
            ArrayList<String> targetList = new ArrayList<String>();
            HashMap<String, ArrayList<String>> nodeKeyActualMapmeasure = null;
            HashMap<String, ArrayList<String>> nodeKeyTargetMapmeasure = null;
            ArrayList<String> actualListmeasure = new ArrayList<String>();
            ArrayList<String> targetListmeasure = new ArrayList<String>();
            boolean groupByDept = "Dept".equalsIgnoreCase(kpiCriteria.getGroupBy());
            boolean groupByMeasure = "Measure".equalsIgnoreCase(kpiCriteria.getGroupBy());
            String groupKey = null;
            groupKey = groupByDept ? (Objects.nonNull(kpiDetailObj.get("dept")) ? StringUtils.stripToEmpty((String)kpiDetailObj.get("dept").toString()) : "") : (groupByMeasure ? (Objects.nonNull(kpiDetailObj.get("measureName")) ? StringUtils.stripToEmpty((String)kpiDetailObj.get("measureName").toString()) : "") : kpiDetailObj.get("org_key").toString());
            if (kpiCriteria.getDeptName() != null) {
                String string = groupKey = Objects.nonNull(kpiDetailObj.get("dept")) ? StringUtils.stripToEmpty((String)kpiDetailObj.get("dept").toString()) : "";
            }
            if (actualMap.get(groupKey) != null) {
                nodeKeyActualMap = (HashMap<String, ArrayList<String>>)actualMap.get(groupKey);
                if (nodeKeyActualMap.get(nodeKey) != null) {
                    actualList = new ArrayList((List)nodeKeyActualMap.get(nodeKey));
                }
            } else {
                actualList = new ArrayList();
                nodeKeyActualMap = new HashMap<String, ArrayList<String>>();
            }
            if (targetMap.get(groupKey) != null) {
                nodeKeyTargetMap = (HashMap<String, ArrayList<String>>)targetMap.get(groupKey);
                if (nodeKeyTargetMap.get(nodeKey) != null) {
                    targetList = new ArrayList((List)nodeKeyTargetMap.get(nodeKey));
                }
            } else {
                targetList = new ArrayList();
                nodeKeyTargetMap = new HashMap<String, ArrayList<String>>();
            }
            if (groupByMeasure && kpiDetailObj.get("measureType").equals(1)) {
                if (actualMap.get(nodeKey) != null) {
                    nodeKeyActualMapmeasure = (HashMap<String, ArrayList<String>>)actualMap.get(nodeKey);
                    if (nodeKeyActualMapmeasure.get(nodeKey) != null) {
                        actualListmeasure = new ArrayList((List)nodeKeyActualMapmeasure.get(nodeKey));
                    }
                } else {
                    actualListmeasure = new ArrayList();
                    nodeKeyActualMapmeasure = new HashMap<String, ArrayList<String>>();
                }
                if (targetMap.get(nodeKey) != null) {
                    nodeKeyTargetMapmeasure = (HashMap<String, ArrayList<String>>)targetMap.get(nodeKey);
                    if (nodeKeyTargetMapmeasure.get(nodeKey) != null) {
                        targetListmeasure = new ArrayList((List)nodeKeyTargetMapmeasure.get(nodeKey));
                    }
                } else {
                    targetListmeasure = new ArrayList();
                    nodeKeyTargetMapmeasure = new HashMap<String, ArrayList<String>>();
                }
            }
            if (kpiDetailObj.get("A") != null && this.validateDataKey.test(kpiDetailObj.get("A").toString())) {
                actualList.add(kpiDetailObj.get("A").toString());
                nodeKeyActualMap.put(nodeKey, actualList);
                actualMap.put(groupKey, nodeKeyActualMap);
                if (groupByMeasure && kpiDetailObj.get("measureType").equals(1)) {
                    actualListmeasure.add(kpiDetailObj.get("A").toString());
                    nodeKeyActualMapmeasure.put(nodeKey, actualListmeasure);
                    actualMap.put(nodeKey, nodeKeyActualMapmeasure);
                    String dataType = Objects.nonNull(kpiDetailObj.get("dataType")) ? kpiDetailObj.get("dataType").toString() : "";
                    Object currencyObj = kpiDetailObj.get("currency");
                    if (Objects.nonNull(currencyObj) && StringUtils.isNotEmpty((CharSequence)currencyObj.toString())) {
                        actualMap.put("currency", currencyObj.toString());
                    }
                    actualMap.put("dataType", dataType);
                }
            }
            if (!this.validateDataKey.test(kpiDetailObj.get("T").toString())) continue;
            targetList.add(kpiDetailObj.get("T").toString());
            nodeKeyTargetMap.put(nodeKey, targetList);
            targetMap.put(groupKey, nodeKeyTargetMap);
            if (!groupByMeasure || !kpiDetailObj.get("measureType").equals(1)) continue;
            targetListmeasure.add(kpiDetailObj.get("T").toString());
            nodeKeyTargetMapmeasure.put(nodeKey, targetListmeasure);
            targetMap.put(nodeKey, nodeKeyTargetMapmeasure);
        }
    }

    public Map<String, Integer> buildKPIStatusLight(KPIDTO kpidto, KPICriteria kpiCriteria, SubKPIDTO subkpidto, String flagtype, Map<String, Integer> countMap, String empId, String period) {
        int fragment;
        String kpiType;
        String range5;
        String range4;
        String range3;
        String range2;
        String range1;
        int greenCount = 0;
        int redCount = 0;
        int yellowCount = 0;
        int lightredCount = 0;
        int lightgreenCount = 0;
        if (countMap == null) {
            countMap = new HashMap<String, Integer>();
            countMap.put("RED", 0);
            countMap.put("LIGHTRED", 0);
            countMap.put("GREEN", 0);
            countMap.put("LIGHTGREEN", 0);
            countMap.put("YELLOW", 0);
        } else {
            if (countMap.get("GREEN") != null) {
                greenCount = countMap.get("GREEN");
            } else {
                countMap.put("GREEN", 0);
            }
            if (countMap.get("YELLOW") != null) {
                yellowCount = countMap.get("YELLOW");
            } else {
                countMap.put("YELLOW", 0);
            }
            if (countMap.get("RED") != null) {
                redCount = countMap.get("RED");
            } else {
                countMap.put("RED", 0);
            }
            if (countMap.get("LIGHTRED") != null) {
                lightredCount = countMap.get("LIGHTRED");
            } else {
                countMap.put("LIGHTRED", 0);
            }
            if (countMap.get("LIGHTGREEN") != null) {
                lightgreenCount = countMap.get("LIGHTGREEN");
            } else {
                countMap.put("LIGHTGREEN", 0);
            }
        }
        CustomPerformance stringObjectsMap = this.kpiService.findCustomPerformanceByOrgId();
        BigDecimal target = null;
        if (flagtype.equalsIgnoreCase("subkpi")) {
            boolean percentageCheck;
            range1 = Objects.nonNull(subkpidto.getSubKpiValue().get("threshold1")) ? subkpidto.getSubKpiValue().get("threshold1").toString() : null;
            range2 = Objects.nonNull(subkpidto.getSubKpiValue().get("threshold2")) ? subkpidto.getSubKpiValue().get("threshold2").toString() : null;
            range3 = Objects.nonNull(subkpidto.getSubKpiValue().get("threshold3")) ? subkpidto.getSubKpiValue().get("threshold3").toString() : null;
            range4 = Objects.nonNull(subkpidto.getSubKpiValue().get("threshold4")) ? subkpidto.getSubKpiValue().get("threshold4").toString() : null;
            range5 = Objects.nonNull(subkpidto.getSubKpiValue().get("threshold5")) ? subkpidto.getSubKpiValue().get("threshold5").toString() : null;
            boolean dataHasPercent = Objects.nonNull(subkpidto.getSubKpiValue().get("target")) ? subkpidto.getSubKpiValue().get("target").toString().contains("%") : false;
            boolean bl = percentageCheck = Objects.nonNull(subkpidto.getSubKpiValue().get("dataType")) ? "Percentage".equalsIgnoreCase(subkpidto.getSubKpiValue().get("dataType").toString()) : false;
            target = dataHasPercent ? new BigDecimal(subkpidto.getSubKpiValue().get("target").toString().substring(0, "%".length())) : (Objects.nonNull(subkpidto.getSubKpiValue().get("target")) ? new BigDecimal(subkpidto.getSubKpiValue().get("target").toString()) : new BigDecimal(0));
            kpiType = Objects.nonNull(subkpidto.getSubKpiValue().get("kpiType")) ? subkpidto.getSubKpiValue().get("kpiType").toString() : "";
        } else {
            boolean percentageCheck;
            range1 = Objects.nonNull(kpidto.getKpiValue().get("threshold1")) ? kpidto.getKpiValue().get("threshold1").toString() : null;
            range2 = Objects.nonNull(kpidto.getKpiValue().get("threshold2")) ? kpidto.getKpiValue().get("threshold2").toString() : null;
            range3 = Objects.nonNull(kpidto.getKpiValue().get("threshold3")) ? kpidto.getKpiValue().get("threshold3").toString() : null;
            range4 = Objects.nonNull(kpidto.getKpiValue().get("threshold4")) ? kpidto.getKpiValue().get("threshold4").toString() : null;
            range5 = Objects.nonNull(kpidto.getKpiValue().get("threshold5")) ? kpidto.getKpiValue().get("threshold5").toString() : null;
            boolean dataHasPercent = Objects.nonNull(kpidto.getKpiValue().get("target")) ? kpidto.getKpiValue().get("target").toString().contains("%") : false;
            boolean bl = percentageCheck = Objects.nonNull(kpidto.getKpiValue().get("dataType")) ? "Percentage".equalsIgnoreCase(kpidto.getKpiValue().get("dataType").toString()) : false;
            target = dataHasPercent ? new BigDecimal(kpidto.getKpiValue().get("target").toString().substring(0, "%".length())) : (Objects.nonNull(kpidto.getKpiValue().get("target")) ? new BigDecimal(kpidto.getKpiValue().get("target").toString()) : new BigDecimal(0));
            String string = kpiType = Objects.nonNull(kpidto.getKpiValue().get("kpiType")) ? kpidto.getKpiValue().get("kpiType").toString() : "";
        }
        if ((Objects.isNull(range1) || Objects.nonNull(range1) && range1.equals("")) && stringObjectsMap != null && stringObjectsMap.getThreshold1() != null) {
            range1 = stringObjectsMap.getThreshold1();
        }
        if ((Objects.isNull(range2) || Objects.nonNull(range2) && range2.equals("")) && stringObjectsMap != null && stringObjectsMap.getThreshold2() != null) {
            range2 = stringObjectsMap.getThreshold2();
        }
        if ((Objects.isNull(range3) || Objects.nonNull(range3) && range3.equals("")) && stringObjectsMap != null && stringObjectsMap.getThreshold3() != null) {
            range3 = stringObjectsMap.getThreshold3();
        }
        if ((Objects.isNull(range4) || Objects.nonNull(range4) && range4.equals("")) && stringObjectsMap != null && stringObjectsMap.getThreshold4() != null) {
            range4 = stringObjectsMap.getThreshold4();
        }
        if ((Objects.isNull(range5) || Objects.nonNull(range5) && range5.equals("")) && stringObjectsMap != null && stringObjectsMap.getThreshold5() != null) {
            range5 = stringObjectsMap.getThreshold5();
        }
        String threshold = stringObjectsMap.getThreshold();
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
            threshold5 = StringUtils.isNotEmpty((CharSequence)thresholdDisplay5) ? new BigDecimal(thresholdDisplay5.substring(0, thresholdDisplay5.length() - "%".length())) : new BigDecimal(0);
        } else {
            String modifiedVal1 = this.formattedToOriginal(thresholdDisplay1);
            String modifiedVal2 = this.formattedToOriginal(thresholdDisplay2);
            String modifiedVal3 = this.formattedToOriginal(thresholdDisplay3);
            String modifiedVal4 = this.formattedToOriginal(thresholdDisplay4);
            String modifiedVal5 = this.formattedToOriginal(thresholdDisplay5);
            threshold1 = StringUtils.isNotEmpty((CharSequence)modifiedVal1) ? new BigDecimal(modifiedVal1) : new BigDecimal(0);
            threshold2 = StringUtils.isNotEmpty((CharSequence)modifiedVal2) ? new BigDecimal(modifiedVal2) : new BigDecimal(0);
            threshold3 = StringUtils.isNotEmpty((CharSequence)modifiedVal3) ? new BigDecimal(modifiedVal3) : new BigDecimal(0);
            threshold4 = StringUtils.isNotEmpty((CharSequence)modifiedVal4) ? new BigDecimal(modifiedVal4) : new BigDecimal(0);
            threshold5 = StringUtils.isNotEmpty((CharSequence)modifiedVal5) ? new BigDecimal(modifiedVal5) : new BigDecimal(0);
        }
        Map subMap = null;
        subMap = flagtype.equalsIgnoreCase("subkpi") ? this.buildKPIDataFeed(null, subkpidto, flagtype, empId, period) : this.buildKPIDataFeed(kpidto, null, "", empId, period);
        BigDecimal actual = Objects.nonNull(subMap.get("actual")) ? new BigDecimal(subMap.get("actual").toString()) : new BigDecimal(0);
        int n = fragment = Objects.nonNull(subMap.get("fragment")) ? Integer.valueOf(subMap.get("fragment").toString()) : 0;
        if (fragment == 0) {
            fragment = 1;
        }
        BigDecimal actualThreshold = Objects.nonNull(subMap.get("actualThreshold")) ? new BigDecimal(subMap.get("actualThreshold").toString()) : new BigDecimal(0);
        BigDecimal targetThreshold = Objects.nonNull(subMap.get("targetThreshold")) ? new BigDecimal(subMap.get("targetThreshold").toString()) : new BigDecimal(0);
        BigDecimal updatedTarget = target.multiply(new BigDecimal(fragment));
        boolean thresholdCheck = threshold1.doubleValue() != 0.0 || threshold2.doubleValue() != 0.0 || threshold3.doubleValue() != 0.0;
        BigDecimal finalTarget = Objects.nonNull(subMap.get("target")) ? new BigDecimal(subMap.get("target").toString()) : updatedTarget;
        boolean etlPercentageCheck = Objects.nonNull(subMap.get("dataType")) && "Percentage".equalsIgnoreCase(subMap.get("dataType").toString());
        BigDecimal finalResult = percentCheckThreshold || etlPercentageCheck ? (BigDecimal)this.targetFunction.apply(actual, finalTarget) : finalTarget.subtract(actual);
        int targetCheck = 0;
        if (!thresholdCheck) {
            finalResult = finalTarget.doubleValue() != 0.0 ? actual.divide(finalTarget, 2, RoundingMode.HALF_EVEN).multiply(new BigDecimal(100)) : new BigDecimal(0);
            targetCheck = finalResult.compareTo(new BigDecimal(100));
        }
        BigDecimal gap = new BigDecimal(0);
        int result = 0;
        if (flagtype.equalsIgnoreCase("subkpi")) {
            subkpidto.getSubKpiValue().put("actual", etlPercentageCheck ? String.join((CharSequence)"", this.formatdecimal(actual), "%") : this.convertResult(actual, subMap));
            subkpidto.getSubKpiValue().put("target", etlPercentageCheck && Objects.nonNull(subMap.get("target")) ? String.join((CharSequence)"", this.formatdecimal(finalTarget), "%") : this.convertResult(finalTarget, subMap));
            if (actualThreshold.doubleValue() > 0.0) {
                subkpidto.getSubKpiValue().put("actualThreshold", actualThreshold.toPlainString());
            }
            if (targetThreshold.doubleValue() > 0.0) {
                subkpidto.getSubKpiValue().put("targetThreshold", targetThreshold.toPlainString());
            }
            if (finalTarget.doubleValue() != 0.0) {
                gap = actual.subtract(finalTarget);
            }
            if (gap.doubleValue() != 0.0) {
                subkpidto.getSubKpiValue().put("gap", etlPercentageCheck ? String.join((CharSequence)"", this.formatdecimal(gap), "%") : this.convertResult(gap, subMap));
            } else {
                subkpidto.getSubKpiValue().put("gap", etlPercentageCheck ? String.join((CharSequence)"", "0", "%") : Double.valueOf(gap.doubleValue()));
            }
        } else {
            kpidto.getKpiValue().put("actual", etlPercentageCheck ? String.join((CharSequence)"", this.formatdecimal(actual), "%") : this.convertResult(actual, subMap));
            kpidto.getKpiValue().put("target", etlPercentageCheck && Objects.nonNull(subMap.get("target")) ? String.join((CharSequence)"", this.formatdecimal(finalTarget), "%") : this.convertResult(finalTarget, subMap));
            if (actualThreshold.doubleValue() > 0.0) {
                kpidto.getKpiValue().put("actualThreshold", actualThreshold.toPlainString());
            }
            if (targetThreshold.doubleValue() > 0.0) {
                kpidto.getKpiValue().put("targetThreshold", targetThreshold.toPlainString());
            }
            if (finalTarget.doubleValue() != 0.0) {
                gap = actual.subtract(finalTarget);
            }
            if (gap.doubleValue() != 0.0) {
                kpidto.getKpiValue().put("gap", etlPercentageCheck ? String.join((CharSequence)"", this.formatdecimal(gap), "%") : this.convertResult(gap, subMap));
            } else {
                kpidto.getKpiValue().put("gap", etlPercentageCheck ? String.join((CharSequence)"", "0", "%") : Double.valueOf(gap.doubleValue()));
            }
        }
        if (thresholdCheck) {
            BigDecimal updatedThreshold5 = null;
            BigDecimal updatedThreshold4 = null;
            BigDecimal updatedThreshol3 = null;
            BigDecimal updatedThreshold2 = null;
            BigDecimal updatedThreshold1;
            String customValue = flagtype.equalsIgnoreCase("subkpi") ? this.applyKPICustomThreshold(subkpidto, actual.toPlainString(), finalTarget.toPlainString()) : this.applyKPICustomThreshold(kpidto, actual.toPlainString(), finalTarget.toPlainString());
            BigDecimal bigDecimal = finalResult = StringUtils.isNotEmpty((CharSequence)customValue) ? new BigDecimal(customValue) : finalResult;
            BigDecimal bigDecimal2 = percentCheckThreshold ? threshold1 : (updatedThreshold1 = StringUtils.isNotEmpty((CharSequence)customValue) ? threshold1 : threshold1.multiply(new BigDecimal(fragment)));
            BigDecimal bigDecimal3 = percentCheckThreshold ? threshold2 : (updatedThreshold2 = StringUtils.isNotEmpty((CharSequence)customValue) ? threshold2 : threshold2.multiply(new BigDecimal(fragment)));
            BigDecimal bigDecimal4 = percentCheckThreshold ? threshold3 : (updatedThreshol3 = StringUtils.isNotEmpty((CharSequence)customValue) ? threshold3 : threshold3.multiply(new BigDecimal(fragment)));
            BigDecimal bigDecimal5 = percentCheckThreshold ? threshold4 : (updatedThreshold4 = StringUtils.isNotEmpty((CharSequence)customValue) ? threshold4 : threshold4.multiply(new BigDecimal(fragment)));
            BigDecimal bigDecimal6 = percentCheckThreshold ? threshold5 : (updatedThreshold5 = StringUtils.isNotEmpty((CharSequence)customValue) ? threshold5 : threshold5.multiply(new BigDecimal(fragment)));
            if (threshold.equalsIgnoreCase("option_5") || threshold.equalsIgnoreCase("five_status")) {
                if (flagtype.equalsIgnoreCase("subkpi")) {
                    if (this.lessthan(finalResult, updatedThreshold2)) {
                        String statusClass = kpiType.equalsIgnoreCase("lag") ? "green fas fa-flag" : "red fas fa-flag";
                        int n2 = result = kpiType.equalsIgnoreCase("lag") ? countMap.put("GREEN", greenCount + 1).intValue() : countMap.put("RED", redCount + 1).intValue();
                        if (statusClass.equals("green fas fa-flag")) {
                            subkpidto.getSubKpiValue().put("statusLight", statusClass);
                            this.updateStatusCustomColor(kpidto, "GREEN", stringObjectsMap);
                        } else {
                            subkpidto.getSubKpiValue().put("statusLight", statusClass);
                            this.updateStatusCustomColor(kpidto, "RED", stringObjectsMap);
                        }
                    } else if (this.between(finalResult, updatedThreshold2, updatedThreshol3)) {
                        if (kpiType.equalsIgnoreCase("lag")) {
                            subkpidto.getSubKpiValue().put("statusLight", "lightgreen fas fa-flag");
                            this.updateStatusCustomColor(kpidto, "LIGHTGREEN", stringObjectsMap);
                            countMap.put("LIGHTGREEN", lightgreenCount + 1);
                        } else {
                            subkpidto.getSubKpiValue().put("statusLight", "lighred fas fa-flag");
                            this.updateStatusCustomColor(kpidto, "LIGHTRED", stringObjectsMap);
                            countMap.put("LIGHTRED", lightredCount + 1);
                        }
                    } else if (this.between(finalResult, updatedThreshol3, updatedThreshold4)) {
                        subkpidto.getSubKpiValue().put("statusLight", "yellow fas fa-flag");
                        this.updateStatusCustomColor(kpidto, "YELLOW", stringObjectsMap);
                        countMap.put("YELLOW", yellowCount + 1);
                    } else if (this.between(finalResult, updatedThreshold4, updatedThreshold5)) {
                        if (kpiType.equalsIgnoreCase("lag")) {
                            subkpidto.getSubKpiValue().put("statusLight", "lighred fas fa-flag");
                            this.updateStatusCustomColor(kpidto, "LIGHTRED", stringObjectsMap);
                            countMap.put("LIGHTRED", lightredCount + 1);
                        } else {
                            subkpidto.getSubKpiValue().put("statusLight", "lightgreen fas fa-flag");
                            this.updateStatusCustomColor(kpidto, "LIGHTGREEN", stringObjectsMap);
                            countMap.put("LIGHTGREEN", lightgreenCount + 1);
                        }
                    } else if (this.greaterthan(finalResult, updatedThreshold5) || finalResult.compareTo(updatedThreshold5) >= 0) {
                        String statusClass = kpiType.equalsIgnoreCase("lag") ? "red fas fa-flag" : "green fas fa-flag";
                        int n3 = result = kpiType.equalsIgnoreCase("lag") ? countMap.put("RED", redCount + 1).intValue() : countMap.put("GREEN", greenCount + 1).intValue();
                        if (statusClass.equals("green fas fa-flag")) {
                            subkpidto.getSubKpiValue().put("statusLight", statusClass);
                            this.updateStatusCustomColor(kpidto, "GREEN", stringObjectsMap);
                        } else {
                            subkpidto.getSubKpiValue().put("statusLight", statusClass);
                            this.updateStatusCustomColor(kpidto, "RED", stringObjectsMap);
                        }
                    } else {
                        String statusClass = kpiType.equalsIgnoreCase("lag") ? "green fas fa-flag" : "red fas fa-flag";
                        int n4 = result = kpiType.equalsIgnoreCase("lag") ? countMap.put("GREEN", greenCount + 1).intValue() : countMap.put("RED", redCount + 1).intValue();
                        if (statusClass.equals("green fas fa-flag")) {
                            subkpidto.getSubKpiValue().put("statusLight", statusClass);
                            this.updateStatusCustomColor(kpidto, "GREEN", stringObjectsMap);
                        } else {
                            subkpidto.getSubKpiValue().put("statusLight", statusClass);
                            this.updateStatusCustomColor(kpidto, "RED", stringObjectsMap);
                        }
                    }
                } else if (this.lessthan(finalResult, updatedThreshold2)) {
                    String statusClass = kpiType.equalsIgnoreCase("lag") ? "green fas fa-flag" : "red fas fa-flag";
                    int n5 = result = kpiType.equalsIgnoreCase("lag") ? countMap.put("GREEN", greenCount + 1).intValue() : countMap.put("RED", redCount + 1).intValue();
                    if (statusClass.equals("green fas fa-flag")) {
                        kpidto.getKpiValue().put("statusLight", statusClass);
                        this.updateStatusCustomColor(kpidto, "GREEN", stringObjectsMap);
                    } else {
                        kpidto.getKpiValue().put("statusLight", statusClass);
                        this.updateStatusCustomColor(kpidto, "RED", stringObjectsMap);
                    }
                } else if (this.between(finalResult, updatedThreshold2, updatedThreshol3)) {
                    if (kpiType.equalsIgnoreCase("lag")) {
                        kpidto.getKpiValue().put("statusLight", "lightgreen fas fa-flag");
                        this.updateStatusCustomColor(kpidto, "LIGHTGREEN", stringObjectsMap);
                        countMap.put("LIGHTGREEN", lightgreenCount + 1);
                    } else {
                        kpidto.getKpiValue().put("statusLight", "lighred fas fa-flag");
                        this.updateStatusCustomColor(kpidto, "LIGHTRED", stringObjectsMap);
                        countMap.put("LIGHTRED", lightredCount + 1);
                    }
                } else if (this.between(finalResult, updatedThreshol3, updatedThreshold4)) {
                    kpidto.getKpiValue().put("statusLight", "yellow fas fa-flag");
                    this.updateStatusCustomColor(kpidto, "YELLOW", stringObjectsMap);
                    countMap.put("YELLOW", yellowCount + 1);
                } else if (this.between(finalResult, updatedThreshold4, updatedThreshold5)) {
                    if (kpiType.equalsIgnoreCase("lag")) {
                        kpidto.getKpiValue().put("statusLight", "lighred fas fa-flag");
                        this.updateStatusCustomColor(kpidto, "LIGHTRED", stringObjectsMap);
                        countMap.put("LIGHTRED", lightredCount + 1);
                    } else {
                        kpidto.getKpiValue().put("statusLight", "lightgreen fas fa-flag");
                        this.updateStatusCustomColor(kpidto, "LIGHTGREEN", stringObjectsMap);
                        countMap.put("LIGHTGREEN", lightgreenCount + 1);
                    }
                } else if (this.greaterthan(finalResult, updatedThreshold5) || finalResult.compareTo(updatedThreshold5) >= 0) {
                    String statusClass = kpiType.equalsIgnoreCase("lag") ? "red fas fa-flag" : "green fas fa-flag";
                    int n6 = result = kpiType.equalsIgnoreCase("lag") ? countMap.put("RED", redCount + 1).intValue() : countMap.put("GREEN", greenCount + 1).intValue();
                    if (statusClass.equals("green fas fa-flag")) {
                        kpidto.getKpiValue().put("statusLight", statusClass);
                        this.updateStatusCustomColor(kpidto, "GREEN", stringObjectsMap);
                    } else {
                        kpidto.getKpiValue().put("statusLight", statusClass);
                        this.updateStatusCustomColor(kpidto, "RED", stringObjectsMap);
                    }
                } else {
                    String statusClass = kpiType.equalsIgnoreCase("lag") ? "green fas fa-flag" : "red fas fa-flag";
                    int n7 = result = kpiType.equalsIgnoreCase("lag") ? countMap.put("GREEN", greenCount + 1).intValue() : countMap.put("RED", redCount + 1).intValue();
                    if (statusClass.equals("green fas fa-flag")) {
                        kpidto.getKpiValue().put("statusLight", statusClass);
                        this.updateStatusCustomColor(kpidto, "GREEN", stringObjectsMap);
                    } else {
                        kpidto.getKpiValue().put("statusLight", statusClass);
                        this.updateStatusCustomColor(kpidto, "RED", stringObjectsMap);
                    }
                }
            } else if (flagtype.equalsIgnoreCase("subkpi")) {
                if (this.lessthan(finalResult, updatedThreshold2)) {
                    String statusClass = kpiType.equalsIgnoreCase("lag") ? "green fas fa-flag" : "red fas fa-flag";
                    int n8 = result = kpiType.equalsIgnoreCase("lag") ? countMap.put("GREEN", greenCount + 1).intValue() : countMap.put("RED", redCount + 1).intValue();
                    if (statusClass.equals("green fas fa-flag")) {
                        subkpidto.getSubKpiValue().put("statusLight", statusClass);
                        this.updateStatusCustomColor(kpidto, "GREEN", stringObjectsMap);
                    } else {
                        subkpidto.getSubKpiValue().put("statusLight", statusClass);
                        this.updateStatusCustomColor(kpidto, "RED", stringObjectsMap);
                    }
                } else if (this.between(finalResult, updatedThreshold2, updatedThreshol3)) {
                    subkpidto.getSubKpiValue().put("statusLight", "yellow fas fa-flag");
                    this.updateStatusCustomColor(kpidto, "YELLOW", stringObjectsMap);
                    countMap.put("YELLOW", yellowCount + 1);
                } else if (this.greaterthan(finalResult, updatedThreshol3) || finalResult.compareTo(updatedThreshol3) >= 0) {
                    String statusClass = kpiType.equalsIgnoreCase("lag") ? "red fas fa-flag" : "green fas fa-flag";
                    int n9 = result = kpiType.equalsIgnoreCase("lag") ? countMap.put("RED", redCount + 1).intValue() : countMap.put("GREEN", greenCount + 1).intValue();
                    if (statusClass.equals("green fas fa-flag")) {
                        subkpidto.getSubKpiValue().put("statusLight", statusClass);
                        this.updateStatusCustomColor(kpidto, "GREEN", stringObjectsMap);
                    } else {
                        subkpidto.getSubKpiValue().put("statusLight", statusClass);
                        this.updateStatusCustomColor(kpidto, "RED", stringObjectsMap);
                    }
                } else {
                    String statusClass = kpiType.equalsIgnoreCase("lag") ? "green fas fa-flag" : "red fas fa-flag";
                    int n10 = result = kpiType.equalsIgnoreCase("lag") ? countMap.put("GREEN", greenCount + 1).intValue() : countMap.put("RED", redCount + 1).intValue();
                    if (statusClass.equals("green fas fa-flag")) {
                        subkpidto.getSubKpiValue().put("statusLight", statusClass);
                        this.updateStatusCustomColor(kpidto, "GREEN", stringObjectsMap);
                    } else {
                        subkpidto.getSubKpiValue().put("statusLight", statusClass);
                        this.updateStatusCustomColor(kpidto, "RED", stringObjectsMap);
                    }
                }
            } else if (this.lessthan(finalResult, updatedThreshold2)) {
                String statusClass = kpiType.equalsIgnoreCase("lag") ? "green fas fa-flag" : "red fas fa-flag";
                int n11 = result = kpiType.equalsIgnoreCase("lag") ? countMap.put("GREEN", greenCount + 1).intValue() : countMap.put("RED", redCount + 1).intValue();
                if (statusClass.equals("green fas fa-flag")) {
                    kpidto.getKpiValue().put("statusLight", statusClass);
                    this.updateStatusCustomColor(kpidto, "GREEN", stringObjectsMap);
                } else {
                    kpidto.getKpiValue().put("statusLight", statusClass);
                    this.updateStatusCustomColor(kpidto, "RED", stringObjectsMap);
                }
            } else if (this.between(finalResult, updatedThreshold2, updatedThreshol3)) {
                kpidto.getKpiValue().put("statusLight", "yellow fas fa-flag");
                this.updateStatusCustomColor(kpidto, "YELLOW", stringObjectsMap);
                countMap.put("YELLOW", yellowCount + 1);
            } else if (this.greaterthan(finalResult, updatedThreshol3) || finalResult.compareTo(updatedThreshol3) >= 0) {
                String statusClass = kpiType.equalsIgnoreCase("lag") ? "red fas fa-flag" : "green fas fa-flag";
                int n12 = result = kpiType.equalsIgnoreCase("lag") ? countMap.put("RED", redCount + 1).intValue() : countMap.put("GREEN", greenCount + 1).intValue();
                if (statusClass.equals("green fas fa-flag")) {
                    kpidto.getKpiValue().put("statusLight", statusClass);
                    this.updateStatusCustomColor(kpidto, "GREEN", stringObjectsMap);
                } else {
                    kpidto.getKpiValue().put("statusLight", statusClass);
                    this.updateStatusCustomColor(kpidto, "RED", stringObjectsMap);
                }
            } else {
                String statusClass = kpiType.equalsIgnoreCase("lag") ? "green fas fa-flag" : "red fas fa-flag";
                int n13 = result = kpiType.equalsIgnoreCase("lag") ? countMap.put("GREEN", greenCount + 1).intValue() : countMap.put("RED", redCount + 1).intValue();
                if (statusClass.equals("green fas fa-flag")) {
                    kpidto.getKpiValue().put("statusLight", statusClass);
                    this.updateStatusCustomColor(kpidto, "GREEN", stringObjectsMap);
                } else {
                    kpidto.getKpiValue().put("statusLight", statusClass);
                    this.updateStatusCustomColor(kpidto, "RED", stringObjectsMap);
                }
            }
        } else {
            double defaultThreshold1 = 30.0;
            double defaultThreshold2 = 70.0;
            String customValue = flagtype.equalsIgnoreCase("subkpi") ? this.applyKPICustomThreshold(subkpidto, actual.toPlainString(), finalTarget.toPlainString()) : this.applyKPICustomThreshold(kpidto, actual.toPlainString(), finalTarget.toPlainString());
            BigDecimal bigDecimal = finalResult = StringUtils.isNotEmpty((CharSequence)customValue) ? new BigDecimal(customValue) : finalResult;
            if (flagtype.equalsIgnoreCase("subkpi")) {
                if (finalResult.doubleValue() >= defaultThreshold2) {
                    String statusClass = kpiType.equalsIgnoreCase("lag") ? "red fas fa-flag" : "green fas fa-flag";
                    int n14 = result = kpiType.equalsIgnoreCase("lag") ? countMap.put("RED", redCount + 1).intValue() : countMap.put("GREEN", greenCount + 1).intValue();
                    if (statusClass.equals("green fas fa-flag")) {
                        subkpidto.getSubKpiValue().put("statusLight", statusClass);
                        this.updateStatusCustomColor(kpidto, "GREEN", stringObjectsMap);
                    } else {
                        subkpidto.getSubKpiValue().put("statusLight", statusClass);
                        this.updateStatusCustomColor(kpidto, "RED", stringObjectsMap);
                    }
                } else if (finalResult.doubleValue() > defaultThreshold1 && finalResult.doubleValue() < defaultThreshold2) {
                    subkpidto.getSubKpiValue().put("statusLight", "yellow fas fa-flag");
                    this.updateStatusCustomColor(kpidto, "YELLOW", stringObjectsMap);
                    countMap.put("YELLOW", yellowCount + 1);
                } else {
                    String statusClass = kpiType.equalsIgnoreCase("lag") ? "green fas fa-flag" : "red fas fa-flag";
                    int n15 = result = kpiType.equalsIgnoreCase("lag") ? countMap.put("GREEN", greenCount + 1).intValue() : countMap.put("RED", redCount + 1).intValue();
                    if (statusClass.equals("green fas fa-flag")) {
                        subkpidto.getSubKpiValue().put("statusLight", statusClass);
                        this.updateStatusCustomColor(kpidto, "GREEN", stringObjectsMap);
                    } else {
                        subkpidto.getSubKpiValue().put("statusLight", statusClass);
                        this.updateStatusCustomColor(kpidto, "RED", stringObjectsMap);
                    }
                }
            } else if (finalResult.doubleValue() >= defaultThreshold2) {
                String statusClass = kpiType.equalsIgnoreCase("lag") ? "red fas fa-flag" : "green fas fa-flag";
                int n16 = result = kpiType.equalsIgnoreCase("lag") ? countMap.put("RED", redCount + 1).intValue() : countMap.put("GREEN", greenCount + 1).intValue();
                if (statusClass.equals("green fas fa-flag")) {
                    kpidto.getKpiValue().put("statusLight", statusClass);
                    this.updateStatusCustomColor(kpidto, "GREEN", stringObjectsMap);
                } else {
                    kpidto.getKpiValue().put("statusLight", statusClass);
                    this.updateStatusCustomColor(kpidto, "RED", stringObjectsMap);
                }
            } else if (finalResult.doubleValue() > defaultThreshold1 && finalResult.doubleValue() < defaultThreshold2) {
                kpidto.getKpiValue().put("statusLight", "yellow fas fa-flag");
                this.updateStatusCustomColor(kpidto, "YELLOW", stringObjectsMap);
                countMap.put("YELLOW", yellowCount + 1);
            } else {
                String statusClass = kpiType.equalsIgnoreCase("lag") ? "green fas fa-flag" : "red fas fa-flag";
                int n17 = result = kpiType.equalsIgnoreCase("lag") ? countMap.put("GREEN", greenCount + 1).intValue() : countMap.put("RED", redCount + 1).intValue();
                if (statusClass.equals("green fas fa-flag")) {
                    kpidto.getKpiValue().put("statusLight", statusClass);
                    this.updateStatusCustomColor(kpidto, "GREEN", stringObjectsMap);
                } else {
                    kpidto.getKpiValue().put("statusLight", statusClass);
                    this.updateStatusCustomColor(kpidto, "RED", stringObjectsMap);
                }
            }
        }
        return countMap;
    }

    public Map<String, Integer> buildKPIStatusLightDept(KPIDTO kpidto, KPICriteria kpiCriteria, Map<String, Integer> countMap, String deptId, String period) {
        int fragment;
        String range5;
        int greenCount = 0;
        int redCount = 0;
        int yellowCount = 0;
        int lightredCount = 0;
        int lightgreenCount = 0;
        if (countMap == null) {
            countMap = new HashMap<String, Integer>();
            countMap.put("RED", 0);
            countMap.put("LIGHTRED", 0);
            countMap.put("GREEN", 0);
            countMap.put("LIGHTGREEN", 0);
            countMap.put("YELLOW", 0);
        } else {
            if (countMap.get("GREEN") != null) {
                greenCount = countMap.get("GREEN");
            } else {
                countMap.put("GREEN", 0);
            }
            if (countMap.get("YELLOW") != null) {
                yellowCount = countMap.get("YELLOW");
            } else {
                countMap.put("YELLOW", 0);
            }
            if (countMap.get("RED") != null) {
                redCount = countMap.get("RED");
            } else {
                countMap.put("RED", 0);
            }
            if (countMap.get("LIGHTRED") != null) {
                lightredCount = countMap.get("LIGHTRED");
            } else {
                countMap.put("LIGHTRED", 0);
            }
            if (countMap.get("LIGHTGREEN") != null) {
                lightgreenCount = countMap.get("LIGHTGREEN");
            } else {
                countMap.put("LIGHTGREEN", 0);
            }
        }
        CustomPerformance stringObjectsMap = this.kpiService.findCustomPerformanceByOrgId();
        String range1 = Objects.nonNull(kpidto.getKpiValue().get("threshold1")) ? kpidto.getKpiValue().get("threshold1").toString() : null;
        String range2 = Objects.nonNull(kpidto.getKpiValue().get("threshold2")) ? kpidto.getKpiValue().get("threshold2").toString() : null;
        String range3 = Objects.nonNull(kpidto.getKpiValue().get("threshold3")) ? kpidto.getKpiValue().get("threshold3").toString() : null;
        String range4 = Objects.nonNull(kpidto.getKpiValue().get("threshold4")) ? kpidto.getKpiValue().get("threshold4").toString() : null;
        String string = range5 = Objects.nonNull(kpidto.getKpiValue().get("threshold5")) ? kpidto.getKpiValue().get("threshold5").toString() : null;
        if ((Objects.isNull(range1) || Objects.nonNull(range1) && range1.equals("")) && stringObjectsMap != null && stringObjectsMap.getThreshold1() != null) {
            range1 = stringObjectsMap.getThreshold1();
        }
        if ((Objects.isNull(range2) || Objects.nonNull(range2) && range2.equals("")) && stringObjectsMap != null && stringObjectsMap.getThreshold2() != null) {
            range2 = stringObjectsMap.getThreshold2();
        }
        if ((Objects.isNull(range3) || Objects.nonNull(range3) && range3.equals("")) && stringObjectsMap != null && stringObjectsMap.getThreshold3() != null) {
            range3 = stringObjectsMap.getThreshold3();
        }
        if ((Objects.isNull(range4) || Objects.nonNull(range4) && range4.equals("")) && stringObjectsMap != null && stringObjectsMap.getThreshold4() != null) {
            range4 = stringObjectsMap.getThreshold4();
        }
        if ((Objects.isNull(range5) || Objects.nonNull(range5) && range5.equals("")) && stringObjectsMap != null && stringObjectsMap.getThreshold5() != null) {
            range5 = stringObjectsMap.getThreshold5();
        }
        String threshold = stringObjectsMap.getThreshold();
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
            threshold5 = StringUtils.isNotEmpty((CharSequence)thresholdDisplay5) ? new BigDecimal(thresholdDisplay5.substring(0, thresholdDisplay5.length() - "%".length())) : new BigDecimal(0);
        } else {
            String modifiedVal1 = this.formattedToOriginal(thresholdDisplay1);
            String modifiedVal2 = this.formattedToOriginal(thresholdDisplay2);
            String modifiedVal3 = this.formattedToOriginal(thresholdDisplay3);
            String modifiedVal4 = this.formattedToOriginal(thresholdDisplay4);
            String modifiedVal5 = this.formattedToOriginal(thresholdDisplay5);
            threshold1 = StringUtils.isNotEmpty((CharSequence)modifiedVal1) ? new BigDecimal(modifiedVal1) : new BigDecimal(0);
            threshold2 = StringUtils.isNotEmpty((CharSequence)modifiedVal2) ? new BigDecimal(modifiedVal2) : new BigDecimal(0);
            threshold3 = StringUtils.isNotEmpty((CharSequence)modifiedVal3) ? new BigDecimal(modifiedVal3) : new BigDecimal(0);
            threshold4 = StringUtils.isNotEmpty((CharSequence)modifiedVal4) ? new BigDecimal(modifiedVal4) : new BigDecimal(0);
            threshold5 = StringUtils.isNotEmpty((CharSequence)modifiedVal5) ? new BigDecimal(modifiedVal5) : new BigDecimal(0);
        }
        boolean dataHasPercent = Objects.nonNull(kpidto.getKpiValue().get("target")) ? kpidto.getKpiValue().get("target").toString().contains("%") : false;
        boolean percentageCheck = Objects.nonNull(kpidto.getKpiValue().get("dataType")) ? "Percentage".equalsIgnoreCase(kpidto.getKpiValue().get("dataType").toString()) : false;
        BigDecimal target = null;
        target = dataHasPercent ? new BigDecimal(kpidto.getKpiValue().get("target").toString().substring(0, "%".length())) : (Objects.nonNull(kpidto.getKpiValue().get("target")) ? new BigDecimal(kpidto.getKpiValue().get("target").toString()) : new BigDecimal(0));
        Map subMap = this.buildKPIDataFeedDept(kpidto, deptId, period);
        BigDecimal actual = Objects.nonNull(subMap.get("actual")) ? new BigDecimal(subMap.get("actual").toString()) : new BigDecimal(0);
        int n = fragment = Objects.nonNull(subMap.get("fragment")) ? Integer.valueOf(subMap.get("fragment").toString()) : 0;
        if (fragment == 0) {
            fragment = 1;
        }
        String kpiType = Objects.nonNull(kpidto.getKpiValue().get("kpiType")) ? kpidto.getKpiValue().get("kpiType").toString() : "";
        BigDecimal updatedTarget = target.multiply(new BigDecimal(fragment));
        boolean thresholdCheck = threshold1.doubleValue() != 0.0 || threshold2.doubleValue() != 0.0 || threshold3.doubleValue() != 0.0;
        BigDecimal finalTarget = Objects.nonNull(subMap.get("target")) ? new BigDecimal(subMap.get("target").toString()) : updatedTarget;
        boolean etlPercentageCheck = Objects.nonNull(subMap.get("dataType")) && "Percentage".equalsIgnoreCase(subMap.get("dataType").toString());
        BigDecimal finalResult = percentCheckThreshold || etlPercentageCheck ? (BigDecimal)this.targetFunction.apply(actual, finalTarget) : finalTarget.subtract(actual);
        int targetCheck = 0;
        if (!thresholdCheck) {
            finalResult = finalTarget.doubleValue() != 0.0 ? actual.divide(finalTarget, 2, RoundingMode.HALF_EVEN).multiply(new BigDecimal(100)) : new BigDecimal(0);
            targetCheck = finalResult.compareTo(new BigDecimal(100));
        }
        kpidto.getKpiValue().put("actual", etlPercentageCheck ? String.join((CharSequence)"", this.formatdecimal(actual), "%") : this.convertResult(actual, subMap));
        kpidto.getKpiValue().put("target", etlPercentageCheck && Objects.nonNull(subMap.get("target")) ? String.join((CharSequence)"", this.formatdecimal(finalTarget), "%") : this.convertResult(finalTarget, subMap));
        int result = 0;
        BigDecimal gap = new BigDecimal(0);
        if (finalTarget.doubleValue() != 0.0) {
            gap = actual.subtract(finalTarget);
        }
        if (gap.doubleValue() != 0.0) {
            kpidto.getKpiValue().put("gap", etlPercentageCheck ? String.join((CharSequence)"", this.formatdecimal(gap), "%") : this.convertResult(gap, subMap));
        } else {
            kpidto.getKpiValue().put("gap", etlPercentageCheck ? String.join((CharSequence)"", "0", "%") : Double.valueOf(gap.doubleValue()));
        }
        if (thresholdCheck) {
            BigDecimal updatedThreshold5 = null;
            BigDecimal updatedThreshold4 = null;
            BigDecimal updatedThreshol3 = null;
            BigDecimal updatedThreshold2 = null;
            BigDecimal updatedThreshold1;
            String customValue = this.applyKPICustomThreshold(kpidto, actual.toPlainString(), finalTarget.toPlainString());
            BigDecimal bigDecimal = finalResult = StringUtils.isNotEmpty((CharSequence)customValue) ? new BigDecimal(customValue) : finalResult;
            BigDecimal bigDecimal2 = percentCheckThreshold ? threshold1 : (updatedThreshold1 = StringUtils.isNotEmpty((CharSequence)customValue) ? threshold1 : threshold1.multiply(new BigDecimal(fragment)));
            BigDecimal bigDecimal3 = percentCheckThreshold ? threshold2 : (updatedThreshold2 = StringUtils.isNotEmpty((CharSequence)customValue) ? threshold2 : threshold2.multiply(new BigDecimal(fragment)));
            BigDecimal bigDecimal4 = percentCheckThreshold ? threshold3 : (updatedThreshol3 = StringUtils.isNotEmpty((CharSequence)customValue) ? threshold3 : threshold3.multiply(new BigDecimal(fragment)));
            BigDecimal bigDecimal5 = percentCheckThreshold ? threshold4 : (updatedThreshold4 = StringUtils.isNotEmpty((CharSequence)customValue) ? threshold4 : threshold4.multiply(new BigDecimal(fragment)));
            BigDecimal bigDecimal6 = percentCheckThreshold ? threshold5 : (updatedThreshold5 = StringUtils.isNotEmpty((CharSequence)customValue) ? threshold5 : threshold5.multiply(new BigDecimal(fragment)));
            if (threshold.equalsIgnoreCase("option_5") || threshold.equalsIgnoreCase("five_status")) {
                if (this.lessthan(finalResult, updatedThreshold2)) {
                    String statusClass = kpiType.equalsIgnoreCase("lag") ? "green fas fa-flag" : "red fas fa-flag";
                    int n2 = result = kpiType.equalsIgnoreCase("lag") ? countMap.put("GREEN", greenCount + 1).intValue() : countMap.put("RED", redCount + 1).intValue();
                    if (statusClass.equals("green fas fa-flag")) {
                        kpidto.getKpiValue().put("statusLight", statusClass);
                        this.updateStatusCustomColor(kpidto, "GREEN", stringObjectsMap);
                    } else {
                        kpidto.getKpiValue().put("statusLight", statusClass);
                        this.updateStatusCustomColor(kpidto, "RED", stringObjectsMap);
                    }
                } else if (this.between(finalResult, updatedThreshold2, updatedThreshol3)) {
                    if (kpiType.equalsIgnoreCase("lag")) {
                        kpidto.getKpiValue().put("statusLight", "lightgreen fas fa-flag");
                        this.updateStatusCustomColor(kpidto, "LIGHTGREEN", stringObjectsMap);
                        countMap.put("LIGHTGREEN", lightgreenCount + 1);
                    } else {
                        kpidto.getKpiValue().put("statusLight", "lighred fas fa-flag");
                        this.updateStatusCustomColor(kpidto, "LIGHTRED", stringObjectsMap);
                        countMap.put("LIGHTRED", lightredCount + 1);
                    }
                } else if (this.between(finalResult, updatedThreshol3, updatedThreshold4)) {
                    kpidto.getKpiValue().put("statusLight", "yellow fas fa-flag");
                    this.updateStatusCustomColor(kpidto, "YELLOW", stringObjectsMap);
                    countMap.put("YELLOW", yellowCount + 1);
                } else if (this.between(finalResult, updatedThreshold4, updatedThreshold5)) {
                    if (kpiType.equalsIgnoreCase("lag")) {
                        kpidto.getKpiValue().put("statusLight", "lighred fas fa-flag");
                        this.updateStatusCustomColor(kpidto, "LIGHTRED", stringObjectsMap);
                        countMap.put("LIGHTRED", lightredCount + 1);
                    } else {
                        kpidto.getKpiValue().put("statusLight", "lightgreen fas fa-flag");
                        this.updateStatusCustomColor(kpidto, "LIGHTGREEN", stringObjectsMap);
                        countMap.put("LIGHTGREEN", lightgreenCount + 1);
                    }
                } else if (this.greaterthan(finalResult, updatedThreshold5) || finalResult.compareTo(updatedThreshold5) >= 0) {
                    String statusClass = kpiType.equalsIgnoreCase("lag") ? "red fas fa-flag" : "green fas fa-flag";
                    int n3 = result = kpiType.equalsIgnoreCase("lag") ? countMap.put("RED", redCount + 1).intValue() : countMap.put("GREEN", greenCount + 1).intValue();
                    if (statusClass.equals("green fas fa-flag")) {
                        kpidto.getKpiValue().put("statusLight", statusClass);
                        this.updateStatusCustomColor(kpidto, "GREEN", stringObjectsMap);
                    } else {
                        kpidto.getKpiValue().put("statusLight", statusClass);
                        this.updateStatusCustomColor(kpidto, "RED", stringObjectsMap);
                    }
                } else {
                    String statusClass = kpiType.equalsIgnoreCase("lag") ? "green fas fa-flag" : "red fas fa-flag";
                    int n4 = result = kpiType.equalsIgnoreCase("lag") ? countMap.put("GREEN", greenCount + 1).intValue() : countMap.put("RED", redCount + 1).intValue();
                    if (statusClass.equals("green fas fa-flag")) {
                        kpidto.getKpiValue().put("statusLight", statusClass);
                        this.updateStatusCustomColor(kpidto, "GREEN", stringObjectsMap);
                    } else {
                        kpidto.getKpiValue().put("statusLight", statusClass);
                        this.updateStatusCustomColor(kpidto, "RED", stringObjectsMap);
                    }
                }
            } else if (this.lessthan(finalResult, updatedThreshold2)) {
                String statusClass = kpiType.equalsIgnoreCase("lag") ? "green fas fa-flag" : "red fas fa-flag";
                int n5 = result = kpiType.equalsIgnoreCase("lag") ? countMap.put("GREEN", greenCount + 1).intValue() : countMap.put("RED", redCount + 1).intValue();
                if (statusClass.equals("green fas fa-flag")) {
                    kpidto.getKpiValue().put("statusLight", statusClass);
                    this.updateStatusCustomColor(kpidto, "GREEN", stringObjectsMap);
                } else {
                    kpidto.getKpiValue().put("statusLight", statusClass);
                    this.updateStatusCustomColor(kpidto, "RED", stringObjectsMap);
                }
            } else if (this.between(finalResult, updatedThreshold2, updatedThreshol3)) {
                kpidto.getKpiValue().put("statusLight", "yellow fas fa-flag");
                this.updateStatusCustomColor(kpidto, "YELLOW", stringObjectsMap);
                countMap.put("YELLOW", yellowCount + 1);
            } else if (this.greaterthan(finalResult, updatedThreshol3) || finalResult.compareTo(updatedThreshol3) >= 0) {
                String statusClass = kpiType.equalsIgnoreCase("lag") ? "red fas fa-flag" : "green fas fa-flag";
                int n6 = result = kpiType.equalsIgnoreCase("lag") ? countMap.put("RED", redCount + 1).intValue() : countMap.put("GREEN", greenCount + 1).intValue();
                if (statusClass.equals("green fas fa-flag")) {
                    kpidto.getKpiValue().put("statusLight", statusClass);
                    this.updateStatusCustomColor(kpidto, "GREEN", stringObjectsMap);
                } else {
                    kpidto.getKpiValue().put("statusLight", statusClass);
                    this.updateStatusCustomColor(kpidto, "RED", stringObjectsMap);
                }
            } else {
                String statusClass = kpiType.equalsIgnoreCase("lag") ? "green fas fa-flag" : "red fas fa-flag";
                int n7 = result = kpiType.equalsIgnoreCase("lag") ? countMap.put("GREEN", greenCount + 1).intValue() : countMap.put("RED", redCount + 1).intValue();
                if (statusClass.equals("green fas fa-flag")) {
                    kpidto.getKpiValue().put("statusLight", statusClass);
                    this.updateStatusCustomColor(kpidto, "GREEN", stringObjectsMap);
                } else {
                    kpidto.getKpiValue().put("statusLight", statusClass);
                    this.updateStatusCustomColor(kpidto, "RED", stringObjectsMap);
                }
            }
        } else {
            double defaultThreshold1 = 30.0;
            double defaultThreshold2 = 70.0;
            String customValue = this.applyKPICustomThreshold(kpidto, actual.toPlainString(), finalTarget.toPlainString());
            BigDecimal bigDecimal = finalResult = StringUtils.isNotEmpty((CharSequence)customValue) ? new BigDecimal(customValue) : finalResult;
            if (finalResult.doubleValue() >= defaultThreshold2) {
                String statusClass = kpiType.equalsIgnoreCase("lag") ? "red fas fa-flag" : "green fas fa-flag";
                int n8 = result = kpiType.equalsIgnoreCase("lag") ? countMap.put("RED", redCount + 1).intValue() : countMap.put("GREEN", greenCount + 1).intValue();
                if (statusClass.equals("green fas fa-flag")) {
                    kpidto.getKpiValue().put("statusLight", statusClass);
                    this.updateStatusCustomColor(kpidto, "GREEN", stringObjectsMap);
                } else {
                    kpidto.getKpiValue().put("statusLight", statusClass);
                    this.updateStatusCustomColor(kpidto, "RED", stringObjectsMap);
                }
            } else if (finalResult.doubleValue() > defaultThreshold1 && finalResult.doubleValue() < defaultThreshold2) {
                kpidto.getKpiValue().put("statusLight", "yellow fas fa-flag");
                this.updateStatusCustomColor(kpidto, "YELLOW", stringObjectsMap);
                countMap.put("YELLOW", yellowCount + 1);
            } else {
                String statusClass = kpiType.equalsIgnoreCase("lag") ? "green fas fa-flag" : "red fas fa-flag";
                int n9 = result = kpiType.equalsIgnoreCase("lag") ? countMap.put("GREEN", greenCount + 1).intValue() : countMap.put("RED", redCount + 1).intValue();
                if (statusClass.equals("green fas fa-flag")) {
                    kpidto.getKpiValue().put("statusLight", statusClass);
                    this.updateStatusCustomColor(kpidto, "GREEN", stringObjectsMap);
                } else {
                    kpidto.getKpiValue().put("statusLight", statusClass);
                    this.updateStatusCustomColor(kpidto, "RED", stringObjectsMap);
                }
            }
        }
        return countMap;
    }

    public String buildKPIStatusLightTable(KPIDTO kpidto, SubKPIDTO subkpidto, String flagtype, String actual, String target, String score) {
        String kpiType;
        boolean thresholdCheck;
        String range5;
        String range4;
        String range3;
        String range2;
        String range1;
        String threshold;
        if (flagtype.equalsIgnoreCase("subkpi")) {
            threshold = Objects.nonNull(subkpidto.getSubKpiValue().get("threshold")) ? subkpidto.getSubKpiValue().get("threshold").toString().replaceAll("_", "") : "";
            range1 = Objects.nonNull(subkpidto.getSubKpiValue().get("threshold1")) ? subkpidto.getSubKpiValue().get("threshold1").toString() : null;
            range2 = Objects.nonNull(subkpidto.getSubKpiValue().get("threshold2")) ? subkpidto.getSubKpiValue().get("threshold2").toString() : null;
            range3 = Objects.nonNull(subkpidto.getSubKpiValue().get("threshold3")) ? kpidto.getKpiValue().get("threshold3").toString() : null;
            range4 = Objects.nonNull(subkpidto.getSubKpiValue().get("threshold4")) ? kpidto.getKpiValue().get("threshold4").toString() : null;
            range5 = Objects.nonNull(subkpidto.getSubKpiValue().get("threshold5")) ? kpidto.getKpiValue().get("threshold5").toString() : null;
        } else {
            threshold = Objects.nonNull(kpidto.getKpiValue().get("threshold")) ? kpidto.getKpiValue().get("threshold").toString().replaceAll("_", "") : "";
            range1 = Objects.nonNull(kpidto.getKpiValue().get("threshold1")) ? kpidto.getKpiValue().get("threshold1").toString() : null;
            range2 = Objects.nonNull(kpidto.getKpiValue().get("threshold2")) ? kpidto.getKpiValue().get("threshold2").toString() : null;
            range3 = Objects.nonNull(kpidto.getKpiValue().get("threshold3")) ? kpidto.getKpiValue().get("threshold3").toString() : null;
            range4 = Objects.nonNull(kpidto.getKpiValue().get("threshold4")) ? kpidto.getKpiValue().get("threshold4").toString() : null;
            range5 = Objects.nonNull(kpidto.getKpiValue().get("threshold5")) ? kpidto.getKpiValue().get("threshold5").toString() : null;
        }
        CustomPerformance stringObjectsMap = this.kpiService.findCustomPerformanceByOrgId();
        if ((Objects.isNull(range1) || Objects.nonNull(range1) && range1.equals("")) && stringObjectsMap != null && stringObjectsMap.getThreshold1() != null) {
            range1 = stringObjectsMap.getThreshold1();
        }
        if ((Objects.isNull(range2) || Objects.nonNull(range2) && range2.equals("")) && stringObjectsMap != null && stringObjectsMap.getThreshold2() != null) {
            range2 = stringObjectsMap.getThreshold2();
        }
        if ((Objects.isNull(range3) || Objects.nonNull(range3) && range3.equals("")) && stringObjectsMap != null && stringObjectsMap.getThreshold3() != null) {
            range3 = stringObjectsMap.getThreshold3();
        }
        if ((Objects.isNull(range4) || Objects.nonNull(range4) && range4.equals("")) && stringObjectsMap != null && stringObjectsMap.getThreshold4() != null) {
            range4 = stringObjectsMap.getThreshold4();
        }
        if ((Objects.isNull(range5) || Objects.nonNull(range5) && range5.equals("")) && stringObjectsMap != null && stringObjectsMap.getThreshold5() != null) {
            range5 = stringObjectsMap.getThreshold5();
        }
        String thresholdDisplay1 = StringUtils.stripToEmpty((String)range1);
        String thresholdDisplay2 = StringUtils.stripToEmpty((String)range2);
        String thresholdDisplay3 = StringUtils.stripToEmpty((String)range3);
        String thresholdDisplay4 = StringUtils.stripToEmpty((String)range4);
        String thresholdDisplay5 = StringUtils.stripToEmpty((String)range5);
        boolean percentCheckThreshold = thresholdDisplay1.contains("%") || thresholdDisplay2.contains("%") || thresholdDisplay3.contains("%");
        BigDecimal threshold1 = null;
        BigDecimal threshold2 = null;
        BigDecimal threshold3 = null;
        BigDecimal threshold4 = null;
        BigDecimal threshold5 = null;
        if (percentCheckThreshold) {
            threshold1 = StringUtils.isNotEmpty((CharSequence)thresholdDisplay1) ? new BigDecimal(thresholdDisplay1.substring(0, thresholdDisplay1.length() - "%".length())) : new BigDecimal(0);
            threshold2 = StringUtils.isNotEmpty((CharSequence)thresholdDisplay2) ? new BigDecimal(thresholdDisplay2.substring(0, thresholdDisplay2.length() - "%".length())) : new BigDecimal(0);
            BigDecimal bigDecimal = threshold3 = StringUtils.isNotEmpty((CharSequence)thresholdDisplay3) ? new BigDecimal(thresholdDisplay3.substring(0, thresholdDisplay3.length() - "%".length())) : new BigDecimal(0);
            if (threshold.equals("option_5")) {
                threshold4 = StringUtils.isNotEmpty((CharSequence)thresholdDisplay4) ? new BigDecimal(thresholdDisplay4.substring(0, thresholdDisplay4.length() - "%".length())) : new BigDecimal(0);
                threshold5 = StringUtils.isNotEmpty((CharSequence)thresholdDisplay5) ? new BigDecimal(thresholdDisplay5.substring(0, thresholdDisplay5.length() - "%".length())) : new BigDecimal(0);
            }
        } else {
            String modifiedVal1 = this.formattedToOriginal(thresholdDisplay1);
            String modifiedVal2 = this.formattedToOriginal(thresholdDisplay2);
            String modifiedVal3 = this.formattedToOriginal(thresholdDisplay3);
            String modifiedVal4 = this.formattedToOriginal(thresholdDisplay4);
            String modifiedVal5 = this.formattedToOriginal(thresholdDisplay5);
            threshold1 = StringUtils.isNotEmpty((CharSequence)modifiedVal1) ? new BigDecimal(modifiedVal1) : new BigDecimal(0);
            threshold2 = StringUtils.isNotEmpty((CharSequence)modifiedVal2) ? new BigDecimal(modifiedVal2) : new BigDecimal(0);
            BigDecimal bigDecimal = threshold3 = StringUtils.isNotEmpty((CharSequence)modifiedVal3) ? new BigDecimal(modifiedVal3) : new BigDecimal(0);
            if (threshold.equalsIgnoreCase("option_5") || threshold.equalsIgnoreCase("five_status")) {
                threshold4 = StringUtils.isNotEmpty((CharSequence)modifiedVal4) ? new BigDecimal(modifiedVal4) : new BigDecimal(0);
                threshold5 = StringUtils.isNotEmpty((CharSequence)modifiedVal5) ? new BigDecimal(modifiedVal5) : new BigDecimal(0);
            }
        }
        BigDecimal actual_out = new BigDecimal(0);
        if (Objects.nonNull(actual) && !actual.equals("-")) {
            actual_out = Objects.nonNull(actual) ? new BigDecimal(actual.replace("%", "").replace("M", "").trim()) : new BigDecimal(0);
        }
        boolean bl = thresholdCheck = threshold1.doubleValue() != 0.0 || threshold2.doubleValue() != 0.0 || threshold3.doubleValue() != 0.0;
        if (thresholdCheck) {
            String result;
            kpiType = flagtype.equalsIgnoreCase("subkpi") ? String.valueOf(subkpidto.getSubKpiValue().get("kpiType")) : String.valueOf(kpidto.getKpiValue().get("kpiType"));
            if (threshold.equalsIgnoreCase("option_5") || threshold.equalsIgnoreCase("five_status")) {
                if (this.lessthan(new BigDecimal(score), threshold1)) {
                    result = kpiType.equalsIgnoreCase("lag") ? "GREEN" : "RED";
                    return result;
                }
                if (this.between(new BigDecimal(score), threshold1, threshold2)) {
                    result = kpiType.equalsIgnoreCase("lag") ? "LIGHTGREEN" : "LIGHTRED";
                    return result;
                }
                if (this.between(new BigDecimal(score), threshold2, threshold3)) {
                    return "YELLOW";
                }
                if (this.between(new BigDecimal(score), threshold3, threshold4)) {
                    result = kpiType.equalsIgnoreCase("lag") ? "LIGHTRED" : "LIGHTGREEN";
                    return result;
                }
                if (this.greaterthan(new BigDecimal(score), threshold5) || new BigDecimal(score).compareTo(threshold5) >= 0) {
                    result = kpiType.equalsIgnoreCase("lag") ? "RED" : "GREEN";
                    return result;
                }
                result = kpiType.equalsIgnoreCase("lag") ? "GREEN" : "RED";
                return result;
            }
            if (score != null) {
                if (this.lessthan(new BigDecimal(score), threshold1)) {
                    result = kpiType.equalsIgnoreCase("lag") ? "GREEN" : "RED";
                    return result;
                }
                if (this.between(new BigDecimal(score), threshold2, threshold3)) {
                    return "YELLOW";
                }
                if (this.greaterthan(new BigDecimal(score), threshold3) || new BigDecimal(score).compareTo(threshold3) >= 0) {
                    result = kpiType.equalsIgnoreCase("lag") ? "RED" : "GREEN";
                    return result;
                }
                result = kpiType.equalsIgnoreCase("lag") ? "GREEN" : "RED";
                return result;
            }
            result = kpiType.equalsIgnoreCase("lag") ? "GREEN" : "RED";
            return result;
        }
        kpiType = flagtype.equalsIgnoreCase("subkpi") ? String.valueOf(subkpidto.getSubKpiValue().get("kpiType")) : String.valueOf(kpidto.getKpiValue().get("kpiType"));
        double defaultThreshold1 = 30.0;
        double defaultThreshold2 = 70.0;
        if (actual_out.doubleValue() >= defaultThreshold2) {
            String result = kpiType.equalsIgnoreCase("lag") ? "RED" : "GREEN";
            return result;
        }
        if (actual_out.doubleValue() > defaultThreshold1 && actual_out.doubleValue() < defaultThreshold2) {
            return "YELLOW";
        }
        String result = kpiType.equalsIgnoreCase("lag") ? "GREEN" : "RED";
        return result;
    }

    public String applyKPICustomThreshold(KPIDTO kpidto, String actual, String target) {
        Map kpiValueMap = kpidto.getKpiValue();
        if (kpiValueMap == null) {
            return null;
        }
        if (kpiValueMap.containsKey("thresholdFormula") && kpiValueMap.get("thresholdFormula") != null && StringUtils.isNotEmpty((CharSequence)kpiValueMap.get("thresholdFormula").toString())) {
            String result;
            FormulaUtil formulaUtil = new FormulaUtil();
            String weight = "1";
            if (Objects.nonNull(kpiValueMap.get("weight")) && StringUtils.isNotEmpty((CharSequence)kpiValueMap.get("weight").toString())) {
                double temp = Double.parseDouble(kpiValueMap.get("weight").toString()) / 100.0;
                weight = String.valueOf(temp);
            }
            System.out.println("Kpi value map :::  " + kpiValueMap);
            System.out.println("Actual Threshold :::: " + kpidto.getKpiName() + " :::: " + actual + " :::: " + target);
            String[] searchStrArray = new String[]{"actual", "Actual", "ACTUAL", "target", "Target", "TARGET", "%", "weight", "WEIGHT", "Weight", "contribution", "Contribution", "CONTRIBUTION"};
            String[] replaceStringArray = new String[]{actual, actual, actual, target, target, target, "/1", weight, weight, weight, "1", "1", "1"};
            String thresholdFormula = kpiValueMap.get("thresholdFormula").toString() != null ? kpiValueMap.get("thresholdFormula").toString().toString() : null;
            thresholdFormula = StringUtils.replaceEach((String)thresholdFormula, (String[])searchStrArray, (String[])replaceStringArray);
            try {
                result = formulaUtil.applyExpression(thresholdFormula);
            }
            catch (Exception e) {
                result = "0";
            }
            kpiValueMap.put("thresholdResult", result);
            return result;
        }
        return null;
    }

    public String applyKPICustomThreshold(SubKPIDTO subkpidto, String actual, String target) {
        Map subValueMap = subkpidto.getSubKpiValue();
        if (subValueMap == null) {
            return null;
        }
        if (subValueMap.containsKey("thresholdFormula") && subValueMap.get("thresholdFormula") != null && StringUtils.isNotEmpty((CharSequence)subValueMap.get("thresholdFormula").toString())) {
            String result;
            FormulaUtil formulaUtil = new FormulaUtil();
            String weight = "1";
            if (Objects.nonNull(subValueMap.get("weight")) && StringUtils.isNotEmpty((CharSequence)subValueMap.get("weight").toString())) {
                double temp = Double.parseDouble(subValueMap.get("weight").toString()) / 100.0;
                weight = String.valueOf(temp);
            }
            if (subValueMap.containsKey("actualThreshold") && subValueMap.get("actualThreshold") != null) {
                actual = subValueMap.get("actualThreshold").toString();
            }
            if (subValueMap.containsKey("targetThreshold") && subValueMap.get("targetThreshold") != null) {
                target = subValueMap.get("targetThreshold").toString();
            }
            String[] searchStrArray = new String[]{"actual", "Actual", "ACTUAL", "target", "Target", "TARGET", "%", "weight", "WEIGHT", "Weight", "contribution", "Contribution", "CONTRIBUTION"};
            String[] replaceStringArray = new String[]{actual, actual, actual, target, target, target, "/1", weight, weight, weight, "1", "1", "1"};
            String thresholdFormula = subValueMap.get("thresholdFormula").toString() != null ? subValueMap.get("thresholdFormula").toString().toString() : null;
            thresholdFormula = StringUtils.replaceEach((String)thresholdFormula, (String[])searchStrArray, (String[])replaceStringArray);
            try {
                result = formulaUtil.applyExpression(thresholdFormula);
            }
            catch (Exception e) {
                result = "0";
            }
            subValueMap.put("thresholdResult", result);
            return result;
        }
        return null;
    }

    public Map<String, Integer> buildStatusLightForInitiative(KPIDTO kpidto, SubKPIDTO subkpidto, String flagtype, Map<String, Integer> countMap) {
        List initiativesDTOList = null;
        initiativesDTOList = flagtype.equalsIgnoreCase("subkpi") ? this.initiativeService.findImpactedInitiatives(subkpidto.getId()) : this.initiativeService.findImpactedInitiatives(kpidto.getId());
        for (com.estrat.scorecard.dto.InitiativesDTO initiativesDTO : (java.util.List<com.estrat.scorecard.dto.InitiativesDTO>)(java.util.List)initiativesDTOList) {
            countMap = this.buildInitiativeStatusData(initiativesDTO, countMap);
        }
        CustomPerformance stringObjectsMap = this.kpiService.findCustomPerformanceByOrgId();
        if (Objects.nonNull(countMap)) {
            String statusLight = this.calculateStatusLight(countMap);
            if (flagtype.equalsIgnoreCase("subkpi")) {
                if ("GREEN".equalsIgnoreCase(statusLight)) {
                    subkpidto.getSubKpiValue().put("statusLight", "green fas fa-flag");
                    this.updateStatusCustomColor(subkpidto, "GREEN", stringObjectsMap);
                } else if ("LIGHTGREEN".equalsIgnoreCase(statusLight)) {
                    subkpidto.getSubKpiValue().put("statusLight", "lightgreen fas fa-flag");
                    this.updateStatusCustomColor(subkpidto, "GREEN", stringObjectsMap);
                } else if ("YELLOW".equalsIgnoreCase(statusLight)) {
                    subkpidto.getSubKpiValue().put("statusLight", "yellow fas fa-flag");
                    this.updateStatusCustomColor(subkpidto, "YELLOW", stringObjectsMap);
                } else if ("LIGHTRED".equalsIgnoreCase(statusLight)) {
                    subkpidto.getSubKpiValue().put("statusLight", "lightred fas fa-flag");
                    this.updateStatusCustomColor(subkpidto, "LIGHTRED", stringObjectsMap);
                } else {
                    subkpidto.getSubKpiValue().put("statusLight", "red fas fa-flag");
                    this.updateStatusCustomColor(subkpidto, "RED", stringObjectsMap);
                }
            } else if ("GREEN".equalsIgnoreCase(statusLight)) {
                kpidto.getKpiValue().put("statusLight", "green fas fa-flag");
                this.updateStatusCustomColor(kpidto, "GREEN", stringObjectsMap);
            } else if ("LIGHTGREEN".equalsIgnoreCase(statusLight)) {
                kpidto.getKpiValue().put("statusLight", "lightgreen fas fa-flag");
                this.updateStatusCustomColor(kpidto, "GREEN", stringObjectsMap);
            } else if ("YELLOW".equalsIgnoreCase(statusLight)) {
                kpidto.getKpiValue().put("statusLight", "yellow fas fa-flag");
                this.updateStatusCustomColor(kpidto, "YELLOW", stringObjectsMap);
            } else if ("LIGHTRED".equalsIgnoreCase(statusLight)) {
                kpidto.getKpiValue().put("statusLight", "lightred fas fa-flag");
                this.updateStatusCustomColor(kpidto, "LIGHTRED", stringObjectsMap);
            } else {
                kpidto.getKpiValue().put("statusLight", "red fas fa-flag");
                this.updateStatusCustomColor(kpidto, "RED", stringObjectsMap);
            }
        }
        return countMap;
    }

    public Map<String, Integer> buildStatusLightForRisk(KPIDTO kpidto, SubKPIDTO subkpidto, String flagtype, boolean updateKpiStatus) {
        List riskDTOList = null;
        riskDTOList = flagtype.equalsIgnoreCase("subkpi") ? this.riskDetailsService.findImpactedRiskDetails(subkpidto.getId()) : this.riskDetailsService.findImpactedRiskDetails(kpidto.getId());
        CustomPerformance stringObjectsMap = this.kpiService.findCustomPerformanceByOrgId();
        LinkedHashMap<String, Integer> countMap = null;
        for (com.estrat.scorecard.dto.RiskDTO riskDTO : (java.util.List<com.estrat.scorecard.dto.RiskDTO>)(java.util.List)riskDTOList) {
            int score;
            if (!Objects.nonNull(riskDTO.getRiskValue()) || (score = Objects.nonNull(riskDTO.getRiskValue().get("score")) && riskDTO.getRiskValue().get("score").toString().trim() != "" ? Integer.valueOf(riskDTO.getRiskValue().get("score").toString()) : 0) == 0) continue;
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
            String statusLight;
            if (flagtype.equalsIgnoreCase("subkpi")) {
                statusLight = this.calculateStatusLight(countMap);
                if ("GREEN".equalsIgnoreCase(statusLight)) {
                    if (updateKpiStatus) {
                        subkpidto.getSubKpiValue().put("statusLight", "green fas fa-flag");
                        this.updateStatusCustomColor(subkpidto, "GREEN", stringObjectsMap);
                    }
                    subkpidto.getSubKpiValue().put("riskStatusLight", "green fas fa-flag");
                } else if ("YELLOW".equalsIgnoreCase(statusLight)) {
                    if (updateKpiStatus) {
                        subkpidto.getSubKpiValue().put("statusLight", "yellow fas fa-flag");
                        this.updateStatusCustomColor(subkpidto, "YELLOW", stringObjectsMap);
                    }
                    subkpidto.getSubKpiValue().put("riskStatusLight", "yellow fas fa-flag");
                } else {
                    if (updateKpiStatus) {
                        subkpidto.getSubKpiValue().put("statusLight", "red fas fa-flag");
                        this.updateStatusCustomColor(subkpidto, "RED", stringObjectsMap);
                    }
                    subkpidto.getSubKpiValue().put("riskStatusLight", "red fas fa-flag");
                }
            } else {
                statusLight = this.calculateStatusLight(countMap);
                if ("GREEN".equalsIgnoreCase(statusLight)) {
                    if (updateKpiStatus) {
                        kpidto.getKpiValue().put("statusLight", "green fas fa-flag");
                        this.updateStatusCustomColor(kpidto, "GREEN", stringObjectsMap);
                    }
                    kpidto.getKpiValue().put("riskStatusLight", "green fas fa-flag");
                } else if ("YELLOW".equalsIgnoreCase(statusLight)) {
                    if (updateKpiStatus) {
                        kpidto.getKpiValue().put("statusLight", "yellow fas fa-flag");
                        this.updateStatusCustomColor(kpidto, "YELLOW", stringObjectsMap);
                    }
                    kpidto.getKpiValue().put("riskStatusLight", "yellow fas fa-flag");
                } else {
                    if (updateKpiStatus) {
                        kpidto.getKpiValue().put("statusLight", "red fas fa-flag");
                        this.updateStatusCustomColor(kpidto, "RED", stringObjectsMap);
                    }
                    kpidto.getKpiValue().put("riskStatusLight", "red fas fa-flag");
                }
            }
        } else if (flagtype.equalsIgnoreCase("subkpi")) {
            subkpidto.getSubKpiValue().put("riskStatusLight", "");
        } else {
            kpidto.getKpiValue().put("riskStatusLight", "");
        }
        return countMap;
    }

    public Map<String, Integer> buildInitiativeStatusData(InitiativesDTO initiativesDTO, Map<String, Integer> countMap) {
        Map stringObjectsMap = initiativesDTO.getInitiativeValue();
        countMap = this.updateStatus(stringObjectsMap, countMap);
        if (stringObjectsMap.get("targetValue") != null) {
            initiativesDTO.getInitiativeValue().put("targetValue", stringObjectsMap.get("targetValue"));
        }
        if (Objects.isNull(stringObjectsMap.get("actualValue"))) {
            initiativesDTO.getInitiativeValue().put("blank", true);
            initiativesDTO.getInitiativeValue().put("actualValue", "0");
            initiativesDTO.getInitiativeValue().put("progressval", "0");
        } else {
            initiativesDTO.getInitiativeValue().put("blank", false);
        }
        return countMap;
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
        double expectedPercent = 0.0;
        double threshold85 = 0.0;
        double defaultThreshold1 = 30.0;
        double defaultThreshold2 = 70.0;
        String[] dataRanges = null;
        double progress = 0.0;
        boolean dueDateCrossed = false;
        System.out.println("stringObjectsMap.get(\"progressval\") :: " + stringObjectsMap.get("progressval"));
        try {
            double d = progress = Objects.nonNull(stringObjectsMap.get("progressval")) ? Double.valueOf(stringObjectsMap.get("progressval").toString()) : 0.0;
            if (progress == 0.0) {
                progress = Objects.nonNull(stringObjectsMap.get("progress")) ? Double.valueOf(stringObjectsMap.get("progress").toString()) : 0.0;
            }
        }
        catch (NumberFormatException nfe) {
            progress = 0.0;
        }
        String string = dateRange = stringObjectsMap.get("actualdaterange") != null && StringUtils.isNotEmpty((CharSequence)stringObjectsMap.get("actualdaterange").toString()) ? stringObjectsMap.get("actualdaterange").toString() : null;
        if (dateRange == null) {
            String string2 = dateRange = stringObjectsMap.get("daterange") != null && StringUtils.isNotEmpty((CharSequence)stringObjectsMap.get("daterange").toString()) ? stringObjectsMap.get("daterange").toString() : null;
        }
        if (dateRange == null) {
            String string3 = dateRange = stringObjectsMap.get("dateRange") != null && StringUtils.isNotEmpty((CharSequence)stringObjectsMap.get("dateRange").toString()) ? stringObjectsMap.get("dateRange").toString() : null;
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
            perDayValue = Integer.valueOf(((Object)difference).toString()) == 0 ? 100.0 : 100.0 / Double.valueOf(((Object)difference).toString());
            this.logger.error("Progess and Per Day Value  " + progress + " & " + perDayValue);
            Calendar calendar = Calendar.getInstance();
            Date currrentDate = new Date();
            calendar.setTime(currrentDate);
            String dateperiod = (String)UserThreadLocal.get().get("DATE_PERIOD");
            String[] daterange_calendar = dateperiod.split("-");
            SimpleDateFormat inputFormat = new SimpleDateFormat("MM/dd/yyyy");
            try {
                Date startDate_calendar = inputFormat.parse(daterange_calendar[0]);
                Date endDate_Calendar = inputFormat.parse(daterange_calendar[1]);
                calendar.setTime(endDate_Calendar);
                calendar.set(11, 23);
                calendar.set(12, 59);
                calendar.set(13, 59);
                calendar.set(14, 999);
            }
            catch (Exception ex) {
                ex.printStackTrace();
            }
            Date curDate = calendar.getTime();
            if (curDate.after(secondDate)) {
                dueDateCrossed = true;
                curDate = secondDate;
            }
            Long diffFromCurrentDate = ChronoUnit.DAYS.between(firstDate.toInstant(), curDate.toInstant());
            expectedPercent = perDayValue * Double.valueOf(((Object)diffFromCurrentDate).toString());
            String formattedPercent = String.format("%.2f", expectedPercent);
            double precisePercent = Double.parseDouble(formattedPercent);
            threshold85 = 0.85 * precisePercent;
            stringObjectsMap.put("targetValue", precisePercent);
            this.logger.error("Progess and Exp Per Day Value  " + progress + " & " + expectedPercent);
        }
        if (progress >= 85.0) {
            stringObjectsMap.put("statusLight", "progress-bar-success width-per-100 rounded-pill bar_height");
            stringObjectsMap.put("statusIndicator", "GREEN");
            countMap.put("GREEN", greenCount + 1);
        } else if (dueDateCrossed && progress < 85.0) {
            stringObjectsMap.put("statusLight", "progress-bar width-per-15 rounded-pill bar_height orange_bar");
            stringObjectsMap.put("statusIndicator", "RED");
            countMap.put("RED", redCount + 1);
        } else if (progress >= threshold85) {
            stringObjectsMap.put("statusLight", "progress-bar progress-bar-success width-per-85 rounded-pill bar_height");
            stringObjectsMap.put("statusIndicator", "GREEN");
            countMap.put("GREEN", greenCount + 1);
        } else if (progress < threshold85) {
            stringObjectsMap.put("statusLight", "progress-bar width-per-15 rounded-pill bar_height orange_bar");
            stringObjectsMap.put("statusIndicator", "RED");
            countMap.put("RED", redCount + 1);
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

    public String calculateStatusLight(Map<String, Integer> countMap) {
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
        return statusLight;
    }

    public String convertResult(BigDecimal decimal, Map<String, Object> subMap) {
        DecimalFormat decimalFormat = new DecimalFormat("###,###.##");
        String type = subMap != null && Objects.nonNull(subMap.get("dataType")) ? subMap.get("dataType").toString() : "";
        ControlPanelGeneralDTO checkPanel = this.kpiService.findByOrgId(Long.valueOf((String)UserThreadLocal.get().get("USER_ORG_ID")).longValue());
        if (checkPanel.getCurrencyView().equalsIgnoreCase("Thousands(K)")) {
            if ("Currency".equalsIgnoreCase(type)) {
                String finalValue = null;
                finalValue = decimal.longValue() < 0L ? (Math.abs(decimal.doubleValue()) < 1000.0 ? String.join((CharSequence)"", "-", KPIUtil.kFormatResult((BigDecimal)new BigDecimal(Math.abs(decimal.doubleValue())))) : String.join((CharSequence)"", "-", KPIUtil.kFormatResult((BigDecimal)new BigDecimal(Math.abs(decimal.doubleValue()))))) : (decimal.longValue() == 0L ? decimal.toPlainString() : (decimal.longValue() < 1000L ? KPIUtil.kFormatResult((BigDecimal)decimal) : KPIUtil.kFormatResult((BigDecimal)decimal)));
                if (finalValue.indexOf("K") != -1) {
                    String[] splitVal = finalValue.split("K");
                    String formattedValue = decimalFormat.format(Double.valueOf(StringUtils.trimToEmpty((String)splitVal[0])));
                    return String.join((CharSequence)"", formattedValue, " K");
                }
                return decimalFormat.format(Double.valueOf(finalValue));
            }
            return decimalFormat.format(decimal.doubleValue());
        }
        if ("Currency".equalsIgnoreCase(type)) {
            String finalValue = null;
            if (decimal.longValue() < 0L) {
                if (Math.abs(decimal.doubleValue()) < 100000.0) {
                    return String.join((CharSequence)"", "-", this.formatResult(new BigDecimal(Math.abs(decimal.doubleValue()))));
                }
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

    public static String kFormatResult(BigDecimal decimal) {
        if (decimal.longValue() < 10L) {
            return String.format("%.4f K", decimal.doubleValue() / 1000.0);
        }
        if (decimal.longValue() < 100L) {
            return String.format("%.3f K", decimal.doubleValue() / 1000.0);
        }
        if (decimal.longValue() < 1000L) {
            return String.format("%.2f K", decimal.doubleValue() / 1000.0);
        }
        return String.format("%.1f K", decimal.doubleValue() / 1000.0);
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

    public KPIResponseDTO filterKpiList(KPIResponseDTO kpiResponseDTO, String dateRange) {
        if (CollectionUtils.isNotEmpty((Collection)kpiResponseDTO.getKpidtoList())) {
            Map<String, List<Object>> periodMap = new HashMap<>();
            if (dateRange != null && !dateRange.isEmpty()) {
                System.out.println("dateRange :::: " + dateRange);
                System.out.println("enter date range");
                String decoded = URLDecoder.decode(dateRange);
                String[] parts = decoded.split(" - ");
                String startStr = parts[0];
                String endStr = parts[1];
                SimpleDateFormat inputFormat = new SimpleDateFormat("MM/dd/yyyy");
                Date startDate = null;
                Date endDate = null;
                try {
                    startDate = inputFormat.parse(startStr);
                    endDate = inputFormat.parse(endStr);
                }
                catch (ParseException e) {
                    e.printStackTrace();
                }
                String frequnce = KPIUtil.getFrequency((Date)startDate, endDate);
                System.out.println("frequencycheck -- " + frequnce);
                periodMap.put(frequnce, Arrays.asList(startDate, endDate));
            } else {
                periodMap.put("Quarterly", this.dateUtil.findPeriodFromCurrentDate("Quarterly"));
                periodMap.put("HalfYearly", this.dateUtil.findPeriodFromCurrentDate("HalfYearly"));
                periodMap.put("Monthly", this.dateUtil.findPeriodFromCurrentDate("Monthly"));
                periodMap.put("Yearly", this.dateUtil.findPeriodFromCurrentDate("Yearly"));
            }
            List kpiList = (List) kpiResponseDTO.getKpidtoList().stream().filter(kpi -> this.findEligibleKPI(kpi, periodMap)).collect(Collectors.toList());
            kpiResponseDTO.setKpidtoList(kpiList);
        }
        return kpiResponseDTO;
    }

    public static String getFrequency(Date start, Date end) {
        long diffInMillis = end.getTime() - start.getTime();
        long diffInDays = TimeUnit.DAYS.convert(diffInMillis, TimeUnit.MILLISECONDS);
        if (diffInDays >= 27L && diffInDays <= 32L) {
            return "Monthly";
        }
        if (diffInDays >= 85L && diffInDays <= 95L) {
            return "Quarterly";
        }
        if (diffInDays >= 175L && diffInDays <= 190L) {
            return "HalfYearly";
        }
        if (diffInDays >= 360L && diffInDays <= 370L) {
            return "Yearly";
        }
        return "Unknown";
    }

    public boolean findEligibleKPI(KPIDTO kpidto, Map<String, List<Object>> periodMap) {
        boolean eligible = false;
        FormulaUtil formulaUtil = new FormulaUtil();
        if (Objects.nonNull(kpidto.getKpiFormula()) && StringUtils.isNotEmpty((CharSequence)kpidto.getKpiFormula().getFormula()) || Objects.nonNull(kpidto.getKpiValue().get("ytdFormula")) && StringUtils.isNotEmpty((CharSequence)kpidto.getKpiValue().get("ytdFormula").toString().trim())) {
            String kpiFrequency = kpidto.getKpiValue().get("kpi_measurement").toString();
            String frequencyValue = this.getFrequency(kpiFrequency);
            List<Object> periodList = periodMap.get(frequencyValue);
            String formulatouse = "";
            if (Objects.nonNull(kpidto.getKpiFormula()) && StringUtils.isNotEmpty((CharSequence)kpidto.getKpiFormula().getFormula())) {
                formulatouse = kpidto.getKpiFormula().getFormula();
            } else if (Objects.nonNull(kpidto.getKpiValue()) && Objects.nonNull(kpidto.getKpiValue().get("ytdFormula")) && StringUtils.isNotEmpty((CharSequence)kpidto.getKpiValue().get("ytdFormula").toString().trim())) {
                formulatouse = kpidto.getKpiValue().get("ytdFormula").toString();
            }
            Set measureNameList = formulaUtil.getNodeKeyListFromFormula(formulatouse);
            List nodeKeyList = (List)measureNameList.stream().map(measureName -> this.kpiService.lookupNodeKey((String)measureName)).collect(Collectors.toList());
            if (CollectionUtils.isNotEmpty(nodeKeyList) && CollectionUtils.isNotEmpty(periodList) && periodList.size() > 1) {
                Date periodStart = (Date)periodList.get(0);
                Date periodEnd = (Date)periodList.get(1);
                System.out.println("periodStart :: " + periodStart + " periodEnd :: " + periodEnd);
                System.out.println("kpidto.getStartDate() :: " + kpidto.getStartDate());
                System.out.println("kpidto.getEndDate():: " + kpidto.getEndDate());
                eligible = kpidto.getStartDate().before(periodStart) && kpidto.getEndDate().after(periodStart) || kpidto.getStartDate().equals(periodStart) || kpidto.getEndDate().equals(periodStart);
                eligible = kpidto.getStartDate().before(periodEnd) && kpidto.getEndDate().after(periodEnd) || kpidto.getStartDate().equals(periodEnd) || kpidto.getEndDate().equals(periodEnd);
            }
        }
        return eligible;
    }

    public List<Object> getPeriodList(String kpiFrequency) {
        String finalFreqValue = null;
        finalFreqValue = this.freqFunction.test(kpiFrequency, quarterFrequency) ? "Quarterly" : (this.freqFunction.test(kpiFrequency, halfYearFrequency) ? "HalfYearly" : (kpiFrequency.equalsIgnoreCase("Monthly") ? "Monthly" : "Yearly"));
        return this.dateUtil.findPeriodFromCurrentDate(finalFreqValue);
    }

    public String getFrequency(String kpiFrequency) {
        String finalFreqValue = null;
        finalFreqValue = this.freqFunction.test(kpiFrequency, quarterFrequency) ? "Quarterly" : (this.freqFunction.test(kpiFrequency, halfYearFrequency) ? "HalfYearly" : (kpiFrequency.equalsIgnoreCase("Monthly") ? "Monthly" : "Yearly"));
        return finalFreqValue;
    }

    public void updateStatusCustomColor(KPIDTO kpidto, String type, CustomPerformance stringObjectsMap) {
        if (stringObjectsMap != null && stringObjectsMap.isCustomPerformance()) {
            if (stringObjectsMap.getThreshold().equalsIgnoreCase("option_5") || stringObjectsMap.getThreshold().equalsIgnoreCase("five_status")) {
                if (type.equals("GREEN")) {
                    kpidto.getKpiValue().put("statusLightFlag", stringObjectsMap.getThreshold5Color());
                } else if (type.equals("LIGHTGREEN")) {
                    kpidto.getKpiValue().put("statusLightFlag", stringObjectsMap.getThreshold4Color());
                } else if (type.equals("YELLOW")) {
                    kpidto.getKpiValue().put("statusLightFlag", stringObjectsMap.getThreshold3Color());
                } else if (type.equals("LIGHTRED")) {
                    kpidto.getKpiValue().put("statusLightFlag", stringObjectsMap.getThreshold2Color());
                } else if (type.equals("RED")) {
                    kpidto.getKpiValue().put("statusLightFlag", stringObjectsMap.getThreshold1Color());
                }
            } else if (type.equals("GREEN")) {
                kpidto.getKpiValue().put("statusLightFlag", stringObjectsMap.getThreshold3Color());
            } else if (type.equals("YELLOW")) {
                kpidto.getKpiValue().put("statusLightFlag", stringObjectsMap.getThreshold2Color());
            } else if (type.equals("RED")) {
                kpidto.getKpiValue().put("statusLightFlag", stringObjectsMap.getThreshold1Color());
            }
        } else if (stringObjectsMap != null && stringObjectsMap.isPerformance()) {
            if (type.equals("GREEN")) {
                kpidto.getKpiValue().put("statusLightFlag", stringObjectsMap.getThreshold5Color());
            } else if (type.equals("LIGHTGREEN")) {
                kpidto.getKpiValue().put("statusLightFlag", stringObjectsMap.getThreshold4Color());
            } else if (type.equals("YELLOW")) {
                kpidto.getKpiValue().put("statusLightFlag", stringObjectsMap.getThreshold3Color());
            } else if (type.equals("LIGHTRED")) {
                kpidto.getKpiValue().put("statusLightFlag", stringObjectsMap.getThreshold2Color());
            } else if (type.equals("RED")) {
                kpidto.getKpiValue().put("statusLightFlag", stringObjectsMap.getThreshold1Color());
            }
        }
    }

    public void updateStatusCustomColor(SubKPIDTO kpidto, String type, CustomPerformance stringObjectsMap) {
        if (stringObjectsMap != null && stringObjectsMap.isCustomPerformance()) {
            if (stringObjectsMap.getThreshold().equalsIgnoreCase("option_5") || stringObjectsMap.getThreshold().equalsIgnoreCase("five_status")) {
                if (type.equals("GREEN")) {
                    kpidto.getSubKpiValue().put("statusLightFlag", stringObjectsMap.getThreshold5Color());
                } else if (type.equals("LIGHTGREEN")) {
                    kpidto.getSubKpiValue().put("statusLightFlag", stringObjectsMap.getThreshold4Color());
                } else if (type.equals("YELLOW")) {
                    kpidto.getSubKpiValue().put("statusLightFlag", stringObjectsMap.getThreshold3Color());
                } else if (type.equals("LIGHTRED")) {
                    kpidto.getSubKpiValue().put("statusLightFlag", stringObjectsMap.getThreshold2Color());
                } else if (type.equals("RED")) {
                    kpidto.getSubKpiValue().put("statusLightFlag", stringObjectsMap.getThreshold1Color());
                }
            } else if (type.equals("GREEN")) {
                kpidto.getSubKpiValue().put("statusLightFlag", stringObjectsMap.getThreshold3Color());
            } else if (type.equals("YELLOW")) {
                kpidto.getSubKpiValue().put("statusLightFlag", stringObjectsMap.getThreshold2Color());
            } else if (type.equals("RED")) {
                kpidto.getSubKpiValue().put("statusLightFlag", stringObjectsMap.getThreshold1Color());
            }
        } else if (stringObjectsMap != null && stringObjectsMap.isPerformance()) {
            if (type.equals("GREEN")) {
                kpidto.getSubKpiValue().put("statusLightFlag", stringObjectsMap.getThreshold5Color());
            } else if (type.equals("LIGHTGREEN")) {
                kpidto.getSubKpiValue().put("statusLightFlag", stringObjectsMap.getThreshold4Color());
            } else if (type.equals("YELLOW")) {
                kpidto.getSubKpiValue().put("statusLightFlag", stringObjectsMap.getThreshold3Color());
            } else if (type.equals("LIGHTRED")) {
                kpidto.getSubKpiValue().put("statusLightFlag", stringObjectsMap.getThreshold2Color());
            } else if (type.equals("RED")) {
                kpidto.getSubKpiValue().put("statusLightFlag", stringObjectsMap.getThreshold1Color());
            }
        }
    }

    public String updateStatusCustomColorObjective(String type) {
        CustomPerformance stringObjectsMap = this.kpiService.findCustomPerformanceByOrgId();
        if (stringObjectsMap != null) {
            if (type.equals("green fas fa-flag")) {
                return stringObjectsMap.getThreshold5Color();
            }
            if (type.equals("lightgreen fas fa-flag")) {
                return stringObjectsMap.getThreshold4Color();
            }
            if (type.equals("yellow fas fa-flag")) {
                return stringObjectsMap.getThreshold3Color();
            }
            if (type.equals("lightred fas fa-flag")) {
                return stringObjectsMap.getThreshold2Color();
            }
            if (type.equals("red fas fa-flag")) {
                return stringObjectsMap.getThreshold1Color();
            }
        }
        return "";
    }

    public String updateStatusCustomColorScorecard(String type) {
        CustomPerformance stringObjectsMap = this.kpiService.findCustomPerformanceByOrgId();
        if (stringObjectsMap != null) {
            if (type.equals("GREEN")) {
                return stringObjectsMap.getThreshold5Color();
            }
            if (type.equals("LIGHTGREEN")) {
                return stringObjectsMap.getThreshold4Color();
            }
            if (type.equals("YELLOW")) {
                return stringObjectsMap.getThreshold3Color();
            }
            if (type.equals("LIGHTRED")) {
                return stringObjectsMap.getThreshold2Color();
            }
            if (type.equals("RED")) {
                return stringObjectsMap.getThreshold1Color();
            }
        }
        return "";
    }

    public String getGlobalCurrency() {
        if (KPIThreadLocal.get().get("globalCurrency").toString() == null) {
            this.dateUtil.populateCalendar();
        }
        return KPIThreadLocal.get().get("globalCurrency").toString();
    }

    private String buildExprCacheKey(String resolvedNodeKey, KPICriteria c) {
        String from = "";
        String to = "";
        if (c.getRealDates() != null && c.getRealDates().size() >= 2) {
            Object f = c.getRealDates().get(0);
            Object t = c.getRealDates().get(1);
            if (f instanceof Date) {
                from = String.valueOf(((Date)f).getTime());
            } else if (f instanceof Calendar) {
                from = String.valueOf(((Calendar)f).getTimeInMillis());
            }
            if (t instanceof Date) {
                to = String.valueOf(((Date)t).getTime());
            } else if (t instanceof Calendar) {
                to = String.valueOf(((Calendar)t).getTimeInMillis());
            }
        }
        String metric = c.getMetricCode() != null ? c.getMetricCode() : "";
        String emp = c.getEmpId() != null ? c.getEmpId() : "";
        String dept = String.valueOf(c.getDepartmentId());
        return (resolvedNodeKey != null ? resolvedNodeKey : "") + "|" + from + "|" + to + "|" + metric + "|" + emp + "|" + dept;
    }

    public void prefetchKPIStatusLightData(List<ScoreCardDTO> scoreCardList, String empId) {
        try {
            String period;
            this.dateUtil.populateCalendar();
            String string = period = UserThreadLocal.get() != null ? (String)UserThreadLocal.get().get("DATE_PERIOD") : null;
            if (period == null || period.isEmpty()) {
                return;
            }
            FormulaUtil fu = new FormulaUtil();
            ArrayList batchCriteria = new ArrayList();
            ArrayList cacheKeys = new ArrayList();
            FormulaBuilder baseBuilder = new FormulaBuilder();
            baseBuilder.setPeriod(period);
            String allReporteeId = (String)UserThreadLocal.get().get("ALL_REPORTEE_ID");
            baseBuilder.setEmployeeIds(allReporteeId != null ? Arrays.asList(allReporteeId) : new ArrayList());
            KPICriteria baseCriteria = fu.buildCriteria(baseBuilder, null);
            if (baseCriteria.getRealDates().isEmpty()) {
                return;
            }
            Date fromDate = (Date)baseCriteria.getRealDates().get(0);
            Date toDate = (Date)baseCriteria.getRealDates().get(1);
            int months = this.dateUtil.monthsBetween(fromDate, toDate);
            Calendar prevEnd = Calendar.getInstance();
            prevEnd.setTime(fromDate);
            Calendar prevStart = Calendar.getInstance();
            prevStart.setTime(fromDate);
            prevStart.add(2, -(months + 1));
            for (ScoreCardDTO sc : scoreCardList) {
                if (sc.getObjectiveList() == null) continue;
                for (ObjectivesDTO obj : sc.getObjectiveList()) {
                    if (obj.getKpiList() == null) continue;
                    for (KPIDTO kpi : obj.getKpiList()) {
                        KPIFormula kpiFormula = kpi.getKpiFormula();
                        if (kpiFormula == null && kpi.getKpiValue() != null && kpi.getKpiValue().get("ytdFormula") != null) {
                            kpiFormula = new KPIFormula();
                            kpiFormula.setFormula(kpi.getKpiValue().get("ytdFormula").toString());
                        }
                        this.collectExprCriteria(kpiFormula, kpi.getKpiId(), empId, Long.valueOf(kpi.getDepartmentId()), baseCriteria, fromDate, toDate, prevStart, prevEnd, batchCriteria, cacheKeys, fu);
                        if (kpi.getSubKpiList() == null) continue;
                        for (SubKPIDTO sub : kpi.getSubKpiList()) {
                            KPIFormula subFormula = sub.getKpiFormula();
                            if (subFormula == null && sub.getSubKpiValue() != null && sub.getSubKpiValue().get("ytdFormula") != null) {
                                subFormula = new KPIFormula();
                                subFormula.setFormula(sub.getSubKpiValue().get("ytdFormula").toString());
                            }
                            this.collectExprCriteria(subFormula, sub.getSubKpiId(), empId, Long.valueOf(sub.getDepartmentId()), baseCriteria, fromDate, toDate, prevStart, prevEnd, batchCriteria, cacheKeys, fu);
                        }
                    }
                }
            }
            if (batchCriteria.isEmpty()) {
                return;
            }
            Map bulkResults = this.kpiService.retrieveOrgKPIDetailsBulk(batchCriteria);
            HashMap exprCache = new HashMap();
            for (int i = 0; i < cacheKeys.size(); ++i) {
                List data = (List)bulkResults.get(i);
                exprCache.put(cacheKeys.get(i), data != null ? data : new ArrayList());
            }
            KPIThreadLocal.get().put("exprCache", exprCache);
        }
        catch (Exception e) {
            this.log.error("prefetchKPIStatusLightData failed: {}", (Object)e.getMessage(), (Object)e);
        }
    }

    private void collectExprCriteria(KPIFormula formula, String metricCode, String empId, Long deptId, KPICriteria base, Date fromDate, Date toDate, Calendar prevStart, Calendar prevEnd, List<KPICriteria> batchCriteria, List<String> cacheKeys, FormulaUtil fu) {
        if (formula == null || StringUtils.isEmpty((CharSequence)formula.getFormula())) {
            return;
        }
        Set rawNodeKeys = fu.getNodeKeyListFromFormula(formula.getFormula());
        if (rawNodeKeys.isEmpty()) {
            return;
        }
        for (String rawKey : ((java.util.Set<String>)(java.util.Set)rawNodeKeys)) {
            String resolved = this.kpiService.lookupNodeKey(rawKey);
            if (resolved == null) continue;
            KPICriteria curr = this.cloneCriteria(base);
            curr.setNodeKey(resolved);
            curr.setMetricCode(metricCode != null ? metricCode : "");
            curr.setEmpId(empId);
            if (deptId != null && deptId > 0L) {
                curr.setDepartmentId(deptId.longValue());
            }
            if (this.checkType(resolved)) {
                curr.setMetricCode("");
            }
            batchCriteria.add(curr);
            cacheKeys.add(this.buildExprCacheKey(resolved, curr));
            KPICriteria prev = this.cloneCriteria(curr);
            ArrayList<Date> prevDates = new ArrayList<Date>();
            prevDates.add(prevStart.getTime());
            prevDates.add(prevEnd.getTime());
            prev.setRealDates((java.util.List)prevDates);
            batchCriteria.add(prev);
            cacheKeys.add(this.buildExprCacheKey(resolved, prev));
        }
    }

    public boolean checkType(String nodeKey) {
        Map typeCache = (Map)KPIThreadLocal.get().computeIfAbsent("checkTypeCache", k -> new HashMap());
        Boolean cached = (Boolean)typeCache.get(nodeKey);
        if (cached != null) {
            return cached;
        }
        Map objectMap = this.kpiService.checkNodeKey(nodeKey);
        boolean status = objectMap != null && "1".equalsIgnoreCase(objectMap.get("measure_type") != null ? objectMap.get("measure_type").toString() : "");
        typeCache.put(nodeKey, status);
        return status;
    }

    public String getContrbutionValue(KPIDTO kpidto, String deptName) {
        this.log.info("4949 check contribution kpi+deptname  start timing: {} ", (Object)LocalDateTime.now());
        String contrbution = this.kpiService.kpiContributionPercentage(Long.valueOf(kpidto.getId()), deptName);
        this.log.info("4951 check contribution kpi+deptname end timing: {} ", (Object)LocalDateTime.now());
        System.out.println("contribution value " + contrbution);
        return contrbution;
    }

    public String getContrbutionValue(SubKPIDTO kpidto, String deptName) {
        this.log.info("4957 check contribution subkpi+deptname  start timing: {} ", (Object)LocalDateTime.now());
        String contrbution = this.kpiService.supKpiContributionPercentage(Long.valueOf(kpidto.getId()), deptName);
        this.log.info("4959 check contribution subkpi+deptname end timing: {} ", (Object)LocalDateTime.now());
        System.out.println("contribution value " + contrbution);
        return contrbution;
    }

    public String getContrbutionValuebyId(KPIDTO kpidto, String deptId) {
        this.log.info("4967 check contribution kpi+deptId  start timing: {} ", (Object)LocalDateTime.now());
        String contrbution = this.kpiService.kpiContributionPercentagedeptId(Long.valueOf(kpidto.getId()), deptId);
        this.log.info("4969 check contribution kpi+deptId end timing: {} ", (Object)LocalDateTime.now());
        System.out.println("contribution value " + contrbution);
        return contrbution;
    }

    public String getContrbutionValuebyId(SubKPIDTO kpidto, String deptId) {
        this.log.info("4975 check contribution subkpi+deptId  start timing: {} ", (Object)LocalDateTime.now());
        String contrbution = this.kpiService.supKpiContributionPercentagedeptId(Long.valueOf(kpidto.getId()), deptId);
        this.log.info("4977 check contribution subkpi+deptId end timing: {} ", (Object)LocalDateTime.now());
        System.out.println("contribution value " + contrbution);
        return contrbution;
    }
}

