/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.dto.PrivilegeDTO
 */
package com.estrat.web.dto;

public class PrivilegeDTO {
    private long privilegeId;
    private String privilegeName;
    private boolean enabled;

    public boolean isEnabled() {
        return this.enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public long getPrivilegeId() {
        return this.privilegeId;
    }

    public void setPrivilegeId(long privilegeId) {
        this.privilegeId = privilegeId;
    }

    public String getPrivilegeName() {
        return this.privilegeName;
    }

    public void setPrivilegeName(String privilegeName) {
        this.privilegeName = privilegeName;
    }
}

