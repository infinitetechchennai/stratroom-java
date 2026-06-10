/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.etl.dto.CustomPerformance
 *  com.estrat.backend.etl.dto.FormulaBuilder
 *  com.estrat.backend.etl.dto.KPICriteria
 *  com.estrat.backend.etl.dto.KPIFormula
 *  com.estrat.backend.etl.util.FormulaUtil
 *  com.estrat.backend.etl.util.KPIThreadLocal
 *  com.estrat.backend.etl.util.UserThreadLocal
 *  com.udojava.evalex.Expression
 *  com.udojava.evalex.Function
 *  org.apache.commons.lang3.StringUtils
 */
package com.estrat.backend.etl.util;

import com.estrat.backend.etl.dto.CustomPerformance;
import com.estrat.backend.etl.dto.FormulaBuilder;
import com.estrat.backend.etl.dto.KPICriteria;
import com.estrat.backend.etl.dto.KPIFormula;
import com.estrat.backend.etl.util.KPIThreadLocal;
import com.estrat.backend.etl.util.UserThreadLocal;
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
        this.addCustomizedFunction(e);
        return e.eval().setScale(2, RoundingMode.HALF_UP).toPlainString();
    }

    public void addCustomizedFunction(Expression e) {
        // e.addFunction((Function)new /* Unavailable Anonymous Inner Class!! */);
        // e.addFunction((Function)new /* Unavailable Anonymous Inner Class!! */);
        // e.addFunction((Function)new /* Unavailable Anonymous Inner Class!! */);
        // e.addFunction((Function)new /* Unavailable Anonymous Inner Class!! */);
        // e.addFunction((Function)new /* Unavailable Anonymous Inner Class!! */);
        // e.addFunction((Function)new /* Unavailable Anonymous Inner Class!! */);
        // e.addFunction((Function)new /* Unavailable Anonymous Inner Class!! */);
        // e.addFunction((Function)new /* Unavailable Anonymous Inner Class!! */);
        // e.addFunction((Function)new /* Unavailable Anonymous Inner Class!! */);
        // e.addFunction((Function)new /* Unavailable Anonymous Inner Class!! */);
        // e.addFunction((Function)new /* Unavailable Anonymous Inner Class!! */);
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
            builder.setEmployeeIds(Arrays.asList(loggedInEmpId));
        } else if (kpiCriteria != null && customPerformance.isCustomAggregation()) {
            List<Object> employeeIds = StringUtils.isNotEmpty((CharSequence)kpiCriteria.getCustomReportees()) ? Arrays.asList(loggedInEmpId, kpiCriteria.getCustomReportees()) : Arrays.asList(loggedInEmpId);
            builder.setEmployeeIds(employeeIds);
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
            if (nodeKey.contains("|")) {
                nodeKeyList.addAll(Arrays.asList(nodeKey.split("\\|")));
                continue;
            }
            nodeKeyList.add(nodeKey);
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
        if (StringUtils.isNotEmpty((CharSequence)nodeKey)) {
            kpiCriteria.setNodeKey(nodeKey);
        }
        return kpiCriteria;
    }

    public static void main(String[] args) {
        String exactExpressionValue = "if(if(sum(10,20)>20,10,30) || if(sum(30,40)>50,30,50))=50,10,20";
        FormulaUtil util = new FormulaUtil();
        System.out.println(util.applyExpression(exactExpressionValue));
    }
}

