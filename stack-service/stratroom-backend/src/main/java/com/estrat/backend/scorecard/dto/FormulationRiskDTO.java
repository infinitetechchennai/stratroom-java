/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.scorecard.dto.FormulationRiskDTO
 *  com.estrat.backend.scorecard.dto.FormulationSubRiskDTO
 */
package com.estrat.backend.scorecard.dto;

import com.estrat.backend.scorecard.dto.FormulationSubRiskDTO;
import java.time.LocalDateTime;
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
    private Long departmentId;

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

