/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.config.CommonRestTemplate
 *  com.estrat.web.dto.PosTradingHoursCountsDto
 *  com.estrat.web.dto.ProcessEnablerDto
 *  com.estrat.web.service.ProcessEnablerService
 *  com.estrat.web.service.ProcessEnablerService$1
 *  com.estrat.web.service.ProcessEnablerService$2
 *  com.estrat.web.service.ProcessEnablerService$3
 *  com.estrat.web.service.ProcessEnablerService$4
 *  com.estrat.web.service.ProcessEnablerService$5
 *  com.estrat.web.service.ProcessEnablerService$6
 *  com.estrat.web.service.ProcessEnablerService$7
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 *  org.springframework.web.util.UriComponentsBuilder
 */
package com.estrat.web.service;

import com.estrat.web.config.CommonRestTemplate;
import com.estrat.web.dto.PosTradingHoursCountsDto;
import com.estrat.web.dto.ProcessEnablerDto;
import com.estrat.web.service.ProcessEnablerService;
import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class ProcessEnablerService {
    @Autowired
    private CommonRestTemplate commonRestTemplate;
    @Value(value="${scorecard.service.url}")
    private String dbUrl;
    @Value(value="${scorecardService.processenabler.url}")
    private String url;
    @Value(value="${scorecardService.getallpos.url}")
    private String getAllurl;
    @Value(value="${scorecardService.getidpos.url}")
    private String getidUrl;
    @Value(value="${scorecardService.getallposByEmpId.url}")
    private String getposByEmpidUrl;
    @Value(value="${scorecardService.getallposByPageId.url}")
    private String getAllByPageIdUrl;
    @Value(value="${scorecardService.deletepos.url}")
    private String deleteUrl;
    @Value(value="${scorecardService.updatepos.url}")
    private String updateUrl;

    public ProcessEnablerDto saveProcessEnabler(ProcessEnablerDto processEnablerDto) {
        System.out.println("Service");
        System.out.println(processEnablerDto);
        return (ProcessEnablerDto)this.commonRestTemplate.postForObject(this.url, processEnablerDto, ProcessEnablerDto.class);
    }

    public List<ProcessEnablerDto> findAllProcessEnabler() {
        HashMap urlVariable = new HashMap();
        String urlbuilt = UriComponentsBuilder.fromHttpUrl((String)this.getAllurl).buildAndExpand(urlVariable).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference() {};
        return (List)this.commonRestTemplate.getForObject(urlbuilt, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public ProcessEnablerDto findPosById(long id) {
        String url = String.join((CharSequence)"/", this.getidUrl, String.valueOf(id));
        return (ProcessEnablerDto)this.commonRestTemplate.getForObject(url, ProcessEnablerDto.class);
    }

    public void removePos(long id) {
        String url = String.join((CharSequence)"/", this.deleteUrl, String.valueOf(id));
        this.commonRestTemplate.deleteForObject(url);
    }

    public ProcessEnablerDto updatePos(ProcessEnablerDto processEnablerDto) {
        return (ProcessEnablerDto)this.commonRestTemplate.putForObject(this.updateUrl, processEnablerDto, ProcessEnablerDto.class);
    }

    public List<ProcessEnablerDto> findAllByEmpId(Long empId) {
        String url = String.join((CharSequence)"/", this.getposByEmpidUrl, String.valueOf(empId));
        HashMap urlVariable = new HashMap();
        String urlbuilt = UriComponentsBuilder.fromHttpUrl((String)url).buildAndExpand(urlVariable).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference() {};
        return (List)this.commonRestTemplate.getForObject(urlbuilt, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<ProcessEnablerDto> findByAllPageId(long pageId, String dateRange, String status) {
        String url = UriComponentsBuilder.fromHttpUrl((String)this.getAllByPageIdUrl).queryParam("pageId", new Object[]{pageId}).queryParam("dateRange", new Object[]{dateRange}).queryParam("status", new Object[]{status}).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<ProcessEnablerDto> posListWithChild(long empId, String posPageIds, String dateRange) {
        String url = this.dbUrl + "/posListWithChild/" + empId;
        String finalUrl = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("posPageIds", new Object[]{posPageIds}).queryParam("dateRange", new Object[]{dateRange}).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference() {};
        List posDTOList = (List)this.commonRestTemplate.getForObject(finalUrl, (ParameterizedTypeReference)parameterizedTypeReference);
        return posDTOList;
    }

    public List<ProcessEnablerDto> posListWithDeptids(String deptIds) {
        String url = this.dbUrl + "/posListWithDeptids";
        String finalUrl = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("deptIds", new Object[]{deptIds}).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference() {};
        return (List)this.commonRestTemplate.getForObject(finalUrl, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<PosTradingHoursCountsDto> posTradingHoursCount(String posPageIds, String dateRange) {
        String url = this.dbUrl + "/posTradingHourseCount";
        String finalUrl = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("posPageIds", new Object[]{posPageIds}).queryParam("dateRange", new Object[]{dateRange}).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference() {};
        List posHourseCountDTOList = (List)this.commonRestTemplate.getForObject(finalUrl, (ParameterizedTypeReference)parameterizedTypeReference);
        return posHourseCountDTOList;
    }

    public List<ProcessEnablerDto> posHistoryList(Long posId, Long version) {
        String url = this.dbUrl + "/poshistorylist";
        String finalUrl = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("posId", new Object[]{posId}).queryParam("version", new Object[]{version}).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference() {};
        List riskDTOList = (List)this.commonRestTemplate.getForObject(finalUrl, (ParameterizedTypeReference)parameterizedTypeReference);
        return riskDTOList;
    }
}


