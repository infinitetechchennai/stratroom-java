/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.scorecard.dto.KPIEntrysDTO
 *  com.estrat.scorecard.dto.PerformanceContractDTO
 *  com.estrat.scorecard.dto.SubKPIEntrysDTO
 */
package com.estrat.scorecard.dto;

import com.estrat.scorecard.dto.KPIEntrysDTO;
import com.estrat.scorecard.dto.SubKPIEntrysDTO;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

public class PerformanceContractDTO {
    private long id;
    private long scorecardId;
    private long deptId;
    private long createdBy;
    private long updatedBy;
    private long owner;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;
    private List<SubKPIEntrysDTO> subKPIEntrysList;
    private Map<String, Object> performanceValue;
    private List<KPIEntrysDTO> kpiEntrysList;

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getScorecardId() {
        return this.scorecardId;
    }

    public void setScorecardId(long scorecardId) {
        this.scorecardId = scorecardId;
    }

    public long getDeptId() {
        return this.deptId;
    }

    public void setDeptId(long deptId) {
        this.deptId = deptId;
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

    public List<SubKPIEntrysDTO> getSubKPIEntrysList() {
        return this.subKPIEntrysList;
    }

    public void setSubKPIEntrysList(List<SubKPIEntrysDTO> subKPIEntrysList) {
        this.subKPIEntrysList = subKPIEntrysList;
    }

    public Map<String, Object> getPerformanceValue() {
        return this.performanceValue;
    }

    public void setPerformanceValue(Map<String, Object> performanceValue) {
        this.performanceValue = performanceValue;
    }

    public List<KPIEntrysDTO> getKpiEntrysList() {
        return this.kpiEntrysList;
    }

    public void setKpiEntrysList(List<KPIEntrysDTO> kpiEntrysList) {
        this.kpiEntrysList = kpiEntrysList;
    }
}

