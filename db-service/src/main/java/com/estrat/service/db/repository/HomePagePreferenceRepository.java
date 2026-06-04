/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.HomePagePreferences
 *  com.estrat.service.db.repository.HomePagePreferenceRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.service.db.repository;

import com.estrat.service.db.bean.po.HomePagePreferences;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface HomePagePreferenceRepository
extends JpaRepository<HomePagePreferences, Long> {
    @Query(value="SELECT h FROM HomePagePreferences h WHERE h.id=:empId")
    public HomePagePreferences findPreferencesByEmpId(@Param(value="empId") long var1);

    @Query(value="SELECT h FROM HomePagePreferences h WHERE h.id=:empId AND h.pageName=:pageName")
    public HomePagePreferences findPreferences(@Param(value="empId") long var1, @Param(value="pageName") String var3);

    @Query(value="SELECT h FROM HomePagePreferences h WHERE h.id=:empId AND h.pageId=:pageId")
    public HomePagePreferences findPreferencesByPageId(@Param(value="empId") long var1, @Param(value="pageId") long var3);

    @Query(value="SELECT h FROM HomePagePreferences h WHERE  h.pageId=:pageId")
    public HomePagePreferences findPreferencesByPageId(@Param(value="pageId") long var1);
}

