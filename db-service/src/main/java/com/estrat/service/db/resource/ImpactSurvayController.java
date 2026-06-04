/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.Employee
 *  com.estrat.service.db.bean.po.ImpactData
 *  com.estrat.service.db.bean.po.ImpactSurvay
 *  com.estrat.service.db.bean.po.StagingChange
 *  com.estrat.service.db.dao.ApproversHistoryRepository
 *  com.estrat.service.db.dao.ControlPanelWorkFlowRepository
 *  com.estrat.service.db.dao.ImpactDataRepository
 *  com.estrat.service.db.dao.StagingChangeRepository
 *  com.estrat.service.db.dto.ControlPanelWorkFlowDTO
 *  com.estrat.service.db.dto.DeptDetails
 *  com.estrat.service.db.dto.EmployeeDTO
 *  com.estrat.service.db.dto.ImpactCrticalCountDTO
 *  com.estrat.service.db.dto.ImpactDataDto
 *  com.estrat.service.db.dto.ImpactSurvayDto
 *  com.estrat.service.db.dto.RiskResponseDTO
 *  com.estrat.service.db.exception.RequestException
 *  com.estrat.service.db.resource.ImpactSurvayController
 *  com.estrat.service.db.resource.util.UserThreadLocal
 *  com.estrat.service.db.service.ApproversHistoryService
 *  com.estrat.service.db.service.ControlPanelWorkFlowService
 *  com.estrat.service.db.service.EmployeeService
 *  com.estrat.service.db.service.ImpactSurvayService
 *  com.estrat.service.db.service.StagingChangeService
 *  com.estrat.service.db.service.UserRoleManagementService
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
import com.estrat.service.db.bean.po.ImpactData;
import com.estrat.service.db.bean.po.ImpactSurvay;
import com.estrat.service.db.bean.po.StagingChange;
import com.estrat.service.db.dao.ApproversHistoryRepository;
import com.estrat.service.db.dao.ControlPanelWorkFlowRepository;
import com.estrat.service.db.dao.ImpactDataRepository;
import com.estrat.service.db.dao.StagingChangeRepository;
import com.estrat.service.db.dto.ControlPanelWorkFlowDTO;
import com.estrat.service.db.dto.DeptDetails;
import com.estrat.service.db.dto.EmployeeDTO;
import com.estrat.service.db.dto.ImpactCrticalCountDTO;
import com.estrat.service.db.dto.ImpactDataDto;
import com.estrat.service.db.dto.ImpactSurvayDto;
import com.estrat.service.db.dto.RiskResponseDTO;
import com.estrat.service.db.exception.RequestException;
import com.estrat.service.db.resource.util.UserThreadLocal;
import com.estrat.service.db.service.ApproversHistoryService;
import com.estrat.service.db.service.ControlPanelWorkFlowService;
import com.estrat.service.db.service.EmployeeService;
import com.estrat.service.db.service.ImpactSurvayService;
import com.estrat.service.db.service.StagingChangeService;
import com.estrat.service.db.service.UserRoleManagementService;
import java.text.ParseException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import javax.servlet.http.HttpServletRequest;
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
public class ImpactSurvayController {
    @Autowired
    ImpactSurvayService impactSurvayService;
    @Autowired
    protected EmployeeService employeeService;
    @Autowired
    ImpactDataRepository impactDataRepository;
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

