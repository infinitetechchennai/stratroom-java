/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.HomePagePreferences
 *  com.estrat.backend.db.dto.HomePreferencesDTO
 */
package com.estrat.backend.db.dto;

import com.estrat.backend.db.bean.po.HomePagePreferences;
import java.time.LocalDateTime;

public class HomePreferencesDTO {
    private long id;
    private String pageName;
    private long pageId;
    private LocalDateTime createdDt;
    private LocalDateTime updatedDt;

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
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

    public LocalDateTime getCreatedDt() {
        return this.createdDt;
    }

    public void setCreatedDt(LocalDateTime createdDt) {
        this.createdDt = createdDt;
    }

    public LocalDateTime getUpdatedDt() {
        return this.updatedDt;
    }

    public void setUpdatedDt(LocalDateTime updatedDt) {
        this.updatedDt = updatedDt;
    }

    public HomePreferencesDTO() {
    }

    public HomePreferencesDTO(HomePagePreferences homePagePreferences) {
        this.id = homePagePreferences.getId();
        this.pageId = homePagePreferences.getPageId();
        this.pageName = homePagePreferences.getPageName();
        this.createdDt = homePagePreferences.getCreatedDt();
        this.updatedDt = homePagePreferences.getUpdatedDt();
    }
}

