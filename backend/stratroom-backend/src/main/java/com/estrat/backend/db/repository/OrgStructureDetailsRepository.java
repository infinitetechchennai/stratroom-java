/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.OrgStructureDetails
 *  com.estrat.backend.db.repository.OrgStructureDetailsRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.backend.db.repository;

import com.estrat.backend.db.bean.po.OrgStructureDetails;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface OrgStructureDetailsRepository
extends JpaRepository<OrgStructureDetails, Long> {
    @Query(value="SELECT c FROM OrgStructureDetails c WHERE  c.empId=:empId and c.status=:status")
    public OrgStructureDetails findByMapping(@Param(value="empId") long var1, @Param(value="status") String var3);

    @Query(value="SELECT c FROM OrgStructureDetails c WHERE  c.empId=:empId")
    public List<OrgStructureDetails> findList(@Param(value="empId") long var1);

    // All org-structure rows that were valid on :asOf for the given org. A row is valid
    // when it started on/before the date and had not yet ended (or ends on/after it).
    @Query(value="SELECT os.* FROM orgstructure.org_structure_details os JOIN orgstructure.employee_details e ON e.emp_id = os.empid WHERE e.org_id = :orgId AND os.start_date <= :asOf AND (os.end_date IS NULL OR os.end_date >= :asOf)", nativeQuery=true)
    public List<OrgStructureDetails> findValidAsOf(@Param(value="orgId") long var1, @Param(value="asOf") java.time.LocalDate var3);
}