    @PostMapping(value={"/saveImpact"})
    public ResponseEntity<?> saveImpact(@RequestBody ImpactSurvayDto impactSurvayDto) throws RequestException {
        EmployeeDTO employeeDTO = new EmployeeDTO();
        if (impactSurvayDto.getCreateBy() != null && impactSurvayDto.getCreateBy() != 0L) {
            employeeDTO.setEmployeeId(impactSurvayDto.getCreateBy().longValue());
        } else {
            employeeDTO.setEmployeeId(Long.valueOf(UserThreadLocal.get((String)"LOGGED_IN_EMPLOYEE_ID")).longValue());
        }
        Employee emp = this.employeeService.getEmployee(employeeDTO);
        Long departmentId = 0L;
        Long createdBy = emp.getEmpId();
        if (emp.getDeptDetails() != null) {
            departmentId = emp.getDeptDetails().getId();
        } else {
            Set deptSet = this.userRoleManagement.updateDeptList(Long.valueOf(emp.getEmpId()));
            if (!deptSet.isEmpty()) {
                DeptDetails firstDept = (DeptDetails)deptSet.iterator().next();
                departmentId = firstDept.getId();
            }
        }
        impactSurvayDto.setCreaterName(emp.getFirstName());
        impactSurvayDto.setDepartmentId(departmentId.longValue());
        ImpactSurvay impSurvay = new ImpactSurvay(impactSurvayDto);
        impSurvay.setCreateTime(LocalDateTime.now());
        List workflows = this.controlPanelWorkFlowService.findWorkflowsByTypeAndDept("Impact Survey", Long.valueOf(impactSurvayDto.getDepartmentId()));
        if (!workflows.isEmpty()) {
            String newValuesJson = this.stagingChangeService.serializeObjectToJson((Object)impSurvay);
            String oldValuesJson = this.stagingChangeService.serializeObjectToJson((Object)impactSurvayDto);
            if (impactSurvayDto.getChangeId() != 0L) {
                StagingChange change = (StagingChange)this.stagingChangesRepository.findById(impactSurvayDto.getChangeId()).orElseThrow(() -> new IllegalStateException("Change not found"));
                if (!change.getStatus().equals("REJECTED")) {
                    throw new IllegalStateException("No Modifications allowed");
                }
                if (change.getSubmittedBy().longValue() != employeeDTO.getEmployeeId()) {
                    throw new IllegalStateException("No Modifications allowed");
                }
                change.setStatus("IN PROGRESS");
                long version = change.getVersion() + 1L;
                change.setVersion(version);
                change.setNewValue(newValuesJson);
                change.setOldValue(oldValuesJson);
                this.stagingChangeService.storeChangesInStaging(newValuesJson, oldValuesJson, change, (ControlPanelWorkFlowDTO)workflows.get(0));
                return new ResponseEntity((Object)new RiskResponseDTO("impactSurvay rejected from approval", null), HttpStatus.ACCEPTED);
            }
            this.stagingChangeService.storeChangesInStaging(newValuesJson, oldValuesJson, impactSurvayDto.getId(), "impact_survay", impactSurvayDto.getCreateBy(), (ControlPanelWorkFlowDTO)workflows.get(0), Long.valueOf(0L), Long.valueOf(0L));
            return new ResponseEntity((Object)new RiskResponseDTO("impactSurvay submitted for approval", null), HttpStatus.ACCEPTED);
        }
        ImpactSurvayDto iSurvay = this.impactSurvayService.saveImpact(impSurvay);
        for (ImpactDataDto impcatData : impactSurvayDto.getImpactData()) {
            ImpactData impdata = new ImpactData(impcatData);
            impdata.setImpactId(iSurvay.getId());
            this.impactDataRepository.save(impdata);
        }
        return new ResponseEntity((Object)iSurvay, HttpStatus.OK);
    }

