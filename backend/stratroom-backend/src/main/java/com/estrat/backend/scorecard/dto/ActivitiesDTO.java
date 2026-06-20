/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.scorecard.dto.ActivitiesDTO
 *  com.estrat.backend.scorecard.dto.ActivitiesMapDTO
 *  com.estrat.backend.scorecard.dto.SubActivitiesDTO
 *  com.fasterxml.jackson.annotation.JsonInclude
 *  com.fasterxml.jackson.annotation.JsonInclude$Include
 */
package com.estrat.backend.scorecard.dto;

import com.estrat.backend.scorecard.dto.ActivitiesMapDTO;
import com.estrat.backend.scorecard.dto.SubActivitiesDTO;
import com.fasterxml.jackson.annotation.JsonInclude;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@JsonInclude(value=JsonInclude.Include.NON_NULL)
public class ActivitiesDTO {
    private long id;
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

    public boolean isUserMapApprove() {
        return this.userMapApprove;
    }

    public void setUserMapApprove(boolean userMapApprove) {
        this.userMapApprove = userMapApprove;
    }
}

