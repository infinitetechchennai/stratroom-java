/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.KPIElementDetailsPo
 *  com.estrat.service.db.dto.KPIElementDTO
 *  com.estrat.service.db.dto.KpiElementPoObject
 */
package com.estrat.service.db.dto;

import com.estrat.service.db.bean.po.KPIElementDetailsPo;
import com.estrat.service.db.dto.KpiElementPoObject;

public class KPIElementDTO {
    private long nodeKey;
    private String measureName;
    private String elementType;
    private int active;
    private long orgId;
    private int measureType;
    private Long measureKey;
    private Long deptId;
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

    public KPIElementDTO(KpiElementPoObject kpiElementDetail) {
        this.active = kpiElementDetail.getActive();
        this.deptId = kpiElementDetail.getDept_id();
        this.elementType = kpiElementDetail.getElement_type();
        this.measureKey = kpiElementDetail.getMeasureKey();
        this.measureName = kpiElementDetail.getMeasure_name();
        this.measureType = kpiElementDetail.getMeasure_type();
        this.nodeKey = kpiElementDetail.getNode_key();
        this.orgId = kpiElementDetail.getOrg_id();
    }

    public KPIElementDTO() {
    }

    public KPIElementDTO(KPIElementDetailsPo kpiElementDetail) {
        this.active = kpiElementDetail.getActive();
        this.deptId = kpiElementDetail.getDeptId();
        this.elementType = kpiElementDetail.getElementType();
        this.measureKey = kpiElementDetail.getMeasureKey();
        this.measureName = kpiElementDetail.getMeasureName();
        this.measureType = kpiElementDetail.getMeasureType();
        this.nodeKey = kpiElementDetail.getNodeKey();
        this.orgId = kpiElementDetail.getOrgId();
        this.frequency = kpiElementDetail.getFrequency();
    }
}

