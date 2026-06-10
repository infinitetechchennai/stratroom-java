/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.Employee
 *  com.estrat.service.db.bean.po.KPI
 *  com.estrat.service.db.bean.po.RiskDetails
 *  com.estrat.service.db.bean.po.RiskDetailsHistory
 *  com.estrat.service.db.bean.po.RiskEvent
 *  com.estrat.service.db.bean.po.RiskEventHistory
 *  com.estrat.service.db.bean.po.StagingChange
 *  com.estrat.service.db.bean.po.WorkflowStagingResponse
 *  com.estrat.service.db.cache.DBCache
 *  com.estrat.service.db.dao.ApproversHistoryRepository
 *  com.estrat.service.db.dao.ControlPanelWorkFlowRepository
 *  com.estrat.service.db.dao.RiskDetailsHistoryRepository
 *  com.estrat.service.db.dao.RiskEventHistoryRepository
 *  com.estrat.service.db.dao.StagingChangeRepository
 *  com.estrat.service.db.dto.DeptDetails
 *  com.estrat.service.db.dto.EmployeeDTO
 *  com.estrat.service.db.dto.KPIDTO
 *  com.estrat.service.db.dto.RiskCustomScoreDto
 *  com.estrat.service.db.dto.RiskDTO
 *  com.estrat.service.db.dto.RiskDashBoardResponseDTO
 *  com.estrat.service.db.dto.RiskEventDTO
 *  com.estrat.service.db.dto.RiskEventNameCountDto
 *  com.estrat.service.db.dto.RiskOptionsDto
 *  com.estrat.service.db.dto.RiskResponseDTO
 *  com.estrat.service.db.exception.RequestException
 *  com.estrat.service.db.resource.RiskDetailController
 *  com.estrat.service.db.resource.util.RiskUtil
 *  com.estrat.service.db.resource.util.UserThreadLocal
 *  com.estrat.service.db.service.ApproversHistoryService
 *  com.estrat.service.db.service.AuditDetailsService
 *  com.estrat.service.db.service.CommentsMappingService
 *  com.estrat.service.db.service.ControlPanelWorkFlowService
 *  com.estrat.service.db.service.DepartmentDetailsService
 *  com.estrat.service.db.service.EmployeeService
 *  com.estrat.service.db.service.KPIService
 *  com.estrat.service.db.service.RiskDetailsHistoryService
 *  com.estrat.service.db.service.RiskDetailsService
 *  com.estrat.service.db.service.RiskEventHistoryService
 *  com.estrat.service.db.service.StagingChangeService
 *  com.estrat.service.db.service.UserRoleManagementService
 *  com.estrat.service.db.service.WorkflowStagingService
 *  com.fasterxml.jackson.core.JsonParseException
 *  com.fasterxml.jackson.databind.JsonMappingException
 *  com.google.gson.Gson
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
package com.estrat.service.db.resource;

import com.estrat.service.db.bean.Employee;
import com.estrat.service.db.bean.po.KPI;
import com.estrat.service.db.bean.po.RiskDetails;
import com.estrat.service.db.bean.po.RiskDetailsHistory;
import com.estrat.service.db.bean.po.RiskEvent;
import com.estrat.service.db.bean.po.RiskEventHistory;
import com.estrat.service.db.bean.po.StagingChange;
import com.estrat.service.db.bean.po.WorkflowStagingResponse;
import com.estrat.service.db.cache.DBCache;
import com.estrat.service.db.dao.ApproversHistoryRepository;
import com.estrat.service.db.dao.ControlPanelWorkFlowRepository;
import com.estrat.service.db.dao.RiskDetailsHistoryRepository;
import com.estrat.service.db.dao.RiskEventHistoryRepository;
import com.estrat.service.db.dao.StagingChangeRepository;
import com.estrat.service.db.dto.DeptDetails;
import com.estrat.service.db.dto.EmployeeDTO;
import com.estrat.service.db.dto.KPIDTO;
import com.estrat.service.db.dto.RiskCustomScoreDto;
import com.estrat.service.db.dto.RiskDTO;
import com.estrat.service.db.dto.RiskDashBoardResponseDTO;
import com.estrat.service.db.dto.RiskEventDTO;
import com.estrat.service.db.dto.RiskEventNameCountDto;
import com.estrat.service.db.dto.RiskOptionsDto;
import com.estrat.service.db.dto.RiskResponseDTO;
import com.estrat.service.db.exception.RequestException;
import com.estrat.service.db.resource.util.RiskUtil;
import com.estrat.service.db.resource.util.UserThreadLocal;
import com.estrat.service.db.service.ApproversHistoryService;
import com.estrat.service.db.service.AuditDetailsService;
import com.estrat.service.db.service.CommentsMappingService;
import com.estrat.service.db.service.ControlPanelWorkFlowService;
import com.estrat.service.db.service.DepartmentDetailsService;
import com.estrat.service.db.service.EmployeeService;
import com.estrat.service.db.service.KPIService;
import com.estrat.service.db.service.RiskDetailsHistoryService;
import com.estrat.service.db.service.RiskDetailsService;
import com.estrat.service.db.service.RiskEventHistoryService;
import com.estrat.service.db.service.StagingChangeService;
import com.estrat.service.db.service.UserRoleManagementService;
import com.estrat.service.db.service.WorkflowStagingService;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.google.gson.Gson;
import java.io.IOException;
import java.text.ParseException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
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
public class RiskDetailController {
    @Autowired
    protected RiskDetailsService riskDetailsService;
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private DepartmentDetailsService departmentDetailsService;
    @Autowired
    private DBCache dbCache;
    @Autowired
    private RiskUtil riskUtil;
    @Autowired
    private AuditDetailsService auditService;
    @Autowired
    private CommentsMappingService commentsMappingService;
    @Autowired
    private ApproversHistoryService approversHistoryService;
    @Autowired
    private ControlPanelWorkFlowService controlPanelWorkFlowService;
    @Autowired
    ApproversHistoryRepository approversHistoryRepo;
    @Autowired
    StagingChangeService stagingChangeService;
    @Autowired
    WorkflowStagingService workflowStagingService;
    @Autowired
    ControlPanelWorkFlowRepository workflowRepository;
    @Autowired
    StagingChangeRepository stagingChangesRepository;
    @Autowired
    UserRoleManagementService userRoleManagement;
    @Autowired
    private KPIService kpiService;
    @Autowired
    private RiskDetailsHistoryService riskDetailsHistoryService;
    @Autowired
    private RiskEventHistoryService riskEventHistoryService;
    @Autowired
    private RiskDetailsHistoryRepository riskDetailsHistoryRepository;
    @Autowired
    private RiskEventHistoryRepository riskEventHistoryRepository;

