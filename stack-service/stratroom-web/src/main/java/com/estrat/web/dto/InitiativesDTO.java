/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.dto.ActivitiesDTO
 *  com.estrat.web.dto.CommentsDTO
 *  com.estrat.web.dto.InitiativeAttachmentDto
 *  com.estrat.web.dto.InitiativeBudgetDTO
 *  com.estrat.web.dto.InitiativeTaskDto
 *  com.estrat.web.dto.InitiativesDTO
 *  com.estrat.web.dto.MilestonesDTO
 *  com.estrat.web.dto.SubInitiativesDTO
 *  com.fasterxml.jackson.annotation.JsonIgnore
 *  com.fasterxml.jackson.annotation.JsonInclude
 *  com.fasterxml.jackson.annotation.JsonInclude$Include
 *  org.apache.commons.lang3.StringUtils
 */
package com.estrat.web.dto;

import com.estrat.web.dto.ActivitiesDTO;
import com.estrat.web.dto.CommentsDTO;
import com.estrat.web.dto.InitiativeAttachmentDto;
import com.estrat.web.dto.InitiativeBudgetDTO;
import com.estrat.web.dto.InitiativeTaskDto;
import com.estrat.web.dto.MilestonesDTO;
import com.estrat.web.dto.SubInitiativesDTO;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.apache.commons.lang3.StringUtils;

@JsonInclude(value=JsonInclude.Include.NON_NULL)
public class InitiativesDTO {
    private long id;
    private Map<String, Object> initiativeValue;
    private List<SubInitiativesDTO> subInitiativeList;
    private List<ActivitiesDTO> activitiesList;
    private List<CommentsDTO> commentsList;
    private List<MilestonesDTO> mileStonesList;
    private List<InitiativeAttachmentDto> attachmentList;
    private List<InitiativeTaskDto> taskList;
    @JsonIgnore
    private Map<String, SubInitiativesDTO> subInitiativeMap;
    @JsonIgnore
    private Map<String, ActivitiesDTO> activitiesMap;
    @JsonIgnore
    private Map<String, MilestonesDTO> mileStonesMap;
    @JsonIgnore
    private Map<String, CommentsDTO> commentsMap;
    private InitiativeBudgetDTO initiativeBudget;
    private String endDatePeriod;
    private long pageId;
    private Long impactId;
    private Long perspectiveId;
    private Long scorecardDetailId;
    private Long objectiveId;
    private String createDateString;
    private String updatedDateString;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;
    private int active = 0;
    private long owner;
    private long createdBy;
    private long updatedBy;
    private String initiativeId;
    private Long departmentId;
    private String deptUniqueId;
    private String PageName;
    private Long subInitiativeCount;
    private Long activityCount;
    private Long milestoneCount;
    private Long taskCount;
    private Long activityInprogressCount;
    private Long taskCompleteCount;

    public Map<String, CommentsDTO> getCommentsMap() {
        if (this.commentsMap == null) {
            this.commentsMap = new HashMap();
        }
        return this.commentsMap;
    }

    public void setCommentsMap(Map<String, CommentsDTO> commentsMap) {
        this.commentsMap = commentsMap;
    }

    public Long getImpactId() {
        return this.impactId;
    }

