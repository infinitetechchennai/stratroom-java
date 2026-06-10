/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.scorecard.config.CommonRestTemplate
 *  com.estrat.backend.scorecard.dto.InitiativeResponseDTO
 *  com.estrat.backend.scorecard.dto.SubInitiativesDTO
 *  com.estrat.backend.scorecard.dto.SubInitiativesMapDTO
 *  com.estrat.backend.scorecard.service.SubInitiativeService
 *  com.estrat.backend.scorecard.service.SubInitiativeService$1
 *  com.estrat.backend.scorecard.service.SubInitiativeService$2
 *  com.estrat.backend.scorecard.service.SubInitiativeService$3
 *  com.estrat.backend.scorecard.service.SubInitiativeService$4
 *  com.estrat.backend.scorecard.service.SubInitiativeService$5
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 *  org.springframework.web.client.RestTemplate
 */
package com.estrat.backend.scorecard.service;

import com.estrat.backend.scorecard.config.CommonRestTemplate;
import com.estrat.backend.scorecard.dto.InitiativeResponseDTO;
import com.estrat.backend.scorecard.dto.SubInitiativesDTO;
import com.estrat.backend.scorecard.dto.SubInitiativesMapDTO;
import com.estrat.backend.scorecard.service.SubInitiativeService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class SubInitiativeService {
    @Autowired
    private CommonRestTemplate commonRestTemplate;
    @Autowired
    private RestTemplate restTemplate;
    @Value(value="${dbservice.url}")
    private String dbUri;
    @Value(value="${dbservice.subinitiative.url}")
    private String dbUrl;
    @Value(value="${dbservice.subinitiatives.list.url}")
    private String subInitiaitveListUrl;
    @Value(value="${dbservice.subinitiatives.emplist.url}")
    private String subInitiaitveEmpListUrl;
    @Value(value="${dbservice.subinitiatives.map.url}")
    private String subInitiativesMapUrl;
    @Value(value="${dbservice.subinitiatives.map.list.url}")
    private String subInitiativesMapListUrl;

    public InitiativeResponseDTO saveSubInitiatives(SubInitiativesDTO subInitiativesDTO) {
        return (InitiativeResponseDTO)this.commonRestTemplate.postForObject(this.dbUrl, (Object)subInitiativesDTO, InitiativeResponseDTO.class);
    }

    public InitiativeResponseDTO updateSubInitiatives(SubInitiativesDTO subInitiativesDTO) {
        return (InitiativeResponseDTO)this.commonRestTemplate.putForObject(this.dbUrl, (Object)subInitiativesDTO, InitiativeResponseDTO.class);
    }

    public SubInitiativesDTO retriveSubInitiatives(Long id) {
        String url = String.join((CharSequence)"/", this.dbUrl, String.valueOf(id));
        return (SubInitiativesDTO)this.commonRestTemplate.getForObject(url, SubInitiativesDTO.class);
    }

    public void removeSubInitiatives(Long id) {
        String url = String.join((CharSequence)"/", this.dbUrl, String.valueOf(id));
        this.commonRestTemplate.deleteForObject(url);
    }

    public List<SubInitiativesDTO> findAllByInitiativesId(Long initiativeId) {
        String url = String.join((CharSequence)"/", this.subInitiaitveListUrl, String.valueOf(initiativeId));
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<SubInitiativesDTO> findAllByEmpId(Long empId) {
        String url = String.join((CharSequence)"/", this.subInitiaitveEmpListUrl, String.valueOf(empId));
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public SubInitiativesMapDTO saveSubInitiativesMap(SubInitiativesMapDTO activitiesMapDTO) {
        return (SubInitiativesMapDTO)this.commonRestTemplate.postForObject(this.subInitiativesMapUrl, (Object)activitiesMapDTO, SubInitiativesMapDTO.class);
    }

    public List<SubInitiativesMapDTO> retrieveSubInitiativesMapList(Long subInitiativesId) {
        String url = String.join((CharSequence)"/", this.subInitiativesMapListUrl, String.valueOf(subInitiativesId));
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<SubInitiativesDTO> retrieveSubInitiativesList(Long initiativeId) {
        String dbUrl = this.dbUri + "findAllSubInitiativesList";
        String url = String.join((CharSequence)"/", dbUrl, String.valueOf(initiativeId));
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<SubInitiativesDTO> findBYEmpId(Long empId) {
        String dbUrl = this.dbUri + "emp/subInitiativesList";
        String url = String.join((CharSequence)"/", dbUrl, String.valueOf(empId));
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }
}

