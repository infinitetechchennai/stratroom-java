/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.scorecard.config.CommonRestTemplate
 *  com.estrat.scorecard.dto.KPIDTO
 *  com.estrat.scorecard.dto.KPIEntrysDTO
 *  com.estrat.scorecard.dto.KPIResponseDTO
 *  com.estrat.scorecard.dto.PerformanceContractDTO
 *  com.estrat.scorecard.dto.SubKPIDTO
 *  com.estrat.scorecard.dto.SubKPIEntrysDTO
 *  com.estrat.scorecard.service.KPIService
 *  com.estrat.scorecard.service.SubKPIService
 *  com.estrat.scorecard.service.SubKPIService$1
 *  com.estrat.scorecard.service.SubKPIService$2
 *  com.estrat.scorecard.service.SubKPIService$3
 *  com.estrat.scorecard.service.SubKPIService$4
 *  com.estrat.scorecard.service.SubKPIService$5
 *  com.estrat.scorecard.service.SubKPIService$6
 *  com.estrat.scorecard.service.SubKPIService$7
 *  com.estrat.scorecard.service.SubKPIService$8
 *  com.estrat.scorecard.service.SubKPIService$9
 *  com.estrat.scorecard.util.DataUtil
 *  com.estrat.scorecard.util.DateUtil
 *  com.estrat.scorecard.util.KPIUtil
 *  org.apache.commons.lang3.StringUtils
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.http.HttpStatus
 *  org.springframework.http.ResponseEntity
 *  org.springframework.stereotype.Service
 *  org.springframework.web.util.UriComponentsBuilder
 */
package com.estrat.scorecard.service;

