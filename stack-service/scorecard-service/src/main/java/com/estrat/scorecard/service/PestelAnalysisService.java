/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.scorecard.config.CommonRestTemplate
 *  com.estrat.scorecard.dto.PestelAnalysisDTO
 *  com.estrat.scorecard.service.PestelAnalysisService
 *  com.estrat.scorecard.service.PestelAnalysisService$1
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 *  org.springframework.web.util.UriComponentsBuilder
 */
package com.estrat.scorecard.service;

import com.estrat.scorecard.config.CommonRestTemplate;
import com.estrat.scorecard.dto.PestelAnalysisDTO;
import com.estrat.scorecard.service.PestelAnalysisService;
import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class PestelAnalysisService {
    @Autowired
    private CommonRestTemplate commonRestTemplate;
    @Value(value="${dbservice.url}")
    private String dbUrl;
    @Value(value="${dbService.pestelAnalysis.url}")
    private String pestelUrl;
    @Value(value="${dbService.pestelAnalysis.empId.list.url}")
    private String pestelAnalysisListByEmpIdUrl;

    public PestelAnalysisDTO savePestelAnalysis(PestelAnalysisDTO pestelAnalysisDTO) {
        return (PestelAnalysisDTO)this.commonRestTemplate.postForObject(this.pestelUrl, (Object)pestelAnalysisDTO, PestelAnalysisDTO.class);
    }

    public PestelAnalysisDTO updatePestelAnalysis(PestelAnalysisDTO pestelAnalysisDTO) {
        return (PestelAnalysisDTO)this.commonRestTemplate.putForObject(this.pestelUrl, (Object)pestelAnalysisDTO, PestelAnalysisDTO.class);
    }

    public PestelAnalysisDTO retrievePestelAnalysis(Long id) {
        String url = String.join((CharSequence)"/", this.pestelUrl, String.valueOf(id));
        return (PestelAnalysisDTO)this.commonRestTemplate.getForObject(url, PestelAnalysisDTO.class);
    }

    public void removePestelAnalysis(Long id) {
        String url = String.join((CharSequence)"/", this.pestelUrl, String.valueOf(id));
        this.commonRestTemplate.deleteForObject(url);
    }

    public List<PestelAnalysisDTO> findAllByEmpId(Long empId, String flagType, String pageId) {
        String retrieveSWOTAnalysisUrl = this.dbUrl + "/retrievePestelAnalysisList/{empId}";
        HashMap<String, Long> urlVariables = new HashMap<String, Long>();
        urlVariables.put("empId", empId);
        String url = UriComponentsBuilder.fromHttpUrl((String)retrieveSWOTAnalysisUrl).queryParam("flagType", new Object[]{flagType}).queryParam("pageId", new Object[]{pageId}).buildAndExpand(urlVariables).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }
}

