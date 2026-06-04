/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.controller.KPIController
 *  com.estrat.web.dto.KPICriteriaDTO
 *  com.estrat.web.dto.KPIDTO
 *  com.estrat.web.dto.KPIDetailsDTO
 *  com.estrat.web.dto.KPIFormula
 *  com.estrat.web.dto.KPIResponseDTO
 *  com.estrat.web.dto.KpiDetailsAttachmentsDTO
 *  com.estrat.web.dto.KpiList
 *  com.estrat.web.dto.TargetDTO
 *  com.estrat.web.exception.RequestException
 *  com.estrat.web.service.EmployeeService
 *  com.estrat.web.service.KPIService
 *  com.estrat.web.service.SubKPIService
 *  com.estrat.web.util.DateUtil
 *  com.estrat.web.util.RequestSessionUtil
 *  com.estrat.web.util.UserThreadLocal
 *  javax.servlet.http.HttpServletRequest
 *  org.apache.commons.collections4.CollectionUtils
 *  org.apache.commons.lang3.StringUtils
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.io.Resource
 *  org.springframework.core.io.UrlResource
 *  org.springframework.http.HttpHeaders
 *  org.springframework.http.HttpStatus
 *  org.springframework.http.ResponseEntity
 *  org.springframework.http.ResponseEntity$BodyBuilder
 *  org.springframework.web.bind.annotation.DeleteMapping
 *  org.springframework.web.bind.annotation.GetMapping
 *  org.springframework.web.bind.annotation.PathVariable
 *  org.springframework.web.bind.annotation.PostMapping
 *  org.springframework.web.bind.annotation.PutMapping
 *  org.springframework.web.bind.annotation.RequestBody
 *  org.springframework.web.bind.annotation.RequestParam
 *  org.springframework.web.bind.annotation.ResponseBody
 *  org.springframework.web.bind.annotation.RestController
 */
package com.estrat.web.controller;

