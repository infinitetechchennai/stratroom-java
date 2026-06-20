/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.EmployeeProfilePo
 *  com.estrat.backend.db.bean.po.PestelAnalysis
 *  com.estrat.backend.db.bean.po.PestelUserEmbeddedId
 *  com.estrat.backend.db.bean.po.PestelUserMapping
 *  javax.persistence.EmbeddedId
 *  javax.persistence.Entity
 *  javax.persistence.Table
 */
package com.estrat.backend.db.bean.po;

import com.estrat.backend.db.bean.po.EmployeeProfilePo;
import com.estrat.backend.db.bean.po.PestelAnalysis;
import com.estrat.backend.db.bean.po.PestelUserEmbeddedId;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name="pestel_user_mapping", schema="orgstructure")
public class PestelUserMapping {
    @EmbeddedId
    private PestelUserEmbeddedId id;

    public PestelUserMapping() {
    }

    public PestelUserMapping(PestelAnalysis pestelAnalysis, String empId) {
        PestelUserEmbeddedId embeddedId = new PestelUserEmbeddedId();
        EmployeeProfilePo employeeProfilePo = new EmployeeProfilePo();
        employeeProfilePo.setEmpId(Long.valueOf(empId).longValue());
        embeddedId.setEmpId(employeeProfilePo);
        embeddedId.setPestelId(pestelAnalysis);
        this.id = embeddedId;
    }

    public PestelUserEmbeddedId getId() {
        return this.id;
    }

    public void setId(PestelUserEmbeddedId id) {
        this.id = id;
    }
}

