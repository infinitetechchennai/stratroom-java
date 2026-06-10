/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.scorecard.dto.SWOTAnalysisDTO
 *  com.estrat.backend.scorecard.exception.RequestException
 *  com.estrat.backend.scorecard.service.SwotAnalysisService
 *  com.estrat.backend.scorecard.web.controller.swot.SwotAnalysisController
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
package com.estrat.backend.scorecard.web.controller.swot;

import com.estrat.backend.scorecard.dto.SWOTAnalysisDTO;
import com.estrat.backend.scorecard.exception.RequestException;
import com.estrat.backend.scorecard.service.SwotAnalysisService;
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
public class SwotAnalysisController {
    @Autowired
    protected SwotAnalysisService swotAnalysisService;

    @PostMapping(value={"/swotAnalysis"})
    public ResponseEntity<SWOTAnalysisDTO> saveSwotAnalysisDetails(@RequestBody SWOTAnalysisDTO swotAnalysisDTO, HttpServletRequest request) throws RequestException {
        return new ResponseEntity((Object)this.swotAnalysisService.saveSWOTAnalysis(swotAnalysisDTO), HttpStatus.OK);
    }

    @PutMapping(value={"/swotAnalysis"})
    public ResponseEntity<SWOTAnalysisDTO> updateSwotAnalysisDetailsById(@RequestBody SWOTAnalysisDTO swotAnalysisDTO) throws RequestException {
        return new ResponseEntity((Object)this.swotAnalysisService.updateSWOTAnalysis(swotAnalysisDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/swotAnalysis/{id}"})
    public ResponseEntity<SWOTAnalysisDTO> getSwotAnalysisDetailsById(@PathVariable(value="id") Long id) throws RequestException {
        return new ResponseEntity((Object)this.swotAnalysisService.retrieveSWOTAnalysis(id), HttpStatus.OK);
    }

    @GetMapping(value={"/retrieveSwotAnalysisList/{empId}"})
    public ResponseEntity<List<SWOTAnalysisDTO>> findAllByEmpId(@PathVariable(value="empId") Long empId, @RequestParam(value="flagType") String flagType, @RequestParam(value="pageId", required=false) String pageId) throws RequestException {
        List swotAnalysisDTOList = this.swotAnalysisService.findAllByEmpId(empId, flagType, pageId);
        return new ResponseEntity((Object)swotAnalysisDTOList, HttpStatus.OK);
    }

    @DeleteMapping(value={"/swotAnalysis/{id}"})
    public ResponseEntity<Boolean> deleteSwotAnalysisDetailsById(@PathVariable(value="id") Long id, HttpServletRequest request) throws RequestException {
        this.swotAnalysisService.removeSWOTAnalysis(id);
        return new ResponseEntity((Object)true, HttpStatus.OK);
    }
}

