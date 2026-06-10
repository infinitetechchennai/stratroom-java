/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.controller.SubKpiController
 *  com.estrat.web.dto.KPIResponseDTO
 *  com.estrat.web.dto.PerformanceContractDTO
 *  com.estrat.web.dto.SubKPIDTO
 *  com.estrat.web.exception.RequestException
 *  com.estrat.web.service.EmployeeService
 *  com.estrat.web.service.SubKPIService
 *  com.estrat.web.util.RequestSessionUtil
 *  com.estrat.web.util.UserThreadLocal
 *  javax.servlet.http.HttpServletRequest
 *  org.springframework.beans.factory.annotation.Autowired
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
package com.estrat.web.controller;

import com.estrat.web.dto.KPIResponseDTO;
import com.estrat.web.dto.PerformanceContractDTO;
import com.estrat.web.dto.SubKPIDTO;
import com.estrat.web.exception.RequestException;
import com.estrat.web.service.EmployeeService;
import com.estrat.web.service.SubKPIService;
import com.estrat.web.util.RequestSessionUtil;
import com.estrat.web.util.UserThreadLocal;
import java.util.List;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
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
public class SubKpiController {
    @Autowired
    private SubKPIService subkpiService;
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    protected RequestSessionUtil sessionUtil;

    @GetMapping(value={"/subKpi/{id}"})
    public ResponseEntity<SubKPIDTO> getKpiDetails(@PathVariable long id, @RequestParam(value="statusLightFlag", required=false) String statusLightFlag) {
        boolean flag = statusLightFlag != null ? Boolean.valueOf(statusLightFlag) : false;
        return this.subkpiService.getSubKpiDetails(id, flag);
    }

    @PostMapping(value={"/subKpi"})
    public ResponseEntity<SubKPIDTO> saveOrUpdateDetails(@RequestBody SubKPIDTO kpi, HttpServletRequest request) {
        kpi.setCreatedBy(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue());
        kpi.setActType(1);
        if (request.getSession().getAttribute("reporteeIds") != null) {
            kpi.getKpiFormula().setEmpployeeIds((List)request.getSession().getAttribute("reporteeIds"));
        }
        return this.subkpiService.saveOrUpdateDetails(kpi, "Save");
    }

    @DeleteMapping(value={"/subKpi/{id}"})
    public ResponseEntity<Boolean> deleteKPIById(@PathVariable(value="id") long id, HttpServletRequest request) throws RequestException {
        this.subkpiService.deleteKPIById(id);
        return new ResponseEntity(true, HttpStatus.OK);
    }

    @PutMapping(value={"/subKpi"})
    public ResponseEntity<SubKPIDTO> updateDetails(@RequestBody SubKPIDTO kpi, HttpServletRequest request) {
        kpi.setUpdatedBy(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue());
        if (kpi.isThresholdvalueupdate()) {
            kpi.setActType(2);
        } else {
            kpi.setActType(1);
        }
        if (request.getSession().getAttribute("reporteeIds") != null) {
            kpi.getKpiFormula().setEmpployeeIds((List)request.getSession().getAttribute("reporteeIds"));
        }
        return this.subkpiService.saveOrUpdateDetails(kpi, "Update");
    }

    @GetMapping(value={"/v2/subkpiList/{objectiveId}"})
    public ResponseEntity<List<SubKPIDTO>> subkpiListFromObjectives(HttpServletRequest request, @PathVariable(value="objectiveId") long objectiveId, @RequestParam(value="datePeriod") String datePeriod) {
        request.getSession().setAttribute("datePeriod", datePeriod);
        UserThreadLocal.get().setDatePeriod(datePeriod);
        return this.subkpiService.getSubKpiListWithObjId(objectiveId);
    }

    @PostMapping(value={"/web/saveSubkpiEntry"})
    public ResponseEntity<PerformanceContractDTO> saveOrgKpiDetails(@RequestBody PerformanceContractDTO performanceContractDTO, HttpServletRequest request) {
        if (performanceContractDTO.getId() != 0L) {
            performanceContractDTO.setUpdatedBy(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue());
        } else {
            performanceContractDTO.setCreatedBy(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue());
        }
        return new ResponseEntity(this.subkpiService.saveOrgSubKpiDetails(performanceContractDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/subkpiEntryList/{scorecardId}"})
    public ResponseEntity<KPIResponseDTO> subkpiFormList(@PathVariable long scorecardId, @RequestParam(value="employeeView", required=false) String employeeView) {
        boolean flag = employeeView != null ? Boolean.valueOf(employeeView) : false;
        return this.subkpiService.retrieveSubKpiFormDataList(String.valueOf(scorecardId), flag);
    }

    @GetMapping(value={"/getPerformanceEntry/{empId}"})
    public ResponseEntity<List<PerformanceContractDTO>> findAllByEmpId(@PathVariable(value="empId") Long empId) throws RequestException {
        List preferList = this.subkpiService.findAllByEmpId(String.valueOf(empId));
        return new ResponseEntity(preferList, HttpStatus.OK);
    }
}

