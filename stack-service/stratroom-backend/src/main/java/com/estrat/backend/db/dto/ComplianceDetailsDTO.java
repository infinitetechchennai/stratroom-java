/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.ComplianceDetails
 *  com.estrat.backend.db.dto.ComplianceDetailsAttachmentDTO
 *  com.estrat.backend.db.dto.ComplianceDetailsDTO
 *  com.fasterxml.jackson.databind.ObjectMapper
 */
package com.estrat.backend.db.dto;

import com.estrat.backend.db.bean.po.ComplianceDetails;
import com.estrat.backend.db.dto.ComplianceDetailsAttachmentDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import com.estrat.backend.db.util.JsonUtil;

public class ComplianceDetailsDTO {
    private long id;
    private Map<String, Object> complainValue;
    private int active = 0;
    private long owner;
    private long createdBy;
    private long updatedBy;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;
    private String riskLevel;
    private String status;
    private Date lastAssessmentDate;
    private Date nextReviewDate;
    private Date actionDueDate;
    private Date lastAuditDate;
    private long deptId;
    private long complainAreaId;
    private long pageId;
    private ComplianceDetailsAttachmentDTO complainceAttachment;

    public ComplianceDetailsDTO() {
    }

    public ComplianceDetailsDTO(ComplianceDetails complianceDetails) {
        this.id = complianceDetails.getId();
        this.active = complianceDetails.getActive();
        this.owner = complianceDetails.getOwner();
        this.createdBy = complianceDetails.getCreatedBy();
        this.updatedBy = complianceDetails.getUpdatedBy();
        this.createdTime = complianceDetails.getCreatedTime();
        this.updatedTime = complianceDetails.getUpdatedTime();
        this.riskLevel = complianceDetails.getRiskLevel();
        this.status = complianceDetails.getStatus();
        this.lastAssessmentDate = complianceDetails.getLastAssessmentDate();
        this.nextReviewDate = complianceDetails.getNextReviewDate();
        this.actionDueDate = complianceDetails.getActionDueDate();
        this.lastAuditDate = complianceDetails.getLastAssessmentDate();
        this.deptId = complianceDetails.getDeptId();
        this.complainAreaId = complianceDetails.getComplainAreaId();
        if (complianceDetails.getPageId() != null) {
            this.pageId = complianceDetails.getPageId().getId();
        }
        ObjectMapper mapper = new ObjectMapper();
        if (complianceDetails.getComplainValue() != null) {
            try {
                this.complainValue = JsonUtil.parseMap(complianceDetails.getComplainValue());
            }
            catch (Exception e) {
                throw new RuntimeException(e);
            }
        }
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Map<String, Object> getComplainValue() {
        return this.complainValue;
    }

    public void setComplainValue(Map<String, Object> complainValue) {
        this.complainValue = complainValue;
    }

    public int getActive() {
        return this.active;
    }

    public void setActive(int active) {
        this.active = active;
    }

    public long getOwner() {
        return this.owner;
    }

    public void setOwner(long owner) {
        this.owner = owner;
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

    public String getRiskLevel() {
        return this.riskLevel;
    }

    public void setRiskLevel(String riskLevel) {
        this.riskLevel = riskLevel;
    }

    public String getStatus() {
        return this.status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getLastAssessmentDate() {
        return this.lastAssessmentDate;
    }

    public void setLastAssessmentDate(Date lastAssessmentDate) {
        this.lastAssessmentDate = lastAssessmentDate;
    }

    public Date getNextReviewDate() {
        return this.nextReviewDate;
    }

    public void setNextReviewDate(Date nextReviewDate) {
        this.nextReviewDate = nextReviewDate;
    }

    public Date getActionDueDate() {
        return this.actionDueDate;
    }

    public void setActionDueDate(Date actionDueDate) {
        this.actionDueDate = actionDueDate;
    }

    public Date getLastAuditDate() {
        return this.lastAuditDate;
    }

    public void setLastAuditDate(Date lastAuditDate) {
        this.lastAuditDate = lastAuditDate;
    }

    public long getDeptId() {
        return this.deptId;
    }

    public void setDeptId(long deptId) {
        this.deptId = deptId;
    }

    public long getComplainAreaId() {
        return this.complainAreaId;
    }

    public void setComplainAreaId(long complainAreaId) {
        this.complainAreaId = complainAreaId;
    }

    public long getPageId() {
        return this.pageId;
    }

    public void setPageId(long pageId) {
        this.pageId = pageId;
    }

    public ComplianceDetailsAttachmentDTO getComplainceAttachment() {
        return this.complainceAttachment;
    }

    public void setComplainceAttachment(ComplianceDetailsAttachmentDTO complainceAttachment) {
        this.complainceAttachment = complainceAttachment;
    }
}

