/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.PagesDetails
 *  com.estrat.service.db.dto.PageDTO
 *  com.fasterxml.jackson.annotation.JsonInclude
 *  com.fasterxml.jackson.annotation.JsonInclude$Include
 */
package com.estrat.service.db.dto;

import com.estrat.service.db.bean.po.PagesDetails;
import com.fasterxml.jackson.annotation.JsonInclude;
import java.time.LocalDateTime;

@JsonInclude(value=JsonInclude.Include.NON_NULL)
public class PageDTO {
    private long id;
    private int active = 0;
    private long createdBy;
    private long updatedBy;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;
    private String pageName;
    private String pageType;
    private Boolean homePgFlag;
    private String groupType;
    private String pinned;
    public Long deptId;
    private String columnType;

    public PageDTO() {
    }

    public PageDTO(PagesDetails pagesDetails) {
        this.id = pagesDetails.getId();
        this.active = pagesDetails.getActive();
        this.createdBy = pagesDetails.getCreatedBy();
        this.updatedBy = pagesDetails.getUpdatedBy();
        this.createdTime = pagesDetails.getCreatedTime();
        this.updatedTime = pagesDetails.getUpdatedTime();
        this.pageName = pagesDetails.getPageName();
        this.pageType = pagesDetails.getPageType();
        this.deptId = pagesDetails.getDeptId();
        this.columnType = pagesDetails.getColumnType();
        this.groupType = pagesDetails.getGroupType();
        this.pinned = pagesDetails.getPinned();
    }

    public String getPageName() {
        return this.pageName;
    }

    public void setPageName(String pageName) {
        this.pageName = pageName;
    }

    public String getPageType() {
        return this.pageType;
    }

    public void setPageType(String pageType) {
        this.pageType = pageType;
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public int getActive() {
        return this.active;
    }

    public void setActive(int active) {
        this.active = active;
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

    public Boolean getHomePgFlag() {
        return this.homePgFlag;
    }

    public void setHomePgFlag(Boolean homePgFlag) {
        this.homePgFlag = homePgFlag;
    }

    public Long getDeptId() {
        return this.deptId;
    }

    public void setDeptId(Long deptId) {
        this.deptId = deptId;
    }

    public String getColumnType() {
        return this.columnType;
    }

    public void setColumnType(String columnType) {
        this.columnType = columnType;
    }

    public String getGroupType() {
        return this.groupType;
    }

    public void setGroupType(String groupType) {
        this.groupType = groupType;
    }

    public String getPinned() {
        return this.pinned;
    }

    public void setPinned(String pinned) {
        this.pinned = pinned;
    }
}

