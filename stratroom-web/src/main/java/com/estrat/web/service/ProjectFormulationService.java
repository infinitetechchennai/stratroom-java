/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.config.CommonRestTemplate
 *  com.estrat.web.dto.FormulationInitiativesDTO
 *  com.estrat.web.dto.FormulationSubInitiativesDTO
 *  com.estrat.web.dto.ProjectFormulationDTO
 *  com.estrat.web.service.ProjectFormulationService
 *  com.estrat.web.service.ProjectFormulationService$1
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 *  org.springframework.web.util.UriComponentsBuilder
 */
package com.estrat.web.service;

import com.estrat.web.config.CommonRestTemplate;
import com.estrat.web.dto.FormulationInitiativesDTO;
import com.estrat.web.dto.FormulationSubInitiativesDTO;
import com.estrat.web.dto.ProjectFormulationDTO;
import com.estrat.web.service.ProjectFormulationService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class ProjectFormulationService {
    @Value(value="${scorecard.service.url}")
    private String scoreCardUrl;
    @Autowired
    private CommonRestTemplate commonRestTemplate;

    public ProjectFormulationDTO saveProjectFormulation(ProjectFormulationDTO projectFormulationDTO) {
        String url = this.scoreCardUrl + "/projectFormulation";
        ProjectFormulationDTO response = (ProjectFormulationDTO)this.commonRestTemplate.postForObject(url, projectFormulationDTO, ProjectFormulationDTO.class);
        return response;
    }

    public ProjectFormulationDTO getProjectFormulation(long formulationId, String loadFlag) {
        String url = this.scoreCardUrl + "/projectFormulation/" + formulationId;
        String formulationUrl = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("loadFlag", new Object[]{loadFlag}).toUriString();
        ProjectFormulationDTO response = (ProjectFormulationDTO)this.commonRestTemplate.getForObject(formulationUrl, ProjectFormulationDTO.class);
        return response;
    }

    public FormulationInitiativesDTO saveFormulationInitiatives(FormulationInitiativesDTO formulationInitiativesDTO) {
        String url = this.scoreCardUrl + "/initiatives/projectFormulation";
        FormulationInitiativesDTO response = (FormulationInitiativesDTO)this.commonRestTemplate.postForObject(url, formulationInitiativesDTO, FormulationInitiativesDTO.class);
        return response;
    }

    public FormulationSubInitiativesDTO saveFormulationSubInitiatives(FormulationSubInitiativesDTO subInitiativesDTO) {
        String url = this.scoreCardUrl + "/subinitiatives/projectFormulation";
        FormulationSubInitiativesDTO response = (FormulationSubInitiativesDTO)this.commonRestTemplate.postForObject(url, subInitiativesDTO, FormulationSubInitiativesDTO.class);
        return response;
    }

    public FormulationSubInitiativesDTO getFormulationSubInitiatives(long subInitiativesId) {
        String url = this.scoreCardUrl + "/subinitiatives/projectFormulation/" + subInitiativesId;
        FormulationSubInitiativesDTO response = (FormulationSubInitiativesDTO)this.commonRestTemplate.getForObject(url, FormulationSubInitiativesDTO.class);
        return response;
    }

    public Boolean updateFormulationStatus(ProjectFormulationDTO formulationDTO) {
        String url = this.scoreCardUrl + "/status/projectFormulation";
        Boolean response = (Boolean)this.commonRestTemplate.postForObject(url, formulationDTO, Boolean.class);
        return response;
    }

    public FormulationInitiativesDTO getFormulationInitiatives(long initiativeId) {
        String url = this.scoreCardUrl + "/initiatives/projectFormulation/" + initiativeId;
        FormulationInitiativesDTO response = (FormulationInitiativesDTO)this.commonRestTemplate.getForObject(url, FormulationInitiativesDTO.class);
        return response;
    }

    public boolean deleteFormulationSubInitiatives(long subInitiativesId) {
        String url = this.scoreCardUrl + "/subinitiatives/projectFormulation/" + subInitiativesId;
        Boolean response = (Boolean)this.commonRestTemplate.deleteForObject(url);
        return response;
    }

    public boolean deleteFormulationInitiatives(long initiativeId) {
        String url = this.scoreCardUrl + "/initiatives/projectFormulation/" + initiativeId;
        Boolean response = (Boolean)this.commonRestTemplate.deleteForObject(url);
        return response;
    }

    public List<FormulationInitiativesDTO> getInitiaitivesList(long formulationId, String department) {
        String url = this.scoreCardUrl + "/formulationInitiativesList";
        String listUrl = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("formulationId", new Object[]{formulationId}).queryParam("department", new Object[]{department}).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference() {};
        List response = (List)this.commonRestTemplate.getForObject(listUrl, (ParameterizedTypeReference)parameterizedTypeReference);
        return response;
    }
}


