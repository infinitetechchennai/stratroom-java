/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.RpoTable
 *  com.estrat.service.db.bean.po.RpoTableHistory
 *  com.estrat.service.db.dto.RpoTableDto
 *  com.fasterxml.jackson.annotation.JsonInclude
 *  com.fasterxml.jackson.annotation.JsonInclude$Include
 *  com.fasterxml.jackson.databind.ObjectMapper
 */
package com.estrat.service.db.dto;

import com.estrat.service.db.bean.po.RpoTable;
import com.estrat.service.db.bean.po.RpoTableHistory;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@JsonInclude(value=JsonInclude.Include.NON_NULL)
public class RpoTableDto {
    private Long id;
    private Map<String, Object> rpoValues;
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
    private String pageName;
    private String receivedType;

    public RpoTableDto() {
    }

    public RpoTableDto(RpoTable rboTable) {
        this.id = rboTable.getId();
        this.createBy = rboTable.getCreateBy();
        this.updateBy = rboTable.getUpdateBy();
        this.createTime = rboTable.getCreateTime();
        this.updateTime = rboTable.getUpdateTime();
        this.deptId = rboTable.getDeptId();
        this.owner = rboTable.getOwner();
        this.changeId = rboTable.getChangeId();
        this.version = rboTable.getVersion();
        this.status = rboTable.getStatus();
        if (rboTable.getPageId() != null) {
            this.pageId = rboTable.getPageId().getId();
            this.pageName = rboTable.getPageId().getPageName();
        }
        ObjectMapper mapper = new ObjectMapper();
        if (rboTable.getRpoValues() != null) {
            try {
                this.rpoValues = (Map)mapper.readValue(rboTable.getRpoValues(), HashMap.class);
            }
            catch (Exception e) {
                throw new RuntimeException(e);
            }
        }
    }

    public RpoTableDto(RpoTableHistory rboTable) {
        this.id = rboTable.getRpoId();
        this.createBy = rboTable.getCreateBy();
        this.updateBy = rboTable.getUpdateBy();
        this.createTime = rboTable.getCreateTime();
        this.updateTime = rboTable.getUpdateTime();
        this.deptId = rboTable.getDeptId();
        this.owner = rboTable.getOwner();
        this.changeId = rboTable.getChangeId();
        this.version = rboTable.getVersion();
        this.status = rboTable.getStatus();
        if (rboTable.getPageId() != null) {
            this.pageId = rboTable.getPageId();
        }
        ObjectMapper mapper = new ObjectMapper();
        if (rboTable.getRpoValues() != null) {
            try {
                String jsonString = rboTable.getRpoValues();
                if (jsonString.startsWith("\"") && jsonString.endsWith("\"")) {
                    jsonString = (String)mapper.readValue(jsonString, String.class);
                }
                this.rpoValues = (Map)mapper.readValue(jsonString, HashMap.class);
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

    public String getPageName() {
        return this.pageName;
    }

    public void setPageName(String pageName) {
        this.pageName = pageName;
    }

    public Map<String, Object> getRpoValues() {
        return this.rpoValues;
    }

    public void setRpoValues(Map<String, Object> rpoValues) {
        this.rpoValues = rpoValues;
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

