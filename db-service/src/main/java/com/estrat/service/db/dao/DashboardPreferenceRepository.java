/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.DashBoardPreferences
 *  com.estrat.service.db.dao.DashboardPreferenceRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.service.db.dao;

import com.estrat.service.db.bean.po.DashBoardPreferences;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface DashboardPreferenceRepository
extends JpaRepository<DashBoardPreferences, Long> {
    @Query(value="SELECT d FROM DashBoardPreferences d WHERE   (d.owner=:empId OR d.createdBy=:empId) AND d.active =:active")
    public List<DashBoardPreferences> findAllByEmpId(@Param(value="empId") Long var1, @Param(value="active") int var2);

    @Query(value="SELECT d FROM DashBoardPreferences d WHERE  (d.owner=:empId OR d.createdBy=:empId) AND d.active =:active AND d.pageId.id =:pageId")
    public List<DashBoardPreferences> findAllByEmpId(@Param(value="empId") Long var1, @Param(value="active") int var2, @Param(value="pageId") Long var3);

    @Query(value="SELECT d FROM DashBoardPreferences d WHERE d.pageId.id =:pageId")
    public List<DashBoardPreferences> findAllByPageId(@Param(value="pageId") Long var1);
}

