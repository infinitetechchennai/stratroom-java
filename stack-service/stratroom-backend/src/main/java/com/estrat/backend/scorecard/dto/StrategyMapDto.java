/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.scorecard.dto.StrategyMapDto
 */
package com.estrat.backend.scorecard.dto;

import java.time.LocalDateTime;
import java.util.Map;

public class StrategyMapDto {
    private long id;
    private String strategyMapName;
    private long departmentId;
    private long scoreCardDetailsId;
    private long createdBy;
    private long updateBy;
    private LocalDateTime createAt;
    private LocalDateTime updateAt;
    private Map<String, Object> setting;
    private long pageId;
    private String pageName;
    private String department;
    private Long scorecardPageId;

    public Long getScorecardPageId() {
        return this.scorecardPageId;
    }

    public void setScorecardPageId(Long scorecardPageId) {
        this.scorecardPageId = scorecardPageId;
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getStrategyMapName() {
        return this.strategyMapName;
    }

    public void setStrategyMapName(String strategyMapName) {
        this.strategyMapName = strategyMapName;
    }

    public long getDepartmentId() {
        return this.departmentId;
    }

    public void setDepartmentId(long departmentId) {
        this.departmentId = departmentId;
    }

    public long getScoreCardDetailsId() {
        return this.scoreCardDetailsId;
    }

    public void setScoreCardDetailsId(long scoreCardDetailsId) {
        this.scoreCardDetailsId = scoreCardDetailsId;
    }

    public long getCreatedBy() {
        return this.createdBy;
    }

    public void setCreatedBy(long createdBy) {
        this.createdBy = createdBy;
    }

    public long getUpdateBy() {
        return this.updateBy;
    }

    public void setUpdateBy(long updateBy) {
        this.updateBy = updateBy;
    }

    public LocalDateTime getCreateAt() {
        return this.createAt;
    }

    public void setCreateAt(LocalDateTime createAt) {
        this.createAt = createAt;
    }

    public LocalDateTime getUpdateAt() {
        return this.updateAt;
    }

    public void setUpdateAt(LocalDateTime updateAt) {
        this.updateAt = updateAt;
    }

    public Map<String, Object> getSetting() {
        return this.setting;
    }

    public void setSetting(Map<String, Object> setting) {
        this.setting = setting;
    }

    public long getPageId() {
        return this.pageId;
    }

    public void setPageId(long pageId) {
        this.pageId = pageId;
    }

    public String getPageName() {
        return this.pageName;
    }

    public void setPageName(String pageName) {
        this.pageName = pageName;
    }

    public String getDepartment() {
        return this.department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }
}

