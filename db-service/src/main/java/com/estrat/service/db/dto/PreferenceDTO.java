/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.PreferenceSubDetail
 *  com.estrat.service.db.dto.PreferenceDTO
 *  com.fasterxml.jackson.databind.ObjectMapper
 */
package com.estrat.service.db.dto;

import com.estrat.service.db.bean.po.PreferenceSubDetail;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.HashMap;
import java.util.Map;

public class PreferenceDTO {
    private long id;
    private long daskboardId;
    private long chartId;
    private long recordId;
    private String recordType;
    private Map<String, Object> preferenceValue;

    public PreferenceDTO() {
    }

    public PreferenceDTO(PreferenceSubDetail preferenceDetail) {
        this.id = preferenceDetail.getId();
        if (preferenceDetail.getDaskboardId() != null) {
            this.daskboardId = preferenceDetail.getDaskboardId().getId();
        }
        if (preferenceDetail.getChartId() != null) {
            this.chartId = preferenceDetail.getChartId().getId();
        }
        this.recordId = preferenceDetail.getRecordId();
        this.recordType = preferenceDetail.getRecordType();
        ObjectMapper mapper = new ObjectMapper();
        if (preferenceDetail.getPreferenceValue() != null) {
            try {
                this.preferenceValue = (Map)mapper.readValue(preferenceDetail.getPreferenceValue(), HashMap.class);
            }
            catch (Exception e) {
                throw new RuntimeException(e);
            }
        }
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getDaskboardId() {
        return this.daskboardId;
    }

    public void setDaskboardId(long daskboardId) {
        this.daskboardId = daskboardId;
    }

    public long getRecordId() {
        return this.recordId;
    }

    public void setRecordId(long recordId) {
        this.recordId = recordId;
    }

    public String getRecordType() {
        return this.recordType;
    }

    public void setRecordType(String recordType) {
        this.recordType = recordType;
    }

    public Map<String, Object> getPreferenceValue() {
        return this.preferenceValue;
    }

    public void setPreferenceValue(Map<String, Object> preferenceValue) {
        this.preferenceValue = preferenceValue;
    }

    public long getChartId() {
        return this.chartId;
    }

    public void setChartId(long chartId) {
        this.chartId = chartId;
    }
}

