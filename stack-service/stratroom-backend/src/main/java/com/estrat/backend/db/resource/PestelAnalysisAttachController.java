/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.PestelAnalysisAttachment
 *  com.estrat.backend.db.dto.PestelAnalysisAttachmentDTO
 *  com.estrat.backend.db.exception.RequestException
 *  com.estrat.backend.db.resource.PestelAnalysisAttachController
 *  com.estrat.backend.db.resource.PestelAnalysisController
 *  com.estrat.backend.db.service.PestelAnalysisAttachmentService
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
package com.estrat.backend.db.resource;

import com.estrat.backend.db.bean.po.PestelAnalysisAttachment;
import com.estrat.backend.db.dto.PestelAnalysisAttachmentDTO;
import com.estrat.backend.db.exception.RequestException;
import com.estrat.backend.db.resource.PestelAnalysisController;
import com.estrat.backend.db.service.PestelAnalysisAttachmentService;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
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
        PestelAnalysisAttachment pestelAnalysis = new PestelAnalysisAttachment(pestelAnalysisAttachmentDTO);
        pestelAnalysis.setCreatedTime(LocalDateTime.now());
        PestelAnalysisAttachmentDTO responsePestelAnalysis = this.pestelAnalysisAttachmentService.save(pestelAnalysis);
        return new ResponseEntity((Object)responsePestelAnalysis, HttpStatus.OK);
    }

    @GetMapping(value={"/pestelAttach/{id}"})
    public ResponseEntity<PestelAnalysisAttachmentDTO> getPestelAnalysisAttachDetailsById(@PathVariable(value="id") Long id) throws RequestException {
        PestelAnalysisAttachmentDTO pestelAnalysisDTO = new PestelAnalysisAttachmentDTO((PestelAnalysisAttachment)this.pestelAnalysisAttachmentService.findById(id.longValue()).get());
        return new ResponseEntity((Object)pestelAnalysisDTO, HttpStatus.OK);
    }

    @PutMapping(value={"/pestelAttach"})
    public ResponseEntity<PestelAnalysisAttachmentDTO> updatePestelAnalysisAttachDetailsById(@RequestBody PestelAnalysisAttachmentDTO pestelAnalysisAttachmentDTO) throws RequestException {
        PestelAnalysisAttachment pestelAnalysis = new PestelAnalysisAttachment(pestelAnalysisAttachmentDTO);
        pestelAnalysis.setUpdatedTime(LocalDateTime.now());
        PestelAnalysisAttachmentDTO responsePestelAnalysisDTO = this.pestelAnalysisAttachmentService.save(pestelAnalysis);
        return new ResponseEntity((Object)responsePestelAnalysisDTO, HttpStatus.OK);
    }

    @DeleteMapping(value={"/pestelAttach/{id}"})
    public ResponseEntity<Boolean> deletePestelAnalysisAttachDetailsById(@PathVariable(value="id") Long id, HttpServletRequest request) throws RequestException {
        Optional pestelAnalysis = this.pestelAnalysisAttachmentService.findById(id.longValue());
        if (pestelAnalysis.isPresent()) {
            PestelAnalysisAttachment pestelAnalysisAttachment = (PestelAnalysisAttachment)pestelAnalysis.get();
            this.pestelAnalysisAttachmentService.delete(pestelAnalysisAttachment);
        }
        return new ResponseEntity((Object)true, HttpStatus.OK);
    }

    @GetMapping(value={"/pestelAttachList/{pestelId}"})
    public ResponseEntity<List<PestelAnalysisAttachmentDTO>> findAllByEmpId(@PathVariable(value="pestelId") Long pestelId) throws RequestException {
        List pestelAnalysisAttachmentDTOList = this.pestelAnalysisAttachmentService.findAll(pestelId.longValue());
        return new ResponseEntity((Object)pestelAnalysisAttachmentDTOList, HttpStatus.OK);
    }
}

