/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.controller.InitiativesController
 *  com.estrat.web.dto.InitiativeBudgetDTO
 *  com.estrat.web.dto.InitiativeDashBoardResponseDTO
 *  com.estrat.web.dto.InitiativeResponseDTO
 *  com.estrat.web.dto.InitiativesDTO
 *  com.estrat.web.dto.StatusCountDto
 *  com.estrat.web.exception.RequestException
 *  com.estrat.web.service.InitiativeService
 *  com.estrat.web.util.InitiativesReaderUtil
 *  com.estrat.web.util.RequestSessionUtil
 *  com.estrat.web.util.UserThreadLocal
 *  javax.servlet.http.HttpServletRequest
 *  org.apache.commons.lang3.StringUtils
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.io.ByteArrayResource
 *  org.springframework.core.io.Resource
 *  org.springframework.core.io.UrlResource
 *  org.springframework.http.HttpHeaders
 *  org.springframework.http.HttpStatus
 *  org.springframework.http.ResponseEntity
 *  org.springframework.http.ResponseEntity$BodyBuilder
 *  org.springframework.web.bind.annotation.DeleteMapping
 *  org.springframework.web.bind.annotation.GetMapping
 *  org.springframework.web.bind.annotation.PathVariable
 *  org.springframework.web.bind.annotation.PostMapping
 *  org.springframework.web.bind.annotation.PutMapping
 *  org.springframework.web.bind.annotation.RequestBody
 *  org.springframework.web.bind.annotation.RequestMapping
 *  org.springframework.web.bind.annotation.RequestMethod
 *  org.springframework.web.bind.annotation.RequestParam
 *  org.springframework.web.bind.annotation.ResponseBody
 *  org.springframework.web.bind.annotation.RestController
 *  org.springframework.web.context.request.WebRequest
 *  org.springframework.web.multipart.MultipartFile
 */
package com.estrat.web.controller;

