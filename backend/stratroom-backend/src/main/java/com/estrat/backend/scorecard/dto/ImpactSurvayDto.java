/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.scorecard.dto.ImpactDataDto
 *  com.estrat.backend.scorecard.dto.ImpactSurvayDto
 *  com.fasterxml.jackson.annotation.JsonInclude
 *  com.fasterxml.jackson.annotation.JsonInclude$Include
 */
package com.estrat.backend.scorecard.dto;

import com.estrat.backend.scorecard.dto.ImpactDataDto;
import com.fasterxml.jackson.annotation.JsonInclude;
import java.time.LocalDateTime;
import java.util.List;

@JsonInclude(value=JsonInclude.Include.NON_NULL)
public class ImpactSurvayDto {
    private Long id;
    private List<String> process;
    private String justificationForCritical;
    private List<ImpactDataDto> impactData;
    private LocalDateTime createTime;
    private LocalDateTime updateTime;
    private Long createBy;
    private Long updateBy;
    private long departmentId;
    private long owner;
    private long pageId;
    private String pageName;
    private String deptUniqueID;
    private String createrName;
    private String updaterName;
    private long changeId;

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<String> getProcess() {
        return this.process;
    }

    public void setProcess(List<String> process) {
        this.process = process;
    }

    public String getJustificationForCritical() {
        return this.justificationForCritical;
    }

    public void setJustificationForCritical(String justificationForCritical) {
        this.justificationForCritical = justificationForCritical;
    }

    public List<ImpactDataDto> getImpactData() {
        return this.impactData;
    }

    public void setImpactData(List<ImpactDataDto> impactData) {
        this.impactData = impactData;
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

    public Long getCreateBy() {
        return this.createBy;
    }

    public void setCreateBy(Long createBy) {
        this.createBy = createBy;
    }

    public Long getUpdateBy() {
        return this.updateBy;
    }

    public void setUpdateBy(Long updateBy) {
        this.updateBy = updateBy;
    }

    public long getDepartmentId() {
        return this.departmentId;
    }

    public void setDepartmentId(long departmentId) {
        this.departmentId = departmentId;
    }

    public long getOwner() {
        return this.owner;
    }

    public void setOwner(long owner) {
        this.owner = owner;
    }

    public long getPageId() {
        return this.pageId;
    }

    public void setPageId(long pageId) {
        this.pageId = pageId;
    }

    public String getPageName() {
        return this.pageName;
    }

    public void setPageName(String pageName) {
        this.pageName = pageName;
    }

    public String getDeptUniqueID() {
        return this.deptUniqueID;
    }

    public void setDeptUniqueID(String deptUniqueID) {
        this.deptUniqueID = deptUniqueID;
    }

    public String getCreaterName() {
        return this.createrName;
    }

    public void setCreaterName(String createrName) {
        this.createrName = createrName;
    }

    public String getUpdaterName() {
        return this.updaterName;
    }

    public void setUpdaterName(String updaterName) {
        this.updaterName = updaterName;
    }

    public long getChangeId() {
        return this.changeId;
    }

    public void setChangeId(long changeId) {
        this.changeId = changeId;
    }
}

