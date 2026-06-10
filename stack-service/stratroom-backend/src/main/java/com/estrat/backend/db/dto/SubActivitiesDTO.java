/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.SubActivitiesDetails
 *  com.estrat.backend.db.dto.SubActivitiesDTO
 *  com.fasterxml.jackson.databind.ObjectMapper
 */
package com.estrat.backend.db.dto;

import com.estrat.backend.db.bean.po.SubActivitiesDetails;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

public class SubActivitiesDTO {
    private long id;
    private int active = 0;
    private Map<String, Object> activitiesValue;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;
    private long owner;
    private long activitieId;
    private long createdBy;
    private long updatedBy;

    public SubActivitiesDTO() {
    }

    public SubActivitiesDTO(SubActivitiesDetails subactivitiesDetails) {
        this.id = subactivitiesDetails.getId();
        this.activitieId = subactivitiesDetails.getActivitieId();
        this.active = subactivitiesDetails.getActive();
        this.createdTime = subactivitiesDetails.getCreatedTime();
        this.createdBy = subactivitiesDetails.getCreatedBy();
        this.updatedBy = subactivitiesDetails.getUpdatedBy();
        this.owner = subactivitiesDetails.getOwner();
        this.updatedTime = subactivitiesDetails.getUpdatedTime();
        ObjectMapper mapper = new ObjectMapper();
        try {
            this.activitiesValue = (Map)mapper.readValue(subactivitiesDetails.getActivitiesValue(), HashMap.class);
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

    public Map<String, Object> getActivitiesValue() {
        return this.activitiesValue;
    }

    public void setActivitiesValue(Map<String, Object> activitiesValue) {
        this.activitiesValue = activitiesValue;
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

    public long getOwner() {
        return this.owner;
    }

    public void setOwner(long owner) {
        this.owner = owner;
    }

    public long getActivitieId() {
        return this.activitieId;
    }

    public void setActivitieId(long activitieId) {
        this.activitieId = activitieId;
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

