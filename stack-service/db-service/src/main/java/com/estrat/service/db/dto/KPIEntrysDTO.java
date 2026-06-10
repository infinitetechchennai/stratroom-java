/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.KPIEntrys
 *  com.estrat.service.db.dto.KPIEntrysDTO
 */
package com.estrat.service.db.dto;

import com.estrat.service.db.bean.po.KPIEntrys;

public class KPIEntrysDTO {
    private long id;
    private long kpiId;
    private String kpiName;
    private int selfRating;
    private int managerRating;
    private int consensualRating;
    private long preferenceId;

    public KPIEntrysDTO() {
    }

    public KPIEntrysDTO(KPIEntrys kpiEntrys) {
        this.id = kpiEntrys.getId();
        this.kpiId = kpiEntrys.getKpiId();
        this.kpiName = kpiEntrys.getKpiName();
        this.selfRating = kpiEntrys.getSelfRating();
        this.managerRating = kpiEntrys.getManagerRating();
        this.consensualRating = kpiEntrys.getConsensualRating();
        this.preferenceId = kpiEntrys.getPreferenceId().getId();
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getKpiId() {
        return this.kpiId;
    }

    public void setKpiId(long kpiId) {
        this.kpiId = kpiId;
    }

    public String getKpiName() {
        return this.kpiName;
    }

    public void setKpiName(String kpiName) {
        this.kpiName = kpiName;
    }

    public int getSelfRating() {
        return this.selfRating;
    }

    public void setSelfRating(int selfRating) {
        this.selfRating = selfRating;
    }

    public int getManagerRating() {
        return this.managerRating;
    }

    public void setManagerRating(int managerRating) {
        this.managerRating = managerRating;
    }

    public int getConsensualRating() {
        return this.consensualRating;
    }

    public void setConsensualRating(int consensualRating) {
        this.consensualRating = consensualRating;
    }

    public long getPreferenceId() {
        return this.preferenceId;
    }

    public void setPreferenceId(long preferenceId) {
        this.preferenceId = preferenceId;
    }
}

