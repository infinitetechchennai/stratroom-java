/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.Employee
 *  com.estrat.service.db.bean.po.ProcessEnabler
 *  com.estrat.service.db.bean.po.ProcessEnablerHistory
 *  com.estrat.service.db.bean.po.StagingChange
 *  com.estrat.service.db.bean.po.WorkflowStagingResponse
 *  com.estrat.service.db.dao.ApproversHistoryRepository
 *  com.estrat.service.db.dao.ControlPanelWorkFlowRepository
 *  com.estrat.service.db.dao.ProcessEnablerHistoryRepository
 *  com.estrat.service.db.dao.RiskEventHistoryRepository
 *  com.estrat.service.db.dao.StagingChangeRepository
 *  com.estrat.service.db.dto.DeptDetails
 *  com.estrat.service.db.dto.EmployeeDTO
 *  com.estrat.service.db.dto.PosTradingHoursCountsDto
 *  com.estrat.service.db.dto.ProcessEnablerDto
 *  com.estrat.service.db.dto.RiskResponseDTO
 *  com.estrat.service.db.exception.RequestException
 *  com.estrat.service.db.resource.ProcessEnablerController
 *  com.estrat.service.db.resource.util.UserThreadLocal
 *  com.estrat.service.db.service.ApproversHistoryService
 *  com.estrat.service.db.service.AuditDetailsService
 *  com.estrat.service.db.service.ControlPanelWorkFlowService
 *  com.estrat.service.db.service.EmployeeService
 *  com.estrat.service.db.service.ProcessEnablerHistoryService
 *  com.estrat.service.db.service.ProcessEnablerService
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
import com.estrat.service.db.bean.po.ProcessEnabler;
import com.estrat.service.db.bean.po.ProcessEnablerHistory;
import com.estrat.service.db.bean.po.StagingChange;
import com.estrat.service.db.bean.po.WorkflowStagingResponse;
import com.estrat.service.db.dao.ApproversHistoryRepository;
import com.estrat.service.db.dao.ControlPanelWorkFlowRepository;
import com.estrat.service.db.dao.ProcessEnablerHistoryRepository;
import com.estrat.service.db.dao.RiskEventHistoryRepository;
import com.estrat.service.db.dao.StagingChangeRepository;
import com.estrat.service.db.dto.DeptDetails;
import com.estrat.service.db.dto.EmployeeDTO;
import com.estrat.service.db.dto.PosTradingHoursCountsDto;
import com.estrat.service.db.dto.ProcessEnablerDto;
import com.estrat.service.db.dto.RiskResponseDTO;
import com.estrat.service.db.exception.RequestException;
import com.estrat.service.db.resource.util.UserThreadLocal;
import com.estrat.service.db.service.ApproversHistoryService;
import com.estrat.service.db.service.AuditDetailsService;
import com.estrat.service.db.service.ControlPanelWorkFlowService;
import com.estrat.service.db.service.EmployeeService;
import com.estrat.service.db.service.ProcessEnablerHistoryService;
import com.estrat.service.db.service.ProcessEnablerService;
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
public class ProcessEnablerController {
    @Autowired
    protected EmployeeService employeeService;
    @Autowired
    ProcessEnablerService processEnablerService;
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
    private RiskEventHistoryRepository riskEventHistoryRepository;
    @Autowired
    private AuditDetailsService auditService;
    @Autowired
    private ProcessEnablerHistoryRepository processEnablerHistoryRepository;
    @Autowired
    ProcessEnablerHistoryService processEnablerHistoryService;
    @Autowired
    WorkflowStagingService workflowStagingService;

