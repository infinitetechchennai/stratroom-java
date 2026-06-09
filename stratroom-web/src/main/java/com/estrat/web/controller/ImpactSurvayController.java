/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.controller.ImpactSurvayController
 *  com.estrat.web.dto.ImpactCrticalCountDTO
 *  com.estrat.web.dto.ImpactSurvayDto
 *  com.estrat.web.exception.RequestException
 *  com.estrat.web.service.ImpactSurvayService
 *  com.estrat.web.util.ImpactSurveyReaderUtil
 *  com.estrat.web.util.RequestSessionUtil
 *  com.estrat.web.util.UserThreadLocal
 *  javax.servlet.http.HttpServletRequest
 *  javax.servlet.http.HttpServletResponse
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

import com.estrat.web.dto.ImpactCrticalCountDTO;
import com.estrat.web.dto.ImpactSurvayDto;
import com.estrat.web.exception.RequestException;
import com.estrat.web.service.ImpactSurvayService;
import com.estrat.web.util.ImpactSurveyReaderUtil;
import com.estrat.web.util.RequestSessionUtil;
import com.estrat.web.util.UserThreadLocal;
import java.util.ArrayList;
import java.util.List;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
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
    @Autowired
    protected RequestSessionUtil sessionUtil;
    @Autowired
    protected ImpactSurveyReaderUtil impactReaderUtil;

    @PostMapping(value={"/saveImpact"})
    public ResponseEntity<ImpactSurvayDto> saveProcessEnabler(@RequestBody ImpactSurvayDto impactSurvayDto, HttpServletRequest request) throws RequestException {
        impactSurvayDto.setCreateBy(Long.valueOf(Long.parseLong(UserThreadLocal.get().getProfile().getEmpId())));
        return new ResponseEntity(this.impactSurvayService.saveImpact(impactSurvayDto), HttpStatus.OK);
    }

    @GetMapping(value={"/retriveImpact"})
    public ResponseEntity<List<ImpactSurvayDto>> findAllImpact() {
        return new ResponseEntity(this.impactSurvayService.findAllImpact(), HttpStatus.OK);
    }

    @GetMapping(value={"/retriveImpactId/{id}"})
    public ResponseEntity<ImpactSurvayDto> findImpactId(@PathVariable(value="id") long id) {
        return new ResponseEntity(this.impactSurvayService.findImpactById(id), HttpStatus.OK);
    }

    @DeleteMapping(value={"/deleteImpact/{id}"})
    public ResponseEntity<Boolean> deleteImpact(@PathVariable(value="id") long id) {
        this.impactSurvayService.removeImpact(id);
        return new ResponseEntity(true, HttpStatus.OK);
    }

    @PutMapping(value={"/updateImpact"})
    public ResponseEntity<ImpactSurvayDto> updateImpact(@RequestBody ImpactSurvayDto impactSurvayDto, HttpServletRequest request) {
        impactSurvayDto.setUpdateBy(Long.valueOf(Long.parseLong(UserThreadLocal.get().getProfile().getEmpId())));
        return new ResponseEntity(this.impactSurvayService.updateImpact(impactSurvayDto), HttpStatus.OK);
    }

    @GetMapping(value={"/retrieveAllImpact/{empId}"})
    public ResponseEntity<List<ImpactSurvayDto>> findAllImpactEmpId(@PathVariable(value="empId") Long empId) {
        return new ResponseEntity(this.impactSurvayService.findAllImpactBYEmpId(empId), HttpStatus.OK);
    }

    @GetMapping(value={"/retrieveImpactlist"})
    public ResponseEntity<List<ImpactSurvayDto>> findAllByPageId(@RequestParam(value="pageId", required=false) String pageId, @RequestParam(value="dateRange", required=false) String dateRange, HttpServletRequest request) throws RequestException {
        List eventlist = this.impactSurvayService.findByAllPageId(Long.parseLong(pageId), dateRange);
        return new ResponseEntity(eventlist, HttpStatus.OK);
    }

    @GetMapping(value={"/downloadImpactDetails"})
    public ResponseEntity<?> downloadImpactDetails(@RequestParam(value="pageId", required=false) String pageId, @RequestParam(value="type", required=false) String type, HttpServletRequest request, HttpServletResponse response) throws Exception {
        List impactDTOList = new ArrayList();
        System.out.println("Type==>" + type);
        impactDTOList = this.impactSurvayService.allImpactListData(this.sessionUtil.getSessionId(request), pageId);
        if (type.equalsIgnoreCase("pdf")) {
            return this.impactReaderUtil.writePdfForImpactSurvay(impactDTOList, response, "all");
        }
        if (type.equalsIgnoreCase("Csv")) {
            return this.impactReaderUtil.writeDocForImpactSurvay(impactDTOList);
        }
        return null;
    }

    @GetMapping(value={"/impactSurvayDeptids"})
    public ResponseEntity<List<ImpactSurvayDto>> impactListWithDeptids(@RequestParam(value="deptIds", required=false) String deptIds) throws RequestException {
        return new ResponseEntity(this.impactSurvayService.impactListWithDeptids(deptIds), HttpStatus.OK);
    }

    @GetMapping(value={"/impactCriticalCount"})
    public ResponseEntity<List<ImpactCrticalCountDTO>> impactListWithPageIds(@RequestParam(value="pageIds", required=false) String pageIds, @RequestParam(value="dateRange", required=false) String dateRange) throws RequestException {
        return new ResponseEntity(this.impactSurvayService.impactListWithPageIds(pageIds, dateRange), HttpStatus.OK);
    }
}

