/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.SubInitiatives
 *  com.estrat.backend.db.dao.SubInitiativesRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.backend.db.dao;

import com.estrat.backend.db.bean.po.SubInitiatives;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface SubInitiativesRepository
extends JpaRepository<SubInitiatives, Long> {
    @Query(value="SELECT t FROM SubInitiatives t WHERE t.initiativeId = :initiativeId")
    public List<SubInitiatives> findAllByInitiativesId(@Param(value="initiativeId") Long var1);

    @Query(value="SELECT t FROM SubInitiatives t WHERE t.owner=:empId AND t.initiativeId =:initiativeId AND t.active =:active")
    public List<SubInitiatives> findAllByEmpId(@Param(value="empId") Long var1, @Param(value="initiativeId") Long var2, @Param(value="active") int var3);

    @Query(value="SELECT t FROM SubInitiatives t WHERE t.owner=:empId AND t.active =:active")
    public List<SubInitiatives> findAllByEmpId(@Param(value="empId") Long var1, @Param(value="active") int var2);
}

