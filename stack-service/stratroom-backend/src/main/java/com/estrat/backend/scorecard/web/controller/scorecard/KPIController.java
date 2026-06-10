/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.scorecard.dto.KPICriteriaDTO
 *  com.estrat.backend.scorecard.dto.KPIDTO
 *  com.estrat.backend.scorecard.dto.KPIDetailsDTO
 *  com.estrat.backend.scorecard.dto.KPIFormula
 *  com.estrat.backend.scorecard.dto.KPIResponseDTO
 *  com.estrat.backend.scorecard.dto.KpiDetailsAttachmentsDTO
 *  com.estrat.backend.scorecard.dto.KpiList
 *  com.estrat.backend.scorecard.dto.TargetDTO
 *  com.estrat.backend.scorecard.service.KPIService
 *  com.estrat.backend.scorecard.util.UserThreadLocal
 *  com.estrat.backend.scorecard.web.controller.scorecard.KPIController
 *  com.fasterxml.jackson.core.JsonProcessingException
 *  com.fasterxml.jackson.databind.ObjectMapper
 *  javax.servlet.http.HttpServletRequest
 *  org.apache.commons.collections4.CollectionUtils
 *  org.apache.commons.lang3.StringUtils
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.core.io.InputStreamResource
 *  org.springframework.http.HttpStatus
 *  org.springframework.http.ResponseEntity
 *  org.springframework.web.bind.annotation.DeleteMapping
 *  org.springframework.web.bind.annotation.GetMapping
 *  org.springframework.web.bind.annotation.PathVariable
 *  org.springframework.web.bind.annotation.PostMapping
 *  org.springframework.web.bind.annotation.PutMapping
 *  org.springframework.web.bind.annotation.RequestBody
 *  org.springframework.web.bind.annotation.RequestParam
 *  org.springframework.web.bind.annotation.RestController
 */
package com.estrat.backend.scorecard.web.controller.scorecard;

