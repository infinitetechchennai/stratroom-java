/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.scorecard.config.CommonRestTemplate
 *  com.estrat.scorecard.dto.ObjectivesDTO
 *  com.estrat.scorecard.dto.ScoreCardDTO
 *  com.estrat.scorecard.dto.ScoreCardDetailsDTO
 *  com.estrat.scorecard.dto.StrategyMapDto
 *  com.estrat.scorecard.service.KPIService
 *  com.estrat.scorecard.service.ObjectiveService
 *  com.estrat.scorecard.service.ScoreCardService
 *  com.estrat.scorecard.service.StrategyMapService
 *  com.estrat.scorecard.service.StrategyMapService$1
 *  com.estrat.scorecard.service.StrategyMapService$2
 *  com.estrat.scorecard.util.DataUtil
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 */
package com.estrat.scorecard.service;

import com.estrat.scorecard.config.CommonRestTemplate;
import com.estrat.scorecard.dto.ObjectivesDTO;
import com.estrat.scorecard.dto.ScoreCardDTO;
import com.estrat.scorecard.dto.ScoreCardDetailsDTO;
import com.estrat.scorecard.dto.StrategyMapDto;
import com.estrat.scorecard.service.KPIService;
import com.estrat.scorecard.service.ObjectiveService;
import com.estrat.scorecard.service.ScoreCardService;
import com.estrat.scorecard.service.StrategyMapService;
import com.estrat.scorecard.util.DataUtil;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;

@Service
public class StrategyMapService {
    @Autowired
    private CommonRestTemplate commonRestTemplate;
    @Autowired
    private ScoreCardService scoreCardService;
    @Autowired
    private ObjectiveService objectiveService;
    @Autowired
    private KPIService kpiService;
    @Autowired
    private DataUtil dataUtil;
    @Value(value="${dbService.strategyMap.url}")
    private String saveUrl;
    @Value(value="${dbService.strategyMapscorecard.url}")
    private String getScoreCardsUrl;
    @Value(value="${dbService.url}")
    private String geturl;

    public StrategyMapDto saveStrategyMap(StrategyMapDto strategyMapDTO) {
        return (StrategyMapDto)this.commonRestTemplate.postForObject(this.saveUrl, (Object)strategyMapDTO, StrategyMapDto.class);
    }

    public StrategyMapDto getStrategyMap(Long id) {
        String url = String.join((CharSequence)"/", this.getScoreCardsUrl, String.valueOf(id));
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        StrategyMapDto strategyMapDTO = (StrategyMapDto)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
        return strategyMapDTO;
    }

    public List<ScoreCardDTO> findAllScoreCardList(Long pageid, String dateRange) {
        if (pageid != null && Objects.nonNull(pageid)) {
        ParameterizedTypeReference<Object> parameterizedTypescorecard = null;
            String detailsurl = this.geturl + "scoreCardDetailListPage";
            ScoreCardDetailsDTO scoreCardDetailsDTO = (ScoreCardDetailsDTO)this.commonRestTemplate.getForObject(detailsurl = String.join((CharSequence)"/", detailsurl, String.valueOf(pageid)), (ParameterizedTypeReference)(parameterizedTypescorecard = new ParameterizedTypeReference<Object>() {}));
            if (scoreCardDetailsDTO != null) {
                ArrayList<ScoreCardDTO> finalScoreCardDTOList = new ArrayList<ScoreCardDTO>();
                List scoreCardList = this.scoreCardService.scoreCardListByDate(scoreCardDetailsDTO.getId(), true, dateRange);
                for (ScoreCardDTO scoreCardDTO : (java.util.List<ScoreCardDTO>)scoreCardList) {
                    if (scoreCardDTO == null) continue;
                    List objectivesDTOList = (List)this.objectiveService.objectivesListByDate(scoreCardDTO.getId(), true, dateRange).getBody();
                    if (!objectivesDTOList.isEmpty()) {
                        ArrayList<ObjectivesDTO> finalObjectivesDTOList = new ArrayList<ObjectivesDTO>();
                        for (ObjectivesDTO objectivesDTO : (java.util.List<ObjectivesDTO>)objectivesDTOList) {
                            if (objectivesDTO == null) continue;
                            List kpidtos = this.kpiService.kpiListByDate(objectivesDTO.getId(), dateRange);
                            if (!kpidtos.isEmpty()) {
                                objectivesDTO.setKpiList(kpidtos);
                            }
                            finalObjectivesDTOList.add(objectivesDTO);
                        }
                        if (!finalObjectivesDTOList.isEmpty()) {
                            scoreCardDTO.setObjectiveList(finalObjectivesDTOList);
                        }
                    }
                    finalScoreCardDTOList.add(scoreCardDTO);
                }
                List listCalulates = finalScoreCardDTOList.stream().map(score -> this.dataUtil.calculateStatusLight(Collections.singletonList(score), dateRange, String.valueOf(scoreCardDetailsDTO.getOwner()), scoreCardDetailsDTO.getDepartmentId())).collect(Collectors.toList());
                List<ScoreCardDTO> allScoreCards = (List<ScoreCardDTO>) (List) listCalulates.stream().flatMap(map -> ((java.util.Map<String, com.estrat.scorecard.dto.ScoreCardDTO>)map).values().stream()).sorted(Comparator.comparingLong(ScoreCardDTO::getId)).collect(Collectors.toList());
                return allScoreCards;
            }
        }
        return new ArrayList<ScoreCardDTO>();
    }
}

