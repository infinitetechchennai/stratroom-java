/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.scorecard.dto.Employee
 *  com.estrat.scorecard.dto.OrgstructureGroupDTO
 */
package com.estrat.scorecard.dto;

import com.estrat.scorecard.dto.Employee;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

public class OrgstructureGroupDTO {
    private long id;
    private int active = 0;
    private long owner;
    private long createdBy;
    private long updatedBy;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;
    private Map<String, Object> groupValue;
    private List<Employee> multipleOwerlist;
    private List<Employee> multipleMemberlist;

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

    public Map<String, Object> getGroupValue() {
        return this.groupValue;
    }

    public void setGroupValue(Map<String, Object> groupValue) {
        this.groupValue = groupValue;
    }

    public List<Employee> getMultipleOwerlist() {
        return this.multipleOwerlist;
    }

    public void setMultipleOwerlist(List<Employee> multipleOwerlist) {
        this.multipleOwerlist = multipleOwerlist;
    }

    public List<Employee> getMultipleMemberlist() {
        return this.multipleMemberlist;
    }

    public void setMultipleMemberlist(List<Employee> multipleMemberlist) {
        this.multipleMemberlist = multipleMemberlist;
    }
}

