/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.Employee
 *  com.estrat.backend.db.bean.po.ProjectFormulation
 *  com.estrat.backend.db.dto.FormulationInitiativesDTO
 *  com.estrat.backend.db.dto.ProjectFormulationDTO
 *  com.fasterxml.jackson.annotation.JsonInclude
 *  com.fasterxml.jackson.annotation.JsonInclude$Include
 *  org.apache.commons.collections4.CollectionUtils
 */
package com.estrat.backend.db.dto;

import com.estrat.backend.db.bean.Employee;
import com.estrat.backend.db.bean.po.ProjectFormulation;
import com.estrat.backend.db.dto.FormulationInitiativesDTO;
import com.fasterxml.jackson.annotation.JsonInclude;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import org.apache.commons.collections4.CollectionUtils;

@JsonInclude(value=JsonInclude.Include.NON_NULL)
public class ProjectFormulationDTO {
    private long id;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;
    private long createdBy;
    private long updatedBy;
    private long approvedBy;
    private String status;
    private List<FormulationInitiativesDTO> initiativesList;
    private List<Employee> employeeList;
    private List<String> employeeIDs;

    public ProjectFormulationDTO() {
    }

    public ProjectFormulationDTO(ProjectFormulation projectFormulation, boolean loadFlag) {
        this.id = projectFormulation.getId();
        this.createdTime = projectFormulation.getCreatedTime();
        this.updatedTime = projectFormulation.getUpdatedTime();
        this.createdBy = projectFormulation.getCreatedBy();
        this.updatedBy = projectFormulation.getUpdatedBy();
        this.approvedBy = projectFormulation.getApprovedBy();
        this.status = projectFormulation.getStatus();
        if (loadFlag && CollectionUtils.isNotEmpty((Collection)projectFormulation.getInitiativesList())) {
            this.initiativesList = projectFormulation.getInitiativesList().stream().map(initiative -> new FormulationInitiativesDTO(initiative)).collect(Collectors.toList());
        }
        if (CollectionUtils.isNotEmpty((Collection)projectFormulation.getEmployeeList())) {
            this.employeeList = projectFormulation.getEmployeeList().stream().filter(employee -> Objects.nonNull(employee.getId().getEmpId().getOrgId())).map(employee -> new Employee(employee.getId().getEmpId())).collect(Collectors.toList());
        }
    }

    public List<String> getEmployeeIDs() {
        return this.employeeIDs;
    }

    public void setEmployeeIDs(List<String> employeeIDs) {
        this.employeeIDs = employeeIDs;
    }

    public List<Employee> getEmployeeList() {
        return this.employeeList;
    }

    public void setEmployeeList(List<Employee> employeeList) {
        this.employeeList = employeeList;
    }

    public List<FormulationInitiativesDTO> getInitiativesList() {
        return this.initiativesList;
    }

    public void setInitiativesList(List<FormulationInitiativesDTO> initiativesList) {
        this.initiativesList = initiativesList;
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

    public long getApprovedBy() {
        return this.approvedBy;
    }

    public void setApprovedBy(long approvedBy) {
        this.approvedBy = approvedBy;
    }

    public String getStatus() {
        return this.status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}

