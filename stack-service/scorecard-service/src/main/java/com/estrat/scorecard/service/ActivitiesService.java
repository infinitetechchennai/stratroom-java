/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.scorecard.config.CommonRestTemplate
 *  com.estrat.scorecard.dto.ActivitiesDTO
 *  com.estrat.scorecard.dto.ActivitiesMapDTO
 *  com.estrat.scorecard.service.ActivitiesService
 *  com.estrat.scorecard.service.ActivitiesService$1
 *  com.estrat.scorecard.service.ActivitiesService$2
 *  com.estrat.scorecard.service.ActivitiesService$3
 *  com.estrat.scorecard.service.ActivitiesService$4
 *  com.estrat.scorecard.service.ActivitiesService$5
 *  com.estrat.scorecard.service.ActivitiesService$6
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 */
package com.estrat.scorecard.service;

import com.estrat.scorecard.config.CommonRestTemplate;
import com.estrat.scorecard.dto.ActivitiesDTO;
import com.estrat.scorecard.dto.ActivitiesMapDTO;
import com.estrat.scorecard.service.ActivitiesService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;

@Service
public class ActivitiesService {
    @Autowired
    private CommonRestTemplate commonRestTemplate;
    @Value(value="${dbservice.url}")
    private String dbUri;
    @Value(value="${dbservice.activities.url}")
    private String dbUrl;
    @Value(value="${dbservice.activities.list.url}")
    private String activitiesListUrl;
    @Value(value="${dbservice.activities.emplist.url}")
    private String activitiesEmpListUrl;
    @Value(value="${dbservice.activities.map.url}")
    private String activitiesMapUrl;
    @Value(value="${dbservice.activities.map.list.url}")
    private String activitiesMapListUrl;

    public ActivitiesDTO saveActivity(ActivitiesDTO activitiesAndTasksDTO) {
        return (ActivitiesDTO)this.commonRestTemplate.postForObject(this.dbUrl, (Object)activitiesAndTasksDTO, ActivitiesDTO.class);
    }

    public ActivitiesDTO updateActivities(ActivitiesDTO activitiesAndTasksDTO) {
        return (ActivitiesDTO)this.commonRestTemplate.putForObject(this.dbUrl, (Object)activitiesAndTasksDTO, ActivitiesDTO.class);
    }

    public ActivitiesDTO retriveActivities(Long id) {
        String url = String.join((CharSequence)"/", this.dbUrl, String.valueOf(id));
        return (ActivitiesDTO)this.commonRestTemplate.getForObject(url, ActivitiesDTO.class);
    }

    public void removeActivities(Long id) {
        String url = String.join((CharSequence)"/", this.dbUrl, String.valueOf(id));
        this.commonRestTemplate.deleteForObject(url);
    }

    public List<ActivitiesDTO> findAllByInitiativesId(Long initiativeId) {
        String url = String.join((CharSequence)"/", this.activitiesListUrl, String.valueOf(initiativeId));
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<ActivitiesDTO> retrieveActivitiesList(Long initiativeId) {
        String uri = this.dbUri + "retrieveActivitiesLists";
        String url = String.join((CharSequence)"/", uri, String.valueOf(initiativeId));
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<ActivitiesDTO> findAllByEmpId(Long empId) {
        String url = String.join((CharSequence)"/", this.activitiesEmpListUrl, String.valueOf(empId));
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public ActivitiesMapDTO saveActivitiesMap(ActivitiesMapDTO activitiesMapDTO) {
        return (ActivitiesMapDTO)this.commonRestTemplate.postForObject(this.activitiesMapUrl, (Object)activitiesMapDTO, ActivitiesMapDTO.class);
    }

    public List<ActivitiesMapDTO> retrieveActivitiesMapList(Long activitiesId) {
        String url = String.join((CharSequence)"/", this.activitiesMapListUrl, String.valueOf(activitiesId));
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<ActivitiesDTO> findByEmpId(Long empId) {
        String uri = this.dbUri + "emp/activitiesLists";
        String url = String.join((CharSequence)"/", uri, String.valueOf(empId));
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<ActivitiesDTO> retrieveSubInitiativeList(Long subInitiativeId) {
        String uri = this.dbUri + "retrieveSubInitiativeLists";
        String url = String.join((CharSequence)"/", uri, String.valueOf(subInitiativeId));
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }
}

