/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.scorecard.dto.PestelAnalysisDTO
 *  com.estrat.backend.scorecard.exception.RequestException
 *  com.estrat.backend.scorecard.service.PestelAnalysisService
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
 *  org.springframework.web.bind.annotation.RequestParam
 *  org.springframework.web.bind.annotation.RestController
 */
package com.estrat.backend.scorecard.web.controller.Pestel;

import com.estrat.backend.scorecard.dto.PestelAnalysisDTO;
import com.estrat.backend.scorecard.exception.RequestException;
import com.estrat.backend.scorecard.service.PestelAnalysisService;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PestelAnalysisController {
    private Logger log = LoggerFactory.getLogger(PestelAnalysisController.class);
    @Autowired
    protected PestelAnalysisService pestelAnalysisService;

    @PostMapping(value={"/pestelAnalysis"})
    public ResponseEntity<PestelAnalysisDTO> savePestelAnalysisDetails(@RequestBody PestelAnalysisDTO pestelAnalysisDTO, HttpServletRequest request) throws RequestException {
        return new ResponseEntity((Object)this.pestelAnalysisService.savePestelAnalysis(pestelAnalysisDTO), HttpStatus.OK);
    }

    @PutMapping(value={"/pestelAnalysis"})
    public ResponseEntity<PestelAnalysisDTO> updatePestelAnalysisDetailsById(@RequestBody PestelAnalysisDTO pestelAnalysisDTO) throws RequestException {
        return new ResponseEntity((Object)this.pestelAnalysisService.updatePestelAnalysis(pestelAnalysisDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/pestelAnalysis/{id}"})
    public ResponseEntity<PestelAnalysisDTO> getPestelAnalysisDetailsById(@PathVariable(value="id") Long id) throws RequestException {
        return new ResponseEntity((Object)this.pestelAnalysisService.retrievePestelAnalysis(id), HttpStatus.OK);
    }

    @GetMapping(value={"/retrievePestelAnalysisList/{empId}"})
    public ResponseEntity<List<PestelAnalysisDTO>> findAllByEmpId(@PathVariable(value="empId") Long empId, @RequestParam(value="flagType") String flagType, @RequestParam(value="pageId", required=false) String pageId) throws RequestException {
        List pestelAnalysisDTOList = this.pestelAnalysisService.findAllByEmpId(empId, flagType, pageId);
        return new ResponseEntity((Object)pestelAnalysisDTOList, HttpStatus.OK);
    }

    @DeleteMapping(value={"/pestelAnalysis/{id}"})
    public ResponseEntity<Boolean> deletePestelAnalysisDetailsById(@PathVariable(value="id") Long id, HttpServletRequest request) throws RequestException {
        this.pestelAnalysisService.removePestelAnalysis(id);
        return new ResponseEntity((Object)true, HttpStatus.OK);
    }
}

