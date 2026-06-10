/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.Master
 *  com.estrat.backend.db.bean.po.MasterValue
 *  com.estrat.backend.db.dto.MasterDto
 *  javax.persistence.CascadeType
 *  javax.persistence.Column
 *  javax.persistence.Entity
 *  javax.persistence.FetchType
 *  javax.persistence.GeneratedValue
 *  javax.persistence.GenerationType
 *  javax.persistence.Id
 *  javax.persistence.OneToMany
 *  javax.persistence.Table
 */
package com.estrat.backend.db.bean.po;

import com.estrat.backend.db.bean.po.MasterValue;
import com.estrat.backend.db.dto.MasterDto;
import java.time.LocalDate;
import java.util.List;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="masters", schema="orgstructure")
public class Master {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private long id;
    @Column(name="master_name")
    private String masterName;
    @Column(name="value")
    private long value;
    @Column(name="created_by")
    private String createdBy;
    @Column(name="update_by")
    private String updateBy;
    @Column(name="created_date")
    private LocalDate createdDate;
    @Column(name="updated_date")
    private LocalDate updateDate;
    @Column(name="department")
    private String departMent;
    @OneToMany(mappedBy="master", fetch=FetchType.LAZY, cascade={CascadeType.ALL})
    private List<MasterValue> masterValue;

    public Master() {
    }

    public Master(MasterDto masterDto) {
        this.id = masterDto.getId();
        this.masterName = masterDto.getMasterName();
        this.value = masterDto.getValue();
        this.createdBy = masterDto.getCreatedBy();
        this.updateBy = masterDto.getUpdateBy();
        this.createdDate = masterDto.getCreatedDate();
        this.updateDate = masterDto.getUpdateDate();
        this.departMent = masterDto.getDepartMent();
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

    public List<MasterValue> getMasterValue() {
        return this.masterValue;
    }

    public void setMasterValue(List<MasterValue> masterValue) {
        this.masterValue = masterValue;
    }
}

