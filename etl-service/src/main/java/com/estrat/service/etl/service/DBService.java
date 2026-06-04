/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.etl.config.CommonRestTemplate
 *  com.estrat.service.etl.dto.ControlPanelGeneralDTO
 *  com.estrat.service.etl.dto.KPIDetailsDTO
 *  com.estrat.service.etl.dto.OrgDetails
 *  com.estrat.service.etl.dto.OrganizationDetails
 *  com.estrat.service.etl.service.DBService
 *  com.estrat.service.etl.service.DBService$1
 *  com.estrat.service.etl.service.DBService$2
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.http.HttpStatus
 *  org.springframework.http.ResponseEntity
 *  org.springframework.stereotype.Component
 *  org.springframework.web.util.UriComponentsBuilder
 */
package com.estrat.service.etl.service;

import com.estrat.service.etl.config.CommonRestTemplate;
import com.estrat.service.etl.dto.ControlPanelGeneralDTO;
import com.estrat.service.etl.dto.KPIDetailsDTO;
import com.estrat.service.etl.dto.OrgDetails;
import com.estrat.service.etl.dto.OrganizationDetails;
import com.estrat.service.etl.service.DBService;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

@Component
public class DBService {
    @Autowired
    private CommonRestTemplate commonRestTemplate;
    @Value(value="${dbservice.url}")
    private String dbUrl;
    @Value(value="${dbService.control.panel.general.lists.url}")
    private String retrieveControlPanelGeneralUrl;

    public ResponseEntity<Map<String, Object>> saveKpiDetails(List<KPIDetailsDTO> detailsDTOs) {
        String url = this.dbUrl + "/etl/saveKpiDetails";
        org.springframework.core.ParameterizedTypeReference<Object> parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        Map response = (Map)this.commonRestTemplate.postForObject(url, detailsDTOs, (ParameterizedTypeReference)parameterizedTypeReference);
        return new ResponseEntity((Object)response, HttpStatus.OK);
    }

    public ControlPanelGeneralDTO findByOrgId(long orgId) {
        HashMap<String, Long> urlVariables = new HashMap<String, Long>();
        urlVariables.put("orgId", orgId);
        String url = UriComponentsBuilder.fromHttpUrl((String)this.retrieveControlPanelGeneralUrl).buildAndExpand(urlVariables).toUriString();
        return (ControlPanelGeneralDTO)this.commonRestTemplate.getForObject(url, ControlPanelGeneralDTO.class);
    }

    public ResponseEntity<OrgDetails> findByName(String name) {
        String url1 = this.dbUrl + "/org_details";
        String url = UriComponentsBuilder.fromHttpUrl((String)url1).queryParam("name", new Object[]{name}).toUriString();
        OrgDetails orgDetails1 = (OrgDetails)this.commonRestTemplate.getForObject(url, OrgDetails.class);
        return new ResponseEntity((Object)orgDetails1, HttpStatus.OK);
    }

    public List<OrganizationDetails> getOrgList() {
        String url = this.dbUrl + "/organizationList";
        org.springframework.core.ParameterizedTypeReference<Object> parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }
}

