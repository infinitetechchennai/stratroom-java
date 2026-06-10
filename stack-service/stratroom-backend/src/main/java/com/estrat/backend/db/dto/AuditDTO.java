/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.AuditDetails
 *  com.estrat.backend.db.dto.AuditDTO
 */
package com.estrat.backend.db.dto;

import com.estrat.backend.db.bean.po.AuditDetails;
import java.time.LocalDateTime;
import java.util.Date;

public class AuditDTO {
    private long id;
    private int active = 0;
    private LocalDateTime createdTime;
    private long userId;
    private long orgId;
    private long typeId;
    private Long createdBy;
    private String type;
    private String action;
    private Date accessDate;
    private String systemIp;
    private String userName;
    private String userImage;
    private String emailAddress;
    private String dateTime;

    public AuditDTO() {
    }

    public AuditDTO(AuditDetails auditDetails) {
        this.id = auditDetails.getId();
        this.createdTime = auditDetails.getCreatedTime();
        this.userId = auditDetails.getUserId();
        this.orgId = auditDetails.getOrgId();
        this.typeId = auditDetails.getTypeId();
        this.type = auditDetails.getType();
        this.action = auditDetails.getAction();
        this.accessDate = auditDetails.getAccessDate();
        this.systemIp = auditDetails.getSystemIp();
        this.createdBy = auditDetails.getCreatedBy();
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

    public String getUserName() {
        return this.userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserImage() {
        return this.userImage;
    }

    public void setUserImage(String userImage) {
        this.userImage = userImage;
    }

    public String getEmailAddress() {
        return this.emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public String getDateTime() {
        return this.dateTime;
    }

    public void setDateTime(String dateTime) {
        this.dateTime = dateTime;
    }

    public Long getCreatedBy() {
        return this.createdBy;
    }

    public void setCreatedBy(Long createdBy) {
        this.createdBy = createdBy;
    }
}

