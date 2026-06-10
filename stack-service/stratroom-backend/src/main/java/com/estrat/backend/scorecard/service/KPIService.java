/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.scorecard.config.CommonRestTemplate
 *  com.estrat.backend.scorecard.dto.CommentsDTO
 *  com.estrat.backend.scorecard.dto.ControlPanelGeneralDTO
 *  com.estrat.backend.scorecard.dto.CustomPerformance
 *  com.estrat.backend.scorecard.dto.DepartmentChartDTO
 *  com.estrat.backend.scorecard.dto.DeptDetails
 *  com.estrat.backend.scorecard.dto.Employee
 *  com.estrat.backend.scorecard.dto.FormulaBuilder
 *  com.estrat.backend.scorecard.dto.KPICriteria
 *  com.estrat.backend.scorecard.dto.KPICriteriaDTO
 *  com.estrat.backend.scorecard.dto.KPIDTO
 *  com.estrat.backend.scorecard.dto.KPIDetailsDTO
 *  com.estrat.backend.scorecard.dto.KPIElementDTO
 *  com.estrat.backend.scorecard.dto.KPIFormula
 *  com.estrat.backend.scorecard.dto.KPIResponseDTO
 *  com.estrat.backend.scorecard.dto.KpiDetailsAttachmentsDTO
 *  com.estrat.backend.scorecard.dto.KpiList
 *  com.estrat.backend.scorecard.dto.SubKPIDTO
 *  com.estrat.backend.scorecard.dto.TargetDTO
 *  com.estrat.backend.scorecard.service.DeptService
 *  com.estrat.backend.scorecard.service.KPIService
 *  com.estrat.backend.scorecard.service.KPIService$1
 *  com.estrat.backend.scorecard.service.KPIService$10
 *  com.estrat.backend.scorecard.service.KPIService$11
 *  com.estrat.backend.scorecard.service.KPIService$12
 *  com.estrat.backend.scorecard.service.KPIService$13
 *  com.estrat.backend.scorecard.service.KPIService$14
 *  com.estrat.backend.scorecard.service.KPIService$15
 *  com.estrat.backend.scorecard.service.KPIService$16
 *  com.estrat.backend.scorecard.service.KPIService$17
 *  com.estrat.backend.scorecard.service.KPIService$18
 *  com.estrat.backend.scorecard.service.KPIService$19
 *  com.estrat.backend.scorecard.service.KPIService$2
 *  com.estrat.backend.scorecard.service.KPIService$20
 *  com.estrat.backend.scorecard.service.KPIService$21
 *  com.estrat.backend.scorecard.service.KPIService$22
 *  com.estrat.backend.scorecard.service.KPIService$23
 *  com.estrat.backend.scorecard.service.KPIService$24
 *  com.estrat.backend.scorecard.service.KPIService$25
 *  com.estrat.backend.scorecard.service.KPIService$26
 *  com.estrat.backend.scorecard.service.KPIService$27
 *  com.estrat.backend.scorecard.service.KPIService$28
 *  com.estrat.backend.scorecard.service.KPIService$29
 *  com.estrat.backend.scorecard.service.KPIService$3
 *  com.estrat.backend.scorecard.service.KPIService$30
 *  com.estrat.backend.scorecard.service.KPIService$31
 *  com.estrat.backend.scorecard.service.KPIService$32
 *  com.estrat.backend.scorecard.service.KPIService$33
 *  com.estrat.backend.scorecard.service.KPIService$34
 *  com.estrat.backend.scorecard.service.KPIService$35
 *  com.estrat.backend.scorecard.service.KPIService$36
 *  com.estrat.backend.scorecard.service.KPIService$4
 *  com.estrat.backend.scorecard.service.KPIService$5
 *  com.estrat.backend.scorecard.service.KPIService$6
 *  com.estrat.backend.scorecard.service.KPIService$7
 *  com.estrat.backend.scorecard.service.KPIService$8
 *  com.estrat.backend.scorecard.service.KPIService$9
 *  com.estrat.backend.scorecard.service.SubKPIService
 *  com.estrat.backend.scorecard.util.DataUtil
 *  com.estrat.backend.scorecard.util.DateUtil
 *  com.estrat.backend.scorecard.util.FormulaUtil
 *  com.estrat.backend.scorecard.util.KPIThreadLocal
 *  com.estrat.backend.scorecard.util.KPIUtil
 *  com.estrat.backend.scorecard.util.KpiFileWirterUtil
 *  com.estrat.backend.scorecard.util.UserThreadLocal
 *  org.apache.commons.collections4.CollectionUtils
 *  org.apache.commons.lang3.StringUtils
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.core.io.InputStreamResource
 *  org.springframework.http.HttpHeaders
 *  org.springframework.http.HttpStatus
 *  org.springframework.http.ResponseEntity
 *  org.springframework.stereotype.Service
 *  org.springframework.util.MultiValueMap
 *  org.springframework.web.bind.annotation.PathVariable
 *  org.springframework.web.util.UriComponentsBuilder
 */
package com.estrat.backend.scorecard.service;

