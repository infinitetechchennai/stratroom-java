/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.Employee
 *  com.estrat.backend.db.bean.po.RiskDetails
 *  com.estrat.backend.db.bean.po.RiskDetailsHistory
 *  com.estrat.backend.db.bean.po.RiskPlan
 *  com.estrat.backend.db.bean.po.RiskPlanHistory
 *  com.estrat.backend.db.bean.po.StagingChange
 *  com.estrat.backend.db.dao.ApproversHistoryRepository
 *  com.estrat.backend.db.dao.StagingChangeRepository
 *  com.estrat.backend.db.dto.ControlPanelWorkFlowDTO
 *  com.estrat.backend.db.dto.DeptDetails
 *  com.estrat.backend.db.dto.EmployeeDTO
 *  com.estrat.backend.db.dto.RiskDTO
 *  com.estrat.backend.db.dto.RiskPlanDTO
 *  com.estrat.backend.db.dto.RiskResponseDTO
 *  com.estrat.backend.db.exception.RequestException
 *  com.estrat.backend.db.resource.RiskPlanController
 *  com.estrat.backend.db.resource.util.RiskUtil
 *  com.estrat.backend.db.resource.util.UserThreadLocal
 *  com.estrat.backend.db.service.AuditDetailsService
 *  com.estrat.backend.db.service.ControlPanelWorkFlowService
 *  com.estrat.backend.db.service.EmployeeService
 *  com.estrat.backend.db.service.RiskDetailsHistoryService
 *  com.estrat.backend.db.service.RiskDetailsService
 *  com.estrat.backend.db.service.RiskPlanService
 *  com.estrat.backend.db.service.StagingChangeService
 *  com.estrat.backend.db.service.UserRoleManagementService
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
package com.estrat.backend.db.resource;

import com.estrat.backend.db.bean.Employee;
import com.estrat.backend.db.bean.po.RiskDetails;
import com.estrat.backend.db.bean.po.RiskDetailsHistory;
import com.estrat.backend.db.bean.po.RiskPlan;
import com.estrat.backend.db.bean.po.RiskPlanHistory;
import com.estrat.backend.db.bean.po.StagingChange;
import com.estrat.backend.db.dao.ApproversHistoryRepository;
import com.estrat.backend.db.dao.StagingChangeRepository;
import com.estrat.backend.db.dto.ControlPanelWorkFlowDTO;
import com.estrat.backend.db.dto.DeptDetails;
import com.estrat.backend.db.dto.EmployeeDTO;
import com.estrat.backend.db.dto.RiskDTO;
import com.estrat.backend.db.dto.RiskPlanDTO;
import com.estrat.backend.db.dto.RiskResponseDTO;
import com.estrat.backend.db.exception.RequestException;
import com.estrat.backend.db.resource.util.RiskUtil;
import com.estrat.backend.db.resource.util.UserThreadLocal;
import com.estrat.backend.db.service.AuditDetailsService;
import com.estrat.backend.db.service.ControlPanelWorkFlowService;
import com.estrat.backend.db.service.EmployeeService;
import com.estrat.backend.db.service.RiskDetailsHistoryService;
import com.estrat.backend.db.service.RiskDetailsService;
import com.estrat.backend.db.service.RiskPlanService;
import com.estrat.backend.db.service.StagingChangeService;
import com.estrat.backend.db.service.UserRoleManagementService;
import com.google.gson.Gson;
import java.time.LocalDateTime;
import java.util.ArrayList;
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
public class RiskPlanController {
    @Autowired
    protected RiskPlanService riskPlanService;
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private RiskUtil riskUtil;
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
    private RiskDetailsHistoryService riskDetailsHistoryService;

