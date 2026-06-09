/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.scorecard.dto.ActivitiesDTO
 *  com.estrat.scorecard.dto.CommentsDTO
 *  com.estrat.scorecard.dto.InitiativeAttachmentDto
 *  com.estrat.scorecard.dto.InitiativeBudgetDTO
 *  com.estrat.scorecard.dto.InitiativeTaskDto
 *  com.estrat.scorecard.dto.InitiativesDTO
 *  com.estrat.scorecard.dto.MilestonesDTO
 *  com.estrat.scorecard.dto.SubInitiativesDTO
 *  com.fasterxml.jackson.annotation.JsonInclude
 *  com.fasterxml.jackson.annotation.JsonInclude$Include
 */
package com.estrat.scorecard.dto;

import com.estrat.scorecard.dto.ActivitiesDTO;
import com.estrat.scorecard.dto.CommentsDTO;
import com.estrat.scorecard.dto.InitiativeAttachmentDto;
import com.estrat.scorecard.dto.InitiativeBudgetDTO;
import com.estrat.scorecard.dto.InitiativeTaskDto;
import com.estrat.scorecard.dto.MilestonesDTO;
import com.estrat.scorecard.dto.SubInitiativesDTO;
import com.fasterxml.jackson.annotation.JsonInclude;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

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
    private InitiativeBudgetDTO initiativeBudget;
    private long pageId;
    private String endDatePeriod;
    private Long impactId;
    private Long perspectiveId;
    private Long scorecardDetailId;
    private Long objectiveId;
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

    public Long getImpactId() {
        return this.impactId;
    }

    public void setImpactId(Long impactId) {
        this.impactId = impactId;
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
}

