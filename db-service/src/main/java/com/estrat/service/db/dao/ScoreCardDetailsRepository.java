/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.ScoreCardDetails
 *  com.estrat.service.db.dao.ScoreCardDetailsRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.service.db.dao;

import com.estrat.service.db.bean.po.ScoreCardDetails;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ScoreCardDetailsRepository
extends JpaRepository<ScoreCardDetails, Long> {
    @Query(value="SELECT s.* FROM orgstructure.score_card_details s where s.id = :id  AND s.active = :active", nativeQuery=true)
    public Optional<ScoreCardDetails> findByIdAndActive(@Param(value="id") Long var1, @Param(value="active") int var2);

    @Query(value="SELECT s.* FROM orgstructure.score_card_details s where s.id in (:id)  AND s.active = :active", nativeQuery=true)
    public List<ScoreCardDetails> findByIds(@Param(value="id") List<String> var1, @Param(value="active") int var2);

    @Query(value="SELECT s FROM ScoreCardDetails s, PagesDetails pd WHERE  s.owner=:empId and s.pageId.id=:pageId AND s.active =:active  AND (((s.endDate BETWEEN :startDate AND :endDate)  OR (s.startDate BETWEEN :startDate AND :endDate)) OR ((:startDate BETWEEN s.startDate AND s.endDate)  OR (:endDate BETWEEN s.startDate AND s.endDate)))")
    public ScoreCardDetails findAllByPageAndEmpIdByDate(@Param(value="empId") Long var1, @Param(value="active") int var2, @Param(value="pageId") long var3, @Param(value="startDate") Date var5, @Param(value="endDate") Date var6);

    @Query(value="SELECT s FROM ScoreCardDetails s, PagesDetails pd WHERE s.pageId.id=:pageId AND s.active =:active  AND (((s.endDate BETWEEN :startDate AND :endDate)  OR (s.startDate BETWEEN :startDate AND :endDate)) OR ((:startDate BETWEEN s.startDate AND s.endDate)  OR (:endDate BETWEEN s.startDate AND s.endDate)))")
    public ScoreCardDetails findAllByPageAnddeptIdByDate(@Param(value="active") int var1, @Param(value="pageId") long var2, @Param(value="startDate") Date var4, @Param(value="endDate") Date var5);

    @Query(value="SELECT s FROM ScoreCardDetails s where s.createdBy=:empId AND s.scorecardName = :name AND s.active = :active AND s.pageId.id =:pageId")
    public ScoreCardDetails findByName(@Param(value="empId") Long var1, @Param(value="name") String var2, @Param(value="pageId") long var3, @Param(value="active") int var5);

    @Query(value="SELECT s FROM ScoreCardDetails s where s.createdBy=:empId AND s.active = :active AND s.pageId.id =:pageId")
    public Optional<ScoreCardDetails> checkName(@Param(value="empId") Long var1, @Param(value="active") int var2, @Param(value="pageId") long var3);

    @Query(value="SELECT s FROM ScoreCardDetails s WHERE   s.createdBy=:empId AND s.active =:active AND (((s.endDate BETWEEN :startDate AND :endDate)  OR (s.startDate BETWEEN :startDate AND :endDate)) OR ((:startDate BETWEEN s.startDate AND s.endDate)  OR (:endDate BETWEEN s.startDate AND s.endDate))) ORDER BY s.createdTime DESC")
    public List<ScoreCardDetails> findAllByEmpIdByDate(@Param(value="empId") Long var1, @Param(value="active") int var2, @Param(value="startDate") Date var3, @Param(value="endDate") Date var4);

    @Query(value="SELECT s FROM ScoreCardDetails s WHERE   s.createdBy=:empId AND s.active =:active ORDER BY s.createdTime DESC")
    public List<ScoreCardDetails> findAllByEmpId(@Param(value="empId") Long var1, @Param(value="active") int var2);

    @Query(value="SELECT s FROM ScoreCardDetails s WHERE   s.departmentId=:deptId AND s.active =:active ORDER BY s.createdTime DESC")
    public List<ScoreCardDetails> scoreCardDetailListByDeptId(@Param(value="deptId") Long var1, @Param(value="active") int var2);

    @Query(value="SELECT s FROM ScoreCardDetails s WHERE   s.departmentId in (:deptId) AND s.active =:active ORDER BY s.createdTime DESC")
    public List<ScoreCardDetails> scoreCardListByDeptId(@Param(value="deptId") List<Long> var1, @Param(value="active") int var2);

    @Query(value="SELECT s FROM ScoreCardDetails s WHERE   s.owner in (:empId) AND s.active =:active ORDER BY s.createdTime DESC")
    public List<ScoreCardDetails> scoreCardListByEmpId(@Param(value="empId") List<Long> var1, @Param(value="active") int var2);

    @Query(value="SELECT s FROM ScoreCardDetails s, PagesDetails pd WHERE  s.createdBy=pd.createdBy AND s.createdBy=:empId and s.pageId.id=pd.id AND s.active =:active and pd.id=:pageId")
    public ScoreCardDetails findAllByPageAndEmpId(@Param(value="empId") Long var1, @Param(value="active") int var2, @Param(value="pageId") long var3);

    @Query(value="SELECT s FROM ScoreCardDetails s, PagesDetails pd WHERE  s.departmentId=pd.deptId and s.pageId.id=pd.id AND s.active =:active and pd.id=:pageId")
    public ScoreCardDetails findAllByPageAndDept(@Param(value="active") int var1, @Param(value="pageId") long var2);

    @Query(value="SELECT s FROM ScoreCardDetails s WHERE s.pageId.id =:pageId")
    public ScoreCardDetails findAllByPageId(@Param(value="pageId") long var1);

    @Query(value="SELECT s FROM ScoreCardDetails s WHERE s.pageId.id =:pageId AND s.owner=:owner ")
    public ScoreCardDetails findAllByPageIdAndOwner(@Param(value="pageId") long var1, @Param(value="owner") long var3);

    @Query(value="SELECT s FROM ScoreCardDetails s where  s.active = :active AND s.pageId.id =:pageId")
    public ScoreCardDetails findByPageId(@Param(value="pageId") long var1, @Param(value="active") int var3);

    @Query(value="SELECT s FROM ScoreCardDetails s where  s.active = :active")
    public List<ScoreCardDetails> findByAll(@Param(value="active") int var1);

    @Query(value="SELECT s FROM ScoreCardDetails s WHERE  s.pageId.id IN (:pageIds) AND s.active =:active ORDER BY s.createdTime DESC")
    public List<ScoreCardDetails> scoreCardDetailListByPageIds(@Param(value="pageIds") List<Long> var1, @Param(value="active") int var2);

    @Query(value="SELECT s FROM ScoreCardDetails s WHERE   s.pageId.id IN (:pageIds) AND s.active =:active ORDER BY s.createdTime DESC")
    public List<ScoreCardDetails> findAllByPageIds(@Param(value="pageIds") List<Long> var1, @Param(value="active") int var2);

    @Query(value="SELECT s FROM ScoreCardDetails s WHERE s.pageId.id =:pageId  AND s.departmentId=:deptId ")
    public ScoreCardDetails findAllByPageIdANDDeptId(@Param(value="pageId") long var1, @Param(value="deptId") long var3);

    @Query(value="SELECT s FROM ScoreCardDetails s WHERE s.pageId.id IN (:pageId) AND s.active =:active  AND (((s.endDate BETWEEN :startDate AND :endDate)  OR (s.startDate BETWEEN :startDate AND :endDate)) OR ((:startDate BETWEEN s.startDate AND s.endDate)  OR (:endDate BETWEEN s.startDate AND s.endDate)))")
    public List<ScoreCardDetails> findAllByPageIdsAnddeptIdByDate(@Param(value="active") int var1, @Param(value="pageId") List<Long> var2, @Param(value="startDate") Date var3, @Param(value="endDate") Date var4);
}

