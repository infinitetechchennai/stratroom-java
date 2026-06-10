/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.ActivitiesDetails
 *  com.estrat.backend.db.dto.ActivitiesDTO
 *  com.estrat.backend.db.dto.ActivitiesMapDTO
 *  com.estrat.backend.db.dto.SubActivitiesDTO
 *  com.fasterxml.jackson.annotation.JsonInclude
 *  com.fasterxml.jackson.annotation.JsonInclude$Include
 *  com.fasterxml.jackson.databind.ObjectMapper
 */
package com.estrat.backend.db.dto;

import com.estrat.backend.db.bean.po.ActivitiesDetails;
import com.estrat.backend.db.dto.ActivitiesMapDTO;
import com.estrat.backend.db.dto.SubActivitiesDTO;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

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
    private long subInitiativeId;
    private boolean userMapApprove = false;
    private List<ActivitiesMapDTO> activitiesMapDTOList;
    private List<SubActivitiesDTO> subActivityList;

    public ActivitiesDTO() {
    }

    public ActivitiesDTO(ActivitiesDetails activitiesDetails) {
        this.id = activitiesDetails.getId();
        this.initiativeId = activitiesDetails.getActivitiesInitiativeId();
        this.active = activitiesDetails.getActive();
        this.createdTime = activitiesDetails.getCreatedTime();
        this.createdBy = activitiesDetails.getCreatedBy();
        this.updatedBy = activitiesDetails.getUpdatedBy();
        this.owner = activitiesDetails.getOwner();
        this.updatedTime = activitiesDetails.getUpdatedTime();
        this.subInitiativeId = activitiesDetails.getSubInitiativeId();
        this.activitiesMapDTOList = activitiesDetails.getActivitiesMaps() != null ? activitiesDetails.getActivitiesMaps().stream().map(obj -> new ActivitiesMapDTO(obj)).collect(Collectors.toList()) : null;
        this.subActivityList = activitiesDetails.getSubActivityList() != null ? activitiesDetails.getSubActivityList().stream().map(kpi -> new SubActivitiesDTO(kpi)).collect(Collectors.toList()) : null;
        ObjectMapper mapper = new ObjectMapper();
        try {
            this.activitiesValue = (Map)mapper.readValue(activitiesDetails.getActivitiesValue(), HashMap.class);
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

    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ActivitiesDTO)) {
            return false;
        }
        ActivitiesDTO that = (ActivitiesDTO)o;
        return Objects.equals(this.getId(), that.getId());
    }

    public int hashCode() {
        return Objects.hash(this.getId());
    }

    public long getSubInitiativeId() {
        return this.subInitiativeId;
    }

    public void setSubInitiativeId(long subInitiativeId) {
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

