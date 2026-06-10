/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.scorecard.dto.InitiativeAttachmentDto
 *  com.estrat.backend.scorecard.exception.RequestException
 *  com.estrat.backend.scorecard.service.InitiativeAttachmentService
 *  com.estrat.backend.scorecard.web.controller.initiatives.InitiativeAttachmentController
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
package com.estrat.backend.scorecard.web.controller.initiatives;

import com.estrat.backend.scorecard.dto.InitiativeAttachmentDto;
import com.estrat.backend.scorecard.exception.RequestException;
import com.estrat.backend.scorecard.service.InitiativeAttachmentService;
import java.util.List;
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
    public ResponseEntity<InitiativeAttachmentDto> saveinitiativeAttach(@RequestBody InitiativeAttachmentDto initiativeAttachmentDto, HttpServletRequest request) throws RequestException {
        return new ResponseEntity((Object)this.initiativeAttachmentService.save(initiativeAttachmentDto), HttpStatus.OK);
    }

    @GetMapping(value={"/initiativeAttach/{id}"})
    public ResponseEntity<InitiativeAttachmentDto> getinitiativeAttachById(@PathVariable(value="id") Long id) throws RequestException {
        return new ResponseEntity((Object)this.initiativeAttachmentService.findById(id), HttpStatus.OK);
    }

    @PutMapping(value={"/initiativeAttach"})
    public ResponseEntity<InitiativeAttachmentDto> updateinitiativeAttachById(@RequestBody InitiativeAttachmentDto initiativeAttachmentDto) throws RequestException {
        return new ResponseEntity((Object)this.initiativeAttachmentService.update(initiativeAttachmentDto), HttpStatus.OK);
    }

    @DeleteMapping(value={"/initiativeAttach/{id}"})
    public ResponseEntity<Boolean> deleteinitiativeAttachById(@PathVariable(value="id") Long id, HttpServletRequest request) throws RequestException {
        this.initiativeAttachmentService.delete(id);
        return new ResponseEntity((Object)true, HttpStatus.OK);
    }

    @GetMapping(value={"/initiativeAttachList/{swotId}"})
    public ResponseEntity<List<InitiativeAttachmentDto>> initiativeAttachList(@PathVariable(value="swotId") Long swotId) throws RequestException {
        return new ResponseEntity((Object)this.initiativeAttachmentService.findAll(swotId), HttpStatus.OK);
    }

    @GetMapping(value={"/emp/initiativesAttachList/{empId}"})
    public ResponseEntity<List<InitiativeAttachmentDto>> findBYEmpId(@PathVariable Long empId) throws RequestException {
        List taskDTOList = this.initiativeAttachmentService.findByEmpId(empId);
        return new ResponseEntity((Object)taskDTOList, HttpStatus.OK);
    }
}

