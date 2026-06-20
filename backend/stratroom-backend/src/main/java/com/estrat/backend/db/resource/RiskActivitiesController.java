/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.Employee
 *  com.estrat.backend.db.bean.po.RiskActivities
 *  com.estrat.backend.db.bean.po.RiskActivitiesHistory
 *  com.estrat.backend.db.bean.po.RiskDetails
 *  com.estrat.backend.db.bean.po.RiskPlan
 *  com.estrat.backend.db.bean.po.StagingChange
 *  com.estrat.backend.db.dao.ApproversHistoryRepository
 *  com.estrat.backend.db.dao.StagingChangeRepository
 *  com.estrat.backend.db.dto.ControlPanelWorkFlowDTO
 *  com.estrat.backend.db.dto.DeptDetails
 *  com.estrat.backend.db.dto.EmployeeDTO
 *  com.estrat.backend.db.dto.RiskActivitiesDTO
 *  com.estrat.backend.db.dto.RiskDTO
 *  com.estrat.backend.db.dto.RiskResponseDTO
 *  com.estrat.backend.db.exception.RequestException
 *  com.estrat.backend.db.resource.RiskActivitiesController
 *  com.estrat.backend.db.resource.util.RiskUtil
 *  com.estrat.backend.db.resource.util.UserThreadLocal
 *  com.estrat.backend.db.service.AuditDetailsService
 *  com.estrat.backend.db.service.ControlPanelWorkFlowService
 *  com.estrat.backend.db.service.EmployeeService
 *  com.estrat.backend.db.service.RiskActivitiesService
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
import com.estrat.backend.db.bean.po.RiskActivities;
import com.estrat.backend.db.bean.po.RiskActivitiesHistory;
import com.estrat.backend.db.bean.po.RiskDetails;
import com.estrat.backend.db.bean.po.RiskPlan;
import com.estrat.backend.db.bean.po.StagingChange;
import com.estrat.backend.db.dao.ApproversHistoryRepository;
import com.estrat.backend.db.dao.StagingChangeRepository;
import com.estrat.backend.db.dto.ControlPanelWorkFlowDTO;
import com.estrat.backend.db.dto.DeptDetails;
import com.estrat.backend.db.dto.EmployeeDTO;
import com.estrat.backend.db.dto.RiskActivitiesDTO;
import com.estrat.backend.db.dto.RiskDTO;
import com.estrat.backend.db.dto.RiskResponseDTO;
import com.estrat.backend.db.exception.RequestException;
import com.estrat.backend.db.resource.util.RiskUtil;
import com.estrat.backend.db.resource.util.UserThreadLocal;
import com.estrat.backend.db.service.AuditDetailsService;
import com.estrat.backend.db.service.ControlPanelWorkFlowService;
import com.estrat.backend.db.service.EmployeeService;
import com.estrat.backend.db.service.RiskActivitiesService;
import com.estrat.backend.db.service.RiskDetailsService;
import com.estrat.backend.db.service.RiskPlanService;
import com.estrat.backend.db.service.StagingChangeService;
import com.estrat.backend.db.service.UserRoleManagementService;
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
public class RiskActivitiesController {
    @Autowired
    protected RiskActivitiesService riskActivitiesService;
    @Autowired
    protected RiskPlanService riskPlanService;
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private RiskUtil riskUtil;
    @Autowired
    private AuditDetailsService auditService;
    @Autowired
    private ControlPanelWorkFlowService controlPanelWorkFlowService;
    @Autowired
    ApproversHistoryRepository approversHistoryRepo;
    @Autowired
    StagingChangeService stagingChangeService;
    @Autowired
    protected RiskDetailsService riskDetailsService;
    @Autowired
    StagingChangeRepository stagingChangesRepository;
    @Autowired
    UserRoleManagementService userRoleManagement;

