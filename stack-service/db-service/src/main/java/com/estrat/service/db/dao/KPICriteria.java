/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.dao.KPICriteria
 */
package com.estrat.service.db.dao;

import java.util.ArrayList;
import java.util.List;

public class KPICriteria {
    private List<Object> realDates;
    private String kpiType;
    private String groupBy;
    private String deptName;
    private Long originOrg;
    private String empId;
    private long departmentId;
    private boolean retrieveRowCount;
    private long kpiId;
    private boolean retrieveYTD;
    private boolean retrieveKpiTarget;
    private List<Object> employeeIds;
    private String nodeKey;
    private List<String> nodeKeyList;
    private String metricCode;
    private String deptReportee;
    private String tableType;

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

    public List<String> getNodeKeyList() {
        return this.nodeKeyList;
    }

    public void setNodeKeyList(List<String> nodeKeyList) {
        this.nodeKeyList = nodeKeyList;
    }

    public String getMetricCode() {
        return this.metricCode;
    }

    public void setMetricCode(String metricCode) {
        this.metricCode = metricCode;
    }

    public String getDeptReportee() {
        return this.deptReportee;
    }

    public void setDeptReportee(String deptReportee) {
        this.deptReportee = deptReportee;
    }

    public String getTableType() {
        return this.tableType;
    }

    public void setTableType(String tableType) {
        this.tableType = tableType;
    }

    public String getEmpId() {
        return this.empId;
    }

    public void setEmpId(String empId) {
        this.empId = empId;
    }

    public long getDepartmentId() {
        return this.departmentId;
    }

    public void setDepartmentId(long departmentId) {
        this.departmentId = departmentId;
    }

    public Long getOriginOrg() {
        return this.originOrg;
    }

    public void setOriginOrg(Long originOrg) {
        this.originOrg = originOrg;
    }
}

