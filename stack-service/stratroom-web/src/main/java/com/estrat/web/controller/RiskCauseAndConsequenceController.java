/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.controller.RiskCauseAndConsequenceController
 *  com.estrat.web.dto.RiskCauseAndConsequenceDTO
 *  com.estrat.web.dto.RiskConsequenceDTO
 *  com.estrat.web.dto.RiskResponseDTO
 *  com.estrat.web.exception.RequestException
 *  com.estrat.web.service.RiskCauseAndConsequenceService
 *  com.estrat.web.service.StagingChangeService
 *  com.estrat.web.util.RequestSessionUtil
 *  com.estrat.web.util.UserThreadLocal
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
package com.estrat.web.controller;

import com.estrat.web.dto.RiskCauseAndConsequenceDTO;
import com.estrat.web.dto.RiskConsequenceDTO;
import com.estrat.web.dto.RiskResponseDTO;
import com.estrat.web.exception.RequestException;
import com.estrat.web.service.RiskCauseAndConsequenceService;
import com.estrat.web.service.StagingChangeService;
import com.estrat.web.util.RequestSessionUtil;
import com.estrat.web.util.UserThreadLocal;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RiskCauseAndConsequenceController {
    @Autowired
    private RiskCauseAndConsequenceService riskCauseAndConsequenceService;
    @Autowired
    protected RequestSessionUtil sessionUtil;
    @Autowired
    protected StagingChangeService stagingChangeService;

    @PostMapping(value={"/riskCause"})
    public ResponseEntity<RiskResponseDTO> saveRiskCauseAndConsequenceDetails(@RequestBody RiskCauseAndConsequenceDTO riskCauseAndConsequenceDTO, HttpServletRequest request) throws RequestException {
        riskCauseAndConsequenceDTO.setCreatedBy(Long.parseLong(UserThreadLocal.get().getProfile().getEmpId()));
        return new ResponseEntity(this.riskCauseAndConsequenceService.saveRiskCauseAndConsequence(riskCauseAndConsequenceDTO), HttpStatus.OK);
    }

    @PutMapping(value={"/riskCause"})
    public ResponseEntity<RiskResponseDTO> updateRiskCauseAndConsequenceDetails(@RequestBody RiskCauseAndConsequenceDTO riskCauseAndConsequenceDTO, HttpServletRequest request) throws RequestException {
        riskCauseAndConsequenceDTO.setUpdatedBy(Long.parseLong(UserThreadLocal.get().getProfile().getEmpId()));
        return new ResponseEntity(this.riskCauseAndConsequenceService.updateRiskCauseAndConsequence(riskCauseAndConsequenceDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/riskCause/{id}"})
    public ResponseEntity<RiskCauseAndConsequenceDTO> getRiskCauseAndConsequenceById(@PathVariable Long id, @RequestParam(value="riskType", required=false) String riskType) throws RequestException {
        return new ResponseEntity(this.riskCauseAndConsequenceService.retrieveRiskCauseAndConsequence(id), HttpStatus.OK);
    }

    @DeleteMapping(value={"/riskCause/{id}"})
    public ResponseEntity<Boolean> deleteRiskCauseAndConsequenceDetailsById(@PathVariable(value="id") Long id) throws RequestException {
        this.riskCauseAndConsequenceService.removeRiskCauseAndConsequence(id);
        return new ResponseEntity(true, HttpStatus.OK);
    }

    @GetMapping(value={"/riskCauseList/{riskId}"})
    public ResponseEntity<List<RiskCauseAndConsequenceDTO>> findAllByRiskId(@PathVariable(value="riskId") Long riskId) throws RequestException {
        List RiskCauseAndConsequenceDTOList = this.riskCauseAndConsequenceService.findAllByRiskId(riskId);
        if (!RiskCauseAndConsequenceDTOList.isEmpty()) {
            return new ResponseEntity(RiskCauseAndConsequenceDTOList, HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    @GetMapping(value={"/retrieveRiskCauseList/{empId}"})
    public ResponseEntity<List<RiskCauseAndConsequenceDTO>> findAllByEmpId(@PathVariable(value="empId") Long empId) throws RequestException {
        List RiskCauseAndConsequenceDTOList = this.riskCauseAndConsequenceService.findAllByEmpId(empId);
        return new ResponseEntity(RiskCauseAndConsequenceDTOList, HttpStatus.OK);
    }

    @PostMapping(value={"/riskConsequence"})
    public ResponseEntity<RiskConsequenceDTO> saveRiskConsequenceDetails(@RequestBody RiskConsequenceDTO riskCauseAndConsequenceDTO, HttpServletRequest request) throws RequestException {
        riskCauseAndConsequenceDTO.setCreatedBy(Long.parseLong(UserThreadLocal.get().getProfile().getEmpId()));
        return new ResponseEntity(this.riskCauseAndConsequenceService.saveRiskConsequence(riskCauseAndConsequenceDTO), HttpStatus.OK);
    }

    @PutMapping(value={"/riskConsequence"})
    public ResponseEntity<RiskConsequenceDTO> updateRiskConsequenceDetails(@RequestBody RiskConsequenceDTO riskCauseAndConsequenceDTO, HttpServletRequest request) throws RequestException {
        riskCauseAndConsequenceDTO.setUpdatedBy(Long.parseLong(UserThreadLocal.get().getProfile().getEmpId()));
        return new ResponseEntity(this.riskCauseAndConsequenceService.updateRiskConsequence(riskCauseAndConsequenceDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/riskConsequence/{id}"})
    public ResponseEntity<RiskConsequenceDTO> getRiskConsequenceById(@PathVariable(value="id") Long id, @RequestParam(value="riskType", required=false) String riskType) throws RequestException {
        RiskConsequenceDTO riskCauseAndConsequenceDTO = this.riskCauseAndConsequenceService.retrieveRiskConsequence(id);
        return new ResponseEntity(riskCauseAndConsequenceDTO, HttpStatus.OK);
    }

    @DeleteMapping(value={"/riskConsequence/{id}"})
    public ResponseEntity<Boolean> deleteRiskConsequenceDetailsById(@PathVariable(value="id") Long id, HttpServletRequest request) throws RequestException {
        this.riskCauseAndConsequenceService.removeRiskConsequence(id);
        return new ResponseEntity(true, HttpStatus.OK);
    }

    @GetMapping(value={"/riskConsequenceList/{conqId}"})
    public ResponseEntity<List<RiskConsequenceDTO>> findAllByConsequenceId(@PathVariable(value="conqId") Long conqId) throws RequestException {
        List riskCauseAndConsequenceDTOS = this.riskCauseAndConsequenceService.findAllByConqId(conqId);
        return new ResponseEntity(riskCauseAndConsequenceDTOS, HttpStatus.OK);
    }

    @GetMapping(value={"/allRiskCause"})
    public ResponseEntity<List<Map<String, Object>>> findAllRiskCause(HttpServletRequest request) throws RequestException {
        return new ResponseEntity(this.riskCauseAndConsequenceService.findAllRiskCause(), HttpStatus.OK);
    }

    @GetMapping(value={"/riskCauseNameList/{riskId}"})
    public ResponseEntity<List<Map<String, Object>>> findAllRiskCause(@PathVariable(value="riskId") Long riskId, HttpServletRequest request) throws RequestException {
        return new ResponseEntity(this.riskCauseAndConsequenceService.findAllRiskCause(riskId.longValue()), HttpStatus.OK);
    }
}

