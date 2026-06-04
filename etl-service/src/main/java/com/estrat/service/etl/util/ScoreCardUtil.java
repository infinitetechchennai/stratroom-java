/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.etl.dto.KPIDTO
 *  com.estrat.service.etl.dto.KpiStatusNotification
 *  com.estrat.service.etl.dto.ObjectivesDTO
 *  com.estrat.service.etl.dto.OrganizationDetails
 *  com.estrat.service.etl.dto.ScoreCardDTO
 *  com.estrat.service.etl.dto.ScoreCardDetailsDTO
 *  com.estrat.service.etl.dto.ScoreCardResponseDTO
 *  com.estrat.service.etl.service.DBService
 *  com.estrat.service.etl.service.ScoreCardService
 *  com.estrat.service.etl.util.DataUtil
 *  com.estrat.service.etl.util.DateUtil
 *  com.estrat.service.etl.util.KPIThreadLocal
 *  com.estrat.service.etl.util.KPIUtil
 *  com.estrat.service.etl.util.ScoreCardUtil
 *  com.estrat.service.etl.util.UserThreadLocal
 *  org.apache.log4j.Logger
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.scheduling.annotation.Async
 *  org.springframework.stereotype.Component
 */
package com.estrat.service.etl.util;

import com.estrat.service.etl.dto.KPIDTO;
import com.estrat.service.etl.dto.KpiStatusNotification;
import com.estrat.service.etl.dto.ObjectivesDTO;
import com.estrat.service.etl.dto.OrganizationDetails;
import com.estrat.service.etl.dto.ScoreCardDTO;
import com.estrat.service.etl.dto.ScoreCardDetailsDTO;
import com.estrat.service.etl.dto.ScoreCardResponseDTO;
import com.estrat.service.etl.service.DBService;
import com.estrat.service.etl.service.ScoreCardService;
import com.estrat.service.etl.util.DataUtil;
import com.estrat.service.etl.util.DateUtil;
import com.estrat.service.etl.util.KPIThreadLocal;
import com.estrat.service.etl.util.KPIUtil;
import com.estrat.service.etl.util.UserThreadLocal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
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
    private DBService dbService;
    @Autowired
    private DataUtil dataUtil;
    @Autowired
    private KPIUtil kpiUtil;
    @Autowired
    private DateUtil dateUtil;

    @Async
    public void sendStatusLightNotifications(String orgId) {
        this.log.error((Object)("Status Light batch started :: " + new Date(System.currentTimeMillis())));
        HashMap<String, String> commonHeaders = new HashMap<String, String>();
        commonHeaders.put("USER_ORG_ID", orgId);
        UserThreadLocal.set(commonHeaders);
        this.dateUtil.populateCalendarYear();
        HashMap<String, String> periodMap = new HashMap<String, String>();
        periodMap.put("Quarterly", this.dateUtil.getDatePeriodForStatusLight("Quarterly"));
        periodMap.put("HalfYearly", this.dateUtil.getDatePeriodForStatusLight("HalfYearly"));
        periodMap.put("Monthly", this.dateUtil.getDatePeriodForStatusLight("Monthly"));
        periodMap.put("Yearly", this.dateUtil.getDatePeriodForStatusLight("Yearly"));
        KPIThreadLocal.get().put("periodMap", periodMap);
        List scoreCardList = this.scoreCardService.scoreCardList();
        this.dataUtil.calculateStatusLight(scoreCardList);
        UserThreadLocal.set(null);
        KPIThreadLocal.set(null);
        this.log.error((Object)("Status Light batch ended :: " + new Date(System.currentTimeMillis())));
    }

    public void kpiStatusNotification() {
        List<com.estrat.service.etl.dto.OrganizationDetails> orgList = this.dbService.getOrgList();
        for (com.estrat.service.etl.dto.OrganizationDetails org : orgList) {
            this.log.error((Object)("Status Light batch started :: " + new Date(System.currentTimeMillis())));
            HashMap<String, String> commonHeaders = new HashMap<String, String>();
            commonHeaders.put("USER_ORG_ID", String.valueOf(org.getOrgId()));
            UserThreadLocal.set(commonHeaders);
            this.dateUtil.populateCalendarYear();
            HashMap<String, String> periodMap = new HashMap<String, String>();
            periodMap.put("Quarterly", this.dateUtil.getDatePeriodForStatusLight("Quarterly"));
            periodMap.put("HalfYearly", this.dateUtil.getDatePeriodForStatusLight("HalfYearly"));
            periodMap.put("Monthly", this.dateUtil.getDatePeriodForStatusLight("Monthly"));
            periodMap.put("Yearly", this.dateUtil.getDatePeriodForStatusLight("Yearly"));
            java.util.Map<String, java.util.List<Object>> periodMapList = new java.util.HashMap<>();
            periodMapList.put("Quarterly", this.dateUtil.findPeriodFromCurrentDate("Quarterly"));
            periodMapList.put("HalfYearly", this.dateUtil.findPeriodFromCurrentDate("HalfYearly"));
            periodMapList.put("Monthly", this.dateUtil.findPeriodFromCurrentDate("Monthly"));
            periodMapList.put("Yearly", this.dateUtil.findPeriodFromCurrentDate("Yearly"));
            List<com.estrat.service.etl.dto.ScoreCardDetailsDTO> scoreCardList = this.scoreCardService.scoreCardListAll();
            LocalDate currentDate = LocalDate.now();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMM yyyy");
            String formattedDate = currentDate.format(formatter);
            for (com.estrat.service.etl.dto.ScoreCardDetailsDTO scorecardDetails : scoreCardList) {
                this.log.error((Object)(" Department ID :: " + scorecardDetails.getDepartmentId() + " Name ::: " + scorecardDetails.getScorecardName()));
                try {
                    ScoreCardResponseDTO scoreCardResponseDTO = this.scoreCardService.scoreCardResponse(scorecardDetails.getPageId(), Long.valueOf(scorecardDetails.getOwner()), (String)periodMap.get("Monthly"), String.valueOf(org.getOrgId()));
                    if (scoreCardResponseDTO == null || scoreCardResponseDTO.getCardDetailsDTO() == null) continue;
                    for (ScoreCardDTO scoreCardDTO : scoreCardResponseDTO.getCardDetailsDTO().getScoreCardDTOS()) {
                        if (scoreCardDTO == null) continue;
                        for (ObjectivesDTO objective : scoreCardDTO.getObjectiveList()) {
                            if (objective == null) continue;
                            for (KPIDTO kpi : objective.getKpiList()) {
                                if (kpi == null) continue;
                                try {
                                    boolean shouldProcess = this.kpiUtil.shouldProcessFrequency(kpi.getKpiValue().get("kpi_measurement").toString(), LocalDate.now());
                                    if (!shouldProcess) continue;
                                    String color = (String)kpi.getKpiValue().get("statusLight");
                                    this.log.error((Object)("KPI ID :::: " + kpi.getKpiId() + " KPI Name  :: " + kpi.getKpiName() + " frequency ::: " + kpi.getKpiValue().get("kpi_measurement").toString()));
                                    Long deptId = scorecardDetails.getDepartmentId();
                                    if (color.equals("red fas fa-flag")) {
                                        KpiStatusNotification kpiStatusNotification = new KpiStatusNotification();
                                        kpiStatusNotification.setActualValue(String.valueOf(kpi.getKpiValue().getOrDefault("actual", "")));
                                        kpiStatusNotification.setTargetValue(String.valueOf(kpi.getKpiValue().getOrDefault("target", "")));
                                        kpiStatusNotification.setKpiId(kpi.getKpiId());
                                        kpiStatusNotification.setKpiName(kpi.getKpiName());
                                        kpiStatusNotification.setOwner(Long.valueOf(kpi.getOwner()));
                                        kpiStatusNotification.setMonthYear(formattedDate);
                                        kpiStatusNotification.setDepartmentId(deptId);
                                        kpiStatusNotification.setFrequency(kpi.getKpiValue().get("kpi_measurement").toString());
                                        kpiStatusNotification.setNotificationType(Integer.valueOf(1));
                                        this.log.error((Object)("Sending Noticiation PSM  ::: " + kpiStatusNotification.getActualValue() + " Target Value ::: " + kpiStatusNotification.getTargetValue()));
                                        if (!this.areValuesEqual(kpiStatusNotification.getActualValue(), kpiStatusNotification.getTargetValue())) {
                                            this.scoreCardService.sendnotification(kpiStatusNotification, deptId);
                                        }
                                    }
                                    this.kpiUtil.findEligibleKPIMonthly(kpi, periodMapList, formattedDate);
                                }
                                catch (Exception ex) {
                                    ex.printStackTrace();
                                }
                            }
                        }
                    }
                }
                catch (Exception ex) {
                    ex.printStackTrace();
                }
            }
            this.log.error((Object)("Status Light batch ended :: " + new Date(System.currentTimeMillis())));
        }
    }

    private boolean areValuesEqual(String actualValue, String targetValue) {
        Double normalizedActualValue = this.normalizeValue(actualValue);
        Double normalizedTargetValue = this.normalizeValue(targetValue);
        return normalizedActualValue.equals(normalizedTargetValue);
    }

    private Double normalizeValue(String value) {
        if (value == null || value.isEmpty()) {
            return 0.0;
        }
        String cleanedValue = value.replace("%", "").trim();
        try {
            return Double.valueOf(cleanedValue);
        }
        catch (NumberFormatException e) {
            return 0.0;
        }
    }
}

