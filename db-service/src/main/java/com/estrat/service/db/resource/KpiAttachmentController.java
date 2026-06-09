/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.KpiDetailsAttachments
 *  com.estrat.service.db.dto.KpiDetailsAttachmentsDTO
 *  com.estrat.service.db.exception.RequestException
 *  com.estrat.service.db.resource.KpiAttachmentController
 *  com.estrat.service.db.service.KpiAttachmentService
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

import com.estrat.service.db.bean.po.KpiDetailsAttachments;
import com.estrat.service.db.dto.KpiDetailsAttachmentsDTO;
import com.estrat.service.db.exception.RequestException;
import com.estrat.service.db.service.KpiAttachmentService;
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
public class KpiAttachmentController {
    @Autowired
    protected KpiAttachmentService kpiAttachmentservice;

    @PostMapping(value={"/kpiAttach"})
    public ResponseEntity<KpiDetailsAttachmentsDTO> saveKPIAttachment(@RequestBody KpiDetailsAttachmentsDTO kpiAttachmentsDTO, HttpServletRequest request) throws RequestException {
        KpiDetailsAttachments attachment = new KpiDetailsAttachments(kpiAttachmentsDTO);
        attachment.setCreatedTime(LocalDateTime.now());
        KpiDetailsAttachmentsDTO response = this.kpiAttachmentservice.save(attachment);
        return new ResponseEntity((Object)response, HttpStatus.OK);
    }

    @GetMapping(value={"/kpiAttach/{id}"})
    public ResponseEntity<KpiDetailsAttachmentsDTO> getKPIAttachmentById(@PathVariable(value="id") Long id) throws RequestException {
        KpiDetailsAttachmentsDTO kpiAttachmentDTO = new KpiDetailsAttachmentsDTO((KpiDetailsAttachments)this.kpiAttachmentservice.findById(id.longValue()).get());
        return new ResponseEntity((Object)kpiAttachmentDTO, HttpStatus.OK);
    }

    @PutMapping(value={"/kpiAttach"})
    public ResponseEntity<KpiDetailsAttachmentsDTO> updateKPIAttachmentById(@RequestBody KpiDetailsAttachmentsDTO kpiAttachmentsDTO) throws RequestException {
        KpiDetailsAttachments kpiAttachment = new KpiDetailsAttachments(kpiAttachmentsDTO);
        kpiAttachment.setUpdatedTime(LocalDateTime.now());
        KpiDetailsAttachmentsDTO response = this.kpiAttachmentservice.save(kpiAttachment);
        return new ResponseEntity((Object)response, HttpStatus.OK);
    }

    @DeleteMapping(value={"/kpiAttach/{id}"})
    public ResponseEntity<Boolean> deleteKPIAttachmentByIds(@PathVariable(value="id") Long id, HttpServletRequest request) throws RequestException {
        Optional kpiAttachment = this.kpiAttachmentservice.findById(id.longValue());
        if (kpiAttachment.isPresent()) {
            KpiDetailsAttachments analysisAttachment = (KpiDetailsAttachments)kpiAttachment.get();
            this.kpiAttachmentservice.delete(analysisAttachment);
            return new ResponseEntity((Object)true, HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }
}

