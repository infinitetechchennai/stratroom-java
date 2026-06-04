/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.ComplianceDetailsAttachment
 *  com.estrat.service.db.dto.ComplianceDetailsAttachmentDTO
 *  com.estrat.service.db.exception.RequestException
 *  com.estrat.service.db.resource.ComplianceDetailsAttachmentController
 *  com.estrat.service.db.service.ComplianceDetailsAttachmentService
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

import com.estrat.service.db.bean.po.ComplianceDetailsAttachment;
import com.estrat.service.db.dto.ComplianceDetailsAttachmentDTO;
import com.estrat.service.db.exception.RequestException;
import com.estrat.service.db.service.ComplianceDetailsAttachmentService;
import java.time.LocalDateTime;
import java.util.Objects;
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
public class ComplianceDetailsAttachmentController {
    @Autowired
    protected ComplianceDetailsAttachmentService complianceDetailsAttachmentService;

    @PostMapping(value={"/ComplianceAttach"})
    public ResponseEntity<ComplianceDetailsAttachmentDTO> saveComplainceAttachment(@RequestBody ComplianceDetailsAttachmentDTO complianceDetailsAttachmentDTO, HttpServletRequest request) throws RequestException {
        ComplianceDetailsAttachment complainAttachment = new ComplianceDetailsAttachment(complianceDetailsAttachmentDTO);
        complainAttachment.setCreatedTime(LocalDateTime.now());
        ComplianceDetailsAttachmentDTO response = this.complianceDetailsAttachmentService.save(complainAttachment);
        return new ResponseEntity((Object)response, HttpStatus.OK);
    }

    @GetMapping(value={"/ComplianceAttach/{id}"})
    public ResponseEntity<ComplianceDetailsAttachmentDTO> getComplainAttachmentById(@PathVariable(value="id") Long id) throws RequestException {
        ComplianceDetailsAttachmentDTO managementAttachmentDTO = new ComplianceDetailsAttachmentDTO((ComplianceDetailsAttachment)this.complianceDetailsAttachmentService.findById(id.longValue()).get());
        return new ResponseEntity((Object)managementAttachmentDTO, HttpStatus.OK);
    }

    @PutMapping(value={"/ComplianceAttach"})
    public ResponseEntity<ComplianceDetailsAttachmentDTO> updateComplainAttachmentById(@RequestBody ComplianceDetailsAttachmentDTO complianceDetailsAttachmentDTO) throws RequestException {
        ComplianceDetailsAttachment complainAttachment = new ComplianceDetailsAttachment(complianceDetailsAttachmentDTO);
        if (Objects.isNull(complianceDetailsAttachmentDTO.getCreatedTime())) {
            complainAttachment.setCreatedTime(LocalDateTime.now());
        }
        complainAttachment.setUpdatedTime(LocalDateTime.now());
        ComplianceDetailsAttachmentDTO response = this.complianceDetailsAttachmentService.save(complainAttachment);
        return new ResponseEntity((Object)response, HttpStatus.OK);
    }

    @DeleteMapping(value={"/ComplianceAttach/{id}"})
    public ResponseEntity<Boolean> deleteMeetingManagementAttachmentById(@PathVariable(value="id") Long id, HttpServletRequest request) throws RequestException {
        Optional complainAttachment = this.complianceDetailsAttachmentService.findById(id.longValue());
        if (complainAttachment.isPresent()) {
            ComplianceDetailsAttachment managementAttachment = (ComplianceDetailsAttachment)complainAttachment.get();
            this.complianceDetailsAttachmentService.delete(managementAttachment);
            return new ResponseEntity((Object)true, HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }
}

