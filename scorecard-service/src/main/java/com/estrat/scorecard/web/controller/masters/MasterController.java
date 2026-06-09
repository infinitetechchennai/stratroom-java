/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.scorecard.dto.MasterDto
 *  com.estrat.scorecard.service.MasterService
 *  com.estrat.scorecard.web.controller.masters.MasterController
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.http.HttpStatus
 *  org.springframework.http.ResponseEntity
 *  org.springframework.web.bind.annotation.PostMapping
 *  org.springframework.web.bind.annotation.RequestBody
 *  org.springframework.web.bind.annotation.RestController
 */
package com.estrat.scorecard.web.controller.masters;

import com.estrat.scorecard.dto.MasterDto;
import com.estrat.scorecard.service.MasterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MasterController {
    @Autowired
    private MasterService masterService;

    @PostMapping(value={"/saveMaster"})
    public ResponseEntity<MasterDto> saveMaster(@RequestBody MasterDto masterDto) {
        return new ResponseEntity((Object)this.masterService.saveMaster(masterDto), HttpStatus.OK);
    }
}