import com.estrat.web.dto.InitiativeBudgetDTO;
import com.estrat.web.dto.InitiativeDashBoardResponseDTO;
import com.estrat.web.dto.InitiativeResponseDTO;
import com.estrat.web.dto.InitiativesDTO;
import com.estrat.web.dto.StatusCountDto;
import com.estrat.web.exception.RequestException;
import com.estrat.web.service.InitiativeService;
import com.estrat.web.util.InitiativesReaderUtil;
import com.estrat.web.util.RequestSessionUtil;
import com.estrat.web.util.UserThreadLocal;
import java.io.IOException;
import java.math.BigDecimal;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
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
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class InitiativesController {
    @Autowired
    protected InitiativeService initiativesService;
    @Autowired
    private InitiativesReaderUtil initiativeReaderUtil;
    @Autowired
    protected RequestSessionUtil sessionUtil;
    @Value(value="${upload.path.local}")
    public String BASE_PATH;

    @PostMapping(value={"/initiatives"})
    public ResponseEntity<InitiativeResponseDTO> saveInitiativesDetails(@RequestBody InitiativesDTO initiativesDTO, HttpServletRequest request) throws RequestException {
        initiativesDTO.setCreatedBy(Long.parseLong(UserThreadLocal.get().getProfile().getEmpId()));
        return new ResponseEntity(this.initiativesService.saveInitiatives(initiativesDTO), HttpStatus.OK);
    }

    @PutMapping(value={"/initiatives"})
    public ResponseEntity<InitiativeResponseDTO> updateInitiativesDetails(@RequestBody InitiativesDTO initiativesDTO, HttpServletRequest request) throws RequestException {
        String enddateperiod = String.valueOf(request.getSession().getAttribute("enddatePeriod"));
        System.out.println("End Date Period ::::: " + enddateperiod);
        initiativesDTO.setUpdatedBy(Long.parseLong(UserThreadLocal.get().getProfile().getEmpId()));
        initiativesDTO.setEndDatePeriod(enddateperiod);
        return new ResponseEntity(this.initiativesService.updateInitiatives(initiativesDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/initiatives/{id}"})
    public ResponseEntity<InitiativesDTO> getInitiativesDetailsById(@PathVariable(value="id") Long id, @RequestParam(value="loadFlag", required=false) String loadFlag) throws RequestException {
        boolean flag = loadFlag != null ? Boolean.valueOf(loadFlag) : false;
        return new ResponseEntity(this.initiativesService.retriveInitiatives(id, flag), HttpStatus.OK);
    }

    @DeleteMapping(value={"/initiatives/{id}"})
    public ResponseEntity<Boolean> deleteInitiativesDetailsById(@PathVariable(value="id") Long id) throws RequestException {
        this.initiativesService.removeInitiatives(id);
        return new ResponseEntity(true, HttpStatus.OK);
    }

    @GetMapping(value={"/initiativesListByEmpId/{empId}"})
    public ResponseEntity<List<InitiativesDTO>> initiativesListByEmpId(@PathVariable(value="empId") long empId) throws RequestException {
        List initiativesDTOList = this.initiativesService.findByEmpId(empId);
        return new ResponseEntity(initiativesDTOList, HttpStatus.OK);
    }

    @GetMapping(value={"/initiativesList"})
    public ResponseEntity<List<InitiativesDTO>> findAll(@RequestParam(value="loadFlag", required=false) String loadFlag, @RequestParam(value="pageId", required=false) String pageId, @RequestParam(value="status", required=false) String status, HttpServletRequest request) throws RequestException {
        List initiativesDTOList;
        boolean flag;
        boolean bl = flag = loadFlag != null ? Boolean.valueOf(loadFlag) : false;
        if (StringUtils.isNotEmpty((CharSequence)status)) {
            status = status.equalsIgnoreCase("nodate") ? "nodate" : "date";
        }
        if ((initiativesDTOList = this.initiativesService.findAll(flag, pageId, this.sessionUtil.getSessionId(request), status)) != null && !initiativesDTOList.isEmpty()) {
            return new ResponseEntity(initiativesDTOList, HttpStatus.OK);
        }
        return new ResponseEntity(Collections.emptyList(), HttpStatus.OK);
    }

    @GetMapping(value={"/initiativestatuscount/{id}"})
    public ResponseEntity<List<StatusCountDto>> initiativestatuscount(@PathVariable(value="id") long id, @RequestParam(value="period", required=false) String period) {
        List statusCountDtos = this.initiativesService.statusCount(id, period);
        return new ResponseEntity(statusCountDtos, HttpStatus.OK);
    }

    @GetMapping(value={"/initiativeprogresscount/{id}"})
    public ResponseEntity<List<StatusCountDto>> initiativeprogresscount(@PathVariable(value="id") long id, @RequestParam(value="period", required=false) String period) {
        List statusCountDtos = this.initiativesService.progresscount(id, period);
        return new ResponseEntity(statusCountDtos, HttpStatus.OK);
    }

    @GetMapping(value={"/initiativenoprogresscount/{id}"})
    public ResponseEntity<List<StatusCountDto>> initiativenoprogresscount(@PathVariable(value="id") long id, @RequestParam(value="period", required=false) String period) {
        List statusCountDtos = this.initiativesService.noprogresscount(id, period);
        return new ResponseEntity(statusCountDtos, HttpStatus.OK);
    }

    @GetMapping(value={"/kpi/initiativesList/{kpiId}"})
    public ResponseEntity<List<InitiativesDTO>> impactedInitiatives(@PathVariable(value="kpiId") long kpiId) throws RequestException {
        List initiativesDTOList = this.initiativesService.findImpactedInitiatives(kpiId);
        return new ResponseEntity(initiativesDTOList, HttpStatus.OK);
    }

    @RequestMapping(value={"/importBulkInitiativesDetails"}, method={RequestMethod.POST})
    public ResponseEntity<Map> importBulkInitiativesDetails(WebRequest webRequest, @RequestParam(value="initiativeData", required=true) MultipartFile initiativeData, @RequestParam(value="type", required=false) String type) {
        String Message = "No Records Processed";
        Map mapValue = new HashMap();
        try {
            mapValue = this.initiativeReaderUtil.importBulkInitiativesDetails(initiativeData.getInputStream(), type);
        }
        catch (Exception e) {
            mapValue.put("message", Message);
            return new ResponseEntity(mapValue, HttpStatus.OK);
        }
        return new ResponseEntity(mapValue, HttpStatus.OK);
    }

    @RequestMapping(value={"/importInitiativesData"}, method={RequestMethod.POST})
    public ResponseEntity<Map> importInitiativesData(WebRequest webRequest, @RequestParam(value="initiativeDataLoad", required=true) MultipartFile initiativeData, @RequestParam(value="type", required=false) String type) {
        String Message = "No Records Processed";
        Map mapValue = new HashMap();
        try {
            mapValue = this.initiativeReaderUtil.importInitiativesData(initiativeData.getInputStream(), type);
        }
        catch (Exception e) {
            mapValue.put("message", Message);
            return new ResponseEntity(mapValue, HttpStatus.OK);
        }
        return new ResponseEntity(mapValue, HttpStatus.OK);
    }

    @RequestMapping(value={"/importInitiativesBudget"}, method={RequestMethod.POST})
    public ResponseEntity<Map> importInitiativesBudget(WebRequest webRequest, @RequestParam(value="initiativeBudget", required=true) MultipartFile initiativeData, @RequestParam(value="type", required=false) String type) {
        String Message = "No Records Processed";
        Map mapValue = new HashMap();
        try {
            mapValue = this.initiativeReaderUtil.importInitiativesBudget(initiativeData.getInputStream(), type);
        }
        catch (Exception e) {
            mapValue.put("message", Message);
            return new ResponseEntity(mapValue, HttpStatus.OK);
        }
        return new ResponseEntity(mapValue, HttpStatus.OK);
    }

    @GetMapping(value={"/activities/initiativeDetailsList"})
    public ResponseEntity<InitiativesDTO> getInitiativesDetailsList(HttpServletRequest request) throws RequestException {
        return new ResponseEntity(this.initiativesService.retrieveInitiativeDetailsList(Long.valueOf(this.sessionUtil.getSessionId(request))), HttpStatus.OK);
    }

    @GetMapping(value={"/initiativesListByDeptId/{deptId}"})
    public ResponseEntity<List<InitiativesDTO>> initiativesListByDeptId(@PathVariable(value="deptId") long deptId) throws RequestException {
        List initiativesDTOList = this.initiativesService.initiativesListByDeptId(deptId);
        return new ResponseEntity(initiativesDTOList, HttpStatus.OK);
    }

    @GetMapping(value={"/initiativesBudgetListByDeptId"})
    public ResponseEntity<List<InitiativeBudgetDTO>> initiativesBudgetListByDeptId(@RequestParam(value="deptIds", required=false) String deptIds, HttpServletRequest request) throws RequestException {
        if (deptIds != null) {
            List initiativesDTOList = this.initiativesService.initiativesListByDeptIds(deptIds);
            HashMap<String, InitiativeBudgetDTO> initiativebudgetorg = new HashMap<String, InitiativeBudgetDTO>();
            BigDecimal total_asset_budget = new BigDecimal(0);
            BigDecimal total_realization_asset = new BigDecimal(0);
            BigDecimal total_liabilities_budget = new BigDecimal(0);
            BigDecimal total_realization_liabilities = new BigDecimal(0);
            BigDecimal total_budget = new BigDecimal(0);
            BigDecimal total_realization_budget = new BigDecimal(0);
            BigDecimal sum_total_asset_budget = new BigDecimal(0);
            BigDecimal sum_total_realization_asset = new BigDecimal(0);
            BigDecimal sum_total_liabilities_budget = new BigDecimal(0);
            BigDecimal sum_total_realization_liabilities = new BigDecimal(0);
            BigDecimal sum_total_budget = new BigDecimal(0);
            BigDecimal sum_total_realization_budget = new BigDecimal(0);
            for (Object _raw_initiativesDTO : initiativesDTOList) {
                InitiativesDTO initiativesDTO = (InitiativesDTO) _raw_initiativesDTO;
                InitiativeBudgetDTO initiativesBudget = initiativesDTO.getInitiativeBudget();
                if (initiativesBudget != null && initiativesBudget.getTotalAssetBudget() != null) {
                    total_asset_budget = initiativesBudget.getTotalAssetBudget().add(total_asset_budget);
                }
                if (initiativesBudget != null && initiativesBudget.getTotalRealizationAsset() != null) {
                    total_realization_asset = initiativesBudget.getTotalRealizationAsset().add(total_realization_asset);
                }
                if (initiativesBudget != null && initiativesBudget.getTotalBudget() != null) {
                    total_budget = initiativesBudget.getTotalBudget().add(total_budget);
                }
                if (initiativesBudget != null && initiativesBudget.getTotalRealizationBudget() != null) {
                    total_realization_budget = initiativesBudget.getTotalRealizationBudget().add(total_realization_budget);
                }
                if (initiativesBudget != null && initiativesBudget.getTotalLiabilitiesBudget() != null) {
                    total_liabilities_budget = initiativesBudget.getTotalLiabilitiesBudget().add(total_liabilities_budget);
                }
                if (initiativesBudget != null && initiativesBudget.getTotalRealizationLiabilities() != null) {
                    total_realization_liabilities = initiativesBudget.getTotalRealizationLiabilities().add(total_realization_liabilities);
                }
                if (initiativebudgetorg.get(initiativesDTO.getDeptUniqueId()) != null) {
                    InitiativeBudgetDTO initiativesBudget_exist = (InitiativeBudgetDTO)initiativebudgetorg.get(initiativesDTO.getDeptUniqueId());
                    if (initiativesBudget_exist != null && initiativesBudget_exist.getTotalAssetBudget() != null) {
                        total_asset_budget = initiativesBudget_exist.getTotalAssetBudget().add(total_asset_budget);
                    }
                    if (initiativesBudget_exist != null && initiativesBudget_exist.getTotalRealizationAsset() != null) {
                        total_realization_asset = initiativesBudget_exist.getTotalRealizationAsset().add(total_realization_asset);
                    }
                    if (initiativesBudget_exist != null && initiativesBudget_exist.getTotalBudget() != null) {
                        total_budget = initiativesBudget_exist.getTotalBudget().add(total_budget);
                    }
                    if (initiativesBudget_exist != null && initiativesBudget_exist.getTotalRealizationBudget() != null) {
                        total_realization_budget = initiativesBudget_exist.getTotalRealizationBudget().add(total_realization_budget);
                    }
                    if (initiativesBudget_exist != null && initiativesBudget_exist.getTotalLiabilitiesBudget() != null) {
                        total_liabilities_budget = initiativesBudget_exist.getTotalLiabilitiesBudget().add(total_liabilities_budget);
                    }
                    if (initiativesBudget_exist != null && initiativesBudget_exist.getTotalRealizationLiabilities() != null) {
                        total_realization_liabilities = initiativesBudget_exist.getTotalRealizationLiabilities().add(total_realization_liabilities);
                    }
                }
                BigDecimal asset_real_percent = total_asset_budget.compareTo(new BigDecimal(0)) > 0 ? total_realization_asset.divide(total_asset_budget, 4, 4).multiply(new BigDecimal("100")) : new BigDecimal(0);
                BigDecimal budget_real_percent = total_budget.compareTo(new BigDecimal(0)) > 0 ? total_realization_budget.divide(total_budget, 4, 4).multiply(new BigDecimal("100")) : new BigDecimal(0);
                BigDecimal liabilities_real_percent = total_liabilities_budget.compareTo(new BigDecimal(0)) > 0 ? total_realization_liabilities.divide(total_liabilities_budget, 4, 4).multiply(new BigDecimal("100")) : new BigDecimal(0);
                InitiativeBudgetDTO initiativeBudgetDTO = new InitiativeBudgetDTO();
                initiativeBudgetDTO.setTotalAssetBudget(total_asset_budget);
                initiativeBudgetDTO.setTotalAssetBudgetRealization_percent(asset_real_percent);
                initiativeBudgetDTO.setTotalBudget(total_budget);
                initiativeBudgetDTO.setDeptId(initiativesDTO.getDeptUniqueId());
                initiativeBudgetDTO.setTotalBudgetRealization_percent(budget_real_percent);
                initiativeBudgetDTO.setTotalLiabilitiesBudget(total_liabilities_budget);
                initiativeBudgetDTO.setTotalLiabilitiesRealization_percent(liabilities_real_percent);
                initiativeBudgetDTO.setTotalRealizationAsset(total_realization_asset);
                initiativeBudgetDTO.setTotalRealizationBudget(total_realization_budget);
                initiativeBudgetDTO.setTotalRealizationLiabilities(total_realization_liabilities);
                initiativebudgetorg.put(initiativesDTO.getDeptUniqueId(), initiativeBudgetDTO);
            }
            ArrayList initiativeBudgetList = new ArrayList(initiativebudgetorg.values());
            for (Object _obj_initbudget : initiativeBudgetList) {
                InitiativeBudgetDTO initbudget = (InitiativeBudgetDTO) _obj_initbudget;
                sum_total_asset_budget = sum_total_asset_budget.add(initbudget.getTotalAssetBudget());
                sum_total_realization_asset = sum_total_realization_asset.add(initbudget.getTotalRealizationAsset());
                sum_total_liabilities_budget = sum_total_liabilities_budget.add(initbudget.getTotalLiabilitiesBudget());
                sum_total_realization_liabilities = sum_total_realization_liabilities.add(initbudget.getTotalRealizationLiabilities());
                sum_total_budget = sum_total_budget.add(initbudget.getTotalBudget());
                sum_total_realization_budget = sum_total_realization_budget.add(initbudget.getTotalRealizationBudget());
            }
            BigDecimal asset_real_percent = sum_total_asset_budget.compareTo(new BigDecimal(0)) > 0 ? sum_total_realization_asset.divide(sum_total_asset_budget, 4, 4).multiply(new BigDecimal("100")) : new BigDecimal(0);
            BigDecimal budget_real_percent = sum_total_realization_budget.compareTo(new BigDecimal(0)) > 0 ? sum_total_realization_budget.divide(sum_total_budget, 4, 4).multiply(new BigDecimal("100")) : new BigDecimal(0);
            BigDecimal liabilities_real_percent = sum_total_realization_liabilities.compareTo(new BigDecimal(0)) > 0 ? sum_total_realization_liabilities.divide(sum_total_liabilities_budget, 4, 4).multiply(new BigDecimal("100")) : new BigDecimal(0);
            InitiativeBudgetDTO initiativeBudgetDTO = new InitiativeBudgetDTO();
            initiativeBudgetDTO.setDeptId("Summary");
            initiativeBudgetDTO.setTotalAssetBudget(sum_total_asset_budget);
            initiativeBudgetDTO.setTotalBudget(sum_total_budget);
            initiativeBudgetDTO.setTotalRealizationLiabilities(sum_total_realization_liabilities);
            initiativeBudgetDTO.setTotalRealizationAsset(sum_total_realization_asset);
            initiativeBudgetDTO.setTotalRealizationBudget(sum_total_realization_budget);
            initiativeBudgetDTO.setTotalLiabilitiesBudget(sum_total_liabilities_budget);
            initiativeBudgetDTO.setTotalAssetBudgetRealization_percent(asset_real_percent);
            initiativeBudgetDTO.setTotalBudgetRealization_percent(budget_real_percent);
            initiativeBudgetDTO.setTotalLiabilitiesRealization_percent(liabilities_real_percent);
            initiativeBudgetList.add(initiativeBudgetDTO);
            return new ResponseEntity(initiativeBudgetList, HttpStatus.OK);
        }
        return new ResponseEntity(new ArrayList(), HttpStatus.OK);
    }

    @GetMapping(value={"/initiativesListwithChildByDeptId"})
    public ResponseEntity<List<InitiativesDTO>> initiativesListwithChildByDeptId(HttpServletRequest request) throws RequestException {
        return new ResponseEntity(this.initiativesService.initiativesListwithChildBydeptId(), HttpStatus.OK);
    }

    @GetMapping(value={"/initiativesListwithChildByempId"})
    public ResponseEntity<List<InitiativesDTO>> initiativesListwithChildByempId(HttpServletRequest request) throws RequestException {
        return new ResponseEntity(this.initiativesService.initiativesListwithChildByempId(), HttpStatus.OK);
    }

    @GetMapping(value={"/initiativesListWithChild"})
    public ResponseEntity<List<InitiativesDTO>> initiativesListWithChild(@RequestParam(value="initiativeIds", required=false) String initiativeIds, @RequestParam(value="pageIds", required=false) String pageIds, @RequestParam(value="dateRange", required=false) String dateRange, HttpServletRequest request) throws RequestException {
        return new ResponseEntity(this.initiativesService.initiativesListWithChild(this.sessionUtil.getSessionId(request), initiativeIds, pageIds, dateRange), HttpStatus.OK);
    }

    @GetMapping(value={"/initiativesListWithBudget"})
    public ResponseEntity<List<InitiativesDTO>> initiativesListWithBudget(@RequestParam(value="initiativeIds", required=false) String initiativeIds, HttpServletRequest request) throws RequestException {
        return new ResponseEntity(this.initiativesService.initiativesListWithBudget(this.sessionUtil.getSessionId(request), initiativeIds), HttpStatus.OK);
    }

    @GetMapping(value={"/downloadInitiativesDetails"})
    public ResponseEntity<ByteArrayResource> downloadInitiativesDetails(@RequestParam(value="loadFlag", required=false) String loadFlag, @RequestParam(value="pageId", required=false) String pageId, @RequestParam(value="status", required=false) String status, HttpServletRequest request) throws Exception {
        boolean flag;
        boolean bl = flag = loadFlag != null ? Boolean.valueOf(loadFlag) : false;
        if (StringUtils.isNotEmpty((CharSequence)status)) {
            status = status.equalsIgnoreCase("nodate") ? "nodate" : "date";
        }
        List initiativesDTOList = this.initiativesService.findAll(flag, pageId, this.sessionUtil.getSessionId(request), status);
        return this.initiativeReaderUtil.writeDocForInitiativesDetails(initiativesDTOList);
    }

    @GetMapping(value={"/initiativesListWithDeptids"})
    public ResponseEntity<List<InitiativesDTO>> initiativesListWithDeptIds(@RequestParam(value="deptIds", required=false) String deptIds) throws RequestException {
        List initiativesDTOList = this.initiativesService.initiativesListByDeptIds(deptIds);
        return new ResponseEntity(initiativesDTOList, HttpStatus.OK);
    }

    @GetMapping(value={"/initiativeViewList"})
    public ResponseEntity<List<InitiativesDTO>> initiativeViewList(@RequestParam(value="loadFlag", required=false) String loadFlag, @RequestParam(value="pageId", required=false) String pageId, @RequestParam(value="status", required=false) String status, HttpServletRequest request) throws RequestException {
        List initiativesDTOList;
        boolean flag;
        boolean bl = flag = loadFlag != null ? Boolean.valueOf(loadFlag) : false;
        if (StringUtils.isNotEmpty((CharSequence)status)) {
            status = status.equalsIgnoreCase("nodate") ? "nodate" : "date";
        }
        if ((initiativesDTOList = this.initiativesService.findAllviewMapList(flag, pageId, this.sessionUtil.getSessionId(request), status)) != null && !initiativesDTOList.isEmpty()) {
            return new ResponseEntity(initiativesDTOList, HttpStatus.OK);
        }
        return new ResponseEntity(Collections.emptyList(), HttpStatus.OK);
    }

    @GetMapping(value={"/initiative/download"})
    @ResponseBody
    public ResponseEntity<Resource> downloadFile(@RequestParam(value="uniqueKey") String uniqueKey, @RequestParam(value="fileName") String fileName, @RequestParam(value="fileType") String fileType) throws IOException {
        UrlResource resource;
        String filePath = this.BASE_PATH + "/initiative/" + uniqueKey;
        Path path = Paths.get(filePath, new String[0]);
        try {
            resource = new UrlResource(path.toUri());
        }
        catch (MalformedURLException e) {
            throw new RuntimeException("Issue in reading the file", e);
        }
        if (resource.exists() && resource.isReadable()) {
            HttpHeaders headers = new HttpHeaders();
            headers.add("Content-Disposition", "attachment; filename=\"" + fileName + "\"");
            headers.add("Content-Type", fileType);
            return ((ResponseEntity.BodyBuilder)ResponseEntity.ok().headers(headers)).body(resource);
        }
        throw new RuntimeException("File not found or not readable");
    }

    @GetMapping(value={"/initiativeDashBoardData"})
    public ResponseEntity<InitiativeDashBoardResponseDTO> initiDashBoardData(@RequestParam(value="deptId", required=false) Long deptId, HttpServletRequest request) throws RequestException {
        System.out.println("iniitve daskboard deptId :: " + deptId);
        InitiativeDashBoardResponseDTO eventlist = this.initiativesService.initiDashBoardData(deptId.longValue());
        double totalProgress = 0.0;
        for (Object _obj_initiativesDTO : eventlist.getInitiveDTO()) {
            InitiativesDTO initiativesDTO = (InitiativesDTO) _obj_initiativesDTO;
            Object progressObj = initiativesDTO.getInitiativeValue().get("progressval");
            if (progressObj == null) continue;
            totalProgress += Double.parseDouble(progressObj.toString());
        }
        double avgProgress = totalProgress / (double)eventlist.getTotalInitiative();
        eventlist.setTotalProgress(Math.round(avgProgress));
        return new ResponseEntity(eventlist, HttpStatus.OK);
    }
}

