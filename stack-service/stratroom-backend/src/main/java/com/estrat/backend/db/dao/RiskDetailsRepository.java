/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.RiskDetails
 *  com.estrat.backend.db.dao.RiskDetailsRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.backend.db.dao;

import com.estrat.backend.db.bean.po.RiskDetails;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RiskDetailsRepository
extends JpaRepository<RiskDetails, Long> {
    @Query(value="SELECT r FROM RiskDetails r where r.id = :id  AND r.active = :active")
    public Optional<RiskDetails> findByIdAndActive(@Param(value="id") Long var1, @Param(value="active") int var2);

    @Query(value="SELECT r FROM RiskDetails r WHERE   (r.owner=:empId OR r.createdBy=:empId) AND r.active =:active order  by r.id asc")
    public List<RiskDetails> findAllByEmpId(@Param(value="empId") Long var1, @Param(value="active") int var2);

    @Query(value="SELECT r FROM RiskDetails r WHERE   r.impactId=:kpiId AND r.active =:active")
    public List<RiskDetails> findAllByKpiId(@Param(value="kpiId") Long var1, @Param(value="active") int var2);

    @Query(value="SELECT r FROM RiskDetails r WHERE   (r.owner=:empId OR r.createdBy=:empId) AND r.active =:active  AND r.pageId.id =:pageId order  by r.id asc")
    public List<RiskDetails> findAllByEmpId(@Param(value="empId") Long var1, @Param(value="active") int var2, @Param(value="pageId") Long var3);

    @Query(value="SELECT r FROM RiskDetails r WHERE  r.active =:active  AND r.pageId.id =:pageId order  by r.id asc")
    public List<RiskDetails> findAllByPageId(@Param(value="active") int var1, @Param(value="pageId") Long var2);

    @Query(value="SELECT r FROM RiskDetails r WHERE  r.pageId.id =:pageId")
    public List<RiskDetails> findAllByPageId(@Param(value="pageId") Long var1);

    @Query(value="SELECT r FROM RiskDetails r WHERE  r.pageId.id =:pageId AND r.active =:active")
    public RiskDetails findAllByPageId(@Param(value="pageId") Long var1, @Param(value="active") int var2);

    @Query(value="SELECT r FROM RiskDetails r WHERE   (r.owner=:empId OR r.createdBy=:empId) AND r.active =:active  AND r.pageId.id =:pageId AND  (((r.completedDate BETWEEN :startDate AND :endDate)  OR (r.createdTime BETWEEN :startDate AND :endDate)  OR (r.raisedDate BETWEEN :startDate AND :endDate)) OR ((:startDate BETWEEN r.raisedDate AND r.completedDate)  OR (:endDate BETWEEN r.raisedDate AND r.completedDate))) order  by r.id asc")
    public List<RiskDetails> findAllByEmpIdANDDate(@Param(value="empId") Long var1, @Param(value="active") int var2, @Param(value="pageId") Long var3, @Param(value="startDate") Date var4, @Param(value="endDate") Date var5);

    @Query(value="SELECT r FROM RiskDetails r WHERE   r.active =:active  AND r.pageId.id =:pageId AND  (((r.completedDate BETWEEN :startDate AND :endDate)  OR (r.createdTime BETWEEN :startDate AND :endDate)  OR (r.raisedDate BETWEEN :startDate AND :endDate)) OR ((:startDate BETWEEN r.raisedDate AND r.completedDate)  OR (:endDate BETWEEN r.raisedDate AND r.completedDate))) order  by r.id asc")
    public List<RiskDetails> findAllByPageANDDate(@Param(value="active") int var1, @Param(value="pageId") Long var2, @Param(value="startDate") Date var3, @Param(value="endDate") Date var4);

    @Query(value="SELECT r FROM RiskDetails r WHERE  (r.owner=:empId OR r.createdBy=:empId) AND r.active =:active AND  (((r.completedDate BETWEEN :startDate AND :endDate) OR (r.createdTime BETWEEN :startDate AND :endDate) OR (r.raisedDate BETWEEN :startDate AND :endDate)) OR ((:startDate BETWEEN r.raisedDate AND r.completedDate)  OR (:endDate BETWEEN r.raisedDate AND r.completedDate))) order  by r.id asc")
    public List<RiskDetails> findAllByEmpIdANDDate(@Param(value="empId") Long var1, @Param(value="active") int var2, @Param(value="startDate") Date var3, @Param(value="endDate") Date var4);

    @Query(value="SELECT r FROM RiskDetails r WHERE  r.departmentId=:deptId AND r.active =:active")
    public List<RiskDetails> findAllByDeptId(@Param(value="deptId") Long var1, @Param(value="active") int var2);

    @Query(value="SELECT r FROM RiskDetails r WHERE   r.owner IN (:empIds) AND r.active =:active order  by r.id asc")
    public List<RiskDetails> findAllByEmpIds(@Param(value="empIds") List<Long> var1, @Param(value="active") int var2);

    @Query(value="SELECT DISTINCT r.owner ,r.id FROM RiskDetails r WHERE   r.id IN (:ids) AND r.active =:active order  by r.id asc")
    public List<Long> findOwnerByRiskIds(@Param(value="ids") List<Long> var1, @Param(value="active") int var2);

    @Query(value="SELECT r FROM RiskDetails r WHERE   r.id IN (:ids) AND r.active =:active order  by r.id asc")
    public List<RiskDetails> findByRiskIds(@Param(value="ids") List<Long> var1, @Param(value="active") int var2);

    @Query(value="SELECT r FROM RiskDetails r WHERE  r.pageId.id IN (:ids) AND r.active =:active")
    public List<RiskDetails> findAllByPageIds(@Param(value="ids") List<Long> var1, @Param(value="active") int var2);

    @Query(value="SELECT r FROM RiskDetails r WHERE  r.departmentId IN (:deptIds) AND r.active =:active")
    public List<RiskDetails> findAllByDeptIds(@Param(value="deptIds") List<Long> var1, @Param(value="active") int var2);

    @Query(value="SELECT r FROM RiskDetails r WHERE   r.active =:active  AND r.pageId.id IN (:pageIds) AND  (((r.completedDate BETWEEN :startDate AND :endDate)  OR (r.createdTime BETWEEN :startDate AND :endDate)  OR (r.raisedDate BETWEEN :startDate AND :endDate)) OR ((:startDate BETWEEN r.raisedDate AND r.completedDate)  OR (:endDate BETWEEN r.raisedDate AND r.completedDate))) order  by r.id asc")
    public List<RiskDetails> findAllByPageIdsANDDateRanges(@Param(value="active") int var1, @Param(value="pageIds") List<Long> var2, @Param(value="startDate") Date var3, @Param(value="endDate") Date var4);

    @Query(value="SELECT r FROM RiskDetails r WHERE r.id = :id AND r.status = :status")
    public Optional<RiskDetails> findByIdAndStatus(@Param(value="id") Long var1, @Param(value="status") String var2);

    @Query(value="SELECT r FROM RiskDetails r WHERE r.status = :status AND r.active = 0 ORDER BY r.id ASC")
    public List<RiskDetails> findAllByStatus(@Param(value="status") String var1);

    @Query(value="SELECT r FROM RiskDetails r WHERE r.version = :version AND r.active = 0")
    public List<RiskDetails> findByVersion(@Param(value="version") Long var1);

    @Query(value="SELECT r FROM RiskDetails r WHERE r.changeId = :changeId")
    public List<RiskDetails> findByChangeId(@Param(value="changeId") Long var1);

    @Query(value="SELECT r FROM RiskDetails r WHERE   r.id IN (:ids) AND r.active =:active  AND  (((r.completedDate BETWEEN :startDate AND :endDate)  OR (r.createdTime BETWEEN :startDate AND :endDate)  OR (r.raisedDate BETWEEN :startDate AND :endDate)) OR ((:startDate BETWEEN r.raisedDate AND r.completedDate)  OR (:endDate BETWEEN r.raisedDate AND r.completedDate))) order  by r.id asc")
    public List<RiskDetails> findByRiskIdsANDDateRanges(@Param(value="ids") List<Long> var1, @Param(value="active") int var2, @Param(value="startDate") Date var3, @Param(value="endDate") Date var4);

    @Query(value="SELECT r FROM RiskDetails r WHERE   ( r.owner IN (:empIds)  OR  r.createdBy IN (:empIds) )  AND r.active =:active AND  (((r.completedDate BETWEEN :startDate AND :endDate) OR (r.createdTime BETWEEN :startDate AND :endDate) OR (r.raisedDate BETWEEN :startDate AND :endDate)) OR ((:startDate BETWEEN r.raisedDate AND r.completedDate)  OR (:endDate BETWEEN r.raisedDate AND r.completedDate))) order  by r.id asc")
    public List<RiskDetails> findAllByEmpIdANDDate(@Param(value="empIds") List<Long> var1, @Param(value="active") int var2, @Param(value="startDate") Date var3, @Param(value="endDate") Date var4);

    @Query(value="SELECT r FROM RiskDetails r WHERE    ( ( r.owner IN (:empIds) ) OR  ( r.createdBy IN (:empIds) ) ) AND r.active =:active order  by r.id asc")
    public List<RiskDetails> findAllByEmpId(@Param(value="empIds") List<Long> var1, @Param(value="active") int var2);
}

