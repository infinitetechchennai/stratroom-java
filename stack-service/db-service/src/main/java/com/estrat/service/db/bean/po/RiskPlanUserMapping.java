/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.EmployeeProfilePo
 *  com.estrat.service.db.bean.po.RiskPlan
 *  com.estrat.service.db.bean.po.RiskPlanUserEmbeddedId
 *  com.estrat.service.db.bean.po.RiskPlanUserMapping
 *  javax.persistence.EmbeddedId
 *  javax.persistence.Entity
 *  javax.persistence.Table
 */
package com.estrat.service.db.bean.po;

import com.estrat.service.db.bean.po.EmployeeProfilePo;
import com.estrat.service.db.bean.po.RiskPlan;
import com.estrat.service.db.bean.po.RiskPlanUserEmbeddedId;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name="risk_plan_user_mapping", schema="orgstructure")
public class RiskPlanUserMapping {
    @EmbeddedId
    private RiskPlanUserEmbeddedId id;

    public RiskPlanUserMapping() {
    }

    public RiskPlanUserMapping(RiskPlan plan, String empId) {
        RiskPlanUserEmbeddedId embeddedId = new RiskPlanUserEmbeddedId();
        EmployeeProfilePo employeeProfilePo = new EmployeeProfilePo();
        employeeProfilePo.setEmpId(Long.valueOf(empId).longValue());
        embeddedId.setEmpId(employeeProfilePo);
        embeddedId.setRiskPlanId(plan);
        this.id = embeddedId;
    }

    public RiskPlanUserEmbeddedId getId() {
        return this.id;
    }

    public void setId(RiskPlanUserEmbeddedId id) {
        this.id = id;
    }
}

