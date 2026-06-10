/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.Employee
 *  com.estrat.service.db.bean.po.PestelAnalysis
 *  com.estrat.service.db.dto.PestelAnalysisDTO
 *  com.fasterxml.jackson.annotation.JsonInclude
 *  com.fasterxml.jackson.annotation.JsonInclude$Include
 *  com.fasterxml.jackson.databind.ObjectMapper
 *  org.apache.commons.collections4.CollectionUtils
 */
package com.estrat.service.db.dto;

import com.estrat.service.db.bean.Employee;
import com.estrat.service.db.bean.po.PestelAnalysis;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;
import org.apache.commons.collections4.CollectionUtils;

@JsonInclude(value=JsonInclude.Include.NON_NULL)
public class PestelAnalysisDTO {
    private long id;
    private int active = 0;
    private long owner;
    private long createdBy;
    private long updatedBy;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;
    private String flagType;
    private Map<String, Object> pestelAnalysisValue;
    private List<Employee> multipleOwerlist;
    private Long deptId;
    private long pageId;
    private String pageName;
    private String department;
    private boolean recommendationmethod;

    public PestelAnalysisDTO() {
    }

    public PestelAnalysisDTO(PestelAnalysis pestelAnalysis) {
        this.id = pestelAnalysis.getId();
        this.active = pestelAnalysis.getActive();
        this.owner = pestelAnalysis.getOwner();
        this.createdBy = pestelAnalysis.getCreatedBy();
        this.updatedBy = pestelAnalysis.getUpdatedBy();
        this.createdTime = pestelAnalysis.getCreatedTime();
        this.updatedTime = pestelAnalysis.getUpdatedTime();
        this.flagType = pestelAnalysis.getFlagType();
        this.deptId = pestelAnalysis.getDeptId();
        if (pestelAnalysis.getPageId() != null) {
            this.pageId = pestelAnalysis.getPageId().getId();
            this.pageName = pestelAnalysis.getPageId().getPageName();
        }
        ObjectMapper mapper = new ObjectMapper();
        try {
            this.pestelAnalysisValue = (Map)mapper.readValue(pestelAnalysis.getPestelAnalysisValue(), HashMap.class);
        }
        catch (Exception e) {
            throw new RuntimeException(e);
        }
        if (CollectionUtils.isNotEmpty((Collection)pestelAnalysis.getEmployeeList())) {
            this.multipleOwerlist = pestelAnalysis.getEmployeeList().stream().filter(employee -> Objects.nonNull(employee.getId().getEmpId().getOrgId())).map(employee -> new Employee(employee.getId().getEmpId())).collect(Collectors.toList());
        }
    }

    public List<Employee> getMultipleOwerlist() {
        return this.multipleOwerlist;
    }

    public void setMultipleOwerlist(List<Employee> multipleOwerlist) {
        this.multipleOwerlist = multipleOwerlist;
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

    public long getOwner() {
        return this.owner;
    }

    public void setOwner(long owner) {
        this.owner = owner;
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

    public String getFlagType() {
        return this.flagType;
    }

    public void setFlagType(String flagType) {
        this.flagType = flagType;
    }

    public Map<String, Object> getPestelAnalysisValue() {
        return this.pestelAnalysisValue;
    }

    public void setPestelAnalysisValue(Map<String, Object> pestelAnalysisValue) {
        this.pestelAnalysisValue = pestelAnalysisValue;
    }

    public String getPageName() {
        return this.pageName;
    }

    public void setPageName(String pageName) {
        this.pageName = pageName;
    }

    public long getPageId() {
        return this.pageId;
    }

    public void setPageId(long pageId) {
        this.pageId = pageId;
    }

    public Long getDeptId() {
        return this.deptId;
    }

    public void setDeptId(Long deptId) {
        this.deptId = deptId;
    }

    public String getDepartment() {
        return this.department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public boolean isRecommendationmethod() {
        return this.recommendationmethod;
    }

    public void setRecommendationmethod(boolean recommendationmethod) {
        this.recommendationmethod = recommendationmethod;
    }
}