    @PostMapping(value={"/riskActivities"})
    public ResponseEntity<RiskResponseDTO> saveRiskActivitiesDetails(@RequestBody RiskActivitiesDTO riskActivitiesDTO, HttpServletRequest request) throws RequestException {
        Set<DeptDetails> deptSet;
        this.applyDefaultValues(riskActivitiesDTO.getRiskActivitiesValue());
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
        if (riskActivitiesDTO.getCreatedBy() != 0L) {
            riskActivitiesDTO.getRiskActivitiesValue().put("createdByName", logemp.getFirstName());
        }
        if (riskActivitiesDTO.getUpdatedBy() != 0L) {
            riskActivitiesDTO.getRiskActivitiesValue().put("updatedByName", logemp.getFirstName());
        }
        if (riskActivitiesDTO.getOwner() != 0L) {
            navemployeeDTO.setEmployeeId(riskActivitiesDTO.getOwner());
            riskActivitiesDTO.getRiskActivitiesValue().put("ownerName", this.employeeService.getEmployee(navemployeeDTO).getFirstName());
        }
        riskActivitiesDTO.getRiskActivitiesValue().put("multipleOwners", StringUtils.stripToEmpty((String)riskActivitiesDTO.getMultipleOwners()));
        this.riskUtil.formatDates(riskActivitiesDTO.getRiskActivitiesValue());
        RiskActivities riskActivities = new RiskActivities(riskActivitiesDTO);
        riskActivities.setCreatedTime(LocalDateTime.now());
        riskActivities.setVersion(1L);
        RiskPlan riskPlan = (RiskPlan)this.riskPlanService.findById(riskActivities.getRiskPlanId().getId()).orElseThrow(() -> new IllegalStateException("RiskPlan not found for the provided RiskActivities."));
        RiskDetails riskDetails = (RiskDetails)this.riskDetailsService.findById(riskPlan.getRiskId().getId()).orElseThrow(() -> new IllegalStateException("Risk details not found for the associated RiskPlan."));
        List<ControlPanelWorkFlowDTO> workflows = this.controlPanelWorkFlowService.findWorkflowsByTypeAndDept("Risk", departmentId);
        String oldValuesJson = this.serializeObjectToJson((Object)new RiskDTO(riskDetails, true));
        String newValuesJson = this.serializeObjectToJson((Object)new RiskDTO(riskDetails, true));
        if (!workflows.isEmpty()) {
            StagingChange stagingChange;
            riskActivities.setStatus("DRAFT");
            if (riskActivitiesDTO.getChangeId() != 0L) {
                stagingChange = (StagingChange)this.stagingChangesRepository.findById(riskActivitiesDTO.getChangeId()).orElseThrow(() -> new IllegalStateException("Change not found"));
                stagingChange.setStatus("IN PROGRESS");
                stagingChange.setNewValue(newValuesJson);
                stagingChange.setOldValue(oldValuesJson);
            } else {
                Optional<StagingChange> latestApproved = this.stagingChangesRepository.findLatestApprovedChange("risk_details", Long.valueOf(riskPlan.getRiskId().getId()));
                stagingChange = new StagingChange();
                stagingChange.setTableName("risk_details");
                stagingChange.setRecordId(Long.valueOf(riskDetails.getId()));
                stagingChange.setParentRecordId(riskPlan.getId());
                stagingChange.setParentId(latestApproved.map(StagingChange::getChangeId).orElse(0L).longValue());
                stagingChange.setNewValue(newValuesJson);
                stagingChange.setOldValue(oldValuesJson);
                stagingChange.setWorkflowId(Long.valueOf(((ControlPanelWorkFlowDTO)workflows.get(0)).getId()));
                stagingChange.setType("Risk");
                stagingChange.setConditionType("Manual");
                stagingChange.setSubmittedBy(Long.valueOf(logemployeeDTO.getEmployeeId()));
                stagingChange.setStatus("IN PROGRESS");
                stagingChange.setCreatedAt(LocalDateTime.now());
                stagingChange.setUpdatedAt(LocalDateTime.now());
                stagingChange.setVersion(latestApproved.map(StagingChange::getVersion).orElse(0L) + 1L);
            }
            this.stagingChangesRepository.save(stagingChange);
            riskActivities.setChangeId(stagingChange.getChangeId().longValue());
            riskActivities.setVersion(stagingChange.getVersion());
            this.riskActivitiesService.save(riskActivities);
            riskDetails.setChangeId(stagingChange.getChangeId());
            riskDetails.setVersion(Long.valueOf(stagingChange.getVersion()));
            this.riskDetailsService.save(riskDetails);
            RiskActivitiesHistory riskActivitiesHistory = new RiskActivitiesHistory(riskActivities);
            riskActivitiesHistory.setVersion(stagingChange.getVersion());
            riskActivitiesHistory.setChangeId(stagingChange.getChangeId().longValue());
            riskActivitiesHistory.setStatus("DRAFT");
            riskActivitiesHistory.setCreatedTime(LocalDateTime.now());
            this.riskActivitiesService.save(riskActivitiesHistory);
            RiskResponseDTO responseDTO = new RiskResponseDTO("Risk Activities saved successfully", new RiskDTO(riskDetails, true));
            responseDTO.getRiskDTO().setChangeId(stagingChange.getChangeId().longValue());
            this.auditService.saveAudit("Risk", riskDetails.getId(), logemp.getEmpId(), "Risk Activities Created");
            return new ResponseEntity((Object)responseDTO, HttpStatus.CREATED);
        }
        this.riskActivitiesService.save(riskActivities);
        RiskActivitiesHistory riskActivitiesHistory = new RiskActivitiesHistory(riskActivities);
        riskActivitiesHistory.setVersion(1L);
        riskActivitiesHistory.setStatus("APPROVED");
        riskActivitiesHistory.setCreatedTime(LocalDateTime.now());
        this.riskActivitiesService.save(riskActivitiesHistory);
        riskActivities.setChangeId(0L);
        riskActivities.setVersion(1L);
        RiskResponseDTO responseDTO = new RiskResponseDTO("Risk Activities saved successfully", new RiskDTO(riskDetails, true));
        this.auditService.saveAudit("Risk", riskDetails.getId(), logemp.getEmpId(), "Risk Activities Saved Directly");
        return new ResponseEntity((Object)responseDTO, HttpStatus.CREATED);
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

    @PutMapping(value={"/riskActivities"})
    public ResponseEntity<RiskResponseDTO> updateRiskActivitiesDetails(@RequestBody RiskActivitiesDTO riskActivitiesDTO, HttpServletRequest request) throws RequestException {
        StagingChange stagingChange;
        this.applyDefaultValues(riskActivitiesDTO.getRiskActivitiesValue());
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
                DeptDetails firstDept = (DeptDetails)deptSet.iterator().next();
                departmentId = firstDept.getId();
            }
        }
        if (riskActivitiesDTO.getCreatedBy() != 0L) {
            logemployeeDTO.setEmployeeId(riskActivitiesDTO.getCreatedBy());
            riskActivitiesDTO.getRiskActivitiesValue().put("createdByName", this.employeeService.getEmployee(logemployeeDTO).getFirstName());
        }
        if (riskActivitiesDTO.getUpdatedBy() != 0L) {
            riskActivitiesDTO.getRiskActivitiesValue().put("updatedByName", logemp.getFirstName());
        }
        if (riskActivitiesDTO.getOwner() != 0L) {
            navemployeeDTO.setEmployeeId(riskActivitiesDTO.getOwner());
            riskActivitiesDTO.getRiskActivitiesValue().put("ownerName", this.employeeService.getEmployee(navemployeeDTO).getFirstName());
        }
        riskActivitiesDTO.getRiskActivitiesValue().put("multipleOwners", StringUtils.stripToEmpty((String)riskActivitiesDTO.getMultipleOwners()));
        this.riskUtil.formatDates(riskActivitiesDTO.getRiskActivitiesValue());
        RiskActivities riskActivities = new RiskActivities(riskActivitiesDTO);
        riskActivities.setUpdatedTime(LocalDateTime.now());
        RiskPlan riskPlan = (RiskPlan)this.riskPlanService.findById(riskActivities.getRiskPlanId().getId()).orElseThrow(() -> new IllegalStateException("RiskPlan not found for the provided RiskActivities."));
        RiskDetails riskDetails = (RiskDetails)this.riskDetailsService.findById(riskPlan.getRiskId().getId()).orElseThrow(() -> new IllegalStateException("Risk details not found for the associated RiskPlan."));
        List<ControlPanelWorkFlowDTO> workflows = this.controlPanelWorkFlowService.findWorkflowsByTypeAndDept("Risk", departmentId);
        if (workflows.isEmpty()) {
            riskActivities.setStatus("APPROVED");
            riskActivities.setChangeId(0L);
            riskActivities.setVersion(1L);
            this.riskActivitiesService.save(riskActivities);
            RiskActivitiesHistory riskActivitiesHistory = new RiskActivitiesHistory(riskActivities);
            riskActivitiesHistory.setVersion(1L);
            riskActivitiesHistory.setChangeId(0L);
            riskActivitiesHistory.setStatus("APPROVED");
            riskActivitiesHistory.setCreatedTime(LocalDateTime.now());
            this.riskActivitiesService.save(riskActivitiesHistory);
            this.auditService.updateAudit("Risk", riskActivities.getRiskPlanId().getId(), riskActivities.getUpdatedBy(), "Risk Activities Updated");
            RiskResponseDTO responseDTO = new RiskResponseDTO("Risk Activities updated successfully", null);
            return new ResponseEntity((Object)responseDTO, HttpStatus.OK);
        }
        String oldValuesJson = this.serializeObjectToJson((Object)new RiskDTO(riskDetails, false));
        String newValuesJson = this.serializeObjectToJson((Object)new RiskDTO(riskDetails, false));
        if (riskActivitiesDTO.getChangeId() != 0L) {
            stagingChange = (StagingChange)this.stagingChangesRepository.findById(riskActivitiesDTO.getChangeId()).orElseThrow(() -> new IllegalStateException("Change not found"));
            stagingChange.setStatus("IN PROGRESS");
            stagingChange.setNewValue(newValuesJson);
            stagingChange.setOldValue(oldValuesJson);
            stagingChange.setVersion(stagingChange.getVersion() + 1L);
        } else {
            Optional<StagingChange> latestApproved = this.stagingChangesRepository.findLatestApprovedChange("risk_details", Long.valueOf(riskPlan.getRiskId().getId()));
            stagingChange = new StagingChange();
            stagingChange.setTableName("risk_details");
            stagingChange.setRecordId(Long.valueOf(riskDetails.getId()));
            stagingChange.setParentRecordId(riskPlan.getId());
            stagingChange.setParentId(latestApproved.map(StagingChange::getChangeId).orElse(0L).longValue());
            stagingChange.setNewValue(newValuesJson);
            stagingChange.setOldValue(oldValuesJson);
            stagingChange.setSubmittedBy(Long.valueOf(logemployeeDTO.getEmployeeId()));
            stagingChange.setStatus("IN PROGRESS");
            stagingChange.setWorkflowId(Long.valueOf(((ControlPanelWorkFlowDTO)workflows.get(0)).getId()));
            stagingChange.setType("Risk");
            stagingChange.setConditionType("Manual");
            stagingChange.setCreatedAt(LocalDateTime.now());
            stagingChange.setUpdatedAt(LocalDateTime.now());
            stagingChange.setVersion(latestApproved.map(StagingChange::getVersion).orElse(0L) + 1L);
        }
        this.stagingChangesRepository.save(stagingChange);
        riskActivities.setStatus("DRAFT");
        riskActivities.setVersion(stagingChange.getVersion());
        riskActivities.setChangeId(stagingChange.getChangeId().longValue());
        this.riskActivitiesService.save(riskActivities);
        RiskActivitiesHistory riskActivitiesHistory = new RiskActivitiesHistory(riskActivities);
        riskActivitiesHistory.setVersion(stagingChange.getVersion());
        riskActivitiesHistory.setChangeId(stagingChange.getChangeId().longValue());
        riskActivitiesHistory.setStatus("DRAFT");
        riskActivitiesHistory.setCreatedTime(LocalDateTime.now());
        this.riskActivitiesService.save(riskActivitiesHistory);
        riskDetails.setChangeId(stagingChange.getChangeId());
        riskDetails.setVersion(Long.valueOf(stagingChange.getVersion()));
        this.riskDetailsService.save(riskDetails);
        RiskResponseDTO responseDTO = new RiskResponseDTO("Risk Activities updated successfully", new RiskDTO(riskDetails, true));
        responseDTO.getRiskDTO().setChangeId(stagingChange.getChangeId().longValue());
        this.auditService.updateAudit("Risk", riskActivities.getRiskPlanId().getId(), riskActivities.getUpdatedBy(), "Risk Activities Updated");
        return new ResponseEntity((Object)responseDTO, HttpStatus.OK);
    }

    @GetMapping(value={"/riskActivities/{id}"})
    public ResponseEntity<RiskActivitiesDTO> getRiskActivitiesDetailsById(@PathVariable(value="id") Long id) throws RequestException {
        RiskActivitiesDTO subInitiativesDTO = new RiskActivitiesDTO((RiskActivities)this.riskActivitiesService.findById(id.longValue()).get(), true);
        return new ResponseEntity((Object)subInitiativesDTO, HttpStatus.OK);
    }

    @DeleteMapping(value={"/riskActivities/{id}"})
    public ResponseEntity<RiskResponseDTO> deleteRiskActivitiesDetailsById(@PathVariable(value="id") Long id, HttpServletRequest request) throws RequestException {
        this.riskActivitiesService.deleteHistor(id);
        RiskResponseDTO riskResponseDTO = this.riskActivitiesService.delete(id.longValue());
        this.auditService.updateAudit("Risk", id.longValue(), Long.valueOf(UserThreadLocal.get((String)"LOGGED_IN_EMPLOYEE_ID")).longValue(), "Risk Action Deleted");
        return new ResponseEntity((Object)riskResponseDTO, HttpStatus.OK);
    }

    @GetMapping(value={"/riskActivitiesList/{riskPlanId}"})
    public ResponseEntity<List<RiskActivitiesDTO>> findAllByRiskId(@PathVariable(value="riskPlanId") Long riskPlanId) throws RequestException {
        List<RiskActivitiesDTO> riskActivitiesDTOS = this.riskActivitiesService.findAllByRiskPlanId(riskPlanId);
        return new ResponseEntity((Object)riskActivitiesDTOS, HttpStatus.OK);
    }

    @GetMapping(value={"/retrieveRiskActivitiesList/{empId}"})
    public ResponseEntity<List<RiskActivitiesDTO>> findAllByEmpId(@PathVariable(value="empId") Long empId) throws RequestException {
        List<RiskActivitiesDTO> riskActivitiesDTOList = this.riskActivitiesService.findAll(empId.longValue());
        return new ResponseEntity((Object)riskActivitiesDTOList, HttpStatus.OK);
    }

    private void applyDefaultValues(Map<String, Object> riskActivitiesValue) {
        if (Objects.isNull(riskActivitiesValue.get("progressval")) || StringUtils.isEmpty((CharSequence)riskActivitiesValue.get("progressval").toString())) {
            riskActivitiesValue.put("progressval", "0");
        }
    }
}

