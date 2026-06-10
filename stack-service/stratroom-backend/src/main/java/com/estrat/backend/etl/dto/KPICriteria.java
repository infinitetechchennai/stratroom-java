/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.etl.dto.KPICriteria
 *  com.fasterxml.jackson.annotation.JsonIgnore
 */
package com.estrat.backend.etl.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class KPICriteria {
    private long kpiId;
    private String kpiType;
    private String groupBy;
    private String deptName;
    private boolean retrieveRowCount;
    private String responseGroupBy;
    private boolean retrieveKpiTarget;
    private List<Object> realDates;
    private boolean retrieveYTD;
    @JsonIgnore
    private boolean monthlyBreakDown;
    @JsonIgnore
    private Map<String, Object> responseObject;
    @JsonIgnore
    private String responseKey;
    @JsonIgnore
    private String previousKey;
    private List<Object> employeeIds;
    private String nodeKey;
    private String metricCode;
    private List<String> nodeKeyList;
    public boolean includeReportees;
    private String customReportees;

    public boolean isRetrieveRowCount() {
        return this.retrieveRowCount;
    }

    public void setRetrieveRowCount(boolean retrieveRowCount) {
        this.retrieveRowCount = retrieveRowCount;
    }

    public String getDeptName() {
        return this.deptName;
    }

    public void setDeptName(String deptName) {
        this.deptName = deptName;
    }

    public String getResponseGroupBy() {
        return this.responseGroupBy;
    }

    public void setResponseGroupBy(String responseGroupBy) {
        this.responseGroupBy = responseGroupBy;
    }

    public String getGroupBy() {
        return this.groupBy;
    }

    public void setGroupBy(String groupBy) {
        this.groupBy = groupBy;
    }

    public String getKpiType() {
        return this.kpiType;
    }

    public void setKpiType(String kpiType) {
        this.kpiType = kpiType;
    }

    public long getKpiId() {
        return this.kpiId;
    }

    public void setKpiId(long kpiId) {
        this.kpiId = kpiId;
    }

    public boolean isRetrieveKpiTarget() {
        return this.retrieveKpiTarget;
    }

    public void setRetrieveKpiTarget(boolean retrieveKpiTarget) {
        this.retrieveKpiTarget = retrieveKpiTarget;
    }

    public boolean isRetrieveYTD() {
        return this.retrieveYTD;
    }

    public void setRetrieveYTD(boolean retrieveYTD) {
        this.retrieveYTD = retrieveYTD;
    }

    public Map<String, Object> getResponseObject(String key) {
        Map<String, Object> responseObj = null;
        responseObj = this.responseObject == null || this.responseObject.get(key) == null ? new LinkedHashMap<String, Object>() : (Map)this.responseObject.get(key);
        return responseObj;
    }

    public Map<String, Object> getResponseObject() {
        if (this.responseObject == null) {
            this.responseObject = new LinkedHashMap();
        }
        return this.responseObject;
    }

    public void setResponseObject(String key, Map<String, Object> responseObject) {
        this.responseObject.put(key, responseObject);
    }

    public void setResponseObject(Map<String, Object> responseObject) {
        this.responseObject = responseObject;
    }

    public String getPreviousKey() {
        return this.previousKey;
    }

    public void setPreviousKey(String previousKey) {
        this.previousKey = previousKey;
    }

    public String getResponseKey() {
        return this.responseKey;
    }

    public void setResponseKey(String responseKey) {
        this.responseKey = responseKey;
    }

    public boolean isMonthlyBreakDown() {
        return this.monthlyBreakDown;
    }

    public void setMonthlyBreakDown(boolean monthlyBreakDown) {
        this.monthlyBreakDown = monthlyBreakDown;
    }

    public List<Object> getRealDates() {
        if (this.realDates == null) {
            this.realDates = new ArrayList();
        }
        return this.realDates;
    }

    public void setRealDates(List<Object> realDates) {
        this.realDates = realDates;
    }

    public List<Object> getEmployeeIds() {
        if (this.employeeIds == null) {
            this.employeeIds = new ArrayList();
        }
        return this.employeeIds;
    }

    public void setEmployeeIds(List<Object> employeeIds) {
        this.employeeIds = employeeIds;
    }

    public String getNodeKey() {
        return this.nodeKey;
    }

    public void setNodeKey(String nodeKey) {
        this.nodeKey = nodeKey;
    }

    public String getMetricCode() {
        return this.metricCode;
    }

    public void setMetricCode(String metricCode) {
        this.metricCode = metricCode;
    }

    public List<String> getNodeKeyList() {
        return this.nodeKeyList;
    }

    public void setNodeKeyList(List<String> nodeKeyList) {
        this.nodeKeyList = nodeKeyList;
    }

    public boolean isIncludeReportees() {
        return this.includeReportees;
    }

    public void setIncludeReportees(boolean includeReportees) {
        this.includeReportees = includeReportees;
    }

    public String getCustomReportees() {
        return this.customReportees;
    }

    public void setCustomReportees(String customReportees) {
        this.customReportees = customReportees;
    }
}

