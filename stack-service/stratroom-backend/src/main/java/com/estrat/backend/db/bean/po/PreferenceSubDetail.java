/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.ChartDetails
 *  com.estrat.backend.db.bean.po.DashBoardPreferences
 *  com.estrat.backend.db.bean.po.PreferenceSubDetail
 *  com.estrat.backend.db.dto.PreferenceDTO
 *  com.fasterxml.jackson.annotation.JsonIgnoreProperties
 *  com.fasterxml.jackson.core.JsonProcessingException
 *  com.fasterxml.jackson.databind.ObjectMapper
 *  javax.persistence.Column
 *  javax.persistence.Entity
 *  javax.persistence.GeneratedValue
 *  javax.persistence.GenerationType
 *  javax.persistence.Id
 *  javax.persistence.JoinColumn
 *  javax.persistence.ManyToOne
 *  javax.persistence.Table
 *  org.hibernate.annotations.GenericGenerator
 */
package com.estrat.backend.db.bean.po;

import com.estrat.backend.db.bean.po.ChartDetails;
import com.estrat.backend.db.bean.po.DashBoardPreferences;
import com.estrat.backend.db.dto.PreferenceDTO;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import org.hibernate.annotations.GenericGenerator;

@JsonIgnoreProperties(ignoreUnknown=true)
@Entity
@Table(name="preference_sub_detail", schema="orgstructure")
public class PreferenceSubDetail {
    @Id
    @GenericGenerator(name="native", strategy="native")
    @GeneratedValue(generator="native", strategy=GenerationType.AUTO)
    @Column(name="ID")
    private long id;
    @ManyToOne
    @JoinColumn(name="daskhboard_id")
    private DashBoardPreferences daskboardId;
    @ManyToOne
    @JoinColumn(name="chart_id")
    private ChartDetails chartId;
    @Column(name="record_id")
    private long recordId;
    @Column(name="record_type")
    private String recordType;
    @Column(name="preference_value")
    private String preferenceValue;

    public PreferenceSubDetail() {
    }

    public PreferenceSubDetail(PreferenceDTO preferenceDTO) {
        this.id = preferenceDTO.getId();
        if (preferenceDTO.getDaskboardId() != 0L) {
            DashBoardPreferences daskDetails = new DashBoardPreferences();
            daskDetails.setId(preferenceDTO.getDaskboardId());
            this.daskboardId = daskDetails;
        }
        if (preferenceDTO.getChartId() != 0L) {
            ChartDetails chartDetails = new ChartDetails();
            chartDetails.setId(preferenceDTO.getChartId());
            this.chartId = chartDetails;
        }
        this.recordId = preferenceDTO.getRecordId();
        this.recordType = preferenceDTO.getRecordType();
        ObjectMapper mapper = new ObjectMapper();
        try {
            this.preferenceValue = mapper.writeValueAsString((Object)preferenceDTO.getPreferenceValue());
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

    public DashBoardPreferences getDaskboardId() {
        return this.daskboardId;
    }

    public void setDaskboardId(DashBoardPreferences daskboardId) {
        this.daskboardId = daskboardId;
    }

    public long getRecordId() {
        return this.recordId;
    }

    public void setRecordId(long recordId) {
        this.recordId = recordId;
    }

    public String getRecordType() {
        return this.recordType;
    }

    public void setRecordType(String recordType) {
        this.recordType = recordType;
    }

    public String getPreferenceValue() {
        return this.preferenceValue;
    }

    public void setPreferenceValue(String preferenceValue) {
        this.preferenceValue = preferenceValue;
    }

    public ChartDetails getChartId() {
        return this.chartId;
    }

    public void setChartId(ChartDetails chartId) {
        this.chartId = chartId;
    }
}

