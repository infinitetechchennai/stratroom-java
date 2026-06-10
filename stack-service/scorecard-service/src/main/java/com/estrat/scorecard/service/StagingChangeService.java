/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.scorecard.config.CommonRestTemplate
 *  com.estrat.scorecard.dto.ApprovalRequestDTO
 *  com.estrat.scorecard.dto.ApprovalResponseDTO
 *  com.estrat.scorecard.dto.ApproversHistoryDTO
 *  com.estrat.scorecard.dto.StagingChangeDTO
 *  com.estrat.scorecard.service.StagingChangeService
 *  com.estrat.scorecard.service.StagingChangeService$1
 *  com.estrat.scorecard.service.StagingChangeService$2
 *  com.estrat.scorecard.service.StagingChangeService$3
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 *  org.springframework.web.util.UriComponentsBuilder
 */
package com.estrat.scorecard.service;

import com.estrat.scorecard.config.CommonRestTemplate;
import com.estrat.scorecard.dto.ApprovalRequestDTO;
import com.estrat.scorecard.dto.ApprovalResponseDTO;
import com.estrat.scorecard.dto.ApproversHistoryDTO;
import com.estrat.scorecard.dto.StagingChangeDTO;
import com.estrat.scorecard.service.StagingChangeService;
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
    @Value(value="${dbservice.url}")
    private String dbServiceUrl;

    public List<StagingChangeDTO> getStagingChangesForUser() {
        String url = this.dbServiceUrl + "/api/workflowevents";
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public StagingChangeDTO getStagingChangeDetails(Long changeId) {
        String url = this.dbServiceUrl + "/api/workflowevents/" + changeId + "/details";
        return (StagingChangeDTO)this.commonRestTemplate.getForObject(url, StagingChangeDTO.class);
    }

    public List<ApproversHistoryDTO> getApprovalHistory(Long changeId) {
        String url = this.dbServiceUrl + "/api/workflowevents/" + changeId + "/history";
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public ApprovalResponseDTO approveStagingChange(Long changeId, ApprovalRequestDTO approvalRequest) {
        String url = this.dbServiceUrl + "/api/workflowevents/" + changeId + "/action";
        return (ApprovalResponseDTO)this.commonRestTemplate.postForObject(url, (Object)approvalRequest, ApprovalResponseDTO.class);
    }

    public List<StagingChangeDTO> getApproveVersionr(String tableName, Long recordId) {
        String url = this.dbServiceUrl + "/api/workflowevents/approveVersion";
        String urlVariabe = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("tableName", new Object[]{tableName}).queryParam("recordId", new Object[]{recordId}).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(urlVariabe, (ParameterizedTypeReference)parameterizedTypeReference);
    }
}

