/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.dto.MasterDto
 *  com.estrat.backend.db.resource.MasterController
 *  com.estrat.backend.db.service.MasterService
 *  org.springframework.beans.factory.annotation.Autowired
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

import com.estrat.backend.db.dto.MasterDto;
import com.estrat.backend.db.service.MasterService;
import org.springframework.beans.factory.annotation.Autowired;
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
public class MasterController {
    @Autowired
    MasterService masterService;

    @PostMapping(value={"/saveMaster"})
    public ResponseEntity<?> saveMaster(@RequestBody MasterDto masterDto) {
        return this.masterService.saveMaster(masterDto);
    }

    @PutMapping(value={"/updateMaster"})
    public ResponseEntity<?> updateMaster(@RequestBody MasterDto masterDto) {
        return this.masterService.updateStatus(masterDto);
    }

    @GetMapping(value={"/getMaster/{masterId}"})
    public ResponseEntity<?> fetchById(@PathVariable long masterId) {
        return this.masterService.fetchByMasterId(masterId);
    }

    @DeleteMapping(value={"/deleteMaster/{id}"})
    public ResponseEntity<?> deleteById(@PathVariable long id) {
        return this.masterService.deleteByMaster(id);
    }

    @GetMapping(value={"/getMasterFilter"})
    public ResponseEntity<?> findByMasterNameAndDepartMent(@RequestParam String masterName, @RequestParam String departMent) {
        return this.masterService.findByMasterNameAndDepartMent(masterName, departMent);
    }
}

