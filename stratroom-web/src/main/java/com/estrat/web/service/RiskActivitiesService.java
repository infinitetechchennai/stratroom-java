/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.config.CommonRestTemplate
 *  com.estrat.web.dto.RiskActivitiesDTO
 *  com.estrat.web.dto.RiskResponseDTO
 *  com.estrat.web.service.RiskActivitiesService
 *  com.estrat.web.service.RiskActivitiesService$1
 *  com.estrat.web.service.RiskActivitiesService$2
 *  com.estrat.web.util.DateUtil
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 */
package com.estrat.web.service;

import com.estrat.web.config.CommonRestTemplate;
import com.estrat.web.dto.RiskActivitiesDTO;
import com.estrat.web.dto.RiskResponseDTO;
import com.estrat.web.service.RiskActivitiesService;
import com.estrat.web.util.DateUtil;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;

@Service
public class RiskActivitiesService {
    @Autowired
    private CommonRestTemplate commonRestTemplate;
    @Value(value="${scorecardservice.riskactivities.url}")
    private String riskUrl;
    @Value(value="${scorecardservice.riskactivities.riskid.list.url}")
    private String riskActivitiesListByRiskIdUrl;
    @Value(value="${scorecardservice.riskactivities.empid.list.url}")
    private String riskActivitiesListByEmpIdUrl;

    public RiskResponseDTO saveRiskActivities(RiskActivitiesDTO riskActivitiesDTO) {
        return (RiskResponseDTO)this.commonRestTemplate.postForObject(this.riskUrl, riskActivitiesDTO, RiskResponseDTO.class);
    }

    public RiskResponseDTO updateRiskActivities(RiskActivitiesDTO riskActivitiesDTO) {
        return (RiskResponseDTO)this.commonRestTemplate.putForObject(this.riskUrl, riskActivitiesDTO, RiskResponseDTO.class);
    }

    public RiskActivitiesDTO retrieveRiskActivities(Long id) {
        String url = String.join((CharSequence)"/", this.riskUrl, String.valueOf(id));
        RiskActivitiesDTO riskActivitiesDTO = (RiskActivitiesDTO)this.commonRestTemplate.getForObject(url, RiskActivitiesDTO.class);
        riskActivitiesDTO.setCreateDateString(DateUtil.mapToString((LocalDateTime)riskActivitiesDTO.getCreatedTime()));
        riskActivitiesDTO.setUpdatedDateString(DateUtil.mapToString((LocalDateTime)riskActivitiesDTO.getUpdatedTime()));
        return riskActivitiesDTO;
    }

    public void removeRiskActivities(Long id) {
        String url = String.join((CharSequence)"/", this.riskUrl, String.valueOf(id));
        this.commonRestTemplate.deleteForObject(url);
    }

    public List<RiskActivitiesDTO> findAllByRiskId(Long riskId) {
        String url = String.join((CharSequence)"/", this.riskActivitiesListByRiskIdUrl, String.valueOf(riskId));
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<RiskActivitiesDTO> findAllByEmpId(Long empId) {
        String url = String.join((CharSequence)"/", this.riskActivitiesListByEmpIdUrl, String.valueOf(empId));
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }
}


