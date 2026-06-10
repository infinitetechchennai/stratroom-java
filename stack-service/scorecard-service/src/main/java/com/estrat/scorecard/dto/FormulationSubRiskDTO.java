/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.scorecard.dto.Employee
 *  com.estrat.scorecard.dto.FormulationRiskActivitiesDTO
 *  com.estrat.scorecard.dto.FormulationRiskDTO
 *  com.estrat.scorecard.dto.FormulationSubRiskDTO
 */
package com.estrat.scorecard.dto;

import com.estrat.scorecard.dto.Employee;
import com.estrat.scorecard.dto.FormulationRiskActivitiesDTO;
import com.estrat.scorecard.dto.FormulationRiskDTO;
import java.time.LocalDateTime;
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
    private String type;

    public FormulationRiskDTO getRiskDTO() {
        return this.riskDTO;
    }

    public void setRiskDTO(FormulationRiskDTO riskDTO) {
        this.riskDTO = riskDTO;
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

