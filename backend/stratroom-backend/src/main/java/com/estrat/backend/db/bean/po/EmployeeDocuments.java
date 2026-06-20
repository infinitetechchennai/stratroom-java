/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.EmployeeDocuments
 *  com.estrat.backend.db.dto.EmployeeDocumentsDTO
 *  com.fasterxml.jackson.databind.ObjectMapper
 *  javax.persistence.Column
 *  javax.persistence.Entity
 *  javax.persistence.GeneratedValue
 *  javax.persistence.GenerationType
 *  javax.persistence.Id
 *  javax.persistence.Table
 *  org.hibernate.annotations.GenericGenerator
 */
package com.estrat.backend.db.bean.po;

import com.estrat.backend.db.dto.EmployeeDocumentsDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="employee_documents", schema="orgstructure")
public class EmployeeDocuments {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="ID")
    private long id;
    @Column(name="active")
    private int active = 0;
    @Column(name="documents_value")
    private String documentsValue;
    @Column(name="created_time", updatable=false)
    private LocalDateTime createdTime;
    @Column(name="updated_Time")
    private LocalDateTime updatedTime;
    @Column(name="owner")
    private long owner;
    @Column(name="created_by", updatable=false)
    private Long createdBy;
    @Column(name="updated_by")
    private Long updatedBy;

    public EmployeeDocuments() {
    }

    public EmployeeDocuments(EmployeeDocumentsDTO documentsDTO) {
        this.id = documentsDTO.getId();
        this.active = documentsDTO.getActive();
        this.createdTime = documentsDTO.getCreatedTime();
        this.updatedTime = documentsDTO.getUpdatedTime();
        this.owner = documentsDTO.getOwner();
        this.createdBy = documentsDTO.getCreatedBy();
        this.updatedBy = documentsDTO.getUpdatedBy();
        ObjectMapper mapper = new ObjectMapper();
        try {
            this.documentsValue = mapper.writeValueAsString((Object)documentsDTO.getDocumentsValue());
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

    public String getDocumentsValue() {
        return this.documentsValue;
    }

    public void setDocumentsValue(String documentsValue) {
        this.documentsValue = documentsValue;
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

    public Long getCreatedBy() {
        return this.createdBy;
    }

    public void setCreatedBy(Long createdBy) {
        this.createdBy = createdBy;
    }

    public Long getUpdatedBy() {
        return this.updatedBy;
    }

    public void setUpdatedBy(Long updatedBy) {
        this.updatedBy = updatedBy;
    }
}

