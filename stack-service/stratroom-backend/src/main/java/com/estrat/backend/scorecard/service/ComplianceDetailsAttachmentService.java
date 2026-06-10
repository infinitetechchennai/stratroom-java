/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.scorecard.config.CommonRestTemplate
 *  com.estrat.backend.scorecard.dto.ComplianceDetailsAttachmentDTO
 *  com.estrat.backend.scorecard.service.ComplianceDetailsAttachmentService
 *  com.estrat.backend.scorecard.service.ComplianceDetailsAttachmentService$1
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 *  org.springframework.web.client.RestTemplate
 */
package com.estrat.backend.scorecard.service;

import com.estrat.backend.scorecard.config.CommonRestTemplate;
import com.estrat.backend.scorecard.dto.ComplianceDetailsAttachmentDTO;
import com.estrat.backend.scorecard.service.ComplianceDetailsAttachmentService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ComplianceDetailsAttachmentService {
    @Autowired
    private CommonRestTemplate commonRestTemplate;
    @Autowired
    private RestTemplate restTemplate;
    @Value(value="${dbservice.url}")
    private String dbUrl;

    public ComplianceDetailsAttachmentDTO saveComplainAttachment(ComplianceDetailsAttachmentDTO complianceDetailsAttachmentDTO) {
        String url1 = this.dbUrl + "/ComplianceAttach";
        return (ComplianceDetailsAttachmentDTO)this.commonRestTemplate.postForObject(url1, (Object)complianceDetailsAttachmentDTO, ComplianceDetailsAttachmentDTO.class);
    }

    public ComplianceDetailsAttachmentDTO updateComplainAttachment(ComplianceDetailsAttachmentDTO complianceDetailsAttachmentDTO) {
        String url1 = this.dbUrl + "/ComplianceAttach";
        return (ComplianceDetailsAttachmentDTO)this.commonRestTemplate.putForObject(url1, (Object)complianceDetailsAttachmentDTO, ComplianceDetailsAttachmentDTO.class);
    }

    public ComplianceDetailsAttachmentDTO retrieveComplainAttachment(Long id) {
        String url1 = this.dbUrl + "/ComplianceAttach";
        String url = String.join((CharSequence)"/", url1, String.valueOf(id));
        return (ComplianceDetailsAttachmentDTO)this.commonRestTemplate.getForObject(url, ComplianceDetailsAttachmentDTO.class);
    }

    public void removeComplainAttachmentt(Long id) {
        String url1 = this.dbUrl + "/ComplianceAttach";
        String url = String.join((CharSequence)"/", url1, String.valueOf(id));
        this.commonRestTemplate.deleteForObject(url);
    }

    public List<ComplianceDetailsAttachmentDTO> findAll(Long complainId) {
        String url = this.dbUrl + "ComplianceAttachList/" + complainId;
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        List riskDTOList = (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
        return riskDTOList;
    }
}

