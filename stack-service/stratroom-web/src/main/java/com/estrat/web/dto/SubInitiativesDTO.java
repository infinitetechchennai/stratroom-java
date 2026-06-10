/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.dto.ActivitiesDTO
 *  com.estrat.web.dto.SubInitiativesDTO
 *  com.estrat.web.dto.SubInitiativesMapDTO
 *  com.fasterxml.jackson.annotation.JsonIgnore
 *  com.fasterxml.jackson.annotation.JsonInclude
 *  com.fasterxml.jackson.annotation.JsonInclude$Include
 */
package com.estrat.web.dto;

import com.estrat.web.dto.ActivitiesDTO;
import com.estrat.web.dto.SubInitiativesMapDTO;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@JsonInclude(value=JsonInclude.Include.NON_NULL)
public class SubInitiativesDTO {
    private long id;
    private String createDateString;
    private String updatedDateString;
    private int active = 0;
    private Map<String, Object> subInitiativeValue;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;
    private long owner;
    private long initiativeId;
    private long createdBy;
    private long updatedBy;
    private List<ActivitiesDTO> activitiesList;
    private List<SubInitiativesMapDTO> subInitiativesMapDTOList;
    @JsonIgnore
    private Map<String, ActivitiesDTO> activitiesMap;
    private boolean userMapApprove;

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

    public Map<String, Object> getSubInitiativeValue() {
        if (this.subInitiativeValue == null) {
            this.subInitiativeValue = new HashMap();
        }
        return this.subInitiativeValue;
    }

    public void setSubInitiativeValue(Map<String, Object> subInitiativeValue) {
        this.subInitiativeValue = subInitiativeValue;
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

    public List<SubInitiativesMapDTO> getSubInitiativesMapDTOList() {
        return this.subInitiativesMapDTOList;
    }

    public void setSubInitiativesMapDTOList(List<SubInitiativesMapDTO> subInitiativesMapDTOList) {
        this.subInitiativesMapDTOList = subInitiativesMapDTOList;
    }

    public List<ActivitiesDTO> getActivitiesList() {
        return this.activitiesList;
    }

    public void setActivitiesList(List<ActivitiesDTO> activitiesList) {
        this.activitiesList = activitiesList;
    }

    public Map<String, ActivitiesDTO> getActivitiesMap() {
        if (this.activitiesMap == null) {
            this.activitiesMap = new HashMap();
        }
        return this.activitiesMap;
    }

    public void setActivitiesMap(Map<String, ActivitiesDTO> activitiesMap) {
        this.activitiesMap = activitiesMap;
    }

    public boolean isUserMapApprove() {
        return this.userMapApprove;
    }

    public void setUserMapApprove(boolean userMapApprove) {
        this.userMapApprove = userMapApprove;
    }

    public String toString() {
        return "SubInitiativesDTO [id=" + this.id + ", createDateString=" + this.createDateString + ", updatedDateString=" + this.updatedDateString + ", active=" + this.active + ", subInitiativeValue=" + this.subInitiativeValue + ", createdTime=" + this.createdTime + ", updatedTime=" + this.updatedTime + ", owner=" + this.owner + ", initiativeId=" + this.initiativeId + ", createdBy=" + this.createdBy + ", updatedBy=" + this.updatedBy + ", activitiesList=" + this.activitiesList + ", subInitiativesMapDTOList=" + this.subInitiativesMapDTOList + ", activitiesMap=" + this.activitiesMap + "]";
    }
}

