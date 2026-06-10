/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.etl.dto.FormulaBuilder
 */
package com.estrat.service.etl.dto;

import java.util.List;
import java.util.Set;

public class FormulaBuilder {
    protected String expression;
    private Set<String> nodeKeyList;
    protected boolean actual;
    protected boolean target;
    protected boolean budget;
    private List<Object> employeeIds;
    private String period;
    private String dataKey;

    public Set<String> getNodeKeyList() {
        return this.nodeKeyList;
    }

    public void setNodeKeyList(Set<String> nodeKeyList) {
        this.nodeKeyList = nodeKeyList;
    }

    public String getDataKey() {
        return this.dataKey;
    }

    public void setDataKey(String dataKey) {
        this.dataKey = dataKey;
    }

    public List<Object> getEmployeeIds() {
        return this.employeeIds;
    }

    public void setEmployeeIds(List<Object> employeeIds) {
        this.employeeIds = employeeIds;
    }

    public String getExpression() {
        return this.expression;
    }

    public void setExpression(String expression) {
        this.expression = expression;
    }

    public boolean isActual() {
        return this.actual;
    }

    public void setActual(boolean actual) {
        this.actual = actual;
    }

    public boolean isTarget() {
        return this.target;
    }

    public void setTarget(boolean target) {
        this.target = target;
    }

    public boolean isBudget() {
        return this.budget;
    }

    public void setBudget(boolean budget) {
        this.budget = budget;
    }

    public String getPeriod() {
        return this.period;
    }

    public void setPeriod(String period) {
        this.period = period;
    }
}

