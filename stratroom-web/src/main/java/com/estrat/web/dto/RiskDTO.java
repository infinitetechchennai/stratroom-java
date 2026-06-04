/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.dto.RiskActivitiesDTO
 *  com.estrat.web.dto.RiskAttachmentDto
 *  com.estrat.web.dto.RiskCauseAndConsequenceDTO
 *  com.estrat.web.dto.RiskCommentsDTO
 *  com.estrat.web.dto.RiskDTO
 *  com.estrat.web.dto.RiskMonitoringDTO
 *  com.estrat.web.dto.RiskPlanDTO
 *  com.fasterxml.jackson.annotation.JsonIgnore
 *  com.fasterxml.jackson.annotation.JsonInclude
 *  com.fasterxml.jackson.annotation.JsonInclude$Include
 */
package com.estrat.web.dto;

import com.estrat.web.dto.RiskActivitiesDTO;
import com.estrat.web.dto.RiskAttachmentDto;
import com.estrat.web.dto.RiskCauseAndConsequenceDTO;
import com.estrat.web.dto.RiskCommentsDTO;
import com.estrat.web.dto.RiskMonitoringDTO;
import com.estrat.web.dto.RiskPlanDTO;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashMap;
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
    private String inherentRiskCauseScore;
    private String inherentRiskConsequenceScore;
    private String residualRiskImpactScore;
    private String residualRiskPossibiltyScore;
    private int active = 0;
    private String createDateString;
    private String updatedDateString;
    private List<RiskCauseAndConsequenceDTO> riskCauseAndConsequenceList;
    private List<RiskPlanDTO> riskPlanList;
    private List<RiskPlanDTO> riskTreatmentList;
    private List<RiskActivitiesDTO> riskActivitiesList;
    private List<RiskCommentsDTO> riskCommentsList;
    private List<RiskMonitoringDTO> riskMonitoringList;
    private Map<String, RiskCauseAndConsequenceDTO> riskCauseAndConsequenceMap;
    private Map<String, RiskPlanDTO> riskPlanMap;
    private Map<String, RiskMonitoringDTO> riskMonitoringMap;
    private Map<String, RiskCommentsDTO> riskCommentsDTOMap;
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

    public Map<String, RiskCauseAndConsequenceDTO> getRiskCauseAndConsequenceMap() {
        if (this.riskCauseAndConsequenceMap == null) {
            this.riskCauseAndConsequenceMap = new HashMap();
        }
        return this.riskCauseAndConsequenceMap;
    }

    public void setRiskCauseAndConsequenceMap(Map<String, RiskCauseAndConsequenceDTO> riskCauseAndConsequenceMap) {
        this.riskCauseAndConsequenceMap = riskCauseAndConsequenceMap;
    }

    public Map<String, RiskPlanDTO> getRiskPlanMap() {
        if (this.riskPlanMap == null) {
            this.riskPlanMap = new HashMap();
        }
        return this.riskPlanMap;
    }

    public Map<String, RiskCommentsDTO> getRiskCommentsDTOMap() {
        if (this.riskCommentsDTOMap == null) {
            this.riskCommentsDTOMap = new HashMap();
        }
        return this.riskCommentsDTOMap;
    }

    public void setRiskCommentsDTOMap(Map<String, RiskCommentsDTO> riskCommentsDTOMap) {
        this.riskCommentsDTOMap = riskCommentsDTOMap;
    }

    public void setRiskPlanMap(Map<String, RiskPlanDTO> riskPlanMap) {
        this.riskPlanMap = riskPlanMap;
    }

    public Map<String, RiskMonitoringDTO> getRiskMonitoringMap() {
        if (this.riskMonitoringMap == null) {
            this.riskMonitoringMap = new HashMap();
        }
        return this.riskMonitoringMap;
    }

    public void setRiskMonitoringMap(Map<String, RiskMonitoringDTO> riskMonitoringMap) {
        this.riskMonitoringMap = riskMonitoringMap;
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Map<String, Object> getRiskValue() {
        if (this.riskValue == null) {
            this.riskValue = new HashMap();
        }
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

    public String getCreateDateString() {
        return this.createDateString;
    }

    public void setCreateDateString(String createDateString) {
        this.createDateString = createDateString;
    }

    public String getUpdatedDateString() {
        return this.updatedDateString;
    }

    public void setUpdatedDateString(String updatedDateString) {
        this.updatedDateString = updatedDateString;
    }

    public long getImpactId() {
        return this.impactId;
    }

    public void setImpactId(long impactId) {
        this.impactId = impactId;
    }

    @JsonIgnore
    public String formatName() {
        if (this.getRiskValue() != null && this.getRiskValue().get("name") != null) {
            String riskName = this.getRiskValue().get("name").toString();
            if (riskName.length() > 75) {
                String subString = riskName.substring(0, 75);
                return String.join((CharSequence)"", subString, "...");
            }
            return riskName;
        }
        return "";
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

    public String getRiskUniqueId() {
        return this.riskUniqueId;
    }

    public void setRiskUniqueId(String riskUniqueId) {
        this.riskUniqueId = riskUniqueId;
    }

    public String getInherentRiskCauseScore() {
        return this.inherentRiskCauseScore;
    }

    public void setInherentRiskCauseScore(String inherentRiskCauseScore) {
        this.inherentRiskCauseScore = inherentRiskCauseScore;
    }

    public String getInherentRiskConsequenceScore() {
        return this.inherentRiskConsequenceScore;
    }

    public void setInherentRiskConsequenceScore(String inherentRiskConsequenceScore) {
        this.inherentRiskConsequenceScore = inherentRiskConsequenceScore;
    }

    public String getResidualRiskImpactScore() {
        return this.residualRiskImpactScore;
    }

    public void setResidualRiskImpactScore(String residualRiskImpactScore) {
        this.residualRiskImpactScore = residualRiskImpactScore;
    }

    public String getResidualRiskPossibiltyScore() {
        return this.residualRiskPossibiltyScore;
    }

    public void setResidualRiskPossibiltyScore(String residualRiskPossibiltyScore) {
        this.residualRiskPossibiltyScore = residualRiskPossibiltyScore;
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

    public List<RiskPlanDTO> getRiskTreatmentList() {
        return this.riskTreatmentList;
    }

    public void setRiskTreatmentList(List<RiskPlanDTO> riskTreatmentList) {
        this.riskTreatmentList = riskTreatmentList;
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

