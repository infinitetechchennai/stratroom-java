/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.EmployeeProfilePo
 *  com.estrat.service.db.bean.po.FormulationSubRiskDetails
 *  com.estrat.service.db.bean.po.SubRiskUserEmbeddedId
 *  javax.persistence.Embeddable
 *  javax.persistence.FetchType
 *  javax.persistence.JoinColumn
 *  javax.persistence.ManyToOne
 */
package com.estrat.service.db.bean.po;

import com.estrat.service.db.bean.po.EmployeeProfilePo;
import com.estrat.service.db.bean.po.FormulationSubRiskDetails;
import java.io.Serializable;
import java.util.Objects;
import jakarta.persistence.Embeddable;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Embeddable
public class SubRiskUserEmbeddedId
implements Serializable {
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="sub_risk_id", nullable=false)
    private FormulationSubRiskDetails subRiskId;
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="emp_id")
    private EmployeeProfilePo empId;

    public FormulationSubRiskDetails getSubRiskId() {
        return this.subRiskId;
    }

    public void setSubRiskId(FormulationSubRiskDetails subRiskId) {
        this.subRiskId = subRiskId;
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
        if (!(o instanceof SubRiskUserEmbeddedId)) {
            return false;
        }
        SubRiskUserEmbeddedId that = (SubRiskUserEmbeddedId)o;
        return Objects.equals(this.getSubRiskId(), that.getSubRiskId()) && Objects.equals(this.getEmpId(), that.getEmpId());
    }

    public int hashCode() {
        return Objects.hash(this.getSubRiskId(), this.getEmpId());
    }
}

