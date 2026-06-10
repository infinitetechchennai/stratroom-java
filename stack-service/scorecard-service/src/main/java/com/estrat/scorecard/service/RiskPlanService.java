/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.scorecard.config.CommonRestTemplate
 *  com.estrat.scorecard.dto.RiskPlanDTO
 *  com.estrat.scorecard.dto.RiskResponseDTO
 *  com.estrat.scorecard.service.RiskPlanService
 *  com.estrat.scorecard.service.RiskPlanService$1
 *  com.estrat.scorecard.service.RiskPlanService$2
 *  com.estrat.scorecard.service.RiskPlanService$3
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 *  org.springframework.web.client.RestTemplate
 */
package com.estrat.scorecard.service;

import com.estrat.scorecard.config.CommonRestTemplate;
import com.estrat.scorecard.dto.RiskPlanDTO;
import com.estrat.scorecard.dto.RiskResponseDTO;
import com.estrat.scorecard.service.RiskPlanService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class RiskPlanService {
    @Autowired
    private CommonRestTemplate commonRestTemplate;
    @Autowired
    private RestTemplate restTemplate;
    @Value(value="${dbservice.riskplan.url}")
    private String riskUrl;
    @Value(value="${dbservice.riskplan.riskid.list.url}")
    private String riskPlanListByRiskIdUrl;
    @Value(value="${dbservice.riskTreatmentList.riskid.list.url}")
    private String riskTreatmentByRiskIdUrl;
    @Value(value="${dbservice.riskplan.empid.list.url}")
    private String riskPlanListByEmpIdUrl;

    public RiskResponseDTO saveRiskPlan(RiskPlanDTO riskPlanDTO) {
        return (RiskResponseDTO)this.commonRestTemplate.postForObject(this.riskUrl, (Object)riskPlanDTO, RiskResponseDTO.class);
    }

    public RiskResponseDTO updateRiskPlan(RiskPlanDTO riskPlanDTO) {
        return (RiskResponseDTO)this.commonRestTemplate.putForObject(this.riskUrl, (Object)riskPlanDTO, RiskResponseDTO.class);
    }

    public RiskPlanDTO retrieveRiskPlan(Long id) {
        String url = String.join((CharSequence)"/", this.riskUrl, String.valueOf(id));
        return (RiskPlanDTO)this.commonRestTemplate.getForObject(url, RiskPlanDTO.class);
    }

    public void removeRiskPlan(Long id) {
        String url = String.join((CharSequence)"/", this.riskUrl, String.valueOf(id));
        this.commonRestTemplate.deleteForObject(url);
    }

    public List<RiskPlanDTO> findAllByRiskId(Long riskId) {
        String url = String.join((CharSequence)"/", this.riskPlanListByRiskIdUrl, String.valueOf(riskId));
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<RiskPlanDTO> findAllByEmpId(Long empId) {
        String url = String.join((CharSequence)"/", this.riskPlanListByEmpIdUrl, String.valueOf(empId));
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<RiskPlanDTO> findAllTreatmentByRiskId(Long riskId) {
        String url = String.join((CharSequence)"/", this.riskTreatmentByRiskIdUrl, String.valueOf(riskId));
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }
}

