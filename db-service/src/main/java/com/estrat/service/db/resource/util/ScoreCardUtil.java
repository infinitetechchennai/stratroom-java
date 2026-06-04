/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.Objectives
 *  com.estrat.service.db.bean.po.PagesDetails
 *  com.estrat.service.db.dao.ScoreCardRepository
 *  com.estrat.service.db.dto.FormulationKPIDTO
 *  com.estrat.service.db.dto.FormulationObjectiveDTO
 *  com.estrat.service.db.dto.FormulationScoreCardDTO
 *  com.estrat.service.db.dto.KPIDTO
 *  com.estrat.service.db.dto.ObjectivesDTO
 *  com.estrat.service.db.dto.ScoreCardDTO
 *  com.estrat.service.db.dto.ScoreCardDetailsDTO
 *  com.estrat.service.db.dto.ScoreCardResponseDTO
 *  com.estrat.service.db.dto.StrategyFormulationDTO
 *  com.estrat.service.db.resource.util.DateUtil
 *  com.estrat.service.db.resource.util.NotificationUtil
 *  com.estrat.service.db.resource.util.ScoreCardUtil
 *  com.estrat.service.db.resource.util.UserThreadLocal
 *  com.estrat.service.db.service.KPIService
 *  com.estrat.service.db.service.ObjectivesService
 *  com.estrat.service.db.service.PageService
 *  com.estrat.service.db.service.ScoreCardService
 *  org.apache.commons.collections4.CollectionUtils
 *  org.apache.commons.lang3.BooleanUtils
 *  org.apache.commons.lang3.StringUtils
 *  org.apache.log4j.Logger
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.scheduling.annotation.Async
 *  org.springframework.stereotype.Component
 */
package com.estrat.service.db.resource.util;

import com.estrat.service.db.bean.po.Objectives;
import com.estrat.service.db.bean.po.PagesDetails;
import com.estrat.service.db.dao.ScoreCardRepository;
import com.estrat.service.db.dto.FormulationKPIDTO;
import com.estrat.service.db.dto.FormulationObjectiveDTO;
import com.estrat.service.db.dto.FormulationScoreCardDTO;
import com.estrat.service.db.dto.KPIDTO;
import com.estrat.service.db.dto.ObjectivesDTO;
import com.estrat.service.db.dto.ScoreCardDTO;
import com.estrat.service.db.dto.ScoreCardDetailsDTO;
import com.estrat.service.db.dto.ScoreCardResponseDTO;
import com.estrat.service.db.dto.StrategyFormulationDTO;
import com.estrat.service.db.resource.util.DateUtil;
import com.estrat.service.db.resource.util.NotificationUtil;
import com.estrat.service.db.resource.util.UserThreadLocal;
import com.estrat.service.db.service.KPIService;
import com.estrat.service.db.service.ObjectivesService;
import com.estrat.service.db.service.PageService;
import com.estrat.service.db.service.ScoreCardService;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.BooleanUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

@Component
public class ScoreCardUtil {
    private Logger log = Logger.getLogger(ScoreCardUtil.class);
    @Autowired
    private ScoreCardService scoreCardService;
    @Autowired
    private ObjectivesService objectivesService;
    @Autowired
    private KPIService kpiService;
    @Autowired
    private PageService pageService;
    @Autowired
    protected ScoreCardRepository cardRepository;
    @Autowired
    protected NotificationUtil notificationUtil;

    public List<FormulationScoreCardDTO> getDefaultScoreCardList(String pageName) {
        ArrayList<FormulationScoreCardDTO> cardDTOs = new ArrayList<FormulationScoreCardDTO>();
        cardDTOs.add(this.createScoreCardObj("Financial", pageName));
        cardDTOs.add(this.createScoreCardObj("Customer", pageName));
        cardDTOs.add(this.createScoreCardObj("Internal Process", pageName));
        cardDTOs.add(this.createScoreCardObj("Learning & Growth", pageName));
        return cardDTOs;
    }

    FormulationScoreCardDTO createScoreCardObj(String name, String pageName) {
        FormulationScoreCardDTO scoreCardDTO = new FormulationScoreCardDTO();
        scoreCardDTO.setScorecardName(pageName);
        scoreCardDTO.setCreatedBy(Long.valueOf(UserThreadLocal.get()).longValue());
        scoreCardDTO.setScoreCardValue(this.getScoreCardValue(name));
        return scoreCardDTO;
    }

    Map<String, Object> getScoreCardValue(String name) {
        HashMap<String, Object> stringObjectMap = new HashMap<String, Object>();
        stringObjectMap.put("defaultscr", true);
        stringObjectMap.put("header1", "ID");
        stringObjectMap.put("header2", "Period");
        stringObjectMap.put("header3", "Actual");
        stringObjectMap.put("header4", "Target");
        stringObjectMap.put("header5", "Trend");
        stringObjectMap.put("name", name);
        stringObjectMap.put("perspectiveType", name);
        return stringObjectMap;
    }

