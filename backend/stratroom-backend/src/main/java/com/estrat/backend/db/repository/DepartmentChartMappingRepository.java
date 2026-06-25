/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.DepartmentChartMapping
 *  com.estrat.backend.db.repository.DepartmentChartMappingRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.backend.db.repository;

import com.estrat.backend.db.bean.po.DepartmentChartMapping;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface DepartmentChartMappingRepository
extends JpaRepository<DepartmentChartMapping, Long> {
    @Query(value="SELECT c.* FROM orgstructure.department_chart_details c WHERE  c.deptParentId =:parentId and c.active=:active", nativeQuery=true)
    public List<DepartmentChartMapping> getAllDepartmentByParentId(@Param(value="parentId") Long var1, @Param(value="active") int var2);

    @Query(value="SELECT c.* FROM orgstructure.department_chart_details c WHERE  c.deptParentId in (:parentId) and c.active=:active", nativeQuery=true)
    public List<DepartmentChartMapping> getAllDepartmentByListParentId(@Param(value="parentId") List<Long> var1, @Param(value="active") int var2);

    @Query(value="SELECT c.* FROM orgstructure.department_chart_details c WHERE  c.deptId =:deptId and c.active=:active", nativeQuery=true)
    public DepartmentChartMapping getOne(@Param(value="deptId") Long var1, @Param(value="active") int var2);

    @Query(value="SELECT c.* FROM orgstructure.department_chart_details c WHERE  c.orgId =:orgId and c.active=:active", nativeQuery=true)
    public List<DepartmentChartMapping> findAllDepartmentForOrg(@Param(value="orgId") Long var1, @Param(value="active") int var2);

    @Query(value="SELECT c.* FROM orgstructure.department_chart_details c WHERE  c.deptId =:deptId", nativeQuery=true)
    public DepartmentChartMapping getOne(@Param(value="deptId") Long var1);

    @Query(value="SELECT c.* FROM orgstructure.department_chart_details c WHERE  c.emailAddress =:email and c.active=:active", nativeQuery=true)
    public DepartmentChartMapping getOne(@Param(value="email") String var1, @Param(value="active") int var2);

    @Query(value="SELECT c.* FROM orgstructure.department_chart_details c WHERE  c.owner =:owner and c.active=:active", nativeQuery=true)
    public Optional<DepartmentChartMapping> findOwner(@Param(value="owner") Long var1, @Param(value="active") int var2);

    @Query(value="SELECT c.* FROM orgstructure.department_chart_details c WHERE  c.owner =:owner and c.active=:active", nativeQuery=true)
    public List<DepartmentChartMapping> findOwnerList(@Param(value="owner") Long var1, @Param(value="active") int var2);

    @Query(value="WITH RECURSIVE DepartmentCTE AS (    SELECT dp.deptId, dp.deptParentId    FROM orgstructure.department_chart_details dp     WHERE dp.deptParentId = :parentId AND dp.active = 0     UNION ALL     SELECT d.deptId, d.deptParentId     FROM orgstructure.department_chart_details d     INNER JOIN DepartmentCTE cte ON d.deptParentId = cte.deptId    WHERE d.active = 0) SELECT cte.deptId FROM DepartmentCTE cte ORDER BY cte.deptParentId, cte.deptId", nativeQuery=true)
    public List<Long> getAllDepartmentidByParentId(@Param(value="parentId") Long var1);

    @Query(value="WITH RECURSIVE  DepartmentCTE AS (    SELECT dp.deptId, dp.deptParentId    FROM orgstructure.department_chart_details dp     WHERE dp.deptParentId = :parentId AND dp.active = 0     UNION ALL     SELECT d.deptId, d.deptParentId     FROM orgstructure.department_chart_details d     INNER JOIN DepartmentCTE cte ON d.deptParentId = cte.deptId    WHERE d.active = 0) SELECT cte.deptId FROM DepartmentCTE cte ORDER BY cte.deptParentId, cte.deptId", nativeQuery=true)
    public List<Long> getAllDepartmentidByParentIdmysql(@Param(value="parentId") Long var1);

    @Query(value="SELECT c.* FROM orgstructure.department_chart_details c WHERE  c.dept_name =:dept_name and c.active=:active", nativeQuery=true)
    public DepartmentChartMapping getOneDepartment(@Param(value="dept_name") String var1, @Param(value="active") int var2);

    @Query(value="SELECT c.* FROM orgstructure.department_chart_details c WHERE  c.active=:active and c.deptParentId =:parentId and c.deptId IN (:deptIds)", nativeQuery=true)
    public List<DepartmentChartMapping> getAllDepartmentByORGWithNoParentId(@Param(value="deptIds") List<String> var1, @Param(value="parentId") Long var2, @Param(value="active") int var3);

    @Query(value="SELECT c.* FROM orgstructure.department_chart_details c WHERE c.orgId =:orgId and c.active=:active and c.deptParentId =:parentId and c.deptId NOT IN (:deptId)", nativeQuery=true)
    public List<DepartmentChartMapping> getAllDepartmentByORGWithNoParentIdANDNotINDeptId(@Param(value="orgId") Long var1, @Param(value="parentId") Long var2, @Param(value="active") int var3, @Param(value="deptId") Long var4);

    @Query(value="SELECT c.* FROM orgstructure.department_chart_details c WHERE c.orgId =:orgId and c.active=:active and (c.deptParentId =:parentId OR c.deptId =:parentId)", nativeQuery=true)
    public List<DepartmentChartMapping> getAllDepartmentByORGWithNoParentIdANDNotINDeptId(@Param(value="orgId") Long var1, @Param(value="parentId") Long var2, @Param(value="active") int var3);

    @Query(value="SELECT  deptId FROM orgstructure.department_chart_details c WHERE c.deptParentId =:parentId ", nativeQuery=true)
    public List<Long> getAllDepartmentByParentId(@Param(value="parentId") Long var1);

    @Query(value="SELECT  deptId FROM orgstructure.department_chart_details o WHERE o.deptId NOT IN (:deptId) and ((o.created_time BETWEEN :startDate AND :endDate) OR (o.updated_Time BETWEEN :startDate AND :endDate))", nativeQuery=true)
    public List<Long> getAllDepartmentByDate(@Param(value="deptId") Long var1, @Param(value="startDate") LocalDateTime var2, @Param(value="endDate") LocalDateTime var3);

    @Query(value="SELECT  o.* FROM orgstructure.department_chart_details o WHERE o.deptId IN (:deptId)", nativeQuery=true)
    public List<DepartmentChartMapping> getalldeptmapping(@Param(value="deptId") List<String> var1);

    @Query(value="SELECT  deptId FROM orgstructure.department_chart_details o WHERE o.deptId NOT IN (:deptId) and o.orgId =:orgId and ((o.created_time BETWEEN :startDate AND :endDate) OR (o.updated_Time BETWEEN :startDate AND :endDate) OR o.active=0)", nativeQuery=true)
    public List<Long> getAllDepartmentByDateByOrg(@Param(value="deptId") Long var1, @Param(value="orgId") Long var2, @Param(value="startDate") LocalDateTime var3, @Param(value="endDate") LocalDateTime var4);

    @Query(value="SELECT  deptId FROM orgstructure.department_chart_details o WHERE o.orgId =:orgId and   ((o.created_time BETWEEN :startDate AND :endDate) OR (o.updated_Time BETWEEN :startDate AND :endDate)OR o.active=0)", nativeQuery=true)
    public List<Long> getAllDepartmentByDateByOrg(@Param(value="orgId") Long var1, @Param(value="startDate") LocalDateTime var2, @Param(value="endDate") LocalDateTime var3);

    @Query(value="SELECT  deptId FROM orgstructure.department_chart_details o WHERE  ((o.created_time BETWEEN :startDate AND :endDate) OR (o.updated_Time BETWEEN :startDate AND :endDate) OR o.active=0)", nativeQuery=true)
    public List<Long> getAllDepartmentByDate(@Param(value="startDate") LocalDateTime var1, @Param(value="endDate") LocalDateTime var2);

    @Query(value="SELECT deptId FROM orgstructure.department_chart_details c WHERE   c.orgId=:orgId and c.active=:active", nativeQuery=true)
    public List<Long> getAllDepartmentByOrgId(@Param(value="orgId") Long var1, @Param(value="active") int var2);

    @Query(value="SELECT deptId FROM orgstructure.department_chart_details c WHERE   c.deptId in (:deptId) or c.deptParentId  in (:deptId)", nativeQuery=true)
    public List<Long> getAllDeptId(@Param(value="deptId") List<Long> var1);

    @Query(value="SELECT c.* FROM orgstructure.department_chart_details c WHERE  c.owner =:owner ", nativeQuery=true)
    public List<DepartmentChartMapping> findOwnerList(@Param(value="owner") Long var1);

    @Query(value="SELECT owner FROM orgstructure.department_chart_details c WHERE  c.deptId in (:deptId) ", nativeQuery=true)
    public List<Long> findOwnerIDList(@Param(value="deptId") List<Long> var1);

    @Query(value="SELECT c.* FROM orgstructure.department_chart_details c WHERE  c.dept_name =:dept_name and c.active=:active and ( c.deptId =:deptId OR c.deptParentId =:deptId ) ", nativeQuery=true)
    public List<DepartmentChartMapping> getByDeptName(@Param(value="dept_name") String var1, @Param(value="deptId") Long var2, @Param(value="active") int var3);

    @Query(value="SELECT c.* FROM orgstructure.department_chart_details c WHERE c.deptUniqueId =:deptUniqueId", nativeQuery=true)
    public DepartmentChartMapping findByDeptUniqueId(@Param(value="deptUniqueId") String deptUniqueId);
}
