/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.Master
 *  com.estrat.backend.db.dao.MasterRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.stereotype.Repository
 */
package com.estrat.backend.db.dao;

import com.estrat.backend.db.bean.po.Master;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MasterRepository
extends JpaRepository<Master, Long> {
    public Optional<Master> findByMasterName(String var1);

    public Optional<Master> findByMasterNameAndDepartMent(String var1, String var2);
}

