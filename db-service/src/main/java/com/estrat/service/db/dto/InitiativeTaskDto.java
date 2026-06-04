/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.InitiativeTask
 *  com.estrat.service.db.dto.InitiativeTaskDto
 *  com.fasterxml.jackson.databind.ObjectMapper
 */
package com.estrat.service.db.dto;

import com.estrat.service.db.bean.po.InitiativeTask;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

public class InitiativeTaskDto {
    private long id;
    private int active = 0;
    private long initiativeId;
    private Map<String, Object> taskValue;
    private long owner;
    private long createdBy;
    private long updatedBy;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;

    public InitiativeTaskDto() {
    }

    public InitiativeTaskDto(InitiativeTask initiativeTask) {
        this.id = initiativeTask.getId();
        this.initiativeId = initiativeTask.getInitiativeId();
        this.active = initiativeTask.getActive();
        this.createdTime = initiativeTask.getCreatedTime();
        this.createdBy = initiativeTask.getCreatedBy();
        this.updatedBy = initiativeTask.getUpdatedBy();
        this.owner = initiativeTask.getOwner();
        this.updatedTime = initiativeTask.getUpdatedTime();
        ObjectMapper mapper = new ObjectMapper();
        try {
            this.taskValue = (Map)mapper.readValue(initiativeTask.getTaskValue(), HashMap.class);
        }
        catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public int getActive() {
        return this.active;
    }

    public void setActive(int active) {
        this.active = active;
    }

    public long getInitiativeId() {
        return this.initiativeId;
    }

    public void setInitiativeId(long initiativeId) {
        this.initiativeId = initiativeId;
    }

    public Map<String, Object> getTaskValue() {
        return this.taskValue;
    }

    public void setTaskValue(Map<String, Object> taskValue) {
        this.taskValue = taskValue;
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
}

