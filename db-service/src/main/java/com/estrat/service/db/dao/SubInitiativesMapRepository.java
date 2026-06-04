/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.SubInitiativesMap
 *  com.estrat.service.db.dao.SubInitiativesMapRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.service.db.dao;

import com.estrat.service.db.bean.po.SubInitiativesMap;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface SubInitiativesMapRepository
extends JpaRepository<SubInitiativesMap, Long> {
    @Query(value="SELECT s FROM orgstructure.sub_initiatives_map s WHERE s.sub_initiative_id = :subInitiativesId", nativeQuery=true)
    public List<SubInitiativesMap> findAllBySubInitiativesId(@Param(value="subInitiativesId") Long var1);

    @Query(value="SELECT s FROM orgstructure.sub_initiatives_map s WHERE s.emp_id = :empId", nativeQuery=true)
    public List<SubInitiativesMap> findAllByOwnerId(@Param(value="empId") Long var1);

    @Query(value="SELECT * FROM orgstructure.sub_initiatives_map s WHERE  s.sub_initiative_id=:subInitiativesId AND s.emp_id=:owner", nativeQuery=true)
    public SubInitiativesMap findAllByEmpIdANDSubInitiativesId(@Param(value="subInitiativesId") Long var1, @Param(value="owner") long var2);
}

