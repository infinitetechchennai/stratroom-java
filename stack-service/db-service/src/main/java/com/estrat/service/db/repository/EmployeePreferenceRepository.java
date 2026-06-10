/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.EmployeePreferences
 *  com.estrat.service.db.repository.EmployeePreferenceRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.service.db.repository;

import com.estrat.service.db.bean.po.EmployeePreferences;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeePreferenceRepository
extends JpaRepository<EmployeePreferences, Long> {
    @Query(value="SELECT e.* FROM orgstructure.employee_preferences e WHERE e.id=:pageId AND e.emp_id=:empId AND e.page_name=:pageName", nativeQuery=true)
    public EmployeePreferences findPreferencesByEmpIdAndName(@Param(value="pageId") long var1, @Param(value="empId") String var3, @Param(value="pageName") String var4);
}

