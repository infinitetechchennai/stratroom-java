/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.config.CommonRestTemplate
 *  com.estrat.web.dto.InitiativeResponseDTO
 *  com.estrat.web.dto.SubInitiativesDTO
 *  com.estrat.web.dto.SubInitiativesMapDTO
 *  com.estrat.web.service.SubInitiativeService
 *  com.estrat.web.service.SubInitiativeService$1
 *  com.estrat.web.service.SubInitiativeService$2
 *  com.estrat.web.service.SubInitiativeService$3
 *  com.estrat.web.service.SubInitiativeService$4
 *  com.estrat.web.service.SubInitiativeService$5
 *  com.estrat.web.util.DateUtil
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 *  org.springframework.web.client.RestTemplate
 */
package com.estrat.web.service;

import com.estrat.web.config.CommonRestTemplate;
import com.estrat.web.dto.InitiativeResponseDTO;
import com.estrat.web.dto.SubInitiativesDTO;
import com.estrat.web.dto.SubInitiativesMapDTO;
import com.estrat.web.service.SubInitiativeService;
import com.estrat.web.util.DateUtil;
import java.time.LocalDateTime;
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
    @Value(value="${scorecard.service.url}")
    private String scorecardUrl;
    @Value(value="${scorecardservice.subinitiative.url}")
    private String dbUrl;
    @Value(value="${scorecardservice.subinitiatives.list.url}")
    private String subInitiativeListUrl;
    @Value(value="${scorecardservice.subinitiatives.emplist.url}")
    private String subInitiativeEmpListUrl;
    @Value(value="${scorecardservice.subinitiatives.map.url}")
    private String subInitiativesMapUrl;
    @Value(value="${scorecardservice.subinitiatives.map.list.url}")
    private String subInitiativesMapListUrl;

    public InitiativeResponseDTO saveSubInitiatives(SubInitiativesDTO subInitiativesDTO) {
        return (InitiativeResponseDTO)this.commonRestTemplate.postForObject(this.dbUrl, subInitiativesDTO, InitiativeResponseDTO.class);
    }

    public InitiativeResponseDTO updateSubInitiatives(SubInitiativesDTO subInitiativesDTO) {
        return (InitiativeResponseDTO)this.commonRestTemplate.putForObject(this.dbUrl, subInitiativesDTO, InitiativeResponseDTO.class);
    }

    public SubInitiativesDTO retriveSubInitiatives(Long id) {
        String url = String.join((CharSequence)"/", this.dbUrl, String.valueOf(id));
        SubInitiativesDTO subInitiativesDTO = (SubInitiativesDTO)this.commonRestTemplate.getForObject(url, SubInitiativesDTO.class);
        subInitiativesDTO.setCreateDateString(DateUtil.mapToString((LocalDateTime)subInitiativesDTO.getCreatedTime()));
        subInitiativesDTO.setUpdatedDateString(DateUtil.mapToString((LocalDateTime)subInitiativesDTO.getUpdatedTime()));
        return subInitiativesDTO;
    }

    public void removeSubInitiatives(Long id) {
        String url = String.join((CharSequence)"/", this.dbUrl, String.valueOf(id));
        this.commonRestTemplate.deleteForObject(url);
    }

    public List<SubInitiativesDTO> findAllByInitiativesId(Long initiativeId) {
        String url = String.join((CharSequence)"/", this.subInitiativeListUrl, String.valueOf(initiativeId));
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<SubInitiativesDTO> findAllByEmpId(String empId) {
        String url = String.join((CharSequence)"/", this.subInitiativeEmpListUrl, String.valueOf(empId));
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public void saveSubInitiativesMap(List<SubInitiativesMapDTO> subInitiativesMapDTOs) {
        if (!subInitiativesMapDTOs.isEmpty()) {
            for (Object _obj_subInitiativesMapDTO : subInitiativesMapDTOs) {
                SubInitiativesMapDTO subInitiativesMapDTO = (SubInitiativesMapDTO) _obj_subInitiativesMapDTO;
                this.commonRestTemplate.postForObject(this.subInitiativesMapUrl, subInitiativesMapDTO, SubInitiativesMapDTO.class);
            }
        }
    }

    public List<SubInitiativesMapDTO> retrieveSubInitiativesMapList(Long subInitiativesId) {
        String url = String.join((CharSequence)"/", this.subInitiativesMapListUrl, String.valueOf(subInitiativesId));
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<SubInitiativesDTO> retrieveSubInitiativesList(Long initiativeId) {
        String scorecardUrl1 = this.scorecardUrl + "/findAllSubInitiativesList";
        String url = String.join((CharSequence)"/", scorecardUrl1, String.valueOf(initiativeId));
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<SubInitiativesDTO> findByEmpId(String empId) {
        String scorecardUrl1 = this.scorecardUrl + "/emp/subInitiativesList";
        String url = String.join((CharSequence)"/", scorecardUrl1, String.valueOf(empId));
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }
}


