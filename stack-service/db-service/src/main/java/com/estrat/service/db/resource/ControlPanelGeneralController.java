/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.ControlPanelCustomPerformance
 *  com.estrat.service.db.bean.po.ControlPanelGeneral
 *  com.estrat.service.db.dto.ControlPanelGeneralDTO
 *  com.estrat.service.db.dto.ControlPanelResponseDTO
 *  com.estrat.service.db.exception.RequestException
 *  com.estrat.service.db.resource.ControlPanelGeneralController
 *  com.estrat.service.db.resource.util.BackupUtil
 *  com.estrat.service.db.resource.util.UserThreadLocal
 *  com.estrat.service.db.service.AuditDetailsService
 *  com.estrat.service.db.service.ControlPanelGeneralService
 *  com.estrat.service.db.service.EmployeeService
 *  com.estrat.service.db.service.KPIService
 *  com.estrat.service.db.service.SchedulerBatchService
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
package com.estrat.service.db.resource;

import com.estrat.service.db.bean.po.ControlPanelCustomPerformance;
import com.estrat.service.db.bean.po.ControlPanelGeneral;
import com.estrat.service.db.dto.ControlPanelGeneralDTO;
import com.estrat.service.db.dto.ControlPanelResponseDTO;
import com.estrat.service.db.exception.RequestException;
import com.estrat.service.db.resource.util.BackupUtil;
import com.estrat.service.db.resource.util.UserThreadLocal;
import com.estrat.service.db.service.AuditDetailsService;
import com.estrat.service.db.service.ControlPanelGeneralService;
import com.estrat.service.db.service.EmployeeService;
import com.estrat.service.db.service.KPIService;
import com.estrat.service.db.service.SchedulerBatchService;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
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
public class ControlPanelGeneralController {
    @Autowired
    protected ControlPanelGeneralService controlPanelGeneralService;
    @Autowired
    protected SchedulerBatchService schedulerBatchService;
    @Autowired
    protected BackupUtil backupUtil;
    @Autowired
    protected EmployeeService employeeService;
    @Autowired
    protected KPIService kpiService;
    @Autowired
    protected AuditDetailsService auditService;

    @PostMapping(value={"/generalSetting"})
    public ResponseEntity<ControlPanelResponseDTO> saveControlPanelGeneral(@RequestBody ControlPanelGeneralDTO controlPanelGeneralDTO, HttpServletRequest request) throws RequestException {
        this.updateAuditDetails(controlPanelGeneralDTO);
        if (controlPanelGeneralDTO.getGeneralSettingValue() != null) {
            if (controlPanelGeneralDTO.getGeneralSettingValue().containsKey("path") && controlPanelGeneralDTO.getGeneralSettingValue().containsKey("path")) {
                Map checkMap = this.schedulerBatchService.checkBackup(controlPanelGeneralDTO);
                if (!checkMap.containsKey("error")) {
                    controlPanelGeneralDTO.getGeneralSettingValue().put("backupPath", checkMap.get("backupPath"));
                    controlPanelGeneralDTO.getGeneralSettingValue().put("backupPathFile", checkMap.get("backupPathFile"));
                    controlPanelGeneralDTO.getGeneralSettingValue().put("restorePath", checkMap.get("restorePath"));
                    controlPanelGeneralDTO.getGeneralSettingValue().put("backupFinalPath", checkMap.get("backupFinalPath"));
                    controlPanelGeneralDTO.getGeneralSettingValue().put("restoreFinalPath", checkMap.get("restoreFinalPath"));
                    controlPanelGeneralDTO.getGeneralSettingValue().put("backupFinalPathFile", checkMap.get("backupFinalPathFile"));
                    this.auditService.updateAudit("Control Panel", controlPanelGeneralDTO.getOrgId(), Long.valueOf(UserThreadLocal.get()).longValue(), "Back Up Path Modified");
                } else {
                    ControlPanelResponseDTO controlPanelResponseDTO = new ControlPanelResponseDTO();
                    controlPanelResponseDTO.setMessage("can't create file path");
                    return new ResponseEntity((Object)controlPanelResponseDTO, HttpStatus.OK);
                }
            }
            if (controlPanelGeneralDTO.getGeneralSettingValue().containsKey("schedulertype") || controlPanelGeneralDTO.getGeneralSettingValue().containsKey("backupduration")) {
                this.schedulerBatchService.saveBatch(controlPanelGeneralDTO);
                if (controlPanelGeneralDTO.getGeneralSettingValue().get("backupduration").toString().contains("Now")) {
                    controlPanelGeneralDTO.getGeneralSettingValue().put("restoreStatus", true);
                }
            }
        }
        ControlPanelGeneral controlPanelGeneral = new ControlPanelGeneral(controlPanelGeneralDTO);
        controlPanelGeneral.setCreatedTime(LocalDateTime.now());
        controlPanelGeneral.setUpdatedTime(LocalDateTime.now());
        ControlPanelResponseDTO controlPanelResponseDTO = this.controlPanelGeneralService.save(controlPanelGeneral);
        return new ResponseEntity((Object)controlPanelResponseDTO, HttpStatus.OK);
    }

