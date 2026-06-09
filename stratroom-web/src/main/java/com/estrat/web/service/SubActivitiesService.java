/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.config.CommonRestTemplate
 *  com.estrat.web.dto.SubActivitiesDTO
 *  com.estrat.web.service.SubActivitiesService
 *  com.estrat.web.service.SubActivitiesService$1
 *  com.estrat.web.service.SubActivitiesService$2
 *  org.apache.log4j.Logger
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 *  org.springframework.web.client.RestTemplate
 */
package com.estrat.web.service;

import com.estrat.web.config.CommonRestTemplate;
import com.estrat.web.dto.SubActivitiesDTO;
import com.estrat.web.service.SubActivitiesService;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class SubActivitiesService {
    @Autowired
    private CommonRestTemplate commonRestTemplate;
    @Autowired
    private RestTemplate restTemplate;
    @Value(value="${scorecard.service.url}")
    private String scorecardUrl;
    private static Logger log = LoggerFactory.getLogger(SubActivitiesService.class);

    public SubActivitiesDTO saveSubActivity(SubActivitiesDTO activitiesAndTasksDTO) {
        String url = this.scorecardUrl + "/subactivities";
        return (SubActivitiesDTO)this.commonRestTemplate.postForObject(url, activitiesAndTasksDTO, SubActivitiesDTO.class);
    }

    public SubActivitiesDTO updateSubActivities(SubActivitiesDTO activitiesAndTasksDTO) {
        String url = this.scorecardUrl + "/subactivities";
        return (SubActivitiesDTO)this.commonRestTemplate.putForObject(url, activitiesAndTasksDTO, SubActivitiesDTO.class);
    }

    public SubActivitiesDTO retriveSubActivities(Long id) {
        String url = this.scorecardUrl + "/subactivities/" + id;
        return (SubActivitiesDTO)this.commonRestTemplate.getForObject(url, SubActivitiesDTO.class);
    }

    public void removeSubActivities(Long id) {
        String url = this.scorecardUrl + "/subactivities/" + id;
        this.commonRestTemplate.deleteForObject(url);
    }

    public List<SubActivitiesDTO> findAllByActivityId(Long activityId) {
        String scorecardUrl1 = this.scorecardUrl + "/subActivitieslist";
        String url = String.join((CharSequence)"/", scorecardUrl1, String.valueOf(activityId));
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<SubActivitiesDTO> findByEmpId(String empId) {
        String scorecardUrl1 = this.scorecardUrl + "/emp/subActivitiesLists";
        String url = String.join((CharSequence)"/", scorecardUrl1, String.valueOf(empId));
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }
}


