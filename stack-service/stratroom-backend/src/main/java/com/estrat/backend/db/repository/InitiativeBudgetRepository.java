/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.InitiativesBudget
 *  com.estrat.backend.db.repository.InitiativeBudgetRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.backend.db.repository;

import com.estrat.backend.db.bean.po.InitiativesBudget;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface InitiativeBudgetRepository
extends JpaRepository<InitiativesBudget, Long> {
    @Query(value="SELECT o.* FROM orgstructure.initiatives_budget o WHERE  o.initiative_id=:initiative and o.end_date <=:endDate and o.org_id=:orgId order by o.end_date desc", nativeQuery=true)
    public List<InitiativesBudget> findByInitiativeIdwDate(@Param(value="initiative") String var1, @Param(value="endDate") LocalDateTime var2, @Param(value="orgId") Long var3);

    @Query(value="SELECT o.* FROM orgstructure.initiatives_budget o WHERE  o.initiative_id=:initiative and  o.end_date BETWEEN :startDate AND :endDate and o.org_id=:orgId order by o.end_date desc", nativeQuery=true)
    public List<InitiativesBudget> findByInitiativeIdbtwDate(@Param(value="initiative") String var1, @Param(value="orgId") Long var2, @Param(value="startDate") LocalDateTime var3, @Param(value="endDate") LocalDateTime var4);

    @Query(value="SELECT o FROM InitiativesBudget o WHERE  o.initiativeId=:initiative and o.orgId=:orgId  ")
    public List<InitiativesBudget> findByInitiativeId(@Param(value="initiative") String var1, @Param(value="orgId") Long var2);

    @Query(value="SELECT o.* FROM orgstructure.initiatives_budget o  WHERE  o.initiative_id in (:initiative) and o.end_date in (:endDate) and o.org_id=:orgId", nativeQuery=true)
    public List<InitiativesBudget> findByListInitiativeIdwDate(@Param(value="initiative") List<String> var1, @Param(value="endDate") List<LocalDateTime> var2, @Param(value="orgId") Long var3);

    @Query(value="SELECT o.* FROM orgstructure.initiatives_budget o WHERE  o.initiative_id=:initiative and o.end_date =:endDate and o.org_id=:orgId", nativeQuery=true)
    public InitiativesBudget findByInitiativeDate(@Param(value="initiative") String var1, @Param(value="endDate") LocalDateTime var2, @Param(value="orgId") Long var3);
}

