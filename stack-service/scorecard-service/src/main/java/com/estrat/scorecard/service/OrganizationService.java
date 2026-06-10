/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.scorecard.config.CommonRestTemplate
 *  com.estrat.scorecard.dto.OrgDetails
 *  com.estrat.scorecard.service.OrganizationService
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.http.HttpStatus
 *  org.springframework.http.ResponseEntity
 *  org.springframework.stereotype.Service
 *  org.springframework.web.util.UriComponentsBuilder
 */
package com.estrat.scorecard.service;

import com.estrat.scorecard.config.CommonRestTemplate;
import com.estrat.scorecard.dto.OrgDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class OrganizationService {
    @Value(value="${dbservice.url}")
    private String dbUrl;
    @Autowired
    private CommonRestTemplate commonRestTemplate;

    public ResponseEntity<OrgDetails> getDeptDetailsById(long id) {
        String url = this.dbUrl + "/org_details/" + id;
        OrgDetails orgDetails = (OrgDetails)this.commonRestTemplate.getForObject(url, OrgDetails.class);
        return new ResponseEntity((Object)orgDetails, HttpStatus.OK);
    }

    public ResponseEntity<OrgDetails> saveOrUpdateDeptDetails(OrgDetails orgDetails) {
        String url = this.dbUrl + "/org_details";
        OrgDetails orgDetails1 = (OrgDetails)this.commonRestTemplate.postForObject(url, (Object)orgDetails, OrgDetails.class);
        return new ResponseEntity((Object)orgDetails1, HttpStatus.OK);
    }

    public ResponseEntity<String> deleteDeptDetails(long id) {
        String url = this.dbUrl + "/org_details/" + id;
        this.commonRestTemplate.deleteForObject(url);
        return new ResponseEntity((Object)"deleted success", HttpStatus.OK);
    }

    public ResponseEntity<OrgDetails> findByName(String name) {
        String url1 = this.dbUrl + "/org_details";
        String url = UriComponentsBuilder.fromHttpUrl((String)url1).queryParam("name", new Object[]{name}).toUriString();
        OrgDetails orgDetails1 = (OrgDetails)this.commonRestTemplate.getForObject(url, OrgDetails.class);
        return new ResponseEntity((Object)orgDetails1, HttpStatus.OK);
    }
}

