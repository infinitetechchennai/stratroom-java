/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.scorecard.config.CommonRestTemplate
 *  com.estrat.scorecard.dto.RiskCommentsDTO
 *  com.estrat.scorecard.dto.RiskResponseDTO
 *  com.estrat.scorecard.service.RiskCommentsService
 *  com.estrat.scorecard.service.RiskCommentsService$1
 *  com.estrat.scorecard.service.RiskCommentsService$2
 *  com.estrat.scorecard.service.RiskCommentsService$3
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 */
package com.estrat.scorecard.service;

import com.estrat.scorecard.config.CommonRestTemplate;
import com.estrat.scorecard.dto.RiskCommentsDTO;
import com.estrat.scorecard.dto.RiskResponseDTO;
import com.estrat.scorecard.service.RiskCommentsService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;

@Service
public class RiskCommentsService {
    @Autowired
    private CommonRestTemplate commonRestTemplate;
    @Value(value="${dbservice.riskcomments.url}")
    private String riskUrl;
    @Value(value="${dbservice.url}")
    private String dbUrl;
    @Value(value="${dbservice.riskcomments.riskid.list.url}")
    private String riskCommentsListByRiskIdUrl;
    @Value(value="${dbservice.riskcomments.empid.list.url}")
    private String riskCommentsListByEmpIdUrl;
    @Value(value="${dbservice.riskcomments.empfrompage.list.url}")
    private String fromPageCommentsListByEmpIdUrl;

    public RiskResponseDTO saveRiskComments(RiskCommentsDTO riskCommentsDTO) {
        return (RiskResponseDTO)this.commonRestTemplate.postForObject(this.riskUrl, (Object)riskCommentsDTO, RiskResponseDTO.class);
    }

    public RiskResponseDTO updateRiskComments(RiskCommentsDTO riskCommentsDTO) {
        return (RiskResponseDTO)this.commonRestTemplate.putForObject(this.riskUrl, (Object)riskCommentsDTO, RiskResponseDTO.class);
    }

    public RiskCommentsDTO retrieveRiskComments(Long id) {
        String url = String.join((CharSequence)"/", this.riskUrl, String.valueOf(id));
        return (RiskCommentsDTO)this.commonRestTemplate.getForObject(url, RiskCommentsDTO.class);
    }

    public void removeRiskComments(Long id) {
        String url = String.join((CharSequence)"/", this.riskUrl, String.valueOf(id));
        this.commonRestTemplate.deleteForObject(url);
    }

    public List<RiskCommentsDTO> findAllByRiskId(Long riskId) {
        String url = String.join((CharSequence)"/", this.riskCommentsListByRiskIdUrl, String.valueOf(riskId));
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<RiskCommentsDTO> findAllByEmpId(Long empId) {
        String url = String.join((CharSequence)"/", this.riskCommentsListByEmpIdUrl, String.valueOf(empId));
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<RiskCommentsDTO> findAllByEmpIdANDFromPage(Long empId) {
        String url = String.join((CharSequence)"/", this.fromPageCommentsListByEmpIdUrl, String.valueOf(empId));
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public RiskCommentsDTO updateCommentLike(RiskCommentsDTO riskCommentsDTO) {
        String url = this.dbUrl + "riskCommentLike";
        return (RiskCommentsDTO)this.commonRestTemplate.putForObject(url, (Object)riskCommentsDTO, RiskCommentsDTO.class);
    }
}

