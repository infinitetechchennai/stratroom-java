/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.controller.StrategyFormulationController
 *  com.estrat.web.dto.FormulationKPIDTO
 *  com.estrat.web.dto.FormulationObjectiveDTO
 *  com.estrat.web.dto.FormulationScoreCardDTO
 *  com.estrat.web.dto.FormulationSubKPIDTO
 *  com.estrat.web.dto.StrategyFormulationDTO
 *  com.estrat.web.service.StrategyFormulationService
 *  com.estrat.web.util.RequestSessionUtil
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
package com.estrat.web.controller;

import com.estrat.web.dto.FormulationKPIDTO;
import com.estrat.web.dto.FormulationObjectiveDTO;
import com.estrat.web.dto.FormulationScoreCardDTO;
import com.estrat.web.dto.FormulationSubKPIDTO;
import com.estrat.web.dto.StrategyFormulationDTO;
import com.estrat.web.service.StrategyFormulationService;
import com.estrat.web.util.RequestSessionUtil;
import java.util.List;
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
public class StrategyFormulationController {
    @Autowired
    private StrategyFormulationService strategyFormulationService;
    @Autowired
    protected RequestSessionUtil sessionUtil;

    @PostMapping(value={"/strategyFormulation"})
    public ResponseEntity<StrategyFormulationDTO> saveStrategyFormulation(@RequestBody StrategyFormulationDTO strategyFormulationDTO) {
        return new ResponseEntity(this.strategyFormulationService.saveStrategyFormulation(strategyFormulationDTO), HttpStatus.OK);
    }

    @PostMapping(value={"/objectives/strategyFormulation"})
    public ResponseEntity<FormulationObjectiveDTO> saveStrategyFormulationObjectives(@RequestBody FormulationObjectiveDTO formulationObjectiveDTO) {
        return new ResponseEntity(this.strategyFormulationService.saveFormulationObjectives(formulationObjectiveDTO), HttpStatus.OK);
    }

    @PostMapping(value={"/kpi/strategyFormulation"})
    public ResponseEntity<FormulationKPIDTO> saveStrategyFormulationKPI(@RequestBody FormulationKPIDTO formulationKPIDTO) {
        return new ResponseEntity(this.strategyFormulationService.saveFormulationKPI(formulationKPIDTO), HttpStatus.OK);
    }

    @PostMapping(value={"/subkpi/strategyFormulation"})
    public ResponseEntity<FormulationSubKPIDTO> saveStrategyFormulationSubKPI(@RequestBody FormulationSubKPIDTO formulationSubKPIDTO) {
        return new ResponseEntity(this.strategyFormulationService.saveFormulationSubKPI(formulationSubKPIDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/strategyFormulation/{id}"})
    public ResponseEntity<StrategyFormulationDTO> getFormulationDetails(@PathVariable(value="id") Long id) {
        return new ResponseEntity(this.strategyFormulationService.getFormulationDetails(id.longValue()), HttpStatus.OK);
    }

    @DeleteMapping(value={"/strategyFormulation/{id}"})
    public ResponseEntity<Boolean> deleteFormulationDetails(@PathVariable(value="id") Long id) {
        return new ResponseEntity(this.strategyFormulationService.deleteFormulationDetails(id.longValue()), HttpStatus.OK);
    }

    @DeleteMapping(value={"/objectives/strategyFormulation/{id}"})
    public ResponseEntity<Boolean> deleteFormulationObjectives(@PathVariable(value="id") Long id) {
        return new ResponseEntity(this.strategyFormulationService.deleteFormulationObjectives(id.longValue()), HttpStatus.OK);
    }

    @DeleteMapping(value={"/kpi/strategyFormulation/{id}"})
    public ResponseEntity<Boolean> deleteFormulationKPI(@PathVariable(value="id") Long id) {
        return new ResponseEntity(this.strategyFormulationService.deleteFormulationKPI(id.longValue()), HttpStatus.OK);
    }

    @DeleteMapping(value={"/subkpi/strategyFormulation/{id}"})
    public ResponseEntity<Boolean> deleteFormulationSubKPI(@PathVariable(value="id") Long id) {
        return new ResponseEntity(this.strategyFormulationService.deleteFormulationSubKPI(id.longValue()), HttpStatus.OK);
    }

    @GetMapping(value={"/objectives/strategyFormulation/{id}"})
    public ResponseEntity<FormulationObjectiveDTO> getFormulationObjectives(@PathVariable(value="id") Long id) {
        return new ResponseEntity(this.strategyFormulationService.getFormulationObjectives(id.longValue()), HttpStatus.OK);
    }

    @GetMapping(value={"/kpi/strategyFormulation/{id}"})
    public ResponseEntity<FormulationKPIDTO> getFormulationKPI(@PathVariable(value="id") Long id) {
        return new ResponseEntity(this.strategyFormulationService.getFormulationKPI(id.longValue()), HttpStatus.OK);
    }

    @GetMapping(value={"/subkpi/strategyFormulation/{id}"})
    public ResponseEntity<FormulationSubKPIDTO> getFormulationSubKPI(@PathVariable(value="id") Long id) {
        return new ResponseEntity(this.strategyFormulationService.getFormulationSubKPI(id.longValue()), HttpStatus.OK);
    }

    @GetMapping(value={"/strategyFormulationList"})
    public ResponseEntity<List<StrategyFormulationDTO>> strategyFormulationList(@RequestParam(name="status", required=false) String status, @RequestParam(name="pageId", required=false) String pageId) {
        return new ResponseEntity(this.strategyFormulationService.getFormulationList(status, pageId), HttpStatus.OK);
    }

    @GetMapping(value={"/formulation/applyFormulation"})
    public ResponseEntity<StrategyFormulationDTO> applyFormulation(@RequestParam(value="formulationId") String status) {
        return new ResponseEntity(this.strategyFormulationService.applyFormulation(status), HttpStatus.OK);
    }

    @DeleteMapping(value={"/scorecard/strategyFormulation/{id}"})
    public ResponseEntity<Boolean> deleteFormulationScorecard(@PathVariable(value="id") Long id) {
        return new ResponseEntity(this.strategyFormulationService.deleteFormulationScorecard(id.longValue()), HttpStatus.OK);
    }

    @GetMapping(value={"/scorecard/strategyFormulation/{id}"})
    public ResponseEntity<FormulationScoreCardDTO> getFormulationScoreCard(@PathVariable(value="id") Long id) {
        return new ResponseEntity(this.strategyFormulationService.getFormulationScorecard(id.longValue()), HttpStatus.OK);
    }

    @PostMapping(value={"/scorecard/strategyFormulation"})
    public ResponseEntity<FormulationScoreCardDTO> saveStrategyFormulationScoreCard(@RequestBody FormulationScoreCardDTO formulationScoreCardDTO) {
        return new ResponseEntity(this.strategyFormulationService.saveFormulationScorecard(formulationScoreCardDTO), HttpStatus.OK);
    }
}

