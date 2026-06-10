/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.MasterValue
 *  com.estrat.backend.db.dto.MasterValueDto
 *  com.estrat.backend.db.exception.RequestException
 *  com.estrat.backend.db.resource.MasterValueController
 *  com.estrat.backend.db.service.MasterValueService
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
package com.estrat.backend.db.resource;

import com.estrat.backend.db.bean.po.MasterValue;
import com.estrat.backend.db.dto.MasterValueDto;
import com.estrat.backend.db.exception.RequestException;
import com.estrat.backend.db.service.MasterValueService;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
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
public class MasterValueController {
    @Autowired
    MasterValueService masterValueService;

    @PostMapping(value={"/saveMasterValue"})
    public ResponseEntity<?> saveMasterValue(@RequestBody MasterValueDto mastervalueDto, HttpServletRequest request) throws RequestException {
        MasterValue masterValue = new MasterValue(mastervalueDto);
        masterValue.setCreatedAt(LocalDate.now());
        return new ResponseEntity((Object)this.masterValueService.saveMasterValue(masterValue), HttpStatus.OK);
    }

    @GetMapping(value={"/retrieveMasterValue"})
    public ResponseEntity<?> findAllMasterValue() {
        return ResponseEntity.ok((Object)this.masterValueService.findAllMasterValue());
    }

    @GetMapping(value={"/masterValue/{id}"})
    public ResponseEntity<MasterValueDto> findMasterById(@PathVariable(value="id") long id) {
        MasterValueDto valueDto = new MasterValueDto((MasterValue)this.masterValueService.findMasterById(id).get());
        return new ResponseEntity((Object)valueDto, HttpStatus.OK);
    }

    @DeleteMapping(value={"/deleteMasterValue/{id}"})
    public ResponseEntity<MasterValueDto> deletemasterById(@PathVariable(value="id") long id) {
        Optional optionalMasterValue = this.masterValueService.findMasterById(id);
        MasterValue mastervalue = (MasterValue)optionalMasterValue.get();
        if (optionalMasterValue.isPresent()) {
            this.masterValueService.delete(mastervalue);
            return new ResponseEntity(HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    @GetMapping(value={"/retrieveMasterTypes"})
    public ResponseEntity<List<MasterValueDto>> findAllByTypes(@RequestParam(value="type") String type) {
        List mastorValueDtoList = this.masterValueService.findAllByType(type);
        return new ResponseEntity((Object)mastorValueDtoList, HttpStatus.OK);
    }

    @PutMapping(value={"/updateMasterValue"})
    public ResponseEntity<MasterValueDto> updateMasterValue(@RequestBody MasterValueDto masterValueDto) {
        MasterValue masterValue = new MasterValue(masterValueDto);
        masterValue.setUpdatedAt(LocalDate.now());
        MasterValueDto saveMasterValueDto = this.masterValueService.saveMasterValue(masterValue);
        return new ResponseEntity((Object)saveMasterValueDto, HttpStatus.OK);
    }
}

