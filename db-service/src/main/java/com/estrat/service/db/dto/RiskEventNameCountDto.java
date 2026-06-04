/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.dto.RiskEventFrequencyCountDto
 *  com.estrat.service.db.dto.RiskEventNameCountDto
 */
package com.estrat.service.db.dto;

import com.estrat.service.db.dto.RiskEventFrequencyCountDto;
import java.util.List;

public class RiskEventNameCountDto {
    private Long id;
    private List<RiskEventFrequencyCountDto> incidentCounts;
    private String departmentName;

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDepartmentName() {
        return this.departmentName;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }

    public List<RiskEventFrequencyCountDto> getIncidentCounts() {
        return this.incidentCounts;
    }

    public void setIncidentCounts(List<RiskEventFrequencyCountDto> incidentCounts) {
        this.incidentCounts = incidentCounts;
    }
}

