/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.EmployeeDepartmentMapping
 *  com.estrat.backend.db.dao.EmployeeDepartmentMappingRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.backend.db.dao;

import com.estrat.backend.db.bean.po.EmployeeDepartmentMapping;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeDepartmentMappingRepository
extends JpaRepository<EmployeeDepartmentMapping, Long> {
    @Query(value="SELECT c FROM EmployeeDepartmentMapping c WHERE  c.empId=:empId and c.status=:status")
    public EmployeeDepartmentMapping findByMapping(@Param(value="empId") long var1, @Param(value="status") String var3);

    @Query(value="SELECT c FROM EmployeeDepartmentMapping c WHERE  c.deptId=:deptId and c.status=:status")
    public List<EmployeeDepartmentMapping> departmentByEmployeeList(@Param(value="deptId") long var1, @Param(value="status") String var3);

    @Query(value="SELECT c FROM EmployeeDepartmentMapping c WHERE   c.empId=:empId and c.deptId=:deptId and c.status=:status ORDER BY c.id DESC")
    public List<EmployeeDepartmentMapping> findAllByEmpIDAndDeptId(@Param(value="empId") long var1, @Param(value="deptId") long var3, @Param(value="status") String var5);

    /**
     * Returns a single active mapping for the (empId, deptId) pair. Historically this was a
     * unique-result JPQL query, but duplicate active rows exist in legacy data (e.g. the same
     * employee mapped to a department twice). A unique query throws NonUniqueResultException and
     * breaks user saves, so we tolerate duplicates here and return the most recent row.
     */
    default Optional<EmployeeDepartmentMapping> findByEmpIDAndDeptId(long empId, long deptId, String status) {
        List<EmployeeDepartmentMapping> rows = this.findAllByEmpIDAndDeptId(empId, deptId, status);
        return rows.isEmpty() ? Optional.empty() : Optional.of(rows.get(0));
    }

    @Query(value="SELECT c FROM EmployeeDepartmentMapping c WHERE  c.empId=:empId  ")
    public List<EmployeeDepartmentMapping> findByEmpId(@Param(value="empId") long var1);

    @Query(value="SELECT c FROM EmployeeDepartmentMapping c WHERE  c.empId=:empId  and c.status=:status")
    public List<EmployeeDepartmentMapping> findByEmpId(@Param(value="empId") long var1, @Param(value="status") String var3);

    @Query(value="SELECT c FROM EmployeeDepartmentMapping c WHERE  c.deptId=:deptId  ")
    public List<EmployeeDepartmentMapping> findByDeptId(@Param(value="deptId") long var1);

    @Query(value="SELECT c.empId FROM EmployeeDepartmentMapping c WHERE  c.deptId=:deptId and c.status=:status")
    public List<Long> departmentByEmployeeIdList(@Param(value="deptId") long var1, @Param(value="status") String var3);

    @Query(value="SELECT c.deptId FROM EmployeeDepartmentMapping c WHERE  c.empId =:empId and c.status=:status")
    public List<Long> departmentByDeptIdList(@Param(value="empId") long var1, @Param(value="status") String var3);

    @Query(value="SELECT c.empId FROM EmployeeDepartmentMapping c WHERE  c.deptId IN (:deptIds) AND c.status=:status ")
    public List<Long> departmentByEmployeeIdList(@Param(value="deptIds") List<Long> var1, @Param(value="status") String var2);
}

