/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.dto.KPIDTO
 *  com.estrat.web.dto.RiskCauseAndConsequenceDTO
 *  com.estrat.web.dto.RiskDTO
 *  com.estrat.web.dto.RiskMonitoringDTO
 *  com.estrat.web.dto.RiskPlanDTO
 *  com.estrat.web.util.RiskUtil
 *  org.apache.commons.collections4.CollectionUtils
 *  org.apache.commons.lang3.StringUtils
 *  org.springframework.stereotype.Component
 */
package com.estrat.web.util;

import com.estrat.web.dto.KPIDTO;
import com.estrat.web.dto.RiskCauseAndConsequenceDTO;
import com.estrat.web.dto.RiskDTO;
import com.estrat.web.dto.RiskMonitoringDTO;
import com.estrat.web.dto.RiskPlanDTO;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

@Component
public class RiskUtil {
    public Map<String, RiskDTO> mapPage(List<RiskDTO> riskList) {
        HashMap<String, RiskDTO> riskMap = new HashMap<String, RiskDTO>();
        if (CollectionUtils.isNotEmpty(riskList)) {
            riskList.forEach(risk -> {
                if (StringUtils.isNotEmpty((CharSequence)this.getValue(risk.getRiskValue(), "name"))) {
                    riskMap.put(this.getValue(risk.getRiskValue(), "name"), this.mapChildRisks(risk));
                }
            });
        }
        return riskMap;
    }

    public RiskDTO mapChildRisks(RiskDTO riskDTO) {
        if (CollectionUtils.isNotEmpty((Collection)riskDTO.getRiskPlanList())) {
            HashMap planMap = new HashMap();
            riskDTO.getRiskPlanList().forEach(riskPlan -> planMap.put(this.getValue(riskPlan.getRiskPlanValue(), "name"), this.mapActivities(riskPlan)));
            riskDTO.setRiskPlanMap(planMap);
        }
        if (CollectionUtils.isNotEmpty((Collection)riskDTO.getRiskMonitoringList())) {
            HashMap monitoringMap = new HashMap();
            riskDTO.getRiskMonitoringList().forEach(monitoring -> monitoringMap.put(this.getValue(monitoring.getRiskMonitoringValue(), "name"), this.mapActivities(monitoring)));
            riskDTO.setRiskMonitoringMap(monitoringMap);
        }
        if (CollectionUtils.isNotEmpty((Collection)riskDTO.getRiskCommentsList())) {
            HashMap commentsMap = new HashMap();
            riskDTO.getRiskCommentsList().forEach(comments -> commentsMap.put(this.getValue(comments.getRiskCommentsValue(), "desc"), comments));
            riskDTO.setRiskCommentsDTOMap(commentsMap);
        }
        if (CollectionUtils.isNotEmpty((Collection)riskDTO.getRiskCauseAndConsequenceList())) {
            HashMap causeMap = new HashMap();
            riskDTO.getRiskCauseAndConsequenceList().forEach(cause -> causeMap.put(this.getValue(cause.getCauseAndConsequenceValue(), "name"), this.mapConsequence(cause)));
            riskDTO.setRiskCauseAndConsequenceMap(causeMap);
        }
        return riskDTO;
    }

    public RiskPlanDTO mapActivities(RiskPlanDTO riskPlanDTO) {
        if (CollectionUtils.isNotEmpty((Collection)riskPlanDTO.getRiskActivitiesDTOList())) {
            HashMap activitiesMap = new HashMap();
            riskPlanDTO.getRiskActivitiesDTOList().forEach(risk -> activitiesMap.put(this.getValue(risk.getRiskActivitiesValue(), "name"), risk));
            riskPlanDTO.setRiskActivitiesMap(activitiesMap);
        }
        return riskPlanDTO;
    }

    public RiskMonitoringDTO mapActivities(RiskMonitoringDTO riskPlanDTO) {
        if (CollectionUtils.isNotEmpty((Collection)riskPlanDTO.getRiskReviewList())) {
            HashMap activitiesMap = new HashMap();
            riskPlanDTO.getRiskReviewList().forEach(risk -> activitiesMap.put(this.getValue(risk.getRiskActivitiesValue(), "name"), risk));
            riskPlanDTO.setRiskActivitiesMap(activitiesMap);
        }
        return riskPlanDTO;
    }

    public RiskCauseAndConsequenceDTO mapConsequence(RiskCauseAndConsequenceDTO riskDTO) {
        if (CollectionUtils.isNotEmpty((Collection)riskDTO.getConsequenceList())) {
            HashMap consequenceMap = new HashMap();
            riskDTO.getConsequenceList().forEach(risk -> consequenceMap.put(this.getValue(risk.getConsequenceValue(), "name"), risk));
            riskDTO.setRiskConsequenceMap(consequenceMap);
        }
        return riskDTO;
    }

    public Map<String, KPIDTO> mapKPI(List<KPIDTO> kpiList) {
        HashMap<String, KPIDTO> kpiMap = new HashMap<String, KPIDTO>();
        if (CollectionUtils.isNotEmpty(kpiList)) {
            kpiList.forEach(kpi -> {
                if (StringUtils.isNotEmpty((CharSequence)this.getValue(kpi.getKpiValue(), "name"))) {
                    kpiMap.put(kpi.getKpiName(), (KPIDTO)kpi);
                }
            });
        }
        return kpiMap;
    }

    private String getValue(Map<String, Object> mapObject, String key) {
        if (Objects.nonNull(mapObject.get(key))) {
            return StringUtils.stripToEmpty((String)mapObject.get(key).toString());
        }
        return "";
    }
}

