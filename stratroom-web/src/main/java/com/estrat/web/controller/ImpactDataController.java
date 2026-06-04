/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.controller.ImpactDataController
 *  com.estrat.web.dto.ImpactDataDto
 *  com.estrat.web.exception.RequestException
 *  com.estrat.web.service.ImpactDataService
 *  javax.servlet.http.HttpServletRequest
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.http.HttpStatus
 *  org.springframework.http.ResponseEntity
 *  org.springframework.web.bind.annotation.GetMapping
 *  org.springframework.web.bind.annotation.PathVariable
 *  org.springframework.web.bind.annotation.PostMapping
 *  org.springframework.web.bind.annotation.PutMapping
 *  org.springframework.web.bind.annotation.RequestBody
 *  org.springframework.web.bind.annotation.RestController
 */
package com.estrat.web.controller;

import com.estrat.web.dto.ImpactDataDto;
import com.estrat.web.exception.RequestException;
import com.estrat.web.service.ImpactDataService;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ImpactDataController {
    @Autowired
    private ImpactDataService impactDataService;

    @PostMapping(value={"/saveImpactData"})
    public ResponseEntity<ImpactDataDto> saveRpoTable(@RequestBody ImpactDataDto impactDataDto, HttpServletRequest request) throws RequestException {
        return new ResponseEntity(this.impactDataService.saveImpactData(impactDataDto), HttpStatus.OK);
    }

    @PutMapping(value={"/updateImpactData"})
    public ResponseEntity<ImpactDataDto> updateRpoValue(@RequestBody ImpactDataDto impactDataDto) {
        return new ResponseEntity(this.impactDataService.updateImpactData(impactDataDto), HttpStatus.OK);
    }

    @GetMapping(value={"/retriveImpDataId/{id}"})
    public ResponseEntity<ImpactDataDto> findImpDataById(@PathVariable(value="id") long id) {
        return new ResponseEntity(this.impactDataService.findImpDataById(id), HttpStatus.OK);
    }

    @GetMapping(value={"/retrieveImpactData"})
    public ResponseEntity<List<ImpactDataDto>> findAllImpactData() {
        return new ResponseEntity(this.impactDataService.findAllImpactdata(), HttpStatus.OK);
    }
}

