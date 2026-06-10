/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.scorecard.dto.CustomPerformance
 *  com.estrat.scorecard.dto.FormulaBuilder
 *  com.estrat.scorecard.dto.KPICriteria
 *  com.estrat.scorecard.dto.KPIFormula
 *  com.estrat.scorecard.util.FormulaUtil
 *  com.estrat.scorecard.util.KPIThreadLocal
 *  com.estrat.scorecard.util.UserThreadLocal
 *  com.udojava.evalex.Expression
 *  com.udojava.evalex.Function
 *  org.apache.commons.lang3.StringUtils
 */
package com.estrat.scorecard.util;

import com.estrat.scorecard.dto.CustomPerformance;
import com.estrat.scorecard.dto.FormulaBuilder;
import com.estrat.scorecard.dto.KPICriteria;
import com.estrat.scorecard.dto.KPIFormula;
import com.estrat.scorecard.util.KPIThreadLocal;
import com.estrat.scorecard.util.UserThreadLocal;
import com.udojava.evalex.Expression;
import com.udojava.evalex.Function;
import java.math.RoundingMode;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import org.apache.commons.lang3.StringUtils;

public class FormulaUtil {
    private Map<String, String> kpiDataKeyMap = new HashMap();

    public Map<String, String> getDataKeyMap() {
        this.kpiDataKeyMap.put("A", "actual");
        this.kpiDataKeyMap.put("T", "target");
        this.kpiDataKeyMap.put("B", "budget");
        return this.kpiDataKeyMap;
    }

    public String applyExpression(String expressionValue) {
        Expression e = new Expression(expressionValue);
        e.setPrecision(20);
        this.addCustomizedFunction(e);
        return e.eval().setScale(2, RoundingMode.HALF_UP).toPlainString();
    }

    public void addCustomizedFunction(Expression e) {
        // e.addFunction(...); // Unavailable anonymous inner class - removed by fix
        // e.addFunction(...); // Unavailable anonymous inner class - removed by fix
        // e.addFunction(...); // Unavailable anonymous inner class - removed by fix
        // e.addFunction(...); // Unavailable anonymous inner class - removed by fix
        // e.addFunction(...); // Unavailable anonymous inner class - removed by fix
        // e.addFunction(...); // Unavailable anonymous inner class - removed by fix
        // e.addFunction(...); // Unavailable anonymous inner class - removed by fix
        // e.addFunction(...); // Unavailable anonymous inner class - removed by fix
        // e.addFunction(...); // Unavailable anonymous inner class - removed by fix
        // e.addFunction(...); // Unavailable anonymous inner class - removed by fix
        // e.addFunction(...); // Unavailable anonymous inner class - removed by fix
    }

