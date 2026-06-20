/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.Employee
 *  com.estrat.backend.db.bean.po.RiskFormulation
 *  com.estrat.backend.db.dto.FormulationRiskDTO
 *  com.estrat.backend.db.dto.RiskFormulationDTO
 *  org.apache.commons.collections4.CollectionUtils
 */
package com.estrat.backend.db.dto;

import com.estrat.backend.db.bean.Employee;
import com.estrat.backend.db.bean.po.RiskFormulation;
import com.estrat.backend.db.dto.FormulationRiskDTO;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import org.apache.commons.collections4.CollectionUtils;

public class RiskFormulationDTO {
    private long id;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;
    private Long createdBy;
    private Long updatedBy;
    private long approvedBy;
    private List<Employee> employeeList;
    private List<String> employeeIDs;
    private String status;
    private List<FormulationRiskDTO> riskList;

    public RiskFormulationDTO() {
    }

    public RiskFormulationDTO(RiskFormulation riskFormulationDTO, boolean loadFlag) {
        this.id = riskFormulationDTO.getId();
        this.createdTime = riskFormulationDTO.getCreatedTime();
        this.updatedTime = riskFormulationDTO.getUpdatedTime();
        this.createdBy = riskFormulationDTO.getCreatedBy();
        this.updatedBy = riskFormulationDTO.getUpdatedBy();
        this.approvedBy = riskFormulationDTO.getApprovedBy();
        this.status = riskFormulationDTO.getStatus();
        if (loadFlag && CollectionUtils.isNotEmpty((Collection)riskFormulationDTO.getRiskList())) {
            this.riskList = riskFormulationDTO.getRiskList().stream().map(initiative -> new FormulationRiskDTO(initiative, false)).collect(Collectors.toList());
        }
        if (CollectionUtils.isNotEmpty((Collection)riskFormulationDTO.getEmployeeList())) {
            this.employeeList = riskFormulationDTO.getEmployeeList().stream().filter(employee -> Objects.nonNull(employee.getId().getEmpId().getOrgId())).map(employee -> new Employee(employee.getId().getEmpId())).collect(Collectors.toList());
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

    public List<FormulationRiskDTO> getRiskList() {
        return this.riskList;
    }

    public void setRiskList(List<FormulationRiskDTO> riskList) {
        this.riskList = riskList;
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

    public Long getCreatedBy() {
        return this.createdBy;
    }

    public void setCreatedBy(Long createdBy) {
        this.createdBy = createdBy;
    }

    public Long getUpdatedBy() {
        return this.updatedBy;
    }

    public void setUpdatedBy(Long updatedBy) {
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

