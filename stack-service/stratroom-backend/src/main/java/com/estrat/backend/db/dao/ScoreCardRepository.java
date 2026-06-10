/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.ScoreCard
 *  com.estrat.backend.db.dao.ScoreCardRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.backend.db.dao;

import com.estrat.backend.db.bean.po.ScoreCard;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ScoreCardRepository
extends JpaRepository<ScoreCard, Long> {
    @Query(value="SELECT t FROM ScoreCard t where t.id = :id  AND t.active = :active")
    public Optional<ScoreCard> findByIdAndActive(@Param(value="id") Long var1, @Param(value="active") int var2);

    @Query(value="SELECT t FROM ScoreCard t WHERE   t.createdBy=:empId AND t.active =:active")
    public List<ScoreCard> findAllByEmpId(@Param(value="empId") Long var1, @Param(value="active") int var2);

    @Query(value="SELECT t FROM ScoreCard t, PagesDetails pd WHERE  t.createdBy=pd.createdBy AND t.createdBy=:empId and t.pageId.id=pd.id AND t.active =:active and pd.id=:pageId")
    public List<ScoreCard> findAllByPageAndEmpId(@Param(value="empId") Long var1, @Param(value="active") int var2, @Param(value="pageId") long var3);

    @Query(value="SELECT t FROM ScoreCard t, PagesDetails pd WHERE  t.createdBy=pd.createdBy and t.pageId.id=pd.id  and pd.id=:pageId")
    public List<ScoreCard> findAllByPageId(@Param(value="pageId") long var1);

    @Query(value="SELECT t FROM ScoreCard t WHERE t.active =:active")
    public List<ScoreCard> findAllByActive(@Param(value="active") int var1);

    @Query(value="SELECT t FROM ScoreCard t, PagesDetails pd WHERE  t.createdBy=pd.createdBy AND t.createdBy=:empId and t.pageId.id=pd.id AND t.active =:active and pd.id=:pageId AND (((t.endDate BETWEEN :startDate AND :endDate)  OR (t.startDate BETWEEN :startDate AND :endDate)) OR ((:startDate BETWEEN t.startDate AND t.endDate)  OR (:endDate BETWEEN t.startDate AND t.endDate)))")
    public List<ScoreCard> findAllByPageAndEmpIdByDate(@Param(value="empId") Long var1, @Param(value="active") int var2, @Param(value="pageId") long var3, @Param(value="startDate") Date var5, @Param(value="endDate") Date var6);

    @Query(value="SELECT t FROM ScoreCard t WHERE   t.createdBy=:empId AND t.active =:active AND (((t.endDate BETWEEN :startDate AND :endDate)  OR (t.startDate BETWEEN :startDate AND :endDate)) OR ((:startDate BETWEEN t.startDate AND t.endDate)  OR (:endDate BETWEEN t.startDate AND t.endDate)))")
    public List<ScoreCard> findAllByEmpIdByDate(@Param(value="empId") Long var1, @Param(value="active") int var2, @Param(value="startDate") Date var3, @Param(value="endDate") Date var4);

    @Query(value="SELECT t FROM ScoreCard t WHERE   t.scoreCardDetailsId.id = :detailsId AND t.active =:active AND (((t.endDate BETWEEN :startDate AND :endDate)  OR (t.startDate BETWEEN :startDate AND :endDate)) OR ((:startDate BETWEEN t.startDate AND t.endDate)  OR (:endDate BETWEEN t.startDate AND t.endDate))) ORDER BY t.id ASC ")
    public List<ScoreCard> findAllByDetailsIdANDDate(@Param(value="detailsId") Long var1, @Param(value="active") int var2, @Param(value="startDate") Date var3, @Param(value="endDate") Date var4);

    @Query(value="SELECT t FROM ScoreCard t WHERE   t.scoreCardDetailsId.id=:detailsId AND t.active =:active")
    public List<ScoreCard> findAllByDetails(@Param(value="detailsId") Long var1, @Param(value="active") int var2);
}

