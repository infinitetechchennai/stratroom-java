/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.DashBoardPreferences
 *  com.estrat.backend.db.dto.DashBoardPreferencesDTO
 *  com.estrat.backend.db.dto.PreferenceDTO
 *  com.fasterxml.jackson.databind.ObjectMapper
 */
package com.estrat.backend.db.dto;

import com.estrat.backend.db.bean.po.DashBoardPreferences;
import com.estrat.backend.db.dto.PreferenceDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class DashBoardPreferencesDTO {
    private long id;
    private Map<String, Object> dashBoardPreferencesValue;
    private int active = 0;
    private long owner;
    private long createdBy;
    private long updatedBy;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;
    private List<PreferenceDTO> preferenceDetailList;
    private long pageId;
    private String pageName;

    public DashBoardPreferencesDTO() {
    }

    public DashBoardPreferencesDTO(DashBoardPreferences dashBoardPreferences) {
        this.id = dashBoardPreferences.getId();
        this.active = dashBoardPreferences.getActive();
        this.owner = dashBoardPreferences.getOwner();
        this.createdBy = dashBoardPreferences.getCreatedBy();
        this.updatedBy = dashBoardPreferences.getUpdatedBy();
        this.createdTime = dashBoardPreferences.getCreatedTime();
        this.updatedTime = dashBoardPreferences.getUpdatedTime();
        if (dashBoardPreferences.getPageId() != null) {
            this.pageId = dashBoardPreferences.getPageId().getId();
            this.pageName = dashBoardPreferences.getPageId().getPageName();
        }
        this.preferenceDetailList = dashBoardPreferences.getPreferenceDetailList() != null ? dashBoardPreferences.getPreferenceDetailList().stream().map(obj -> new PreferenceDTO(obj)).collect(Collectors.toList()) : null;
        ObjectMapper mapper = new ObjectMapper();
        try {
            this.dashBoardPreferencesValue = (Map)mapper.readValue(dashBoardPreferences.getDashBoardPreferencesValue(), HashMap.class);
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

    public Map<String, Object> getDashBoardPreferencesValue() {
        return this.dashBoardPreferencesValue;
    }

    public void setDashBoardPreferencesValue(Map<String, Object> dashBoardPreferencesValue) {
        this.dashBoardPreferencesValue = dashBoardPreferencesValue;
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

    public String getPageName() {
        return this.pageName;
    }

    public void setPageName(String pageName) {
        this.pageName = pageName;
    }

    public long getPageId() {
        return this.pageId;
    }

    public void setPageId(long pageId) {
        this.pageId = pageId;
    }

    public List<PreferenceDTO> getPreferenceDetailList() {
        return this.preferenceDetailList;
    }

    public void setPreferenceDetailList(List<PreferenceDTO> preferenceDetailList) {
        this.preferenceDetailList = preferenceDetailList;
    }
}

