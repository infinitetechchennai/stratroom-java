/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.PrivilegeDetailsPo
 *  com.estrat.service.db.dto.PrivilegeDTO
 *  javax.persistence.Column
 *  javax.persistence.Entity
 *  javax.persistence.GeneratedValue
 *  javax.persistence.GenerationType
 *  javax.persistence.Id
 *  javax.persistence.Table
 *  org.hibernate.annotations.GenericGenerator
 */
package com.estrat.service.db.bean.po;

import com.estrat.service.db.dto.PrivilegeDTO;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name="privilege_details", schema="orgstructure")
public class PrivilegeDetailsPo {
    @Id
    @GenericGenerator(name="native", strategy="native")
    @GeneratedValue(generator="native", strategy=GenerationType.AUTO)
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

