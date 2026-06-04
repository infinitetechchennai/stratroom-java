/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.DeptMultipleOwnersMapping
 *  com.estrat.service.db.repository.DeptMultipleOwnersMappingRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.service.db.repository;

import com.estrat.service.db.bean.po.DeptMultipleOwnersMapping;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface DeptMultipleOwnersMappingRepository
extends JpaRepository<DeptMultipleOwnersMapping, Long> {
    @Query(value="SELECT c FROM DeptMultipleOwnersMapping c WHERE  c.deptId =:deptId and c.empId=:empId")
    public Optional<DeptMultipleOwnersMapping> getOne(@Param(value="empId") Long var1, @Param(value="deptId") Long var2);

    @Query(value="SELECT c FROM DeptMultipleOwnersMapping c WHERE  c.empId=:empId order by id desc")
    public List<DeptMultipleOwnersMapping> getOwnerList(@Param(value="empId") Long var1);

    @Query(value="SELECT c FROM DeptMultipleOwnersMapping c WHERE  c.deptId =:deptId")
    public List<DeptMultipleOwnersMapping> getDeptList(@Param(value="deptId") Long var1);

    @Query(value="SELECT c.deptId FROM DeptMultipleOwnersMapping c WHERE  c.empId=:empId order by id desc")
    public List<Long> findAllDeptIdByEmpId(@Param(value="empId") Long var1);

    @Query(value=" SELECT c.empId FROM orgstructure.dept_owner_mapping c  WHERE c.deptId IN (:deptIds)", nativeQuery=true)
    public List<Long> getEmpIdListByDeptId(@Param(value="deptIds") List<Long> var1);
}

