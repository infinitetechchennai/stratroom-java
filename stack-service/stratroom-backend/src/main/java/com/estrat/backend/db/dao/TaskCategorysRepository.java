/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.TaskCategorys
 *  com.estrat.backend.db.dao.TaskCategorysRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.backend.db.dao;

import com.estrat.backend.db.bean.po.TaskCategorys;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskCategorysRepository
extends JpaRepository<TaskCategorys, Long> {
    @Query(value="SELECT t FROM TaskCategorys t WHERE   (t.owner=:empId OR t.createdBy=:empId) AND t.type=:type AND t.active =0")
    public List<TaskCategorys> findAllByEmpIdAndType(@Param(value="empId") Long var1, @Param(value="type") String var2);

    @Query(value="SELECT t FROM TaskCategorys t WHERE   (t.owner=:empId OR t.createdBy=:empId) AND t.active =0")
    public List<TaskCategorys> findAllByEmpId(@Param(value="empId") Long var1);
}

