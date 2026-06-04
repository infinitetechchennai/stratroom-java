/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.dto.LoginDTO
 */
package com.estrat.web.dto;

public class LoginDTO {
    private String userName;
    private String passWord;
    private boolean ssoLogin;

    public boolean isSsoLogin() {
        return this.ssoLogin;
    }

    public void setSsoLogin(boolean ssoLogin) {
        this.ssoLogin = ssoLogin;
    }

    public String getUserName() {
        return this.userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassWord() {
        return this.passWord;
    }

    public void setPassWord(String passWord) {
        this.passWord = passWord;
    }
}

