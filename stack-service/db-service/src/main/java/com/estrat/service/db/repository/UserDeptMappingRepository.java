/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.UserDeptMapping
 *  com.estrat.service.db.repository.UserDeptMappingRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.service.db.repository;

import com.estrat.service.db.bean.po.UserDeptMapping;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDeptMappingRepository
extends JpaRepository<UserDeptMapping, Long> {
    @Query(value="SELECT d FROM UserDeptMapping d  WHERE d.empId =:empId")
    public List<UserDeptMapping> findAllByIdEmpId(@Param(value="empId") Long var1);

    @Query(value="SELECT d FROM UserDeptMapping  d WHERE d.empId =:empId and d.deptId =:deptId")
    public UserDeptMapping findAllByIdEmpIdANDDeptId(@Param(value="empId") Long var1, @Param(value="deptId") Long var2);

    @Query(value="SELECT d FROM UserDeptMapping  d WHERE d.empId =:empId and d.deptId =:deptId")
    public Optional<UserDeptMapping> findByIds(@Param(value="empId") Long var1, @Param(value="deptId") Long var2);

    @Query(value="SELECT distinct d.empId FROM UserDeptMapping d  WHERE d.deptId IN (:deptIds)")
    public List<Long> findAllByDeptIds(@Param(value="deptIds") List<Long> var1);

    @Query(value="SELECT d FROM UserDeptMapping d WHERE d.deptId =:deptId")
    public List<UserDeptMapping> findAllByDeptId(@Param(value="deptId") Long var1);

    @Query(value="SELECT distinct d.deptId FROM UserDeptMapping d  WHERE d.empId =:empId")
    public List<Long> findAllDeptIdByEmpId(@Param(value="empId") Long var1);
}

