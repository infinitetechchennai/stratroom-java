/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.scorecard.dto.InitiativeResponseDTO
 *  com.estrat.scorecard.dto.SubInitiativesDTO
 *  com.estrat.scorecard.dto.SubInitiativesMapDTO
 *  com.estrat.scorecard.exception.RequestException
 *  com.estrat.scorecard.service.SubInitiativeService
 *  com.estrat.scorecard.util.KPIUtil
 *  com.estrat.scorecard.web.controller.initiatives.SubInitiativesController
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
package com.estrat.scorecard.web.controller.initiatives;

import com.estrat.scorecard.dto.InitiativeResponseDTO;
import com.estrat.scorecard.dto.SubInitiativesDTO;
import com.estrat.scorecard.dto.SubInitiativesMapDTO;
import com.estrat.scorecard.exception.RequestException;
import com.estrat.scorecard.service.SubInitiativeService;
import com.estrat.scorecard.util.KPIUtil;
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
public class SubInitiativesController {
    @Autowired
    protected SubInitiativeService subInitiativesService;
    @Autowired
    private KPIUtil kpiUtil;

    @PostMapping(value={"/subinitiatives"})
    public ResponseEntity<InitiativeResponseDTO> saveSubInitiativesDetails(@RequestBody SubInitiativesDTO subInitiativesDTO) throws RequestException {
        return new ResponseEntity((Object)this.subInitiativesService.saveSubInitiatives(subInitiativesDTO), HttpStatus.OK);
    }

    @PutMapping(value={"/subinitiatives"})
    public ResponseEntity<InitiativeResponseDTO> updateSubInitiativesDetails(@RequestBody SubInitiativesDTO subInitiativesDTO) throws RequestException {
        return new ResponseEntity((Object)this.subInitiativesService.updateSubInitiatives(subInitiativesDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/subinitiatives/{id}"})
    public ResponseEntity<SubInitiativesDTO> getSubInitiativesDetailsById(@PathVariable Long id) throws RequestException {
        return new ResponseEntity((Object)this.subInitiativesService.retriveSubInitiatives(id), HttpStatus.OK);
    }

    @DeleteMapping(value={"/subinitiatives/{id}"})
    public ResponseEntity<Boolean> deleteSubInitiativesDetailsById(@PathVariable Long id) throws RequestException {
        this.subInitiativesService.removeSubInitiatives(id);
        return new ResponseEntity((Object)true, HttpStatus.OK);
    }

    @GetMapping(value={"/subInitiativesList/{initiativeId}"})
    public ResponseEntity<List<SubInitiativesDTO>> findAllByInitiativesId(@PathVariable Long initiativeId) throws RequestException {
        List subInitiativesDTOList = this.subInitiativesService.findAllByInitiativesId(initiativeId);
        if (!subInitiativesDTOList.isEmpty()) {
            for (com.estrat.scorecard.dto.SubInitiativesDTO subInitiativesDTO : (java.util.List<com.estrat.scorecard.dto.SubInitiativesDTO>)subInitiativesDTOList) {
                this.kpiUtil.updateStatus(subInitiativesDTO.getSubInitiativeValue(), null);
            }
        }
        return new ResponseEntity((Object)subInitiativesDTOList, HttpStatus.OK);
    }

    @GetMapping(value={"/retrieveSubInitiativesList/{empId}"})
    public ResponseEntity<List<SubInitiativesDTO>> findAllByEmpId(@PathVariable(value="empId") Long empId) throws RequestException {
        List subInitiativesDTOList = this.subInitiativesService.findAllByEmpId(empId);
        if (!subInitiativesDTOList.isEmpty()) {
            for (com.estrat.scorecard.dto.SubInitiativesDTO subInitiativesDTO : (java.util.List<com.estrat.scorecard.dto.SubInitiativesDTO>)subInitiativesDTOList) {
                this.kpiUtil.updateStatus(subInitiativesDTO.getSubInitiativeValue(), null);
            }
        }
        return new ResponseEntity((Object)subInitiativesDTOList, HttpStatus.OK);
    }

    @PostMapping(value={"/subInitiativesMap"})
    public ResponseEntity<SubInitiativesMapDTO> saveSubInitiativesMap(@RequestBody SubInitiativesMapDTO subInitiativesMapDTO, HttpServletRequest request) throws RequestException {
        return new ResponseEntity((Object)this.subInitiativesService.saveSubInitiativesMap(subInitiativesMapDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/retrieveSubInitiativesMapList/{subInitiativesId}"})
    public ResponseEntity<List<SubInitiativesMapDTO>> retrieveSubInitiativesMapList(@PathVariable(value="subInitiativesId") Long subInitiativesId) throws RequestException {
        List subInitiativesDTOList = this.subInitiativesService.retrieveSubInitiativesMapList(subInitiativesId);
        return new ResponseEntity((Object)subInitiativesDTOList, HttpStatus.OK);
    }

    @GetMapping(value={"/findAllSubInitiativesList/{initiativeId}"})
    public ResponseEntity<List<SubInitiativesDTO>> retrieveSubInitiativesList(@PathVariable Long initiativeId) throws RequestException {
        List subInitiativesDTOList = this.subInitiativesService.retrieveSubInitiativesList(initiativeId);
        if (!subInitiativesDTOList.isEmpty()) {
            for (com.estrat.scorecard.dto.SubInitiativesDTO subInitiativesDTO : (java.util.List<com.estrat.scorecard.dto.SubInitiativesDTO>)subInitiativesDTOList) {
                this.kpiUtil.updateStatus(subInitiativesDTO.getSubInitiativeValue(), null);
            }
        }
        return new ResponseEntity((Object)subInitiativesDTOList, HttpStatus.OK);
    }

    @GetMapping(value={"/emp/subInitiativesList/{empId}"})
    public ResponseEntity<List<SubInitiativesDTO>> findBYEmpId(@PathVariable Long empId) throws RequestException {
        List subInitiativesDTOList = this.subInitiativesService.findBYEmpId(empId);
        if (!subInitiativesDTOList.isEmpty()) {
            for (com.estrat.scorecard.dto.SubInitiativesDTO subInitiativesDTO : (java.util.List<com.estrat.scorecard.dto.SubInitiativesDTO>)subInitiativesDTOList) {
                this.kpiUtil.updateStatus(subInitiativesDTO.getSubInitiativeValue(), null);
            }
        }
        return new ResponseEntity((Object)subInitiativesDTOList, HttpStatus.OK);
    }
}

