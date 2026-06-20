/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.scorecard.config.CommonRestTemplate
 *  com.estrat.backend.scorecard.dto.ChartDTO
 *  com.estrat.backend.scorecard.service.ChartService
 *  com.estrat.backend.scorecard.service.ChartService$1
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 *  org.springframework.web.util.UriComponentsBuilder
 */
package com.estrat.backend.scorecard.service;

import com.estrat.backend.scorecard.config.CommonRestTemplate;
import com.estrat.backend.scorecard.dto.ChartDTO;
import com.estrat.backend.scorecard.service.ChartService;
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
    @Value(value="${dbService.url}")
    private String dbUrl;
    @Value(value="${dbService.charts.url}")
    private String chartUrl;

    public ChartDTO saveCharts(ChartDTO chartDTO) {
        return (ChartDTO)this.commonRestTemplate.postForObject(this.chartUrl, (Object)chartDTO, ChartDTO.class);
    }

    public ChartDTO updateCharts(ChartDTO chartDTO) {
        return (ChartDTO)this.commonRestTemplate.putForObject(this.chartUrl, (Object)chartDTO, ChartDTO.class);
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
        String retrieveSWOTAnalysisUrl = this.dbUrl + "/retrieveChartsList/{empId}";
        HashMap<String, Long> urlVariables = new HashMap<String, Long>();
        urlVariables.put("empId", empId);
        String url = UriComponentsBuilder.fromHttpUrl((String)retrieveSWOTAnalysisUrl).queryParam("pageId", new Object[]{pageId}).buildAndExpand(urlVariables).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }
}

