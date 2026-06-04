/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.RiskEvent
 *  com.estrat.service.db.dto.RiskEventDTO
 *  com.fasterxml.jackson.core.JsonProcessingException
 *  com.fasterxml.jackson.databind.ObjectMapper
 *  javax.persistence.Column
 *  javax.persistence.Entity
 *  javax.persistence.GeneratedValue
 *  javax.persistence.GenerationType
 *  javax.persistence.Id
 *  javax.persistence.Table
 */
package com.estrat.service.db.bean.po;

import com.estrat.service.db.dto.RiskEventDTO;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="risk_event", schema="orgstructure")
public class RiskEvent {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;
    @Column(name="incident_date")
    private String incidentDate;
    @Column(name="risk_code")
    private String riskCode;
    @Column(name="incident")
    private String incident;
    @Column(name="event_type")
    private String eventType;
    @Column(name="incident_category")
    private String incidentCategory;
    @Column(name="incident_description")
    private String incidentDescription;
    @Column(name="impact_category")
    private String impactCategory;
    @Column(name="impact_description")
    private String impactDescription;
    @Column(name="impact_level")
    private String impactLevel;
    @Column(name="corrective_action")
    private String correctiveAction;
    @Column(name="risk_mitigation")
    private String riskMitigation;
    @Column(name="event_status")
    private String eventStatus;
    @Column(name="reporter")
    private String reporter;
    @Column(name="reporter_name")
    private String reporterName;
    @Column(name="created_at", updatable=false)
    private LocalDateTime createdAt;
    @Column(name="updated_at")
    private LocalDateTime updatedAt;
    @Column(name="created_by")
    private String createdBy;
    @Column(name="updated_by")
    private String updatedBy;
    @Column(name="page_id")
    private Long pageId;
    @Column(name="department_id")
    private Long departmentId;
    @Column(name="incident_impact_data")
    private String incidentImpactData;
    @Column(name="version", nullable=false)
    private Long version = 1L;
    @Column(name="status", nullable=false)
    private String status = "DRAFT";
    @Column(name="change_id")
    private Long changeId = 0L;

    public RiskEvent() {
    }

    public RiskEvent(RiskEventDTO dto) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        this.id = dto.getId();
        this.incidentDate = dto.getIncidentDate();
        this.riskCode = dto.getRiskCode();
        this.incident = dto.getIncident();
        this.eventType = dto.getEventType();
        this.incidentCategory = dto.getIncidentCategory();
        this.incidentDescription = dto.getIncidentDescription();
        this.impactCategory = dto.getImpactCategory();
        this.impactDescription = dto.getImpactDescription();
        this.impactLevel = dto.getImpactLevel();
        this.correctiveAction = dto.getCorrectiveAction();
        this.riskMitigation = dto.getRiskMitigation();
        this.eventStatus = dto.getEventStatus();
        this.reporter = dto.getReporter();
        this.reporterName = dto.getReporterName();
        this.createdAt = dto.getCreatedAt();
        this.updatedAt = dto.getUpdatedAt();
        this.createdBy = dto.getCreatedBy();
        this.updatedBy = dto.getUpdatedBy();
        this.departmentId = dto.getDepartmentId();
        this.pageId = dto.getPageId();
        this.incidentImpactData = objectMapper.writeValueAsString((Object)dto.getIncidentImpactData());
        this.changeId = dto.getChangeId();
        this.version = dto.getVersion();
        this.status = dto.getStatus();
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIncidentDate() {
        return this.incidentDate;
    }

    public void setIncidentDate(String incidentDate) {
        this.incidentDate = incidentDate;
    }

    public String getRiskCode() {
        return this.riskCode;
    }

    public void setRiskCode(String riskCode) {
        this.riskCode = riskCode;
    }

    public String getIncident() {
        return this.incident;
    }

    public void setIncident(String incident) {
        this.incident = incident;
    }

    public String getEventType() {
        return this.eventType;
    }

    public void setEventType(String eventType) {
        this.eventType = eventType;
    }

    public String getIncidentCategory() {
        return this.incidentCategory;
    }

    public void setIncidentCategory(String incidentCategory) {
        this.incidentCategory = incidentCategory;
    }

    public String getIncidentDescription() {
        return this.incidentDescription;
    }

    public void setIncidentDescription(String incidentDescription) {
        this.incidentDescription = incidentDescription;
    }

    public String getImpactCategory() {
        return this.impactCategory;
    }

    public void setImpactCategory(String impactCategory) {
        this.impactCategory = impactCategory;
    }

    public String getImpactDescription() {
        return this.impactDescription;
    }

    public void setImpactDescription(String impactDescription) {
        this.impactDescription = impactDescription;
    }

    public String getImpactLevel() {
        return this.impactLevel;
    }

    public void setImpactLevel(String impactLevel) {
        this.impactLevel = impactLevel;
    }

    public String getCorrectiveAction() {
        return this.correctiveAction;
    }

    public void setCorrectiveAction(String correctiveAction) {
        this.correctiveAction = correctiveAction;
    }

    public String getRiskMitigation() {
        return this.riskMitigation;
    }

    public void setRiskMitigation(String riskMitigation) {
        this.riskMitigation = riskMitigation;
    }

    public String getEventStatus() {
        return this.eventStatus;
    }

    public void setEventStatus(String eventStatus) {
        this.eventStatus = eventStatus;
    }

    public String getReporter() {
        return this.reporter;
    }

    public void setReporter(String reporter) {
        this.reporter = reporter;
    }

    public String getReporterName() {
        return this.reporterName;
    }

    public void setReporterName(String reporterName) {
        this.reporterName = reporterName;
    }

    public LocalDateTime getCreatedAt() {
        return this.createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return this.updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public String getCreatedBy() {
        return this.createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public String getUpdatedBy() {
        return this.updatedBy;
    }

    public void setUpdatedBy(String updatedBy) {
        this.updatedBy = updatedBy;
    }

    public Long getPageId() {
        return this.pageId;
    }

    public void setPageId(Long pageId) {
        this.pageId = pageId;
    }

    public Long getDepartmentId() {
        return this.departmentId;
    }

    public void setDepartmentId(Long departmentId) {
        this.departmentId = departmentId;
    }

    public String getIncidentImpactData() {
        return this.incidentImpactData;
    }

    public void setIncidentImpactData(String incidentImpactData) {
        this.incidentImpactData = incidentImpactData;
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
}

