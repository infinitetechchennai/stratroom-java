/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.Employee
 *  com.estrat.backend.db.bean.po.RiskPlan
 *  com.estrat.backend.db.bean.po.RiskPlanHistory
 *  com.estrat.backend.db.dto.RiskActivitiesDTO
 *  com.estrat.backend.db.dto.RiskMonitoringDTO
 *  com.fasterxml.jackson.annotation.JsonInclude
 *  com.fasterxml.jackson.annotation.JsonInclude$Include
 *  com.fasterxml.jackson.databind.ObjectMapper
 */
package com.estrat.backend.db.dto;

import com.estrat.backend.db.bean.Employee;
import com.estrat.backend.db.bean.po.RiskPlan;
import com.estrat.backend.db.bean.po.RiskPlanHistory;
import com.estrat.backend.db.dto.RiskActivitiesDTO;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@JsonInclude(value=JsonInclude.Include.NON_NULL)
public class RiskMonitoringDTO {
    private long id;
    private long riskId;
    private String riskUniqueId;
    private Map<String, Object> riskMonitoringValue;
    private long owner;
    private Long createdBy;
    private Long updatedBy;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;
    private int active = 0;
    private List<Employee> ownerList;
    private List<RiskActivitiesDTO> riskReviewList;
    private long changeId;
    private String typeFlag;

    public RiskMonitoringDTO() {
    }

    public RiskMonitoringDTO(RiskPlan riskMonitoring, Boolean loadFlag) {
        this.id = riskMonitoring.getId();
        this.riskId = riskMonitoring.getRiskId().getId();
        this.riskUniqueId = riskMonitoring.getRiskId().getRiskUniqueId();
        this.typeFlag = riskMonitoring.getTypeFlag();
        this.createdBy = riskMonitoring.getCreatedBy();
        this.updatedBy = riskMonitoring.getUpdatedBy();
        this.createdTime = riskMonitoring.getCreatedTime();
        this.updatedTime = riskMonitoring.getUpdatedTime();
        this.active = riskMonitoring.getActive();
        if (riskMonitoring.getChangeId() != null) {
            this.changeId = riskMonitoring.getChangeId();
        }
        if (loadFlag.booleanValue()) {
            this.ownerList = Objects.nonNull(riskMonitoring.getOwnerList()) ? riskMonitoring.getOwnerList().stream().map(owner -> new Employee(owner.getId().getEmpId())).collect(Collectors.toList()) : null;
            this.riskReviewList = riskMonitoring.getRiskActivitiesList() != null ? riskMonitoring.getRiskActivitiesList().stream().map(dbvalue -> new RiskActivitiesDTO(dbvalue, true)).collect(Collectors.toList()) : null;
        }
        ObjectMapper mapper = new ObjectMapper();
        try {
            this.riskMonitoringValue = (Map)mapper.readValue(riskMonitoring.getRiskPlanValue(), HashMap.class);
        }
        catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public RiskMonitoringDTO(RiskPlanHistory riskMonitoring) {
        this.id = riskMonitoring.getRiskPlanId();
        this.riskId = riskMonitoring.getRiskId();
        this.typeFlag = riskMonitoring.getTypeFlag();
        this.createdBy = riskMonitoring.getCreatedBy();
        this.updatedBy = riskMonitoring.getUpdatedBy();
        this.createdTime = riskMonitoring.getCreatedTime();
        this.updatedTime = riskMonitoring.getUpdatedTime();
        this.active = riskMonitoring.getActive();
        if (riskMonitoring.getChangeId() != null) {
            this.changeId = riskMonitoring.getChangeId();
        }
        ObjectMapper mapper = new ObjectMapper();
        try {
            this.riskMonitoringValue = (Map)mapper.readValue(riskMonitoring.getRiskPlanValue(), HashMap.class);
        }
        catch (Exception e) {
            throw new RuntimeException(e);
        }
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

    public Map<String, Object> getRiskMonitoringValue() {
        return this.riskMonitoringValue;
    }

    public void setRiskMonitoringValue(Map<String, Object> riskMonitoringValue) {
        this.riskMonitoringValue = riskMonitoringValue;
    }

    public long getOwner() {
        return this.owner;
    }

    public void setOwner(long owner) {
        this.owner = owner;
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

    public List<Employee> getOwnerList() {
        return this.ownerList;
    }

    public void setOwnerList(List<Employee> ownerList) {
        this.ownerList = ownerList;
    }

    public List<RiskActivitiesDTO> getRiskReviewList() {
        return this.riskReviewList;
    }

    public void setRiskReviewList(List<RiskActivitiesDTO> riskReviewList) {
        this.riskReviewList = riskReviewList;
    }

    public String getTypeFlag() {
        return this.typeFlag;
    }

    public void setTypeFlag(String typeFlag) {
        this.typeFlag = typeFlag;
    }

    public String getRiskUniqueId() {
        return this.riskUniqueId;
    }

    public void setRiskUniqueId(String riskUniqueId) {
        this.riskUniqueId = riskUniqueId;
    }

    public long getChangeId() {
        return this.changeId;
    }

    public void setChangeId(long changeId) {
        this.changeId = changeId;
    }
}

