/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.scorecard.config.CommonRestTemplate
 *  com.estrat.scorecard.dto.RiskCauseAndConsequenceDTO
 *  com.estrat.scorecard.dto.RiskConsequenceDTO
 *  com.estrat.scorecard.dto.RiskResponseDTO
 *  com.estrat.scorecard.service.RiskCauseAndConsequenceService
 *  com.estrat.scorecard.service.RiskCauseAndConsequenceService$1
 *  com.estrat.scorecard.service.RiskCauseAndConsequenceService$2
 *  com.estrat.scorecard.service.RiskCauseAndConsequenceService$3
 *  com.estrat.scorecard.service.RiskCauseAndConsequenceService$4
 *  com.estrat.scorecard.service.RiskCauseAndConsequenceService$5
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 */
package com.estrat.scorecard.service;

import com.estrat.scorecard.config.CommonRestTemplate;
import com.estrat.scorecard.dto.RiskCauseAndConsequenceDTO;
import com.estrat.scorecard.dto.RiskConsequenceDTO;
import com.estrat.scorecard.dto.RiskResponseDTO;
import com.estrat.scorecard.service.RiskCauseAndConsequenceService;
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
    @Value(value="${dbservice.riskcause.url}")
    private String riskUrl;
    @Value(value="${dbservice.riskcause.riskid.list.url}")
    private String riskCauseListByRiskIdUrl;
    @Value(value="${dbservice.riskcause.empid.list.url}")
    private String riskCauseListByEmpIdUrl;
    @Value(value="${dbservice.riskconquence.url}")
    private String riskConqUrl;
    @Value(value="${dbservice.riskconquence.list.url}")
    private String riskConsequenceListUrl;
    @Value(value="${dbservice.allriskcause.url}")
    private String allRiskCauseListUrl;
    @Value(value="${dbservice.riskcauseNameList.url}")
    private String riskCauseNameListUrl;

    public RiskResponseDTO saveRiskCauseAndConsequence(RiskCauseAndConsequenceDTO riskCauseAndConsequenceDTO) {
        return (RiskResponseDTO)this.commonRestTemplate.postForObject(this.riskUrl, (Object)riskCauseAndConsequenceDTO, RiskResponseDTO.class);
    }

    public RiskResponseDTO updateRiskCauseAndConsequence(RiskCauseAndConsequenceDTO riskCauseAndConsequenceDTO) {
        return (RiskResponseDTO)this.commonRestTemplate.putForObject(this.riskUrl, (Object)riskCauseAndConsequenceDTO, RiskResponseDTO.class);
    }

    public RiskCauseAndConsequenceDTO retrieveRiskCauseAndConsequence(Long id) {
        String url = String.join((CharSequence)"/", this.riskUrl, String.valueOf(id));
        return (RiskCauseAndConsequenceDTO)this.commonRestTemplate.getForObject(url, RiskCauseAndConsequenceDTO.class);
    }

    public void removeRiskCauseAndConsequence(Long id) {
        String url = String.join((CharSequence)"/", this.riskUrl, String.valueOf(id));
        this.commonRestTemplate.deleteForObject(url);
    }

    public List<RiskCauseAndConsequenceDTO> findAllByRiskId(Long riskId) {
        String url = String.join((CharSequence)"/", this.riskCauseListByRiskIdUrl, String.valueOf(riskId));
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<RiskCauseAndConsequenceDTO> findAllByEmpId(Long empId) {
        String url = String.join((CharSequence)"/", this.riskCauseListByEmpIdUrl, String.valueOf(empId));
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public RiskConsequenceDTO saveRiskConsequence(RiskConsequenceDTO riskCauseAndConsequenceDTO) {
        return (RiskConsequenceDTO)this.commonRestTemplate.postForObject(this.riskConqUrl, (Object)riskCauseAndConsequenceDTO, RiskConsequenceDTO.class);
    }

    public RiskConsequenceDTO updateRiskConsequence(RiskConsequenceDTO riskCauseAndConsequenceDTO) {
        return (RiskConsequenceDTO)this.commonRestTemplate.putForObject(this.riskConqUrl, (Object)riskCauseAndConsequenceDTO, RiskConsequenceDTO.class);
    }

    public RiskConsequenceDTO retrieveRiskConsequence(Long id) {
        String url = String.join((CharSequence)"/", this.riskConqUrl, String.valueOf(id));
        return (RiskConsequenceDTO)this.commonRestTemplate.getForObject(url, RiskConsequenceDTO.class);
    }

    public void removeRiskConsequence(Long id) {
        String url = String.join((CharSequence)"/", this.riskConqUrl, String.valueOf(id));
        this.commonRestTemplate.deleteForObject(url);
    }

    public List<RiskConsequenceDTO> findAllByConqId(Long conqId) {
        String url = String.join((CharSequence)"/", this.riskConsequenceListUrl, String.valueOf(conqId));
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<Map<String, Object>> findAllRiskCause() {
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(this.allRiskCauseListUrl, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<Map<String, Object>> findAllRiskCause(long riskId) {
        String url = String.join((CharSequence)"/", this.riskCauseNameListUrl, String.valueOf(riskId));
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }
}

