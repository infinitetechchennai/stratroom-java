/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.controller.AuditManagementController
 *  com.estrat.web.dto.AuditDashBoardResponseDTO
 *  com.estrat.web.dto.AuditManagementDTO
 *  com.estrat.web.exception.RequestException
 *  com.estrat.web.service.AuditManagementService
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

import com.estrat.web.dto.AuditDashBoardResponseDTO;
import com.estrat.web.dto.AuditManagementDTO;
import com.estrat.web.exception.RequestException;
import com.estrat.web.service.AuditManagementService;
import com.estrat.web.util.RequestSessionUtil;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
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
public class AuditManagementController {
    @Autowired
    private AuditManagementService auditManagementService;
    @Autowired
    protected RequestSessionUtil sessionUtil;

    @PostMapping(value={"/auditManagement"})
    public ResponseEntity<AuditManagementDTO> saveProject(@RequestBody AuditManagementDTO auditManagementDTO, HttpServletRequest request) throws RequestException {
        auditManagementDTO.setCreatedBy(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue());
        return new ResponseEntity(this.auditManagementService.saveProject(auditManagementDTO), HttpStatus.OK);
    }

    @PutMapping(value={"/auditManagement"})
    public ResponseEntity<AuditManagementDTO> updateProject(@RequestBody AuditManagementDTO auditManagementDTO, HttpServletRequest request) throws RequestException {
        auditManagementDTO.setUpdatedBy(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue());
        return new ResponseEntity(this.auditManagementService.updateProject(auditManagementDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/auditManagement/{id}"})
    public ResponseEntity<AuditManagementDTO> getProject(@PathVariable(value="id") Long id) throws RequestException {
        return new ResponseEntity(this.auditManagementService.retrieveProject(id), HttpStatus.OK);
    }

    @DeleteMapping(value={"/auditManagement/{id}"})
    public ResponseEntity<Boolean> deleteProject(@PathVariable(value="id") Long id) throws RequestException {
        this.auditManagementService.removeProject(id);
        return new ResponseEntity(true, HttpStatus.OK);
    }

    @GetMapping(value={"/auditManagementList"})
    public ResponseEntity<List<AuditManagementDTO>> findAll(@RequestParam(value="pageId", required=false) String pageId) throws RequestException {
        List meetingManagementDTOS = this.auditManagementService.findAll(pageId);
        return new ResponseEntity(meetingManagementDTOS, HttpStatus.OK);
    }

    @GetMapping(value={"/auditDashBoardData"})
    public ResponseEntity<AuditDashBoardResponseDTO> auditDashBoardData(@RequestParam(value="deptId", required=false) String deptId, HttpServletRequest request) throws RequestException {
        AuditDashBoardResponseDTO eventlist = this.auditManagementService.auditDashBoardData(Long.parseLong(deptId));
        return new ResponseEntity(eventlist, HttpStatus.OK);
    }
}

