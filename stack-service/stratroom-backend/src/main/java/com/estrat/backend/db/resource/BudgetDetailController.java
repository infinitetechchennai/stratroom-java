/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.Employee
 *  com.estrat.backend.db.bean.po.ActivitiesDetails
 *  com.estrat.backend.db.bean.po.BudgetDetail
 *  com.estrat.backend.db.bean.po.DepartmentChartMapping
 *  com.estrat.backend.db.bean.po.StagingChange
 *  com.estrat.backend.db.bean.po.SubActivitiesDetails
 *  com.estrat.backend.db.bean.po.WorkflowStagingResponse
 *  com.estrat.backend.db.dao.ApproversHistoryRepository
 *  com.estrat.backend.db.dao.StagingChangeRepository
 *  com.estrat.backend.db.dto.ActivitiesDTO
 *  com.estrat.backend.db.dto.BudgetDTO
 *  com.estrat.backend.db.dto.ControlPanelWorkFlowDTO
 *  com.estrat.backend.db.dto.DeptDetails
 *  com.estrat.backend.db.dto.EmployeeDTO
 *  com.estrat.backend.db.dto.StagingChangeDTO
 *  com.estrat.backend.db.dto.SubActivitiesDTO
 *  com.estrat.backend.db.exception.RequestException
 *  com.estrat.backend.db.repository.DepartmentChartMappingRepository
 *  com.estrat.backend.db.resource.BudgetDetailController
 *  com.estrat.backend.db.resource.util.UserThreadLocal
 *  com.estrat.backend.db.service.ActivitiesService
 *  com.estrat.backend.db.service.AuditDetailsService
 *  com.estrat.backend.db.service.BudgetDetailService
 *  com.estrat.backend.db.service.ControlPanelWorkFlowService
 *  com.estrat.backend.db.service.EmployeeService
 *  com.estrat.backend.db.service.StagingChangeService
 *  com.estrat.backend.db.service.SubActivitiesService
 *  com.estrat.backend.db.service.UserRoleManagementService
 *  com.estrat.backend.db.service.WorkflowStagingService
 *  com.fasterxml.jackson.core.JsonProcessingException
 *  com.fasterxml.jackson.databind.ObjectMapper
 *  javax.servlet.http.HttpServletRequest
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
import com.estrat.backend.db.bean.po.ActivitiesDetails;
import com.estrat.backend.db.bean.po.BudgetDetail;
import com.estrat.backend.db.bean.po.DepartmentChartMapping;
import com.estrat.backend.db.bean.po.StagingChange;
import com.estrat.backend.db.bean.po.SubActivitiesDetails;
import com.estrat.backend.db.bean.po.WorkflowStagingResponse;
import com.estrat.backend.db.dao.ApproversHistoryRepository;
import com.estrat.backend.db.dao.StagingChangeRepository;
import com.estrat.backend.db.dto.ActivitiesDTO;
import com.estrat.backend.db.dto.BudgetDTO;
import com.estrat.backend.db.dto.ControlPanelWorkFlowDTO;
import com.estrat.backend.db.dto.DeptDetails;
import com.estrat.backend.db.dto.EmployeeDTO;
import com.estrat.backend.db.dto.StagingChangeDTO;
import com.estrat.backend.db.dto.SubActivitiesDTO;
import com.estrat.backend.db.exception.RequestException;
import com.estrat.backend.db.repository.DepartmentChartMappingRepository;
import com.estrat.backend.db.resource.util.UserThreadLocal;
import com.estrat.backend.db.service.ActivitiesService;
import com.estrat.backend.db.service.AuditDetailsService;
import com.estrat.backend.db.service.BudgetDetailService;
import com.estrat.backend.db.service.ControlPanelWorkFlowService;
import com.estrat.backend.db.service.EmployeeService;
import com.estrat.backend.db.service.StagingChangeService;
import com.estrat.backend.db.service.SubActivitiesService;
import com.estrat.backend.db.service.UserRoleManagementService;
import com.estrat.backend.db.service.WorkflowStagingService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import jakarta.servlet.http.HttpServletRequest;
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
public class BudgetDetailController {
    @Autowired
    BudgetDetailService budegtDetailService;
    @Autowired
    protected EmployeeService employeeService;
    @Autowired
    private AuditDetailsService auditService;
    @Autowired
    UserRoleManagementService userRoleManagement;
    @Autowired
    private BudgetDetailService budgetDetailService;
    @Autowired
    WorkflowStagingService workflowStagingService;
    @Autowired
    private ControlPanelWorkFlowService controlPanelWorkFlowService;
    @Autowired
    ApproversHistoryRepository approversHistoryRepo;
    @Autowired
    StagingChangeService stagingChangeService;
    @Autowired
    StagingChangeRepository stagingChangesRepository;
    @Autowired
    protected DepartmentChartMappingRepository deptMappingDetailRepository;
    @Autowired
    private SubActivitiesService subActivitiesService;
    @Autowired
    protected ActivitiesService activitiesAndTasksService;

