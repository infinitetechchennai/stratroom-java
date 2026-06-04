/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.controller.PageController
 *  com.estrat.web.dto.CockpitViewDTO
 *  com.estrat.web.dto.PageDTO
 *  com.estrat.web.dto.ScoreCardResponseDTO
 *  com.estrat.web.exception.RequestException
 *  com.estrat.web.service.EmployeeService
 *  com.estrat.web.service.PageService
 *  com.estrat.web.service.RoleService
 *  com.estrat.web.util.PermissionLocal
 *  com.estrat.web.util.RequestSessionUtil
 *  com.estrat.web.util.RoleConstants
 *  com.estrat.web.util.RoleUtil
 *  com.estrat.web.util.UserThreadLocal
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
package com.estrat.web.controller;

import com.estrat.web.dto.CockpitViewDTO;
import com.estrat.web.dto.PageDTO;
import com.estrat.web.dto.ScoreCardResponseDTO;
import com.estrat.web.exception.RequestException;
import com.estrat.web.service.EmployeeService;
import com.estrat.web.service.PageService;
import com.estrat.web.service.RoleService;
import com.estrat.web.util.PermissionLocal;
import com.estrat.web.util.RequestSessionUtil;
import com.estrat.web.util.RoleConstants;
import com.estrat.web.util.RoleUtil;
import com.estrat.web.util.UserThreadLocal;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.function.BiPredicate;
import java.util.stream.Collectors;
import javax.servlet.http.HttpServletRequest;
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
@SuppressWarnings({"unchecked", "rawtypes"})
public class PageController {
    @Autowired
    private PageService pageService;
    @Autowired
    private RoleService roleService;
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    protected RequestSessionUtil sessionUtil;
    BiPredicate<String, String> pagePredicate = (modules, privileges) -> modules != null ? RoleUtil.validatePrivilegesPage((String)modules) : false;
    BiPredicate<String, String> predicateCheck = (modules, privileges) -> modules != null ? RoleUtil.validateViewPrivilegesPage((String)modules) : false;

    @GetMapping(value={"/getDefaultPage"})
    public ResponseEntity<PageDTO> getDefaultPage(@RequestParam(value="pageType") String pageType) {
        return new ResponseEntity(this.pageService.getDefaultPage(pageType), HttpStatus.OK);
    }

    @GetMapping(value={"/pages/{id}"})
    public ResponseEntity<PageDTO> getScoreCardDetails(@PathVariable long id) {
        return this.pageService.getPageDetails(id);
    }

    @GetMapping(value={"/pages/{pagename}/{empId}"})
    public ResponseEntity<PageDTO> getScoreCardDetails(@PathVariable String pageName, @PathVariable long empId) {
        return this.pageService.getPageDetails(pageName, empId);
    }

    @PostMapping(value={"/pages"})
    public ResponseEntity<ScoreCardResponseDTO> saveOrUpdateDetails(@RequestBody PageDTO pageDTO) {
        pageDTO.setCreatedTime(LocalDateTime.now());
        return this.pageService.saveDetails(pageDTO);
    }

    @DeleteMapping(value={"/pages/{id}"})
    public ResponseEntity<Boolean> deletePageDetails(@PathVariable long id) {
        return this.pageService.deletePageDetails(id);
    }

    @PutMapping(value={"/pages"})
    public ResponseEntity<ScoreCardResponseDTO> updateDetails(@RequestBody PageDTO pageDTO) {
        pageDTO.setUpdatedTime(LocalDateTime.now());
        return this.pageService.updateDetails(pageDTO);
    }

    @GetMapping(value={"/pageList/{empId}"})
    public ResponseEntity<List<PageDTO>> pageList(@PathVariable(value="empId") long empId, HttpServletRequest request) {
        PermissionLocal.get().setPrivilegeMappingDTOS(this.roleService.checkPermissions(Long.valueOf(empId)));
        List<PageDTO> pageList = this.pageService.pageList(empId);
        String privileges = "View";
        request.getSession().setAttribute("pageList", pageList);
        if (CollectionUtils.isNotEmpty((Collection)pageList)) {
            List finalList = pageList.stream().filter(page -> this.predicateCheck.test(RoleConstants.getPageMap().get(((com.estrat.web.dto.PageDTO)page).getPageType()), privileges)).collect(Collectors.toList());
            List ViewfinalList = pageList.stream().filter(page -> {
                String pageType = ((com.estrat.web.dto.PageDTO)page).getPageType();
                return pageType.equals("Scorecardview") || pageType.equals("RiskEvent") || pageType.equals("InitiativeView") || pageType.equals("PowerBI") || pageType.equals("Process Enabaler") || pageType.equals("Strategy Map") || pageType.equals("Impact Survey") || pageType.equals("Rpo") || pageType.equals("Approval Page") || pageType.equals("Risk View") || pageType.equals("Budget") || pageType.equals("Task") || pageType.equals("Risk Radar") || pageType.equals("Compliance") || pageType.equals("AuditManagement") || pageType.equals("Initiative Strategic") || pageType.equals("Compliance Dashboard") || pageType.equals("Scorecard Dashboard") || pageType.equals("Risk Dashboard") || pageType.equals("Incident Management") || pageType.equals("Initiative Dashboard") || pageType.equals("Audit Dashboard");
            }).collect(Collectors.toList());
            for (Object _obj_powerBipage : ViewfinalList) {
                PageDTO powerBipage = (PageDTO) _obj_powerBipage;
                finalList.add(powerBipage);
            }
            return new ResponseEntity(finalList, HttpStatus.OK);
        }
        return new ResponseEntity(Collections.emptyList(), HttpStatus.OK);
    }