    @PostMapping(value={"/riskPlan"})
    public ResponseEntity<RiskResponseDTO> saveRiskPlanDetails(@RequestBody RiskPlanDTO riskPlanDTO, HttpServletRequest request) throws RequestException {
        Set<DeptDetails> deptSet;
        this.applyDefaultValues(riskPlanDTO.getRiskPlanValue());
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
        if (riskPlanDTO.getCreatedBy() != 0L) {
            riskPlanDTO.getRiskPlanValue().put("createdByName", logemp.getFirstName());
        }
        if (riskPlanDTO.getUpdatedBy() != 0L) {
            riskPlanDTO.getRiskPlanValue().put("updatedByName", logemp.getFirstName());
        }
        if (riskPlanDTO.getOwner() != 0L) {
            navemployeeDTO.setEmployeeId(riskPlanDTO.getOwner());
            riskPlanDTO.getRiskPlanValue().put("ownerName", this.employeeService.getEmployee(navemployeeDTO).getFirstName());
        }
        riskPlanDTO.getRiskPlanValue().put("multipleOwners", StringUtils.stripToEmpty((String)riskPlanDTO.getMultipleOwners()));
        this.riskUtil.formatDates(riskPlanDTO.getRiskPlanValue());
        RiskPlan riskPlan = new RiskPlan(riskPlanDTO);
        riskPlan.setCreatedTime(LocalDateTime.now());
        riskPlan.setVersion(Long.valueOf(1L));
        RiskDetails riskDetails = (RiskDetails)this.riskDetailsService.findById(riskPlanDTO.getRiskId()).orElseThrow(() -> new IllegalStateException("Risk details not found"));
        List<ControlPanelWorkFlowDTO> workflows = this.controlPanelWorkFlowService.findWorkflowsByTypeAndDept("Risk", departmentId);
        if (!workflows.isEmpty()) {
            StagingChange stagingChange;
            riskPlan.setStatus("DRAFT");
            List<StagingChange> openChanges = this.stagingChangesRepository.findByRecordIdAndTableNameAndStatusNot(riskDetails.getId(), "risk_details", "APPROVED");
            if (!openChanges.isEmpty()) {
                stagingChange = (StagingChange)openChanges.get(0);
                stagingChange.setStatus("IN PROGRESS");
                if (riskDetails.getRiskPlanList() == null) {
                    riskDetails.setRiskPlanList(new ArrayList<>());
                }
                riskDetails.getRiskPlanList().add(riskPlan);
            } else {
                stagingChange = new StagingChange();
                stagingChange.setTableName("risk_details");
                stagingChange.setRecordId(Long.valueOf(riskDetails.getId()));
                stagingChange.setStatus("IN PROGRESS");
                stagingChange.setConditionType("Manual");
                stagingChange.setSubmittedBy(Long.valueOf(logemployeeDTO.getEmployeeId()));
                stagingChange.setCreatedAt(LocalDateTime.now());
                stagingChange.setUpdatedAt(LocalDateTime.now());
                stagingChange.setVersion(riskDetails.getVersion() + 1L);
                stagingChange.setWorkflowId(Long.valueOf(((ControlPanelWorkFlowDTO)workflows.get(0)).getId()));
                stagingChange.setType("Risk");
                riskDetails.setVersion(Long.valueOf(riskDetails.getVersion() + 1L));
                RiskDetailsHistory historyRiskDetails = new RiskDetailsHistory(riskDetails);
                historyRiskDetails.setVersion(riskDetails.getVersion());
                historyRiskDetails.setChangeId(riskDetails.getChangeId());
                historyRiskDetails.setStatus("DRAFT");
                this.riskDetailsHistoryService.save(historyRiskDetails);
            }
            String newValuesJson = this.serializeObjectToJson((Object)new RiskDTO(riskDetails, true));
            stagingChange.setNewValue(newValuesJson);
            this.stagingChangesRepository.save(stagingChange);
            riskDetails.setChangeId(stagingChange.getChangeId());
            riskPlan.setVersion(Long.valueOf(stagingChange.getVersion()));
            riskPlan.setChangeId(stagingChange.getChangeId());
            this.riskPlanService.save(riskPlan);
            RiskPlanHistory riskPlanHistory = new RiskPlanHistory(riskPlan);
            riskPlanHistory.setCreatedTime(LocalDateTime.now());
            riskPlanHistory.setStatus("DRAFT");
            riskPlanHistory.setChangeId(stagingChange.getChangeId());
            riskPlanHistory.setVersion(Long.valueOf(stagingChange.getVersion()));
            this.riskPlanService.save(riskPlanHistory);
            this.riskDetailsService.save(riskDetails);
            RiskResponseDTO riskResponseDTO = new RiskResponseDTO("Risk Plan saved as draft", new RiskDTO(riskDetails, true));
            riskResponseDTO.getRiskDTO().setChangeId(stagingChange.getChangeId().longValue());
            this.auditService.saveAudit("RiskPlan", riskPlan.getId(), logemployeeDTO.getEmployeeId(), "Risk Plan Draft Created");
            return new ResponseEntity((Object)riskResponseDTO, HttpStatus.CREATED);
        }
        riskPlan.setStatus("APPROVED");
        riskPlan.setChangeId(Long.valueOf(0L));
        riskPlan.setVersion(Long.valueOf(riskDetails.getVersion() + 1L));
        if (riskDetails.getRiskPlanList() == null) {
            riskDetails.setRiskPlanList(new ArrayList<>());
        }
        riskDetails.getRiskPlanList().add(riskPlan);
        RiskPlanHistory riskPlanHistory = new RiskPlanHistory(riskPlan);
        riskPlanHistory.setCreatedTime(LocalDateTime.now());
        riskPlanHistory.setStatus("APPROVED");
        riskPlanHistory.setVersion(Long.valueOf(riskDetails.getVersion() + 1L));
        this.riskPlanService.save(riskPlanHistory);
        this.riskPlanService.save(riskPlan);
        RiskResponseDTO riskResponseDTO = new RiskResponseDTO("Risk Plan saved successfully", new RiskDTO(riskDetails, true));
        this.auditService.saveAudit("RiskPlan", riskPlan.getId(), logemployeeDTO.getEmployeeId(), "Risk Plan Created");
        return new ResponseEntity((Object)riskResponseDTO, HttpStatus.OK);
    }

