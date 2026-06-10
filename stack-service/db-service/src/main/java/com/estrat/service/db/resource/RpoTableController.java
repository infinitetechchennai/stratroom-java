/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.Employee
 *  com.estrat.service.db.bean.po.RpoTable
 *  com.estrat.service.db.bean.po.RpoTableHistory
 *  com.estrat.service.db.bean.po.StagingChange
 *  com.estrat.service.db.bean.po.WorkflowStagingResponse
 *  com.estrat.service.db.dao.ApproversHistoryRepository
 *  com.estrat.service.db.dao.ControlPanelWorkFlowRepository
 *  com.estrat.service.db.dao.RpoTableHistoryRepository
 *  com.estrat.service.db.dao.StagingChangeRepository
 *  com.estrat.service.db.dto.DeptDetails
 *  com.estrat.service.db.dto.EmployeeDTO
 *  com.estrat.service.db.dto.RiskResponseDTO
 *  com.estrat.service.db.dto.RpoTableDto
 *  com.estrat.service.db.exception.RequestException
 *  com.estrat.service.db.resource.RpoTableController
 *  com.estrat.service.db.resource.util.UserThreadLocal
 *  com.estrat.service.db.service.ApproversHistoryService
 *  com.estrat.service.db.service.AuditDetailsService
 *  com.estrat.service.db.service.ControlPanelWorkFlowService
 *  com.estrat.service.db.service.EmployeeService
 *  com.estrat.service.db.service.RpoTableHistoryService
 *  com.estrat.service.db.service.RpoTableService
 *  com.estrat.service.db.service.StagingChangeService
 *  com.estrat.service.db.service.UserRoleManagementService
 *  com.estrat.service.db.service.WorkflowStagingService
 *  com.fasterxml.jackson.core.JsonParseException
 *  com.fasterxml.jackson.databind.JsonMappingException
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
import com.estrat.service.db.bean.po.RpoTable;
import com.estrat.service.db.bean.po.RpoTableHistory;
import com.estrat.service.db.bean.po.StagingChange;
import com.estrat.service.db.bean.po.WorkflowStagingResponse;
import com.estrat.service.db.dao.ApproversHistoryRepository;
import com.estrat.service.db.dao.ControlPanelWorkFlowRepository;
import com.estrat.service.db.dao.RpoTableHistoryRepository;
import com.estrat.service.db.dao.StagingChangeRepository;
import com.estrat.service.db.dto.DeptDetails;
import com.estrat.service.db.dto.EmployeeDTO;
import com.estrat.service.db.dto.RiskResponseDTO;
import com.estrat.service.db.dto.RpoTableDto;
import com.estrat.service.db.exception.RequestException;
import com.estrat.service.db.resource.util.UserThreadLocal;
import com.estrat.service.db.service.ApproversHistoryService;
import com.estrat.service.db.service.AuditDetailsService;
import com.estrat.service.db.service.ControlPanelWorkFlowService;
import com.estrat.service.db.service.EmployeeService;
import com.estrat.service.db.service.RpoTableHistoryService;
import com.estrat.service.db.service.RpoTableService;
import com.estrat.service.db.service.StagingChangeService;
import com.estrat.service.db.service.UserRoleManagementService;
import com.estrat.service.db.service.WorkflowStagingService;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import java.io.IOException;
import java.text.ParseException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
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
public class RpoTableController {
    @Autowired
    RpoTableService rpotableService;
    @Autowired
    protected EmployeeService employeeService;
    @Autowired
    private ApproversHistoryService approversHistoryService;
    @Autowired
    private ControlPanelWorkFlowService controlPanelWorkFlowService;
    @Autowired
    ApproversHistoryRepository approversHistoryRepo;
    @Autowired
    StagingChangeService stagingChangeService;
    @Autowired
    ControlPanelWorkFlowRepository workflowRepository;
    @Autowired
    StagingChangeRepository stagingChangesRepository;
    @Autowired
    UserRoleManagementService userRoleManagement;
    @Autowired
    private AuditDetailsService auditService;
    @Autowired
    private RpoTableHistoryRepository rpoTableHistoryRepository;
    @Autowired
    private RpoTableHistoryService rpoTableHistoryService;
    @Autowired
    WorkflowStagingService workflowStagingService;