    public void saveScoreCard(FormulationScoreCardDTO formulationScoreCardDTO, StrategyFormulationDTO formulationDTO, long pageId, long scorecardid) {
        ScoreCardDTO scoreCardDTO = new ScoreCardDTO();
        scoreCardDTO.setActive(0);
        scoreCardDTO.setScorecardName(formulationDTO.getFormulationName());
        scoreCardDTO.setOwner(formulationScoreCardDTO.getOwner().longValue());
        scoreCardDTO.setPageId(pageId);
        scoreCardDTO.setCreatedBy(Long.valueOf(UserThreadLocal.get()).longValue());
        scoreCardDTO.setScoreCardValue(formulationScoreCardDTO.getScoreCardValue());
        scoreCardDTO.setCreatedTime(LocalDateTime.now());
        scoreCardDTO.setScoreCardDetailsId(scorecardid);
        ScoreCardResponseDTO response = this.scoreCardService.save(scoreCardDTO);
        formulationScoreCardDTO.getObjectiveList().forEach(objective -> this.createObjective(objective, response.getCardDTO()));
    }

    public ScoreCardResponseDTO createPage(StrategyFormulationDTO strategyFormulationDTO) {
        PagesDetails pagesDetails = new PagesDetails();
        pagesDetails.setCreatedBy(Long.valueOf(UserThreadLocal.get()).longValue());
        pagesDetails.setPageType("Standard_View");
        pagesDetails.setCreatedTime(LocalDateTime.now());
        pagesDetails.setActive(0);
        pagesDetails.setPageName(strategyFormulationDTO.getFormulationName());
        return this.pageService.save(pagesDetails);
    }

    public void createObjective(FormulationObjectiveDTO objectivesDTO, ScoreCardDTO scoreCardDTO) {
        ObjectivesDTO rowDTO = new ObjectivesDTO();
        rowDTO.setObjectivesName(objectivesDTO.getObjectivesName());
        rowDTO.setActive(0);
        rowDTO.setCreatedTime(LocalDateTime.now());
        rowDTO.setCreatedBy(Long.valueOf(UserThreadLocal.get()).longValue());
        rowDTO.setOwner(objectivesDTO.getOwner().longValue());
        rowDTO.setObjectivesValue(objectivesDTO.getObjectivesValue());
        rowDTO.setScoreCardId(scoreCardDTO.getId());
        if (objectivesDTO.getObjectivesValue().get("objective_start_end_date") != null && objectivesDTO.getObjectivesValue().get("objective_start_end_date").toString().contains("-")) {
            DateUtil dateUtil = new DateUtil();
            String[] dateStrings = objectivesDTO.getObjectivesValue().get("objective_start_end_date").toString().split("-");
            if (dateStrings.length > 1) {
                rowDTO.setStartDate(DateUtil.getStringTODateDDMMYYYY((String)dateStrings[0].trim()));
                rowDTO.setEndDate(DateUtil.getStringTODateDDMMYYYY((String)dateStrings[1].trim()));
            }
        }
        Objectives objectives = new Objectives(rowDTO);
        ObjectivesDTO response = this.objectivesService.save(objectives);
        objectivesDTO.getKpiList().forEach(kpi -> this.createKPI(kpi, response));
    }

    public void createKPI(FormulationKPIDTO formulationKPIDTO, ObjectivesDTO objectivesDTO) {
        KPIDTO kpidto = new KPIDTO();
        kpidto.setOwner(formulationKPIDTO.getOwner().longValue());
        kpidto.setCreatedBy(Long.valueOf(UserThreadLocal.get()).longValue());
        kpidto.setCreatedTime(LocalDateTime.now());
        kpidto.setObjectiveId(objectivesDTO.getId());
        Map stringObjectMap = formulationKPIDTO.getKpiValue();
        kpidto.setKpiValue(stringObjectMap);
        if (formulationKPIDTO.getKpiValue().get("kpi_start_end_date") != null && formulationKPIDTO.getKpiValue().get("kpi_start_end_date").toString().contains("-")) {
            DateUtil dateUtil = new DateUtil();
            String[] dateStrings = formulationKPIDTO.getKpiValue().get("kpi_start_end_date").toString().split("-");
            if (dateStrings.length > 1) {
                kpidto.setStartDate(DateUtil.getStringTODateDDMMYYYY((String)dateStrings[0].trim()));
                kpidto.setEndDate(DateUtil.getStringTODateDDMMYYYY((String)dateStrings[1].trim()));
            }
        }
        this.kpiService.save(kpidto);
    }