    @PutMapping(value={"/riskPlan"})
    public ResponseEntity<RiskResponseDTO> updateRiskPlanDetails(@RequestBody RiskPlanDTO riskPlanDTO, HttpServletRequest request) throws RequestException {
        this.applyDefaultValues(riskPlanDTO.getRiskPlanValue());
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
            Set<DeptDetails> deptSet = this.userRoleManagement.updateDeptList(Long.valueOf(navemp.getEmpId()));
            if (!deptSet.isEmpty()) {
                departmentId = ((DeptDetails)deptSet.iterator().next()).getId();
            }
        }
        if (riskPlanDTO.getCreatedBy() != 0L) {
            logemployeeDTO.setEmployeeId(riskPlanDTO.getCreatedBy());
            riskPlanDTO.getRiskPlanValue().put("createdByName", this.employeeService.getEmployee(logemployeeDTO).getFirstName());
        }
        if (riskPlanDTO.getUpdatedBy() != 0L) {
            riskPlanDTO.getRiskPlanValue().put("updatedByName", logemp.getFirstName());
        }
        if (riskPlanDTO.getOwner() != 0L) {
            navemployeeDTO.setEmployeeId(riskPlanDTO.getOwner());
            riskPlanDTO.getRiskPlanValue().put("ownerName", this.employeeService.getEmployee(navemployeeDTO).getFirstName());
        }
        riskPlanDTO.getRiskPlanValue().put("multipleOwners", StringUtils.stripToEmpty((String)riskPlanDTO.getMultipleOwners()));
        this.riskUtil.formatDates(riskPlanDTO.getRiskPlanValue());
        RiskPlan riskPlan = new RiskPlan(riskPlanDTO);
        riskPlan.setUpdatedTime(LocalDateTime.now());
        RiskDetails riskDetails = (RiskDetails)this.riskDetailsService.findById(riskPlanDTO.getRiskId()).orElseThrow(() -> new IllegalStateException("Risk details not found for the provided RiskPlan."));
        List<ControlPanelWorkFlowDTO> workflows = this.controlPanelWorkFlowService.findWorkflowsByTypeAndDept("Risk", departmentId);
        String oldValuesJson = this.serializeObjectToJson((Object)new RiskDTO(riskDetails, true));
        String newValuesJson = this.serializeObjectToJson((Object)new RiskDTO(riskDetails, true));
        if (!workflows.isEmpty()) {
            StagingChange stagingChange;
            if (riskPlanDTO.getChangeId() != 0L) {
                stagingChange = (StagingChange)this.stagingChangesRepository.findById(riskPlanDTO.getChangeId()).orElseThrow(() -> new IllegalStateException("Change not found"));
                stagingChange.setStatus("IN PROGRESS");
                stagingChange.setNewValue(newValuesJson);
                stagingChange.setOldValue(oldValuesJson);
            } else {
                Optional<StagingChange> latestApproved = this.stagingChangesRepository.findLatestApprovedChange("risk_details", Long.valueOf(riskPlanDTO.getRiskId()));
                stagingChange = new StagingChange();
                stagingChange.setTableName("risk_details");
                stagingChange.setRecordId(Long.valueOf(riskDetails.getId()));
                stagingChange.setParentRecordId(riskPlanDTO.getRiskId());
                stagingChange.setParentId(latestApproved.map(StagingChange::getChangeId).orElse(0L).longValue());
                stagingChange.setNewValue(newValuesJson);
                stagingChange.setOldValue(oldValuesJson);
                stagingChange.setSubmittedBy(Long.valueOf(logemployeeDTO.getEmployeeId()));
                stagingChange.setStatus("IN PROGRESS");
                stagingChange.setConditionType("Manual");
                stagingChange.setWorkflowId(Long.valueOf(((ControlPanelWorkFlowDTO)workflows.get(0)).getId()));
                stagingChange.setType("Risk");
                stagingChange.setCreatedAt(LocalDateTime.now());
                stagingChange.setUpdatedAt(LocalDateTime.now());
                stagingChange.setVersion(latestApproved.map(StagingChange::getVersion).orElse(0L) + 1L);
            }
            this.stagingChangesRepository.save(stagingChange);
            riskPlan.setStatus("DRAFT");
            riskPlan.setVersion(Long.valueOf(stagingChange.getVersion()));
            riskPlan.setChangeId(stagingChange.getChangeId());
            this.riskPlanService.save(riskPlan);
            RiskPlanHistory riskPlanHistory = new RiskPlanHistory(riskPlan);
            riskPlanHistory.setCreatedTime(LocalDateTime.now());
            riskPlanHistory.setStatus("DRAFT");
            riskPlanHistory.setVersion(Long.valueOf(stagingChange.getVersion()));
            riskPlanHistory.setChangeId(stagingChange.getChangeId());
            this.riskPlanService.save(riskPlanHistory);
            riskDetails.setChangeId(stagingChange.getChangeId());
            riskDetails.setVersion(Long.valueOf(stagingChange.getVersion()));
            this.riskDetailsService.save(riskDetails);
            RiskResponseDTO responseDTO = new RiskResponseDTO("Risk Plan updated successfully", new RiskDTO(riskDetails, true));
            responseDTO.getRiskDTO().setChangeId(stagingChange.getChangeId().longValue());
            this.auditService.updateAudit("RiskPlan", riskDetails.getId(), logemp.getEmpId(), "Risk Plan Updated");
            return new ResponseEntity((Object)responseDTO, HttpStatus.OK);
        }
        riskPlan.setStatus("APPROVED");
        riskPlan.setVersion(Long.valueOf(riskDetails.getVersion() + 1L));
        this.riskPlanService.save(riskPlan);
        RiskPlanHistory riskPlanHistory = new RiskPlanHistory(riskPlan);
        riskPlanHistory.setVersion(Long.valueOf(riskDetails.getVersion() + 1L));
        riskPlanHistory.setCreatedTime(LocalDateTime.now());
        riskPlanHistory.setStatus("APPROVED");
        this.riskPlanService.save(riskPlanHistory);
        this.auditService.updateAudit("RiskPlan", riskDetails.getId(), logemp.getEmpId(), "Risk Plan Updated Directly");
        RiskResponseDTO responseDTO = new RiskResponseDTO("Risk Plan updated successfully", new RiskDTO(riskDetails, true));
        return new ResponseEntity((Object)responseDTO, HttpStatus.OK);
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

