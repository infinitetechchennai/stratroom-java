/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.scorecard.dto.RiskActivitiesDTO
 *  com.estrat.backend.scorecard.dto.RiskAttachmentDto
 *  com.estrat.backend.scorecard.dto.RiskCauseAndConsequenceDTO
 *  com.estrat.backend.scorecard.dto.RiskCommentsDTO
 *  com.estrat.backend.scorecard.dto.RiskDTO
 *  com.estrat.backend.scorecard.dto.RiskMonitoringDTO
 *  com.estrat.backend.scorecard.dto.RiskPlanDTO
 *  com.fasterxml.jackson.annotation.JsonInclude
 *  com.fasterxml.jackson.annotation.JsonInclude$Include
 */
package com.estrat.backend.scorecard.dto;

import com.estrat.backend.scorecard.dto.RiskActivitiesDTO;
import com.estrat.backend.scorecard.dto.RiskAttachmentDto;
import com.estrat.backend.scorecard.dto.RiskCauseAndConsequenceDTO;
import com.estrat.backend.scorecard.dto.RiskCommentsDTO;
import com.estrat.backend.scorecard.dto.RiskMonitoringDTO;
import com.estrat.backend.scorecard.dto.RiskPlanDTO;
import com.fasterxml.jackson.annotation.JsonInclude;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Map;

@JsonInclude(value=JsonInclude.Include.NON_NULL)
public class RiskDTO {
    private long id;
    private String riskUniqueId;
    private Map<String, Object> riskValue;
    private long owner;
    private long impactId;
    private long createdBy;
    private long updatedBy;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;
    private int active = 0;
    private List<RiskCauseAndConsequenceDTO> riskCauseAndConsequenceList;
    private List<RiskPlanDTO> riskPlanList;
    private List<RiskPlanDTO> riskTreatmentList;
    private List<RiskActivitiesDTO> riskActivitiesList;
    private List<RiskCommentsDTO> riskCommentsList;
    private List<RiskMonitoringDTO> riskMonitoringList;
    private List<RiskAttachmentDto> riskAttachmentList;
    private long pageId;
    private Date raisedDate;
    private Date completedDate;
    private Long departmentId;
    private String deptUniqueId;
    private String PageName;
    private long changeId;
    private String draft;
    private long parentchangeId;
    private Long version;

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Map<String, Object> getRiskValue() {
        return this.riskValue;
    }

    public void setRiskValue(Map<String, Object> riskValue) {
        this.riskValue = riskValue;
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

    public int getActive() {
        return this.active;
    }

    public void setActive(int active) {
        this.active = active;
    }

    public List<RiskCauseAndConsequenceDTO> getRiskCauseAndConsequenceList() {
        return this.riskCauseAndConsequenceList;
    }

    public void setRiskCauseAndConsequenceList(List<RiskCauseAndConsequenceDTO> riskCauseAndConsequenceList) {
        this.riskCauseAndConsequenceList = riskCauseAndConsequenceList;
    }

    public List<RiskPlanDTO> getRiskPlanList() {
        return this.riskPlanList;
    }

    public void setRiskPlanList(List<RiskPlanDTO> riskPlanList) {
        this.riskPlanList = riskPlanList;
    }

    public List<RiskActivitiesDTO> getRiskActivitiesList() {
        return this.riskActivitiesList;
    }

    public void setRiskActivitiesList(List<RiskActivitiesDTO> riskActivitiesList) {
        this.riskActivitiesList = riskActivitiesList;
    }

    public List<RiskCommentsDTO> getRiskCommentsList() {
        return this.riskCommentsList;
    }

    public void setRiskCommentsList(List<RiskCommentsDTO> riskCommentsList) {
        this.riskCommentsList = riskCommentsList;
    }

    public List<RiskMonitoringDTO> getRiskMonitoringList() {
        return this.riskMonitoringList;
    }

    public void setRiskMonitoringList(List<RiskMonitoringDTO> riskMonitoringList) {
        this.riskMonitoringList = riskMonitoringList;
    }

    public long getImpactId() {
        return this.impactId;
    }

    public void setImpactId(long impactId) {
        this.impactId = impactId;
    }

    public long getPageId() {
        return this.pageId;
    }

    public void setPageId(long pageId) {
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

    public String getDeptUniqueId() {
        return this.deptUniqueId;
    }

    public void setDeptUniqueId(String deptUniqueId) {
        this.deptUniqueId = deptUniqueId;
    }

    public String getPageName() {
        return this.PageName;
    }

    public void setPageName(String pageName) {
        this.PageName = pageName;
    }

    public List<RiskPlanDTO> getRiskTreatmentList() {
        return this.riskTreatmentList;
    }

    public void setRiskTreatmentList(List<RiskPlanDTO> riskTreatmentList) {
        this.riskTreatmentList = riskTreatmentList;
    }

    public String getRiskUniqueId() {
        return this.riskUniqueId;
    }

    public void setRiskUniqueId(String riskUniqueId) {
        this.riskUniqueId = riskUniqueId;
    }

    public long getChangeId() {
        return this.changeId;
    }

    public void setChangeId(long changeId) {
        this.changeId = changeId;
    }

    public String getDraft() {
        return this.draft;
    }

    public void setDraft(String draft) {
        this.draft = draft;
    }

    public long getParentchangeId() {
        return this.parentchangeId;
    }

    public void setParentchangeId(long parentchangeId) {
        this.parentchangeId = parentchangeId;
    }

    public Long getVersion() {
        return this.version;
    }

    public void setVersion(Long version) {
        this.version = version;
    }

    public List<RiskAttachmentDto> getRiskAttachmentList() {
        return this.riskAttachmentList;
    }

    public void setRiskAttachmentList(List<RiskAttachmentDto> riskAttachmentList) {
        this.riskAttachmentList = riskAttachmentList;
    }
}

