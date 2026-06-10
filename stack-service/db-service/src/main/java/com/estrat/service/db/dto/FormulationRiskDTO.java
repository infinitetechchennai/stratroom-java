/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.FormulationRiskDetails
 *  com.estrat.service.db.dto.FormulationRiskDTO
 *  com.estrat.service.db.dto.FormulationSubRiskDTO
 *  com.fasterxml.jackson.databind.ObjectMapper
 *  org.apache.commons.collections4.CollectionUtils
 */
package com.estrat.service.db.dto;

import com.estrat.service.db.bean.po.FormulationRiskDetails;
import com.estrat.service.db.dto.FormulationSubRiskDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;
import org.apache.commons.collections4.CollectionUtils;

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

    public FormulationRiskDTO() {
    }

    public FormulationRiskDTO(FormulationRiskDetails riskDTO, boolean parentFlag) {
        this.id = riskDTO.getId();
        this.department = riskDTO.getDepartment();
        this.owner = riskDTO.getOwner();
        this.createdBy = riskDTO.getCreatedBy();
        this.updatedBy = riskDTO.getUpdatedBy();
        this.createdTime = riskDTO.getCreatedTime();
        this.updatedTime = riskDTO.getUpdatedTime();
        this.impactId = riskDTO.getImpactId();
        this.departmentId = riskDTO.getDepartmentId();
        this.formulationId = Objects.nonNull(riskDTO.getFormulationId()) ? riskDTO.getFormulationId().getId() : 0L;
        ObjectMapper mapper = new ObjectMapper();
        if (Objects.nonNull(riskDTO.getRiskValue())) {
            try {
                this.riskValue = (Map)mapper.readValue(riskDTO.getRiskValue(), HashMap.class);
            }
            catch (Exception e) {
                throw new RuntimeException(e);
            }
        }
        if (!parentFlag && CollectionUtils.isNotEmpty((Collection)riskDTO.getSubRiskList())) {
            this.subRiskList = riskDTO.getSubRiskList().stream().map(initiaitve -> new FormulationSubRiskDTO(initiaitve, false)).collect(Collectors.toList());
        }
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