    @PostMapping(value={"/saveProcessEnabler"})
    public ResponseEntity<?> saveProcessEnabler(@RequestBody ProcessEnablerDto processEnablerDto) {
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
        processEnablerDto.setDeptId(departmentId.longValue());
        if (processEnablerDto.getCreateBy() != 0L) {
            processEnablerDto.getPosValue().put("createdByName", logemp.getFirstName());
        }
        if (processEnablerDto.getOwner() != 0L) {
            navemployeeDTO.setEmployeeId(processEnablerDto.getOwner());
            processEnablerDto.getPosValue().put("ownerName", this.employeeService.getEmployee(navemployeeDTO).getFirstName());
        }
        ProcessEnabler processEnabler = new ProcessEnabler(processEnablerDto);
        processEnabler.setCreateTime(LocalDateTime.now());
        processEnabler.setVersion(Long.valueOf(0L));
        ProcessEnablerDto tempresp = this.processEnablerService.saveProcessEnabler(processEnabler);
        WorkflowStagingResponse workflowResponse = this.workflowStagingService.handleWorkflowAndStagingChange("process_enabler", tempresp.getId(), departmentId, "Process to Enabler", (Object)tempresp, processEnabler.getVersion(), Long.valueOf(logemployeeDTO.getEmployeeId()));
        if (workflowResponse.isWorkflowExists()) {
            StagingChange stagingChange = workflowResponse.getStagingChange();
            processEnabler.setChangeId(stagingChange.getChangeId());
        } else {
            processEnabler.setChangeId(Long.valueOf(0L));
        }
        processEnabler.setVersion(workflowResponse.getVersionToUse());
        processEnabler.setStatus(workflowResponse.getStatus());
        ProcessEnablerDto responseDTO = this.processEnablerService.saveProcessEnabler(processEnabler);
        if (workflowResponse.isWorkflowExists()) {
            this.auditService.saveAudit("POS", responseDTO.getId().longValue(), responseDTO.getCreateBy(), "Draft POS Created");
        } else {
            this.auditService.saveAudit("POS", responseDTO.getId().longValue(), responseDTO.getCreateBy(), " POS Created");
        }
        ProcessEnablerHistory historyRiskDetails = new ProcessEnablerHistory(processEnabler);
        historyRiskDetails.setVersion(processEnabler.getVersion());
        historyRiskDetails.setChangeId(processEnabler.getChangeId());
        historyRiskDetails.setStatus(processEnabler.getStatus());
        this.processEnablerHistoryRepository.save(historyRiskDetails);
        return new ResponseEntity((Object)responseDTO, HttpStatus.OK);
    }

