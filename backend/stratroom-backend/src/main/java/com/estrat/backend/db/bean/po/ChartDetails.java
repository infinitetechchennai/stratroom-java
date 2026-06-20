/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.ChartDetails
 *  com.estrat.backend.db.bean.po.PagesDetails
 *  com.estrat.backend.db.bean.po.PreferenceSubDetail
 *  com.estrat.backend.db.dto.ChartDTO
 *  com.fasterxml.jackson.core.JsonProcessingException
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
import com.estrat.backend.db.dto.ChartDTO;
import com.fasterxml.jackson.core.JsonProcessingException;
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
@Table(name="chart_details", schema="orgstructure")
public class ChartDetails {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="ID")
    private long id;
    @Column(name="active")
    private int active = 0;
    @Column(name="owner")
    private long owner;
    @Column(name="created_by", updatable=false)
    private Long createdBy;
    @Column(name="updated_by")
    private Long updatedBy;
    @Column(name="created_time", updatable=false)
    private LocalDateTime createdTime;
    @Column(name="updated_time")
    private LocalDateTime updatedTime;
    @Column(name="chart_value")
    private String chartValue;
    @OneToMany(mappedBy="chartId", fetch=FetchType.LAZY, cascade={CascadeType.ALL})
    private List<PreferenceSubDetail> chartPreferenceDetailList;
    @ManyToOne
    @JoinColumn(name="page_id", nullable=true)
    private PagesDetails pageId;

    public ChartDetails() {
    }

    public ChartDetails(ChartDTO chartDTO) {
        this.id = chartDTO.getId();
        this.active = chartDTO.getActive();
        this.owner = chartDTO.getOwner();
        this.createdBy = chartDTO.getCreatedBy();
        this.updatedBy = chartDTO.getUpdatedBy();
        this.createdTime = chartDTO.getCreatedTime();
        this.updatedTime = chartDTO.getUpdatedTime();
        Long pageId = chartDTO.getPageId();
        if (pageId != null && pageId != 0L) {
            PagesDetails pagesDetails = new PagesDetails();
            pagesDetails.setId(chartDTO.getPageId());
            this.pageId = pagesDetails;
        }
        ObjectMapper mapper = new ObjectMapper();
        try {
            this.chartValue = mapper.writeValueAsString((Object)chartDTO.getChartValue());
        }
        catch (JsonProcessingException e) {
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

    public String getChartValue() {
        return this.chartValue;
    }

    public void setChartValue(String chartValue) {
        this.chartValue = chartValue;
    }

    public PagesDetails getPageId() {
        return this.pageId;
    }

    public void setPageId(PagesDetails pageId) {
        this.pageId = pageId;
    }

    public List<PreferenceSubDetail> getChartPreferenceDetailList() {
        return this.chartPreferenceDetailList;
    }

    public void setChartPreferenceDetailList(List<PreferenceSubDetail> chartPreferenceDetailList) {
        this.chartPreferenceDetailList = chartPreferenceDetailList;
    }
}

