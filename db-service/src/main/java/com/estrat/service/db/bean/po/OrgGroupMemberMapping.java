/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.EmployeeProfilePo
 *  com.estrat.service.db.bean.po.OrgGroupMemberEmbeddedId
 *  com.estrat.service.db.bean.po.OrgGroupMemberMapping
 *  com.estrat.service.db.bean.po.OrgstructureGroup
 *  javax.persistence.EmbeddedId
 *  javax.persistence.Entity
 *  javax.persistence.Table
 */
package com.estrat.service.db.bean.po;

import com.estrat.service.db.bean.po.EmployeeProfilePo;
import com.estrat.service.db.bean.po.OrgGroupMemberEmbeddedId;
import com.estrat.service.db.bean.po.OrgstructureGroup;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name="org_group_member_mapping", schema="orgstructure")
public class OrgGroupMemberMapping {
    @EmbeddedId
    private OrgGroupMemberEmbeddedId id;

    public OrgGroupMemberMapping() {
    }

    public OrgGroupMemberMapping(OrgstructureGroup orgstructureGroup, String empId) {
        OrgGroupMemberEmbeddedId embeddedId = new OrgGroupMemberEmbeddedId();
        EmployeeProfilePo employeeProfilePo = new EmployeeProfilePo();
        employeeProfilePo.setEmpId(Long.valueOf(empId).longValue());
        embeddedId.setEmpId(employeeProfilePo);
        embeddedId.setOrgstructureGroupId(orgstructureGroup);
        this.id = embeddedId;
    }

    public OrgGroupMemberEmbeddedId getId() {
        return this.id;
    }

    public void setId(OrgGroupMemberEmbeddedId id) {
        this.id = id;
    }
}

