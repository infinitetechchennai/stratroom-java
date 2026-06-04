/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.MissionVisionValue
 *  com.estrat.service.db.dao.MissionVisionValueRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.service.db.dao;

import com.estrat.service.db.bean.po.MissionVisionValue;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface MissionVisionValueRepository
extends JpaRepository<MissionVisionValue, Long> {
    @Query(value="SELECT m FROM MissionVisionValue m WHERE   (m.owner=:empId OR m.createdBy=:empId)")
    public List<MissionVisionValue> findAllByEmpId(@Param(value="empId") Long var1);
}

