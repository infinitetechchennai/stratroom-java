/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.Master
 *  com.estrat.service.db.dto.MasterDto
 */
package com.estrat.service.db.dto;

import com.estrat.service.db.bean.po.Master;
import java.time.LocalDate;

public class MasterDto {
    private long id;
    private String masterName;
    private long value;
    private String createdBy;
    private String updateBy;
    private LocalDate createdDate;
    private LocalDate updateDate;
    private String departMent;

    public MasterDto() {
    }

    public MasterDto(Master master) {
        this.id = master.getId();
        this.masterName = master.getMasterName();
        this.value = master.getValue();
        this.createdBy = master.getCreatedBy();
        this.updateBy = master.getUpdateBy();
        this.createdDate = master.getCreatedDate();
        this.updateDate = master.getUpdateDate();
        this.departMent = master.getDepartMent();
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getMasterName() {
        return this.masterName;
    }

    public void setMasterName(String masterName) {
        this.masterName = masterName;
    }

    public long getValue() {
        return this.value;
    }

    public void setValue(long value) {
        this.value = value;
    }

    public String getCreatedBy() {
        return this.createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public String getUpdateBy() {
        return this.updateBy;
    }

    public void setUpdateBy(String updateBy) {
        this.updateBy = updateBy;
    }

    public LocalDate getCreatedDate() {
        return this.createdDate;
    }

    public void setCreatedDate(LocalDate createdDate) {
        this.createdDate = createdDate;
    }

    public LocalDate getUpdateDate() {
        return this.updateDate;
    }

    public void setUpdateDate(LocalDate updateDate) {
        this.updateDate = updateDate;
    }

    public String getDepartMent() {
        return this.departMent;
    }

    public void setDepartMent(String departMent) {
        this.departMent = departMent;
    }
}

