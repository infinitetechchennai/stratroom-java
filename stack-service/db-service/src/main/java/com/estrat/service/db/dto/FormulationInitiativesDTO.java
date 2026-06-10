/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.FormulationInitiatives
 *  com.estrat.service.db.dto.FormulationInitiativesDTO
 *  com.estrat.service.db.dto.FormulationSubInitiativesDTO
 *  com.fasterxml.jackson.annotation.JsonInclude
 *  com.fasterxml.jackson.annotation.JsonInclude$Include
 *  com.fasterxml.jackson.databind.ObjectMapper
 *  org.apache.commons.collections4.CollectionUtils
 */
package com.estrat.service.db.dto;

import com.estrat.service.db.bean.po.FormulationInitiatives;
import com.estrat.service.db.dto.FormulationSubInitiativesDTO;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.apache.commons.collections4.CollectionUtils;

@JsonInclude(value=JsonInclude.Include.NON_NULL)
public class FormulationInitiativesDTO {
    private long id;
    private Map<String, Object> initiativeValue;
    private Long impactId;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;
    private int active = 0;
    private long owner;
    private long formulationId;
    private String department;
    private long createdBy;
    private long updatedBy;
    private Date startDate;
    private Date endDate;
    private List<FormulationSubInitiativesDTO> subInitiativeList;
    public Long departmentId;

    public FormulationInitiativesDTO() {
    }

    public FormulationInitiativesDTO(FormulationInitiatives formulationInitiatives) {
        this.id = formulationInitiatives.getId();
        this.createdTime = formulationInitiatives.getCreatedTime();
        this.active = formulationInitiatives.getActive();
        this.owner = formulationInitiatives.getOwner();
        this.updatedTime = formulationInitiatives.getUpdatedTime();
        this.createdBy = formulationInitiatives.getCreatedBy();
        this.updatedBy = formulationInitiatives.getUpdatedBy();
        this.impactId = formulationInitiatives.getImpactId();
        this.startDate = formulationInitiatives.getStartDate();
        this.endDate = formulationInitiatives.getEndDate();
        this.formulationId = formulationInitiatives.getFormulationId().getId();
        this.department = formulationInitiatives.getDepartment();
        this.departmentId = formulationInitiatives.getDepartmentId();
        ObjectMapper mapper = new ObjectMapper();
        if (CollectionUtils.isNotEmpty((Collection)formulationInitiatives.getSubInitiativeList())) {
            this.subInitiativeList = formulationInitiatives.getSubInitiativeList().stream().map(initiaitve -> new FormulationSubInitiativesDTO(initiaitve)).collect(Collectors.toList());
        }
        try {
            this.initiativeValue = (Map)mapper.readValue(formulationInitiatives.getInitiativeValue(), HashMap.class);
        }
        catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public String getDepartment() {
        return this.department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public long getFormulationId() {
        return this.formulationId;
    }

    public void setFormulationId(long formulationId) {
        this.formulationId = formulationId;
    }

    public Long getImpactId() {
        return this.impactId;
    }

    public void setImpactId(Long impactId) {
        this.impactId = impactId;
    }

    public Map<String, Object> getInitiativeValue() {
        return this.initiativeValue;
    }

    public void setInitiativeValue(Map<String, Object> initiativeValue) {
        this.initiativeValue = initiativeValue;
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

    public int getActive() {
        return this.active;
    }

    public void setActive(int active) {
        this.active = active;
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

    public List<FormulationSubInitiativesDTO> getSubInitiativeList() {
        return this.subInitiativeList;
    }

    public void setSubInitiativeList(List<FormulationSubInitiativesDTO> subInitiativeList) {
        this.subInitiativeList = subInitiativeList;
    }

    public Date getStartDate() {
        return this.startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return this.endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public Long getDepartmentId() {
        return this.departmentId;
    }

    public void setDepartmentId(Long departmentId) {
        this.departmentId = departmentId;
    }
}

