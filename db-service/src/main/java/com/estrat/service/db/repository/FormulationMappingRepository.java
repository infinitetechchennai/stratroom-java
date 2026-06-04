/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.EmployeeProfilePo
 *  com.estrat.service.db.bean.po.FormulationUserEmbeddedId
 *  com.estrat.service.db.bean.po.FormulationUserMapping
 *  com.estrat.service.db.repository.FormulationMappingRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.stereotype.Repository
 */
package com.estrat.service.db.repository;

import com.estrat.service.db.bean.po.EmployeeProfilePo;
import com.estrat.service.db.bean.po.FormulationUserEmbeddedId;
import com.estrat.service.db.bean.po.FormulationUserMapping;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FormulationMappingRepository
extends JpaRepository<FormulationUserMapping, FormulationUserEmbeddedId> {
    public List<FormulationUserMapping> findAllByIdEmpId(EmployeeProfilePo var1);
}

