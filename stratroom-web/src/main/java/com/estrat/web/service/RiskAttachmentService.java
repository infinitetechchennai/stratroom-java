/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.config.CommonRestTemplate
 *  com.estrat.web.dto.RiskAttachmentDto
 *  com.estrat.web.service.RiskAttachmentService
 *  com.estrat.web.service.RiskAttachmentService$1
 *  com.estrat.web.service.RiskAttachmentService$2
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 */
package com.estrat.web.service;

import com.estrat.web.config.CommonRestTemplate;
import com.estrat.web.dto.RiskAttachmentDto;
import com.estrat.web.service.RiskAttachmentService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;

@Service
public class RiskAttachmentService {
    @Autowired
    private CommonRestTemplate commonRestTemplate;
    @Value(value="${scorecard.service.url}")
    private String scoreCardUrl;

    public RiskAttachmentDto save(RiskAttachmentDto riskAttachmentDto) {
        String url1 = this.scoreCardUrl + "/riskAttach";
        return (RiskAttachmentDto)this.commonRestTemplate.postForObject(url1, riskAttachmentDto, RiskAttachmentDto.class);
    }

    public RiskAttachmentDto update(RiskAttachmentDto riskAttachmentDto) {
        String url1 = riskAttachmentDto + "/riskAttach";
        return (RiskAttachmentDto)this.commonRestTemplate.putForObject(url1, riskAttachmentDto, RiskAttachmentDto.class);
    }

    public RiskAttachmentDto findById(Long id) {
        String url1 = this.scoreCardUrl + "/riskAttach";
        String url = String.join((CharSequence)"/", url1, String.valueOf(id));
        return (RiskAttachmentDto)this.commonRestTemplate.getForObject(url, RiskAttachmentDto.class);
    }

    public void delete(Long id) {
        String url1 = this.scoreCardUrl + "/riskAttach";
        String url = String.join((CharSequence)"/", url1, String.valueOf(id));
        this.commonRestTemplate.deleteForObject(url);
    }

    public List<RiskAttachmentDto> findAll(Long riskId) {
        String url = this.scoreCardUrl + "riskAttachList/" + riskId;
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        List riskDTOList = (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
        return riskDTOList;
    }

    public List<RiskAttachmentDto> findByEmpId(Long empId) {
        String scorecardUrl1 = this.scoreCardUrl + "/emp/riskAttachList";
        String url = String.join((CharSequence)"/", scorecardUrl1, String.valueOf(empId));
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }
}


