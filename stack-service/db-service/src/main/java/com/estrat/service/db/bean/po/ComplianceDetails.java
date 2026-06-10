/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.ComplianceDetails
 *  com.estrat.service.db.bean.po.ComplianceDetailsAttachment
 *  com.estrat.service.db.bean.po.PagesDetails
 *  com.estrat.service.db.dto.ComplianceDetailsDTO
 *  com.fasterxml.jackson.annotation.JsonIgnoreProperties
 *  com.fasterxml.jackson.core.JsonProcessingException
 *  com.fasterxml.jackson.databind.ObjectMapper
 *  javax.persistence.CascadeType
 *  javax.persistence.Column
 *  javax.persistence.Entity
 *  javax.persistence.FetchType
 *  javax.persistence.GeneratedValue
 *  javax.persistence.GenerationType
 *  javax.persistence.Id
 *  javax.persistence.JoinColumn
 *  javax.persistence.OneToOne
 *  javax.persistence.Table
 *  org.hibernate.annotations.GenericGenerator
 */
package com.estrat.service.db.bean.po;

import com.estrat.service.db.bean.po.ComplianceDetailsAttachment;
import com.estrat.service.db.bean.po.PagesDetails;
import com.estrat.service.db.dto.ComplianceDetailsDTO;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import java.util.Date;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import org.hibernate.annotations.GenericGenerator;

@JsonIgnoreProperties(ignoreUnknown=true)
@Entity
@Table(name="compliance_details", schema="orgstructure")
public class ComplianceDetails {
    @Id
    @GenericGenerator(name="native", strategy="native")
    @GeneratedValue(generator="native", strategy=GenerationType.AUTO)
    @Column(name="ID")
    private long id;
    @Column(name="complainarea_id")
    private long complainAreaId;
    @Column(name="complain_value")
    private String complainValue;
    @Column(name="active")
    private int active = 0;
    @Column(name="owner")
    private long owner;
    @Column(name="created_by", updatable=false)
    private long createdBy;
    @Column(name="updated_by")
    private long updatedBy;
    @Column(name="created_time", updatable=false)
    private LocalDateTime createdTime;
    @Column(name="updated_time")
    private LocalDateTime updatedTime;
    @Column(name="risklevel")
    private String riskLevel;
    @Column(name="status")
    private String status;
    @Column(name="assessment_date")
    private Date lastAssessmentDate;
    @Column(name="review_date")
    private Date nextReviewDate;
    @Column(name="due_date")
    private Date actionDueDate;
    @Column(name="lastaudit_date")
    private Date lastAuditDate;
    @Column(name="deptid")
    private long deptId;
    @OneToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="page_id", nullable=true)
    private PagesDetails pageId;
    @OneToOne(mappedBy="complianceDetails", fetch=FetchType.LAZY, cascade={CascadeType.ALL})
    private ComplianceDetailsAttachment complianceAttachment;

    public ComplianceDetails() {
    }

    public ComplianceDetails(ComplianceDetailsDTO complianceDetailsDTO) {
        this.id = complianceDetailsDTO.getId();
        this.active = complianceDetailsDTO.getActive();
        this.owner = complianceDetailsDTO.getOwner();
        this.createdBy = complianceDetailsDTO.getCreatedBy();
        this.updatedBy = complianceDetailsDTO.getUpdatedBy();
        this.createdTime = complianceDetailsDTO.getCreatedTime();
        this.updatedTime = complianceDetailsDTO.getUpdatedTime();
        this.riskLevel = complianceDetailsDTO.getRiskLevel();
        this.status = complianceDetailsDTO.getStatus();
        this.lastAssessmentDate = complianceDetailsDTO.getLastAssessmentDate();
        this.nextReviewDate = complianceDetailsDTO.getNextReviewDate();
        this.actionDueDate = complianceDetailsDTO.getActionDueDate();
        this.lastAuditDate = complianceDetailsDTO.getLastAssessmentDate();
        this.deptId = complianceDetailsDTO.getDeptId();
        this.complainAreaId = complianceDetailsDTO.getComplainAreaId();
        if (complianceDetailsDTO.getPageId() != 0L) {
            PagesDetails pagesDetails = new PagesDetails();
            pagesDetails.setId(complianceDetailsDTO.getPageId());
            this.pageId = pagesDetails;
        }
        ObjectMapper mapper = new ObjectMapper();
        try {
            this.complainValue = mapper.writeValueAsString((Object)complianceDetailsDTO.getComplainValue());
        }
        catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getComplainValue() {
        return this.complainValue;
    }

    public void setComplainValue(String complainValue) {
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

    public PagesDetails getPageId() {
        return this.pageId;
    }

    public void setPageId(PagesDetails pageId) {
        this.pageId = pageId;
    }

    public ComplianceDetailsAttachment getComplianceAttachment() {
        return this.complianceAttachment;
    }

    public void setComplianceAttachment(ComplianceDetailsAttachment complianceAttachment) {
        this.complianceAttachment = complianceAttachment;
    }
}

