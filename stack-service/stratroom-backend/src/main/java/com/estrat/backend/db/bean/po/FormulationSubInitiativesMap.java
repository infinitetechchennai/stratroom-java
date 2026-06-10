/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.EmployeeProfilePo
 *  com.estrat.backend.db.bean.po.FormulationSubInitiatives
 *  com.estrat.backend.db.bean.po.FormulationSubInitiativesMap
 *  com.estrat.backend.db.bean.po.SubInitiativesUserEmbeddedId
 *  javax.persistence.EmbeddedId
 *  javax.persistence.Entity
 *  javax.persistence.Table
 */
package com.estrat.backend.db.bean.po;

import com.estrat.backend.db.bean.po.EmployeeProfilePo;
import com.estrat.backend.db.bean.po.FormulationSubInitiatives;
import com.estrat.backend.db.bean.po.SubInitiativesUserEmbeddedId;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name="formulation_subinitiative_mapping", schema="orgstructure")
public class FormulationSubInitiativesMap {
    @EmbeddedId
    private SubInitiativesUserEmbeddedId id;

    public FormulationSubInitiativesMap() {
    }

    public FormulationSubInitiativesMap(FormulationSubInitiatives formulationSubInitiatives, String empId) {
        SubInitiativesUserEmbeddedId formulationUserEmbeddedId = new SubInitiativesUserEmbeddedId();
        EmployeeProfilePo employeeProfilePo = new EmployeeProfilePo();
        employeeProfilePo.setEmpId(Long.valueOf(empId).longValue());
        formulationUserEmbeddedId.setEmpId(employeeProfilePo);
        formulationUserEmbeddedId.setSubInitiativesId(formulationSubInitiatives);
        this.id = formulationUserEmbeddedId;
    }

    public SubInitiativesUserEmbeddedId getId() {
        return this.id;
    }

    public void setId(SubInitiativesUserEmbeddedId id) {
        this.id = id;
    }
}

