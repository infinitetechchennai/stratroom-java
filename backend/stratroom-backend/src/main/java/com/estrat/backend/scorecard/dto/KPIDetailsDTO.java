/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.scorecard.dto.KPIDetailsDTO
 *  com.estrat.backend.scorecard.dto.KpiDetailsAttachmentsDTO
 *  com.fasterxml.jackson.annotation.JsonFormat
 *  com.fasterxml.jackson.annotation.JsonFormat$Shape
 *  com.fasterxml.jackson.annotation.JsonInclude
 *  com.fasterxml.jackson.annotation.JsonInclude$Include
 */
package com.estrat.backend.scorecard.dto;

import com.estrat.backend.scorecard.dto.KpiDetailsAttachmentsDTO;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import java.util.Date;
import java.util.List;
import java.util.Map;

@JsonInclude(value=JsonInclude.Include.NON_NULL)
public class KPIDetailsDTO {
    private long orgKpiId;
    private long kpiId;
    private String metricCode;
    private String organizationName;
    private String emailAddress;
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="MMM dd, yyyy")
    private Date realDateFrom;
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="MMM dd, yyyy")
    private Date realDateTo;
    private String monthYear;
    private String financialMonth;
    private String mtdActual;
    private String mtdTarget;
    private String rolling12Actual;
    private String rolling12Budget;
    private String orgKey;
    private String nodeKey;
    private String measureName;
    private String type;
    private String currency;
    private String templateType;
    private String causeOfFailure;
    private long batchId;
    private String comments;
    private List<KpiDetailsAttachmentsDTO> kpiAttachment;
    private String targetYear;
    private long empId;
    private String departmentName;
    private String departmentUniqueId;
    private Long deptId;
    private String subMeasureName;
    private String causeOfFailureBySub;
    private String measureKey;
    private int measureType;
    private String subMtdActual;
    private String subMtdTarget;
    private String subNodeKey;
    private long changeId;
    private Map<String, Object> manualValue;

    public long getBatchId() {
        return this.batchId;
    }

    public void setBatchId(long batchId) {
        this.batchId = batchId;
    }

    public String getCauseOfFailure() {
        return this.causeOfFailure;
    }

    public void setCauseOfFailure(String causeOfFailure) {
        this.causeOfFailure = causeOfFailure;
    }

    public String getTemplateType() {
        return this.templateType;
    }

    public void setTemplateType(String templateType) {
        this.templateType = templateType;
    }

    public String getTargetYear() {
        return this.targetYear;
    }

    public void setTargetYear(String targetYear) {
        this.targetYear = targetYear;
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

    public String getMeasureName() {
        return this.measureName;
    }

    public void setMeasureName(String measureName) {
        this.measureName = measureName;
    }

    public long getOrgKpiId() {
        return this.orgKpiId;
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

    public String getOrgKey() {
        return this.orgKey;
    }

    public void setOrgKey(String orgKey) {
        this.orgKey = orgKey;
    }

    public String getNodeKey() {
        return this.nodeKey;
    }

    public void setNodeKey(String nodeKey) {
        this.nodeKey = nodeKey;
    }

    public long getEmpId() {
        return this.empId;
    }

    public void setEmpId(long empId) {
        this.empId = empId;
    }

    public String getEmailAddress() {
        return this.emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public long getKpiId() {
        return this.kpiId;
    }

    public void setKpiId(long kpiId) {
        this.kpiId = kpiId;
    }

    public String getDepartmentName() {
        return this.departmentName;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }

    public Long getDeptId() {
        return this.deptId;
    }

    public void setDeptId(Long deptId) {
        this.deptId = deptId;
    }

    public String getSubMeasureName() {
        return this.subMeasureName;
    }

    public void setSubMeasureName(String subMeasureName) {
        this.subMeasureName = subMeasureName;
    }

    public String getCauseOfFailureBySub() {
        return this.causeOfFailureBySub;
    }

    public void setCauseOfFailureBySub(String causeOfFailureBySub) {
        this.causeOfFailureBySub = causeOfFailureBySub;
    }

    public String getMeasureKey() {
        return this.measureKey;
    }

    public void setMeasureKey(String measureKey) {
        this.measureKey = measureKey;
    }

    public int getMeasureType() {
        return this.measureType;
    }

    public void setMeasureType(int measureType) {
        this.measureType = measureType;
    }

    public String getSubMtdActual() {
        return this.subMtdActual;
    }

    public void setSubMtdActual(String subMtdActual) {
        this.subMtdActual = subMtdActual;
    }

    public String getSubMtdTarget() {
        return this.subMtdTarget;
    }

    public void setSubMtdTarget(String subMtdTarget) {
        this.subMtdTarget = subMtdTarget;
    }

    public String getSubNodeKey() {
        return this.subNodeKey;
    }

    public void setSubNodeKey(String subNodeKey) {
        this.subNodeKey = subNodeKey;
    }

    public String getDepartmentUniqueId() {
        return this.departmentUniqueId;
    }

    public void setDepartmentUniqueId(String departmentUniqueId) {
        this.departmentUniqueId = departmentUniqueId;
    }

    public String getComments() {
        return this.comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public List<KpiDetailsAttachmentsDTO> getKpiAttachment() {
        return this.kpiAttachment;
    }

    public void setKpiAttachment(List<KpiDetailsAttachmentsDTO> kpiAttachment) {
        this.kpiAttachment = kpiAttachment;
    }

    public long getChangeId() {
        return this.changeId;
    }

    public void setChangeId(long changeId) {
        this.changeId = changeId;
    }

    public Map<String, Object> getManualValue() {
        return this.manualValue;
    }

    public void setManualValue(Map<String, Object> manualValue) {
        this.manualValue = manualValue;
    }
}

