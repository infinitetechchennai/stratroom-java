/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.dto.EmployeeGoalsDTO
 *  com.fasterxml.jackson.annotation.JsonIgnore
 *  org.apache.commons.lang3.StringUtils
 */
package com.estrat.web.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.time.LocalDateTime;
import java.util.Map;
import org.apache.commons.lang3.StringUtils;

public class EmployeeGoalsDTO {
    private long id;
    private long owner;
    private int active = 0;
    private Map<String, Object> goalsValue;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;
    private long createdBy;
    private long updatedBy;
    private String createDateString;
    private String updatedDateString;

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getOwner() {
        return this.owner;
    }

    public void setOwner(long owner) {
        this.owner = owner;
    }

    public int getActive() {
        return this.active;
    }

    public void setActive(int active) {
        this.active = active;
    }

    public Map<String, Object> getGoalsValue() {
        return this.goalsValue;
    }

    public void setGoalsValue(Map<String, Object> goalsValue) {
        this.goalsValue = goalsValue;
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

    @JsonIgnore
    public boolean isStatusRed() {
        String status = this.getGoalsValue().get("statusIndicator") != null && StringUtils.isNotEmpty((CharSequence)this.getGoalsValue().get("statusIndicator").toString()) ? this.getGoalsValue().get("statusIndicator").toString() : "";
        return status.equalsIgnoreCase("RED");
    }
}

