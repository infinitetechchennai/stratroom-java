/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.MissionVisionValue
 *  com.estrat.backend.db.dto.MissionVisionValueDto
 *  com.fasterxml.jackson.databind.ObjectMapper
 */
package com.estrat.backend.db.dto;

import com.estrat.backend.db.bean.po.MissionVisionValue;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import com.estrat.backend.db.util.JsonUtil;

public class MissionVisionValueDto {
    private long id;
    private long owner;
    private long orgId;
    private Long deptId;
    private long createdBy;
    private long updatedBy;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;
    private Map<String, Object> missionvisionvalue;

    public MissionVisionValueDto() {
    }

    public MissionVisionValueDto(MissionVisionValue mvv) {
        this.id = mvv.getId();
        this.owner = mvv.getOwner();
        this.createdBy = mvv.getCreatedBy();
        this.updatedBy = mvv.getUpdatedBy();
        this.createdTime = mvv.getCreatedTime();
        this.updatedTime = mvv.getUpdatedTime();
        this.orgId = mvv.getOrgId();
        this.deptId = mvv.getDeptId();
        this.missionvisionvalue = JsonUtil.parseMap(mvv.getMissionvisionvalue());
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getOwner() {
        return this.owner;
    }

    public void setOwner(long owner) {
        this.owner = owner;
    }

    public long getOrgId() {
        return this.orgId;
    }

    public void setOrgId(long orgId) {
        this.orgId = orgId;
    }

    public Long getDeptId() {
        return this.deptId;
    }

    public void setDeptId(Long deptId) {
        this.deptId = deptId;
    }

    public long getCreatedBy() {
        return this.createdBy;
    }

    public void setCreatedBy(long createdBy) {
        this.createdBy = createdBy;
    }

    public long getUpdatedBy() {
        return this.updatedBy;
    }

    public void setUpdatedBy(long updatedBy) {
        this.updatedBy = updatedBy;
    }

    public LocalDateTime getCreatedTime() {
        return this.createdTime;
    }

    public void setCreatedTime(LocalDateTime createdTime) {
        this.createdTime = createdTime;
    }

    public LocalDateTime getUpdatedTime() {
        return this.updatedTime;
    }

    public void setUpdatedTime(LocalDateTime updatedTime) {
        this.updatedTime = updatedTime;
    }

    public Map<String, Object> getMissionvisionvalue() {
        return this.missionvisionvalue;
    }

    public void setMissionvisionvalue(Map<String, Object> missionvisionvalue) {
        this.missionvisionvalue = missionvisionvalue;
    }
}

