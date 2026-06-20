/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.ControlPanelSecurity
 *  com.estrat.backend.db.dto.ControlPanelResponseDTO
 *  com.estrat.backend.db.dto.ControlPanelSecurityDTO
 *  com.estrat.backend.db.exception.RequestException
 *  com.estrat.backend.db.resource.ControlPanelSecurityController
 *  com.estrat.backend.db.resource.util.UserThreadLocal
 *  com.estrat.backend.db.service.AuditDetailsService
 *  com.estrat.backend.db.service.ControlPanelSecurityService
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
package com.estrat.backend.db.resource;

import com.estrat.backend.db.bean.po.ControlPanelSecurity;
import com.estrat.backend.db.dto.ControlPanelResponseDTO;
import com.estrat.backend.db.dto.ControlPanelSecurityDTO;
import com.estrat.backend.db.exception.RequestException;
import com.estrat.backend.db.resource.util.UserThreadLocal;
import com.estrat.backend.db.service.AuditDetailsService;
import com.estrat.backend.db.service.ControlPanelSecurityService;
import java.time.LocalDateTime;
import java.util.Optional;
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
    @Autowired
    protected AuditDetailsService auditService;

    @PostMapping(value={"/controlPanelSecurity"})
    public ResponseEntity<ControlPanelResponseDTO> saveControlPanelSecurity(@RequestBody ControlPanelSecurityDTO controlPanelSecurityDTO, HttpServletRequest request) throws RequestException {
        ControlPanelSecurity controlPanelSecurity = new ControlPanelSecurity(controlPanelSecurityDTO);
        controlPanelSecurity.setCreatedTime(LocalDateTime.now());
        ControlPanelResponseDTO controlPanelResponseDTO = this.controlPanelSecurityService.save(controlPanelSecurity);
        this.auditService.updateAudit("Control Panel", controlPanelSecurityDTO.getOrgId(), Long.valueOf(UserThreadLocal.get()).longValue(), "Security Details Modified");
        return new ResponseEntity((Object)controlPanelResponseDTO, HttpStatus.OK);
    }

    @PutMapping(value={"/controlPanelSecurity"})
    public ResponseEntity<ControlPanelResponseDTO> updateControlPanelSecurity(@RequestBody ControlPanelSecurityDTO controlPanelSecurityDTO, HttpServletRequest request) throws RequestException {
        ControlPanelSecurity controlPanelSecurity = new ControlPanelSecurity(controlPanelSecurityDTO);
        controlPanelSecurity.setUpdatedTime(LocalDateTime.now());
        ControlPanelResponseDTO controlPanelResponseDTO = this.controlPanelSecurityService.save(controlPanelSecurity);
        this.auditService.updateAudit("Control Panel", controlPanelSecurityDTO.getOrgId(), Long.valueOf(UserThreadLocal.get()).longValue(), "Security Details Modified");
        return new ResponseEntity((Object)controlPanelResponseDTO, HttpStatus.OK);
    }

    @GetMapping(value={"/controlPanelSecurity/{id}"})
    public ResponseEntity<ControlPanelSecurityDTO> getControlPanelSecurityById(@PathVariable(value="id") Long id) throws RequestException {
        ControlPanelSecurityDTO controlPanelSecurityDTO = new ControlPanelSecurityDTO((ControlPanelSecurity)this.controlPanelSecurityService.findById(id.longValue()).get());
        return new ResponseEntity((Object)controlPanelSecurityDTO, HttpStatus.OK);
    }

    @DeleteMapping(value={"/controlPanelSecurity/{id}"})
    public ResponseEntity<ControlPanelResponseDTO> deleteControlPanelSecurityById(@PathVariable(value="id") Long id, HttpServletRequest request) throws RequestException {
        return new ResponseEntity((Object)this.controlPanelSecurityService.deleteById(id.longValue()), HttpStatus.OK);
    }

    @GetMapping(value={"/controlPanelSecurityList/{orgId}"})
    public ResponseEntity<ControlPanelSecurityDTO> findAllByOrgId(@PathVariable(value="orgId") long orgId) throws RequestException {
        Optional controlPanelSecurity = this.controlPanelSecurityService.findById(orgId);
        if (controlPanelSecurity.isPresent()) {
            ControlPanelSecurityDTO controlPanelSecurityDTO = new ControlPanelSecurityDTO((ControlPanelSecurity)controlPanelSecurity.get());
            return new ResponseEntity((Object)controlPanelSecurityDTO, HttpStatus.OK);
        }
        return new ResponseEntity((Object)new ControlPanelSecurityDTO(), HttpStatus.OK);
    }
}