    @GetMapping(value={"/riskPlan/{id}"})
    public ResponseEntity<RiskPlanDTO> getRiskPlanDetailsById(@PathVariable(value="id") Long id) throws RequestException {
        RiskPlanDTO riskPlanDTO = null;
        riskPlanDTO = this.riskPlanService.findById(id.longValue()).isPresent() ? new RiskPlanDTO((RiskPlan)this.riskPlanService.findById(id.longValue()).get(), true) : new RiskPlanDTO();
        return new ResponseEntity((Object)riskPlanDTO, HttpStatus.OK);
    }

    @DeleteMapping(value={"/riskPlan/{id}"})
    public ResponseEntity<RiskResponseDTO> deleteRiskPlanDetailsById(@PathVariable(value="id") Long id, HttpServletRequest request) throws RequestException {
        this.riskPlanService.deleteHistor(id);
        RiskResponseDTO riskResponseDTO = this.riskPlanService.delete(id.longValue());
        this.auditService.updateAudit("Risk", id.longValue(), Long.valueOf(UserThreadLocal.get((String)"LOGGED_IN_EMPLOYEE_ID")).longValue(), "Plan Deleted");
        return new ResponseEntity((Object)riskResponseDTO, HttpStatus.OK);
    }

    @GetMapping(value={"/riskPlanList/{riskId}"})
    public ResponseEntity<List<RiskPlanDTO>> findAllByRiskId(@PathVariable(value="riskId") Long riskId) throws RequestException {
        List<RiskPlanDTO> riskPlanDTOS = this.riskPlanService.findAllByRiskDetailsId(riskId);
        return new ResponseEntity((Object)riskPlanDTOS, HttpStatus.OK);
    }

