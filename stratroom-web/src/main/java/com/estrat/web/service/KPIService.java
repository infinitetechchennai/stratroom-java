/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.config.CommonRestTemplate
 *  com.estrat.web.dto.KPICriteriaDTO
 *  com.estrat.web.dto.KPIDTO
 *  com.estrat.web.dto.KPIDetailsDTO
 *  com.estrat.web.dto.KPIFormula
 *  com.estrat.web.dto.KPIResponseDTO
 *  com.estrat.web.dto.KpiDetailsAttachmentsDTO
 *  com.estrat.web.dto.KpiList
 *  com.estrat.web.dto.TargetDTO
 *  com.estrat.web.service.KPIService
 *  com.estrat.web.service.KPIService$1
 *  com.estrat.web.service.KPIService$10
 *  com.estrat.web.service.KPIService$11
 *  com.estrat.web.service.KPIService$12
 *  com.estrat.web.service.KPIService$13
 *  com.estrat.web.service.KPIService$14
 *  com.estrat.web.service.KPIService$15
 *  com.estrat.web.service.KPIService$16
 *  com.estrat.web.service.KPIService$17
 *  com.estrat.web.service.KPIService$18
 *  com.estrat.web.service.KPIService$19
 *  com.estrat.web.service.KPIService$2
 *  com.estrat.web.service.KPIService$20
 *  com.estrat.web.service.KPIService$3
 *  com.estrat.web.service.KPIService$4
 *  com.estrat.web.service.KPIService$5
 *  com.estrat.web.service.KPIService$6
 *  com.estrat.web.service.KPIService$7
 *  com.estrat.web.service.KPIService$8
 *  com.estrat.web.service.KPIService$9
 *  com.estrat.web.util.DateUtil
 *  com.estrat.web.util.UserThreadLocal
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
import com.estrat.web.dto.KPICriteriaDTO;
import com.estrat.web.dto.KPIDTO;
import com.estrat.web.dto.KPIDetailsDTO;
import com.estrat.web.dto.KPIFormula;
import com.estrat.web.dto.KPIResponseDTO;
import com.estrat.web.dto.KpiDetailsAttachmentsDTO;
import com.estrat.web.dto.KpiList;
import com.estrat.web.dto.TargetDTO;
import com.estrat.web.service.KPIService;
import com.estrat.web.util.DateUtil;
import com.estrat.web.util.UserThreadLocal;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class KPIService {
    @Value(value="${scorecard.service.url}")
    private String scoreCardUrl;
    @Value(value="${scorecard.service.url.empView}")
    private String scoreCardEmpView;
    @Value(value="${scorecardservice.kpi.target.url}")
    private String kpiTargetUrl;
    @Autowired
    private CommonRestTemplate commonRestTemplate;

    public ResponseEntity<KPIDTO> getKpiDetails(long id, boolean flag) {
        String url = this.scoreCardUrl + "/kpi/" + id;
        String kpiUrl = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("statusLightFlag", new Object[]{flag}).toUriString();
        KPIDTO kpi1 = (KPIDTO)this.commonRestTemplate.getForObject(kpiUrl, KPIDTO.class);
        kpi1.setCreateDateString(DateUtil.mapToString((LocalDateTime)kpi1.getCreatedTime()));
        kpi1.setUpdatedDateString(DateUtil.mapToString((LocalDateTime)kpi1.getUpdatedTime()));
        return new ResponseEntity(kpi1, HttpStatus.OK);
    }

    public ResponseEntity<List<KPIDTO>> getKpiList(boolean employeeView) {
        String url = this.scoreCardUrl + "/kpiList";
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("employeeView", new Object[]{employeeView}).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        List kpi1 = (List)this.commonRestTemplate.getForObject(pageURL, (ParameterizedTypeReference)parameterizedTypeReference);
        return new ResponseEntity(kpi1, HttpStatus.OK);
    }

    public ResponseEntity<KPIDTO> saveOrUpdateDetails(KPIDTO kpi, String action) {
        if (action.equalsIgnoreCase("Save")) {
            String url = this.scoreCardUrl + "/kpi";
            KPIDTO kpi1 = (KPIDTO)this.commonRestTemplate.postForObject(url, kpi, KPIDTO.class);
            return new ResponseEntity(kpi1, HttpStatus.OK);
        }
        String url = this.scoreCardUrl + "/kpi";
        KPIDTO kpi1 = (KPIDTO)this.commonRestTemplate.putForObject(url, kpi, KPIDTO.class);
        return new ResponseEntity(kpi1, HttpStatus.OK);
    }

    public KPIDetailsDTO saveOrgKpiDetails(KPIDetailsDTO detailsDTOs) {
        String url = this.scoreCardUrl + "/web/saveOrgKpiDetails";
        return (KPIDetailsDTO)this.commonRestTemplate.postForObject(url, detailsDTOs, KPIDetailsDTO.class);
    }

    public ResponseEntity<Boolean> deleteKPIById(long id) {
        String url = this.scoreCardUrl + "/kpi/" + id;
        this.commonRestTemplate.deleteForObject(url);
        return new ResponseEntity(true, HttpStatus.OK);
    }

    public ResponseEntity<List<KPIDTO>> getKpiListWithObjId(long objId) {
        String url = this.scoreCardUrl + "/v2/kpiList/" + objId;
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        List kpi1 = (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
        return new ResponseEntity(kpi1, HttpStatus.OK);
    }

    public ResponseEntity<List<KPIDetailsDTO>> retrieveNodeKeyList() {
        String url = this.scoreCardUrl + "/retrieveNodeKeyList";
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        List kpi1 = (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
        return new ResponseEntity(kpi1, HttpStatus.OK);
    }

    public ResponseEntity<KPIResponseDTO> retrieveKpiList(String empId, boolean ownerFlag, String fromPage) {
        HashMap urlVaiables = new HashMap();
        urlVaiables.put("empId", empId);
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)this.scoreCardEmpView).queryParam("employeeView", new Object[]{ownerFlag}).queryParam("fromPage", new Object[]{fromPage}).buildAndExpand(urlVaiables).toUriString();
        KPIResponseDTO kpiResponseDTO = (KPIResponseDTO)this.commonRestTemplate.getForObject(pageURL, KPIResponseDTO.class);
        return new ResponseEntity(kpiResponseDTO, HttpStatus.OK);
    }

    public ResponseEntity<List<Map>> kpiDetailsListFromEmployerId(KPICriteriaDTO kpiCriteriaDTO, long kpiID, String tableFrequency, String flagtype) {
        String url = this.scoreCardUrl + "/kpiDetailList/" + kpiID;
        String kpiUrl = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("tableFrequency", new Object[]{tableFrequency}).queryParam("flagtype", new Object[]{flagtype}).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        List mapList = (List)this.commonRestTemplate.getForObject(kpiUrl, kpiCriteriaDTO, (ParameterizedTypeReference)parameterizedTypeReference);
        return new ResponseEntity(mapList, HttpStatus.OK);
    }

    public ResponseEntity<List<Map>> kpiDetailsdrillListFromEmployerId(KPICriteriaDTO kpiCriteriaDTO, long kpiID, String tableFrequency) {
        String url = this.scoreCardUrl + "/kpiDrillDetailList/" + kpiID;
        String kpiUrl = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("tableFrequency", new Object[]{tableFrequency}).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        List mapList = (List)this.commonRestTemplate.getForObject(kpiUrl, kpiCriteriaDTO, (ParameterizedTypeReference)parameterizedTypeReference);
        return new ResponseEntity(mapList, HttpStatus.OK);
    }

    public List<KPIDTO> kpilistbasedonscorecard(Long scorecardId) {
        String url = this.scoreCardUrl + "/kpilistbasedonscorecard/" + scorecardId;
        String kpiUrl = UriComponentsBuilder.fromHttpUrl((String)url).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        List mapList = (List)this.commonRestTemplate.getForObject(kpiUrl, (ParameterizedTypeReference)parameterizedTypeReference);
        return mapList;
    }

    public ResponseEntity<List<Map>> kpiViewDetailsList(long kpiID) {
        String url = this.scoreCardUrl + "/kpiViewDetailList/" + kpiID;
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        List mapList = (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
        return new ResponseEntity(mapList, HttpStatus.OK);
    }

    public List<KPIDTO> getImportKpiListWithObjId(long objId) {
        String url = this.scoreCardUrl + "/kpiViewList/" + objId;
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        List kpi1 = (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
        return kpi1;
    }

    public KPIDTO saveOrUpdateImportKpiDetails(KPIDTO kpi, String action) {
        if (action.equalsIgnoreCase("Save")) {
            String url = this.scoreCardUrl + "/kpi";
            KPIDTO kpi1 = (KPIDTO)this.commonRestTemplate.postForObject(url, kpi, KPIDTO.class);
            return kpi1;
        }
        String url = this.scoreCardUrl + "/kpi";
        KPIDTO kpi1 = (KPIDTO)this.commonRestTemplate.putForObject(url, kpi, KPIDTO.class);
        return kpi1;
    }

    public ResponseEntity<String> validateFormula(KPIFormula kpiFormula) {
        String url = this.scoreCardUrl + "/validateFormula";
        String validationMessage = (String)this.commonRestTemplate.postForObject(url, kpiFormula, String.class);
        return new ResponseEntity(validationMessage, HttpStatus.OK);
    }

    public ResponseEntity<List<Map>> getKpiListByFormula(KPIFormula kpiFormula, String tableFrequency, String responseGrouping) {
        String url = this.scoreCardUrl + "/formula/kpiList";
        String kpiUrl = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("tableFrequency", new Object[]{tableFrequency}).queryParam("responseGrouping", new Object[]{responseGrouping}).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        List mapList = (List)this.commonRestTemplate.postForObject(kpiUrl, kpiFormula, (ParameterizedTypeReference)parameterizedTypeReference);
        return new ResponseEntity(mapList, HttpStatus.OK);
    }

    public Map getKpiMeasureNameDetails(long id) {
        String url = this.scoreCardUrl + "/kpi/formula/measureNames/" + id;
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        return (Map)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public ResponseEntity<TargetDTO> getnodekeyTarget(long nodekey, String daterange) {
        HashMap<String, Long> urlVaiables = new HashMap<String, Long>();
        urlVaiables.put("nodeKey", nodekey);
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)this.kpiTargetUrl).queryParam("dateRange", new Object[]{daterange}).buildAndExpand(urlVaiables).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        TargetDTO tgtDTO = (TargetDTO)this.commonRestTemplate.getForObject(pageURL, (ParameterizedTypeReference)parameterizedTypeReference);
        return new ResponseEntity(tgtDTO, HttpStatus.OK);
    }

    public List<KPIDTO> kpiListByDate(long objId, String dateRange) {
        String url = this.scoreCardUrl + "/kpiListByDate/{objectiveId}";
        HashMap<String, Long> urlVaiables = new HashMap<String, Long>();
        urlVaiables.put("objectiveId", objId);
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("dateRange", new Object[]{dateRange}).buildAndExpand(urlVaiables).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        List kpidtoList = (List)this.commonRestTemplate.getForObject(pageURL, (ParameterizedTypeReference)parameterizedTypeReference);
        return kpidtoList;
    }

    public List<KPIDTO> kpiListByEmpId(long empId) {
        String url = this.scoreCardUrl + "/kpiListByEmpId/{empId}";
        HashMap<String, Long> urlVaiables = new HashMap<String, Long>();
        urlVaiables.put("empId", empId);
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).buildAndExpand(urlVaiables).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        List kpidtoList = (List)this.commonRestTemplate.getForObject(pageURL, (ParameterizedTypeReference)parameterizedTypeReference);
        return kpidtoList;
    }

    public List<KPIDTO> kpiListByDept(long deptId) {
        String url = this.scoreCardUrl + "/kpiListByDept/{deptId}";
        HashMap<String, Long> urlVaiables = new HashMap<String, Long>();
        urlVaiables.put("deptId", deptId);
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).buildAndExpand(urlVaiables).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        List kpidtoList = (List)this.commonRestTemplate.getForObject(pageURL, (ParameterizedTypeReference)parameterizedTypeReference);
        return kpidtoList;
    }

    public ResponseEntity<KPIResponseDTO> retrieveKpiFormDataList(String scorecardId, boolean ownerFlag, String fromPage, String dateRange) {
        HashMap urlVariables = new HashMap();
        urlVariables.put("scorecardId", scorecardId);
        String url = this.scoreCardUrl + "/kpiFormKpiList/{scorecardId}";
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("employeeView", new Object[]{ownerFlag}).queryParam("fromPage", new Object[]{fromPage}).queryParam("dateRange", new Object[]{dateRange}).buildAndExpand(urlVariables).toUriString();
        KPIResponseDTO kpiResponseDTO = (KPIResponseDTO)this.commonRestTemplate.getForObject(pageURL, KPIResponseDTO.class);
        return new ResponseEntity(kpiResponseDTO, HttpStatus.OK);
    }

    public ResponseEntity<List<Map>> getSubMeasureNodeKeyList(String nodeKey, String dateRange) {
        String url = this.scoreCardUrl + "/subMeasureNodeKeyList/" + nodeKey;
        String kpiUrl = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("dateRange", new Object[]{dateRange}).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        List mapList = (List)this.commonRestTemplate.getForObject(kpiUrl, (ParameterizedTypeReference)parameterizedTypeReference);
        return new ResponseEntity(mapList, HttpStatus.OK);
    }

    public Map subNodeKeyData(String nodekey, String measureKey, String dateRange) {
        String url = this.scoreCardUrl + "/subNodeKeyData/" + nodekey;
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("dateRange", new Object[]{dateRange}).queryParam("measureKey", new Object[]{measureKey}).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        Map outList = (Map)this.commonRestTemplate.getForObject(pageURL, (ParameterizedTypeReference)parameterizedTypeReference);
        return outList;
    }

    public List<KPIDTO> kpiListByDeptId(long deptId) {
        String url = this.scoreCardUrl + "/kpiListByDeptId/{deptId}";
        HashMap<String, Long> urlVaiables = new HashMap<String, Long>();
        urlVaiables.put("deptId", deptId);
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).buildAndExpand(urlVaiables).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        List kpidtoList = (List)this.commonRestTemplate.getForObject(pageURL, (ParameterizedTypeReference)parameterizedTypeReference);
        return kpidtoList;
    }

    public List<KpiList> checkkpiListByEmpId() {
        String url = String.valueOf(this.scoreCardUrl + "/checkkpiListByEmpId/" + UserThreadLocal.get().getProfile().getEmpId());
        HashMap urlVariables = new HashMap();
        urlVariables.put("empId", UserThreadLocal.get().getProfile().getEmpId());
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).buildAndExpand(urlVariables).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        List scoreCard = (List)this.commonRestTemplate.getForObject(pageURL, (ParameterizedTypeReference)parameterizedTypeReference);
        return scoreCard;
    }

    public List<KpiList> checkkpiListByDeptId() {
        String url = this.scoreCardUrl + "/checkkpiListByDeptId";
        HashMap urlVariables = new HashMap();
        urlVariables.put("deptId", "");
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).buildAndExpand(urlVariables).toUriString();
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        List scoreCard = (List)this.commonRestTemplate.getForObject(pageURL, (ParameterizedTypeReference)parameterizedTypeReference);
        return scoreCard;
    }

    public List<KpiDetailsAttachmentsDTO> retriveAttachmentByKpiId(Long kpiId) {
        String url = this.scoreCardUrl + "/kpiAttachmentList/" + kpiId;
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }
}