    @Async
    public void populateExpiryScoreCardNotifications() {
        try {
            List scoreCard = this.cardRepository.findAllByActive(0);
            List scoreCardDTOList = scoreCard.stream().map(dbvalue -> new ScoreCardDTO(dbvalue, false)).collect(Collectors.toList());
            for (ScoreCardDTO scoreCardDTO : scoreCardDTOList) {
                boolean dateRangeFlag;
                if (scoreCardDTO == null || !(dateRangeFlag = Objects.nonNull(scoreCardDTO.getScoreCardValue().get("perspective_start_end_date")) && StringUtils.isNotEmpty((CharSequence)scoreCardDTO.getScoreCardValue().get("perspective_start_end_date").toString()))) continue;
                String dateRange = scoreCardDTO.getScoreCardValue().get("perspective_start_end_date").toString();
                String[] dataRanges = dateRange.contains("-") ? dateRange.split("-") : dateRange.split(",");
                String endDate = BooleanUtils.toString((dataRanges.length > 1 ? 1 : 0) != 0, (String)dataRanges[1].trim(), (String)dataRanges[0].trim());
                ArrayList<SimpleDateFormat> knownPatterns = new ArrayList<SimpleDateFormat>();
                knownPatterns.add(new SimpleDateFormat("MM/dd/yyyy"));
                knownPatterns.add(new SimpleDateFormat("MMM dd, yyyy"));
                Date secondDate = null;
                for (SimpleDateFormat pattern : knownPatterns) {
                    try {
                        secondDate = pattern.parse(endDate);
                    }
                    catch (ParseException parseException) {}
                }
                LocalDate resultEndDate = secondDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
                LocalDate today = LocalDate.now();
                long compare = ChronoUnit.DAYS.between(today, resultEndDate);
                if (compare != 7L) continue;
                scoreCardDTO.getScoreCardValue().put("message", "Your perspective: " + scoreCardDTO.getScoreCardValue().get("name") + " will expiry on " + endDate);
                this.notificationUtil.saveBatchNotification((Object)scoreCardDTO);
            }
        }
        catch (Exception e) {
            this.log.error((Object)"Exception occured while processing scorecard expiry notifications batch", (Throwable)e);
        }
    }

    public ScoreCardDTO formatDates(ScoreCardDTO scoreCardDTO) {
        Map stringObjectsMap = scoreCardDTO.getScoreCardValue();
        List dates = this.processDateRange(stringObjectsMap, "scorecard");
        if (CollectionUtils.isNotEmpty((Collection)dates)) {
            scoreCardDTO.setStartDate((Date)dates.get(0));
            scoreCardDTO.setEndDate((Date)dates.get(1));
        }
        return scoreCardDTO;
    }

    public ScoreCardDetailsDTO formatDates(ScoreCardDetailsDTO scoreCardDTO) {
        Map stringObjectsMap = scoreCardDTO.getScoreCardDetailsValue();
        List dates = this.processDateRange(stringObjectsMap, "scorecardDetails");
        if (CollectionUtils.isNotEmpty((Collection)dates)) {
            scoreCardDTO.setStartDate((Date)dates.get(0));
            scoreCardDTO.setEndDate((Date)dates.get(1));
        }
        return scoreCardDTO;
    }

    public List<Date> processDateRange(Map<String, Object> stringObjectsMap, String type) {
        String[] dataRanges = null;
        String dateRange = null;
        if (type.equals("scorecard")) {
            String string = dateRange = stringObjectsMap.get("perspective_start_end_date") != null && StringUtils.isNotEmpty((CharSequence)stringObjectsMap.get("perspective_start_end_date").toString()) ? stringObjectsMap.get("perspective_start_end_date").toString() : null;
            if (StringUtils.isEmpty(dateRange)) {
                dateRange = stringObjectsMap.get("perspective_start_end_date") != null && StringUtils.isNotEmpty((CharSequence)stringObjectsMap.get("perspective_start_end_date").toString()) ? stringObjectsMap.get("perspective_start_end_date").toString() : null;
            }
        } else {
            String string = dateRange = stringObjectsMap.get("score_card_start_end_date") != null && StringUtils.isNotEmpty((CharSequence)stringObjectsMap.get("score_card_start_end_date").toString()) ? stringObjectsMap.get("score_card_start_end_date").toString() : null;
            if (StringUtils.isEmpty(dateRange)) {
                String string2 = dateRange = stringObjectsMap.get("score_card_start_end_date") != null && StringUtils.isNotEmpty((CharSequence)stringObjectsMap.get("score_card_start_end_date").toString()) ? stringObjectsMap.get("score_card_start_end_date").toString() : null;
            }
        }
        if (Objects.nonNull(dateRange)) {
            String[] stringArray = dataRanges = dateRange.contains("-") ? dateRange.split("-") : dateRange.split(",");
        }
        if (dataRanges != null && dataRanges.length > 1) {
            String startDate = dataRanges[0].trim();
            String endDate = dataRanges[1].trim();
            ArrayList<SimpleDateFormat> knownPatterns = new ArrayList<SimpleDateFormat>();
            knownPatterns.add(new SimpleDateFormat("MM/dd/yyyy"));
            knownPatterns.add(new SimpleDateFormat("MMM dd, yyyy"));
            Date firstDate = null;
            Date secondDate = null;
            for (SimpleDateFormat pattern : knownPatterns) {
                try {
                    firstDate = pattern.parse(startDate);
                    secondDate = pattern.parse(endDate);
                }
                catch (ParseException parseException) {}
            }
            return Arrays.asList(firstDate, secondDate);
        }
        return Collections.emptyList();
    }
}

