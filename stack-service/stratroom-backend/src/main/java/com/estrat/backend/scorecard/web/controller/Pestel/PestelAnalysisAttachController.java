/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.scorecard.dto.PestelAnalysisAttachmentDTO
 *  com.estrat.backend.scorecard.exception.RequestException
 *  com.estrat.backend.scorecard.service.PestelAnalysisAttachmentService
 *  com.estrat.backend.scorecard.web.controller.Pestel.PestelAnalysisAttachController
 *  com.estrat.backend.scorecard.web.controller.Pestel.PestelAnalysisController
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
package com.estrat.backend.scorecard.web.controller.Pestel;

import com.estrat.backend.scorecard.dto.PestelAnalysisAttachmentDTO;
import com.estrat.backend.scorecard.exception.RequestException;
import com.estrat.backend.scorecard.service.PestelAnalysisAttachmentService;
import com.estrat.backend.scorecard.web.controller.Pestel.PestelAnalysisController;
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

    @PostMapping(value={"/pestelAttach"})
    public ResponseEntity<PestelAnalysisAttachmentDTO> savePestelAnalysisAttach(@RequestBody PestelAnalysisAttachmentDTO pestelAnalysisAttachmentDTO, HttpServletRequest request) throws RequestException {
        return new ResponseEntity((Object)this.pestelAnalysisAttachmentService.save(pestelAnalysisAttachmentDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/pestelAttach/{id}"})
    public ResponseEntity<PestelAnalysisAttachmentDTO> getPestelAnalysisAttachDetailsById(@PathVariable(value="id") Long id) throws RequestException {
        return new ResponseEntity((Object)this.pestelAnalysisAttachmentService.findById(id), HttpStatus.OK);
    }

    @PutMapping(value={"/pestelAttach"})
    public ResponseEntity<PestelAnalysisAttachmentDTO> updatePestelAnalysisAttachDetailsById(@RequestBody PestelAnalysisAttachmentDTO pestelAnalysisAttachmentDTO) throws RequestException {
        return new ResponseEntity((Object)this.pestelAnalysisAttachmentService.update(pestelAnalysisAttachmentDTO), HttpStatus.OK);
    }

    @DeleteMapping(value={"/pestelAttach/{id}"})
    public ResponseEntity<Boolean> deletePestelAnalysisAttachDetailsById(@PathVariable(value="id") Long id, HttpServletRequest request) throws RequestException {
        this.pestelAnalysisAttachmentService.delete(id);
        return new ResponseEntity((Object)true, HttpStatus.OK);
    }

    @GetMapping(value={"/pestelAttachList/{pestelId}"})
    public ResponseEntity<List<PestelAnalysisAttachmentDTO>> findAllByEmpId(@PathVariable(value="pestelId") Long pestelId) throws RequestException {
        return new ResponseEntity((Object)this.pestelAnalysisAttachmentService.findAll(pestelId), HttpStatus.OK);
    }
}

