/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.ImpactData
 *  com.estrat.service.db.dto.ImpactDataDto
 *  com.fasterxml.jackson.core.JsonProcessingException
 *  com.fasterxml.jackson.databind.ObjectMapper
 *  javax.persistence.Column
 *  javax.persistence.Entity
 *  javax.persistence.GeneratedValue
 *  javax.persistence.GenerationType
 *  javax.persistence.Id
 *  javax.persistence.Table
 */
package com.estrat.service.db.bean.po;

import com.estrat.service.db.dto.ImpactDataDto;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="impactdata", schema="orgstructure")
public class ImpactData {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="id")
    private long id;
    @Column(name="impact")
    private String impact;
    @Column(name="hours_days_months")
    private String hoursDaysMonths;
    @Column(name="impact_id")
    private Long impactId;

    public ImpactData() {
    }

    public ImpactData(ImpactDataDto impactDataDto) {
        this.id = impactDataDto.getId();
        this.impact = impactDataDto.getImpact();
        this.impactId = impactDataDto.getImpactId();
        ObjectMapper mapper = new ObjectMapper();
        try {
            this.hoursDaysMonths = mapper.writeValueAsString((Object)impactDataDto.getHoursDaysMonths());
        }
        catch (JsonProcessingException e) {
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

    public String getHoursDaysMonths() {
        return this.hoursDaysMonths;
    }

    public void setHoursDaysMonths(String hoursDaysMonths) {
        this.hoursDaysMonths = hoursDaysMonths;
    }

    public Long getImpactId() {
        return this.impactId;
    }

    public void setImpactId(Long impactId) {
        this.impactId = impactId;
    }
}

