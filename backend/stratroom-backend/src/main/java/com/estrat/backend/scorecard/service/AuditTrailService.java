/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.scorecard.config.CommonRestTemplate
 *  com.estrat.backend.scorecard.dto.AuditDTO
 *  com.estrat.backend.scorecard.dto.FindDTO
 *  com.estrat.backend.scorecard.service.AuditTrailService
 *  com.estrat.backend.scorecard.service.AuditTrailService$1
 *  com.estrat.backend.scorecard.service.AuditTrailService$2
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 */
package com.estrat.backend.scorecard.service;

import com.estrat.backend.scorecard.config.CommonRestTemplate;
import com.estrat.backend.scorecard.dto.AuditDTO;
import com.estrat.backend.scorecard.dto.FindDTO;
import com.estrat.backend.scorecard.service.AuditTrailService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;

@Service
public class AuditTrailService {
    @Autowired
    private CommonRestTemplate commonRestTemplate;
    @Value(value="${dbservice.url}")
    private String dBUrl;

    public AuditDTO save(AuditDTO auditDTO) {
        String url = this.dBUrl + "/auditTrail";
        return (AuditDTO)this.commonRestTemplate.postForObject(url, (Object)auditDTO, AuditDTO.class);
    }

    public AuditDTO clearLogOutUser() {
        String url = this.dBUrl + "/clearLogOut";
        return (AuditDTO)this.commonRestTemplate.getForObject(url, AuditDTO.class);
    }

    public List<AuditDTO> findAuditDetails(FindDTO findDTO) {
        String url = this.dBUrl + "/auditTrail";
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (Object)findDTO, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<String> findAuditTrailActionList() {
        String url = this.dBUrl + "/auditTrailActionList";
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public AuditDTO savePreAuditTrail(AuditDTO auditDTO) {
        String url = this.dBUrl + "/preAuditTrail";
        return (AuditDTO)this.commonRestTemplate.postForObject(url, (Object)auditDTO, AuditDTO.class);
    }
}

