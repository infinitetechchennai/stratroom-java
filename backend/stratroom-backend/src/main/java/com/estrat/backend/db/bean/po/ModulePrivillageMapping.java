/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.ModulePrivillageMapping
 *  javax.persistence.Column
 *  javax.persistence.Entity
 *  javax.persistence.GeneratedValue
 *  javax.persistence.GenerationType
 *  javax.persistence.Id
 *  javax.persistence.Table
 *  org.hibernate.annotations.GenericGenerator
 */
package com.estrat.backend.db.bean.po;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="module_privilege_mapping", schema="orgstructure")
public class ModulePrivillageMapping {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;
    @Column(name="role_id")
    private Long roleId;
    @Column(name="module_id")
    private Long moduleId;
    @Column(name="module_name")
    private String moduleName;
    @Column(name="tag_name")
    private String tagName;
    @Column(name="active")
    private int active;
    @Column(name="privilegeCreate")
    private String privilegeCreate;
    @Column(name="privilegeUpdate")
    private String privilegeUpdate;
    @Column(name="privilegeView")
    private String privilegeView;
    @Column(name="privilegeDelete")
    private String privilegeDelete;

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

    public String getPrivilegeCreate() {
        return this.privilegeCreate;
    }

    public void setPrivilegeCreate(String privilegeCreate) {
        this.privilegeCreate = privilegeCreate;
    }

    public String getPrivilegeUpdate() {
        return this.privilegeUpdate;
    }

    public void setPrivilegeUpdate(String privilegeUpdate) {
        this.privilegeUpdate = privilegeUpdate;
    }

    public String getPrivilegeView() {
        return this.privilegeView;
    }

    public void setPrivilegeView(String privilegeView) {
        this.privilegeView = privilegeView;
    }

    public String getPrivilegeDelete() {
        return this.privilegeDelete;
    }

    public void setPrivilegeDelete(String privilegeDelete) {
        this.privilegeDelete = privilegeDelete;
    }
}

