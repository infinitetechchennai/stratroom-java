/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.InitiativesTracker
 *  com.estrat.service.db.repository.InitiativeTrackerRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.service.db.repository;

import com.estrat.service.db.bean.po.InitiativesTracker;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface InitiativeTrackerRepository
extends JpaRepository<InitiativesTracker, Long> {
    @Query(value="SELECT o.* FROM orgstructure.initiatives_tracker o WHERE  o.initiative_id=:initiative and o.end_date <=:endDate and o.org_id=:orgId order by o.end_date desc", nativeQuery=true)
    public List<InitiativesTracker> findByInitiativeIdwDate(@Param(value="initiative") String var1, @Param(value="endDate") Date var2, @Param(value="orgId") Long var3);

    @Query(value="SELECT o.* FROM orgstructure.initiatives_tracker o WHERE  (o.initiative_id=:initiative OR o.initiative_id=:initiativeid) and o.end_date <=:endDate and o.org_id=:orgId order by o.end_date desc", nativeQuery=true)
    public List<InitiativesTracker> findByInitiativeIdwDate(@Param(value="initiative") String var1, @Param(value="initiativeid") String var2, @Param(value="endDate") Date var3, @Param(value="orgId") Long var4);

    @Query(value="SELECT o.* FROM orgstructure.initiatives_tracker o WHERE  o.initiative_id=:initiative and  o.end_date BETWEEN :startDate AND :endDate and o.org_id=:orgId order by o.end_date desc", nativeQuery=true)
    public List<InitiativesTracker> findByInitiativeIdbtwDate(@Param(value="initiative") String var1, @Param(value="orgId") Long var2, @Param(value="startDate") LocalDateTime var3, @Param(value="endDate") LocalDateTime var4);

    @Query(value="SELECT o.* FROM orgstructure.initiatives_tracker o WHERE  (o.initiative_id=:initiative OR o.initiative_id=:initiativeid) and  o.end_date BETWEEN :startDate AND :endDate and o.org_id=:orgId order by o.end_date desc", nativeQuery=true)
    public List<InitiativesTracker> findByInitiativeIdbtwDate(@Param(value="initiative") String var1, @Param(value="initiativeid") String var2, @Param(value="orgId") Long var3, @Param(value="startDate") LocalDateTime var4, @Param(value="endDate") LocalDateTime var5);

    @Query(value="SELECT o FROM InitiativesTracker o WHERE  o.initiative_id=:initiative and o.orgId=:orgId  ")
    public List<InitiativesTracker> findByInitiativeId(@Param(value="initiative") String var1, @Param(value="orgId") Long var2);

    @Query(value="SELECT o.* FROM orgstructure.initiatives_tracker o  WHERE  o.initiative_id in (:initiative) and o.end_date in (:endDate) and o.org_id=:orgId", nativeQuery=true)
    public List<InitiativesTracker> findByListInitiativeIdwDate(@Param(value="initiative") List<String> var1, @Param(value="endDate") List<LocalDateTime> var2, @Param(value="orgId") Long var3);

    @Query(value="SELECT o.* FROM orgstructure.initiatives_tracker o WHERE  o.initiative_id=:initiative and o.end_date =:endDate and o.org_id=:orgId", nativeQuery=true)
    public InitiativesTracker findByInitiativeDate(@Param(value="initiative") String var1, @Param(value="endDate") LocalDateTime var2, @Param(value="orgId") Long var3);
}

