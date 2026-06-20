/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.ModulePrivillageMapping
 *  com.estrat.backend.db.dto.ModulePrivilegeMappingDTO
 */
package com.estrat.backend.db.dto;

import com.estrat.backend.db.bean.po.ModulePrivillageMapping;

public class ModulePrivilegeMappingDTO {
    private Long id;
    private Long roleId;
    private Long moduleId;
    private String moduleName;
    private String tagName;
    private int active;
    private String create;
    private String update;
    private String view;
    private String delete;

    public ModulePrivilegeMappingDTO() {
    }

    public ModulePrivilegeMappingDTO(ModulePrivillageMapping modulePrivillageMapping) {
        this.id = modulePrivillageMapping.getId();
        this.roleId = modulePrivillageMapping.getRoleId();
        this.moduleId = modulePrivillageMapping.getModuleId();
        this.moduleName = modulePrivillageMapping.getModuleName();
        this.tagName = modulePrivillageMapping.getTagName();
        this.active = modulePrivillageMapping.getActive();
        this.create = modulePrivillageMapping.getPrivilegeCreate();
        this.update = modulePrivillageMapping.getPrivilegeUpdate();
        this.view = modulePrivillageMapping.getPrivilegeView();
        this.delete = modulePrivillageMapping.getPrivilegeDelete();
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getRoleId() {
        return this.roleId;
    }

    public void setRoleId(Long roleId) {
        this.roleId = roleId;
    }

    public Long getModuleId() {
        return this.moduleId;
    }

    public void setModuleId(Long moduleId) {
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

    public int getActive() {
        return this.active;
    }

    public void setActive(int active) {
        this.active = active;
    }

    public String getCreate() {
        return this.create;
    }

    public void setCreate(String create) {
        this.create = create;
    }

    public String getUpdate() {
        return this.update;
    }

    public void setUpdate(String update) {
        this.update = update;
    }

    public String getView() {
        return this.view;
    }

    public void setView(String view) {
        this.view = view;
    }

    public String getDelete() {
        return this.delete;
    }

    public void setDelete(String delete) {
        this.delete = delete;
    }
}

