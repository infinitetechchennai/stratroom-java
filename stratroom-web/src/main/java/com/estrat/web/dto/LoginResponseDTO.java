/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.dto.Employee
 *  com.estrat.web.dto.LoginResponseDTO
 */
package com.estrat.web.dto;

import com.estrat.web.dto.Employee;
import java.util.Date;
import java.util.List;
import java.util.Map;

public class LoginResponseDTO {
    private boolean loginFlag;
    private Employee profile;
    private Date expireAt;
    private Map<String, List<String>> userPermissions;
    private long orgUserCount;
    private String accessToken;
    private String userInfo;
    private String refreshToken;
    private boolean userFlag;

    public long getOrgUserCount() {
        return this.orgUserCount;
    }

    public void setOrgUserCount(long orgUserCount) {
        this.orgUserCount = orgUserCount;
    }

    public Map<String, List<String>> getUserPermissions() {
        return this.userPermissions;
    }

    public void setUserPermissions(Map<String, List<String>> userPermissions) {
        this.userPermissions = userPermissions;
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

    public boolean isLoginFlag() {
        return this.loginFlag;
    }

    public void setLoginFlag(boolean loginFlag) {
        this.loginFlag = loginFlag;
    }

    public String getAccessToken() {
        return this.accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
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

    public boolean isUserFlag() {
        return this.userFlag;
    }

    public void setUserFlag(boolean userFlag) {
        this.userFlag = userFlag;
    }
}

