/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.scorecard.dto.RiskCauseAndConsequenceDTO
 *  com.estrat.scorecard.dto.RiskConsequenceDTO
 *  com.estrat.scorecard.dto.RiskResponseDTO
 *  com.estrat.scorecard.exception.RequestException
 *  com.estrat.scorecard.service.RiskCauseAndConsequenceService
 *  com.estrat.scorecard.web.controller.risk.RiskCauseAndConsequenceController
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

import com.estrat.scorecard.dto.RiskCauseAndConsequenceDTO;
import com.estrat.scorecard.dto.RiskConsequenceDTO;
import com.estrat.scorecard.dto.RiskResponseDTO;
import com.estrat.scorecard.exception.RequestException;
import com.estrat.scorecard.service.RiskCauseAndConsequenceService;
import java.util.List;
import java.util.Map;
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
public class RiskCauseAndConsequenceController {
    @Autowired
    private RiskCauseAndConsequenceService riskCauseAndConsequenceService;

    @PostMapping(value={"/riskCause"})
    public ResponseEntity<RiskResponseDTO> saveRiskCauseAndConsequenceDetails(@RequestBody RiskCauseAndConsequenceDTO riskCauseAndConsequenceDTO) throws RequestException {
        return new ResponseEntity((Object)this.riskCauseAndConsequenceService.saveRiskCauseAndConsequence(riskCauseAndConsequenceDTO), HttpStatus.OK);
    }

    @PutMapping(value={"/riskCause"})
    public ResponseEntity<RiskResponseDTO> updateRiskCauseAndConsequenceDetails(@RequestBody RiskCauseAndConsequenceDTO riskCauseAndConsequenceDTO) throws RequestException {
        return new ResponseEntity((Object)this.riskCauseAndConsequenceService.updateRiskCauseAndConsequence(riskCauseAndConsequenceDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/riskCause/{id}"})
    public ResponseEntity<RiskCauseAndConsequenceDTO> getRiskCauseAndConsequenceById(@PathVariable Long id) throws RequestException {
        return new ResponseEntity((Object)this.riskCauseAndConsequenceService.retrieveRiskCauseAndConsequence(id), HttpStatus.OK);
    }

    @DeleteMapping(value={"/riskCause/{id}"})
    public ResponseEntity<Boolean> deleteRiskCauseAndConsequenceDetailsById(@PathVariable(value="id") Long id) throws RequestException {
        this.riskCauseAndConsequenceService.removeRiskCauseAndConsequence(id);
        return new ResponseEntity((Object)true, HttpStatus.OK);
    }

    @GetMapping(value={"/riskCauseList/{riskId}"})
    public ResponseEntity<List<RiskCauseAndConsequenceDTO>> findAllByRiskId(@PathVariable(value="riskId") Long riskId) throws RequestException {
        List RiskCauseAndConsequenceDTOList = this.riskCauseAndConsequenceService.findAllByRiskId(riskId);
        return new ResponseEntity((Object)RiskCauseAndConsequenceDTOList, HttpStatus.OK);
    }

    @GetMapping(value={"/retrieveRiskCauseList/{empId}"})
    public ResponseEntity<List<RiskCauseAndConsequenceDTO>> findAllByEmpId(@PathVariable(value="empId") Long empId) throws RequestException {
        List RiskCauseAndConsequenceDTOList = this.riskCauseAndConsequenceService.findAllByEmpId(empId);
        return new ResponseEntity((Object)RiskCauseAndConsequenceDTOList, HttpStatus.OK);
    }

    @PostMapping(value={"/riskConsequence"})
    public ResponseEntity<RiskConsequenceDTO> saveRiskConsequenceDetails(@RequestBody RiskConsequenceDTO riskCauseAndConsequenceDTO, HttpServletRequest request) throws RequestException {
        return new ResponseEntity((Object)this.riskCauseAndConsequenceService.saveRiskConsequence(riskCauseAndConsequenceDTO), HttpStatus.OK);
    }

    @PutMapping(value={"/riskConsequence"})
    public ResponseEntity<RiskConsequenceDTO> updateRiskConsequenceDetails(@RequestBody RiskConsequenceDTO riskCauseAndConsequenceDTO, HttpServletRequest request) throws RequestException {
        return new ResponseEntity((Object)this.riskCauseAndConsequenceService.updateRiskConsequence(riskCauseAndConsequenceDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/riskConsequence/{id}"})
    public ResponseEntity<RiskConsequenceDTO> getRiskConsequenceById(@PathVariable(value="id") Long id) throws RequestException {
        RiskConsequenceDTO riskCauseAndConsequenceDTO = this.riskCauseAndConsequenceService.retrieveRiskConsequence(id);
        return new ResponseEntity((Object)riskCauseAndConsequenceDTO, HttpStatus.OK);
    }

    @DeleteMapping(value={"/riskConsequence/{id}"})
    public ResponseEntity<Boolean> deleteRiskConsequenceDetailsById(@PathVariable(value="id") Long id, HttpServletRequest request) throws RequestException {
        this.riskCauseAndConsequenceService.removeRiskConsequence(id);
        return new ResponseEntity((Object)true, HttpStatus.OK);
    }

    @GetMapping(value={"/riskConsequenceList/{conqId}"})
    public ResponseEntity<List<RiskConsequenceDTO>> findAllByConsequenceId(@PathVariable(value="conqId") Long conqId) throws RequestException {
        List riskCauseAndConsequenceDTOS = this.riskCauseAndConsequenceService.findAllByConqId(conqId);
        return new ResponseEntity((Object)riskCauseAndConsequenceDTOS, HttpStatus.OK);
    }

    @GetMapping(value={"/allRiskCause"})
    public ResponseEntity<List<Map<String, Object>>> findAllRiskCause(HttpServletRequest request) throws RequestException {
        return new ResponseEntity((Object)this.riskCauseAndConsequenceService.findAllRiskCause(), HttpStatus.OK);
    }

    @GetMapping(value={"/riskCauseNameList/{riskId}"})
    public ResponseEntity<List<Map<String, Object>>> findAllRiskCause(@PathVariable(value="riskId") Long riskId, HttpServletRequest request) throws RequestException {
        return new ResponseEntity((Object)this.riskCauseAndConsequenceService.findAllRiskCause(riskId.longValue()), HttpStatus.OK);
    }
}