    @GetMapping(value={"/riskTreatmentList/{riskId}"})
    public ResponseEntity<List<RiskPlanDTO>> findAllTreatmentByRiskId(@PathVariable(value="riskId") Long riskId) throws RequestException {
        List<RiskPlanDTO> riskPlanDTOS = this.riskPlanService.findAllByRiskDetailsIdTreatment(riskId);
        return new ResponseEntity((Object)riskPlanDTOS, HttpStatus.OK);
    }

    @GetMapping(value={"/retrieveRiskTreatmentList/{empId}"})
    public ResponseEntity<List<RiskPlanDTO>> findAllByEmpIdTreatment(@PathVariable(value="empId") Long empId) throws RequestException {
        List<RiskPlanDTO> riskPlanDTOS = this.riskPlanService.findAllTreatment(empId.longValue());
        return new ResponseEntity((Object)riskPlanDTOS, HttpStatus.OK);
    }

    @GetMapping(value={"/retrieveRiskPlanList/{empId}"})
    public ResponseEntity<List<RiskPlanDTO>> findAllByEmpId(@PathVariable(value="empId") Long empId) throws RequestException {
        List<RiskPlanDTO> riskPlanDTOS = this.riskPlanService.findAll(empId.longValue());
        return new ResponseEntity((Object)riskPlanDTOS, HttpStatus.OK);
    }

    private void applyDefaultValues(Map<String, Object> riskPlanValue) {
        if (Objects.isNull(riskPlanValue.get("progressval")) || StringUtils.isEmpty((CharSequence)riskPlanValue.get("progressval").toString())) {
            riskPlanValue.put("progressval", "0");
        }
    }
}

