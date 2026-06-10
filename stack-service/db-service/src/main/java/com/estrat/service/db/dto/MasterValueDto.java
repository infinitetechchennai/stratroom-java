/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.MasterValue
 *  com.estrat.service.db.dto.MasterValueDto
 *  com.fasterxml.jackson.annotation.JsonInclude
 *  com.fasterxml.jackson.annotation.JsonInclude$Include
 *  com.fasterxml.jackson.databind.ObjectMapper
 */
package com.estrat.service.db.dto;

import com.estrat.service.db.bean.po.MasterValue;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

@JsonInclude(value=JsonInclude.Include.NON_NULL)
public class MasterValueDto {
    private long id;
    private String name;
    private long department;
    private long createdBy;
    private long updatedBy;
    private LocalDate createdAt;
    private LocalDate updatedAt;
    private String type;
    private Map<String, Object> data;
    private String departmentName;

    public MasterValueDto() {
    }

    public MasterValueDto(MasterValue masterValue) {
        this.id = masterValue.getId();
        this.name = masterValue.getName();
        this.department = masterValue.getDepartment();
        this.createdBy = masterValue.getCreatedBy();
        this.updatedBy = masterValue.getUpdatedBy();
        this.createdAt = masterValue.getCreatedAt();
        this.updatedAt = masterValue.getUpdatedAt();
        this.type = masterValue.getType();
        ObjectMapper mapper = new ObjectMapper();
        try {
            this.data = (Map)mapper.readValue(masterValue.getData(), HashMap.class);
        }
        catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
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

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Map<String, Object> getData() {
        return this.data;
    }

    public void setData(Map<String, Object> data) {
        this.data = data;
    }

    public long getDepartment() {
        return this.department;
    }

    public void setDepartment(long department) {
        this.department = department;
    }

    public LocalDate getCreatedAt() {
        return this.createdAt;
    }

    public void setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDate getUpdatedAt() {
        return this.updatedAt;
    }

    public void setUpdatedAt(LocalDate updatedAt) {
        this.updatedAt = updatedAt;
    }

    public String getType() {
        return this.type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDepartmentName() {
        return this.departmentName;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }
}

