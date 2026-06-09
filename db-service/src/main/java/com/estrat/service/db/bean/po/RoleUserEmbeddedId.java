/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.EmployeeProfilePo
 *  com.estrat.service.db.bean.po.RoleDetailsPo
 *  com.estrat.service.db.bean.po.RoleUserEmbeddedId
 *  javax.persistence.CascadeType
 *  javax.persistence.Embeddable
 *  javax.persistence.FetchType
 *  javax.persistence.JoinColumn
 *  javax.persistence.ManyToOne
 */
package com.estrat.service.db.bean.po;

import com.estrat.service.db.bean.po.EmployeeProfilePo;
import com.estrat.service.db.bean.po.RoleDetailsPo;
import java.io.Serializable;
import java.util.Objects;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Embeddable;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Embeddable
public class RoleUserEmbeddedId
implements Serializable {
    @ManyToOne(fetch=FetchType.LAZY, cascade={CascadeType.ALL})
    @JoinColumn(name="role_id", nullable=false)
    private RoleDetailsPo roleId;
    @ManyToOne(fetch=FetchType.LAZY, cascade={CascadeType.ALL})
    @JoinColumn(name="emp_id")
    private EmployeeProfilePo empId;

    public RoleDetailsPo getRoleId() {
        return this.roleId;
    }

    public void setRoleId(RoleDetailsPo roleId) {
        this.roleId = roleId;
    }

    public EmployeeProfilePo getEmpId() {
        return this.empId;
    }

    public void setEmpId(EmployeeProfilePo empId) {
        this.empId = empId;
    }

    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof RoleUserEmbeddedId)) {
            return false;
        }
        RoleUserEmbeddedId that = (RoleUserEmbeddedId)o;
        return Objects.equals(this.getRoleId(), that.getRoleId()) && Objects.equals(this.getEmpId(), that.getEmpId());
    }

    public int hashCode() {
        return Objects.hash(this.getRoleId(), this.getEmpId());
    }
}

