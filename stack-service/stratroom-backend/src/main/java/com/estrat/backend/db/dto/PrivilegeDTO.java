/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.PrivilegeDetailsPo
 *  com.estrat.backend.db.dto.PrivilegeDTO
 */
package com.estrat.backend.db.dto;

import com.estrat.backend.db.bean.po.PrivilegeDetailsPo;

public class PrivilegeDTO {
    private long privilegeId;
    private String privilegeName;
    private boolean enabled;

    public PrivilegeDTO() {
    }

    public PrivilegeDTO(PrivilegeDetailsPo privilegeDetailsPo) {
        this.privilegeId = privilegeDetailsPo.getPrivilegeId();
        this.privilegeName = privilegeDetailsPo.getPrivilegeName();
    }

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

