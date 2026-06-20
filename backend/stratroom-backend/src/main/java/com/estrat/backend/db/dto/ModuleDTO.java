/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.ModuleDetailsPo
 *  com.estrat.backend.db.dto.ModuleDTO
 */
package com.estrat.backend.db.dto;

import com.estrat.backend.db.bean.po.ModuleDetailsPo;
import java.util.Map;

public class ModuleDTO {
    private long moduleId;
    private String moduleName;
    private String tagName;
    private Map<String, Object> privilegeList;

    public ModuleDTO() {
    }

    public ModuleDTO(ModuleDetailsPo moduleDetailsPo) {
        this.moduleId = moduleDetailsPo.getModuleId();
        this.moduleName = moduleDetailsPo.getModuleName();
        this.tagName = moduleDetailsPo.getTagName();
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

    public Map<String, Object> getPrivilegeList() {
        return this.privilegeList;
    }

    public void setPrivilegeList(Map<String, Object> privilegeList) {
        this.privilegeList = privilegeList;
    }
}

