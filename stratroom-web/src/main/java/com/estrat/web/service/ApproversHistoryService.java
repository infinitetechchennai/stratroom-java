/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.config.CommonRestTemplate
 *  com.estrat.web.dto.ApproversHistoryDTO
 *  com.estrat.web.service.ApproversHistoryService
 *  com.estrat.web.service.ApproversHistoryService$1
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 */
package com.estrat.web.service;

import com.estrat.web.config.CommonRestTemplate;
import com.estrat.web.dto.ApproversHistoryDTO;
import com.estrat.web.service.ApproversHistoryService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;

@Service
public class ApproversHistoryService {
    @Autowired
    private CommonRestTemplate commonRestTemplate;
    @Value(value="${scorecardservice.pages.url}")
    private String dbUrl;
    @Value(value="${scorecardService.ApproverHistory.save.url}")
    private String savedbUrl;

    public ApproversHistoryDTO saveFlowHistory(ApproversHistoryDTO approversHistoryDTO) {
        return (ApproversHistoryDTO)this.commonRestTemplate.postForObject(this.savedbUrl, approversHistoryDTO, ApproversHistoryDTO.class);
    }

    public List<ApproversHistoryDTO> findFlowHistory() {
        String url = this.dbUrl + "/retriveWorkFlowHistory";
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference() {};
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
        return (ApproversHistoryDTO)this.commonRestTemplate.putForObject(url, approversHistoryDTO, ApproversHistoryDTO.class);
    }
}


