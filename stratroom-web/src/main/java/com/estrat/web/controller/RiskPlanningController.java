/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.controller.RiskPlanningController
 *  com.estrat.web.dto.RiskPlanningDTO
 *  com.estrat.web.exception.RequestException
 *  com.estrat.web.service.RiskPlanningService
 *  com.estrat.web.util.RequestSessionUtil
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

import com.estrat.web.dto.RiskPlanningDTO;
import com.estrat.web.exception.RequestException;
import com.estrat.web.service.RiskPlanningService;
import com.estrat.web.util.RequestSessionUtil;
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
public class RiskPlanningController {
    @Autowired
    private RiskPlanningService riskPlanningService;
    @Autowired
    protected RequestSessionUtil sessionUtil;

    @PostMapping(value={"/riskPlanning"})
    public ResponseEntity<RiskPlanningDTO> saveProject(@RequestBody RiskPlanningDTO riskPlanningDTO, HttpServletRequest request) throws RequestException {
        riskPlanningDTO.setCreatedBy(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue());
        return new ResponseEntity(this.riskPlanningService.saveProject(riskPlanningDTO), HttpStatus.OK);
    }

    @PutMapping(value={"/riskPlanning"})
    public ResponseEntity<RiskPlanningDTO> updateProject(@RequestBody RiskPlanningDTO riskPlanningDTO, HttpServletRequest request) throws RequestException {
        riskPlanningDTO.setUpdatedBy(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue());
        return new ResponseEntity(this.riskPlanningService.updateProject(riskPlanningDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/riskPlanning/{id}"})
    public ResponseEntity<RiskPlanningDTO> getProject(@PathVariable(value="id") Long id) throws RequestException {
        return new ResponseEntity(this.riskPlanningService.retrieveProject(id), HttpStatus.OK);
    }

    @DeleteMapping(value={"/riskPlanning/{id}"})
    public ResponseEntity<Boolean> deleteProject(@PathVariable(value="id") Long id) throws RequestException {
        this.riskPlanningService.removeProject(id);
        return new ResponseEntity(true, HttpStatus.OK);
    }

    @GetMapping(value={"/riskPlanningList"})
    public ResponseEntity<List<RiskPlanningDTO>> findAll(@RequestParam(value="pageId", required=false) String pageId) throws RequestException {
        List meetingManagementDTOS = this.riskPlanningService.findAll(pageId);
        return new ResponseEntity(meetingManagementDTOS, HttpStatus.OK);
    }
}

