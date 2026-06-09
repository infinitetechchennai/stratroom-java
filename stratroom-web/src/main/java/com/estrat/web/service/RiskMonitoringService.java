/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.config.CommonRestTemplate
 *  com.estrat.web.dto.RiskDTO
 *  com.estrat.web.dto.RiskMonitoringDTO
 *  com.estrat.web.dto.RiskResponseDTO
 *  com.estrat.web.service.RiskMonitoringService
 *  com.estrat.web.service.RiskMonitoringService$1
 *  com.estrat.web.service.RiskMonitoringService$2
 *  com.estrat.web.service.RiskMonitoringService$3
 *  com.estrat.web.service.RiskMonitoringService$4
 *  com.estrat.web.util.DateUtil
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 *  org.springframework.web.util.UriComponentsBuilder
 */
package com.estrat.web.service;

import com.estrat.web.config.CommonRestTemplate;
import com.estrat.web.dto.RiskDTO;
import com.estrat.web.dto.RiskMonitoringDTO;
import com.estrat.web.dto.RiskResponseDTO;
import com.estrat.web.service.RiskMonitoringService;
import com.estrat.web.util.DateUtil;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class RiskMonitoringService {
    @Autowired
    private CommonRestTemplate commonRestTemplate;
    @Value(value="${scorecardservice.riskmonitoring.url}")
    private String riskUrl;
    @Value(value="${scorecardservice.riskmonitoring.riskid.list.url}")
    private String riskActivitiesListByRiskIdUrl;
    @Value(value="${scorecardservice.riskmonitoring.empid.list.url}")
    private String riskActivitiesListByEmpIdUrl;
    @Value(value="${scorecardservice.riskmonitoring.empid.listwithchild.url}")
    private String riskMonitoringListWithChildUrl;
    @Value(value="${scorecardservice.riskmonitoring.deptId.listwithdepartment.url}")
    private String riskMonitorListWithDeptidsUrl;

    public RiskResponseDTO saveRiskMonitoring(RiskMonitoringDTO riskMonitoringDTO) {
        return (RiskResponseDTO)this.commonRestTemplate.postForObject(this.riskUrl, riskMonitoringDTO, RiskResponseDTO.class);
    }

    public RiskResponseDTO updateRiskMonitoring(RiskMonitoringDTO riskMonitoringDTO) {
        return (RiskResponseDTO)this.commonRestTemplate.putForObject(this.riskUrl, riskMonitoringDTO, RiskResponseDTO.class);
    }

    public RiskMonitoringDTO retrieveRiskMonitoring(Long id) {
        String url = String.join((CharSequence)"/", this.riskUrl, String.valueOf(id));
        RiskMonitoringDTO riskMonitoringDTO = (RiskMonitoringDTO)this.commonRestTemplate.getForObject(url, RiskMonitoringDTO.class);
        riskMonitoringDTO.setCreateDateString(DateUtil.mapToString((LocalDateTime)riskMonitoringDTO.getCreatedTime()));
        riskMonitoringDTO.setUpdatedDateString(DateUtil.mapToString((LocalDateTime)riskMonitoringDTO.getUpdatedTime()));
        return riskMonitoringDTO;
    }

    public void removeRiskMonitoring(Long id) {
        String url = String.join((CharSequence)"/", this.riskUrl, String.valueOf(id));
        this.commonRestTemplate.deleteForObject(url);
    }

    public List<RiskMonitoringDTO> findAllByRiskId(Long riskId) {
        String url = String.join((CharSequence)"/", this.riskActivitiesListByRiskIdUrl, String.valueOf(riskId));
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<RiskMonitoringDTO> findAllByEmpId(Long empId) {
        String url = String.join((CharSequence)"/", this.riskActivitiesListByEmpIdUrl, String.valueOf(empId));
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<RiskMonitoringDTO> riskMonitorListWithChild(long empId, String riskIds, String dateRange) {
        String url = String.join((CharSequence)"/", this.riskMonitoringListWithChildUrl, String.valueOf(empId));
        String finalUrl = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("riskIds", new Object[]{riskIds}).queryParam("dateRange", new Object[]{dateRange}).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        List riskMonitorDTOList = (List)this.commonRestTemplate.getForObject(finalUrl, (ParameterizedTypeReference)parameterizedTypeReference);
        return riskMonitorDTOList;
    }

    public List<RiskDTO> riskMonitorListWithDeptids(String deptIds) {
        String finalUrl = UriComponentsBuilder.fromHttpUrl((String)this.riskMonitorListWithDeptidsUrl).queryParam("deptIds", new Object[]{deptIds}).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(finalUrl, (ParameterizedTypeReference)parameterizedTypeReference);
    }
}


