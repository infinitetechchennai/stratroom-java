/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.EmployeeProfilePo
 *  com.estrat.backend.db.bean.po.OrgGroupUserEmbeddedId
 *  com.estrat.backend.db.bean.po.OrgstructureGroup
 *  javax.persistence.Embeddable
 *  javax.persistence.FetchType
 *  javax.persistence.JoinColumn
 *  javax.persistence.ManyToOne
 */
package com.estrat.backend.db.bean.po;

import com.estrat.backend.db.bean.po.EmployeeProfilePo;
import com.estrat.backend.db.bean.po.OrgstructureGroup;
import java.io.Serializable;
import java.util.Objects;
import jakarta.persistence.Embeddable;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Embeddable
public class OrgGroupUserEmbeddedId
implements Serializable {
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="orggroup_id", nullable=false)
    private OrgstructureGroup orgstructureGroupId;
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="emp_id")
    private EmployeeProfilePo empId;

    public OrgstructureGroup getOrgstructureGroupId() {
        return this.orgstructureGroupId;
    }

    public void setOrgstructureGroupId(OrgstructureGroup orgstructureGroupId) {
        this.orgstructureGroupId = orgstructureGroupId;
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
        if (!(o instanceof OrgGroupUserEmbeddedId)) {
            return false;
        }
        OrgGroupUserEmbeddedId that = (OrgGroupUserEmbeddedId)o;
        return Objects.equals(this.getOrgstructureGroupId(), that.getOrgstructureGroupId()) && Objects.equals(this.getEmpId(), that.getEmpId());
    }

    public int hashCode() {
        return Objects.hash(this.getOrgstructureGroupId(), this.getEmpId());
    }
}

