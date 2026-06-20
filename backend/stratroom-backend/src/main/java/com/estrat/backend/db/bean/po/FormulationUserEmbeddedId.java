/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.EmployeeProfilePo
 *  com.estrat.backend.db.bean.po.FormulationUserEmbeddedId
 *  com.estrat.backend.db.bean.po.StrategyFormulation
 *  javax.persistence.Embeddable
 *  javax.persistence.FetchType
 *  javax.persistence.JoinColumn
 *  javax.persistence.ManyToOne
 */
package com.estrat.backend.db.bean.po;

import com.estrat.backend.db.bean.po.EmployeeProfilePo;
import com.estrat.backend.db.bean.po.StrategyFormulation;
import java.io.Serializable;
import java.util.Objects;
import jakarta.persistence.Embeddable;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Embeddable
public class FormulationUserEmbeddedId
implements Serializable {
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="formulation_id", nullable=false)
    private StrategyFormulation formulationId;
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="emp_id")
    private EmployeeProfilePo empId;

    public StrategyFormulation getFormulationId() {
        return this.formulationId;
    }

    public void setFormulationId(StrategyFormulation formulationId) {
        this.formulationId = formulationId;
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
        if (!(o instanceof FormulationUserEmbeddedId)) {
            return false;
        }
        FormulationUserEmbeddedId that = (FormulationUserEmbeddedId)o;
        return Objects.equals(this.getFormulationId(), that.getFormulationId()) && Objects.equals(this.getEmpId(), that.getEmpId());
    }

    public int hashCode() {
        return Objects.hash(this.getFormulationId(), this.getEmpId());
    }
}

