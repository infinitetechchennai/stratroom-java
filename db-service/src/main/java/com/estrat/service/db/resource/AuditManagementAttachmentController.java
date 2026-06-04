/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.AuditManagementAttachment
 *  com.estrat.service.db.dto.AuditManagementAttachmentDTO
 *  com.estrat.service.db.exception.RequestException
 *  com.estrat.service.db.resource.AuditManagementAttachmentController
 *  com.estrat.service.db.service.AuditManagementAttachmentService
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
package com.estrat.service.db.resource;

import com.estrat.service.db.bean.po.AuditManagementAttachment;
import com.estrat.service.db.dto.AuditManagementAttachmentDTO;
import com.estrat.service.db.exception.RequestException;
import com.estrat.service.db.service.AuditManagementAttachmentService;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
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
public class AuditManagementAttachmentController {
    @Autowired
    protected AuditManagementAttachmentService auditManagementAttachmentService;

    @PostMapping(value={"/auditAttach"})
    public ResponseEntity<AuditManagementAttachmentDTO> saveAuditAttachment(@RequestBody AuditManagementAttachmentDTO auditManagementAttachmentDTO, HttpServletRequest request) throws RequestException {
        AuditManagementAttachment auditAttachment = new AuditManagementAttachment(auditManagementAttachmentDTO);
        auditAttachment.setCreatedTime(LocalDateTime.now());
        AuditManagementAttachmentDTO response = this.auditManagementAttachmentService.save(auditAttachment);
        return new ResponseEntity((Object)response, HttpStatus.OK);
    }

    @GetMapping(value={"/auditAttach/{id}"})
    public ResponseEntity<AuditManagementAttachmentDTO> getAuditAttachmentById(@PathVariable(value="id") Long id) throws RequestException {
        AuditManagementAttachmentDTO auditAttachmentDTO = new AuditManagementAttachmentDTO((AuditManagementAttachment)this.auditManagementAttachmentService.findById(id.longValue()).get());
        return new ResponseEntity((Object)auditAttachmentDTO, HttpStatus.OK);
    }

    @PutMapping(value={"/auditAttach"})
    public ResponseEntity<AuditManagementAttachmentDTO> updateAuditAttachment(@RequestBody AuditManagementAttachmentDTO auditManagementAttachmentDTO) throws RequestException {
        AuditManagementAttachment auditAttachment = new AuditManagementAttachment(auditManagementAttachmentDTO);
        auditAttachment.setUpdatedTime(LocalDateTime.now());
        AuditManagementAttachmentDTO response = this.auditManagementAttachmentService.save(auditAttachment);
        return new ResponseEntity((Object)response, HttpStatus.OK);
    }

    @DeleteMapping(value={"/auditAttach/{id}"})
    public ResponseEntity<Boolean> deleteAuditAttachmentById(@PathVariable(value="id") Long id, HttpServletRequest request) throws RequestException {
        Optional auditAttachment = this.auditManagementAttachmentService.findById(id.longValue());
        if (auditAttachment.isPresent()) {
            AuditManagementAttachment analysisAttachment = (AuditManagementAttachment)auditAttachment.get();
            this.auditManagementAttachmentService.delete(analysisAttachment);
            return new ResponseEntity((Object)true, HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    @GetMapping(value={"/auditAttachList/{auditId}"})
    public ResponseEntity<List<AuditManagementAttachmentDTO>> auditAttachmentList(@PathVariable(value="auditId") Long auditId) throws RequestException {
        List attachmentDTOList = this.auditManagementAttachmentService.findAll(auditId.longValue());
        return new ResponseEntity((Object)attachmentDTOList, HttpStatus.OK);
    }
}

