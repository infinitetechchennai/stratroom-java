/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.RiskCustomScore
 *  com.estrat.backend.db.dto.RiskCustomScoreDto
 */
package com.estrat.backend.db.dto;

import com.estrat.backend.db.bean.po.RiskCustomScore;

public class RiskCustomScoreDto {
    private int id;
    private String description;
    private String score;
    private int priority;

    public RiskCustomScoreDto() {
    }

    public RiskCustomScoreDto(RiskCustomScore riskscore) {
        this.id = riskscore.getId();
        this.score = riskscore.getScore();
        this.description = riskscore.getDescription();
        this.priority = riskscore.getPriority();
    }

    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getScore() {
        return this.score;
    }

    public void setScore(String score) {
        this.score = score;
    }

    public int getPriority() {
        return this.priority;
    }

    public void setPriority(int priority) {
        this.priority = priority;
    }
}

