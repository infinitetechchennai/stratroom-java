/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.controller.AuditManagementAttachController
 *  com.estrat.web.dto.AuditManagementAttachmentDTO
 *  com.estrat.web.exception.RequestException
 *  com.estrat.web.service.AuditManagementAttachmentService
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

import com.estrat.web.dto.AuditManagementAttachmentDTO;
import com.estrat.web.exception.RequestException;
import com.estrat.web.service.AuditManagementAttachmentService;
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
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuditManagementAttachController {
    @Autowired
    protected AuditManagementAttachmentService auditManagementAttachService;
    @Autowired
    protected RequestSessionUtil sessionUtil;

    @PostMapping(value={"/auditAttach"})
    public ResponseEntity<AuditManagementAttachmentDTO> saveAuditAttach(@RequestBody AuditManagementAttachmentDTO auditManagementAttachmentDTO, HttpServletRequest request) throws RequestException {
        auditManagementAttachmentDTO.setCreatedBy(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue());
        return new ResponseEntity(this.auditManagementAttachService.save(auditManagementAttachmentDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/auditAttach/{id}"})
    public ResponseEntity<AuditManagementAttachmentDTO> getAuditAttachById(@PathVariable(value="id") Long id) throws RequestException {
        return new ResponseEntity(this.auditManagementAttachService.findById(id), HttpStatus.OK);
    }

    @PutMapping(value={"/auditAttach"})
    public ResponseEntity<AuditManagementAttachmentDTO> updateAuditAttachById(@RequestBody AuditManagementAttachmentDTO auditManagementAttachmentDTO, HttpServletRequest request) throws RequestException {
        auditManagementAttachmentDTO.setUpdatedBy(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue());
        return new ResponseEntity(this.auditManagementAttachService.update(auditManagementAttachmentDTO), HttpStatus.OK);
    }

    @DeleteMapping(value={"/auditAttach/{id}"})
    public ResponseEntity<Boolean> deleteAuditAttachById(@PathVariable(value="id") Long id, HttpServletRequest request) throws RequestException {
        this.auditManagementAttachService.delete(id);
        return new ResponseEntity(true, HttpStatus.OK);
    }

    @GetMapping(value={"/auditAttachList/{auditId}"})
    public ResponseEntity<List<AuditManagementAttachmentDTO>> auditAttachList(@PathVariable(value="auditId") Long auditId) throws RequestException {
        return new ResponseEntity(this.auditManagementAttachService.findAll(auditId), HttpStatus.OK);
    }
}

