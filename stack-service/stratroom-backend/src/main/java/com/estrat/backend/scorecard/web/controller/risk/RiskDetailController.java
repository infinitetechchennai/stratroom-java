/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.scorecard.dto.RiskCustomScoreDto
 *  com.estrat.backend.scorecard.dto.RiskDTO
 *  com.estrat.backend.scorecard.dto.RiskDashBoardResponseDTO
 *  com.estrat.backend.scorecard.dto.RiskEventDTO
 *  com.estrat.backend.scorecard.dto.RiskEventNameCountDto
 *  com.estrat.backend.scorecard.dto.RiskOptionsDto
 *  com.estrat.backend.scorecard.dto.RiskResponseDTO
 *  com.estrat.backend.scorecard.exception.RequestException
 *  com.estrat.backend.scorecard.service.RiskDetailsService
 *  com.estrat.backend.scorecard.web.controller.risk.RiskDetailController
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
package com.estrat.backend.scorecard.web.controller.risk;

import com.estrat.backend.scorecard.dto.RiskCustomScoreDto;
import com.estrat.backend.scorecard.dto.RiskDTO;
import com.estrat.backend.scorecard.dto.RiskDashBoardResponseDTO;
import com.estrat.backend.scorecard.dto.RiskEventDTO;
import com.estrat.backend.scorecard.dto.RiskEventNameCountDto;
import com.estrat.backend.scorecard.dto.RiskOptionsDto;
import com.estrat.backend.scorecard.dto.RiskResponseDTO;
import com.estrat.backend.scorecard.exception.RequestException;
import com.estrat.backend.scorecard.service.RiskDetailsService;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.text.ParseException;
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
public class RiskDetailController {
    @Autowired
    private RiskDetailsService riskDetailsService;

    @PostMapping(value={"/risk"})
    public ResponseEntity<RiskResponseDTO> saveRiskDetails(@RequestBody RiskDTO riskDTO) throws RequestException {
        return new ResponseEntity((Object)this.riskDetailsService.saveRisk(riskDTO), HttpStatus.OK);
    }

