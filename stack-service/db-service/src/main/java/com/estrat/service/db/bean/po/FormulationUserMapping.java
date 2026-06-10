/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.EmployeeProfilePo
 *  com.estrat.service.db.bean.po.FormulationUserEmbeddedId
 *  com.estrat.service.db.bean.po.FormulationUserMapping
 *  com.estrat.service.db.bean.po.StrategyFormulation
 *  javax.persistence.EmbeddedId
 *  javax.persistence.Entity
 *  javax.persistence.Table
 */
package com.estrat.service.db.bean.po;

import com.estrat.service.db.bean.po.EmployeeProfilePo;
import com.estrat.service.db.bean.po.FormulationUserEmbeddedId;
import com.estrat.service.db.bean.po.StrategyFormulation;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name="formulation_user_mapping", schema="orgstructure")
public class FormulationUserMapping {
    @EmbeddedId
    private FormulationUserEmbeddedId id;

    public FormulationUserMapping() {
    }

    public FormulationUserMapping(StrategyFormulation strategyFormulation, String empId) {
        FormulationUserEmbeddedId formulationUserEmbeddedId = new FormulationUserEmbeddedId();
        EmployeeProfilePo employeeProfilePo = new EmployeeProfilePo();
        employeeProfilePo.setEmpId(Long.valueOf(empId).longValue());
        formulationUserEmbeddedId.setEmpId(employeeProfilePo);
        formulationUserEmbeddedId.setFormulationId(strategyFormulation);
        this.id = formulationUserEmbeddedId;
    }

    public FormulationUserEmbeddedId getId() {
        return this.id;
    }

    public void setId(FormulationUserEmbeddedId id) {
        this.id = id;
    }
}

