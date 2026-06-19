/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.Employee
 *  com.estrat.backend.db.bean.po.RiskActivities
 *  com.estrat.backend.db.bean.po.RiskActivitiesHistory
 *  com.estrat.backend.db.dto.RiskActivitiesDTO
 *  com.fasterxml.jackson.annotation.JsonInclude
 *  com.fasterxml.jackson.annotation.JsonInclude$Include
 *  com.fasterxml.jackson.databind.ObjectMapper
 */
package com.estrat.backend.db.dto;

import com.estrat.backend.db.bean.Employee;
import com.estrat.backend.db.bean.po.RiskActivities;
import com.estrat.backend.db.bean.po.RiskActivitiesHistory;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import com.estrat.backend.db.util.JsonUtil;

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
    private String multipleOwners;
    private List<Employee> ownerList;
    private long changeId;
    private String status;
    private Long version;
    private long parentchangeId;

    public RiskActivitiesDTO() {
    }

    public RiskActivitiesDTO(RiskActivities riskActivities, boolean loadFlag) {
        this.id = riskActivities.getId();
        this.riskPlanId = riskActivities.getRiskPlanId().getId();
        this.owner = riskActivities.getOwner();
        this.createdBy = riskActivities.getCreatedBy();
        this.updatedBy = riskActivities.getUpdatedBy();
        this.createdTime = riskActivities.getCreatedTime();
        this.updatedTime = riskActivities.getUpdatedTime();
        this.active = riskActivities.getActive();
        this.version = riskActivities.getVersion();
        this.status = riskActivities.getStatus();
        this.changeId = riskActivities.getChangeId();
        this.riskActivitiesValue = JsonUtil.parseMap(riskActivities.getRiskActivitiesValue());
    }

    public RiskActivitiesDTO(RiskActivitiesHistory riskActivitiesHistory) {
        this.id = riskActivitiesHistory.getId();
        this.riskPlanId = riskActivitiesHistory.getRiskPlanId();
        this.createdTime = riskActivitiesHistory.getCreatedTime();
        this.version = riskActivitiesHistory.getVersion();
        this.status = riskActivitiesHistory.getStatus();
        this.changeId = riskActivitiesHistory.getChangeId();
        this.riskActivitiesValue = JsonUtil.parseMap(riskActivitiesHistory.getRiskActivitiesValue());
    }

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

    public String getStatus() {
        return this.status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Long getVersion() {
        return this.version;
    }

    public void setVersion(Long version) {
        this.version = version;
    }
}

