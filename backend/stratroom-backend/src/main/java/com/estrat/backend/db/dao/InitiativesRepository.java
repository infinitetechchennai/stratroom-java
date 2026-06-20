/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.Initiatives
 *  com.estrat.backend.db.dao.InitiativesRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.backend.db.dao;

import com.estrat.backend.db.bean.po.Initiatives;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface InitiativesRepository
extends JpaRepository<Initiatives, Long> {
    @Query(value="SELECT t FROM Initiatives t where t.id = :id  AND t.active = :active")
    public Optional<Initiatives> findByIdAndActive(@Param(value="id") Long var1, @Param(value="active") int var2);

    @Query(value="SELECT t FROM Initiatives t WHERE t.owner=:empId  AND t.active =:active")
    public List<Initiatives> findAllByEmpId(@Param(value="empId") Long var1, @Param(value="active") int var2);

    @Query(value="SELECT t FROM Initiatives t WHERE  t.createdBy=:empId and t.pageId.id=:pageId AND t.active =:active")
    public List<Initiatives> findAllByPageAndEmpId(@Param(value="empId") Long var1, @Param(value="active") int var2, @Param(value="pageId") long var3);

    @Query(value="SELECT t FROM Initiatives t WHERE t.pageId.id=:pageId AND t.active =:active")
    public List<Initiatives> findAllByPage(@Param(value="active") int var1, @Param(value="pageId") long var2);

    @Query(value="SELECT t FROM Initiatives t WHERE   t.impactId=:kpiId AND t.active =:active")
    public List<Initiatives> findAllByKpiId(@Param(value="kpiId") Long var1, @Param(value="active") int var2);

    @Query(value="SELECT t FROM Initiatives t WHERE   t.createdBy=:empId AND t.pageId.id=:pageId AND t.active =:active AND (((t.endDate BETWEEN :startDate AND :endDate)  OR (t.startDate BETWEEN :startDate AND :endDate)) OR ((:startDate BETWEEN t.startDate AND t.endDate)  OR (:endDate BETWEEN t.startDate AND t.endDate)))")
    public List<Initiatives> findAllByPageAndEmpIdAndStartAndEndDate(@Param(value="empId") Long var1, @Param(value="active") int var2, @Param(value="pageId") long var3, @Param(value="startDate") Date var5, @Param(value="endDate") Date var6);

    @Query(value="SELECT t FROM Initiatives t WHERE   t.owner=:empId AND t.active =:active AND (((t.endDate BETWEEN :startDate AND :endDate)  OR (t.startDate BETWEEN :startDate AND :endDate)) OR ((:startDate BETWEEN t.startDate AND t.endDate)  OR (:endDate BETWEEN t.startDate AND t.endDate)))")
    public List<Initiatives> findAllByEmpIdAndStartAndEndDate(@Param(value="empId") Long var1, @Param(value="active") int var2, @Param(value="startDate") Date var3, @Param(value="endDate") Date var4);

    @Query(value="SELECT t FROM Initiatives t WHERE  t.pageId.id=:pageId AND t.active =:active AND (((t.endDate BETWEEN :startDate AND :endDate)  OR (t.startDate BETWEEN :startDate AND :endDate)) OR ((:startDate BETWEEN t.startDate AND t.endDate)  OR (:endDate BETWEEN t.startDate AND t.endDate)))")
    public List<Initiatives> findAllByPageAndStartAndEndDate(@Param(value="active") int var1, @Param(value="pageId") long var2, @Param(value="startDate") Date var4, @Param(value="endDate") Date var5);

    @Query(value="SELECT t FROM Initiatives t WHERE  t.pageId.id=:pageId")
    public List<Initiatives> findAllByPageId(@Param(value="pageId") long var1);

    @Query(value="SELECT t FROM Initiatives t WHERE  t.active =:active")
    public List<Initiatives> findAll(@Param(value="active") int var1);

    @Query(value="SELECT t FROM Initiatives t WHERE t.departmentId=:deptId  AND t.active =:active")
    public List<Initiatives> findAllByDeptId(@Param(value="deptId") Long var1, @Param(value="active") int var2);

    @Query(value="SELECT t FROM Initiatives t WHERE  t.pageId.id=:pageId and t.active =:active")
    public Initiatives findAllByPageId(@Param(value="pageId") long var1, @Param(value="active") int var3);

    @Query(value="SELECT t FROM Initiatives t WHERE t.owner IN (:empIds)  AND t.active =:active")
    public List<Initiatives> findAllByEmpIds(@Param(value="empIds") List<Long> var1, @Param(value="active") int var2);

    @Query(value="SELECT t FROM Initiatives t WHERE t.departmentId IN (:deptIds)  AND t.active =:active")
    public List<Initiatives> findAllBydeptIds(@Param(value="deptIds") List<Long> var1, @Param(value="active") int var2);

    @Query(value="SELECT DISTINCT owner FROM Initiatives t WHERE t.id IN (:ids)  AND t.active =:active")
    public List<Long> findOwnerByInitiativeIds(@Param(value="ids") List<Long> var1, @Param(value="active") int var2);

    @Query(value="SELECT t FROM Initiatives t WHERE t.pageId.id IN (:pageIds) AND t.active =:active AND (((t.endDate BETWEEN :startDate AND :endDate)  OR (t.startDate BETWEEN :startDate AND :endDate)) OR ((:startDate BETWEEN t.startDate AND t.endDate)  OR (:endDate BETWEEN t.startDate AND t.endDate)))")
    public List<Initiatives> findAllByPageIds(@Param(value="pageIds") List<Long> var1, @Param(value="active") int var2, @Param(value="startDate") Date var3, @Param(value="endDate") Date var4);

    @Query(value="SELECT t FROM Initiatives t WHERE t.id IN (:ids)  AND t.active =:active")
    public List<Initiatives> findByInitiativeIds(@Param(value="ids") List<Long> var1, @Param(value="active") int var2);

    @Query(value="SELECT t FROM Initiatives t WHERE t.id IN (:ids)  AND t.active =:active  AND (((t.endDate BETWEEN :startDate AND :endDate)  OR (t.startDate BETWEEN :startDate AND :endDate)) OR ((:startDate BETWEEN t.startDate AND t.endDate)  OR (:endDate BETWEEN t.startDate AND t.endDate)))")
    public List<Initiatives> findByInitiativeIdsWithDate(@Param(value="ids") List<Long> var1, @Param(value="active") int var2, @Param(value="startDate") Date var3, @Param(value="endDate") Date var4);
}

