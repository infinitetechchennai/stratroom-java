/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.dto.KPIElementDTO
 */
package com.estrat.web.dto;

public class KPIElementDTO {
    private long nodeKey;
    private String measureName;
    private String elementType;
    private int active;
    private long orgId;
    private int measureType;
    private Long measureKey;
    private Long deptId;

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
}

