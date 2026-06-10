/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.scorecard.config.CommonRestTemplate
 *  com.estrat.backend.scorecard.dto.InitiativeTaskDto
 *  com.estrat.backend.scorecard.service.InitiativeTaskService
 *  com.estrat.backend.scorecard.service.InitiativeTaskService$1
 *  com.estrat.backend.scorecard.service.InitiativeTaskService$2
 *  com.estrat.backend.scorecard.service.InitiativeTaskService$3
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 */
package com.estrat.backend.scorecard.service;

import com.estrat.backend.scorecard.config.CommonRestTemplate;
import com.estrat.backend.scorecard.dto.InitiativeTaskDto;
import com.estrat.backend.scorecard.service.InitiativeTaskService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;

@Service
public class InitiativeTaskService {
    @Autowired
    private CommonRestTemplate commonRestTemplate;
    @Value(value="${dbservice.url}")
    private String dbUrl;

    public InitiativeTaskDto save(InitiativeTaskDto initiativeTaskDto) {
        String url1 = this.dbUrl + "/initiativeTask";
        return (InitiativeTaskDto)this.commonRestTemplate.postForObject(url1, (Object)initiativeTaskDto, InitiativeTaskDto.class);
    }

    public InitiativeTaskDto update(InitiativeTaskDto initiativeTaskDto) {
        String url1 = this.dbUrl + "/initiativeTask";
        return (InitiativeTaskDto)this.commonRestTemplate.putForObject(url1, (Object)initiativeTaskDto, InitiativeTaskDto.class);
    }

    public InitiativeTaskDto findById(Long id) {
        String url1 = this.dbUrl + "/initiativeTask";
        String url = String.join((CharSequence)"/", url1, String.valueOf(id));
        return (InitiativeTaskDto)this.commonRestTemplate.getForObject(url, InitiativeTaskDto.class);
    }

    public void remove(Long id) {
        String url1 = this.dbUrl + "/initiativeTask";
        String url = String.join((CharSequence)"/", url1, String.valueOf(id));
        this.commonRestTemplate.deleteForObject(url);
    }

    public List<InitiativeTaskDto> findAllByInitiativesId(Long initiativeId) {
        String url1 = this.dbUrl + "/initiativeTasklist";
        String url = String.join((CharSequence)"/", url1, String.valueOf(initiativeId));
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<InitiativeTaskDto> findAllByEmpId(String empId) {
        String url1 = this.dbUrl + "/retrieveInitiativesTask";
        String url = String.join((CharSequence)"/", url1, String.valueOf(empId));
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<InitiativeTaskDto> findByEmpId(Long empId) {
        String scorecardUrl1 = this.dbUrl + "/emp/initiativesTaskList";
        String url = String.join((CharSequence)"/", scorecardUrl1, String.valueOf(empId));
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }
}

