/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.user.dto.DepartmentChartDTO
 *  com.estrat.backend.user.dto.EmployeeDepartmentMappingDTO
 */
package com.estrat.backend.user.dto;

import com.estrat.backend.user.dto.EmployeeDepartmentMappingDTO;
import java.time.LocalDateTime;
import java.util.List;

public class DepartmentChartDTO {
    private Long deptId;
    private String deptName;
    private Long deptParentId;
    private Long scorecardPageId;
    private List<Long> empIdList;
    private long createdBy;
    private long updatedBy;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;
    private List<EmployeeDepartmentMappingDTO> employeeDepartmentMappingList;
    private Long initiativePageId;
    private Long riskPageId;
    private Long kpiId;
    private String deptImage;
    private Long orgId;
    private Long owner;
    private String emailAddress;
    private String designation;
    private String deptUniqueId;
    private Long superCreatedBy;

    public Long getDeptId() {
        return this.deptId;
    }

    public void setDeptId(Long deptId) {
        this.deptId = deptId;
    }

    public String getDeptName() {
        return this.deptName;
    }

    public void setDeptName(String deptName) {
        this.deptName = deptName;
    }

    public Long getDeptParentId() {
        return this.deptParentId;
    }

    public void setDeptParentId(Long deptParentId) {
        this.deptParentId = deptParentId;
    }

    public Long getScorecardPageId() {
        return this.scorecardPageId;
    }

    public void setScorecardPageId(Long scorecardPageId) {
        this.scorecardPageId = scorecardPageId;
    }

    public List<Long> getEmpIdList() {
        return this.empIdList;
    }

    public void setEmpIdList(List<Long> empIdList) {
        this.empIdList = empIdList;
    }

    public long getCreatedBy() {
        return this.createdBy;
    }

    public void setCreatedBy(long createdBy) {
        this.createdBy = createdBy;
    }

    public long getUpdatedBy() {
        return this.updatedBy;
    }

    public void setUpdatedBy(long updatedBy) {
        this.updatedBy = updatedBy;
    }

    public LocalDateTime getCreatedTime() {
        return this.createdTime;
    }

    public void setCreatedTime(LocalDateTime createdTime) {
        this.createdTime = createdTime;
    }

    public LocalDateTime getUpdatedTime() {
        return this.updatedTime;
    }

    public void setUpdatedTime(LocalDateTime updatedTime) {
        this.updatedTime = updatedTime;
    }

    public List<EmployeeDepartmentMappingDTO> getEmployeeDepartmentMappingList() {
        return this.employeeDepartmentMappingList;
    }

    public void setEmployeeDepartmentMappingList(List<EmployeeDepartmentMappingDTO> employeeDepartmentMappingList) {
        this.employeeDepartmentMappingList = employeeDepartmentMappingList;
    }

    public Long getInitiativePageId() {
        return this.initiativePageId;
    }

    public void setInitiativePageId(Long initiativePageId) {
        this.initiativePageId = initiativePageId;
    }

    public Long getRiskPageId() {
        return this.riskPageId;
    }

    public void setRiskPageId(Long riskPageId) {
        this.riskPageId = riskPageId;
    }

    public Long getKpiId() {
        return this.kpiId;
    }

    public void setKpiId(Long kpiId) {
        this.kpiId = kpiId;
    }

    public String getDeptImage() {
        return this.deptImage;
    }

    public void setDeptImage(String deptImage) {
        this.deptImage = deptImage;
    }

    public Long getOrgId() {
        return this.orgId;
    }

    public void setOrgId(Long orgId) {
        this.orgId = orgId;
    }

    public Long getOwner() {
        return this.owner;
    }

    public void setOwner(Long owner) {
        this.owner = owner;
    }

    public String getEmailAddress() {
        return this.emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public String getDesignation() {
        return this.designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    public String getDeptUniqueId() {
        return this.deptUniqueId;
    }

    public void setDeptUniqueId(String deptUniqueId) {
        this.deptUniqueId = deptUniqueId;
    }

    public Long getSuperCreatedBy() {
        return this.superCreatedBy;
    }

    public void setSuperCreatedBy(Long superCreatedBy) {
        this.superCreatedBy = superCreatedBy;
    }
}