    @PostMapping(value={"/risk"})
    public ResponseEntity<RiskResponseDTO> saveRiskDetails(@RequestBody RiskDTO riskDTO, HttpServletRequest request) throws RequestException {
        WorkflowStagingResponse workflowResponse;
        DeptDetails deptDetailsService;
        EmployeeDTO logemployeeDTO = new EmployeeDTO();
        logemployeeDTO.setEmployeeId(Long.valueOf(UserThreadLocal.get((String)"LOGGED_IN_EMPLOYEE_ID")).longValue());
        EmployeeDTO navemployeeDTO = new EmployeeDTO();
        navemployeeDTO.setEmployeeId(Long.valueOf(UserThreadLocal.get((String)"LOGGED_IN_EMPLOYEE_ID")).longValue());
        if (UserThreadLocal.get((String)"SUPER_USER_ID") != null && !UserThreadLocal.get((String)"SUPER_USER_ID").equals("0") && !UserThreadLocal.get((String)"SUPER_USER_ID").isEmpty()) {
            logemployeeDTO.setEmployeeId(Long.valueOf(UserThreadLocal.get((String)"SUPER_USER_ID")).longValue());
        }
        Employee logemp = this.employeeService.getEmployee(logemployeeDTO);
        Employee navemp = this.employeeService.getEmployee(navemployeeDTO);
        Long departmentId = 0L;
        if (navemp.getDeptDetails() != null) {
            departmentId = navemp.getDeptDetails().getId();
        } else {
            Set deptSet = this.userRoleManagement.updateDeptList(Long.valueOf(navemp.getEmpId()));
            if (!deptSet.isEmpty()) {
                DeptDetails firstDept = (DeptDetails)deptSet.iterator().next();
                departmentId = firstDept.getId();
            }
        }
        if (riskDTO.getCreatedBy() != 0L) {
            riskDTO.getRiskValue().put("createdByName", logemp.getFirstName());
        }
        if (riskDTO.getUpdatedBy() != 0L) {
            riskDTO.getRiskValue().put("updatedByName", logemp.getFirstName());
        }
        if (riskDTO.getOwner() != 0L) {
            navemployeeDTO.setEmployeeId(riskDTO.getOwner());
            riskDTO.getRiskValue().put("ownerName", this.employeeService.getEmployee(navemployeeDTO).getFirstName());
        }
        if (Objects.nonNull(riskDTO.getDepartmentId()) && Objects.nonNull(deptDetailsService = this.departmentDetailsService.findById(riskDTO.getDepartmentId())) && Objects.nonNull(riskDTO.getRiskValue())) {
            riskDTO.getRiskValue().put("department", deptDetailsService.getName());
        }
        this.riskUtil.formatDates(riskDTO);
        RiskDetails riskDetails = new RiskDetails(this.riskUtil.formatDateSave(riskDTO));
        riskDetails.setCreatedTime(LocalDateTime.now());
        riskDetails.setVersion(Long.valueOf(0L));
        RiskResponseDTO tempresp = this.riskDetailsService.save(riskDetails);
        RiskDTO saveRisk = tempresp.getRiskDTO();
        if (Objects.nonNull(saveRisk.getImpactId())) {
            Optional kpidto = this.kpiService.findById(saveRisk.getImpactId());
            if (kpidto.isPresent()) {
                saveRisk.getRiskValue().put("impactDesc", new KPIDTO((KPI)kpidto.get()).getKpiValue().get("name").toString());
            } else {
                saveRisk.getRiskValue().put("impactDesc", "");
            }
        }
        if ((workflowResponse = this.workflowStagingService.handleWorkflowAndStagingChange("risk_details", Long.valueOf(tempresp.getRiskDTO().getId()), departmentId, "Risk", (Object)tempresp.getRiskDTO(), riskDetails.getVersion(), Long.valueOf(logemployeeDTO.getEmployeeId()))).isWorkflowExists()) {
            StagingChange stagingChange = workflowResponse.getStagingChange();
            riskDetails.setChangeId(stagingChange.getChangeId());
        } else {
            riskDetails.setChangeId(Long.valueOf(0L));
        }
        riskDetails.setVersion(workflowResponse.getVersionToUse());
        riskDetails.setStatus(workflowResponse.getStatus());
        RiskResponseDTO riskResponseDTO = this.riskDetailsService.save(riskDetails);
        if (workflowResponse.isWorkflowExists()) {
            this.auditService.saveAudit("Risk", riskResponseDTO.getRiskDTO().getId(), riskResponseDTO.getRiskDTO().getCreatedBy(), "Draft Risk Created");
        } else {
            this.auditService.saveAudit("Risk", riskResponseDTO.getRiskDTO().getId(), riskResponseDTO.getRiskDTO().getCreatedBy(), " Risk Created");
        }
        RiskDetailsHistory historyRiskDetails = new RiskDetailsHistory(riskDetails);
        historyRiskDetails.setVersion(riskDetails.getVersion());
        historyRiskDetails.setChangeId(riskDetails.getChangeId());
        historyRiskDetails.setStatus(riskDetails.getStatus());
        this.riskDetailsHistoryService.save(historyRiskDetails);
        return new ResponseEntity((Object)riskResponseDTO, HttpStatus.OK);
    }

