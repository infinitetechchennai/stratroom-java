/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.Employee
 *  com.estrat.backend.db.bean.po.EmployeeProfilePo
 *  com.estrat.backend.db.bean.po.PagesDetails
 *  com.estrat.backend.db.dto.CockpitViewDTO
 *  com.estrat.backend.db.dto.ControlPanelGeneralDTO
 *  com.estrat.backend.db.dto.PageDTO
 *  com.estrat.backend.db.dto.ScoreCardResponseDTO
 *  com.estrat.backend.db.exception.InputValidationException
 *  com.estrat.backend.db.exception.RequestException
 *  com.estrat.backend.db.resource.PageController
 *  com.estrat.backend.db.resource.util.UserThreadLocal
 *  com.estrat.backend.db.service.AuditDetailsService
 *  com.estrat.backend.db.service.ControlPanelGeneralService
 *  com.estrat.backend.db.service.DepartmentDetailsService
 *  com.estrat.backend.db.service.EmployeeService
 *  com.estrat.backend.db.service.OrgTrackerService
 *  com.estrat.backend.db.service.PageService
 *  com.estrat.backend.db.service.ScoreCardDetailsService
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
package com.estrat.backend.db.resource;

import com.estrat.backend.db.bean.Employee;
import com.estrat.backend.db.bean.po.EmployeeProfilePo;
import com.estrat.backend.db.bean.po.PagesDetails;
import com.estrat.backend.db.dto.CockpitViewDTO;
import com.estrat.backend.db.dto.ControlPanelGeneralDTO;
import com.estrat.backend.db.dto.PageDTO;
import com.estrat.backend.db.dto.ScoreCardResponseDTO;
import com.estrat.backend.db.exception.InputValidationException;
import com.estrat.backend.db.exception.RequestException;
import com.estrat.backend.db.resource.util.UserThreadLocal;
import com.estrat.backend.db.service.AuditDetailsService;
import com.estrat.backend.db.service.ControlPanelGeneralService;
import com.estrat.backend.db.service.DepartmentDetailsService;
import com.estrat.backend.db.service.EmployeeService;
import com.estrat.backend.db.service.OrgTrackerService;
import com.estrat.backend.db.service.PageService;
import com.estrat.backend.db.service.ScoreCardDetailsService;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;
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
public class PageController {
    @Autowired
    protected PageService pageService;
    @Autowired
    protected ScoreCardDetailsService scoreCardDetailsService;
    @Autowired
    protected AuditDetailsService auditService;
    @Autowired
    protected OrgTrackerService orgTrackerService;
    @Autowired
    public ControlPanelGeneralService controlPanelGeneralService;
    @Autowired
    protected DepartmentDetailsService departmentDetailsService;
    @Autowired
    protected EmployeeService employeeService;

    @PostMapping(value={"/pages"})
    public ResponseEntity<ScoreCardResponseDTO> savePageDetails(@RequestBody PageDTO pageDTO) throws RequestException {
        Optional<PagesDetails> pageDetails = this.pageService.findByName(pageDTO.getPageName(), Long.valueOf(pageDTO.getCreatedBy()).longValue());
        if (pageDetails.isPresent()) {
            throw new InputValidationException("Duplicate PageName Provided");
        }
        PagesDetails pagesDetails = new PagesDetails(pageDTO);
        if (pagesDetails.getDeptId() == null) {
            pagesDetails.setDeptId(this.pageService.getDeptId(Long.valueOf(pagesDetails.getCreatedBy())));
        }
        pagesDetails.setCreatedTime(LocalDateTime.now());
        if (pagesDetails.getPageType().equalsIgnoreCase("Cockpit")) {
            pagesDetails.setColumnType("TWO");
        }
        ScoreCardResponseDTO scoreCardResponseDTO = this.pageService.save(pagesDetails);
        this.updateAuditTrail(Long.valueOf(scoreCardResponseDTO.getPageDTO().getId()), "create");
        this.updateOrgTracker(Long.valueOf(scoreCardResponseDTO.getPageDTO().getId()), Long.valueOf(UserThreadLocal.get()), "create");
        return new ResponseEntity((Object)scoreCardResponseDTO, HttpStatus.OK);
    }

