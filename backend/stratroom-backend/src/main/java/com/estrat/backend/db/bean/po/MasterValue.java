/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.MasterValue
 *  com.estrat.backend.db.dto.MasterValueDto
 *  com.fasterxml.jackson.core.JsonProcessingException
 *  com.fasterxml.jackson.databind.ObjectMapper
 *  javax.persistence.Column
 *  javax.persistence.Entity
 *  javax.persistence.GeneratedValue
 *  javax.persistence.GenerationType
 *  javax.persistence.Id
 *  javax.persistence.Table
 */
package com.estrat.backend.db.bean.po;

import com.estrat.backend.db.dto.MasterValueDto;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDate;
import java.util.Objects;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="mastervalue", schema="orgstructure")
public class MasterValue {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private long id;
    @Column(name="name")
    private String name;
    @Column(name="department")
    private long department;
    @Column(name="created_by")
    private Long createdBy;
    @Column(name="updated_by")
    private Long updatedBy;
    @Column(name="created_at")
    private LocalDate createdAt;
    @Column(name="updated_at")
    private LocalDate updatedAt;
    @Column(name="type")
    private String type;
    @Column(name="data")
    private String data;
    @Column(name="master_id")
    private long master = 0L;

    public MasterValue() {
    }

    public MasterValue(MasterValueDto masterValueDto) {
        this.id = masterValueDto.getId();
        this.name = masterValueDto.getName();
        this.department = masterValueDto.getDepartment();
        this.createdBy = masterValueDto.getCreatedBy();
        this.updatedBy = masterValueDto.getUpdatedBy();
        this.createdAt = masterValueDto.getCreatedAt();
        this.updatedAt = masterValueDto.getUpdatedAt();
        this.type = masterValueDto.getType();
        ObjectMapper mapper = new ObjectMapper();
        try {
            this.data = mapper.writeValueAsString((Object)masterValueDto.getData());
        }
        catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getDepartment() {
        return this.department;
    }

    public void setDepartment(long department) {
        this.department = department;
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

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getData() {
        return this.data;
    }

    public void setData(String data) {
        this.data = data;
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

    public long getMaster() {
        return this.master;
    }

    public void setMaster(long master) {
        this.master = master;
    }

    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof MasterValue)) {
            return false;
        }
        MasterValue that = (MasterValue)o;
        return Objects.equals(this.getId(), that.getId());
    }

    public int hashCode() {
        return Objects.hash(this.getId());
    }
}