    @PutMapping(value={"/risk"})
    public ResponseEntity<RiskResponseDTO> updateRiskDetails(@RequestBody RiskDTO riskDTO, HttpServletRequest request) throws RequestException {
        EmployeeDTO logemployeeDTO = new EmployeeDTO();
        logemployeeDTO.setEmployeeId(Long.valueOf(UserThreadLocal.get((String)"LOGGED_IN_EMPLOYEE_ID")).longValue());
        EmployeeDTO navemployeeDTO = new EmployeeDTO();
        navemployeeDTO.setEmployeeId(Long.valueOf(UserThreadLocal.get((String)"LOGGED_IN_EMPLOYEE_ID")).longValue());
        if (UserThreadLocal.get((String)"SUPER_USER_ID") != null && !UserThreadLocal.get((String)"SUPER_USER_ID").equals("0") && !UserThreadLocal.get((String)"SUPER_USER_ID").isEmpty()) {
            logemployeeDTO.setEmployeeId(Long.valueOf(UserThreadLocal.get((String)"SUPER_USER_ID")).longValue());
        }
        Employee logemp = this.employeeService.getEmployee(logemployeeDTO);
        Employee navemp = this.employeeService.getEmployee(navemployeeDTO);
        Long departmentId = 0L;
        if (navemp.getDeptDetails() != null) {
            departmentId = navemp.getDeptDetails().getId();
        } else {
            Set deptSet = this.userRoleManagement.updateDeptList(Long.valueOf(navemp.getEmpId()));
            if (!deptSet.isEmpty()) {
                DeptDetails firstDept = (DeptDetails)deptSet.iterator().next();
                departmentId = firstDept.getId();
            }
        }
        if (riskDTO.getCreatedBy() != 0L) {
            logemployeeDTO.setEmployeeId(riskDTO.getCreatedBy());
            riskDTO.getRiskValue().put("createdByName", this.employeeService.getEmployee(logemployeeDTO).getFirstName());
        }
        if (riskDTO.getUpdatedBy() != 0L) {
            riskDTO.getRiskValue().put("updatedByName", logemp.getFirstName());
        }
        if (riskDTO.getOwner() != 0L) {
            navemployeeDTO.setEmployeeId(riskDTO.getOwner());
            riskDTO.getRiskValue().put("ownerName", this.employeeService.getEmployee(navemployeeDTO).getFirstName());
        }
        RiskDetails existingRiskDetails = (RiskDetails)this.riskDetailsService.findById(riskDTO.getId()).orElseThrow(() -> new RequestException("Risk not found for update"));
        this.riskUtil.formatDates(riskDTO);
        RiskDetails riskDetails = new RiskDetails(this.riskUtil.formatDateSave(riskDTO));
        if (Objects.nonNull(riskDTO.getImpactId())) {
            Optional kpidto = this.kpiService.findById(riskDTO.getImpactId());
            if (kpidto.isPresent()) {
                riskDTO.getRiskValue().put("impactDesc", new KPIDTO((KPI)kpidto.get()).getKpiValue().get("name").toString());
            } else {
                riskDTO.getRiskValue().put("impactDesc", "");
            }
        }
        WorkflowStagingResponse workflowResponse = this.workflowStagingService.handleWorkflowAndStagingChange("risk_details", Long.valueOf(existingRiskDetails.getId()), departmentId, "Risk", (Object)riskDTO, existingRiskDetails.getVersion(), Long.valueOf(logemployeeDTO.getEmployeeId()));
        riskDetails.setStatus(workflowResponse.getStatus());
        riskDetails.setVersion(workflowResponse.getVersionToUse());
        riskDetails.setUpdatedBy(logemp.getEmpId());
        riskDetails.setUpdatedTime(LocalDateTime.now());
        if (workflowResponse.isWorkflowExists()) {
            StagingChange stagingChange = workflowResponse.getStagingChange();
            riskDetails.setChangeId(stagingChange.getChangeId());
            this.riskDetailsService.save(riskDetails);
            this.auditService.saveAudit("Risk", riskDetails.getId(), riskDetails.getCreatedBy(), "Draft Risk Updated");
        } else {
            riskDetails.setChangeId(Long.valueOf(0L));
            this.riskDetailsService.save(riskDetails);
            this.auditService.saveAudit("Risk", riskDetails.getId(), riskDetails.getCreatedBy(), "Risk Updated");
        }
        RiskDetailsHistory historyRiskDetails = new RiskDetailsHistory(riskDetails);
        historyRiskDetails.setVersion(riskDetails.getVersion());
        historyRiskDetails.setChangeId(riskDetails.getChangeId());
        historyRiskDetails.setStatus(riskDetails.getStatus());
        this.riskDetailsHistoryService.save(historyRiskDetails);
        return new ResponseEntity((Object)new RiskResponseDTO("Risk updated and saved as APPROVED", new RiskDTO(riskDetails, false)), HttpStatus.ACCEPTED);
    }

