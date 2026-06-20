/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.scorecard.config.CommonRestTemplate
 *  com.estrat.backend.scorecard.dto.ApproversHistoryDTO
 *  com.estrat.backend.scorecard.service.ApproversHistoryService
 *  com.estrat.backend.scorecard.service.ApproversHistoryService$1
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 */
package com.estrat.backend.scorecard.service;

import com.estrat.backend.scorecard.config.CommonRestTemplate;
import com.estrat.backend.scorecard.dto.ApproversHistoryDTO;
import com.estrat.backend.scorecard.service.ApproversHistoryService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;

@Service
public class ApproversHistoryService {
    @Autowired
    private CommonRestTemplate commonRestTemplate;
    @Value(value="${dbservice.url}")
    private String dbUrl;
    @Value(value="${dbService.ApproveHistory.save.url}")
    private String savedbUrl;

    public ApproversHistoryDTO saveFlowHistory(ApproversHistoryDTO approversHistoryDTO) {
        return (ApproversHistoryDTO)this.commonRestTemplate.postForObject(this.savedbUrl, (Object)approversHistoryDTO, ApproversHistoryDTO.class);
    }

    public List<ApproversHistoryDTO> findFlowHistory() {
        String url = this.dbUrl + "/retriveWorkFlowHistory";
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public ApproversHistoryDTO findFlowHistoryById(long id) {
        String url = this.dbUrl + "/retriveWorkFlowHistory";
        String url1 = String.join((CharSequence)"/", url, String.valueOf(id));
        return (ApproversHistoryDTO)this.commonRestTemplate.getForObject(url1, ApproversHistoryDTO.class);
    }

    public void removeFlowHistory(long id) {
        String url = this.dbUrl + "deleteWorkFlowHistory";
        String url1 = String.join((CharSequence)"/", url, String.valueOf(id));
        this.commonRestTemplate.deleteForObject(url);
    }

    public ApproversHistoryDTO updateFlowHistory(ApproversHistoryDTO approversHistoryDTO) {
        String url = this.dbUrl + "/updateWorkFlowHistory";
        return (ApproversHistoryDTO)this.commonRestTemplate.putForObject(url, (Object)approversHistoryDTO, ApproversHistoryDTO.class);
    }
}

