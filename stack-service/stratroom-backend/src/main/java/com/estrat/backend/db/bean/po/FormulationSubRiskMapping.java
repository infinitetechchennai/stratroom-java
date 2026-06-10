/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.EmployeeProfilePo
 *  com.estrat.backend.db.bean.po.FormulationSubRiskDetails
 *  com.estrat.backend.db.bean.po.FormulationSubRiskMapping
 *  com.estrat.backend.db.bean.po.SubRiskUserEmbeddedId
 *  javax.persistence.EmbeddedId
 *  javax.persistence.Entity
 *  javax.persistence.Table
 */
package com.estrat.backend.db.bean.po;

import com.estrat.backend.db.bean.po.EmployeeProfilePo;
import com.estrat.backend.db.bean.po.FormulationSubRiskDetails;
import com.estrat.backend.db.bean.po.SubRiskUserEmbeddedId;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name="formulation_sub_risk_mapping")
public class FormulationSubRiskMapping {
    @EmbeddedId
    private SubRiskUserEmbeddedId id;

    public FormulationSubRiskMapping() {
    }

    public FormulationSubRiskMapping(FormulationSubRiskDetails formulationSubRiskDetails, String empId) {
        SubRiskUserEmbeddedId formulationUserEmbeddedId = new SubRiskUserEmbeddedId();
        EmployeeProfilePo employeeProfilePo = new EmployeeProfilePo();
        employeeProfilePo.setEmpId(Long.valueOf(empId).longValue());
        formulationUserEmbeddedId.setEmpId(employeeProfilePo);
        formulationUserEmbeddedId.setSubRiskId(formulationSubRiskDetails);
        this.id = formulationUserEmbeddedId;
    }

    public SubRiskUserEmbeddedId getId() {
        return this.id;
    }

    public void setId(SubRiskUserEmbeddedId id) {
        this.id = id;
    }
}

