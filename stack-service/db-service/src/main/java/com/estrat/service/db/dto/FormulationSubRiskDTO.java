/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.Employee
 *  com.estrat.service.db.bean.po.FormulationSubRiskDetails
 *  com.estrat.service.db.dto.FormulationRiskActivitiesDTO
 *  com.estrat.service.db.dto.FormulationRiskDTO
 *  com.estrat.service.db.dto.FormulationSubRiskDTO
 *  com.fasterxml.jackson.databind.ObjectMapper
 *  org.apache.commons.collections4.CollectionUtils
 */
package com.estrat.service.db.dto;

import com.estrat.service.db.bean.Employee;
import com.estrat.service.db.bean.po.FormulationSubRiskDetails;
import com.estrat.service.db.dto.FormulationRiskActivitiesDTO;
import com.estrat.service.db.dto.FormulationRiskDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;
import org.apache.commons.collections4.CollectionUtils;

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

    public FormulationSubRiskDTO() {
    }

    public FormulationSubRiskDTO(FormulationSubRiskDetails riskDetails, boolean parentFlag) {
        this.id = riskDetails.getId();
        this.createdTime = riskDetails.getCreatedTime();
        this.updatedTime = riskDetails.getUpdatedTime();
        this.createdBy = riskDetails.getCreatedBy();
        this.updatedBy = riskDetails.getUpdatedBy();
        this.type = riskDetails.getType();
        this.riskId = Objects.nonNull(riskDetails.getRiskId()) ? riskDetails.getRiskId().getId() : 0L;
        this.riskDTO = Objects.nonNull(riskDetails.getRiskId()) ? new FormulationRiskDTO(riskDetails.getRiskId(), true) : null;
        ObjectMapper mapper = new ObjectMapper();
        if (Objects.nonNull(riskDetails.getSubRiskValue())) {
            try {
                this.subRiskValue = (Map)mapper.readValue(riskDetails.getSubRiskValue(), HashMap.class);
            }
            catch (Exception e) {
                throw new RuntimeException(e);
            }
        }
        if (!parentFlag) {
            if (CollectionUtils.isNotEmpty((Collection)riskDetails.getSubRiskUserList())) {
                this.employeeList = riskDetails.getSubRiskUserList().stream().filter(employee -> Objects.nonNull(employee.getId().getEmpId().getOrgId())).map(employee -> new Employee(employee.getId().getEmpId())).collect(Collectors.toList());
            }
            if (CollectionUtils.isNotEmpty((Collection)riskDetails.getActivitiesList())) {
                this.activitiesList = riskDetails.getActivitiesList().stream().map(activity -> new FormulationRiskActivitiesDTO(activity)).collect(Collectors.toList());
            }
        }
    }

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

