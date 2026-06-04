/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.config.CommonRestTemplate
 *  com.estrat.web.dto.ComplianceDetailsAttachmentDTO
 *  com.estrat.web.service.ComplianceDetailsAttachmentService
 *  com.estrat.web.service.ComplianceDetailsAttachmentService$1
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 */
package com.estrat.web.service;

import com.estrat.web.config.CommonRestTemplate;
import com.estrat.web.dto.ComplianceDetailsAttachmentDTO;
import com.estrat.web.service.ComplianceDetailsAttachmentService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;

public class ComplianceDetailsAttachmentService {
    @Autowired
    private CommonRestTemplate commonRestTemplate;
    @Value(value="${scorecard.service.url}")
    private String scoreCardUrl;

    public ComplianceDetailsAttachmentDTO saveComplainAttachment(ComplianceDetailsAttachmentDTO complianceDetailsAttachmentDTO) {
        String url1 = this.scoreCardUrl + "/ComplianceAttach";
        return (ComplianceDetailsAttachmentDTO)this.commonRestTemplate.postForObject(url1, complianceDetailsAttachmentDTO, ComplianceDetailsAttachmentDTO.class);
    }

    public ComplianceDetailsAttachmentDTO updateComplainAttachment(ComplianceDetailsAttachmentDTO complianceDetailsAttachmentDTO) {
        String url1 = this.scoreCardUrl + "/ComplianceAttach";
        return (ComplianceDetailsAttachmentDTO)this.commonRestTemplate.putForObject(url1, complianceDetailsAttachmentDTO, ComplianceDetailsAttachmentDTO.class);
    }

    public ComplianceDetailsAttachmentDTO retrieveComplainAttachment(Long id) {
        String url1 = this.scoreCardUrl + "/ComplianceAttach";
        String url = String.join((CharSequence)"/", url1, String.valueOf(id));
        return (ComplianceDetailsAttachmentDTO)this.commonRestTemplate.getForObject(url, ComplianceDetailsAttachmentDTO.class);
    }

    public void removeComplainAttachmentt(Long id) {
        String url1 = this.scoreCardUrl + "/ComplianceAttach";
        String url = String.join((CharSequence)"/", url1, String.valueOf(id));
        this.commonRestTemplate.deleteForObject(url);
    }

    public List<ComplianceDetailsAttachmentDTO> findAll(Long complainId) {
        String url = this.scoreCardUrl + "ComplianceAttachList/" + complainId;
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference() {};
        List riskDTOList = (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
        return riskDTOList;
    }
}