    @PutMapping(value={"/updateImpact"})
    public ResponseEntity<?> updateImpact(@RequestBody ImpactSurvayDto impactSurvayDto, HttpServletRequest request) {
        EmployeeDTO employeeDTO = new EmployeeDTO();
        if (impactSurvayDto.getDepartmentId() == 0L && impactSurvayDto.getCreateBy() != null && impactSurvayDto.getCreateBy() != 0L) {
            employeeDTO.setEmployeeId(impactSurvayDto.getCreateBy().longValue());
            Employee emp = this.employeeService.getEmployee(employeeDTO);
            Long departmentId = 0L;
            Long createdBy = emp.getEmpId();
            if (emp.getDeptDetails() != null) {
                departmentId = emp.getDeptDetails().getId();
            } else {
                Set deptSet = this.userRoleManagement.updateDeptList(Long.valueOf(emp.getEmpId()));
                if (!deptSet.isEmpty()) {
                    DeptDetails firstDept = (DeptDetails)deptSet.iterator().next();
                    departmentId = firstDept.getId();
                }
            }
            impactSurvayDto.setDepartmentId(departmentId.longValue());
        }
        if (impactSurvayDto.getCreateBy() != null && impactSurvayDto.getCreateBy() != 0L) {
            employeeDTO.setEmployeeId(impactSurvayDto.getCreateBy().longValue());
            impactSurvayDto.setCreaterName(this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (impactSurvayDto.getUpdateBy() != null && impactSurvayDto.getUpdateBy() != 0L) {
            employeeDTO.setEmployeeId(impactSurvayDto.getUpdateBy().longValue());
            impactSurvayDto.setUpdaterName(this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (Objects.isNull(employeeDTO.getEmployeeId())) {
            String loggedInEmpId = request.getHeader("LOGGED_IN_EMPLOYEE_ID");
            employeeDTO.setEmployeeId(Long.parseLong(loggedInEmpId));
        }
        ImpactSurvay impSurvay = new ImpactSurvay(impactSurvayDto);
        impSurvay.setUpdateTime(LocalDateTime.now());
        List workflows = this.controlPanelWorkFlowService.findWorkflowsByTypeAndDept("Impact Survey", Long.valueOf(impSurvay.getDepartmentId()));
        if (!workflows.isEmpty()) {
            String newValuesJson = this.stagingChangeService.serializeObjectToJson((Object)impSurvay);
            ImpactSurvayDto impactDto = new ImpactSurvayDto((ImpactSurvay)this.impactSurvayService.findImpactById(impSurvay.getId().longValue()).get());
            String oldValuesJson = this.stagingChangeService.serializeObjectToJson((Object)impactDto);
            if (impactSurvayDto.getChangeId() != 0L) {
                StagingChange change = (StagingChange)this.stagingChangesRepository.findById(impactSurvayDto.getChangeId()).orElseThrow(() -> new IllegalStateException("Change not found"));
                if (!"REJECTED".equalsIgnoreCase(change.getStatus())) {
                    throw new IllegalStateException("Change has been rejected");
                }
                change.setStatus("IN PROGRESS");
                long version = change.getVersion() + 1L;
                change.setVersion(version);
                change.setNewValue(newValuesJson);
                change.setOldValue(oldValuesJson);
                this.stagingChangeService.storeChangesInStaging(newValuesJson, oldValuesJson, change, (ControlPanelWorkFlowDTO)workflows.get(0));
                return new ResponseEntity((Object)new RiskResponseDTO("impactSurvay rejected from approval", null), HttpStatus.ACCEPTED);
            }
            this.stagingChangeService.storeChangesInStaging(newValuesJson, oldValuesJson, impSurvay.getId(), "impact_survay", impSurvay.getCreateBy(), (ControlPanelWorkFlowDTO)workflows.get(0), Long.valueOf(0L), Long.valueOf(0L));
            return new ResponseEntity((Object)new RiskResponseDTO("impactSurvay submitted for approval", null), HttpStatus.ACCEPTED);
        }
        ImpactSurvayDto iSurvay = this.impactSurvayService.saveImpact(impSurvay);
        for (ImpactDataDto impcatData : impactSurvayDto.getImpactData()) {
            ImpactData impdata = new ImpactData(impcatData);
            Optional optionalData = this.impactDataRepository.findById(impdata.getId());
            if (optionalData.isPresent()) {
                List impactData = this.impactDataRepository.findAllByImpactId(impactSurvayDto.getId());
                for (ImpactData imp : impactData) {
                    if (imp.getId() == impdata.getId()) {
                        impdata.setImpactId(iSurvay.getId());
                        this.impactDataRepository.save(impdata);
                        continue;
                    }
                    if (imp.getId() == impdata.getId()) continue;
                    this.impactDataRepository.deleteById((Object)imp.getId());
                }
                continue;
            }
            impdata.setImpactId(iSurvay.getId());
            this.impactDataRepository.save(impdata);
        }
        return new ResponseEntity((Object)iSurvay, HttpStatus.OK);
    }

    @GetMapping(value={"/retriveImpact"})
    public ResponseEntity<?> findAllImpact() {
        return ResponseEntity.ok((Object)this.impactSurvayService.findAllImpact());
    }

    @GetMapping(value={"/retriveImpactId/{id}"})
    public ResponseEntity<ImpactSurvayDto> findImpactById(@PathVariable long id) {
        ImpactSurvayDto impactDto = new ImpactSurvayDto((ImpactSurvay)this.impactSurvayService.findImpactById(id).get());
        return new ResponseEntity((Object)impactDto, HttpStatus.OK);
    }

    @DeleteMapping(value={"/deleteImpact/{id}"})
    public ResponseEntity<ImpactSurvayDto> deleteImpact(@PathVariable long id) {
        Optional optionalImpact = this.impactSurvayService.findImpactById(id);
        ImpactSurvay impactSurvay = (ImpactSurvay)optionalImpact.get();
        if (optionalImpact.isPresent()) {
            this.impactSurvayService.delete(impactSurvay);
            return new ResponseEntity(HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    @GetMapping(value={"/retrieveAllImpact/{empId}"})
    public ResponseEntity<?> findAllImpactByEmpId(@PathVariable(value="empId") Long empId) {
        return ResponseEntity.ok((Object)this.impactSurvayService.findAllImpactByEmpId(empId));
    }

    @GetMapping(value={"/retrieveImpactlist"})
    public ResponseEntity<?> findAllByPageId(@RequestParam(value="pageId", required=false) String pageId, @RequestParam(value="dateRange", required=false) String dateRange, HttpServletRequest request) throws RequestException {
        List pageIdList = this.impactSurvayService.findAllByPageId(Long.parseLong(pageId), dateRange);
        return ResponseEntity.status((HttpStatus)HttpStatus.OK).body((Object)pageIdList);
    }

    @GetMapping(value={"/allImpactList/{empId}"})
    public ResponseEntity<List<ImpactSurvayDto>> allImpactListData(@PathVariable(value="empId") String empId, @RequestParam(value="pageId", required=false) String pageId) throws RequestException {
        return new ResponseEntity((Object)this.impactSurvayService.allImpactListData(empId, pageId), HttpStatus.OK);
    }

    @GetMapping(value={"/impactSurvayDeptids"})
    public ResponseEntity<List<ImpactSurvayDto>> impactSurvayListWithDeptids(@RequestParam(value="deptIds", required=false) String deptIds) throws RequestException, ParseException {
        List impactDTO = null;
        String[] searchArray = new String[]{"%20", "%2520"};
        String[] replaceArray = new String[]{" ", " "};
        String result = StringUtils.replaceEach((String)deptIds, (String[])searchArray, (String[])replaceArray);
        System.out.println("result :: " + result);
        if (result != null && !result.isEmpty() && !result.equals("")) {
            impactDTO = this.impactSurvayService.findimpactSurvayListDept(result);
        }
        return new ResponseEntity(impactDTO, HttpStatus.OK);
    }

    @GetMapping(value={"/impactCriticalCount"})
    public ResponseEntity<List<ImpactCrticalCountDTO>> getRiskEventById(@RequestParam(value="pageIds", required=false) String pageIds, @RequestParam(value="dateRange", required=false) String dateRange) throws RequestException, ParseException {
        System.out.println("PageId=>" + pageIds);
        String[] searchArray = new String[]{"%20", "%2520"};
        String[] replaceArray = new String[]{" ", " "};
        String result = StringUtils.replaceEach((String)pageIds, (String[])searchArray, (String[])replaceArray);
        List riskDTOS = this.impactSurvayService.findImpactCriticalCountList(result, dateRange);
        return new ResponseEntity((Object)riskDTOS, HttpStatus.OK);
    }
}

