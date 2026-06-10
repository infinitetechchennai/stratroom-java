/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.config.CommonRestTemplate
 *  com.estrat.web.dto.RiskPlanDTO
 *  com.estrat.web.dto.RiskResponseDTO
 *  com.estrat.web.service.RiskPlanService
 *  com.estrat.web.service.RiskPlanService$1
 *  com.estrat.web.service.RiskPlanService$2
 *  com.estrat.web.service.RiskPlanService$3
 *  com.estrat.web.util.DateUtil
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 */
package com.estrat.web.service;

import com.estrat.web.config.CommonRestTemplate;
import com.estrat.web.dto.RiskPlanDTO;
import com.estrat.web.dto.RiskResponseDTO;
import com.estrat.web.service.RiskPlanService;
import com.estrat.web.util.DateUtil;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;

@Service
public class RiskPlanService {
    @Autowired
    private CommonRestTemplate commonRestTemplate;
    @Value(value="${scorecardservice.riskplan.url}")
    private String riskUrl;
    @Value(value="${scorecardservice.riskplan.riskid.list.url}")
    private String riskPlanListByRiskIdUrl;
    @Value(value="${scorecardservice.riskTreatmentList.riskid.list.url}")
    private String riskTreatmentByRiskIdUrl;
    @Value(value="${scorecardservice.riskplan.empid.list.url}")
    private String riskPlanListByEmpIdUrl;

    public RiskResponseDTO saveRiskPlan(RiskPlanDTO riskPlanDTO) {
        return (RiskResponseDTO)this.commonRestTemplate.postForObject(this.riskUrl, riskPlanDTO, RiskResponseDTO.class);
    }

    public RiskResponseDTO updateRiskPlan(RiskPlanDTO riskPlanDTO) {
        return (RiskResponseDTO)this.commonRestTemplate.putForObject(this.riskUrl, riskPlanDTO, RiskResponseDTO.class);
    }

    public RiskPlanDTO retrieveRiskPlan(Long id) {
        String url = String.join((CharSequence)"/", this.riskUrl, String.valueOf(id));
        RiskPlanDTO riskPlanDTO = (RiskPlanDTO)this.commonRestTemplate.getForObject(url, RiskPlanDTO.class);
        riskPlanDTO.setCreateDateString(DateUtil.mapToString((LocalDateTime)riskPlanDTO.getCreatedTime()));
        riskPlanDTO.setUpdatedDateString(DateUtil.mapToString((LocalDateTime)riskPlanDTO.getUpdatedTime()));
        return riskPlanDTO;
    }

    public void removeRiskPlan(Long id) {
        String url = String.join((CharSequence)"/", this.riskUrl, String.valueOf(id));
        this.commonRestTemplate.deleteForObject(url);
    }

    public List<RiskPlanDTO> findAllByRiskId(Long riskId) {
        String url = String.join((CharSequence)"/", this.riskPlanListByRiskIdUrl, String.valueOf(riskId));
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<RiskPlanDTO> findAllByEmpId(Long empId) {
        String url = String.join((CharSequence)"/", this.riskPlanListByEmpIdUrl, String.valueOf(empId));
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<RiskPlanDTO> findAllTreatmentByRiskId(Long riskId) {
        String url = String.join((CharSequence)"/", this.riskTreatmentByRiskIdUrl, String.valueOf(riskId));
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }
}


