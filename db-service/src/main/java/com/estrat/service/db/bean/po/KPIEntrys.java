/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.KPIEntrys
 *  com.estrat.service.db.bean.po.PerformanceContract
 *  com.estrat.service.db.dto.KPIEntrysDTO
 *  javax.persistence.Column
 *  javax.persistence.Entity
 *  javax.persistence.GeneratedValue
 *  javax.persistence.GenerationType
 *  javax.persistence.Id
 *  javax.persistence.JoinColumn
 *  javax.persistence.ManyToOne
 *  javax.persistence.Table
 */
package com.estrat.service.db.bean.po;

import com.estrat.service.db.bean.po.PerformanceContract;
import com.estrat.service.db.dto.KPIEntrysDTO;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="org_kpi_entry", schema="orgstructure")
public class KPIEntrys {
    @Id
    @Column(name="id")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private long id;
    @ManyToOne
    @JoinColumn(name="preferenc_id", nullable=false)
    private PerformanceContract preferenceId;
    @Column(name="kpi_id")
    private long kpiId;
    @Column(name="kpi_name")
    private String kpiName;
    @Column(name="self_rating")
    private int selfRating = 0;
    @Column(name="manager_rating")
    private int managerRating = 0;
    @Column(name="consensual_rating")
    private int consensualRating = 0;

    public KPIEntrys() {
    }

    public KPIEntrys(KPIEntrysDTO kpiEntrys) {
        this.id = kpiEntrys.getId();
        this.kpiId = kpiEntrys.getKpiId();
        this.kpiName = kpiEntrys.getKpiName();
        this.selfRating = kpiEntrys.getSelfRating();
        this.managerRating = kpiEntrys.getManagerRating();
        this.consensualRating = kpiEntrys.getConsensualRating();
        this.preferenceId = new PerformanceContract();
        this.preferenceId.setId(kpiEntrys.getPreferenceId());
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public PerformanceContract getPreferenceId() {
        return this.preferenceId;
    }

    public void setPreferenceId(PerformanceContract preferenceId) {
        this.preferenceId = preferenceId;
    }

    public long getKpiId() {
        return this.kpiId;
    }

    public void setKpiId(long kpiId) {
        this.kpiId = kpiId;
    }

    public String getKpiName() {
        return this.kpiName;
    }

    public void setKpiName(String kpiName) {
        this.kpiName = kpiName;
    }

    public int getSelfRating() {
        return this.selfRating;
    }

    public void setSelfRating(int selfRating) {
        this.selfRating = selfRating;
    }

    public int getManagerRating() {
        return this.managerRating;
    }

    public void setManagerRating(int managerRating) {
        this.managerRating = managerRating;
    }

    public int getConsensualRating() {
        return this.consensualRating;
    }

    public void setConsensualRating(int consensualRating) {
        this.consensualRating = consensualRating;
    }
}

