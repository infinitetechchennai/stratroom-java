/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.user.dto.ControlPanelResponseDTO
 *  com.estrat.backend.user.dto.ControlPanelSecurityDTO
 *  com.estrat.backend.user.exception.RequestException
 *  com.estrat.backend.user.resource.ControlPanelSecurityController
 *  com.estrat.backend.user.service.ControlPanelSecurityService
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
package com.estrat.backend.user.resource;

import com.estrat.backend.user.dto.ControlPanelResponseDTO;
import com.estrat.backend.user.dto.ControlPanelSecurityDTO;
import com.estrat.backend.user.exception.RequestException;
import com.estrat.backend.user.service.ControlPanelSecurityService;
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
public class ControlPanelSecurityController {
    @Autowired
    protected ControlPanelSecurityService controlPanelSecurityService;

    @PostMapping(value={"/controlPanelSecurity"})
    public ResponseEntity<ControlPanelResponseDTO> saveControlPanelSecurity(@RequestBody ControlPanelSecurityDTO controlPanelSecurityDTO, HttpServletRequest request) throws RequestException {
        return new ResponseEntity((Object)this.controlPanelSecurityService.saveControlPanelSecurity(controlPanelSecurityDTO), HttpStatus.OK);
    }

    @PutMapping(value={"/controlPanelSecurity"})
    public ResponseEntity<ControlPanelResponseDTO> updateControlPanelSecurity(@RequestBody ControlPanelSecurityDTO controlPanelSecurityDTO, HttpServletRequest request) throws RequestException {
        return new ResponseEntity((Object)this.controlPanelSecurityService.updateControlPanelSecurity(controlPanelSecurityDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/controlPanelSecurity/{id}"})
    public ResponseEntity<ControlPanelSecurityDTO> getControlPanelSecurityById(@PathVariable(value="id") Long id) throws RequestException {
        return new ResponseEntity((Object)this.controlPanelSecurityService.retrieveControlPanelSecurity(id), HttpStatus.OK);
    }

    @DeleteMapping(value={"/controlPanelSecurity/{id}"})
    public ResponseEntity<Boolean> deleteControlPanelSecurityById(@PathVariable(value="id") Long id, HttpServletRequest request) throws RequestException {
        this.controlPanelSecurityService.removeControlPanelSecurity(id);
        return new ResponseEntity((Object)true, HttpStatus.OK);
    }

    @GetMapping(value={"/controlPanelSecurityList/{orgId}"})
    public ResponseEntity<ControlPanelSecurityDTO> findByOrgId(@PathVariable(value="orgId") long orgId) throws RequestException {
        return new ResponseEntity((Object)this.controlPanelSecurityService.findByOrgId(orgId), HttpStatus.OK);
    }
}