import com.estrat.backend.scorecard.dto.KPICriteriaDTO;
import com.estrat.backend.scorecard.dto.KPIDTO;
import com.estrat.backend.scorecard.dto.KPIDetailsDTO;
import com.estrat.backend.scorecard.dto.KPIFormula;
import com.estrat.backend.scorecard.dto.KPIResponseDTO;
import com.estrat.backend.scorecard.dto.KpiDetailsAttachmentsDTO;
import com.estrat.backend.scorecard.dto.KpiList;
import com.estrat.backend.scorecard.dto.TargetDTO;
import com.estrat.backend.scorecard.service.KPIService;
import com.estrat.backend.scorecard.util.UserThreadLocal;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class KPIController {
    @Autowired
    private KPIService kpiService;

    @GetMapping(value={"/kpi/{id}"})
    public ResponseEntity<KPIDTO> getKpiDetails(@PathVariable long id, @RequestParam(value="statusLightFlag", required=false) String statusLightFlag) {
        boolean flag = statusLightFlag != null ? Boolean.valueOf(statusLightFlag) : false;
        return this.kpiService.getKpiDetails(id, flag);
    }

    @PostMapping(value={"/kpi"})
    public ResponseEntity<KPIDTO> saveOrUpdateDetails(@RequestBody KPIDTO kpi) {
        kpi.setCreatedTime(LocalDateTime.now());
        ObjectMapper mapper = new ObjectMapper();
        try {
            kpi.getKpiValue().put("kpiFormula", mapper.writeValueAsString((Object)kpi.getKpiFormula()));
        }
        catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        return this.kpiService.saveOrUpdateDetails(kpi);
    }

    @DeleteMapping(value={"/kpi/{id}"})
    public ResponseEntity<Boolean> deleteKPIById(@PathVariable long id) {
        return this.kpiService.deleteKPIById(id);
    }

    @PutMapping(value={"/kpi"})
    public ResponseEntity<KPIDTO> updateKPIDetails(@RequestBody KPIDTO kpi) {
        kpi.setUpdatedTime(LocalDateTime.now());
        ObjectMapper mapper = new ObjectMapper();
        try {
            kpi.getKpiValue().put("kpiFormula", mapper.writeValueAsString((Object)kpi.getKpiFormula()));
        }
        catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        return this.kpiService.saveOrUpdateDetails(kpi);
    }

    @GetMapping(value={"/kpiList"})
    public ResponseEntity<List<KPIDTO>> kpiList(HttpServletRequest request, @RequestParam(value="employeeView", required=false) String employeeView) {
        boolean flag = employeeView != null ? Boolean.valueOf(employeeView) : false;
        return this.kpiService.getKpiListWithEmpId(((String)UserThreadLocal.get().get("LOGGED_IN_EMPLOYEE_ID")).toString(), flag);
    }

    @GetMapping(value={"/retrieveNodeKeyList"})
    public ResponseEntity<List<KPIDetailsDTO>> retrieveNodeKeyList() {
        return this.kpiService.retrieveNodeKeyList();
    }

    @GetMapping(value={"/downloadPdf/{id}"})
    public ResponseEntity<InputStreamResource> downloadPdf(@PathVariable long id) throws IOException {
        return this.kpiService.downloadPdf(id);
    }

    @GetMapping(value={"/downloadExcel/{id}"})
    public ResponseEntity<InputStreamResource> downloadExcel(@PathVariable long id) throws IOException {
        return this.kpiService.excelKpiReport(id);
    }

    @GetMapping(value={"/kpiList/{empId}"})
    public ResponseEntity<KPIResponseDTO> getKpiDetailsList(@PathVariable long empId, @RequestParam(value="employeeView", required=false) String employeeView, @RequestParam(value="fromPage", required=false) String fromPage) {
        boolean flag = employeeView != null ? Boolean.valueOf(employeeView) : false;
        return this.kpiService.retrieveKpiList(empId, flag, fromPage);
    }

    @GetMapping(value={"/nodeTargetByDate/{nodeKey}"})
    public ResponseEntity<TargetDTO> nodeTargetByDate(@PathVariable(value="nodeKey") long nodeKey, @RequestParam(value="dateRange", required=false) String dateRange) {
        return this.kpiService.getnodekeyTarget(nodeKey, dateRange);
    }

    @GetMapping(value={"/v2/kpiList/{objectiveId}"})
    public ResponseEntity<List<KPIDTO>> kpiListFromObjectives(@PathVariable(value="objectiveId") long objectiveId) {
        return this.kpiService.getKpiListWithObjId(objectiveId);
    }

    @GetMapping(value={"/kpiDetailList/{kpiId}"})
    public ResponseEntity<List<Map<String, Object>>> kpiActualDetailsList(@RequestBody KPICriteriaDTO criteriaDTO, @PathVariable(value="kpiId") long kpiID, @RequestParam(name="tableFrequency", required=false) String tableFrequency, @RequestParam(name="flagtype", required=false) String flagtype) {
        return this.kpiService.kpiActualDetailsList(criteriaDTO, kpiID, tableFrequency, flagtype);
    }

    @GetMapping(value={"/kpiDrillDetailList/{kpiId}"})
    public ResponseEntity<List<Map<String, Object>>> kpiDrillDetailsList(@RequestBody KPICriteriaDTO criteriaDTO, @PathVariable(value="kpiId") long kpiID, @RequestParam(name="tableFrequency", required=false) String tableFrequency) {
        return this.kpiService.kpiDrillDetailsList(criteriaDTO, kpiID, tableFrequency);
    }

    @GetMapping(value={"/kpiViewList/{objectiveId}"})
    public ResponseEntity<List<KPIDTO>> kpiListFromObjectivesId(@PathVariable(value="objectiveId") long objectiveId) {
        return this.kpiService.getKpiViewListWithObjId(objectiveId);
    }

    @PostMapping(value={"/validateFormula"})
    public ResponseEntity<String> validateFormula(@RequestBody KPIFormula kpiFormula) {
        return new ResponseEntity((Object)this.kpiService.validateFormula(kpiFormula.getFormula(), kpiFormula.getType()), HttpStatus.OK);
    }

    @PostMapping(value={"/formula/kpiList"})
    public ResponseEntity<List<Map<String, Object>>> kpiListByFormula(@RequestBody KPIFormula kpiFormula, @RequestParam(name="tableFrequency", required=false) String tableFrequency, @RequestParam(name="responseGrouping", required=false) String responseGroupBy) {
        String[] searchArray = new String[]{"%20", "%2520"};
        String[] replaceArray = new String[]{"", ""};
        tableFrequency = StringUtils.replaceEach((String)tableFrequency, (String[])searchArray, (String[])replaceArray);
        return this.kpiService.getKpiListByFormula(kpiFormula, tableFrequency, responseGroupBy);
    }

    @GetMapping(value={"/kpi/formula/measureNames/{kpiId}"})
    public ResponseEntity<Map<String, Object>> getKpiMeasureNameDetails(@PathVariable(value="kpiId") long kpiId) {
        return new ResponseEntity((Object)this.kpiService.getKpiMeasureNameDetails(kpiId), HttpStatus.OK);
    }

    @PostMapping(value={"/web/saveOrgKpiDetails"})
    public ResponseEntity<KPIDetailsDTO> saveOrgKpiDetails(@RequestBody KPIDetailsDTO kpiDetailsDTO) {
        return new ResponseEntity((Object)this.kpiService.saveOrgKpiDetails(kpiDetailsDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/kpiListByDate/{objectiveId}"})
    public ResponseEntity<List<KPIDTO>> kpiListByDate(@PathVariable(value="objectiveId") long objectiveId, @RequestParam(value="dateRange", required=false) String dateRange) {
        return new ResponseEntity((Object)this.kpiService.kpiListByDate(objectiveId, dateRange), HttpStatus.OK);
    }

    @GetMapping(value={"/kpiListByEmpId/{empId}"})
    public ResponseEntity<List<KPIDTO>> kpiListByEmpId(HttpServletRequest request, @PathVariable(value="empId") Long empId, @RequestParam(value="employeeView", required=false) String employeeView) {
        boolean flag = employeeView != null ? Boolean.valueOf(employeeView) : false;
        return this.kpiService.getKpiListWithEmpId(empId.toString(), flag);
    }

    @PostMapping(value={"/etl/saveKpiDetails"})
    public ResponseEntity<Map<String, Object>> saveKPIDetails(@RequestBody List<KPIDetailsDTO> detailsDTOs, HttpServletRequest request) {
        List finalList = detailsDTOs.stream().map(detailsDTO -> {
            BigDecimal actual = new BigDecimal(StringUtils.isNotEmpty((CharSequence)detailsDTO.getMtdActual()) ? detailsDTO.getMtdActual() : "0");
            BigDecimal target = new BigDecimal(StringUtils.isNotEmpty((CharSequence)detailsDTO.getMtdTarget()) ? detailsDTO.getMtdTarget() : "0");
            detailsDTO.setMtdActual(actual.setScale(2, RoundingMode.HALF_UP).toPlainString());
            detailsDTO.setMtdTarget(target.setScale(2, RoundingMode.HALF_UP).toPlainString());
            if (UserThreadLocal.get() != null && UserThreadLocal.get().get("BATCH_NAME") == null) {
                if (this.isAnnualTargetTemplate(detailsDTO)) {
                    UserThreadLocal.get().put("BATCH_NAME", "Annual Target");
                } else {
                    UserThreadLocal.get().put("BATCH_NAME", "OrgKPIDetails");
                }
            }
            return detailsDTO;
        }).collect(Collectors.toList());
        return this.kpiService.saveKpiDetails(finalList);
    }

    public boolean isAnnualTargetTemplate(KPIDetailsDTO kpiDetailsDTO) {
        String templateType = StringUtils.trimToEmpty((String)kpiDetailsDTO.getTemplateType());
        return "AnnualTarget".equalsIgnoreCase(templateType) || StringUtils.isNotEmpty((CharSequence)kpiDetailsDTO.getTargetYear());
    }

    @GetMapping(value={"/kpiListByDept/{deptId}"})
    public ResponseEntity<List<KPIDTO>> kpiListByDept(@PathVariable(value="deptId") long deptId) {
        List kpiList = this.kpiService.kpiListByDept(deptId);
        if (CollectionUtils.isNotEmpty((Collection)kpiList)) {
            return new ResponseEntity((Object)kpiList, HttpStatus.OK);
        }
        return new ResponseEntity(Collections.emptyList(), HttpStatus.OK);
    }

    @GetMapping(value={"/kpiFormKpiList/{scorecardId}"})
    public ResponseEntity<KPIResponseDTO> kpiFormKpiList(@PathVariable long scorecardId, @RequestParam(value="employeeView", required=false) String employeeView, @RequestParam(value="fromPage", required=false) String fromPage, @RequestParam(value="dateRange", required=false) String dateRange) {
        boolean flag = employeeView != null ? Boolean.valueOf(employeeView) : false;
        return this.kpiService.retrieveKpiFormDataList(scorecardId, flag, fromPage, dateRange);
    }

    @GetMapping(value={"/kpilistbasedonscorecard/{scorecardId}"})
    public ResponseEntity<List<KPIDTO>> kpilistbasedonscorecard(@PathVariable Long scorecardId) {
        return this.kpiService.kpilistbasedonscorecard(scorecardId);
    }

    @GetMapping(value={"/subMeasureNodeKeyList/{nodeKey}"})
    public ResponseEntity<List<Map<String, Object>>> subMeasureNodeKeyList(@PathVariable String nodeKey, @RequestParam(value="dateRange", required=false) String dateRange) {
        return new ResponseEntity((Object)this.kpiService.getSubMeasureNodeKeyList(nodeKey, dateRange), HttpStatus.OK);
    }

    @GetMapping(value={"/subNodeKeyData/{nodeKey}"})
    public ResponseEntity<Map<String, Object>> subNodeKeyData(@PathVariable(value="nodeKey") String nodeKey, @RequestParam(value="measureKey") String measureKey, @RequestParam(value="dateRange", required=false) String dateRange) {
        return new ResponseEntity((Object)this.kpiService.subNodeKeyData(nodeKey, measureKey, dateRange), HttpStatus.OK);
    }

    @GetMapping(value={"/kpiListByDeptId/{deptId}"})
    public ResponseEntity<List<KPIDTO>> kpiListByDeptId(@PathVariable long deptId) {
        List kpiList = this.kpiService.kpiListByDeptId(deptId);
        return new ResponseEntity((Object)kpiList, HttpStatus.OK);
    }

    @GetMapping(value={"/checkkpiListByEmpId/{empId}"})
    public ResponseEntity<List<KpiList>> checkkpiListByEmpId(@PathVariable(value="empId") long empId) {
        return new ResponseEntity((Object)this.kpiService.checkkpiListByEmpId(empId), HttpStatus.OK);
    }

    @GetMapping(value={"/checkkpiListByDeptId"})
    public ResponseEntity<List<KpiList>> checkkpiListByDeptId() {
        return new ResponseEntity((Object)this.kpiService.checkkpiListByDeptId(), HttpStatus.OK);
    }

    @GetMapping(value={"/kpiAttachmentList/{kpiId}"})
    public ResponseEntity<List<KpiDetailsAttachmentsDTO>> retriveAttachemnts(@PathVariable(value="kpiId") Long kpiId) {
        return new ResponseEntity((Object)this.kpiService.retriveAttachmentByKpiId(kpiId), HttpStatus.OK);
    }
}