    @PostMapping(value={"/saveRpoTable"})
    public ResponseEntity<?> saveRpoTable(@RequestBody RpoTableDto rpoTableDto) {
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
            rpoTableDto.getRpoValues().put("departmentName", navemp.getDeptDetails().getName());
        } else {
            Set deptSet = this.userRoleManagement.updateDeptList(Long.valueOf(navemp.getEmpId()));
            if (!deptSet.isEmpty()) {
                DeptDetails firstDept = (DeptDetails)deptSet.iterator().next();
                departmentId = firstDept.getId();
                rpoTableDto.getRpoValues().put("departmentName", firstDept.getName());
            }
        }
        rpoTableDto.setDeptId(departmentId.longValue());
        if (rpoTableDto.getCreateBy() != 0L) {
            rpoTableDto.getRpoValues().put("createdByName", logemp.getFirstName());
        }
        if (rpoTableDto.getOwner() != 0L) {
            navemployeeDTO.setEmployeeId(rpoTableDto.getOwner());
            rpoTableDto.getRpoValues().put("ownerName", this.employeeService.getEmployee(navemployeeDTO).getFirstName());
        }
        RpoTable rpoTable = new RpoTable(rpoTableDto);
        rpoTable.setCreateTime(LocalDateTime.now());
        rpoTable.setVersion(Long.valueOf(0L));
        RpoTableDto tempresp = this.rpotableService.saveRpoTable(rpoTable);
        WorkflowStagingResponse workflowResponse = this.workflowStagingService.handleWorkflowAndStagingChange("rpo", tempresp.getId(), departmentId, "RPO", (Object)tempresp, rpoTable.getVersion(), Long.valueOf(logemployeeDTO.getEmployeeId()));
        if (workflowResponse.isWorkflowExists()) {
            StagingChange stagingChange = workflowResponse.getStagingChange();
            rpoTable.setChangeId(stagingChange.getChangeId());
        } else {
            rpoTable.setChangeId(Long.valueOf(0L));
        }
        rpoTable.setVersion(workflowResponse.getVersionToUse());
        rpoTable.setStatus(workflowResponse.getStatus());
        RpoTableDto responseDTO = this.rpotableService.saveRpoTable(rpoTable);
        if (workflowResponse.isWorkflowExists()) {
            this.auditService.saveAudit("RPO", responseDTO.getId().longValue(), responseDTO.getCreateBy(), "Draft RPO Created");
        } else {
            this.auditService.saveAudit("POS", responseDTO.getId().longValue(), responseDTO.getCreateBy(), " Rpo Created");
        }
        RpoTableHistory historyRiskDetails = new RpoTableHistory(rpoTable);
        historyRiskDetails.setVersion(rpoTable.getVersion());
        historyRiskDetails.setChangeId(rpoTable.getChangeId());
        historyRiskDetails.setStatus(rpoTable.getStatus());
        this.rpoTableHistoryRepository.save(historyRiskDetails);
        return new ResponseEntity((Object)responseDTO, HttpStatus.OK);
    }

    @PutMapping(value={"/updateRpo"})
    public ResponseEntity<?> updateRpoValue(@RequestBody RpoTableDto rpoTableDto) throws RequestException {
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
            rpoTableDto.getRpoValues().put("departmentName", navemp.getDeptDetails().getName());
        } else {
            Set deptSet = this.userRoleManagement.updateDeptList(Long.valueOf(navemp.getEmpId()));
            if (!deptSet.isEmpty()) {
                DeptDetails firstDept = (DeptDetails)deptSet.iterator().next();
                departmentId = firstDept.getId();
                rpoTableDto.getRpoValues().put("departmentName", firstDept.getName());
            }
        }
        rpoTableDto.setDeptId(departmentId.longValue());
        RpoTable existingposDetails = (RpoTable)this.rpotableService.findRpoById(rpoTableDto.getId().longValue()).orElseThrow(() -> new RequestException("Risk not found for update"));
        if (rpoTableDto.getCreateBy() != 0L) {
            logemployeeDTO.setEmployeeId(rpoTableDto.getCreateBy());
            rpoTableDto.getRpoValues().put("createdByName", this.employeeService.getEmployee(logemployeeDTO).getFirstName());
        }
        if (rpoTableDto.getOwner() != 0L) {
            logemployeeDTO.setEmployeeId(rpoTableDto.getOwner());
            rpoTableDto.getRpoValues().put("ownerName", this.employeeService.getEmployee(logemployeeDTO).getFirstName());
        }
        if (StringUtils.isEmpty((CharSequence)rpoTableDto.getReceivedType())) {
            System.out.println("== Come from RPO Page edit ====");
            rpoTableDto.setUpdateBy(logemp.getEmpId());
            rpoTableDto.setUpdateTime(LocalDateTime.now());
        } else {
            System.out.println("--- Come from aprove Page edit ---");
            if (existingposDetails.getUpdateBy() != 0L) {
                rpoTableDto.setUpdateBy(existingposDetails.getUpdateBy());
                rpoTableDto.setUpdateTime(existingposDetails.getUpdateTime());
            }
        }
        System.out.println("upadte By >>>>>> " + rpoTableDto.getUpdateBy());
        if (rpoTableDto.getUpdateBy() != 0L) {
            logemployeeDTO.setEmployeeId(rpoTableDto.getUpdateBy());
            rpoTableDto.getRpoValues().put("updatedByName", this.employeeService.getEmployee(logemployeeDTO).getFirstName());
        }
        RpoTable rpoValue = new RpoTable(rpoTableDto);
        WorkflowStagingResponse workflowResponse = this.workflowStagingService.handleWorkflowAndStagingChange("rpo", existingposDetails.getId(), departmentId, "RPO", (Object)rpoTableDto, existingposDetails.getVersion(), Long.valueOf(logemployeeDTO.getEmployeeId()));
        rpoValue.setStatus(workflowResponse.getStatus());
        rpoValue.setVersion(workflowResponse.getVersionToUse());
        if (workflowResponse.isWorkflowExists()) {
            StagingChange stagingChange = workflowResponse.getStagingChange();
            rpoValue.setChangeId(stagingChange.getChangeId());
            this.rpotableService.saveRpoTable(rpoValue);
            this.auditService.saveAudit("RPO", rpoValue.getId().longValue(), rpoValue.getCreateBy(), "Draft RPO Updated");
        } else {
            rpoValue.setChangeId(Long.valueOf(0L));
            this.rpotableService.saveRpoTable(rpoValue);
            this.auditService.saveAudit("RPO", rpoValue.getId().longValue(), rpoValue.getCreateBy(), "RPO Updated");
        }
        Optional historyDetailDta = this.rpoTableHistoryRepository.findByRpoIdAndVersion(existingposDetails.getId(), existingposDetails.getVersion());
        RpoTableHistory historyRiskDetails = new RpoTableHistory(rpoValue);
        if (historyDetailDta.isPresent()) {
            System.out.println("Enter in is present");
            historyRiskDetails = new RpoTableHistory(rpoValue);
            historyRiskDetails.setId(((RpoTableHistory)historyDetailDta.get()).getId());
        } else {
            System.out.println("Enter in is not present");
            historyRiskDetails = new RpoTableHistory(rpoValue);
        }
        System.out.println("historyRiskDetails :: > " + historyRiskDetails);
        historyRiskDetails.setVersion(rpoValue.getVersion());
        historyRiskDetails.setChangeId(rpoValue.getChangeId());
        historyRiskDetails.setStatus(rpoValue.getStatus());
        this.rpoTableHistoryRepository.save(historyRiskDetails);
        return new ResponseEntity((Object)new RiskResponseDTO("Rpo submitted for approval", null), HttpStatus.ACCEPTED);
    }

    @GetMapping(value={"/rpohistorylist"})
    public ResponseEntity<List<RpoTableDto>> riskEventHistoryList(@RequestParam(value="rpoId", required=false) Long rpoId, @RequestParam(value="version", required=false) Long version) throws RequestException, JsonParseException, JsonMappingException, IOException {
        System.out.println("rpoid :: " + rpoId + "-- version ::  " + version);
        ArrayList<RpoTableDto> riskresponse = new ArrayList<RpoTableDto>();
        if (version != null && version != 0L) {
            long count = this.rpoTableHistoryRepository.countByRiskId(rpoId);
            System.out.println("count :: " + count);
            if (count == version) {
                RpoTableDto valueDto = new RpoTableDto((RpoTable)this.rpotableService.findRpoById(rpoId.longValue()).get());
                riskresponse.add(valueDto);
            } else {
                RpoTableHistory riskHistory = (RpoTableHistory)this.rpoTableHistoryService.findAllByversion(rpoId, version).get();
                RpoTableDto newRisk = new RpoTableDto(riskHistory);
                riskresponse.add(newRisk);
            }
        } else {
            List responseRiskDTOList = this.rpoTableHistoryService.findAllByIDs(rpoId);
            for (RpoTableHistory history : responseRiskDTOList) {
                RpoTableDto newRisk = new RpoTableDto(history);
                riskresponse.add(newRisk);
            }
        }
        return new ResponseEntity(riskresponse, HttpStatus.OK);
    }

    @GetMapping(value={"/retrieveRpo"})
    public ResponseEntity<?> findAllMasterValue() {
        return ResponseEntity.ok((Object)this.rpotableService.findAllRpo());
    }

    @GetMapping(value={"/retriveRpoId/{id}"})
    public ResponseEntity<RpoTableDto> findRpoById(@PathVariable(value="id") long id) {
        RpoTableDto valueDto = new RpoTableDto((RpoTable)this.rpotableService.findRpoById(id).get());
        return new ResponseEntity((Object)valueDto, HttpStatus.OK);
    }

    @DeleteMapping(value={"/deleteRpo/{id}"})
    public ResponseEntity<RpoTableDto> deleteRpoById(@PathVariable(value="id") long id) {
        Optional optionalRpoValue = this.rpotableService.findRpoById(id);
        RpoTable rpoTable = (RpoTable)optionalRpoValue.get();
        if (optionalRpoValue.isPresent()) {
            this.rpotableService.delete(rpoTable);
            return new ResponseEntity(HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    @GetMapping(value={"/retrieveAllRpo/{empId}"})
    public ResponseEntity<?> findAllMasterValue(@PathVariable(value="empId") Long empId) {
        return ResponseEntity.ok((Object)this.rpotableService.findAllRpoByEmpId(empId));
    }

    @GetMapping(value={"/retrieveRpolist"})
    public ResponseEntity<?> findAllByPageId(@RequestParam(value="pageId", required=false) String pageId, @RequestParam(value="dateRange", required=false) String dateRange, @RequestParam(value="status", required=false) String status, HttpServletRequest request) throws RequestException {
        List pageIdList = this.rpotableService.findAllByPageId(Long.parseLong(pageId), dateRange, status);
        return ResponseEntity.status((HttpStatus)HttpStatus.OK).body((Object)pageIdList);
    }

    @GetMapping(value={"/rpoListWithChild/{empId}"})
    public ResponseEntity<List<RpoTableDto>> rpoListWithChild(@PathVariable(value="empId") long empId, @RequestParam(value="pageIds", required=false) String pageIds, @RequestParam(value="dateRange", required=false) String dateRange) throws RequestException {
        List rpoTableDto = null;
        String[] searchArray = new String[]{"%20", "%2520"};
        String[] replaceArray = new String[]{" ", " "};
        String result = StringUtils.replaceEach((String)pageIds, (String[])searchArray, (String[])replaceArray);
        rpoTableDto = result != null && !result.isEmpty() && !result.equals("") ? this.rpotableService.findAllByRPOIDList(result, dateRange) : this.rpotableService.findAllByRPOEmpIds(empId);
        return new ResponseEntity((Object)rpoTableDto, HttpStatus.OK);
    }

    @GetMapping(value={"/rpoListWithDeptids"})
    public ResponseEntity<List<RpoTableDto>> rpoListWithDeptids(@RequestParam(value="deptIds", required=false) String deptIds) throws RequestException, ParseException {
        List rpoTableDto = null;
        String[] searchArray = new String[]{"%20", "%2520"};
        String[] replaceArray = new String[]{" ", " "};
        String result = StringUtils.replaceEach((String)deptIds, (String[])searchArray, (String[])replaceArray);
        if (result != null && !result.isEmpty() && !result.equals("")) {
            rpoTableDto = this.rpotableService.findRPOListDeptIds(result);
        }
        return new ResponseEntity(rpoTableDto, HttpStatus.OK);
    }
}