    @GetMapping(value={"/pageDeptList/{deptId}"})
    public ResponseEntity<List<PageDTO>> pageDepartmentList(@PathVariable(value="deptId") long deptId, @RequestParam(value="pageType") String pageType, HttpServletRequest request) {
        List pageList = this.pageService.pageDeptList(deptId, pageType);
        return new ResponseEntity(pageList, HttpStatus.OK);
    }

    @GetMapping(value={"/pageDeptList/dept"})
    public ResponseEntity<List<PageDTO>> pagebyDeptId(@RequestParam(value="deptId", required=false) Long deptId, @RequestParam(value="pageType") String pageType, HttpServletRequest request) {
        List pageList = this.pageService.pageDeptList(pageType);
        return new ResponseEntity(pageList, HttpStatus.OK);
    }

    @GetMapping(value={"/pageTypeList"})
    public ResponseEntity<Map<String, String>> pageTypeList(@RequestParam(value="boardType", required=false) String boardType, HttpServletRequest request) {
        PermissionLocal.get().setPrivilegeMappingDTOS(this.roleService.checkPermissions(Long.valueOf(UserThreadLocal.get().getProfile().getEmpId())));
        Map<String, String> boardTypeMap = null;
        boardTypeMap = "whiteboard".equalsIgnoreCase(boardType) ? RoleConstants.getWhiteBoardTypeMap() : RoleConstants.getDashBoardTypeMap();
        String privileges = "Create";
        Map<String, String> pageTypeMap = boardTypeMap.entrySet().stream().sorted(Map.Entry.comparingByValue()).filter(entry -> this.pagePredicate.test(entry.getKey(), privileges)).collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue, (e1, e2) -> e1, LinkedHashMap::new));
        if (!"whiteboard".equalsIgnoreCase(boardType)) {
            pageTypeMap.put("Scorecardview", "Scorecard View");
            pageTypeMap.put("InitiativeView", "Initiative View");
            pageTypeMap.put("Strategy Map", "Strategy Map");
            pageTypeMap.put("Process Enabaler", "Process to Enabler");
            pageTypeMap.put("Rpo", "RPO");
            pageTypeMap.put("Impact Survey", "Impact Assesment");
            pageTypeMap.put("Approval Page", "Approval Page");
            pageTypeMap.put("Risk View", "Risk View");
            pageTypeMap.put("Budget", "Budget");
            pageTypeMap.put("Task", "Task");
            pageTypeMap.put("RiskRadar", "Risk Radar");
            pageTypeMap.put("Compliance", "Compliance");
            pageTypeMap.put("AuditManagement", "Audit Management");
            pageTypeMap.put("InitiativeStrategic", "Initiative Strategic");
            pageTypeMap.put("ComplianceDashboard", "Compliance Dashboard");
            pageTypeMap.put("ScorecardDashboard", "Scorecard Dashboard");
            pageTypeMap.put("RiskDashboard", "Risk Dashboard");
            pageTypeMap.put("IncidentManagement", "Incident Management");
            pageTypeMap.put("InitiativeDashboard", "Initiative Dashboard");
            pageTypeMap.put("AuditDashboard", "Audit Dashboard");
            if (this.pagePredicate.test("Risk", privileges)) {
                pageTypeMap.put("RiskEvent", "Risk Event");
            }
        }
        return new ResponseEntity(pageTypeMap, HttpStatus.OK);
    }

    @GetMapping(value={"/emp/checkPageDetails"})
    public ResponseEntity<Boolean> checkDetails(@RequestParam(value="pageId") String pageId) {
        PageDTO pageDTO = this.pageService.checkPageType(pageId);
        Boolean status = false;
        if (pageDTO != null && (pageDTO.getPageType().equalsIgnoreCase("Initiative_View") || pageDTO.getPageType().equalsIgnoreCase("Initiatives & Projects"))) {
            status = true;
        }
        return new ResponseEntity(status, HttpStatus.OK);
    }

    @PutMapping(value={"updateColumnView"})
    public ResponseEntity<PageDTO> updateColumnView(@RequestBody CockpitViewDTO cockpitViewDTO) throws RequestException {
        return this.pageService.updateColumnView(cockpitViewDTO);
    }

    @GetMapping(value={"/pageListByDeptPageType/{deptId}"})
    public ResponseEntity<List<PageDTO>> pageListByDeptPageType(@PathVariable(value="deptId") long deptId, @RequestParam(value="pageType") String pageType) throws RequestException {
        return new ResponseEntity(this.pageService.pageListByDeptPageType(deptId, pageType), HttpStatus.OK);
    }

    @GetMapping(value={"/pageByDeptListPageType"})
    public ResponseEntity<List<PageDTO>> pageByDeptListPageType(@RequestParam(value="deptId") String deptId, @RequestParam(value="pageType") String pageType) throws RequestException {
        return new ResponseEntity(this.pageService.pageByDeptListPageType(deptId, pageType), HttpStatus.OK);
    }

    @GetMapping(value={"/pageByPinnedList"})
    public ResponseEntity<List<PageDTO>> findAllByPinnedList(@RequestParam(value="deptId") Long deptId) {
        List pageList = this.pageService.findAllByPinnedList(deptId);
        return new ResponseEntity(pageList, HttpStatus.OK);
    }
}

