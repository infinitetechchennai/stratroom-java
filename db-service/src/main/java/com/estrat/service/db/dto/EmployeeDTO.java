/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.dto.EmployeeDTO
 */
package com.estrat.service.db.dto;

public class EmployeeDTO {
    private long employeeId;
    private String userName;
    private boolean ssoLogin;
    private String password;

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

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public long getEmployeeId() {
        return this.employeeId;
    }

    public void setEmployeeId(long employeeId) {
        this.employeeId = employeeId;
    }
}

