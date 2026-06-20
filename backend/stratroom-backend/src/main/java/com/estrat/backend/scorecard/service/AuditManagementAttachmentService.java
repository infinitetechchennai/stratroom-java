/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.scorecard.config.CommonRestTemplate
 *  com.estrat.backend.scorecard.dto.AuditManagementAttachmentDTO
 *  com.estrat.backend.scorecard.service.AuditManagementAttachmentService
 *  com.estrat.backend.scorecard.service.AuditManagementAttachmentService$1
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 */
package com.estrat.backend.scorecard.service;

import com.estrat.backend.scorecard.config.CommonRestTemplate;
import com.estrat.backend.scorecard.dto.AuditManagementAttachmentDTO;
import com.estrat.backend.scorecard.service.AuditManagementAttachmentService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;

@Service
public class AuditManagementAttachmentService {
    @Autowired
    private CommonRestTemplate commonRestTemplate;
    @Value(value="${dbservice.url}")
    private String dbUrl;

    public AuditManagementAttachmentDTO save(AuditManagementAttachmentDTO auditManagementAttachmentDTO) {
        String url1 = this.dbUrl + "/auditAttach";
        return (AuditManagementAttachmentDTO)this.commonRestTemplate.postForObject(url1, (Object)auditManagementAttachmentDTO, AuditManagementAttachmentDTO.class);
    }

    public AuditManagementAttachmentDTO update(AuditManagementAttachmentDTO auditManagementAttachmentDTO) {
        String url1 = this.dbUrl + "/auditAttach";
        return (AuditManagementAttachmentDTO)this.commonRestTemplate.putForObject(url1, (Object)auditManagementAttachmentDTO, AuditManagementAttachmentDTO.class);
    }

    public AuditManagementAttachmentDTO findById(Long id) {
        String url1 = this.dbUrl + "/auditAttach";
        String url = String.join((CharSequence)"/", url1, String.valueOf(id));
        return (AuditManagementAttachmentDTO)this.commonRestTemplate.getForObject(url, AuditManagementAttachmentDTO.class);
    }

    public void delete(Long id) {
        String url1 = this.dbUrl + "/auditAttach";
        String url = String.join((CharSequence)"/", url1, String.valueOf(id));
        this.commonRestTemplate.deleteForObject(url);
    }

    public List<AuditManagementAttachmentDTO> findAll(Long auditId) {
        String url = this.dbUrl + "auditAttachList/" + auditId;
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        List initDTOList = (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
        return initDTOList;
    }
}

