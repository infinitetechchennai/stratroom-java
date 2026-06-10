/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.config.CommonRestTemplate
 *  com.estrat.web.dto.FormulationRiskActivitiesDTO
 *  com.estrat.web.dto.FormulationRiskDTO
 *  com.estrat.web.dto.FormulationSubRiskDTO
 *  com.estrat.web.dto.RiskFormulationDTO
 *  com.estrat.web.service.RiskFormulationService
 *  com.estrat.web.service.RiskFormulationService$1
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 *  org.springframework.web.util.UriComponentsBuilder
 */
package com.estrat.web.service;

import com.estrat.web.config.CommonRestTemplate;
import com.estrat.web.dto.FormulationRiskActivitiesDTO;
import com.estrat.web.dto.FormulationRiskDTO;
import com.estrat.web.dto.FormulationSubRiskDTO;
import com.estrat.web.dto.RiskFormulationDTO;
import com.estrat.web.service.RiskFormulationService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class RiskFormulationService {
    @Value(value="${scorecard.service.url}")
    private String scoreCardUrl;
    @Autowired
    private CommonRestTemplate commonRestTemplate;

    public RiskFormulationDTO saveRiskFormulation(RiskFormulationDTO riskFormulationDTO) {
        String url = this.scoreCardUrl + "/riskFormulation";
        RiskFormulationDTO response = (RiskFormulationDTO)this.commonRestTemplate.postForObject(url, riskFormulationDTO, RiskFormulationDTO.class);
        return response;
    }

    public RiskFormulationDTO getRiskFormulation(long formulationId, boolean loadFlag) {
        String url = this.scoreCardUrl + "/riskFormulation/" + formulationId;
        String formulationUrl = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("loadFlag", new Object[]{loadFlag}).toUriString();
        RiskFormulationDTO response = (RiskFormulationDTO)this.commonRestTemplate.getForObject(formulationUrl, RiskFormulationDTO.class);
        return response;
    }

    public FormulationRiskDTO saveFormulationRisk(FormulationRiskDTO formulationRiskDTO) {
        String url = this.scoreCardUrl + "/risk/riskFormulation";
        FormulationRiskDTO response = (FormulationRiskDTO)this.commonRestTemplate.postForObject(url, formulationRiskDTO, FormulationRiskDTO.class);
        return response;
    }

    public FormulationSubRiskDTO saveFormulationSubRisk(FormulationSubRiskDTO formulationSubRiskDTO) {
        String url = this.scoreCardUrl + "/subRisk/riskFormulation";
        FormulationSubRiskDTO response = (FormulationSubRiskDTO)this.commonRestTemplate.postForObject(url, formulationSubRiskDTO, FormulationSubRiskDTO.class);
        return response;
    }

    public FormulationRiskActivitiesDTO saveFormulationRiskActivities(FormulationRiskActivitiesDTO formulationRiskDTO) {
        String url = this.scoreCardUrl + "/activity/riskFormulation";
        FormulationRiskActivitiesDTO response = (FormulationRiskActivitiesDTO)this.commonRestTemplate.postForObject(url, formulationRiskDTO, FormulationRiskActivitiesDTO.class);
        return response;
    }

    public FormulationSubRiskDTO getFormulationSubRisk(long subRiskId) {
        String url = this.scoreCardUrl + "/subRisk/riskFormulation/" + subRiskId;
        FormulationSubRiskDTO response = (FormulationSubRiskDTO)this.commonRestTemplate.getForObject(url, FormulationSubRiskDTO.class);
        return response;
    }

    public FormulationRiskActivitiesDTO getFormulationRiskActivities(long activityId) {
        String url = this.scoreCardUrl + "/activity/riskFormulation/" + activityId;
        FormulationRiskActivitiesDTO response = (FormulationRiskActivitiesDTO)this.commonRestTemplate.getForObject(url, FormulationRiskActivitiesDTO.class);
        return response;
    }

    public Boolean updateFormulationStatus(RiskFormulationDTO riskFormulationDTO) {
        String url = this.scoreCardUrl + "/status/riskFormulation";
        Boolean response = (Boolean)this.commonRestTemplate.postForObject(url, riskFormulationDTO, Boolean.class);
        return response;
    }

    public FormulationRiskDTO getFormulationRisk(long riskId) {
        String url = this.scoreCardUrl + "/risk/riskFormulation/" + riskId;
        FormulationRiskDTO response = (FormulationRiskDTO)this.commonRestTemplate.getForObject(url, FormulationRiskDTO.class);
        return response;
    }

    public boolean deleteFormulationRiskActivity(long activityId) {
        String url = this.scoreCardUrl + "/activity/riskFormulation/" + activityId;
        Boolean response = (Boolean)this.commonRestTemplate.deleteForObject(url);
        return response;
    }

    public boolean deleteFormulationSubRisk(long subRiskId) {
        String url = this.scoreCardUrl + "/subRisk/riskFormulation/" + subRiskId;
        Boolean response = (Boolean)this.commonRestTemplate.deleteForObject(url);
        return response;
    }

    public boolean deleteFormulationRisk(long riskId) {
        String url = this.scoreCardUrl + "/risk/riskFormulation/" + riskId;
        Boolean response = (Boolean)this.commonRestTemplate.deleteForObject(url);
        return response;
    }

    public List<FormulationRiskDTO> getRiskList(long formulationId, String department) {
        String url = this.scoreCardUrl + "/formulationRiskList";
        String listUrl = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("formulationId", new Object[]{formulationId}).queryParam("department", new Object[]{department}).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        List response = (List)this.commonRestTemplate.getForObject(listUrl, (ParameterizedTypeReference)parameterizedTypeReference);
        return response;
    }
}


