/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.BudgetDetail
 *  com.estrat.service.db.dto.BudgetDTO
 *  com.fasterxml.jackson.databind.ObjectMapper
 */
package com.estrat.service.db.dto;

import com.estrat.service.db.bean.po.BudgetDetail;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

public class BudgetDTO {
    private Long id;
    private Map<String, Object> budgetValues;
    private long createBy;
    private long updateBy;
    private LocalDateTime createTime;
    private LocalDateTime updateTime;
    private long deptId;
    private long owner;
    private int active = 0;
    private long initiativeId;
    private long subInitiativeId;
    private long activityId;
    private long subActivityId;
    private Long pageId;
    private Long version = 1L;
    private String status = "DRAFT";
    private Long changeId;

    public BudgetDTO() {
    }

    public BudgetDTO(BudgetDetail budget) {
        this.id = budget.getId();
        this.createBy = budget.getCreateBy();
        this.updateBy = budget.getUpdateBy();
        this.createTime = budget.getCreateTime();
        this.updateTime = budget.getUpdateTime();
        this.deptId = budget.getDeptId();
        this.owner = budget.getOwner();
        this.active = budget.getActive();
        this.initiativeId = budget.getInitiativeId();
        this.subInitiativeId = budget.getSubInitiativeId();
        this.activityId = budget.getActivityId();
        this.subActivityId = budget.getSubActivityId();
        this.pageId = budget.getPageId().getId();
        this.version = budget.getVersion();
        this.status = budget.getStatus();
        this.changeId = budget.getChangeId();
        ObjectMapper mapper = new ObjectMapper();
        if (budget.getBudgetValues() != null) {
            try {
                this.budgetValues = (Map)mapper.readValue(budget.getBudgetValues(), HashMap.class);
            }
            catch (Exception e) {
                throw new RuntimeException(e);
            }
        }
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Map<String, Object> getBudgetValues() {
        return this.budgetValues;
    }

    public void setBudgetValues(Map<String, Object> budgetValues) {
        this.budgetValues = budgetValues;
    }

    public long getCreateBy() {
        return this.createBy;
    }

    public void setCreateBy(long createBy) {
        this.createBy = createBy;
    }

    public long getUpdateBy() {
        return this.updateBy;
    }

    public void setUpdateBy(long updateBy) {
        this.updateBy = updateBy;
    }

    public LocalDateTime getCreateTime() {
        return this.createTime;
    }

    public void setCreateTime(LocalDateTime createTime) {
        this.createTime = createTime;
    }

    public LocalDateTime getUpdateTime() {
        return this.updateTime;
    }

    public void setUpdateTime(LocalDateTime updateTime) {
        this.updateTime = updateTime;
    }

    public long getDeptId() {
        return this.deptId;
    }

    public void setDeptId(long deptId) {
        this.deptId = deptId;
    }

    public long getOwner() {
        return this.owner;
    }

    public void setOwner(long owner) {
        this.owner = owner;
    }

    public int getActive() {
        return this.active;
    }

    public void setActive(int active) {
        this.active = active;
    }

    public Long getPageId() {
        return this.pageId;
    }

    public void setPageId(Long pageId) {
        this.pageId = pageId;
    }

    public long getInitiativeId() {
        return this.initiativeId;
    }

    public void setInitiativeId(long initiativeId) {
        this.initiativeId = initiativeId;
    }

    public long getSubInitiativeId() {
        return this.subInitiativeId;
    }

    public void setSubInitiativeId(long subInitiativeId) {
        this.subInitiativeId = subInitiativeId;
    }

    public long getActivityId() {
        return this.activityId;
    }

    public void setActivityId(long activityId) {
        this.activityId = activityId;
    }

    public long getSubActivityId() {
        return this.subActivityId;
    }

    public void setSubActivityId(long subActivityId) {
        this.subActivityId = subActivityId;
    }

    public Long getVersion() {
        return this.version;
    }

    public void setVersion(Long version) {
        this.version = version;
    }

    public String getStatus() {
        return this.status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Long getChangeId() {
        return this.changeId;
    }

    public void setChangeId(Long changeId) {
        this.changeId = changeId;
    }
}

