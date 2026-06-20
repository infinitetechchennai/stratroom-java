/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.ProcessEnablerHistory
 *  com.estrat.backend.db.dao.ProcessEnablerHistoryRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.backend.db.dao;

import com.estrat.backend.db.bean.po.ProcessEnablerHistory;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProcessEnablerHistoryRepository
extends JpaRepository<ProcessEnablerHistory, Long> {
    @Query(value="SELECT r FROM ProcessEnablerHistory r WHERE r.posId = :posId ORDER BY r.version DESC")
    public List<ProcessEnablerHistory> findAllByPOSId(@Param(value="posId") Long var1);

    @Query(value="SELECT r FROM ProcessEnablerHistory r WHERE r.posId = :posId AND r.version = :version")
    public Optional<ProcessEnablerHistory> findByPosIdAndVersion(@Param(value="posId") Long var1, @Param(value="version") Long var2);

    @Query(value="SELECT COUNT(r) FROM ProcessEnablerHistory r WHERE r.posId = :posId")
    public long countByRiskId(@Param(value="posId") Long var1);
}

