/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.Employee
 *  com.estrat.backend.db.bean.po.StrategyFormulation
 *  com.estrat.backend.db.dto.FormulationScoreCardDTO
 *  com.estrat.backend.db.dto.StrategyFormulationDTO
 *  com.estrat.backend.db.resource.util.DateUtil
 *  com.fasterxml.jackson.annotation.JsonInclude
 *  com.fasterxml.jackson.annotation.JsonInclude$Include
 *  org.apache.commons.collections4.CollectionUtils
 */
package com.estrat.backend.db.dto;

import com.estrat.backend.db.bean.Employee;
import com.estrat.backend.db.bean.po.StrategyFormulation;
import com.estrat.backend.db.dto.FormulationScoreCardDTO;
import com.estrat.backend.db.resource.util.DateUtil;
import com.fasterxml.jackson.annotation.JsonInclude;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import org.apache.commons.collections4.CollectionUtils;

@JsonInclude(value=JsonInclude.Include.NON_NULL)
public class StrategyFormulationDTO {
    private long id;
    private long pageId;
    private String importFormulationId;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;
    private String startDate;
    private String endDate;
    private String approvedDate;
    private String planType;
    private long createdBy;
    private long updatedBy;
    private long approvedBy;
    private String status;
    private String formulationName;
    private String formulationDept;
    private String formulationTeam;
    private List<Employee> employeeList;
    private List<FormulationScoreCardDTO> scoreCardList;

    public StrategyFormulationDTO() {
    }

    public StrategyFormulationDTO(StrategyFormulation strategyFormulation, boolean loadScoreCard) {
        this.id = strategyFormulation.getId();
        this.formulationName = strategyFormulation.getFormulationName();
        this.formulationDept = strategyFormulation.getFormulationDept();
        this.createdTime = strategyFormulation.getCreatedTime();
        if (loadScoreCard) {
            this.scoreCardList = strategyFormulation.getScoreCardList() != null ? strategyFormulation.getScoreCardList().stream().map(obj -> new FormulationScoreCardDTO(obj, true)).collect(Collectors.toList()) : Collections.emptyList();
        }
        this.updatedTime = strategyFormulation.getUpdatedTime();
        this.createdBy = strategyFormulation.getCreatedBy();
        this.updatedBy = strategyFormulation.getUpdatedBy();
        this.approvedBy = strategyFormulation.getApprovedBy();
        this.approvedDate = DateUtil.mapToString((LocalDate)strategyFormulation.getApprovedDate(), (String)"MM/dd/yyyy");
        this.startDate = DateUtil.mapToString((LocalDate)strategyFormulation.getStartDate(), (String)"MM/dd/yyyy");
        this.endDate = DateUtil.mapToString((LocalDate)strategyFormulation.getEndDate(), (String)"MM/dd/yyyy");
        this.planType = strategyFormulation.getPlanType();
        this.status = strategyFormulation.getStatus();
        if (strategyFormulation.getPageId() != null) {
            this.pageId = strategyFormulation.getPageId().getId();
        }
        if (CollectionUtils.isNotEmpty((Collection)strategyFormulation.getFormulationList())) {
            this.employeeList = strategyFormulation.getFormulationList().stream().filter(employee -> Objects.nonNull(employee.getId().getEmpId().getOrgId())).map(employee -> new Employee(employee.getId().getEmpId())).collect(Collectors.toList());
        }
    }

    public String getImportFormulationId() {
        return this.importFormulationId;
    }

    public void setImportFormulationId(String importFormulationId) {
        this.importFormulationId = importFormulationId;
    }

    public String getFormulationDept() {
        return this.formulationDept;
    }

    public void setFormulationDept(String formulationDept) {
        this.formulationDept = formulationDept;
    }

    public List<Employee> getEmployeeList() {
        return this.employeeList;
    }

    public void setEmployeeList(List<Employee> employeeList) {
        this.employeeList = employeeList;
    }

    public String getFormulationTeam() {
        return this.formulationTeam;
    }

    public void setFormulationTeam(String formulationTeam) {
        this.formulationTeam = formulationTeam;
    }

    public String getFormulationName() {
        return this.formulationName;
    }

    public void setFormulationName(String formulationName) {
        this.formulationName = formulationName;
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getPageId() {
        return this.pageId;
    }

    public void setPageId(long pageId) {
        this.pageId = pageId;
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

    public String getStartDate() {
        return this.startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return this.endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public String getApprovedDate() {
        return this.approvedDate;
    }

    public void setApprovedDate(String approvedDate) {
        this.approvedDate = approvedDate;
    }

    public String getPlanType() {
        return this.planType;
    }

    public void setPlanType(String planType) {
        this.planType = planType;
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

    public List<FormulationScoreCardDTO> getScoreCardList() {
        return this.scoreCardList;
    }

    public void setScoreCardList(List<FormulationScoreCardDTO> scoreCardList) {
        this.scoreCardList = scoreCardList;
    }

    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof StrategyFormulationDTO)) {
            return false;
        }
        StrategyFormulationDTO that = (StrategyFormulationDTO)o;
        return Objects.equals(this.getId(), that.getId());
    }

    public int hashCode() {
        return Objects.hash(this.getId());
    }
}

