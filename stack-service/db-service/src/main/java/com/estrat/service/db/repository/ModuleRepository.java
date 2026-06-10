/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.ModuleDetailsPo
 *  com.estrat.service.db.repository.ModuleRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.service.db.repository;

import com.estrat.service.db.bean.po.ModuleDetailsPo;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ModuleRepository
extends JpaRepository<ModuleDetailsPo, Long> {
    @Query(value="SELECT md FROM ModuleDetailsPo md ORDER BY md.moduleName ASC")
    public List<ModuleDetailsPo> getModuleList();

    @Query(value="SELECT md FROM ModuleDetailsPo md WHERE md.moduleName =:name ORDER BY md.moduleName ASC")
    public List<ModuleDetailsPo> getModuleListByName(@Param(value="name") String var1);

    @Query(value="SELECT md FROM ModuleDetailsPo md  WHERE md.moduleName =:name AND md.tagName =:tagName")
    public ModuleDetailsPo getModuleByName(@Param(value="name") String var1, @Param(value="tagName") String var2);
}

