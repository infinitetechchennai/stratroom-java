/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.scorecard.dto.PosTradingHoursCountsDto
 *  com.estrat.scorecard.dto.ProcessEnablerDto
 *  com.estrat.scorecard.exception.RequestException
 *  com.estrat.scorecard.service.ProcessEnablerService
 *  com.estrat.scorecard.web.controller.masters.ProcessEnablerController
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
package com.estrat.scorecard.web.controller.masters;

import com.estrat.scorecard.dto.PosTradingHoursCountsDto;
import com.estrat.scorecard.dto.ProcessEnablerDto;
import com.estrat.scorecard.exception.RequestException;
import com.estrat.scorecard.service.ProcessEnablerService;
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

    @PostMapping(value={"/saveProcessEnabler"})
    public ResponseEntity<ProcessEnablerDto> saveProcessEnabler(@RequestBody ProcessEnablerDto processEnablerDto) {
        return new ResponseEntity((Object)this.processEnablerService.saveProcessEnabler(processEnablerDto), HttpStatus.OK);
    }

    @GetMapping(value={"/retrivePos"})
    public ResponseEntity<List<ProcessEnablerDto>> findAllProcessEnabler() {
        return new ResponseEntity((Object)this.processEnablerService.findAllProcessEnabler(), HttpStatus.OK);
    }

    @GetMapping(value={"/retrivePosId/{id}"})
    public ResponseEntity<ProcessEnablerDto> findPosId(@PathVariable(value="id") long id) {
        return new ResponseEntity((Object)this.processEnablerService.findPosById(id), HttpStatus.OK);
    }

    @DeleteMapping(value={"/deletePos/{id}"})
    public ResponseEntity<Boolean> deletePos(@PathVariable(value="id") long id) {
        this.processEnablerService.removePos(id);
        return new ResponseEntity((Object)true, HttpStatus.OK);
    }

    @PutMapping(value={"/updatePos"})
    public ResponseEntity<ProcessEnablerDto> updatepos(@RequestBody ProcessEnablerDto processEnablerDto) {
        return new ResponseEntity((Object)this.processEnablerService.updatePos(processEnablerDto), HttpStatus.OK);
    }

    @GetMapping(value={"/retriveAllpos/{empId}"})
    public ResponseEntity<List<ProcessEnablerDto>> findAllProcessEnabler(@PathVariable(value="empId") Long empId) {
        return new ResponseEntity((Object)this.processEnablerService.findAllByEmpId(empId), HttpStatus.OK);
    }

    @GetMapping(value={"/retrievePoslist"})
    public ResponseEntity<List<ProcessEnablerDto>> findAllByPageId(@RequestParam(value="pageId", required=false) String pageId, @RequestParam(value="dateRange", required=false) String dateRange, @RequestParam(value="status", required=false) String status, HttpServletRequest request) throws RequestException {
        List eventlist = this.processEnablerService.findByAllPageId(Long.parseLong(pageId), dateRange, status);
        return new ResponseEntity((Object)eventlist, HttpStatus.OK);
    }

    @GetMapping(value={"/posListWithChild/{empId}"})
    public ResponseEntity<List<ProcessEnablerDto>> posListWithChild(@PathVariable(value="empId") long empId, @RequestParam(value="posPageIds", required=false) String posPageIds, @RequestParam(value="dateRange", required=false) String dateRange) throws RequestException {
        return new ResponseEntity((Object)this.processEnablerService.posListWithChild(empId, posPageIds, dateRange), HttpStatus.OK);
    }

    @GetMapping(value={"/posListWithDeptids"})
    public ResponseEntity<List<ProcessEnablerDto>> riskEventListWithDeptids(@RequestParam(value="deptIds", required=false) String deptIds) throws RequestException {
        return new ResponseEntity((Object)this.processEnablerService.posListWithDeptids(deptIds), HttpStatus.OK);
    }

    @GetMapping(value={"/posTradingHourseCount"})
    public ResponseEntity<List<PosTradingHoursCountsDto>> posTradingHoursCount(@RequestParam(value="posPageIds", required=false) String posPageIds, @RequestParam(value="dateRange", required=false) String dateRange) throws RequestException {
        return new ResponseEntity((Object)this.processEnablerService.posTradingHoursCount(posPageIds, dateRange), HttpStatus.OK);
    }

    @GetMapping(value={"/poshistorylist"})
    public ResponseEntity<List<ProcessEnablerDto>> posHistoryList(@RequestParam(value="posId", required=false) Long posId, @RequestParam(value="version", required=false) Long version) throws RequestException {
        return new ResponseEntity((Object)this.processEnablerService.posHistoryList(posId, version), HttpStatus.OK);
    }
}

