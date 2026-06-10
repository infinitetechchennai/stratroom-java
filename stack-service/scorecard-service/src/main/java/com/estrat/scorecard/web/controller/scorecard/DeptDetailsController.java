/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.scorecard.dto.DeptDetails
 *  com.estrat.scorecard.service.DeptService
 *  com.estrat.scorecard.web.controller.scorecard.DeptDetailsController
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.http.HttpStatus
 *  org.springframework.http.ResponseEntity
 *  org.springframework.web.bind.annotation.DeleteMapping
 *  org.springframework.web.bind.annotation.GetMapping
 *  org.springframework.web.bind.annotation.PathVariable
 *  org.springframework.web.bind.annotation.PostMapping
 *  org.springframework.web.bind.annotation.RequestBody
 *  org.springframework.web.bind.annotation.RestController
 */
package com.estrat.scorecard.web.controller.scorecard;

import com.estrat.scorecard.dto.DeptDetails;
import com.estrat.scorecard.service.DeptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DeptDetailsController {
    @Autowired
    private DeptService deptService;

    @GetMapping(value={"/deptdetails/{id}"})
    public ResponseEntity<DeptDetails> getDeptDetailsById(@PathVariable long id) {
        return new ResponseEntity((Object)this.deptService.getDeptDetailsById(id), HttpStatus.OK);
    }

    @PostMapping(value={"/deptdetails"})
    public ResponseEntity<DeptDetails> saveOrUpdateDeptDetails(@RequestBody DeptDetails deptDetails) {
        return new ResponseEntity((Object)this.deptService.saveOrUpdateDeptDetails(deptDetails), HttpStatus.OK);
    }

    @DeleteMapping(value={"/deptdetails/{id}"})
    public ResponseEntity<String> deleteDeptDetails(@PathVariable long id) {
        return new ResponseEntity((Object)this.deptService.deleteDeptDetails(id), HttpStatus.OK);
    }

    @GetMapping(value={"/findEmpOwnerByDeptId/{deptId}"})
    public ResponseEntity<Long> findByDeptId(@PathVariable(value="deptId") Long deptId) {
        return new ResponseEntity((Object)this.deptService.getDeptOwner(deptId), HttpStatus.OK);
    }
}

