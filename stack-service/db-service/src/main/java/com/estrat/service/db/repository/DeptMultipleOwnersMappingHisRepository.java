/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.DeptMultipleOwnersMappingHis
 *  com.estrat.service.db.repository.DeptMultipleOwnersMappingHisRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.service.db.repository;

import com.estrat.service.db.bean.po.DeptMultipleOwnersMappingHis;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface DeptMultipleOwnersMappingHisRepository
extends JpaRepository<DeptMultipleOwnersMappingHis, Long> {
    @Query(value="SELECT c FROM DeptMultipleOwnersMappingHis c WHERE  c.deptId =:deptId and c.empId=:empId and c.year=:year")
    public Optional<DeptMultipleOwnersMappingHis> getOne(@Param(value="empId") Long var1, @Param(value="deptId") Long var2, @Param(value="year") Integer var3);

    @Query(value="SELECT c FROM DeptMultipleOwnersMappingHis c WHERE  c.empId=:empId and c.year=:year order by id desc")
    public List<DeptMultipleOwnersMappingHis> getOwnerList(@Param(value="empId") Long var1, @Param(value="year") Integer var2);

    @Query(value="SELECT c FROM DeptMultipleOwnersMappingHis c WHERE  c.deptId =:deptId and c.year=:year")
    public List<DeptMultipleOwnersMappingHis> getDeptList(@Param(value="deptId") Long var1, @Param(value="year") Integer var2);

    @Query(value="SELECT c.deptId FROM DeptMultipleOwnersMappingHis c WHERE  c.empId=:empId and c.year=:year order by id desc")
    public List<Long> findAllDeptIdByEmpId(@Param(value="empId") Long var1, @Param(value="year") Integer var2);

    public boolean existsByYear(int var1);
}

