/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.scorecard.config.CommonRestTemplate
 *  com.estrat.scorecard.dto.MilestonesDTO
 *  com.estrat.scorecard.service.MilestonesService
 *  com.estrat.scorecard.service.MilestonesService$1
 *  com.estrat.scorecard.service.MilestonesService$2
 *  com.estrat.scorecard.service.MilestonesService$3
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 *  org.springframework.web.client.RestTemplate
 */
package com.estrat.scorecard.service;

import com.estrat.scorecard.config.CommonRestTemplate;
import com.estrat.scorecard.dto.MilestonesDTO;
import com.estrat.scorecard.service.MilestonesService;
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
    @Value(value="${dbservice.url}")
    private String dbUri;
    @Autowired
    private RestTemplate restTemplate;
    @Value(value="${dbservice.milestone.url}")
    private String dbUrl;
    @Value(value="${dbservice.milestone.list.url}")
    private String mileStoneListUrl;
    @Value(value="${dbservice.milestone.emplist.url}")
    private String mileStoneEmpListUrl;

    public MilestonesDTO createMilestones(MilestonesDTO milestonesDTO) {
        return (MilestonesDTO)this.commonRestTemplate.postForObject(this.dbUrl, (Object)milestonesDTO, MilestonesDTO.class);
    }

    public MilestonesDTO updateMilestones(MilestonesDTO milestonesDTO) {
        return (MilestonesDTO)this.commonRestTemplate.putForObject(this.dbUrl, (Object)milestonesDTO, MilestonesDTO.class);
    }

    public MilestonesDTO retriveMilestones(Long id) {
        String url = String.join((CharSequence)"/", this.dbUrl, String.valueOf(id));
        return (MilestonesDTO)this.commonRestTemplate.getForObject(url, MilestonesDTO.class);
    }

    public void removeMilestones(Long id) {
        String url = String.join((CharSequence)"/", this.dbUrl, String.valueOf(id));
        this.commonRestTemplate.deleteForObject(url);
    }

    public List<MilestonesDTO> findAllByInitiativesId(Long initiativeId) {
        String url = String.join((CharSequence)"/", this.mileStoneListUrl, String.valueOf(initiativeId));
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<MilestonesDTO> findAllMilestonesList(Long initiativeId) {
        String uri = this.dbUri + "findAllMilestonesList";
        String url = String.join((CharSequence)"/", uri, String.valueOf(initiativeId));
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<MilestonesDTO> findAllByEmpId(Long empId) {
        String url = String.join((CharSequence)"/", this.mileStoneEmpListUrl, String.valueOf(empId));
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }
}

