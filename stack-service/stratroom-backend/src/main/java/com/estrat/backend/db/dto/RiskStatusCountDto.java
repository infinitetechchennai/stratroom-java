/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.dto.RiskStatusCountDto
 *  com.estrat.backend.db.dto.SubRiskStatusCountDto
 *  com.fasterxml.jackson.annotation.JsonInclude
 *  com.fasterxml.jackson.annotation.JsonInclude$Include
 */
package com.estrat.backend.db.dto;

import com.estrat.backend.db.dto.SubRiskStatusCountDto;
import com.fasterxml.jackson.annotation.JsonInclude;
import java.util.List;

@JsonInclude(value=JsonInclude.Include.NON_NULL)
public class RiskStatusCountDto {
    private long id;
    private List<SubRiskStatusCountDto> statusCounts;
    private String departmentName;

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public List<SubRiskStatusCountDto> getStatusCounts() {
        return this.statusCounts;
    }

    public void setStatusCounts(List<SubRiskStatusCountDto> statusCounts) {
        this.statusCounts = statusCounts;
    }

    public String getDepartmentName() {
        return this.departmentName;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }
}

