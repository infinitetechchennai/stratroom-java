/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.dto.Employee
 *  com.estrat.web.dto.FormulationRiskActivitiesDTO
 *  com.estrat.web.dto.FormulationRiskDTO
 *  com.estrat.web.dto.FormulationSubRiskDTO
 *  com.fasterxml.jackson.annotation.JsonIgnore
 */
package com.estrat.web.dto;

import com.estrat.web.dto.Employee;
import com.estrat.web.dto.FormulationRiskActivitiesDTO;
import com.estrat.web.dto.FormulationRiskDTO;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class FormulationSubRiskDTO {
    private long id;
    private Map<String, Object> subRiskValue;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;
    private long createdBy;
    private long updatedBy;
    private long riskId;
    private FormulationRiskDTO riskDTO;
    private List<Employee> employeeList;
    private List<FormulationRiskActivitiesDTO> activitiesList;
    @JsonIgnore
    private Map<String, FormulationRiskActivitiesDTO> planActivityMap;
    @JsonIgnore
    private Map<String, FormulationRiskActivitiesDTO> consequenceMap;
    private int active;
    private String type;

    public FormulationRiskDTO getRiskDTO() {
        return this.riskDTO;
    }

    public void setRiskDTO(FormulationRiskDTO riskDTO) {
        this.riskDTO = riskDTO;
    }

    public int getActive() {
        return this.active;
    }

    public void setActive(int active) {
        this.active = active;
    }

    public Map<String, FormulationRiskActivitiesDTO> getPlanActivityMap() {
        if (this.planActivityMap == null) {
            this.planActivityMap = new HashMap();
        }
        return this.planActivityMap;
    }

    public void setPlanActivityMap(Map<String, FormulationRiskActivitiesDTO> planActivityMap) {
        this.planActivityMap = planActivityMap;
    }

    public Map<String, FormulationRiskActivitiesDTO> getConsequenceMap() {
        if (this.consequenceMap == null) {
            this.consequenceMap = new HashMap();
        }
        return this.consequenceMap;
    }

    public void setConsequenceMap(Map<String, FormulationRiskActivitiesDTO> consequenceMap) {
        this.consequenceMap = consequenceMap;
    }

    public List<FormulationRiskActivitiesDTO> getActivitiesList() {
        return this.activitiesList;
    }

    public void setActivitiesList(List<FormulationRiskActivitiesDTO> activitiesList) {
        this.activitiesList = activitiesList;
    }

    public List<Employee> getEmployeeList() {
        return this.employeeList;
    }

    public void setEmployeeList(List<Employee> employeeList) {
        this.employeeList = employeeList;
    }

    public long getRiskId() {
        return this.riskId;
    }

    public void setRiskId(long riskId) {
        this.riskId = riskId;
    }

    public Map<String, Object> getSubRiskValue() {
        if (this.subRiskValue == null) {
            this.subRiskValue = new HashMap();
        }
        return this.subRiskValue;
    }

    public void setSubRiskValue(Map<String, Object> subRiskValue) {
        this.subRiskValue = subRiskValue;
    }

    public String getType() {
        return this.type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
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
}