    @PostMapping(value={"/customPerformance"})
    public ResponseEntity<ControlPanelResponseDTO> saveCustomPerformance(@RequestBody ControlPanelGeneralDTO controlPanelGeneralDTO, HttpServletRequest request) throws RequestException {
        this.updateCustomAuditDetails(controlPanelGeneralDTO);
        boolean checkStatus = this.checkThresholdValues(controlPanelGeneralDTO);
        ControlPanelCustomPerformance controlpanelgen = this.controlPanelGeneralService.findCustomPerformancebyid(Long.valueOf(UserThreadLocal.get((String)"USER_ORG_ID")).longValue());
        ControlPanelCustomPerformance controlPanelGeneral = new ControlPanelCustomPerformance(controlPanelGeneralDTO, controlpanelgen);
        controlPanelGeneral.setOrgId(Long.valueOf(UserThreadLocal.get((String)"USER_ORG_ID")).longValue());
        controlPanelGeneral.setCreatedTime(LocalDateTime.now());
        controlPanelGeneral.setUpdatedTime(LocalDateTime.now());
        controlPanelGeneral.setCreatedBy(Long.valueOf(UserThreadLocal.get()).longValue());
        controlPanelGeneral.setUpdatedBy(Long.valueOf(UserThreadLocal.get()).longValue());
        ControlPanelResponseDTO controlPanelResponseDTO = this.controlPanelGeneralService.saveCustomPerformance(controlPanelGeneral);
        if (checkStatus) {
            Map stringObjectMap = controlPanelGeneralDTO.getGeneralSettingValue();
            String threshold1 = stringObjectMap.get("threshold1") != null ? stringObjectMap.get("threshold1").toString() : "";
            String threshold2 = stringObjectMap.get("threshold2") != null ? stringObjectMap.get("threshold2").toString() : "";
            String threshold3 = stringObjectMap.get("threshold3") != null ? stringObjectMap.get("threshold3").toString() : "";
            String threshold4 = stringObjectMap.get("threshold4") != null ? stringObjectMap.get("threshold4").toString() : "";
            String threshold5 = stringObjectMap.get("threshold5") != null ? stringObjectMap.get("threshold5").toString() : "";
            this.kpiService.updateCustomThresholdValue(Long.valueOf(UserThreadLocal.get((String)"USER_ORG_ID")), threshold1, threshold2, threshold3, threshold4, threshold5);
        }
        return new ResponseEntity((Object)controlPanelResponseDTO, HttpStatus.OK);
    }

