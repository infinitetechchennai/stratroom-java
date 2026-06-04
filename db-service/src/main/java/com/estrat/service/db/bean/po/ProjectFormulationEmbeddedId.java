/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.EmployeeProfilePo
 *  com.estrat.service.db.bean.po.ProjectFormulation
 *  com.estrat.service.db.bean.po.ProjectFormulationEmbeddedId
 *  javax.persistence.Embeddable
 *  javax.persistence.FetchType
 *  javax.persistence.JoinColumn
 *  javax.persistence.ManyToOne
 */
package com.estrat.service.db.bean.po;

import com.estrat.service.db.bean.po.EmployeeProfilePo;
import com.estrat.service.db.bean.po.ProjectFormulation;
import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Embeddable;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Embeddable
public class ProjectFormulationEmbeddedId
implements Serializable {
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="formulation_id", nullable=false)
    private ProjectFormulation projectFormulationId;
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="emp_id")
    private EmployeeProfilePo empId;

    public ProjectFormulation getProjectFormulationId() {
        return this.projectFormulationId;
    }

    public void setProjectFormulationId(ProjectFormulation projectFormulationId) {
        this.projectFormulationId = projectFormulationId;
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
        if (!(o instanceof ProjectFormulationEmbeddedId)) {
            return false;
        }
        ProjectFormulationEmbeddedId that = (ProjectFormulationEmbeddedId)o;
        return Objects.equals(this.getProjectFormulationId(), that.getProjectFormulationId()) && Objects.equals(this.getEmpId(), that.getEmpId());
    }

    public int hashCode() {
        return Objects.hash(this.getProjectFormulationId(), this.getEmpId());
    }
}

