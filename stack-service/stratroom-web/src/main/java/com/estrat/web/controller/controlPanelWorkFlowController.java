/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.controller.controlPanelWorkFlowController
 *  com.estrat.web.dto.ControlPanelWorkFlowDTO
 *  com.estrat.web.service.ControlPanelWorkFlowService
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
 *  org.springframework.web.bind.annotation.RestController
 */
package com.estrat.web.controller;

import com.estrat.web.dto.ControlPanelWorkFlowDTO;
import com.estrat.web.service.ControlPanelWorkFlowService;
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
import org.springframework.web.bind.annotation.RestController;

@RestController
public class controlPanelWorkFlowController {
    @Autowired
    protected ControlPanelWorkFlowService WorkFlowService;
    @Autowired
    protected RequestSessionUtil sessionUtil;

    @PostMapping(value={"/saveWorkFlow"})
    public ResponseEntity<ControlPanelWorkFlowDTO> saveImpact(@RequestBody ControlPanelWorkFlowDTO controlPanelWorkFlowDTO, HttpServletRequest request) {
        controlPanelWorkFlowDTO.setCreatedBy(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue());
        return new ResponseEntity(this.WorkFlowService.saveWorkFlow(controlPanelWorkFlowDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/retriveWorkFlow"})
    public ResponseEntity<List<ControlPanelWorkFlowDTO>> findAllWorkFlow() {
        return new ResponseEntity(this.WorkFlowService.findWorkFlow(), HttpStatus.OK);
    }

    @GetMapping(value={"/retriveWorkFlow/{id}"})
    public ResponseEntity<ControlPanelWorkFlowDTO> findWorkFlowId(@PathVariable(value="id") long id) {
        return new ResponseEntity(this.WorkFlowService.findWorkFlowById(id), HttpStatus.OK);
    }

    @DeleteMapping(value={"/deleteWorkFlow/{id}"})
    public ResponseEntity<Boolean> deleteWorkFlow(@PathVariable(value="id") long id) {
        this.WorkFlowService.removeWorkFlow(id);
        return new ResponseEntity(true, HttpStatus.OK);
    }

    @PutMapping(value={"/updateWorkFlow"})
    public ResponseEntity<ControlPanelWorkFlowDTO> updateWorkFLow(@RequestBody ControlPanelWorkFlowDTO controlPanelWorkFlowDTO, HttpServletRequest request) {
        controlPanelWorkFlowDTO.setUpdatedBy(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue());
        return new ResponseEntity(this.WorkFlowService.updateWorkFlow(controlPanelWorkFlowDTO), HttpStatus.OK);
    }
}