    @PostMapping(value={"/customPerformance/risk"})
    public ResponseEntity<ControlPanelResponseDTO> savecontrolpanelrisk(@RequestBody ControlPanelGeneralDTO controlPanelGeneralDTO, HttpServletRequest request) throws RequestException {
        this.updateCustomAuditDetails(controlPanelGeneralDTO);
        ControlPanelCustomPerformance controlpanel = this.controlPanelGeneralService.findCustomPerformancebyid(Long.valueOf(UserThreadLocal.get((String)"USER_ORG_ID")).longValue());
        if (controlpanel != null) {
            ObjectMapper mapper = new ObjectMapper();
            try {
                controlpanel.setRisksetting(mapper.writeValueAsString((Object)controlPanelGeneralDTO.getRisksetting()));
                this.controlPanelGeneralService.saveCustomPerformance(controlpanel);
            }
            catch (Exception e) {
                throw new RuntimeException(e);
            }
        }
        ControlPanelResponseDTO controlPanelResponseDTO = new ControlPanelResponseDTO();
        controlPanelResponseDTO.setControlPanelCustomPerformance(controlpanel);
        return new ResponseEntity((Object)controlPanelResponseDTO, HttpStatus.OK);
    }

    @GetMapping(value={"/customPerformance/details"})
    public ResponseEntity<Map<String, Object>> findCustomPerformanceById() throws RequestException {
        return new ResponseEntity((Object)this.controlPanelGeneralService.findCustomPerformanceByOrgId(), HttpStatus.OK);
    }

    @GetMapping(value={"/customPerformance/riskdetails"})
    public ResponseEntity<Map<String, Object>> findrisksettings() throws RequestException {
        return new ResponseEntity((Object)this.controlPanelGeneralService.findrisksettingsByOrgId(), HttpStatus.OK);
    }

    @PutMapping(value={"/generalSetting"})
    public ResponseEntity<ControlPanelResponseDTO> updateControlPanelGeneral(@RequestBody ControlPanelGeneralDTO controlPanelGeneralDTO, HttpServletRequest request) throws RequestException {
        this.updateAuditDetails(controlPanelGeneralDTO);
        if (controlPanelGeneralDTO.getGeneralSettingValue() != null) {
            if (controlPanelGeneralDTO.getGeneralSettingValue().containsKey("path") && controlPanelGeneralDTO.getGeneralSettingValue().containsKey("path")) {
                Map checkMap = this.schedulerBatchService.checkBackup(controlPanelGeneralDTO);
                if (!checkMap.containsKey("error")) {
                    controlPanelGeneralDTO.getGeneralSettingValue().put("backupPath", checkMap.get("backupPath"));
                    controlPanelGeneralDTO.getGeneralSettingValue().put("backupPathFile", checkMap.get("backupPathFile"));
                    controlPanelGeneralDTO.getGeneralSettingValue().put("restorePath", checkMap.get("restorePath"));
                    controlPanelGeneralDTO.getGeneralSettingValue().put("backupFinalPath", checkMap.get("backupFinalPath"));
                    controlPanelGeneralDTO.getGeneralSettingValue().put("backupFinalPathFile", checkMap.get("backupFinalPathFile"));
                    controlPanelGeneralDTO.getGeneralSettingValue().put("restoreFinalPath", checkMap.get("restoreFinalPath"));
                } else {
                    ControlPanelResponseDTO controlPanelResponseDTO = new ControlPanelResponseDTO();
                    controlPanelResponseDTO.setMessage("can't create file path");
                    return new ResponseEntity((Object)controlPanelResponseDTO, HttpStatus.OK);
                }
            }
            if (controlPanelGeneralDTO.getGeneralSettingValue().containsKey("schedulertype") || controlPanelGeneralDTO.getGeneralSettingValue().containsKey("backupduration")) {
                this.schedulerBatchService.saveBatch(controlPanelGeneralDTO);
                if (controlPanelGeneralDTO.getGeneralSettingValue().get("backupduration").toString().contains("Now")) {
                    controlPanelGeneralDTO.getGeneralSettingValue().put("restoreStatus", true);
                }
            }
        }
        ControlPanelGeneral controlPanelGeneral = new ControlPanelGeneral(controlPanelGeneralDTO);
        controlPanelGeneral.setUpdatedTime(LocalDateTime.now());
        ControlPanelResponseDTO controlPanelResponseDTO = this.controlPanelGeneralService.save(controlPanelGeneral);
        return new ResponseEntity((Object)controlPanelResponseDTO, HttpStatus.OK);
    }

