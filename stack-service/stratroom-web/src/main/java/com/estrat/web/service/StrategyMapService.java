/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.config.CommonRestTemplate
 *  com.estrat.web.dto.ScoreCardDTO
 *  com.estrat.web.dto.StrategyMapDto
 *  com.estrat.web.service.StrategyMapService
 *  com.estrat.web.service.StrategyMapService$1
 *  com.estrat.web.service.StrategyMapService$2
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 *  org.springframework.web.util.UriComponentsBuilder
 */
package com.estrat.web.service;

import com.estrat.web.config.CommonRestTemplate;
import com.estrat.web.dto.ScoreCardDTO;
import com.estrat.web.dto.StrategyMapDto;
import com.estrat.web.service.StrategyMapService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class StrategyMapService {
    @Autowired
    private CommonRestTemplate commonRestTemplate;
    @Value(value="${scorecardService.strategymap.url}")
    private String saveUrl;
    @Value(value="${scorecardService.getallscorecard.url}")
    private String getAllScoreUrl;
    @Value(value="${scorecard.service.url}")
    private String scoreService;

    public StrategyMapDto saveStrategyMap(StrategyMapDto strategyMapDto) {
        return (StrategyMapDto)this.commonRestTemplate.postForObject(this.saveUrl, strategyMapDto, StrategyMapDto.class);
    }

    public List<ScoreCardDTO> findAllScoreCardList(Long pageid, String dateRange) {
        String url = String.join((CharSequence)"/", this.getAllScoreUrl, String.valueOf(pageid));
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("dateRange", new Object[]{dateRange}).toUriString();
        System.out.println(pageURL);
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        List scoreCard = (List)this.commonRestTemplate.getForObject(pageURL, (ParameterizedTypeReference)parameterizedTypeReference);
        return scoreCard;
    }

    public StrategyMapDto findStrategy(Long id) {
        String url = String.join((CharSequence)"/", this.scoreService, "strategyMap/" + String.valueOf(id));
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).toUriString();
        System.out.println(pageURL);
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        StrategyMapDto scoreCard = (StrategyMapDto)this.commonRestTemplate.getForObject(pageURL, (ParameterizedTypeReference)parameterizedTypeReference);
        return scoreCard;
    }
}


