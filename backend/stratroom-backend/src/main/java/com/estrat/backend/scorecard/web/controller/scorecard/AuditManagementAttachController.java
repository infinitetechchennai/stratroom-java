/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.scorecard.dto.AuditManagementAttachmentDTO
 *  com.estrat.backend.scorecard.exception.RequestException
 *  com.estrat.backend.scorecard.service.AuditManagementAttachmentService
 *  com.estrat.backend.scorecard.web.controller.scorecard.AuditManagementAttachController
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
package com.estrat.backend.scorecard.web.controller.scorecard;

import com.estrat.backend.scorecard.dto.AuditManagementAttachmentDTO;
import com.estrat.backend.scorecard.exception.RequestException;
import com.estrat.backend.scorecard.service.AuditManagementAttachmentService;
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
public class AuditManagementAttachController {
    @Autowired
    protected AuditManagementAttachmentService auditManagementAttachService;

    @PostMapping(value={"/auditAttach"})
    public ResponseEntity<AuditManagementAttachmentDTO> saveAuditAttach(@RequestBody AuditManagementAttachmentDTO auditManagementAttachmentDTO, HttpServletRequest request) throws RequestException {
        return new ResponseEntity((Object)this.auditManagementAttachService.save(auditManagementAttachmentDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/auditAttach/{id}"})
    public ResponseEntity<AuditManagementAttachmentDTO> getAuditAttachById(@PathVariable(value="id") Long id) throws RequestException {
        return new ResponseEntity((Object)this.auditManagementAttachService.findById(id), HttpStatus.OK);
    }

    @PutMapping(value={"/auditAttach"})
    public ResponseEntity<AuditManagementAttachmentDTO> updateAuditAttachById(@RequestBody AuditManagementAttachmentDTO auditManagementAttachmentDTO) throws RequestException {
        return new ResponseEntity((Object)this.auditManagementAttachService.update(auditManagementAttachmentDTO), HttpStatus.OK);
    }

    @DeleteMapping(value={"/auditAttach/{id}"})
    public ResponseEntity<Boolean> deleteAuditAttachById(@PathVariable(value="id") Long id, HttpServletRequest request) throws RequestException {
        this.auditManagementAttachService.delete(id);
        return new ResponseEntity((Object)true, HttpStatus.OK);
    }

    @GetMapping(value={"/auditAttachList/{auditId}"})
    public ResponseEntity<List<AuditManagementAttachmentDTO>> auditAttachList(@PathVariable(value="auditId") Long auditId) throws RequestException {
        return new ResponseEntity((Object)this.auditManagementAttachService.findAll(auditId), HttpStatus.OK);
    }
}

