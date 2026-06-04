/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.PagesDetails
 *  com.estrat.service.db.bean.po.RpoTable
 *  com.estrat.service.db.dto.RpoTableDto
 *  com.fasterxml.jackson.core.JsonProcessingException
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
import com.estrat.service.db.dto.RpoTableDto;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="rpo", schema="orgstructure")
public class RpoTable {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
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
    @ManyToOne
    @JoinColumn(name="page_id", nullable=true)
    private PagesDetails pageId;
    @Column(name="version", nullable=false)
    private Long version = 1L;
    @Column(name="status", nullable=false)
    private String status = "DRAFT";
    @Column(name="change_id")
    private Long changeId = 0L;

    public RpoTable() {
    }

    public RpoTable(RpoTableDto rpoTableDto) {
        this.id = rpoTableDto.getId();
        this.createBy = rpoTableDto.getCreateBy();
        this.updateBy = rpoTableDto.getUpdateBy();
        this.createTime = rpoTableDto.getCreateTime();
        this.updateTime = rpoTableDto.getUpdateTime();
        this.deptId = rpoTableDto.getDeptId();
        this.owner = rpoTableDto.getOwner();
        this.changeId = rpoTableDto.getChangeId();
        this.version = rpoTableDto.getVersion();
        this.status = rpoTableDto.getStatus();
        Long pageId = rpoTableDto.getPageId();
        if (pageId != null && pageId != 0L) {
            PagesDetails pagesDetails = new PagesDetails();
            pagesDetails.setId(rpoTableDto.getPageId().longValue());
            this.pageId = pagesDetails;
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

    public String getRpoValues() {
        return this.rpoValues;
    }

    public void setRpoValues(String rpoValues) {
        this.rpoValues = rpoValues;
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

