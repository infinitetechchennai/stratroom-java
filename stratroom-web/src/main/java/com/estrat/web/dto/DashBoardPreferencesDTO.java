/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.dto.DashBoardPreferencesDTO
 *  com.estrat.web.dto.PreferenceDTO
 */
package com.estrat.web.dto;

import com.estrat.web.dto.PreferenceDTO;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

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

