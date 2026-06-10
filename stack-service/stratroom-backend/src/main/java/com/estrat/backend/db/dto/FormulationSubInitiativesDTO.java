/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.Employee
 *  com.estrat.backend.db.bean.po.FormulationSubInitiatives
 *  com.estrat.backend.db.dto.FormulationSubInitiativesDTO
 *  com.fasterxml.jackson.annotation.JsonInclude
 *  com.fasterxml.jackson.annotation.JsonInclude$Include
 *  com.fasterxml.jackson.databind.ObjectMapper
 *  org.apache.commons.collections4.CollectionUtils
 */
package com.estrat.backend.db.dto;

import com.estrat.backend.db.bean.Employee;
import com.estrat.backend.db.bean.po.FormulationSubInitiatives;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;
import org.apache.commons.collections4.CollectionUtils;

@JsonInclude(value=JsonInclude.Include.NON_NULL)
public class FormulationSubInitiativesDTO {
    private long id;
    private Map<String, Object> subInitiativeValue;
    private List<Employee> employeeList;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;
    private long createdBy;
    private long updatedBy;
    private long initiativeId;
    private String type;

    public FormulationSubInitiativesDTO() {
    }

    public FormulationSubInitiativesDTO(FormulationSubInitiatives formulationSubInitiatives) {
        this.id = formulationSubInitiatives.getId();
        this.createdTime = formulationSubInitiatives.getCreatedTime();
        this.updatedTime = formulationSubInitiatives.getUpdatedTime();
        this.createdBy = formulationSubInitiatives.getCreatedBy();
        this.updatedBy = formulationSubInitiatives.getUpdatedBy();
        this.initiativeId = formulationSubInitiatives.getInitiativeId().getId();
        this.type = formulationSubInitiatives.getType();
        ObjectMapper mapper = new ObjectMapper();
        try {
            this.subInitiativeValue = (Map)mapper.readValue(formulationSubInitiatives.getSubInitiativeValue(), HashMap.class);
        }
        catch (Exception e) {
            throw new RuntimeException(e);
        }
        if (CollectionUtils.isNotEmpty((Collection)formulationSubInitiatives.getSubInitiativesUserList())) {
            this.employeeList = formulationSubInitiatives.getSubInitiativesUserList().stream().filter(employee -> Objects.nonNull(employee.getId().getEmpId().getOrgId())).map(employee -> new Employee(employee.getId().getEmpId())).collect(Collectors.toList());
        }
    }

    public List<Employee> getEmployeeList() {
        return this.employeeList;
    }

    public void setEmployeeList(List<Employee> employeeList) {
        this.employeeList = employeeList;
    }

    public Map<String, Object> getSubInitiativeValue() {
        if (this.subInitiativeValue == null) {
            this.subInitiativeValue = new HashMap();
        }
        return this.subInitiativeValue;
    }

    public void setSubInitiativeValue(Map<String, Object> subInitiativeValue) {
        this.subInitiativeValue = subInitiativeValue;
    }

    public long getInitiativeId() {
        return this.initiativeId;
    }

    public void setInitiativeId(long initiativeId) {
        this.initiativeId = initiativeId;
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

