package com.estrat.backend.db.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import java.util.Date;
import java.util.List;

@JsonInclude(value = JsonInclude.Include.NON_NULL)
public class OrgLicenseResponseDTO {
    private List<LicenseModuleDTO> moduleList;
    private Long totalAllowedUsers;
    private String organization;
    private String validationMesssage;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    private Date expiryDate;
    private List<String> deviceList;
    private boolean validationSuccess;

    public List<LicenseModuleDTO> getModuleList() {
        return this.moduleList;
    }

    public void setModuleList(List<LicenseModuleDTO> moduleList) {
        this.moduleList = moduleList;
    }

    public Long getTotalAllowedUsers() {
        return this.totalAllowedUsers;
    }

    public void setTotalAllowedUsers(Long totalAllowedUsers) {
        this.totalAllowedUsers = totalAllowedUsers;
    }

    public String getOrganization() {
        return this.organization;
    }

    public void setOrganization(String organization) {
        this.organization = organization;
    }

    public String getValidationMesssage() {
        return this.validationMesssage;
    }

    public void setValidationMesssage(String validationMesssage) {
        this.validationMesssage = validationMesssage;
    }

    public Date getExpiryDate() {
        return this.expiryDate;
    }

    public void setExpiryDate(Date expiryDate) {
        this.expiryDate = expiryDate;
    }

    public List<String> getDeviceList() {
        return this.deviceList;
    }

    public void setDeviceList(List<String> deviceList) {
        this.deviceList = deviceList;
    }

    public boolean isValidationSuccess() {
        return this.validationSuccess;
    }

    public void setValidationSuccess(boolean validationSuccess) {
        this.validationSuccess = validationSuccess;
    }
}
