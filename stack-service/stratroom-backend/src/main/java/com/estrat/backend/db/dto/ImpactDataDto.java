/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.ImpactData
 *  com.estrat.backend.db.dto.ImpactDataDto
 *  com.fasterxml.jackson.annotation.JsonInclude
 *  com.fasterxml.jackson.annotation.JsonInclude$Include
 *  com.fasterxml.jackson.databind.ObjectMapper
 */
package com.estrat.backend.db.dto;

import com.estrat.backend.db.bean.po.ImpactData;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.HashMap;
import java.util.Map;

@JsonInclude(value=JsonInclude.Include.NON_NULL)
public class ImpactDataDto {
    private long id;
    private String impact;
    private Map<String, String> hoursDaysMonths;
    private Long impactId;

    public ImpactDataDto() {
    }

    public ImpactDataDto(ImpactData impactData) {
        this.id = impactData.getId();
        this.impact = impactData.getImpact();
        this.impactId = impactData.getImpactId();
        ObjectMapper mapper = new ObjectMapper();
        try {
            this.hoursDaysMonths = (Map)mapper.readValue(impactData.getHoursDaysMonths(), HashMap.class);
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

    public String getImpact() {
        return this.impact;
    }

    public void setImpact(String impact) {
        this.impact = impact;
    }

    public Map<String, String> getHoursDaysMonths() {
        return this.hoursDaysMonths;
    }

    public void setHoursDaysMonths(Map<String, String> hoursDaysMonths) {
        this.hoursDaysMonths = hoursDaysMonths;
    }

    public Long getImpactId() {
        return this.impactId;
    }

    public void setImpactId(Long impactId) {
        this.impactId = impactId;
    }
}

