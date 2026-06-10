/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.KpiTargetDetailsPo
 *  com.estrat.backend.db.bean.po.KpiTargetEmbeddedId
 *  com.estrat.backend.db.dto.KPIDetailsDTO
 *  javax.persistence.Column
 *  javax.persistence.EmbeddedId
 *  javax.persistence.Entity
 *  javax.persistence.Table
 *  org.apache.commons.lang3.StringUtils
 */
package com.estrat.backend.db.bean.po;

import com.estrat.backend.db.bean.po.KpiTargetEmbeddedId;
import com.estrat.backend.db.dto.KPIDetailsDTO;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import org.apache.commons.lang3.StringUtils;

@Entity
@Table(name="kpi_target_details", schema="orgstructure")
public class KpiTargetDetailsPo {
    @EmbeddedId
    private KpiTargetEmbeddedId id;
    @Column(name="kpi_name")
    private String kpiName;
    @Column(name="org_id")
    private long orgKey;
    @Column(name="organization_name")
    private String organizationName;
    @Column(name="mtd_target")
    private String mtdTarget;
    @Column(name="uploaded_by")
    private long empId;
    @Column(name="type")
    private String type;
    @Column(name="currency")
    private String currency;
    @Column(name="created_time", updatable=false)
    private LocalDateTime createdTime;
    @Column(name="updated_time")
    private LocalDateTime updatedTime;
    @Column(name="batch_id")
    private Long batchId;

    public KpiTargetDetailsPo() {
    }

    public KpiTargetDetailsPo(KPIDetailsDTO kpiDetailsDTO) {
        KpiTargetEmbeddedId embeddedId = new KpiTargetEmbeddedId();
        embeddedId.setKpiId(kpiDetailsDTO.getKpiId());
        embeddedId.setYear(new BigDecimal(StringUtils.trim((String)kpiDetailsDTO.getTargetYear())).longValue());
        this.id = embeddedId;
        this.kpiName = kpiDetailsDTO.getMeasureName();
        this.orgKey = new BigDecimal(StringUtils.trim((String)kpiDetailsDTO.getOrgKey())).longValue();
        this.organizationName = StringUtils.trim((String)kpiDetailsDTO.getOrganizationName());
        this.mtdTarget = StringUtils.trim((String)kpiDetailsDTO.getMtdTarget());
        this.type = StringUtils.trim((String)kpiDetailsDTO.getType());
        this.currency = StringUtils.trim((String)kpiDetailsDTO.getCurrency());
        this.empId = kpiDetailsDTO.getEmpId();
        this.batchId = kpiDetailsDTO.getBatchId();
    }

    public KpiTargetEmbeddedId getId() {
        return this.id;
    }

    public void setId(KpiTargetEmbeddedId id) {
        this.id = id;
    }

    public Long getBatchId() {
        return this.batchId;
    }

    public void setBatchId(Long batchId) {
        this.batchId = batchId;
    }

    public String getKpiName() {
        return this.kpiName;
    }

    public void setKpiName(String kpiName) {
        this.kpiName = kpiName;
    }

    public long getOrgKey() {
        return this.orgKey;
    }

    public void setOrgKey(long orgKey) {
        this.orgKey = orgKey;
    }

    public String getOrganizationName() {
        return this.organizationName;
    }

    public void setOrganizationName(String organizationName) {
        this.organizationName = organizationName;
    }

    public String getMtdTarget() {
        return this.mtdTarget;
    }

    public void setMtdTarget(String mtdTarget) {
        this.mtdTarget = mtdTarget;
    }

    public long getEmpId() {
        return this.empId;
    }

    public void setEmpId(long empId) {
        this.empId = empId;
    }

    public String getType() {
        return this.type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getCurrency() {
        return this.currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
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

