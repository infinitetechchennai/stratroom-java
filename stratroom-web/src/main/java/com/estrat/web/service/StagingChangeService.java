/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.config.CommonRestTemplate
 *  com.estrat.web.dto.ApprovalRequestDTO
 *  com.estrat.web.dto.ApprovalResponseDTO
 *  com.estrat.web.dto.ApproversHistoryDTO
 *  com.estrat.web.dto.StagingChangeDTO
 *  com.estrat.web.service.StagingChangeService
 *  com.estrat.web.service.StagingChangeService$1
 *  com.estrat.web.service.StagingChangeService$2
 *  com.estrat.web.service.StagingChangeService$3
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 *  org.springframework.web.util.UriComponentsBuilder
 */
package com.estrat.web.service;

import com.estrat.web.config.CommonRestTemplate;
import com.estrat.web.dto.ApprovalRequestDTO;
import com.estrat.web.dto.ApprovalResponseDTO;
import com.estrat.web.dto.ApproversHistoryDTO;
import com.estrat.web.dto.StagingChangeDTO;
import com.estrat.web.service.StagingChangeService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class StagingChangeService {
    @Autowired
    private CommonRestTemplate commonRestTemplate;
    @Value(value="${scorecard.service.url}")
    private String dbUrl;

    public List<StagingChangeDTO> getStagingChangesForUser() {
        String url = this.dbUrl + "/api/workflowevents";
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public StagingChangeDTO getStagingChangeDetails(Long changeId) {
        String url = this.dbUrl + "/api/workflowevents/" + changeId + "/details";
        return (StagingChangeDTO)this.commonRestTemplate.getForObject(url, StagingChangeDTO.class);
    }

    public List<ApproversHistoryDTO> getApprovalHistory(Long changeId) {
        String url = this.dbUrl + "/api/workflowevents/" + changeId + "/history";
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public ApprovalResponseDTO approveStagingChange(Long changeId, ApprovalRequestDTO approvalRequest) {
        String url = this.dbUrl + "/api/workflowevents/" + changeId + "/action";
        return (ApprovalResponseDTO)this.commonRestTemplate.postForObject(url, approvalRequest, ApprovalResponseDTO.class);
    }

    public List<StagingChangeDTO> getApproveVersionr(String tableName, Long recordId) {
        String url = this.dbUrl + "/approveVersion";
        String urlVariabe = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("tableName", new Object[]{tableName}).queryParam("recordId", new Object[]{recordId}).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference() {};
        return (List)this.commonRestTemplate.getForObject(urlVariabe, (ParameterizedTypeReference)parameterizedTypeReference);
    }
}


