/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.scorecard.config.CommonRestTemplate
 *  com.estrat.backend.scorecard.dto.MeetingManagementDTO
 *  com.estrat.backend.scorecard.dto.MeetingManagementResponseDTO
 *  com.estrat.backend.scorecard.service.MeetingManagementService
 *  com.estrat.backend.scorecard.service.MeetingManagementService$1
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 *  org.springframework.web.client.RestTemplate
 *  org.springframework.web.util.UriComponentsBuilder
 */
package com.estrat.backend.scorecard.service;

import com.estrat.backend.scorecard.config.CommonRestTemplate;
import com.estrat.backend.scorecard.dto.MeetingManagementDTO;
import com.estrat.backend.scorecard.dto.MeetingManagementResponseDTO;
import com.estrat.backend.scorecard.service.MeetingManagementService;
import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class MeetingManagementService {
    @Autowired
    private CommonRestTemplate commonRestTemplate;
    @Autowired
    private RestTemplate restTemplate;
    @Value(value="${dbService.meetingManagement.url}")
    private String managementUrl;
    @Value(value="${dbservice.url}")
    private String dbUrl;

    public MeetingManagementResponseDTO saveMeetingManagement(MeetingManagementDTO meetingManagementDTO) {
        return (MeetingManagementResponseDTO)this.commonRestTemplate.postForObject(this.managementUrl, (Object)meetingManagementDTO, MeetingManagementResponseDTO.class);
    }

    public MeetingManagementResponseDTO updateMeetingManagement(MeetingManagementDTO meetingManagementDTO) {
        return (MeetingManagementResponseDTO)this.commonRestTemplate.putForObject(this.managementUrl, (Object)meetingManagementDTO, MeetingManagementResponseDTO.class);
    }

    public MeetingManagementDTO retrieveMeetingManagement(Long id, boolean flag) {
        String retrieveRiskDetailsUrl = this.managementUrl + "/" + id;
        HashMap<String, Long> urlVariables = new HashMap<String, Long>();
        urlVariables.put("id", id);
        String url = UriComponentsBuilder.fromHttpUrl((String)retrieveRiskDetailsUrl).queryParam("loadFlag", new Object[]{flag}).buildAndExpand(urlVariables).toUriString();
        return (MeetingManagementDTO)this.commonRestTemplate.getForObject(url, MeetingManagementDTO.class);
    }

    public void removeMeetingManagement(Long id) {
        String url = this.managementUrl + "/" + id;
        this.commonRestTemplate.deleteForObject(url);
    }

    public List<MeetingManagementDTO> findAll(long empId, String pageId, String dateRange) {
        String url1 = this.dbUrl + "meetingManagementList/{empId}";
        HashMap<String, Long> urlVariables = new HashMap<String, Long>();
        urlVariables.put("empId", empId);
        String url = UriComponentsBuilder.fromHttpUrl((String)url1).queryParam("pageId", new Object[]{pageId}).queryParam("dateRange", new Object[]{dateRange}).buildAndExpand(urlVariables).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }
}

