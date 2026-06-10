/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.EmployeePerformanceForm
 *  com.estrat.service.db.dao.EmployeePerformanceFormRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.service.db.dao;

import com.estrat.service.db.bean.po.EmployeePerformanceForm;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeePerformanceFormRepository
extends JpaRepository<EmployeePerformanceForm, Long> {
    @Query(value="SELECT t FROM EmployeePerformanceForm t WHERE   (t.owner=:empId OR t.createdBy=:empId) AND t.active =0")
    public List<EmployeePerformanceForm> findAllByEmpId(@Param(value="empId") Long var1);
}

