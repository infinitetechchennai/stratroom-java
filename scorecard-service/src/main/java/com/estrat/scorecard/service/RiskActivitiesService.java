/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.scorecard.config.CommonRestTemplate
 *  com.estrat.scorecard.dto.RiskActivitiesDTO
 *  com.estrat.scorecard.dto.RiskResponseDTO
 *  com.estrat.scorecard.service.RiskActivitiesService
 *  com.estrat.scorecard.service.RiskActivitiesService$1
 *  com.estrat.scorecard.service.RiskActivitiesService$2
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 */
package com.estrat.scorecard.service;

import com.estrat.scorecard.config.CommonRestTemplate;
import com.estrat.scorecard.dto.RiskActivitiesDTO;
import com.estrat.scorecard.dto.RiskResponseDTO;
import com.estrat.scorecard.service.RiskActivitiesService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;

@Service
public class RiskActivitiesService {
    @Autowired
    private CommonRestTemplate commonRestTemplate;
    @Value(value="${dbservice.riskactivities.url}")
    private String riskUrl;
    @Value(value="${dbservice.riskactivities.riskid.list.url}")
    private String riskActivitiesListByRiskIdUrl;
    @Value(value="${dbservice.riskactivities.empid.list.url}")
    private String riskActivitiesListByEmpIdUrl;

    public RiskResponseDTO saveRiskActivities(RiskActivitiesDTO riskActivitiesDTO) {
        return (RiskResponseDTO)this.commonRestTemplate.postForObject(this.riskUrl, (Object)riskActivitiesDTO, RiskResponseDTO.class);
    }

    public RiskResponseDTO updateRiskActivities(RiskActivitiesDTO riskActivitiesDTO) {
        return (RiskResponseDTO)this.commonRestTemplate.putForObject(this.riskUrl, (Object)riskActivitiesDTO, RiskResponseDTO.class);
    }

    public RiskActivitiesDTO retrieveRiskActivities(Long id) {
        String url = String.join((CharSequence)"/", this.riskUrl, String.valueOf(id));
        return (RiskActivitiesDTO)this.commonRestTemplate.getForObject(url, RiskActivitiesDTO.class);
    }

    public void removeRiskActivities(Long id) {
        String url = String.join((CharSequence)"/", this.riskUrl, String.valueOf(id));
        this.commonRestTemplate.deleteForObject(url);
    }

    public List<RiskActivitiesDTO> findAllByRiskId(Long riskId) {
        String url = String.join((CharSequence)"/", this.riskActivitiesListByRiskIdUrl, String.valueOf(riskId));
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<RiskActivitiesDTO> findAllByEmpId(Long empId) {
        String url = String.join((CharSequence)"/", this.riskActivitiesListByEmpIdUrl, String.valueOf(empId));
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }
}

