/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.KPIElementDetailsPo
 *  com.estrat.service.db.dto.KPIElementDTO
 *  javax.persistence.Column
 *  javax.persistence.Entity
 *  javax.persistence.GeneratedValue
 *  javax.persistence.Id
 *  javax.persistence.Table
 *  org.hibernate.annotations.GenericGenerator
 */
package com.estrat.service.db.bean.po;

import com.estrat.service.db.dto.KPIElementDTO;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name="kpi_element_details", schema="orgstructure")
public class KPIElementDetailsPo {
    @Id
    @GenericGenerator(name="elementKey", strategy="assigned")
    @GeneratedValue(generator="elementKey")
    @Column(name="node_key")
    private long nodeKey;
    @Column(name="measure_name")
    private String measureName;
    @Column(name="element_type")
    private String elementType;
    @Column(name="active")
    private int active;
    @Column(name="org_id")
    private long orgId;
    @Column(name="measure_type")
    private int measureType;
    @Column(name="measureKey")
    private Long measureKey;
    @Column(name="dept_id")
    private Long deptId;
    @Column(name="frequency")
    private String frequency;

    public long getOrgId() {
        return this.orgId;
    }

    public void setOrgId(long orgId) {
        this.orgId = orgId;
    }

    public int getActive() {
        return this.active;
    }

    public void setActive(int active) {
        this.active = active;
    }

    public long getNodeKey() {
        return this.nodeKey;
    }

    public void setNodeKey(long nodeKey) {
        this.nodeKey = nodeKey;
    }

    public String getMeasureName() {
        return this.measureName;
    }

    public void setMeasureName(String measureName) {
        this.measureName = measureName;
    }

    public String getElementType() {
        return this.elementType;
    }

    public void setElementType(String elementType) {
        this.elementType = elementType;
    }

    public int getMeasureType() {
        return this.measureType;
    }

    public void setMeasureType(int measureType) {
        this.measureType = measureType;
    }

    public Long getMeasureKey() {
        return this.measureKey;
    }

    public void setMeasureKey(Long measureKey) {
        this.measureKey = measureKey;
    }

    public Long getDeptId() {
        return this.deptId;
    }

    public void setDeptId(Long deptId) {
        this.deptId = deptId;
    }

    public String getFrequency() {
        return this.frequency;
    }

    public void setFrequency(String frequency) {
        this.frequency = frequency;
    }

    public KPIElementDetailsPo() {
    }

    public KPIElementDetailsPo(KPIElementDTO kpiElementDetail) {
        this.active = kpiElementDetail.getActive();
        this.deptId = kpiElementDetail.getDeptId();
        this.elementType = kpiElementDetail.getElementType();
        this.measureKey = kpiElementDetail.getMeasureKey();
        this.measureName = kpiElementDetail.getMeasureName();
        this.measureType = kpiElementDetail.getMeasureType();
        this.nodeKey = kpiElementDetail.getNodeKey();
        this.orgId = kpiElementDetail.getOrgId();
    }
}

