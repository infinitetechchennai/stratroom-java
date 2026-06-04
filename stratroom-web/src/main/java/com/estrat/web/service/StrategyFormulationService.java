/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.config.CommonRestTemplate
 *  com.estrat.web.dto.FormulationKPIDTO
 *  com.estrat.web.dto.FormulationObjectiveDTO
 *  com.estrat.web.dto.FormulationScoreCardDTO
 *  com.estrat.web.dto.FormulationSubKPIDTO
 *  com.estrat.web.dto.StrategyFormulationDTO
 *  com.estrat.web.service.StrategyFormulationService
 *  com.estrat.web.service.StrategyFormulationService$1
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 *  org.springframework.web.util.UriComponentsBuilder
 */
package com.estrat.web.service;

import com.estrat.web.config.CommonRestTemplate;
import com.estrat.web.dto.FormulationKPIDTO;
import com.estrat.web.dto.FormulationObjectiveDTO;
import com.estrat.web.dto.FormulationScoreCardDTO;
import com.estrat.web.dto.FormulationSubKPIDTO;
import com.estrat.web.dto.StrategyFormulationDTO;
import com.estrat.web.service.StrategyFormulationService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class StrategyFormulationService {
    @Value(value="${scorecard.service.url}")
    private String scoreCardUrl;
    @Autowired
    private CommonRestTemplate commonRestTemplate;

    public StrategyFormulationDTO saveStrategyFormulation(StrategyFormulationDTO strategyFormulationDTO) {
        String url = this.scoreCardUrl + "/strategyFormulation";
        StrategyFormulationDTO formulationDTO = (StrategyFormulationDTO)this.commonRestTemplate.postForObject(url, strategyFormulationDTO, StrategyFormulationDTO.class);
        return formulationDTO;
    }

    public FormulationObjectiveDTO saveFormulationObjectives(FormulationObjectiveDTO FormulationObjectiveDTO2) {
        String url = this.scoreCardUrl + "/objectives/strategyFormulation";
        FormulationObjectiveDTO response = (FormulationObjectiveDTO)this.commonRestTemplate.postForObject(url, FormulationObjectiveDTO2, FormulationObjectiveDTO.class);
        return response;
    }

    public FormulationKPIDTO saveFormulationKPI(FormulationKPIDTO formulationKPIDTO) {
        String url = this.scoreCardUrl + "/kpi/strategyFormulation";
        FormulationKPIDTO response = (FormulationKPIDTO)this.commonRestTemplate.postForObject(url, formulationKPIDTO, FormulationKPIDTO.class);
        return response;
    }

    public FormulationSubKPIDTO saveFormulationSubKPI(FormulationSubKPIDTO formulationSubKPIDTO) {
        String url = this.scoreCardUrl + "/subkpi/strategyFormulation";
        FormulationSubKPIDTO response = (FormulationSubKPIDTO)this.commonRestTemplate.postForObject(url, formulationSubKPIDTO, FormulationSubKPIDTO.class);
        return response;
    }

    public StrategyFormulationDTO getFormulationDetails(long id) {
        String url = this.scoreCardUrl + "/strategyFormulation/" + id;
        StrategyFormulationDTO response = (StrategyFormulationDTO)this.commonRestTemplate.getForObject(url, StrategyFormulationDTO.class);
        return response;
    }

    public boolean deleteFormulationDetails(long id) {
        String url = this.scoreCardUrl + "/strategyFormulation/" + id;
        this.commonRestTemplate.deleteForObject(url);
        return true;
    }

    public boolean deleteFormulationObjectives(long id) {
        String url = this.scoreCardUrl + "/objectives/strategyFormulation/" + id;
        this.commonRestTemplate.deleteForObject(url);
        return true;
    }

    public boolean deleteFormulationKPI(long id) {
        String url = this.scoreCardUrl + "/kpi/strategyFormulation/" + id;
        this.commonRestTemplate.deleteForObject(url);
        return true;
    }

    public boolean deleteFormulationSubKPI(long id) {
        String url = this.scoreCardUrl + "/subkpi/strategyFormulation/" + id;
        this.commonRestTemplate.deleteForObject(url);
        return true;
    }

    public FormulationObjectiveDTO getFormulationObjectives(long id) {
        String url = this.scoreCardUrl + "/objectives/strategyFormulation/" + id;
        FormulationObjectiveDTO response = (FormulationObjectiveDTO)this.commonRestTemplate.getForObject(url, FormulationObjectiveDTO.class);
        return response;
    }

    public FormulationKPIDTO getFormulationKPI(long id) {
        String url = this.scoreCardUrl + "/kpi/strategyFormulation/" + id;
        FormulationKPIDTO response = (FormulationKPIDTO)this.commonRestTemplate.getForObject(url, FormulationKPIDTO.class);
        return response;
    }

    public FormulationSubKPIDTO getFormulationSubKPI(long id) {
        String url = this.scoreCardUrl + "/subkpi/strategyFormulation/" + id;
        FormulationSubKPIDTO response = (FormulationSubKPIDTO)this.commonRestTemplate.getForObject(url, FormulationSubKPIDTO.class);
        return response;
    }

    public List<StrategyFormulationDTO> getFormulationList(String status, String pageId) {
        String url = this.scoreCardUrl + "/strategyFormulationList";
        String listUrl = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("status", new Object[]{status}).queryParam("pageId", new Object[]{pageId}).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference() {};
        List response = (List)this.commonRestTemplate.getForObject(listUrl, (ParameterizedTypeReference)parameterizedTypeReference);
        return response;
    }

    public StrategyFormulationDTO applyFormulation(String formulationId) {
        String url = this.scoreCardUrl + "/formulation/applyFormulation";
        String listUrl = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("formulationId", new Object[]{formulationId}).toUriString();
        StrategyFormulationDTO response = (StrategyFormulationDTO)this.commonRestTemplate.getForObject(listUrl, StrategyFormulationDTO.class);
        return response;
    }

    public boolean deleteFormulationScorecard(long id) {
        String url = this.scoreCardUrl + "/scorecard/strategyFormulation/" + id;
        this.commonRestTemplate.deleteForObject(url);
        return true;
    }

    public FormulationScoreCardDTO getFormulationScorecard(long id) {
        String url = this.scoreCardUrl + "/scorecard/strategyFormulation/" + id;
        FormulationScoreCardDTO response = (FormulationScoreCardDTO)this.commonRestTemplate.getForObject(url, FormulationScoreCardDTO.class);
        return response;
    }

    public FormulationScoreCardDTO saveFormulationScorecard(FormulationScoreCardDTO formulationScoreCardDTO) {
        String url = this.scoreCardUrl + "/scorecard/strategyFormulation";
        FormulationScoreCardDTO response = (FormulationScoreCardDTO)this.commonRestTemplate.postForObject(url, formulationScoreCardDTO, FormulationScoreCardDTO.class);
        return response;
    }
}


