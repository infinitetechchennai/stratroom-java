/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.dto.KPIDTO
 *  com.estrat.web.dto.KPIEntrysDTO
 *  com.estrat.web.dto.KPIFormula
 *  com.estrat.web.dto.SubKPIDTO
 *  com.fasterxml.jackson.annotation.JsonIgnore
 *  com.fasterxml.jackson.annotation.JsonInclude
 *  com.fasterxml.jackson.annotation.JsonInclude$Include
 *  org.apache.commons.lang3.StringUtils
 */
package com.estrat.web.dto;

import com.estrat.web.dto.KPIEntrysDTO;
import com.estrat.web.dto.KPIFormula;
import com.estrat.web.dto.SubKPIDTO;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.apache.commons.lang3.StringUtils;

@JsonInclude(value=JsonInclude.Include.NON_NULL)
public class KPIDTO {
    private long id;
    private long createdBy;
    private String createDateString;
    private String kpiName;
    private String updatedDateString;
    private KPIFormula kpiFormula;
    private long updatedBy;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;
    private Map<String, Object> kpiValue;
    private int active;
    private long owner;
    private long objectiveId;
    private String kpiId;
    public boolean includeReportee;
    public String customReportees;
    private Date startDate;
    private Date endDate;
    private int actType;
    public boolean thresholdvalueupdate;
    private List<SubKPIDTO> subKpiList;
    private KPIEntrysDTO kpiEntrysDTO;
    @JsonIgnore
    private Map<String, SubKPIDTO> subkpiMap;

    public String getKpiName() {
        return this.kpiName;
    }

    public void setKpiName(String kpiName) {
        this.kpiName = kpiName;
    }

    public String getCreateDateString() {
        return this.createDateString;
    }

    public void setCreateDateString(String createDateString) {
        this.createDateString = createDateString;
    }

    public String getUpdatedDateString() {
        return this.updatedDateString;
    }

    public void setUpdatedDateString(String updatedDateString) {
        this.updatedDateString = updatedDateString;
    }

    public KPIFormula getKpiFormula() {
        if (this.kpiFormula == null) {
            this.kpiFormula = new KPIFormula();
        }
        return this.kpiFormula;
    }

    public void setKpiFormula(KPIFormula kpiFormula) {
        this.kpiFormula = kpiFormula;
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

    public Map<String, Object> getKpiValue() {
        if (this.kpiValue == null) {
            this.kpiValue = new HashMap();
        }
        return this.kpiValue;
    }

    public void setKpiValue(Map<String, Object> kpiValue) {
        this.kpiValue = kpiValue;
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public int getActive() {
        return this.active;
    }

    public void setActive(int active) {
        this.active = active;
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

    public long getOwner() {
        return this.owner;
    }

    public void setOwner(long owner) {
        this.owner = owner;
    }

    public long getObjectiveId() {
        return this.objectiveId;
    }

    public void setObjectiveId(long objectiveId) {
        this.objectiveId = objectiveId;
    }

    public String getKpiId() {
        return this.kpiId;
    }

    public void setKpiId(String kpiId) {
        this.kpiId = kpiId;
    }

    public boolean isIncludeReportee() {
        return this.includeReportee;
    }

    public void setIncludeReportee(boolean includeReportee) {
        this.includeReportee = includeReportee;
    }

    public String getCustomReportees() {
        return this.customReportees;
    }

    public void setCustomReportees(String customReportees) {
        this.customReportees = customReportees;
    }

    @JsonIgnore
    public boolean isStatusRed() {
        String status = this.getKpiValue().get("statusLight") != null && StringUtils.isNotEmpty((CharSequence)this.getKpiValue().get("statusLight").toString()) ? this.getKpiValue().get("statusLight").toString() : "";
        return status.contains("red");
    }

    public Date getStartDate() {
        return this.startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return this.endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public int getActType() {
        return this.actType;
    }

    public void setActType(int actType) {
        this.actType = actType;
    }

    public boolean isThresholdvalueupdate() {
        return this.thresholdvalueupdate;
    }

    public void setThresholdvalueupdate(boolean thresholdvalueupdate) {
        this.thresholdvalueupdate = thresholdvalueupdate;
    }

    public List<SubKPIDTO> getSubKpiList() {
        return this.subKpiList;
    }

    public void setSubKpiList(List<SubKPIDTO> subKpiList) {
        this.subKpiList = subKpiList;
    }

    public Map<String, SubKPIDTO> getSubkpiMap() {
        if (this.subkpiMap == null) {
            this.subkpiMap = new HashMap();
        }
        return this.subkpiMap;
    }

    public void setSubkpiMap(Map<String, SubKPIDTO> subkpiMap) {
        this.subkpiMap = subkpiMap;
    }

    public KPIEntrysDTO getKpiEntrysDTO() {
        return this.kpiEntrysDTO;
    }

    public void setKpiEntrysDTO(KPIEntrysDTO kpiEntrysDTO) {
        this.kpiEntrysDTO = kpiEntrysDTO;
    }
}

