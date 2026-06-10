/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.BudgetDetail
 *  com.estrat.backend.db.dao.BudgetDetailRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.backend.db.dao;

import com.estrat.backend.db.bean.po.BudgetDetail;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface BudgetDetailRepository
extends JpaRepository<BudgetDetail, Long> {
    @Query(value="SELECT b FROM BudgetDetail b WHERE b.owner=:empId OR b.createBy=:empId And b.active=0")
    public List<BudgetDetail> findAllByEmpId(@Param(value="empId") Long var1);

    @Query(value="SELECT b FROM BudgetDetail b WHERE b.pageId.id =:pageId AND b.status!='DRAFT'AND b.active=0")
    public List<BudgetDetail> findAllByPageId(@Param(value="pageId") Long var1);

    @Query(value="SELECT b FROM BudgetDetail b WHERE b.changeId = :changeId")
    public List<BudgetDetail> findByChangeId(@Param(value="changeId") Long var1);

    @Query(value="SELECT b FROM BudgetDetail b WHERE b.pageId.id =:pageId AND b.status=:status AND b.active=0")
    public List<BudgetDetail> findAllByPageIdANDStatus(@Param(value="pageId") Long var1, @Param(value="status") String var2);

    @Query(value="SELECT b FROM BudgetDetail b WHERE b.changeId =:changeId AND b.status='DRAFT' AND b.active=0")
    public List<BudgetDetail> findAllByChangeId(@Param(value="changeId") Long var1);
}