    public String serializeObjectToJson(Object obj) {
        Gson gson = new Gson();
        try {
            String json = gson.toJson(obj);
            return json;
        }
        catch (Exception e) {
            throw new RuntimeException("Failed to convert RiskDTO to JSON", e);
        }
    }

    @GetMapping(value={"/risk/{id}"})
    public ResponseEntity<RiskDTO> getRiskDetailsById(@PathVariable(value="id") Long id, @RequestParam(value="loadFlag", required=false) String loadFlag, @RequestParam(value="empId", required=false) Long empId) throws RequestException {
        RiskDetails riskDetails = (RiskDetails)this.riskDetailsService.findById(id.longValue()).orElseThrow(() -> new RequestException("Risk not found"));
        boolean flag = loadFlag != null ? Boolean.valueOf(loadFlag) : false;
        RiskDTO responseRiskDTO = new RiskDTO(riskDetails, flag);
        List nonApprovedChanges = this.stagingChangesRepository.findPendingChangesTableName("risk_details");
        Optional<StagingChange> pendingChange = nonApprovedChanges.stream().filter(change -> change.getRecordId().equals(responseRiskDTO.getId())).findFirst();
        pendingChange.ifPresent(change -> responseRiskDTO.setChangeId(change.getChangeId().longValue()));
        if (responseRiskDTO.getRiskCommentsList() != null && !responseRiskDTO.getRiskCommentsList().isEmpty()) {
            responseRiskDTO.getRiskCommentsList().stream().map(obj -> {
                obj.setLikeEmpIds(this.commentsMappingService.findAllBbyCommentID(Long.valueOf(obj.getId()), "risk"));
                return obj;
            }).collect(Collectors.toList());
        }
        this.riskUtil.populateAddtionalDetails(responseRiskDTO, flag);
        return new ResponseEntity((Object)responseRiskDTO, HttpStatus.OK);
    }

    @DeleteMapping(value={"/risk/{id}"})
    public ResponseEntity<RiskResponseDTO> deleteRiskDetailsById(@PathVariable(value="id") Long id, HttpServletRequest request) throws RequestException {
        Optional riskDetails = this.riskDetailsService.findById(id.longValue());
        this.auditService.deleteAudit("Risk", ((RiskDetails)riskDetails.get()).getId(), Long.valueOf(UserThreadLocal.get((String)"LOGGED_IN_EMPLOYEE_ID")).longValue(), "Risk Deleted");
        this.riskDetailsHistoryService.deleteHistor(Long.valueOf(((RiskDetails)riskDetails.get()).getId()));
        return new ResponseEntity((Object)this.riskDetailsService.deleteRiskDetails(riskDetails), HttpStatus.OK);
    }

    @GetMapping(value={"/riskList/{empId}"})
    public ResponseEntity<List<RiskDTO>> findAll(@PathVariable(value="empId") long empId, @RequestParam(value="pageId", required=false) String pageId, @RequestParam(value="dateRange", required=false) String dateRange, @RequestParam(value="type", required=false) String type) throws RequestException {
        List responseRiskDTOList = this.riskDetailsService.findAll(empId, pageId, dateRange, false);
        return new ResponseEntity((Object)responseRiskDTOList, HttpStatus.OK);
    }

    @GetMapping(value={"/riskListView"})
    public ResponseEntity<List<RiskDTO>> findAll(@RequestParam(value="pageId", required=false) String pageId, @RequestParam(value="dateRange", required=false) String dateRange, @RequestParam(value="type", required=false) String type) throws RequestException {
        List responseRiskDTOList = this.riskDetailsService.findAllView(pageId, dateRange, false);
        return new ResponseEntity((Object)responseRiskDTOList, HttpStatus.OK);
    }

    @GetMapping(value={"/riskListByEmpId/{empId}"})
    public ResponseEntity<List<RiskDTO>> riskListByEmpId(@PathVariable(value="empId") long empId, @RequestParam(value="dateRange", required=false) String dateRange) throws RequestException {
        List responseRiskDTOList = this.riskDetailsService.riskListByEmpId(empId, dateRange);
        return new ResponseEntity((Object)responseRiskDTOList, HttpStatus.OK);
    }

    @GetMapping(value={"/kpi/riskList/{kpiId}"})
    public ResponseEntity<List<RiskDTO>> impactedRiskDetails(@PathVariable(value="kpiId") long kpiId) throws RequestException {
        List riskDTOList = this.riskDetailsService.findImpactedRiskDetails(kpiId);
        return new ResponseEntity((Object)riskDTOList, HttpStatus.OK);
    }

    @GetMapping(value={"/setRiskDate"})
    public ResponseEntity<String> scoreCardListByDate() {
        this.riskDetailsService.saveSetDate();
        return new ResponseEntity((Object)"success", HttpStatus.OK);
    }

    @GetMapping(value={"/riskListByDeptId/{deptId}"})
    public ResponseEntity<List<RiskDTO>> riskListByDeptId(@PathVariable(value="deptId") long deptId) throws RequestException {
        List responseRiskDTOList = this.riskDetailsService.findAllByDeptId(deptId);
        return new ResponseEntity((Object)responseRiskDTOList, HttpStatus.OK);
    }

