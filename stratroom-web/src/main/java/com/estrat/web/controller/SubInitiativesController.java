/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.controller.SubInitiativesController
 *  com.estrat.web.dto.InitiativeResponseDTO
 *  com.estrat.web.dto.SubInitiativesDTO
 *  com.estrat.web.dto.SubInitiativesMapDTO
 *  com.estrat.web.exception.RequestException
 *  com.estrat.web.service.SubInitiativeService
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
 *  org.springframework.web.bind.annotation.RestController
 */
package com.estrat.web.controller;

import com.estrat.web.dto.InitiativeResponseDTO;
import com.estrat.web.dto.SubInitiativesDTO;
import com.estrat.web.dto.SubInitiativesMapDTO;
import com.estrat.web.exception.RequestException;
import com.estrat.web.service.SubInitiativeService;
import com.estrat.web.util.RequestSessionUtil;
import com.estrat.web.util.UserThreadLocal;
import java.util.List;
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
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SubInitiativesController {
    @Autowired
    protected SubInitiativeService subInitiativesService;
    @Autowired
    protected RequestSessionUtil sessionUtil;

    @PostMapping(value={"/subinitiatives"})
    public ResponseEntity<InitiativeResponseDTO> saveSubInitiativesDetails(@RequestBody SubInitiativesDTO subInitiativesDTO, HttpServletRequest request) throws RequestException {
        subInitiativesDTO.setCreatedBy(Long.parseLong(UserThreadLocal.get().getProfile().getEmpId()));
        return new ResponseEntity(this.subInitiativesService.saveSubInitiatives(subInitiativesDTO), HttpStatus.OK);
    }

    @PutMapping(value={"/subinitiatives"})
    public ResponseEntity<InitiativeResponseDTO> updateSubInitiativesDetails(@RequestBody SubInitiativesDTO subInitiativesDTO, HttpServletRequest request) throws RequestException {
        subInitiativesDTO.setUpdatedBy(Long.parseLong(UserThreadLocal.get().getProfile().getEmpId()));
        return new ResponseEntity(this.subInitiativesService.updateSubInitiatives(subInitiativesDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/subinitiatives/{id}"})
    public ResponseEntity<SubInitiativesDTO> getSubInitiativesDetailsById(@PathVariable Long id) throws RequestException {
        return new ResponseEntity(this.subInitiativesService.retriveSubInitiatives(id), HttpStatus.OK);
    }

    @DeleteMapping(value={"/subinitiatives/{id}"})
    public ResponseEntity<Boolean> deleteSubInitiativesDetailsById(@PathVariable Long id) throws RequestException {
        this.subInitiativesService.removeSubInitiatives(id);
        return new ResponseEntity(true, HttpStatus.OK);
    }

    @GetMapping(value={"/subInitiativesList/{initiativeId}"})
    public ResponseEntity<List<SubInitiativesDTO>> findAllByInitiativesId(@PathVariable Long initiativeId) throws RequestException {
        List subInitiativesDTOList = this.subInitiativesService.findAllByInitiativesId(initiativeId);
        if (!subInitiativesDTOList.isEmpty()) {
            return new ResponseEntity(subInitiativesDTOList, HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    @GetMapping(value={"/retrieveSubInitiativesList/{empId}"})
    public ResponseEntity<List<SubInitiativesDTO>> findAllByEmpId(@PathVariable(value="empId") String empId) throws RequestException {
        List subInitiativesDTOList = this.subInitiativesService.findAllByEmpId(empId);
        return new ResponseEntity(subInitiativesDTOList, HttpStatus.OK);
    }

    @PostMapping(value={"/subInitiativesMap"})
    public ResponseEntity<Boolean> saveSubInitiativesMap(@RequestBody List<SubInitiativesMapDTO> subInitiativesMapDTO, HttpServletRequest request) throws RequestException {
        this.subInitiativesService.saveSubInitiativesMap(subInitiativesMapDTO);
        return new ResponseEntity(true, HttpStatus.OK);
    }

    @GetMapping(value={"/retrieveSubInitiativesMapList/{subInitiativesId}"})
    public ResponseEntity<List<SubInitiativesMapDTO>> retrieveSubInitiativesMapList(@PathVariable(value="subInitiativesId") Long subInitiativesId) throws RequestException {
        List subInitiativesDTOList = this.subInitiativesService.retrieveSubInitiativesMapList(subInitiativesId);
        return new ResponseEntity(subInitiativesDTOList, HttpStatus.OK);
    }
}

