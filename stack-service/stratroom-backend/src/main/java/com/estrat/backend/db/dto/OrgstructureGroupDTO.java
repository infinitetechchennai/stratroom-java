/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.Employee
 *  com.estrat.backend.db.bean.po.OrgstructureGroup
 *  com.estrat.backend.db.dto.OrgstructureGroupDTO
 *  com.fasterxml.jackson.annotation.JsonInclude
 *  com.fasterxml.jackson.annotation.JsonInclude$Include
 *  com.fasterxml.jackson.databind.ObjectMapper
 *  org.apache.commons.collections4.CollectionUtils
 */
package com.estrat.backend.db.dto;

import com.estrat.backend.db.bean.Employee;
import com.estrat.backend.db.bean.po.OrgstructureGroup;
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
import com.estrat.backend.db.util.JsonUtil;

@JsonInclude(value=JsonInclude.Include.NON_NULL)
public class OrgstructureGroupDTO {
    private long id;
    private int active = 0;
    private long owner;
    private long createdBy;
    private long updatedBy;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;
    private Map<String, Object> groupValue;
    private List<Employee> multipleOwerlist;
    private List<Employee> multipleMemberlist;

    public OrgstructureGroupDTO() {
    }

    public OrgstructureGroupDTO(OrgstructureGroup group) {
        this.id = group.getId();
        this.active = group.getActive();
        this.owner = group.getOwner();
        this.createdBy = group.getCreatedBy();
        this.updatedBy = group.getUpdatedBy();
        this.createdTime = group.getCreatedTime();
        this.updatedTime = group.getUpdatedTime();
        this.groupValue = JsonUtil.parseMap(group.getGroupValue());
        if (CollectionUtils.isNotEmpty((Collection)group.getEmployeeList())) {
            this.multipleOwerlist = group.getEmployeeList().stream().filter(employee -> Objects.nonNull(employee.getId().getEmpId().getOrgId())).map(employee -> new Employee(employee.getId().getEmpId())).collect(Collectors.toList());
        }
        if (CollectionUtils.isNotEmpty((Collection)group.getEmployeeMemberList())) {
            this.multipleMemberlist = group.getEmployeeMemberList().stream().filter(employee -> Objects.nonNull(employee.getId().getEmpId().getOrgId())).map(employee -> new Employee(employee.getId().getEmpId())).collect(Collectors.toList());
        }
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

    public Map<String, Object> getGroupValue() {
        return this.groupValue;
    }

    public void setGroupValue(Map<String, Object> groupValue) {
        this.groupValue = groupValue;
    }

    public List<Employee> getMultipleOwerlist() {
        return this.multipleOwerlist;
    }

    public void setMultipleOwerlist(List<Employee> multipleOwerlist) {
        this.multipleOwerlist = multipleOwerlist;
    }

    public List<Employee> getMultipleMemberlist() {
        return this.multipleMemberlist;
    }

    public void setMultipleMemberlist(List<Employee> multipleMemberlist) {
        this.multipleMemberlist = multipleMemberlist;
    }
}

