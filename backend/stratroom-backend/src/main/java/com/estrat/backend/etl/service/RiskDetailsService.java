/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.etl.config.CommonRestTemplate
 *  com.estrat.backend.etl.dto.RiskDTO
 *  com.estrat.backend.etl.service.RiskDetailsService
 *  com.estrat.backend.etl.service.RiskDetailsService$1
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 *  org.springframework.web.util.UriComponentsBuilder
 */
package com.estrat.backend.etl.service;

import com.estrat.backend.etl.config.CommonRestTemplate;
import com.estrat.backend.etl.dto.RiskDTO;
import com.estrat.backend.etl.service.RiskDetailsService;
import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class RiskDetailsService {
    @Autowired
    private CommonRestTemplate commonRestTemplate;
    @Value(value="${dbservice.kpi.risklist.list.url}")
    private String kpiRiskList;

    public List<RiskDTO> findImpactedRiskDetails(long kpiId) {
        HashMap<String, Long> urlVariables = new HashMap<String, Long>();
        urlVariables.put("kpiId", kpiId);
        String url = UriComponentsBuilder.fromHttpUrl((String)this.kpiRiskList).buildAndExpand(urlVariables).toUriString();
        org.springframework.core.ParameterizedTypeReference<Object> parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }
}

