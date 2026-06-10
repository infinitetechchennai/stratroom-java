/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.dto.Employee
 *  com.estrat.web.dto.LicenseResponseDTO
 *  com.estrat.web.util.UserPrincipal
 */
package com.estrat.web.util;

import com.estrat.web.dto.Employee;
import com.estrat.web.dto.LicenseResponseDTO;
import java.io.Serializable;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class UserPrincipal
implements Serializable {
    private String userName;
    private String datePeriod;
    private String userInfo;
    private Employee profile;
    private Date expireAt;
    private String dataManagementUrl;
    private boolean authenticated;
    private boolean ssoLoginSuccess = true;
    private String allReporteeIds;
    private Map<String, List<String>> userPermissions;
    private LicenseResponseDTO licenseResponseDTO;
    private long orgUserCount;
    private Map<String, String> commonHeaders = null;
    private String jwtToken;
    private String refreshToken;
    private boolean tokenExpired;
    private String password;
    private boolean memberLogin;
    private String systemIp;
    private String userRoleName;

    public long getOrgUserCount() {
        return this.orgUserCount;
    }

    public void setOrgUserCount(long orgUserCount) {
        this.orgUserCount = orgUserCount;
    }

    public LicenseResponseDTO getLicenseResponseDTO() {
        return this.licenseResponseDTO;
    }

    public void setLicenseResponseDTO(LicenseResponseDTO licenseResponseDTO) {
        this.licenseResponseDTO = licenseResponseDTO;
    }

    public Map<String, List<String>> getUserPermissions() {
        return this.userPermissions;
    }

    public void setUserPermissions(Map<String, List<String>> userPermissions) {
        this.userPermissions = userPermissions;
    }

    public String getAllReporteeIds() {
        return this.allReporteeIds;
    }

    public void setAllReporteeIds(String allReporteeIds) {
        this.allReporteeIds = allReporteeIds;
    }

    public boolean isSsoLoginSuccess() {
        return this.ssoLoginSuccess;
    }

    public void setSsoLoginSuccess(boolean ssoLoginSuccess) {
        this.ssoLoginSuccess = ssoLoginSuccess;
    }

    public Map<String, String> getCommonHeaders() {
        if (this.commonHeaders == null) {
            this.commonHeaders = new HashMap();
        }
        return this.commonHeaders;
    }

    public void setCommonHeaders(Map<String, String> commonHeaders) {
        this.commonHeaders = commonHeaders;
    }

    public String getDatePeriod() {
        return this.datePeriod;
    }

    public String getDataManagementUrl() {
        return this.dataManagementUrl;
    }

    public void setDataManagementUrl(String dataManagementUrl) {
        this.dataManagementUrl = dataManagementUrl;
    }

    public void setDatePeriod(String datePeriod) {
        this.datePeriod = datePeriod;
    }

    public Date getExpireAt() {
        return this.expireAt;
    }

    public void setExpireAt(Date expireAt) {
        this.expireAt = expireAt;
    }

    public Employee getProfile() {
        return this.profile;
    }

    public void setProfile(Employee profile) {
        this.profile = profile;
    }

    public String getUserInfo() {
        return this.userInfo;
    }

    public void setUserInfo(String userInfo) {
        this.userInfo = userInfo;
    }

    public String getRefreshToken() {
        return this.refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public boolean isTokenExpired() {
        return this.tokenExpired;
    }

    public void setTokenExpired(boolean tokenExpired) {
        this.tokenExpired = tokenExpired;
    }

    public String getJwtToken() {
        return this.jwtToken;
    }

    public void setJwtToken(String jwtToken) {
        this.jwtToken = jwtToken;
    }

    public String getUserName() {
        return this.userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isMemberLogin() {
        return this.memberLogin;
    }

    public void setMemberLogin(boolean memberLogin) {
        this.memberLogin = memberLogin;
    }

    public boolean isAuthenticated() {
        return this.authenticated;
    }

    public void setAuthenticated(boolean authenticated) {
        this.authenticated = authenticated;
    }

    public String getSystemIp() {
        return this.systemIp;
    }

    public void setSystemIp(String systemIp) {
        this.systemIp = systemIp;
    }

    public String getUserRoleName() {
        return this.userRoleName;
    }

    public void setUserRoleName(String userRoleName) {
        this.userRoleName = userRoleName;
    }
}

