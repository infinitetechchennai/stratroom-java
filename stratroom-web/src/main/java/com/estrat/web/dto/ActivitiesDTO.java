/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.dto.ActivitiesDTO
 *  com.estrat.web.dto.ActivitiesMapDTO
 *  com.estrat.web.dto.SubActivitiesDTO
 *  com.fasterxml.jackson.annotation.JsonIgnore
 *  com.fasterxml.jackson.annotation.JsonInclude
 *  com.fasterxml.jackson.annotation.JsonInclude$Include
 */
package com.estrat.web.dto;

import com.estrat.web.dto.ActivitiesMapDTO;
import com.estrat.web.dto.SubActivitiesDTO;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@JsonInclude(value=JsonInclude.Include.NON_NULL)
public class ActivitiesDTO {
    private long id;
    private String createDateString;
    private String updatedDateString;
    private int active = 0;
    private Map<String, Object> activitiesValue;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;
    private long owner;
    private long initiativeId;
    private long createdBy;
    private long updatedBy;
    private String subInitiativeId;
    private boolean userMapApprove;
    private List<ActivitiesMapDTO> activitiesMapDTOList;
    private List<SubActivitiesDTO> subActivityList;
    @JsonIgnore
    private Map<String, SubActivitiesDTO> subActivitiesMap;

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

    public Map<String, Object> getActivitiesValue() {
        if (this.activitiesValue == null) {
            this.activitiesValue = new HashMap();
        }
        return this.activitiesValue;
    }

    public void setActivitiesValue(Map<String, Object> activitiesValue) {
        this.activitiesValue = activitiesValue;
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

    public List<ActivitiesMapDTO> getActivitiesMapDTOList() {
        return this.activitiesMapDTOList;
    }

    public void setActivitiesMapDTOList(List<ActivitiesMapDTO> activitiesMapDTOList) {
        this.activitiesMapDTOList = activitiesMapDTOList;
    }

    public String getSubInitiativeId() {
        return this.subInitiativeId;
    }

    public void setSubInitiativeId(String subInitiativeId) {
        this.subInitiativeId = subInitiativeId;
    }

    public List<SubActivitiesDTO> getSubActivityList() {
        return this.subActivityList;
    }

    public void setSubActivityList(List<SubActivitiesDTO> subActivityList) {
        this.subActivityList = subActivityList;
    }

    public Map<String, SubActivitiesDTO> getSubActivitiesMap() {
        if (this.subActivitiesMap == null) {
            this.subActivitiesMap = new HashMap();
        }
        return this.subActivitiesMap;
    }

    public void setSubActivitiesMap(Map<String, SubActivitiesDTO> subActivitiesMap) {
        this.subActivitiesMap = subActivitiesMap;
    }

    public boolean isUserMapApprove() {
        return this.userMapApprove;
    }

    public void setUserMapApprove(boolean userMapApprove) {
        this.userMapApprove = userMapApprove;
    }

    public String toString() {
        return "ActivitiesDTO [id=" + this.id + ", createDateString=" + this.createDateString + ", updatedDateString=" + this.updatedDateString + ", active=" + this.active + ", activitiesValue=" + this.activitiesValue + ", createdTime=" + this.createdTime + ", updatedTime=" + this.updatedTime + ", owner=" + this.owner + ", initiativeId=" + this.initiativeId + ", createdBy=" + this.createdBy + ", updatedBy=" + this.updatedBy + ", subInitiativeId=" + this.subInitiativeId + ", activitiesMapDTOList=" + this.activitiesMapDTOList + ", subActivityList=" + this.subActivityList + ", subActivitiesMap=" + this.subActivitiesMap + "]";
    }
}

