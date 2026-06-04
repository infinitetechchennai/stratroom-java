/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.dto.KPIDTO
 *  com.estrat.web.dto.ObjectivesDTO
 *  com.estrat.web.dto.ScoreCardDTO
 *  com.estrat.web.dto.SubKPIDTO
 *  com.estrat.web.util.ScoreCardUtil
 *  org.apache.commons.collections4.CollectionUtils
 *  org.apache.commons.lang3.StringUtils
 *  org.springframework.stereotype.Component
 */
package com.estrat.web.util;

import com.estrat.web.dto.KPIDTO;
import com.estrat.web.dto.ObjectivesDTO;
import com.estrat.web.dto.ScoreCardDTO;
import com.estrat.web.dto.SubKPIDTO;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

@Component
public class ScoreCardUtil {
    public Map<String, ScoreCardDTO> mapPage(List<ScoreCardDTO> scoreCardList) {
        HashMap<String, ScoreCardDTO> scoreCardMap = new HashMap<String, ScoreCardDTO>();
        if (CollectionUtils.isNotEmpty(scoreCardList)) {
            for (Object _obj_scoreCardDTO : scoreCardList) {
                ScoreCardDTO scoreCardDTO = (ScoreCardDTO) _obj_scoreCardDTO;
                this.mapScoreCard(scoreCardDTO);
                scoreCardMap.put(scoreCardDTO.getPerspectiveId(), scoreCardDTO);
            }
        }
        return scoreCardMap == null ? new HashMap<String, ScoreCardDTO>() : scoreCardMap;
    }

    public ScoreCardDTO mapScoreCard(ScoreCardDTO scoreCardDTO) {
        if (CollectionUtils.isNotEmpty((Collection)scoreCardDTO.getObjectiveList())) {
            HashMap<String, ObjectivesDTO> objectivesMap = new HashMap<String, ObjectivesDTO>();
            for (Object _obj_objectivesDTO : scoreCardDTO.getObjectiveList()) {
                ObjectivesDTO objectivesDTO = (ObjectivesDTO) _obj_objectivesDTO;
                this.mapObjectives(objectivesDTO);
                objectivesMap.put(objectivesDTO.getObjectiveId(), objectivesDTO);
            }
            scoreCardDTO.setObjectivesMap(objectivesMap);
        }
        return scoreCardDTO;
    }

    public ObjectivesDTO mapObjectives(ObjectivesDTO objectivesDTO) {
        if (CollectionUtils.isNotEmpty((Collection)objectivesDTO.getKpiList())) {
            HashMap<String, KPIDTO> kpiMap = new HashMap<String, KPIDTO>();
            for (Object _obj_kpidto : objectivesDTO.getKpiList()) {
                KPIDTO kpidto = (KPIDTO) _obj_kpidto;
                this.mapKpi(kpidto);
                kpiMap.put(kpidto.getKpiId(), kpidto);
            }
            objectivesDTO.setKpiMap(kpiMap);
        }
        return objectivesDTO;
    }

    public KPIDTO mapKpi(KPIDTO kpidto) {
        if (CollectionUtils.isNotEmpty((Collection)kpidto.getSubKpiList())) {
            HashMap<String, SubKPIDTO> subkpiMap = new HashMap<String, SubKPIDTO>();
            for (Object _obj_subkpidto : kpidto.getSubKpiList()) {
                SubKPIDTO subkpidto = (SubKPIDTO) _obj_subkpidto;
                subkpiMap.put(subkpidto.getSubKpiId(), subkpidto);
            }
            kpidto.setSubkpiMap(subkpiMap);
        }
        return kpidto;
    }

    public Map<String, Object> getKpiMap(List<KPIDTO> kpiList) {
        if (CollectionUtils.isNotEmpty(kpiList)) {
            return kpiList.stream().filter(kpi -> StringUtils.isNotEmpty((CharSequence)kpi.getKpiId())).map(kpi -> kpi).collect(Collectors.toMap(KPIDTO::getKpiId, kpi -> kpi.getKpiName()));
        }
        return Collections.emptyMap();
    }

    public Map<String, Object> getObjectiveMap(List<ObjectivesDTO> objectiveList) {
        if (CollectionUtils.isNotEmpty(objectiveList)) {
            return objectiveList.stream().filter(kpi -> StringUtils.isNotEmpty((CharSequence)kpi.getObjectiveId())).map(kpi -> kpi).collect(Collectors.toMap(ObjectivesDTO::getObjectiveId, kpi -> kpi.getObjectivesValue().get("name")));
        }
        return Collections.emptyMap();
    }

    public Map<String, Object> getKpiMap(ScoreCardDTO scoreCardDTO) {
        ArrayList kpiList = new ArrayList();
        scoreCardDTO.getObjectiveList().forEach(objective -> kpiList.addAll(objective.getKpiList()));
        return this.getKpiMap(kpiList);
    }

    public Map<String, Object> getPerspectiveMap(List<ScoreCardDTO> scoreCardDTOList) {
        LinkedHashMap<String, Object> map = new LinkedHashMap<String, Object>();
        for (Object _obj_perspective : scoreCardDTOList) {
            ScoreCardDTO perspective = (ScoreCardDTO) _obj_perspective;
            if (!perspective.getScoreCardValue().containsKey("name")) continue;
            map.put(perspective.getScoreCardValue().get("name").toString(), perspective.getScoreCardValue().get("name").toString());
        }
        return map;
    }
}