    public void setImpactId(Long impactId) {
        this.impactId = impactId;
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

    public long getPageId() {
        return this.pageId;
    }

    public void setPageId(long pageId) {
        this.pageId = pageId;
    }

    public List<SubInitiativesDTO> getSubInitiativeList() {
        return this.subInitiativeList;
    }

    public void setSubInitiativeList(List<SubInitiativesDTO> subInitiativeList) {
        this.subInitiativeList = subInitiativeList;
    }

    public List<ActivitiesDTO> getActivitiesList() {
        return this.activitiesList;
    }

    public void setActivitiesList(List<ActivitiesDTO> activitiesList) {
        this.activitiesList = activitiesList;
    }

    public List<CommentsDTO> getCommentsList() {
        return this.commentsList;
    }

    public void setCommentsList(List<CommentsDTO> commentsList) {
        this.commentsList = commentsList;
    }

    public List<MilestonesDTO> getMileStonesList() {
        return this.mileStonesList;
    }

    public void setMileStonesList(List<MilestonesDTO> mileStonesList) {
        this.mileStonesList = mileStonesList;
    }

    public Map<String, Object> getInitiativeValue() {
        if (this.initiativeValue == null) {
            this.initiativeValue = new HashMap();
        }
        return this.initiativeValue;
    }

    public void setInitiativeValue(Map<String, Object> initiativeValue) {
        this.initiativeValue = initiativeValue;
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
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

    public String getInitiativeId() {
        return this.initiativeId;
    }

    public void setInitiativeId(String initiativeId) {
        this.initiativeId = initiativeId;
    }

    public Map<String, SubInitiativesDTO> getSubInitiativeMap() {
        if (this.subInitiativeMap == null) {
            this.subInitiativeMap = new HashMap();
        }
        return this.subInitiativeMap;
    }

    public void setSubInitiativeMap(Map<String, SubInitiativesDTO> subInitiativeMap) {
        this.subInitiativeMap = subInitiativeMap;
    }

    public Map<String, ActivitiesDTO> getActivitiesMap() {
        if (this.activitiesMap == null) {
            this.activitiesMap = new HashMap();
        }
        return this.activitiesMap;
    }

    public void setActivitiesMap(Map<String, ActivitiesDTO> activitiesMap) {
        this.activitiesMap = activitiesMap;
    }

    public Map<String, MilestonesDTO> getMileStonesMap() {
        if (this.mileStonesMap == null) {
            this.mileStonesMap = new HashMap();
        }
        return this.mileStonesMap;
    }

    public void setMileStonesMap(Map<String, MilestonesDTO> mileStonesMap) {
        this.mileStonesMap = mileStonesMap;
    }

    @JsonIgnore
    public boolean isStatusRed() {
        String status = this.getInitiativeValue().get("statusIndicator") != null && StringUtils.isNotEmpty((CharSequence)this.getInitiativeValue().get("statusIndicator").toString()) ? this.getInitiativeValue().get("statusIndicator").toString() : "";
        return status.equalsIgnoreCase("RED");
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

    public InitiativeBudgetDTO getInitiativeBudget() {
        return this.initiativeBudget;
    }

    public void setInitiativeBudget(InitiativeBudgetDTO initiativeBudget) {
        this.initiativeBudget = initiativeBudget;
    }

    public String getEndDatePeriod() {
        return this.endDatePeriod;
    }

    public void setEndDatePeriod(String endDatePeriod) {
        this.endDatePeriod = endDatePeriod;
    }

    public Long getPerspectiveId() {
        return this.perspectiveId;
    }

    public void setPerspectiveId(Long perspectiveId) {
        this.perspectiveId = perspectiveId;
    }

    public Long getScorecardDetailId() {
        return this.scorecardDetailId;
    }

    public void setScorecardDetailId(Long scorecardDetailId) {
        this.scorecardDetailId = scorecardDetailId;
    }

    public Long getObjectiveId() {
        return this.objectiveId;
    }

    public void setObjectiveId(Long objectiveId) {
        this.objectiveId = objectiveId;
    }

    public List<InitiativeAttachmentDto> getAttachmentList() {
        return this.attachmentList;
    }

    public void setAttachmentList(List<InitiativeAttachmentDto> attachmentList) {
        this.attachmentList = attachmentList;
    }

    public List<InitiativeTaskDto> getTaskList() {
        return this.taskList;
    }

    public void setTaskList(List<InitiativeTaskDto> taskList) {
        this.taskList = taskList;
    }

    public Long getSubInitiativeCount() {
        return this.subInitiativeCount;
    }

    public void setSubInitiativeCount(Long subInitiativeCount) {
        this.subInitiativeCount = subInitiativeCount;
    }

    public Long getActivityCount() {
        return this.activityCount;
    }

    public void setActivityCount(Long activityCount) {
        this.activityCount = activityCount;
    }

    public Long getMilestoneCount() {
        return this.milestoneCount;
    }

    public void setMilestoneCount(Long milestoneCount) {
        this.milestoneCount = milestoneCount;
    }

    public Long getTaskCount() {
        return this.taskCount;
    }

    public void setTaskCount(Long taskCount) {
        this.taskCount = taskCount;
    }

    public Long getActivityInprogressCount() {
        return this.activityInprogressCount;
    }

    public void setActivityInprogressCount(Long activityInprogressCount) {
        this.activityInprogressCount = activityInprogressCount;
    }

    public Long getTaskCompleteCount() {
        return this.taskCompleteCount;
    }

    public void setTaskCompleteCount(Long taskCompleteCount) {
        this.taskCompleteCount = taskCompleteCount;
    }

    public String toString() {
        return "InitiativesDTO [id=" + this.id + ", initiativeValue=" + this.initiativeValue + ", subInitiativeList=" + this.subInitiativeList + ", activitiesList=" + this.activitiesList + ", commentsList=" + this.commentsList + ", mileStonesList=" + this.mileStonesList + ", attachmentList=" + this.attachmentList + ", taskList=" + this.taskList + ", subInitiativeMap=" + this.subInitiativeMap + ", activitiesMap=" + this.activitiesMap + ", mileStonesMap=" + this.mileStonesMap + ", commentsMap=" + this.commentsMap + ", initiativeBudget=" + this.initiativeBudget + ", endDatePeriod=" + this.endDatePeriod + ", pageId=" + this.pageId + ", impactId=" + this.impactId + ", perspectiveId=" + this.perspectiveId + ", scorecardDetailId=" + this.scorecardDetailId + ", objectiveId=" + this.objectiveId + ", createDateString=" + this.createDateString + ", updatedDateString=" + this.updatedDateString + ", createdTime=" + this.createdTime + ", updatedTime=" + this.updatedTime + ", active=" + this.active + ", owner=" + this.owner + ", createdBy=" + this.createdBy + ", updatedBy=" + this.updatedBy + ", initiativeId=" + this.initiativeId + ", departmentId=" + this.departmentId + ", deptUniqueId=" + this.deptUniqueId + ", PageName=" + this.PageName + "]";
    }
}

