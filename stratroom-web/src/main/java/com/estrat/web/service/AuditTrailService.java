/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.config.CommonRestTemplate
 *  com.estrat.web.dto.AuditDTO
 *  com.estrat.web.dto.FindDTO
 *  com.estrat.web.service.AuditTrailService
 *  com.estrat.web.service.AuditTrailService$1
 *  com.estrat.web.service.AuditTrailService$2
 *  com.estrat.web.util.UserThreadLocal
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 */
package com.estrat.web.service;

import com.estrat.web.config.CommonRestTemplate;
import com.estrat.web.dto.AuditDTO;
import com.estrat.web.dto.FindDTO;
import com.estrat.web.service.AuditTrailService;
import com.estrat.web.util.UserThreadLocal;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;

@Service
public class AuditTrailService {
    @Autowired
    private CommonRestTemplate commonRestTemplate;
    @Value(value="${scorecard.service.url}")
    private String serviceUrl;

    public AuditDTO save(AuditDTO auditDTO) {
        String url = this.serviceUrl + "/auditTrail";
        return (AuditDTO)this.commonRestTemplate.postForObject(url, auditDTO, AuditDTO.class);
    }

    public AuditDTO savePreAuditTrail(AuditDTO auditDTO) {
        String url = this.serviceUrl + "/preAuditTrail";
        return (AuditDTO)this.commonRestTemplate.postForObject(url, auditDTO, AuditDTO.class);
    }

    public AuditDTO clearLogOutUser() {
        UserThreadLocal.get().getCommonHeaders().put("PRELOGINAPI", "TRUE");
        String url = this.serviceUrl + "/clearLogOut";
        return (AuditDTO)this.commonRestTemplate.getForObject(url, AuditDTO.class);
    }

    public List<AuditDTO> findAuditDetails(FindDTO findDTO) {
        String url = this.serviceUrl + "/auditTrail";
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference() {};
        return (List)this.commonRestTemplate.getForObject(url, findDTO, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<String> findAuditTrailActionList() {
        String url = this.serviceUrl + "/auditTrailActionList";
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public AuditDTO save(String action) {
        AuditDTO auditDTO = new AuditDTO();
        auditDTO.setOrgId(UserThreadLocal.get().getProfile().getOrgDetails().getOrgId());
        auditDTO.setUserId(Long.valueOf(UserThreadLocal.get().getProfile().getEmpId()));
        auditDTO.setAction(action);
        String url = this.serviceUrl + "/auditTrail";
        return (AuditDTO)this.commonRestTemplate.postForObject(url, auditDTO, AuditDTO.class);
    }
}


