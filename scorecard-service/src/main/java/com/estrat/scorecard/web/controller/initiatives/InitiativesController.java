/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.scorecard.dto.ActivitiesDTO
 *  com.estrat.scorecard.dto.InitiativeBudgetDTO
 *  com.estrat.scorecard.dto.InitiativeDashBoardResponseDTO
 *  com.estrat.scorecard.dto.InitiativeResponseDTO
 *  com.estrat.scorecard.dto.InitiativesDTO
 *  com.estrat.scorecard.dto.InitiativesTrackerDTO
 *  com.estrat.scorecard.dto.MilestonesDTO
 *  com.estrat.scorecard.dto.StatusCountDto
 *  com.estrat.scorecard.dto.SubInitiativesDTO
 *  com.estrat.scorecard.exception.RequestException
 *  com.estrat.scorecard.service.InitiativeService
 *  com.estrat.scorecard.util.KPIUtil
 *  com.estrat.scorecard.web.controller.initiatives.InitiativesController
 *  javax.servlet.http.HttpServletRequest
 *  org.apache.commons.collections4.CollectionUtils
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
package com.estrat.scorecard.web.controller.initiatives;

import com.estrat.scorecard.dto.ActivitiesDTO;
import com.estrat.scorecard.dto.InitiativeBudgetDTO;
import com.estrat.scorecard.dto.InitiativeDashBoardResponseDTO;
import com.estrat.scorecard.dto.InitiativeResponseDTO;
import com.estrat.scorecard.dto.InitiativesDTO;
import com.estrat.scorecard.dto.InitiativesTrackerDTO;
import com.estrat.scorecard.dto.MilestonesDTO;
import com.estrat.scorecard.dto.StatusCountDto;
import com.estrat.scorecard.dto.SubInitiativesDTO;
import com.estrat.scorecard.exception.RequestException;
import com.estrat.scorecard.service.InitiativeService;
import com.estrat.scorecard.util.KPIUtil;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.commons.collections4.CollectionUtils;
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
public class InitiativesController {
    @Autowired
    protected InitiativeService initiativesService;
    @Autowired
    private KPIUtil kpiUtil;

    @PostMapping(value={"/initiatives"})
    public ResponseEntity<InitiativeResponseDTO> saveInitiativesDetails(@RequestBody InitiativesDTO initiativesDTO) throws RequestException {
        return new ResponseEntity((Object)this.initiativesService.saveInitiatives(initiativesDTO), HttpStatus.OK);
    }

    @PostMapping(value={"/initiativestracker"})
    public ResponseEntity<Map<String, Object>> saveInitiativesTracker(@RequestBody List<InitiativesTrackerDTO> initiativesDTO, HttpServletRequest request) throws RequestException {
        String loggedInEmpId = request.getHeader("LOGGED_IN_EMPLOYEE_ID");
        Map initiativeResponseDTO = this.initiativesService.saveTracker(initiativesDTO);
        return new ResponseEntity((Object)initiativeResponseDTO, HttpStatus.OK);
    }

    @PostMapping(value={"/initiativesbudget"})
    public ResponseEntity<Map<String, Object>> saveInitiativesBudget(@RequestBody List<InitiativeBudgetDTO> initiativesDTO, HttpServletRequest request) throws RequestException {
        String loggedInEmpId = request.getHeader("LOGGED_IN_EMPLOYEE_ID");
        Map initiativeResponseDTO = this.initiativesService.saveBudget(initiativesDTO);
        return new ResponseEntity((Object)initiativeResponseDTO, HttpStatus.OK);
    }

