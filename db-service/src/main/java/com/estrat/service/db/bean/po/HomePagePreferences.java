/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.HomePagePreferences
 *  com.estrat.service.db.dto.HomePreferencesDTO
 *  javax.persistence.Column
 *  javax.persistence.Entity
 *  javax.persistence.Id
 *  javax.persistence.Table
 */
package com.estrat.service.db.bean.po;

import com.estrat.service.db.dto.HomePreferencesDTO;
import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="home_page_pref", schema="orgstructure")
public class HomePagePreferences {
    @Id
    @Column(name="id")
    private long id;
    @Column(name="page_name")
    private String pageName;
    @Column(name="page_id")
    private long pageId;
    @Column(name="created_dt", updatable=false)
    private LocalDateTime createdDt;
    @Column(name="updated_dt")
    private LocalDateTime updatedDt;

    public HomePagePreferences() {
    }

    public HomePagePreferences(HomePreferencesDTO homePreferencesDTO) {
        this.id = homePreferencesDTO.getId();
        this.pageId = homePreferencesDTO.getPageId();
        this.pageName = homePreferencesDTO.getPageName();
        this.createdDt = homePreferencesDTO.getCreatedDt();
        this.updatedDt = homePreferencesDTO.getUpdatedDt();
    }

    public long getId() {
        return this.id;
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

    public void setId(long id) {
        this.id = id;
    }

    public String getPageName() {
        return this.pageName;
    }

    public void setPageName(String pageName) {
        this.pageName = pageName;
    }
}

