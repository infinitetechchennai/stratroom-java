/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.SubInitiatives
 *  com.estrat.backend.db.dto.ActivitiesDTO
 *  com.estrat.backend.db.dto.SubInitiativesDTO
 *  com.estrat.backend.db.dto.SubInitiativesMapDTO
 *  com.fasterxml.jackson.annotation.JsonInclude
 *  com.fasterxml.jackson.annotation.JsonInclude$Include
 *  com.fasterxml.jackson.databind.ObjectMapper
 */
package com.estrat.backend.db.dto;

import com.estrat.backend.db.bean.po.SubInitiatives;
import com.estrat.backend.db.dto.ActivitiesDTO;
import com.estrat.backend.db.dto.SubInitiativesMapDTO;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

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
    private boolean userMapApprove = false;

    public SubInitiativesDTO() {
    }

    public SubInitiativesDTO(SubInitiatives subInitiatives) {
        this.id = subInitiatives.getId();
        this.initiativeId = subInitiatives.getInitiativeId();
        this.active = subInitiatives.getActive();
        this.createdTime = subInitiatives.getCreatedTime();
        this.createdBy = subInitiatives.getCreatedBy();
        this.updatedBy = subInitiatives.getUpdatedBy();
        this.owner = subInitiatives.getOwner();
        this.updatedTime = subInitiatives.getUpdatedTime();
        this.activitiesList = subInitiatives.getActivitiesList() != null ? subInitiatives.getActivitiesList().stream().map(obj -> new ActivitiesDTO(obj)).collect(Collectors.toList()) : null;
        this.subInitiativesMapDTOList = subInitiatives.getSubInitiativesMaps() != null ? subInitiatives.getSubInitiativesMaps().stream().map(obj -> new SubInitiativesMapDTO(obj)).collect(Collectors.toList()) : null;
        ObjectMapper mapper = new ObjectMapper();
        try {
            this.subInitiativeValue = (Map)mapper.readValue(subInitiatives.getSubInitiativeValue(), HashMap.class);
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

    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SubInitiativesDTO)) {
            return false;
        }
        SubInitiativesDTO that = (SubInitiativesDTO)o;
        return Objects.equals(this.getId(), that.getId());
    }

    public int hashCode() {
        return Objects.hash(this.getId());
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

