/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.Initiatives
 *  com.estrat.backend.db.dto.EmployeeDTO
 *  com.estrat.backend.db.dto.InitiativeBudgetDTO
 *  com.estrat.backend.db.dto.InitiativeDashBoardResponseDTO
 *  com.estrat.backend.db.dto.InitiativeResponseDTO
 *  com.estrat.backend.db.dto.InitiativesDTO
 *  com.estrat.backend.db.dto.InitiativesTrackerDTO
 *  com.estrat.backend.db.exception.RequestException
 *  com.estrat.backend.db.repository.DepartmentChartMappingRepository
 *  com.estrat.backend.db.resource.InitiativesController
 *  com.estrat.backend.db.resource.util.InitiativeUtil
 *  com.estrat.backend.db.resource.util.UserThreadLocal
 *  com.estrat.backend.db.service.AuditDetailsService
 *  com.estrat.backend.db.service.CommentsMappingService
 *  com.estrat.backend.db.service.EmployeeService
 *  com.estrat.backend.db.service.InitiativesService
 *  javax.servlet.http.HttpServletRequest
 *  org.apache.commons.lang3.StringUtils
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

import com.estrat.backend.db.bean.po.Initiatives;
import com.estrat.backend.db.dto.EmployeeDTO;
import com.estrat.backend.db.dto.InitiativeBudgetDTO;
import com.estrat.backend.db.dto.InitiativeDashBoardResponseDTO;
import com.estrat.backend.db.dto.InitiativeResponseDTO;
import com.estrat.backend.db.dto.InitiativesDTO;
import com.estrat.backend.db.dto.InitiativesTrackerDTO;
import com.estrat.backend.db.exception.RequestException;
import com.estrat.backend.db.repository.DepartmentChartMappingRepository;
import com.estrat.backend.db.resource.util.InitiativeUtil;
import com.estrat.backend.db.resource.util.UserThreadLocal;
import com.estrat.backend.db.service.AuditDetailsService;
import com.estrat.backend.db.service.CommentsMappingService;
import com.estrat.backend.db.service.EmployeeService;
import com.estrat.backend.db.service.InitiativesService;
import java.text.ParseException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.commons.lang3.StringUtils;
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
    protected InitiativesService initiativesService;
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private InitiativeUtil initiativeUtil;
    @Autowired
    private AuditDetailsService auditService;
    @Autowired
    private CommentsMappingService commentsMappingService;
    @Autowired
    protected DepartmentChartMappingRepository deptMappingDetailRepository;

    @PostMapping(value={"/initiatives"})
    public ResponseEntity<InitiativeResponseDTO> saveInitiativesDetails(@RequestBody InitiativesDTO initiativesDTO, HttpServletRequest request) throws RequestException {
        this.initiativeUtil.applyDefaultValues(initiativesDTO.getInitiativeValue());
        EmployeeDTO employeeDTO = new EmployeeDTO();
        if (initiativesDTO.getCreatedBy() != 0L) {
            employeeDTO.setEmployeeId(initiativesDTO.getCreatedBy());
            initiativesDTO.getInitiativeValue().put("createdByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (initiativesDTO.getUpdatedBy() != 0L) {
            employeeDTO.setEmployeeId(initiativesDTO.getUpdatedBy());
            initiativesDTO.getInitiativeValue().put("updatedByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (initiativesDTO.getOwner() != 0L) {
            employeeDTO.setEmployeeId(initiativesDTO.getOwner());
            initiativesDTO.getInitiativeValue().put("ownerName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        Initiatives initiatives = new Initiatives(this.initiativeUtil.formatDates(initiativesDTO));
        initiatives.setCreatedTime(LocalDateTime.now());
        InitiativeResponseDTO initiativeResponseDTO = this.initiativesService.save(initiatives);
        this.auditService.saveAudit("Initiative", initiativeResponseDTO.getInitiativesDTO().getId(), initiativeResponseDTO.getInitiativesDTO().getCreatedBy(), "Initiative Created");
        String loggedInEmpId = request.getHeader("LOGGED_IN_EMPLOYEE_ID");
        return new ResponseEntity((Object)initiativeResponseDTO, HttpStatus.OK);
    }

    @PostMapping(value={"/initiativestracker"})
    public ResponseEntity<Map<String, Long>> saveInitiativesTracker(@RequestBody List<InitiativesTrackerDTO> initiativesDTO, HttpServletRequest request) throws RequestException {
        String loggedInEmpId = request.getHeader("LOGGED_IN_EMPLOYEE_ID");
        Map initiativeResponseDTO = this.initiativesService.saveTracker(initiativesDTO);
        return new ResponseEntity((Object)initiativeResponseDTO, HttpStatus.OK);
    }

    @PostMapping(value={"/initiativesbudget"})
    public ResponseEntity<Map<String, Long>> saveInitiativesBudget(@RequestBody List<InitiativeBudgetDTO> initiativesDTO, HttpServletRequest request) throws RequestException {
        String loggedInEmpId = request.getHeader("LOGGED_IN_EMPLOYEE_ID");
        Map initiativeResponseDTO = this.initiativesService.saveBudget(initiativesDTO);
        return new ResponseEntity((Object)initiativeResponseDTO, HttpStatus.OK);
    }

    @PutMapping(value={"/initiatives"})
    public ResponseEntity<InitiativeResponseDTO> updateInitiativesDetails(@RequestBody InitiativesDTO initiativesDTO, HttpServletRequest request) throws RequestException {
        this.initiativeUtil.applyDefaultValues(initiativesDTO.getInitiativeValue());
        EmployeeDTO employeeDTO = new EmployeeDTO();
        if (initiativesDTO.getCreatedBy() != 0L) {
            employeeDTO.setEmployeeId(initiativesDTO.getCreatedBy());
            initiativesDTO.getInitiativeValue().put("createdByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (initiativesDTO.getUpdatedBy() != 0L) {
            employeeDTO.setEmployeeId(initiativesDTO.getUpdatedBy());
            initiativesDTO.getInitiativeValue().put("updatedByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (initiativesDTO.getOwner() != 0L) {
            employeeDTO.setEmployeeId(initiativesDTO.getOwner());
            initiativesDTO.getInitiativeValue().put("ownerName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        Initiatives initiatives = new Initiatives(this.initiativeUtil.formatDates(initiativesDTO));
        initiatives.setUpdatedTime(LocalDateTime.now());
        InitiativeResponseDTO initiativeResponseDTO = this.initiativesService.save(initiatives);
        this.auditService.saveAudit("Initiative", initiativeResponseDTO.getInitiativesDTO().getId(), initiativeResponseDTO.getInitiativesDTO().getUpdatedBy(), "Initiative Modified");
        return new ResponseEntity((Object)initiativeResponseDTO, HttpStatus.OK);
    }

    @GetMapping(value={"/initiatives/{id}"})
    public ResponseEntity<InitiativesDTO> getInitiativesDetailsById(@PathVariable(value="id") Long id, @RequestParam(value="loadFlag", required=false) String loadFlag, HttpServletRequest request) throws RequestException, ParseException {
        Initiatives initiatives = (Initiatives)this.initiativesService.findById(id.longValue()).get();
        boolean flag = loadFlag != null ? Boolean.valueOf(loadFlag) : false;
        InitiativesDTO initiativesDTO = new InitiativesDTO(initiatives, flag);
        if (flag && !initiativesDTO.getCommentsList().isEmpty()) {
            initiativesDTO.getCommentsList().stream().map(obj -> {
                obj.setLikeEmpIds(this.commentsMappingService.findAllBbyCommentID(Long.valueOf(obj.getId()), "comment"));
                return obj;
            }).collect(Collectors.toList());
        }
        if (initiativesDTO.getDepartmentId() != null) {
            initiativesDTO.getInitiativeValue().put("dept", this.deptMappingDetailRepository.getOne(initiativesDTO.getDepartmentId()).getDeptName());
        }
        this.initiativesService.populateActual(initiativesDTO);
        this.initiativesService.populateImpactDesc(initiativesDTO);
        this.initiativesService.populateBudget(initiativesDTO);
        this.initiativesService.populateTotalBudgetAndActual(initiativesDTO);
        this.initiativesService.buildInitiativeOwnerMppingDTO(initiativesDTO, Long.valueOf(request.getHeader("LOGGED_IN_EMPLOYEE_ID")));
        return new ResponseEntity((Object)initiativesDTO, HttpStatus.OK);
    }

    @GetMapping(value={"/initiativesListbyId"})
    public ResponseEntity<List<InitiativesDTO>> getInitiativesDetailsById(@RequestParam(value="id") String id, @RequestParam(value="dateRange") String dateRange, @RequestParam(value="loadFlag", required=false) String loadFlag) throws RequestException, ParseException {
        List initiatives = this.initiativesService.findInitiativeIdList(id, dateRange);
        return new ResponseEntity((Object)initiatives, HttpStatus.OK);
    }

    @DeleteMapping(value={"/initiatives/{id}"})
    public ResponseEntity<InitiativeResponseDTO> deleteInitiativesDetailsById(@PathVariable(value="id") Long id, HttpServletRequest request) throws RequestException {
        this.auditService.saveAudit("Initiative", id.longValue(), Long.valueOf(UserThreadLocal.get((String)"LOGGED_IN_EMPLOYEE_ID")).longValue(), "Initiative Deleted");
        return new ResponseEntity((Object)this.initiativesService.deleteByInitiativeId(id.longValue()), HttpStatus.OK);
    }

    @GetMapping(value={"/initiativesList/{empId}"})
    public ResponseEntity<List<InitiativesDTO>> findAll(@PathVariable(value="empId") long empId, @RequestParam(value="loadFlag", required=false) String loadFlag, @RequestParam(value="pageId", required=false) String pageId, @RequestParam(value="nodate", required=false) String nodate) throws RequestException {
        boolean flag = loadFlag != null ? Boolean.valueOf(loadFlag) : false;
        List initiativesDTOList = null;
        initiativesDTOList = "nodate".equals(nodate) ? this.initiativesService.findAll(empId, flag, pageId) : this.initiativesService.findAll(empId, flag, pageId, UserThreadLocal.get((String)"DATE_PERIOD"));
        return new ResponseEntity((Object)initiativesDTOList, HttpStatus.OK);
    }

    @GetMapping(value={"/initiativesListByEmpId/{empId}"})
    public ResponseEntity<List<InitiativesDTO>> initiativesListByEmpId(@PathVariable(value="empId") long empId) throws RequestException {
        List initiativesDTOList = this.initiativesService.initiativesListByEmpId(empId);
        return new ResponseEntity((Object)initiativesDTOList, HttpStatus.OK);
    }

    @GetMapping(value={"/kpi/initiativesList/{kpiId}"})
    public ResponseEntity<List<InitiativesDTO>> impactedInitiatives(@PathVariable(value="kpiId") long kpiId) throws RequestException {
        List initiativesDTOList = this.initiativesService.findImpactedInitiatives(kpiId);
        return new ResponseEntity((Object)initiativesDTOList, HttpStatus.OK);
    }

    @GetMapping(value={"/kpi/check"})
    public ResponseEntity<List<InitiativesDTO>> check() throws RequestException {
        List initiativesDTOList = this.initiativesService.initiativesList();
        return new ResponseEntity((Object)initiativesDTOList, HttpStatus.OK);
    }

    @GetMapping(value={"/initiativesListByDeptId/{deptId}"})
    public ResponseEntity<List<InitiativesDTO>> initiativesListByDeptId(@PathVariable(value="deptId") long deptId) throws RequestException, ParseException {
        List initiativesDTOList = this.initiativesService.initiativesListByDeptId(deptId);
        return new ResponseEntity((Object)initiativesDTOList, HttpStatus.OK);
    }

    @GetMapping(value={"/initiativesdtoListByempId/{empId}"})
    public ResponseEntity<List<InitiativesDTO>> initiativesdtoListByempId(@PathVariable(value="empId") long empId) {
        return new ResponseEntity((Object)this.initiativesService.checkinitiativeListByEmpId(empId, false), HttpStatus.OK);
    }

    @GetMapping(value={"/initiativesDtoListByDeptId"})
    public ResponseEntity<List<InitiativesDTO>> initiativesDtoListByDeptId() {
        return new ResponseEntity((Object)this.initiativesService.checkinitiativeListByDeptId(), HttpStatus.OK);
    }

    @GetMapping(value={"/initiativesListWithDeptids"})
    public ResponseEntity<List<InitiativesDTO>> initiativesListWithDeptids(@RequestParam(value="deptIds", required=false) String deptIds) throws RequestException, ParseException {
        List initiativesDTOList = null;
        String[] searchArray = new String[]{"%20", "%2520"};
        String[] replaceArray = new String[]{" ", " "};
        String result = StringUtils.replaceEach((String)deptIds, (String[])searchArray, (String[])replaceArray);
        if (result != null && !result.isEmpty() && !result.equals("")) {
            initiativesDTOList = this.initiativesService.findInitiativeIdListDept(result);
        }
        return new ResponseEntity(initiativesDTOList, HttpStatus.OK);
    }

    @GetMapping(value={"/initiativesListWithChild/{empId}"})
    public ResponseEntity<List<InitiativesDTO>> initiativesListWithChild(@PathVariable(value="empId") long empId, @RequestParam(value="initiativeIds", required=false) String initiativeIds, @RequestParam(value="pageIds", required=false) String pageIds, @RequestParam(value="dateRange", required=false) String dateRange) throws RequestException, ParseException {
        List initiativesDTOList = null;
        String[] searchArray = new String[]{"%20", "%2520"};
        String[] replaceArray = new String[]{" ", " "};
        String pages = StringUtils.replaceEach((String)pageIds, (String[])searchArray, (String[])replaceArray);
        String initiative = StringUtils.replaceEach((String)initiativeIds, (String[])searchArray, (String[])replaceArray);
        initiativesDTOList = pages != null && !pages.isEmpty() && !pages.equals("") ? this.initiativesService.findInitiativePageIdList(pages, dateRange) : (initiative != null && !initiative.isEmpty() && !initiative.equals("") ? this.initiativesService.findInitiativeIdList(initiative, dateRange) : this.initiativesService.findAll(empId));
        return new ResponseEntity((Object)initiativesDTOList, HttpStatus.OK);
    }

    @GetMapping(value={"/initiativeViewList/{empId}"})
    public ResponseEntity<List<InitiativesDTO>> initiativeViewList(@PathVariable(value="empId") long empId, @RequestParam(value="loadFlag", required=false) String loadFlag, @RequestParam(value="pageId", required=false) String pageId, @RequestParam(value="nodate", required=false) String nodate) throws RequestException {
        boolean flag = loadFlag != null ? Boolean.valueOf(loadFlag) : false;
        List initiativesDTOList = null;
        initiativesDTOList = "nodate".equals(nodate) ? this.initiativesService.findAll(empId, flag, pageId) : this.initiativesService.findAllByMappingList(empId, flag, pageId, UserThreadLocal.get((String)"DATE_PERIOD"));
        return new ResponseEntity((Object)initiativesDTOList, HttpStatus.OK);
    }

    @GetMapping(value={"/initiativeDashBoardData"})
    public ResponseEntity<InitiativeDashBoardResponseDTO> initiativeDashBoardDataDeptId(@RequestParam(value="deptId", required=false) Long deptId) throws RequestException, ParseException {
        List responseRiskDTOList = this.initiativesService.initiativesDashBoardListByDeptId(deptId.longValue());
        InitiativeDashBoardResponseDTO dashboardDTO = this.initiativesService.buildInitiativeDashboard(responseRiskDTOList);
        return new ResponseEntity((Object)dashboardDTO, HttpStatus.OK);
    }
}

