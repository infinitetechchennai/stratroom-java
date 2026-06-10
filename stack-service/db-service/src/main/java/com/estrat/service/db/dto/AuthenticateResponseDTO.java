/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.Employee
 *  com.estrat.service.db.dto.AuthenticateResponseDTO
 */
package com.estrat.service.db.dto;

import com.estrat.service.db.bean.Employee;
import java.util.Map;
import java.util.Set;

public class AuthenticateResponseDTO {
    private boolean authoriseFlag;
    private Employee employee;
    private Map<String, Set<String>> userPermissions;
    private long orgUserCount;
    private boolean userFlag;

    public long getOrgUserCount() {
        return this.orgUserCount;
    }

    public void setOrgUserCount(long orgUserCount) {
        this.orgUserCount = orgUserCount;
    }

    public Map<String, Set<String>> getUserPermissions() {
        return this.userPermissions;
    }

    public void setUserPermissions(Map<String, Set<String>> userPermissions) {
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

