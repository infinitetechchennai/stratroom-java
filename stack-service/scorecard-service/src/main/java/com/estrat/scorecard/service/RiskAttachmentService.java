/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.scorecard.config.CommonRestTemplate
 *  com.estrat.scorecard.dto.RiskAttachmentDto
 *  com.estrat.scorecard.service.RiskAttachmentService
 *  com.estrat.scorecard.service.RiskAttachmentService$1
 *  com.estrat.scorecard.service.RiskAttachmentService$2
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 */
package com.estrat.scorecard.service;

import com.estrat.scorecard.config.CommonRestTemplate;
import com.estrat.scorecard.dto.RiskAttachmentDto;
import com.estrat.scorecard.service.RiskAttachmentService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;

@Service
public class RiskAttachmentService {
    @Autowired
    private CommonRestTemplate commonRestTemplate;
    @Value(value="${dbservice.url}")
    private String dbUrl;

    public RiskAttachmentDto save(RiskAttachmentDto riskAttachmentDto) {
        String url1 = this.dbUrl + "/riskAttach";
        return (RiskAttachmentDto)this.commonRestTemplate.postForObject(url1, (Object)riskAttachmentDto, RiskAttachmentDto.class);
    }

    public RiskAttachmentDto update(RiskAttachmentDto riskAttachmentDto) {
        String url1 = this.dbUrl + "/riskAttach";
        return (RiskAttachmentDto)this.commonRestTemplate.putForObject(url1, (Object)riskAttachmentDto, RiskAttachmentDto.class);
    }

    public RiskAttachmentDto findById(Long id) {
        String url1 = this.dbUrl + "/riskAttach";
        String url = String.join((CharSequence)"/", url1, String.valueOf(id));
        return (RiskAttachmentDto)this.commonRestTemplate.getForObject(url, RiskAttachmentDto.class);
    }

    public void delete(Long id) {
        String url1 = this.dbUrl + "/riskAttach";
        String url = String.join((CharSequence)"/", url1, String.valueOf(id));
        this.commonRestTemplate.deleteForObject(url);
    }

    public List<RiskAttachmentDto> findAll(Long riskId) {
        String url = this.dbUrl + "riskAttachList/" + riskId;
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        List riskDTOList = (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
        return riskDTOList;
    }

    public List<RiskAttachmentDto> findByEmpId(Long empId) {
        String scorecardUrl1 = this.dbUrl + "/emp/riskAttachList";
        String url = String.join((CharSequence)"/", scorecardUrl1, String.valueOf(empId));
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }
}

