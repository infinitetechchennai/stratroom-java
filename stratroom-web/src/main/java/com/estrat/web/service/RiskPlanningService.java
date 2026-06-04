/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.config.CommonRestTemplate
 *  com.estrat.web.dto.RiskPlanningDTO
 *  com.estrat.web.service.RiskPlanningService
 *  com.estrat.web.service.RiskPlanningService$1
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 *  org.springframework.web.util.UriComponentsBuilder
 */
package com.estrat.web.service;

import com.estrat.web.config.CommonRestTemplate;
import com.estrat.web.dto.RiskPlanningDTO;
import com.estrat.web.service.RiskPlanningService;
import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class RiskPlanningService {
    @Autowired
    private CommonRestTemplate commonRestTemplate;
    @Value(value="${scorecardservice.pages.url}")
    private String dbUrl;

    public RiskPlanningDTO saveProject(RiskPlanningDTO riskPlanningDTO) {
        String url = this.dbUrl + "/riskPlanning";
        return (RiskPlanningDTO)this.commonRestTemplate.postForObject(url, riskPlanningDTO, RiskPlanningDTO.class);
    }

    public RiskPlanningDTO updateProject(RiskPlanningDTO riskPlanningDTO) {
        String url = this.dbUrl + "/riskPlanning";
        return (RiskPlanningDTO)this.commonRestTemplate.putForObject(url, riskPlanningDTO, RiskPlanningDTO.class);
    }

    public RiskPlanningDTO retrieveProject(Long id) {
        String url = this.dbUrl + "/riskPlanning";
        String url1 = String.join((CharSequence)"/", url, String.valueOf(id));
        HashMap<String, Long> urlVariables = new HashMap<String, Long>();
        urlVariables.put("id", id);
        String url2 = UriComponentsBuilder.fromHttpUrl((String)url1).buildAndExpand(urlVariables).toUriString();
        return (RiskPlanningDTO)this.commonRestTemplate.getForObject(url2, RiskPlanningDTO.class);
    }

    public void removeProject(Long id) {
        String url = this.dbUrl + "/riskPlanning";
        String url1 = String.join((CharSequence)"/", url, String.valueOf(id));
        this.commonRestTemplate.deleteForObject(url1);
    }

    public List<RiskPlanningDTO> findAll(String pageId) {
        String url1 = this.dbUrl + "/riskPlanningList";
        HashMap urlVariables = new HashMap();
        String url = UriComponentsBuilder.fromHttpUrl((String)url1).queryParam("pageId", new Object[]{pageId}).buildAndExpand(urlVariables).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }
}