    @PutMapping(value={"/updatePos"})
    public ResponseEntity<?> updatePos(@RequestBody ProcessEnablerDto processEnablerDto) throws RequestException {
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
            processEnablerDto.getPosValue().put("departmentName", navemp.getDeptDetails().getName());
        } else {
            Set deptSet = this.userRoleManagement.updateDeptList(Long.valueOf(navemp.getEmpId()));
            if (!deptSet.isEmpty()) {
                DeptDetails firstDept = (DeptDetails)deptSet.iterator().next();
                departmentId = firstDept.getId();
                processEnablerDto.getPosValue().put("departmentName", firstDept.getName());
            }
        }
        processEnablerDto.setDeptId(departmentId.longValue());
        ProcessEnabler existingposDetails = (ProcessEnabler)this.processEnablerService.findPosById(processEnablerDto.getId().longValue()).orElseThrow(() -> new RequestException("Risk not found for update"));
        if (processEnablerDto.getCreateBy() != 0L) {
            logemployeeDTO.setEmployeeId(processEnablerDto.getCreateBy());
            processEnablerDto.getPosValue().put("createdByName", this.employeeService.getEmployee(logemployeeDTO).getFirstName());
        }
        if (processEnablerDto.getOwner() != 0L) {
            logemployeeDTO.setEmployeeId(processEnablerDto.getOwner());
            processEnablerDto.getPosValue().put("ownerName", this.employeeService.getEmployee(logemployeeDTO).getFirstName());
        }
        if (StringUtils.isEmpty((CharSequence)processEnablerDto.getReceivedType())) {
            System.out.println("== Come from POS Page edit ====");
            processEnablerDto.setUpdateBy(logemp.getEmpId());
            processEnablerDto.setUpdateTime(LocalDateTime.now());
        } else {
            System.out.println("--- Come from POs aprove Page edit ---");
            if (existingposDetails.getUpdateBy() != 0L) {
                processEnablerDto.setUpdateBy(existingposDetails.getUpdateBy());
                processEnablerDto.setUpdateTime(existingposDetails.getUpdateTime());
            }
        }
        System.out.println("upadte By >>>>>> " + processEnablerDto.getUpdateBy());
        if (processEnablerDto.getUpdateBy() != 0L) {
            logemployeeDTO.setEmployeeId(processEnablerDto.getUpdateBy());
            processEnablerDto.getPosValue().put("updatedByName", this.employeeService.getEmployee(logemployeeDTO).getFirstName());
        }
        ProcessEnabler posEnabler = new ProcessEnabler(processEnablerDto);
        WorkflowStagingResponse workflowResponse = this.workflowStagingService.handleWorkflowAndStagingChange("process_enabler", existingposDetails.getId(), departmentId, "Process to Enabler", (Object)processEnablerDto, existingposDetails.getVersion(), Long.valueOf(logemployeeDTO.getEmployeeId()));
        posEnabler.setStatus(workflowResponse.getStatus());
        posEnabler.setVersion(workflowResponse.getVersionToUse());
        if (workflowResponse.isWorkflowExists()) {
            StagingChange stagingChange = workflowResponse.getStagingChange();
            posEnabler.setChangeId(stagingChange.getChangeId());
            this.processEnablerService.saveProcessEnabler(posEnabler);
            this.auditService.saveAudit("POS", posEnabler.getId().longValue(), posEnabler.getCreateBy(), "Draft POS Updated");
        } else {
            posEnabler.setChangeId(Long.valueOf(0L));
            this.processEnablerService.saveProcessEnabler(posEnabler);
            this.auditService.saveAudit("POS", posEnabler.getId().longValue(), posEnabler.getCreateBy(), "POS Updated");
        }
        Optional historyDetailDta = this.processEnablerHistoryRepository.findByPosIdAndVersion(existingposDetails.getId(), existingposDetails.getVersion());
        ProcessEnablerHistory historyRiskDetails = new ProcessEnablerHistory();
        if (historyDetailDta.isPresent()) {
            historyRiskDetails = new ProcessEnablerHistory(posEnabler);
            historyRiskDetails.setId(((ProcessEnablerHistory)historyDetailDta.get()).getId());
        } else {
            historyRiskDetails = new ProcessEnablerHistory(posEnabler);
        }
        System.out.println("historyRiskDetails :: > " + historyRiskDetails);
        historyRiskDetails.setVersion(posEnabler.getVersion());
        historyRiskDetails.setChangeId(posEnabler.getChangeId());
        historyRiskDetails.setStatus(posEnabler.getStatus());
        this.processEnablerHistoryRepository.save(historyRiskDetails);
        return new ResponseEntity((Object)new RiskResponseDTO("ProcessEnabler submitted for approval", null), HttpStatus.ACCEPTED);
    }

    @GetMapping(value={"/poshistorylist"})
    public ResponseEntity<List<ProcessEnablerDto>> riskEventHistoryList(@RequestParam(value="posId", required=false) Long posId, @RequestParam(value="version", required=false) Long version) throws RequestException, JsonParseException, JsonMappingException, IOException {
        ArrayList<ProcessEnablerDto> riskresponse = new ArrayList<ProcessEnablerDto>();
        if (version != null && version != 0L) {
            long count = this.processEnablerHistoryRepository.countByRiskId(posId);
            System.out.println("count :: " + count);
            if (count == version) {
                ProcessEnablerDto posDto = new ProcessEnablerDto((ProcessEnabler)this.processEnablerService.findPosById(posId.longValue()).get());
                riskresponse.add(posDto);
            } else {
                ProcessEnablerHistory riskHistory = (ProcessEnablerHistory)this.processEnablerHistoryService.findAllByversion(posId, version).get();
                ProcessEnablerDto newRisk = new ProcessEnablerDto(riskHistory);
                riskresponse.add(newRisk);
            }
        } else {
            List responseRiskDTOList = this.processEnablerHistoryService.findAllByIDs(posId);
            for (ProcessEnablerHistory history : responseRiskDTOList) {
                ProcessEnablerDto newRisk = new ProcessEnablerDto(history);
                riskresponse.add(newRisk);
            }
        }
        return new ResponseEntity(riskresponse, HttpStatus.OK);
    }

    @GetMapping(value={"/retrivePos"})
    public ResponseEntity<?> findAllProcessEnabler() {
        return ResponseEntity.ok((Object)this.processEnablerService.findAllProcessEnaler());
    }

    @GetMapping(value={"/retrivePosId/{id}"})
    public ResponseEntity<ProcessEnablerDto> findPosById(@PathVariable long id) {
        ProcessEnablerDto posDto = new ProcessEnablerDto((ProcessEnabler)this.processEnablerService.findPosById(id).get());
        return new ResponseEntity((Object)posDto, HttpStatus.OK);
    }

    @DeleteMapping(value={"/deletePos/{id}"})
    public ResponseEntity<ProcessEnablerDto> deletePos(@PathVariable long id) {
        Optional optionalPOs = this.processEnablerService.findPosById(id);
        ProcessEnabler processEnable = (ProcessEnabler)optionalPOs.get();
        if (optionalPOs.isPresent()) {
            this.processEnablerService.delete(processEnable);
            return new ResponseEntity(HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    @GetMapping(value={"/retriveAllpos/{empId}"})
    public ResponseEntity<?> findAllByEmpId(@PathVariable(value="empId") Long empId) {
        return ResponseEntity.ok((Object)this.processEnablerService.findAllPosBYEmpId(empId));
    }

    @GetMapping(value={"/retrievePoslist"})
    public ResponseEntity<?> findAllBYPageId(@RequestParam(value="pageId", required=false) String pageId, @RequestParam(value="dateRange", required=false) String dateRange, @RequestParam(value="status", required=false) String status, HttpServletRequest request) throws RequestException {
        List pageIdList = this.processEnablerService.findAllByPageId(Long.parseLong(pageId), dateRange, status);
        return ResponseEntity.status((HttpStatus)HttpStatus.OK).body((Object)pageIdList);
    }

    @GetMapping(value={"/posListWithChild/{empId}"})
    public ResponseEntity<List<ProcessEnablerDto>> posListWithChild(@PathVariable(value="empId") long empId, @RequestParam(value="posPageIds", required=false) String posPageIds, @RequestParam(value="dateRange", required=false) String dateRange) throws RequestException {
        List processEnablerDto = null;
        String[] searchArray = new String[]{"%20", "%2520"};
        String[] replaceArray = new String[]{" ", " "};
        String result = StringUtils.replaceEach((String)posPageIds, (String[])searchArray, (String[])replaceArray);
        processEnablerDto = result != null && !result.isEmpty() && !result.equals("") ? this.processEnablerService.findAllByPOSIDList(result, dateRange) : this.processEnablerService.findAllByPOSEmpIds(empId);
        return new ResponseEntity((Object)processEnablerDto, HttpStatus.OK);
    }

    @GetMapping(value={"/posListWithDeptids"})
    public ResponseEntity<List<ProcessEnablerDto>> posListWithDeptids(@RequestParam(value="deptIds", required=false) String deptIds) throws RequestException, ParseException {
        List processEnablerDto = null;
        String[] searchArray = new String[]{"%20", "%2520"};
        String[] replaceArray = new String[]{" ", " "};
        String result = StringUtils.replaceEach((String)deptIds, (String[])searchArray, (String[])replaceArray);
        if (result != null && !result.isEmpty() && !result.equals("")) {
            processEnablerDto = this.processEnablerService.findPOSListDeptIds(result);
        }
        return new ResponseEntity(processEnablerDto, HttpStatus.OK);
    }

    @GetMapping(value={"/posTradingHourseCount"})
    public ResponseEntity<List<PosTradingHoursCountsDto>> posTradingHourseCounts(@RequestParam(value="posPageIds", required=false) String posPageIds, @RequestParam(value="dateRange", required=false) String dateRange) throws RequestException {
        List processEnablerDto = null;
        String[] searchArray = new String[]{"%20", "%2520"};
        String[] replaceArray = new String[]{" ", " "};
        String result = StringUtils.replaceEach((String)posPageIds, (String[])searchArray, (String[])replaceArray);
        if (result != null && !result.isEmpty() && !result.equals("")) {
            processEnablerDto = this.processEnablerService.posTradingHourseCount(result, dateRange);
        }
        return new ResponseEntity(processEnablerDto, HttpStatus.OK);
    }
}

