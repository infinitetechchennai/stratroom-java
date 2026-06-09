/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.scorecard.dto.ComplianceDetailsAttachmentDTO
 *  com.estrat.scorecard.exception.RequestException
 *  com.estrat.scorecard.service.ComplianceDetailsAttachmentService
 *  com.estrat.scorecard.web.controller.approvers.ComplianceDetailsAttachmentController
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
package com.estrat.scorecard.web.controller.approvers;

import com.estrat.scorecard.dto.ComplianceDetailsAttachmentDTO;
import com.estrat.scorecard.exception.RequestException;
import com.estrat.scorecard.service.ComplianceDetailsAttachmentService;
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
public class ComplianceDetailsAttachmentController {
    @Autowired
    protected ComplianceDetailsAttachmentService complianceDetailsAttachmentService;

    @PostMapping(value={"/ComplianceAttach"})
    public ResponseEntity<ComplianceDetailsAttachmentDTO> saveComplainceAttachment(@RequestBody ComplianceDetailsAttachmentDTO complianceDetailsAttachmentDTO, HttpServletRequest request) throws RequestException {
        return new ResponseEntity((Object)this.complianceDetailsAttachmentService.saveComplainAttachment(complianceDetailsAttachmentDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/ComplianceAttach/{id}"})
    public ResponseEntity<ComplianceDetailsAttachmentDTO> getComplainAttachmentById(@PathVariable(value="id") Long id) throws RequestException {
        return new ResponseEntity((Object)this.complianceDetailsAttachmentService.retrieveComplainAttachment(id), HttpStatus.OK);
    }

    @PutMapping(value={"/ComplianceAttach"})
    public ResponseEntity<ComplianceDetailsAttachmentDTO> updateComplainAttachmentById(@RequestBody ComplianceDetailsAttachmentDTO complianceDetailsAttachmentDTO) throws RequestException {
        return new ResponseEntity((Object)this.complianceDetailsAttachmentService.updateComplainAttachment(complianceDetailsAttachmentDTO), HttpStatus.OK);
    }

    @DeleteMapping(value={"/ComplianceAttach/{id}"})
    public ResponseEntity<Boolean> deleteComplainAttachmentById(@PathVariable(value="id") Long id, HttpServletRequest request) throws RequestException {
        this.complianceDetailsAttachmentService.removeComplainAttachmentt(id);
        return new ResponseEntity((Object)true, HttpStatus.OK);
    }

    @GetMapping(value={"/ComplianceAttachList/{complainId}"})
    public ResponseEntity<List<ComplianceDetailsAttachmentDTO>> complainAttachList(@PathVariable(value="complainId") Long complainId) throws RequestException {
        return new ResponseEntity((Object)this.complianceDetailsAttachmentService.findAll(complainId), HttpStatus.OK);
    }
}

