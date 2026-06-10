/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.ChartDetails
 *  com.estrat.backend.db.dao.ChartRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.backend.db.dao;

import com.estrat.backend.db.bean.po.ChartDetails;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ChartRepository
extends JpaRepository<ChartDetails, Long> {
    @Query(value="SELECT c FROM ChartDetails c WHERE (c.owner=:empId OR c.createdBy=:empId) AND c.active =:active")
    public List<ChartDetails> findAllByEmpId(@Param(value="empId") Long var1, @Param(value="active") int var2);

    @Query(value="SELECT c FROM ChartDetails c WHERE (c.owner=:empId OR c.createdBy=:empId) AND c.active =:active AND c.pageId.id =:pageId")
    public List<ChartDetails> findAllByEmpId(@Param(value="empId") Long var1, @Param(value="active") int var2, @Param(value="pageId") Long var3);

    @Query(value="SELECT c FROM ChartDetails c WHERE c.pageId.id =:pageId")
    public List<ChartDetails> findAllByPageId(@Param(value="pageId") Long var1);
}