    @GetMapping(value={"/riskListWithChild/{empId}"})
    public ResponseEntity<List<RiskDTO>> riskListWithChild(@PathVariable(value="empId") long empId, @RequestParam(value="riskIds", required=false) String riskIds, @RequestParam(value="dateRange", required=false) String dateRange) throws RequestException {
        List riskDTOS = null;
        String[] searchArray = new String[]{"%20", "%2520"};
        String[] replaceArray = new String[]{" ", " "};
        String result = StringUtils.replaceEach((String)riskIds, (String[])searchArray, (String[])replaceArray);
        riskDTOS = result != null && !result.isEmpty() && !result.equals("") ? this.riskDetailsService.findAllByRiskIDList(result, dateRange) : this.riskDetailsService.findAllByEmpIds(empId);
        return new ResponseEntity((Object)riskDTOS, HttpStatus.OK);
    }

    @GetMapping(value={"/allRiskList/{empId}"})
    public ResponseEntity<List<RiskDTO>> allRiskList(@PathVariable(value="empId") long empId, @RequestParam(value="pageId", required=false) String pageId, @RequestParam(value="dateRange", required=false) String dateRange) throws RequestException {
        List responseRiskDTOList = this.riskDetailsService.findAll(empId, pageId, dateRange, true);
        return new ResponseEntity((Object)responseRiskDTOList, HttpStatus.OK);
    }

    @GetMapping(value={"/riskoptionlist"})
    public ResponseEntity<List<RiskOptionsDto>> riskoptionlist() throws RequestException {
        List responseRiskDTOList = this.riskDetailsService.findAllRiskOptions();
        return new ResponseEntity((Object)responseRiskDTOList, HttpStatus.OK);
    }

    @GetMapping(value={"/riskcustomscore"})
    public ResponseEntity<List<RiskCustomScoreDto>> riskcustomscorelist() throws RequestException {
        List responseRiskDTOList = this.riskDetailsService.findAllRiskCustomScore();
        return new ResponseEntity((Object)responseRiskDTOList, HttpStatus.OK);
    }

    @GetMapping(value={"/riskhistorylist"})
    public ResponseEntity<List<RiskDTO>> riskHistoryList(@RequestParam(value="riskId", required=false) Long riskId, @RequestParam(value="version", required=false) Long version) throws RequestException {
        ArrayList<RiskDTO> riskresponse = new ArrayList<RiskDTO>();
        if (version != null && version != 0L) {
            long count = this.riskDetailsHistoryRepository.countByRiskId(riskId);
            System.out.println("count :: " + count);
            if (count == version) {
                RiskDetails riskDetails = (RiskDetails)this.riskDetailsService.findById(riskId.longValue()).orElseThrow(() -> new RequestException("Risk not found"));
                RiskDTO responseRiskDTO = new RiskDTO(riskDetails, true);
                this.riskUtil.populateAddtionalDetails(responseRiskDTO, true);
                riskresponse.add(responseRiskDTO);
            } else {
                RiskDetailsHistory riskHistory = (RiskDetailsHistory)this.riskDetailsHistoryService.findAllByversion(riskId, version).get();
                RiskDTO newRisk = new RiskDTO(riskHistory);
                this.riskUtil.populateAddtionalForHistory(newRisk, true);
                riskresponse.add(newRisk);
            }
        } else {
            List responseRiskDTOList = this.riskDetailsHistoryService.findAllByRiskIDs(riskId);
            for (RiskDetailsHistory history : responseRiskDTOList) {
                RiskDTO newRisk = new RiskDTO(history);
                riskresponse.add(newRisk);
            }
        }
        return new ResponseEntity(riskresponse, HttpStatus.OK);
    }

    @GetMapping(value={"/riskCodeListByEmpId/{empId}"})
    public ResponseEntity<List<RiskDTO>> riskCodeList(@PathVariable(value="empId") long empId, @RequestParam(value="dateRange", required=false) String dateRange) throws RequestException {
        List responseRiskDTOList = this.riskDetailsService.riskCodeList(empId, dateRange);
        return new ResponseEntity((Object)responseRiskDTOList, HttpStatus.OK);
    }

    @PostMapping(value={"/riskoptions"})
    public ResponseEntity<?> riskoptionsadd(@RequestBody RiskOptionsDto riskDTO, HttpServletRequest request) throws RequestException {
        Boolean addriskOptions = this.riskDetailsService.addRiskOptions(riskDTO);
        if (addriskOptions.booleanValue()) {
            return ResponseEntity.status((HttpStatus)HttpStatus.OK).body(Collections.singletonMap("message", "Success"));
        }
        return ResponseEntity.status((HttpStatus)HttpStatus.BAD_REQUEST).body(Collections.singletonMap("message", "Duplicate"));
    }

    @PutMapping(value={"/riskcustomscore"})
    public ResponseEntity<?> riskcustomscore(@RequestBody RiskCustomScoreDto riskDTO, HttpServletRequest request) throws RequestException {
        Boolean updatescore = this.riskDetailsService.updateRiskCustomScore(riskDTO);
        if (updatescore.booleanValue()) {
            return ResponseEntity.status((HttpStatus)HttpStatus.OK).body(Collections.singletonMap("message", "Success"));
        }
        return ResponseEntity.status((HttpStatus)HttpStatus.BAD_REQUEST).body(Collections.singletonMap("message", "Duplicate"));
    }

