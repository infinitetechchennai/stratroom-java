/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.controller.ComplianceDetailsAttachmentController
 *  com.estrat.web.dto.ComplianceDetailsAttachmentDTO
 *  com.estrat.web.exception.RequestException
 *  com.estrat.web.service.ComplianceDetailsAttachmentService
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
 */
package com.estrat.web.controller;

import com.estrat.web.dto.ComplianceDetailsAttachmentDTO;
import com.estrat.web.exception.RequestException;
import com.estrat.web.service.ComplianceDetailsAttachmentService;
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

public class ComplianceDetailsAttachmentController {
    @Autowired
    protected ComplianceDetailsAttachmentService complianceDetailsAttachmentService;
    @Autowired
    protected RequestSessionUtil sessionUtil;

    @PostMapping(value={"/ComplianceAttach"})
    public ResponseEntity<ComplianceDetailsAttachmentDTO> saveComplainceAttachment(@RequestBody ComplianceDetailsAttachmentDTO complianceDetailsAttachmentDTO, HttpServletRequest request) throws RequestException {
        complianceDetailsAttachmentDTO.setCreatedBy(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue());
        return new ResponseEntity(this.complianceDetailsAttachmentService.saveComplainAttachment(complianceDetailsAttachmentDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/ComplianceAttach/{id}"})
    public ResponseEntity<ComplianceDetailsAttachmentDTO> getComplainAttachmentById(@PathVariable(value="id") Long id) throws RequestException {
        return new ResponseEntity(this.complianceDetailsAttachmentService.retrieveComplainAttachment(id), HttpStatus.OK);
    }

    @PutMapping(value={"/ComplianceAttach"})
    public ResponseEntity<ComplianceDetailsAttachmentDTO> updateComplainAttachmentById(@RequestBody ComplianceDetailsAttachmentDTO complianceDetailsAttachmentDTO, HttpServletRequest request) throws RequestException {
        complianceDetailsAttachmentDTO.setUpdatedBy(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue());
        return new ResponseEntity(this.complianceDetailsAttachmentService.updateComplainAttachment(complianceDetailsAttachmentDTO), HttpStatus.OK);
    }

    @DeleteMapping(value={"/ComplianceAttach/{id}"})
    public ResponseEntity<Boolean> deleteComplainAttachmentById(@PathVariable(value="id") Long id, HttpServletRequest request) throws RequestException {
        this.complianceDetailsAttachmentService.removeComplainAttachmentt(id);
        return new ResponseEntity(true, HttpStatus.OK);
    }

    @GetMapping(value={"/ComplianceAttachList/{complainId}"})
    public ResponseEntity<List<ComplianceDetailsAttachmentDTO>> complainAttachList(@PathVariable(value="complainId") Long complainId) throws RequestException {
        return new ResponseEntity(this.complianceDetailsAttachmentService.findAll(complainId), HttpStatus.OK);
    }
}

