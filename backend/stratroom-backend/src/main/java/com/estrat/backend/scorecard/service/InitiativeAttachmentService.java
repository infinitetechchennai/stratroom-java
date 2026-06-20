/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.scorecard.config.CommonRestTemplate
 *  com.estrat.backend.scorecard.dto.InitiativeAttachmentDto
 *  com.estrat.backend.scorecard.service.InitiativeAttachmentService
 *  com.estrat.backend.scorecard.service.InitiativeAttachmentService$1
 *  com.estrat.backend.scorecard.service.InitiativeAttachmentService$2
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 */
package com.estrat.backend.scorecard.service;

import com.estrat.backend.scorecard.config.CommonRestTemplate;
import com.estrat.backend.scorecard.dto.InitiativeAttachmentDto;
import com.estrat.backend.scorecard.service.InitiativeAttachmentService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;

@Service
public class InitiativeAttachmentService {
    @Autowired
    private CommonRestTemplate commonRestTemplate;
    @Value(value="${dbservice.url}")
    private String dbUrl;

    public InitiativeAttachmentDto save(InitiativeAttachmentDto initiativeAttachmentDto) {
        String url1 = this.dbUrl + "/initiativeAttach";
        return (InitiativeAttachmentDto)this.commonRestTemplate.postForObject(url1, (Object)initiativeAttachmentDto, InitiativeAttachmentDto.class);
    }

    public InitiativeAttachmentDto update(InitiativeAttachmentDto initiativeAttachmentDto) {
        String url1 = this.dbUrl + "/initiativeAttach";
        return (InitiativeAttachmentDto)this.commonRestTemplate.putForObject(url1, (Object)initiativeAttachmentDto, InitiativeAttachmentDto.class);
    }

    public InitiativeAttachmentDto findById(Long id) {
        String url1 = this.dbUrl + "/initiativeAttach";
        String url = String.join((CharSequence)"/", url1, String.valueOf(id));
        return (InitiativeAttachmentDto)this.commonRestTemplate.getForObject(url, InitiativeAttachmentDto.class);
    }

    public void delete(Long id) {
        String url1 = this.dbUrl + "/initiativeAttach";
        String url = String.join((CharSequence)"/", url1, String.valueOf(id));
        this.commonRestTemplate.deleteForObject(url);
    }

    public List<InitiativeAttachmentDto> findAll(Long initiativeId) {
        String url = this.dbUrl + "initiativeAttachList/" + initiativeId;
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        List initDTOList = (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
        return initDTOList;
    }

    public List<InitiativeAttachmentDto> findByEmpId(Long empId) {
        String scorecardUrl1 = this.dbUrl + "/emp/initiativesAttachList";
        String url = String.join((CharSequence)"/", scorecardUrl1, String.valueOf(empId));
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }
}