import com.estrat.web.dto.KPICriteriaDTO;
import com.estrat.web.dto.KPIDTO;
import com.estrat.web.dto.KPIDetailsDTO;
import com.estrat.web.dto.KPIFormula;
import com.estrat.web.dto.KPIResponseDTO;
import com.estrat.web.dto.KpiDetailsAttachmentsDTO;
import com.estrat.web.dto.KpiList;
import com.estrat.web.dto.TargetDTO;
import com.estrat.web.exception.RequestException;
import com.estrat.web.service.EmployeeService;
import com.estrat.web.service.KPIService;
import com.estrat.web.service.SubKPIService;
import com.estrat.web.util.DateUtil;
import com.estrat.web.util.RequestSessionUtil;
import com.estrat.web.util.UserThreadLocal;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import javax.servlet.http.HttpServletRequest;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class KPIController {
    @Autowired
    private KPIService kpiService;
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    protected RequestSessionUtil sessionUtil;
    @Autowired
    protected SubKPIService subKPIService;
    @Value(value="${upload.path.local}")
    public String BASE_PATH;

    @GetMapping(value={"/kpi/{id}"})
    public ResponseEntity<?> getKpiDetails(@PathVariable long id, @RequestParam(value="statusLightFlag", required=false) String statusLightFlag, @RequestParam(value="flagtype", required=false) String flagtype) {
        boolean flag;
        boolean bl = flag = statusLightFlag != null ? Boolean.valueOf(statusLightFlag) : false;
        if (flagtype != null && flagtype.equalsIgnoreCase("subkpi")) {
            return this.subKPIService.getSubKpiDetails(id, flag);
        }
        return this.kpiService.getKpiDetails(id, flag);
    }

    @PostMapping(value={"/kpi"})
    public ResponseEntity<KPIDTO> saveOrUpdateDetails(@RequestBody KPIDTO kpi, HttpServletRequest request) {
        kpi.setCreatedBy(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue());
        kpi.setActType(1);
        if (request.getSession().getAttribute("reporteeIds") != null) {
            kpi.getKpiFormula().setEmpployeeIds((List)request.getSession().getAttribute("reporteeIds"));
        }
        return this.kpiService.saveOrUpdateDetails(kpi, "Save");
    }

    @GetMapping(value={"/nodeTargetByDate/{nodeKey}"})
    public ResponseEntity<TargetDTO> nodeTargetByDate(@PathVariable(value="nodeKey") long nodeKey, @RequestParam(value="dateRange", required=false) String dateRange) {
        return this.kpiService.getnodekeyTarget(nodeKey, dateRange);
    }

    @DeleteMapping(value={"/kpi/{id}"})
    public ResponseEntity<Boolean> deleteKPIById(@PathVariable(value="id") long id, HttpServletRequest request) throws RequestException {
        this.kpiService.deleteKPIById(id);
        return new ResponseEntity(true, HttpStatus.OK);
    }

    @PutMapping(value={"/kpi"})
    public ResponseEntity<KPIDTO> updateDetails(@RequestBody KPIDTO kpi, HttpServletRequest request) {
        kpi.setUpdatedBy(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue());
        if (kpi.isThresholdvalueupdate()) {
            kpi.setActType(2);
        } else {
            kpi.setActType(1);
        }
        if (request.getSession().getAttribute("reporteeIds") != null) {
            kpi.getKpiFormula().setEmpployeeIds((List)request.getSession().getAttribute("reporteeIds"));
        }
        return this.kpiService.saveOrUpdateDetails(kpi, "Update");
    }

    @GetMapping(value={"/kpiList"})
    public ResponseEntity<List<KPIDTO>> kpiList(@RequestParam(value="ownerFlag", required=false) String ownerFlag) {
        boolean flag = ownerFlag != null ? Boolean.valueOf(ownerFlag) : false;
        return this.kpiService.getKpiList(flag);
    }

    @GetMapping(value={"/retrieveNodeKeyList"})
    public ResponseEntity<List<KPIDetailsDTO>> retriveKpiDetailsList() {
        return this.kpiService.retrieveNodeKeyList();
    }

    @GetMapping(value={"/kpiList/{empId}"})
    public ResponseEntity<KPIResponseDTO> getKpiDetailsList(@PathVariable String empId, @RequestParam(value="ownerFlag", required=false) String ownerFlag, @RequestParam(value="fromPage", required=false) String fromPage) {
        boolean flag = ownerFlag != null ? Boolean.valueOf(ownerFlag) : false;
        return this.kpiService.retrieveKpiList(empId, flag, fromPage);
    }

    @GetMapping(value={"/v2/kpiList/{objectiveId}"})
    public ResponseEntity<?> kpiListFromObjectives(HttpServletRequest request, @PathVariable(value="objectiveId") long objectiveId, @RequestParam(value="datePeriod") String datePeriod, @RequestParam(value="flagtype") String flagtype) {
        request.getSession().setAttribute("datePeriod", datePeriod);
        UserThreadLocal.get().setDatePeriod(datePeriod);
        if (flagtype.equalsIgnoreCase("subkpi")) {
            return this.subKPIService.getSubKpiListWithObjId(objectiveId);
        }
        return this.kpiService.getKpiListWithObjId(objectiveId);
    }

    @GetMapping(value={"/kpiDetailList/{kpiId}"})
    public List<Map<String, Object>> kpiDetailsListFromEmployerId(@RequestParam(value="period") String period, HttpServletRequest request, @PathVariable(value="kpiId") long kpiID, @RequestParam(name="tableFrequency", required=false) String tableFrequency, @RequestParam(name="groupBy", required=false) String groupBy, @RequestParam(name="originOrg", required=false) Long originOrg, @RequestParam(name="responseGrouping", required=false) String responseGroupBy, @RequestParam(name="tableType", required=false) String tableType, @RequestParam(name="deptName", required=false) String deptName, @RequestParam(name="flagType", required=false) String flagType) {
        KPICriteriaDTO criteriaDTO = new KPICriteriaDTO();
        criteriaDTO.setPeriod(period);
        criteriaDTO.setGroupBy(groupBy);
        criteriaDTO.setResponseGroupBy(responseGroupBy);
        criteriaDTO.setTableType(tableType);
        criteriaDTO.setOrginDept(originOrg);
        if (StringUtils.isNotEmpty((CharSequence)deptName)) {
            criteriaDTO.setDeptName(deptName);
        }
        if (request.getSession().getAttribute("reporteeIds") != null) {
            criteriaDTO.setEmployeeIds((List)request.getSession().getAttribute("reporteeIds"));
        } else {
            List allRepoteeList = this.employeeService.getAllReporteeList(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue());
            List reporteeIds = ((java.util.List<com.estrat.web.dto.EmployeeDTO>)allRepoteeList).stream().map(employee -> employee.getEmpId()).collect(Collectors.toList());
            reporteeIds.add(Long.valueOf(this.sessionUtil.getSessionId(request)));
            criteriaDTO.setEmployeeIds(reporteeIds);
            request.getSession().setAttribute("reporteeIds", reporteeIds);
        }
        List response = null;
        response = flagType != null && !flagType.isEmpty() && flagType.equalsIgnoreCase("subkpi") ? (List)this.kpiService.kpiDetailsListFromEmployerId(criteriaDTO, kpiID, tableFrequency, flagType).getBody() : (List)this.kpiService.kpiDetailsListFromEmployerId(criteriaDTO, kpiID, tableFrequency, flagType).getBody();
        StringBuilder builder = new StringBuilder();
        if (StringUtils.isEmpty((CharSequence)tableFrequency)) {
            for (Object _obj_rowObj : response) {
                Map rowObj = (Map) _obj_rowObj;
                for (Object key : rowObj.keySet()) {
                    Map subMap = (Map)rowObj.get(key);
                    builder.append("<tr>");
                    builder.append("<th>" + key.toString() + "</th>");
                    builder.append("<td>" + subMap.get("actual") + "</td>");
                    builder.append("<td>" + subMap.get("target") + "</td>");
                    builder.append("<td>" + subMap.get("gap") + "</td>");
                    builder.append("</tr>");
                }
            }
        }
        return response;
    }

    @GetMapping(value={"/kpiDetailListMeasure"})
    public List<Map<String, Object>> kpiDetailListMeasure(@RequestParam(value="period") String period, HttpServletRequest request, @RequestParam(name="tableFrequency", required=false) String tableFrequency, @RequestParam(name="groupBy", required=false) String groupBy, @RequestParam(name="originOrg", required=false) Long originOrg, @RequestParam(name="responseGrouping", required=false) String responseGroupBy, @RequestParam(name="nodeKey", required=false) String nodeKey, @RequestParam(name="tableType", required=false) String tableType, @RequestParam(name="scorecard", required=false) String scorecard, @RequestParam(name="kpi", required=false) String kpi, @RequestParam(name="deptName", required=false) String deptName) {
        KPICriteriaDTO criteriaDTO = new KPICriteriaDTO();
        criteriaDTO.setPeriod(period);
        criteriaDTO.setGroupBy(groupBy);
        criteriaDTO.setNodeKey(nodeKey);
        criteriaDTO.setResponseGroupBy(responseGroupBy);
        criteriaDTO.setTableType(tableType);
        criteriaDTO.setOrginDept(originOrg);
        if (StringUtils.isNotEmpty((CharSequence)deptName)) {
            criteriaDTO.setDeptName(deptName);
        }
        if (request.getSession().getAttribute("reporteeIds") != null) {
            criteriaDTO.setEmployeeIds((List)request.getSession().getAttribute("reporteeIds"));
        } else {
            List allRepoteeList = this.employeeService.getAllReporteeList(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue());
            List reporteeIds = ((java.util.List<com.estrat.web.dto.EmployeeDTO>)allRepoteeList).stream().map(employee -> employee.getEmpId()).collect(Collectors.toList());
            reporteeIds.add(Long.valueOf(this.sessionUtil.getSessionId(request)));
            criteriaDTO.setEmployeeIds(reporteeIds);
            request.getSession().setAttribute("reporteeIds", reporteeIds);
        }
        if (kpi.contains("all") && scorecard != null) {
            String[] scorecards = scorecard.split(",");
            ArrayList<Map<String, Object>> response = new ArrayList<Map<String, Object>>();
            ArrayList kpis = new ArrayList();
            for (String scorecardval : scorecards) {
                List kpi_list = this.kpiService.kpilistbasedonscorecard(Long.valueOf(Long.parseLong(scorecardval)));
                if (kpi_list == null || kpi_list.size() <= 0) continue;
                kpis.addAll(kpi_list);
            }
            for (Object _obj_kpi_id : kpis) {
                KPIDTO kpi_id = (KPIDTO) _obj_kpi_id;
                List response_out = (List) (List)this.kpiService.kpiDetailsdrillListFromEmployerId(criteriaDTO, kpi_id.getId(), tableFrequency).getBody();
                if (response_out == null || response_out.size() <= 0 || ((Map)response_out.get(0)).isEmpty()) continue;
                response.addAll(response_out);
            }
            return response;
        }
        if (kpi.contains(",")) {
            String[] kpis = kpi.split(",");
            List<String> kpiIDs = Arrays.asList(kpis);
            ArrayList<Map<String, Object>> response = new ArrayList<Map<String, Object>>();
            for (String kpi_id : kpiIDs) {
                List response_out = (List) (List)this.kpiService.kpiDetailsdrillListFromEmployerId(criteriaDTO, Long.parseLong(kpi_id), tableFrequency).getBody();
                System.out.println(response_out);
                if (response_out == null || response_out.size() <= 0 || ((Map)response_out.get(0)).isEmpty()) continue;
                response.addAll(response_out);
            }
            return response;
        }
        List response = (List) (List)this.kpiService.kpiDetailsdrillListFromEmployerId(criteriaDTO, Long.parseLong(kpi), tableFrequency).getBody();
        return response;
    }

    @GetMapping(value={"/kpiViewDetailList/{kpiId}"})
    public ResponseEntity<List<Map<String, Object>>> kpiViewDetailsList(@PathVariable(value="kpiId") long kpiID) {
        return (ResponseEntity<List<Map<String, Object>>>) (ResponseEntity) this.kpiService.kpiViewDetailsList(kpiID);
    }

    @PostMapping(value={"/validateFormula"})
    public ResponseEntity<String> validateFormula(@RequestBody KPIFormula kpiFormula) {
        return this.kpiService.validateFormula(kpiFormula);
    }

    @PostMapping(value={"/formula/kpiList"})
    public ResponseEntity<List<Map<String, Object>>> kpiListByFormula(@RequestBody KPIFormula kpiFormula, @RequestParam(name="tableFrequency", required=false) String tableFrequency, @RequestParam(name="responseGrouping", required=false) String responseGroupBy) {
        return (ResponseEntity<List<Map<String, Object>>>) (ResponseEntity) this.kpiService.getKpiListByFormula(kpiFormula, tableFrequency, responseGroupBy);
    }

    @GetMapping(value={"/validate/calendarYear"})
    public ResponseEntity<Boolean> validateCalendarYear(@RequestParam(name="period") String period) {
        return new ResponseEntity(DateUtil.validateCalendarYear((String)period), HttpStatus.OK);
    }

    @GetMapping(value={"/kpiViewList"})
    public ResponseEntity<List<KPIDTO>> kpiList() {
        return this.kpiService.getKpiList(true);
    }

    @GetMapping(value={"/kpi/formula/measureNames/{kpiId}"})
    public ResponseEntity<Map<String, Object>> getKpiMeasureNameDetails(@PathVariable(value="kpiId") long kpiId) {
        return new ResponseEntity(this.kpiService.getKpiMeasureNameDetails(kpiId), HttpStatus.OK);
    }

    @PostMapping(value={"/web/saveOrgKpiDetails"})
    public ResponseEntity<KPIDetailsDTO> saveKpiDetails(@RequestBody KPIDetailsDTO kpiDetailsDTO, HttpServletRequest request) {
        kpiDetailsDTO.setEmpId(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue());
        kpiDetailsDTO.setOrgKey(this.sessionUtil.getSessionId(request));
        kpiDetailsDTO.setOrganizationName(UserThreadLocal.get().getProfile().getFirstName());
        return new ResponseEntity(this.kpiService.saveOrgKpiDetails(kpiDetailsDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/kpi/download"})
    @ResponseBody
    public ResponseEntity<Resource> downloadFile(@RequestParam(value="uniqueKey") String uniqueKey, @RequestParam(value="fileName") String fileName, @RequestParam(value="fileType") String fileType) throws IOException {
        UrlResource resource;
        String filePath = this.BASE_PATH + "/kpi/" + uniqueKey;
        Path path = Paths.get(filePath, new String[0]);
        try {
            resource = new UrlResource(path.toUri());
        }
        catch (MalformedURLException e) {
            throw new RuntimeException("Issue in reading the file", e);
        }
        if (resource.exists() && resource.isReadable()) {
            HttpHeaders headers = new HttpHeaders();
            headers.add("Content-Disposition", "attachment; filename=\"" + fileName + "\"");
            headers.add("Content-Type", fileType);
            return ((ResponseEntity.BodyBuilder)ResponseEntity.ok().headers(headers)).body(resource);
        }
        throw new RuntimeException("File not found or not readable");
    }

    @GetMapping(value={"/kpiListByDate/{objectiveId}"})
    public ResponseEntity<List<KPIDTO>> kpiListByDate(@PathVariable(value="objectiveId") long objectiveId, @RequestParam(value="dateRange", required=false) String dateRange) {
        return new ResponseEntity(this.kpiService.kpiListByDate(objectiveId, dateRange), HttpStatus.OK);
    }

    @GetMapping(value={"/kpiListByDept/{deptId}"})
    public ResponseEntity<List<KPIDTO>> kpiListByDept(@PathVariable(value="deptId") long deptId) {
        List kpiList = this.kpiService.kpiListByDept(deptId);
        if (CollectionUtils.isNotEmpty((Collection)kpiList)) {
            return new ResponseEntity(kpiList, HttpStatus.OK);
        }
        return new ResponseEntity(Collections.emptyList(), HttpStatus.OK);
    }

    @GetMapping(value={"/kpiFormKpiList/{id}"})
    public ResponseEntity<KPIResponseDTO> kpiFormKpiList(@PathVariable String id, @RequestParam(value="ownerFlag", required=false) String ownerFlag, @RequestParam(value="fromPage", required=false) String fromPage, @RequestParam(value="dateRange", required=false) String dateRange) {
        boolean flag = ownerFlag != null ? Boolean.valueOf(ownerFlag) : false;
        String empId = String.valueOf(UserThreadLocal.get().getProfile().getEmpId());
        return this.kpiService.retrieveKpiFormDataList(id, flag, fromPage, dateRange);
    }

    @GetMapping(value={"/subMeasureNodeKeyList/{nodeKey}"})
    public ResponseEntity<List<Map<String, Object>>> subMeasureNodeKeyList(@PathVariable String nodeKey, @RequestParam(value="dateRange", required=false) String dateRange) {
        return (ResponseEntity<List<Map<String, Object>>>) (ResponseEntity) this.kpiService.getSubMeasureNodeKeyList(nodeKey, dateRange);
    }

    @GetMapping(value={"/subNodeKeyData/{nodeKey}"})
    public ResponseEntity<Map<String, Object>> subNodeKeyData(@PathVariable(value="nodeKey") String nodeKey, @RequestParam(value="measureKey") String measureKey, @RequestParam(value="dateRange", required=false) String dateRange) {
        return new ResponseEntity(this.kpiService.subNodeKeyData(nodeKey, measureKey, dateRange), HttpStatus.OK);
    }

    @GetMapping(value={"/kpiListByDeptId/{deptId}"})
    public ResponseEntity<List<KPIDTO>> kpiListByDeptId(@PathVariable long deptId) {
        List kpiList = this.kpiService.kpiListByDeptId(deptId);
        return new ResponseEntity(kpiList, HttpStatus.OK);
    }

    @GetMapping(value={"/formula1/kpiList"})
    public ResponseEntity<List<Map<String, Object>>> kpiListByFormula1(@RequestBody KPIFormula kpiFormula, @RequestParam(name="tableFrequency", required=false) String tableFrequency, @RequestParam(name="responseGrouping", required=false) String responseGroupBy) {
        return (ResponseEntity<List<Map<String, Object>>>) (ResponseEntity) this.kpiService.getKpiListByFormula(kpiFormula, tableFrequency, responseGroupBy);
    }

    @GetMapping(value={"/checkkpiListByEmpId"})
    public ResponseEntity<List<KpiList>> kpiListByEmpId() {
        return new ResponseEntity(this.kpiService.checkkpiListByEmpId(), HttpStatus.OK);
    }

    @GetMapping(value={"/checkkpiListByDeptId"})
    public ResponseEntity<List<KpiList>> kpiListByDeptId() {
        return new ResponseEntity(this.kpiService.checkkpiListByDeptId(), HttpStatus.OK);
    }

    @GetMapping(value={"/kpiAttachmentList/{kpiId}"})
    public ResponseEntity<List<KpiDetailsAttachmentsDTO>> retriveAttachemnts(@PathVariable(value="kpiId") Long kpiId) {
        return new ResponseEntity(this.kpiService.retriveAttachmentByKpiId(kpiId), HttpStatus.OK);
    }
}

