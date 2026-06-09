/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.scorecard.config.CommonRestTemplate
 *  com.estrat.scorecard.dto.SubActivitiesDTO
 *  com.estrat.scorecard.service.SubActivitiesService
 *  com.estrat.scorecard.service.SubActivitiesService$1
 *  com.estrat.scorecard.service.SubActivitiesService$2
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 */
package com.estrat.scorecard.service;

import com.estrat.scorecard.config.CommonRestTemplate;
import com.estrat.scorecard.dto.SubActivitiesDTO;
import com.estrat.scorecard.service.SubActivitiesService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;

@Service
public class SubActivitiesService {
    @Autowired
    private CommonRestTemplate commonRestTemplate;
    @Value(value="${dbservice.url}")
    private String dbUri;

    public SubActivitiesDTO saveSubActivity(SubActivitiesDTO activitiesAndTasksDTO) {
        String url = this.dbUri + "/subactivities";
        return (SubActivitiesDTO)this.commonRestTemplate.postForObject(url, (Object)activitiesAndTasksDTO, SubActivitiesDTO.class);
    }

    public SubActivitiesDTO updateSubActivities(SubActivitiesDTO activitiesAndTasksDTO) {
        String url = this.dbUri + "/subactivities";
        return (SubActivitiesDTO)this.commonRestTemplate.putForObject(url, (Object)activitiesAndTasksDTO, SubActivitiesDTO.class);
    }

    public SubActivitiesDTO retriveSubActivities(Long id) {
        String scorecardUrl1 = this.dbUri + "/subactivities";
        String url = String.join((CharSequence)"/", scorecardUrl1, String.valueOf(id));
        return (SubActivitiesDTO)this.commonRestTemplate.getForObject(url, SubActivitiesDTO.class);
    }

    public void removeSubActivities(Long id) {
        String scorecardUrl1 = this.dbUri + "/subactivities";
        String url = String.join((CharSequence)"/", scorecardUrl1, String.valueOf(id));
        this.commonRestTemplate.deleteForObject(url);
    }

    public List<SubActivitiesDTO> findAllByActivityId(Long activityId) {
        String scorecardUrl1 = this.dbUri + "/subActivitieslist";
        String url = String.join((CharSequence)"/", scorecardUrl1, String.valueOf(activityId));
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<SubActivitiesDTO> findByEmpId(Long empId) {
        String uri = this.dbUri + "/emp/subActivitiesLists";
        String url = String.join((CharSequence)"/", uri, String.valueOf(empId));
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }
}

