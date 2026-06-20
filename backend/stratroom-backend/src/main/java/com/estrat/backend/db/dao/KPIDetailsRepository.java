/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.KPIDetailsPo
 *  com.estrat.backend.db.dao.KPIDetailsRepository
 *  com.estrat.backend.db.dao.Kpiblank
 *  com.estrat.backend.db.dto.KpiElementPoObject
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Modifying
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.backend.db.dao;

import com.estrat.backend.db.bean.po.KPIDetailsPo;
import com.estrat.backend.db.dao.Kpiblank;
import com.estrat.backend.db.dto.KpiElementPoObject;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface KPIDetailsRepository
extends JpaRepository<KPIDetailsPo, Long> {
    @Query(value="SELECT  * FROM orgstructure.org_kpi_details t where t.node_key = :nodeKey  AND t.org_key = :orgKey AND t.real_date_from = :fromDate AND t.real_date_to = :toDate", nativeQuery=true)
    public List<KPIDetailsPo> findBykeyandDate(@Param(value="nodeKey") Long var1, @Param(value="orgKey") Long var2, @Param(value="fromDate") String var3, @Param(value="toDate") String var4);

    @Query(value="SELECT  node_key FROM orgstructure.kpi_element_details k where k.measure_name = :kpiName  AND k.org_id = :orgKey AND k.element_type = 'ELEMENT' limit 1", nativeQuery=true)
    public long findnodekeybymeasurename(@Param(value="kpiName") String var1, @Param(value="orgKey") Long var2);

    @Query(value="SELECT  distinct node_key FROM orgstructure.org_kpi_details o where o.measureKey =:measureKey AND o.real_date_from = :fromDate AND o.real_date_to = :toDate and o.formData not in (1)", nativeQuery=true)
    public List<Long> findNodeKeyByMeasureKey(@Param(value="measureKey") Long var1, @Param(value="fromDate") String var2, @Param(value="toDate") String var3);

    @Query(value="SELECT  distinct node_key FROM orgstructure.org_kpi_details o where o.measureKey =:measureKey AND o.real_date_from = :fromDate AND o.real_date_to = :toDate and o.formData not in (1) and (dept_id in (:deptlist) or dept_id is null)", nativeQuery=true)
    public List<Long> findNodeKeyByMeasureKeydept(@Param(value="measureKey") Long var1, @Param(value="fromDate") String var2, @Param(value="toDate") String var3, @Param(value="deptlist") List<Long> var4);

    @Query(value="SELECT ked.* FROM orgstructure.kpi_element_details ked JOIN ( SELECT node_key    FROM orgstructure.kpi_element_details WHERE measure_name = :kpiname AND org_id =:orgKey AND element_type = 'ELEMENT') subquery  ON ked.node_key = subquery.node_key OR ked.measureKey = subquery.node_key ", nativeQuery=true)
    public List<KpiElementPoObject> findAllMeasure(@Param(value="kpiname") String var1, @Param(value="orgKey") Long var2);

    @Query(value="SELECT ked.node_key, ked.measure_name,ked.org_id, ked.measure_type, ked.measureKey, ked.dept_id, ked.frequency FROM orgstructure.kpi_element_details ked where ked.org_id =:orgKey AND ked.element_type = 'ELEMENT' AND ked.measureKey = :nodekey AND ked.measure_type=1 ", nativeQuery=true)
    public List<Object[]> findAllSubMeasure(@Param(value="nodekey") String var1, @Param(value="orgKey") Long var2);

    @Query(value="SELECT ked.node_key, ked.measure_name,ked.org_id, ked.measure_type, ked.measureKey, ked.dept_id, ked.frequency FROM orgstructure.kpi_element_details ked where ked.org_id =:orgKey AND ked.element_type = 'ELEMENT' AND ked.node_key = :nodekey", nativeQuery=true)
    public List<Object[]> findSubMeasurebynode(@Param(value="nodekey") String var1, @Param(value="orgKey") Long var2);

    @Query(value="SELECT  * FROM  orgstructure.org_kpi_details o where o.node_key =:nodeKey AND o.org_key =:orgKey AND o.real_date_from = :fromDate AND o.real_date_to = :toDate and o.formData not in (1)", nativeQuery=true)
    public List<KPIDetailsPo> nodeKeyDataCheck1(@Param(value="nodeKey") Long var1, @Param(value="orgKey") Long var2, @Param(value="fromDate") String var3, @Param(value="toDate") String var4);

    @Query(value="SELECT  count(1) as count, o.node_key, o.measureKey FROM  orgstructure.org_kpi_details o where (o.node_key in (:nodeKey)  or o.measureKey in (:nodeKey)) AND o.real_date_from = :fromDate AND o.real_date_to = :toDate group by o.measureKey, o.node_key", nativeQuery=true)
    public Kpiblank Kpiblank(@Param(value="nodeKey") List<Long> var1, @Param(value="fromDate") String var2, @Param(value="toDate") String var3);

    @Query(value="SELECT  * FROM  orgstructure.org_kpi_details o where o.node_key =:nodeKey AND o.measureKey =:measureKey AND o.real_date_from = :fromDate AND o.real_date_to = :toDate", nativeQuery=true)
    public KPIDetailsPo nodeKeyDataCheck(@Param(value="nodeKey") Long var1, @Param(value="measureKey") Long var2, @Param(value="fromDate") String var3, @Param(value="toDate") String var4);

    @Query(value="SELECT  MAX(o.node_key) FROM  orgstructure.kpi_element_details o", nativeQuery=true)
    public Long maxnodeKey();

    @Modifying
    @Query(value="DELETE from orgstructure.org_kpi_details o where o.real_date_from  >= :startDate and o.real_date_to <= :endDate and o.node_key = :nodeKey and o.org_key = :orgKey", nativeQuery=true)
    public void deletedifferent(@Param(value="nodeKey") Long var1, @Param(value="orgKey") String var2, @Param(value="startDate") String var3, @Param(value="endDate") String var4);
}

