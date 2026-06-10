/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.config.CommonRestTemplate
 *  com.estrat.web.dto.SWOTAnalysisDTO
 *  com.estrat.web.service.EmployeeService
 *  com.estrat.web.service.SwotAnalysisService
 *  com.estrat.web.service.SwotAnalysisService$1
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 *  org.springframework.web.util.UriComponentsBuilder
 */
package com.estrat.web.service;

import com.estrat.web.config.CommonRestTemplate;
import com.estrat.web.dto.SWOTAnalysisDTO;
import com.estrat.web.service.EmployeeService;
import com.estrat.web.service.SwotAnalysisService;
import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class SwotAnalysisService {
    @Autowired
    private CommonRestTemplate commonRestTemplate;
    @Autowired
    private EmployeeService employeeService;
    @Value(value="${scorecard.service.url}")
    private String scoreCardUrl;
    @Value(value="${scorecardService.swotAnalysis.url}")
    private String swotAnalysisUrl;

    public SWOTAnalysisDTO saveSWOTAnalysis(SWOTAnalysisDTO swotAnalysisDTO) {
        return (SWOTAnalysisDTO)this.commonRestTemplate.postForObject(this.swotAnalysisUrl, swotAnalysisDTO, SWOTAnalysisDTO.class);
    }

    public SWOTAnalysisDTO updateSWOTAnalysis(SWOTAnalysisDTO swotAnalysisDTO) {
        return (SWOTAnalysisDTO)this.commonRestTemplate.putForObject(this.swotAnalysisUrl, swotAnalysisDTO, SWOTAnalysisDTO.class);
    }

    public SWOTAnalysisDTO retrieveSWOTAnalysis(Long id) {
        String url = String.join((CharSequence)"/", this.swotAnalysisUrl, String.valueOf(id));
        return (SWOTAnalysisDTO)this.commonRestTemplate.getForObject(url, SWOTAnalysisDTO.class);
    }

    public void removeSWOTAnalysis(Long id) {
        String url = String.join((CharSequence)"/", this.swotAnalysisUrl, String.valueOf(id));
        this.commonRestTemplate.deleteForObject(url);
    }

    public List<SWOTAnalysisDTO> findAllByEmpId(Long empId, String flagType, String pageId) {
        String retrieveSWOTAnalysisUrl = this.scoreCardUrl + "/retrieveSwotAnalysisList/{empId}";
        HashMap<String, Long> urlVariables = new HashMap<String, Long>();
        urlVariables.put("empId", empId);
        String url = UriComponentsBuilder.fromHttpUrl((String)retrieveSWOTAnalysisUrl).queryParam("flagType", new Object[]{flagType}).queryParam("pageId", new Object[]{pageId}).buildAndExpand(urlVariables).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        List swotAnalysisDTOList = (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
        return swotAnalysisDTOList;
    }
}


