/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.scorecard.dto.FormulationInitiativesDTO
 *  com.estrat.scorecard.dto.FormulationSubInitiativesDTO
 *  com.estrat.scorecard.dto.ProjectFormulationDTO
 *  com.estrat.scorecard.service.ProjectFormulationService
 *  com.estrat.scorecard.web.controller.initiatives.ProjectFormulationController
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
package com.estrat.scorecard.web.controller.initiatives;

import com.estrat.scorecard.dto.FormulationInitiativesDTO;
import com.estrat.scorecard.dto.FormulationSubInitiativesDTO;
import com.estrat.scorecard.dto.ProjectFormulationDTO;
import com.estrat.scorecard.service.ProjectFormulationService;
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
public class ProjectFormulationController {
    @Autowired
    private ProjectFormulationService projectFormulationService;

    @PostMapping(value={"/projectFormulation"})
    public ResponseEntity<ProjectFormulationDTO> saveProjectFormulation(@RequestBody ProjectFormulationDTO formulationDTO) {
        return new ResponseEntity((Object)this.projectFormulationService.saveProjectFormulation(formulationDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/projectFormulation/{formulationId}"})
    public ResponseEntity<ProjectFormulationDTO> getProjectFormulation(@PathVariable(value="formulationId") String formulationId, @RequestParam(value="loadFlag", required=false) String loadFlag) {
        return new ResponseEntity((Object)this.projectFormulationService.getProjectFormulation(Long.valueOf(formulationId).longValue(), loadFlag), HttpStatus.OK);
    }

    @PostMapping(value={"/initiatives/projectFormulation"})
    public ResponseEntity<FormulationInitiativesDTO> saveProjectFormulationInitiatives(@RequestBody FormulationInitiativesDTO formulationInitiativesDTO) {
        return new ResponseEntity((Object)this.projectFormulationService.saveFormulationInitiatives(formulationInitiativesDTO), HttpStatus.OK);
    }

    @PostMapping(value={"/subinitiatives/projectFormulation"})
    public ResponseEntity<FormulationSubInitiativesDTO> saveProjectFormulationSubInitiatives(@RequestBody FormulationSubInitiativesDTO formulationSubInitiativesDTO) {
        return new ResponseEntity((Object)this.projectFormulationService.saveFormulationSubInitiatives(formulationSubInitiativesDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/subinitiatives/projectFormulation/{subInitiaitveId}"})
    public ResponseEntity<FormulationSubInitiativesDTO> viewProjectFormulationSubInitiatives(@PathVariable(value="subInitiaitveId") String subInitiaitveId) {
        return new ResponseEntity((Object)this.projectFormulationService.getFormulationSubInitiatives(Long.valueOf(subInitiaitveId).longValue()), HttpStatus.OK);
    }

    @GetMapping(value={"/initiatives/projectFormulation/{initiativeId}"})
    public ResponseEntity<FormulationInitiativesDTO> viewProjectFormulationInitiatives(@PathVariable(value="initiativeId") String initiativeId) {
        return new ResponseEntity((Object)this.projectFormulationService.getFormulationInitiatives(Long.valueOf(initiativeId).longValue()), HttpStatus.OK);
    }

    @DeleteMapping(value={"/subinitiatives/projectFormulation/{subInitiaitveId}"})
    public ResponseEntity<Boolean> deleteProjectFormulationSubInitiatives(@PathVariable(value="subInitiaitveId") String subInitiaitveId) {
        return new ResponseEntity((Object)this.projectFormulationService.deleteFormulationSubInitiatives(Long.valueOf(subInitiaitveId).longValue()), HttpStatus.OK);
    }

    @DeleteMapping(value={"/initiatives/projectFormulation/{initiativeId}"})
    public ResponseEntity<Boolean> deleteProjectFormulationInitiatives(@PathVariable(value="initiativeId") String initiativeId) {
        return new ResponseEntity((Object)this.projectFormulationService.deleteFormulationInitiatives(Long.valueOf(initiativeId).longValue()), HttpStatus.OK);
    }

    @GetMapping(value={"/formulationInitiativesList"})
    public ResponseEntity<List<FormulationInitiativesDTO>> formulationInitiativesList(@RequestParam(value="formulationId") String formulationId, @RequestParam(value="department", required=false) String department) {
        return new ResponseEntity((Object)this.projectFormulationService.getInitiaitivesList(Long.valueOf(formulationId).longValue(), department), HttpStatus.OK);
    }

    @PostMapping(value={"/status/projectFormulation"})
    public ResponseEntity<Boolean> approveProjectFormulation(@RequestBody ProjectFormulationDTO formulationDTO) {
        return new ResponseEntity((Object)this.projectFormulationService.updateFormulationStatus(formulationDTO), HttpStatus.OK);
    }
}

