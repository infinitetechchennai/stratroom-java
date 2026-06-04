/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.ImpactData
 *  com.estrat.service.db.dto.ImpactDataDto
 *  com.estrat.service.db.resource.ImpactDataController
 *  com.estrat.service.db.service.ImpactDataService
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
package com.estrat.service.db.resource;

import com.estrat.service.db.bean.po.ImpactData;
import com.estrat.service.db.dto.ImpactDataDto;
import com.estrat.service.db.service.ImpactDataService;
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
    private ImpactDataService impactdataService;

    @PostMapping(value={"/saveImpactData"})
    public ResponseEntity<ImpactDataDto> saveImpacdata(@RequestBody ImpactDataDto impactdataDto) {
        ImpactData impactData = new ImpactData(impactdataDto);
        return new ResponseEntity((Object)this.impactdataService.save(impactData), HttpStatus.OK);
    }

    @PutMapping(value={"/updateImpactData"})
    public ResponseEntity<ImpactDataDto> updateImpactData(@RequestBody ImpactDataDto impactDataDto) {
        ImpactData impValue = new ImpactData(impactDataDto);
        ImpactDataDto saveimpValueDto = this.impactdataService.save(impValue);
        return new ResponseEntity((Object)saveimpValueDto, HttpStatus.OK);
    }

    @GetMapping(value={"/retriveImpDataId/{id}"})
    public ResponseEntity<ImpactDataDto> findRpoById(@PathVariable(value="id") long id) {
        ImpactDataDto valueDto = new ImpactDataDto((ImpactData)this.impactdataService.findImpactDataById(id).get());
        return new ResponseEntity((Object)valueDto, HttpStatus.OK);
    }

    @GetMapping(value={"/retrieveImpactData"})
    public ResponseEntity<?> findAllImpactData() {
        return ResponseEntity.ok((Object)this.impactdataService.findAllImpactData());
    }
}