    @PutMapping(value={"/initiatives"})
    public ResponseEntity<InitiativeResponseDTO> updateInitiativesDetails(@RequestBody InitiativesDTO initiativesDTO) throws RequestException {
        return new ResponseEntity((Object)this.initiativesService.updateInitiatives(initiativesDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/initiatives/{id}"})
    public ResponseEntity<InitiativesDTO> getInitiativesDetailsById(@PathVariable(value="id") Long id, @RequestParam(value="loadFlag", required=false) String loadFlag) throws RequestException {
        boolean flag = loadFlag != null ? Boolean.valueOf(loadFlag) : false;
        InitiativesDTO initiativesDTO = this.initiativesService.retriveInitiatives(id, flag);
        this.initiativesService.updateDaysDifference(initiativesDTO);
        double overallInitiativeProgress = 0.0;
        double roundProgress = 0.0;
        if (CollectionUtils.isNotEmpty((Collection)initiativesDTO.getSubInitiativeList())) {
            double totalSubInitiativeProgress = 0.0;
            int subInitiativeCount = 0;
            for (SubInitiativesDTO subInitiativesDTO : initiativesDTO.getSubInitiativeList()) {
                Map subInitiativeValue = subInitiativesDTO.getSubInitiativeValue();
                this.kpiUtil.updateStatus(subInitiativeValue, null);
                double subInitiativeProgress = 0.0;
                List activities = subInitiativesDTO.getActivitiesList();
                if (CollectionUtils.isNotEmpty((Collection)activities)) {
                    double totalProgress = 0.0;
                    int activityCount = 0;
                    for (ActivitiesDTO activity : (java.util.List<ActivitiesDTO>)activities) {
                        if (activity == null || activity.getActivitiesValue() == null) continue;
                        Object val = activity.getActivitiesValue().get("progress");
                        double activityProgress = val == null || "null".equalsIgnoreCase(val.toString()) || val.toString().isEmpty() ? 0.0 : Double.parseDouble(val.toString());
                        totalProgress += activityProgress;
                        ++activityCount;
                    }
                    if (activityCount > 0) {
                        subInitiativeProgress = totalProgress / (double)activityCount;
                    }
                }
                System.out.println("subInitiativeProgress ::" + subInitiativeProgress);
                double roundedSub = (double)Math.round(subInitiativeProgress * 100.0) / 100.0;
                System.out.println("roundedSub ::" + roundedSub);
                subInitiativeValue.put("progressval", String.valueOf(roundedSub));
                totalSubInitiativeProgress += subInitiativeProgress;
                ++subInitiativeCount;
            }
            if (subInitiativeCount > 0) {
                overallInitiativeProgress = totalSubInitiativeProgress / (double)subInitiativeCount;
            }
            roundProgress = (double)Math.round(overallInitiativeProgress * 100.0) / 100.0;
        }
        System.out.println("overallInitiativeProgress ::" + overallInitiativeProgress);
        System.out.println("overall roundoff :: " + roundProgress);
        if (initiativesDTO.getInitiativeValue().get("statusType") != null && initiativesDTO.getInitiativeValue().get("statusType").equals("weighted")) {
            initiativesDTO.getInitiativeValue().put("progressval", String.valueOf(roundProgress));
            if (Objects.isNull(initiativesDTO.getInitiativeValue().get("actualValue"))) {
                initiativesDTO.getInitiativeValue().put("actualValue", String.valueOf(roundProgress));
            } else if (initiativesDTO.getInitiativeValue().get("actualValue").equals("0")) {
                initiativesDTO.getInitiativeValue().put("actualValue", String.valueOf(roundProgress));
            } else {
                initiativesDTO.getInitiativeValue().put("progressval", initiativesDTO.getInitiativeValue().get("actualValue"));
            }
        }
        if (initiativesDTO.getInitiativeValue().get("statusType") != null && initiativesDTO.getInitiativeValue().get("statusType").equals("manual")) {
            if (Objects.isNull(initiativesDTO.getInitiativeValue().get("actualValue"))) {
                initiativesDTO.getInitiativeValue().put("actualValue", initiativesDTO.getInitiativeValue().get("progressval"));
            } else if (initiativesDTO.getInitiativeValue().get("actualValue").equals("0")) {
                initiativesDTO.getInitiativeValue().put("actualValue", initiativesDTO.getInitiativeValue().get("progressval"));
            } else {
                initiativesDTO.getInitiativeValue().put("progressval", initiativesDTO.getInitiativeValue().get("actualValue"));
            }
        }
        this.kpiUtil.buildInitiativeStatusData(initiativesDTO, null);
        if (CollectionUtils.isNotEmpty((Collection)initiativesDTO.getMileStonesList())) {
            for (MilestonesDTO milestonesDTO : initiativesDTO.getMileStonesList()) {
                this.kpiUtil.updateStatusByProgress(milestonesDTO.getMileStonesValue());
            }
        }
        return new ResponseEntity((Object)initiativesDTO, HttpStatus.OK);
    }

    @DeleteMapping(value={"/initiatives/{id}"})
    public ResponseEntity<Boolean> deleteInitiativesDetailsById(@PathVariable(value="id") Long id) throws RequestException {
        this.initiativesService.removeInitiatives(id);
        return new ResponseEntity((Object)true, HttpStatus.OK);
    }

    @GetMapping(value={"/initiativestatuscount/{id}"})
    public ResponseEntity<List<StatusCountDto>> initiativestatuscount(@PathVariable(value="id") long id, @RequestParam(value="period", required=false) String period) throws UnsupportedEncodingException {
        period = URLDecoder.decode(period, StandardCharsets.UTF_8.name());
        System.out.println("Status Count Period ::::  :::: " + period);
        List statusCountDtos = this.initiativesService.statusCount(Long.valueOf(id), period);
        return new ResponseEntity((Object)statusCountDtos, HttpStatus.OK);
    }

    @GetMapping(value={"/initiativeprogresscount/{id}"})
    public ResponseEntity<List<StatusCountDto>> initiativeprogresscount(@PathVariable(value="id") long id, @RequestParam(value="period", required=false) String period) throws UnsupportedEncodingException {
        period = URLDecoder.decode(period, StandardCharsets.UTF_8.name());
        System.out.println("Progress Count Period ::::  :::: " + period);
        List statusCountDtos = this.initiativesService.progresscount(Long.valueOf(id), period);
        return new ResponseEntity((Object)statusCountDtos, HttpStatus.OK);
    }

    @GetMapping(value={"/initiativenoprogresscount/{id}"})
    public ResponseEntity<List<StatusCountDto>> initiativenoprogresscount(@PathVariable(value="id") long id, @RequestParam(value="period", required=false) String period) throws UnsupportedEncodingException {
        period = URLDecoder.decode(period, StandardCharsets.UTF_8.name());
        System.out.println("NoProgress Count Period ::::  :::: " + period);
        List statusCountDtos = this.initiativesService.noprogresscount(Long.valueOf(id), period);
        return new ResponseEntity((Object)statusCountDtos, HttpStatus.OK);
    }

    @GetMapping(value={"/initiativesList/{empId}"})
    public ResponseEntity<List<InitiativesDTO>> findAll(@PathVariable(value="empId") long empId, @RequestParam(value="loadFlag", required=false) String loadFlag, @RequestParam(value="pageId", required=false) String pageId, @RequestParam(value="nodate", required=false) String nodate) throws RequestException {
        boolean flag = loadFlag != null ? Boolean.valueOf(loadFlag) : false;
        List initiativesDTOList = this.initiativesService.findAll(empId, flag, pageId, nodate);
        System.out.println("initive list");
        if (CollectionUtils.isNotEmpty((Collection)initiativesDTOList)) {
            for (InitiativesDTO initiativesDTO : (java.util.List<InitiativesDTO>)initiativesDTOList) {
                this.initiativesService.updateDaysDifference(initiativesDTO);
                double overallInitiativeProgress = 0.0;
                if (CollectionUtils.isNotEmpty((Collection)initiativesDTO.getSubInitiativeList())) {
                    double totalSubInitiativeProgress = 0.0;
                    int subInitiativeCount = 0;
                    for (SubInitiativesDTO subInitiativesDTO : initiativesDTO.getSubInitiativeList()) {
                        Map subInitiativeValue = subInitiativesDTO.getSubInitiativeValue();
                        this.kpiUtil.updateStatus(subInitiativeValue, null);
                        double subInitiativeProgress = 0.0;
                        List activities = subInitiativesDTO.getActivitiesList();
                        if (CollectionUtils.isNotEmpty((Collection)activities)) {
                            double totalProgress = 0.0;
                            int activityCount = 0;
                            for (ActivitiesDTO activity : (java.util.List<ActivitiesDTO>)activities) {
                                if (activity == null || activity.getActivitiesValue() == null) continue;
                                Object val = activity.getActivitiesValue().get("progress");
                                double activityProgress = val == null || "null".equalsIgnoreCase(val.toString()) || val.toString().isEmpty() ? 0.0 : Double.parseDouble(val.toString());
                                totalProgress += activityProgress;
                                ++activityCount;
                            }
                            System.out.println("totalProgress in ctivit : " + totalProgress);
                            System.out.println("activity count : " + activityCount);
                            if (activityCount > 0) {
                                subInitiativeProgress = totalProgress / (double)activityCount;
                            }
                        }
                        System.out.println("subInitiativeProgress ::" + subInitiativeProgress);
                        double roundedSub = (double)Math.round(subInitiativeProgress * 100.0) / 100.0;
                        System.out.println("after roun off :: " + roundedSub);
                        subInitiativeValue.put("progressval", String.valueOf(roundedSub));
                        if (subInitiativeProgress == 0.0) continue;
                        totalSubInitiativeProgress += subInitiativeProgress;
                        ++subInitiativeCount;
                    }
                    if (subInitiativeCount > 0) {
                        overallInitiativeProgress = totalSubInitiativeProgress / (double)subInitiativeCount;
                    }
                    overallInitiativeProgress = (double)Math.round(overallInitiativeProgress * 100.0) / 100.0;
                }
                if (initiativesDTO.getInitiativeValue().get("statusType") != null && initiativesDTO.getInitiativeValue().get("statusType").equals("weighted")) {
                    initiativesDTO.getInitiativeValue().put("progressval", String.valueOf(overallInitiativeProgress));
                }
                this.kpiUtil.buildInitiativeStatusData(initiativesDTO, null);
                if (!CollectionUtils.isNotEmpty((Collection)initiativesDTO.getMileStonesList())) continue;
                for (MilestonesDTO milestonesDTO : initiativesDTO.getMileStonesList()) {
                    this.kpiUtil.updateStatusByProgress(milestonesDTO.getMileStonesValue());
                }
            }
        }
        return new ResponseEntity((Object)initiativesDTOList, HttpStatus.OK);
    }

    @GetMapping(value={"/kpi/initiativesList/{kpiId}"})
    public ResponseEntity<List<InitiativesDTO>> impactedInitiatives(@PathVariable(value="kpiId") long kpiId) throws RequestException {
        List initiativesDTOList = this.initiativesService.findImpactedInitiatives(kpiId);
        for (InitiativesDTO initiativesDTO : (java.util.List<InitiativesDTO>)initiativesDTOList) {
            this.initiativesService.updateDaysDifference(initiativesDTO);
            this.kpiUtil.buildInitiativeStatusData(initiativesDTO, null);
        }
        return new ResponseEntity((Object)initiativesDTOList, HttpStatus.OK);
    }

    @GetMapping(value={"/initiativesListByEmpId/{empId}"})
    public ResponseEntity<List<InitiativesDTO>> initiativesListByEmpId(@PathVariable(value="empId") long empId) throws RequestException {
        List initiativesDTOList = this.initiativesService.initiativesListByEmpId(empId);
        return new ResponseEntity((Object)initiativesDTOList, HttpStatus.OK);
    }

    @GetMapping(value={"/initiativesListByDeptId/{deptId}"})
    public ResponseEntity<List<InitiativesDTO>> initiativesListByDeptId(@PathVariable(value="deptId") long deptId) throws RequestException {
        List initiativesDTOList = this.initiativesService.initiativesListByDeptId(deptId);
        if (CollectionUtils.isNotEmpty((Collection)initiativesDTOList)) {
            for (InitiativesDTO initiativesDTO : (java.util.List<InitiativesDTO>)initiativesDTOList) {
                this.initiativesService.updateDaysDifference(initiativesDTO);
                int progressval = 0;
                if (CollectionUtils.isNotEmpty((Collection)initiativesDTO.getSubInitiativeList())) {
                    for (SubInitiativesDTO subInitiativesDTO : initiativesDTO.getSubInitiativeList()) {
                        this.kpiUtil.updateStatus(subInitiativesDTO.getSubInitiativeValue(), null);
                        if (subInitiativesDTO.getSubInitiativeValue() == null || subInitiativesDTO.getSubInitiativeValue().get("contribution") == null || subInitiativesDTO.getSubInitiativeValue().get("progressval") == null) continue;
                        Integer subprogress = Integer.parseInt((String)subInitiativesDTO.getSubInitiativeValue().get("progressval"));
                        Integer contribution = Integer.parseInt((String)subInitiativesDTO.getSubInitiativeValue().get("contribution"));
                        if (subprogress <= 0) continue;
                        progressval += contribution * subprogress / 100;
                    }
                }
                if (initiativesDTO.getInitiativeValue().get("statusType") != null && initiativesDTO.getInitiativeValue().get("statusType").equals("weighted")) {
                    initiativesDTO.getInitiativeValue().put("progressval", String.valueOf(progressval));
                }
                this.kpiUtil.buildInitiativeStatusData(initiativesDTO, null);
                if (!CollectionUtils.isNotEmpty((Collection)initiativesDTO.getMileStonesList())) continue;
                for (MilestonesDTO milestonesDTO : initiativesDTO.getMileStonesList()) {
                    this.kpiUtil.updateStatusByProgress(milestonesDTO.getMileStonesValue());
                }
            }
        }
        return new ResponseEntity((Object)initiativesDTOList, HttpStatus.OK);
    }

    @GetMapping(value={"/initiativesListwithChildByDeptId"})
    public ResponseEntity<List<InitiativesDTO>> initiativesListwithChildByDeptId() throws RequestException {
        List initiativesDTOList = this.initiativesService.initiativesListwchildByDeptId();
        if (CollectionUtils.isNotEmpty((Collection)initiativesDTOList)) {
            for (InitiativesDTO initiativesDTO : (java.util.List<InitiativesDTO>)initiativesDTOList) {
                this.initiativesService.updateDaysDifference(initiativesDTO);
                int progressval = 0;
                if (CollectionUtils.isNotEmpty((Collection)initiativesDTO.getSubInitiativeList())) {
                    for (SubInitiativesDTO subInitiativesDTO : initiativesDTO.getSubInitiativeList()) {
                        this.kpiUtil.updateStatus(subInitiativesDTO.getSubInitiativeValue(), null);
                        if (subInitiativesDTO.getSubInitiativeValue() == null || subInitiativesDTO.getSubInitiativeValue().get("contribution") == null || subInitiativesDTO.getSubInitiativeValue().get("progressval") == null) continue;
                        Integer subprogress = Integer.parseInt((String)subInitiativesDTO.getSubInitiativeValue().get("progressval"));
                        Integer contribution = Integer.parseInt((String)subInitiativesDTO.getSubInitiativeValue().get("contribution"));
                        if (subprogress <= 0) continue;
                        progressval += contribution * subprogress / 100;
                    }
                }
                if (initiativesDTO.getInitiativeValue().get("statusType") != null && initiativesDTO.getInitiativeValue().get("statusType").equals("weighted")) {
                    initiativesDTO.getInitiativeValue().put("progressval", String.valueOf(progressval));
                }
                this.kpiUtil.buildInitiativeStatusData(initiativesDTO, null);
                if (!CollectionUtils.isNotEmpty((Collection)initiativesDTO.getMileStonesList())) continue;
                for (MilestonesDTO milestonesDTO : initiativesDTO.getMileStonesList()) {
                    this.kpiUtil.updateStatusByProgress(milestonesDTO.getMileStonesValue());
                }
            }
        }
        return new ResponseEntity((Object)initiativesDTOList, HttpStatus.OK);
    }

    @GetMapping(value={"/initiativesListwithChildByempId/{empId}"})
    public ResponseEntity<List<InitiativesDTO>> initiativesListwithChildByempId(@PathVariable(value="empId") Long empId) throws RequestException {
        List initiativesDTOList = this.initiativesService.initiativesListwchildByDeptId();
        if (CollectionUtils.isNotEmpty((Collection)initiativesDTOList)) {
            for (InitiativesDTO initiativesDTO : (java.util.List<InitiativesDTO>)initiativesDTOList) {
                this.initiativesService.updateDaysDifference(initiativesDTO);
                int progressval = 0;
                if (CollectionUtils.isNotEmpty((Collection)initiativesDTO.getSubInitiativeList())) {
                    for (SubInitiativesDTO subInitiativesDTO : initiativesDTO.getSubInitiativeList()) {
                        this.kpiUtil.updateStatus(subInitiativesDTO.getSubInitiativeValue(), null);
                        if (subInitiativesDTO.getSubInitiativeValue() == null || subInitiativesDTO.getSubInitiativeValue().get("contribution") == null || subInitiativesDTO.getSubInitiativeValue().get("progressval") == null) continue;
                        Integer subprogress = Integer.parseInt((String)subInitiativesDTO.getSubInitiativeValue().get("progressval"));
                        Integer contribution = Integer.parseInt((String)subInitiativesDTO.getSubInitiativeValue().get("contribution"));
                        if (subprogress <= 0) continue;
                        progressval += contribution * subprogress / 100;
                    }
                }
                if (initiativesDTO.getInitiativeValue().get("statusType") != null && initiativesDTO.getInitiativeValue().get("statusType").equals("weighted")) {
                    initiativesDTO.getInitiativeValue().put("progressval", String.valueOf(progressval));
                }
                this.kpiUtil.buildInitiativeStatusData(initiativesDTO, null);
                if (!CollectionUtils.isNotEmpty((Collection)initiativesDTO.getMileStonesList())) continue;
                for (MilestonesDTO milestonesDTO : initiativesDTO.getMileStonesList()) {
                    this.kpiUtil.updateStatusByProgress(milestonesDTO.getMileStonesValue());
                }
            }
        }
        return new ResponseEntity((Object)initiativesDTOList, HttpStatus.OK);
    }

    @GetMapping(value={"/initiativesListWithDeptids"})
    public ResponseEntity<List<InitiativesDTO>> initiativesListByDeptIds(@RequestParam(value="deptIds", required=false) String deptIds) throws RequestException {
        List initiativesDTOList = this.initiativesService.initiativesListWithDeptIds(deptIds);
        if (CollectionUtils.isNotEmpty((Collection)initiativesDTOList)) {
            for (InitiativesDTO initiativesDTO : (java.util.List<InitiativesDTO>)initiativesDTOList) {
                this.initiativesService.updateDaysDifference(initiativesDTO);
                int progressval = 0;
                if (CollectionUtils.isNotEmpty((Collection)initiativesDTO.getSubInitiativeList())) {
                    for (SubInitiativesDTO subInitiativesDTO : initiativesDTO.getSubInitiativeList()) {
                        this.kpiUtil.updateStatus(subInitiativesDTO.getSubInitiativeValue(), null);
                        if (subInitiativesDTO.getSubInitiativeValue() == null || subInitiativesDTO.getSubInitiativeValue().get("contribution") == null || subInitiativesDTO.getSubInitiativeValue().get("progressval") == null) continue;
                        Integer subprogress = Integer.parseInt((String)subInitiativesDTO.getSubInitiativeValue().get("progressval"));
                        Integer contribution = Integer.parseInt((String)subInitiativesDTO.getSubInitiativeValue().get("contribution"));
                        if (subprogress <= 0) continue;
                        progressval += contribution * subprogress / 100;
                    }
                }
                if (initiativesDTO.getInitiativeValue().get("statusType") != null && initiativesDTO.getInitiativeValue().get("statusType").equals("weighted")) {
                    initiativesDTO.getInitiativeValue().put("progressval", String.valueOf(progressval));
                }
                this.kpiUtil.buildInitiativeStatusData(initiativesDTO, null);
                if (!CollectionUtils.isNotEmpty((Collection)initiativesDTO.getMileStonesList())) continue;
                for (MilestonesDTO milestonesDTO : initiativesDTO.getMileStonesList()) {
                    this.kpiUtil.updateStatusByProgress(milestonesDTO.getMileStonesValue());
                }
            }
        }
        return new ResponseEntity((Object)initiativesDTOList, HttpStatus.OK);
    }

    @GetMapping(value={"/initiativesListWithChild/{empId}"})
    public ResponseEntity<List<InitiativesDTO>> initiativesListWithChild(@PathVariable(value="empId") String empId, @RequestParam(value="initiativeIds", required=false) String initiativeIds, @RequestParam(value="pageIds", required=false) String pageIds, @RequestParam(value="dateRange", required=false) String dateRange) throws RequestException {
        List initiativesDTOList = this.initiativesService.initiativesListWithChild(empId, initiativeIds, pageIds, dateRange);
        if (CollectionUtils.isNotEmpty((Collection)initiativesDTOList)) {
            for (InitiativesDTO initiativesDTO : (java.util.List<InitiativesDTO>)initiativesDTOList) {
                this.initiativesService.updateDaysDifference(initiativesDTO);
                int progressval = 0;
                if (CollectionUtils.isNotEmpty((Collection)initiativesDTO.getSubInitiativeList())) {
                    for (SubInitiativesDTO subInitiativesDTO : initiativesDTO.getSubInitiativeList()) {
                        this.kpiUtil.updateStatus(subInitiativesDTO.getSubInitiativeValue(), null);
                        if (subInitiativesDTO.getSubInitiativeValue() == null || subInitiativesDTO.getSubInitiativeValue().get("contribution") == null || subInitiativesDTO.getSubInitiativeValue().get("progressval") == null) continue;
                        Integer subprogress = Integer.parseInt((String)subInitiativesDTO.getSubInitiativeValue().get("progressval"));
                        Integer contribution = Integer.parseInt((String)subInitiativesDTO.getSubInitiativeValue().get("contribution"));
                        if (subprogress <= 0) continue;
                        progressval += contribution * subprogress / 100;
                    }
                }
                if (initiativesDTO.getInitiativeValue().get("statusType") != null && initiativesDTO.getInitiativeValue().get("statusType").equals("weighted")) {
                    initiativesDTO.getInitiativeValue().put("progressval", String.valueOf(progressval));
                }
                this.kpiUtil.buildInitiativeStatusData(initiativesDTO, null);
                if (!CollectionUtils.isNotEmpty((Collection)initiativesDTO.getMileStonesList())) continue;
                for (MilestonesDTO milestonesDTO : initiativesDTO.getMileStonesList()) {
                    this.kpiUtil.updateStatusByProgress(milestonesDTO.getMileStonesValue());
                }
            }
        }
        return new ResponseEntity((Object)initiativesDTOList, HttpStatus.OK);
    }

    @GetMapping(value={"/initiativesListWithBudget/{empId}"})
    public ResponseEntity<List<InitiativesDTO>> initiativesListWithBudget(@PathVariable(value="empId") String empId, @RequestParam(value="initiativeIds", required=false) String initiativeIds) throws RequestException {
        List initiativesDTOList = this.initiativesService.initiativesListWithChild(empId, initiativeIds, null, null);
        return new ResponseEntity((Object)initiativesDTOList, HttpStatus.OK);
    }

    @GetMapping(value={"/initiativeViewList/{empId}"})
    public ResponseEntity<List<InitiativesDTO>> initiativeViewList(@PathVariable(value="empId") long empId, @RequestParam(value="loadFlag", required=false) String loadFlag, @RequestParam(value="pageId", required=false) String pageId, @RequestParam(value="nodate", required=false) String nodate) throws RequestException {
        boolean flag = loadFlag != null ? Boolean.valueOf(loadFlag) : false;
        List initiativesDTOList = this.initiativesService.findAllviewMapList(empId, flag, pageId, nodate);
        if (CollectionUtils.isNotEmpty((Collection)initiativesDTOList)) {
            for (InitiativesDTO initiativesDTO : (java.util.List<InitiativesDTO>)initiativesDTOList) {
                this.initiativesService.updateDaysDifference(initiativesDTO);
                double overallInitiativeProgress = 0.0;
                double roundProgress = 0.0;
                if (CollectionUtils.isNotEmpty((Collection)initiativesDTO.getSubInitiativeList())) {
                    double totalSubInitiativeProgress = 0.0;
                    int subInitiativeCount = 0;
                    for (SubInitiativesDTO subInitiativesDTO : initiativesDTO.getSubInitiativeList()) {
                        Map subInitiativeValue = subInitiativesDTO.getSubInitiativeValue();
                        this.kpiUtil.updateStatus(subInitiativeValue, null);
                        double subInitiativeProgress = 0.0;
                        List activities = subInitiativesDTO.getActivitiesList();
                        if (CollectionUtils.isNotEmpty((Collection)activities)) {
                            double totalProgress = 0.0;
                            int activityCount = 0;
                            for (ActivitiesDTO activity : (java.util.List<ActivitiesDTO>)activities) {
                                if (activity == null || activity.getActivitiesValue() == null) continue;
                                Object val = activity.getActivitiesValue().get("progress");
                                double activityProgress = val == null || "null".equalsIgnoreCase(val.toString()) || val.toString().isEmpty() ? 0.0 : Double.parseDouble(val.toString());
                                totalProgress += activityProgress;
                                ++activityCount;
                            }
                            if (activityCount > 0) {
                                subInitiativeProgress = totalProgress / (double)activityCount;
                            }
                        }
                        System.out.println("subInitiativeProgress ::" + subInitiativeProgress);
                        double roundedSub = (double)Math.round(subInitiativeProgress * 100.0) / 100.0;
                        System.out.println("roundedSub ::" + roundedSub);
                        subInitiativeValue.put("progressval", String.valueOf(roundedSub));
                        totalSubInitiativeProgress += subInitiativeProgress;
                        ++subInitiativeCount;
                    }
                    if (subInitiativeCount > 0) {
                        overallInitiativeProgress = totalSubInitiativeProgress / (double)subInitiativeCount;
                    }
                    roundProgress = (double)Math.round(overallInitiativeProgress * 100.0) / 100.0;
                }
                System.out.println("overallInitiativeProgress :: " + overallInitiativeProgress);
                if (initiativesDTO.getInitiativeValue().get("statusType") != null && initiativesDTO.getInitiativeValue().get("statusType").equals("weighted")) {
                    initiativesDTO.getInitiativeValue().put("progressval", String.valueOf(roundProgress));
                }
                this.kpiUtil.buildInitiativeStatusData(initiativesDTO, null);
                if (!CollectionUtils.isNotEmpty((Collection)initiativesDTO.getMileStonesList())) continue;
                for (MilestonesDTO milestonesDTO : initiativesDTO.getMileStonesList()) {
                    this.kpiUtil.updateStatusByProgress(milestonesDTO.getMileStonesValue());
                }
            }
        }
        return new ResponseEntity((Object)initiativesDTOList, HttpStatus.OK);
    }

    @GetMapping(value={"/initiativeDashBoardData"})
    public ResponseEntity<InitiativeDashBoardResponseDTO> initiDashBoardData(@RequestParam(value="deptId", required=false) Long deptId, HttpServletRequest request) throws RequestException {
        InitiativeDashBoardResponseDTO eventlist = this.initiativesService.initiDashBoardData(deptId.longValue());
        if (CollectionUtils.isNotEmpty((Collection)eventlist.getInitiveDTO())) {
            for (InitiativesDTO initiativesDTO : eventlist.getInitiveDTO()) {
                this.initiativesService.updateDaysDifference(initiativesDTO);
                double overallInitiativeProgress = 0.0;
                double roundProgress = 0.0;
                if (CollectionUtils.isNotEmpty((Collection)initiativesDTO.getSubInitiativeList())) {
                    double totalSubInitiativeProgress = 0.0;
                    int subInitiativeCount = 0;
                    for (SubInitiativesDTO subInitiativesDTO : initiativesDTO.getSubInitiativeList()) {
                        Map subInitiativeValue = subInitiativesDTO.getSubInitiativeValue();
                        this.kpiUtil.updateStatus(subInitiativeValue, null);
                        double subInitiativeProgress = 0.0;
                        List activities = subInitiativesDTO.getActivitiesList();
                        if (CollectionUtils.isNotEmpty((Collection)activities)) {
                            double totalProgress = 0.0;
                            int activityCount = 0;
                            for (ActivitiesDTO activity : (java.util.List<ActivitiesDTO>)activities) {
                                if (activity == null || activity.getActivitiesValue() == null) continue;
                                Object val = activity.getActivitiesValue().get("progress");
                                double activityProgress = val == null || "null".equalsIgnoreCase(val.toString()) || val.toString().isEmpty() ? 0.0 : Double.parseDouble(val.toString());
                                totalProgress += activityProgress;
                                ++activityCount;
                            }
                            if (activityCount > 0) {
                                subInitiativeProgress = totalProgress / (double)activityCount;
                            }
                        }
                        System.out.println("subInitiativeProgress ::" + subInitiativeProgress);
                        double roundedSub = (double)Math.round(subInitiativeProgress * 100.0) / 100.0;
                        System.out.println("roundedSub ::" + roundedSub);
                        subInitiativeValue.put("progressval", String.valueOf(roundedSub));
                        totalSubInitiativeProgress += subInitiativeProgress;
                        ++subInitiativeCount;
                    }
                    if (subInitiativeCount > 0) {
                        overallInitiativeProgress = totalSubInitiativeProgress / (double)subInitiativeCount;
                    }
                    roundProgress = (double)Math.round(overallInitiativeProgress * 100.0) / 100.0;
                }
                System.out.println("overallInitiativeProgress :: " + overallInitiativeProgress);
                if (initiativesDTO.getInitiativeValue().get("statusType") != null && initiativesDTO.getInitiativeValue().get("statusType").equals("weighted")) {
                    initiativesDTO.getInitiativeValue().put("progressval", String.valueOf(roundProgress));
                }
                this.kpiUtil.buildInitiativeStatusData(initiativesDTO, null);
            }
        }
        return new ResponseEntity((Object)eventlist, HttpStatus.OK);
    }
}

