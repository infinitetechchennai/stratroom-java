/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.DashBoardPreferences
 *  com.estrat.backend.db.bean.po.PagesDetails
 *  com.estrat.backend.db.bean.po.PreferenceSubDetail
 *  com.estrat.backend.db.dto.DashBoardPreferencesDTO
 *  com.fasterxml.jackson.databind.ObjectMapper
 *  javax.persistence.CascadeType
 *  javax.persistence.Column
 *  javax.persistence.Entity
 *  javax.persistence.FetchType
 *  javax.persistence.GeneratedValue
 *  javax.persistence.GenerationType
 *  javax.persistence.Id
 *  javax.persistence.JoinColumn
 *  javax.persistence.ManyToOne
 *  javax.persistence.OneToMany
 *  javax.persistence.Table
 *  org.hibernate.annotations.GenericGenerator
 */
package com.estrat.backend.db.bean.po;

import com.estrat.backend.db.bean.po.PagesDetails;
import com.estrat.backend.db.bean.po.PreferenceSubDetail;
import com.estrat.backend.db.dto.DashBoardPreferencesDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import java.util.List;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="dashboard_preferences", schema="orgstructure")
public class DashBoardPreferences {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="id")
    private long id;
    @Column(name="active")
    private int active = 0;
    @Column(name="owner")
    private long owner;
    @Column(name="dashboard_preferences_value")
    private String dashBoardPreferencesValue;
    @Column(name="created_by", updatable=false)
    private Long createdBy;
    @Column(name="updated_by")
    private Long updatedBy;
    @Column(name="created_time", updatable=false)
    private LocalDateTime createdTime;
    @Column(name="updated_time")
    private LocalDateTime updatedTime;
    @OneToMany(mappedBy="daskboardId", fetch=FetchType.LAZY, cascade={CascadeType.ALL})
    private List<PreferenceSubDetail> preferenceDetailList;
    @ManyToOne
    @JoinColumn(name="page_id", nullable=true)
    private PagesDetails pageId;

    public DashBoardPreferences() {
    }

    public DashBoardPreferences(DashBoardPreferencesDTO dashBoardPreferences) {
        this.id = dashBoardPreferences.getId();
        this.active = dashBoardPreferences.getActive();
        this.owner = dashBoardPreferences.getOwner();
        this.createdBy = dashBoardPreferences.getCreatedBy();
        this.updatedBy = dashBoardPreferences.getUpdatedBy();
        this.createdTime = dashBoardPreferences.getCreatedTime();
        this.updatedTime = dashBoardPreferences.getUpdatedTime();
        Long pageId = dashBoardPreferences.getPageId();
        if (pageId != null && pageId != 0L) {
            PagesDetails pagesDetails = new PagesDetails();
            pagesDetails.setId(dashBoardPreferences.getPageId());
            this.pageId = pagesDetails;
        }
        ObjectMapper mapper = new ObjectMapper();
        try {
            this.dashBoardPreferencesValue = mapper.writeValueAsString((Object)dashBoardPreferences.getDashBoardPreferencesValue());
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

    public String getDashBoardPreferencesValue() {
        return this.dashBoardPreferencesValue;
    }

    public void setDashBoardPreferencesValue(String dashBoardPreferencesValue) {
        this.dashBoardPreferencesValue = dashBoardPreferencesValue;
    }

    public Long getCreatedBy() {
        return this.createdBy;
    }

    public void setCreatedBy(Long createdBy) {
        this.createdBy = createdBy;
    }

    public Long getUpdatedBy() {
        return this.updatedBy;
    }

    public void setUpdatedBy(Long updatedBy) {
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

    public PagesDetails getPageId() {
        return this.pageId;
    }

    public void setPageId(PagesDetails pageId) {
        this.pageId = pageId;
    }

    public List<PreferenceSubDetail> getPreferenceDetailList() {
        return this.preferenceDetailList;
    }

    public void setPreferenceDetailList(List<PreferenceSubDetail> preferenceDetailList) {
        this.preferenceDetailList = preferenceDetailList;
    }
}

