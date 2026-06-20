/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.Initiatives
 *  com.estrat.backend.db.bean.po.Objectives
 *  com.estrat.backend.db.dto.ActivitiesDTO
 *  com.estrat.backend.db.dto.CommentsDTO
 *  com.estrat.backend.db.dto.InitiativeAttachmentDto
 *  com.estrat.backend.db.dto.InitiativeBudgetDTO
 *  com.estrat.backend.db.dto.InitiativeTaskDto
 *  com.estrat.backend.db.dto.InitiativesDTO
 *  com.estrat.backend.db.dto.MilestonesDTO
 *  com.estrat.backend.db.dto.SubInitiativesDTO
 *  com.fasterxml.jackson.annotation.JsonInclude
 *  com.fasterxml.jackson.annotation.JsonInclude$Include
 *  com.fasterxml.jackson.databind.ObjectMapper
 */
package com.estrat.backend.db.dto;

import com.estrat.backend.db.bean.po.Initiatives;
import com.estrat.backend.db.bean.po.Objectives;
import com.estrat.backend.db.dto.ActivitiesDTO;
import com.estrat.backend.db.dto.CommentsDTO;
import com.estrat.backend.db.dto.InitiativeAttachmentDto;
import com.estrat.backend.db.dto.InitiativeBudgetDTO;
import com.estrat.backend.db.dto.InitiativeTaskDto;
import com.estrat.backend.db.dto.MilestonesDTO;
import com.estrat.backend.db.dto.SubInitiativesDTO;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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
    private String initiativeId;
    private Long impactId;
    private Long perspectiveId;
    private Long scorecardDetailId;
    private Long objectiveId;
    private String endDatePeriod;
    private InitiativeBudgetDTO initiativeBudget;
    private long pageId;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;
    private int active = 0;
    private long owner;
    private Long createdBy;
    private Long updatedBy;
    private List<Objectives> objectiveList;
    private Date startDate;
    private Date endDate;
    private Long departmentId;
    private String deptUniqueId;
    private String PageName;
    private Long subInitiativeCount;
    private Long activityCount;
    private Long milestoneCount;
    private Long taskCount;
    private Long activityInprogressCount;
    private Long taskCompleteCount;

    public InitiativesDTO() {
    }

    public InitiativesDTO(Initiatives initiatives, boolean flag) {
        this.id = initiatives.getId();
        this.createdTime = initiatives.getCreatedTime();
        this.active = initiatives.getActive();
        this.owner = initiatives.getOwner();
        this.updatedTime = initiatives.getUpdatedTime();
        this.createdBy = initiatives.getCreatedBy();
        this.updatedBy = initiatives.getUpdatedBy();
        if (initiatives.getPageId() != null) {
            this.pageId = initiatives.getPageId().getId();
        }
        this.initiativeId = initiatives.getInitiativeId();
        this.impactId = initiatives.getImpactId();
        this.startDate = initiatives.getStartDate();
        this.endDate = initiatives.getEndDate();
        this.scorecardDetailId = initiatives.getScorecardDetailId();
        this.perspectiveId = initiatives.getPerspectiveId();
        this.objectiveId = initiatives.getObjectiveId();
        if (initiatives.getDepartmentId() != null) {
            this.departmentId = initiatives.getDepartmentId();
        }
        if (flag) {
            this.subInitiativeList = initiatives.getSubInitiativeList() != null ? initiatives.getSubInitiativeList().stream().map(obj -> new SubInitiativesDTO(obj)).collect(Collectors.toList()) : null;
            this.activitiesList = initiatives.getActivitiesList() != null ? initiatives.getActivitiesList().stream().map(obj -> new ActivitiesDTO(obj)).collect(Collectors.toList()) : null;
            this.commentsList = initiatives.getCommentsList() != null ? initiatives.getCommentsList().stream().map(obj -> new CommentsDTO(obj)).collect(Collectors.toList()) : null;
            this.mileStonesList = initiatives.getMileStonesList() != null ? initiatives.getMileStonesList().stream().map(obj -> new MilestonesDTO(obj)).collect(Collectors.toList()) : null;
            this.attachmentList = initiatives.getAttachmentList() != null ? initiatives.getAttachmentList().stream().map(obj -> new InitiativeAttachmentDto(obj)).collect(Collectors.toList()) : null;
            this.taskList = initiatives.getTaskList() != null ? initiatives.getTaskList().stream().map(obj -> new InitiativeTaskDto(obj)).collect(Collectors.toList()) : null;
        }
        ObjectMapper mapper = new ObjectMapper();
        try {
            this.initiativeValue = (Map)mapper.readValue(initiatives.getInitiativeValue(), HashMap.class);
        }
        catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public Long getImpactId() {
        return this.impactId;
    }

    public void setImpactId(Long impactId) {
        this.impactId = impactId;
    }

    public String getInitiativeId() {
        return this.initiativeId;
    }

    public void setInitiativeId(String initiativeId) {
        this.initiativeId = initiativeId;
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

    public List<Objectives> getObjectiveList() {
        return this.objectiveList;
    }

    public void setObjectiveList(List<Objectives> objectiveList) {
        this.objectiveList = objectiveList;
    }

    public Date getStartDate() {
        return this.startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return this.endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
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

