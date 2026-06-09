/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.scorecard.dto.ImpactCrticalCountDTO
 *  com.estrat.scorecard.dto.ImpactSurvayDto
 *  com.estrat.scorecard.exception.RequestException
 *  com.estrat.scorecard.service.ImpactSurvayService
 *  com.estrat.scorecard.web.controller.masters.ImpactSurvayController
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

import com.estrat.scorecard.dto.ImpactCrticalCountDTO;
import com.estrat.scorecard.dto.ImpactSurvayDto;
import com.estrat.scorecard.exception.RequestException;
import com.estrat.scorecard.service.ImpactSurvayService;
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
public class ImpactSurvayController {
    @Autowired
    private ImpactSurvayService impactSurvayService;

    @PostMapping(value={"/saveImpact"})
    public ResponseEntity<ImpactSurvayDto> saveImpact(@RequestBody ImpactSurvayDto impactSurvayDto) {
        return new ResponseEntity((Object)this.impactSurvayService.saveImpact(impactSurvayDto), HttpStatus.OK);
    }

    @GetMapping(value={"/retriveImpact"})
    public ResponseEntity<List<ImpactSurvayDto>> findAllImpact() {
        return new ResponseEntity((Object)this.impactSurvayService.findAllImpact(), HttpStatus.OK);
    }

    @GetMapping(value={"/retriveImpactId/{id}"})
    public ResponseEntity<ImpactSurvayDto> findImpactId(@PathVariable(value="id") long id) {
        return new ResponseEntity((Object)this.impactSurvayService.findImpactById(id), HttpStatus.OK);
    }

    @DeleteMapping(value={"/deleteImpact/{id}"})
    public ResponseEntity<Boolean> deleteImpact(@PathVariable(value="id") long id) {
        this.impactSurvayService.removeImpact(id);
        return new ResponseEntity((Object)true, HttpStatus.OK);
    }

    @PutMapping(value={"/updateImpact"})
    public ResponseEntity<ImpactSurvayDto> updateImpact(@RequestBody ImpactSurvayDto impactSurvayDto) {
        return new ResponseEntity((Object)this.impactSurvayService.updateImpact(impactSurvayDto), HttpStatus.OK);
    }

    @GetMapping(value={"/retrieveAllImpact/{empId}"})
    public ResponseEntity<List<ImpactSurvayDto>> findAllImpactEmpId(@PathVariable(value="empId") Long empId) {
        return new ResponseEntity((Object)this.impactSurvayService.findAllImpactBYEmpId(empId), HttpStatus.OK);
    }

    @GetMapping(value={"/retrieveImpactlist"})
    public ResponseEntity<List<ImpactSurvayDto>> findAllByPageId(@RequestParam(value="pageId", required=false) String pageId, @RequestParam(value="dateRange", required=false) String dateRange, HttpServletRequest request) throws RequestException {
        List eventlist = this.impactSurvayService.findByAllPageId(Long.parseLong(pageId), dateRange);
        return new ResponseEntity((Object)eventlist, HttpStatus.OK);
    }

    @GetMapping(value={"/allImpactList/{empId}"})
    public ResponseEntity<List<ImpactSurvayDto>> allImpactListData(@PathVariable(value="empId") String empId, @RequestParam(value="pageId", required=false) String pageId) throws RequestException {
        return new ResponseEntity((Object)this.impactSurvayService.allImpactListData(empId, pageId), HttpStatus.OK);
    }

    @GetMapping(value={"/impactSurvayDeptids"})
    public ResponseEntity<List<ImpactSurvayDto>> impactListWithDeptids(@RequestParam(value="deptIds", required=false) String deptIds) throws RequestException {
        return new ResponseEntity((Object)this.impactSurvayService.impactListWithDeptids(deptIds), HttpStatus.OK);
    }

    @GetMapping(value={"/impactCriticalCount"})
    public ResponseEntity<List<ImpactCrticalCountDTO>> impactListWithPageIds(@RequestParam(value="pageIds", required=false) String pageIds, @RequestParam(value="dateRange", required=false) String dateRange) throws RequestException {
        return new ResponseEntity((Object)this.impactSurvayService.impactListWithPageIds(pageIds, dateRange), HttpStatus.OK);
    }
}

