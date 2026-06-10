/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.scorecard.config.CommonRestTemplate
 *  com.estrat.scorecard.dto.PosTradingHoursCountsDto
 *  com.estrat.scorecard.dto.ProcessEnablerDto
 *  com.estrat.scorecard.service.ProcessEnablerService
 *  com.estrat.scorecard.service.ProcessEnablerService$1
 *  com.estrat.scorecard.service.ProcessEnablerService$2
 *  com.estrat.scorecard.service.ProcessEnablerService$3
 *  com.estrat.scorecard.service.ProcessEnablerService$4
 *  com.estrat.scorecard.service.ProcessEnablerService$5
 *  com.estrat.scorecard.service.ProcessEnablerService$6
 *  com.estrat.scorecard.service.ProcessEnablerService$7
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 *  org.springframework.web.util.UriComponentsBuilder
 */
package com.estrat.scorecard.service;

import com.estrat.scorecard.config.CommonRestTemplate;
import com.estrat.scorecard.dto.PosTradingHoursCountsDto;
import com.estrat.scorecard.dto.ProcessEnablerDto;
import com.estrat.scorecard.service.ProcessEnablerService;
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
    @Value(value="${dbservice.url}")
    private String dbUrl;
    @Value(value="${dbService.processenabler.url}")
    private String procesEnableUrl;
    @Value(value="${dbService.getallpos.url}")
    private String getallUrl;
    @Value(value="${dbService.gitidpos.url}")
    private String getidUrl;
    @Value(value="${dbService.getallposByEmpid.url}")
    private String getPosByEmpIdUrl;
    @Value(value="${dbService.getallposByPageid.url}")
    private String getAllByPageIdUrl;
    @Value(value="${dbService.deletepos.url}")
    private String deleteUrl;
    @Value(value="${dbService.updatepos.url}")
    private String updateUrl;

    public ProcessEnablerDto saveProcessEnabler(ProcessEnablerDto processEnablerDto) {
        System.out.println("Scorecard");
        System.out.println(processEnablerDto);
        return (ProcessEnablerDto)this.commonRestTemplate.postForObject(this.procesEnableUrl, (Object)processEnablerDto, ProcessEnablerDto.class);
    }

    public List<ProcessEnablerDto> findAllProcessEnabler() {
        HashMap urlVariable = new HashMap();
        String urlbuilt = UriComponentsBuilder.fromHttpUrl((String)this.getallUrl).buildAndExpand(urlVariable).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
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
        return (ProcessEnablerDto)this.commonRestTemplate.putForObject(this.updateUrl, (Object)processEnablerDto, ProcessEnablerDto.class);
    }

    public List<ProcessEnablerDto> findAllByEmpId(Long empId) {
        String url = String.join((CharSequence)"/", this.getPosByEmpIdUrl, String.valueOf(empId));
        HashMap urlVariable = new HashMap();
        String urlbuilt = UriComponentsBuilder.fromHttpUrl((String)url).buildAndExpand(urlVariable).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(urlbuilt, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<ProcessEnablerDto> findByAllPageId(long pageId, String dateRange, String status) {
        String url = UriComponentsBuilder.fromHttpUrl((String)this.getAllByPageIdUrl).queryParam("pageId", new Object[]{pageId}).queryParam("dateRange", new Object[]{dateRange}).queryParam("status", new Object[]{status}).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<ProcessEnablerDto> posListWithChild(long empId, String posPageIds, String dateRange) {
        String url = this.dbUrl + "/posListWithChild/" + empId;
        String finalUrl = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("posPageIds", new Object[]{posPageIds}).queryParam("dateRange", new Object[]{dateRange}).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        List posDTOList = (List)this.commonRestTemplate.getForObject(finalUrl, (ParameterizedTypeReference)parameterizedTypeReference);
        return posDTOList;
    }

    public List<ProcessEnablerDto> posListWithDeptids(String deptIds) {
        String url = this.dbUrl + "/posListWithDeptids";
        String finalUrl = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("deptIds", new Object[]{deptIds}).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(finalUrl, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<PosTradingHoursCountsDto> posTradingHoursCount(String posPageIds, String dateRange) {
        String url = this.dbUrl + "/posTradingHourseCount";
        String finalUrl = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("posPageIds", new Object[]{posPageIds}).queryParam("dateRange", new Object[]{dateRange}).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        List posHourseCountDTOList = (List)this.commonRestTemplate.getForObject(finalUrl, (ParameterizedTypeReference)parameterizedTypeReference);
        return posHourseCountDTOList;
    }

    public List<ProcessEnablerDto> posHistoryList(Long posId, Long version) {
        String url = this.dbUrl + "/poshistorylist";
        String finalUrl = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("posId", new Object[]{posId}).queryParam("version", new Object[]{version}).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        List riskDTOList = (List)this.commonRestTemplate.getForObject(finalUrl, (ParameterizedTypeReference)parameterizedTypeReference);
        return riskDTOList;
    }
}

