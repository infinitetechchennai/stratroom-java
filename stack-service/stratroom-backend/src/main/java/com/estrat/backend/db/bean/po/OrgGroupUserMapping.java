/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.EmployeeProfilePo
 *  com.estrat.backend.db.bean.po.OrgGroupUserEmbeddedId
 *  com.estrat.backend.db.bean.po.OrgGroupUserMapping
 *  com.estrat.backend.db.bean.po.OrgstructureGroup
 *  javax.persistence.EmbeddedId
 *  javax.persistence.Entity
 *  javax.persistence.Table
 */
package com.estrat.backend.db.bean.po;

import com.estrat.backend.db.bean.po.EmployeeProfilePo;
import com.estrat.backend.db.bean.po.OrgGroupUserEmbeddedId;
import com.estrat.backend.db.bean.po.OrgstructureGroup;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name="org_group_user_mapping", schema="orgstructure")
public class OrgGroupUserMapping {
    @EmbeddedId
    private OrgGroupUserEmbeddedId id;

    public OrgGroupUserMapping() {
    }

    public OrgGroupUserMapping(OrgstructureGroup orgstructureGroup, String empId) {
        OrgGroupUserEmbeddedId embeddedId = new OrgGroupUserEmbeddedId();
        EmployeeProfilePo employeeProfilePo = new EmployeeProfilePo();
        employeeProfilePo.setEmpId(Long.valueOf(empId).longValue());
        embeddedId.setEmpId(employeeProfilePo);
        embeddedId.setOrgstructureGroupId(orgstructureGroup);
        this.id = embeddedId;
    }

    public OrgGroupUserEmbeddedId getId() {
        return this.id;
    }

    public void setId(OrgGroupUserEmbeddedId id) {
        this.id = id;
    }
}

