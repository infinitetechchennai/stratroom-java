/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.scorecard.dto.ActivitiesDTO
 *  com.estrat.scorecard.dto.SubInitiativesDTO
 *  com.estrat.scorecard.dto.SubInitiativesMapDTO
 *  com.fasterxml.jackson.annotation.JsonInclude
 *  com.fasterxml.jackson.annotation.JsonInclude$Include
 */
package com.estrat.scorecard.dto;

import com.estrat.scorecard.dto.ActivitiesDTO;
import com.estrat.scorecard.dto.SubInitiativesMapDTO;
import com.fasterxml.jackson.annotation.JsonInclude;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@JsonInclude(value=JsonInclude.Include.NON_NULL)
public class SubInitiativesDTO {
    private long id;
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
    private boolean userMapApprove;

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

    public boolean isUserMapApprove() {
        return this.userMapApprove;
    }

    public void setUserMapApprove(boolean userMapApprove) {
        this.userMapApprove = userMapApprove;
    }
}

