/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.dto.EmployeePreferencesDTO
 */
package com.estrat.service.db.dto;

import java.util.Map;

public class EmployeePreferencesDTO {
    private String pageName;
    private long pageId;
    private long empId;
    private Map<String, Object> preferences;

    public long getEmpId() {
        return this.empId;
    }

    public void setEmpId(long empId) {
        this.empId = empId;
    }

    public Map<String, Object> getPreferences() {
        return this.preferences;
    }

    public void setPreferences(Map<String, Object> preferences) {
        this.preferences = preferences;
    }

    public String getPageName() {
        return this.pageName;
    }

    public void setPageName(String pageName) {
        this.pageName = pageName;
    }

    public long getPageId() {
        return this.pageId;
    }

    public void setPageId(long pageId) {
        this.pageId = pageId;
    }
}

