/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.InitiativeTask
 *  com.estrat.service.db.dao.InitiativeTaskRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.service.db.dao;

import com.estrat.service.db.bean.po.InitiativeTask;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface InitiativeTaskRepository
extends JpaRepository<InitiativeTask, Long> {
    @Query(value="SELECT t FROM InitiativeTask t WHERE t.initiativeId = :initiativeId and t.active=0")
    public List<InitiativeTask> findAllByInitiativesId(@Param(value="initiativeId") Long var1);

    @Query(value="SELECT t FROM InitiativeTask t WHERE t.owner=:empId  AND t.active =:active")
    public List<InitiativeTask> findAllByEmpId(@Param(value="empId") Long var1, @Param(value="active") int var2);
}

