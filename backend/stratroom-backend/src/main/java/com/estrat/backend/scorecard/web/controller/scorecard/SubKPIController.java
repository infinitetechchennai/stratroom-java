/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.scorecard.dto.KPIResponseDTO
 *  com.estrat.backend.scorecard.dto.PerformanceContractDTO
 *  com.estrat.backend.scorecard.dto.SubKPIDTO
 *  com.estrat.backend.scorecard.exception.RequestException
 *  com.estrat.backend.scorecard.service.SubKPIService
 *  com.estrat.backend.scorecard.web.controller.scorecard.SubKPIController
 *  com.fasterxml.jackson.core.JsonProcessingException
 *  com.fasterxml.jackson.databind.ObjectMapper
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
package com.estrat.backend.scorecard.web.controller.scorecard;

import com.estrat.backend.scorecard.dto.KPIResponseDTO;
import com.estrat.backend.scorecard.dto.PerformanceContractDTO;
import com.estrat.backend.scorecard.dto.SubKPIDTO;
import com.estrat.backend.scorecard.exception.RequestException;
import com.estrat.backend.scorecard.service.SubKPIService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import java.util.List;
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
public class SubKPIController {
    @Autowired
    private SubKPIService subKpiService;

    @GetMapping(value={"/subKpi/{id}"})
    public ResponseEntity<SubKPIDTO> getKpiDetails(@PathVariable long id, @RequestParam(value="statusLightFlag", required=false) String statusLightFlag) {
        boolean flag = statusLightFlag != null ? Boolean.valueOf(statusLightFlag) : false;
        return this.subKpiService.getKpiDetails(id, flag);
    }

    @PostMapping(value={"/subKpi"})
    public ResponseEntity<SubKPIDTO> saveOrUpdateDetails(@RequestBody SubKPIDTO kpi) {
        kpi.setCreatedTime(LocalDateTime.now());
        ObjectMapper mapper = new ObjectMapper();
        try {
            kpi.getSubKpiValue().put("kpiFormula", mapper.writeValueAsString((Object)kpi.getKpiFormula()));
        }
        catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        return this.subKpiService.saveOrUpdateDetails(kpi);
    }

    @PutMapping(value={"/subKpi"})
    public ResponseEntity<SubKPIDTO> updateKPIDetails(@RequestBody SubKPIDTO kpi) {
        kpi.setUpdatedTime(LocalDateTime.now());
        ObjectMapper mapper = new ObjectMapper();
        try {
            kpi.getSubKpiValue().put("kpiFormula", mapper.writeValueAsString((Object)kpi.getKpiFormula()));
        }
        catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        return this.subKpiService.saveOrUpdateDetails(kpi);
    }

    @DeleteMapping(value={"/subKpi/{id}"})
    public ResponseEntity<Boolean> deleteKPIById(@PathVariable long id) {
        return this.subKpiService.deleteKPIById(id);
    }

    @GetMapping(value={"/v2/subkpiList/{objectiveId}"})
    public ResponseEntity<List<SubKPIDTO>> subkpiListFromObjectives(@PathVariable(value="objectiveId") long objectiveId) {
        return this.subKpiService.getSubKpiListWithObjId(objectiveId);
    }

    @PostMapping(value={"/web/saveSubkpiEntry"})
    public ResponseEntity<PerformanceContractDTO> saveOrgKpiDetails(@RequestBody PerformanceContractDTO performanceContractDTO) {
        return new ResponseEntity((Object)this.subKpiService.saveOrgSubKpiDetails(performanceContractDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/subkpiEntryList/{scorecardId}"})
    public ResponseEntity<KPIResponseDTO> subkpiFormList(@PathVariable long scorecardId, @RequestParam(value="employeeView", required=false) String employeeView) {
        boolean flag = employeeView != null ? Boolean.valueOf(employeeView) : false;
        return this.subKpiService.retrieveSubKpiFormDataList(scorecardId, flag);
    }

    @GetMapping(value={"/getPerformanceEntry/{empId}"})
    public ResponseEntity<List<PerformanceContractDTO>> findAllByEmpId(@PathVariable(value="empId") Long empId) throws RequestException {
        List preferList = this.subKpiService.findAllByEmpId(String.valueOf(empId));
        return new ResponseEntity((Object)preferList, HttpStatus.OK);
    }
}

