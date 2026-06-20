/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.scorecard.config.CommonRestTemplate
 *  com.estrat.backend.scorecard.dto.FormulationKPIDTO
 *  com.estrat.backend.scorecard.dto.FormulationObjectiveDTO
 *  com.estrat.backend.scorecard.dto.FormulationScoreCardDTO
 *  com.estrat.backend.scorecard.dto.FormulationSubKPIDTO
 *  com.estrat.backend.scorecard.dto.StrategyFormulationDTO
 *  com.estrat.backend.scorecard.service.StrategyFormulationService
 *  com.estrat.backend.scorecard.service.StrategyFormulationService$1
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 *  org.springframework.web.util.UriComponentsBuilder
 */
package com.estrat.backend.scorecard.service;

import com.estrat.backend.scorecard.config.CommonRestTemplate;
import com.estrat.backend.scorecard.dto.FormulationKPIDTO;
import com.estrat.backend.scorecard.dto.FormulationObjectiveDTO;
import com.estrat.backend.scorecard.dto.FormulationScoreCardDTO;
import com.estrat.backend.scorecard.dto.FormulationSubKPIDTO;
import com.estrat.backend.scorecard.dto.StrategyFormulationDTO;
import com.estrat.backend.scorecard.service.StrategyFormulationService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class StrategyFormulationService {
    @Value(value="${dbservice.url}")
    private String dbUrl;
    @Autowired
    private CommonRestTemplate commonRestTemplate;

    public StrategyFormulationDTO saveStrategyFormulation(StrategyFormulationDTO strategyFormulationDTO) {
        String url = this.dbUrl + "/strategyFormulation";
        StrategyFormulationDTO formulationDTO = (StrategyFormulationDTO)this.commonRestTemplate.postForObject(url, (Object)strategyFormulationDTO, StrategyFormulationDTO.class);
        return formulationDTO;
    }

    public FormulationObjectiveDTO saveFormulationObjectives(FormulationObjectiveDTO FormulationObjectiveDTO2) {
        String url = this.dbUrl + "/objectives/strategyFormulation";
        FormulationObjectiveDTO response = (FormulationObjectiveDTO)this.commonRestTemplate.postForObject(url, (Object)FormulationObjectiveDTO2, FormulationObjectiveDTO.class);
        return response;
    }

    public FormulationKPIDTO saveFormulationKPI(FormulationKPIDTO formulationKPIDTO) {
        String url = this.dbUrl + "/kpi/strategyFormulation";
        FormulationKPIDTO response = (FormulationKPIDTO)this.commonRestTemplate.postForObject(url, (Object)formulationKPIDTO, FormulationKPIDTO.class);
        return response;
    }

    public FormulationSubKPIDTO saveFormulationSubKPI(FormulationSubKPIDTO formulationSubKPIDTO) {
        String url = this.dbUrl + "/subkpi/strategyFormulation";
        FormulationSubKPIDTO response = (FormulationSubKPIDTO)this.commonRestTemplate.postForObject(url, (Object)formulationSubKPIDTO, FormulationSubKPIDTO.class);
        return response;
    }

    public StrategyFormulationDTO getFormulationDetails(long id) {
        String url = this.dbUrl + "/strategyFormulation/" + id;
        StrategyFormulationDTO response = (StrategyFormulationDTO)this.commonRestTemplate.getForObject(url, StrategyFormulationDTO.class);
        return response;
    }

    public boolean deleteFormulationDetails(long id) {
        String url = this.dbUrl + "/strategyFormulation/" + id;
        this.commonRestTemplate.deleteForObject(url);
        return true;
    }

    public boolean deleteFormulationObjectives(long id) {
        String url = this.dbUrl + "/objectives/strategyFormulation/" + id;
        this.commonRestTemplate.deleteForObject(url);
        return true;
    }

    public boolean deleteFormulationScorecard(long id) {
        String url = this.dbUrl + "/scorecard/strategyFormulation/" + id;
        this.commonRestTemplate.deleteForObject(url);
        return true;
    }

    public FormulationScoreCardDTO getFormulationScorecard(long id) {
        String url = this.dbUrl + "/scorecard/strategyFormulation/" + id;
        FormulationScoreCardDTO response = (FormulationScoreCardDTO)this.commonRestTemplate.getForObject(url, FormulationScoreCardDTO.class);
        return response;
    }

    public FormulationScoreCardDTO saveFormulationScorecard(FormulationScoreCardDTO formulationScoreCardDTO) {
        String url = this.dbUrl + "/scorecard/strategyFormulation";
        FormulationScoreCardDTO response = (FormulationScoreCardDTO)this.commonRestTemplate.postForObject(url, (Object)formulationScoreCardDTO, FormulationScoreCardDTO.class);
        return response;
    }

    public boolean deleteFormulationKPI(long id) {
        String url = this.dbUrl + "/kpi/strategyFormulation/" + id;
        this.commonRestTemplate.deleteForObject(url);
        return true;
    }

    public boolean deleteFormulationSubKPI(long id) {
        String url = this.dbUrl + "/subkpi/strategyFormulation/" + id;
        this.commonRestTemplate.deleteForObject(url);
        return true;
    }

    public FormulationObjectiveDTO getFormulationObjectives(long id) {
        String url = this.dbUrl + "/objectives/strategyFormulation/" + id;
        FormulationObjectiveDTO response = (FormulationObjectiveDTO)this.commonRestTemplate.getForObject(url, FormulationObjectiveDTO.class);
        return response;
    }

    public FormulationKPIDTO getFormulationKPI(long id) {
        String url = this.dbUrl + "/kpi/strategyFormulation/" + id;
        FormulationKPIDTO response = (FormulationKPIDTO)this.commonRestTemplate.getForObject(url, FormulationKPIDTO.class);
        return response;
    }

    public FormulationSubKPIDTO getFormulationSubKPI(long id) {
        String url = this.dbUrl + "/subkpi/strategyFormulation/" + id;
        FormulationSubKPIDTO response = (FormulationSubKPIDTO)this.commonRestTemplate.getForObject(url, FormulationSubKPIDTO.class);
        return response;
    }

    public List<StrategyFormulationDTO> getFormulationList(String status, String pageId) {
        String url = this.dbUrl + "/strategyFormulationList";
        String listUrl = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("status", new Object[]{status}).queryParam("pageId", new Object[]{pageId}).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        List response = (List)this.commonRestTemplate.getForObject(listUrl, (ParameterizedTypeReference)parameterizedTypeReference);
        return response;
    }

    public StrategyFormulationDTO applyFormulation(String formulationId) {
        String url = this.dbUrl + "/formulation/applyFormulation";
        String listUrl = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("formulationId", new Object[]{formulationId}).toUriString();
        StrategyFormulationDTO response = (StrategyFormulationDTO)this.commonRestTemplate.getForObject(listUrl, StrategyFormulationDTO.class);
        return response;
    }
}

