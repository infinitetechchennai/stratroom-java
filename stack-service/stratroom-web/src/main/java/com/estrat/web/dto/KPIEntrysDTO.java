/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.dto.KPIEntrysDTO
 */
package com.estrat.web.dto;

public class KPIEntrysDTO {
    private long id;
    private long kpiId;
    private String kpiName;
    private int selfRating;
    private int managerRating;
    private int consensualRating;
    private long preferenceId;
    private String types;

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

    public String getTypes() {
        return this.types;
    }

    public void setTypes(String types) {
        this.types = types;
    }
}

