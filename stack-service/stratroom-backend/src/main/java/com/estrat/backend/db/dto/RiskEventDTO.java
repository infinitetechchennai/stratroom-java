/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.RiskEvent
 *  com.estrat.backend.db.bean.po.RiskEventHistory
 *  com.estrat.backend.db.dto.RiskEventDTO
 *  com.estrat.backend.db.dto.RiskEventDTO$IncidentImpactData
 *  com.fasterxml.jackson.core.JsonParseException
 *  com.fasterxml.jackson.core.type.TypeReference
 *  com.fasterxml.jackson.databind.JsonMappingException
 *  com.fasterxml.jackson.databind.ObjectMapper
 */
package com.estrat.backend.db.dto;

import com.estrat.backend.db.bean.po.RiskEvent;
import com.estrat.backend.db.bean.po.RiskEventHistory;
import com.estrat.backend.db.dto.RiskEventDTO;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
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
    private List<IncidentImpactData> incidentImpactData;
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
    private long changeId;
    private String status;
    private Long version;
    private String receivedType;

    public RiskEventDTO(RiskEvent dto) throws JsonParseException, JsonMappingException, IOException {
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
        this.pageId = dto.getPageId();
        this.departmentId = dto.getDepartmentId();
        this.changeId = dto.getChangeId();
        this.version = dto.getVersion();
        this.status = dto.getStatus();
        ObjectMapper objectMapper = new ObjectMapper();
        this.incidentImpactData = objectMapper.readValue(dto.getIncidentImpactData(), new TypeReference<List<IncidentImpactData>>() {});
    }

    public RiskEventDTO(RiskEventHistory dto) throws JsonParseException, JsonMappingException, IOException {
        this.id = dto.getRiskEventId();
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
        this.pageId = dto.getPageId();
        this.departmentId = dto.getDepartmentId();
        this.changeId = dto.getChangeId();
        this.version = dto.getVersion();
        this.status = dto.getStatus();
        ObjectMapper objectMapper = new ObjectMapper();
        String rawJson = dto.getIncidentImpactData();
        String fixedJson = (String)objectMapper.readValue(rawJson, String.class);
        this.incidentImpactData = objectMapper.readValue(fixedJson, new TypeReference<List<IncidentImpactData>>() {});
    }

    public RiskEventDTO() {
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

    public List<IncidentImpactData> getIncidentImpactData() {
        return this.incidentImpactData;
    }

    public void setIncidentImpactData(List<IncidentImpactData> incidentImpactData) {
        this.incidentImpactData = incidentImpactData;
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
}

