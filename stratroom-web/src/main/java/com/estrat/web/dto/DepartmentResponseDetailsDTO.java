/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.dto.DepartmentResponseDetailsDTO
 */
package com.estrat.web.dto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

public class DepartmentResponseDetailsDTO {
    private Long deptId;
    private String deptName;
    private Long deptParentId;
    private Long scorecardPageId;
    private long createdBy;
    private long updatedBy;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;
    private boolean canMaintain;
    private String scoreCardLandingUrl;
    private String initiativeLandingUrl;
    private String kpiLandingUrl;
    private String riskLandingUrl;
    private String appraisalUrl;
    private Map<String, Object> employee;
    public List<DepartmentResponseDetailsDTO> parent;
    public List<DepartmentResponseDetailsDTO> children;
    public DepartmentResponseDetailsDTO parentDepartment;
    private Long initiativePageId;
    private Long riskPageId;
    private Long kpiId;
    private String deptImage;
    private Long owner;
    private String ownerName;
    private String emailAddress;
    private String message;
    private String deptUniqueId;

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

    public Map<String, Object> getEmployee() {
        return this.employee;
    }

    public void setEmployee(Map<String, Object> employee) {
        this.employee = employee;
    }

    public List<DepartmentResponseDetailsDTO> getParent() {
        return this.parent;
    }

    public void setParent(List<DepartmentResponseDetailsDTO> parent) {
        this.parent = parent;
    }

    public List<DepartmentResponseDetailsDTO> getChildren() {
        return this.children;
    }

    public void setChildren(List<DepartmentResponseDetailsDTO> children) {
        this.children = children;
    }

    public DepartmentResponseDetailsDTO getParentDepartment() {
        return this.parentDepartment;
    }

    public void setParentDepartment(DepartmentResponseDetailsDTO parentDepartment) {
        this.parentDepartment = parentDepartment;
    }

    public boolean isCanMaintain() {
        return this.canMaintain;
    }

    public void setCanMaintain(boolean canMaintain) {
        this.canMaintain = canMaintain;
    }

    public String getScoreCardLandingUrl() {
        return this.scoreCardLandingUrl;
    }

    public void setScoreCardLandingUrl(String scoreCardLandingUrl) {
        this.scoreCardLandingUrl = scoreCardLandingUrl;
    }

    public String getInitiativeLandingUrl() {
        return this.initiativeLandingUrl;
    }

    public void setInitiativeLandingUrl(String initiativeLandingUrl) {
        this.initiativeLandingUrl = initiativeLandingUrl;
    }

    public String getKpiLandingUrl() {
        return this.kpiLandingUrl;
    }

    public void setKpiLandingUrl(String kpiLandingUrl) {
        this.kpiLandingUrl = kpiLandingUrl;
    }

    public String getRiskLandingUrl() {
        return this.riskLandingUrl;
    }

    public void setRiskLandingUrl(String riskLandingUrl) {
        this.riskLandingUrl = riskLandingUrl;
    }

    public String getAppraisalUrl() {
        return this.appraisalUrl;
    }

    public void setAppraisalUrl(String appraisalUrl) {
        this.appraisalUrl = appraisalUrl;
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

    public Long getOwner() {
        return this.owner;
    }

    public void setOwner(Long owner) {
        this.owner = owner;
    }

    public String getOwnerName() {
        return this.ownerName;
    }

    public void setOwnerName(String ownerName) {
        this.ownerName = ownerName;
    }

    public String getEmailAddress() {
        return this.emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public String getMessage() {
        return this.message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getDeptUniqueId() {
        return this.deptUniqueId;
    }

    public void setDeptUniqueId(String deptUniqueId) {
        this.deptUniqueId = deptUniqueId;
    }
}

