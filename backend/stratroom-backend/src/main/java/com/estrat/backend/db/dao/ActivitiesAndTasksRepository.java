/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.ActivitiesDetails
 *  com.estrat.backend.db.dao.ActivitiesAndTasksRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.backend.db.dao;

import com.estrat.backend.db.bean.po.ActivitiesDetails;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ActivitiesAndTasksRepository
extends JpaRepository<ActivitiesDetails, Long> {
    @Query(value="SELECT * FROM orgstructure.activities_details WHERE initiative_id = ?", nativeQuery=true)
    public List<ActivitiesDetails> findAllByInitiativesId(Long var1);

    @Query(value="SELECT * FROM orgstructure.activities_details WHERE subinitiative_id = ?", nativeQuery=true)
    public List<ActivitiesDetails> findAllBySubInitiativesId(Long var1);

    @Query(value="SELECT * FROM orgstructure.activities_details t WHERE  t.owner=:empId AND  t.initiative_id=:initiativeId AND t.active =:active", nativeQuery=true)
    public List<ActivitiesDetails> findByEmpId(@Param(value="empId") Long var1, @Param(value="initiativeId") Long var2, @Param(value="active") int var3);

    @Query(value="SELECT * FROM orgstructure.activities_details t WHERE  t.owner=:empId AND t.active =:active", nativeQuery=true)
    public List<ActivitiesDetails> findByEmpId(@Param(value="empId") Long var1, @Param(value="active") int var2);
}

