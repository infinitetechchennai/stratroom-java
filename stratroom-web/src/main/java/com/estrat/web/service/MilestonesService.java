/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.config.CommonRestTemplate
 *  com.estrat.web.dto.MilestonesDTO
 *  com.estrat.web.service.MilestonesService
 *  com.estrat.web.service.MilestonesService$1
 *  com.estrat.web.service.MilestonesService$2
 *  com.estrat.web.service.MilestonesService$3
 *  com.estrat.web.util.DateUtil
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 *  org.springframework.web.client.RestTemplate
 */
package com.estrat.web.service;

import com.estrat.web.config.CommonRestTemplate;
import com.estrat.web.dto.MilestonesDTO;
import com.estrat.web.service.MilestonesService;
import com.estrat.web.util.DateUtil;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class MilestonesService {
    @Autowired
    private CommonRestTemplate commonRestTemplate;
    @Autowired
    private RestTemplate restTemplate;
    @Value(value="${scorecard.service.url}")
    private String scorecardUrl;
    @Value(value="${scorecardservice.milestone.url}")
    private String dbUrl;
    @Value(value="${scorecardservice.milestone.list.url}")
    private String mileStoneListUrl;
    @Value(value="${dbservice.milestone.emplist.url}")
    private String mileStoneEmpListUrl;

    public MilestonesDTO createMilestones(MilestonesDTO milestonesDTO) {
        return (MilestonesDTO)this.commonRestTemplate.postForObject(this.dbUrl, milestonesDTO, MilestonesDTO.class);
    }

    public MilestonesDTO updateMilestones(MilestonesDTO milestonesDTO) {
        return (MilestonesDTO)this.commonRestTemplate.putForObject(this.dbUrl, milestonesDTO, MilestonesDTO.class);
    }

    public MilestonesDTO retriveMilestones(Long id) {
        String url = String.join((CharSequence)"/", this.dbUrl, String.valueOf(id));
        MilestonesDTO milestonesDTO = (MilestonesDTO)this.commonRestTemplate.getForObject(url, MilestonesDTO.class);
        milestonesDTO.setCreateDateString(DateUtil.mapToString((LocalDateTime)milestonesDTO.getCreatedTime()));
        milestonesDTO.setUpdatedDateString(DateUtil.mapToString((LocalDateTime)milestonesDTO.getUpdatedTime()));
        return milestonesDTO;
    }

    public void removeMilestones(Long id) {
        String url = String.join((CharSequence)"/", this.dbUrl, String.valueOf(id));
        this.commonRestTemplate.deleteForObject(url);
    }

    public List<MilestonesDTO> findAllByInitiativesId(Long initiativeId) {
        String url = String.join((CharSequence)"/", this.mileStoneListUrl, String.valueOf(initiativeId));
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<MilestonesDTO> findAllByEmpId(String empId) {
        String url = String.join((CharSequence)"/", this.mileStoneEmpListUrl, String.valueOf(empId));
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<MilestonesDTO> findAllMilestonesList(Long initiativeId) {
        String uri = this.scorecardUrl + "/findAllMilestonesList";
        String url = String.join((CharSequence)"/", uri, String.valueOf(initiativeId));
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }
}


