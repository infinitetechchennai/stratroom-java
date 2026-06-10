/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.EmployeeProfilePo
 *  com.estrat.backend.db.bean.po.ProjectFormulation
 *  com.estrat.backend.db.bean.po.ProjectFormulationEmbeddedId
 *  com.estrat.backend.db.bean.po.ProjectFormulationUserMapping
 *  javax.persistence.EmbeddedId
 *  javax.persistence.Entity
 *  javax.persistence.Table
 */
package com.estrat.backend.db.bean.po;

import com.estrat.backend.db.bean.po.EmployeeProfilePo;
import com.estrat.backend.db.bean.po.ProjectFormulation;
import com.estrat.backend.db.bean.po.ProjectFormulationEmbeddedId;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name="project_formulation_user_mapping", schema="orgstructure")
public class ProjectFormulationUserMapping {
    @EmbeddedId
    private ProjectFormulationEmbeddedId id;

    public ProjectFormulationUserMapping() {
    }

    public ProjectFormulationUserMapping(ProjectFormulation projectFormulation, String empId) {
        ProjectFormulationEmbeddedId projectFormulationEmbeddedId = new ProjectFormulationEmbeddedId();
        EmployeeProfilePo employeeProfilePo = new EmployeeProfilePo();
        employeeProfilePo.setEmpId(Long.valueOf(empId).longValue());
        projectFormulationEmbeddedId.setEmpId(employeeProfilePo);
        projectFormulationEmbeddedId.setProjectFormulationId(projectFormulation);
        this.id = projectFormulationEmbeddedId;
    }

    public ProjectFormulationEmbeddedId getId() {
        return this.id;
    }

    public void setId(ProjectFormulationEmbeddedId id) {
        this.id = id;
    }
}

