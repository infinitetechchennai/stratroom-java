/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.RpoTableHistory
 *  com.estrat.backend.db.dao.RpoTableHistoryRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.backend.db.dao;

import com.estrat.backend.db.bean.po.RpoTableHistory;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RpoTableHistoryRepository
extends JpaRepository<RpoTableHistory, Long> {
    @Query(value="SELECT r FROM RpoTableHistory r WHERE r.rpoId = :rpoId ORDER BY r.version DESC")
    public List<RpoTableHistory> findAllByRpoId(@Param(value="rpoId") Long var1);

    @Query(value="SELECT r FROM RpoTableHistory r WHERE r.rpoId = :rpoId AND r.version = :version")
    public Optional<RpoTableHistory> findByRpoIdAndVersion(@Param(value="rpoId") Long var1, @Param(value="version") Long var2);

    @Query(value="SELECT COUNT(r) FROM RpoTableHistory r WHERE r.rpoId = :rpoId")
    public long countByRiskId(@Param(value="rpoId") Long var1);
}

