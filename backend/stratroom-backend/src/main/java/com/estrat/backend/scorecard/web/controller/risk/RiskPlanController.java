/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.scorecard.dto.RiskPlanDTO
 *  com.estrat.backend.scorecard.dto.RiskResponseDTO
 *  com.estrat.backend.scorecard.exception.RequestException
 *  com.estrat.backend.scorecard.service.RiskPlanService
 *  com.estrat.backend.scorecard.util.KPIUtil
 *  com.estrat.backend.scorecard.web.controller.risk.RiskPlanController
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.http.HttpStatus
 *  org.springframework.http.ResponseEntity
 *  org.springframework.web.bind.annotation.DeleteMapping
 *  org.springframework.web.bind.annotation.GetMapping
 *  org.springframework.web.bind.annotation.PathVariable
 *  org.springframework.web.bind.annotation.PostMapping
 *  org.springframework.web.bind.annotation.PutMapping
 *  org.springframework.web.bind.annotation.RequestBody
 *  org.springframework.web.bind.annotation.RestController
 */
package com.estrat.backend.scorecard.web.controller.risk;

import com.estrat.backend.scorecard.dto.RiskPlanDTO;
import com.estrat.backend.scorecard.dto.RiskResponseDTO;
import com.estrat.backend.scorecard.exception.RequestException;
import com.estrat.backend.scorecard.service.RiskPlanService;
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
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RiskPlanController {
    @Autowired
    private RiskPlanService riskPlanService;
    @Autowired
    private KPIUtil kpiUtil;

    @PostMapping(value={"/riskPlan"})
    public ResponseEntity<RiskResponseDTO> saveRiskPlanDetails(@RequestBody RiskPlanDTO riskPlanDTO) throws RequestException {
        return new ResponseEntity((Object)this.riskPlanService.saveRiskPlan(riskPlanDTO), HttpStatus.OK);
    }

    @PutMapping(value={"/riskPlan"})
    public ResponseEntity<RiskResponseDTO> updateRiskPlanDetails(@RequestBody RiskPlanDTO riskPlanDTO) throws RequestException {
        return new ResponseEntity((Object)this.riskPlanService.updateRiskPlan(riskPlanDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/riskPlan/{id}"})
    public ResponseEntity<RiskPlanDTO> getRiskPlanById(@PathVariable Long id) throws RequestException {
        return new ResponseEntity((Object)this.riskPlanService.retrieveRiskPlan(id), HttpStatus.OK);
    }

    @DeleteMapping(value={"/riskPlan/{id}"})
    public ResponseEntity<Boolean> deleteRiskPlanDetailsById(@PathVariable(value="id") Long id) throws RequestException {
        this.riskPlanService.removeRiskPlan(id);
        return new ResponseEntity((Object)true, HttpStatus.OK);
    }

    @GetMapping(value={"/riskPlanList/{riskId}"})
    public ResponseEntity<List<RiskPlanDTO>> findAllByRiskId(@PathVariable(value="riskId") Long riskId) throws RequestException {
        List riskPlanList = this.riskPlanService.findAllByRiskId(riskId);
        for (RiskPlanDTO riskPlanDTO : (java.util.List<RiskPlanDTO>)riskPlanList) {
            this.kpiUtil.updateStatus(riskPlanDTO.getRiskPlanValue(), null);
        }
        return new ResponseEntity((Object)riskPlanList, HttpStatus.OK);
    }

    @GetMapping(value={"/retrieveRiskPlanList/{empId}"})
    public ResponseEntity<List<RiskPlanDTO>> findAllByEmpId(@PathVariable(value="empId") Long empId) throws RequestException {
        List RiskPlanDTOList = this.riskPlanService.findAllByEmpId(empId);
        return new ResponseEntity((Object)RiskPlanDTOList, HttpStatus.OK);
    }

    @GetMapping(value={"/riskTreatmentList/{riskId}"})
    public ResponseEntity<List<RiskPlanDTO>> findAllTreatmentByRiskId(@PathVariable(value="riskId") Long riskId) throws RequestException {
        List riskPlanList = this.riskPlanService.findAllTreatmentByRiskId(riskId);
        for (RiskPlanDTO riskPlanDTO : (java.util.List<RiskPlanDTO>)riskPlanList) {
            this.kpiUtil.updateStatus(riskPlanDTO.getRiskPlanValue(), null);
        }
        return new ResponseEntity((Object)riskPlanList, HttpStatus.OK);
    }
}