    @PostMapping(value={"/riskevent"})
    public ResponseEntity<?> riskeventadd(@RequestBody RiskEventDTO riskDTO, HttpServletRequest request) throws RequestException, IOException {
        System.out.println("=========== enter RiskEvent save ================");
        EmployeeDTO logemployeeDTO = new EmployeeDTO();
        logemployeeDTO.setEmployeeId(Long.valueOf(UserThreadLocal.get((String)"LOGGED_IN_EMPLOYEE_ID")).longValue());
        EmployeeDTO navemployeeDTO = new EmployeeDTO();
        navemployeeDTO.setEmployeeId(Long.valueOf(UserThreadLocal.get((String)"LOGGED_IN_EMPLOYEE_ID")).longValue());
        if (UserThreadLocal.get((String)"SUPER_USER_ID") != null && !UserThreadLocal.get((String)"SUPER_USER_ID").equals("0") && !UserThreadLocal.get((String)"SUPER_USER_ID").isEmpty()) {
            logemployeeDTO.setEmployeeId(Long.valueOf(UserThreadLocal.get((String)"SUPER_USER_ID")).longValue());
        }
        Employee logemp = this.employeeService.getEmployee(logemployeeDTO);
        Employee navemp = this.employeeService.getEmployee(navemployeeDTO);
        Long departmentId = 0L;
        Long createdBy = navemp.getEmpId();
        if (navemp.getDeptDetails() != null) {
            departmentId = navemp.getDeptDetails().getId();
        } else {
            Set deptSet = this.userRoleManagement.updateDeptList(Long.valueOf(navemp.getEmpId()));
            if (!deptSet.isEmpty()) {
                DeptDetails firstDept = (DeptDetails)deptSet.iterator().next();
                departmentId = firstDept.getId();
            }
        }
        riskDTO.setCreatedBy(logemp.getFirstName());
        riskDTO.setDepartmentId(departmentId);
        RiskEvent riskEvents = new RiskEvent(riskDTO);
        riskEvents.setCreatedAt(LocalDateTime.now());
        riskEvents.setVersion(Long.valueOf(0L));
        System.out.println("RiskEvent door 1 ::: " + new RiskEventDTO(riskEvents));
        RiskEvent tempresp = this.riskDetailsService.riskeventadd(new RiskEventDTO(riskEvents));
        RiskEventDTO saveDto = null;
        try {
            saveDto = new RiskEventDTO(tempresp);
        }
        catch (IOException e) {
            e.printStackTrace();
        }
        WorkflowStagingResponse workflowResponse = this.workflowStagingService.handleWorkflowAndStagingChange("risk_event", saveDto.getId(), departmentId, "Risk Event", (Object)saveDto, riskEvents.getVersion(), Long.valueOf(logemployeeDTO.getEmployeeId()));
        if (workflowResponse.isWorkflowExists()) {
            StagingChange stagingChange = workflowResponse.getStagingChange();
            tempresp.setChangeId(stagingChange.getChangeId());
        } else {
            tempresp.setChangeId(Long.valueOf(0L));
        }
        tempresp.setVersion(workflowResponse.getVersionToUse());
        tempresp.setStatus(workflowResponse.getStatus());
        System.out.println("RiskEvent door 2 ::: " + riskEvents);
        RiskEventDTO updatedDto = null;
        try {
            updatedDto = new RiskEventDTO(tempresp);
        }
        catch (JsonParseException e) {
            e.printStackTrace();
        }
        catch (JsonMappingException e) {
            e.printStackTrace();
        }
        catch (IOException e) {
            e.printStackTrace();
        }
        RiskEvent eventResponse = this.riskDetailsService.riskeventadd(updatedDto);
        System.out.println("eventResponse :: " + eventResponse);
        if (workflowResponse.isWorkflowExists()) {
            this.auditService.saveAudit("Risk Event", eventResponse.getId().longValue(), createdBy.longValue(), "Draft Risk Event Created");
        } else {
            this.auditService.saveAudit("Risk Event", eventResponse.getId().longValue(), createdBy.longValue(), " Risk Event Created");
        }
        RiskEventHistory historyRiskDetails = new RiskEventHistory(eventResponse);
        historyRiskDetails.setVersion(updatedDto.getVersion());
        historyRiskDetails.setChangeId(Long.valueOf(updatedDto.getChangeId()));
        historyRiskDetails.setStatus(updatedDto.getStatus());
        this.riskEventHistoryService.save(historyRiskDetails);
        System.out.println("history stored successfull and end");
        return new ResponseEntity((Object)eventResponse, HttpStatus.OK);
    }