    @GetMapping(value={"/generalSetting/{id}"})
    public ResponseEntity<ControlPanelGeneralDTO> getControlPanelGeneralById(@PathVariable(value="id") Long id) throws RequestException {
        ControlPanelGeneralDTO controlPanelGeneralDTO = new ControlPanelGeneralDTO((ControlPanelGeneral)this.controlPanelGeneralService.findById(id.longValue()).get());
        return new ResponseEntity((Object)controlPanelGeneralDTO, HttpStatus.OK);
    }

    @DeleteMapping(value={"/generalSetting/{id}"})
    public ResponseEntity<ControlPanelResponseDTO> deleteControlPanelGeneralById(@PathVariable(value="id") Long id, HttpServletRequest request) throws RequestException {
        return new ResponseEntity((Object)this.controlPanelGeneralService.deleteById(id.longValue()), HttpStatus.OK);
    }

    @GetMapping(value={"/generalSettingList/{orgId}"})
    public ResponseEntity<ControlPanelGeneralDTO> findByOrgId(@PathVariable(value="orgId") long orgId) throws RequestException {
        Optional controlPanelGeneral = this.controlPanelGeneralService.findById(orgId);
        if (controlPanelGeneral.isPresent()) {
            ControlPanelGeneralDTO controlPanelGeneralDTO = new ControlPanelGeneralDTO((ControlPanelGeneral)this.controlPanelGeneralService.findById(orgId).get());
            return new ResponseEntity((Object)controlPanelGeneralDTO, HttpStatus.OK);
        }
        return new ResponseEntity((Object)new ControlPanelGeneralDTO(), HttpStatus.OK);
    }

    @GetMapping(value={"/scriptrestore"})
    public ResponseEntity<ControlPanelResponseDTO> runScriptRestore(@RequestParam(value="path") String path, @RequestParam(value="orgId") String orgId) throws RequestException {
        ControlPanelResponseDTO controlPanelResponseDTO = new ControlPanelResponseDTO();
        boolean status = this.backupUtil.restoreDB(path);
        if (status) {
            controlPanelResponseDTO.setFlag(true);
        } else {
            controlPanelResponseDTO.setFlag(false);
        }
        return new ResponseEntity((Object)controlPanelResponseDTO, HttpStatus.OK);
    }

    @GetMapping(value={"/restorePath"})
    public ResponseEntity<List<String>> runScriptRestore(@RequestParam(value="orgId") String orgId) throws RequestException {
        ControlPanelGeneralDTO controlPanelGeneralDTO;
        List fileList = new ArrayList();
        Optional controlPanelGeneral = this.controlPanelGeneralService.findById(Long.valueOf(orgId).longValue());
        if (controlPanelGeneral.isPresent() && (controlPanelGeneralDTO = new ControlPanelGeneralDTO((ControlPanelGeneral)controlPanelGeneral.get())).getGeneralSettingValue().containsKey("backupFinalPath")) {
            fileList = this.schedulerBatchService.findFiles(controlPanelGeneralDTO.getGeneralSettingValue().get("backupFinalPath").toString());
        }
        return new ResponseEntity(fileList, HttpStatus.OK);
    }

