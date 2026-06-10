/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.scorecard.dto.ImpactDataDto
 *  com.fasterxml.jackson.annotation.JsonInclude
 *  com.fasterxml.jackson.annotation.JsonInclude$Include
 */
package com.estrat.scorecard.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import java.util.Map;

@JsonInclude(value=JsonInclude.Include.NON_NULL)
public class ImpactDataDto {
    private long id;
    private String impact;
    private Map<String, String> hoursDaysMonths;
    private long impactId;

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

    public long getImpactId() {
        return this.impactId;
    }

    public void setImpactId(long impactId) {
        this.impactId = impactId;
    }
}