    @PutMapping(value={"/risk"})
    public ResponseEntity<RiskResponseDTO> updateRiskDetails(@RequestBody RiskDTO riskDTO) throws RequestException {
        return new ResponseEntity((Object)this.riskDetailsService.updateRisk(riskDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/risk/{id}"})
    public ResponseEntity<RiskDTO> getRiskDetailsById(@PathVariable(value="id") Long id, @RequestParam(value="loadFlag", required=false) String loadFlag) throws RequestException {
        boolean flag = loadFlag != null ? Boolean.valueOf(loadFlag) : false;
        return new ResponseEntity((Object)this.riskDetailsService.retrieveRiskDetails(id, flag), HttpStatus.OK);
    }

    @DeleteMapping(value={"/risk/{id}"})
    public ResponseEntity<Boolean> deleteRiskDetailsById(@PathVariable(value="id") Long id) throws RequestException {
        this.riskDetailsService.removeRiskDetails(id);
        return new ResponseEntity((Object)true, HttpStatus.OK);
    }

    @GetMapping(value={"/riskList/{empId}"})
    public ResponseEntity<List<RiskDTO>> findAll(@PathVariable(value="empId") long empId, @RequestParam(value="pageId", required=false) String pageId, @RequestParam(value="dateRange", required=false) String dateRange, @RequestParam(value="type", required=false) String type) throws RequestException {
        List riskDTOList = this.riskDetailsService.findAll(empId, pageId, dateRange, type);
        return new ResponseEntity((Object)riskDTOList, HttpStatus.OK);
    }

    @GetMapping(value={"/riskListView"})
    public ResponseEntity<List<RiskDTO>> findAllView(@RequestParam(value="pageId", required=false) String pageId, @RequestParam(value="dateRange", required=false) String dateRange, @RequestParam(value="type", required=false) String type) throws RequestException {
        List riskDTOList = this.riskDetailsService.findAllView(pageId, dateRange, type);
        return new ResponseEntity((Object)riskDTOList, HttpStatus.OK);
    }

    @GetMapping(value={"/riskListByEmpId/{empId}"})
    public ResponseEntity<List<RiskDTO>> findAllByEmpId(@PathVariable(value="empId") long empId, @RequestParam(value="dateRange", required=false) String dateRange) throws RequestException {
        List riskDTOList = this.riskDetailsService.findAllByEmpId(empId, dateRange);
        return new ResponseEntity((Object)riskDTOList, HttpStatus.OK);
    }

    @GetMapping(value={"/riskCodeListByEmpId/{empId}"})
    public ResponseEntity<List<RiskDTO>> riskCodeList(@PathVariable(value="empId") long empId, @RequestParam(value="dateRange", required=false) String dateRange) throws RequestException {
        List riskDTOList = this.riskDetailsService.riskCodeList(empId, dateRange);
        return new ResponseEntity((Object)riskDTOList, HttpStatus.OK);
    }

    @GetMapping(value={"/kpi/riskList/{kpiId}"})
    public ResponseEntity<List<RiskDTO>> impactedRiskDetails(@PathVariable(value="kpiId") long kpiId) throws RequestException {
        List riskDTOList = this.riskDetailsService.findImpactedRiskDetails(kpiId);
        return new ResponseEntity((Object)riskDTOList, HttpStatus.OK);
    }

    @GetMapping(value={"/riskListByDeptId/{deptId}"})
    public ResponseEntity<List<RiskDTO>> riskListByDeptId(@PathVariable(value="deptId") long deptId) throws RequestException {
        List responseRiskDTOList = this.riskDetailsService.riskListByDeptId(deptId);
        return new ResponseEntity((Object)responseRiskDTOList, HttpStatus.OK);
    }

    @GetMapping(value={"/riskListWithChild/{empId}"})
    public ResponseEntity<List<RiskDTO>> riskListWithChild(@PathVariable(value="empId") long empId, @RequestParam(value="riskIds", required=false) String riskIds, @RequestParam(value="dateRange", required=false) String dateRange) throws RequestException {
        return new ResponseEntity((Object)this.riskDetailsService.riskListWithChild(empId, riskIds, dateRange), HttpStatus.OK);
    }

    @GetMapping(value={"/allRiskList/{empId}"})
    public ResponseEntity<List<RiskDTO>> allRiskList(@PathVariable(value="empId") long empId, @RequestParam(value="pageId", required=false) String pageId, @RequestParam(value="dateRange", required=false) String dateRange) throws RequestException {
        List riskDTOList = this.riskDetailsService.allRiskList(empId, pageId, dateRange);
        return new ResponseEntity((Object)riskDTOList, HttpStatus.OK);
    }

    @GetMapping(value={"/riskhistorylist"})
    public ResponseEntity<List<RiskDTO>> riskHistoryList(@RequestParam(value="riskId", required=false) Long riskId, @RequestParam(value="version", required=false) Long version) throws RequestException {
        return new ResponseEntity((Object)this.riskDetailsService.riskHistoryList(riskId, version), HttpStatus.OK);
    }

    @GetMapping(value={"/riskoptionlist"})
    public ResponseEntity<List<RiskOptionsDto>> riskoptionlist() throws RequestException {
        List responseRiskDTOList = this.riskDetailsService.riskOptionsList();
        return new ResponseEntity((Object)responseRiskDTOList, HttpStatus.OK);
    }

    @GetMapping(value={"/riskcustomscore"})
    public ResponseEntity<List<RiskCustomScoreDto>> riskcustomscorelist() throws RequestException {
        List responseRiskDTOList = this.riskDetailsService.riskCustomScoreList();
        return new ResponseEntity((Object)responseRiskDTOList, HttpStatus.OK);
    }

    @PostMapping(value={"/riskoptions"})
    public ResponseEntity<?> riskoptionsadd(@RequestBody RiskOptionsDto riskDTO, HttpServletRequest request) throws RequestException {
        return this.riskDetailsService.riskOptions(riskDTO);
    }

    @PutMapping(value={"/riskcustomscore"})
    public ResponseEntity<?> riskcustomscore(@RequestBody RiskCustomScoreDto riskDTO, HttpServletRequest request) throws RequestException {
        return this.riskDetailsService.riskCustomScore(riskDTO);
    }

    @PostMapping(value={"/riskevent"})
    public ResponseEntity<?> riskeventadd(@RequestBody RiskEventDTO riskDTO, HttpServletRequest request) throws RequestException {
        return this.riskDetailsService.riskeventadd(riskDTO);
    }

    @PutMapping(value={"/riskevent"})
    public ResponseEntity<?> riskeventupdate(@RequestBody RiskEventDTO riskDTO, HttpServletRequest request) throws RequestException {
        return this.riskDetailsService.riskeventput(riskDTO);
    }

    @DeleteMapping(value={"/riskevent"})
    public ResponseEntity<Boolean> riskeventdelete(@RequestParam(value="pageId", required=false) String pageId, @RequestParam(value="eventId", required=false) String eventId, HttpServletRequest request) throws RequestException {
        this.riskDetailsService.deleteEvent(eventId);
        return new ResponseEntity((Object)true, HttpStatus.OK);
    }

    @GetMapping(value={"/riskeventlist"})
    public ResponseEntity<List<RiskEventDTO>> riskgetevent(@RequestParam(value="pageId", required=false) String pageId, @RequestParam(value="dateRange", required=false) String dateRange, @RequestParam(value="status", required=false) String status, HttpServletRequest request) throws RequestException {
        List eventlist = this.riskDetailsService.findByEventPageId(Long.parseLong(pageId), dateRange, status);
        return new ResponseEntity((Object)eventlist, HttpStatus.OK);
    }

    @GetMapping(value={"/riskeventbyid"})
    public ResponseEntity<RiskEventDTO> riskgeteventid(@RequestParam(value="eventId", required=false) String pageIds, HttpServletRequest request) throws RequestException {
        RiskEventDTO eventlist = this.riskDetailsService.findByEventId(Long.parseLong(pageIds));
        return new ResponseEntity((Object)eventlist, HttpStatus.OK);
    }

    @GetMapping(value={"/riskEventListWithChild/{empId}"})
    public ResponseEntity<List<RiskEventDTO>> riskEventListWithChild(@PathVariable(value="empId") long empId, @RequestParam(value="pageIds", required=false) String pageIds, @RequestParam(value="dateRange", required=false) String dateRange) throws RequestException {
        return new ResponseEntity((Object)this.riskDetailsService.riskEventListWithChild(empId, pageIds, dateRange), HttpStatus.OK);
    }

    @GetMapping(value={"/riskEventListWithDeptids"})
    public ResponseEntity<List<RiskEventDTO>> riskEventListWithDeptids(@RequestParam(value="deptIds", required=false) String deptIds) throws RequestException {
        return new ResponseEntity((Object)this.riskDetailsService.riskEventListWithDeptids(deptIds), HttpStatus.OK);
    }

    @GetMapping(value={"/riskStatusCountwithPageId"})
    public ResponseEntity<List<RiskDTO>> riskstatuscount(@RequestParam(value="pageIds", required=false) String pageIds, @RequestParam(value="dateRange", required=false) String dateRange) throws RequestException, UnsupportedEncodingException {
        dateRange = URLDecoder.decode(dateRange, StandardCharsets.UTF_8.name());
        System.out.println("RiskStatusCount :: " + dateRange);
        List statusCountDtos = this.riskDetailsService.statusCount(pageIds, dateRange);
        return new ResponseEntity((Object)statusCountDtos, HttpStatus.OK);
    }

    @GetMapping(value={"/ermRiskListWithChild/{empId}"})
    public ResponseEntity<List<RiskDTO>> ermRiskListWithChild(@PathVariable(value="empId") long empId, @RequestParam(value="pageIds", required=false) String pageIds, @RequestParam(value="dateRange", required=false) String dateRange) throws RequestException {
        return new ResponseEntity((Object)this.riskDetailsService.ermRiskListWithChild(empId, pageIds, dateRange), HttpStatus.OK);
    }

    @GetMapping(value={"/riskEventFrequencyCount"})
    public ResponseEntity<List<RiskEventNameCountDto>> getRiskEventById(@RequestParam(value="pageIds", required=false) String pageIds, @RequestParam(value="dateRange", required=false) String dateRange, @RequestParam(value="limit", required=false) String limit) throws RequestException, ParseException {
        System.out.println("PageId=>" + pageIds);
        List riskDTOS = this.riskDetailsService.findRiskEventFreCountList(pageIds, dateRange, limit);
        return new ResponseEntity((Object)riskDTOS, HttpStatus.OK);
    }

    @GetMapping(value={"/riskEventhistorylist"})
    public ResponseEntity<List<RiskEventDTO>> riskEventHistoryList(@RequestParam(value="eventId", required=false) Long eventId, @RequestParam(value="version", required=false) Long version) throws RequestException {
        return new ResponseEntity((Object)this.riskDetailsService.riskEventHistoryList(eventId, version), HttpStatus.OK);
    }

    @GetMapping(value={"/riskDashBoardData"})
    public ResponseEntity<RiskDashBoardResponseDTO> riskDashBoardData(@RequestParam(value="deptId", required=false) String deptId, HttpServletRequest request) throws RequestException {
        RiskDashBoardResponseDTO eventlist = this.riskDetailsService.riskDashBoardData(Long.parseLong(deptId));
        return new ResponseEntity((Object)eventlist, HttpStatus.OK);
    }
}

