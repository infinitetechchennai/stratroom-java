/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.ChartDetails
 *  com.estrat.backend.db.dto.ChartDTO
 *  com.estrat.backend.db.dto.PreferenceDTO
 *  com.fasterxml.jackson.annotation.JsonInclude
 *  com.fasterxml.jackson.annotation.JsonInclude$Include
 *  com.fasterxml.jackson.databind.ObjectMapper
 */
package com.estrat.backend.db.dto;

import com.estrat.backend.db.bean.po.ChartDetails;
import com.estrat.backend.db.dto.PreferenceDTO;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@JsonInclude(value=JsonInclude.Include.NON_NULL)
public class ChartDTO {
    private long id;
    private int active = 0;
    private long owner;
    private long createdBy;
    private long updatedBy;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;
    private Map<String, Object> chartValue;
    private List<PreferenceDTO> chartPreferenceDetailList;
    private long pageId;
    private String pageName;

    public ChartDTO() {
    }

    public ChartDTO(ChartDetails chartDetails) {
        this.id = chartDetails.getId();
        this.active = chartDetails.getActive();
        this.owner = chartDetails.getOwner();
        this.createdBy = chartDetails.getCreatedBy();
        this.updatedBy = chartDetails.getUpdatedBy();
        this.createdTime = chartDetails.getCreatedTime();
        this.updatedTime = chartDetails.getUpdatedTime();
        if (chartDetails.getPageId() != null) {
            this.pageId = chartDetails.getPageId().getId();
            this.pageName = chartDetails.getPageId().getPageName();
        }
        ObjectMapper mapper = new ObjectMapper();
        try {
            this.chartValue = (Map)mapper.readValue(chartDetails.getChartValue(), HashMap.class);
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

    public Map<String, Object> getChartValue() {
        return this.chartValue;
    }

    public void setChartValue(Map<String, Object> chartValue) {
        this.chartValue = chartValue;
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

    public List<PreferenceDTO> getChartPreferenceDetailList() {
        return this.chartPreferenceDetailList;
    }

    public void setChartPreferenceDetailList(List<PreferenceDTO> chartPreferenceDetailList) {
        this.chartPreferenceDetailList = chartPreferenceDetailList;
    }

    public String toString() {
        return "ChartDTO [id=" + this.id + ", active=" + this.active + ", owner=" + this.owner + ", createdBy=" + this.createdBy + ", updatedBy=" + this.updatedBy + ", createdTime=" + this.createdTime + ", updatedTime=" + this.updatedTime + ", chartValue=" + this.chartValue + ", pageId=" + this.pageId + ", pageName=" + this.pageName + "]";
    }
}

