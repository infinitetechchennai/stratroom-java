/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.dto.Employee
 *  com.estrat.web.dto.RiskActivitiesDTO
 *  com.estrat.web.dto.RiskPlanDTO
 *  com.fasterxml.jackson.annotation.JsonInclude
 *  com.fasterxml.jackson.annotation.JsonInclude$Include
 */
package com.estrat.web.dto;

import com.estrat.web.dto.Employee;
import com.estrat.web.dto.RiskActivitiesDTO;
import com.fasterxml.jackson.annotation.JsonInclude;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@JsonInclude(value=JsonInclude.Include.NON_NULL)
public class RiskPlanDTO {
    private long id;
    private long riskId;
    private Map<String, Object> riskPlanValue;
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
    private String typeFlag;
    private List<RiskActivitiesDTO> riskActivitiesDTOList;
    private Map<String, RiskActivitiesDTO> riskActivitiesMap;
    private long changeId;
    private long parentchangeId;

    public Map<String, RiskActivitiesDTO> getRiskActivitiesMap() {
        if (this.riskActivitiesMap == null) {
            this.riskActivitiesMap = new HashMap();
        }
        return this.riskActivitiesMap;
    }

    public void setRiskActivitiesMap(Map<String, RiskActivitiesDTO> riskActivitiesMap) {
        this.riskActivitiesMap = riskActivitiesMap;
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

    public long getRiskId() {
        return this.riskId;
    }

    public void setRiskId(long riskId) {
        this.riskId = riskId;
    }

    public Map<String, Object> getRiskPlanValue() {
        if (this.riskPlanValue == null) {
            this.riskPlanValue = new HashMap();
        }
        return this.riskPlanValue;
    }

    public void setRiskPlanValue(Map<String, Object> riskPlanValue) {
        this.riskPlanValue = riskPlanValue;
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

    public String getTypeFlag() {
        return this.typeFlag;
    }

    public void setTypeFlag(String typeFlag) {
        this.typeFlag = typeFlag;
    }

    public List<RiskActivitiesDTO> getRiskActivitiesDTOList() {
        return this.riskActivitiesDTOList;
    }

    public void setRiskActivitiesDTOList(List<RiskActivitiesDTO> riskActivitiesDTOList) {
        this.riskActivitiesDTOList = riskActivitiesDTOList;
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

