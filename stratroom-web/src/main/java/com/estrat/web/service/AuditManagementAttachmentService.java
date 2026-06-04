/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.config.CommonRestTemplate
 *  com.estrat.web.dto.AuditManagementAttachmentDTO
 *  com.estrat.web.service.AuditManagementAttachmentService
 *  com.estrat.web.service.AuditManagementAttachmentService$1
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 */
package com.estrat.web.service;

import com.estrat.web.config.CommonRestTemplate;
import com.estrat.web.dto.AuditManagementAttachmentDTO;
import com.estrat.web.service.AuditManagementAttachmentService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;

@Service
public class AuditManagementAttachmentService {
    @Autowired
    private CommonRestTemplate commonRestTemplate;
    @Value(value="${scorecard.service.url}")
    private String scoreCardUrl;

    public AuditManagementAttachmentDTO save(AuditManagementAttachmentDTO auditManagementAttachmentDTO) {
        String url1 = this.scoreCardUrl + "/auditAttach";
        return (AuditManagementAttachmentDTO)this.commonRestTemplate.postForObject(url1, auditManagementAttachmentDTO, AuditManagementAttachmentDTO.class);
    }

    public AuditManagementAttachmentDTO update(AuditManagementAttachmentDTO auditManagementAttachmentDTO) {
        String url1 = this.scoreCardUrl + "/auditAttach";
        return (AuditManagementAttachmentDTO)this.commonRestTemplate.putForObject(url1, auditManagementAttachmentDTO, AuditManagementAttachmentDTO.class);
    }

    public AuditManagementAttachmentDTO findById(Long id) {
        String url1 = this.scoreCardUrl + "/auditAttach";
        String url = String.join((CharSequence)"/", url1, String.valueOf(id));
        return (AuditManagementAttachmentDTO)this.commonRestTemplate.getForObject(url, AuditManagementAttachmentDTO.class);
    }

    public void delete(Long id) {
        String url1 = this.scoreCardUrl + "/auditAttach";
        String url = String.join((CharSequence)"/", url1, String.valueOf(id));
        this.commonRestTemplate.deleteForObject(url);
    }

    public List<AuditManagementAttachmentDTO> findAll(Long auditId) {
        String url = this.scoreCardUrl + "auditAttachList/" + auditId;
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference() {};
        List initDTOList = (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
        return initDTOList;
    }
}


