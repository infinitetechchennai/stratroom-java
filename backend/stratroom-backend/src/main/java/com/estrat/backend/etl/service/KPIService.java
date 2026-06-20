/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.etl.config.CommonRestTemplate
 *  com.estrat.backend.etl.dto.CustomPerformance
 *  com.estrat.backend.etl.dto.KPICriteria
 *  com.estrat.backend.etl.dto.KPIDTO
 *  com.estrat.backend.etl.dto.KPIDetailsDTO
 *  com.estrat.backend.etl.service.KPIService
 *  com.estrat.backend.etl.service.KPIService$1
 *  com.estrat.backend.etl.service.KPIService$2
 *  com.estrat.backend.etl.service.KPIService$3
 *  com.estrat.backend.etl.service.KPIService$4
 *  com.estrat.backend.etl.util.KPIThreadLocal
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.http.HttpStatus
 *  org.springframework.http.ResponseEntity
 *  org.springframework.stereotype.Service
 *  org.springframework.web.util.UriComponentsBuilder
 */
package com.estrat.backend.etl.service;

import com.estrat.backend.etl.config.CommonRestTemplate;
import com.estrat.backend.etl.dto.CustomPerformance;
import com.estrat.backend.etl.dto.KPICriteria;
import com.estrat.backend.etl.dto.KPIDTO;
import com.estrat.backend.etl.dto.KPIDetailsDTO;
import com.estrat.backend.etl.service.KPIService;
import com.estrat.backend.etl.util.KPIThreadLocal;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class KPIService {
    @Autowired
    private CommonRestTemplate commonRestTemplate;
    @Value(value="${dbservice.url}")
    private String dbUrl;
    @Value(value="${dbService.control.panel.custom.get.url}")
    private String customPerformanceGetUrl;

    public CustomPerformance findCustomPerformanceByOrgId() {
        org.springframework.core.ParameterizedTypeReference<Object> parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        Map result = (Map)this.commonRestTemplate.getForObject(this.customPerformanceGetUrl, (ParameterizedTypeReference)parameterizedTypeReference);
        return new CustomPerformance(result);
    }

    public List<Map<String, Object>> retrieveOrgKPIDetails(KPICriteria kpiCriteria) {
        String url = this.dbUrl + "/retrieveOrgKPIDetails";
        org.springframework.core.ParameterizedTypeReference<Object> parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        List kpiList = (List)this.commonRestTemplate.postForObject(url, (Object)kpiCriteria, (ParameterizedTypeReference)parameterizedTypeReference);
        return kpiList;
    }

    public ResponseEntity<List<KPIDetailsDTO>> retrieveNodeKeyList() {
        String url = this.dbUrl + "/retrieveNodeKeyList";
        org.springframework.core.ParameterizedTypeReference<Object> parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        List kpi1 = (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
        return new ResponseEntity((Object)kpi1, HttpStatus.OK);
    }

    public List<KPIDTO> retrieveKpiList(String orgId) {
        String url = this.dbUrl + "/orgKpiList";
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("orgId", new Object[]{orgId}).toUriString();
        org.springframework.core.ParameterizedTypeReference<Object> parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(pageURL, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public String lookupNodeKey(String nodeKey) {
        if (nodeKey.matches("[0-9]+")) {
            return nodeKey;
        }
        Map<String, String> nodeKeyMap = null;
        if (KPIThreadLocal.get() != null && KPIThreadLocal.get().get("nodeKeyMap") != null) {
            nodeKeyMap = (Map<String, String>)KPIThreadLocal.get().get("nodeKeyMap");
        } else {
            List<KPIDetailsDTO> nodeKeyDataList = (List<KPIDetailsDTO>)this.retrieveNodeKeyList().getBody();
            nodeKeyMap = nodeKeyDataList.stream().collect(Collectors.toMap(KPIDetailsDTO::getMeasureName, KPIDetailsDTO::getNodeKey));
            KPIThreadLocal.get().put("nodeKeyMap", nodeKeyMap);
        }
        return nodeKeyMap.get(nodeKey.trim());
    }
}

