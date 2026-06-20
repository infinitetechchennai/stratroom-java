/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.DepartmentChartMappingHistory
 *  com.estrat.backend.db.repository.DepartmentChartMappingHisRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.backend.db.repository;

import com.estrat.backend.db.bean.po.DepartmentChartMappingHistory;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface DepartmentChartMappingHisRepository
extends JpaRepository<DepartmentChartMappingHistory, Long> {
    @Query(value="SELECT c.* FROM orgstructure.department_chart_details_his c WHERE c.deptParentId =:parentId AND c.active=:active AND c.year=:year", nativeQuery=true)
    public List<DepartmentChartMappingHistory> getAllDepartmentByParentId(@Param(value="parentId") Long var1, @Param(value="active") int var2, @Param(value="year") int var3);

    @Query(value="SELECT c.* FROM orgstructure.department_chart_details_his c WHERE c.deptParentId IN (:parentId) AND c.active=:active AND c.year=:year", nativeQuery=true)
    public List<DepartmentChartMappingHistory> getAllDepartmentByListParentId(@Param(value="parentId") List<Long> var1, @Param(value="active") int var2, @Param(value="year") int var3);

    @Query(value="SELECT c.* FROM orgstructure.department_chart_details_his c WHERE  c.orgId =:orgId and c.active=:active AND c.year=:year", nativeQuery=true)
    public List<DepartmentChartMappingHistory> findAllDepartmentForOrg(@Param(value="orgId") Long var1, @Param(value="active") int var2, @Param(value="year") int var3);

    @Query(value="SELECT c.* FROM orgstructure.department_chart_details_his c WHERE  c.deptId =:deptId and c.active=:active AND c.year=:year", nativeQuery=true)
    public DepartmentChartMappingHistory getOne(@Param(value="deptId") Long var1, @Param(value="active") int var2, @Param(value="year") int var3);

    @Query(value="SELECT o.* FROM orgstructure.department_chart_details_his o WHERE o.orgId =:orgId AND (o.created_time <= :endDate And o.active=0) AND o.year=:year", nativeQuery=true)
    public List<DepartmentChartMappingHistory> findAllDepartmentByDateByOrg(@Param(value="orgId") Long var1, @Param(value="endDate") LocalDateTime var2, @Param(value="year") int var3);

    @Query(value="SELECT c.* FROM orgstructure.department_chart_details_his c WHERE c.deptId =:deptId AND c.year=:year", nativeQuery=true)
    public DepartmentChartMappingHistory getOne(@Param(value="deptId") Long var1, @Param(value="year") int var2);

    @Query(value="WITH DepartmentCTE AS (    SELECT dp.deptId, dp.deptParentId    FROM orgstructure.department_chart_details_his dp     WHERE dp.deptParentId = :parentId AND dp.active = 0 AND dp.year=:year     UNION ALL     SELECT d.deptId, d.deptParentId     FROM orgstructure.department_chart_details_his d     INNER JOIN DepartmentCTE cte ON d.deptParentId = cte.deptId     WHERE d.active = 0 AND d.year=:year) SELECT cte.deptId FROM DepartmentCTE cte ORDER BY cte.deptParentId, cte.deptId", nativeQuery=true)
    public List<Long> getAllDepartmentidByParentId(@Param(value="parentId") Long var1, @Param(value="year") int var2);

    @Query(value="WITH RECURSIVE DepartmentCTE AS (    SELECT dp.deptId, dp.deptParentId    FROM orgstructure.department_chart_details_his dp     WHERE dp.deptParentId = :parentId AND dp.active = 0 AND dp.year=:year     UNION ALL     SELECT d.deptId, d.deptParentId     FROM orgstructure.department_chart_details_his d     INNER JOIN DepartmentCTE cte ON d.deptParentId = cte.deptId     WHERE d.active = 0 AND d.year=:year) SELECT cte.deptId FROM DepartmentCTE cte ORDER BY cte.deptParentId, cte.deptId", nativeQuery=true)
    public List<Long> getAllDepartmentidByParentIdmysql(@Param(value="parentId") Long var1, @Param(value="year") int var2);

    @Query(value="SELECT c.* FROM orgstructure.department_chart_details_his c WHERE c.dept_name =:dept_name AND c.active=:active AND c.year=:year", nativeQuery=true)
    public DepartmentChartMappingHistory getOneDepartment(@Param(value="dept_name") String var1, @Param(value="active") int var2, @Param(value="year") int var3);

    @Query(value="SELECT c.* FROM orgstructure.department_chart_details_his c WHERE c.active=:active AND c.deptParentId =:parentId AND c.deptId IN (:deptIds) AND c.year=:year", nativeQuery=true)
    public List<DepartmentChartMappingHistory> getAllDepartmentByORGWithNoParentId(@Param(value="deptIds") List<String> var1, @Param(value="parentId") Long var2, @Param(value="active") int var3, @Param(value="year") int var4);

    @Query(value="SELECT c.* FROM orgstructure.department_chart_details_his c WHERE c.orgId =:orgId AND c.active=:active AND c.deptParentId =:parentId AND c.deptId NOT IN (:deptId) AND c.year=:year", nativeQuery=true)
    public List<DepartmentChartMappingHistory> getAllDepartmentByORGWithNoParentIdANDNotINDeptId(@Param(value="orgId") Long var1, @Param(value="parentId") Long var2, @Param(value="active") int var3, @Param(value="deptId") Long var4, @Param(value="year") int var5);

    @Query(value="SELECT c.* FROM orgstructure.department_chart_details_his c WHERE c.orgId =:orgId AND c.active=:active AND (c.deptParentId =:parentId OR c.deptId =:parentId) AND c.year=:year", nativeQuery=true)
    public List<DepartmentChartMappingHistory> getAllDepartmentByORGWithNoParentIdANDNotINDeptId(@Param(value="orgId") Long var1, @Param(value="parentId") Long var2, @Param(value="active") int var3, @Param(value="year") int var4);

    @Query(value="SELECT deptId FROM orgstructure.department_chart_details_his c WHERE c.deptParentId =:parentId AND c.year=:year", nativeQuery=true)
    public List<Long> getAllDepartmentByParentId(@Param(value="parentId") Long var1, @Param(value="year") int var2);

    @Query(value="SELECT deptId FROM orgstructure.department_chart_details_his o WHERE o.deptId NOT IN (:deptId) AND ((o.created_time BETWEEN :startDate AND :endDate) OR (o.updated_Time BETWEEN :startDate AND :endDate)) AND o.year=:year", nativeQuery=true)
    public List<Long> getAllDepartmentByDate(@Param(value="deptId") Long var1, @Param(value="startDate") LocalDateTime var2, @Param(value="endDate") LocalDateTime var3, @Param(value="year") int var4);

    @Query(value="SELECT o.* FROM orgstructure.department_chart_details_his o WHERE o.deptId IN (:deptId) AND o.active=:active AND o.year=:year", nativeQuery=true)
    public List<DepartmentChartMappingHistory> getAllDeptMapping(@Param(value="deptId") List<String> var1, @Param(value="active") int var2, @Param(value="year") int var3);

    @Query(value="SELECT deptId FROM orgstructure.department_chart_details_his o WHERE o.deptId NOT IN (:deptId) AND o.orgId =:orgId AND ((o.created_time BETWEEN :startDate AND :endDate) OR (o.updated_Time BETWEEN :startDate AND :endDate) OR o.active=0) AND o.year=:year", nativeQuery=true)
    public List<Long> getAllDepartmentByDateByOrg(@Param(value="deptId") Long var1, @Param(value="orgId") Long var2, @Param(value="startDate") LocalDateTime var3, @Param(value="endDate") LocalDateTime var4, @Param(value="year") int var5);

    @Query(value="SELECT deptId FROM orgstructure.department_chart_details_his o WHERE o.orgId =:orgId AND ((o.created_time BETWEEN :startDate AND :endDate) OR (o.updated_Time BETWEEN :startDate AND :endDate) OR o.active=0) AND o.year=:year", nativeQuery=true)
    public List<Long> getAllDepartmentByDateByOrg(@Param(value="orgId") Long var1, @Param(value="startDate") LocalDateTime var2, @Param(value="endDate") LocalDateTime var3, @Param(value="year") int var4);

    @Query(value="SELECT deptId FROM orgstructure.department_chart_details_his o WHERE ((o.created_time BETWEEN :startDate AND :endDate) OR (o.updated_Time BETWEEN :startDate AND :endDate) OR o.active=0) AND o.year=:year", nativeQuery=true)
    public List<Long> getAllDepartmentByDate(@Param(value="startDate") LocalDateTime var1, @Param(value="endDate") LocalDateTime var2, @Param(value="year") int var3);

    @Query(value="SELECT deptId FROM orgstructure.department_chart_details_his c WHERE c.orgId=:orgId AND c.active=:active AND c.year=:year", nativeQuery=true)
    public List<Long> getAllDepartmentByOrgId(@Param(value="orgId") Long var1, @Param(value="active") int var2, @Param(value="year") int var3);

    @Query(value="SELECT deptId FROM orgstructure.department_chart_details_his c WHERE c.deptId IN (:deptId) OR c.deptParentId IN (:deptId) AND c.year=:year", nativeQuery=true)
    public List<Long> getAllDeptId(@Param(value="deptId") List<Long> var1, @Param(value="year") int var2);

    @Query(value="SELECT c.* FROM orgstructure.department_chart_details_his c WHERE c.owner =:owner AND c.year=:year", nativeQuery=true)
    public List<DepartmentChartMappingHistory> findOwnerList(@Param(value="owner") Long var1, @Param(value="year") int var2);

    @Query(value="SELECT owner FROM orgstructure.department_chart_details_his c WHERE c.deptId IN (:deptId) AND c.year=:year", nativeQuery=true)
    public List<Long> findOwnerIDList(@Param(value="deptId") List<Long> var1, @Param(value="year") int var2);

    @Query(value="SELECT DISTINCT year FROM orgstructure.department_chart_details_his", nativeQuery=true)
    public List<Integer> findDistinctYearsFromHistory();

    public boolean existsByYear(int var1);
}

