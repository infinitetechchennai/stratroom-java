/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.PagesDetails
 *  com.estrat.backend.db.bean.po.RiskAttachment
 *  com.estrat.backend.db.bean.po.RiskCauseAndConsequence
 *  com.estrat.backend.db.bean.po.RiskComments
 *  com.estrat.backend.db.bean.po.RiskDetails
 *  com.estrat.backend.db.bean.po.RiskPlan
 *  com.estrat.backend.db.dto.RiskDTO
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
 *  javax.persistence.ManyToOne
 *  javax.persistence.OneToMany
 *  javax.persistence.Table
 *  org.hibernate.annotations.GenericGenerator
 *  org.hibernate.annotations.Where
 */
package com.estrat.backend.db.bean.po;

import com.estrat.backend.db.bean.po.PagesDetails;
import com.estrat.backend.db.bean.po.RiskAttachment;
import com.estrat.backend.db.bean.po.RiskCauseAndConsequence;
import com.estrat.backend.db.bean.po.RiskComments;
import com.estrat.backend.db.bean.po.RiskPlan;
import com.estrat.backend.db.dto.RiskDTO;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import org.hibernate.annotations.Where;

@JsonIgnoreProperties(ignoreUnknown=true)
@Entity
@Table(name="risk_details", schema="orgstructure")
public class RiskDetails {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="ID")
    private long id;
    @Column(name="risk_value")
    private String riskValue;
    @Column(name="risk_id")
    private String riskUniqueId;
    @Column(name="active")
    private int active = 0;
    @Column(name="owner")
    private long owner;
    @Column(name="version", nullable=false)
    private Long version = 1L;
    @Column(name="status", nullable=false)
    private String status = "DRAFT";
    @Column(name="change_id")
    private Long changeId;
    @Column(name="created_by", updatable=false)
    private Long createdBy;
    @Column(name="updated_by")
    private Long updatedBy;
    @Column(name="created_time", updatable=false)
    private LocalDateTime createdTime;
    @Column(name="updated_time")
    private LocalDateTime updatedTime;
    @Column(name="impact_kpi_id")
    private Long impactId;
    @OneToMany(mappedBy="riskId", fetch=FetchType.LAZY, cascade={CascadeType.ALL})
    @Where(clause="active=0")
    private List<RiskCauseAndConsequence> riskCauseAndConsequenceList;
    @OneToMany(mappedBy="riskId", fetch=FetchType.LAZY, cascade={CascadeType.ALL})
    @Where(clause="active=0")
    private List<RiskPlan> riskPlanList;
    @OneToMany(mappedBy="riskId", fetch=FetchType.LAZY, cascade={CascadeType.ALL})
    @Where(clause="active=0")
    private List<RiskPlan> riskTreatmentList;
    @OneToMany(mappedBy="riskId", fetch=FetchType.LAZY, cascade={CascadeType.ALL})
    @Where(clause="active=0")
    private List<RiskComments> riskCommentsList;
    @OneToMany(mappedBy="riskId", fetch=FetchType.LAZY, cascade={CascadeType.ALL})
    @Where(clause="active=0")
    private List<RiskPlan> riskMonitoringList;
    @OneToMany(mappedBy="riskId", fetch=FetchType.LAZY, cascade={CascadeType.ALL})
    @Where(clause="active=0")
    private List<RiskAttachment> riskAttachmentList;
    @ManyToOne
    @JoinColumn(name="page_id", nullable=true)
    private PagesDetails pageId;
    @Column(name="raised_date")
    private Date raisedDate;
    @Column(name="completed_date")
    private Date completedDate;
    @Column(name="department_id")
    private Long departmentId;

    public RiskDetails() {
    }

    public RiskDetails(RiskDTO riskDTO) {
        this.id = riskDTO.getId();
        this.riskUniqueId = riskDTO.getRiskUniqueId();
        this.active = riskDTO.getActive();
        this.owner = riskDTO.getOwner();
        this.createdBy = riskDTO.getCreatedBy();
        this.updatedBy = riskDTO.getUpdatedBy();
        this.createdTime = riskDTO.getCreatedTime();
        this.updatedTime = riskDTO.getUpdatedTime();
        this.raisedDate = riskDTO.getRaisedDate();
        this.completedDate = riskDTO.getCompletedDate();
        this.impactId = riskDTO.getImpactId();
        this.version = riskDTO.getVersion();
        Long pageId = riskDTO.getPageId();
        if (pageId != null && pageId != 0L) {
            PagesDetails pagesDetails = new PagesDetails();
            pagesDetails.setId(riskDTO.getPageId());
            this.pageId = pagesDetails;
        }
        if (riskDTO.getDepartmentId() != null) {
            this.departmentId = riskDTO.getDepartmentId();
        }
        ObjectMapper mapper = new ObjectMapper();
        try {
            this.riskValue = mapper.writeValueAsString((Object)riskDTO.getRiskValue());
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

    public String getRiskValue() {
        return this.riskValue;
    }

    public void setRiskValue(String riskValue) {
        this.riskValue = riskValue;
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

    public Long getCreatedBy() {
        return this.createdBy;
    }

    public void setCreatedBy(Long createdBy) {
        this.createdBy = createdBy;
    }

    public Long getUpdatedBy() {
        return this.updatedBy;
    }

    public void setUpdatedBy(Long updatedBy) {
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

    public List<RiskCauseAndConsequence> getRiskCauseAndConsequenceList() {
        return this.riskCauseAndConsequenceList;
    }

    public void setRiskCauseAndConsequenceList(List<RiskCauseAndConsequence> riskCauseAndConsequenceList) {
        this.riskCauseAndConsequenceList = riskCauseAndConsequenceList;
    }

    public List<RiskPlan> getRiskPlanList() {
        return this.riskPlanList;
    }

    public void setRiskPlanList(List<RiskPlan> riskPlanList) {
        this.riskPlanList = riskPlanList;
    }

    public List<RiskComments> getRiskCommentsList() {
        return this.riskCommentsList;
    }

    public void setRiskCommentsList(List<RiskComments> riskCommentsList) {
        this.riskCommentsList = riskCommentsList;
    }

    public List<RiskPlan> getRiskMonitoringList() {
        return this.riskMonitoringList;
    }

    public void setRiskMonitoringList(List<RiskPlan> riskMonitoringList) {
        this.riskMonitoringList = riskMonitoringList;
    }

    public Long getImpactId() {
        return this.impactId;
    }

    public void setImpactId(Long impactId) {
        this.impactId = impactId;
    }

    public PagesDetails getPageId() {
        return this.pageId;
    }

    public void setPageId(PagesDetails pageId) {
        this.pageId = pageId;
    }

    public Date getRaisedDate() {
        return this.raisedDate;
    }

    public void setRaisedDate(Date raisedDate) {
        this.raisedDate = raisedDate;
    }

    public Date getCompletedDate() {
        return this.completedDate;
    }

    public void setCompletedDate(Date completedDate) {
        this.completedDate = completedDate;
    }

    public Long getDepartmentId() {
        return this.departmentId;
    }

    public void setDepartmentId(Long departmentId) {
        this.departmentId = departmentId;
    }

    public List<RiskPlan> getRiskTreatmentList() {
        return this.riskTreatmentList;
    }

    public void setRiskTreatmentList(List<RiskPlan> riskTreatmentList) {
        this.riskTreatmentList = riskTreatmentList;
    }

    public String getRiskUniqueId() {
        return this.riskUniqueId;
    }

    public void setRiskUniqueId(String riskUniqueId) {
        this.riskUniqueId = riskUniqueId;
    }

    public Long getVersion() {
        return this.version;
    }

    public void setVersion(Long version) {
        this.version = version;
    }

    public String getStatus() {
        return this.status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Long getChangeId() {
        return this.changeId;
    }

    public void setChangeId(Long changeId) {
        this.changeId = changeId;
    }

    public List<RiskAttachment> getRiskAttachmentList() {
        return this.riskAttachmentList;
    }

    public void setRiskAttachmentList(List<RiskAttachment> riskAttachmentList) {
        this.riskAttachmentList = riskAttachmentList;
    }
}

