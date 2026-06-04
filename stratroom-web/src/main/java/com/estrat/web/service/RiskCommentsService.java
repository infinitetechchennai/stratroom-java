/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.config.CommonRestTemplate
 *  com.estrat.web.dto.RiskCommentsDTO
 *  com.estrat.web.dto.RiskResponseDTO
 *  com.estrat.web.service.RiskCommentsService
 *  com.estrat.web.service.RiskCommentsService$1
 *  com.estrat.web.service.RiskCommentsService$2
 *  com.estrat.web.service.RiskCommentsService$3
 *  com.estrat.web.util.DateUtil
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 */
package com.estrat.web.service;

import com.estrat.web.config.CommonRestTemplate;
import com.estrat.web.dto.RiskCommentsDTO;
import com.estrat.web.dto.RiskResponseDTO;
import com.estrat.web.service.RiskCommentsService;
import com.estrat.web.util.DateUtil;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;

@Service
public class RiskCommentsService {
    @Autowired
    private CommonRestTemplate commonRestTemplate;
    @Value(value="${scorecardservice.riskcomments.url}")
    private String riskUrl;
    @Value(value="${scorecard.service.url}")
    private String scorecardUrl;
    @Value(value="${scorecardservice.riskcomments.riskid.list.url}")
    private String riskCommentsListByRiskIdUrl;
    @Value(value="${scorecardservice.riskcomments.empid.list.url}")
    private String riskCommentsListByEmpIdUrl;
    @Value(value="${scorecardservice.riskcomments.empfrompage.list.url}")
    private String fromPageCommentsListByEmpIdUrl;

    public RiskResponseDTO saveRiskComments(RiskCommentsDTO riskCommentsDTO) {
        return (RiskResponseDTO)this.commonRestTemplate.postForObject(this.riskUrl, riskCommentsDTO, RiskResponseDTO.class);
    }

    public RiskResponseDTO updateRiskComments(RiskCommentsDTO riskCommentsDTO) {
        return (RiskResponseDTO)this.commonRestTemplate.putForObject(this.riskUrl, riskCommentsDTO, RiskResponseDTO.class);
    }

    public RiskCommentsDTO retrieveRiskComments(Long id) {
        String url = String.join((CharSequence)"/", this.riskUrl, String.valueOf(id));
        RiskCommentsDTO riskCommentsDTO = (RiskCommentsDTO)this.commonRestTemplate.getForObject(url, RiskCommentsDTO.class);
        riskCommentsDTO.setCreateDateString(DateUtil.mapToString((LocalDateTime)riskCommentsDTO.getCreatedTime()));
        riskCommentsDTO.setUpdatedDateString(DateUtil.mapToString((LocalDateTime)riskCommentsDTO.getUpdatedTime()));
        return riskCommentsDTO;
    }

    public void removeRiskComments(Long id) {
        String url = String.join((CharSequence)"/", this.riskUrl, String.valueOf(id));
        this.commonRestTemplate.deleteForObject(url);
    }

    public List<RiskCommentsDTO> findAllByRiskId(Long riskId) {
        String url = String.join((CharSequence)"/", this.riskCommentsListByRiskIdUrl, String.valueOf(riskId));
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<RiskCommentsDTO> findAllByEmpId(Long empId) {
        String url = String.join((CharSequence)"/", this.riskCommentsListByEmpIdUrl, String.valueOf(empId));
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<RiskCommentsDTO> findAllByEmpIdANDFromPage(Long empId) {
        String url = String.join((CharSequence)"/", this.fromPageCommentsListByEmpIdUrl, String.valueOf(empId));
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public RiskCommentsDTO updateCommentLike(RiskCommentsDTO riskCommentsDTO) {
        String url = String.join((CharSequence)"/", this.scorecardUrl, "riskCommentLike");
        return (RiskCommentsDTO)this.commonRestTemplate.putForObject(url, riskCommentsDTO, RiskCommentsDTO.class);
    }
}


