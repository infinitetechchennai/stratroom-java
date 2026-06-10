/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.controller.RpoTableController
 *  com.estrat.web.dto.RpoTableDto
 *  com.estrat.web.exception.RequestException
 *  com.estrat.web.service.RpoTableService
 *  com.estrat.web.util.RequestSessionUtil
 *  com.estrat.web.util.UserThreadLocal
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
package com.estrat.web.controller;

import com.estrat.web.dto.RpoTableDto;
import com.estrat.web.exception.RequestException;
import com.estrat.web.service.RpoTableService;
import com.estrat.web.util.RequestSessionUtil;
import com.estrat.web.util.UserThreadLocal;
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
    @Autowired
    protected RequestSessionUtil sessionUtil;

    @PostMapping(value={"/saveRpoTable"})
    public ResponseEntity<RpoTableDto> saveRpoTable(@RequestBody RpoTableDto rbotableDto, HttpServletRequest request) throws RequestException {
        rbotableDto.setCreateBy(Long.parseLong(UserThreadLocal.get().getProfile().getEmpId()));
        rbotableDto.setOwner(Long.parseLong(UserThreadLocal.get().getProfile().getEmpId()));
        return new ResponseEntity(this.rpoTableService.saveRpoTable(rbotableDto), HttpStatus.OK);
    }

    @GetMapping(value={"/retrieveRpo"})
    public ResponseEntity<List<RpoTableDto>> findAllRpoValue() {
        return new ResponseEntity(this.rpoTableService.findAllRpo(), HttpStatus.OK);
    }

    @GetMapping(value={"/retriveRpoId/{id}"})
    public ResponseEntity<RpoTableDto> findRpoById(@PathVariable(value="id") long id) {
        return new ResponseEntity(this.rpoTableService.findByIdRpo(id), HttpStatus.OK);
    }

    @DeleteMapping(value={"/deleteRpo/{id}"})
    public ResponseEntity<Boolean> deleteRpoById(@PathVariable(value="id") long id) {
        this.rpoTableService.removeRpo(id);
        return new ResponseEntity(true, HttpStatus.OK);
    }

    @PutMapping(value={"/updateRpo"})
    public ResponseEntity<RpoTableDto> updateRpoValue(@RequestBody RpoTableDto rpoTableDto, HttpServletRequest request) {
        return new ResponseEntity(this.rpoTableService.updateRpo(rpoTableDto), HttpStatus.OK);
    }

    @GetMapping(value={"/retrieveAllRpo/{empId}"})
    public ResponseEntity<List<RpoTableDto>> findAllRpoByEmpId(@PathVariable(value="empId") Long empId) {
        return new ResponseEntity(this.rpoTableService.findAllRpoBYEmpId(empId), HttpStatus.OK);
    }

    @GetMapping(value={"/retrieveRpolist"})
    public ResponseEntity<List<RpoTableDto>> getAllByPageId(@RequestParam(value="pageId", required=false) String pageId, @RequestParam(value="dateRange", required=false) String dateRange, @RequestParam(value="status", required=false) String status, HttpServletRequest request) throws RequestException {
        List eventlist = this.rpoTableService.findByAllPageId(Long.parseLong(pageId), dateRange, status);
        return new ResponseEntity(eventlist, HttpStatus.OK);
    }

    @GetMapping(value={"/rpoListWithChild"})
    public ResponseEntity<List<RpoTableDto>> rpoListWithChild(@RequestParam(value="pageIds", required=false) String pageIds, @RequestParam(value="dateRange", required=false) String dateRange, HttpServletRequest request) throws RequestException {
        return new ResponseEntity(this.rpoTableService.rpoListWithChild(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue(), pageIds, dateRange), HttpStatus.OK);
    }

    @GetMapping(value={"/rpoListWithDeptids"})
    public ResponseEntity<List<RpoTableDto>> rpoListWithDeptids(@RequestParam(value="deptIds", required=false) String deptIds) throws RequestException {
        return new ResponseEntity(this.rpoTableService.rpoListWithDeptids(deptIds), HttpStatus.OK);
    }

    @GetMapping(value={"/rpohistorylist"})
    public ResponseEntity<List<RpoTableDto>> rpoHistoryList(@RequestParam(value="rpoId", required=false) Long rpoId, @RequestParam(value="version", required=false) Long version) throws RequestException {
        return new ResponseEntity(this.rpoTableService.rpoHistoryList(rpoId, version), HttpStatus.OK);
    }
}

