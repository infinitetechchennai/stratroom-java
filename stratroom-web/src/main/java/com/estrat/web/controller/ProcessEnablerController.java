/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.controller.ProcessEnablerController
 *  com.estrat.web.dto.PosTradingHoursCountsDto
 *  com.estrat.web.dto.ProcessEnablerDto
 *  com.estrat.web.exception.RequestException
 *  com.estrat.web.service.ProcessEnablerService
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

import com.estrat.web.dto.PosTradingHoursCountsDto;
import com.estrat.web.dto.ProcessEnablerDto;
import com.estrat.web.exception.RequestException;
import com.estrat.web.service.ProcessEnablerService;
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
public class ProcessEnablerController {
    @Autowired
    private ProcessEnablerService processEnablerService;
    @Autowired
    protected RequestSessionUtil sessionUtil;

    @PostMapping(value={"/saveProcessEnabler"})
    public ResponseEntity<ProcessEnablerDto> saveProcessEnabler(@RequestBody ProcessEnablerDto processEnablerDto, HttpServletRequest request) throws RequestException {
        System.out.println(" poscreateer ID :: " + Long.parseLong(UserThreadLocal.get().getProfile().getEmpId()));
        processEnablerDto.setCreateBy(Long.parseLong(UserThreadLocal.get().getProfile().getEmpId()));
        processEnablerDto.setOwner(Long.parseLong(UserThreadLocal.get().getProfile().getEmpId()));
        return new ResponseEntity(this.processEnablerService.saveProcessEnabler(processEnablerDto), HttpStatus.OK);
    }

    @GetMapping(value={"/retrivePos"})
    public ResponseEntity<List<ProcessEnablerDto>> findAllProcessEnabler() {
        return new ResponseEntity(this.processEnablerService.findAllProcessEnabler(), HttpStatus.OK);
    }

    @GetMapping(value={"/retrivePosId/{id}"})
    public ResponseEntity<ProcessEnablerDto> findPosById(@PathVariable(value="id") long id) {
        return new ResponseEntity(this.processEnablerService.findPosById(id), HttpStatus.OK);
    }

    @DeleteMapping(value={"/deletePos/{id}"})
    public ResponseEntity<Boolean> deletepos(@PathVariable(value="id") long id) {
        this.processEnablerService.removePos(id);
        return new ResponseEntity(true, HttpStatus.OK);
    }

    @PutMapping(value={"/updatePos"})
    public ResponseEntity<ProcessEnablerDto> updateMasterValue(@RequestBody ProcessEnablerDto processEnablerDto, HttpServletRequest request) {
        return new ResponseEntity(this.processEnablerService.updatePos(processEnablerDto), HttpStatus.OK);
    }

    @GetMapping(value={"/retriveAllpos/{empId}"})
    public ResponseEntity<List<ProcessEnablerDto>> findAllPosByEmpId(@PathVariable(value="empId") Long empId) {
        return new ResponseEntity(this.processEnablerService.findAllByEmpId(empId), HttpStatus.OK);
    }

    @GetMapping(value={"/retrievePoslist"})
    public ResponseEntity<List<ProcessEnablerDto>> getAllByPageId(@RequestParam(value="pageId", required=false) String pageId, @RequestParam(value="dateRange", required=false) String dateRange, @RequestParam(value="status", required=false) String status, HttpServletRequest request) throws RequestException {
        List eventlist = this.processEnablerService.findByAllPageId(Long.parseLong(pageId), dateRange, status);
        return new ResponseEntity(eventlist, HttpStatus.OK);
    }

    @GetMapping(value={"/posListWithChild"})
    public ResponseEntity<List<ProcessEnablerDto>> posListWithChild(@RequestParam(value="posPageIds", required=false) String posPageIds, @RequestParam(value="dateRange", required=false) String dateRange, HttpServletRequest request) throws RequestException {
        return new ResponseEntity(this.processEnablerService.posListWithChild(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue(), posPageIds, dateRange), HttpStatus.OK);
    }

    @GetMapping(value={"/posListWithDeptids"})
    public ResponseEntity<List<ProcessEnablerDto>> posListWithDeptids(@RequestParam(value="deptIds", required=false) String deptIds) throws RequestException {
        return new ResponseEntity(this.processEnablerService.posListWithDeptids(deptIds), HttpStatus.OK);
    }

    @GetMapping(value={"/posTradingHourseCount"})
    public ResponseEntity<List<PosTradingHoursCountsDto>> posTradingHoursCount(@RequestParam(value="posPageIds", required=false) String posPageIds, @RequestParam(value="dateRange", required=false) String dateRange) throws RequestException {
        return new ResponseEntity(this.processEnablerService.posTradingHoursCount(posPageIds, dateRange), HttpStatus.OK);
    }

    @GetMapping(value={"/poshistorylist"})
    public ResponseEntity<List<ProcessEnablerDto>> posHistoryList(@RequestParam(value="posId", required=false) Long posId, @RequestParam(value="version", required=false) Long version) throws RequestException {
        return new ResponseEntity(this.processEnablerService.posHistoryList(posId, version), HttpStatus.OK);
    }
}

