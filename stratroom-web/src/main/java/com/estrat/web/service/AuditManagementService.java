/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.config.CommonRestTemplate
 *  com.estrat.web.dto.AuditDashBoardResponseDTO
 *  com.estrat.web.dto.AuditManagementDTO
 *  com.estrat.web.service.AuditManagementService
 *  com.estrat.web.service.AuditManagementService$1
 *  com.estrat.web.service.AuditManagementService$2
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 *  org.springframework.web.util.UriComponentsBuilder
 */
package com.estrat.web.service;

import com.estrat.web.config.CommonRestTemplate;
import com.estrat.web.dto.AuditDashBoardResponseDTO;
import com.estrat.web.dto.AuditManagementDTO;
import com.estrat.web.service.AuditManagementService;
import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class AuditManagementService {
    @Autowired
    private CommonRestTemplate commonRestTemplate;
    @Value(value="${scorecardservice.pages.url}")
    private String dbUrl;

    public AuditManagementDTO saveProject(AuditManagementDTO auditManagementDTO) {
        String url = this.dbUrl + "/auditManagement";
        return (AuditManagementDTO)this.commonRestTemplate.postForObject(url, auditManagementDTO, AuditManagementDTO.class);
    }

    public AuditManagementDTO updateProject(AuditManagementDTO auditManagementDTO) {
        String url = this.dbUrl + "/auditManagement";
        return (AuditManagementDTO)this.commonRestTemplate.putForObject(url, auditManagementDTO, AuditManagementDTO.class);
    }

    public AuditManagementDTO retrieveProject(Long id) {
        String url = this.dbUrl + "/auditManagement";
        String url1 = String.join((CharSequence)"/", url, String.valueOf(id));
        HashMap<String, Long> urlVariables = new HashMap<String, Long>();
        urlVariables.put("id", id);
        String url2 = UriComponentsBuilder.fromHttpUrl((String)url1).buildAndExpand(urlVariables).toUriString();
        return (AuditManagementDTO)this.commonRestTemplate.getForObject(url2, AuditManagementDTO.class);
    }

    public void removeProject(Long id) {
        String url = this.dbUrl + "/auditManagement";
        String url1 = String.join((CharSequence)"/", url, String.valueOf(id));
        this.commonRestTemplate.deleteForObject(url1);
    }

    public List<AuditManagementDTO> findAll(String pageId) {
        String url1 = this.dbUrl + "/auditManagementList";
        HashMap urlVariables = new HashMap();
        String url = UriComponentsBuilder.fromHttpUrl((String)url1).queryParam("pageId", new Object[]{pageId}).buildAndExpand(urlVariables).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public AuditDashBoardResponseDTO auditDashBoardData(long deptId) {
        String url1 = this.dbUrl + "/auditDashBoardData";
        String url = UriComponentsBuilder.fromHttpUrl((String)url1).queryParam("deptId", new Object[]{deptId}).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference() {};
        return (AuditDashBoardResponseDTO)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }
}


