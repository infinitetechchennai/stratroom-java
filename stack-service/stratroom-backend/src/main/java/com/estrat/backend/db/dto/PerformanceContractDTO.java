/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.PerformanceContract
 *  com.estrat.backend.db.dto.KPIEntrysDTO
 *  com.estrat.backend.db.dto.PerformanceContractDTO
 *  com.estrat.backend.db.dto.SubKPIEntrysDTO
 *  com.fasterxml.jackson.databind.ObjectMapper
 */
package com.estrat.backend.db.dto;

import com.estrat.backend.db.bean.po.PerformanceContract;
import com.estrat.backend.db.dto.KPIEntrysDTO;
import com.estrat.backend.db.dto.SubKPIEntrysDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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
    private List<KPIEntrysDTO> kpiEntrysList;
    private Map<String, Object> performanceValue;

    public PerformanceContractDTO() {
    }

    public PerformanceContractDTO(PerformanceContract performanceContract) {
        this.id = performanceContract.getId();
        this.createdBy = performanceContract.getCreatedBy();
        this.updatedBy = performanceContract.getUpdatedBy();
        this.owner = performanceContract.getOwner();
        this.createdTime = performanceContract.getCreatedTime();
        this.updatedTime = performanceContract.getUpdatedTime();
        this.scorecardId = performanceContract.getScorecardId();
        this.deptId = performanceContract.getDeptId();
        this.subKPIEntrysList = performanceContract.getSubKPIEntrysList() != null ? performanceContract.getSubKPIEntrysList().stream().map(kpi -> new SubKPIEntrysDTO(kpi)).collect(Collectors.toList()) : null;
        this.kpiEntrysList = performanceContract.getKpiEntrysList() != null ? performanceContract.getKpiEntrysList().stream().map(kpi -> new KPIEntrysDTO(kpi)).collect(Collectors.toList()) : null;
        ObjectMapper mapper = new ObjectMapper();
        try {
            this.performanceValue = (Map)mapper.readValue(performanceContract.getPerformanceValue(), HashMap.class);
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

