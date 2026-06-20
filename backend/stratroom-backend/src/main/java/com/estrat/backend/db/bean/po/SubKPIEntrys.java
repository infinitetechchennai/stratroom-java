/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.PerformanceContract
 *  com.estrat.backend.db.bean.po.SubKPIEntrys
 *  com.estrat.backend.db.dto.SubKPIEntrysDTO
 *  javax.persistence.Column
 *  javax.persistence.Entity
 *  javax.persistence.GeneratedValue
 *  javax.persistence.GenerationType
 *  javax.persistence.Id
 *  javax.persistence.JoinColumn
 *  javax.persistence.ManyToOne
 *  javax.persistence.Table
 */
package com.estrat.backend.db.bean.po;

import com.estrat.backend.db.bean.po.PerformanceContract;
import com.estrat.backend.db.dto.SubKPIEntrysDTO;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="org_subkpi_entry", schema="orgstructure")
public class SubKPIEntrys {
    @Id
    @Column(name="id")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private long id;
    @ManyToOne
    @JoinColumn(name="preferenc_id", nullable=false)
    private PerformanceContract preferenceId;
    @Column(name="subkpi_id")
    private long subkpiId;
    @Column(name="subkpi_name")
    private String subkpiName;
    @Column(name="self_rating")
    private int selfRating = 0;
    @Column(name="manager_rating")
    private int managerRating = 0;
    @Column(name="consensual_rating")
    private int consensualRating = 0;

    public SubKPIEntrys() {
    }

    public SubKPIEntrys(SubKPIEntrysDTO subKPIEntrysDTO) {
        this.id = subKPIEntrysDTO.getId();
        this.subkpiId = subKPIEntrysDTO.getSubkpiId();
        this.subkpiName = subKPIEntrysDTO.getSubkpiName();
        this.selfRating = subKPIEntrysDTO.getSelfRating();
        this.managerRating = subKPIEntrysDTO.getManagerRating();
        this.consensualRating = subKPIEntrysDTO.getConsensualRating();
        this.preferenceId = new PerformanceContract();
        this.preferenceId.setId(subKPIEntrysDTO.getPreferenceId());
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getSubkpiId() {
        return this.subkpiId;
    }

    public void setSubkpiId(long subkpiId) {
        this.subkpiId = subkpiId;
    }

    public String getSubkpiName() {
        return this.subkpiName;
    }

    public void setSubkpiName(String subkpiName) {
        this.subkpiName = subkpiName;
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

    public PerformanceContract getPreferenceId() {
        return this.preferenceId;
    }

    public void setPreferenceId(PerformanceContract preferenceId) {
        this.preferenceId = preferenceId;
    }
}