import com.estrat.backend.scorecard.config.CommonRestTemplate;
import com.estrat.backend.scorecard.dto.CommentsDTO;
import com.estrat.backend.scorecard.dto.ControlPanelGeneralDTO;
import com.estrat.backend.scorecard.dto.CustomPerformance;
import com.estrat.backend.scorecard.dto.DepartmentChartDTO;
import com.estrat.backend.scorecard.dto.DeptDetails;
import com.estrat.backend.scorecard.dto.Employee;
import com.estrat.backend.scorecard.dto.FormulaBuilder;
import com.estrat.backend.scorecard.dto.KPICriteria;
import com.estrat.backend.scorecard.dto.KPICriteriaDTO;
import com.estrat.backend.scorecard.dto.KPIDTO;
import com.estrat.backend.scorecard.dto.KPIDetailsDTO;
import com.estrat.backend.scorecard.dto.KPIElementDTO;
import com.estrat.backend.scorecard.dto.KPIFormula;
import com.estrat.backend.scorecard.dto.KPIResponseDTO;
import com.estrat.backend.scorecard.dto.KpiDetailsAttachmentsDTO;
import com.estrat.backend.scorecard.dto.KpiList;
import com.estrat.backend.scorecard.dto.SubKPIDTO;
import com.estrat.backend.scorecard.dto.TargetDTO;
import com.estrat.backend.scorecard.service.DeptService;
import com.estrat.backend.scorecard.service.KPIService;
import com.estrat.backend.scorecard.service.SubKPIService;
import com.estrat.backend.scorecard.util.DataUtil;
import com.estrat.backend.scorecard.util.DateUtil;
import com.estrat.backend.scorecard.util.FormulaUtil;
import com.estrat.backend.scorecard.util.KPIThreadLocal;
import com.estrat.backend.scorecard.util.KPIUtil;
import com.estrat.backend.scorecard.util.KpiFileWirterUtil;
import com.estrat.backend.scorecard.util.UserThreadLocal;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.net.URLDecoder;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Collection;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.function.Function;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class KPIService {
    @Value(value="${dbservice.url}")
    private String dbUrl;
    @Value(value="${dbservice.service.url.empView}")
    private String scoreCardEmpView;
    @Value(value="${dbservice.kpi.target.url}")
    private String kpiTargetUrl;
    @Autowired
    private CommonRestTemplate commonRestTemplate;
    @Autowired
    private KPIUtil kpiUtil;
    @Autowired
    private DataUtil dataUtil;
    @Autowired
    private DateUtil dateUtil;
    @Autowired
    private DeptService deptService;
    @Autowired
    private SubKPIService subKPIService;
    @Value(value="${dbService.control.panel.general.lists.url}")
    private String retrieveControlPanelGeneralUrl;
    @Value(value="${dbService.control.panel.custom.get.url}")
    private String customPerformanceGetUrl;

    public ResponseEntity<KPIDTO> getKpiDetails(long id, boolean checkStatusLight) {
        String url = this.dbUrl + "/kpi/" + id;
        KPIDTO kpidto = (KPIDTO)this.commonRestTemplate.getForObject(url, KPIDTO.class);
        if (checkStatusLight) {
            boolean isFirstOrWeighted;
            String deptUrl = this.dbUrl + "/kpidept/" + id;
            Object deptId = this.commonRestTemplate.getForObject(deptUrl, String.class);
            if (Objects.nonNull(deptId)) {
                kpidto.setDepartmentId(Long.parseLong(deptId.toString()));
            }
            this.dataUtil.formatThreshold(kpidto, null, "");
            this.kpiUtil.buildStatusLight(kpidto, null, "", "");
            String status = Objects.toString(kpidto.getKpiValue().get("status"), "");
            boolean bl = isFirstOrWeighted = status.equalsIgnoreCase("First") || status.equalsIgnoreCase("Weighted");
            if (!isFirstOrWeighted) {
                Map subMap = this.kpiUtil.buildKPIDataFeed(kpidto, null, "kpi", "", null);
                BigDecimal actual = this.getBigDecimalValue(subMap.get("actual"));
                boolean isPercentageType = "Percentage".equalsIgnoreCase(Objects.toString(subMap.get("dataType"), ""));
                kpidto.getKpiValue().put("actual", this.formatOrConvertResult(actual, subMap, isPercentageType));
                if (Objects.nonNull(subMap.get("target"))) {
                    BigDecimal target = this.getBigDecimalValue(subMap.get("target"));
                    kpidto.getKpiValue().put("target", this.formatOrConvertResult(target, subMap, isPercentageType));
                } else {
                    BigDecimal target = this.getTargetFromKpiValue(kpidto.getKpiValue());
                    kpidto.getKpiValue().put("target", this.isPercentageTarget(target) ? this.kpiUtil.formatdecimal(target) + "%" : this.kpiUtil.convertResult(target, kpidto.getKpiValue()));
                }
            }
        }
        return new ResponseEntity((Object)kpidto, HttpStatus.OK);
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

    public ResponseEntity<TargetDTO> getnodekeyTarget(long nodekey, String daterange) {
        HashMap<String, Long> urlVaiables = new HashMap<String, Long>();
        urlVaiables.put("nodeKey", nodekey);
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)this.kpiTargetUrl).queryParam("dateRange", new Object[]{daterange}).buildAndExpand(urlVaiables).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        TargetDTO tgtDTO = (TargetDTO)this.commonRestTemplate.getForObject(pageURL, (ParameterizedTypeReference)parameterizedTypeReference);
        return new ResponseEntity((Object)tgtDTO, HttpStatus.OK);
    }

    public ResponseEntity<List<KPIDTO>> getKpiListWithEmpId(String empId, boolean employeeView) {
        HashMap urlVaiables = new HashMap();
        urlVaiables.put("empId", empId);
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)this.scoreCardEmpView).queryParam("employeeView", new Object[]{employeeView}).buildAndExpand(urlVaiables).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        List kpi1 = (List) this.commonRestTemplate.getForObject(pageURL, (ParameterizedTypeReference)parameterizedTypeReference);
        return new ResponseEntity((Object)(employeeView ? (java.util.List)this.getKpiListWithStatusLight((java.util.List<com.estrat.backend.scorecard.dto.KPIDTO>)kpi1) : kpi1), HttpStatus.OK);
    }

    public String getKpiDeptId(Long kpiId) {
        String urldept = this.dbUrl + "/kpidept/" + kpiId;
        Object deptId = this.commonRestTemplate.getForObject(urldept, String.class);
        return deptId != null ? deptId.toString() : null;
    }

    public Long getDeptId(Long empId) {
        String urldept = this.dbUrl + "/getDeptIdwithEmpId/" + empId;
        Long deptId = (Long)this.commonRestTemplate.getForObject(urldept, Long.class);
        return deptId;
    }

    public ResponseEntity<List<KPIDTO>> getKpiListWithObjId(long objId) {
        String url = this.dbUrl + "/v2/kpiList/" + objId;
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        List kpi1 = (List) this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
        return new ResponseEntity((Object)this.getKpiListWithStatusLight(kpi1), HttpStatus.OK);
    }

    public List<KPIDTO> getKpiListWithStatusLight(List<KPIDTO> kpilist) {
        ArrayList<KPIDTO> responsekpilist = new ArrayList<KPIDTO>();
        for (KPIDTO kpidto : (java.util.List<KPIDTO>)kpilist) {
            if (kpidto != null) {
                ArrayList<SubKPIDTO> responseSubkpilist = new ArrayList<SubKPIDTO>();
                for (SubKPIDTO subkpidto : kpidto.getSubKpiList()) {
                    if (subkpidto != null) {
                        String deptId = this.subKPIService.getsubKpiDeptId(Long.valueOf(subkpidto.getId()));
                        if (Objects.nonNull(deptId)) {
                            kpidto.setDepartmentId(Long.parseLong(deptId.toString()));
                        }
                        this.kpiUtil.buildStatusLight(null, subkpidto, "subkpi", "");
                        String status = Objects.nonNull(subkpidto.getSubKpiValue().get("status")) ? subkpidto.getSubKpiValue().get("status").toString() : "";
                        boolean firstStatus = status.equalsIgnoreCase("First");
                        boolean weighted = status.equalsIgnoreCase("Weighted");
                        if (!firstStatus && !weighted) {
                            Map subMap = this.kpiUtil.buildKPIDataFeed(null, subkpidto, "subkpi", "", null);
                            BigDecimal actual = Objects.nonNull(subMap.get("actual")) ? new BigDecimal(subMap.get("actual").toString()) : new BigDecimal(0);
                            boolean isPercentageType = Objects.nonNull(subMap.get("dataType")) && "Percentage".equalsIgnoreCase(subMap.get("dataType").toString());
                            subkpidto.getSubKpiValue().put("actual", isPercentageType ? this.kpiUtil.formatdecimal(actual) : this.kpiUtil.convertResult(actual, subMap));
                            if (Objects.nonNull(subMap.get("target")) && StringUtils.isNotEmpty((CharSequence)subMap.get("target").toString())) {
                                BigDecimal target = new BigDecimal(subMap.get("target").toString());
                                subkpidto.getSubKpiValue().put("target", isPercentageType ? this.kpiUtil.formatdecimal(target) : this.kpiUtil.convertResult(target, subMap));
                            } else {
                                boolean checkFlag;
                                boolean percentageCheck = Objects.nonNull(subkpidto.getSubKpiValue().get("target")) ? subkpidto.getSubKpiValue().get("target").toString().contains("%") : false;
                                BigDecimal target = null;
                                Object targetObj = subkpidto.getSubKpiValue().get("target");
                                if (percentageCheck) {
                                    checkFlag = Objects.nonNull(targetObj) && StringUtils.isNotEmpty((CharSequence)targetObj.toString().substring(0, "%".length()));
                                    target = checkFlag ? new BigDecimal(targetObj.toString()) : new BigDecimal(0);
                                } else {
                                    checkFlag = Objects.nonNull(targetObj) && StringUtils.isNotEmpty((CharSequence)targetObj.toString());
                                    BigDecimal bigDecimal = target = checkFlag ? new BigDecimal(targetObj.toString()) : new BigDecimal(0);
                                }
                                if (!percentageCheck) {
                                    subkpidto.getSubKpiValue().put("target", this.kpiUtil.convertResult(target, subkpidto.getSubKpiValue()));
                                } else {
                                    subkpidto.getSubKpiValue().put("target", String.join((CharSequence)"", this.kpiUtil.formatdecimal(target), "%"));
                                }
                            }
                        }
                    }
                    responseSubkpilist.add(subkpidto);
                }
                kpidto.setSubKpiList(responseSubkpilist);
                String deptId = this.getKpiDeptId(Long.valueOf(kpidto.getId()));
                if (Objects.nonNull(deptId)) {
                    kpidto.setDepartmentId(Long.parseLong(deptId.toString()));
                }
                this.kpiUtil.buildStatusLight(kpidto, null, "", "");
                String status = Objects.nonNull(kpidto.getKpiValue().get("status")) ? kpidto.getKpiValue().get("status").toString() : "";
                boolean firstStatus = status.equalsIgnoreCase("First");
                boolean weighted = status.equalsIgnoreCase("Weighted");
                if (!firstStatus && !weighted) {
                    Map subMap = this.kpiUtil.buildKPIDataFeed(kpidto, null, "kpi", "", null);
                    BigDecimal actual = Objects.nonNull(subMap.get("actual")) ? new BigDecimal(subMap.get("actual").toString()) : new BigDecimal(0);
                    boolean isPercentageType = Objects.nonNull(subMap.get("dataType")) && "Percentage".equalsIgnoreCase(subMap.get("dataType").toString());
                    kpidto.getKpiValue().put("actual", isPercentageType ? this.kpiUtil.formatdecimal(actual) : this.kpiUtil.convertResult(actual, subMap));
                    if (Objects.nonNull(subMap.get("target")) && StringUtils.isNotEmpty((CharSequence)subMap.get("target").toString())) {
                        BigDecimal target = new BigDecimal(subMap.get("target").toString());
                        kpidto.getKpiValue().put("target", isPercentageType ? this.kpiUtil.formatdecimal(target) : this.kpiUtil.convertResult(target, subMap));
                    } else {
                        boolean checkFlag;
                        boolean percentageCheck = Objects.nonNull(kpidto.getKpiValue().get("target")) ? kpidto.getKpiValue().get("target").toString().contains("%") : false;
                        BigDecimal target = null;
                        Object targetObj = kpidto.getKpiValue().get("target");
                        if (percentageCheck) {
                            checkFlag = Objects.nonNull(targetObj) && StringUtils.isNotEmpty((CharSequence)targetObj.toString().substring(0, "%".length()));
                            target = checkFlag ? new BigDecimal(targetObj.toString()) : new BigDecimal(0);
                        } else {
                            checkFlag = Objects.nonNull(targetObj) && StringUtils.isNotEmpty((CharSequence)targetObj.toString());
                            BigDecimal bigDecimal = target = checkFlag ? new BigDecimal(targetObj.toString()) : new BigDecimal(0);
                        }
                        if (!percentageCheck) {
                            kpidto.getKpiValue().put("target", this.kpiUtil.convertResult(target, kpidto.getKpiValue()));
                        } else {
                            kpidto.getKpiValue().put("target", String.join((CharSequence)"", this.kpiUtil.formatdecimal(target), "%"));
                        }
                    }
                }
            }
            responsekpilist.add(kpidto);
        }
        return responsekpilist;
    }

    public ResponseEntity<KPIDTO> saveOrUpdateDetails(KPIDTO kpi) {
        Pattern namepattern;
        Matcher m;
        String url = this.dbUrl + "/kpi";
        if (kpi.getKpiName() != null && !(m = (namepattern = Pattern.compile("^[\\$#\\+\\.,%\\&+\\-+\\_a-zA-Z0-9\\u0600-\\u06FF ]+$")).matcher(kpi.getKpiName())).matches()) {
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        KPIDTO kpi1 = (KPIDTO)this.commonRestTemplate.postForObject(url, (Object)kpi, KPIDTO.class);
        return new ResponseEntity((Object)kpi1, HttpStatus.OK);
    }

    public ResponseEntity<Boolean> deleteKPIById(long id) {
        String url = this.dbUrl + "/kpi/" + id;
        this.commonRestTemplate.deleteForObject(url);
        return new ResponseEntity((Object)true, HttpStatus.OK);
    }

    public KPIDetailsDTO saveOrgKpiDetails(KPIDetailsDTO kpiDetailsDTO) {
        String url = this.dbUrl + "/web/saveOrgKpiDetails";
        String kpielemurl = this.dbUrl + "/kpielementsubmeasure/" + kpiDetailsDTO.getNodeKey();
        Object unavailableAnonymousClass = null; // Unavailable anonymous inner class
        Map outList_elem = (Map)this.commonRestTemplate.getForObject(kpielemurl, (ParameterizedTypeReference)new org.springframework.core.ParameterizedTypeReference<Object>() {});
        System.out.println("Frequncy measure wil be ::: " + outList_elem.get("frequency"));
        if (kpiDetailsDTO.getComments() != null) {
            System.out.println("kpi comment entry");
            CommentsDTO commentsDTO = new CommentsDTO();
            if (commentsDTO.getCommentsValue() == null) {
                commentsDTO.setCommentsValue(new HashMap());
            }
            Long empId = Long.valueOf(UserThreadLocal.get((String)"LOGGED_IN_EMPLOYEE_ID"));
            commentsDTO.setCreatedBy(empId.longValue());
            commentsDTO.setFromPage("kpi");
            commentsDTO.setType("Kpi");
            commentsDTO.setKpiId(kpiDetailsDTO.getKpiId());
            commentsDTO.setEmpId(empId);
            commentsDTO.setCommentsParendId(Long.valueOf(0L));
            commentsDTO.getCommentsValue().put("desc", kpiDetailsDTO.getComments());
            String commentUrl = this.dbUrl + "/comments";
            CommentsDTO values = (CommentsDTO)this.commonRestTemplate.postForObject(commentUrl, (Object)commentsDTO, CommentsDTO.class);
            System.out.println("kpi comments done");
            System.out.println("KpiDataForm comments :: " + values);
        }
        return (KPIDetailsDTO)this.commonRestTemplate.postForObject(url, (Object)kpiDetailsDTO, KPIDetailsDTO.class);
    }

    public ResponseEntity<List<KPIDetailsDTO>> retrieveNodeKeyList() {
        String url = this.dbUrl + "/retrieveNodeKeyList";
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        List kpi1 = (List) this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
        return new ResponseEntity((Object)kpi1, HttpStatus.OK);
    }

    public List<Map<String, Object>> retrieveOrgKPIDetails(KPICriteria kpiCriteria) {
        String url = this.dbUrl + "/retrieveOrgKPIDetails";
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        List kpiList = (List) this.commonRestTemplate.postForObject(url, (Object)kpiCriteria, (ParameterizedTypeReference)parameterizedTypeReference);
        return kpiList;
    }

    public List<Map<String, Object>> retrieveOrgKPIDetailsSubMeasure(KPICriteria kpiCriteria) {
        String url = this.dbUrl + "/retrieveOrgKPIDetailsSubMeasure";
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        List kpiList = (List) this.commonRestTemplate.postForObject(url, (Object)kpiCriteria, (ParameterizedTypeReference)parameterizedTypeReference);
        return kpiList;
    }

    public ResponseEntity<InputStreamResource> downloadPdf(long id) throws IOException {
        KpiFileWirterUtil kpiFileWirterUtil = new KpiFileWirterUtil();
        String url = this.dbUrl + "/kpi/" + id;
        KPIDTO kpi = (KPIDTO)this.commonRestTemplate.getForObject(url, KPIDTO.class);
        return kpiFileWirterUtil.downloadPdf(kpi);
    }

    public ResponseEntity<InputStreamResource> excelKpiReport(long id) throws IOException {
        KpiFileWirterUtil kpiFileWirterUtil = new KpiFileWirterUtil();
        String url = this.dbUrl + "/kpi/" + id;
        KPIDTO kpi = (KPIDTO)this.commonRestTemplate.getForObject(url, KPIDTO.class);
        ByteArrayInputStream in = KpiFileWirterUtil.KpiDetailsToExcel((KPIDTO)kpi);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "attachment; filename=KpiDetails.xlsx");
        ResponseEntity response = new ResponseEntity((Object)new InputStreamResource((InputStream)in), (MultiValueMap)headers, HttpStatus.OK);
        return response;
    }

    public ResponseEntity<KPIResponseDTO> retrieveKpiList(long empId, boolean employeeView, String fromPage) {
        HashMap<String, Long> urlVaiables = new HashMap<String, Long>();
        urlVaiables.put("empId", empId);
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)this.scoreCardEmpView).queryParam("employeeView", new Object[]{employeeView}).buildAndExpand(urlVaiables).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        boolean dataFlag = "KPI_DATA_FORM".equalsIgnoreCase(fromPage);
        List kpiDtoList = (List) this.commonRestTemplate.getForObject(pageURL, (ParameterizedTypeReference)parameterizedTypeReference);
        KPIResponseDTO kpiResponseDTO = new KPIResponseDTO();
        kpiResponseDTO.setKpidtoList(kpiDtoList);
        kpiResponseDTO = dataFlag ? this.kpiUtil.filterKpiList(kpiResponseDTO, null) : kpiResponseDTO;
        return new ResponseEntity((Object)kpiResponseDTO, HttpStatus.OK);
    }

    public ResponseEntity<List<Map<String, Object>>> kpiActualDetailsList(KPICriteriaDTO criteriaDTO, long kpiID, String kpiTableFrequency, String flagtype) {
        String period = StringUtils.isEmpty((CharSequence)criteriaDTO.getPeriod()) ? (String)UserThreadLocal.get().get("DATE_PERIOD") : criteriaDTO.getPeriod();
        criteriaDTO.setPeriod(period);
        List<Map<String, Object>> kpiActualData = new ArrayList<>();
        if (flagtype.equalsIgnoreCase("subkpi")) {
            SubKPIDTO subkpiDetails = (SubKPIDTO)this.subKPIService.getKpiDetails(kpiID, false).getBody();
            this.getKpiActualDataList(null, subkpiDetails, "subkpi", criteriaDTO, kpiTableFrequency, kpiActualData, false);
        } else {
            KPIDTO kpiDetails = (KPIDTO)this.getKpiDetails(kpiID, false).getBody();
            this.getKpiActualDataList(kpiDetails, null, "kpi", criteriaDTO, kpiTableFrequency, kpiActualData, false);
        }
        if (criteriaDTO.getTableType() != null && criteriaDTO.getTableType().equalsIgnoreCase("dril")) {
            String deptName = criteriaDTO.getDeptName();
            if (deptName != null && !deptName.isEmpty()) {
                String[] deptData = deptName.trim().split("\\s*-\\s*", 2);
                List filteredData = kpiActualData.stream().filter(detail_obj -> {
                    java.util.Map<String, Object> detail = (java.util.Map<String, Object>) detail_obj;
                    String key = (String)detail.keySet().iterator().next();
                    String cleanedKey = key.trim();
                    String[] parts = cleanedKey.split("\\s*-\\s*", 2);
                    String deptNameOnly = parts[0];
                    System.out.println("deptNameOnly ::: " + deptNameOnly + " |deptName :: " + deptData[0]);
                    return !deptNameOnly.equalsIgnoreCase(deptData[0]);
                }).collect(Collectors.toList());
                kpiActualData = filteredData;
            }
            this.checkChildIsPresent(kpiActualData);
        }
        return new ResponseEntity(kpiActualData, HttpStatus.OK);
    }

    public void checkChildIsPresent(List<Map<String, Object>> outList) {
        outList.sort(Comparator.comparingInt(map -> {
            String key = (String)map.keySet().iterator().next();
            return Integer.parseInt(key.split("-")[1]);
        }));
        for (Map<String, Object> deptMap : outList) {
            for (Map.Entry<String, Object> entry : deptMap.entrySet()) {
                String deptKey = entry.getKey();
                Object deptValue = entry.getValue();
                System.out.println("deptKey :: " + deptKey);
                System.out.println("deptValue :: " + deptValue);
                String[] dept = deptKey.split("-");
                List departmentChartDTOs = (List)this.deptimmediatereportees(Long.parseLong(dept[1])).getBody();
                List filteredList = (java.util.List) ((java.util.List<com.estrat.backend.scorecard.dto.DepartmentChartDTO>)departmentChartDTOs).stream().filter(dto_obj -> { com.estrat.backend.scorecard.dto.DepartmentChartDTO dto = (com.estrat.backend.scorecard.dto.DepartmentChartDTO) dto_obj; return dto.getDeptId() != null && !dto.getDeptId().equals(Long.parseLong(dept[1])); }).collect(Collectors.toList());
                boolean childFlag = false;
                if (filteredList != null && !filteredList.isEmpty()) {
                    childFlag = true;
                }
                if (!(deptValue instanceof Map)) continue;
                Map deptData = (Map)deptValue;
                deptData.put("childFlag", childFlag);
                deptMap.put(deptKey, deptData);
            }
        }
    }

    public ResponseEntity<List<KPIElementDTO>> kpiElementsDto(long kpiID) {
        String url = this.dbUrl + "kpielements/" + kpiID;
        System.out.println(url);
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        List outList = (List) this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
        return new ResponseEntity((Object)outList, HttpStatus.OK);
    }

    public ResponseEntity<List<DepartmentChartDTO>> deptimmediatereportees(long deptId) {
        String url = this.dbUrl + "departmentimmedReportees/" + deptId;
        System.out.println(url);
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        List outList = (List) this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
        return new ResponseEntity((Object)outList, HttpStatus.OK);
    }

    public ResponseEntity<List<Employee>> empimmediatereportees(long empId) {
        String url = this.dbUrl + "immediatereporteeList/" + empId;
        System.out.println(url);
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        List outList = (List) this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
        return new ResponseEntity((Object)outList, HttpStatus.OK);
    }

    public ResponseEntity<List<Map<String, Object>>> kpiDrillDetailsList(KPICriteriaDTO criteriaDTO, long kpiID, String kpiTableFrequency) {
        if (StringUtils.isEmpty((CharSequence)criteriaDTO.getPeriod())) {
            criteriaDTO.setPeriod((String)UserThreadLocal.get().get("DATE_PERIOD"));
        }
        KPIDTO kpidto = (KPIDTO)this.getKpiDetails(kpiID, false).getBody();
        ArrayList<Map<String, Object>> outList = new ArrayList<>();
        boolean cockpit = true;
        this.getKpiActualDataList(kpidto, null, "kpi", criteriaDTO, kpiTableFrequency, outList, cockpit);
        HashMap ParentChild = new HashMap();
        java.util.Map<String, Object> final_out = new java.util.HashMap<>();
        HashMap parent_lookup = new HashMap();
        List final_ParentChild = new ArrayList<HashMap<String, Map>>();
        if (criteriaDTO.getGroupBy().equals("Measure")) {
            for (java.util.Map<String, Object> out : outList) {
                Set keySet = out.keySet();
                block1: for (String key : (java.util.List<String>)keySet) {
                    Map inner = (Map)out.get(key);
                    if (!Objects.nonNull(inner)) continue;
                    Set keySet1 = inner.keySet();
                    for (String key2 : (java.util.List<String>)keySet1) {
                        Map dataobj = (Map)inner.get(key2);
                        if (!Objects.nonNull(dataobj)) continue;
                        int measureType = 0;
                        String measureKey = null;
                        if (dataobj.get("measureType") != null) {
                            measureType = (Integer)dataobj.get("measureType");
                        }
                        if (dataobj.get("measureKey") != null) {
                            measureKey = (String)dataobj.get("measureKey");
                        }
                        if (measureType == 1) {
                            HashMap<String, Map> innerobj;
                            List ChildList;
                            if (ParentChild.get(measureKey) != null) {
                                ChildList = (List)ParentChild.get(measureKey);
                                innerobj = new HashMap();
                                innerobj.put(key, inner);
                                ChildList.add(innerobj);
                                ParentChild.put(measureKey, ChildList);
                                continue block1;
                            }
                            ChildList = new ArrayList();
                            innerobj = new HashMap<String, Map>();
                            innerobj.put(key, inner);
                            ChildList.add(innerobj);
                            ParentChild.put(measureKey, ChildList);
                            continue block1;
                        }
                        String nodeKey = (String)dataobj.get("nodeKey");
                        parent_lookup.put(nodeKey, key);
                        final_out.put(key, inner);
                    }
                }
            }
            Set nodeKeySet = ParentChild.keySet();
            for (String nodekeyString : (java.util.List<String>)nodeKeySet) {
                if (ParentChild.get(nodekeyString) == null || parent_lookup.get(nodekeyString) == null) continue;
                Map parent = (Map)final_out.get(parent_lookup.get(nodekeyString));
                parent.put("submeasures", ParentChild.get(nodekeyString));
            }
            final_ParentChild.add(final_out);
        } else {
            final_ParentChild = outList;
            if (criteriaDTO.getTableType() != null && criteriaDTO.getTableType().equalsIgnoreCase("dril")) {
                String deptName = criteriaDTO.getDeptName();
                if (deptName != null && !deptName.isEmpty()) {
                    String[] deptData = deptName.trim().split("\\s*-\\s*", 2);
                    List filteredData = (List) final_ParentChild.stream().filter(detail_obj -> {
                        java.util.Map<String, Object> detail = (java.util.Map<String, Object>) detail_obj;
                        String key = (String)detail.keySet().iterator().next();
                        String cleanedKey = key.trim();
                        String[] parts = cleanedKey.split("\\s*-\\s*", 2);
                        String deptNameOnly = parts[0];
                        System.out.println("deptNameOnly ::: " + deptNameOnly + " |deptName :: " + deptData[0]);
                        return !deptNameOnly.equalsIgnoreCase(deptData[0]);
                    }).collect(Collectors.toList());
                    final_ParentChild = filteredData;
                }
                this.checkChildIsPresent(final_ParentChild);
            }
        }
        System.out.println("Final list out  ::: " + final_ParentChild);
        return new ResponseEntity(final_ParentChild, HttpStatus.OK);
    }

    public void getKpiActualDataList(KPIDTO kpidto, SubKPIDTO subkpidto, String flagtype, KPICriteriaDTO criteriaDTO, String kpiTableFrequency, List<Map<String, Object>> outList, boolean cockpit) {
        KPICriteria kpiCriteria = new KPICriteria();
        if (CollectionUtils.isNotEmpty((Collection)criteriaDTO.getEmployeeIds())) {
            kpiCriteria.setEmployeeIds(criteriaDTO.getEmployeeIds());
        }
        String kpiMeasurement = null;
        kpiMeasurement = flagtype.equalsIgnoreCase("subkpi") ? subkpidto.getSubKpiValue().getOrDefault("kpi_measurement", "annual").toString() : kpidto.getKpiValue().getOrDefault("kpi_measurement", "annual").toString().toString();
        criteriaDTO.setFrequency(StringUtils.isNotEmpty((CharSequence)kpiTableFrequency) ? kpiTableFrequency : kpiMeasurement);
        try {
            if (StringUtils.isNotEmpty((CharSequence)kpiTableFrequency)) {
                if (criteriaDTO.getNodeKey() != null) {
                    kpiCriteria.setNodeKey(criteriaDTO.getNodeKey());
                }
                if (flagtype.equalsIgnoreCase("subkpi")) {
                    this.kpiUtil.getKpiTableData(kpiCriteria, criteriaDTO, null, subkpidto, "subkpi", cockpit);
                } else {
                    this.kpiUtil.getKpiTableData(kpiCriteria, criteriaDTO, kpidto, null, "kpi", cockpit);
                }
                Map responseList = kpiCriteria.getResponseObject();
                for (java.util.Map.Entry<String, java.util.Map> kpiEntry : ((java.util.Map<String, java.util.Map>)responseList).entrySet()) {
                    java.util.Map<String, Object> kpiDatas = new java.util.HashMap<>();
                    String keys = (String)kpiEntry.getKey();
                    Map monthsDataObject = (Map)kpiEntry.getValue();
                    kpiDatas.put(keys, monthsDataObject);
                    outList.add(kpiDatas);
                }
            } else {
                Map subMap = null;
                subMap = flagtype.equalsIgnoreCase("subkpi") ? this.kpiUtil.getActualVsTargetData(kpiCriteria, criteriaDTO, null, subkpidto, flagtype) : this.kpiUtil.getActualVsTargetData(kpiCriteria, criteriaDTO, kpidto, null, "kpi");
                outList.add(subMap);
            }
        }
        catch (Exception e) {
            throw new RuntimeException("Error fetching KPI actual data", e);
        }
        System.out.println("Out List ::: " + outList);
    }

    public ResponseEntity<List<Map<String, Object>>> getKpiListByFormula(KPIFormula kpiFormula, String tableFrequency, String responseGroupBy) {
        KPIDTO kpidto = new KPIDTO();
        kpidto.setKpiValue(new HashMap());
        kpidto.setIncludeReportee(true);
        kpidto.getKpiValue().put("kpi_measurement", tableFrequency);
        kpidto.getKpiValue().put("dataType", kpiFormula.getDataType());
        kpidto.getKpiValue().put("kpiCurrency", kpiFormula.getCurrency());
        kpidto.getKpiValue().put("ytdFormula", kpiFormula.getFormula());
        kpidto.setKpiFormula(kpiFormula);
        List<Map<String, Object>> outList = new ArrayList<>();
        KPICriteriaDTO criteriaDTO = new KPICriteriaDTO();
        FormulaUtil formulaUtil = new FormulaUtil();
        FormulaBuilder builder = formulaUtil.extractFormulaExpression(kpiFormula, null);
        if (kpidto.getKpiFormula() != null && StringUtils.isNotEmpty((CharSequence)kpidto.getKpiFormula().getPeriod())) {
            builder.setPeriod(kpidto.getKpiFormula().getPeriod());
            criteriaDTO.setPeriod(kpidto.getKpiFormula().getPeriod());
        } else if (StringUtils.isNotEmpty((CharSequence)((CharSequence)UserThreadLocal.get().get("DATE_PERIOD")))) {
            builder.setPeriod((String)UserThreadLocal.get().get("DATE_PERIOD"));
            criteriaDTO.setPeriod((String)UserThreadLocal.get().get("DATE_PERIOD"));
        }
        criteriaDTO.setGroupBy(kpiFormula.getGroupBy());
        criteriaDTO.setDeptName(kpiFormula.getDeptName());
        criteriaDTO.setResponseGroupBy(responseGroupBy);
        criteriaDTO.setTableType(kpiFormula.getTableType());
        criteriaDTO.setDepartmentId(kpiFormula.getDeptId());
        String type = kpiFormula.getType();
        if ("drillTable".equalsIgnoreCase(type)) {
            System.out.println("enter in drillTble true");
            this.getKpiActualDataList(kpidto, null, "kpi", criteriaDTO, tableFrequency, outList, true);
        } else if ("freqTable".equalsIgnoreCase(type)) {
            System.out.println("enter in freqTable true");
            this.getKpiActualDataList(kpidto, null, "kpi", criteriaDTO, null, outList, true);
        } else {
            System.out.println("enter in formula Else true");
            HashMap subMap = new HashMap();
            KPICriteria kpiCriteria = formulaUtil.buildCriteria(builder, null);
            String deptId = this.getKpiDeptId(Long.valueOf(kpidto.getId()));
            if (Objects.nonNull(deptId)) {
                kpiCriteria.setDepartmentId(Long.parseLong(deptId));
            }
            this.kpiUtil.applyFormula(kpidto, null, "kpi", kpiCriteria, subMap);
            boolean etlPercentageCheck = Objects.nonNull(subMap.get("dataType")) && "Percentage".equalsIgnoreCase(subMap.get("dataType").toString());
            BigDecimal actual = Objects.nonNull(subMap.get("actual")) ? new BigDecimal(subMap.get("actual").toString()) : new BigDecimal(0);
            subMap.put("actual", etlPercentageCheck ? String.join((CharSequence)"", this.kpiUtil.formatdecimal(actual), "%") : this.kpiUtil.convertResult(actual, subMap));
            BigDecimal gap = new BigDecimal(0);
            if (Objects.nonNull(subMap.get("target")) && StringUtils.isNotEmpty((CharSequence)subMap.get("target").toString())) {
                gap = actual.subtract(new BigDecimal(subMap.get("target").toString()));
                subMap.put("gap", etlPercentageCheck ? String.join((CharSequence)"", this.kpiUtil.formatdecimal(gap), "%") : this.kpiUtil.convertResult(gap, subMap));
            }
            if (Objects.nonNull(subMap.get("target")) && StringUtils.isNotEmpty((CharSequence)subMap.get("target").toString())) {
                BigDecimal target = new BigDecimal(subMap.get("target").toString());
                subMap.put("target", etlPercentageCheck ? String.join((CharSequence)"", this.kpiUtil.formatdecimal(target), "%") : this.kpiUtil.convertResult(target, subMap));
            }
            outList.add(subMap);
        }
        System.out.println("Enter in check child ");
        System.out.println("get formula outList :: " + outList);
        System.out.println("type :: " + type);
        if ("drillTable".equalsIgnoreCase(type)) {
            String deptName = criteriaDTO.getDeptName();
            if (deptName != null && !deptName.isEmpty()) {
                String[] deptData = deptName.trim().split("\\s*-\\s*", 2);
                List filteredData = outList.stream().filter(detail_obj -> {
                    java.util.Map<String, Object> detail = (java.util.Map<String, Object>) detail_obj;
                    String key = (String)detail.keySet().iterator().next();
                    String cleanedKey = key.trim();
                    String[] parts = cleanedKey.split("\\s*-\\s*", 2);
                    String deptNameOnly = parts[0];
                    System.out.println("deptNameOnly ::: " + deptNameOnly + " |deptName :: " + deptData[0]);
                    return !deptNameOnly.equalsIgnoreCase(deptData[0]);
                }).collect(Collectors.toList());
                outList = filteredData;
            }
            this.checkChildIsPresent(outList);
        }
        System.out.println("Exit in check child ");
        return new ResponseEntity(outList, HttpStatus.OK);
    }

    public Map<String, Object> sortMonthlyData(Map<String, Object> input) {
        List<String> monthOrder = Arrays.asList("JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC");
        LinkedHashMap<String, Object> sorted = new LinkedHashMap<String, Object>();
        for (String month : (java.util.List<String>)monthOrder) {
            for (String key : input.keySet()) {
                if (!key.startsWith(month)) continue;
                sorted.put(key, input.get(key));
            }
        }
        return sorted;
    }

    public ResponseEntity<List<KPIDTO>> getKpiViewListWithObjId(long objId) {
        String url = this.dbUrl + "/kpiViewList/" + objId;
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        List kpi1 = (List) this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
        return new ResponseEntity((Object)this.getKpiListWithStatusLight(kpi1), HttpStatus.OK);
    }

    public List<Map<String, Object>> getNodeKeyType(List<String> nodeKeyList) {
        String url = this.dbUrl + "/getNodeKeyType";
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.postForObject(url, nodeKeyList, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public String validateFormula(String formula, String type) {
        FormulaUtil formulaUtil = new FormulaUtil();
        if ("OBJECTIVE".equalsIgnoreCase(type) || "PERSPECTIVE".equalsIgnoreCase(type)) {
            String[] searchStrArray = new String[]{"weight", "Weight", "WEIGHT"};
            String[] replaceStringArray = new String[]{"1", "1", "1"};
            formula = StringUtils.replaceEach((String)formula, (String[])searchStrArray, (String[])replaceStringArray);
            return this.validateCustomFormula(formula);
        }
        if ("KPIPERFORMANCE".equalsIgnoreCase(type) || "THRESSHOLD".equalsIgnoreCase(type)) {
            String[] searchStrArray = new String[]{"actual", "Actual", "ACTUAL", "target", "Target", "TARGET", "contribution", "Contribution", "CONTRIBUTION", "%", "weight", "Weight", "WEIGHT"};
            String[] replaceStringArray = new String[]{"1", "1", "1", "1", "1", "1", "1", "1", "1", "/100", "1", "1", "1"};
            formula = StringUtils.replaceEach((String)formula, (String[])searchStrArray, (String[])replaceStringArray);
            try {
                formulaUtil.applyExpression(formula);
            }
            catch (Exception e) {
                return "Given formula incorrect " + e.getMessage();
            }
            return "valid";
        }
        if ("SCORECARDCONFIG".equalsIgnoreCase(type)) {
            if (formula.contains(".")) {
                return "Given formula incorrect ";
            }
            if (formula.contains("]") || formula.contains("[")) {
                int s = formula.length();
                int s1 = formula.indexOf("]");
                int s2 = formula.indexOf("[");
                if (s == s1 || s - 1 == s1) {
                    String check = formula.substring(s2 + 1, s1);
                    if (check == null && check == "") {
                        return "Given formula incorrect ";
                    }
                    return "valid";
                }
                return "Given formula incorrect ";
            }
            return "Given formula incorrect ";
        }
        Matcher periodPattern = Pattern.compile("\\[(.*?)\\]").matcher(formula);
        HashSet<String> nodeKeySet = new HashSet<String>();
        while (periodPattern.find()) {
            if (nodeKeySet.contains(periodPattern.group(1))) continue;
            String nodeKey = periodPattern.group(1);
            List<String> nodeKeyList = Arrays.asList(nodeKey.split("\\,"));
            for (String nodekey : (java.util.List<String>)nodeKeyList) {
                if (this.checkNodekey(nodekey)) continue;
                return "Given nodeKey not in database ";
            }
            String checkKey = nodeKey.replaceAll("\\(", "");
            checkKey = checkKey.replaceAll("\\)", "");
            formula = formula.replace(nodeKey, checkKey);
            if (checkKey.contains(",")) {
                nodeKeySet.addAll(Arrays.asList(checkKey.split("\\,")));
                continue;
            }
            nodeKeySet.add(checkKey);
        }
        if (nodeKeySet.isEmpty()) {
            return "Please provide node keys";
        }
        formula = formula.replaceAll("\\|", ",");
        if (nodeKeySet.size() == 1) {
            formula = formula.replace(((String)nodeKeySet.stream().findFirst().get()).trim(), String.join((CharSequence)",", "1", "1"));
        } else {
            for (String nodeKey : (java.util.List<String>)nodeKeySet) {
                formula = formula.replace(nodeKey.toString(), "1");
            }
        }
        formula = formula.replaceAll("\\[", "(").replaceAll("\\]", ")");
        try {
            formulaUtil.applyExpression(formula);
        }
        catch (Exception e) {
            return "Given formula incorrect " + e.getMessage();
        }
        return "valid";
    }

    private boolean checkNodekey(String nodeKey) {
        System.out.println("Node key ::: " + nodeKey);
        List nodeKeyDataList = (List)this.retrieveNodeKeyList().getBody();
        HashSet measureNameDuplicates = new HashSet();
        Map nodeKeyMap = (Map)((java.util.List<com.estrat.backend.scorecard.dto.KPIDetailsDTO>)nodeKeyDataList).stream().collect(java.util.stream.Collectors.toMap(com.estrat.backend.scorecard.dto.KPIDetailsDTO::getMeasureName, com.estrat.backend.scorecard.dto.KPIDetailsDTO::getNodeKey, (existingValue, newValue) -> {
            measureNameDuplicates.add(existingValue);
            System.err.println("Duplicate MeasureName: " + existingValue + ", Overriding with: " + newValue);
            return existingValue;
        }));
        HashSet nodeKeyDuplicates = new HashSet();
        Map<String, String> nodeKeyMapCaseinsensitive = ((java.util.Map<String, String>)nodeKeyMap).entrySet().stream().collect(Collectors.toMap(entry -> ((String)entry.getKey()).toUpperCase(), entry -> (String)entry.getValue(), (existingValue, newValue) -> {
            nodeKeyDuplicates.add(existingValue);
            System.err.println("Duplicate NodeKey (case-insensitive): " + existingValue + ", Overriding with: " + newValue);
            return existingValue;
        }));
        String nodeKeyUppercase = nodeKey.trim().toUpperCase();
        return nodeKeyMapCaseinsensitive.containsKey(nodeKeyUppercase);
    }

    private String validateCustomFormula(String formula) {
        FormulaUtil formulaUtil = new FormulaUtil();
        Matcher periodPattern = Pattern.compile("\\[(.*?)\\]").matcher(formula);
        LinkedHashSet<String> searchList = new LinkedHashSet<String>();
        while (periodPattern.find()) {
            if (searchList.contains(periodPattern.group(1))) continue;
            String nodeKey = periodPattern.group(1);
            String checkKey = nodeKey.replaceAll("\\(", "");
            checkKey = checkKey.replaceAll("\\)", "");
            formula = formula.replace(nodeKey, checkKey);
            if (checkKey.contains(",")) {
                searchList.addAll(Arrays.asList(checkKey.split("\\,")));
                continue;
            }
            searchList.add(checkKey);
        }
        List replaceList = searchList.stream().map(search -> "1").collect(Collectors.toList());
        searchList.add("[");
        searchList.add("]");
        replaceList.add("(");
        replaceList.add(")");
        String[] searchStrArray = (String[])searchList.stream().toArray(String[]::new);
        String[] replaceStringArray = (String[])replaceList.stream().toArray(String[]::new);
        formula = StringUtils.replaceEach((String)formula, (String[])searchStrArray, (String[])replaceStringArray);
        try {
            formulaUtil.applyExpression(formula);
        }
        catch (Exception e) {
            return "Given formula incorrect " + e.getMessage();
        }
        return "valid";
    }

    public String lookupNodeKey(String nodeKey) {
        System.out.println("nodeKey -- " + nodeKey);
        if (nodeKey.matches("[0-9]+")) {
            return nodeKey;
        }
        Map<String, String> nodeKeyMap = null;
        Map<String, String> nodeKeyMapCaseinsensitive = null;
        Object nodeKeyNotWhiteSpace = null;
        if (KPIThreadLocal.get() != null && KPIThreadLocal.get().get("nodeKeyMap") != null) {
            nodeKeyMapCaseinsensitive = nodeKeyMap = (Map<String, String>)KPIThreadLocal.get().get("nodeKeyMap");
        } else {
            List nodeKeyDataList = (List)this.retrieveNodeKeyList().getBody();
            nodeKeyMap = (java.util.Map)nodeKeyDataList.stream().collect(Collectors.toMap(KPIDetailsDTO::getMeasureName, KPIDetailsDTO::getNodeKey));
            nodeKeyMapCaseinsensitive = nodeKeyMap.entrySet().stream().collect(Collectors.toMap(entry -> ((String)entry.getKey()).toUpperCase(), Map.Entry::getValue, (existingValue, newValue) -> existingValue));
            KPIThreadLocal.get().put("nodeKeyMap", nodeKeyMapCaseinsensitive);
        }
        String nodeKeyUppercase = nodeKey.trim().toUpperCase();
        if (nodeKeyMapCaseinsensitive.containsKey(nodeKeyUppercase)) {
            String lookupKey = nodeKeyMapCaseinsensitive.get(nodeKeyUppercase);
            return lookupKey;
        }
        return null;
    }

    public KPIDetailsDTO lookupNodeKeyDetail(String nodeKey) {
        if (nodeKey.matches("[0-9]+")) {
            return null;
        }
        Map nodeKeyMap = null;
        Map<String, Object> nodeKeyMapCaseinsensitive = null;
        if (KPIThreadLocal.get() != null && KPIThreadLocal.get().get("nodeKeyMapComplete") != null) {
            nodeKeyMapCaseinsensitive = nodeKeyMap = (Map)KPIThreadLocal.get().get("nodeKeyMapComplete");
        } else {
            List nodeKeyDataList = (List)this.retrieveNodeKeyList().getBody();
            nodeKeyMap = (java.util.Map)nodeKeyDataList.stream().collect(Collectors.toMap(KPIDetailsDTO::getMeasureName, Function.identity()));
            nodeKeyMapCaseinsensitive = ((java.util.Map<String, com.estrat.backend.scorecard.dto.KPIDetailsDTO>)nodeKeyMap).entrySet().stream().collect(Collectors.toMap(entry -> ((String)entry.getKey()).toUpperCase(), entry -> (com.estrat.backend.scorecard.dto.KPIDetailsDTO)entry.getValue()));
            KPIThreadLocal.get().put("nodeKeyMapComplete", nodeKeyMapCaseinsensitive);
        }
        String nodeKeyUppercase = nodeKey.trim().toUpperCase();
        if (nodeKeyMapCaseinsensitive.containsKey(nodeKeyUppercase)) {
            KPIDetailsDTO lookupKey = (KPIDetailsDTO)nodeKeyMapCaseinsensitive.get(nodeKeyUppercase);
            return lookupKey;
        }
        return null;
    }

    public ControlPanelGeneralDTO findByOrgId(long orgId) {
        HashMap<String, Long> urlVariables = new HashMap<String, Long>();
        urlVariables.put("orgId", orgId);
        String url = UriComponentsBuilder.fromHttpUrl((String)this.retrieveControlPanelGeneralUrl).buildAndExpand(urlVariables).toUriString();
        return (ControlPanelGeneralDTO)this.commonRestTemplate.getForObject(url, ControlPanelGeneralDTO.class);
    }

    public CustomPerformance findCustomPerformanceByOrgId() {
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        Map result = (Map)this.commonRestTemplate.getForObject(this.customPerformanceGetUrl, (ParameterizedTypeReference)parameterizedTypeReference);
        return new CustomPerformance(result);
    }

    public Map<String, Object> getKpiMeasureNameDetails(@PathVariable(value="kpiId") long kpiId) {
        HashMap<String, Object> response = new HashMap<String, Object>();
        String validTill = this.dateUtil.getDataValidTillDays();
        if (StringUtils.isNotEmpty((CharSequence)validTill)) {
            Date endDate;
            Date startDate;
            KPIDTO kpidto = (KPIDTO)this.getKpiDetails(kpiId, false).getBody();
            FormulaUtil formulaUtil = new FormulaUtil();
            String kpiFrequency = kpidto.getKpiValue().get("kpi_measurement").toString();
            String kpiDataType = Objects.nonNull(kpidto.getKpiValue().get("dataType")) ? kpidto.getKpiValue().get("dataType").toString() : "";
            String startEndDate = Objects.nonNull(kpidto.getKpiValue().get("kpi_start_end_date")) ? kpidto.getKpiValue().get("kpi_start_end_date").toString() : "";
            ArrayList<Date> periodList = null;
            if (Objects.isNull(periodList) || CollectionUtils.isEmpty(periodList)) {
                periodList = new ArrayList<Date>();
                String period = (String)UserThreadLocal.get().get("DATE_PERIOD");
                System.out.println("period :::::::: " + period);
                String decoded = URLDecoder.decode(period);
                String[] parts = decoded.split("\\s*-\\s*");
                String startStr = parts[0];
                String endStr = parts[1];
                SimpleDateFormat inputFormat = new SimpleDateFormat("MM/dd/yyyy");
                startDate = null;
                endDate = null;
                try {
                    startDate = inputFormat.parse(startStr);
                    endDate = inputFormat.parse(endStr);
                }
                catch (ParseException e) {
                    e.printStackTrace();
                }
                Calendar cal = Calendar.getInstance();
                cal.setTime(startDate);
                cal.add(5, 1);
                startDate = cal.getTime();
                System.out.println("startDate === " + startDate + " endDate === " + endDate);
                periodList.add(startDate);
                periodList.add(endDate);
            }
            if (CollectionUtils.isNotEmpty(periodList)) {
                Date startDate2 = (Date)periodList.get(0);
                Date endDate2 = (Date)periodList.get(1);
                String startDateString = this.dateUtil.mapToString(startDate2, "MMM dd, yyyy");
                String endDateString = this.dateUtil.mapToString(endDate2, "MMM dd, yyyy");
                response.put("periodStartDate", startDateString);
                response.put("periodEndDate", endDateString);
                response.put("period", String.join((CharSequence)"-", startDateString, endDateString));
            }
            response.put("frequency", kpiFrequency);
            response.put("dataType", kpiDataType);
            response.put("kpiId", kpidto.getKpiId());
            response.put("departmentDetails", this.getDept());
            response.put("startEndDate", startEndDate);
            response.put("validTillDate", validTill);
            if (Objects.nonNull(kpidto.getKpiFormula()) && StringUtils.isNotEmpty((CharSequence)kpidto.getKpiFormula().getFormula()) || Objects.nonNull(kpidto.getKpiValue()) && StringUtils.isNotEmpty((CharSequence)kpidto.getKpiValue().get("ytdFormula").toString())) {
                String formulatouse = "";
                if (Objects.nonNull(kpidto.getKpiFormula()) && StringUtils.isNotEmpty((CharSequence)kpidto.getKpiFormula().getFormula())) {
                    formulatouse = kpidto.getKpiFormula().getFormula();
                } else if (Objects.nonNull(kpidto.getKpiValue()) && Objects.nonNull(kpidto.getKpiValue().get("ytdFormula")) && StringUtils.isNotEmpty((CharSequence)kpidto.getKpiValue().get("ytdFormula").toString().trim())) {
                    formulatouse = kpidto.getKpiValue().get("ytdFormula").toString();
                }
                Set nodeKeySet = formulaUtil.getNodeKeyListFromFormula(formulatouse);
                ArrayList<KPIDetailsDTO> nodeKeyList = new ArrayList<KPIDetailsDTO>();
                if (!nodeKeySet.isEmpty()) {
                    for (String nodekey : (java.util.List<String>)nodeKeySet) {
                        KPIDetailsDTO detailsDTO = new KPIDetailsDTO();
                        detailsDTO.setNodeKey(this.lookupNodeKey(nodekey));
                        detailsDTO.setMeasureName(nodekey);
                        if (CollectionUtils.isNotEmpty(periodList)) {
                            startDate = (Date)periodList.get(0);
                            endDate = (Date)periodList.get(1);
                            String realdatefrom = this.dateUtil.mapToString(startDate, "MMM dd, yyyy");
                            String realdateto = this.dateUtil.mapToString(endDate, "MMM dd, yyyy");
                            HashMap urlVaiables = new HashMap();
                            String daterange = realdatefrom + "-" + realdateto;
                            urlVaiables.put("nodeKey", detailsDTO.getNodeKey());
                            String pageURL = UriComponentsBuilder.fromHttpUrl((String)this.kpiTargetUrl).queryParam("dateRange", new Object[]{daterange}).buildAndExpand(urlVaiables).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
                            TargetDTO tgtDTO = (TargetDTO)this.commonRestTemplate.getForObject(pageURL, (ParameterizedTypeReference)parameterizedTypeReference);
                            if (tgtDTO != null) {
                                detailsDTO.setOrgKpiId(tgtDTO.getOrgkpiId());
                                detailsDTO.setMtdActual(tgtDTO.getActual());
                                detailsDTO.setMtdTarget(tgtDTO.getTarget());
                            }
                        }
                        nodeKeyList.add(detailsDTO);
                    }
                }
                response.put("nodeKeyList", nodeKeyList);
            }
        }
        return response;
    }

    public List<KPIDTO> kpiListByDate(long objId, String dateRange) {
        String url = this.dbUrl + "/kpiListByDate/{objectiveId}";
        HashMap<String, Long> urlVaiables = new HashMap<String, Long>();
        urlVaiables.put("objectiveId", objId);
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("dateRange", new Object[]{dateRange}).buildAndExpand(urlVaiables).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        List kpidtoList = (List) this.commonRestTemplate.getForObject(pageURL, (ParameterizedTypeReference)parameterizedTypeReference);
        return kpidtoList;
    }

    public List<KPIDTO> kpiListByDate(long deptId, long objId, String dateRange) {
        String url = this.dbUrl + "/kpiListByDate/{objectiveId}";
        HashMap<String, Long> urlVaiables = new HashMap<String, Long>();
        urlVaiables.put("objectiveId", objId);
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("deptId", new Object[]{deptId}).queryParam("dateRange", new Object[]{dateRange}).buildAndExpand(urlVaiables).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        List kpidtoList = (List) this.commonRestTemplate.getForObject(pageURL, (ParameterizedTypeReference)parameterizedTypeReference);
        return kpidtoList;
    }

    public ResponseEntity<Map<String, Object>> saveKpiDetails(List<KPIDetailsDTO> detailsDTOs) {
        String url = this.dbUrl + "/etl/saveKpiDetails";
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        Map response = (Map)this.commonRestTemplate.postForObject(url, detailsDTOs, (ParameterizedTypeReference)parameterizedTypeReference);
        return new ResponseEntity((Object)response, HttpStatus.OK);
    }

    public List<KPIDTO> kpiListByDept(long deptId) {
        String url = this.dbUrl + "/kpiListByDept/{deptId}";
        HashMap<String, Long> urlVaiables = new HashMap<String, Long>();
        urlVaiables.put("deptId", deptId);
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).buildAndExpand(urlVaiables).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        List kpidtoList = (List) this.commonRestTemplate.getForObject(pageURL, (ParameterizedTypeReference)parameterizedTypeReference);
        return kpidtoList;
    }

    public ResponseEntity<KPIResponseDTO> retrieveKpiFormDataList(long scorecardId, boolean employeeView, String fromPage, String dateRange) {
        HashMap<String, Long> urlVariables = new HashMap<String, Long>();
        String url = this.dbUrl + "/kpiFormKpiList/{scorecardId}";
        urlVariables.put("scorecardId", scorecardId);
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("employeeView", new Object[]{employeeView}).buildAndExpand(urlVariables).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        boolean dataFlag = "KPI_DATA_FORM".equalsIgnoreCase(fromPage);
        List kpiDtoList = (List) this.commonRestTemplate.getForObject(pageURL, (ParameterizedTypeReference)parameterizedTypeReference);
        KPIResponseDTO kpiResponseDTO = new KPIResponseDTO();
        kpiResponseDTO.setKpidtoList(kpiDtoList);
        kpiResponseDTO = dataFlag ? this.kpiUtil.filterKpiList(kpiResponseDTO, dateRange) : kpiResponseDTO;
        return new ResponseEntity((Object)kpiResponseDTO, HttpStatus.OK);
    }

    public ResponseEntity<List<KPIDTO>> kpilistbasedonscorecard(Long scorecardId) {
        HashMap<String, Long> urlVariables = new HashMap<String, Long>();
        String url = this.dbUrl + "/kpiFormKpiList/{scorecardId}";
        urlVariables.put("scorecardId", scorecardId);
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).buildAndExpand(urlVariables).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        List kpiDtoList = (List) this.commonRestTemplate.getForObject(pageURL, (ParameterizedTypeReference)parameterizedTypeReference);
        return new ResponseEntity((Object)kpiDtoList, HttpStatus.OK);
    }

    public List<Map<String, Object>> getSubMeasureNodeKeyList(String nodekey, String dateRange) {
        String kpielemurl = this.dbUrl + "/kpielementsubmeasurelist/" + nodekey;
        String pageURL_elem = UriComponentsBuilder.fromHttpUrl((String)kpielemurl).queryParam("dateRange", new Object[]{dateRange}).queryParam("empid", new Object[]{UserThreadLocal.get().get("LOGGED_IN_EMPLOYEE_ID")}).toUriString();
        Object unavailableAnonymousClass = null; // Unavailable anonymous inner class
        List outList_elem = (List) this.commonRestTemplate.getForObject(pageURL_elem, (ParameterizedTypeReference)new org.springframework.core.ParameterizedTypeReference<Object>() {});
        String kpiFrequency = "monthly";
        for (Map out_elem : (java.util.List<Map>)outList_elem) {
            if (out_elem.get("frequency") == null) continue;
            if (out_elem.get("frequency").toString().equalsIgnoreCase("quarterly") && kpiFrequency.equalsIgnoreCase("monthly")) {
                kpiFrequency = out_elem.get("frequency").toString();
            }
            if (out_elem.get("frequency").toString().equalsIgnoreCase("halfyearly") && (kpiFrequency.equalsIgnoreCase("monthly") || kpiFrequency.equalsIgnoreCase("quarterly"))) {
                kpiFrequency = out_elem.get("frequency").toString();
            }
            if (!out_elem.get("frequency").toString().equalsIgnoreCase("annually") || !kpiFrequency.equalsIgnoreCase("monthly") && !kpiFrequency.equalsIgnoreCase("quarterly") && !kpiFrequency.equalsIgnoreCase("halfyearly")) continue;
            kpiFrequency = out_elem.get("frequency").toString();
        }
        List periodList = this.kpiUtil.getPeriodList(kpiFrequency);
        if (CollectionUtils.isNotEmpty((Collection)periodList)) {
            Date startDate = (Date)periodList.get(0);
            Date endDate = (Date)periodList.get(1);
            String startDateString = this.dateUtil.mapToString(startDate, "MMM dd, yyyy");
            String endDateString = this.dateUtil.mapToString(endDate, "MMM dd, yyyy");
            dateRange = String.join((CharSequence)"-", startDateString, endDateString);
        }
        String url = this.dbUrl + "/subMeasureNodeKeyList/" + nodekey;
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("dateRange", new Object[]{dateRange}).queryParam("empid", new Object[]{UserThreadLocal.get().get("LOGGED_IN_EMPLOYEE_ID")}).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        List outList = (List) this.commonRestTemplate.getForObject(pageURL, (ParameterizedTypeReference)parameterizedTypeReference);
        return outList;
    }

    public Map<String, Object> nodeKeyDataCheck(String nodekey, String dateRange) {
        String url = this.dbUrl + "/nodeKeyDataCheck/" + nodekey;
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("dateRange", new Object[]{dateRange}).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        Map outList = (Map)this.commonRestTemplate.getForObject(pageURL, (ParameterizedTypeReference)parameterizedTypeReference);
        return outList;
    }

    public Map<String, Object> subNodeKeyData(String nodekey, String measureKey, String dateRange) {
        String url = this.dbUrl + "/subNodeKeyData/" + nodekey;
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("dateRange", new Object[]{dateRange}).queryParam("measureKey", new Object[]{measureKey}).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        Map outList = (Map)this.commonRestTemplate.getForObject(pageURL, (ParameterizedTypeReference)parameterizedTypeReference);
        return outList;
    }

    public DeptDetails getDept() {
        return this.deptService.getDeptOwner();
    }

    public List<Map<String, Object>> retrieveOrgKPIDetailsByReportees(KPICriteria kpiCriteria) {
        String url = this.dbUrl + "/retrieveOrgKpiDetailsByReportee";
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        List kpiList = (List) this.commonRestTemplate.postForObject(url, (Object)kpiCriteria, (ParameterizedTypeReference)parameterizedTypeReference);
        return kpiList;
    }

    public List<Long> getAllReporteeList(String empID) {
        String url = this.dbUrl + "/organization/employeeList/" + empID;
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<KPIDTO> kpiListByDeptId(long deptId) {
        String url = this.dbUrl + "/kpiListByDeptId/{deptId}";
        HashMap<String, Long> urlVaiables = new HashMap<String, Long>();
        urlVaiables.put("deptId", deptId);
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).buildAndExpand(urlVaiables).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        List kpidtoList = (List) this.commonRestTemplate.getForObject(pageURL, (ParameterizedTypeReference)parameterizedTypeReference);
        return kpidtoList;
    }

    public Map<String, Object> checkNodeKey(String nodekey) {
        String url = this.dbUrl + "/checkNodeKey/" + nodekey;
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        Map outList = (Map)this.commonRestTemplate.getForObject(pageURL, (ParameterizedTypeReference)parameterizedTypeReference);
        return outList;
    }

    public Map<String, Object> retrieveOrgKPIDetailsByReportees(KPICriteria kpiCriteria, String type) {
        String url = this.dbUrl + "/retrieveOrgKpiDetailsByReportee";
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("type", new Object[]{type}).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        Map kpiList = (Map)this.commonRestTemplate.postForObject(pageURL, (Object)kpiCriteria, (ParameterizedTypeReference)parameterizedTypeReference);
        return kpiList;
    }

    public Map<String, Object> getOrgKpiDetailsForSubMeasure(KPICriteria kpiCriteria, String type) {
        String url = this.dbUrl + "/retrieveOrgKpiDetailsByReportee";
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("type", new Object[]{type}).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        Map kpiList = (Map)this.commonRestTemplate.postForObject(pageURL, (Object)kpiCriteria, (ParameterizedTypeReference)parameterizedTypeReference);
        return kpiList;
    }

    public List<KpiList> checkkpiListByEmpId(long empId) {
        String url = this.dbUrl + "/checkkpiListByEmpId/{empId}";
        HashMap<String, Long> urlVariables = new HashMap<String, Long>();
        urlVariables.put("empId", empId);
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).buildAndExpand(urlVariables).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        List scoreCard = (List) this.commonRestTemplate.getForObject(pageURL, (ParameterizedTypeReference)parameterizedTypeReference);
        return scoreCard;
    }

    public List<KpiList> checkkpiListByDeptId() {
        String url = this.dbUrl + "/checkkpiListByDeptId";
        HashMap urlVariables = new HashMap();
        urlVariables.put("deptId", "");
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).buildAndExpand(urlVariables).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        List scoreCard = (List) this.commonRestTemplate.getForObject(pageURL, (ParameterizedTypeReference)parameterizedTypeReference);
        return scoreCard;
    }

    public List<KpiDetailsAttachmentsDTO> retriveAttachmentByKpiId(Long kpiId) {
        String url = this.dbUrl + "/kpiAttachmentList/" + kpiId;
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public String kpiContributionPercentage(Long kpiId, String deptName) {
        System.out.println("ALG kpiId == " + kpiId + "  =  deptName == " + deptName);
        String url = this.dbUrl + "kpiContributionPercentage/" + kpiId;
        System.out.println("ALG URL == " + url);
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("deptName", new Object[]{deptName}).queryParam("type", new Object[]{"kpi"}).toUriString();
        System.out.println("ALG pageURL == " + pageURL);
        Object percentage = this.commonRestTemplate.getForObject(pageURL, String.class);
        return percentage != null ? percentage.toString() : null;
    }

    public String supKpiContributionPercentage(Long kpiId, String deptName) {
        System.out.println("ALG sub kpiId == " + kpiId + "  =  deptName == " + deptName);
        String url = this.dbUrl + "kpiContributionPercentage/" + kpiId;
        System.out.println("ALG URL == " + url);
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("deptName", new Object[]{deptName}).queryParam("type", new Object[]{"subkpi"}).toUriString();
        System.out.println("ALG pageURL == " + pageURL);
        Object percentage = this.commonRestTemplate.getForObject(pageURL, String.class);
        return percentage != null ? percentage.toString() : null;
    }

    public String kpiContributionPercentagedeptId(Long kpiId, String deptId) {
        System.out.println("ALG kpiId == " + kpiId + "  =  deptId == " + deptId);
        String url = this.dbUrl + "kpiContributionPercentagebyDeptId/" + kpiId;
        System.out.println("ALG URL == " + url);
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("deptId", new Object[]{deptId}).queryParam("type", new Object[]{"kpi"}).toUriString();
        System.out.println("ALG pageURL == " + pageURL);
        Object percentage = this.commonRestTemplate.getForObject(pageURL, String.class);
        return percentage != null ? percentage.toString() : null;
    }

    public String supKpiContributionPercentagedeptId(Long kpiId, String deptId) {
        System.out.println("ALG sub kpiId == " + kpiId + "  =  deptId == " + deptId);
        String url = this.dbUrl + "kpiContributionPercentagebyDeptId/" + kpiId;
        System.out.println("ALG URL == " + url);
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("deptId", new Object[]{deptId}).queryParam("type", new Object[]{"subkpi"}).toUriString();
        System.out.println("ALG pageURL == " + pageURL);
        Object percentage = this.commonRestTemplate.getForObject(pageURL, String.class);
        return percentage != null ? percentage.toString() : null;
    }

    public Map<String, String> kpiContributionPercentagesBulk(Long kpiId, List<String> deptIds, String type) {
        String url = this.dbUrl + "kpiContributionPercentagesBulk/" + kpiId;
        String pageURL = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("type", new Object[]{type}).toUriString();
        Object unavailableAnonymousClass = null; // Unavailable anonymous inner class
        return (Map)this.commonRestTemplate.postForObject(pageURL, deptIds, new org.springframework.core.ParameterizedTypeReference<java.util.List<java.util.Map<String, Object>>>() {});
    }

    public Map<Integer, List<Map<String, Object>>> retrieveOrgKPIDetailsBulk(List<KPICriteria> criteriaList) {
        String url = this.dbUrl + "/retrieveOrgKpiDetailsByReporteeBulk";
        Object unavailableAnonymousClass = null; // Unavailable anonymous inner class
        return (Map)this.commonRestTemplate.postForObject(url, criteriaList, new org.springframework.core.ParameterizedTypeReference<java.util.List<java.util.Map<String, Object>>>() {});
    }
}

