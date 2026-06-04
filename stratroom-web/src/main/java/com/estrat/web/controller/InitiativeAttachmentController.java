/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.controller.InitiativeAttachmentController
 *  com.estrat.web.dto.InitiativeAttachmentDto
 *  com.estrat.web.exception.RequestException
 *  com.estrat.web.service.InitiativeAttachmentService
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

import com.estrat.web.dto.InitiativeAttachmentDto;
import com.estrat.web.exception.RequestException;
import com.estrat.web.service.InitiativeAttachmentService;
import com.estrat.web.util.RequestSessionUtil;
import java.util.List;
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
public class InitiativeAttachmentController {
    @Autowired
    protected InitiativeAttachmentService initiativeAttachmentService;
    @Autowired
    protected RequestSessionUtil sessionUtil;

    @PostMapping(value={"/initiativeAttach"})
    public ResponseEntity<InitiativeAttachmentDto> saveinitiativeAttach(@RequestBody InitiativeAttachmentDto initiativeAttachmentDto, HttpServletRequest request) throws RequestException {
        initiativeAttachmentDto.setCreatedBy(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue());
        return new ResponseEntity(this.initiativeAttachmentService.save(initiativeAttachmentDto), HttpStatus.OK);
    }

    @GetMapping(value={"/initiativeAttach/{id}"})
    public ResponseEntity<InitiativeAttachmentDto> getinitiativeAttachById(@PathVariable(value="id") Long id) throws RequestException {
        return new ResponseEntity(this.initiativeAttachmentService.findById(id), HttpStatus.OK);
    }

    @PutMapping(value={"/initiativeAttach"})
    public ResponseEntity<InitiativeAttachmentDto> updateinitiativeAttachById(@RequestBody InitiativeAttachmentDto initiativeAttachmentDto, HttpServletRequest request) throws RequestException {
        initiativeAttachmentDto.setUpdatedBy(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue());
        return new ResponseEntity(this.initiativeAttachmentService.update(initiativeAttachmentDto), HttpStatus.OK);
    }

    @DeleteMapping(value={"/initiativeAttach/{id}"})
    public ResponseEntity<Boolean> deleteinitiativeAttachById(@PathVariable(value="id") Long id, HttpServletRequest request) throws RequestException {
        this.initiativeAttachmentService.delete(id);
        return new ResponseEntity(true, HttpStatus.OK);
    }

    @GetMapping(value={"/initiativeAttachList/{initiativeId}"})
    public ResponseEntity<List<InitiativeAttachmentDto>> initiativeAttachList(@PathVariable(value="initiativeId") Long initiativeId) throws RequestException {
        return new ResponseEntity(this.initiativeAttachmentService.findAll(initiativeId), HttpStatus.OK);
    }
}

