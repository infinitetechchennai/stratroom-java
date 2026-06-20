/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.scorecard.dto.KpiDetailsAttachmentsDTO
 *  com.estrat.backend.scorecard.exception.RequestException
 *  com.estrat.backend.scorecard.service.KpiAttachmentService
 *  com.estrat.backend.scorecard.web.controller.scorecard.KpiAttachmentController
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

import com.estrat.backend.scorecard.dto.KpiDetailsAttachmentsDTO;
import com.estrat.backend.scorecard.exception.RequestException;
import com.estrat.backend.scorecard.service.KpiAttachmentService;
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
    protected KpiAttachmentService kpiAttachmentService;

    @PostMapping(value={"/kpiAttach"})
    public ResponseEntity<KpiDetailsAttachmentsDTO> saveKPIAttachment(@RequestBody KpiDetailsAttachmentsDTO kpiDetailsAttachmentsDTO, HttpServletRequest request) throws RequestException {
        return new ResponseEntity((Object)this.kpiAttachmentService.save(kpiDetailsAttachmentsDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/kpiAttach/{id}"})
    public ResponseEntity<KpiDetailsAttachmentsDTO> getKPIAttachmentById(@PathVariable(value="id") Long id) throws RequestException {
        return new ResponseEntity((Object)this.kpiAttachmentService.findById(id), HttpStatus.OK);
    }

    @PutMapping(value={"/kpiAttach"})
    public ResponseEntity<KpiDetailsAttachmentsDTO> updateKPIAttachmentById(@RequestBody KpiDetailsAttachmentsDTO kpiDetailsAttachmentsDTO) throws RequestException {
        return new ResponseEntity((Object)this.kpiAttachmentService.update(kpiDetailsAttachmentsDTO), HttpStatus.OK);
    }

    @DeleteMapping(value={"/kpiAttach/{id}"})
    public ResponseEntity<Boolean> deleteKPIAttachmentById(@PathVariable(value="id") Long id, HttpServletRequest request) throws RequestException {
        this.kpiAttachmentService.delete(id);
        return new ResponseEntity((Object)true, HttpStatus.OK);
    }
}

