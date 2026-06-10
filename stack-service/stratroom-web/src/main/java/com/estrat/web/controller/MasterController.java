/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.controller.MasterController
 *  com.estrat.web.dto.MasterDto
 *  com.estrat.web.service.MasterService
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.http.HttpStatus
 *  org.springframework.http.ResponseEntity
 *  org.springframework.web.bind.annotation.PostMapping
 *  org.springframework.web.bind.annotation.RequestBody
 *  org.springframework.web.bind.annotation.RestController
 */
package com.estrat.web.controller;

import com.estrat.web.dto.MasterDto;
import com.estrat.web.service.MasterService;
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
        return new ResponseEntity(this.masterService.saveMaster(masterDto), HttpStatus.OK);
    }
}

