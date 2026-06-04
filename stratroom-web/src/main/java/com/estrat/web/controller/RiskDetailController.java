/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.controller.RiskDetailController
 *  com.estrat.web.dto.RiskCauseAndConsequenceDTO
 *  com.estrat.web.dto.RiskConsequenceDTO
 *  com.estrat.web.dto.RiskCustomScoreDto
 *  com.estrat.web.dto.RiskDTO
 *  com.estrat.web.dto.RiskDashBoardResponseDTO
 *  com.estrat.web.dto.RiskEventDTO
 *  com.estrat.web.dto.RiskEventNameCountDto
 *  com.estrat.web.dto.RiskOptionsDto
 *  com.estrat.web.dto.RiskResponseDTO
 *  com.estrat.web.dto.RiskStatusCountDto
 *  com.estrat.web.exception.RequestException
 *  com.estrat.web.service.RiskDetailsService
 *  com.estrat.web.service.StagingChangeService
 *  com.estrat.web.util.RequestSessionUtil
 *  com.estrat.web.util.RiskEventReaderUtil
 *  com.estrat.web.util.RiskReaderUtil
 *  com.estrat.web.util.UserThreadLocal
 *  javax.servlet.http.HttpServletRequest
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.core.io.ByteArrayResource
 *  org.springframework.http.HttpStatus
 *  org.springframework.http.ResponseEntity
 *  org.springframework.web.bind.annotation.DeleteMapping
 *  org.springframework.web.bind.annotation.GetMapping
 *  org.springframework.web.bind.annotation.PathVariable
 *  org.springframework.web.bind.annotation.PostMapping
 *  org.springframework.web.bind.annotation.PutMapping
 *  org.springframework.web.bind.annotation.RequestBody
 *  org.springframework.web.bind.annotation.RequestMapping
 *  org.springframework.web.bind.annotation.RequestMethod
 *  org.springframework.web.bind.annotation.RequestParam
 *  org.springframework.web.bind.annotation.RestController
 *  org.springframework.web.context.request.WebRequest
 *  org.springframework.web.multipart.MultipartFile
 */
package com.estrat.web.controller;

