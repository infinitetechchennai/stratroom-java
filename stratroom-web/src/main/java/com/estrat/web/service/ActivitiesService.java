/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.config.CommonRestTemplate
 *  com.estrat.web.dto.ActivitiesDTO
 *  com.estrat.web.dto.ActivitiesMapDTO
 *  com.estrat.web.service.ActivitiesService
 *  com.estrat.web.service.ActivitiesService$1
 *  com.estrat.web.service.ActivitiesService$2
 *  com.estrat.web.service.ActivitiesService$3
 *  com.estrat.web.service.ActivitiesService$4
 *  com.estrat.web.service.ActivitiesService$5
 *  com.estrat.web.service.ActivitiesService$6
 *  com.estrat.web.util.DateUtil
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 *  org.springframework.web.client.RestTemplate
 */
package com.estrat.web.service;

import com.estrat.web.config.CommonRestTemplate;
import com.estrat.web.dto.ActivitiesDTO;
import com.estrat.web.dto.ActivitiesMapDTO;
import com.estrat.web.service.ActivitiesService;
import com.estrat.web.util.DateUtil;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ActivitiesService {
    @Autowired
    private CommonRestTemplate commonRestTemplate;
    @Autowired
    private RestTemplate restTemplate;
    @Value(value="${scorecard.service.url}")
    private String scorecardUrl;
    @Value(value="${scorecardservice.activities.url}")
    private String dbUrl;
    @Value(value="${scorecardservice.activities.list.url}")
    private String activitiesListUrl;
    @Value(value="${scorecardservice.activities.emplist.url}")
    private String activitiesEmpListUrl;
    @Value(value="${scorecardservice.activities.map.url}")
    private String activitiesMapUrl;
    @Value(value="${scorecardservice.activities.map.list.url}")
    private String activitiesMapListUrl;

    public ActivitiesDTO saveActivity(ActivitiesDTO activitiesAndTasksDTO) {
        return (ActivitiesDTO)this.commonRestTemplate.postForObject(this.dbUrl, activitiesAndTasksDTO, ActivitiesDTO.class);
    }

    public ActivitiesDTO updateActivities(ActivitiesDTO activitiesAndTasksDTO) {
        return (ActivitiesDTO)this.commonRestTemplate.putForObject(this.dbUrl, activitiesAndTasksDTO, ActivitiesDTO.class);
    }

    public ActivitiesDTO retriveActivities(Long id) {
        String url = String.join((CharSequence)"/", this.dbUrl, String.valueOf(id));
        ActivitiesDTO activitiesDTO = (ActivitiesDTO)this.commonRestTemplate.getForObject(url, ActivitiesDTO.class);
        activitiesDTO.setCreateDateString(DateUtil.mapToString((LocalDateTime)activitiesDTO.getCreatedTime()));
        activitiesDTO.setUpdatedDateString(DateUtil.mapToString((LocalDateTime)activitiesDTO.getUpdatedTime()));
        return activitiesDTO;
    }

    public void removeActivities(Long id) {
        String url = String.join((CharSequence)"/", this.dbUrl, String.valueOf(id));
        this.commonRestTemplate.deleteForObject(url);
    }

    public List<ActivitiesDTO> findAllByInitiativesId(Long initiativeId) {
        String url = String.join((CharSequence)"/", this.activitiesListUrl, String.valueOf(initiativeId));
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<ActivitiesDTO> retrieveActivitiesLists(Long initiativeId) {
        String scorecardUrl1 = this.scorecardUrl + "/retrieveActivitiesLists";
        String url = String.join((CharSequence)"/", scorecardUrl1, String.valueOf(initiativeId));
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<ActivitiesDTO> findAllByEmpId(String empId) {
        String url = String.join((CharSequence)"/", this.activitiesEmpListUrl, String.valueOf(empId));
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public void saveActivitiesMap(List<ActivitiesMapDTO> activitiesMapDTOs) {
        if (!activitiesMapDTOs.isEmpty()) {
            for (Object _obj_activitiesMapDTO : activitiesMapDTOs) {
                ActivitiesMapDTO activitiesMapDTO = (ActivitiesMapDTO) _obj_activitiesMapDTO;
                this.commonRestTemplate.postForObject(this.activitiesMapUrl, activitiesMapDTO, ActivitiesMapDTO.class);
            }
        }
    }

    public List<ActivitiesMapDTO> retrieveActivitiesMapList(Long activitiesId) {
        String url = String.join((CharSequence)"/", this.activitiesMapListUrl, String.valueOf(activitiesId));
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<ActivitiesDTO> findByEmpId(String empId) {
        String scorecardUrl1 = this.scorecardUrl + "/emp/activitiesLists";
        String url = String.join((CharSequence)"/", scorecardUrl1, String.valueOf(empId));
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<ActivitiesDTO> retrieveSubInitiativeLists(Long subInitiativeId) {
        String scorecardUrl1 = this.scorecardUrl + "/retrieveSubInitiativeLists";
        String url = String.join((CharSequence)"/", scorecardUrl1, String.valueOf(subInitiativeId));
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }
}