    @PutMapping(value={"/riskevent"})
    public ResponseEntity<?> riskeventupdate(@RequestBody RiskEventDTO riskDTO, HttpServletRequest request) throws RequestException, IOException {
        RiskEventDTO riskevent;
        EmployeeDTO logemployeeDTO = new EmployeeDTO();
        logemployeeDTO.setEmployeeId(Long.valueOf(UserThreadLocal.get((String)"LOGGED_IN_EMPLOYEE_ID")).longValue());
        EmployeeDTO navemployeeDTO = new EmployeeDTO();
        navemployeeDTO.setEmployeeId(Long.valueOf(UserThreadLocal.get((String)"LOGGED_IN_EMPLOYEE_ID")).longValue());
        if (UserThreadLocal.get((String)"SUPER_USER_ID") != null && !UserThreadLocal.get((String)"SUPER_USER_ID").equals("0") && !UserThreadLocal.get((String)"SUPER_USER_ID").isEmpty()) {
            logemployeeDTO.setEmployeeId(Long.valueOf(UserThreadLocal.get((String)"SUPER_USER_ID")).longValue());
        }
        Employee logemp = this.employeeService.getEmployee(logemployeeDTO);
        Employee navemp = this.employeeService.getEmployee(navemployeeDTO);
        Long departmentId = 0L;
        Long createdBy = navemp.getEmpId();
        if (navemp.getDeptDetails() != null) {
            departmentId = navemp.getDeptDetails().getId();
        } else {
            Set deptSet = this.userRoleManagement.updateDeptList(Long.valueOf(navemp.getEmpId()));
            if (!deptSet.isEmpty()) {
                DeptDetails firstDept = (DeptDetails)deptSet.iterator().next();
                departmentId = firstDept.getId();
            }
        }
        riskDTO.setDepartmentId(departmentId);
        if (Objects.nonNull(riskDTO.getDepartmentId())) {
            DeptDetails deptDetailsService = this.departmentDetailsService.findById(riskDTO.getDepartmentId());
            riskDTO.setDepartmentName(deptDetailsService.getName());
        }
        if (Objects.isNull(riskevent = this.riskDetailsService.findByEventId(riskDTO.getId().longValue()))) {
            new RequestException("RiskEvent not found for update");
        }
        if (StringUtils.isEmpty((CharSequence)riskDTO.getReceivedType())) {
            System.out.println("== Come from RiskEvent Page edit ====");
            riskDTO.setUpdatedBy(logemp.getFirstName());
            riskDTO.setUpdatedAt(LocalDateTime.now());
        } else {
            System.out.println("--- Come from RiskEvent aprove Page edit ---");
            if (riskevent.getUpdatedBy() != null) {
                riskDTO.setUpdatedBy(riskevent.getUpdatedBy());
                riskDTO.setUpdatedAt(riskevent.getUpdatedAt());
            }
        }
        System.out.println("upadte By >>>>>> " + riskevent.getUpdatedBy());
        System.out.println("upadte at >>>>>> " + riskevent.getUpdatedAt());
        RiskEvent riskEvents = new RiskEvent(riskDTO);
        WorkflowStagingResponse workflowResponse = this.workflowStagingService.handleWorkflowAndStagingChange("risk_event", riskevent.getId(), departmentId, "Risk Event", (Object)riskDTO, riskevent.getVersion(), Long.valueOf(logemployeeDTO.getEmployeeId()));
        riskEvents.setStatus(workflowResponse.getStatus());
        riskEvents.setVersion(workflowResponse.getVersionToUse());
        RiskEvent eventResponse = null;
        if (workflowResponse.isWorkflowExists()) {
            StagingChange stagingChange = workflowResponse.getStagingChange();
            riskEvents.setChangeId(stagingChange.getChangeId());
            eventResponse = this.riskDetailsService.riskeventadd(new RiskEventDTO(riskEvents));
            this.auditService.saveAudit("Risk Event", riskEvents.getId().longValue(), createdBy.longValue(), "Draft Risk Event Updated");
        } else {
            riskEvents.setChangeId(Long.valueOf(0L));
            eventResponse = this.riskDetailsService.riskeventadd(new RiskEventDTO(riskEvents));
            this.auditService.saveAudit("Risk Event", riskEvents.getId().longValue(), createdBy.longValue(), "RiskEvent Updated");
        }
        System.out.println("Enter in history store ");
        System.out.println("eventResponse.getId() :: " + eventResponse.getId());
        System.out.println("eventResponse.getVersion() :: " + eventResponse.getVersion());
        Optional historyDetailDta = this.riskEventHistoryService.findAllByversion(eventResponse.getId(), eventResponse.getVersion());
        RiskEventHistory historyRiskDetails = new RiskEventHistory();
        if (historyDetailDta.isPresent()) {
            System.out.println("Enter in is present");
            historyRiskDetails = new RiskEventHistory(riskEvents);
            historyRiskDetails.setId(((RiskEventHistory)historyDetailDta.get()).getId());
        } else {
            System.out.println("Enter in is not present");
            historyRiskDetails = new RiskEventHistory(riskEvents);
        }
        historyRiskDetails.setVersion(riskEvents.getVersion());
        historyRiskDetails.setChangeId(riskEvents.getChangeId());
        historyRiskDetails.setStatus(riskEvents.getStatus());
        this.riskEventHistoryService.save(historyRiskDetails);
        System.out.println("Enter in history store changes complete ");
        return new ResponseEntity((Object)new RiskResponseDTO("RiskEvent submitted for approval", null), HttpStatus.ACCEPTED);
    }

    @GetMapping(value={"/riskEventhistorylist"})
    public ResponseEntity<List<RiskEventDTO>> riskEventHistoryList(@RequestParam(value="eventId", required=false) Long eventId, @RequestParam(value="version", required=false) Long version) throws RequestException, JsonParseException, JsonMappingException, IOException {
        ArrayList<RiskEventDTO> riskresponse = new ArrayList<RiskEventDTO>();
        if (version != null && version != 0L) {
            long count = this.riskEventHistoryRepository.countByRiskId(eventId);
            System.out.println("count :: " + count);
            if (count == version) {
                RiskEventDTO riskeventList = this.riskDetailsService.findByEventId(eventId.longValue());
                riskresponse.add(riskeventList);
            } else {
                RiskEventHistory riskHistory = (RiskEventHistory)this.riskEventHistoryService.findAllByversion(eventId, version).get();
                RiskEventDTO newRisk = new RiskEventDTO(riskHistory);
                riskresponse.add(newRisk);
            }
        } else {
            List responseRiskDTOList = this.riskEventHistoryService.findAllByRiskEventIDs(eventId);
            for (RiskEventHistory history : responseRiskDTOList) {
                RiskEventDTO newRisk = new RiskEventDTO(history);
                riskresponse.add(newRisk);
            }
        }
        return new ResponseEntity(riskresponse, HttpStatus.OK);
    }

