/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.Employee
 *  com.estrat.service.db.bean.po.KPI
 *  com.estrat.service.db.bean.po.KPIDetailsPo
 *  com.estrat.service.db.bean.po.StagingChange
 *  com.estrat.service.db.dao.ApproversHistoryRepository
 *  com.estrat.service.db.dao.ControlPanelWorkFlowRepository
 *  com.estrat.service.db.dao.KPICriteria
 *  com.estrat.service.db.dao.StagingChangeRepository
 *  com.estrat.service.db.dto.ControlPanelWorkFlowDTO
 *  com.estrat.service.db.dto.DeptDetails
 *  com.estrat.service.db.dto.EmployeeDTO
 *  com.estrat.service.db.dto.KPIDTO
 *  com.estrat.service.db.dto.KPIDetailsDTO
 *  com.estrat.service.db.dto.KPIElementDTO
 *  com.estrat.service.db.dto.KpiDetailsAttachmentsDTO
 *  com.estrat.service.db.dto.KpiList
 *  com.estrat.service.db.dto.RiskResponseDTO
 *  com.estrat.service.db.dto.ScoreCardResponseDTO
 *  com.estrat.service.db.dto.TargetDTO
 *  com.estrat.service.db.resource.KPIController
 *  com.estrat.service.db.resource.util.KPIUtil
 *  com.estrat.service.db.resource.util.NotificationUtil
 *  com.estrat.service.db.resource.util.UserThreadLocal
 *  com.estrat.service.db.service.ApproversHistoryService
 *  com.estrat.service.db.service.AuditDetailsService
 *  com.estrat.service.db.service.ControlPanelWorkFlowService
 *  com.estrat.service.db.service.EmployeeService
 *  com.estrat.service.db.service.KPIService
 *  com.estrat.service.db.service.StagingChangeService
 *  com.estrat.service.db.service.UserRoleManagementService
 *  org.apache.commons.collections4.CollectionUtils
 *  org.apache.commons.lang3.StringUtils
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.http.HttpStatus
 *  org.springframework.http.ResponseEntity
 *  org.springframework.web.bind.annotation.DeleteMapping
 *  org.springframework.web.bind.annotation.GetMapping
 *  org.springframework.web.bind.annotation.PathVariable
 *  org.springframework.web.bind.annotation.PostMapping
 *  org.springframework.web.bind.annotation.RequestBody
 *  org.springframework.web.bind.annotation.RequestParam
 *  org.springframework.web.bind.annotation.RestController
 */
package com.estrat.service.db.resource;

