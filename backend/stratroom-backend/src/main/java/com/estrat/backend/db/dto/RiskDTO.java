/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.RiskDetails
 *  com.estrat.backend.db.bean.po.RiskDetailsHistory
 *  com.estrat.backend.db.dto.RiskAttachmentDto
 *  com.estrat.backend.db.dto.RiskCauseAndConsequenceDTO
 *  com.estrat.backend.db.dto.RiskCommentsDTO
 *  com.estrat.backend.db.dto.RiskDTO
 *  com.estrat.backend.db.dto.RiskMonitoringDTO
 *  com.estrat.backend.db.dto.RiskPlanDTO
 *  com.fasterxml.jackson.annotation.JsonIgnoreProperties
 *  com.fasterxml.jackson.annotation.JsonInclude
 *  com.fasterxml.jackson.annotation.JsonInclude$Include
 *  com.fasterxml.jackson.core.type.TypeReference
 *  com.fasterxml.jackson.databind.ObjectMapper
 */
package com.estrat.backend.db.dto;

import com.estrat.backend.db.bean.po.RiskDetails;
import com.estrat.backend.db.bean.po.RiskDetailsHistory;
import com.estrat.backend.db.dto.RiskAttachmentDto;
import com.estrat.backend.db.dto.RiskCauseAndConsequenceDTO;
import com.estrat.backend.db.dto.RiskCommentsDTO;
import com.estrat.backend.db.dto.RiskMonitoringDTO;
import com.estrat.backend.db.dto.RiskPlanDTO;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@JsonIgnoreProperties(ignoreUnknown=true)
@JsonInclude(value=JsonInclude.Include.NON_NULL)
public class RiskDTO {
    private long id;
    private String riskUniqueId;
    private Map<String, Object> riskValue;
    private long owner;
    private long impactId;
    private Long createdBy;
    private Long updatedBy;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;
    private int active = 0;
    private List<RiskCauseAndConsequenceDTO> riskCauseAndConsequenceList;
    private List<RiskPlanDTO> riskPlanList;
    private List<RiskPlanDTO> riskTreatmentList;
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

    public RiskDTO() {
    }

    public RiskDTO(RiskDetails riskDetails, boolean flag) {
        this.id = riskDetails.getId();
        this.riskUniqueId = riskDetails.getRiskUniqueId();
        this.owner = riskDetails.getOwner();
        this.createdBy = riskDetails.getCreatedBy();
        this.updatedBy = riskDetails.getUpdatedBy();
        this.createdTime = riskDetails.getCreatedTime();
        this.updatedTime = riskDetails.getUpdatedTime();
        this.raisedDate = riskDetails.getRaisedDate();
        this.completedDate = riskDetails.getCompletedDate();
        this.active = riskDetails.getActive();
        if (riskDetails.getChangeId() != null) {
            this.changeId = riskDetails.getChangeId();
        }
        this.draft = riskDetails.getStatus();
        if (riskDetails.getImpactId() != null) {
            this.impactId = riskDetails.getImpactId();
        }
        this.version = riskDetails.getVersion();
        if (riskDetails.getPageId() != null) {
            this.pageId = riskDetails.getPageId().getId();
        }
        if (riskDetails.getDepartmentId() != null) {
            this.departmentId = riskDetails.getDepartmentId();
        }
        if (flag) {
            this.riskCauseAndConsequenceList = riskDetails.getRiskCauseAndConsequenceList() != null ? riskDetails.getRiskCauseAndConsequenceList().stream().map(obj -> new RiskCauseAndConsequenceDTO(obj)).collect(Collectors.toList()) : null;
            this.riskMonitoringList = riskDetails.getRiskPlanList() != null ? riskDetails.getRiskPlanList().stream().map(obj -> new RiskMonitoringDTO(obj, Boolean.valueOf(true))).collect(Collectors.toList()) : null;
            this.riskPlanList = riskDetails.getRiskPlanList() != null ? riskDetails.getRiskPlanList().stream().map(obj -> new RiskPlanDTO(obj, true)).collect(Collectors.toList()) : null;
            this.riskTreatmentList = riskDetails.getRiskTreatmentList() != null ? riskDetails.getRiskTreatmentList().stream().map(obj -> new RiskPlanDTO(obj, true)).collect(Collectors.toList()) : null;
            this.riskCommentsList = riskDetails.getRiskCommentsList() != null ? riskDetails.getRiskCommentsList().stream().map(obj -> new RiskCommentsDTO(obj)).collect(Collectors.toList()) : null;
            this.riskAttachmentList = riskDetails.getRiskAttachmentList() != null ? riskDetails.getRiskAttachmentList().stream().map(obj -> new RiskAttachmentDto(obj)).collect(Collectors.toList()) : null;
        }
        ObjectMapper mapper = new ObjectMapper();
        if (riskDetails.getRiskValue() != null) {
            try {
                this.riskValue = (Map)mapper.readValue(riskDetails.getRiskValue(), HashMap.class);
            }
            catch (Exception e) {
                throw new RuntimeException(e);
            }
        }
    }

    public RiskDTO(RiskDetailsHistory riskDetailsHis) {
        this.id = riskDetailsHis.getRiskDetailId();
        this.riskUniqueId = riskDetailsHis.getRiskUniqueId();
        this.owner = riskDetailsHis.getOwner();
        this.createdBy = riskDetailsHis.getCreatedBy();
        this.updatedBy = riskDetailsHis.getUpdatedBy();
        this.createdTime = riskDetailsHis.getCreatedTime();
        this.updatedTime = riskDetailsHis.getUpdatedTime();
        this.raisedDate = riskDetailsHis.getRaisedDate();
        this.completedDate = riskDetailsHis.getCompletedDate();
        this.active = riskDetailsHis.getActive();
        if (riskDetailsHis.getChangeId() != null) {
            this.changeId = riskDetailsHis.getChangeId();
        }
        this.draft = riskDetailsHis.getStatus();
        if (riskDetailsHis.getImpactId() != null) {
            this.impactId = riskDetailsHis.getImpactId();
        }
        this.version = riskDetailsHis.getVersion();
        if (riskDetailsHis.getPageId() != null) {
            this.pageId = riskDetailsHis.getPageId().getId();
        }
        if (riskDetailsHis.getDepartmentId() != null) {
            this.departmentId = riskDetailsHis.getDepartmentId();
        }
        ObjectMapper mapper = new ObjectMapper();
        if (riskDetailsHis.getRiskValue() != null) {
            try {
                String jsonString = riskDetailsHis.getRiskValue();
                if (jsonString.startsWith("\"") && jsonString.endsWith("\"")) {
                    jsonString = (String)mapper.readValue(jsonString, String.class);
                }
                this.riskValue = mapper.readValue(jsonString, new TypeReference<Map<String, Object>>() {});
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

    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof RiskDTO)) {
            return false;
        }
        RiskDTO that = (RiskDTO)o;
        return Objects.equals(this.getId(), that.getId());
    }

    public int hashCode() {
        return Objects.hash(this.getId());
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