    @DeleteMapping(value={"/riskevent"})
    public ResponseEntity<?> riskeventdelete(@RequestParam(value="pageId", required=false) String pageId, @RequestParam(value="eventId", required=false) String eventId, HttpServletRequest request) throws RequestException {
        Boolean updatescore = this.riskDetailsService.deleteEvent(Long.parseLong(eventId));
        if (updatescore.booleanValue()) {
            return new ResponseEntity(HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    @GetMapping(value={"/riskeventlist"})
    public ResponseEntity<?> riskgetevent(@RequestParam(value="pageId", required=false) String pageId, @RequestParam(value="status", required=false) String status, HttpServletRequest request) throws RequestException {
        List riskeventList = this.riskDetailsService.findByEventPageId(Long.parseLong(pageId), status);
        return ResponseEntity.status((HttpStatus)HttpStatus.OK).body((Object)riskeventList);
    }

    @GetMapping(value={"/riskeventbyid"})
    public ResponseEntity<?> riskgeteventid(@RequestParam(value="eventId", required=false) String eventId, HttpServletRequest request) throws RequestException, JsonParseException, JsonMappingException, NumberFormatException, IOException {
        RiskEventDTO riskeventList = this.riskDetailsService.findByEventId(Long.parseLong(eventId));
        return ResponseEntity.status((HttpStatus)HttpStatus.OK).body((Object)riskeventList);
    }

    @GetMapping(value={"/riskEventListWithChild/{empId}"})
    public ResponseEntity<List<RiskEventDTO>> riskEventListWithChild(@PathVariable(value="empId") long empId, @RequestParam(value="pageIds", required=false) String pageIds, @RequestParam(value="dateRange", required=false) String dateRange) throws RequestException {
        List riskEventDTO = null;
        String[] searchArray = new String[]{"%20", "%2520"};
        String[] replaceArray = new String[]{" ", " "};
        String result = StringUtils.replaceEach((String)pageIds, (String[])searchArray, (String[])replaceArray);
        riskEventDTO = result != null && !result.isEmpty() && !result.equals("") ? this.riskDetailsService.findAllByRiskEventIDList(result, dateRange) : this.riskDetailsService.findAllByRiskEventEmpIds(empId);
        return new ResponseEntity((Object)riskEventDTO, HttpStatus.OK);
    }

    @GetMapping(value={"/riskEventListWithDeptids"})
    public ResponseEntity<List<RiskEventDTO>> riskMonitorListWithDeptids(@RequestParam(value="deptIds", required=false) String deptIds) throws RequestException, ParseException {
        List riskEventDTO = null;
        String[] searchArray = new String[]{"%20", "%2520"};
        String[] replaceArray = new String[]{" ", " "};
        String result = StringUtils.replaceEach((String)deptIds, (String[])searchArray, (String[])replaceArray);
        if (result != null && !result.isEmpty() && !result.equals("")) {
            riskEventDTO = this.riskDetailsService.findRiskEventIdListDept(result);
        }
        return new ResponseEntity(riskEventDTO, HttpStatus.OK);
    }

    @GetMapping(value={"/riskStatusCountwithPageId"})
    public ResponseEntity<List<RiskDTO>> getRiskDetailsById(@RequestParam(value="pageIds", required=false) String pageIds, @RequestParam(value="dateRange", required=false) String dateRange) throws RequestException, ParseException {
        System.out.println("PageId=>" + pageIds);
        List riskDTOS = this.riskDetailsService.findRiskStatusCountList(pageIds, dateRange);
        return new ResponseEntity((Object)riskDTOS, HttpStatus.OK);
    }

    @GetMapping(value={"/ermRiskListWithChild/{empId}"})
    public ResponseEntity<List<RiskDTO>> ermRiskListWithChild(@PathVariable(value="empId") long empId, @RequestParam(value="pageIds", required=false) String pageIds, @RequestParam(value="dateRange", required=false) String dateRange) throws RequestException {
        System.out.println("empId :: " + empId + "== pageIds :: " + pageIds);
        List riskDTOS = null;
        String[] searchArray = new String[]{"%20", "%2520"};
        String[] replaceArray = new String[]{" ", " "};
        String result = StringUtils.replaceEach((String)pageIds, (String[])searchArray, (String[])replaceArray);
        riskDTOS = result != null && !result.isEmpty() && !result.equals("") ? this.riskDetailsService.findAllByRiskPageIDList(result, dateRange) : this.riskDetailsService.findAllByErmRiskEmpIds(empId);
        return new ResponseEntity((Object)riskDTOS, HttpStatus.OK);
    }

    @GetMapping(value={"/riskEventFrequencyCount"})
    public ResponseEntity<List<RiskEventNameCountDto>> getRiskEventById(@RequestParam(value="pageIds", required=false) String pageIds, @RequestParam(value="dateRange", required=false) String dateRange, @RequestParam(value="limit", required=false) String limit) throws RequestException, ParseException {
        System.out.println("PageId=>" + pageIds);
        String[] searchArray = new String[]{"%20", "%2520"};
        String[] replaceArray = new String[]{" ", " "};
        String result = StringUtils.replaceEach((String)pageIds, (String[])searchArray, (String[])replaceArray);
        List riskDTOS = this.riskDetailsService.findRiskEventFreCountList(result, dateRange, limit);
        return new ResponseEntity((Object)riskDTOS, HttpStatus.OK);
    }

    @GetMapping(value={"/riskDashBoardData"})
    public ResponseEntity<RiskDashBoardResponseDTO> riskDashBoardDataDeptId(@RequestParam(value="deptId", required=false) Long deptId) throws RequestException {
        List responseRiskDTOList = this.riskDetailsService.findAllRiskDashboardBYDeptId(deptId.longValue());
        RiskDashBoardResponseDTO dashboardDTO = this.riskDetailsService.buildRiskDashboard(responseRiskDTOList);
        return new ResponseEntity((Object)dashboardDTO, HttpStatus.OK);
    }
}

