/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.scorecard.config.CommonRestTemplate
 *  com.estrat.scorecard.dto.DeptDetails
 *  com.estrat.scorecard.service.DeptService
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.stereotype.Service
 *  org.springframework.web.client.RestTemplate
 */
package com.estrat.scorecard.service;

import com.estrat.scorecard.config.CommonRestTemplate;
import com.estrat.scorecard.dto.DeptDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class DeptService {
    @Value(value="${dbservice.url}")
    private String dbUrl;
    @Autowired
    private CommonRestTemplate commonRestTemplate;
    @Autowired
    private RestTemplate restTemplate;

    public DeptDetails getDeptDetailsById(long id) {
        String url = this.dbUrl + "/dept_details/" + id;
        DeptDetails deptDet = (DeptDetails)this.commonRestTemplate.getForObject(url, DeptDetails.class);
        return deptDet;
    }

    public DeptDetails saveOrUpdateDeptDetails(DeptDetails deptDetails) {
        String url = this.dbUrl + "/dept_details";
        DeptDetails deptDet = (DeptDetails)this.commonRestTemplate.postForObject(url, (Object)deptDetails, DeptDetails.class);
        return deptDet;
    }

    public String deleteDeptDetails(long id) {
        String url = this.dbUrl + "/dept_details/" + id;
        this.commonRestTemplate.deleteForObject(url);
        return "Succes";
    }

    public DeptDetails getDeptOwner() {
        String url = this.dbUrl + "/findOwnerByDeptId";
        DeptDetails deptDet = (DeptDetails)this.commonRestTemplate.getForObject(url, DeptDetails.class);
        return deptDet;
    }

    public Long getDeptOwner(Long deptId) {
        String url = this.dbUrl + "/findEmpOwnerByDeptId/" + deptId;
        Long deptDet = (Long)this.commonRestTemplate.getForObject(url, Long.class);
        return deptDet;
    }
}