    private void updateAuditDetails(ControlPanelGeneralDTO controlPanelGeneralDTO) {
        if (controlPanelGeneralDTO.getOrgId() > 0L) {
            ControlPanelGeneralDTO controlPanelGeneral = this.controlPanelGeneralService.findByOrgId(controlPanelGeneralDTO.getOrgId());
            if (controlPanelGeneral != null) {
                if (controlPanelGeneral.getSiteName() != null && !controlPanelGeneral.getSiteName().equalsIgnoreCase(controlPanelGeneralDTO.getSiteName())) {
                    this.auditService.updateAudit("Control Panel", controlPanelGeneral.getOrgId(), Long.valueOf(UserThreadLocal.get()).longValue(), "Site Name Modified");
                }
                if (controlPanelGeneral.getSiteLanguage() != null && !controlPanelGeneral.getSiteLanguage().equalsIgnoreCase(controlPanelGeneralDTO.getSiteLanguage())) {
                    this.auditService.updateAudit("Control Panel", controlPanelGeneral.getOrgId(), Long.valueOf(UserThreadLocal.get()).longValue(), "Site Language Modified");
                }
                if (controlPanelGeneral.getAdminEmailId() != null && !controlPanelGeneral.getAdminEmailId().equalsIgnoreCase(controlPanelGeneralDTO.getAdminEmailId())) {
                    this.auditService.updateAudit("Control Panel", controlPanelGeneral.getOrgId(), Long.valueOf(UserThreadLocal.get()).longValue(), "Admin Email ID Modified");
                }
                if (controlPanelGeneral.getCurrencyView() != null && !controlPanelGeneral.getCurrencyView().equalsIgnoreCase(controlPanelGeneralDTO.getCurrencyView())) {
                    this.auditService.updateAudit("Control Panel", controlPanelGeneral.getOrgId(), Long.valueOf(UserThreadLocal.get()).longValue(), "Currency Modified");
                }
                if (controlPanelGeneral.getStartMonth() != null && !controlPanelGeneral.getStartMonth().equalsIgnoreCase(controlPanelGeneralDTO.getStartMonth())) {
                    this.auditService.updateAudit("Control Panel", controlPanelGeneral.getOrgId(), Long.valueOf(UserThreadLocal.get()).longValue(), "Calendar Year Modified");
                }
                if (controlPanelGeneral.getDefaultDatePeriod() != null && !controlPanelGeneral.getDefaultDatePeriod().equalsIgnoreCase(controlPanelGeneralDTO.getDefaultDatePeriod())) {
                    this.auditService.updateAudit("Control Panel", controlPanelGeneral.getOrgId(), Long.valueOf(UserThreadLocal.get()).longValue(), "Calendar Default View Modified");
                }
                if (controlPanelGeneral.getGeneralSettingValue().get("notification") != controlPanelGeneralDTO.getGeneralSettingValue().get("notification")) {
                    this.auditService.updateAudit("Control Panel", controlPanelGeneral.getOrgId(), Long.valueOf(UserThreadLocal.get()).longValue(), "Notification Modified");
                }
                if (controlPanelGeneral.getTimeZone() != null && !controlPanelGeneral.getTimeZone().equalsIgnoreCase(controlPanelGeneralDTO.getTimeZone())) {
                    this.auditService.updateAudit("Control Panel", controlPanelGeneral.getOrgId(), Long.valueOf(UserThreadLocal.get()).longValue(), "Time Zone Modified");
                }
                if (controlPanelGeneral.getCurrencyType() != null && !controlPanelGeneral.getCurrencyType().equalsIgnoreCase(controlPanelGeneralDTO.getCurrencyType())) {
                    this.auditService.updateAudit("Control Panel", controlPanelGeneral.getOrgId(), Long.valueOf(UserThreadLocal.get()).longValue(), "Currency Modified");
                }
            } else {
                if (controlPanelGeneralDTO.getSiteName() != null) {
                    this.auditService.updateAudit("Control Panel", controlPanelGeneral.getOrgId(), Long.valueOf(UserThreadLocal.get()).longValue(), "Site Name Modified");
                }
                if (controlPanelGeneralDTO.getSiteLanguage() != null) {
                    this.auditService.updateAudit("Control Panel", controlPanelGeneral.getOrgId(), Long.valueOf(UserThreadLocal.get()).longValue(), "Site Language Modified");
                }
                if (controlPanelGeneralDTO.getAdminEmailId() != null) {
                    this.auditService.updateAudit("Control Panel", controlPanelGeneral.getOrgId(), Long.valueOf(UserThreadLocal.get()).longValue(), "Admin Email ID Modified");
                }
                if (controlPanelGeneralDTO.getCurrencyType() != null) {
                    this.auditService.updateAudit("Control Panel", controlPanelGeneral.getOrgId(), Long.valueOf(UserThreadLocal.get()).longValue(), "Currency Modified");
                }
                if (controlPanelGeneralDTO.getCalendarYear() != null) {
                    this.auditService.updateAudit("Control Panel", controlPanelGeneral.getOrgId(), Long.valueOf(UserThreadLocal.get()).longValue(), "Calendar Year Modified");
                }
                if (controlPanelGeneralDTO.getDefaultDatePeriod() != null) {
                    this.auditService.updateAudit("Control Panel", controlPanelGeneral.getOrgId(), Long.valueOf(UserThreadLocal.get()).longValue(), "Calendar Default View Modified");
                }
                if (controlPanelGeneralDTO.getTimeZone() != null) {
                    this.auditService.updateAudit("Control Panel", controlPanelGeneral.getOrgId(), Long.valueOf(UserThreadLocal.get()).longValue(), "Time Zone Modified");
                }
                if (controlPanelGeneralDTO.getTimeZone() != null) {
                    this.auditService.updateAudit("Control Panel", controlPanelGeneral.getOrgId(), Long.valueOf(UserThreadLocal.get()).longValue(), "Time Zone Modified");
                }
            }
        }
    }

