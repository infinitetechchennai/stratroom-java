/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.RiskOptions
 *  com.estrat.backend.db.dto.RiskOptionsDto
 *  javax.persistence.Column
 *  javax.persistence.Entity
 *  javax.persistence.GeneratedValue
 *  javax.persistence.GenerationType
 *  javax.persistence.Id
 *  javax.persistence.Table
 *  org.hibernate.annotations.GenericGenerator
 */
package com.estrat.backend.db.bean.po;

import com.estrat.backend.db.dto.RiskOptionsDto;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="risk_options", schema="orgstructure")
public class RiskOptions {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="id")
    private int id;
    @Column(name="value")
    private String value;
    @Column(name="type_val")
    private String type;
    @Column(name="option_val")
    private String option;

    public RiskOptions() {
    }

    public RiskOptions(RiskOptionsDto riskOptions) {
        this.id = riskOptions.getId();
        this.option = riskOptions.getOption();
        this.type = riskOptions.getType();
        this.value = riskOptions.getValue();
    }

    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getValue() {
        return this.value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getType() {
        return this.type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getOption() {
        return this.option;
    }

    public void setOption(String option) {
        this.option = option;
    }
}

