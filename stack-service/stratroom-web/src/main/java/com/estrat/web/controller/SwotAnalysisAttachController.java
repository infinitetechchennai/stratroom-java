/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.controller.SwotAnalysisAttachController
 *  com.estrat.web.dto.SWOTAnalysisAttachmentDTO
 *  com.estrat.web.exception.RequestException
 *  com.estrat.web.service.SwotAnalysisAttachmentService
 *  com.estrat.web.util.RequestSessionUtil
 *  javax.servlet.http.HttpServletRequest
 *  org.apache.log4j.Logger
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

import com.estrat.web.dto.SWOTAnalysisAttachmentDTO;
import com.estrat.web.exception.RequestException;
import com.estrat.web.service.SwotAnalysisAttachmentService;
import com.estrat.web.util.RequestSessionUtil;
import java.util.List;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
public class SwotAnalysisAttachController {
    private Logger log = LoggerFactory.getLogger(SwotAnalysisAttachController.class);
    @Autowired
    protected SwotAnalysisAttachmentService analysisAttachmentService;
    @Autowired
    protected RequestSessionUtil sessionUtil;

    @PostMapping(value={"/swotAttach"})
    public ResponseEntity<SWOTAnalysisAttachmentDTO> saveSWOTAnalysisAttachment(@RequestBody SWOTAnalysisAttachmentDTO swotAnalysisAttachmentDTO, HttpServletRequest request) throws RequestException {
        swotAnalysisAttachmentDTO.setCreatedBy(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue());
        return new ResponseEntity(this.analysisAttachmentService.save(swotAnalysisAttachmentDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/swotAttach/{id}"})
    public ResponseEntity<SWOTAnalysisAttachmentDTO> getSWOTAnalysisAttachmentById(@PathVariable(value="id") Long id) throws RequestException {
        return new ResponseEntity(this.analysisAttachmentService.findById(id), HttpStatus.OK);
    }

    @PutMapping(value={"/swotAttach"})
    public ResponseEntity<SWOTAnalysisAttachmentDTO> updateSWOTAnalysisAttachmentById(@RequestBody SWOTAnalysisAttachmentDTO swotAnalysisAttachmentDTO, HttpServletRequest request) throws RequestException {
        swotAnalysisAttachmentDTO.setUpdatedBy(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue());
        return new ResponseEntity(this.analysisAttachmentService.update(swotAnalysisAttachmentDTO), HttpStatus.OK);
    }

    @DeleteMapping(value={"/swotAttach/{id}"})
    public ResponseEntity<Boolean> deleteSWOTAnalysisAttachmentById(@PathVariable(value="id") Long id, HttpServletRequest request) throws RequestException {
        this.analysisAttachmentService.delete(id);
        return new ResponseEntity(true, HttpStatus.OK);
    }

    @GetMapping(value={"/swotAttachList/{swotId}"})
    public ResponseEntity<List<SWOTAnalysisAttachmentDTO>> swotAttachList(@PathVariable(value="swotId") Long swotId) throws RequestException {
        List SWOTAnalysisAttachmentDTOList = this.analysisAttachmentService.findAll(swotId);
        return new ResponseEntity(SWOTAnalysisAttachmentDTOList, HttpStatus.OK);
    }
}