    private void updateCustomAuditDetails(ControlPanelGeneralDTO controlPanelGeneralDTO) {
        Map controlPanelGeneral = this.controlPanelGeneralService.findCustomPerformance(Long.valueOf(UserThreadLocal.get((String)"USER_ORG_ID")).longValue());
        if (controlPanelGeneralDTO.getGeneralSettingValue() != null) {
            if (controlPanelGeneralDTO.getGeneralSettingValue().get("audittrailtype").toString().equalsIgnoreCase("Aggregation") && controlPanelGeneralDTO.getGeneralSettingValue().containsKey("aggregation")) {
                this.auditService.updateAudit("Control Panel", controlPanelGeneralDTO.getOrgId(), Long.valueOf(UserThreadLocal.get()).longValue(), "Aggregation Modified");
            }
            if (controlPanelGeneralDTO.getGeneralSettingValue().get("audittrailtype").toString().equalsIgnoreCase("Performance") && controlPanelGeneralDTO.getGeneralSettingValue().containsKey("performance")) {
                this.auditService.updateAudit("Control Panel", controlPanelGeneralDTO.getOrgId(), Long.valueOf(UserThreadLocal.get()).longValue(), "Default Performance Modified");
            }
            if (controlPanelGeneralDTO.getGeneralSettingValue().containsKey("aggregationType") && !((String)controlPanelGeneral.get("aggregationType")).equals(controlPanelGeneralDTO.getGeneralSettingValue().get("aggregationType").toString())) {
                this.auditService.updateAudit("Control Panel", controlPanelGeneralDTO.getOrgId(), Long.valueOf(UserThreadLocal.get()).longValue(), "Aggregation Type Modified");
            }
            if (controlPanelGeneralDTO.getGeneralSettingValue().get("audittrailtype").toString().equalsIgnoreCase("customPerformance") && controlPanelGeneralDTO.getGeneralSettingValue().containsKey("customPerformance")) {
                this.auditService.updateAudit("Control Panel", controlPanelGeneralDTO.getOrgId(), Long.valueOf(UserThreadLocal.get()).longValue(), "Custom Performance Modified");
            }
            if (controlPanelGeneralDTO.getGeneralSettingValue().get("audittrailtype").toString().equalsIgnoreCase("yearToDate") && controlPanelGeneralDTO.getGeneralSettingValue().containsKey("yearToDate")) {
                this.auditService.updateAudit("Control Panel", controlPanelGeneralDTO.getOrgId(), Long.valueOf(UserThreadLocal.get()).longValue(), "YTD Modified");
            }
            if (!(!controlPanelGeneralDTO.getGeneralSettingValue().get("audittrailtype").toString().equalsIgnoreCase("Scorecard Field Modified") || controlPanelGeneralDTO.getGeneralSettingValue().get("scorecardactual").toString().equalsIgnoreCase("false") && controlPanelGeneralDTO.getGeneralSettingValue().get("scorecardbudget").toString().equalsIgnoreCase("false") && controlPanelGeneralDTO.getGeneralSettingValue().get("scorecardforecast").toString().equalsIgnoreCase("false") && controlPanelGeneralDTO.getGeneralSettingValue().get("scorecardrisk").toString().equalsIgnoreCase("false") && controlPanelGeneralDTO.getGeneralSettingValue().get("scorecardscore").toString().equalsIgnoreCase("false") && controlPanelGeneralDTO.getGeneralSettingValue().get("scorecardtarget").toString().equalsIgnoreCase("false") && controlPanelGeneralDTO.getGeneralSettingValue().get("scorecardtrend").toString().equalsIgnoreCase("false"))) {
                this.auditService.updateAudit("Control Panel", controlPanelGeneralDTO.getOrgId(), Long.valueOf(UserThreadLocal.get()).longValue(), "Scorecard Field Modified");
            }
            if (!(!controlPanelGeneralDTO.getGeneralSettingValue().get("audittrailtype").toString().equalsIgnoreCase("KPI Data Table Fields Modified") || controlPanelGeneralDTO.getGeneralSettingValue().get("datatableactual").toString().equalsIgnoreCase("false") && controlPanelGeneralDTO.getGeneralSettingValue().get("datatableannualtarget").toString().equalsIgnoreCase("false") && controlPanelGeneralDTO.getGeneralSettingValue().get("datatablegap").toString().equalsIgnoreCase("false") && controlPanelGeneralDTO.getGeneralSettingValue().get("datatabletarget").toString().equalsIgnoreCase("false") && controlPanelGeneralDTO.getGeneralSettingValue().get("datatableytd").toString().equalsIgnoreCase("false"))) {
                this.auditService.updateAudit("Control Panel", controlPanelGeneralDTO.getOrgId(), Long.valueOf(UserThreadLocal.get()).longValue(), "KPI Data Table Fields Modified");
            }
            if (!(!controlPanelGeneralDTO.getGeneralSettingValue().get("audittrailtype").toString().equalsIgnoreCase("KPI Data Drill Down Fields Modified") || controlPanelGeneralDTO.getGeneralSettingValue().get("drilltableactual").toString().equalsIgnoreCase("false") && controlPanelGeneralDTO.getGeneralSettingValue().get("drilltablegap").toString().equalsIgnoreCase("false") && controlPanelGeneralDTO.getGeneralSettingValue().get("drilltabletarget").toString().equalsIgnoreCase("false"))) {
                this.auditService.updateAudit("Control Panel", controlPanelGeneralDTO.getOrgId(), Long.valueOf(UserThreadLocal.get()).longValue(), "KPI Data Drill Down Fields Modified");
            }
            if (controlPanelGeneralDTO.getGeneralSettingValue().get("audittrailtype").toString().equalsIgnoreCase("KPI Schedule Form") && (controlPanelGeneralDTO.getGeneralSettingValue().containsKey("openformon") || controlPanelGeneralDTO.getGeneralSettingValue().containsKey("closeformon"))) {
                this.auditService.updateAudit("Control Panel", controlPanelGeneralDTO.getOrgId(), Long.valueOf(UserThreadLocal.get()).longValue(), "KPI Form Schedule Modified");
            }
        } else if (controlPanelGeneralDTO.getRisksetting() != null) {
            this.auditService.updateAudit("Control Panel", controlPanelGeneralDTO.getOrgId(), Long.valueOf(UserThreadLocal.get()).longValue(), "Risk Setting");
        }
    }

