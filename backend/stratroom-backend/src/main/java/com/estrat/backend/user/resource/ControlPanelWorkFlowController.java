/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.user.dto.ControlPanelWorkFlowDTO
 *  com.estrat.backend.user.resource.ControlPanelWorkFlowController
 *  com.estrat.backend.user.service.ControlPanelWorkFlowService
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
package com.estrat.backend.user.resource;

import com.estrat.backend.user.dto.ControlPanelWorkFlowDTO;
import com.estrat.backend.user.service.ControlPanelWorkFlowService;
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
public class ControlPanelWorkFlowController {
    @Autowired
    ControlPanelWorkFlowService WorkFlowService;

    @PostMapping(value={"/saveWorkFlow"})
    public ResponseEntity<ControlPanelWorkFlowDTO> saveImpact(@RequestBody ControlPanelWorkFlowDTO controlPanelWorkFlowDTO) {
        return new ResponseEntity((Object)this.WorkFlowService.saveWorkFlow(controlPanelWorkFlowDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/retriveWorkFlow"})
    public ResponseEntity<List<ControlPanelWorkFlowDTO>> findAllWorkFlow() {
        return new ResponseEntity((Object)this.WorkFlowService.findWorkFlow(), HttpStatus.OK);
    }

    @GetMapping(value={"/retriveWorkFlow/{id}"})
    public ResponseEntity<ControlPanelWorkFlowDTO> findWorkFLowId(@PathVariable(value="id") long id) {
        return new ResponseEntity((Object)this.WorkFlowService.findWorkFlowById(id), HttpStatus.OK);
    }

    @DeleteMapping(value={"/deleteWorkFlow/{id}"})
    public ResponseEntity<Boolean> deleteWorkFLow(@PathVariable(value="id") long id) {
        this.WorkFlowService.removeWorkFlow(id);
        return new ResponseEntity((Object)true, HttpStatus.OK);
    }

    @PutMapping(value={"/updateWorkFlow"})
    public ResponseEntity<ControlPanelWorkFlowDTO> updateWorkFLow(@RequestBody ControlPanelWorkFlowDTO controlPanelWorkFlowDTO) {
        return new ResponseEntity((Object)this.WorkFlowService.updateWorkFlow(controlPanelWorkFlowDTO), HttpStatus.OK);
    }
}

