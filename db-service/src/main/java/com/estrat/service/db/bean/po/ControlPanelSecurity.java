/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.ControlPanelSecurity
 *  com.estrat.service.db.dto.ControlPanelSecurityDTO
 *  javax.persistence.Column
 *  javax.persistence.Entity
 *  javax.persistence.GeneratedValue
 *  javax.persistence.Id
 *  javax.persistence.Table
 *  org.hibernate.annotations.GenericGenerator
 */
package com.estrat.service.db.bean.po;

import com.estrat.service.db.dto.ControlPanelSecurityDTO;
import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name="control_panel_security", schema="orgstructure")
public class ControlPanelSecurity {
    @Id
    @GenericGenerator(name="elementKey", strategy="assigned")
    @GeneratedValue(generator="elementKey")
    @Column(name="orgId")
    private long orgId;
    @Column(name="security_type")
    private String securityType;
    @Column(name="single_sign_url")
    private String singleSignURL;
    @Column(name="audience_url")
    private String audienceURL;
    @Column(name="default_relay_state")
    private String defaultRelayState;
    @Column(name="update_application_username")
    private String updateApplicationUsername;
    @Column(name="name_id_format")
    private String nameIDFormat;
    @Column(name="recipientUrl")
    private boolean recipientUrl;
    @Column(name="allowSSo")
    private boolean allowSSo;
    @Column(name="application_username")
    private String applicationUsername;
    @Column(name="created_by", updatable=false)
    private long createdBy;
    @Column(name="updated_by")
    private long updatedBy;
    @Column(name="created_time", updatable=false)
    private LocalDateTime createdTime;
    @Column(name="updated_time")
    private LocalDateTime updatedTime;

    public ControlPanelSecurity() {
    }

    public ControlPanelSecurity(ControlPanelSecurityDTO controlPanelSecurity) {
        this.orgId = controlPanelSecurity.getOrgId();
        this.securityType = controlPanelSecurity.getSecurityType();
        this.singleSignURL = controlPanelSecurity.getSingleSignURL();
        this.audienceURL = controlPanelSecurity.getAudienceURL();
        this.defaultRelayState = controlPanelSecurity.getDefaultRelayState();
        this.updateApplicationUsername = controlPanelSecurity.getUpdateApplicationUsername();
        this.applicationUsername = controlPanelSecurity.getApplicationUsername();
        this.allowSSo = controlPanelSecurity.isAllowSSo();
        this.recipientUrl = controlPanelSecurity.isRecipientUrl();
        this.nameIDFormat = controlPanelSecurity.getNameIDFormat();
        this.createdBy = controlPanelSecurity.getCreatedBy();
        this.updatedBy = controlPanelSecurity.getUpdatedBy();
        this.createdTime = controlPanelSecurity.getCreatedTime();
        this.updatedTime = controlPanelSecurity.getUpdatedTime();
    }

    public String getSecurityType() {
        return this.securityType;
    }

    public void setSecurityType(String securityType) {
        this.securityType = securityType;
    }

    public String getSingleSignURL() {
        return this.singleSignURL;
    }

    public void setSingleSignURL(String singleSignURL) {
        this.singleSignURL = singleSignURL;
    }

    public String getAudienceURL() {
        return this.audienceURL;
    }

    public void setAudienceURL(String audienceURL) {
        this.audienceURL = audienceURL;
    }

    public String getDefaultRelayState() {
        return this.defaultRelayState;
    }

    public void setDefaultRelayState(String defaultRelayState) {
        this.defaultRelayState = defaultRelayState;
    }

    public String getUpdateApplicationUsername() {
        return this.updateApplicationUsername;
    }

    public void setUpdateApplicationUsername(String updateApplicationUsername) {
        this.updateApplicationUsername = updateApplicationUsername;
    }

    public String getApplicationUsername() {
        return this.applicationUsername;
    }

    public void setApplicationUsername(String applicationUsername) {
        this.applicationUsername = applicationUsername;
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

    public String getNameIDFormat() {
        return this.nameIDFormat;
    }

    public void setNameIDFormat(String nameIDFormat) {
        this.nameIDFormat = nameIDFormat;
    }

    public boolean isRecipientUrl() {
        return this.recipientUrl;
    }

    public void setRecipientUrl(boolean recipientUrl) {
        this.recipientUrl = recipientUrl;
    }

    public boolean isAllowSSo() {
        return this.allowSSo;
    }

    public void setAllowSSo(boolean allowSSo) {
        this.allowSSo = allowSSo;
    }

    public long getOrgId() {
        return this.orgId;
    }

    public void setOrgId(long orgId) {
        this.orgId = orgId;
    }
}

