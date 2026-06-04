/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.controller.MasterValueController
 *  com.estrat.web.dto.MasterValueDto
 *  com.estrat.web.exception.RequestException
 *  com.estrat.web.service.MasterValueService
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

import com.estrat.web.dto.MasterValueDto;
import com.estrat.web.exception.RequestException;
import com.estrat.web.service.MasterValueService;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MasterValueController {
    @Autowired
    private MasterValueService masterValueService;
    @Autowired
    protected RequestSessionUtil sessionUtil;

    @PostMapping(value={"/saveMasterValue"})
    public ResponseEntity<MasterValueDto> saveMasterValue(@RequestBody MasterValueDto masterValueDto, HttpServletRequest request) throws RequestException {
        masterValueDto.setCreatedBy(Long.parseLong(UserThreadLocal.get().getProfile().getEmpId()));
        return new ResponseEntity(this.masterValueService.saveMasterValue(masterValueDto), HttpStatus.OK);
    }

    @GetMapping(value={"/retrieveMasterValue"})
    public ResponseEntity<List<MasterValueDto>> findAllMasterValue() {
        return new ResponseEntity(this.masterValueService.findAllMasterValue(), HttpStatus.OK);
    }

    @GetMapping(value={"/masterValue/{id}"})
    public ResponseEntity<MasterValueDto> findMasterById(@PathVariable(value="id") long id) throws RequestException {
        return new ResponseEntity(this.masterValueService.findMasterById(id), HttpStatus.OK);
    }

    @DeleteMapping(value={"/deleteMasterValue/{id}"})
    public ResponseEntity<Boolean> deleteMasterValue(@PathVariable(value="id") long id) {
        this.masterValueService.removeMasterValue(id);
        return new ResponseEntity(true, HttpStatus.OK);
    }

    @GetMapping(value={"/retrieveMasterTypes"})
    public ResponseEntity<List<MasterValueDto>> findAllByType(@RequestParam(value="type") String type) throws RequestException {
        return new ResponseEntity(this.masterValueService.findAllByTypes(type), HttpStatus.OK);
    }

    @PutMapping(value={"/updateMasterValue"})
    public ResponseEntity<MasterValueDto> updateMasterValue(@RequestBody MasterValueDto masterValueDto, HttpServletRequest request) {
        masterValueDto.setUpdatedBy(Long.parseLong(UserThreadLocal.get().getProfile().getEmpId()));
        return new ResponseEntity(this.masterValueService.updateMasterValue(masterValueDto), HttpStatus.OK);
    }
}

