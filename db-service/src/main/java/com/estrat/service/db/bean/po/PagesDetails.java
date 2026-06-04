/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.PagesDetails
 *  com.estrat.service.db.dto.PageDTO
 *  javax.persistence.Column
 *  javax.persistence.Entity
 *  javax.persistence.GeneratedValue
 *  javax.persistence.GenerationType
 *  javax.persistence.Id
 *  javax.persistence.Table
 *  org.hibernate.annotations.GenericGenerator
 */
package com.estrat.service.db.bean.po;

import com.estrat.service.db.dto.PageDTO;
import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name="page_details", schema="orgstructure")
public class PagesDetails {
    @Id
    @GenericGenerator(name="native", strategy="native")
    @GeneratedValue(generator="native", strategy=GenerationType.AUTO)
    @Column(name="ID")
    private long id;
    @Column(name="page_name")
    private String pageName;
    @Column(name="page_type")
    private String pageType;
    @Column(name="created_time", updatable=false)
    private LocalDateTime createdTime;
    @Column(name="updated_time")
    private LocalDateTime updatedTime;
    @Column(name="active")
    private int active = 0;
    @Column(name="created_by", updatable=false)
    private long createdBy;
    @Column(name="updated_by")
    private long updatedBy;
    @Column(name="default_page")
    private String defaultPage;
    @Column(name="group_type")
    private String groupType;
    @Column(name="pinned")
    private String pinned;
    @Column(name="dept_id")
    public Long deptId;
    @Column(name="column_type")
    private String columnType;

    public PagesDetails() {
    }

    public PagesDetails(PageDTO pageDTO) {
        this.id = pageDTO.getId();
        this.createdTime = pageDTO.getCreatedTime();
        this.updatedTime = pageDTO.getUpdatedTime();
        this.active = pageDTO.getActive();
        this.createdBy = pageDTO.getCreatedBy();
        this.updatedBy = pageDTO.getUpdatedBy();
        this.pageName = pageDTO.getPageName();
        this.pageType = pageDTO.getPageType();
        this.deptId = pageDTO.getDeptId();
        this.columnType = pageDTO.getColumnType();
        this.groupType = pageDTO.getGroupType();
        this.pinned = pageDTO.getPinned();
    }

    public String getDefaultPage() {
        return this.defaultPage;
    }

    public void setDefaultPage(String defaultPage) {
        this.defaultPage = defaultPage;
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
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

