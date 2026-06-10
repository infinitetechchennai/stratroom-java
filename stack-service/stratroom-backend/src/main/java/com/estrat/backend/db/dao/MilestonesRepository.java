/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.Milestones
 *  com.estrat.backend.db.dao.MilestonesRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 */
package com.estrat.backend.db.dao;

import com.estrat.backend.db.bean.po.Milestones;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MilestonesRepository
extends JpaRepository<Milestones, Long> {
    @Query(value="SELECT t FROM Milestones t WHERE milestonesInitiativeId =:initiativeId")
    public List<Milestones> findAllByInitiativesId(@Param(value="initiativeId") Long var1);

    @Query(value="SELECT t FROM Milestones t WHERE (t.owner=:empId OR t.createdBy=:empId)  AND t.milestonesInitiativeId=:initiativeId  AND t.active =:active")
    public List<Milestones> findAllByEmpId(@Param(value="empId") Long var1, @Param(value="initiativeId") Long var2, @Param(value="active") int var3);

    @Query(value="SELECT t FROM Milestones t WHERE (t.owner=:empId OR t.createdBy=:empId) AND t.active =:active")
    public List<Milestones> findAllByEmpIds(@Param(value="empId") Long var1, @Param(value="active") int var2);
}

