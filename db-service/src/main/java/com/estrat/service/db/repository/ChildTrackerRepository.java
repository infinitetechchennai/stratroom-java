/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.ChildTracker
 *  com.estrat.service.db.repository.ChildTrackerRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Modifying
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.service.db.repository;

import com.estrat.service.db.bean.po.ChildTracker;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ChildTrackerRepository
extends JpaRepository<ChildTracker, Long> {
    @Query(value="SELECT o FROM ChildTracker o WHERE  o.parentId=:parentid ")
    public List<ChildTracker> findByParentId(@Param(value="parentid") long var1);

    @Query(value="SELECT o FROM ChildTracker o WHERE  o.parentId in (:parentid) ")
    public List<ChildTracker> findByListParent(@Param(value="parentid") List<Long> var1);

    @Query(value="SELECT o.* FROM orgstructure.child_tracker o WHERE  o.parent_id = :parentid AND (o.to_date is null OR (o.to_date between :fromDt and :toDt)) AND (o.from_date < :fromDt OR (o.from_date between :fromDt and :toDt))", nativeQuery=true)
    public List<ChildTracker> findByListParent(@Param(value="parentid") Long var1, @Param(value="fromDt") String var2, @Param(value="toDt") String var3);

    @Query(value="SELECT o.*  FROM orgstructure.child_tracker  o WHERE  o.parent_id in (:parentid) AND o.child_id= :childId AND o.to_date is null ", nativeQuery=true)
    public List<ChildTracker> findByListParentwoEndDate(@Param(value="parentid") List<Long> var1, @Param(value="childId") Long var2);

    @Query(value="SELECT o FROM ChildTracker o WHERE  o.parentId = :parentid AND o.childId= :childId AND o.toDate is null ")
    public List<ChildTracker> findByListParentwoEndDate(@Param(value="parentid") Long var1, @Param(value="childId") Long var2);

    @Query(value="SELECT o.*  FROM orgstructure.child_tracker  o  WHERE  o.parent_id in (:parentid) AND o.child_id= :childId AND (o.to_date is null OR (o.to_date between :fromDt and :toDt)) ", nativeQuery=true)
    public List<ChildTracker> findByListParentwoEndDate(@Param(value="parentid") List<Long> var1, @Param(value="childId") Long var2, @Param(value="fromDt") String var3, @Param(value="toDt") String var4);

    @Query(value="WITH ChildHierarchy AS (  SELECT  c.* FROM  child_tracker c  WHERE c.parentId in (:parentid) and c.type=:type   UNION ALL   SELECT t.* FROM  child_tracker t  INNER JOIN     ChildHierarchy c ON t.childId = c.parentId) SELECT  distinct ch FROM  ChildHierarchy ch ", nativeQuery=true)
    public List<ChildTracker> findByListwDateRanges(@Param(value="parentid") List<Long> var1, String var2);

    @Modifying
    @Query(value="update ChildTracker o set o.toDate=CURRENT_TIMESTAMP WHERE  o.parentId in (:parentid) AND o.childId= :childId AND o.toDate is null ")
    public void updateParentwoEndDate(@Param(value="parentid") List<Long> var1, @Param(value="childId") Long var2);

    @Modifying
    @Query(value="update ChildTracker o set o.toDate=CURRENT_TIMESTAMP WHERE  o.parentId = :parentid AND o.childId= :childId AND o.toDate is null ")
    public void updateParentwoEndDate(@Param(value="parentid") Long var1, @Param(value="childId") Long var2);
}

