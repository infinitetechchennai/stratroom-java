/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.BudgetDetail
 *  com.estrat.backend.db.bean.po.PagesDetails
 *  com.estrat.backend.db.dto.BudgetDTO
 *  com.fasterxml.jackson.databind.ObjectMapper
 *  javax.persistence.Column
 *  javax.persistence.Entity
 *  javax.persistence.GeneratedValue
 *  javax.persistence.GenerationType
 *  javax.persistence.Id
 *  javax.persistence.JoinColumn
 *  javax.persistence.ManyToOne
 *  javax.persistence.Table
 */
package com.estrat.backend.db.bean.po;

import com.estrat.backend.db.bean.po.PagesDetails;
import com.estrat.backend.db.dto.BudgetDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="budget_detail", schema="orgstructure")
public class BudgetDetail {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    @Column(name="budgetvalues")
    private String budgetValues;
    @Column(name="create_by", updatable=false)
    private long createBy;
    @Column(name="update_by")
    private long updateBy;
    @Column(name="create_time", updatable=false)
    private LocalDateTime createTime;
    @Column(name="update_time")
    private LocalDateTime updateTime;
    @Column(name="deptid")
    private long deptId;
    @Column(name="owner")
    private long owner;
    @Column(name="active")
    private int active = 0;
    @Column(name="initiative_id")
    private long initiativeId;
    @Column(name="subinitiative_id")
    private long subInitiativeId;
    @Column(name="activity_id")
    private long activityId;
    @Column(name="subactivity_id")
    private long subActivityId;
    @ManyToOne
    @JoinColumn(name="page_id", nullable=true)
    private PagesDetails pageId;
    @Column(name="version", nullable=false)
    private Long version = 1L;
    @Column(name="status", nullable=false)
    private String status = "DRAFT";
    @Column(name="change_id")
    private Long changeId;

    public BudgetDetail() {
    }

    public BudgetDetail(BudgetDTO budgetDto) {
        Long pageId;
        this.id = budgetDto.getId();
        this.createBy = budgetDto.getCreateBy();
        this.updateBy = budgetDto.getUpdateBy();
        this.createTime = budgetDto.getCreateTime();
        this.updateTime = budgetDto.getUpdateTime();
        this.deptId = budgetDto.getDeptId();
        this.owner = budgetDto.getOwner();
        this.active = budgetDto.getActive();
        this.initiativeId = budgetDto.getInitiativeId();
        this.subInitiativeId = budgetDto.getSubInitiativeId();
        this.activityId = budgetDto.getActivityId();
        this.subActivityId = budgetDto.getSubActivityId();
        this.version = budgetDto.getVersion();
        if (budgetDto.getChangeId() != null) {
            this.changeId = budgetDto.getChangeId();
        }
        if ((pageId = budgetDto.getPageId()) != null && pageId != 0L) {
            PagesDetails pagesDetails = new PagesDetails();
            pagesDetails.setId(budgetDto.getPageId().longValue());
            this.pageId = pagesDetails;
        }
        ObjectMapper mapper = new ObjectMapper();
        if (budgetDto.getBudgetValues() != null) {
            try {
                this.budgetValues = mapper.writeValueAsString((Object)budgetDto.getBudgetValues());
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

    public String getBudgetValues() {
        return this.budgetValues;
    }

    public void setBudgetValues(String budgetValues) {
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

    public PagesDetails getPageId() {
        return this.pageId;
    }

    public void setPageId(PagesDetails pageId) {
        this.pageId = pageId;
    }

    public int getActive() {
        return this.active;
    }

    public void setActive(int active) {
        this.active = active;
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

    public String toString() {
        return "BudgetDetail [id=" + this.id + ", budgetValues=" + this.budgetValues + ", createBy=" + this.createBy + ", updateBy=" + this.updateBy + ", createTime=" + this.createTime + ", updateTime=" + this.updateTime + ", deptId=" + this.deptId + ", owner=" + this.owner + ", active=" + this.active + ", initiativeId=" + this.initiativeId + ", subInitiativeId=" + this.subInitiativeId + ", activityId=" + this.activityId + ", subActivityId=" + this.subActivityId + ", pageId=" + this.pageId + ", version=" + this.version + ", status=" + this.status + ", changeId=" + this.changeId + "]";
    }
}

