/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.EmployeeProfilePo
 *  com.estrat.service.db.bean.po.RiskFormulation
 *  com.estrat.service.db.bean.po.RiskFormulationEmbeddedId
 *  javax.persistence.Embeddable
 *  javax.persistence.FetchType
 *  javax.persistence.JoinColumn
 *  javax.persistence.ManyToOne
 */
package com.estrat.service.db.bean.po;

import com.estrat.service.db.bean.po.EmployeeProfilePo;
import com.estrat.service.db.bean.po.RiskFormulation;
import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Embeddable;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Embeddable
public class RiskFormulationEmbeddedId
implements Serializable {
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="formulation_id", nullable=false)
    private RiskFormulation riskFormulationId;
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="emp_id")
    private EmployeeProfilePo empId;

    public RiskFormulation getRiskFormulationId() {
        return this.riskFormulationId;
    }

    public void setRiskFormulationId(RiskFormulation riskFormulationId) {
        this.riskFormulationId = riskFormulationId;
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
        if (!(o instanceof RiskFormulationEmbeddedId)) {
            return false;
        }
        RiskFormulationEmbeddedId that = (RiskFormulationEmbeddedId)o;
        return Objects.equals(this.getRiskFormulationId(), that.getRiskFormulationId()) && Objects.equals(this.getEmpId(), that.getEmpId());
    }

    public int hashCode() {
        return Objects.hash(this.getRiskFormulationId(), this.getEmpId());
    }
}

