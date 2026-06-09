/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.scorecard.dto.SubKPIEntrysDTO
 */
package com.estrat.scorecard.dto;

public class SubKPIEntrysDTO {
    private long id;
    private long subkpiId;
    private String subkpiName;
    private int selfRating;
    private int managerRating;
    private int consensualRating;
    private long preferenceId;

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getSubkpiId() {
        return this.subkpiId;
    }

    public void setSubkpiId(long subkpiId) {
        this.subkpiId = subkpiId;
    }

    public String getSubkpiName() {
        return this.subkpiName;
    }

    public void setSubkpiName(String subkpiName) {
        this.subkpiName = subkpiName;
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

