/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.controller.RiskAttachmentController
 *  com.estrat.web.dto.RiskAttachmentDto
 *  com.estrat.web.exception.RequestException
 *  com.estrat.web.service.RiskAttachmentService
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

import com.estrat.web.dto.RiskAttachmentDto;
import com.estrat.web.exception.RequestException;
import com.estrat.web.service.RiskAttachmentService;
import com.estrat.web.util.RequestSessionUtil;
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
public class RiskAttachmentController {
    @Autowired
    protected RiskAttachmentService riskAttachmentService;
    @Autowired
    protected RequestSessionUtil sessionUtil;

    @PostMapping(value={"/riskAttach"})
    public ResponseEntity<RiskAttachmentDto> saveriskAttach(@RequestBody RiskAttachmentDto riskAttachmentDto, HttpServletRequest request) throws RequestException {
        riskAttachmentDto.setCreatedBy(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue());
        return new ResponseEntity(this.riskAttachmentService.save(riskAttachmentDto), HttpStatus.OK);
    }

    @GetMapping(value={"/riskAttach/{id}"})
    public ResponseEntity<RiskAttachmentDto> getriskAttachById(@PathVariable(value="id") Long id) throws RequestException {
        return new ResponseEntity(this.riskAttachmentService.findById(id), HttpStatus.OK);
    }

    @PutMapping(value={"/riskAttach"})
    public ResponseEntity<RiskAttachmentDto> updateriskAttachById(@RequestBody RiskAttachmentDto riskAttachmentDto, HttpServletRequest request) throws RequestException {
        riskAttachmentDto.setUpdatedBy(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue());
        return new ResponseEntity(this.riskAttachmentService.update(riskAttachmentDto), HttpStatus.OK);
    }

    @DeleteMapping(value={"/riskAttach/{id}"})
    public ResponseEntity<Boolean> deleteriskAttachById(@PathVariable(value="id") Long id, HttpServletRequest request) throws RequestException {
        this.riskAttachmentService.delete(id);
        return new ResponseEntity(true, HttpStatus.OK);
    }

    @GetMapping(value={"/riskAttachList/{riskId}"})
    public ResponseEntity<List<RiskAttachmentDto>> riskAttachList(@PathVariable(value="riskId") Long riskId) throws RequestException {
        return new ResponseEntity(this.riskAttachmentService.findAll(riskId), HttpStatus.OK);
    }

    @GetMapping(value={"/emp/riskAttachList/{empId}"})
    public ResponseEntity<List<RiskAttachmentDto>> findBYEmpId(@PathVariable Long empId) throws RequestException {
        List taskDTOList = this.riskAttachmentService.findByEmpId(empId);
        return new ResponseEntity(taskDTOList, HttpStatus.OK);
    }
}

