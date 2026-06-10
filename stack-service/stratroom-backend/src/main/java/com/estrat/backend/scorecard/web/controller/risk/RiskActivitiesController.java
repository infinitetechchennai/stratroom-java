/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.scorecard.dto.RiskActivitiesDTO
 *  com.estrat.backend.scorecard.dto.RiskResponseDTO
 *  com.estrat.backend.scorecard.exception.RequestException
 *  com.estrat.backend.scorecard.service.RiskActivitiesService
 *  com.estrat.backend.scorecard.util.KPIUtil
 *  com.estrat.backend.scorecard.web.controller.risk.RiskActivitiesController
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
package com.estrat.backend.scorecard.web.controller.risk;

import com.estrat.backend.scorecard.dto.RiskActivitiesDTO;
import com.estrat.backend.scorecard.dto.RiskResponseDTO;
import com.estrat.backend.scorecard.exception.RequestException;
import com.estrat.backend.scorecard.service.RiskActivitiesService;
import com.estrat.backend.scorecard.util.KPIUtil;
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
public class RiskActivitiesController {
    @Autowired
    private RiskActivitiesService riskActivitiesService;
    @Autowired
    private KPIUtil kpiUtil;

    @PostMapping(value={"/riskActivities"})
    public ResponseEntity<RiskResponseDTO> saveRiskActivitiesDetails(@RequestBody RiskActivitiesDTO riskActivitiesDTO) throws RequestException {
        return new ResponseEntity((Object)this.riskActivitiesService.saveRiskActivities(riskActivitiesDTO), HttpStatus.OK);
    }

    @PutMapping(value={"/riskActivities"})
    public ResponseEntity<RiskResponseDTO> updateRiskActivitiesDetails(@RequestBody RiskActivitiesDTO riskActivitiesDTO) throws RequestException {
        return new ResponseEntity((Object)this.riskActivitiesService.updateRiskActivities(riskActivitiesDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/riskActivities/{id}"})
    public ResponseEntity<RiskActivitiesDTO> getRiskActivitiesById(@PathVariable Long id) throws RequestException {
        return new ResponseEntity((Object)this.riskActivitiesService.retrieveRiskActivities(id), HttpStatus.OK);
    }

    @DeleteMapping(value={"/riskActivities/{id}"})
    public ResponseEntity<Boolean> deleteRiskActivitiesDetailsById(@PathVariable(value="id") Long id) throws RequestException {
        this.riskActivitiesService.removeRiskActivities(id);
        return new ResponseEntity((Object)true, HttpStatus.OK);
    }

    @GetMapping(value={"/riskActivitiesList/{riskId}"})
    public ResponseEntity<List<RiskActivitiesDTO>> findAllByRiskId(@PathVariable(value="riskId") Long riskId) throws RequestException {
        List RiskActivitiesDTOList = this.riskActivitiesService.findAllByRiskId(riskId);
        for (RiskActivitiesDTO riskActivitiesDTO : (java.util.List<RiskActivitiesDTO>)RiskActivitiesDTOList) {
            this.kpiUtil.updateStatus(riskActivitiesDTO.getRiskActivitiesValue(), null);
        }
        return new ResponseEntity((Object)RiskActivitiesDTOList, HttpStatus.OK);
    }

    @GetMapping(value={"/retrieveRiskActivitiesList/{empId}"})
    public ResponseEntity<List<RiskActivitiesDTO>> findAllByEmpId(@PathVariable(value="empId") Long empId) throws RequestException {
        List RiskActivitiesDTOList = this.riskActivitiesService.findAllByEmpId(empId);
        for (RiskActivitiesDTO riskActivitiesDTO : (java.util.List<RiskActivitiesDTO>)RiskActivitiesDTOList) {
            this.kpiUtil.updateStatus(riskActivitiesDTO.getRiskActivitiesValue(), null);
        }
        return new ResponseEntity((Object)RiskActivitiesDTOList, HttpStatus.OK);
    }
}

