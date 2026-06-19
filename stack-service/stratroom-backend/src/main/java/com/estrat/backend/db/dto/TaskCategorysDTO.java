/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.TaskCategorys
 *  com.estrat.backend.db.dto.TaskCategorysDTO
 *  com.estrat.backend.db.dto.TaskDetailsDTO
 *  com.fasterxml.jackson.databind.ObjectMapper
 */
package com.estrat.backend.db.dto;

import com.estrat.backend.db.bean.po.TaskCategorys;
import com.estrat.backend.db.dto.TaskDetailsDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import com.estrat.backend.db.util.JsonUtil;

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

    public TaskCategorysDTO() {
    }

    public TaskCategorysDTO(TaskCategorys taskCategorys) {
        this.id = taskCategorys.getId();
        this.owner = taskCategorys.getOwner();
        this.createdBy = taskCategorys.getCreatedBy();
        this.updatedBy = taskCategorys.getUpdatedBy();
        this.createdTime = taskCategorys.getCreatedTime();
        this.updatedTime = taskCategorys.getUpdatedTime();
        this.active = taskCategorys.getActive();
        this.deptId = taskCategorys.getDeptId();
        this.pageId = taskCategorys.getPageId();
        this.taskDetailList = taskCategorys.getTaskDetailsList() != null ? taskCategorys.getTaskDetailsList().stream().map(kpi -> new TaskDetailsDTO(kpi)).collect(Collectors.toList()) : null;
        ObjectMapper mapper = new ObjectMapper();
        if (taskCategorys.getTaskCategoryValue() != null) {
            try {
                this.taskCategoryValue = JsonUtil.parseMap(taskCategorys.getTaskCategoryValue());
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

