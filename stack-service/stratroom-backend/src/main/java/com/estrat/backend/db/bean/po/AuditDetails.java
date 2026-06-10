/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.AuditDetails
 *  com.estrat.backend.db.dto.AuditDTO
 *  javax.persistence.Column
 *  javax.persistence.Entity
 *  javax.persistence.GeneratedValue
 *  javax.persistence.GenerationType
 *  javax.persistence.Id
 *  javax.persistence.Table
 *  org.hibernate.annotations.GenericGenerator
 */
package com.estrat.backend.db.bean.po;

import com.estrat.backend.db.dto.AuditDTO;
import java.time.LocalDateTime;
import java.util.Date;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name="audit_trail_details", schema="orgstructure")
public class AuditDetails {
    @Id
    @GenericGenerator(name="native", strategy="native")
    @GeneratedValue(generator="native", strategy=GenerationType.AUTO)
    @Column(name="ID")
    private long id;
    @Column(name="userId")
    private long userId;
    @Column(name="created_by")
    private long createdBy;
    @Column(name="orgId")
    private long orgId;
    @Column(name="typeId")
    private long typeId;
    @Column(name="type")
    private String type;
    @Column(name="action")
    private String action;
    @Column(name="accessDate")
    private Date accessDate;
    @Column(name="systemIp")
    private String systemIp;
    @Column(name="created_time", updatable=false)
    private LocalDateTime createdTime;

    public AuditDetails() {
    }

    public AuditDetails(AuditDTO auditDetails) {
        this.id = auditDetails.getId();
        this.createdTime = auditDetails.getCreatedTime();
        this.userId = auditDetails.getUserId();
        this.orgId = auditDetails.getOrgId();
        this.typeId = auditDetails.getTypeId();
        this.type = auditDetails.getType();
        this.action = auditDetails.getAction();
        this.accessDate = auditDetails.getAccessDate();
        this.systemIp = auditDetails.getSystemIp();
        if (auditDetails.getCreatedBy() != null) {
            this.createdBy = auditDetails.getCreatedBy();
        }
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public LocalDateTime getCreatedTime() {
        return this.createdTime;
    }

    public void setCreatedTime(LocalDateTime createdTime) {
        this.createdTime = createdTime;
    }

    public long getUserId() {
        return this.userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public long getOrgId() {
        return this.orgId;
    }

    public void setOrgId(long orgId) {
        this.orgId = orgId;
    }

    public long getTypeId() {
        return this.typeId;
    }

    public void setTypeId(long typeId) {
        this.typeId = typeId;
    }

    public String getType() {
        return this.type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getAction() {
        return this.action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public Date getAccessDate() {
        return this.accessDate;
    }

    public void setAccessDate(Date accessDate) {
        this.accessDate = accessDate;
    }

    public String getSystemIp() {
        return this.systemIp;
    }

    public void setSystemIp(String systemIp) {
        this.systemIp = systemIp;
    }

    public long getCreatedBy() {
        return this.createdBy;
    }

    public void setCreatedBy(long createdBy) {
        this.createdBy = createdBy;
    }
}