    public boolean checkThresholdValues(ControlPanelGeneralDTO controlPanelGeneralDTO) {
        Map stringObjectMap = controlPanelGeneralDTO.getGeneralSettingValue();
        boolean status = false;
        Map stringMap = this.controlPanelGeneralService.findCustomPerformanceByOrgId();
        if (stringObjectMap.get("customPerformance").toString().equalsIgnoreCase("true") || stringObjectMap.get("performance").toString().equalsIgnoreCase("true")) {
            if (stringMap.get("customPerformance").toString().equalsIgnoreCase(stringObjectMap.get("customPerformance").toString())) {
                if (!stringMap.get("performance").toString().equalsIgnoreCase(stringObjectMap.get("performance").toString())) {
                    status = true;
                    return status;
                }
            } else if (stringMap.get("performance").toString().equalsIgnoreCase(stringObjectMap.get("performance").toString())) {
                status = true;
                return status;
            }
        }
        if (stringObjectMap.get("performance").toString().equalsIgnoreCase("true")) {
            if (stringMap.containsKey("threshold1") && !stringMap.get("threshold1").toString().equalsIgnoreCase(stringObjectMap.get("threshold1").toString())) {
                status = true;
                return status;
            }
            if (stringMap.containsKey("threshold2") && !stringMap.get("threshold2").toString().equalsIgnoreCase(stringObjectMap.get("threshold2").toString())) {
                status = true;
                return status;
            }
            if (stringMap.containsKey("threshold2") && !stringMap.get("threshold2").toString().equalsIgnoreCase(stringObjectMap.get("threshold2").toString())) {
                status = true;
                return status;
            }
            if (stringMap.containsKey("threshold4") && !stringMap.get("threshold4").toString().equalsIgnoreCase(stringObjectMap.get("threshold4").toString())) {
                status = true;
                return status;
            }
            if (stringMap.containsKey("threshold5") && !stringMap.get("threshold5").toString().equalsIgnoreCase(stringObjectMap.get("threshold5").toString())) {
                status = true;
                return status;
            }
        } else if (stringObjectMap.get("customPerformance").toString().equalsIgnoreCase("true")) {
            if (stringMap.containsKey("threshold1") && !stringMap.get("threshold1").toString().equalsIgnoreCase(stringObjectMap.get("threshold1").toString())) {
                status = true;
                return status;
            }
            if (stringMap.containsKey("threshold2") && !stringMap.get("threshold2").toString().equalsIgnoreCase(stringObjectMap.get("threshold2").toString())) {
                status = true;
                return status;
            }
            if (stringMap.containsKey("threshold3") && !stringMap.get("threshold3").toString().equalsIgnoreCase(stringObjectMap.get("threshold3").toString())) {
                status = true;
                return status;
            }
            if (stringMap.containsKey("threshold4") && !stringMap.get("threshold4").toString().equalsIgnoreCase(stringObjectMap.get("threshold4").toString())) {
                status = true;
                return status;
            }
            if (stringMap.containsKey("threshold5") && !stringMap.get("threshold5").toString().equalsIgnoreCase(stringObjectMap.get("threshold5").toString())) {
                status = true;
                return status;
            }
        }
        return status;
    }
}

