/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.scorecard.dto.KPICriteriaDTO
 *  com.fasterxml.jackson.annotation.JsonInclude
 *  com.fasterxml.jackson.annotation.JsonInclude$Include
 */
package com.estrat.scorecard.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import java.util.ArrayList;
import java.util.List;

@JsonInclude(value=JsonInclude.Include.NON_NULL)
public class KPICriteriaDTO {
    private String period;
    private List<Object> employeeIds;
    private String frequency;
    private List<Long> kpiIdList;
    private String groupBy;
    private String deptName;
    private String nodeKey;
    private Long originOrg;
    private String responseGroupBy;
    private String departmentId;
    private String tableType;

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

    public List<Object> getEmployeeIds() {
        if (this.employeeIds == null) {
            this.employeeIds = new ArrayList();
        }
        return this.employeeIds;
    }

    public void setEmployeeIds(List<Object> employeeIds) {
        this.employeeIds = employeeIds;
    }

    public String getPeriod() {
        return this.period;
    }

    public void setPeriod(String period) {
        this.period = period;
    }

    public String getFrequency() {
        return this.frequency;
    }

    public void setFrequency(String frequency) {
        this.frequency = frequency;
    }

    public String getTableType() {
        return this.tableType;
    }

    public void setTableType(String tableType) {
        this.tableType = tableType;
    }

    public Long getOriginOrg() {
        return this.originOrg;
    }

    public void setOriginOrg(Long originOrg) {
        this.originOrg = originOrg;
    }

    public List<Long> getKpiIdList() {
        return this.kpiIdList;
    }

    public void setKpiIdList(List<Long> kpiIdList) {
        this.kpiIdList = kpiIdList;
    }

    public String getNodeKey() {
        return this.nodeKey;
    }

    public void setNodeKey(String nodeKey) {
        this.nodeKey = nodeKey;
    }

    public String getDepartmentId() {
        return this.departmentId;
    }

    public void setDepartmentId(String departmentId) {
        this.departmentId = departmentId;
    }
}

