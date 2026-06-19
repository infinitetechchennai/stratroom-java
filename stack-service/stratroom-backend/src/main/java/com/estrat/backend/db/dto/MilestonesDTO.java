/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.Milestones
 *  com.estrat.backend.db.dto.MilestonesDTO
 *  com.fasterxml.jackson.annotation.JsonInclude
 *  com.fasterxml.jackson.annotation.JsonInclude$Include
 *  com.fasterxml.jackson.databind.ObjectMapper
 */
package com.estrat.backend.db.dto;

import com.estrat.backend.db.bean.po.Milestones;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import com.estrat.backend.db.util.JsonUtil;

@JsonInclude(value=JsonInclude.Include.NON_NULL)
public class MilestonesDTO {
    private long id;
    private int active = 0;
    private Map<String, Object> mileStonesValue;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;
    private long owner;
    private long initiativeId;
    private long createdBy;
    private long updatedBy;

    public MilestonesDTO() {
    }

    public MilestonesDTO(Milestones milestones) {
        this.id = milestones.getId();
        this.initiativeId = milestones.getMilestonesInitiativeId();
        this.active = milestones.getActive();
        this.createdTime = milestones.getCreatedTime();
        this.createdBy = milestones.getCreatedBy();
        this.updatedBy = milestones.getUpdatedBy();
        this.owner = milestones.getOwner();
        this.updatedTime = milestones.getUpdatedTime();
        this.mileStonesValue = JsonUtil.parseMap(milestones.getMilestonesValue());
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

    public long getOwner() {
        return this.owner;
    }

    public void setOwner(long owner) {
        this.owner = owner;
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

    public long getInitiativeId() {
        return this.initiativeId;
    }

    public void setInitiativeId(long initiativeId) {
        this.initiativeId = initiativeId;
    }

    public Map<String, Object> getMileStonesValue() {
        return this.mileStonesValue;
    }

    public void setMileStonesValue(Map<String, Object> mileStonesValue) {
        this.mileStonesValue = mileStonesValue;
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
}

