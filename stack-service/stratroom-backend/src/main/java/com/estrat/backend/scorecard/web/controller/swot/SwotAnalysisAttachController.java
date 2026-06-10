/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.scorecard.dto.SWOTAnalysisAttachmentDTO
 *  com.estrat.backend.scorecard.exception.RequestException
 *  com.estrat.backend.scorecard.service.SwotAnalysisAttachmentService
 *  com.estrat.backend.scorecard.web.controller.swot.SwotAnalysisAttachController
 *  javax.servlet.http.HttpServletRequest
 *  Logger
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
package com.estrat.backend.scorecard.web.controller.swot;

import com.estrat.backend.scorecard.dto.SWOTAnalysisAttachmentDTO;
import com.estrat.backend.scorecard.exception.RequestException;
import com.estrat.backend.scorecard.service.SwotAnalysisAttachmentService;
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

    @PostMapping(value={"/swotAttach"})
    public ResponseEntity<SWOTAnalysisAttachmentDTO> saveSWOTAnalysisAttachment(@RequestBody SWOTAnalysisAttachmentDTO swotAnalysisAttachmentDTO, HttpServletRequest request) throws RequestException {
        return new ResponseEntity((Object)this.analysisAttachmentService.save(swotAnalysisAttachmentDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/swotAttach/{id}"})
    public ResponseEntity<SWOTAnalysisAttachmentDTO> getSWOTAnalysisAttachmentById(@PathVariable(value="id") Long id) throws RequestException {
        return new ResponseEntity((Object)this.analysisAttachmentService.findById(id), HttpStatus.OK);
    }

    @PutMapping(value={"/swotAttach"})
    public ResponseEntity<SWOTAnalysisAttachmentDTO> updateSWOTAnalysisAttachmentById(@RequestBody SWOTAnalysisAttachmentDTO swotAnalysisAttachmentDTO) throws RequestException {
        return new ResponseEntity((Object)this.analysisAttachmentService.update(swotAnalysisAttachmentDTO), HttpStatus.OK);
    }

    @DeleteMapping(value={"/swotAttach/{id}"})
    public ResponseEntity<Boolean> deleteSWOTAnalysisAttachmentById(@PathVariable(value="id") Long id, HttpServletRequest request) throws RequestException {
        this.analysisAttachmentService.delete(id);
        return new ResponseEntity((Object)true, HttpStatus.OK);
    }

    @GetMapping(value={"/swotAttachList/{swotId}"})
    public ResponseEntity<List<SWOTAnalysisAttachmentDTO>> swotAttachList(@PathVariable(value="swotId") Long swotId) throws RequestException {
        return new ResponseEntity((Object)this.analysisAttachmentService.findAll(swotId), HttpStatus.OK);
    }
}

