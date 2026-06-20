/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.etl.config.CommonRestTemplate
 *  com.estrat.backend.etl.dto.InitiativesDTO
 *  com.estrat.backend.etl.service.InitiativeService
 *  com.estrat.backend.etl.service.InitiativeService$1
 *  org.apache.log4j.Logger
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 *  org.springframework.web.util.UriComponentsBuilder
 */
package com.estrat.backend.etl.service;

import com.estrat.backend.etl.config.CommonRestTemplate;
import com.estrat.backend.etl.dto.InitiativesDTO;
import com.estrat.backend.etl.service.InitiativeService;
import java.util.HashMap;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class InitiativeService {
    private Logger logger = LoggerFactory.getLogger(InitiativeService.class);
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

