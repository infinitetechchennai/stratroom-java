/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.controller.PestelAnalysisAttachController
 *  com.estrat.web.controller.PestelAnalysisController
 *  com.estrat.web.dto.PestelAnalysisAttachmentDTO
 *  com.estrat.web.exception.RequestException
 *  com.estrat.web.service.PestelAnalysisAttachmentService
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

import com.estrat.web.controller.PestelAnalysisController;
import com.estrat.web.dto.PestelAnalysisAttachmentDTO;
import com.estrat.web.exception.RequestException;
import com.estrat.web.service.PestelAnalysisAttachmentService;
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
public class PestelAnalysisAttachController {
    private Logger log = LoggerFactory.getLogger(PestelAnalysisController.class);
    @Autowired
    protected PestelAnalysisAttachmentService pestelAnalysisAttachmentService;
    @Autowired
    protected RequestSessionUtil sessionUtil;

    @PostMapping(value={"/pestelAttach"})
    public ResponseEntity<PestelAnalysisAttachmentDTO> savePestelAnalysisAttach(@RequestBody PestelAnalysisAttachmentDTO pestelAnalysisAttachmentDTO, HttpServletRequest request) throws RequestException {
        pestelAnalysisAttachmentDTO.setCreatedBy(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue());
        return new ResponseEntity(this.pestelAnalysisAttachmentService.save(pestelAnalysisAttachmentDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/pestelAttach/{id}"})
    public ResponseEntity<PestelAnalysisAttachmentDTO> getPestelAnalysisAttachDetailsById(@PathVariable(value="id") Long id) throws RequestException {
        return new ResponseEntity(this.pestelAnalysisAttachmentService.findById(id), HttpStatus.OK);
    }

    @PutMapping(value={"/pestelAttach"})
    public ResponseEntity<PestelAnalysisAttachmentDTO> updatePestelAnalysisAttachDetailsById(@RequestBody PestelAnalysisAttachmentDTO pestelAnalysisAttachmentDTO, HttpServletRequest request) throws RequestException {
        pestelAnalysisAttachmentDTO.setUpdatedBy(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue());
        return new ResponseEntity(this.pestelAnalysisAttachmentService.update(pestelAnalysisAttachmentDTO), HttpStatus.OK);
    }

    @DeleteMapping(value={"/pestelAttach/{id}"})
    public ResponseEntity<Boolean> deletePestelAnalysisAttachDetailsById(@PathVariable(value="id") Long id, HttpServletRequest request) throws RequestException {
        this.pestelAnalysisAttachmentService.delete(id);
        return new ResponseEntity(true, HttpStatus.OK);
    }

    @GetMapping(value={"/pestelAttachList/{pestelId}"})
    public ResponseEntity<List<PestelAnalysisAttachmentDTO>> findAllByEmpId(@PathVariable(value="pestelId") Long pestelId) throws RequestException {
        List pestelAnalysisAttachmentDTOList = this.pestelAnalysisAttachmentService.findAll(pestelId);
        return new ResponseEntity(pestelAnalysisAttachmentDTOList, HttpStatus.OK);
    }
}

