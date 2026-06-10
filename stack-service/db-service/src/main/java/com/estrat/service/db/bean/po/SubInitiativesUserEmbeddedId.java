/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.EmployeeProfilePo
 *  com.estrat.service.db.bean.po.FormulationSubInitiatives
 *  com.estrat.service.db.bean.po.SubInitiativesUserEmbeddedId
 *  javax.persistence.Embeddable
 *  javax.persistence.FetchType
 *  javax.persistence.JoinColumn
 *  javax.persistence.ManyToOne
 */
package com.estrat.service.db.bean.po;

import com.estrat.service.db.bean.po.EmployeeProfilePo;
import com.estrat.service.db.bean.po.FormulationSubInitiatives;
import java.io.Serializable;
import java.util.Objects;
import jakarta.persistence.Embeddable;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Embeddable
public class SubInitiativesUserEmbeddedId
implements Serializable {
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="subinitiative_id", nullable=false)
    private FormulationSubInitiatives subInitiativesId;
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="emp_id")
    private EmployeeProfilePo empId;

    public FormulationSubInitiatives getSubInitiativesId() {
        return this.subInitiativesId;
    }

    public void setSubInitiativesId(FormulationSubInitiatives subInitiativesId) {
        this.subInitiativesId = subInitiativesId;
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
        if (!(o instanceof SubInitiativesUserEmbeddedId)) {
            return false;
        }
        SubInitiativesUserEmbeddedId that = (SubInitiativesUserEmbeddedId)o;
        return Objects.equals(this.getSubInitiativesId(), that.getSubInitiativesId()) && Objects.equals(this.getEmpId(), that.getEmpId());
    }

    public int hashCode() {
        return Objects.hash(this.getSubInitiativesId(), this.getEmpId());
    }
}

