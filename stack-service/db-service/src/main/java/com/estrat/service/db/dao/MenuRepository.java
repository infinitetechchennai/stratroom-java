/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.MenuDetails
 *  com.estrat.service.db.dao.MenuRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.service.db.dao;

import com.estrat.service.db.bean.po.MenuDetails;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface MenuRepository
extends JpaRepository<MenuDetails, Long> {
    @Query(value="SELECT t FROM MenuDetails t where t.id = :id ")
    public Optional<MenuDetails> findByIdAndActive(@Param(value="id") Long var1);

    @Query(value="SELECT t FROM MenuDetails t WHERE  t.owner=:empId OR t.createdBy=:empId")
    public List<MenuDetails> findAllByEmpId(@Param(value="empId") Long var1);
}

