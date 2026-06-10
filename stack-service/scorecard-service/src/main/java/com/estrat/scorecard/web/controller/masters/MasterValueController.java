/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.scorecard.dto.MasterValueDto
 *  com.estrat.scorecard.service.MasterValueService
 *  com.estrat.scorecard.web.controller.masters.MasterValueController
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
package com.estrat.scorecard.web.controller.masters;

import com.estrat.scorecard.dto.MasterValueDto;
import com.estrat.scorecard.service.MasterValueService;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MasterValueController {
    @Autowired
    private MasterValueService masterValueService;

    @PostMapping(value={"/saveMasterValue"})
    public ResponseEntity<MasterValueDto> saveMasterValue(@RequestBody MasterValueDto masterValueDto) {
        return new ResponseEntity((Object)this.masterValueService.saveMasterValue(masterValueDto), HttpStatus.OK);
    }

    @GetMapping(value={"/retrieveMasterValue"})
    public ResponseEntity<List<MasterValueDto>> findAllMasterValue() {
        return new ResponseEntity((Object)this.masterValueService.findAllMasterValue(), HttpStatus.OK);
    }

    @GetMapping(value={"/masterValue/{id}"})
    public ResponseEntity<MasterValueDto> findMasterById(@PathVariable(value="id") long id) {
        return new ResponseEntity((Object)this.masterValueService.findMasterById(id), HttpStatus.OK);
    }

    @DeleteMapping(value={"/deleteMasterValue/{id}"})
    public ResponseEntity<Boolean> deleteMasterValue(@PathVariable(value="id") long id) {
        this.masterValueService.removeMasterValue(id);
        return new ResponseEntity((Object)true, HttpStatus.OK);
    }

    @GetMapping(value={"/retrieveMasterTypes"})
    public ResponseEntity<List<MasterValueDto>> findAllByType(@RequestParam(value="type") String type) {
        return new ResponseEntity((Object)this.masterValueService.findAllByTypes(type), HttpStatus.OK);
    }

    @PutMapping(value={"/updateMasterValue"})
    public ResponseEntity<MasterValueDto> updateMasterValue(@RequestBody MasterValueDto masterValueDto) {
        return new ResponseEntity((Object)this.masterValueService.updateMasterValue(masterValueDto), HttpStatus.OK);
    }
}

