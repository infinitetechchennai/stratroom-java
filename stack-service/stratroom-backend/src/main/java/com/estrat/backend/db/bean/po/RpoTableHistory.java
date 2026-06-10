/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.RpoTable
 *  com.estrat.backend.db.bean.po.RpoTableHistory
 *  com.fasterxml.jackson.core.JsonProcessingException
 *  com.fasterxml.jackson.databind.ObjectMapper
 *  javax.persistence.Column
 *  javax.persistence.Entity
 *  javax.persistence.GeneratedValue
 *  javax.persistence.GenerationType
 *  javax.persistence.Id
 *  javax.persistence.Table
 */
package com.estrat.backend.db.bean.po;

import com.estrat.backend.db.bean.po.RpoTable;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="rpo_history", schema="orgstructure")
public class RpoTableHistory {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    @Column(name="rpo_id")
    private Long rpoId;
    @Column(name="rpovalues")
    private String rpoValues;
    @Column(name="create_by")
    private long createBy;
    @Column(name="update_by")
    private long updateBy;
    @Column(name="create_time")
    private LocalDateTime createTime;
    @Column(name="update_time")
    private LocalDateTime updateTime;
    @Column(name="deptid")
    private long deptId;
    @Column(name="owner")
    private long owner;
    @Column(name="page_id")
    private Long pageId;
    @Column(name="version", nullable=false)
    private Long version = 1L;
    @Column(name="status", nullable=false)
    private String status = "DRAFT";
    @Column(name="change_id")
    private Long changeId;

    public RpoTableHistory() {
    }

    public RpoTableHistory(RpoTable rpoTableDto) {
        this.rpoId = rpoTableDto.getId();
        this.createBy = rpoTableDto.getCreateBy();
        this.updateBy = rpoTableDto.getUpdateBy();
        this.createTime = rpoTableDto.getCreateTime();
        this.updateTime = rpoTableDto.getUpdateTime();
        this.deptId = rpoTableDto.getDeptId();
        this.owner = rpoTableDto.getOwner();
        this.changeId = rpoTableDto.getChangeId();
        this.version = rpoTableDto.getVersion();
        this.status = rpoTableDto.getStatus();
        Long pageId = rpoTableDto.getPageId().getId();
        if (pageId != null && pageId != 0L) {
            this.pageId = pageId;
        }
        ObjectMapper mapper = new ObjectMapper();
        if (rpoTableDto.getRpoValues() != null) {
            try {
                this.rpoValues = mapper.writeValueAsString((Object)rpoTableDto.getRpoValues());
            }
            catch (JsonProcessingException e) {
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

    public Long getRpoId() {
        return this.rpoId;
    }

    public void setRpoId(Long rpoId) {
        this.rpoId = rpoId;
    }

    public String getRpoValues() {
        return this.rpoValues;
    }

    public void setRpoValues(String rpoValues) {
        this.rpoValues = rpoValues;
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

    public Long getPageId() {
        return this.pageId;
    }

    public void setPageId(Long pageId) {
        this.pageId = pageId;
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