    public FormulaBuilder extractFormulaExpression(KPIFormula kpiFormula, KPICriteria kpiCriteria) {
        FormulaBuilder builder = new FormulaBuilder();
        String formulaString = kpiFormula.getFormula();
        Set nodeKeyList = this.getNodeKeyListFromFormula(formulaString);
        formulaString = formulaString.replaceAll("\\|", ",");
        builder.setNodeKeyList(nodeKeyList);
        builder.setDataKey(kpiFormula.getFieldName());
        builder.setExpression(formulaString);
        if (kpiCriteria != null && kpiCriteria.getRealDates().isEmpty()) {
            if (StringUtils.isNotEmpty((CharSequence)((CharSequence)UserThreadLocal.get().get("DATE_PERIOD")))) {
                builder.setPeriod((String)UserThreadLocal.get().get("DATE_PERIOD"));
            } else {
                builder.setPeriod(kpiFormula.getPeriod());
            }
        }
        CustomPerformance customPerformance = (CustomPerformance)KPIThreadLocal.get().get("customPerformance");
        String loggedInEmpId = (String)UserThreadLocal.get().get("LOGGED_IN_EMPLOYEE_ID");
        if (kpiCriteria != null && !customPerformance.isAggregation()) {
            if (Objects.isNull(kpiCriteria.getEmployeeIds())) {
                builder.setEmployeeIds(Arrays.asList(loggedInEmpId));
            } else if (kpiCriteria.getEmployeeIds().size() == 0) {
                builder.setEmployeeIds(Arrays.asList(loggedInEmpId));
            } else {
                builder.setEmployeeIds(kpiCriteria.getEmployeeIds());
            }
        } else if (kpiCriteria != null && customPerformance.isCustomAggregation()) {
            List<Object> employeeIds;
            List<Object> list = employeeIds = StringUtils.isNotEmpty((CharSequence)kpiCriteria.getCustomReportees()) ? Arrays.asList(loggedInEmpId, kpiCriteria.getCustomReportees()) : Arrays.asList(loggedInEmpId);
            if (Objects.isNull(kpiCriteria.getEmployeeIds())) {
                builder.setEmployeeIds(employeeIds);
            } else if (kpiCriteria.getEmployeeIds().size() == 0) {
                builder.setEmployeeIds(employeeIds);
            } else {
                builder.setEmployeeIds(kpiCriteria.getEmployeeIds());
            }
        } else if (Objects.nonNull(kpiCriteria) && Objects.nonNull(kpiCriteria.getEmployeeIds())) {
            if (kpiCriteria.getEmployeeIds().size() > 0) {
                builder.setEmployeeIds(kpiCriteria.getEmployeeIds());
            }
        } else if (StringUtils.isNotEmpty((CharSequence)((CharSequence)UserThreadLocal.get().get("ALL_REPORTEE_ID")))) {
            builder.setEmployeeIds(Arrays.asList(UserThreadLocal.get().get("ALL_REPORTEE_ID")));
        } else {
            builder.setEmployeeIds(kpiFormula.getEmpployeeIds());
        }
        return builder;
    }

    public Set<String> getNodeKeyListFromFormula(String formula) {
        Matcher periodPattern = Pattern.compile("\\[(.*?)\\]").matcher(formula);
        HashSet<String> nodeKeyList = new HashSet<String>();
        while (periodPattern.find()) {
            if (nodeKeyList.contains(periodPattern.group(1))) continue;
            String nodeKey = periodPattern.group(1);
            String checkKey = nodeKey.replaceAll("\\(", "");
            checkKey = checkKey.replaceAll("\\)", "");
            formula = formula.replace(nodeKey, checkKey);
            if (checkKey.contains(",")) {
                nodeKeyList.addAll(Arrays.asList(checkKey.split("\\,")));
                continue;
            }
            nodeKeyList.add(checkKey);
        }
        return nodeKeyList;
    }

    public KPICriteria buildCriteria(FormulaBuilder formulaBuilder, String nodeKey) {
        KPICriteria kpiCriteria = new KPICriteria();
        if (StringUtils.isNotEmpty((CharSequence)formulaBuilder.getPeriod())) {
            SimpleDateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy");
            try {
                kpiCriteria.getRealDates().add(dateFormat.parse(formulaBuilder.getPeriod().split("\\-")[0].trim()));
                kpiCriteria.getRealDates().add(dateFormat.parse(formulaBuilder.getPeriod().split("\\-")[1].trim()));
            }
            catch (ParseException e) {
                throw new RuntimeException(e);
            }
        }
        kpiCriteria.setEmployeeIds(formulaBuilder.getEmployeeIds());
        if (formulaBuilder.getDeptReportee() != null) {
            kpiCriteria.setDeptReportee(formulaBuilder.getDeptReportee());
        }
        if (StringUtils.isNotEmpty((CharSequence)nodeKey)) {
            kpiCriteria.setNodeKey(nodeKey);
        }
        return kpiCriteria;
    }

    public static void main(String[] args) {
        String exactExpressionValue = "IF(30/20=1.50, 1, 2)";
        FormulaUtil util = new FormulaUtil();
    }
}

