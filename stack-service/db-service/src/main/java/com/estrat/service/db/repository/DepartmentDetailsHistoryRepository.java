/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.DepartmentDetailsHistory
 *  com.estrat.service.db.repository.DepartmentDetailsHistoryRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.service.db.repository;

import com.estrat.service.db.bean.po.DepartmentDetailsHistory;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface DepartmentDetailsHistoryRepository
extends JpaRepository<DepartmentDetailsHistory, Long> {
    @Query(value="SELECT d FROM DepartmentDetailsHistory d WHERE d.deptId = :deptId AND d.year = :year")
    public DepartmentDetailsHistory getOne(@Param(value="deptId") long var1, @Param(value="year") int var3);

    @Query(value="SELECT c.id FROM DepartmentDetailsHistory c WHERE  c.orgId=:orgId and c.status=:status and c.id not in (:id) AND c.year = :year")
    public List<String> getAllDepartmentsByOrgId(@Param(value="orgId") Long var1, @Param(value="id") Long var2, @Param(value="status") String var3, @Param(value="year") int var4);

    @Query(value="SELECT c.id FROM DepartmentDetailsHistory c WHERE  c.orgId=:orgId and c.status=:status  AND c.year = :year")
    public List<String> getAllDepartmentsByOrgId(@Param(value="orgId") Long var1, @Param(value="status") String var2, @Param(value="year") int var3);

    public boolean existsByYear(int var1);
}

