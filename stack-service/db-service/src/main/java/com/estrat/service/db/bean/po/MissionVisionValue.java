/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.MissionVisionValue
 *  com.estrat.service.db.dto.MissionVisionValueDto
 *  com.fasterxml.jackson.core.JsonProcessingException
 *  com.fasterxml.jackson.databind.ObjectMapper
 *  javax.persistence.Column
 *  javax.persistence.Entity
 *  javax.persistence.GeneratedValue
 *  javax.persistence.GenerationType
 *  javax.persistence.Id
 *  javax.persistence.Table
 *  org.hibernate.annotations.GenericGenerator
 */
package com.estrat.service.db.bean.po;

import com.estrat.service.db.dto.MissionVisionValueDto;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name="mision_vision_value", schema="orgstructure")
public class MissionVisionValue {
    @Id
    @GenericGenerator(name="native", strategy="native")
    @GeneratedValue(generator="native", strategy=GenerationType.AUTO)
    @Column(name="ID")
    private long id;
    @Column(name="owner")
    private long owner;
    @Column(name="org_id")
    private long orgId;
    @Column(name="dept_id")
    private Long deptId;
    @Column(name="created_by", updatable=false)
    private long createdBy;
    @Column(name="updated_by")
    private long updatedBy;
    @Column(name="created_time", updatable=false)
    private LocalDateTime createdTime;
    @Column(name="updated_time")
    private LocalDateTime updatedTime;
    @Column(name="missionvisionvalue")
    private String missionvisionvalue;

    public MissionVisionValue() {
    }

    public MissionVisionValue(MissionVisionValueDto mvvDto) {
        this.id = mvvDto.getId();
        this.owner = mvvDto.getOwner();
        this.createdBy = mvvDto.getCreatedBy();
        this.updatedBy = mvvDto.getUpdatedBy();
        this.createdTime = mvvDto.getCreatedTime();
        this.updatedTime = mvvDto.getUpdatedTime();
        this.orgId = mvvDto.getOrgId();
        this.deptId = mvvDto.getDeptId();
        ObjectMapper mapper = new ObjectMapper();
        try {
            this.missionvisionvalue = mapper.writeValueAsString((Object)mvvDto.getMissionvisionvalue());
        }
        catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
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

    public String getMissionvisionvalue() {
        return this.missionvisionvalue;
    }

    public void setMissionvisionvalue(String missionvisionvalue) {
        this.missionvisionvalue = missionvisionvalue;
    }
}

