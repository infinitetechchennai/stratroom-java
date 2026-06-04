/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.controller.KpiAttachmentController
 *  com.estrat.web.dto.KpiDetailsAttachmentsDTO
 *  com.estrat.web.exception.RequestException
 *  com.estrat.web.service.KpiAttachmentService
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

import com.estrat.web.dto.KpiDetailsAttachmentsDTO;
import com.estrat.web.exception.RequestException;
import com.estrat.web.service.KpiAttachmentService;
import com.estrat.web.util.RequestSessionUtil;
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
public class KpiAttachmentController {
    @Autowired
    protected KpiAttachmentService kpiAttachmentService;
    @Autowired
    protected RequestSessionUtil sessionUtil;

    @PostMapping(value={"/kpiAttach"})
    public ResponseEntity<KpiDetailsAttachmentsDTO> saveKPIAttachment(@RequestBody KpiDetailsAttachmentsDTO kpiDetailsAttachmentsDTO, HttpServletRequest request) throws RequestException {
        kpiDetailsAttachmentsDTO.setCreatedBy(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue());
        return new ResponseEntity(this.kpiAttachmentService.save(kpiDetailsAttachmentsDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/kpiAttach/{id}"})
    public ResponseEntity<KpiDetailsAttachmentsDTO> getKPIAttachmentById(@PathVariable(value="id") Long id) throws RequestException {
        return new ResponseEntity(this.kpiAttachmentService.findById(id), HttpStatus.OK);
    }

    @PutMapping(value={"/kpiAttach"})
    public ResponseEntity<KpiDetailsAttachmentsDTO> updateKPIAttachmentById(@RequestBody KpiDetailsAttachmentsDTO kpiDetailsAttachmentsDTO, HttpServletRequest request) throws RequestException {
        kpiDetailsAttachmentsDTO.setUpdatedBy(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue());
        return new ResponseEntity(this.kpiAttachmentService.update(kpiDetailsAttachmentsDTO), HttpStatus.OK);
    }

    @DeleteMapping(value={"/kpiAttach/{id}"})
    public ResponseEntity<Boolean> deleteKPIAttachmentById(@PathVariable(value="id") Long id, HttpServletRequest request) throws RequestException {
        this.kpiAttachmentService.delete(id);
        return new ResponseEntity(true, HttpStatus.OK);
    }
}