    @PostMapping(value={"/budgets"})
    public ResponseEntity<BudgetDTO> saveBudgetDetails(@RequestBody BudgetDTO budgetDTO, HttpServletRequest request) throws RequestException {
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
        if (Objects.nonNull(budgetDTO.getDeptId()) && budgetDTO.getDeptId() != 0L) {
            DepartmentChartMapping deptData = this.deptMappingDetailRepository.getOne(Long.valueOf(budgetDTO.getDeptId()));
            budgetDTO.getBudgetValues().put("depatmentName", deptData.getDeptName());
        }
        if (budgetDTO.getCreateBy() != 0L) {
            budgetDTO.getBudgetValues().put("createdByName", logemp.getFirstName());
        }
        if (budgetDTO.getUpdateBy() != 0L) {
            budgetDTO.getBudgetValues().put("updatedByName", logemp.getFirstName());
        }
        if (budgetDTO.getOwner() != 0L) {
            navemployeeDTO.setEmployeeId(budgetDTO.getOwner());
            budgetDTO.getBudgetValues().put("ownerName", this.employeeService.getEmployee(navemployeeDTO).getFirstName());
        }
        this.populateAmoutSet(budgetDTO);
        BudgetDetail budget = new BudgetDetail(budgetDTO);
        budget.setCreateTime(LocalDateTime.now());
        budget.setVersion(Long.valueOf(1L));
        BudgetDTO tempbudget = this.budegtDetailService.save(budget);
        WorkflowStagingResponse workflowResponse = this.workflowStagingService.handleWorkflowAndStagingChangeForBudget("budget_details", tempbudget.getId(), departmentId, "Budget", (Object)tempbudget, budget.getVersion(), Long.valueOf(logemployeeDTO.getEmployeeId()));
        if (workflowResponse.isWorkflowExists()) {
            StagingChange stagingChange = workflowResponse.getStagingChange();
            budget.setChangeId(stagingChange.getChangeId());
        } else {
            budget.setChangeId(Long.valueOf(0L));
        }
        budget.setVersion(workflowResponse.getVersionToUse());
        budget.setStatus(workflowResponse.getStatus());
        BudgetDTO budgetResponseDTO = this.budegtDetailService.save(budget);
        if (workflowResponse.isWorkflowExists()) {
            this.auditService.saveAudit("Budget", budgetResponseDTO.getId().longValue(), budgetResponseDTO.getCreateBy(), "Draft Budget Created");
        } else {
            this.auditService.saveAudit("Budget", budgetResponseDTO.getId().longValue(), budgetResponseDTO.getCreateBy(), " Budget Created");
        }
        return new ResponseEntity((Object)budgetResponseDTO, HttpStatus.OK);
    }

