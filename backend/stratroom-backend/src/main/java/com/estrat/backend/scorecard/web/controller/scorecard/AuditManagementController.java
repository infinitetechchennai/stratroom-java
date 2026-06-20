/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.scorecard.dto.AuditDashBoardResponseDTO
 *  com.estrat.backend.scorecard.dto.AuditManagementDTO
 *  com.estrat.backend.scorecard.exception.RequestException
 *  com.estrat.backend.scorecard.service.AuditManagementService
 *  com.estrat.backend.scorecard.web.controller.scorecard.AuditManagementController
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
package com.estrat.backend.scorecard.web.controller.scorecard;

import com.estrat.backend.scorecard.dto.AuditDashBoardResponseDTO;
import com.estrat.backend.scorecard.dto.AuditManagementDTO;
import com.estrat.backend.scorecard.exception.RequestException;
import com.estrat.backend.scorecard.service.AuditManagementService;
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
public class AuditManagementController {
    @Autowired
    private AuditManagementService auditManagementService;

    @PostMapping(value={"/auditManagement"})
    public ResponseEntity<AuditManagementDTO> saveProject(@RequestBody AuditManagementDTO auditManagementDTO) throws RequestException {
        return new ResponseEntity((Object)this.auditManagementService.saveProject(auditManagementDTO), HttpStatus.OK);
    }

    @PutMapping(value={"/auditManagement"})
    public ResponseEntity<AuditManagementDTO> updateProject(@RequestBody AuditManagementDTO auditManagementDTO) throws RequestException {
        return new ResponseEntity((Object)this.auditManagementService.updateProject(auditManagementDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/auditManagement/{id}"})
    public ResponseEntity<AuditManagementDTO> getProject(@PathVariable(value="id") Long id) throws RequestException {
        return new ResponseEntity((Object)this.auditManagementService.retrieveProject(id), HttpStatus.OK);
    }

    @DeleteMapping(value={"/auditManagement/{id}"})
    public ResponseEntity<Boolean> deleteProject(@PathVariable(value="id") Long id) throws RequestException {
        this.auditManagementService.removeProject(id);
        return new ResponseEntity((Object)true, HttpStatus.OK);
    }

    @GetMapping(value={"/auditManagementList"})
    public ResponseEntity<List<AuditManagementDTO>> findAll(@RequestParam(value="pageId", required=false) String pageId) throws RequestException {
        List meetingManagementDTOS = this.auditManagementService.findAll(pageId);
        return new ResponseEntity((Object)meetingManagementDTOS, HttpStatus.OK);
    }

    @GetMapping(value={"/auditDashBoardData"})
    public ResponseEntity<AuditDashBoardResponseDTO> riskDashBoardData(@RequestParam(value="deptId", required=false) String deptId, HttpServletRequest request) throws RequestException {
        AuditDashBoardResponseDTO eventlist = this.auditManagementService.auditDashBoardData(Long.parseLong(deptId));
        return new ResponseEntity((Object)eventlist, HttpStatus.OK);
    }
}

