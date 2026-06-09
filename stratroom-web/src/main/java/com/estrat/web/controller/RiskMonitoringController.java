/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.controller.RiskMonitoringController
 *  com.estrat.web.dto.RiskDTO
 *  com.estrat.web.dto.RiskMonitoringDTO
 *  com.estrat.web.dto.RiskResponseDTO
 *  com.estrat.web.exception.RequestException
 *  com.estrat.web.service.RiskMonitoringService
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

import com.estrat.web.dto.RiskDTO;
import com.estrat.web.dto.RiskMonitoringDTO;
import com.estrat.web.dto.RiskResponseDTO;
import com.estrat.web.exception.RequestException;
import com.estrat.web.service.RiskMonitoringService;
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
public class RiskMonitoringController {
    @Autowired
    private RiskMonitoringService riskMonitoringService;
    @Autowired
    protected RequestSessionUtil sessionUtil;

    @PostMapping(value={"/riskMonitoring"})
    public ResponseEntity<RiskResponseDTO> saveRiskMonitoringDetails(@RequestBody RiskMonitoringDTO riskCauseAndConsequenceDTO, HttpServletRequest request) throws RequestException {
        riskCauseAndConsequenceDTO.setCreatedBy(Long.parseLong(UserThreadLocal.get().getProfile().getEmpId()));
        return new ResponseEntity(this.riskMonitoringService.saveRiskMonitoring(riskCauseAndConsequenceDTO), HttpStatus.OK);
    }

    @PutMapping(value={"/riskMonitoring"})
    public ResponseEntity<RiskResponseDTO> updateRiskMonitoringDetails(@RequestBody RiskMonitoringDTO riskMonitoringDTO, HttpServletRequest request) throws RequestException {
        riskMonitoringDTO.setUpdatedBy(Long.parseLong(UserThreadLocal.get().getProfile().getEmpId()));
        return new ResponseEntity(this.riskMonitoringService.updateRiskMonitoring(riskMonitoringDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/riskMonitoring/{id}"})
    public ResponseEntity<RiskMonitoringDTO> getRiskMonitoringById(@PathVariable Long id) throws RequestException {
        return new ResponseEntity(this.riskMonitoringService.retrieveRiskMonitoring(id), HttpStatus.OK);
    }

    @DeleteMapping(value={"/riskMonitoring/{id}"})
    public ResponseEntity<Boolean> deleteRiskMonitoringDetailsById(@PathVariable(value="id") Long id) throws RequestException {
        this.riskMonitoringService.removeRiskMonitoring(id);
        return new ResponseEntity(true, HttpStatus.OK);
    }

    @GetMapping(value={"/riskMonitoringList/{riskId}"})
    public ResponseEntity<List<RiskMonitoringDTO>> findAllByRiskId(@PathVariable(value="riskId") Long riskId) throws RequestException {
        List riskMonitoringDTOList = this.riskMonitoringService.findAllByRiskId(riskId);
        if (!riskMonitoringDTOList.isEmpty()) {
            return new ResponseEntity(riskMonitoringDTOList, HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    @GetMapping(value={"/retrieveRiskMonitoringList/{empId}"})
    public ResponseEntity<List<RiskMonitoringDTO>> findAllByEmpId(@PathVariable(value="empId") Long empId) throws RequestException {
        List riskMonitoringDTOList = this.riskMonitoringService.findAllByEmpId(empId);
        return new ResponseEntity(riskMonitoringDTOList, HttpStatus.OK);
    }

    @GetMapping(value={"/riskMonitoringListWithChild"})
    public ResponseEntity<List<RiskMonitoringDTO>> riskMonitorListWithChild(@RequestParam(value="riskIds", required=false) String riskIds, @RequestParam(value="dateRange", required=false) String dateRange, HttpServletRequest request) throws RequestException {
        return new ResponseEntity(this.riskMonitoringService.riskMonitorListWithChild(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue(), riskIds, dateRange), HttpStatus.OK);
    }

    @GetMapping(value={"/riskMonitoringListWithDeptids"})
    public ResponseEntity<List<RiskDTO>> riskMonitorListWithDeptids(@RequestParam(value="deptIds", required=false) String deptIds) throws RequestException {
        return new ResponseEntity(this.riskMonitoringService.riskMonitorListWithDeptids(deptIds), HttpStatus.OK);
    }
}

