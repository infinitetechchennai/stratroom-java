/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.dto.InitiativesDTO
 *  com.estrat.web.dto.KPIDTO
 *  com.estrat.web.util.InitiativesUtil
 *  org.apache.commons.collections4.CollectionUtils
 *  org.apache.commons.lang3.StringUtils
 *  org.springframework.stereotype.Component
 */
package com.estrat.web.util;

import com.estrat.web.dto.InitiativesDTO;
import com.estrat.web.dto.KPIDTO;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

@Component
public class InitiativesUtil {
    public Map<String, InitiativesDTO> mapPage(List<InitiativesDTO> initiativeList) {
        HashMap<String, InitiativesDTO> initiativesMap = new HashMap<String, InitiativesDTO>();
        if (CollectionUtils.isNotEmpty(initiativeList)) {
            initiativeList.forEach(initiative -> {
                if (StringUtils.isNotEmpty((CharSequence)this.getValue(initiative.getInitiativeValue(), "name"))) {
                    initiativesMap.put(this.getValue(initiative.getInitiativeValue(), "name"), this.mapChildInitiatives(initiative));
                }
            });
        }
        return initiativesMap;
    }

    public String getValue(Map<String, Object> inMap, String key) {
        String value = Objects.nonNull(inMap) && Objects.nonNull(inMap.get(key)) ? inMap.get(key).toString() : "";
        return value;
    }

    public InitiativesDTO mapChildInitiatives(InitiativesDTO initiativesDTO) {
        if (CollectionUtils.isNotEmpty((Collection)initiativesDTO.getActivitiesList())) {
            HashMap activitiesMap = new HashMap();
            initiativesDTO.getActivitiesList().forEach(activity -> {
                if (StringUtils.isNotEmpty((CharSequence)this.getValue(activity.getActivitiesValue(), "desc"))) {
                    activitiesMap.put(this.getValue(activity.getActivitiesValue(), "desc"), activity);
                }
            });
            initiativesDTO.setActivitiesMap(activitiesMap);
        }
        if (CollectionUtils.isNotEmpty((Collection)initiativesDTO.getMileStonesList())) {
            HashMap mileStonesMap = new HashMap();
            initiativesDTO.getMileStonesList().forEach(milestones -> {
                if (StringUtils.isNotEmpty((CharSequence)this.getValue(milestones.getMileStonesValue(), "desc"))) {
                    mileStonesMap.put(this.getValue(milestones.getMileStonesValue(), "desc"), milestones);
                }
            });
            initiativesDTO.setMileStonesMap(mileStonesMap);
        }
        if (CollectionUtils.isNotEmpty((Collection)initiativesDTO.getSubInitiativeList())) {
            HashMap subInitiaitivesMap = new HashMap();
            initiativesDTO.getSubInitiativeList().forEach(subInitiaitive -> {
                if (StringUtils.isNotEmpty((CharSequence)this.getValue(subInitiaitive.getSubInitiativeValue(), "description"))) {
                    subInitiaitivesMap.put(this.getValue(subInitiaitive.getSubInitiativeValue(), "description"), subInitiaitive);
                }
            });
            initiativesDTO.setSubInitiativeMap(subInitiaitivesMap);
        }
        return initiativesDTO;
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
}

