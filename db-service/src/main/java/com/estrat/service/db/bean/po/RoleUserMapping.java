/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.EmployeeProfilePo
 *  com.estrat.service.db.bean.po.RoleDetailsPo
 *  com.estrat.service.db.bean.po.RoleUserEmbeddedId
 *  com.estrat.service.db.bean.po.RoleUserMapping
 *  javax.persistence.EmbeddedId
 *  javax.persistence.Entity
 *  javax.persistence.Table
 */
package com.estrat.service.db.bean.po;

import com.estrat.service.db.bean.po.EmployeeProfilePo;
import com.estrat.service.db.bean.po.RoleDetailsPo;
import com.estrat.service.db.bean.po.RoleUserEmbeddedId;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name="role_user_mapping", schema="orgstructure")
public class RoleUserMapping {
    @EmbeddedId
    private RoleUserEmbeddedId id;

    public RoleUserMapping() {
    }

    public RoleUserMapping(RoleDetailsPo role, String empId) {
        RoleUserEmbeddedId roleUserEmbeddedId = new RoleUserEmbeddedId();
        EmployeeProfilePo employeeProfilePo = new EmployeeProfilePo();
        employeeProfilePo.setEmpId(Long.valueOf(empId).longValue());
        roleUserEmbeddedId.setEmpId(employeeProfilePo);
        roleUserEmbeddedId.setRoleId(role);
        this.id = roleUserEmbeddedId;
    }

    public RoleUserMapping(Long roleid, Long empId) {
        RoleUserEmbeddedId roleUserEmbeddedId = new RoleUserEmbeddedId();
        EmployeeProfilePo employeeProfilePo = new EmployeeProfilePo();
        employeeProfilePo.setEmpId(empId.longValue());
        roleUserEmbeddedId.setEmpId(employeeProfilePo);
        RoleDetailsPo role = new RoleDetailsPo();
        role.setRoleId(Long.valueOf(roleid).longValue());
        roleUserEmbeddedId.setRoleId(role);
        this.id = roleUserEmbeddedId;
    }

    public RoleUserEmbeddedId getId() {
        return this.id;
    }

    public void setId(RoleUserEmbeddedId id) {
        this.id = id;
    }
}

