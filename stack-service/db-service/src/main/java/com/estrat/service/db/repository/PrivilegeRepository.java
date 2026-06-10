/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.PrivilegeDetailsPo
 *  com.estrat.service.db.repository.PrivilegeRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.service.db.repository;

import com.estrat.service.db.bean.po.PrivilegeDetailsPo;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PrivilegeRepository
extends JpaRepository<PrivilegeDetailsPo, Long> {
    @Query(value="SELECT pd FROM PrivilegeDetailsPo pd")
    public List<PrivilegeDetailsPo> getPrivilegeList();

    @Query(value="SELECT pd FROM PrivilegeDetailsPo pd WHERE privilegeName =:name1")
    public List<PrivilegeDetailsPo> getPrivilegeListByName(@Param(value="name1") String var1);

    @Query(value="SELECT pd FROM PrivilegeDetailsPo pd WHERE privilegeName =:name1 OR privilegeName =:name2")
    public List<PrivilegeDetailsPo> getPrivilegeListByName(@Param(value="name1") String var1, @Param(value="name2") String var2);

    @Query(value="SELECT pd FROM PrivilegeDetailsPo pd WHERE privilegeName =:name1 OR privilegeName =:name2 OR privilegeName =:name3")
    public List<PrivilegeDetailsPo> getPrivilegeListByName(@Param(value="name1") String var1, @Param(value="name2") String var2, @Param(value="name3") String var3);
}

