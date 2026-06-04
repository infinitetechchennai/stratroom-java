/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.dto.ModuleDTO
 *  com.estrat.web.dto.OrgLicenseResponseDTO
 *  com.fasterxml.jackson.annotation.JsonFormat
 *  com.fasterxml.jackson.annotation.JsonFormat$Shape
 */
package com.estrat.web.dto;

import com.estrat.web.dto.ModuleDTO;
import com.fasterxml.jackson.annotation.JsonFormat;
import java.util.Date;
import java.util.List;

public class OrgLicenseResponseDTO {
    private List<ModuleDTO> moduleList;
    private Long totalAllowedUsers;
    private String organization;
    private String validationMesssage;
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="dd-MM-yyyy")
    private Date expiryDate;
    private List<String> deviceList;
    private boolean validationSuccess;

    public List<String> getDeviceList() {
        return this.deviceList;
    }

    public void setDeviceList(List<String> deviceList) {
        this.deviceList = deviceList;
    }

    public Date getExpiryDate() {
        return this.expiryDate;
    }

    public void setExpiryDate(Date expiryDate) {
        this.expiryDate = expiryDate;
    }

    public String getValidationMesssage() {
        return this.validationMesssage;
    }

    public void setValidationMesssage(String validationMesssage) {
        this.validationMesssage = validationMesssage;
    }

    public boolean isValidationSuccess() {
        return this.validationSuccess;
    }

    public void setValidationSuccess(boolean validationSuccess) {
        this.validationSuccess = validationSuccess;
    }

    public String getOrganization() {
        return this.organization;
    }

    public void setOrganization(String organization) {
        this.organization = organization;
    }

    public List<ModuleDTO> getModuleList() {
        return this.moduleList;
    }

    public void setModuleList(List<ModuleDTO> moduleList) {
        this.moduleList = moduleList;
    }

    public Long getTotalAllowedUsers() {
        return this.totalAllowedUsers;
    }

    public void setTotalAllowedUsers(Long totalAllowedUsers) {
        this.totalAllowedUsers = totalAllowedUsers;
    }
}

