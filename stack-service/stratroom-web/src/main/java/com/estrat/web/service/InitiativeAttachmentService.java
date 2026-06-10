/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.config.CommonRestTemplate
 *  com.estrat.web.dto.InitiativeAttachmentDto
 *  com.estrat.web.service.InitiativeAttachmentService
 *  com.estrat.web.service.InitiativeAttachmentService$1
 *  com.estrat.web.service.InitiativeAttachmentService$2
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 */
package com.estrat.web.service;

import com.estrat.web.config.CommonRestTemplate;
import com.estrat.web.dto.InitiativeAttachmentDto;
import com.estrat.web.service.InitiativeAttachmentService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;

@Service
public class InitiativeAttachmentService {
    @Autowired
    private CommonRestTemplate commonRestTemplate;
    @Value(value="${scorecard.service.url}")
    private String scoreCardUrl;

    public InitiativeAttachmentDto save(InitiativeAttachmentDto initiativeAttachmentDto) {
        String url1 = this.scoreCardUrl + "/initiativeAttach";
        return (InitiativeAttachmentDto)this.commonRestTemplate.postForObject(url1, initiativeAttachmentDto, InitiativeAttachmentDto.class);
    }

    public InitiativeAttachmentDto update(InitiativeAttachmentDto initiativeAttachmentDto) {
        String url1 = this.scoreCardUrl + "/initiativeAttach";
        return (InitiativeAttachmentDto)this.commonRestTemplate.putForObject(url1, initiativeAttachmentDto, InitiativeAttachmentDto.class);
    }

    public InitiativeAttachmentDto findById(Long id) {
        String url1 = this.scoreCardUrl + "/initiativeAttach";
        String url = String.join((CharSequence)"/", url1, String.valueOf(id));
        return (InitiativeAttachmentDto)this.commonRestTemplate.getForObject(url, InitiativeAttachmentDto.class);
    }

    public void delete(Long id) {
        String url1 = this.scoreCardUrl + "/initiativeAttach";
        String url = String.join((CharSequence)"/", url1, String.valueOf(id));
        this.commonRestTemplate.deleteForObject(url);
    }

    public List<InitiativeAttachmentDto> findAll(Long initiativeId) {
        String url = this.scoreCardUrl + "initiativeAttachList/" + initiativeId;
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        List initDTOList = (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
        return initDTOList;
    }

    public List<InitiativeAttachmentDto> findByEmpId(String empId) {
        String scorecardUrl1 = this.scoreCardUrl + "/emp/initiativesAttachList";
        String url = String.join((CharSequence)"/", scorecardUrl1, String.valueOf(empId));
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }
}


