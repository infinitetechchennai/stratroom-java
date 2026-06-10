/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.Employee
 *  com.estrat.backend.db.bean.po.RiskPlan
 *  com.estrat.backend.db.bean.po.RiskPlanHistory
 *  com.estrat.backend.db.dto.RiskActivitiesDTO
 *  com.estrat.backend.db.dto.RiskPlanDTO
 *  com.fasterxml.jackson.annotation.JsonIgnoreProperties
 *  com.fasterxml.jackson.annotation.JsonInclude
 *  com.fasterxml.jackson.annotation.JsonInclude$Include
 *  com.fasterxml.jackson.databind.ObjectMapper
 */
package com.estrat.backend.db.dto;

import com.estrat.backend.db.bean.Employee;
import com.estrat.backend.db.bean.po.RiskPlan;
import com.estrat.backend.db.bean.po.RiskPlanHistory;
import com.estrat.backend.db.dto.RiskActivitiesDTO;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@JsonIgnoreProperties(ignoreUnknown=true)
@JsonInclude(value=JsonInclude.Include.NON_NULL)
public class RiskPlanDTO {
    private long id;
    private long riskId;
    private Map<String, Object> riskPlanValue;
    private long owner;
    private long createdBy;
    private long updatedBy;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;
    private int active = 0;
    private String multipleOwners;
    private List<Employee> ownerList;
    private List<RiskActivitiesDTO> riskActivitiesDTOList;
    private String typeFlag;
    private long changeId;
    private String status;
    private Long version;
    private long parentchangeId;

    public RiskPlanDTO() {
    }

    public RiskPlanDTO(RiskPlan riskPlan, boolean loadFlag) {
        this.id = riskPlan.getId();
        this.riskId = riskPlan.getRiskId().getId();
        this.createdBy = riskPlan.getCreatedBy();
        this.updatedBy = riskPlan.getUpdatedBy();
        this.createdTime = riskPlan.getCreatedTime();
        this.updatedTime = riskPlan.getUpdatedTime();
        this.typeFlag = riskPlan.getTypeFlag();
        this.active = riskPlan.getActive();
        this.version = riskPlan.getVersion();
        this.status = riskPlan.getStatus();
        if (riskPlan.getChangeId() != null) {
            this.changeId = riskPlan.getChangeId();
        }
        if (loadFlag) {
            this.ownerList = Objects.nonNull(riskPlan.getOwnerList()) ? riskPlan.getOwnerList().stream().filter(Objects::nonNull).map(owner -> new Employee(owner.getId().getEmpId())).collect(Collectors.toList()) : null;
            this.riskActivitiesDTOList = riskPlan.getRiskActivitiesList() != null ? riskPlan.getRiskActivitiesList().stream().map(obj -> new RiskActivitiesDTO(obj, true)).collect(Collectors.toList()) : null;
        }
        ObjectMapper mapper = new ObjectMapper();
        try {
            this.riskPlanValue = (Map)mapper.readValue(riskPlan.getRiskPlanValue(), HashMap.class);
        }
        catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public RiskPlanDTO(RiskPlanHistory riskPlan) {
        this.id = riskPlan.getRiskPlanId();
        this.riskId = riskPlan.getRiskId();
        this.createdBy = riskPlan.getCreatedBy();
        this.updatedBy = riskPlan.getUpdatedBy();
        this.createdTime = riskPlan.getCreatedTime();
        this.updatedTime = riskPlan.getUpdatedTime();
        this.typeFlag = riskPlan.getTypeFlag();
        this.active = riskPlan.getActive();
        this.version = riskPlan.getVersion();
        this.status = riskPlan.getStatus();
        if (riskPlan.getChangeId() != null) {
            this.changeId = riskPlan.getChangeId();
        }
        ObjectMapper mapper = new ObjectMapper();
        try {
            this.riskPlanValue = (Map)mapper.readValue(riskPlan.getRiskPlanValue(), HashMap.class);
        }
        catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public List<Employee> getOwnerList() {
        return this.ownerList;
    }

    public void setOwnerList(List<Employee> ownerList) {
        this.ownerList = ownerList;
    }

    public String getMultipleOwners() {
        return this.multipleOwners;
    }

    public void setMultipleOwners(String multipleOwners) {
        this.multipleOwners = multipleOwners;
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getRiskId() {
        return this.riskId;
    }

    public void setRiskId(long riskId) {
        this.riskId = riskId;
    }

    public Map<String, Object> getRiskPlanValue() {
        return this.riskPlanValue;
    }

    public void setRiskPlanValue(Map<String, Object> riskPlanValue) {
        this.riskPlanValue = riskPlanValue;
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

    public int getActive() {
        return this.active;
    }

    public void setActive(int active) {
        this.active = active;
    }

    public List<RiskActivitiesDTO> getRiskActivitiesDTOList() {
        return this.riskActivitiesDTOList;
    }

    public void setRiskActivitiesDTOList(List<RiskActivitiesDTO> riskActivitiesDTOList) {
        this.riskActivitiesDTOList = riskActivitiesDTOList;
    }

    public String getTypeFlag() {
        return this.typeFlag;
    }

    public void setTypeFlag(String typeFlag) {
        this.typeFlag = typeFlag;
    }

    public long getChangeId() {
        return this.changeId;
    }

    public void setChangeId(long changeId) {
        this.changeId = changeId;
    }

    public long getParentchangeId() {
        return this.parentchangeId;
    }

    public void setParentchangeId(long parentchangeId) {
        this.parentchangeId = parentchangeId;
    }

    public String getStatus() {
        return this.status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Long getVersion() {
        return this.version;
    }

    public void setVersion(Long version) {
        this.version = version;
    }
}

