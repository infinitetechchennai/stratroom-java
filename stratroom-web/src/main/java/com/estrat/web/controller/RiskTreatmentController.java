/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.controller.RiskTreatmentController
 *  com.estrat.web.dto.RiskActivitiesDTO
 *  com.estrat.web.dto.RiskDTO
 *  com.estrat.web.dto.RiskPlanDTO
 *  com.estrat.web.dto.RiskResponseDTO
 *  com.estrat.web.dto.StagingChangeDTO
 *  com.estrat.web.exception.RequestException
 *  com.estrat.web.service.RiskActivitiesService
 *  com.estrat.web.service.RiskPlanService
 *  com.estrat.web.service.StagingChangeService
 *  com.estrat.web.util.RequestSessionUtil
 *  com.estrat.web.util.UserThreadLocal
 *  com.fasterxml.jackson.databind.Module
 *  com.fasterxml.jackson.databind.ObjectMapper
 *  com.fasterxml.jackson.datatype.jsr310.JavaTimeModule
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

import com.estrat.web.dto.RiskActivitiesDTO;
import com.estrat.web.dto.RiskDTO;
import com.estrat.web.dto.RiskPlanDTO;
import com.estrat.web.dto.RiskResponseDTO;
import com.estrat.web.dto.StagingChangeDTO;
import com.estrat.web.exception.RequestException;
import com.estrat.web.service.RiskActivitiesService;
import com.estrat.web.service.RiskPlanService;
import com.estrat.web.service.StagingChangeService;
import com.estrat.web.util.RequestSessionUtil;
import com.estrat.web.util.UserThreadLocal;
import com.fasterxml.jackson.databind.Module;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
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
@SuppressWarnings({"unchecked", "rawtypes"})
public class RiskTreatmentController {
    @Autowired
    private RiskPlanService riskPlanService;
    @Autowired
    private RiskActivitiesService riskActivitiesService;
    @Autowired
    protected RequestSessionUtil sessionUtil;
    @Autowired
    protected StagingChangeService stagingChangeService;

    @PostMapping(value={"/riskPlan"})
    public ResponseEntity<RiskResponseDTO> saveRiskPlanDetails(@RequestBody RiskPlanDTO riskPlanDTO, HttpServletRequest request) throws RequestException {
        riskPlanDTO.setCreatedBy(Long.parseLong(UserThreadLocal.get().getProfile().getEmpId()));
        return new ResponseEntity(this.riskPlanService.saveRiskPlan(riskPlanDTO), HttpStatus.OK);
    }

