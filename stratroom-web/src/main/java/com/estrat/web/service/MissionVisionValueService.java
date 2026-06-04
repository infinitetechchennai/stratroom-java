/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.config.CommonRestTemplate
 *  com.estrat.web.dto.MissionVisionValueDto
 *  com.estrat.web.service.MissionVisionValueService
 *  com.estrat.web.service.MissionVisionValueService$1
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 *  org.springframework.web.util.UriComponentsBuilder
 */
package com.estrat.web.service;

import com.estrat.web.config.CommonRestTemplate;
import com.estrat.web.dto.MissionVisionValueDto;
import com.estrat.web.service.MissionVisionValueService;
import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class MissionVisionValueService {
    @Autowired
    private CommonRestTemplate commonRestTemplate;
    @Value(value="${scorecardservice.pages.url}")
    private String dbUrl;

    public MissionVisionValueDto saveMVV(MissionVisionValueDto missionVisionValueDto) {
        String url = this.dbUrl + "/missionVisionValue";
        return (MissionVisionValueDto)this.commonRestTemplate.postForObject(url, missionVisionValueDto, MissionVisionValueDto.class);
    }

    public MissionVisionValueDto updateMVV(MissionVisionValueDto missionVisionValueDto) {
        String url = this.dbUrl + "/missionVisionValue";
        return (MissionVisionValueDto)this.commonRestTemplate.putForObject(url, missionVisionValueDto, MissionVisionValueDto.class);
    }

    public MissionVisionValueDto retrieveMVV(Long id) {
        String url = this.dbUrl + "/missionVisionValue";
        String url1 = String.join((CharSequence)"/", url, String.valueOf(id));
        HashMap<String, Long> urlVariables = new HashMap<String, Long>();
        urlVariables.put("id", id);
        String url2 = UriComponentsBuilder.fromHttpUrl((String)url1).buildAndExpand(urlVariables).toUriString();
        return (MissionVisionValueDto)this.commonRestTemplate.getForObject(url2, MissionVisionValueDto.class);
    }

    public List<MissionVisionValueDto> findAll(long empId) {
        String url1 = this.dbUrl + "missionVisionValueList/{empId}";
        HashMap<String, Long> urlVariables = new HashMap<String, Long>();
        urlVariables.put("empId", empId);
        String url = UriComponentsBuilder.fromHttpUrl((String)url1).buildAndExpand(urlVariables).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }
}