    @PutMapping(value={"/pages"})
    public ResponseEntity<ScoreCardResponseDTO> updatePageDetails(@RequestBody PageDTO pageDTO) throws RequestException {
        PagesDetails pagesDetails = new PagesDetails(pageDTO);
        if (pagesDetails.getDeptId() == null) {
            if (pagesDetails.getId() > 0L) {
                PageDTO pagedto = this.pageService.getPage(Long.valueOf(pagesDetails.getId()));
                pagesDetails.setDeptId(pagedto.getDeptId());
            } else {
                pagesDetails.setDeptId(this.pageService.getDeptId(Long.valueOf(pagesDetails.getCreatedBy())));
            }
        }
        pagesDetails.setUpdatedTime(LocalDateTime.now());
        pagesDetails.setUpdatedBy(Long.valueOf(UserThreadLocal.get()).longValue());
        if (pageDTO.getPinned() != null && pageDTO.getPinned().equalsIgnoreCase("true")) {
            PagesDetails pageWithPin = null;
            if (pagesDetails.getPageType().equals("Standard_View")) {
                pageWithPin = this.pageService.findAllByPinnedWithType(pagesDetails.getDeptId().longValue(), "Standard_View");
            } else if (pagesDetails.getPageType().equals("Initiatives & Projects")) {
                pageWithPin = this.pageService.findAllByPinnedWithType(pagesDetails.getDeptId().longValue(), "Initiatives & Projects");
            } else if (pagesDetails.getPageType().equals("Risk")) {
                pageWithPin = this.pageService.findAllByPinnedWithType(pagesDetails.getDeptId().longValue(), "Risk");
            }
            if (pageWithPin != null) {
                pageWithPin.setPinned("false");
                this.pageService.save(pageWithPin);
            }
        }
        ScoreCardResponseDTO scoreCardResponseDTO = this.pageService.save(pagesDetails);
        this.pageService.updateHomePreference(scoreCardResponseDTO.getPageDTO().getCreatedBy(), scoreCardResponseDTO.getPageDTO().getId(), scoreCardResponseDTO.getPageDTO().getPageName());
        if (scoreCardResponseDTO.getPageDTO().getPageType().equals("Standard_View")) {
            this.scoreCardDetailsService.update(Long.valueOf(scoreCardResponseDTO.getPageDTO().getId()), scoreCardResponseDTO.getPageDTO().getPageName(), Long.valueOf(scoreCardResponseDTO.getPageDTO().getUpdatedBy()));
        }
        this.updateOrgTracker(Long.valueOf(scoreCardResponseDTO.getPageDTO().getId()), Long.valueOf(UserThreadLocal.get()), "update");
        this.updateAuditTrail(Long.valueOf(scoreCardResponseDTO.getPageDTO().getId()), "update");
        return new ResponseEntity((Object)scoreCardResponseDTO, HttpStatus.OK);
    }