    @PutMapping(value={"/riskPlan"})
    public ResponseEntity<RiskResponseDTO> updateRiskPlanDetails(@RequestBody RiskPlanDTO riskPlanDTO, HttpServletRequest request) throws RequestException {
        riskPlanDTO.setUpdatedBy(Long.parseLong(UserThreadLocal.get().getProfile().getEmpId()));
        return new ResponseEntity(this.riskPlanService.updateRiskPlan(riskPlanDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/riskPlan/{id}"})
    public ResponseEntity<RiskPlanDTO> getRiskPlanById(@PathVariable Long id, @RequestParam(value="riskType", required=false) String riskType) throws RequestException {
        return new ResponseEntity(this.riskPlanService.retrieveRiskPlan(id), HttpStatus.OK);
    }

    @DeleteMapping(value={"/riskPlan/{id}"})
    public ResponseEntity<Boolean> deleteRiskPlanDetailsById(@PathVariable(value="id") Long id) throws RequestException {
        this.riskPlanService.removeRiskPlan(id);
        return new ResponseEntity(true, HttpStatus.OK);
    }

    @GetMapping(value={"/riskPlanList/{riskId}"})
    public ResponseEntity<List<RiskPlanDTO>> findAllByRiskId(@PathVariable(value="riskId") Long riskId) throws RequestException {
        List RiskPlanDTOList = this.riskPlanService.findAllByRiskId(riskId);
        if (!RiskPlanDTOList.isEmpty()) {
            return new ResponseEntity(RiskPlanDTOList, HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    @GetMapping(value={"/retrieveRiskPlanList"})
    public ResponseEntity<List<RiskPlanDTO>> findAllByEmpId(HttpServletRequest request) throws RequestException {
        List RiskPlanDTOList = this.riskPlanService.findAllByEmpId(Long.valueOf(this.sessionUtil.getSessionId(request)));
        return new ResponseEntity(RiskPlanDTOList, HttpStatus.OK);
    }

    @PostMapping(value={"/riskActivities"})
    public ResponseEntity<RiskResponseDTO> saveRiskActivitiesDetails(@RequestBody RiskActivitiesDTO riskActivitiesDTO, HttpServletRequest request) throws RequestException {
        riskActivitiesDTO.setCreatedBy(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue());
        return new ResponseEntity(this.riskActivitiesService.saveRiskActivities(riskActivitiesDTO), HttpStatus.OK);
    }

    @PutMapping(value={"/riskActivities"})
    public ResponseEntity<RiskResponseDTO> updateRiskActivitiesDetails(@RequestBody RiskActivitiesDTO riskActivitiesDTO, HttpServletRequest request) throws RequestException {
        riskActivitiesDTO.setUpdatedBy(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue());
        return new ResponseEntity(this.riskActivitiesService.updateRiskActivities(riskActivitiesDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/riskActivities/{id}"})
    public ResponseEntity<RiskActivitiesDTO> getRiskActivitiesById(@PathVariable Long id, @RequestParam(value="riskType", required=false) String riskType) throws RequestException {
        if (riskType != null && riskType.equalsIgnoreCase("draft")) {
            StagingChangeDTO stagingChange = this.stagingChangeService.getStagingChangeDetails(id);
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.registerModule((Module)new JavaTimeModule());
            Map oldValueMap = stagingChange.getOldValue();
            RiskDTO riskDTO = (RiskDTO)objectMapper.convertValue(oldValueMap, RiskDTO.class);
            RiskActivitiesDTO causeDTO = null;
            List riskCauses = riskDTO.getRiskPlanList();
            for (Object _obj_causes : riskCauses) {
                RiskPlanDTO causes = (RiskPlanDTO) _obj_causes;
                List riskconcequence = causes.getRiskActivitiesDTOList();
                for (Object _obj_activity : riskconcequence) {
                    RiskActivitiesDTO activity = (RiskActivitiesDTO) _obj_activity;
                    activity.setChangeId(stagingChange.getId().longValue());
                    causeDTO = activity;
                }
            }
            return new ResponseEntity(causeDTO, HttpStatus.OK);
        }
        return new ResponseEntity(this.riskActivitiesService.retrieveRiskActivities(id), HttpStatus.OK);
    }

    @DeleteMapping(value={"/riskActivities/{id}"})
    public ResponseEntity<Boolean> deleteRiskActivitiesDetailsById(@PathVariable(value="id") Long id) throws RequestException {
        this.riskActivitiesService.removeRiskActivities(id);
        return new ResponseEntity(true, HttpStatus.OK);
    }

    @GetMapping(value={"/riskActivitiesList/{riskId}"})
    public ResponseEntity<List<RiskActivitiesDTO>> findAllRiskActivitiesByRiskId(@PathVariable(value="riskId") Long riskId) throws RequestException {
        List RiskActivitiesDTOList = this.riskActivitiesService.findAllByRiskId(riskId);
        return new ResponseEntity(RiskActivitiesDTOList, HttpStatus.OK);
    }

    @GetMapping(value={"/retrieveRiskActivitiesList"})
    public ResponseEntity<List<RiskActivitiesDTO>> findAllRiskActivitiesByEmpId(HttpServletRequest request) throws RequestException {
        List RiskActivitiesDTOList = this.riskActivitiesService.findAllByEmpId(Long.valueOf(this.sessionUtil.getSessionId(request)));
        return new ResponseEntity(RiskActivitiesDTOList, HttpStatus.OK);
    }

    @GetMapping(value={"/riskTreatmentList/{riskId}"})
    public ResponseEntity<List<RiskPlanDTO>> findAllTreatmentByRiskId(@PathVariable(value="riskId") Long riskId) throws RequestException {
        List RiskPlanDTOList = this.riskPlanService.findAllTreatmentByRiskId(riskId);
        if (!RiskPlanDTOList.isEmpty()) {
            return new ResponseEntity(RiskPlanDTOList, HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }
}

