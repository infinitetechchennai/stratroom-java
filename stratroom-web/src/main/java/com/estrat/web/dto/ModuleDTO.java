/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.dto.ModuleDTO
 *  com.estrat.web.dto.PrivilegeDTO
 */
package com.estrat.web.dto;

import com.estrat.web.dto.PrivilegeDTO;
import java.util.List;

public class ModuleDTO {
    private long moduleId;
    private String moduleName;
    private String tagName;
    private boolean enabled;
    private List<PrivilegeDTO> privilegeList;

    public boolean isEnabled() {
        return this.enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public long getModuleId() {
        return this.moduleId;
    }

    public void setModuleId(long moduleId) {
        this.moduleId = moduleId;
    }

    public String getModuleName() {
        return this.moduleName;
    }

    public void setModuleName(String moduleName) {
        this.moduleName = moduleName;
    }

    public String getTagName() {
        return this.tagName;
    }

    public void setTagName(String tagName) {
        this.tagName = tagName;
    }

    public List<PrivilegeDTO> getPrivilegeList() {
        return this.privilegeList;
    }

    public void setPrivilegeList(List<PrivilegeDTO> privilegeList) {
        this.privilegeList = privilegeList;
    }
}

