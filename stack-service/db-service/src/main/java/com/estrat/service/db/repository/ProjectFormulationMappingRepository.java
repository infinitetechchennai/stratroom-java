/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.EmployeeProfilePo
 *  com.estrat.service.db.bean.po.ProjectFormulation
 *  com.estrat.service.db.bean.po.ProjectFormulationEmbeddedId
 *  com.estrat.service.db.bean.po.ProjectFormulationUserMapping
 *  com.estrat.service.db.repository.ProjectFormulationMappingRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.stereotype.Repository
 */
package com.estrat.service.db.repository;

import com.estrat.service.db.bean.po.EmployeeProfilePo;
import com.estrat.service.db.bean.po.ProjectFormulation;
import com.estrat.service.db.bean.po.ProjectFormulationEmbeddedId;
import com.estrat.service.db.bean.po.ProjectFormulationUserMapping;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectFormulationMappingRepository
extends JpaRepository<ProjectFormulationUserMapping, ProjectFormulationEmbeddedId> {
    public List<ProjectFormulationUserMapping> findAllByIdEmpId(EmployeeProfilePo var1);

    public void deleteByIdProjectFormulationId(ProjectFormulation var1);
}

