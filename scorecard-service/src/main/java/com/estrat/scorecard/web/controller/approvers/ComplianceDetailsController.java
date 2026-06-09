/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.scorecard.dto.ComplianceAreaDTO
 *  com.estrat.scorecard.dto.ComplianceDetailsDTO
 *  com.estrat.scorecard.exception.RequestException
 *  com.estrat.scorecard.service.ComplianceDetailsService
 *  com.estrat.scorecard.web.controller.approvers.ComplianceDetailsController
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
 *  org.springframework.web.bind.annotation.RequestParam
 *  org.springframework.web.bind.annotation.RestController
 */
package com.estrat.scorecard.web.controller.approvers;

import com.estrat.scorecard.dto.ComplianceAreaDTO;
import com.estrat.scorecard.dto.ComplianceDetailsDTO;
import com.estrat.scorecard.exception.RequestException;
import com.estrat.scorecard.service.ComplianceDetailsService;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ComplianceDetailsController {
    @Autowired
    private ComplianceDetailsService complianceDetailsService;

    @PostMapping(value={"/complainArea"})
    public ResponseEntity<ComplianceAreaDTO> saveCategory(@RequestBody ComplianceAreaDTO complianceAreaDTO) throws RequestException {
        return new ResponseEntity((Object)this.complianceDetailsService.saveArea(complianceAreaDTO), HttpStatus.OK);
    }

    @PutMapping(value={"/complainArea"})
    public ResponseEntity<ComplianceAreaDTO> updateCategory(@RequestBody ComplianceAreaDTO complianceAreaDTO) throws RequestException {
        return new ResponseEntity((Object)this.complianceDetailsService.updateArea(complianceAreaDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/complainArea/{id}"})
    public ResponseEntity<ComplianceAreaDTO> getCategory(@PathVariable Long id) throws RequestException {
        return new ResponseEntity((Object)this.complianceDetailsService.retrieveArea(id), HttpStatus.OK);
    }

    @DeleteMapping(value={"/complainArea/{id}"})
    public ResponseEntity<Boolean> deleteArea(@PathVariable(value="id") Long id) throws RequestException {
        this.complianceDetailsService.removeArea(id);
        return new ResponseEntity((Object)true, HttpStatus.OK);
    }

    @GetMapping(value={"/retrieveComplinValue"})
    public ResponseEntity<List<ComplianceAreaDTO>> findAll(@RequestParam(value="pageId", required=false) String pageId, @RequestParam(value="dateRange") String dateRange) throws RequestException {
        List dTOList = this.complianceDetailsService.findAll(pageId, dateRange);
        return new ResponseEntity((Object)dTOList, HttpStatus.OK);
    }

    @PostMapping(value={"/compliance"})
    public ResponseEntity<ComplianceDetailsDTO> saveComplain(@RequestBody ComplianceDetailsDTO complianceDetailsDTO, HttpServletRequest request) throws RequestException {
        return new ResponseEntity((Object)this.complianceDetailsService.saveComplain(complianceDetailsDTO), HttpStatus.OK);
    }

    @PutMapping(value={"/compliance"})
    public ResponseEntity<ComplianceDetailsDTO> updateComplain(@RequestBody ComplianceDetailsDTO complianceDetailsDTO, HttpServletRequest request) throws RequestException {
        return new ResponseEntity((Object)this.complianceDetailsService.updateComplain(complianceDetailsDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/compliance/{id}"})
    public ResponseEntity<ComplianceDetailsDTO> getTask(@PathVariable(value="id") Long id) throws RequestException {
        ComplianceDetailsDTO comDTO = this.complianceDetailsService.retrieveComplain(id);
        return new ResponseEntity((Object)comDTO, HttpStatus.OK);
    }

    @DeleteMapping(value={"/compliance/{id}"})
    public ResponseEntity<Boolean> deleteTask(@PathVariable(value="id") Long id, HttpServletRequest request) throws RequestException {
        this.complianceDetailsService.removeComplain(id);
        return new ResponseEntity((Object)true, HttpStatus.OK);
    }
}

