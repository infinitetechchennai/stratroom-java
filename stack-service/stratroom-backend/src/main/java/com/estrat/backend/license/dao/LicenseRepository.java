/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.license.bean.OrgLicenseDetails
 *  com.estrat.backend.license.dao.LicenseRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.backend.license.dao;

import com.estrat.backend.license.bean.OrgLicenseDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface LicenseRepository
extends JpaRepository<OrgLicenseDetails, Long> {
    @Query(value="SELECT * FROM org_license_details WHERE license_key=:licenseKey", nativeQuery=true)
    public OrgLicenseDetails findLicenseByKey(@Param(value="licenseKey") String var1);
}

