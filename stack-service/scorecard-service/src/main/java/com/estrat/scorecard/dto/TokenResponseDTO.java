/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.scorecard.dto.TokenResponseDTO
 *  com.fasterxml.jackson.annotation.JsonInclude
 *  com.fasterxml.jackson.annotation.JsonInclude$Include
 */
package com.estrat.scorecard.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import java.util.Date;
import java.util.Map;

@JsonInclude(value=JsonInclude.Include.NON_NULL)
public class TokenResponseDTO {
    private Map<String, Object> userInfo;
    private boolean validationSuccess;
    private boolean tokenExpired;
    private String token;
    private Date expireAt;

    public Date getExpireAt() {
        return this.expireAt;
    }

    public void setExpireAt(Date expireAt) {
        this.expireAt = expireAt;
    }

    public boolean isValidationSuccess() {
        return this.validationSuccess;
    }

    public void setValidationSuccess(boolean validationSuccess) {
        this.validationSuccess = validationSuccess;
    }

    public boolean isTokenExpired() {
        return this.tokenExpired;
    }

    public void setTokenExpired(boolean tokenExpired) {
        this.tokenExpired = tokenExpired;
    }

    public String getToken() {
        return this.token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Map<String, Object> getUserInfo() {
        return this.userInfo;
    }

    public void setUserInfo(Map<String, Object> userInfo) {
        this.userInfo = userInfo;
    }
}