    @PutMapping(value={"/budgets"})
    public ResponseEntity<BudgetDTO> updateBudgetDetails(@RequestBody BudgetDTO budgetDTO, HttpServletRequest request) throws RequestException {
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
        if (budgetDTO.getCreateBy() != 0L) {
            budgetDTO.getBudgetValues().put("createdByName", logemp.getFirstName());
        }
        if (budgetDTO.getUpdateBy() != 0L) {
            budgetDTO.getBudgetValues().put("updatedByName", logemp.getFirstName());
        }
        if (budgetDTO.getOwner() != 0L) {
            navemployeeDTO.setEmployeeId(budgetDTO.getOwner());
            budgetDTO.getBudgetValues().put("ownerName", this.employeeService.getEmployee(navemployeeDTO).getFirstName());
        }
        this.populateAmoutSet(budgetDTO);
        BudgetDetail budget = new BudgetDetail(budgetDTO);
        budget.setUpdateTime(LocalDateTime.now());
        budget.setVersion(Long.valueOf(1L));
        System.out.println("budget detail ::" + budget);
        BudgetDTO tempbudget = this.budegtDetailService.save(budget);
        System.out.println("departmentId in PUT :: " + departmentId);
        List workflows = this.controlPanelWorkFlowService.findWorkflowsByTypeAndDept("Budget", departmentId);
        if (!workflows.isEmpty()) {
            StagingChange stagingChange = null;
            System.out.println("stagingChange ::: " + stagingChange);
            if (budgetDTO.getChangeId() != 0L) {
                System.out.println("Enter in chang id is present ");
                stagingChange = (StagingChange)this.stagingChangesRepository.findById(budgetDTO.getChangeId()).orElseThrow(() -> new IllegalStateException("Change not found"));
            } else {
                System.out.println("Enter in chang id is not present -: ");
                stagingChange = new StagingChange();
                stagingChange.setTableName("budget_details");
                stagingChange.setWorkflowId(Long.valueOf(((ControlPanelWorkFlowDTO)workflows.get(0)).getId()));
                stagingChange.setType("Budget");
                stagingChange.setConditionType("Manual");
                stagingChange.setSubmittedBy(Long.valueOf(logemployeeDTO.getEmployeeId()));
                stagingChange.setStatus("DRAFT");
                stagingChange.setCreatedAt(LocalDateTime.now());
                stagingChange.setUpdatedAt(LocalDateTime.now());
            }
            System.out.println("stagingChange After ::: " + stagingChange);
            StagingChangeDTO stagingdto = this.stagingChangeService.convertToDTO(stagingChange, String.valueOf(logemployeeDTO.getEmployeeId()));
            Map<String, Object> maps = stagingdto.getNewValue();
            System.out.println("Before map :: " + maps);
            if (maps == null) {
                maps = new HashMap<String, Object>();
            }
            maps.put(String.valueOf(tempbudget.getId()), budgetDTO);
            System.out.println("After map :: " + maps);
            stagingChange.setNewValue(this.serializeObjectToJson(maps));
            stagingChange = (StagingChange)this.stagingChangesRepository.save(stagingChange);
            System.out.println("stagingChange after save :: " + stagingChange);
            budget.setChangeId(stagingChange.getChangeId());
            budget.setVersion(Long.valueOf(stagingChange.getVersion()));
            budget.setStatus("DRAFT");
            BudgetDTO budgetResponseDTO = this.budegtDetailService.save(budget);
            this.auditService.saveAudit("Budget", budgetResponseDTO.getId().longValue(), budgetResponseDTO.getCreateBy(), " Budget Updated");
            return new ResponseEntity((Object)budgetResponseDTO, HttpStatus.OK);
        }
        budgetDTO.setStatus("APPROVED");
        budgetDTO.setVersion(Long.valueOf(1L));
        budgetDTO.setUpdateTime(LocalDateTime.now());
        BudgetDTO budgetResponseDTO = this.budegtDetailService.save(budget);
        this.auditService.updateAudit("Budget", budgetResponseDTO.getId().longValue(), budgetResponseDTO.getUpdateBy(), "Budget Modified");
        return new ResponseEntity((Object)budgetResponseDTO, HttpStatus.OK);
    }

