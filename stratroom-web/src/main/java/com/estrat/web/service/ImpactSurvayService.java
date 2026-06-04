/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.config.CommonRestTemplate
 *  com.estrat.web.dto.ImpactCrticalCountDTO
 *  com.estrat.web.dto.ImpactSurvayDto
 *  com.estrat.web.service.ImpactSurvayService
 *  com.estrat.web.service.ImpactSurvayService$1
 *  com.estrat.web.service.ImpactSurvayService$2
 *  com.estrat.web.service.ImpactSurvayService$3
 *  com.estrat.web.service.ImpactSurvayService$4
 *  com.estrat.web.service.ImpactSurvayService$5
 *  com.estrat.web.service.ImpactSurvayService$6
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 *  org.springframework.web.util.UriComponentsBuilder
 */
package com.estrat.web.service;

import com.estrat.web.config.CommonRestTemplate;
import com.estrat.web.dto.ImpactCrticalCountDTO;
import com.estrat.web.dto.ImpactSurvayDto;
import com.estrat.web.service.ImpactSurvayService;
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
    @Value(value="${scorecard.service.url}")
    private String dbUrl;
    @Value(value="${scorecardService.impactSurvay.url}")
    private String saveImpactUrl;
    @Value(value="${scorecardService.impactSurvay.getall.url}")
    private String getallImpactUrl;
    @Value(value="${scorecardService.impactSurvay.getid.url}")
    private String getIdImpactUrl;
    @Value(value="${scorecardService.impactSurvay.getallByEmpId.url}")
    private String getAllByEmpIdUrl;
    @Value(value="${scorecardService.impactSurvay.getallByPageId.url}")
    private String getAllByPageIdUrl;
    @Value(value="${scorecardService.impactSurvay.delete.url}")
    private String deleteImpactUrl;
    @Value(value="${scorecardService.impactSurvay.update.url}")
    private String updateImpactUrl;
    @Value(value="${scorecardService.impactSurvay.Downlode.url}")
    private String downlodeImpactUrl;

    public ImpactSurvayDto saveImpact(ImpactSurvayDto impactSurvayDto) {
        return (ImpactSurvayDto)this.commonRestTemplate.postForObject(this.saveImpactUrl, impactSurvayDto, ImpactSurvayDto.class);
    }

    public List<ImpactSurvayDto> findAllImpact() {
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference() {};
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
        return (ImpactSurvayDto)this.commonRestTemplate.putForObject(this.updateImpactUrl, impactSurvayDto, ImpactSurvayDto.class);
    }

    public List<ImpactSurvayDto> findAllImpactBYEmpId(Long empId) {
        String url = String.join((CharSequence)"/", this.getAllByEmpIdUrl, String.valueOf(empId));
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<ImpactSurvayDto> findByAllPageId(long pageId, String dateRange) {
        String url = UriComponentsBuilder.fromHttpUrl((String)this.getAllByPageIdUrl).queryParam("pageId", new Object[]{pageId}).queryParam("dateRange", new Object[]{dateRange}).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<ImpactSurvayDto> allImpactListData(String empId, String pageId) {
        String url1 = String.join((CharSequence)"/", this.downlodeImpactUrl, String.valueOf(empId));
        HashMap urlVariables = new HashMap();
        urlVariables.put("empId", empId);
        String url = UriComponentsBuilder.fromHttpUrl((String)url1).queryParam("pageId", new Object[]{pageId}).buildAndExpand(urlVariables).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference() {};
        List impactDTOList = (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
        return impactDTOList;
    }

    public List<ImpactSurvayDto> impactListWithDeptids(String deptIds) {
        String url = this.dbUrl + "/impactSurvayDeptids";
        String finalUrl = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("deptIds", new Object[]{deptIds}).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference() {};
        return (List)this.commonRestTemplate.getForObject(finalUrl, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<ImpactCrticalCountDTO> impactListWithPageIds(String pageIds, String dateRange) {
        String url = this.dbUrl + "/impactCriticalCount/";
        String finalUrl = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("pageIds", new Object[]{pageIds}).queryParam("dateRange", new Object[]{dateRange}).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference() {};
        List impactDTOList = (List)this.commonRestTemplate.getForObject(finalUrl, (ParameterizedTypeReference)parameterizedTypeReference);
        return impactDTOList;
    }
}


