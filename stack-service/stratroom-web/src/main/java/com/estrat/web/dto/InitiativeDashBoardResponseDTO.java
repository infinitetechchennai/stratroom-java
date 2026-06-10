/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.dto.InitiativeDashBoardResponseDTO
 *  com.estrat.web.dto.InitiativesDTO
 */
package com.estrat.web.dto;

import com.estrat.web.dto.InitiativesDTO;
import java.util.List;
import java.util.Map;

public class InitiativeDashBoardResponseDTO {
    private long totalInitiative;
    private long totalProgress;
    private long totalSubInitiative;
    private long totalMilestone;
    private long totalActivity;
    private long totalTask;
    private String message;
    private List<InitiativesDTO> initiveDTO;
    private Map<String, Integer> milestoneStatusCount;
    private Map<String, Integer> activityStatusDTO;
    private Map<String, Integer> taskStatusCount;

    public long getTotalInitiative() {
        return this.totalInitiative;
    }

    public void setTotalInitiative(long totalInitiative) {
        this.totalInitiative = totalInitiative;
    }

    public long getTotalSubInitiative() {
        return this.totalSubInitiative;
    }

    public void setTotalSubInitiative(long totalSubInitiative) {
        this.totalSubInitiative = totalSubInitiative;
    }

    public long getTotalMilestone() {
        return this.totalMilestone;
    }

    public void setTotalMilestone(long totalMilestone) {
        this.totalMilestone = totalMilestone;
    }

    public long getTotalActivity() {
        return this.totalActivity;
    }

    public void setTotalActivity(long totalActivity) {
        this.totalActivity = totalActivity;
    }

    public long getTotalTask() {
        return this.totalTask;
    }

    public void setTotalTask(long totalTask) {
        this.totalTask = totalTask;
    }

    public String getMessage() {
        return this.message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public List<InitiativesDTO> getInitiveDTO() {
        return this.initiveDTO;
    }

    public void setInitiveDTO(List<InitiativesDTO> initiveDTO) {
        this.initiveDTO = initiveDTO;
    }

    public Map<String, Integer> getMilestoneStatusCount() {
        return this.milestoneStatusCount;
    }

    public void setMilestoneStatusCount(Map<String, Integer> milestoneStatusCount) {
        this.milestoneStatusCount = milestoneStatusCount;
    }

    public Map<String, Integer> getActivityStatusDTO() {
        return this.activityStatusDTO;
    }

    public void setActivityStatusDTO(Map<String, Integer> activityStatusDTO) {
        this.activityStatusDTO = activityStatusDTO;
    }

    public Map<String, Integer> getTaskStatusCount() {
        return this.taskStatusCount;
    }

    public void setTaskStatusCount(Map<String, Integer> taskStatusCount) {
        this.taskStatusCount = taskStatusCount;
    }

    public long getTotalProgress() {
        return this.totalProgress;
    }

    public void setTotalProgress(long totalProgress) {
        this.totalProgress = totalProgress;
    }
}

