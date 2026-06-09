/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.Employee
 *  com.estrat.service.db.bean.po.RiskCauseAndConsequence
 *  com.estrat.service.db.bean.po.RiskCauseAndConsequenceHistory
 *  com.estrat.service.db.bean.po.RiskConsequenceDetails
 *  com.estrat.service.db.bean.po.RiskConsequenceDetailsHistory
 *  com.estrat.service.db.bean.po.RiskDetails
 *  com.estrat.service.db.bean.po.RiskDetailsHistory
 *  com.estrat.service.db.bean.po.StagingChange
 *  com.estrat.service.db.cache.DBCache
 *  com.estrat.service.db.dao.ApproversHistoryRepository
 *  com.estrat.service.db.dao.StagingChangeRepository
 *  com.estrat.service.db.dto.ControlPanelWorkFlowDTO
 *  com.estrat.service.db.dto.DeptDetails
 *  com.estrat.service.db.dto.EmployeeDTO
 *  com.estrat.service.db.dto.RiskCauseAndConsequenceDTO
 *  com.estrat.service.db.dto.RiskConsequenceDTO
 *  com.estrat.service.db.dto.RiskDTO
 *  com.estrat.service.db.dto.RiskResponseDTO
 *  com.estrat.service.db.exception.RequestException
 *  com.estrat.service.db.resource.RiskCauseAndConsequenceController
 *  com.estrat.service.db.resource.util.UserThreadLocal
 *  com.estrat.service.db.service.AuditDetailsService
 *  com.estrat.service.db.service.ControlPanelWorkFlowService
 *  com.estrat.service.db.service.EmployeeService
 *  com.estrat.service.db.service.RiskCauseAndConsequenceHistoryService
 *  com.estrat.service.db.service.RiskCauseAndConsequenceService
 *  com.estrat.service.db.service.RiskDetailsHistoryService
 *  com.estrat.service.db.service.RiskDetailsService
 *  com.estrat.service.db.service.StagingChangeService
 *  com.estrat.service.db.service.UserRoleManagementService
 *  com.fasterxml.jackson.databind.ObjectMapper
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
 *  org.springframework.web.bind.annotation.RestController
 */
package com.estrat.service.db.resource;

