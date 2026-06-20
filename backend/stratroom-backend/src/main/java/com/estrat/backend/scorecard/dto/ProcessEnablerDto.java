/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.scorecard.dto.ProcessEnablerDto
 *  com.fasterxml.jackson.annotation.JsonInclude
 *  com.fasterxml.jackson.annotation.JsonInclude$Include
 */
package com.estrat.backend.scorecard.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import java.time.LocalDateTime;
import java.util.Map;

@JsonInclude(value=JsonInclude.Include.NON_NULL)
public class ProcessEnablerDto {
    private Long id;
    private Map<String, Object> posValue;
    private long createBy;
    private long updateBy;
    private LocalDateTime createTime;
    private LocalDateTime updateTime;
    private long deptId;
    private long owner;
    private Long pageId;
    private long changeId;
    private String status;
    private Long version;
    private String receivedType;

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

    public Map<String, Object> getPosValue() {
        return this.posValue;
    }

    public void setPosValue(Map<String, Object> posValue) {
        this.posValue = posValue;
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

    public long getChangeId() {
        return this.changeId;
    }

    public void setChangeId(long changeId) {
        this.changeId = changeId;
    }

    public String getStatus() {
        return this.status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Long getVersion() {
        return this.version;
    }

    public void setVersion(Long version) {
        this.version = version;
    }

    public String getReceivedType() {
        return this.receivedType;
    }

    public void setReceivedType(String receivedType) {
        this.receivedType = receivedType;
    }
}

