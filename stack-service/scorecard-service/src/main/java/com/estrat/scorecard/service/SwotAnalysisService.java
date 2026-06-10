/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.scorecard.config.CommonRestTemplate
 *  com.estrat.scorecard.dto.SWOTAnalysisDTO
 *  com.estrat.scorecard.service.SwotAnalysisService
 *  com.estrat.scorecard.service.SwotAnalysisService$1
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 *  org.springframework.web.util.UriComponentsBuilder
 */
package com.estrat.scorecard.service;

import com.estrat.scorecard.config.CommonRestTemplate;
import com.estrat.scorecard.dto.SWOTAnalysisDTO;
import com.estrat.scorecard.service.SwotAnalysisService;
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
    @Value(value="${dbService.url}")
    private String dbUrl;
    @Value(value="${dbService.swotAnalysis.url}")
    private String swotAnalysisUrl;

    public SWOTAnalysisDTO saveSWOTAnalysis(SWOTAnalysisDTO swotAnalysisDTO) {
        return (SWOTAnalysisDTO)this.commonRestTemplate.postForObject(this.swotAnalysisUrl, (Object)swotAnalysisDTO, SWOTAnalysisDTO.class);
    }

    public SWOTAnalysisDTO updateSWOTAnalysis(SWOTAnalysisDTO swotAnalysisDTO) {
        return (SWOTAnalysisDTO)this.commonRestTemplate.putForObject(this.swotAnalysisUrl, (Object)swotAnalysisDTO, SWOTAnalysisDTO.class);
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
        String retrieveSWOTAnalysisUrl = this.dbUrl + "/retrieveSwotAnalysisList/{empId}";
        HashMap<String, Long> urlVariables = new HashMap<String, Long>();
        urlVariables.put("empId", empId);
        String url = UriComponentsBuilder.fromHttpUrl((String)retrieveSWOTAnalysisUrl).queryParam("flagType", new Object[]{flagType}).queryParam("pageId", new Object[]{pageId}).buildAndExpand(urlVariables).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }
}