import com.estrat.service.db.bean.Employee;
import com.estrat.service.db.bean.po.KPI;
import com.estrat.service.db.bean.po.KPIDetailsPo;
import com.estrat.service.db.bean.po.StagingChange;
import com.estrat.service.db.dao.ApproversHistoryRepository;
import com.estrat.service.db.dao.ControlPanelWorkFlowRepository;
import com.estrat.service.db.dao.KPICriteria;
import com.estrat.service.db.dao.StagingChangeRepository;
import com.estrat.service.db.dto.ControlPanelWorkFlowDTO;
import com.estrat.service.db.dto.DeptDetails;
import com.estrat.service.db.dto.EmployeeDTO;
import com.estrat.service.db.dto.KPIDTO;
import com.estrat.service.db.dto.KPIDetailsDTO;
import com.estrat.service.db.dto.KPIElementDTO;
import com.estrat.service.db.dto.KpiDetailsAttachmentsDTO;
import com.estrat.service.db.dto.KpiList;
import com.estrat.service.db.dto.RiskResponseDTO;
import com.estrat.service.db.dto.ScoreCardResponseDTO;
import com.estrat.service.db.dto.TargetDTO;
import com.estrat.service.db.resource.util.KPIUtil;
import com.estrat.service.db.resource.util.NotificationUtil;
import com.estrat.service.db.resource.util.UserThreadLocal;
import com.estrat.service.db.service.ApproversHistoryService;
import com.estrat.service.db.service.AuditDetailsService;
import com.estrat.service.db.service.ControlPanelWorkFlowService;
import com.estrat.service.db.service.EmployeeService;
import com.estrat.service.db.service.KPIService;
import com.estrat.service.db.service.StagingChangeService;
import com.estrat.service.db.service.UserRoleManagementService;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class KPIController {
    @Autowired
    private KPIService kpiService;
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private NotificationUtil notification;
    @Autowired
    private AuditDetailsService auditService;
    @Autowired
    UserRoleManagementService userRoleManagement;
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

    @GetMapping(value={"/kpi/{id}"})
    public ResponseEntity<KPIDTO> geKPIById(@PathVariable long id) {
        Optional kpiOptional = this.kpiService.findById(id);
        if (kpiOptional.isPresent()) {
            KPIDTO kpidto = new KPIDTO((KPI)kpiOptional.get());
            return new ResponseEntity((Object)kpidto, HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    @GetMapping(value={"/kpielements/{id}"})
    public ResponseEntity<List<KPIElementDTO>> geKPIkpielements(@PathVariable long id) {
        Optional kpiOptional = this.kpiService.findById(id);
        if (kpiOptional.isPresent()) {
            List kpiElementDTOs = this.kpiService.getkpielements(((KPI)kpiOptional.get()).getKpiName());
            return new ResponseEntity((Object)kpiElementDTOs, HttpStatus.OK);
        }
        return new ResponseEntity(new ArrayList(), HttpStatus.OK);
    }

    @GetMapping(value={"/kpidept/{id}"})
    public ResponseEntity<String> geKPIDeptById(@PathVariable long id) {
        String dept = this.kpiService.kpiDeptId(id);
        return new ResponseEntity((Object)dept, HttpStatus.OK);
    }

    @PostMapping(value={"/kpi"})
    public ResponseEntity<KPIDTO> saveOrUpdateKPI(@RequestBody KPIDTO kpidto) {
        Boolean updateStatus = false;
        if (kpidto.getId() != 0L) {
            updateStatus = true;
        }
        EmployeeDTO employeeDTO = new EmployeeDTO();
        if (kpidto.getCreatedBy() != 0L) {
            employeeDTO.setEmployeeId(kpidto.getCreatedBy());
            kpidto.getKpiValue().put("createdByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (kpidto.getUpdatedBy() != 0L) {
            employeeDTO.setEmployeeId(kpidto.getUpdatedBy());
            kpidto.getKpiValue().put("updatedByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (kpidto.getOwner() != 0L) {
            employeeDTO.setEmployeeId(kpidto.getOwner());
            kpidto.getKpiValue().put("ownerName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        KPIDTO response = this.kpiService.save(new KPIUtil().formatDates(kpidto));
        if (updateStatus.booleanValue()) {
            this.auditService.updateAudit("Scorecard", response.getId(), response.getUpdatedBy(), "KPI Modified");
        } else {
            this.auditService.saveAudit("Scorecard", response.getId(), response.getCreatedBy(), "KPI Created");
        }
        this.notification.saveNotification((Object)response, UserThreadLocal.getHeaders());
        return new ResponseEntity((Object)response, HttpStatus.OK);
    }

    @DeleteMapping(value={"/kpi/{id}"})
    public ResponseEntity<ScoreCardResponseDTO> softDeleteKPI(@PathVariable long id) {
        this.auditService.deleteAudit("Scorecard", id, Long.valueOf(UserThreadLocal.get()).longValue(), "KPI Deleted");
        return new ResponseEntity((Object)this.kpiService.deleteKPIById(id), HttpStatus.OK);
    }

    @GetMapping(value={"/v2/kpiList/{objectiveId}"})
    public ResponseEntity<List<KPIDTO>> kpiListFromObjectives(@PathVariable(value="objectiveId") long objectiveId) {
        List kpiList = this.kpiService.kpiList(objectiveId);
        if (CollectionUtils.isNotEmpty((Collection)kpiList)) {
            return new ResponseEntity((Object)kpiList, HttpStatus.OK);
        }
        return new ResponseEntity(Collections.emptyList(), HttpStatus.OK);
    }

    @GetMapping(value={"/retrieveNodeKeyList"})
    public ResponseEntity<List<KPIDetailsDTO>> retrieveNodeKeyList() {
        return new ResponseEntity((Object)this.kpiService.retrieveKpiDetailsList(), HttpStatus.OK);
    }

    @PostMapping(value={"/retrieveOrgKPIDetails"})
    public ResponseEntity<List<Map<String, Object>>> retrieveOrgKPIDetails(@RequestBody KPICriteria criteria) {
        return new ResponseEntity((Object)this.kpiService.retrieveKPIDetails(criteria), HttpStatus.OK);
    }

    @PostMapping(value={"/retrieveOrgKPIDetailsSubMeasure"})
    public ResponseEntity<List<Map<String, Object>>> retrieveOrgKPIDetailsSubMeasure(@RequestBody KPICriteria criteria) {
        return new ResponseEntity((Object)this.kpiService.retrieveOrgKPIDetailsSubMeasure(criteria), HttpStatus.OK);
    }

    @GetMapping(value={"/kpiList/{empId}"})
    public ResponseEntity<List<KPIDTO>> kpiList(@PathVariable long empId, @RequestParam(value="employeeView", required=false) String employeeView) {
        boolean flag = employeeView != null ? Boolean.valueOf(employeeView) : false;
        List kpiList = this.kpiService.getKpiList(empId, flag);
        return new ResponseEntity((Object)kpiList, HttpStatus.OK);
    }

    @GetMapping(value={"/kpiViewList/{objectiveId}"})
    public ResponseEntity<List<KPIDTO>> kpiListFromObjectivesId(@PathVariable(value="objectiveId") long objectiveId) {
        List kpiList = this.kpiService.kpiList(objectiveId);
        return new ResponseEntity((Object)kpiList, HttpStatus.OK);
    }

    @PostMapping(value={"/getNodeKeyType"})
    public ResponseEntity<List<Map<String, Object>>> getNodeKeyType(@RequestBody List<String> nodeKeyList) {
        return new ResponseEntity((Object)this.kpiService.getNodeKeyType(nodeKeyList), HttpStatus.OK);
    }

    @PostMapping(value={"/web/saveOrgKpiDetails"})
    public ResponseEntity<?> saveOrgKpiDetails(@RequestBody KPIDetailsDTO kpiDetailsDTO) {
        EmployeeDTO employeeDTO = new EmployeeDTO();
        employeeDTO.setEmployeeId(Long.valueOf(UserThreadLocal.get((String)"LOGGED_IN_EMPLOYEE_ID")).longValue());
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
        String superuserid = UserThreadLocal.get((String)"SUPER_USER_ID");
        if (null != superuserid && !superuserid.equals("0") && !superuserid.isEmpty() && Long.valueOf(superuserid).longValue() != emp.getEmpId()) {
            EmployeeDTO employeeSuperUser = new EmployeeDTO();
            employeeSuperUser.setEmployeeId(Long.valueOf(UserThreadLocal.get((String)"SUPER_USER_ID")).longValue());
            Employee empSuper = this.employeeService.getEmployee(employeeSuperUser);
            if (empSuper != null) {
                createdBy = empSuper.getEmpId();
            }
        }
        kpiDetailsDTO.setDeptId(departmentId);
        KPIDetailsPo kpiDetailsPo = new KPIDetailsPo(kpiDetailsDTO);
        List workflows = this.controlPanelWorkFlowService.findWorkflowsByTypeAndDept("Kpi Data Form", kpiDetailsDTO.getDeptId());
        if (!workflows.isEmpty()) {
            String newValuesJson = this.stagingChangeService.serializeObjectToJson((Object)kpiDetailsPo);
            String oldValuesJson = this.stagingChangeService.serializeObjectToJson((Object)kpiDetailsDTO);
            if (kpiDetailsDTO.getChangeId() != 0L) {
                StagingChange change = (StagingChange)this.stagingChangesRepository.findById(kpiDetailsDTO.getChangeId()).orElseThrow(() -> new IllegalStateException("Change not found"));
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
                return new ResponseEntity((Object)new RiskResponseDTO("KpiDataForm rejected from approval", null), HttpStatus.ACCEPTED);
            }
            if (kpiDetailsDTO.getKpiAttachment() != null) {
                for (KpiDetailsAttachmentsDTO kpidoc : kpiDetailsDTO.getKpiAttachment()) {
                    this.kpiService.kpiFileSave(kpidoc);
                }
            }
            this.stagingChangeService.storeChangesInStaging(newValuesJson, oldValuesJson, Long.valueOf(kpiDetailsDTO.getOrgKpiId()), "kpi_dataform", createdBy, (ControlPanelWorkFlowDTO)workflows.get(0), Long.valueOf(0L), Long.valueOf(0L));
            return new ResponseEntity((Object)new RiskResponseDTO("KpiDataForm submitted for approval", null), HttpStatus.ACCEPTED);
        }
        if (kpiDetailsDTO.getKpiAttachment() != null) {
            for (KpiDetailsAttachmentsDTO kpidoc : kpiDetailsDTO.getKpiAttachment()) {
                this.kpiService.kpiFileSave(kpidoc);
            }
        }
        this.auditService.saveAudit("KPI", kpiDetailsDTO.getEmpId(), kpiDetailsDTO.getEmpId(), "Manual Data Entered");
        return new ResponseEntity((Object)this.kpiService.saveOrgKpiDetails(kpiDetailsDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/orgKpiList"})
    public ResponseEntity<List<KPIDTO>> orgKpiList(@RequestParam(value="orgId") String orgId) {
        return new ResponseEntity((Object)this.kpiService.orgKpiList(orgId), HttpStatus.OK);
    }

    @GetMapping(value={"/nodeTargetByDate/{nodeKey}"})
    public ResponseEntity<TargetDTO> nodeTargetByDate(@PathVariable(value="nodeKey") long nodeKey, @RequestParam(value="dateRange", required=false) String dateRange) {
        String initialDate = null;
        String finalDate = null;
        String[] dataRanges = null;
        if (Objects.nonNull(dateRange)) {
            String[] stringArray = dataRanges = dateRange.contains("-") ? dateRange.split("-") : dateRange.split(",");
        }
        if (dataRanges != null && dataRanges.length > 1) {
            String startDate = dataRanges[0].trim();
            String endDate = dataRanges[1].trim();
            SimpleDateFormat dateFormat = new SimpleDateFormat("MMM dd,yyyy");
            try {
                Date firstDate = dateFormat.parse(startDate);
                Date secondDate = dateFormat.parse(endDate);
                SimpleDateFormat dateFormat_qy = new SimpleDateFormat("yyyy-MM-dd");
                initialDate = dateFormat_qy.format(firstDate);
                finalDate = dateFormat_qy.format(secondDate);
            }
            catch (ParseException e) {
                throw new RuntimeException(e);
            }
        }
        KPIDetailsDTO kpiDetailsDTO = new KPIDetailsDTO();
        kpiDetailsDTO.setNodeKey(String.valueOf(nodeKey));
        kpiDetailsDTO.setOrgKey(UserThreadLocal.get());
        KPIDetailsPo org_details = this.kpiService.getnodekeyTarget(kpiDetailsDTO, initialDate, finalDate);
        TargetDTO targetDTO = new TargetDTO();
        if (org_details != null) {
            targetDTO.setTarget(org_details.getMtdTarget());
            targetDTO.setActual(org_details.getMtdActual());
            targetDTO.setOrgkpiId(org_details.getOrgKpiId());
        }
        return new ResponseEntity((Object)targetDTO, HttpStatus.OK);
    }

    @GetMapping(value={"/kpiListByDate/{objectiveId}"})
    public ResponseEntity<List<KPIDTO>> kpiListByDate(@PathVariable(value="objectiveId") long objectiveId, @RequestParam(value="dateRange", required=false) String dateRange) {
        List kpiList = this.kpiService.kpiListByDate(objectiveId, dateRange);
        if (CollectionUtils.isNotEmpty((Collection)kpiList)) {
            return new ResponseEntity((Object)kpiList, HttpStatus.OK);
        }
        return new ResponseEntity(Collections.emptyList(), HttpStatus.OK);
    }

    @PostMapping(value={"/getSubMeasureNodeKeyList/{nodeKey}"})
    public ResponseEntity<List<Map<String, Object>>> getSubMeasureNodeKeyList(@PathVariable(value="nodeKey") long nodeKey) {
        return new ResponseEntity((Object)this.kpiService.getSubMeasureNodeKeyList(Long.valueOf(nodeKey)), HttpStatus.OK);
    }

    @GetMapping(value={"/kpiListByDept/{deptId}"})
    public ResponseEntity<List<KPIDTO>> kpiListByDept(@PathVariable(value="deptId") long deptId, @RequestParam(value="dateRange", required=false) String dateRange) {
        List kpiList = this.kpiService.kpiListByDeptId(deptId, dateRange);
        if (CollectionUtils.isNotEmpty((Collection)kpiList)) {
            return new ResponseEntity((Object)kpiList, HttpStatus.OK);
        }
        return new ResponseEntity(Collections.emptyList(), HttpStatus.OK);
    }

    @GetMapping(value={"/checkNodeKey"})
    public ResponseEntity<String> checkNodeKey() {
        this.kpiService.checkNodeKey();
        return new ResponseEntity((Object)"Success", HttpStatus.OK);
    }

    @GetMapping(value={"/kpiFormKpiList/{scorecardId}"})
    public ResponseEntity<List<KPIDTO>> kpiFormKpiList(@PathVariable String scorecardId, @RequestParam(value="ownerFlag", required=false) String ownerFlag) {
        boolean flag = ownerFlag != null ? Boolean.valueOf(ownerFlag) : false;
        return new ResponseEntity((Object)this.kpiService.retrieveKpiFormDataList(Long.valueOf(scorecardId).longValue()), HttpStatus.OK);
    }

    @GetMapping(value={"/subMeasureNodeKeyList/{nodeKey}"})
    public ResponseEntity<List<Map<String, Object>>> subMeasureNodeKeyList(@PathVariable(value="nodeKey") long nodeKey, @RequestParam(value="dateRange", required=false) String dateRange, @RequestParam(value="empid", required=false) String empid) {
        String[] searchArray = new String[]{"%20", "%2520"};
        String[] replaceArray = new String[]{" ", " "};
        String date = StringUtils.replaceEach((String)dateRange, (String[])searchArray, (String[])replaceArray);
        return new ResponseEntity((Object)this.kpiService.getSubMeasureNodeKeyListForm(Long.valueOf(nodeKey), date, empid), HttpStatus.OK);
    }

    @GetMapping(value={"/nodeKeyDataCheck/{nodeKey}"})
    public ResponseEntity<Map<String, Object>> nodeKeyDataCheck(@PathVariable(value="nodeKey") long nodeKey, @RequestParam(value="dateRange", required=false) String dateRange) {
        String[] searchArray = new String[]{"%20", "%2520"};
        String[] replaceArray = new String[]{" ", " "};
        String date = StringUtils.replaceEach((String)dateRange, (String[])searchArray, (String[])replaceArray);
        return new ResponseEntity((Object)this.kpiService.nodeKeyDataCheck(Long.valueOf(nodeKey), date), HttpStatus.OK);
    }

    @GetMapping(value={"/subNodeKeyData/{nodeKey}"})
    public ResponseEntity<Map<String, Object>> subNodeKeyData(@PathVariable(value="nodeKey") long nodeKey, @RequestParam(value="measureKey") long measureKey, @RequestParam(value="dateRange", required=false) String dateRange) {
        String[] searchArray = new String[]{"%20", "%2520"};
        String[] replaceArray = new String[]{" ", " "};
        String date = StringUtils.replaceEach((String)dateRange, (String[])searchArray, (String[])replaceArray);
        return new ResponseEntity((Object)this.kpiService.subNodeKeyData(Long.valueOf(nodeKey), Long.valueOf(measureKey), date), HttpStatus.OK);
    }

    @PostMapping(value={"/retrieveOrgKpiDetailsByReportee"})
    public ResponseEntity<List<Map<String, Object>>> retrieveOrgKpiDetailsByReportee(@RequestBody KPICriteria criteria) {
        return new ResponseEntity((Object)this.kpiService.retrieveOrgKpiDetailsByReportee(criteria), HttpStatus.OK);
    }

    @GetMapping(value={"/kpiListByDeptId/{deptId}"})
    public ResponseEntity<List<KPIDTO>> kpiListByDeptId(@PathVariable long deptId) {
        List kpiList = this.kpiService.kpiListByDeptId(deptId);
        return new ResponseEntity((Object)kpiList, HttpStatus.OK);
    }

    @GetMapping(value={"/checkNodeKey/{nodeKey}"})
    public ResponseEntity<Map<String, Object>> kpiListByDeptId(@PathVariable String nodeKey) {
        Map kpiList = this.kpiService.checkNodeKey(nodeKey);
        return new ResponseEntity((Object)kpiList, HttpStatus.OK);
    }

    @PostMapping(value={"/retrieveOrgKpiDetailsByFunction"})
    public ResponseEntity<Map<String, Object>> retrieveOrgKpiDetailsByFunction(@RequestBody KPICriteria criteria, @RequestParam String type) {
        return new ResponseEntity((Object)this.kpiService.retrieveOrgKpiDetailsByFunction(criteria, type), HttpStatus.OK);
    }

    @PostMapping(value={"/retrieveOrgKpiDetailsForSubMeasure"})
    public ResponseEntity<Map<String, Object>> retrieveOrgKpiDetailsForSubMeasure(@RequestBody KPICriteria criteria, @RequestParam String type) {
        return new ResponseEntity((Object)this.kpiService.retrieveOrgKpiDetailsForSubMeasure(criteria, type), HttpStatus.OK);
    }

    @GetMapping(value={"/checkkpiListByEmpId/{empId}"})
    public ResponseEntity<List<KpiList>> checkkpiListByEmpId(@PathVariable(value="empId") long empId) {
        return new ResponseEntity((Object)this.kpiService.checkkpiListByEmpId(empId, false), HttpStatus.OK);
    }

    @GetMapping(value={"/checkkpiListByDeptId"})
    public ResponseEntity<List<KpiList>> checkkpiListByDeptId() {
        return new ResponseEntity((Object)this.kpiService.checkkpiListByDeptId(), HttpStatus.OK);
    }

    @GetMapping(value={"/kpielementsubmeasurelist/{nodeKey}"})
    public ResponseEntity<List<KPIElementDTO>> kpielementsubmeasurelist(@PathVariable(value="nodeKey") String nodeKey) {
        return new ResponseEntity((Object)this.kpiService.checkSubmeasureKpiElement(nodeKey), HttpStatus.OK);
    }

    @GetMapping(value={"/kpielementsubmeasure/{nodeKey}"})
    public ResponseEntity<KPIElementDTO> kpielementsubmeasure(@PathVariable(value="nodeKey") String nodeKey) {
        return new ResponseEntity((Object)this.kpiService.checkSubmeasureElementData(nodeKey), HttpStatus.OK);
    }

    @GetMapping(value={"/kpiAttachmentList/{kpiId}"})
    public ResponseEntity<List<KpiDetailsAttachmentsDTO>> retriveAttachemnts(@PathVariable(value="kpiId") Long kpiId) {
        return new ResponseEntity((Object)this.kpiService.retriveAttachmentByKpiId(kpiId), HttpStatus.OK);
    }

    @GetMapping(value={"/kpiContributionPercentage/{kpiId}"})
    public ResponseEntity<String> kpiContributionPercentage(@PathVariable(value="kpiId") Long kpiId, @RequestParam String deptName, @RequestParam(value="type") String type) {
        System.out.println("ALG DB SERVICE kpiId == " + kpiId + "  =  deptName== " + deptName);
        String[] searchArray = new String[]{"%20", "%2520"};
        String[] replaceArray = new String[]{" ", " "};
        String replaceDeptName = StringUtils.replaceEach((String)deptName, (String[])searchArray, (String[])replaceArray);
        return new ResponseEntity((Object)this.kpiService.kpiContributionPercentage(kpiId, replaceDeptName, type), HttpStatus.OK);
    }

    @GetMapping(value={"/kpiContributionPercentagebyDeptId/{kpiId}"})
    public ResponseEntity<String> kpiContributionPercentagebyDeptId(@PathVariable(value="kpiId") Long kpiId, @RequestParam String deptId, @RequestParam(value="type") String type) {
        System.out.println("ALG DB SERVICE kpiId == " + kpiId + "  =  deptName== " + deptId);
        String[] searchArray = new String[]{"%20", "%2520"};
        String[] replaceArray = new String[]{" ", " "};
        String replaceDeptName = StringUtils.replaceEach((String)deptId, (String[])searchArray, (String[])replaceArray);
        return new ResponseEntity((Object)this.kpiService.kpiContributionPercentagebyDeptId(kpiId, replaceDeptName, type), HttpStatus.OK);
    }

    @PostMapping(value={"/kpiContributionPercentagesBulk/{kpiId}"})
    public ResponseEntity<Map<String, String>> kpiContributionPercentagesBulk(@PathVariable(value="kpiId") Long kpiId, @RequestParam(value="type") String type, @RequestBody List<String> deptIds) {
        return new ResponseEntity((Object)this.kpiService.kpiContributionPercentagesBulk(kpiId, deptIds, type), HttpStatus.OK);
    }

    @PostMapping(value={"/retrieveOrgKpiDetailsByReporteeBulk"})
    public ResponseEntity<Map<Integer, List<Map<String, Object>>>> retrieveOrgKpiDetailsByReporteeBulk(@RequestBody List<KPICriteria> criteriaList) {
        return new ResponseEntity((Object)this.kpiService.retrieveOrgKpiDetailsByReporteeBulk(criteriaList), HttpStatus.OK);
    }
}

