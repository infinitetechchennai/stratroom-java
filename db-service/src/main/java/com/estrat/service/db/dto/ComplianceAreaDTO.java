/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.ComplianceArea
 *  com.estrat.service.db.dto.ComplianceAreaDTO
 *  com.estrat.service.db.dto.ComplianceDetailsDTO
 */
package com.estrat.service.db.dto;

import com.estrat.service.db.bean.po.ComplianceArea;
import com.estrat.service.db.dto.ComplianceDetailsDTO;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

public class ComplianceAreaDTO {
    private long id;
    private String name;
    private long createdBy;
    private long updatedBy;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;
    private List<ComplianceDetailsDTO> complainsDetailsList;

    public ComplianceAreaDTO() {
    }

    public ComplianceAreaDTO(ComplianceArea complianceArea) {
        this.id = complianceArea.getId();
        this.createdBy = complianceArea.getCreatedBy();
        this.updatedBy = complianceArea.getUpdatedBy();
        this.createdTime = complianceArea.getCreatedTime();
        this.updatedTime = complianceArea.getUpdatedTime();
        this.name = complianceArea.getName();
        this.complainsDetailsList = complianceArea.getComplainsDetailsList() != null ? complianceArea.getComplainsDetailsList().stream().map(kpi -> new ComplianceDetailsDTO(kpi)).collect(Collectors.toList()) : null;
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
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

    public List<ComplianceDetailsDTO> getComplainsDetailsList() {
        return this.complainsDetailsList;
    }

    public void setComplainsDetailsList(List<ComplianceDetailsDTO> complainsDetailsList) {
        this.complainsDetailsList = complainsDetailsList;
    }
}

