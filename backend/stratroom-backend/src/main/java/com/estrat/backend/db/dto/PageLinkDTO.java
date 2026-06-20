/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.EmployeePagesLinkDetails
 *  com.estrat.backend.db.dto.PageLinkDTO
 */
package com.estrat.backend.db.dto;

import com.estrat.backend.db.bean.po.EmployeePagesLinkDetails;
import java.time.LocalDateTime;

public class PageLinkDTO {
    private long id;
    private int active = 0;
    private long pageId;
    private String type;
    private long typeId;
    private String typeName;
    private long empId;
    private Long createdBy;
    private Long updatedBy;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;

    public PageLinkDTO() {
    }

    public PageLinkDTO(EmployeePagesLinkDetails pagesLinkDetails) {
        this.id = pagesLinkDetails.getId();
        this.active = pagesLinkDetails.getActive();
        this.pageId = pagesLinkDetails.getPageId();
        this.type = pagesLinkDetails.getType();
        this.typeName = pagesLinkDetails.getTypeName();
        this.typeId = pagesLinkDetails.getTypeId();
        this.empId = pagesLinkDetails.getEmpId();
        this.createdBy = pagesLinkDetails.getCreatedBy();
        this.updatedBy = pagesLinkDetails.getUpdatedBy();
        this.createdTime = pagesLinkDetails.getCreatedTime();
        this.updatedTime = pagesLinkDetails.getUpdatedTime();
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

    public long getPageId() {
        return this.pageId;
    }

    public void setPageId(long pageId) {
        this.pageId = pageId;
    }

    public String getType() {
        return this.type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public long getTypeId() {
        return this.typeId;
    }

    public void setTypeId(long typeId) {
        this.typeId = typeId;
    }

    public String getTypeName() {
        return this.typeName;
    }

    public void setTypeName(String typeName) {
        this.typeName = typeName;
    }

    public long getEmpId() {
        return this.empId;
    }

    public void setEmpId(long empId) {
        this.empId = empId;
    }

    public Long getCreatedBy() {
        return this.createdBy;
    }

    public void setCreatedBy(Long createdBy) {
        this.createdBy = createdBy;
    }

    public Long getUpdatedBy() {
        return this.updatedBy;
    }

    public void setUpdatedBy(Long updatedBy) {
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
}

