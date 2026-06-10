/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.scorecard.dto.TaskCategorysDTO
 *  com.estrat.backend.scorecard.dto.TaskDetailsDTO
 */
package com.estrat.backend.scorecard.dto;

import com.estrat.backend.scorecard.dto.TaskDetailsDTO;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

public class TaskCategorysDTO {
    private long id;
    private Map<String, Object> taskCategoryValue;
    private long owner;
    private long createdBy;
    private long updatedBy;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;
    private int active = 0;
    private long deptId;
    private List<TaskDetailsDTO> taskDetailList;
    private long pageId;
    private String type;

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Map<String, Object> getTaskCategoryValue() {
        return this.taskCategoryValue;
    }

    public void setTaskCategoryValue(Map<String, Object> taskCategoryValue) {
        this.taskCategoryValue = taskCategoryValue;
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

    public long getDeptId() {
        return this.deptId;
    }

    public void setDeptId(long deptId) {
        this.deptId = deptId;
    }

    public List<TaskDetailsDTO> getTaskDetailList() {
        return this.taskDetailList;
    }

    public void setTaskDetailList(List<TaskDetailsDTO> taskDetailList) {
        this.taskDetailList = taskDetailList;
    }

    public long getPageId() {
        return this.pageId;
    }

    public void setPageId(long pageId) {
        this.pageId = pageId;
    }

    public String getType() {
        return this.type;
    }

    public void setType(String type) {
        this.type = type;
    }
}

