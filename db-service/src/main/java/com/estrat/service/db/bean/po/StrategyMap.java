/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.PagesDetails
 *  com.estrat.service.db.bean.po.StrategyMap
 *  com.estrat.service.db.dto.StrategyMapDto
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
package com.estrat.service.db.bean.po;

import com.estrat.service.db.bean.po.PagesDetails;
import com.estrat.service.db.dto.StrategyMapDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import java.util.Objects;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="strategy_map", schema="orgstructure")
public class StrategyMap {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private long id;
    @Column(name="name")
    private String strategyMapName;
    @Column(name="department_id")
    private long departmentId;
    @Column(name="scorecard_detail_id")
    private long scoreCardDetailsId;
    @Column(name="created_by")
    private long createdBy;
    @Column(name="update_by")
    private long updateBy;
    @Column(name="create_at")
    private LocalDateTime createAt;
    @Column(name="update_at")
    private LocalDateTime updateAt;
    @Column(name="setting")
    private String setting;
    @ManyToOne
    @JoinColumn(name="page_id", nullable=true)
    private PagesDetails pageId;

    public StrategyMap() {
    }

    public StrategyMap(StrategyMapDto strategyMapDto) {
        this.id = strategyMapDto.getId();
        this.strategyMapName = strategyMapDto.getStrategyMapName();
        this.departmentId = strategyMapDto.getDepartmentId();
        this.scoreCardDetailsId = strategyMapDto.getScorecardPageId();
        this.createdBy = strategyMapDto.getCreatedBy();
        this.updateBy = strategyMapDto.getUpdateBy();
        this.createAt = strategyMapDto.getCreateAt();
        this.updateAt = strategyMapDto.getUpdateAt();
        if (strategyMapDto.getPageId() != 0L) {
            PagesDetails pageDetails = new PagesDetails();
            pageDetails.setId(strategyMapDto.getPageId());
            this.pageId = pageDetails;
        }
        ObjectMapper mapper = new ObjectMapper();
        try {
            this.setting = mapper.writeValueAsString((Object)strategyMapDto.getSetting());
        }
        catch (Exception e) {
            throw new RuntimeException(e);
        }
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

    public String getSetting() {
        return this.setting;
    }

    public void setSetting(String setting) {
        this.setting = setting;
    }

    public PagesDetails getPageId() {
        return this.pageId;
    }

    public void setPageId(PagesDetails pageId) {
        this.pageId = pageId;
    }

    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof StrategyMap)) {
            return false;
        }
        StrategyMap that = (StrategyMap)o;
        return Objects.equals(this.getId(), that.getId());
    }

    public int hashCode() {
        return Objects.hash(this.getId());
    }
}

