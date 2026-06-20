/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.Objectives
 *  com.estrat.backend.db.dao.ObjectivesRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.backend.db.dao;

import com.estrat.backend.db.bean.po.Objectives;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ObjectivesRepository
extends JpaRepository<Objectives, Long> {
    @Query(value="SELECT t FROM Objectives t where t.id = :id  AND t.active = :active")
    public Optional<Objectives> findByIdAndActive(@Param(value="id") Long var1, @Param(value="active") int var2);

    @Query(value="SELECT t FROM Objectives t where t.scoreCardId.id = :id  AND t.active = :active")
    public List<Objectives> getObjectiveList(@Param(value="id") Long var1, @Param(value="active") int var2);

    @Query(value="SELECT t FROM Objectives t where t.scoreCardId.id = :id  AND t.active = :active AND (((t.endDate BETWEEN :startDate AND :endDate)  OR (t.startDate BETWEEN :startDate AND :endDate)) OR ((:startDate BETWEEN t.startDate AND t.endDate)  OR (:endDate BETWEEN t.startDate AND t.endDate)))")
    public List<Objectives> objectivesListByDate(@Param(value="id") Long var1, @Param(value="active") int var2, @Param(value="startDate") Date var3, @Param(value="endDate") Date var4);

    @Query(value="SELECT t FROM Objectives t where  t.active = :active")
    public List<Objectives> findAll(@Param(value="active") int var1);

    @Query(value="SELECT t FROM Objectives t where t.scoreCardId.id = :id")
    public List<Objectives> getObjectiveList(@Param(value="id") Long var1);
}

