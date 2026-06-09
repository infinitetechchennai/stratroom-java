/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.scorecard.dto.RiskAttachmentDto
 *  com.estrat.scorecard.exception.RequestException
 *  com.estrat.scorecard.service.RiskAttachmentService
 *  com.estrat.scorecard.web.controller.risk.RiskAttachmentController
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
package com.estrat.scorecard.web.controller.risk;

import com.estrat.scorecard.dto.RiskAttachmentDto;
import com.estrat.scorecard.exception.RequestException;
import com.estrat.scorecard.service.RiskAttachmentService;
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

    @PostMapping(value={"/riskAttach"})
    public ResponseEntity<RiskAttachmentDto> saveinitiativeAttach(@RequestBody RiskAttachmentDto riskAttachmentDto, HttpServletRequest request) throws RequestException {
        return new ResponseEntity((Object)this.riskAttachmentService.save(riskAttachmentDto), HttpStatus.OK);
    }

    @GetMapping(value={"/riskAttach/{id}"})
    public ResponseEntity<RiskAttachmentDto> getinitiativeAttachById(@PathVariable(value="id") Long id) throws RequestException {
        return new ResponseEntity((Object)this.riskAttachmentService.findById(id), HttpStatus.OK);
    }

    @PutMapping(value={"/riskAttach"})
    public ResponseEntity<RiskAttachmentDto> updateinitiativeAttachById(@RequestBody RiskAttachmentDto riskAttachmentDto) throws RequestException {
        return new ResponseEntity((Object)this.riskAttachmentService.update(riskAttachmentDto), HttpStatus.OK);
    }

    @DeleteMapping(value={"/riskAttach/{id}"})
    public ResponseEntity<Boolean> deleteinitiativeAttachById(@PathVariable(value="id") Long id, HttpServletRequest request) throws RequestException {
        this.riskAttachmentService.delete(id);
        return new ResponseEntity((Object)true, HttpStatus.OK);
    }

    @GetMapping(value={"/riskAttachList/{riskId}"})
    public ResponseEntity<List<RiskAttachmentDto>> initiativeAttachList(@PathVariable(value="riskId") Long riskId) throws RequestException {
        return new ResponseEntity((Object)this.riskAttachmentService.findAll(riskId), HttpStatus.OK);
    }

    @GetMapping(value={"/emp/riskAttachList/{empId}"})
    public ResponseEntity<List<RiskAttachmentDto>> findBYEmpId(@PathVariable Long empId) throws RequestException {
        List taskDTOList = this.riskAttachmentService.findByEmpId(empId);
        return new ResponseEntity((Object)taskDTOList, HttpStatus.OK);
    }
}

