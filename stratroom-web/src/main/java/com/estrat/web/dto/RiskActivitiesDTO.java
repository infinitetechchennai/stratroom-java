/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.dto.Employee
 *  com.estrat.web.dto.RiskActivitiesDTO
 *  com.fasterxml.jackson.annotation.JsonInclude
 *  com.fasterxml.jackson.annotation.JsonInclude$Include
 */
package com.estrat.web.dto;

import com.estrat.web.dto.Employee;
import com.fasterxml.jackson.annotation.JsonInclude;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@JsonInclude(value=JsonInclude.Include.NON_NULL)
public class RiskActivitiesDTO {
    private long id;
    private long riskPlanId;
    private Map<String, Object> riskActivitiesValue;
    private long owner;
    private long createdBy;
    private long updatedBy;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;
    private int active = 0;
    private String createDateString;
    private String updatedDateString;
    private String multipleOwners;
    private List<Employee> ownerList;
    private long changeId;
    private long parentchangeId;

    public List<Employee> getOwnerList() {
        return this.ownerList;
    }

    public void setOwnerList(List<Employee> ownerList) {
        this.ownerList = ownerList;
    }

    public String getMultipleOwners() {
        return this.multipleOwners;
    }

    public void setMultipleOwners(String multipleOwners) {
        this.multipleOwners = multipleOwners;
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getRiskPlanId() {
        return this.riskPlanId;
    }

    public void setRiskPlanId(long riskPlanId) {
        this.riskPlanId = riskPlanId;
    }

    public Map<String, Object> getRiskActivitiesValue() {
        if (this.riskActivitiesValue == null) {
            this.riskActivitiesValue = new HashMap();
        }
        return this.riskActivitiesValue;
    }

    public void setRiskActivitiesValue(Map<String, Object> riskActivitiesValue) {
        this.riskActivitiesValue = riskActivitiesValue;
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

    public long getChangeId() {
        return this.changeId;
    }

    public void setChangeId(long changeId) {
        this.changeId = changeId;
    }

    public long getParentchangeId() {
        return this.parentchangeId;
    }

    public void setParentchangeId(long parentchangeId) {
        this.parentchangeId = parentchangeId;
    }
}

