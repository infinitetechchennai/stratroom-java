/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.scorecard.dto.ObjectivesDTO
 *  com.estrat.scorecard.dto.ScoreCardDTO
 *  com.estrat.scorecard.dto.ScoreCardDetailsDTO
 *  com.estrat.scorecard.dto.ScoreCardResponseDTO
 *  com.estrat.scorecard.service.KPIService
 *  com.estrat.scorecard.service.ObjectiveService
 *  com.estrat.scorecard.service.ScoreCardService
 *  com.estrat.scorecard.service.ScoreThreadConfig
 *  com.estrat.scorecard.util.DataUtil
 *  com.estrat.scorecard.util.FormulaUtil
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.context.annotation.Bean
 *  org.springframework.context.annotation.Configuration
 *  org.springframework.context.annotation.Lazy
 *  org.springframework.core.task.TaskExecutor
 *  org.springframework.scheduling.annotation.Async
 *  org.springframework.scheduling.annotation.AsyncConfigurer
 *  org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor
 */
package com.estrat.scorecard.service;

import com.estrat.scorecard.dto.ObjectivesDTO;
import com.estrat.scorecard.dto.ScoreCardDTO;
import com.estrat.scorecard.dto.ScoreCardDetailsDTO;
import com.estrat.scorecard.dto.ScoreCardResponseDTO;
import com.estrat.scorecard.service.KPIService;
import com.estrat.scorecard.service.ObjectiveService;
import com.estrat.scorecard.service.ScoreCardService;
import com.estrat.scorecard.util.DataUtil;
import com.estrat.scorecard.util.FormulaUtil;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.core.task.TaskExecutor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.AsyncConfigurer;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

@Configuration
public class ScoreThreadConfig
implements AsyncConfigurer {
    @Lazy
    @Autowired
    private ScoreCardService scoreCardService;
    @Autowired
    private ObjectiveService objectiveService;
    @Autowired
    private KPIService kpiService;
    @Autowired
    private DataUtil dataUtil;

    @Bean
    public TaskExecutor executorA() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(10);
        executor.setMaxPoolSize(20);
        executor.setQueueCapacity(200);
        executor.setThreadNamePrefix("kpi-nodekey-");
        executor.initialize();
        return executor;
    }

    @Bean
    public TaskExecutor executorB() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(10);
        executor.setMaxPoolSize(20);
        executor.setQueueCapacity(200);
        executor.setThreadNamePrefix("kpi-dept-");
        executor.initialize();
        return executor;
    }

    @Async(value="executorA")
    public Map<String, String> executorAValue(Long empId, String dateRange) {
        HashMap<String, String> result = new HashMap<String, String>();
        String list = null;
        boolean flag = true;
        try {
            boolean statusLightEnabled = true;
            List scoreCardDetailsDTOS = this.scoreCardService.scoreCardListFindScore(empId.longValue(), dateRange);
            if (!scoreCardDetailsDTOS.isEmpty()) {
                for (com.estrat.scorecard.dto.ScoreCardDetailsDTO detailsDTO : (java.util.List<com.estrat.scorecard.dto.ScoreCardDetailsDTO>)scoreCardDetailsDTOS) {
                    ScoreCardResponseDTO responseDTO = new ScoreCardResponseDTO();
                    if (detailsDTO != null && detailsDTO.getScorecardName() != null) {
                        List scoreCardList = this.scoreCardService.scoreCardListByDate(detailsDTO.getId(), false, dateRange);
                        if (!scoreCardList.isEmpty()) {
                            ArrayList<ScoreCardDTO> finalScoreCardDTOList = new ArrayList<ScoreCardDTO>();
                            for (com.estrat.scorecard.dto.ScoreCardDTO scoreCardDTO : (java.util.List<com.estrat.scorecard.dto.ScoreCardDTO>)scoreCardList) {
                                if (scoreCardDTO == null) continue;
                                List objectivesDTOList = (List)this.objectiveService.objectivesListByDate(scoreCardDTO.getId(), false, dateRange).getBody();
                                if (!objectivesDTOList.isEmpty()) {
                                    ArrayList<ObjectivesDTO> finalObjectivesDTOList = new ArrayList<ObjectivesDTO>();
                                    for (com.estrat.scorecard.dto.ObjectivesDTO objectivesDTO : (java.util.List<com.estrat.scorecard.dto.ObjectivesDTO>)objectivesDTOList) {
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
                            detailsDTO.setScoreCardDTOS(finalScoreCardDTOList);
                            responseDTO.setCardDetailsDTO(detailsDTO);
                            if (statusLightEnabled) {
                                Map scoreCardMap = this.dataUtil.calculateStatusLightForScore(finalScoreCardDTOList, dateRange, empId.toString());
                                this.dataUtil.populateOverallStatusLight(responseDTO, finalScoreCardDTOList, scoreCardMap);
                            } else {
                                responseDTO.setStatusLight("");
                            }
                        } else {
                            responseDTO.setCardDetailsDTO(detailsDTO);
                            responseDTO.setStatusLight("");
                        }
                    }
                    if (responseDTO.getThresholdResult() != null) {
                        if (list == null) {
                            list = responseDTO.getThresholdResult();
                            continue;
                        }
                        list = list + " ," + responseDTO.getThresholdResult();
                        continue;
                    }
                    if (list == null) {
                        list = "0";
                        continue;
                    }
                    list = list + " ,0";
                }
            }
        }
        catch (Exception statusLightEnabled) {
            // empty catch block
        }
        FormulaUtil formulaUtil = new FormulaUtil();
        result.put("overAllScore", formulaUtil.applyExpression("avg(" + list + ")"));
        return result;
    }
}

