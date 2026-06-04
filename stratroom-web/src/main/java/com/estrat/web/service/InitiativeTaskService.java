/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.config.CommonRestTemplate
 *  com.estrat.web.dto.InitiativeTaskDto
 *  com.estrat.web.service.InitiativeTaskService
 *  com.estrat.web.service.InitiativeTaskService$1
 *  com.estrat.web.service.InitiativeTaskService$2
 *  com.estrat.web.service.InitiativeTaskService$3
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 */
package com.estrat.web.service;

import com.estrat.web.config.CommonRestTemplate;
import com.estrat.web.dto.InitiativeTaskDto;
import com.estrat.web.service.InitiativeTaskService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;

@Service
public class InitiativeTaskService {
    @Autowired
    private CommonRestTemplate commonRestTemplate;
    @Value(value="${scorecard.service.url}")
    private String scorecardUrl;

    public InitiativeTaskDto save(InitiativeTaskDto initiativeTaskDto) {
        String url1 = this.scorecardUrl + "/initiativeTask";
        return (InitiativeTaskDto)this.commonRestTemplate.postForObject(url1, initiativeTaskDto, InitiativeTaskDto.class);
    }

    public InitiativeTaskDto update(InitiativeTaskDto initiativeTaskDto) {
        String url1 = this.scorecardUrl + "/initiativeTask";
        return (InitiativeTaskDto)this.commonRestTemplate.putForObject(url1, initiativeTaskDto, InitiativeTaskDto.class);
    }

    public InitiativeTaskDto findById(Long id) {
        String url1 = this.scorecardUrl + "/initiativeTask";
        String url = String.join((CharSequence)"/", url1, String.valueOf(id));
        return (InitiativeTaskDto)this.commonRestTemplate.getForObject(url, InitiativeTaskDto.class);
    }

    public void remove(Long id) {
        String url1 = this.scorecardUrl + "/initiativeTask";
        String url = String.join((CharSequence)"/", url1, String.valueOf(id));
        this.commonRestTemplate.deleteForObject(url);
    }

    public List<InitiativeTaskDto> findAllByInitiativesId(Long initiativeId) {
        String url1 = this.scorecardUrl + "/initiativeTasklist";
        String url = String.join((CharSequence)"/", url1, String.valueOf(initiativeId));
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<InitiativeTaskDto> findAllByEmpId(String empId) {
        String url1 = this.scorecardUrl + "/retrieveInitiativesTask";
        String url = String.join((CharSequence)"/", url1, String.valueOf(empId));
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<InitiativeTaskDto> findByEmpId(String empId) {
        String scorecardUrl1 = this.scorecardUrl + "/emp/initiativesTaskList";
        String url = String.join((CharSequence)"/", scorecardUrl1, String.valueOf(empId));
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }
}


