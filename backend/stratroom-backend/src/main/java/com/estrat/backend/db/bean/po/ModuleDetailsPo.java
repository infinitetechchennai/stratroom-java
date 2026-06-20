/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.ModuleDetailsPo
 *  com.estrat.backend.db.dto.ModuleDTO
 *  javax.persistence.Column
 *  javax.persistence.Entity
 *  javax.persistence.GeneratedValue
 *  javax.persistence.GenerationType
 *  javax.persistence.Id
 *  javax.persistence.Table
 *  org.hibernate.annotations.GenericGenerator
 */
package com.estrat.backend.db.bean.po;

import com.estrat.backend.db.dto.ModuleDTO;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="module_details", schema="orgstructure")
public class ModuleDetailsPo {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="module_id")
    private long moduleId;
    @Column(name="module_name")
    private String moduleName;
    @Column(name="tag_name")
    private String tagName;

    public ModuleDetailsPo() {
    }

    public ModuleDetailsPo(ModuleDTO moduleDetailsPo) {
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
}

