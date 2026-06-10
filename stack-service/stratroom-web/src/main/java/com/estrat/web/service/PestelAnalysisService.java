/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.config.CommonRestTemplate
 *  com.estrat.web.dto.PestelAnalysisDTO
 *  com.estrat.web.service.EmployeeService
 *  com.estrat.web.service.PestelAnalysisService
 *  com.estrat.web.service.PestelAnalysisService$1
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 *  org.springframework.web.util.UriComponentsBuilder
 */
package com.estrat.web.service;

import com.estrat.web.config.CommonRestTemplate;
import com.estrat.web.dto.PestelAnalysisDTO;
import com.estrat.web.service.EmployeeService;
import com.estrat.web.service.PestelAnalysisService;
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
    @Autowired
    private EmployeeService employeeService;
    @Value(value="${scorecard.service.url}")
    private String scoreCardUrl;
    @Value(value="${scorecardservice.pestelanalysis.url}")
    private String pestelUrl;
    @Value(value="${scorecardservice.pestelanalysis.empid.list.url}")
    private String pestelAnalysisListByEmpIdUrl;

    public PestelAnalysisDTO savePestelAnalysis(PestelAnalysisDTO pestelAnalysisDTO) {
        return (PestelAnalysisDTO)this.commonRestTemplate.postForObject(this.pestelUrl, pestelAnalysisDTO, PestelAnalysisDTO.class);
    }

    public PestelAnalysisDTO updatePestelAnalysis(PestelAnalysisDTO pestelAnalysisDTO) {
        return (PestelAnalysisDTO)this.commonRestTemplate.putForObject(this.pestelUrl, pestelAnalysisDTO, PestelAnalysisDTO.class);
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
        String retrievePestelAnalysisDTOListUrl = this.scoreCardUrl + "/retrievePestelAnalysisList/{empId}";
        HashMap<String, Long> urlVariables = new HashMap<String, Long>();
        urlVariables.put("empId", empId);
        String url = UriComponentsBuilder.fromHttpUrl((String)retrievePestelAnalysisDTOListUrl).queryParam("flagType", new Object[]{flagType}).queryParam("pageId", new Object[]{pageId}).buildAndExpand(urlVariables).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        List pestelAnalysisDTOList = (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
        return pestelAnalysisDTOList;
    }
}


