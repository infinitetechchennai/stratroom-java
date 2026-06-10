/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.EmployeeDocuments
 *  com.estrat.service.db.dao.EmployeeDocumentsRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.service.db.dao;

import com.estrat.service.db.bean.po.EmployeeDocuments;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeDocumentsRepository
extends JpaRepository<EmployeeDocuments, Long> {
    @Query(value="SELECT e FROM EmployeeDocuments e WHERE (e.owner=:empId OR e.createdBy=:empId) AND e.active =:active")
    public List<EmployeeDocuments> findAllByEmpId(@Param(value="empId") Long var1, @Param(value="active") int var2);
}

