/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.EmployeeProfilePo
 *  com.estrat.backend.db.bean.po.RiskFormulation
 *  com.estrat.backend.db.bean.po.RiskFormulationEmbeddedId
 *  javax.persistence.Embeddable
 *  javax.persistence.FetchType
 *  javax.persistence.JoinColumn
 *  javax.persistence.ManyToOne
 */
package com.estrat.backend.db.bean.po;

import com.estrat.backend.db.bean.po.EmployeeProfilePo;
import com.estrat.backend.db.bean.po.RiskFormulation;
import java.io.Serializable;
import java.util.Objects;
import jakarta.persistence.Embeddable;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

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

