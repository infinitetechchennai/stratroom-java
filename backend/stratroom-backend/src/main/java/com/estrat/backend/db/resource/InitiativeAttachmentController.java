/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.InitiativeAttachment
 *  com.estrat.backend.db.dto.InitiativeAttachmentDto
 *  com.estrat.backend.db.exception.RequestException
 *  com.estrat.backend.db.resource.InitiativeAttachmentController
 *  com.estrat.backend.db.service.InitiativeAttachmentService
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
package com.estrat.backend.db.resource;

import com.estrat.backend.db.bean.po.InitiativeAttachment;
import com.estrat.backend.db.dto.InitiativeAttachmentDto;
import com.estrat.backend.db.exception.RequestException;
import com.estrat.backend.db.service.InitiativeAttachmentService;
import java.time.LocalDateTime;
import java.util.List;
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
public class InitiativeAttachmentController {
    @Autowired
    protected InitiativeAttachmentService initiativeAttachmentService;

    @PostMapping(value={"/initiativeAttach"})
    public ResponseEntity<InitiativeAttachmentDto> saveInitiativeAttachment(@RequestBody InitiativeAttachmentDto initiativeAttachmentDto, HttpServletRequest request) throws RequestException {
        InitiativeAttachment initiativeAttachment = new InitiativeAttachment(initiativeAttachmentDto);
        initiativeAttachment.setCreatedTime(LocalDateTime.now());
        InitiativeAttachmentDto response = this.initiativeAttachmentService.save(initiativeAttachment);
        return new ResponseEntity((Object)response, HttpStatus.OK);
    }

    @GetMapping(value={"/initiativeAttach/{id}"})
    public ResponseEntity<InitiativeAttachmentDto> getInitiativeAttachmentById(@PathVariable(value="id") Long id) throws RequestException {
        InitiativeAttachmentDto initAttachmentDTO = new InitiativeAttachmentDto((InitiativeAttachment)this.initiativeAttachmentService.findById(id.longValue()).get());
        return new ResponseEntity((Object)initAttachmentDTO, HttpStatus.OK);
    }

    @PutMapping(value={"/initiativeAttach"})
    public ResponseEntity<InitiativeAttachmentDto> updateInitiativeAttachment(@RequestBody InitiativeAttachmentDto initiativeAttachmentDto) throws RequestException {
        InitiativeAttachment initAttachment = new InitiativeAttachment(initiativeAttachmentDto);
        initAttachment.setUpdatedTime(LocalDateTime.now());
        InitiativeAttachmentDto response = this.initiativeAttachmentService.save(initAttachment);
        return new ResponseEntity((Object)response, HttpStatus.OK);
    }

    @DeleteMapping(value={"/initiativeAttach/{id}"})
    public ResponseEntity<Boolean> deleteInitiativeAttachmentById(@PathVariable(value="id") Long id, HttpServletRequest request) throws RequestException {
        Optional initiativeAttachment = this.initiativeAttachmentService.findById(id.longValue());
        if (initiativeAttachment.isPresent()) {
            InitiativeAttachment analysisAttachment = (InitiativeAttachment)initiativeAttachment.get();
            this.initiativeAttachmentService.delete(analysisAttachment);
            return new ResponseEntity((Object)true, HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    @GetMapping(value={"/initiativeAttachList/{initiativeId}"})
    public ResponseEntity<List<InitiativeAttachmentDto>> initiativeAttachmentList(@PathVariable(value="initiativeId") Long initiativeId) throws RequestException {
        List attachmentDTOList = this.initiativeAttachmentService.findAll(initiativeId.longValue());
        return new ResponseEntity((Object)attachmentDTOList, HttpStatus.OK);
    }

    @GetMapping(value={"/emp/initiativesAttachList/{empId}"})
    public ResponseEntity<List<InitiativeAttachmentDto>> findByEmpId(@PathVariable(value="empId") Long empId) throws RequestException {
        List taskDTOList = this.initiativeAttachmentService.findAllByEmpId(empId);
        return new ResponseEntity((Object)taskDTOList, HttpStatus.OK);
    }
}

