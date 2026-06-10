/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.scorecard.dto.ImpactDataDto
 *  com.estrat.backend.scorecard.service.ImpactDataService
 *  com.estrat.backend.scorecard.web.controller.masters.ImpactDataController
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
package com.estrat.backend.scorecard.web.controller.masters;

import com.estrat.backend.scorecard.dto.ImpactDataDto;
import com.estrat.backend.scorecard.service.ImpactDataService;
import java.util.List;
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
    public ResponseEntity<ImpactDataDto> saveRpoTable(@RequestBody ImpactDataDto impactDataDto) {
        return new ResponseEntity((Object)this.impactDataService.saveImpactData(impactDataDto), HttpStatus.OK);
    }

    @PutMapping(value={"/updateImpactData"})
    public ResponseEntity<ImpactDataDto> updateRpoValue(@RequestBody ImpactDataDto impactDataDto) {
        return new ResponseEntity((Object)this.impactDataService.updateImpactData(impactDataDto), HttpStatus.OK);
    }

    @GetMapping(value={"/retriveImpDataId/{id}"})
    public ResponseEntity<ImpactDataDto> findImpactDataById(@PathVariable(value="id") long id) {
        return new ResponseEntity((Object)this.impactDataService.findImpDataById(id), HttpStatus.OK);
    }

    @GetMapping(value={"/retrieveImpactData"})
    public ResponseEntity<List<ImpactDataDto>> findAllImpactData() {
        return new ResponseEntity((Object)this.impactDataService.findAllImpactdata(), HttpStatus.OK);
    }
}

