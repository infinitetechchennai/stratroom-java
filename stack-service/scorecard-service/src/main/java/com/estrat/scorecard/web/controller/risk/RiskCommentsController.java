/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.scorecard.dto.RiskCommentsDTO
 *  com.estrat.scorecard.dto.RiskResponseDTO
 *  com.estrat.scorecard.exception.RequestException
 *  com.estrat.scorecard.service.RiskCommentsService
 *  com.estrat.scorecard.web.controller.risk.RiskCommentsController
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

import com.estrat.scorecard.dto.RiskCommentsDTO;
import com.estrat.scorecard.dto.RiskResponseDTO;
import com.estrat.scorecard.exception.RequestException;
import com.estrat.scorecard.service.RiskCommentsService;
import java.util.List;
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
public class RiskCommentsController {
    @Autowired
    private RiskCommentsService riskCommentsService;

    @PostMapping(value={"/riskComments"})
    public ResponseEntity<RiskResponseDTO> saveRiskPlanDetails(@RequestBody RiskCommentsDTO riskCommentsDTO) throws RequestException {
        return new ResponseEntity((Object)this.riskCommentsService.saveRiskComments(riskCommentsDTO), HttpStatus.OK);
    }

    @PutMapping(value={"/riskComments"})
    public ResponseEntity<RiskResponseDTO> updateRiskPlanDetails(@RequestBody RiskCommentsDTO riskCommentsDTO) throws RequestException {
        return new ResponseEntity((Object)this.riskCommentsService.updateRiskComments(riskCommentsDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/riskComments/{id}"})
    public ResponseEntity<RiskCommentsDTO> getRiskPlanById(@PathVariable Long id) throws RequestException {
        return new ResponseEntity((Object)this.riskCommentsService.retrieveRiskComments(id), HttpStatus.OK);
    }

    @DeleteMapping(value={"/riskComments/{id}"})
    public ResponseEntity<Boolean> deleteRiskPlanDetailsById(@PathVariable(value="id") Long id) throws RequestException {
        this.riskCommentsService.removeRiskComments(id);
        return new ResponseEntity((Object)true, HttpStatus.OK);
    }

    @GetMapping(value={"/riskCommentsList/{riskId}"})
    public ResponseEntity<List<RiskCommentsDTO>> findAllByRiskId(@PathVariable(value="riskId") Long riskId) throws RequestException {
        List RiskCommentsDTOList = this.riskCommentsService.findAllByRiskId(riskId);
        return new ResponseEntity((Object)RiskCommentsDTOList, HttpStatus.OK);
    }

    @GetMapping(value={"/retrieveRiskCommentsList/{empId}"})
    public ResponseEntity<List<RiskCommentsDTO>> findAllByEmpId(@PathVariable(value="empId") Long empId) throws RequestException {
        List RiskCommentsDTOList = this.riskCommentsService.findAllByEmpId(empId);
        return new ResponseEntity((Object)RiskCommentsDTOList, HttpStatus.OK);
    }

    @GetMapping(value={"/employeeRiskCommentsList/{empId}"})
    public ResponseEntity<List<RiskCommentsDTO>> findAllByEmpIdANDFromPage(@PathVariable(value="empId") Long empId) throws RequestException {
        List riskCommentsDTOList = this.riskCommentsService.findAllByEmpIdANDFromPage(empId);
        return new ResponseEntity((Object)riskCommentsDTOList, HttpStatus.OK);
    }

    @PutMapping(value={"/riskCommentLike"})
    public ResponseEntity<RiskCommentsDTO> updateCommentLike(@RequestBody RiskCommentsDTO commentsDTO) throws RequestException {
        return new ResponseEntity((Object)this.riskCommentsService.updateCommentLike(commentsDTO), HttpStatus.OK);
    }
}

