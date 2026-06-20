/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.scorecard.config.CommonRestTemplate
 *  com.estrat.backend.scorecard.dto.ImpactCrticalCountDTO
 *  com.estrat.backend.scorecard.dto.ImpactSurvayDto
 *  com.estrat.backend.scorecard.service.ImpactSurvayService
 *  com.estrat.backend.scorecard.service.ImpactSurvayService$1
 *  com.estrat.backend.scorecard.service.ImpactSurvayService$2
 *  com.estrat.backend.scorecard.service.ImpactSurvayService$3
 *  com.estrat.backend.scorecard.service.ImpactSurvayService$4
 *  com.estrat.backend.scorecard.service.ImpactSurvayService$5
 *  com.estrat.backend.scorecard.service.ImpactSurvayService$6
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 *  org.springframework.web.util.UriComponentsBuilder
 */
package com.estrat.backend.scorecard.service;

import com.estrat.backend.scorecard.config.CommonRestTemplate;
import com.estrat.backend.scorecard.dto.ImpactCrticalCountDTO;
import com.estrat.backend.scorecard.dto.ImpactSurvayDto;
import com.estrat.backend.scorecard.service.ImpactSurvayService;
import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class ImpactSurvayService {
    @Autowired
    private CommonRestTemplate commonRestTemplate;
    @Value(value="${dbservice.url}")
    private String dbUrl;
    @Value(value="${dbService.impactsurvay.url}")
    private String saveImpactUrl;
    @Value(value="${dbService.impactsurvay.getall.url}")
    private String getallImpactUrl;
    @Value(value="${dbService.impactsurvay.getid.url}")
    private String getIdImpactUrl;
    @Value(value="${dbService.impactsurvay.getallBYEmpId.url}")
    private String getAllByEmpIdUrl;
    @Value(value="${dbService.impactsurvay.getallByPageId.url}")
    private String getAllByPageIdUrl;
    @Value(value="${dbService.impactsurvay.delete.url}")
    private String deleteImpactUrl;
    @Value(value="${dbService.impactsurvay.update.url}")
    private String updateImpactUrl;
    @Value(value="${dbService.impactsurvay.Downlode.url}")
    private String downlodeImpactUrl;

    public ImpactSurvayDto saveImpact(ImpactSurvayDto impactSurvayDto) {
        return (ImpactSurvayDto)this.commonRestTemplate.postForObject(this.saveImpactUrl, (Object)impactSurvayDto, ImpactSurvayDto.class);
    }

    public List<ImpactSurvayDto> findAllImpact() {
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(this.getallImpactUrl, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public ImpactSurvayDto findImpactById(long id) {
        String url = String.join((CharSequence)"/", this.getIdImpactUrl, String.valueOf(id));
        return (ImpactSurvayDto)this.commonRestTemplate.getForObject(url, ImpactSurvayDto.class);
    }

    public void removeImpact(long id) {
        String url = String.join((CharSequence)"/", this.deleteImpactUrl, String.valueOf(id));
        this.commonRestTemplate.deleteForObject(url);
    }

    public ImpactSurvayDto updateImpact(ImpactSurvayDto impactSurvayDto) {
        return (ImpactSurvayDto)this.commonRestTemplate.putForObject(this.updateImpactUrl, (Object)impactSurvayDto, ImpactSurvayDto.class);
    }

    public List<ImpactSurvayDto> findAllImpactBYEmpId(Long empId) {
        String url = String.join((CharSequence)"/", this.getAllByEmpIdUrl, String.valueOf(empId));
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<ImpactSurvayDto> findByAllPageId(long pageId, String dateRange) {
        String url = UriComponentsBuilder.fromHttpUrl((String)this.getAllByPageIdUrl).queryParam("pageId", new Object[]{pageId}).queryParam("dateRange", new Object[]{dateRange}).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<ImpactSurvayDto> allImpactListData(String empId, String pageId) {
        String url1 = String.join((CharSequence)"/", this.downlodeImpactUrl, String.valueOf(empId));
        HashMap<String, String> urlVariables = new HashMap<String, String>();
        urlVariables.put("empId", empId);
        String url = UriComponentsBuilder.fromHttpUrl((String)url1).queryParam("pageId", new Object[]{pageId}).buildAndExpand(urlVariables).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        List impactDTOList = (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
        return impactDTOList;
    }

    public List<ImpactSurvayDto> impactListWithDeptids(String deptIds) {
        String url = this.dbUrl + "/impactSurvayDeptids";
        String finalUrl = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("deptIds", new Object[]{deptIds}).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(finalUrl, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<ImpactCrticalCountDTO> impactListWithPageIds(String pageIds, String dateRange) {
        String url = this.dbUrl + "/impactCriticalCount/";
        String finalUrl = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("pageIds", new Object[]{pageIds}).queryParam("dateRange", new Object[]{dateRange}).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        List impactDTOList = (List)this.commonRestTemplate.getForObject(finalUrl, (ParameterizedTypeReference)parameterizedTypeReference);
        return impactDTOList;
    }
}

