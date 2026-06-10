/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.dto.FormulationRiskDTO
 *  com.estrat.web.dto.FormulationSubRiskDTO
 *  com.fasterxml.jackson.annotation.JsonIgnore
 */
package com.estrat.web.dto;

import com.estrat.web.dto.FormulationSubRiskDTO;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class FormulationRiskDTO {
    private long id;
    private Map<String, Object> riskValue;
    private long owner;
    private long createdBy;
    private long updatedBy;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;
    private Long impactId;
    private long formulationId;
    private List<FormulationSubRiskDTO> subRiskList;
    private String department;
    private int active;
    @JsonIgnore
    private Map<String, FormulationSubRiskDTO> planMap;
    @JsonIgnore
    private Map<String, FormulationSubRiskDTO> causeConqMap;
    private Long departmentId;

    public int getActive() {
        return this.active;
    }

    public void setActive(int active) {
        this.active = active;
    }

    public Map<String, FormulationSubRiskDTO> getPlanMap() {
        if (this.planMap == null) {
            this.planMap = new HashMap();
        }
        return this.planMap;
    }

    public void setPlanMap(Map<String, FormulationSubRiskDTO> planMap) {
        this.planMap = planMap;
    }

    public Map<String, FormulationSubRiskDTO> getCauseConqMap() {
        if (this.causeConqMap == null) {
            this.causeConqMap = new HashMap();
        }
        return this.causeConqMap;
    }

    public void setCauseConqMap(Map<String, FormulationSubRiskDTO> causeConqMap) {
        this.causeConqMap = causeConqMap;
    }

    public String getDepartment() {
        return this.department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public List<FormulationSubRiskDTO> getSubRiskList() {
        return this.subRiskList;
    }

    public void setSubRiskList(List<FormulationSubRiskDTO> subRiskList) {
        this.subRiskList = subRiskList;
    }

    public long getFormulationId() {
        return this.formulationId;
    }

    public void setFormulationId(long formulationId) {
        this.formulationId = formulationId;
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Map<String, Object> getRiskValue() {
        if (this.riskValue == null) {
            this.riskValue = new HashMap();
        }
        return this.riskValue;
    }

    public void setRiskValue(Map<String, Object> riskValue) {
        this.riskValue = riskValue;
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

    public Long getImpactId() {
        return this.impactId;
    }

    public void setImpactId(Long impactId) {
        this.impactId = impactId;
    }

    public Long getDepartmentId() {
        return this.departmentId;
    }

    public void setDepartmentId(Long departmentId) {
        this.departmentId = departmentId;
    }
}

