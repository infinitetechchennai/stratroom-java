/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.UniversalIncident
 *  com.estrat.service.db.dao.UniversalIncidentRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.service.db.dao;

import com.estrat.service.db.bean.po.UniversalIncident;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UniversalIncidentRepository
extends JpaRepository<UniversalIncident, Long> {
    @Query(value="SELECT u FROM UniversalIncident u where u.id = :id  AND u.active = :active")
    public Optional<UniversalIncident> findByIdAndActive(@Param(value="id") Long var1, @Param(value="active") int var2);

    @Query(value="SELECT u FROM UniversalIncident u WHERE   u.pageId =:pageId AND u.active =:active")
    public List<UniversalIncident> findAllByPageId(@Param(value="pageId") long var1, @Param(value="active") int var3);
}

