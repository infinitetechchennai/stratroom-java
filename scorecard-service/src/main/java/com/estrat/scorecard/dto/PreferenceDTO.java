/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.scorecard.dto.PreferenceDTO
 */
package com.estrat.scorecard.dto;

import java.util.Map;

public class PreferenceDTO {
    private long id;
    private long daskboardId;
    private long chartId;
    private long recordId;
    private String recordType;
    private Map<String, Object> preferenceValue;

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

