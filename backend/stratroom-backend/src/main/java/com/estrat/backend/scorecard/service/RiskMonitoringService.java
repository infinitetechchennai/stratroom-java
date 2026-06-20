/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.scorecard.config.CommonRestTemplate
 *  com.estrat.backend.scorecard.dto.RiskDTO
 *  com.estrat.backend.scorecard.dto.RiskMonitoringDTO
 *  com.estrat.backend.scorecard.dto.RiskResponseDTO
 *  com.estrat.backend.scorecard.service.RiskMonitoringService
 *  com.estrat.backend.scorecard.service.RiskMonitoringService$1
 *  com.estrat.backend.scorecard.service.RiskMonitoringService$2
 *  com.estrat.backend.scorecard.service.RiskMonitoringService$3
 *  com.estrat.backend.scorecard.service.RiskMonitoringService$4
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 *  org.springframework.web.client.RestTemplate
 *  org.springframework.web.util.UriComponentsBuilder
 */
package com.estrat.backend.scorecard.service;

import com.estrat.backend.scorecard.config.CommonRestTemplate;
import com.estrat.backend.scorecard.dto.RiskDTO;
import com.estrat.backend.scorecard.dto.RiskMonitoringDTO;
import com.estrat.backend.scorecard.dto.RiskResponseDTO;
import com.estrat.backend.scorecard.service.RiskMonitoringService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class RiskMonitoringService {
    @Autowired
    private CommonRestTemplate commonRestTemplate;
    @Autowired
    private RestTemplate restTemplate;
    @Value(value="${dbservice.riskmonitoring.url}")
    private String riskUrl;
    @Value(value="${dbservice.riskmonitoring.riskid.list.url}")
    private String riskActivitiesListByRiskIdUrl;
    @Value(value="${dbservice.riskmonitoring.empid.list.url}")
    private String riskActivitiesListByEmpIdUrl;
    @Value(value="${dbservice.riskmonitoring.empid.listwithChild.url}")
    private String riskMonitoringListWithChildUrl;
    @Value(value="${dbservice.riskmonitoring.deptId.listwithDepartment.url}")
    private String riskMonitorListWithDeptidsUrl;

    public RiskResponseDTO saveRiskMonitoring(RiskMonitoringDTO riskMonitoringDTO) {
        return (RiskResponseDTO)this.commonRestTemplate.postForObject(this.riskUrl, (Object)riskMonitoringDTO, RiskResponseDTO.class);
    }

    public RiskResponseDTO updateRiskMonitoring(RiskMonitoringDTO riskMonitoringDTO) {
        return (RiskResponseDTO)this.commonRestTemplate.putForObject(this.riskUrl, (Object)riskMonitoringDTO, RiskResponseDTO.class);
    }

    public RiskMonitoringDTO retrieveRiskMonitoring(Long id) {
        String url = String.join((CharSequence)"/", this.riskUrl, String.valueOf(id));
        return (RiskMonitoringDTO)this.commonRestTemplate.getForObject(url, RiskMonitoringDTO.class);
    }

    public void removeRiskMonitoring(Long id) {
        String url = String.join((CharSequence)"/", this.riskUrl, String.valueOf(id));
        this.commonRestTemplate.deleteForObject(url);
    }

    public List<RiskMonitoringDTO> findAllByRiskId(Long riskId) {
        String url = String.join((CharSequence)"/", this.riskActivitiesListByRiskIdUrl, String.valueOf(riskId));
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<RiskMonitoringDTO> findAllByEmpId(Long empId) {
        String url = String.join((CharSequence)"/", this.riskActivitiesListByEmpIdUrl, String.valueOf(empId));
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<RiskMonitoringDTO> riskMonitorListWithChild(long empId, String riskIds, String dateRange) {
        String url = String.join((CharSequence)"/", this.riskMonitoringListWithChildUrl, String.valueOf(empId));
        String finalUrl = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("riskIds", new Object[]{riskIds}).queryParam("dateRange", new Object[]{dateRange}).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        List riskMonitorDTOList = (List)this.commonRestTemplate.getForObject(finalUrl, (ParameterizedTypeReference)parameterizedTypeReference);
        return riskMonitorDTOList;
    }

    public List<RiskDTO> riskMonitorListWithDeptids(String deptIds) {
        String finalUrl = UriComponentsBuilder.fromHttpUrl((String)this.riskMonitorListWithDeptidsUrl).queryParam("deptIds", new Object[]{deptIds}).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(finalUrl, (ParameterizedTypeReference)parameterizedTypeReference);
    }
}

