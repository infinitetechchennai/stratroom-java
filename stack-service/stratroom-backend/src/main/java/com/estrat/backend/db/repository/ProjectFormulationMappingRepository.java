/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.EmployeeProfilePo
 *  com.estrat.backend.db.bean.po.ProjectFormulation
 *  com.estrat.backend.db.bean.po.ProjectFormulationEmbeddedId
 *  com.estrat.backend.db.bean.po.ProjectFormulationUserMapping
 *  com.estrat.backend.db.repository.ProjectFormulationMappingRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.stereotype.Repository
 */
package com.estrat.backend.db.repository;

import com.estrat.backend.db.bean.po.EmployeeProfilePo;
import com.estrat.backend.db.bean.po.ProjectFormulation;
import com.estrat.backend.db.bean.po.ProjectFormulationEmbeddedId;
import com.estrat.backend.db.bean.po.ProjectFormulationUserMapping;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectFormulationMappingRepository
extends JpaRepository<ProjectFormulationUserMapping, ProjectFormulationEmbeddedId> {
    public List<ProjectFormulationUserMapping> findAllByIdEmpId(EmployeeProfilePo var1);

    public void deleteByIdProjectFormulationId(ProjectFormulation var1);
}

