/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.KPIEntrys
 *  com.estrat.backend.db.bean.po.PerformanceContract
 *  com.estrat.backend.db.bean.po.SubKPIEntrys
 *  com.estrat.backend.db.dto.PerformanceContractDTO
 *  com.fasterxml.jackson.core.JsonProcessingException
 *  com.fasterxml.jackson.databind.ObjectMapper
 *  javax.persistence.CascadeType
 *  javax.persistence.Column
 *  javax.persistence.Entity
 *  javax.persistence.FetchType
 *  javax.persistence.GeneratedValue
 *  javax.persistence.GenerationType
 *  javax.persistence.Id
 *  javax.persistence.OneToMany
 *  javax.persistence.Table
 */
package com.estrat.backend.db.bean.po;

import com.estrat.backend.db.bean.po.KPIEntrys;
import com.estrat.backend.db.bean.po.SubKPIEntrys;
import com.estrat.backend.db.dto.PerformanceContractDTO;
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
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="performance_contract", schema="orgstructure")
public class PerformanceContract {
    @Id
    @Column(name="id")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private long id;
    @Column(name="scorecard_id")
    private long scorecardId;
    @Column(name="deptid")
    private long deptId;
    @Column(name="created_by", updatable=false)
    private long createdBy;
    @Column(name="updated_by")
    private long updatedBy;
    @Column(name="owner")
    private long owner;
    @Column(name="created_time", updatable=false)
    private LocalDateTime createdTime;
    @Column(name="updated_time")
    private LocalDateTime updatedTime;
    @Column(name="performance_value")
    private String performanceValue;
    @OneToMany(mappedBy="preferenceId", fetch=FetchType.LAZY, cascade={CascadeType.ALL})
    private List<SubKPIEntrys> subKPIEntrysList;
    @OneToMany(mappedBy="preferenceId", fetch=FetchType.LAZY, cascade={CascadeType.ALL})
    private List<KPIEntrys> kpiEntrysList;

    public PerformanceContract() {
    }

    public PerformanceContract(PerformanceContractDTO performanceContractDTO) {
        this.id = performanceContractDTO.getId();
        this.createdBy = performanceContractDTO.getCreatedBy();
        this.updatedBy = performanceContractDTO.getUpdatedBy();
        this.owner = performanceContractDTO.getOwner();
        this.createdTime = performanceContractDTO.getCreatedTime();
        this.updatedTime = performanceContractDTO.getUpdatedTime();
        this.scorecardId = performanceContractDTO.getScorecardId();
        this.deptId = performanceContractDTO.getDeptId();
        ObjectMapper mapper = new ObjectMapper();
        try {
            this.performanceValue = mapper.writeValueAsString((Object)performanceContractDTO.getPerformanceValue());
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

    public List<SubKPIEntrys> getSubKPIEntrysList() {
        return this.subKPIEntrysList;
    }

    public void setSubKPIEntrysList(List<SubKPIEntrys> subKPIEntrysList) {
        this.subKPIEntrysList = subKPIEntrysList;
    }

    public String getPerformanceValue() {
        return this.performanceValue;
    }

    public void setPerformanceValue(String performanceValue) {
        this.performanceValue = performanceValue;
    }

    public List<KPIEntrys> getKpiEntrysList() {
        return this.kpiEntrysList;
    }

    public void setKpiEntrysList(List<KPIEntrys> kpiEntrysList) {
        this.kpiEntrysList = kpiEntrysList;
    }
}

