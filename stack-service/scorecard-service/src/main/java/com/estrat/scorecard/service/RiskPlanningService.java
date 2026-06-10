/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.scorecard.config.CommonRestTemplate
 *  com.estrat.scorecard.dto.RiskPlanningDTO
 *  com.estrat.scorecard.service.RiskPlanningService
 *  com.estrat.scorecard.service.RiskPlanningService$1
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 *  org.springframework.web.util.UriComponentsBuilder
 */
package com.estrat.scorecard.service;

import com.estrat.scorecard.config.CommonRestTemplate;
import com.estrat.scorecard.dto.RiskPlanningDTO;
import com.estrat.scorecard.service.RiskPlanningService;
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
    @Value(value="${dbservice.url}")
    private String dbUrl;

    public RiskPlanningDTO saveProject(RiskPlanningDTO riskPlanningDTO) {
        String url = this.dbUrl + "/riskPlanning";
        return (RiskPlanningDTO)this.commonRestTemplate.postForObject(url, (Object)riskPlanningDTO, RiskPlanningDTO.class);
    }

    public RiskPlanningDTO updateProject(RiskPlanningDTO riskPlanningDTO) {
        String url = this.dbUrl + "/riskPlanning";
        return (RiskPlanningDTO)this.commonRestTemplate.putForObject(url, (Object)riskPlanningDTO, RiskPlanningDTO.class);
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
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }
}

