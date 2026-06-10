/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.scorecard.config.CommonRestTemplate
 *  com.estrat.scorecard.dto.FormulationRiskActivitiesDTO
 *  com.estrat.scorecard.dto.FormulationRiskDTO
 *  com.estrat.scorecard.dto.FormulationSubRiskDTO
 *  com.estrat.scorecard.dto.RiskFormulationDTO
 *  com.estrat.scorecard.service.RiskFormulationService
 *  com.estrat.scorecard.service.RiskFormulationService$1
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 *  org.springframework.web.util.UriComponentsBuilder
 */
package com.estrat.scorecard.service;

import com.estrat.scorecard.config.CommonRestTemplate;
import com.estrat.scorecard.dto.FormulationRiskActivitiesDTO;
import com.estrat.scorecard.dto.FormulationRiskDTO;
import com.estrat.scorecard.dto.FormulationSubRiskDTO;
import com.estrat.scorecard.dto.RiskFormulationDTO;
import com.estrat.scorecard.service.RiskFormulationService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class RiskFormulationService {
    @Value(value="${dbservice.url}")
    private String dbUrl;
    @Autowired
    private CommonRestTemplate commonRestTemplate;

    public RiskFormulationDTO saveRiskFormulation(RiskFormulationDTO riskFormulationDTO) {
        String url = this.dbUrl + "/riskFormulation";
        RiskFormulationDTO response = (RiskFormulationDTO)this.commonRestTemplate.postForObject(url, (Object)riskFormulationDTO, RiskFormulationDTO.class);
        return response;
    }

    public RiskFormulationDTO getRiskFormulation(long formulationId, boolean loadFlag) {
        String url = this.dbUrl + "/riskFormulation/" + formulationId;
        String formulationUrl = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("loadFlag", new Object[]{loadFlag}).toUriString();
        RiskFormulationDTO response = (RiskFormulationDTO)this.commonRestTemplate.getForObject(formulationUrl, RiskFormulationDTO.class);
        return response;
    }

    public FormulationRiskDTO saveFormulationRisk(FormulationRiskDTO formulationRiskDTO) {
        String url = this.dbUrl + "/risk/riskFormulation";
        FormulationRiskDTO response = (FormulationRiskDTO)this.commonRestTemplate.postForObject(url, (Object)formulationRiskDTO, FormulationRiskDTO.class);
        return response;
    }

    public FormulationSubRiskDTO saveFormulationSubRisk(FormulationSubRiskDTO formulationSubRiskDTO) {
        String url = this.dbUrl + "/subRisk/riskFormulation";
        FormulationSubRiskDTO response = (FormulationSubRiskDTO)this.commonRestTemplate.postForObject(url, (Object)formulationSubRiskDTO, FormulationSubRiskDTO.class);
        return response;
    }

    public FormulationRiskActivitiesDTO saveFormulationRiskActivities(FormulationRiskActivitiesDTO formulationRiskDTO) {
        String url = this.dbUrl + "/activity/riskFormulation";
        FormulationRiskActivitiesDTO response = (FormulationRiskActivitiesDTO)this.commonRestTemplate.postForObject(url, (Object)formulationRiskDTO, FormulationRiskActivitiesDTO.class);
        return response;
    }

    public FormulationSubRiskDTO getFormulationSubRisk(long subRiskId) {
        String url = this.dbUrl + "/subRisk/riskFormulation/" + subRiskId;
        FormulationSubRiskDTO response = (FormulationSubRiskDTO)this.commonRestTemplate.getForObject(url, FormulationSubRiskDTO.class);
        return response;
    }

    public FormulationRiskActivitiesDTO getFormulationRiskActivities(long activityId) {
        String url = this.dbUrl + "/activity/riskFormulation/" + activityId;
        FormulationRiskActivitiesDTO response = (FormulationRiskActivitiesDTO)this.commonRestTemplate.getForObject(url, FormulationRiskActivitiesDTO.class);
        return response;
    }

    public Boolean updateFormulationStatus(RiskFormulationDTO riskFormulationDTO) {
        String url = this.dbUrl + "/status/riskFormulation";
        Boolean response = (Boolean)this.commonRestTemplate.postForObject(url, (Object)riskFormulationDTO, Boolean.class);
        return response;
    }

    public FormulationRiskDTO getFormulationRisk(long riskId) {
        String url = this.dbUrl + "/risk/riskFormulation/" + riskId;
        FormulationRiskDTO response = (FormulationRiskDTO)this.commonRestTemplate.getForObject(url, FormulationRiskDTO.class);
        return response;
    }

    public boolean deleteFormulationRiskActivity(long activityId) {
        String url = this.dbUrl + "/activity/riskFormulation/" + activityId;
        Boolean response = (Boolean)this.commonRestTemplate.deleteForObject(url);
        return response;
    }

    public boolean deleteFormulationSubRisk(long subRiskId) {
        String url = this.dbUrl + "/subRisk/riskFormulation/" + subRiskId;
        Boolean response = (Boolean)this.commonRestTemplate.deleteForObject(url);
        return response;
    }

    public boolean deleteFormulationRisk(long riskId) {
        String url = this.dbUrl + "/risk/riskFormulation/" + riskId;
        Boolean response = (Boolean)this.commonRestTemplate.deleteForObject(url);
        return response;
    }

    public List<FormulationRiskDTO> getRiskList(long formulationId, String department) {
        String url = this.dbUrl + "/formulationRiskList";
        String listUrl = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("formulationId", new Object[]{formulationId}).queryParam("department", new Object[]{department}).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        List response = (List)this.commonRestTemplate.getForObject(listUrl, (ParameterizedTypeReference)parameterizedTypeReference);
        return response;
    }
}

