/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.Employee
 *  com.estrat.backend.db.bean.po.SWOTAnalysis
 *  com.estrat.backend.db.dto.SWOTAnalysisDTO
 *  com.fasterxml.jackson.annotation.JsonInclude
 *  com.fasterxml.jackson.annotation.JsonInclude$Include
 *  com.fasterxml.jackson.databind.ObjectMapper
 *  org.apache.commons.collections4.CollectionUtils
 */
package com.estrat.backend.db.dto;

import com.estrat.backend.db.bean.Employee;
import com.estrat.backend.db.bean.po.SWOTAnalysis;
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
public class SWOTAnalysisDTO {
    private long id;
    private int active = 0;
    private long owner;
    private long createdBy;
    private long updatedBy;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;
    private String flagType;
    private Map<String, Object> swotAnalysisValue;
    private List<Employee> multipleOwerlist;
    private Long deptId;
    private boolean recommendationmethod;
    private long pageId;
    private String pageName;
    private String department;

    public SWOTAnalysisDTO() {
    }

    public SWOTAnalysisDTO(SWOTAnalysis swotAnalysis) {
        this.id = swotAnalysis.getId();
        this.active = swotAnalysis.getActive();
        this.owner = swotAnalysis.getOwner();
        this.createdBy = swotAnalysis.getCreatedBy();
        this.updatedBy = swotAnalysis.getUpdatedBy();
        this.createdTime = swotAnalysis.getCreatedTime();
        this.updatedTime = swotAnalysis.getUpdatedTime();
        this.flagType = swotAnalysis.getFlagType();
        this.deptId = swotAnalysis.getDeptId();
        if (swotAnalysis.getPageId() != null) {
            this.pageId = swotAnalysis.getPageId().getId();
            this.pageName = swotAnalysis.getPageId().getPageName();
        }
        ObjectMapper mapper = new ObjectMapper();
        try {
            this.swotAnalysisValue = (Map)mapper.readValue(swotAnalysis.getSwotAnalysisValue(), HashMap.class);
        }
        catch (Exception e) {
            throw new RuntimeException(e);
        }
        if (CollectionUtils.isNotEmpty((Collection)swotAnalysis.getEmployeeList())) {
            this.multipleOwerlist = swotAnalysis.getEmployeeList().stream().filter(employee -> Objects.nonNull(employee.getId().getEmpId().getOrgId())).map(employee -> new Employee(employee.getId().getEmpId())).collect(Collectors.toList());
        }
    }

    public boolean isRecommendationmethod() {
        return this.recommendationmethod;
    }

    public void setRecommendationmethod(boolean recommendationmethod) {
        this.recommendationmethod = recommendationmethod;
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

    public Map<String, Object> getSwotAnalysisValue() {
        return this.swotAnalysisValue;
    }

    public void setSwotAnalysisValue(Map<String, Object> swotAnalysisValue) {
        this.swotAnalysisValue = swotAnalysisValue;
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
}

