/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.config.CommonRestTemplate
 *  com.estrat.web.dto.ChartDTO
 *  com.estrat.web.service.ChartService
 *  com.estrat.web.service.ChartService$1
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 *  org.springframework.web.util.UriComponentsBuilder
 */
package com.estrat.web.service;

import com.estrat.web.config.CommonRestTemplate;
import com.estrat.web.dto.ChartDTO;
import com.estrat.web.service.ChartService;
import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class ChartService {
    @Autowired
    private CommonRestTemplate commonRestTemplate;
    @Value(value="${scorecard.service.url}")
    private String scoreCardUrl;
    @Value(value="${scorecardService.charts.url}")
    private String chartUrl;

    public ChartDTO saveCharts(ChartDTO chartDTO) {
        return (ChartDTO)this.commonRestTemplate.postForObject(this.chartUrl, chartDTO, ChartDTO.class);
    }

    public ChartDTO updateCharts(ChartDTO chartDTO) {
        return (ChartDTO)this.commonRestTemplate.putForObject(this.chartUrl, chartDTO, ChartDTO.class);
    }

    public ChartDTO retrieveCharts(Long id) {
        String url = String.join((CharSequence)"/", this.chartUrl, String.valueOf(id));
        return (ChartDTO)this.commonRestTemplate.getForObject(url, ChartDTO.class);
    }

    public void removeCharts(Long id) {
        String url = String.join((CharSequence)"/", this.chartUrl, String.valueOf(id));
        this.commonRestTemplate.deleteForObject(url);
    }

    public List<ChartDTO> findAllByEmpId(Long empId, String pageId) {
        String retrieveSWOTAnalysisUrl = this.scoreCardUrl + "/retrieveChartsList/{empId}";
        HashMap<String, Long> urlVariables = new HashMap<String, Long>();
        urlVariables.put("empId", empId);
        String url = UriComponentsBuilder.fromHttpUrl((String)retrieveSWOTAnalysisUrl).queryParam("pageId", new Object[]{pageId}).buildAndExpand(urlVariables).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }
}


