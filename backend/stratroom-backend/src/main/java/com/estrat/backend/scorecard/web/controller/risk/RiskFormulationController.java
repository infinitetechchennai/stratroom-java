/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.scorecard.dto.FormulationRiskActivitiesDTO
 *  com.estrat.backend.scorecard.dto.FormulationRiskDTO
 *  com.estrat.backend.scorecard.dto.FormulationSubRiskDTO
 *  com.estrat.backend.scorecard.dto.RiskFormulationDTO
 *  com.estrat.backend.scorecard.service.RiskFormulationService
 *  com.estrat.backend.scorecard.web.controller.risk.RiskFormulationController
 *  org.apache.commons.lang3.StringUtils
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.http.HttpStatus
 *  org.springframework.http.ResponseEntity
 *  org.springframework.web.bind.annotation.DeleteMapping
 *  org.springframework.web.bind.annotation.GetMapping
 *  org.springframework.web.bind.annotation.PathVariable
 *  org.springframework.web.bind.annotation.PostMapping
 *  org.springframework.web.bind.annotation.RequestBody
 *  org.springframework.web.bind.annotation.RequestParam
 *  org.springframework.web.bind.annotation.RestController
 */
package com.estrat.backend.scorecard.web.controller.risk;

import com.estrat.backend.scorecard.dto.FormulationRiskActivitiesDTO;
import com.estrat.backend.scorecard.dto.FormulationRiskDTO;
import com.estrat.backend.scorecard.dto.FormulationSubRiskDTO;
import com.estrat.backend.scorecard.dto.RiskFormulationDTO;
import com.estrat.backend.scorecard.service.RiskFormulationService;
import java.util.List;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RiskFormulationController {
    @Autowired
    private RiskFormulationService riskFormulationService;

    @PostMapping(value={"/riskFormulation"})
    public ResponseEntity<RiskFormulationDTO> saveRiskFormulation(@RequestBody RiskFormulationDTO formulationDTO) {
        return new ResponseEntity((Object)this.riskFormulationService.saveRiskFormulation(formulationDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/riskFormulation/{formulationId}"})
    public ResponseEntity<RiskFormulationDTO> getRiskFormulation(@PathVariable(value="formulationId") String formulationId, @RequestParam(value="loadFlag", required=false) String loadFlag) {
        boolean flag = StringUtils.isNotEmpty((CharSequence)loadFlag) ? Boolean.valueOf(loadFlag) : false;
        return new ResponseEntity((Object)this.riskFormulationService.getRiskFormulation(Long.valueOf(formulationId).longValue(), flag), HttpStatus.OK);
    }

    @PostMapping(value={"/risk/riskFormulation"})
    public ResponseEntity<FormulationRiskDTO> saveFormulationRisk(@RequestBody FormulationRiskDTO formulationRiskDTO) {
        return new ResponseEntity((Object)this.riskFormulationService.saveFormulationRisk(formulationRiskDTO), HttpStatus.OK);
    }

    @PostMapping(value={"/subRisk/riskFormulation"})
    public ResponseEntity<FormulationSubRiskDTO> saveFormulationSubRisk(@RequestBody FormulationSubRiskDTO formulationSubRiskDTO) {
        return new ResponseEntity((Object)this.riskFormulationService.saveFormulationSubRisk(formulationSubRiskDTO), HttpStatus.OK);
    }

    @PostMapping(value={"/activity/riskFormulation"})
    public ResponseEntity<FormulationRiskActivitiesDTO> saveFormulationRiskActivity(@RequestBody FormulationRiskActivitiesDTO formulationRiskActivitiesDTO) {
        return new ResponseEntity((Object)this.riskFormulationService.saveFormulationRiskActivities(formulationRiskActivitiesDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/subRisk/riskFormulation/{subRiskId}"})
    public ResponseEntity<FormulationSubRiskDTO> getFormulationSubRisk(@PathVariable(value="subRiskId") String subRiskId) {
        return new ResponseEntity((Object)this.riskFormulationService.getFormulationSubRisk(Long.valueOf(subRiskId).longValue()), HttpStatus.OK);
    }

    @GetMapping(value={"/risk/riskFormulation/{riskId}"})
    public ResponseEntity<FormulationRiskDTO> getFormulationRisk(@PathVariable(value="riskId") String riskId) {
        return new ResponseEntity((Object)this.riskFormulationService.getFormulationRisk(Long.valueOf(riskId).longValue()), HttpStatus.OK);
    }

    @GetMapping(value={"/activity/riskFormulation/{activityId}"})
    public ResponseEntity<FormulationRiskActivitiesDTO> getFormulationRiskActivity(@PathVariable(value="activityId") String activityId) {
        return new ResponseEntity((Object)this.riskFormulationService.getFormulationRiskActivities(Long.valueOf(activityId).longValue()), HttpStatus.OK);
    }

    @DeleteMapping(value={"/subRisk/riskFormulation/{subRiskId}"})
    public ResponseEntity<Boolean> deleteFormulationSubrisk(@PathVariable(value="subRiskId") String subRiskId) {
        return new ResponseEntity((Object)this.riskFormulationService.deleteFormulationSubRisk(Long.valueOf(subRiskId).longValue()), HttpStatus.OK);
    }

    @DeleteMapping(value={"/risk/riskFormulation/{riskId}"})
    public ResponseEntity<Boolean> deleteFormulationRisk(@PathVariable(value="riskId") String riskId) {
        return new ResponseEntity((Object)this.riskFormulationService.deleteFormulationRisk(Long.valueOf(riskId).longValue()), HttpStatus.OK);
    }

    @DeleteMapping(value={"/activity/riskFormulation/{activityId}"})
    public ResponseEntity<Boolean> deleteFormulationRiskActivity(@PathVariable(value="activityId") String activityId) {
        return new ResponseEntity((Object)this.riskFormulationService.deleteFormulationRiskActivity(Long.valueOf(activityId).longValue()), HttpStatus.OK);
    }

    @GetMapping(value={"/formulationRiskList"})
    public ResponseEntity<List<FormulationRiskDTO>> formulationRiskList(@RequestParam(value="formulationId") String formulationId, @RequestParam(value="department", required=false) String department) {
        return new ResponseEntity((Object)this.riskFormulationService.getRiskList(Long.valueOf(formulationId).longValue(), department), HttpStatus.OK);
    }

    @PostMapping(value={"/status/riskFormulation"})
    public ResponseEntity<Boolean> approveRiskFormulation(@RequestBody RiskFormulationDTO formulationDTO) {
        return new ResponseEntity((Object)this.riskFormulationService.updateFormulationStatus(formulationDTO), HttpStatus.OK);
    }
}

