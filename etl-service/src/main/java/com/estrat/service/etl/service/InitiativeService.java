/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.etl.config.CommonRestTemplate
 *  com.estrat.service.etl.dto.InitiativesDTO
 *  com.estrat.service.etl.service.InitiativeService
 *  com.estrat.service.etl.service.InitiativeService$1
 *  org.apache.log4j.Logger
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 *  org.springframework.web.util.UriComponentsBuilder
 */
package com.estrat.service.etl.service;

import com.estrat.service.etl.config.CommonRestTemplate;
import com.estrat.service.etl.dto.InitiativesDTO;
import com.estrat.service.etl.service.InitiativeService;
import java.util.HashMap;
import java.util.List;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class InitiativeService {
    private Logger logger = Logger.getLogger(InitiativeService.class);
    @Autowired
    private CommonRestTemplate commonRestTemplate;
    @Value(value="${dbservice.kpi.initiatives.list.url}")
    private String kpiInitiativeList;

    public List<InitiativesDTO> findImpactedInitiatives(long kpiId) {
        HashMap<String, Long> urlVaiables = new HashMap<String, Long>();
        urlVaiables.put("kpiId", kpiId);
        String url = UriComponentsBuilder.fromHttpUrl((String)this.kpiInitiativeList).buildAndExpand(urlVaiables).toUriString();
        org.springframework.core.ParameterizedTypeReference<Object> parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }
}