import com.estrat.service.db.bean.Employee;
import com.estrat.service.db.bean.po.RiskCauseAndConsequence;
import com.estrat.service.db.bean.po.RiskCauseAndConsequenceHistory;
import com.estrat.service.db.bean.po.RiskConsequenceDetails;
import com.estrat.service.db.bean.po.RiskConsequenceDetailsHistory;
import com.estrat.service.db.bean.po.RiskDetails;
import com.estrat.service.db.bean.po.RiskDetailsHistory;
import com.estrat.service.db.bean.po.StagingChange;
import com.estrat.service.db.cache.DBCache;
import com.estrat.service.db.dao.ApproversHistoryRepository;
import com.estrat.service.db.dao.StagingChangeRepository;
import com.estrat.service.db.dto.ControlPanelWorkFlowDTO;
import com.estrat.service.db.dto.DeptDetails;
import com.estrat.service.db.dto.EmployeeDTO;
import com.estrat.service.db.dto.RiskCauseAndConsequenceDTO;
import com.estrat.service.db.dto.RiskConsequenceDTO;
import com.estrat.service.db.dto.RiskDTO;
import com.estrat.service.db.dto.RiskResponseDTO;
import com.estrat.service.db.exception.RequestException;
import com.estrat.service.db.resource.util.UserThreadLocal;
import com.estrat.service.db.service.AuditDetailsService;
import com.estrat.service.db.service.ControlPanelWorkFlowService;
import com.estrat.service.db.service.EmployeeService;
import com.estrat.service.db.service.RiskCauseAndConsequenceHistoryService;
import com.estrat.service.db.service.RiskCauseAndConsequenceService;
import com.estrat.service.db.service.RiskDetailsHistoryService;
import com.estrat.service.db.service.RiskDetailsService;
import com.estrat.service.db.service.StagingChangeService;
import com.estrat.service.db.service.UserRoleManagementService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Objects;
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
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RiskCauseAndConsequenceController {
    @Autowired
    protected RiskCauseAndConsequenceService riskCauseAndConsequenceService;
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private DBCache dbCache;
    @Autowired
    private AuditDetailsService auditService;
    @Autowired
    protected RiskDetailsService riskDetailsService;
    @Autowired
    private ControlPanelWorkFlowService controlPanelWorkFlowService;
    @Autowired
    ApproversHistoryRepository approversHistoryRepo;
    @Autowired
    StagingChangeService stagingChangeService;
    @Autowired
    StagingChangeRepository stagingChangesRepository;
    @Autowired
    UserRoleManagementService userRoleManagement;
    @Autowired
    RiskCauseAndConsequenceHistoryService riskCauseAndConsequenceHistoryService;
    @Autowired
    private RiskDetailsHistoryService riskDetailsHistoryService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @PostMapping(value={"/riskCause"})
    public ResponseEntity<RiskResponseDTO> saveRiskCauseAndConsequenceDetails(@RequestBody RiskCauseAndConsequenceDTO riskCauseAndConsequenceDTO, HttpServletRequest request) throws RequestException {
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
        if (riskCauseAndConsequenceDTO.getCreatedBy() != 0L) {
            riskCauseAndConsequenceDTO.getCauseAndConsequenceValue().put("createdByName", logemp.getFirstName());
        }
        if (riskCauseAndConsequenceDTO.getUpdatedBy() != 0L) {
            riskCauseAndConsequenceDTO.getCauseAndConsequenceValue().put("updatedByName", logemp.getFirstName());
        }
        if (riskCauseAndConsequenceDTO.getOwner() != 0L) {
            navemployeeDTO.setEmployeeId(riskCauseAndConsequenceDTO.getOwner());
            riskCauseAndConsequenceDTO.getCauseAndConsequenceValue().put("ownerName", this.employeeService.getEmployee(navemployeeDTO).getFirstName());
        }
        RiskCauseAndConsequence riskCauseAndConsequence = new RiskCauseAndConsequence(riskCauseAndConsequenceDTO);
        riskCauseAndConsequence.setCreatedTime(LocalDateTime.now());
        riskCauseAndConsequence.setVersion(1L);
        RiskDetails existingRiskDetails = (RiskDetails)this.riskDetailsService.findById(riskCauseAndConsequenceDTO.getRiskId()).orElseThrow(() -> new IllegalStateException("Risk details not found"));
        List workflows = this.controlPanelWorkFlowService.findWorkflowsByTypeAndDept("Risk", departmentId);
        if (!workflows.isEmpty()) {
            StagingChange stagingChange;
            riskCauseAndConsequence.setStatus("DRAFT");
            List openChanges = this.stagingChangesRepository.findByRecordIdAndTableNameAndStatusNot(existingRiskDetails.getId(), "risk_details", "APPROVED");
            if (!openChanges.isEmpty()) {
                stagingChange = (StagingChange)openChanges.get(0);
                stagingChange.setStatus("IN PROGRESS");
                String newValuesJson = this.serializeObjectToJson((Object)new RiskDTO(existingRiskDetails, false));
                stagingChange.setNewValue(newValuesJson);
            } else {
                stagingChange = new StagingChange();
                stagingChange.setTableName("risk_details");
                stagingChange.setRecordId(Long.valueOf(existingRiskDetails.getId()));
                stagingChange.setWorkflowId(Long.valueOf(((ControlPanelWorkFlowDTO)workflows.get(0)).getId()));
                stagingChange.setType("Risk");
                stagingChange.setConditionType("Manual");
                stagingChange.setStatus("IN PROGRESS");
                stagingChange.setSubmittedBy(Long.valueOf(logemployeeDTO.getEmployeeId()));
                stagingChange.setCreatedAt(LocalDateTime.now());
                stagingChange.setUpdatedAt(LocalDateTime.now());
                stagingChange.setVersion(existingRiskDetails.getVersion() + 1L);
                String newValuesJson = this.serializeObjectToJson((Object)new RiskDTO(existingRiskDetails, false));
                stagingChange.setNewValue(newValuesJson);
                existingRiskDetails.setVersion(Long.valueOf(existingRiskDetails.getVersion() + 1L));
                RiskDetailsHistory historyRiskDetails = new RiskDetailsHistory(existingRiskDetails);
                historyRiskDetails.setVersion(existingRiskDetails.getVersion());
                historyRiskDetails.setChangeId(existingRiskDetails.getChangeId());
                historyRiskDetails.setStatus("DRAFT");
                this.riskDetailsHistoryService.save(historyRiskDetails);
            }
            this.stagingChangesRepository.save(stagingChange);
            existingRiskDetails.setChangeId(stagingChange.getChangeId());
            riskCauseAndConsequence.setVersion(stagingChange.getVersion());
            riskCauseAndConsequence.setChangeId(stagingChange.getChangeId().longValue());
            this.riskCauseAndConsequenceService.save(riskCauseAndConsequence);
            RiskCauseAndConsequenceHistory causeHistory = new RiskCauseAndConsequenceHistory(riskCauseAndConsequence);
            causeHistory.setVersion(stagingChange.getVersion());
            causeHistory.setChangeId(stagingChange.getChangeId().longValue());
            causeHistory.setCreatedTime(LocalDateTime.now());
            this.riskCauseAndConsequenceHistoryService.save(causeHistory);
            existingRiskDetails.setChangeId(stagingChange.getChangeId());
            riskCauseAndConsequence.setVersion(stagingChange.getVersion());
            riskCauseAndConsequence.setChangeId(stagingChange.getChangeId().longValue());
            this.riskCauseAndConsequenceService.save(riskCauseAndConsequence);
            this.riskDetailsService.save(existingRiskDetails);
            RiskResponseDTO riskResponseDTO = new RiskResponseDTO("Risk Cause and Consequence saved as draft", new RiskDTO(existingRiskDetails, false));
            riskResponseDTO.getRiskDTO().setChangeId(stagingChange.getChangeId().longValue());
            this.auditService.saveAudit("Risk", existingRiskDetails.getId(), logemployeeDTO.getEmployeeId(), "Risk Cause and Consequence Draft Created");
            return new ResponseEntity((Object)riskResponseDTO, HttpStatus.CREATED);
        }
        riskCauseAndConsequence.setStatus("APPROVED");
        this.riskCauseAndConsequenceService.save(riskCauseAndConsequence);
        RiskCauseAndConsequenceHistory causeHistory = new RiskCauseAndConsequenceHistory(riskCauseAndConsequence);
        causeHistory.setVersion(existingRiskDetails.getVersion().longValue());
        causeHistory.setCreatedTime(LocalDateTime.now());
        causeHistory.setChangeId(0L);
        this.riskCauseAndConsequenceHistoryService.save(causeHistory);
        RiskResponseDTO riskResponseDTO = this.riskDetailsService.save(existingRiskDetails);
        this.auditService.saveAudit("Risk", existingRiskDetails.getId(), logemployeeDTO.getEmployeeId(), "Risk Cause and Consequence Saved");
        return new ResponseEntity((Object)riskResponseDTO, HttpStatus.OK);
    }

    @PutMapping(value={"/riskCause"})
    public ResponseEntity<RiskResponseDTO> updateRiskCauseAndConsequenceDetails(@RequestBody RiskCauseAndConsequenceDTO riskCauseAndConsequenceDTO, HttpServletRequest request) throws RequestException {
        this.applyDefaultValues(riskCauseAndConsequenceDTO.getCauseAndConsequenceValue());
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
        if (riskCauseAndConsequenceDTO.getCreatedBy() != 0L) {
            logemployeeDTO.setEmployeeId(riskCauseAndConsequenceDTO.getCreatedBy());
            riskCauseAndConsequenceDTO.getCauseAndConsequenceValue().put("createdByName", this.employeeService.getEmployee(logemployeeDTO).getFirstName());
        }
        if (riskCauseAndConsequenceDTO.getUpdatedBy() != 0L) {
            riskCauseAndConsequenceDTO.getCauseAndConsequenceValue().put("updatedByName", logemp.getFirstName());
        }
        if (riskCauseAndConsequenceDTO.getOwner() != 0L) {
            navemployeeDTO.setEmployeeId(riskCauseAndConsequenceDTO.getOwner());
            riskCauseAndConsequenceDTO.getCauseAndConsequenceValue().put("ownerName", this.employeeService.getEmployee(navemployeeDTO).getFirstName());
        }
        RiskCauseAndConsequence riskCauseAndConsequence = new RiskCauseAndConsequence(riskCauseAndConsequenceDTO);
        riskCauseAndConsequence.setUpdatedTime(LocalDateTime.now());
        RiskDetails riskDetails = (RiskDetails)this.riskDetailsService.findById(riskCauseAndConsequenceDTO.getRiskId()).orElseThrow(() -> new IllegalStateException("Risk details not found for the provided RiskCause."));
        List workflows = this.controlPanelWorkFlowService.findWorkflowsByTypeAndDept("Risk", departmentId);
        String oldValuesJson = this.serializeObjectToJson((Object)new RiskDTO(riskDetails, false));
        String newValuesJson = this.serializeObjectToJson((Object)new RiskCauseAndConsequenceDTO(riskCauseAndConsequence));
        if (!workflows.isEmpty()) {
            StagingChange stagingChange;
            riskCauseAndConsequence.setStatus("DRAFT");
            System.out.println("cuse :: " + riskCauseAndConsequence.getChangeId());
            if (riskCauseAndConsequenceDTO.getChangeId() != 0L) {
                stagingChange = (StagingChange)this.stagingChangesRepository.findById(riskCauseAndConsequenceDTO.getChangeId()).orElseThrow(() -> new IllegalStateException("Change not found"));
                stagingChange.setStatus("IN PROGRESS");
                stagingChange.setNewValue(newValuesJson);
                stagingChange.setOldValue(oldValuesJson);
            } else {
                Optional latestApproved = this.stagingChangesRepository.findLatestApprovedChange("risk_details", Long.valueOf(riskCauseAndConsequenceDTO.getRiskId()));
                stagingChange = new StagingChange();
                stagingChange.setTableName("risk_details");
                stagingChange.setRecordId(Long.valueOf(riskDetails.getId()));
                stagingChange.setParentRecordId(riskCauseAndConsequenceDTO.getRiskId());
                stagingChange.setParentId(latestApproved.map(StagingChange::getChangeId).orElse(0L).longValue());
                stagingChange.setWorkflowId(Long.valueOf(((ControlPanelWorkFlowDTO)workflows.get(0)).getId()));
                stagingChange.setType("Risk");
                stagingChange.setConditionType("Manual");
                stagingChange.setNewValue(newValuesJson);
                stagingChange.setOldValue(oldValuesJson);
                stagingChange.setSubmittedBy(Long.valueOf(logemployeeDTO.getEmployeeId()));
                stagingChange.setStatus("IN PROGRESS");
                stagingChange.setCreatedAt(LocalDateTime.now());
                stagingChange.setUpdatedAt(LocalDateTime.now());
                stagingChange.setVersion(latestApproved.map(StagingChange::getVersion).orElse(0L) + 1L);
            }
            this.stagingChangesRepository.save(stagingChange);
            riskDetails.setChangeId(stagingChange.getChangeId());
            riskDetails.setVersion(Long.valueOf(stagingChange.getVersion()));
            riskCauseAndConsequence.setVersion(stagingChange.getVersion());
            riskCauseAndConsequence.setChangeId(stagingChange.getChangeId().longValue());
            this.riskCauseAndConsequenceService.save(riskCauseAndConsequence);
            this.riskDetailsService.save(riskDetails);
            RiskCauseAndConsequenceHistory riskCauseHistory = new RiskCauseAndConsequenceHistory(riskCauseAndConsequence);
            riskCauseHistory.setVersion(riskDetails.getVersion().longValue());
            riskCauseHistory.setChangeId(riskDetails.getChangeId().longValue());
            riskCauseHistory.setCreatedTime(LocalDateTime.now());
            this.riskCauseAndConsequenceHistoryService.save(riskCauseHistory);
            RiskResponseDTO responseDTO = new RiskResponseDTO("Risk Cause updated successfully", new RiskDTO(riskDetails, true));
            responseDTO.getRiskDTO().setChangeId(stagingChange.getChangeId().longValue());
            this.auditService.updateAudit("Risk", riskDetails.getId(), logemployeeDTO.getEmployeeId(), "Risk Cause Updated");
            return new ResponseEntity((Object)responseDTO, HttpStatus.OK);
        }
        riskCauseAndConsequence.setStatus("APPROVED");
        riskCauseAndConsequence.setVersion(1L);
        riskCauseAndConsequence.setUpdatedTime(LocalDateTime.now());
        RiskResponseDTO riskResponseDTO = this.riskCauseAndConsequenceService.save(riskCauseAndConsequence);
        RiskCauseAndConsequenceHistory riskCauseHistory = new RiskCauseAndConsequenceHistory(riskCauseAndConsequence);
        riskCauseHistory.setVersion(riskDetails.getVersion().longValue());
        riskCauseHistory.setChangeId(riskDetails.getChangeId().longValue());
        riskCauseHistory.setCreatedTime(LocalDateTime.now());
        this.riskCauseAndConsequenceHistoryService.save(riskCauseHistory);
        this.auditService.updateAudit("Risk", riskResponseDTO.getRiskCauseAndConsequenceDTO().getId(), riskResponseDTO.getRiskCauseAndConsequenceDTO().getUpdatedBy(), "Cause Modified");
        return new ResponseEntity((Object)riskResponseDTO, HttpStatus.OK);
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

    @GetMapping(value={"/riskCause/{id}"})
    public ResponseEntity<RiskCauseAndConsequenceDTO> getRiskCauseAndConsequenceById(@PathVariable(value="id") Long id) throws RequestException {
        RiskCauseAndConsequenceDTO riskCauseAndConsequenceDTO = new RiskCauseAndConsequenceDTO((RiskCauseAndConsequence)this.riskCauseAndConsequenceService.findById(id.longValue()).get());
        return new ResponseEntity((Object)riskCauseAndConsequenceDTO, HttpStatus.OK);
    }

    @DeleteMapping(value={"/riskCause/{id}"})
    public ResponseEntity<RiskResponseDTO> deleteRiskCauseAndConsequenceDetailsById(@PathVariable(value="id") Long id, HttpServletRequest request) throws RequestException {
        Optional riskCauseAndConsequence = this.riskCauseAndConsequenceService.findById(id.longValue());
        if (riskCauseAndConsequence.isPresent()) {
            RiskCauseAndConsequence riskCauseAndConsequence1 = (RiskCauseAndConsequence)riskCauseAndConsequence.get();
            riskCauseAndConsequence1.getConsequenceList();
            this.riskCauseAndConsequenceHistoryService.deleteHistor(Long.valueOf(riskCauseAndConsequence1.getId()));
            this.riskCauseAndConsequenceService.delete(riskCauseAndConsequence1);
            RiskResponseDTO riskResponseDTO = new RiskResponseDTO();
            riskResponseDTO.setFlag(true);
            this.auditService.deleteAudit("Risk", id.longValue(), Long.valueOf(UserThreadLocal.get((String)"LOGGED_IN_EMPLOYEE_ID")).longValue(), "Cause Deleted");
            this.dbCache.remove((Object)("retrieveCauseListByRiskId" + riskCauseAndConsequence1.getRiskId().getId()), "dbCache");
            this.dbCache.remove((Object)("retrieveCauseListByEmpId" + UserThreadLocal.get()), "dbCache");
            return new ResponseEntity((Object)riskResponseDTO, HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    @GetMapping(value={"/riskCauseList/{riskId}"})
    public ResponseEntity<List<RiskCauseAndConsequenceDTO>> findAllByRiskId(@PathVariable(value="riskId") Long riskId) throws RequestException {
        List riskCauseAndConsequenceDTOS = this.riskCauseAndConsequenceService.findAllByRiskDetailsId(riskId);
        return new ResponseEntity((Object)riskCauseAndConsequenceDTOS, HttpStatus.OK);
    }

    @GetMapping(value={"/retrieveRiskCauseList/{empId}"})
    public ResponseEntity<List<RiskCauseAndConsequenceDTO>> findAllByEmpId(@PathVariable(value="empId") Long empId) throws RequestException {
        List riskCauseAndConsequenceDTOList = this.riskCauseAndConsequenceService.findAll(empId.longValue());
        return new ResponseEntity((Object)riskCauseAndConsequenceDTOList, HttpStatus.OK);
    }

    private void applyDefaultValues(Map<String, Object> causeAndConsequenceValue) {
        if (Objects.isNull(causeAndConsequenceValue.get("progressval")) || StringUtils.isEmpty((CharSequence)causeAndConsequenceValue.get("progressval").toString())) {
            causeAndConsequenceValue.put("progressval", "0");
        }
    }

    @PostMapping(value={"/riskConsequence"})
    public ResponseEntity<RiskConsequenceDTO> saveRiskConsequenceDetails(@RequestBody RiskConsequenceDTO riskConsequenceDTO, HttpServletRequest request) throws RequestException {
        Set deptSet;
        this.applyDefaultValues(riskConsequenceDTO.getConsequenceValue());
        EmployeeDTO logemployeeDTO = new EmployeeDTO();
        logemployeeDTO.setEmployeeId(Long.valueOf(UserThreadLocal.get((String)"LOGGED_IN_EMPLOYEE_ID")).longValue());
        EmployeeDTO navemployeeDTO = new EmployeeDTO();
        navemployeeDTO.setEmployeeId(Long.valueOf(UserThreadLocal.get((String)"LOGGED_IN_EMPLOYEE_ID")).longValue());
        if (UserThreadLocal.get((String)"SUPER_USER_ID") != null && !UserThreadLocal.get((String)"SUPER_USER_ID").equals("0") && !UserThreadLocal.get((String)"SUPER_USER_ID").isEmpty()) {
            logemployeeDTO.setEmployeeId(Long.valueOf(UserThreadLocal.get((String)"SUPER_USER_ID")).longValue());
        }
        Employee logemp = this.employeeService.getEmployee(logemployeeDTO);
        Employee navemp = this.employeeService.getEmployee(navemployeeDTO);
        Long departmentId = navemp.getDeptDetails() != null ? navemp.getDeptDetails().getId() : 0L;
        if (departmentId == 0L && !(deptSet = this.userRoleManagement.updateDeptList(Long.valueOf(navemp.getEmpId()))).isEmpty()) {
            departmentId = ((DeptDetails)deptSet.iterator().next()).getId();
        }
        if (riskConsequenceDTO.getCreatedBy() != 0L) {
            riskConsequenceDTO.getConsequenceValue().put("createdByName", logemp.getFirstName());
        }
        if (riskConsequenceDTO.getUpdatedBy() != 0L) {
            riskConsequenceDTO.getConsequenceValue().put("updatedByName", logemp.getFirstName());
        }
        if (riskConsequenceDTO.getOwner() != 0L) {
            navemployeeDTO.setEmployeeId(riskConsequenceDTO.getOwner());
            riskConsequenceDTO.getConsequenceValue().put("ownerName", this.employeeService.getEmployee(navemployeeDTO).getFirstName());
        }
        RiskConsequenceDetails riskConsequence = new RiskConsequenceDetails(riskConsequenceDTO);
        riskConsequence.setCreatedTime(LocalDateTime.now());
        riskConsequence.setVersion(1L);
        RiskCauseAndConsequence riskCause = (RiskCauseAndConsequence)this.riskCauseAndConsequenceService.findById(riskConsequenceDTO.getCauseConqId()).orElseThrow(() -> new IllegalStateException("Risk Cause and Consequence not found"));
        RiskDetails riskDetails = (RiskDetails)this.riskDetailsService.findById(riskCause.getRiskId().getId()).orElseThrow(() -> new IllegalStateException("Risk details not found"));
        List workflows = this.controlPanelWorkFlowService.findWorkflowsByTypeAndDept("Risk", departmentId);
        if (!workflows.isEmpty()) {
            StagingChange stagingChange;
            riskConsequence.setStatus("DRAFT");
            List openChanges = this.stagingChangesRepository.findByRecordIdAndTableNameAndStatusNot(riskDetails.getId(), "risk_details", "APPROVED");
            if (!openChanges.isEmpty()) {
                stagingChange = (StagingChange)openChanges.get(0);
                stagingChange.setStatus("IN PROGRESS");
                String newValuesJson = this.serializeObjectToJson((Object)new RiskDTO(riskDetails, true));
                stagingChange.setNewValue(newValuesJson);
            } else {
                stagingChange = new StagingChange();
                stagingChange.setTableName("risk_details");
                stagingChange.setRecordId(Long.valueOf(riskDetails.getId()));
                stagingChange.setStatus("IN PROGRESS");
                stagingChange.setSubmittedBy(Long.valueOf(logemployeeDTO.getEmployeeId()));
                stagingChange.setCreatedAt(LocalDateTime.now());
                stagingChange.setUpdatedAt(LocalDateTime.now());
                stagingChange.setVersion(riskDetails.getVersion() + 1L);
                stagingChange.setWorkflowId(Long.valueOf(((ControlPanelWorkFlowDTO)workflows.get(0)).getId()));
                stagingChange.setType("Risk");
                stagingChange.setConditionType("Manual");
                String newValuesJson = this.serializeObjectToJson((Object)new RiskDTO(riskDetails, true));
                stagingChange.setNewValue(newValuesJson);
                riskDetails.setVersion(Long.valueOf(riskDetails.getVersion() + 1L));
            }
            this.stagingChangesRepository.save(stagingChange);
            riskConsequence.setVersion(stagingChange.getVersion());
            riskConsequence.setChangeId(stagingChange.getChangeId().longValue());
            this.riskCauseAndConsequenceService.save(riskConsequence);
            riskDetails.setChangeId(stagingChange.getChangeId());
            this.riskDetailsService.save(riskDetails);
            RiskConsequenceDetailsHistory history = new RiskConsequenceDetailsHistory(riskConsequence);
            history.setVersion(riskDetails.getVersion().longValue());
            this.riskCauseAndConsequenceHistoryService.save(history);
            RiskConsequenceDTO responseDTO = new RiskConsequenceDTO(riskConsequence);
            responseDTO.setChangeId(stagingChange.getChangeId().longValue());
            this.auditService.saveAudit("Risk", riskDetails.getId(), logemployeeDTO.getEmployeeId(), "Risk Consequence Saved as Draft");
            return new ResponseEntity((Object)responseDTO, HttpStatus.CREATED);
        }
        riskConsequence.setStatus("APPROVED");
        this.riskCauseAndConsequenceService.save(riskConsequence);
        RiskConsequenceDetailsHistory history = new RiskConsequenceDetailsHistory(riskConsequence);
        history.setVersion(1L);
        this.riskCauseAndConsequenceHistoryService.save(history);
        RiskConsequenceDTO responseDTO = new RiskConsequenceDTO(riskConsequence);
        this.auditService.saveAudit("Risk", riskDetails.getId(), logemployeeDTO.getEmployeeId(), "Risk Consequence Saved");
        return new ResponseEntity((Object)responseDTO, HttpStatus.OK);
    }

    @PutMapping(value={"/riskConsequence"})
    public ResponseEntity<RiskConsequenceDTO> updateRiskConsequenceDetails(@RequestBody RiskConsequenceDTO riskConsequenceDTO, HttpServletRequest request) throws RequestException {
        Set deptSet;
        this.applyDefaultValues(riskConsequenceDTO.getConsequenceValue());
        EmployeeDTO logemployeeDTO = new EmployeeDTO();
        logemployeeDTO.setEmployeeId(Long.valueOf(UserThreadLocal.get((String)"LOGGED_IN_EMPLOYEE_ID")).longValue());
        EmployeeDTO navemployeeDTO = new EmployeeDTO();
        navemployeeDTO.setEmployeeId(Long.valueOf(UserThreadLocal.get((String)"LOGGED_IN_EMPLOYEE_ID")).longValue());
        if (UserThreadLocal.get((String)"SUPER_USER_ID") != null && !UserThreadLocal.get((String)"SUPER_USER_ID").equals("0") && !UserThreadLocal.get((String)"SUPER_USER_ID").isEmpty()) {
            logemployeeDTO.setEmployeeId(Long.valueOf(UserThreadLocal.get((String)"SUPER_USER_ID")).longValue());
        }
        Employee logemp = this.employeeService.getEmployee(logemployeeDTO);
        Employee navemp = this.employeeService.getEmployee(navemployeeDTO);
        Long departmentId = navemp.getDeptDetails() != null ? navemp.getDeptDetails().getId() : 0L;
        if (departmentId == 0L && !(deptSet = this.userRoleManagement.updateDeptList(Long.valueOf(navemp.getEmpId()))).isEmpty()) {
            departmentId = ((DeptDetails)deptSet.iterator().next()).getId();
        }
        if (riskConsequenceDTO.getCreatedBy() != 0L) {
            logemployeeDTO.setEmployeeId(riskConsequenceDTO.getCreatedBy());
            riskConsequenceDTO.getConsequenceValue().put("createdByName", this.employeeService.getEmployee(logemployeeDTO).getFirstName());
        }
        if (riskConsequenceDTO.getUpdatedBy() != 0L) {
            riskConsequenceDTO.getConsequenceValue().put("updatedByName", logemp.getFirstName());
        }
        if (riskConsequenceDTO.getOwner() != 0L) {
            navemployeeDTO.setEmployeeId(riskConsequenceDTO.getOwner());
            riskConsequenceDTO.getConsequenceValue().put("ownerName", this.employeeService.getEmployee(navemployeeDTO).getFirstName());
        }
        RiskConsequenceDetails riskConsequence = new RiskConsequenceDetails(riskConsequenceDTO);
        riskConsequence.setUpdatedTime(LocalDateTime.now());
        RiskCauseAndConsequence riskCause = (RiskCauseAndConsequence)this.riskCauseAndConsequenceService.findById(riskConsequenceDTO.getCauseConqId()).orElseThrow(() -> new IllegalStateException("RiskCauseAndConsequence not found"));
        RiskDetails riskDetails = (RiskDetails)this.riskDetailsService.findById(riskCause.getRiskId().getId()).orElseThrow(() -> new IllegalStateException("Risk details not found"));
        List workflows = this.controlPanelWorkFlowService.findWorkflowsByTypeAndDept("Risk", departmentId);
        String oldValuesJson = this.serializeObjectToJson((Object)new RiskDTO(riskDetails, false));
        String newValuesJson = this.serializeObjectToJson((Object)new RiskConsequenceDTO(riskConsequence));
        if (!workflows.isEmpty()) {
            StagingChange stagingChange;
            List openChanges = this.stagingChangesRepository.findByRecordIdAndTableNameAndStatusNot(riskDetails.getId(), "risk_details", "APPROVED");
            riskConsequence.setStatus("DRAFT");
            if (!openChanges.isEmpty()) {
                stagingChange = (StagingChange)openChanges.get(0);
                stagingChange.setStatus("IN PROGRESS");
                stagingChange.setNewValue(newValuesJson);
                stagingChange.setUpdatedAt(LocalDateTime.now());
            } else {
                stagingChange = new StagingChange();
                stagingChange.setTableName("risk_details");
                stagingChange.setRecordId(Long.valueOf(riskDetails.getId()));
                stagingChange.setStatus("IN PROGRESS");
                stagingChange.setSubmittedBy(Long.valueOf(logemployeeDTO.getEmployeeId()));
                stagingChange.setCreatedAt(LocalDateTime.now());
                stagingChange.setUpdatedAt(LocalDateTime.now());
                stagingChange.setVersion(riskDetails.getVersion() + 1L);
                stagingChange.setNewValue(newValuesJson);
                stagingChange.setWorkflowId(Long.valueOf(((ControlPanelWorkFlowDTO)workflows.get(0)).getId()));
                stagingChange.setType("Risk");
                stagingChange.setConditionType("Manual");
                riskDetails.setVersion(Long.valueOf(riskDetails.getVersion() + 1L));
            }
            this.stagingChangesRepository.save(stagingChange);
            riskConsequence.setChangeId(stagingChange.getChangeId().longValue());
            riskConsequence.setVersion(riskDetails.getVersion().longValue());
            this.riskCauseAndConsequenceService.save(riskConsequence);
            RiskConsequenceDetailsHistory history = new RiskConsequenceDetailsHistory(riskConsequence);
            history.setVersion(riskDetails.getVersion().longValue());
            this.riskCauseAndConsequenceHistoryService.save(history);
            riskDetails.setChangeId(stagingChange.getChangeId());
            this.riskDetailsService.save(riskDetails);
            RiskConsequenceDTO responseDTO = new RiskConsequenceDTO(riskConsequence);
            responseDTO.setChangeId(stagingChange.getChangeId().longValue());
            this.auditService.updateAudit("RiskConsequence", riskConsequence.getId(), logemployeeDTO.getEmployeeId(), "RiskConsequence Updated");
            return new ResponseEntity((Object)responseDTO, HttpStatus.OK);
        }
        riskConsequence.setStatus("APPROVED");
        riskConsequence.setVersion(1L);
        this.riskCauseAndConsequenceService.save(riskConsequence);
        RiskConsequenceDetailsHistory history = new RiskConsequenceDetailsHistory(riskConsequence);
        history.setVersion(riskDetails.getVersion().longValue());
        this.riskCauseAndConsequenceHistoryService.save(history);
        RiskConsequenceDTO responseDTO = new RiskConsequenceDTO(riskConsequence);
        this.auditService.updateAudit("RiskConsequence", riskConsequence.getId(), logemployeeDTO.getEmployeeId(), "RiskConsequence Updated");
        return new ResponseEntity((Object)responseDTO, HttpStatus.OK);
    }

    @GetMapping(value={"/riskConsequence/{id}"})
    public ResponseEntity<RiskConsequenceDTO> getRiskConsequenceById(@PathVariable(value="id") Long id) throws RequestException {
        RiskConsequenceDTO riskCauseAndConsequenceDTO = new RiskConsequenceDTO((RiskConsequenceDetails)this.riskCauseAndConsequenceService.findConqById(id.longValue()).get());
        return new ResponseEntity((Object)riskCauseAndConsequenceDTO, HttpStatus.OK);
    }

    @DeleteMapping(value={"/riskConsequence/{id}"})
    public ResponseEntity<RiskResponseDTO> deleteRiskConsequenceDetailsById(@PathVariable(value="id") Long id, HttpServletRequest request) throws RequestException {
        Optional riskCauseAndConsequence = this.riskCauseAndConsequenceService.findConqById(id.longValue());
        if (riskCauseAndConsequence.isPresent()) {
            RiskConsequenceDetails riskConqObj = (RiskConsequenceDetails)riskCauseAndConsequence.get();
            this.riskCauseAndConsequenceHistoryService.deleteConsequHistor(Long.valueOf(riskConqObj.getId()));
            this.riskCauseAndConsequenceService.delete(riskConqObj);
            RiskResponseDTO riskResponseDTO = new RiskResponseDTO();
            riskResponseDTO.setFlag(true);
            this.auditService.deleteAudit("Risk", id.longValue(), Long.valueOf(UserThreadLocal.get((String)"LOGGED_IN_EMPLOYEE_ID")).longValue(), "Consequence Deleted");
            Optional riskCauseDetails = this.riskCauseAndConsequenceService.findById(((RiskConsequenceDetails)riskCauseAndConsequence.get()).getCauseConqId());
            if (riskCauseDetails.isPresent()) {
                this.dbCache.remove((Object)("retrieveCauseListByRiskId" + ((RiskCauseAndConsequence)riskCauseDetails.get()).getRiskId().getId()), "dbCache");
            }
            this.dbCache.remove((Object)("retrieveCauseListByEmpId" + UserThreadLocal.get()), "dbCache");
            this.dbCache.remove((Object)("findAllByConqId" + ((RiskConsequenceDetails)riskCauseAndConsequence.get()).getCauseConqId()), "dbCache");
            return new ResponseEntity((Object)riskResponseDTO, HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    @GetMapping(value={"/riskConsequenceList/{conqId}"})
    public ResponseEntity<List<RiskConsequenceDTO>> findAllByConsequenceId(@PathVariable(value="conqId") Long conqId) throws RequestException {
        List riskCauseAndConsequenceDTOS = this.riskCauseAndConsequenceService.findAllByConqId(conqId);
        return new ResponseEntity((Object)riskCauseAndConsequenceDTOS, HttpStatus.OK);
    }

    @GetMapping(value={"/allRiskCause"})
    public ResponseEntity<List<Map<String, Object>>> findAllRiskCause(HttpServletRequest request) throws RequestException {
        return new ResponseEntity((Object)this.riskCauseAndConsequenceService.findAllRiskCause(), HttpStatus.OK);
    }

    @GetMapping(value={"/riskCauseNameList/{riskId}"})
    public ResponseEntity<List<Map<String, Object>>> findAllRiskCause(@PathVariable(value="riskId") Long riskId, HttpServletRequest request) throws RequestException {
        return new ResponseEntity((Object)this.riskCauseAndConsequenceService.findAllRiskCause(riskId.longValue()), HttpStatus.OK);
    }
}

