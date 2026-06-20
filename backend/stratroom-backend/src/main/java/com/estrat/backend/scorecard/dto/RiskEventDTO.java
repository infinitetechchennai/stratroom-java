/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.scorecard.dto.RiskEventDTO
 *  com.estrat.backend.scorecard.dto.RiskEventDTO$IncidentImpactData
 */
package com.estrat.backend.scorecard.dto;

import java.time.LocalDateTime;
import java.util.List;

public class RiskEventDTO {
    private Long id;
    private String incidentDate;
    private String riskCode;
    private String incident;
    private String eventType;
    private String incidentCategory;
    private String incidentDescription;
    private String impactCategory;
    private String impactDescription;
    private String impactLevel;
    private String correctiveAction;
    private String riskMitigation;
    private String eventStatus;
    private String reporter;
    private String reporterName;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String createdBy;
    private String updatedBy;
    private Long departmentId;
    private Long pageId;
    private String departmentName;
    private String pageName;
    private List<IncidentImpactData> incidentImpactData;
    private long changeId;
    private String status;
    private Long version;
    private String receivedType;

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

    public Long getDepartmentId() {
        return this.departmentId;
    }

    public void setDepartmentId(Long departmentId) {
        this.departmentId = departmentId;
    }

    public Long getPageId() {
        return this.pageId;
    }

    public void setPageId(Long pageId) {
        this.pageId = pageId;
    }

    public List<IncidentImpactData> getIncidentImpactData() {
        return this.incidentImpactData;
    }

    public void setIncidentImpactData(List<IncidentImpactData> incidentImpactData) {
        this.incidentImpactData = incidentImpactData;
    }

    public String getDepartmentName() {
        return this.departmentName;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }

    public String getPageName() {
        return this.pageName;
    }

    public void setPageName(String pageName) {
        this.pageName = pageName;
    }

    public long getChangeId() {
        return this.changeId;
    }

    public void setChangeId(long changeId) {
        this.changeId = changeId;
    }

    public String getStatus() {
        return this.status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Long getVersion() {
        return this.version;
    }

    public void setVersion(Long version) {
        this.version = version;
    }

    public String getReceivedType() {
        return this.receivedType;
    }

    public void setReceivedType(String receivedType) {
        this.receivedType = receivedType;
    }

    public static class IncidentImpactData {
        private String impactType;
        private String impactValue;
        private String impactDescription;

        public String getImpactType() { return impactType; }
        public void setImpactType(String impactType) { this.impactType = impactType; }
        public String getImpactValue() { return impactValue; }
        public void setImpactValue(String impactValue) { this.impactValue = impactValue; }
        public String getImpactDescription() { return impactDescription; }
        public void setImpactDescription(String impactDescription) { this.impactDescription = impactDescription; }
    }
}
