/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.auth.dto.AuthenticateResponseDTO
 *  com.estrat.backend.auth.dto.Employee
 */
package com.estrat.backend.auth.dto;

import com.estrat.backend.auth.dto.Employee;
import java.util.List;
import java.util.Map;

public class AuthenticateResponseDTO {
    private boolean authoriseFlag;
    private Employee employee;
    private Map<String, List<String>> userPermissions;
    private long orgUserCount;
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

    public Employee getEmployee() {
        return this.employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public boolean isAuthoriseFlag() {
        return this.authoriseFlag;
    }

    public void setAuthoriseFlag(boolean authoriseFlag) {
        this.authoriseFlag = authoriseFlag;
    }

    public boolean isUserFlag() {
        return this.userFlag;
    }

    public void setUserFlag(boolean userFlag) {
        this.userFlag = userFlag;
    }
}