    @GetMapping(value={"/pages/{id}"})
    public ResponseEntity<PageDTO> getPageDetailsById(@PathVariable(value="id") Long id) throws RequestException {
        Optional<PagesDetails> pagesDetails = this.pageService.findById(id.longValue());
        if (pagesDetails.isPresent()) {
            PageDTO pageDTO = new PageDTO((PagesDetails)pagesDetails.get());
            return new ResponseEntity((Object)pageDTO, HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    @GetMapping(value={"/pages/{pagename}/{empId}"})
    public ResponseEntity<PageDTO> getPageDetailsById(@PathVariable(value="pagename") String pagename, @PathVariable(value="empId") long empId) throws RequestException {
        Optional<PagesDetails> pagesDetails = this.pageService.findByName(pagename, empId);
        if (pagesDetails.isPresent()) {
            PageDTO pageDTO = new PageDTO((PagesDetails)pagesDetails.get());
            return new ResponseEntity((Object)pageDTO, HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping(value={"/pages/{id}"})
    public ResponseEntity<ScoreCardResponseDTO> deletePagesDetailsById(@PathVariable(value="id") Long id) throws RequestException {
        ScoreCardResponseDTO cardResponseDTO = new ScoreCardResponseDTO();
        this.updateAuditTrail(id, "delete");
        this.updateOrgTracker(id, Long.valueOf(UserThreadLocal.get()), "delete");
        cardResponseDTO.setFlag(this.pageService.deletePageById(id.longValue()));
        return new ResponseEntity((Object)cardResponseDTO, HttpStatus.OK);
    }

    @GetMapping(value={"/pageList/{empId}"})
    public ResponseEntity<List<PageDTO>> findAll(@PathVariable(value="empId") long empId) throws RequestException {
        String orgIdStr = UserThreadLocal.get("USER_ORG_ID");
        Long orgId = orgIdStr != null ? Long.valueOf(orgIdStr) : 1L;
        System.out.println("org did :: " + orgId);
        ControlPanelGeneralDTO controlPanelGeneral = this.controlPanelGeneralService.findByOrgId(orgId);
        System.out.println("controlPanelGeneral :::: " + controlPanelGeneral);
        if (controlPanelGeneral != null && controlPanelGeneral.getImplementationType() != null && controlPanelGeneral.getImplementationType().equalsIgnoreCase("Department")) {
            List<PageDTO> pageDTOS;
            List<Long> departmentlist = new ArrayList<>();
            departmentlist = this.departmentDetailsService.getDeptList(empId);
            EmployeeProfilePo empProfilepo = this.employeeService.getEmployeeProfile(Long.valueOf(empId));
            if (Objects.nonNull(empProfilepo) && Objects.nonNull(empProfilepo.getDeptId())) {
                departmentlist.add(empProfilepo.getDeptId().getId());
            }
            if (CollectionUtils.isNotEmpty((Collection)(pageDTOS = this.pageService.findAllByDept(departmentlist)))) {
                return new ResponseEntity((Object)pageDTOS, HttpStatus.OK);
            }
        } else {
            List<PageDTO> pageDTOS = this.pageService.findAll(empId);
            if (CollectionUtils.isNotEmpty((Collection)pageDTOS)) {
                return new ResponseEntity((Object)pageDTOS, HttpStatus.OK);
            }
        }
        return new ResponseEntity(Collections.emptyList(), HttpStatus.OK);
    }

    @GetMapping(value={"/pageDeptList/{deptId}"})
    public ResponseEntity<List<PageDTO>> findDeptAll(@PathVariable(value="deptId") long deptId, @RequestParam(value="pageType") String pageType) throws RequestException {
        ArrayList<Long> departmentlist = new ArrayList<>();
        List<PageDTO> finalList = new ArrayList<>();
        departmentlist.add(deptId);
        List<PageDTO> pageDTOS = this.pageService.findAllByDept(departmentlist);
        if (pageType.equalsIgnoreCase("scorecard")) {
            finalList = pageDTOS.stream().filter(val -> val.getPageType().equals("Standard_View")).collect(Collectors.toList());
        } else if (pageType.equalsIgnoreCase("initiative")) {
            finalList = pageDTOS.stream().filter(val -> val.getPageType().equals("Initiatives & Projects")).collect(Collectors.toList());
        } else if (pageType.equalsIgnoreCase("Strategymap")) {
            finalList = pageDTOS.stream().filter(val -> val.getPageType().equals("Strategy Map")).collect(Collectors.toList());
        } else if (pageType.equalsIgnoreCase("budget")) {
            finalList = pageDTOS.stream().filter(val -> val.getPageType().equals("Budget")).collect(Collectors.toList());
        } else if (pageType.equalsIgnoreCase("risk")) {
            finalList = pageDTOS.stream().filter(val -> val.getPageType().equals("Risk")).collect(Collectors.toList());
        } else if (pageType.equalsIgnoreCase("Compliance")) {
            finalList = pageDTOS.stream().filter(val -> val.getPageType().equals("Compliance")).collect(Collectors.toList());
        }
        return new ResponseEntity(finalList, HttpStatus.OK);
    }

    @GetMapping(value={"/checkpages/{pagename}/{empId}"})
    public ResponseEntity<Map<String, Object>> checkpages(@PathVariable(value="pagename") String pagename, @PathVariable(value="empId") long empId) throws RequestException {
        HashMap<String, Object> mapvalue = new HashMap<String, Object>();
        Optional<PagesDetails> pagesDetails = this.pageService.findByName(pagename, empId);
        if (pagesDetails.isPresent()) {
            PageDTO pageDTO = new PageDTO((PagesDetails)pagesDetails.get());
            mapvalue.put("pageId", pageDTO.getId());
            mapvalue.put("success", "success");
            return new ResponseEntity(mapvalue, HttpStatus.OK);
        }
        mapvalue.put("failure", "failure");
        return new ResponseEntity(mapvalue, HttpStatus.OK);
    }

    @GetMapping(value={"/getDefaultPage"})
    public ResponseEntity<PageDTO> getDefaultPage(@RequestParam(value="pageType") String pageType) {
        return new ResponseEntity((Object)this.pageService.getDefaultPage(UserThreadLocal.get(), pageType), HttpStatus.OK);
    }

    @GetMapping(value={"/emp/checkDetails"})
    public ResponseEntity<PageDTO> checkDetails(@RequestParam(value="pageId") String pageId) {
        return new ResponseEntity((Object)this.pageService.checkPageType(pageId), HttpStatus.OK);
    }

    @GetMapping(value={"/pageListByPageType/{empId}"})
    public ResponseEntity<List<PageDTO>> pageListByPageType(@PathVariable(value="empId") long empId, @RequestParam(value="pageType") String pageType) throws RequestException {
        ControlPanelGeneralDTO controlPanelGeneral = this.controlPanelGeneralService.findByOrgId(Long.valueOf(UserThreadLocal.get((String)"USER_ORG_ID")).longValue());
        List<PageDTO> pageDTOS = new ArrayList<>();
        if (controlPanelGeneral != null && controlPanelGeneral.getImplementationType() != null && controlPanelGeneral.getImplementationType().equalsIgnoreCase("Department")) {
            Employee emp = this.employeeService.getProfileDetails(empId);
            pageDTOS = this.pageService.findAllByDept(emp.getDeptDetails().getId(), pageType);
        } else {
            pageDTOS = this.pageService.findAll(empId, pageType);
        }
        if (CollectionUtils.isNotEmpty(pageDTOS)) {
            return new ResponseEntity(pageDTOS, HttpStatus.OK);
        }
        return new ResponseEntity(Collections.emptyList(), HttpStatus.OK);
    }

    public void updateOrgTracker(Long id, Long whoIsID, String status) {
        if (status.equalsIgnoreCase("create")) {
            this.orgTrackerService.saveTrack(id, whoIsID);
        } else if (status.equalsIgnoreCase("update")) {
            this.orgTrackerService.updateTrack(id, whoIsID);
        } else if (status.equalsIgnoreCase("delete")) {
            this.orgTrackerService.deleteTrack(id, whoIsID);
        }
    }

    @PutMapping(value={"updateColumnView"})
    public ResponseEntity<PageDTO> updateColumnView(@RequestBody CockpitViewDTO cockpitViewDTO) throws RequestException {
        return new ResponseEntity((Object)this.pageService.updateColumnView(cockpitViewDTO), HttpStatus.OK);
    }

    public void updateAuditTrail(Long id, String type) {
        Optional<PagesDetails> pagesDetails = this.pageService.findById(id.longValue());
        if (pagesDetails.isPresent()) {
            PageDTO pageDTO = new PageDTO((PagesDetails)pagesDetails.get());
            String page_type = null;
            page_type = pageDTO.getPageType().equalsIgnoreCase("Standard_View") || pageDTO.getPageType().equalsIgnoreCase("Scorecard") ? "ScoreCard" : pageDTO.getPageType();
            if (type.equalsIgnoreCase("create")) {
                this.auditService.saveAudit("Page", pageDTO.getId(), pageDTO.getCreatedBy(), page_type + " Created");
            } else if (type.equalsIgnoreCase("update") && page_type != "ScoreCard") {
                this.auditService.updateAudit("Page", pageDTO.getId(), pageDTO.getUpdatedBy(), page_type + " Updated");
            } else if (type.equalsIgnoreCase("delete")) {
                this.auditService.deleteAudit("Page", pageDTO.getId(), Long.valueOf(UserThreadLocal.get()).longValue(), page_type + "  Deleted");
            }
        }
    }

    @GetMapping(value={"/pageListByDeptPageType/{deptId}"})
    public ResponseEntity<List<PageDTO>> pageListByDeptPageType(@PathVariable(value="deptId") long deptId, @RequestParam(value="pageType") String pageType) throws RequestException {
        List<PageDTO> pageDTOS = this.pageService.findAllByDept(deptId, pageType);
        if (CollectionUtils.isNotEmpty((Collection)pageDTOS)) {
            return new ResponseEntity((Object)pageDTOS, HttpStatus.OK);
        }
        return new ResponseEntity(Collections.emptyList(), HttpStatus.OK);
    }

    @GetMapping(value={"/pageByDeptListPageType"})
    public ResponseEntity<List<PageDTO>> pageByDeptListPageType(@RequestParam(value="deptId") String deptId, @RequestParam(value="pageType") String pageType) throws RequestException {
        List<PageDTO> pageDTOS = this.pageService.findAllByDeptList(deptId, pageType);
        if (CollectionUtils.isNotEmpty((Collection)pageDTOS)) {
            return new ResponseEntity((Object)pageDTOS, HttpStatus.OK);
        }
        return new ResponseEntity(Collections.emptyList(), HttpStatus.OK);
    }

    @GetMapping(value={"/pageByPinnedList"})
    public ResponseEntity<List<PageDTO>> findAllByPinnedList(@RequestParam(value="deptId") Long deptId) throws RequestException {
        List<PageDTO> pageDTOS = this.pageService.findAllByPinnedList(deptId.longValue());
        if (CollectionUtils.isNotEmpty((Collection)pageDTOS)) {
            return new ResponseEntity((Object)pageDTOS, HttpStatus.OK);
        }
        return new ResponseEntity(Collections.emptyList(), HttpStatus.OK);
    }
}

