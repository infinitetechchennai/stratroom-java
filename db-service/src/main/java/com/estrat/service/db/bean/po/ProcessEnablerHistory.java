/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.ProcessEnabler
 *  com.estrat.service.db.bean.po.ProcessEnablerHistory
 *  com.fasterxml.jackson.core.JsonProcessingException
 *  com.fasterxml.jackson.databind.ObjectMapper
 *  javax.persistence.Column
 *  javax.persistence.Entity
 *  javax.persistence.GeneratedValue
 *  javax.persistence.GenerationType
 *  javax.persistence.Id
 *  javax.persistence.Table
 */
package com.estrat.service.db.bean.po;

import com.estrat.service.db.bean.po.ProcessEnabler;
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
@Table(name="processenabler_history", schema="orgstructure")
public class ProcessEnablerHistory {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    @Column(name="pos_id")
    private Long posId;
    @Column(name="posvalues")
    private String posValue;
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
    private Long changeId = 0L;

    public ProcessEnablerHistory() {
    }

    public ProcessEnablerHistory(ProcessEnabler processEnablerDto) {
        this.posId = processEnablerDto.getId();
        this.createBy = processEnablerDto.getCreateBy();
        this.updateBy = processEnablerDto.getUpdateBy();
        this.createTime = processEnablerDto.getCreateTime();
        this.updateTime = processEnablerDto.getUpdateTime();
        this.deptId = processEnablerDto.getDeptId();
        this.owner = processEnablerDto.getOwner();
        this.changeId = processEnablerDto.getChangeId();
        this.version = processEnablerDto.getVersion();
        this.status = processEnablerDto.getStatus();
        Long pageId = processEnablerDto.getPageId().getId();
        if (pageId != null && pageId != 0L) {
            this.pageId = pageId;
        }
        ObjectMapper mapper = new ObjectMapper();
        if (processEnablerDto.getPosValue() != null) {
            try {
                this.posValue = mapper.writeValueAsString((Object)processEnablerDto.getPosValue());
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

    public Long getPosId() {
        return this.posId;
    }

    public void setPosId(Long posId) {
        this.posId = posId;
    }

    public String getPosValue() {
        return this.posValue;
    }

    public void setPosValue(String posValue) {
        this.posValue = posValue;
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

