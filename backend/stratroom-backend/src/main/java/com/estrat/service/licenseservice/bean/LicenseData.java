package com.estrat.service.licenseservice.bean;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

public class LicenseData implements Serializable {
    private Date expiryDate;
    private List<String> moduleList;
    private String organization;
    private Long totalUsers;
    private List<String> deviceList;

    public Date getExpiryDate() { return this.expiryDate; }
    public void setExpiryDate(Date expiryDate) { this.expiryDate = expiryDate; }
    public List<String> getModuleList() { return this.moduleList; }
    public void setModuleList(List<String> moduleList) { this.moduleList = moduleList; }
    public String getOrganization() { return this.organization; }
    public void setOrganization(String organization) { this.organization = organization; }
    public Long getTotalUsers() { return this.totalUsers; }
    public void setTotalUsers(Long totalUsers) { this.totalUsers = totalUsers; }
    public List<String> getDeviceList() { return this.deviceList; }
    public void setDeviceList(List<String> deviceList) { this.deviceList = deviceList; }
}
