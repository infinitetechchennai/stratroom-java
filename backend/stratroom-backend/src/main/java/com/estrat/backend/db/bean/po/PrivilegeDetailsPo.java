/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.PrivilegeDetailsPo
 *  com.estrat.backend.db.dto.PrivilegeDTO
 *  javax.persistence.Column
 *  javax.persistence.Entity
 *  javax.persistence.GeneratedValue
 *  javax.persistence.GenerationType
 *  javax.persistence.Id
 *  javax.persistence.Table
 *  org.hibernate.annotations.GenericGenerator
 */
package com.estrat.backend.db.bean.po;

import com.estrat.backend.db.dto.PrivilegeDTO;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="privilege_details", schema="orgstructure")
public class PrivilegeDetailsPo {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="privilege_id")
    private long privilegeId;
    @Column(name="privilege_name")
    private String privilegeName;

    public PrivilegeDetailsPo() {
    }

    public PrivilegeDetailsPo(PrivilegeDTO privilegeDetailsPo) {
        this.privilegeId = privilegeDetailsPo.getPrivilegeId();
        this.privilegeName = privilegeDetailsPo.getPrivilegeName();
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

