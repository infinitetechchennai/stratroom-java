/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.licenseservice.bean.OrgLicenseDetails
 *  javax.persistence.Column
 *  javax.persistence.Entity
 *  javax.persistence.GeneratedValue
 *  javax.persistence.GenerationType
 *  javax.persistence.Id
 *  javax.persistence.Table
 *  org.hibernate.annotations.GenericGenerator
 */
package com.estrat.service.licenseservice.bean;

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
@Table(name="org_license_details")
public class OrgLicenseDetails {
    @Id
    @GenericGenerator(name="native", strategy="native")
    @GeneratedValue(generator="native", strategy=GenerationType.AUTO)
    @Column(name="org_license_id")
    private long id;
    @Column(name="license_key")
    private String licenseKey;
    @Column(name="private_key")
    private String privteKey;
    @Column(name="public_key")
    private String publicKey;
    @Column(name="issued_date", updatable=false)
    private LocalDateTime issuedDate;
    @Column(name="expirt_date")
    private Date expiryDate;
    @Column(name="organiztion")
    private String organiztion;
    @Column(name="total_users")
    private long totalUsers;
    @Column(name="modules")
    private String modules;
    @Column(name="devices")
    private String devices;
    @Column(name="license_string")
    private String licenseString;

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getDevices() {
        return this.devices;
    }

    public void setDevices(String devices) {
        this.devices = devices;
    }

    public String getLicenseString() {
        return this.licenseString;
    }

    public void setLicenseString(String licenseString) {
        this.licenseString = licenseString;
    }

    public String getLicenseKey() {
        return this.licenseKey;
    }

    public void setLicenseKey(String licenseKey) {
        this.licenseKey = licenseKey;
    }

    public String getPrivteKey() {
        return this.privteKey;
    }

    public void setPrivteKey(String privteKey) {
        this.privteKey = privteKey;
    }

    public String getPublicKey() {
        return this.publicKey;
    }

    public void setPublicKey(String publicKey) {
        this.publicKey = publicKey;
    }

    public LocalDateTime getIssuedDate() {
        return this.issuedDate;
    }

    public void setIssuedDate(LocalDateTime issuedDate) {
        this.issuedDate = issuedDate;
    }

    public Date getExpiryDate() {
        return this.expiryDate;
    }

    public void setExpiryDate(Date expiryDate) {
        this.expiryDate = expiryDate;
    }

    public String getOrganiztion() {
        return this.organiztion;
    }

    public void setOrganiztion(String organiztion) {
        this.organiztion = organiztion;
    }

    public long getTotalUsers() {
        return this.totalUsers;
    }

    public void setTotalUsers(long totalUsers) {
        this.totalUsers = totalUsers;
    }

    public String getModules() {
        return this.modules;
    }

    public void setModules(String modules) {
        this.modules = modules;
    }
}