    private String serializeObjectToJson(Object object) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            return mapper.writeValueAsString(object);
        }
        catch (JsonProcessingException e) {
            throw new RuntimeException("Error serializing object to JSON", e);
        }
    }

    @GetMapping(value={"/budgets/{id}"})
    public ResponseEntity<BudgetDTO> findById(@PathVariable(value="id") long id) {
        BudgetDTO valueDto = new BudgetDTO((BudgetDetail)this.budegtDetailService.findById(id).get());
        this.budgetDetailService.populateImpactDesc(valueDto);
        return new ResponseEntity((Object)valueDto, HttpStatus.OK);
    }

    @DeleteMapping(value={"/budgets/{id}"})
    public ResponseEntity<?> deleteBudgetById(@PathVariable(value="id") Long id, HttpServletRequest request) throws RequestException {
        Optional activitiesAndTasks = this.budegtDetailService.findById(id.longValue());
        if (activitiesAndTasks.isPresent()) {
            BudgetDetail sDetails = (BudgetDetail)activitiesAndTasks.get();
            sDetails.setActive(1);
            this.budegtDetailService.saveDelete((BudgetDetail)activitiesAndTasks.get());
            this.auditService.updateAudit("Budget", id.longValue(), Long.valueOf(UserThreadLocal.get((String)"LOGGED_IN_EMPLOYEE_ID")).longValue(), "Budget Deleted");
            return new ResponseEntity(HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    @GetMapping(value={"/budgets/{empId}"})
    public ResponseEntity<?> findAllValue(@PathVariable(value="empId") Long empId) {
        return ResponseEntity.ok((Object)this.budegtDetailService.findAllByEmpId(empId));
    }

    @GetMapping(value={"/budgetsList/{pageId}"})
    public ResponseEntity<?> findAllByPageId(@PathVariable(value="pageId") Long pageId, @RequestParam(value="status", required=false) String status, HttpServletRequest request) throws RequestException {
        List pageIdList = this.budegtDetailService.findAllByPageId(pageId.longValue(), status);
        return ResponseEntity.status((HttpStatus)HttpStatus.OK).body((Object)pageIdList);
    }

    @GetMapping(value={"/budgetsListview"})
    public ResponseEntity<?> findAllBychangId(@RequestParam(value="changeId", required=false) Long changeId, HttpServletRequest request) throws RequestException {
        List pageIdList = this.budegtDetailService.findAllBychangId(changeId.longValue());
        return ResponseEntity.status((HttpStatus)HttpStatus.OK).body((Object)pageIdList);
    }

    public void populateAmoutSet(BudgetDTO budgetDTO) {
        String budgetAmut;
        if (budgetDTO.getBudgetValues().containsKey("amount") && (budgetAmut = budgetDTO.getBudgetValues().get("amount").toString()) != null && !budgetAmut.isEmpty()) {
            ActivitiesDTO activeDto;
            if (budgetDTO.getSubActivityId() != 0L) {
                this.subActivitiesService.findById(budgetDTO.getSubActivityId()).ifPresent(subActivity -> {
                    SubActivitiesDTO subDTO = new SubActivitiesDTO(subActivity);
                    subDTO.getActivitiesValue().put("budget", budgetAmut);
                    this.subActivitiesService.save(new SubActivitiesDetails(subDTO));
                });
            } else if (budgetDTO.getActivityId() != 0L && (activeDto = this.activitiesAndTasksService.findByActivitiesId(budgetDTO.getActivityId())) != null) {
                activeDto.getActivitiesValue().put("budget", budgetAmut);
                ActivitiesDetails activeDetail = new ActivitiesDetails(activeDto);
                this.activitiesAndTasksService.save(activeDetail, null);
            }
        }
    }
}

