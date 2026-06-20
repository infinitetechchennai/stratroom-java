/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.EmployeeProfilePo
 *  com.estrat.backend.db.bean.po.RiskPlan
 *  com.estrat.backend.db.bean.po.RiskPlanUserEmbeddedId
 *  javax.persistence.Embeddable
 *  javax.persistence.FetchType
 *  javax.persistence.JoinColumn
 *  javax.persistence.ManyToOne
 */
package com.estrat.backend.db.bean.po;

import com.estrat.backend.db.bean.po.EmployeeProfilePo;
import com.estrat.backend.db.bean.po.RiskPlan;
import java.io.Serializable;
import java.util.Objects;
import jakarta.persistence.Embeddable;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Embeddable
public class RiskPlanUserEmbeddedId
implements Serializable {
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="risk_plan_id", nullable=false)
    private RiskPlan riskPlanId;
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="emp_ID")
    private EmployeeProfilePo empId;

    public EmployeeProfilePo getEmpId() {
        return this.empId;
    }

    public void setEmpId(EmployeeProfilePo empId) {
        this.empId = empId;
    }

    public RiskPlan getRiskPlanId() {
        return this.riskPlanId;
    }

    public void setRiskPlanId(RiskPlan riskPlanId) {
        this.riskPlanId = riskPlanId;
    }

    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof RiskPlanUserEmbeddedId)) {
            return false;
        }
        RiskPlanUserEmbeddedId that = (RiskPlanUserEmbeddedId)o;
        return Objects.equals(this.getRiskPlanId(), that.getRiskPlanId()) && Objects.equals(this.getEmpId(), that.getEmpId());
    }

    public int hashCode() {
        return Objects.hash(this.getRiskPlanId(), this.getEmpId());
    }
}

