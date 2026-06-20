/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.KPIDetailsPo
 *  com.estrat.backend.db.bean.po.KpiDetailsAttachments
 *  com.estrat.backend.db.dto.KPIDetailsDTO
 *  javax.persistence.CascadeType
 *  javax.persistence.Column
 *  javax.persistence.Entity
 *  javax.persistence.FetchType
 *  javax.persistence.GeneratedValue
 *  javax.persistence.GenerationType
 *  javax.persistence.Id
 *  javax.persistence.OneToMany
 *  javax.persistence.Table
 *  org.apache.commons.lang3.StringUtils
 *  org.hibernate.annotations.GenericGenerator
 */
package com.estrat.backend.db.bean.po;

import com.estrat.backend.db.bean.po.KpiDetailsAttachments;
import com.estrat.backend.db.dto.KPIDetailsDTO;
import java.math.BigDecimal;
import java.util.Date;
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
import org.apache.commons.lang3.StringUtils;

@Entity
@Table(name="org_kpi_details", schema="orgstructure")
public class KPIDetailsPo {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="org_kpi_id")
    private long orgKpiId;
    @Column(name="metric_code")
    private String metricCode;
    @Column(name="organization_name")
    private String organizationName;
    @Column(name="real_date_from")
    private Date realDateFrom;
    @Column(name="real_date_to")
    private Date realDateTo;
    @Column(name="month_year")
    private String monthYear;
    @Column(name="financial_month")
    private String financialMonth;
    @Column(name="mtd_actual")
    private String mtdActual;
    @Column(name="mtd_target")
    private String mtdTarget;
    @Column(name="rolling_12_actual")
    private String rolling12Actual;
    @Column(name="rolling_12_budget")
    private String rolling12Budget;
    @Column(name="org_key")
    private long orgKey;
    @Column(name="node_key")
    private Long nodeKey;
    @Column(name="uploaded_by")
    private long empId;
    @Column(name="type")
    private String type;
    @Column(name="currency")
    private String currency;
    @Column(name="batch_id")
    private Long batchId;
    @Column(name="dept_id")
    private Long deptId;
    @Column(name="measureType")
    private int measureType;
    @Column(name="measureKey")
    private Long measureKey;
    @Column(name="formData")
    private int formData;
    @OneToMany(mappedBy="kpiDataId", fetch=FetchType.LAZY, cascade={CascadeType.ALL})
    private List<KpiDetailsAttachments> kpiDetailsAttachments;

    public KPIDetailsPo() {
    }

    public KPIDetailsPo(KPIDetailsDTO kpiDetailsDTO) {
        this.empId = kpiDetailsDTO.getEmpId();
        this.financialMonth = StringUtils.trim((String)kpiDetailsDTO.getFinancialMonth());
        this.metricCode = StringUtils.trim((String)kpiDetailsDTO.getMetricCode());
        this.monthYear = StringUtils.trim((String)kpiDetailsDTO.getMonthYear());
        this.mtdActual = StringUtils.trim((String)kpiDetailsDTO.getMtdActual());
        this.mtdTarget = StringUtils.trim((String)kpiDetailsDTO.getMtdTarget());
        if (kpiDetailsDTO.getNodeKey() != null) {
            this.nodeKey = new BigDecimal(StringUtils.trim((String)kpiDetailsDTO.getNodeKey())).longValue();
        }
        this.organizationName = StringUtils.trim((String)kpiDetailsDTO.getOrganizationName());
        this.orgKey = new BigDecimal(StringUtils.trim((String)kpiDetailsDTO.getOrgKey())).longValue();
        this.orgKpiId = kpiDetailsDTO.getOrgKpiId();
        this.realDateFrom = kpiDetailsDTO.getRealDateFrom();
        this.realDateTo = kpiDetailsDTO.getRealDateTo();
        this.rolling12Actual = StringUtils.trim((String)kpiDetailsDTO.getRolling12Actual());
        this.rolling12Budget = StringUtils.trim((String)kpiDetailsDTO.getRolling12Budget());
        this.type = StringUtils.trim((String)kpiDetailsDTO.getType());
        this.currency = StringUtils.trim((String)kpiDetailsDTO.getCurrency());
        this.batchId = kpiDetailsDTO.getBatchId();
        this.measureType = kpiDetailsDTO.getMeasureType();
        if (kpiDetailsDTO.getDeptId() != null) {
            this.deptId = kpiDetailsDTO.getDeptId();
        }
        if (kpiDetailsDTO.getMeasureKey() != null) {
            this.measureKey = new BigDecimal(StringUtils.trim((String)kpiDetailsDTO.getMeasureKey())).longValue();
        }
    }

    public Date getRealDateFrom() {
        return this.realDateFrom;
    }

    public void setRealDateFrom(Date realDateFrom) {
        this.realDateFrom = realDateFrom;
    }

    public Date getRealDateTo() {
        return this.realDateTo;
    }

    public void setRealDateTo(Date realDateTo) {
        this.realDateTo = realDateTo;
    }

    public Long getBatchId() {
        return this.batchId;
    }

    public void setBatchId(Long batchId) {
        this.batchId = batchId;
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

    public long getOrgKpiId() {
        return this.orgKpiId;
    }

    public void setOrgKpiId(long orgKpiId) {
        this.orgKpiId = orgKpiId;
    }

    public String getMetricCode() {
        return this.metricCode;
    }

    public void setMetricCode(String metricCode) {
        this.metricCode = metricCode;
    }

    public String getOrganizationName() {
        return this.organizationName;
    }

    public void setOrganizationName(String organizationName) {
        this.organizationName = organizationName;
    }

    public String getMonthYear() {
        return this.monthYear;
    }

    public void setMonthYear(String monthYear) {
        this.monthYear = monthYear;
    }

    public String getFinancialMonth() {
        return this.financialMonth;
    }

    public void setFinancialMonth(String financialMonth) {
        this.financialMonth = financialMonth;
    }

    public String getMtdActual() {
        return this.mtdActual;
    }

    public void setMtdActual(String mtdActual) {
        this.mtdActual = mtdActual;
    }

    public String getMtdTarget() {
        return this.mtdTarget;
    }

    public void setMtdTarget(String mtdTarget) {
        this.mtdTarget = mtdTarget;
    }

    public String getRolling12Actual() {
        return this.rolling12Actual;
    }

    public void setRolling12Actual(String rolling12Actual) {
        this.rolling12Actual = rolling12Actual;
    }

    public String getRolling12Budget() {
        return this.rolling12Budget;
    }

    public void setRolling12Budget(String rolling12Budget) {
        this.rolling12Budget = rolling12Budget;
    }

    public long getOrgKey() {
        return this.orgKey;
    }

    public void setOrgKey(long orgKey) {
        this.orgKey = orgKey;
    }

    public Long getNodeKey() {
        return this.nodeKey;
    }

    public void setNodeKey(Long nodeKey) {
        this.nodeKey = nodeKey;
    }

    public long getEmpId() {
        return this.empId;
    }

    public void setEmpId(long empId) {
        this.empId = empId;
    }

    public int getMeasureType() {
        return this.measureType;
    }

    public void setMeasureType(int measureType) {
        this.measureType = measureType;
    }

    public Long getMeasureKey() {
        return this.measureKey;
    }

    public void setMeasureKey(Long measureKey) {
        this.measureKey = measureKey;
    }

    public Long getDeptId() {
        return this.deptId;
    }

    public void setDeptId(Long deptId) {
        this.deptId = deptId;
    }

    public int getFormData() {
        return this.formData;
    }

    public void setFormData(int formData) {
        this.formData = formData;
    }
}

