/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.config.CommonRestTemplate
 *  com.estrat.web.dto.EmployeeDocumentsDTO
 *  com.estrat.web.dto.KPIResponseDTO
 *  com.estrat.web.dto.PerformanceContractDTO
 *  com.estrat.web.dto.SubKPIDTO
 *  com.estrat.web.service.DocumentService
 *  com.estrat.web.service.SubKPIService
 *  com.estrat.web.service.SubKPIService$1
 *  com.estrat.web.service.SubKPIService$2
 *  com.estrat.web.service.SubKPIService$3
 *  com.estrat.web.util.DateUtil
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.http.HttpStatus
 *  org.springframework.http.ResponseEntity
 *  org.springframework.stereotype.Service
 *  org.springframework.web.util.UriComponentsBuilder
 */
package com.estrat.web.service;

import com.estrat.web.config.CommonRestTemplate;
import com.estrat.web.dto.EmployeeDocumentsDTO;
import com.estrat.web.dto.KPIResponseDTO;
import com.estrat.web.dto.PerformanceContractDTO;
import com.estrat.web.dto.SubKPIDTO;
import com.estrat.web.service.DocumentService;
import com.estrat.web.service.SubKPIService;
import com.estrat.web.util.DateUtil;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class SubKPIService {
    @Value(value="${scorecard.service.url}")
    private String scoreCardUrl;
    @Autowired
    private CommonRestTemplate commonRestTemplate;
    @Autowired
    private DocumentService documentService;

    public ResponseEntity<SubKPIDTO> getSubKpiDetails(long id, boolean flag) {
        String url = this.scoreCardUrl + "/subKpi/" + id;
        String kpiUrl = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("statusLightFlag", new Object[]{flag}).toUriString();
        SubKPIDTO kpi1 = (SubKPIDTO)this.commonRestTemplate.getForObject(kpiUrl, SubKPIDTO.class);
        kpi1.setCreateDateString(DateUtil.mapToString((LocalDateTime)kpi1.getCreatedTime()));
        kpi1.setUpdatedDateString(DateUtil.mapToString((LocalDateTime)kpi1.getUpdatedTime()));
        return new ResponseEntity(kpi1, HttpStatus.OK);
    }

    public ResponseEntity<SubKPIDTO> saveOrUpdateDetails(SubKPIDTO kpi, String action) {
        if (action.equalsIgnoreCase("Save")) {
            String url = this.scoreCardUrl + "/subKpi";
            SubKPIDTO kpi1 = (SubKPIDTO)this.commonRestTemplate.postForObject(url, kpi, SubKPIDTO.class);
            return new ResponseEntity(kpi1, HttpStatus.OK);
        }
        String url = this.scoreCardUrl + "/subKpi";
        SubKPIDTO kpi1 = (SubKPIDTO)this.commonRestTemplate.putForObject(url, kpi, SubKPIDTO.class);
        return new ResponseEntity(kpi1, HttpStatus.OK);
    }

    public ResponseEntity<Boolean> deleteKPIById(long id) {
        String url = this.scoreCardUrl + "/subKpi/" + id;
        this.commonRestTemplate.deleteForObject(url);
        return new ResponseEntity(true, HttpStatus.OK);
    }

    public ResponseEntity<List<SubKPIDTO>> getSubKpiListWithObjId(long objId) {
        String url = this.scoreCardUrl + "/v2/subkpiList/" + objId;
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        List kpi1 = (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
        return new ResponseEntity(kpi1, HttpStatus.OK);
    }

    public PerformanceContractDTO saveOrgSubKpiDetails(PerformanceContractDTO performanceContractDTO) {
        String url = this.scoreCardUrl + "/web/saveSubkpiEntry";
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference_elem = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        if (performanceContractDTO.getEmployeeDocuments() != null) {
            System.out.println("Enter in doucemnts");
            EmployeeDocumentsDTO documents = performanceContractDTO.getEmployeeDocuments();
            documents.setCreatedBy(performanceContractDTO.getCreatedBy());
            this.documentService.saveEmployeeDocuments(documents);
            System.out.println("save and Exit in doucemnts");
        }
        return (PerformanceContractDTO)this.commonRestTemplate.postForObject(url, performanceContractDTO, PerformanceContractDTO.class);
    }

    public ResponseEntity<KPIResponseDTO> retrieveSubKpiFormDataList(String scorecardId, boolean ownerFlag) {
        HashMap urlVariables = new HashMap();
        urlVariables.put("scorecardId", scorecardId);
        String url = this.scoreCardUrl + "/subkpiEntryList/{scorecardId}";
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("employeeView", new Object[]{ownerFlag}).buildAndExpand(urlVariables).toUriString();
        KPIResponseDTO kpiResponseDTO = (KPIResponseDTO)this.commonRestTemplate.getForObject(pageURL, KPIResponseDTO.class);
        return new ResponseEntity(kpiResponseDTO, HttpStatus.OK);
    }

    public List<PerformanceContractDTO> findAllByEmpId(String empId) {
        String url1 = this.scoreCardUrl + "/getPerformanceEntry";
        String url = String.join((CharSequence)"/", url1, String.valueOf(empId));
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }
}