import com.estrat.web.dto.RiskCauseAndConsequenceDTO;
import com.estrat.web.dto.RiskConsequenceDTO;
import com.estrat.web.dto.RiskCustomScoreDto;
import com.estrat.web.dto.RiskDTO;
import com.estrat.web.dto.RiskDashBoardResponseDTO;
import com.estrat.web.dto.RiskEventDTO;
import com.estrat.web.dto.RiskEventNameCountDto;
import com.estrat.web.dto.RiskOptionsDto;
import com.estrat.web.dto.RiskResponseDTO;
import com.estrat.web.dto.RiskStatusCountDto;
import com.estrat.web.exception.RequestException;
import com.estrat.web.service.RiskDetailsService;
import com.estrat.web.service.StagingChangeService;
import com.estrat.web.util.RequestSessionUtil;
import com.estrat.web.util.RiskEventReaderUtil;
import com.estrat.web.util.RiskReaderUtil;
import com.estrat.web.util.UserThreadLocal;
import java.text.ParseException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class RiskDetailController {
    @Autowired
    private RiskDetailsService riskDetailsService;
    @Autowired
    private RiskReaderUtil riskReaderUtil;
    @Autowired
    private RiskEventReaderUtil riskEventReaderUtil;
    @Autowired
    protected RequestSessionUtil sessionUtil;
    @Autowired
    protected StagingChangeService stagingChangeService;

    @PostMapping(value={"/risk"})
    public ResponseEntity<RiskResponseDTO> saveRiskDetails(@RequestBody RiskDTO riskDTO, HttpServletRequest request) throws RequestException {
        riskDTO.setCreatedBy(Long.parseLong(UserThreadLocal.get().getProfile().getEmpId()));
        return new ResponseEntity(this.riskDetailsService.saveRisk(riskDTO), HttpStatus.OK);
    }

    @PutMapping(value={"/risk"})
    public ResponseEntity<RiskResponseDTO> updateRiskDetails(@RequestBody RiskDTO riskDTO, HttpServletRequest request) throws RequestException {
        riskDTO.setUpdatedBy(Long.parseLong(UserThreadLocal.get().getProfile().getEmpId()));
        return new ResponseEntity(this.riskDetailsService.updateRisk(riskDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/risk/{id}"})
    public ResponseEntity<?> getRiskDetailsById(@PathVariable(value="id") Long id, @RequestParam(value="loadFlag", required=false) String loadFlag, @RequestParam(value="riskType", required=false) String riskType) throws RequestException {
        boolean flag = loadFlag != null ? Boolean.valueOf(loadFlag) : false;
        return new ResponseEntity(this.riskDetailsService.retrieveRiskDetails(id, flag), HttpStatus.OK);
    }

    @DeleteMapping(value={"/risk/{id}"})
    public ResponseEntity<Boolean> deleteRiskDetailsById(@PathVariable(value="id") Long id) throws RequestException {
        this.riskDetailsService.removeRiskDetails(id);
        return new ResponseEntity(true, HttpStatus.OK);
    }

    @GetMapping(value={"/riskList/{empId}"})
    public ResponseEntity<List<RiskDTO>> findAll(@PathVariable(value="empId") String empId, @RequestParam(value="pageId", required=false) String pageId, @RequestParam(value="dateRange", required=false) String dateRange, @RequestParam(value="type", required=false) String type) throws RequestException {
        String typebase = type != null ? type : "Draft";
        List riskDTOList = this.riskDetailsService.findAll(empId, pageId, dateRange, typebase);
        return new ResponseEntity(riskDTOList, HttpStatus.OK);
    }

    @GetMapping(value={"/riskListView"})
    public ResponseEntity<List<RiskDTO>> findAllView(@RequestParam(value="pageId", required=false) String pageId, @RequestParam(value="dateRange", required=false) String dateRange, @RequestParam(value="type", required=false) String type) throws RequestException {
        String typebase = type != null ? type : "Draft";
        List riskDTOList = this.riskDetailsService.findAllView(pageId, dateRange, typebase);
        return new ResponseEntity(riskDTOList, HttpStatus.OK);
    }

    @GetMapping(value={"/kpi/riskList/{kpiId}"})
    public ResponseEntity<List<RiskDTO>> impactedRiskDetails(@PathVariable(value="kpiId") long kpiId) throws RequestException {
        List riskDTOList = this.riskDetailsService.findImpactedRiskDetails(kpiId);
        return new ResponseEntity(riskDTOList, HttpStatus.OK);
    }

    @GetMapping(value={"/riskTableList"})
    public ResponseEntity<List<Map>> findAll(HttpServletRequest request) throws RequestException {
        List riskDataList = this.riskDetailsService.findAllRiskDetailsByTableFormat(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue());
        return new ResponseEntity(riskDataList, HttpStatus.OK);
    }

    @GetMapping(value={"/riskListByDeptId/{deptId}"})
    public ResponseEntity<List<RiskDTO>> riskListByDeptId(@PathVariable(value="deptId") long deptId) throws RequestException {
        List responseRiskDTOList = this.riskDetailsService.riskListByDeptId(deptId);
        return new ResponseEntity(responseRiskDTOList, HttpStatus.OK);
    }

    @GetMapping(value={"/riskListWithChild"})
    public ResponseEntity<List<RiskDTO>> riskListWithChild(@RequestParam(value="riskIds", required=false) String riskIds, @RequestParam(value="dateRange", required=false) String dateRange, HttpServletRequest request) throws RequestException {
        return new ResponseEntity(this.riskDetailsService.riskListWithChild(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue(), riskIds, dateRange), HttpStatus.OK);
    }

    @GetMapping(value={"/riskHeadListWithChild"})
    public ResponseEntity<List<RiskDTO>> riskHeadListWithChild(@RequestParam(value="riskIds", required=false) String riskIds, @RequestParam(value="dateRange", required=false) String dateRange, @RequestParam(value="limit", required=false) int limit, HttpServletRequest request) throws RequestException {
        return new ResponseEntity(this.riskDetailsService.riskHeadListWithChild(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue(), riskIds, limit, dateRange), HttpStatus.OK);
    }

    @RequestMapping(value={"/saveBulkRiskDetails"}, method={RequestMethod.POST})
    public ResponseEntity<Map> importRiskFormulation(WebRequest webRequest, @RequestParam(value="riskData", required=true) MultipartFile riskData, @RequestParam(value="type", required=false) String type) {
        String message = "No Records Processed";
        Map mapValue = new HashMap();
        try {
            mapValue = this.riskReaderUtil.importRisk(riskData.getInputStream(), type);
        }
        catch (Exception e) {
            mapValue.put("message", message);
            return new ResponseEntity(mapValue, HttpStatus.OK);
        }
        return new ResponseEntity(mapValue, HttpStatus.OK);
    }

    @GetMapping(value={"/downloadRiskDetails/{empId}"})
    public ResponseEntity<ByteArrayResource> downloadRiskDetails(@PathVariable(value="empId") String empId, @RequestParam(value="pageId", required=false) String pageId, @RequestParam(value="dateRange", required=false) String dateRange, HttpServletRequest request) throws Exception {
        List riskDTOList = this.riskDetailsService.allRiskList(empId, pageId, dateRange);
        return this.riskReaderUtil.writeDocForRiskDetails(riskDTOList);
    }

    @GetMapping(value={"/riskoptionlist"})
    public ResponseEntity<List<RiskOptionsDto>> riskoptionlist(HttpServletRequest request) throws RequestException {
        List responseRiskDTOList = this.riskDetailsService.riskOptionsList();
        return new ResponseEntity(responseRiskDTOList, HttpStatus.OK);
    }

    @GetMapping(value={"/riskhistorylist"})
    public ResponseEntity<List<RiskDTO>> riskHistoryList(@RequestParam(value="riskId", required=false) Long riskId, @RequestParam(value="version", required=false) Long version) throws RequestException {
        return new ResponseEntity(this.riskDetailsService.riskHistoryList(riskId, version), HttpStatus.OK);
    }

    @GetMapping(value={"/riskcustomscore"})
    public ResponseEntity<List<RiskCustomScoreDto>> riskcustomscorelist() throws RequestException {
        List responseRiskDTOList = this.riskDetailsService.riskCustomScoreList();
        return new ResponseEntity(responseRiskDTOList, HttpStatus.OK);
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
        return new ResponseEntity(true, HttpStatus.OK);
    }

    @GetMapping(value={"/riskeventlist"})
    public ResponseEntity<List<RiskEventDTO>> riskgetevent(@RequestParam(value="pageId", required=false) String pageId, @RequestParam(value="dateRange", required=false) String dateRange, @RequestParam(value="status", required=false) String status, HttpServletRequest request) throws RequestException {
        List eventlist = this.riskDetailsService.findByEventPageId(Long.parseLong(pageId.trim()), dateRange, status);
        return new ResponseEntity(eventlist, HttpStatus.OK);
    }

    @GetMapping(value={"/riskeventbyid"})
    public ResponseEntity<RiskEventDTO> riskeventbyid(@RequestParam(value="eventId", required=false) String eventId, HttpServletRequest request) throws RequestException {
        RiskEventDTO eventlist = this.riskDetailsService.findByEventId(Long.parseLong(eventId));
        return new ResponseEntity(eventlist, HttpStatus.OK);
    }

    @RequestMapping(value={"/saveRiskEvent"}, method={RequestMethod.POST})
    public ResponseEntity<Map> saveRiskEvent(WebRequest webRequest, @RequestParam(value="riskevent", required=true) MultipartFile riskevent, @RequestParam(value="type", required=false) String type, @RequestParam(value="pageId", required=true) String pageId) {
        String Message = "No Records Processed";
        Map mapValue = new HashMap();
        try {
            mapValue = this.riskEventReaderUtil.readBulkRiskEventDetails(riskevent.getInputStream(), type, Long.valueOf(Long.parseLong(pageId.trim())));
        }
        catch (Exception e) {
            e.printStackTrace();
            mapValue.put("message", Message);
            return new ResponseEntity(mapValue, HttpStatus.OK);
        }
        return new ResponseEntity(mapValue, HttpStatus.OK);
    }

    @GetMapping(value={"/riskListByEmpId"})
    public ResponseEntity<List<RiskDTO>> findAllBYempId(@RequestParam(value="dateRange", required=false) String dateRange, HttpServletRequest request) throws RequestException {
        List riskDTOList = this.riskDetailsService.findAllRiskDetailsByEmpId(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue(), dateRange);
        return new ResponseEntity(riskDTOList, HttpStatus.OK);
    }

    @GetMapping(value={"/riskCodeListByEmpId"})
    public ResponseEntity<List<RiskDTO>> riskCodeList(@RequestParam(value="dateRange", required=false) String dateRange, HttpServletRequest request) throws RequestException {
        List riskDTOList = this.riskDetailsService.riskCodeList(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue(), dateRange);
        return new ResponseEntity(riskDTOList, HttpStatus.OK);
    }

    @GetMapping(value={"/riskEventListWithChild"})
    public ResponseEntity<List<RiskEventDTO>> riskEventListWithChild(@RequestParam(value="pageIds", required=false) String pageIds, @RequestParam(value="dateRange", required=false) String dateRange, HttpServletRequest request) throws RequestException {
        return new ResponseEntity(this.riskDetailsService.riskEventListWithChild(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue(), pageIds, dateRange), HttpStatus.OK);
    }

    @GetMapping(value={"/riskEventListWithDeptids"})
    public ResponseEntity<List<RiskEventDTO>> riskEventListWithDeptids(@RequestParam(value="deptIds", required=false) String deptIds) throws RequestException {
        return new ResponseEntity(this.riskDetailsService.riskEventListWithDeptids(deptIds), HttpStatus.OK);
    }

    @GetMapping(value={"/riskStatusCountwithPageId"})
    public ResponseEntity<List<RiskStatusCountDto>> riskstatuscount(@RequestParam(value="pageIds", required=false) String pageIds, @RequestParam(value="dateRange", required=false) String dateRange) {
        List statusCountDtos = this.riskDetailsService.statusCount(pageIds, dateRange);
        return new ResponseEntity(statusCountDtos, HttpStatus.OK);
    }

    @GetMapping(value={"/ermRiskListWithChild"})
    public ResponseEntity<List<RiskDTO>> ermRiskListWithChild(@RequestParam(value="pageIds", required=false) String pageIds, @RequestParam(value="limit", required=false) int limit, @RequestParam(value="dateRange", required=false) String dateRange, HttpServletRequest request) throws RequestException {
        return new ResponseEntity(this.riskDetailsService.ermRiskListWithChild(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue(), pageIds, limit, dateRange), HttpStatus.OK);
    }

    @GetMapping(value={"/riskEventFrequencyCount"})
    public ResponseEntity<List<RiskEventNameCountDto>> getRiskEventById(@RequestParam(value="pageIds", required=false) String pageIds, @RequestParam(value="dateRange", required=false) String dateRange, @RequestParam(value="limit", required=false) String limit) throws RequestException, ParseException {
        System.out.println("PageId=>" + pageIds);
        List riskDTOS = this.riskDetailsService.findRiskEventFreCountList(pageIds, dateRange, limit);
        return new ResponseEntity(riskDTOS, HttpStatus.OK);
    }

    @GetMapping(value={"/riskEventhistorylist"})
    public ResponseEntity<List<RiskEventDTO>> riskEventHistoryList(@RequestParam(value="eventId", required=false) Long eventId, @RequestParam(value="version", required=false) Long version) throws RequestException {
        return new ResponseEntity(this.riskDetailsService.riskEventHistoryList(eventId, version), HttpStatus.OK);
    }

    @GetMapping(value={"/riskDashBoardData"})
    public ResponseEntity<RiskDashBoardResponseDTO> riskDashBoardData(@RequestParam(value="deptId", required=false) String deptId, HttpServletRequest request) throws RequestException {
        RiskDashBoardResponseDTO eventlist = this.riskDetailsService.riskDashBoardData(Long.parseLong(deptId));
        HashMap<String, Integer> likelihoodCount = new HashMap<String, Integer>();
        for (Object _obj_risk : eventlist.getRiskDTO()) {
            RiskDTO risk = (RiskDTO) _obj_risk;
            for (Object _obj_causes : risk.getRiskCauseAndConsequenceList()) {
                RiskCauseAndConsequenceDTO causes = (RiskCauseAndConsequenceDTO) _obj_causes;
                for (Object _obj_Consequence : causes.getConsequenceList()) {
                    RiskConsequenceDTO Consequence = (RiskConsequenceDTO) _obj_Consequence;
                    if (Consequence.getConsequenceValue().get("score") == null) continue;
                    String likelihood = Consequence.getConsequenceValue().get("score").toString();
                    likelihood = likelihood == null || likelihood.trim().isEmpty() ? "UNKNOWN" : likelihood;
                    likelihoodCount.put(likelihood, likelihoodCount.getOrDefault(likelihood, 0) + 1);
                }
            }
        }
        eventlist.setLikelihoodCount(likelihoodCount);
        return new ResponseEntity(eventlist, HttpStatus.OK);
    }
}

