/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.config.CommonRestTemplate
 *  com.estrat.web.dto.RiskCauseAndConsequenceDTO
 *  com.estrat.web.dto.RiskConsequenceDTO
 *  com.estrat.web.dto.RiskResponseDTO
 *  com.estrat.web.service.RiskCauseAndConsequenceService
 *  com.estrat.web.service.RiskCauseAndConsequenceService$1
 *  com.estrat.web.service.RiskCauseAndConsequenceService$2
 *  com.estrat.web.service.RiskCauseAndConsequenceService$3
 *  com.estrat.web.service.RiskCauseAndConsequenceService$4
 *  com.estrat.web.service.RiskCauseAndConsequenceService$5
 *  com.estrat.web.util.DateUtil
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 */
package com.estrat.web.service;

import com.estrat.web.config.CommonRestTemplate;
import com.estrat.web.dto.RiskCauseAndConsequenceDTO;
import com.estrat.web.dto.RiskConsequenceDTO;
import com.estrat.web.dto.RiskResponseDTO;
import com.estrat.web.service.RiskCauseAndConsequenceService;
import com.estrat.web.util.DateUtil;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;

@Service
public class RiskCauseAndConsequenceService {
    @Autowired
    private CommonRestTemplate commonRestTemplate;
    @Value(value="${scorecardservice.riskcause.url}")
    private String riskUrl;
    @Value(value="${scorecardservice.riskcause.riskid.list.url}")
    private String riskCauseListByRiskIdUrl;
    @Value(value="${scorecardservice.riskcause.empid.list.url}")
    private String riskCauseListByEmpIdUrl;
    @Value(value="${scorecardservice.riskconquence.url}")
    private String riskConqUrl;
    @Value(value="${scorecardservice.riskconquence.list.url}")
    private String riskConsequenceListUrl;
    @Value(value="${scorecardservice.allriskcause.url}")
    private String allRiskCauseListUrl;
    @Value(value="${scorecardservice.riskcauseNameList.url}")
    private String riskCauseNameListUrl;

    public RiskResponseDTO saveRiskCauseAndConsequence(RiskCauseAndConsequenceDTO riskCauseAndConsequenceDTO) {
        return (RiskResponseDTO)this.commonRestTemplate.postForObject(this.riskUrl, riskCauseAndConsequenceDTO, RiskResponseDTO.class);
    }

    public RiskResponseDTO updateRiskCauseAndConsequence(RiskCauseAndConsequenceDTO riskCauseAndConsequenceDTO) {
        return (RiskResponseDTO)this.commonRestTemplate.putForObject(this.riskUrl, riskCauseAndConsequenceDTO, RiskResponseDTO.class);
    }

    public RiskCauseAndConsequenceDTO retrieveRiskCauseAndConsequence(Long id) {
        String url = String.join((CharSequence)"/", this.riskUrl, String.valueOf(id));
        RiskCauseAndConsequenceDTO riskCauseAndConsequenceDTO = (RiskCauseAndConsequenceDTO)this.commonRestTemplate.getForObject(url, RiskCauseAndConsequenceDTO.class);
        riskCauseAndConsequenceDTO.setCreateDateString(DateUtil.mapToString((LocalDateTime)riskCauseAndConsequenceDTO.getCreatedTime()));
        riskCauseAndConsequenceDTO.setUpdatedDateString(DateUtil.mapToString((LocalDateTime)riskCauseAndConsequenceDTO.getUpdatedTime()));
        return riskCauseAndConsequenceDTO;
    }

    public void removeRiskCauseAndConsequence(Long id) {
        String url = String.join((CharSequence)"/", this.riskUrl, String.valueOf(id));
        this.commonRestTemplate.deleteForObject(url);
    }

    public List<RiskCauseAndConsequenceDTO> findAllByRiskId(Long riskId) {
        String url = String.join((CharSequence)"/", this.riskCauseListByRiskIdUrl, String.valueOf(riskId));
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<RiskCauseAndConsequenceDTO> findAllByEmpId(Long empId) {
        String url = String.join((CharSequence)"/", this.riskCauseListByEmpIdUrl, String.valueOf(empId));
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public RiskConsequenceDTO saveRiskConsequence(RiskConsequenceDTO riskCauseAndConsequenceDTO) {
        return (RiskConsequenceDTO)this.commonRestTemplate.postForObject(this.riskConqUrl, riskCauseAndConsequenceDTO, RiskConsequenceDTO.class);
    }

    public RiskConsequenceDTO updateRiskConsequence(RiskConsequenceDTO riskCauseAndConsequenceDTO) {
        return (RiskConsequenceDTO)this.commonRestTemplate.putForObject(this.riskConqUrl, riskCauseAndConsequenceDTO, RiskConsequenceDTO.class);
    }

    public RiskConsequenceDTO retrieveRiskConsequence(Long id) {
        String url = String.join((CharSequence)"/", this.riskConqUrl, String.valueOf(id));
        RiskConsequenceDTO riskConsequenceDTO = (RiskConsequenceDTO)this.commonRestTemplate.getForObject(url, RiskConsequenceDTO.class);
        riskConsequenceDTO.setCreateDateString(DateUtil.mapToString((LocalDateTime)riskConsequenceDTO.getCreatedTime()));
        riskConsequenceDTO.setUpdatedDateString(DateUtil.mapToString((LocalDateTime)riskConsequenceDTO.getUpdatedTime()));
        return riskConsequenceDTO;
    }

    public void removeRiskConsequence(Long id) {
        String url = String.join((CharSequence)"/", this.riskConqUrl, String.valueOf(id));
        this.commonRestTemplate.deleteForObject(url);
    }

    public List<RiskConsequenceDTO> findAllByConqId(Long conqId) {
        String url = String.join((CharSequence)"/", this.riskConsequenceListUrl, String.valueOf(conqId));
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<Map<String, Object>> findAllRiskCause() {
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference() {};
        return (List)this.commonRestTemplate.getForObject(this.allRiskCauseListUrl, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<Map<String, Object>> findAllRiskCause(long riskId) {
        String url = String.join((CharSequence)"/", this.riskCauseNameListUrl, String.valueOf(riskId));
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }
}


