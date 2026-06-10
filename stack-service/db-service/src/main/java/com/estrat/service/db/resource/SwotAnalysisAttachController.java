/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.SWOTAnalysisAttachment
 *  com.estrat.service.db.dto.SWOTAnalysisAttachmentDTO
 *  com.estrat.service.db.exception.RequestException
 *  com.estrat.service.db.resource.SwotAnalysisAttachController
 *  com.estrat.service.db.service.SwotAnalysisAttachmentService
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
package com.estrat.service.db.resource;

import com.estrat.service.db.bean.po.SWOTAnalysisAttachment;
import com.estrat.service.db.dto.SWOTAnalysisAttachmentDTO;
import com.estrat.service.db.exception.RequestException;
import com.estrat.service.db.service.SwotAnalysisAttachmentService;
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
public class SwotAnalysisAttachController {
    private Logger log = LoggerFactory.getLogger(SwotAnalysisAttachController.class);
    @Autowired
    protected SwotAnalysisAttachmentService analysisAttachmentService;

    @PostMapping(value={"/swotAttach"})
    public ResponseEntity<SWOTAnalysisAttachmentDTO> saveSWOTAnalysisAttachment(@RequestBody SWOTAnalysisAttachmentDTO swotAnalysisAttachmentDTO, HttpServletRequest request) throws RequestException {
        SWOTAnalysisAttachment swotAnalysisAttachment = new SWOTAnalysisAttachment(swotAnalysisAttachmentDTO);
        swotAnalysisAttachment.setCreatedTime(LocalDateTime.now());
        SWOTAnalysisAttachmentDTO response = this.analysisAttachmentService.save(swotAnalysisAttachment);
        return new ResponseEntity((Object)response, HttpStatus.OK);
    }

    @GetMapping(value={"/swotAttach/{id}"})
    public ResponseEntity<SWOTAnalysisAttachmentDTO> getSWOTAnalysisAttachmentById(@PathVariable(value="id") Long id) throws RequestException {
        SWOTAnalysisAttachmentDTO swotAnalysisAttachmentDTO = new SWOTAnalysisAttachmentDTO((SWOTAnalysisAttachment)this.analysisAttachmentService.findById(id.longValue()).get());
        return new ResponseEntity((Object)swotAnalysisAttachmentDTO, HttpStatus.OK);
    }

    @PutMapping(value={"/swotAttach"})
    public ResponseEntity<SWOTAnalysisAttachmentDTO> updateSWOTAnalysisAttachmentById(@RequestBody SWOTAnalysisAttachmentDTO swotAnalysisAttachmentDTO) throws RequestException {
        SWOTAnalysisAttachment swotAnalysisAttachment = new SWOTAnalysisAttachment(swotAnalysisAttachmentDTO);
        swotAnalysisAttachment.setUpdatedTime(LocalDateTime.now());
        SWOTAnalysisAttachmentDTO response = this.analysisAttachmentService.save(swotAnalysisAttachment);
        return new ResponseEntity((Object)response, HttpStatus.OK);
    }

    @DeleteMapping(value={"/swotAttach/{id}"})
    public ResponseEntity<Boolean> deleteSWOTAnalysisAttachmentById(@PathVariable(value="id") Long id, HttpServletRequest request) throws RequestException {
        Optional swotAnalysisAttachment = this.analysisAttachmentService.findById(id.longValue());
        if (swotAnalysisAttachment.isPresent()) {
            SWOTAnalysisAttachment analysisAttachment = (SWOTAnalysisAttachment)swotAnalysisAttachment.get();
            this.analysisAttachmentService.delete(analysisAttachment);
            return new ResponseEntity((Object)true, HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    @GetMapping(value={"/swotAttachList/{swotId}"})
    public ResponseEntity<List<SWOTAnalysisAttachmentDTO>> swotAttachList(@PathVariable(value="swotId") Long swotId) throws RequestException {
        List SWOTAnalysisAttachmentDTOList = this.analysisAttachmentService.findAll(swotId.longValue());
        return new ResponseEntity((Object)SWOTAnalysisAttachmentDTOList, HttpStatus.OK);
    }
}

