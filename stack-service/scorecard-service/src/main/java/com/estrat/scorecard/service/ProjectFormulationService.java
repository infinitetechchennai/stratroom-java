/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.scorecard.config.CommonRestTemplate
 *  com.estrat.scorecard.dto.FormulationInitiativesDTO
 *  com.estrat.scorecard.dto.FormulationSubInitiativesDTO
 *  com.estrat.scorecard.dto.ProjectFormulationDTO
 *  com.estrat.scorecard.service.ProjectFormulationService
 *  com.estrat.scorecard.service.ProjectFormulationService$1
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 *  org.springframework.web.util.UriComponentsBuilder
 */
package com.estrat.scorecard.service;

import com.estrat.scorecard.config.CommonRestTemplate;
import com.estrat.scorecard.dto.FormulationInitiativesDTO;
import com.estrat.scorecard.dto.FormulationSubInitiativesDTO;
import com.estrat.scorecard.dto.ProjectFormulationDTO;
import com.estrat.scorecard.service.ProjectFormulationService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class ProjectFormulationService {
    @Value(value="${dbservice.url}")
    private String dbUrl;
    @Autowired
    private CommonRestTemplate commonRestTemplate;

    public ProjectFormulationDTO saveProjectFormulation(ProjectFormulationDTO projectFormulationDTO) {
        String url = this.dbUrl + "/projectFormulation";
        ProjectFormulationDTO response = (ProjectFormulationDTO)this.commonRestTemplate.postForObject(url, (Object)projectFormulationDTO, ProjectFormulationDTO.class);
        return response;
    }

    public ProjectFormulationDTO getProjectFormulation(long formulationId, String loadFlag) {
        String url = this.dbUrl + "/projectFormulation/" + formulationId;
        String formulationUrl = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("loadFlag", new Object[]{loadFlag}).toUriString();
        ProjectFormulationDTO response = (ProjectFormulationDTO)this.commonRestTemplate.getForObject(formulationUrl, ProjectFormulationDTO.class);
        return response;
    }

    public FormulationInitiativesDTO saveFormulationInitiatives(FormulationInitiativesDTO formulationInitiativesDTO) {
        String url = this.dbUrl + "/initiatives/projectFormulation";
        FormulationInitiativesDTO response = (FormulationInitiativesDTO)this.commonRestTemplate.postForObject(url, (Object)formulationInitiativesDTO, FormulationInitiativesDTO.class);
        return response;
    }

    public FormulationSubInitiativesDTO saveFormulationSubInitiatives(FormulationSubInitiativesDTO subInitiativesDTO) {
        String url = this.dbUrl + "/subinitiatives/projectFormulation";
        FormulationSubInitiativesDTO response = (FormulationSubInitiativesDTO)this.commonRestTemplate.postForObject(url, (Object)subInitiativesDTO, FormulationSubInitiativesDTO.class);
        return response;
    }

    public FormulationSubInitiativesDTO getFormulationSubInitiatives(long subInitiativesId) {
        String url = this.dbUrl + "/subinitiatives/projectFormulation/" + subInitiativesId;
        FormulationSubInitiativesDTO response = (FormulationSubInitiativesDTO)this.commonRestTemplate.getForObject(url, FormulationSubInitiativesDTO.class);
        return response;
    }

    public Boolean updateFormulationStatus(ProjectFormulationDTO formulationDTO) {
        String url = this.dbUrl + "/status/projectFormulation";
        Boolean response = (Boolean)this.commonRestTemplate.postForObject(url, (Object)formulationDTO, Boolean.class);
        return response;
    }

    public FormulationInitiativesDTO getFormulationInitiatives(long initiativeId) {
        String url = this.dbUrl + "/initiatives/projectFormulation/" + initiativeId;
        FormulationInitiativesDTO response = (FormulationInitiativesDTO)this.commonRestTemplate.getForObject(url, FormulationInitiativesDTO.class);
        return response;
    }

    public boolean deleteFormulationSubInitiatives(long subInitiativesId) {
        String url = this.dbUrl + "/subinitiatives/projectFormulation/" + subInitiativesId;
        Boolean response = (Boolean)this.commonRestTemplate.deleteForObject(url);
        return response;
    }

    public boolean deleteFormulationInitiatives(long initiativeId) {
        String url = this.dbUrl + "/initiatives/projectFormulation/" + initiativeId;
        Boolean response = (Boolean)this.commonRestTemplate.deleteForObject(url);
        return response;
    }

    public List<FormulationInitiativesDTO> getInitiaitivesList(long formulationId, String department) {
        String url = this.dbUrl + "/formulationInitiativesList";
        String listUrl = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("formulationId", new Object[]{formulationId}).queryParam("department", new Object[]{department}).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        List response = (List)this.commonRestTemplate.getForObject(listUrl, (ParameterizedTypeReference)parameterizedTypeReference);
        return response;
    }
}

