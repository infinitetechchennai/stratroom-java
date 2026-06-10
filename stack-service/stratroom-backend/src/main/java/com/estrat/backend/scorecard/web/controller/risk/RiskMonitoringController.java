/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.scorecard.dto.RiskDTO
 *  com.estrat.backend.scorecard.dto.RiskMonitoringDTO
 *  com.estrat.backend.scorecard.dto.RiskResponseDTO
 *  com.estrat.backend.scorecard.exception.RequestException
 *  com.estrat.backend.scorecard.service.RiskMonitoringService
 *  com.estrat.backend.scorecard.util.KPIUtil
 *  com.estrat.backend.scorecard.web.controller.risk.RiskMonitoringController
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
package com.estrat.backend.scorecard.web.controller.risk;

import com.estrat.backend.scorecard.dto.RiskDTO;
import com.estrat.backend.scorecard.dto.RiskMonitoringDTO;
import com.estrat.backend.scorecard.dto.RiskResponseDTO;
import com.estrat.backend.scorecard.exception.RequestException;
import com.estrat.backend.scorecard.service.RiskMonitoringService;
import com.estrat.backend.scorecard.util.KPIUtil;
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
public class RiskMonitoringController {
    @Autowired
    private RiskMonitoringService riskMonitoringService;
    @Autowired
    private KPIUtil kpiUtil;

    @PostMapping(value={"/riskMonitoring"})
    public ResponseEntity<RiskResponseDTO> saveRiskMonitoringDetails(@RequestBody RiskMonitoringDTO riskCauseAndConsequenceDTO) throws RequestException {
        return new ResponseEntity((Object)this.riskMonitoringService.saveRiskMonitoring(riskCauseAndConsequenceDTO), HttpStatus.OK);
    }

    @PutMapping(value={"/riskMonitoring"})
    public ResponseEntity<RiskResponseDTO> updateRiskMonitoringDetails(@RequestBody RiskMonitoringDTO riskMonitoringDTO) throws RequestException {
        return new ResponseEntity((Object)this.riskMonitoringService.updateRiskMonitoring(riskMonitoringDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/riskMonitoring/{id}"})
    public ResponseEntity<RiskMonitoringDTO> getRiskMonitoringById(@PathVariable Long id) throws RequestException {
        return new ResponseEntity((Object)this.riskMonitoringService.retrieveRiskMonitoring(id), HttpStatus.OK);
    }

    @DeleteMapping(value={"/riskMonitoring/{id}"})
    public ResponseEntity<Boolean> deleteRiskMonitoringDetailsById(@PathVariable(value="id") Long id) throws RequestException {
        this.riskMonitoringService.removeRiskMonitoring(id);
        return new ResponseEntity((Object)true, HttpStatus.OK);
    }

    @GetMapping(value={"/riskMonitoringList/{riskId}"})
    public ResponseEntity<List<RiskMonitoringDTO>> findAllByRiskId(@PathVariable(value="riskId") Long riskId) throws RequestException {
        List riskMonitoringDTOList = this.riskMonitoringService.findAllByRiskId(riskId);
        return new ResponseEntity((Object)riskMonitoringDTOList, HttpStatus.OK);
    }

    @GetMapping(value={"/retrieveRiskMonitoringList/{empId}"})
    public ResponseEntity<List<RiskMonitoringDTO>> findAllByEmpId(@PathVariable(value="empId") Long empId) throws RequestException {
        List riskMonitoringDTOList = this.riskMonitoringService.findAllByEmpId(empId);
        return new ResponseEntity((Object)riskMonitoringDTOList, HttpStatus.OK);
    }

    @GetMapping(value={"/riskMonitoringListWithChild/{empId}"})
    public ResponseEntity<List<RiskMonitoringDTO>> riskMonitorListWithChild(@PathVariable(value="empId") long empId, @RequestParam(value="riskIds", required=false) String riskIds, @RequestParam(value="dateRange", required=false) String dateRange) throws RequestException {
        return new ResponseEntity((Object)this.riskMonitoringService.riskMonitorListWithChild(empId, riskIds, dateRange), HttpStatus.OK);
    }

    @GetMapping(value={"/riskMonitoringListWithDeptids"})
    public ResponseEntity<List<RiskDTO>> riskMonitorListWithDeptids(@RequestParam(value="deptIds", required=false) String deptIds) throws RequestException {
        return new ResponseEntity((Object)this.riskMonitoringService.riskMonitorListWithDeptids(deptIds), HttpStatus.OK);
    }
}

