/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.ActivitiesMap
 *  com.estrat.service.db.dao.ActivitiesMapRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.service.db.dao;

import com.estrat.service.db.bean.po.ActivitiesMap;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ActivitiesMapRepository
extends JpaRepository<ActivitiesMap, Long> {
    @Query(value="SELECT a FROM ActivitiesMap a WHERE a.activitiesId.id =:activitiesId")
    public List<ActivitiesMap> findAllByActivitiesId(@Param(value="activitiesId") Long var1);

    @Query(value="SELECT a FROM ActivitiesMap a WHERE a.employeeProfilePos.empId = :empId")
    public List<ActivitiesMap> findAllByOwnerId(@Param(value="empId") Long var1);

    @Query(value="SELECT a FROM ActivitiesMap a WHERE  a.activitiesId.id=:activitiesId AND a.employeeProfilePos.empId=:owner ")
    public ActivitiesMap findAllByEmpIdANDSubInitiativesId(@Param(value="activitiesId") Long var1, @Param(value="owner") long var2);
}

