/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.EmployeeProfilePo
 *  com.estrat.backend.db.bean.po.RiskFormulation
 *  com.estrat.backend.db.bean.po.RiskFormulationEmbeddedId
 *  com.estrat.backend.db.bean.po.RiskFormulationUserMapping
 *  javax.persistence.EmbeddedId
 *  javax.persistence.Entity
 *  javax.persistence.Table
 */
package com.estrat.backend.db.bean.po;

import com.estrat.backend.db.bean.po.EmployeeProfilePo;
import com.estrat.backend.db.bean.po.RiskFormulation;
import com.estrat.backend.db.bean.po.RiskFormulationEmbeddedId;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name="risk_formulation_user_mapping", schema="orgstructure")
public class RiskFormulationUserMapping {
    @EmbeddedId
    private RiskFormulationEmbeddedId id;

    public RiskFormulationUserMapping() {
    }

    public RiskFormulationUserMapping(RiskFormulation riskFormulation, String empId) {
        RiskFormulationEmbeddedId riskFormulationEmbeddedId = new RiskFormulationEmbeddedId();
        EmployeeProfilePo employeeProfilePo = new EmployeeProfilePo();
        employeeProfilePo.setEmpId(Long.valueOf(empId).longValue());
        riskFormulationEmbeddedId.setEmpId(employeeProfilePo);
        riskFormulationEmbeddedId.setRiskFormulationId(riskFormulation);
        this.id = riskFormulationEmbeddedId;
    }

    public RiskFormulationEmbeddedId getId() {
        return this.id;
    }

    public void setId(RiskFormulationEmbeddedId id) {
        this.id = id;
    }
}