import com.estrat.scorecard.config.CommonRestTemplate;
import com.estrat.scorecard.dto.KPIDTO;
import com.estrat.scorecard.dto.KPIEntrysDTO;
import com.estrat.scorecard.dto.KPIResponseDTO;
import com.estrat.scorecard.dto.PerformanceContractDTO;
import com.estrat.scorecard.dto.SubKPIDTO;
import com.estrat.scorecard.dto.SubKPIEntrysDTO;
import com.estrat.scorecard.service.KPIService;
import com.estrat.scorecard.service.SubKPIService;
import com.estrat.scorecard.util.DataUtil;
import com.estrat.scorecard.util.DateUtil;
import com.estrat.scorecard.util.KPIUtil;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class SubKPIService {
    @Value(value="${dbservice.url}")
    private String dbUrl;
    @Autowired
    private CommonRestTemplate commonRestTemplate;
    @Autowired
    private KPIUtil kpiUtil;
    @Autowired
    private DataUtil dataUtil;
    @Autowired
    private DateUtil dateUtil;
    @Autowired
    private KPIService kpiservice;

    public ResponseEntity<SubKPIDTO> getKpiDetails(long id, boolean checkStatusLight) {
        String url = this.dbUrl + "/subKpi/" + id;
        SubKPIDTO supkpidto = (SubKPIDTO)this.commonRestTemplate.getForObject(url, SubKPIDTO.class);
        if (checkStatusLight) {
            boolean isFirstOrWeighted;
            String deptUrl = this.dbUrl + "/subKpidept/" + id;
            String deptId = (String)this.commonRestTemplate.getForObject(deptUrl, String.class);
            if (Objects.nonNull(deptId)) {
                supkpidto.setDepartmentId(Long.parseLong(deptId));
            }
            this.dataUtil.formatThreshold(null, supkpidto, "subKpi");
            this.kpiUtil.buildStatusLight(null, supkpidto, "", "subkpi");
            String status = Objects.toString(supkpidto.getSubKpiValue().get("status"), "");
            boolean bl = isFirstOrWeighted = status.equalsIgnoreCase("First") || status.equalsIgnoreCase("Weighted");
            if (!isFirstOrWeighted) {
                Map subMap = this.kpiUtil.buildKPIDataFeed(null, supkpidto, "subkpi", "", null);
                BigDecimal actual = this.getBigDecimalValue(subMap.get("actual"));
                boolean isPercentageType = "Percentage".equalsIgnoreCase(Objects.toString(subMap.get("dataType"), ""));
                supkpidto.getSubKpiValue().put("actual", this.formatOrConvertResult(actual, subMap, isPercentageType));
                if (Objects.nonNull(subMap.get("target"))) {
                    BigDecimal target = this.getBigDecimalValue(subMap.get("target"));
                    supkpidto.getSubKpiValue().put("target", this.formatOrConvertResult(target, subMap, isPercentageType));
                } else {
                    BigDecimal target = this.getTargetFromKpiValue(supkpidto.getSubKpiValue());
                    supkpidto.getSubKpiValue().put("target", this.isPercentageTarget(target) ? this.kpiUtil.formatdecimal(target) + "%" : this.kpiUtil.convertResult(target, supkpidto.getSubKpiValue()));
                }
            }
        }
        return new ResponseEntity((Object)supkpidto, HttpStatus.OK);
    }

    private BigDecimal getBigDecimalValue(Object value) {
        return Objects.nonNull(value) ? new BigDecimal(value.toString()) : BigDecimal.ZERO;
    }

    private Object formatOrConvertResult(BigDecimal value, Map<String, Object> subMap, boolean isPercentageType) {
        return isPercentageType ? this.kpiUtil.formatdecimal(value) : this.kpiUtil.convertResult(value, subMap);
    }

    private BigDecimal getTargetFromKpiValue(Map<String, Object> kpiValue) {
        Object targetObj = kpiValue.get("target");
        if (Objects.nonNull(targetObj)) {
            String targetStr = targetObj.toString();
            if (targetStr.contains("%")) {
                return new BigDecimal(targetStr.replace("%", ""));
            }
            return new BigDecimal(targetStr);
        }
        return BigDecimal.ZERO;
    }

    private boolean isPercentageTarget(BigDecimal target) {
        return target != null && target.toString().contains("%");
    }

    public ResponseEntity<SubKPIDTO> saveOrUpdateDetails(SubKPIDTO kpi) {
        Pattern namepattern;
        Matcher m;
        String url = this.dbUrl + "/subKpi";
        if (kpi.getSubKpiName() != null && !(m = (namepattern = Pattern.compile("^[\\$#\\+\\.,%\\&+\\-+\\_a-zA-Z0-9\\u0600-\\u06FF ]+$")).matcher(kpi.getSubKpiName())).matches()) {
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        SubKPIDTO kpi1 = (SubKPIDTO)this.commonRestTemplate.postForObject(url, (Object)kpi, SubKPIDTO.class);
        return new ResponseEntity((Object)kpi1, HttpStatus.OK);
    }

    public ResponseEntity<Boolean> deleteKPIById(long id) {
        String url = this.dbUrl + "/subKpi/" + id;
        this.commonRestTemplate.deleteForObject(url);
        return new ResponseEntity((Object)true, HttpStatus.OK);
    }

    public String getsubKpiDeptId(Long subkpiId) {
        String urldept = this.dbUrl + "/subKpidept/" + subkpiId;
        String deptId = (String)this.commonRestTemplate.getForObject(urldept, String.class);
        return deptId;
    }

    public ResponseEntity<List<SubKPIDTO>> getSubKpiListWithObjId(long objId) {
        String url = this.dbUrl + "/v2/subkpiList/" + objId;
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        List kpi1 = (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
        return new ResponseEntity((Object)this.getKpiListWithStatusLight(kpi1), HttpStatus.OK);
    }

    public List<SubKPIDTO> getKpiListWithStatusLight(List<SubKPIDTO> kpilist) {
        ArrayList<SubKPIDTO> responsekpilist = new ArrayList<SubKPIDTO>();
        for (SubKPIDTO kpidto : kpilist) {
            if (kpidto != null) {
                String deptId = this.getsubKpiDeptId(Long.valueOf(kpidto.getId()));
                if (Objects.nonNull(deptId)) {
                    kpidto.setDepartmentId(Long.parseLong(deptId));
                }
                this.kpiUtil.buildStatusLight(null, kpidto, "subkpi", "");
                String status = Objects.nonNull(kpidto.getSubKpiValue().get("status")) ? kpidto.getSubKpiValue().get("status").toString() : "";
                boolean firstStatus = status.equalsIgnoreCase("First");
                boolean weighted = status.equalsIgnoreCase("Weighted");
                if (!firstStatus && !weighted) {
                    Map subMap = this.kpiUtil.buildKPIDataFeed(null, kpidto, "subkpi", "", null);
                    BigDecimal actual = Objects.nonNull(subMap.get("actual")) ? new BigDecimal(subMap.get("actual").toString()) : new BigDecimal(0);
                    boolean isPercentageType = Objects.nonNull(subMap.get("dataType")) && "Percentage".equalsIgnoreCase(subMap.get("dataType").toString());
                    kpidto.getSubKpiValue().put("actual", isPercentageType ? this.kpiUtil.formatdecimal(actual) : this.kpiUtil.convertResult(actual, subMap));
                    if (Objects.nonNull(subMap.get("target")) && StringUtils.isNotEmpty((CharSequence)subMap.get("target").toString())) {
                        BigDecimal target = new BigDecimal(subMap.get("target").toString());
                        kpidto.getSubKpiValue().put("target", isPercentageType ? this.kpiUtil.formatdecimal(target) : this.kpiUtil.convertResult(target, subMap));
                    } else {
                        boolean checkFlag;
                        boolean percentageCheck = Objects.nonNull(kpidto.getSubKpiValue().get("target")) ? kpidto.getSubKpiValue().get("target").toString().contains("%") : false;
                        BigDecimal target = null;
                        Object targetObj = kpidto.getSubKpiValue().get("target");
                        if (percentageCheck) {
                            checkFlag = Objects.nonNull(targetObj) && StringUtils.isNotEmpty((CharSequence)targetObj.toString().substring(0, "%".length()));
                            target = checkFlag ? new BigDecimal(targetObj.toString()) : new BigDecimal(0);
                        } else {
                            checkFlag = Objects.nonNull(targetObj) && StringUtils.isNotEmpty((CharSequence)targetObj.toString());
                            BigDecimal bigDecimal = target = checkFlag ? new BigDecimal(targetObj.toString()) : new BigDecimal(0);
                        }
                        if (!percentageCheck) {
                            kpidto.getSubKpiValue().put("target", this.kpiUtil.convertResult(target, kpidto.getSubKpiValue()));
                        } else {
                            kpidto.getSubKpiValue().put("target", String.join((CharSequence)"", this.kpiUtil.formatdecimal(target), "%"));
                        }
                    }
                }
            }
            responsekpilist.add(kpidto);
        }
        return responsekpilist;
    }

    public PerformanceContractDTO saveOrgSubKpiDetails(PerformanceContractDTO performanceContractDTO) {
        String url = this.dbUrl + "/web/saveSubkpiEntry";
        Object unavailableAnonymousClass = null; // Unavailable anonymous inner class
        return (PerformanceContractDTO)this.commonRestTemplate.postForObject(url, (Object)performanceContractDTO, PerformanceContractDTO.class);
    }

    public ResponseEntity<KPIResponseDTO> retrieveSubKpiFormDataList(long scorecardId, boolean employeeView) {
        HashMap<String, Long> urlVariables = new HashMap<String, Long>();
        String url = this.dbUrl + "/subkpiEntryList/{scorecardId}";
        urlVariables.put("scorecardId", scorecardId);
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("employeeView", new Object[]{employeeView}).buildAndExpand(urlVariables).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        List subkpiDtoList = (List)this.commonRestTemplate.getForObject(pageURL, (ParameterizedTypeReference)parameterizedTypeReference);
        HashMap<String, Long> kpiurlVariables = new HashMap<String, Long>();
        String url1 = this.dbUrl + "/kpiFormKpiList/{scorecardId}";
        kpiurlVariables.put("scorecardId", scorecardId);
        String kpageURL = UriComponentsBuilder.fromHttpUrl((String)url1).buildAndExpand(kpiurlVariables).toUriString();
        java.util.List<com.estrat.scorecard.dto.KPIDTO> kpidtoList = (java.util.List<com.estrat.scorecard.dto.KPIDTO>)this.commonRestTemplate.getForObject(kpageURL, new org.springframework.core.ParameterizedTypeReference<java.util.List<com.estrat.scorecard.dto.KPIDTO>>() {});

        KPIResponseDTO kpiResponseDTO = new KPIResponseDTO();
        Long performanceId = 0L;
        for (SubKPIDTO sukpi : (java.util.List<SubKPIDTO>)(java.util.List)subkpiDtoList) {
            SubKPIEntrysDTO subKpiEntry = this.getSubKpiEntry(sukpi.getId());
            if (subKpiEntry == null) continue;
            sukpi.setSubKPIEntrysDTO(subKpiEntry);
            performanceId = subKpiEntry.getPreferenceId();
        }
        Long kpiperformanceId = 0L;
        for (com.estrat.scorecard.dto.KPIDTO kpi : (java.util.List<com.estrat.scorecard.dto.KPIDTO>)(java.util.List)kpidtoList) {
            KPIEntrysDTO kpiEntry = this.getKpiEntry(kpi.getId());
            if (kpiEntry == null) continue;
            kpi.setKpiEntrysDTO(kpiEntry);
            kpiperformanceId = kpiEntry.getPreferenceId();
        }
        PerformanceContractDTO prefernce = this.getPerfomanceScorecardId(scorecardId);
        if (kpiResponseDTO.getValues() == null) {
            kpiResponseDTO.setValues(new java.util.HashMap());
        }
        if (prefernce != null) {
            kpiResponseDTO.getValues().put("performanceContract", prefernce);
        } else {
            kpiResponseDTO.getValues().put("performanceContract", new PerformanceContractDTO());
        }
        kpiResponseDTO.setSubkpidtoList(subkpiDtoList);
        kpiResponseDTO.setKpidtoList(kpidtoList);
        return new ResponseEntity((Object)kpiResponseDTO, HttpStatus.OK);
    }

    public List<PerformanceContractDTO> findAllByEmpId(String empId) {
        String url1 = this.dbUrl + "/getPerformanceEntry";
        String url = String.join((CharSequence)"/", url1, String.valueOf(empId));
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public SubKPIEntrysDTO getSubKpiEntry(long subkpiId) {
        String url1 = this.dbUrl + "subkpiEntryByid";
        String url = UriComponentsBuilder.fromHttpUrl((String)url1).queryParam("subkpiId", new Object[]{subkpiId}).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (SubKPIEntrysDTO)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public KPIEntrysDTO getKpiEntry(long kpiId) {
        String url1 = this.dbUrl + "kpiEntryByid";
        String url = UriComponentsBuilder.fromHttpUrl((String)url1).queryParam("kpiId", new Object[]{kpiId}).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (KPIEntrysDTO)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public PerformanceContractDTO getPerfomance(long performanceId) {
        String url1 = this.dbUrl + "perfomanceByid";
        String url = UriComponentsBuilder.fromHttpUrl((String)url1).queryParam("performanceId", new Object[]{performanceId}).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (PerformanceContractDTO)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public PerformanceContractDTO getPerfomanceScorecardId(long scoreCardId) {
        String url1 = this.dbUrl + "perfomanceByScorecardId";
        String url = UriComponentsBuilder.fromHttpUrl((String)url1).queryParam("scoreCardId", new Object[]{scoreCardId}).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (PerformanceContractDTO)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }
}

