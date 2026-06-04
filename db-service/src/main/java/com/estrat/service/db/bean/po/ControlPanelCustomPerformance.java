/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.ControlPanelCustomPerformance
 *  com.estrat.service.db.dto.ControlPanelGeneralDTO
 *  com.fasterxml.jackson.databind.ObjectMapper
 *  javax.persistence.Column
 *  javax.persistence.Entity
 *  javax.persistence.GeneratedValue
 *  javax.persistence.Id
 *  javax.persistence.Table
 *  org.hibernate.annotations.GenericGenerator
 */
package com.estrat.service.db.bean.po;

import com.estrat.service.db.dto.ControlPanelGeneralDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name="control_panel_custom_performance", schema="orgstructure")
public class ControlPanelCustomPerformance {
    @Id
    @GenericGenerator(name="customKey", strategy="assigned")
    @GeneratedValue(generator="customKey")
    @Column(name="org_id")
    private long orgId;
    @Column(name="created_by", updatable=false)
    private long createdBy;
    @Column(name="updated_by")
    private long updatedBy;
    @Column(name="created_time", updatable=false)
    private LocalDateTime createdTime;
    @Column(name="updated_time")
    private LocalDateTime updatedTime;
    @Column(name="custom_value")
    private String customValue;
    @Column(name="risksetting")
    private String risksetting;

    public ControlPanelCustomPerformance() {
    }

    public ControlPanelCustomPerformance(ControlPanelGeneralDTO controlPanelGeneral, ControlPanelCustomPerformance customPerformance) {
        this.orgId = controlPanelGeneral.getOrgId();
        this.createdBy = controlPanelGeneral.getCreatedBy();
        this.updatedBy = controlPanelGeneral.getUpdatedBy();
        this.createdTime = controlPanelGeneral.getCreatedTime();
        this.updatedTime = controlPanelGeneral.getUpdatedTime();
        this.risksetting = customPerformance.getRisksetting();
        ObjectMapper mapper = new ObjectMapper();
        try {
            this.customValue = mapper.writeValueAsString((Object)controlPanelGeneral.getGeneralSettingValue());
        }
        catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public long getOrgId() {
        return this.orgId;
    }

    public void setOrgId(long orgId) {
        this.orgId = orgId;
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

    public String getCustomValue() {
        return this.customValue;
    }

    public void setCustomValue(String customValue) {
        this.customValue = customValue;
    }

    public String getRisksetting() {
        return this.risksetting;
    }

    public void setRisksetting(String risksetting) {
        this.risksetting = risksetting;
    }
}

