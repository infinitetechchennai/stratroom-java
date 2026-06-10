/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.EmployeeDocuments
 *  com.estrat.backend.db.dto.EmployeeDocumentsDTO
 *  com.fasterxml.jackson.databind.ObjectMapper
 */
package com.estrat.backend.db.dto;

import com.estrat.backend.db.bean.po.EmployeeDocuments;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

public class EmployeeDocumentsDTO {
    private long id;
    private int active = 0;
    private long owner;
    private long createdBy;
    private long updatedBy;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;
    private Map<String, Object> documentsValue;

    public EmployeeDocumentsDTO() {
    }

    public EmployeeDocumentsDTO(EmployeeDocuments employeeDocuments) {
        this.id = employeeDocuments.getId();
        this.owner = employeeDocuments.getOwner();
        this.createdBy = employeeDocuments.getCreatedBy();
        this.updatedBy = employeeDocuments.getUpdatedBy();
        this.createdTime = employeeDocuments.getCreatedTime();
        this.updatedTime = employeeDocuments.getUpdatedTime();
        ObjectMapper mapper = new ObjectMapper();
        try {
            this.documentsValue = (Map)mapper.readValue(employeeDocuments.getDocumentsValue(), HashMap.class);
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

    public Map<String, Object> getDocumentsValue() {
        return this.documentsValue;
    }

    public void setDocumentsValue(Map<String, Object> documentsValue) {
        this.documentsValue = documentsValue;
    }
}

