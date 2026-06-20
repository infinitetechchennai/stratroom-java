/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.scorecard.dto.RpoTableDto
 *  com.estrat.backend.scorecard.exception.RequestException
 *  com.estrat.backend.scorecard.service.RpoTableService
 *  com.estrat.backend.scorecard.web.controller.masters.RpoTableController
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
package com.estrat.backend.scorecard.web.controller.masters;

import com.estrat.backend.scorecard.dto.RpoTableDto;
import com.estrat.backend.scorecard.exception.RequestException;
import com.estrat.backend.scorecard.service.RpoTableService;
import java.util.List;
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
public class RpoTableController {
    @Autowired
    private RpoTableService rpoTableService;

    @PostMapping(value={"/saveRpoTable"})
    public ResponseEntity<RpoTableDto> saveRpoTable(@RequestBody RpoTableDto rbotableDto) {
        return new ResponseEntity((Object)this.rpoTableService.saveRpoTable(rbotableDto), HttpStatus.OK);
    }

    @GetMapping(value={"/retrieveRpo"})
    public ResponseEntity<List<RpoTableDto>> findAllMasterValue() {
        return new ResponseEntity((Object)this.rpoTableService.findAllRpo(), HttpStatus.OK);
    }

    @GetMapping(value={"/retriveRpoId/{id}"})
    public ResponseEntity<RpoTableDto> findRpoById(@PathVariable(value="id") long id) {
        return new ResponseEntity((Object)this.rpoTableService.findByIdRpo(id), HttpStatus.OK);
    }

    @DeleteMapping(value={"/deleteRpo/{id}"})
    public ResponseEntity<Boolean> deleteRpoById(@PathVariable(value="id") long id) {
        this.rpoTableService.removeRpo(id);
        return new ResponseEntity((Object)true, HttpStatus.OK);
    }

    @PutMapping(value={"/updateRpo"})
    public ResponseEntity<RpoTableDto> updateRpoValue(@RequestBody RpoTableDto rpoTableDto) {
        return new ResponseEntity((Object)this.rpoTableService.updateRpo(rpoTableDto), HttpStatus.OK);
    }

    @GetMapping(value={"/retrieveAllRpo/{empId}"})
    public ResponseEntity<List<RpoTableDto>> findAllRpoEmpId(@PathVariable(value="empId") Long empId) {
        return new ResponseEntity((Object)this.rpoTableService.findAllRpoBYEmpId(empId), HttpStatus.OK);
    }

    @GetMapping(value={"/retrieveRpolist"})
    public ResponseEntity<List<RpoTableDto>> findAllByPageId(@RequestParam(value="pageId", required=false) String pageId, @RequestParam(value="dateRange", required=false) String dateRange, @RequestParam(value="status", required=false) String status, HttpServletRequest request) throws RequestException {
        List eventlist = this.rpoTableService.findByAllPageId(Long.parseLong(pageId), dateRange, status);
        return new ResponseEntity((Object)eventlist, HttpStatus.OK);
    }

    @GetMapping(value={"/rpoListWithChild/{empId}"})
    public ResponseEntity<List<RpoTableDto>> rpoListWithChild(@PathVariable(value="empId") long empId, @RequestParam(value="pageIds", required=false) String pageIds, @RequestParam(value="dateRange", required=false) String dateRange) throws RequestException {
        return new ResponseEntity((Object)this.rpoTableService.rpoListWithChild(empId, pageIds, dateRange), HttpStatus.OK);
    }

    @GetMapping(value={"/rpoListWithDeptids"})
    public ResponseEntity<List<RpoTableDto>> rpoListWithDeptids(@RequestParam(value="deptIds", required=false) String deptIds) throws RequestException {
        return new ResponseEntity((Object)this.rpoTableService.rpoListWithDeptids(deptIds), HttpStatus.OK);
    }

    @GetMapping(value={"/rpohistorylist"})
    public ResponseEntity<List<RpoTableDto>> rpoHistoryList(@RequestParam(value="rpoId", required=false) Long rpoId, @RequestParam(value="version", required=false) Long version) throws RequestException {
        return new ResponseEntity((Object)this.rpoTableService.rpoHistoryList(rpoId, version), HttpStatus.OK);
    }
}

