/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.DashBoardPreferences
 *  com.estrat.service.db.bean.po.HomePagePreferences
 *  com.estrat.service.db.bean.po.PreferenceSubDetail
 *  com.estrat.service.db.dto.DashBoardPreferencesDTO
 *  com.estrat.service.db.dto.EmployeeDTO
 *  com.estrat.service.db.dto.HomePreferencesDTO
 *  com.estrat.service.db.dto.PreferenceDTO
 *  com.estrat.service.db.exception.RequestException
 *  com.estrat.service.db.resource.DashboardPreferencesController
 *  com.estrat.service.db.resource.util.UserThreadLocal
 *  com.estrat.service.db.service.AuditDetailsService
 *  com.estrat.service.db.service.DashboardPreferenceService
 *  com.estrat.service.db.service.EmployeeService
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

import com.estrat.service.db.bean.po.DashBoardPreferences;
import com.estrat.service.db.bean.po.HomePagePreferences;
import com.estrat.service.db.bean.po.PreferenceSubDetail;
import com.estrat.service.db.dto.DashBoardPreferencesDTO;
import com.estrat.service.db.dto.EmployeeDTO;
import com.estrat.service.db.dto.HomePreferencesDTO;
import com.estrat.service.db.dto.PreferenceDTO;
import com.estrat.service.db.exception.RequestException;
import com.estrat.service.db.resource.util.UserThreadLocal;
import com.estrat.service.db.service.AuditDetailsService;
import com.estrat.service.db.service.DashboardPreferenceService;
import com.estrat.service.db.service.EmployeeService;
import java.text.ParseException;
import java.time.LocalDateTime;
import java.util.List;
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
public class DashboardPreferencesController {
    @Autowired
    protected DashboardPreferenceService dashboardPreferenceService;
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private AuditDetailsService auditService;

    @PostMapping(value={"/dashBoardPreferences"})
    public ResponseEntity<DashBoardPreferencesDTO> saveDashBoardPreferences(@RequestBody DashBoardPreferencesDTO dashBoardPreferencesDTO, HttpServletRequest request) throws RequestException {
        EmployeeDTO employeeDTO = new EmployeeDTO();
        if (dashBoardPreferencesDTO.getCreatedBy() != 0L) {
            employeeDTO.setEmployeeId(dashBoardPreferencesDTO.getCreatedBy());
            dashBoardPreferencesDTO.getDashBoardPreferencesValue().put("createdByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (dashBoardPreferencesDTO.getUpdatedBy() != 0L) {
            employeeDTO.setEmployeeId(dashBoardPreferencesDTO.getUpdatedBy());
            dashBoardPreferencesDTO.getDashBoardPreferencesValue().put("updatedByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (dashBoardPreferencesDTO.getOwner() != 0L) {
            employeeDTO.setEmployeeId(dashBoardPreferencesDTO.getOwner());
            dashBoardPreferencesDTO.getDashBoardPreferencesValue().put("ownerName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        DashBoardPreferences dashBoardPreferences = new DashBoardPreferences(dashBoardPreferencesDTO);
        dashBoardPreferences.setCreatedTime(LocalDateTime.now());
        DashBoardPreferencesDTO boardPreferencesDTO = this.dashboardPreferenceService.save(dashBoardPreferences);
        if (boardPreferencesDTO.getDashBoardPreferencesValue().containsKey("chartdisplayname") && (boardPreferencesDTO.getDashBoardPreferencesValue().get("chartdisplayname").toString().equalsIgnoreCase("Drill Down Table") || boardPreferencesDTO.getDashBoardPreferencesValue().get("chartdisplayname").toString().equalsIgnoreCase("Risk Register") || boardPreferencesDTO.getDashBoardPreferencesValue().get("chartdisplayname").toString().equalsIgnoreCase("Review Monitoring") || boardPreferencesDTO.getDashBoardPreferencesValue().get("chartdisplayname").toString().equalsIgnoreCase("Initiative Register") || boardPreferencesDTO.getDashBoardPreferencesValue().get("chartdisplayname").toString().equalsIgnoreCase("KPI Register") || boardPreferencesDTO.getDashBoardPreferencesValue().get("chartdisplayname").toString().equalsIgnoreCase("Data Table"))) {
            this.auditService.saveAudit("Cockpit", boardPreferencesDTO.getId(), Long.valueOf(UserThreadLocal.get()).longValue(), "Cockpit Table Created");
        } else if (boardPreferencesDTO.getDashBoardPreferencesValue().containsKey("cardtypeselect") && boardPreferencesDTO.getDashBoardPreferencesValue().get("cardtypeselect").toString().equalsIgnoreCase("Text")) {
            this.auditService.saveAudit("Cockpit", boardPreferencesDTO.getId(), Long.valueOf(UserThreadLocal.get()).longValue(), "Cockpit Text Created");
        } else if (boardPreferencesDTO.getDashBoardPreferencesValue().containsKey("type") && (boardPreferencesDTO.getDashBoardPreferencesValue().get("type").toString().equalsIgnoreCase("BubbleChart") || boardPreferencesDTO.getDashBoardPreferencesValue().get("type").toString().equalsIgnoreCase("ColumnChart") || boardPreferencesDTO.getDashBoardPreferencesValue().get("type").toString().equalsIgnoreCase("LineChart") || boardPreferencesDTO.getDashBoardPreferencesValue().get("type").toString().equalsIgnoreCase("AreaChart") || boardPreferencesDTO.getDashBoardPreferencesValue().get("type").toString().equalsIgnoreCase("WaterfallChart") || boardPreferencesDTO.getDashBoardPreferencesValue().get("type").toString().equalsIgnoreCase("MultiAxis") || boardPreferencesDTO.getDashBoardPreferencesValue().get("type").toString().equalsIgnoreCase("StackedChart") || boardPreferencesDTO.getDashBoardPreferencesValue().get("type").toString().equalsIgnoreCase("RadialMulti") || boardPreferencesDTO.getDashBoardPreferencesValue().get("type").toString().equalsIgnoreCase("HeatMap") || boardPreferencesDTO.getDashBoardPreferencesValue().get("type").toString().equalsIgnoreCase("GanttChart") || boardPreferencesDTO.getDashBoardPreferencesValue().get("type").toString().equalsIgnoreCase("PieChart"))) {
            this.auditService.saveAudit("Cockpit", boardPreferencesDTO.getId(), Long.valueOf(UserThreadLocal.get()).longValue(), "Cockpit Chart Created");
        }
        return new ResponseEntity((Object)boardPreferencesDTO, HttpStatus.OK);
    }

    @PutMapping(value={"/dashBoardPreferences"})
    public ResponseEntity<DashBoardPreferencesDTO> updateDashBoardPreferences(@RequestBody DashBoardPreferencesDTO dashBoardPreferencesDTO, HttpServletRequest request) throws RequestException {
        EmployeeDTO employeeDTO = new EmployeeDTO();
        if (dashBoardPreferencesDTO.getCreatedBy() != 0L) {
            employeeDTO.setEmployeeId(dashBoardPreferencesDTO.getCreatedBy());
            dashBoardPreferencesDTO.getDashBoardPreferencesValue().put("createdByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (dashBoardPreferencesDTO.getUpdatedBy() != 0L) {
            employeeDTO.setEmployeeId(dashBoardPreferencesDTO.getUpdatedBy());
            dashBoardPreferencesDTO.getDashBoardPreferencesValue().put("updatedByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (dashBoardPreferencesDTO.getOwner() != 0L) {
            employeeDTO.setEmployeeId(dashBoardPreferencesDTO.getOwner());
            dashBoardPreferencesDTO.getDashBoardPreferencesValue().put("ownerName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        DashBoardPreferences dashBoardPreferences = new DashBoardPreferences(dashBoardPreferencesDTO);
        dashBoardPreferences.setUpdatedTime(LocalDateTime.now());
        DashBoardPreferencesDTO dashBoardPreferencesResponseDTO = this.dashboardPreferenceService.save(dashBoardPreferences);
        if (dashBoardPreferencesResponseDTO.getDashBoardPreferencesValue().containsKey("chartdisplayname") && (dashBoardPreferencesResponseDTO.getDashBoardPreferencesValue().get("chartdisplayname").toString().equalsIgnoreCase("Drill Down Table") || dashBoardPreferencesResponseDTO.getDashBoardPreferencesValue().get("chartdisplayname").toString().equalsIgnoreCase("Risk Register") || dashBoardPreferencesResponseDTO.getDashBoardPreferencesValue().get("chartdisplayname").toString().equalsIgnoreCase("Review Monitoring") || dashBoardPreferencesResponseDTO.getDashBoardPreferencesValue().get("chartdisplayname").toString().equalsIgnoreCase("Initiative Register") || dashBoardPreferencesResponseDTO.getDashBoardPreferencesValue().get("chartdisplayname").toString().equalsIgnoreCase("KPI Register") || dashBoardPreferencesResponseDTO.getDashBoardPreferencesValue().get("chartdisplayname").toString().equalsIgnoreCase("Data Table"))) {
            this.auditService.saveAudit("Cockpit", dashBoardPreferencesResponseDTO.getId(), Long.valueOf(UserThreadLocal.get()).longValue(), "Cockpit Table Modified");
        } else if (dashBoardPreferencesResponseDTO.getDashBoardPreferencesValue().containsKey("cardtypeselect") && dashBoardPreferencesResponseDTO.getDashBoardPreferencesValue().get("cardtypeselect").toString().equalsIgnoreCase("Text")) {
            this.auditService.saveAudit("Cockpit", dashBoardPreferencesResponseDTO.getId(), Long.valueOf(UserThreadLocal.get()).longValue(), "Cockpit Text Modified");
        } else if (dashBoardPreferencesResponseDTO.getDashBoardPreferencesValue().containsKey("type") && (dashBoardPreferencesResponseDTO.getDashBoardPreferencesValue().get("type").toString().equalsIgnoreCase("BubbleChart") || dashBoardPreferencesResponseDTO.getDashBoardPreferencesValue().get("type").toString().equalsIgnoreCase("ColumnChart") || dashBoardPreferencesResponseDTO.getDashBoardPreferencesValue().get("type").toString().equalsIgnoreCase("LineChart") || dashBoardPreferencesResponseDTO.getDashBoardPreferencesValue().get("type").toString().equalsIgnoreCase("AreaChart") || dashBoardPreferencesResponseDTO.getDashBoardPreferencesValue().get("type").toString().equalsIgnoreCase("WaterfallChart") || dashBoardPreferencesResponseDTO.getDashBoardPreferencesValue().get("type").toString().equalsIgnoreCase("MultiAxis") || dashBoardPreferencesResponseDTO.getDashBoardPreferencesValue().get("type").toString().equalsIgnoreCase("StackedChart") || dashBoardPreferencesResponseDTO.getDashBoardPreferencesValue().get("type").toString().equalsIgnoreCase("RadialMulti") || dashBoardPreferencesResponseDTO.getDashBoardPreferencesValue().get("type").toString().equalsIgnoreCase("HeatMap") || dashBoardPreferencesResponseDTO.getDashBoardPreferencesValue().get("type").toString().equalsIgnoreCase("GanttChart") || dashBoardPreferencesResponseDTO.getDashBoardPreferencesValue().get("type").toString().equalsIgnoreCase("PieChart"))) {
            this.auditService.saveAudit("Cockpit", dashBoardPreferencesResponseDTO.getId(), Long.valueOf(UserThreadLocal.get()).longValue(), "Cockpit Chart Modified");
        }
        return new ResponseEntity((Object)dashBoardPreferencesResponseDTO, HttpStatus.OK);
    }

    @GetMapping(value={"/dashBoardPreferences/{id}"})
    public ResponseEntity<DashBoardPreferencesDTO> getDashBoardPreferencesById(@PathVariable(value="id") Long id) throws RequestException, ParseException {
        DashBoardPreferencesDTO dashBoardPreferencesDTO = null;
        if (this.dashboardPreferenceService.findById(id.longValue()).isPresent()) {
            dashBoardPreferencesDTO = new DashBoardPreferencesDTO((DashBoardPreferences)this.dashboardPreferenceService.findById(id.longValue()).get());
            this.dashboardPreferenceService.populateActualData(dashBoardPreferencesDTO);
        } else {
            dashBoardPreferencesDTO = new DashBoardPreferencesDTO();
        }
        return new ResponseEntity((Object)dashBoardPreferencesDTO, HttpStatus.OK);
    }

    @DeleteMapping(value={"/dashBoardPreferences/{id}"})
    public ResponseEntity<DashBoardPreferencesDTO> deleteDashBoardPreferencesById(@PathVariable(value="id") Long id, HttpServletRequest request) throws RequestException {
        return new ResponseEntity((Object)this.dashboardPreferenceService.delete(id.longValue()), HttpStatus.OK);
    }

    @GetMapping(value={"/dashBoardPreferencesList/{empId}"})
    public ResponseEntity<List<DashBoardPreferencesDTO>> findAllByEmpId(@PathVariable(value="empId") Long empId, @RequestParam(value="pageId", required=false) String pageId) throws RequestException {
        List dashBoardPreferencesDTOsList = this.dashboardPreferenceService.findAllByEmpId(empId.longValue(), pageId);
        return new ResponseEntity((Object)dashBoardPreferencesDTOsList, HttpStatus.OK);
    }

    @GetMapping(value={"/homePagePreferences/{empId}"})
    public ResponseEntity<HomePreferencesDTO> findByEmpId(@PathVariable(value="empId") Long empId) throws RequestException {
        HomePreferencesDTO homePreferencesDTO = new HomePreferencesDTO();
        HomePagePreferences homePagePreferences = this.dashboardPreferenceService.findByEmpId(empId.longValue());
        if (homePagePreferences != null) {
            homePreferencesDTO.setId(homePagePreferences.getId());
            homePreferencesDTO.setPageId(homePagePreferences.getPageId());
            homePreferencesDTO.setPageName(homePagePreferences.getPageName());
        }
        return new ResponseEntity((Object)homePreferencesDTO, HttpStatus.OK);
    }

    @PostMapping(value={"/homePagePreferences"})
    public ResponseEntity<HomePreferencesDTO> HomePagePreferences(@RequestBody HomePreferencesDTO homePagePreferencesDTO, HttpServletRequest request) throws RequestException {
        HomePagePreferences homePagePreferences = new HomePagePreferences(homePagePreferencesDTO);
        homePagePreferences.setUpdatedDt(LocalDateTime.now());
        HomePreferencesDTO homePreferencesResponseDTO = this.dashboardPreferenceService.save(homePagePreferences);
        return new ResponseEntity((Object)homePreferencesResponseDTO, HttpStatus.OK);
    }

    @PostMapping(value={"/preferences"})
    public ResponseEntity<PreferenceDTO> saveInitiativesDetails(@RequestBody PreferenceDTO preferenceDTO, HttpServletRequest request) throws RequestException {
        PreferenceSubDetail pref = new PreferenceSubDetail(preferenceDTO);
        PreferenceDTO responseDTO = this.dashboardPreferenceService.savePreference(pref);
        return new ResponseEntity((Object)responseDTO, HttpStatus.OK);
    }

    @PutMapping(value={"/preferences"})
    public ResponseEntity<PreferenceDTO> updateInitiativesDetails(@RequestBody PreferenceDTO preferenceDTO, HttpServletRequest request) throws RequestException {
        PreferenceSubDetail pref = new PreferenceSubDetail(preferenceDTO);
        PreferenceDTO responseDTO = this.dashboardPreferenceService.savePreference(pref);
        return new ResponseEntity((Object)responseDTO, HttpStatus.OK);
    }

    @GetMapping(value={"/preferences/{id}"})
    public ResponseEntity<PreferenceDTO> getPreferenceById(@PathVariable(value="id") Long id) throws RequestException {
        PreferenceDTO preferenceDTO = null;
        preferenceDTO = this.dashboardPreferenceService.findByPreferId(id.longValue()).isPresent() ? new PreferenceDTO((PreferenceSubDetail)this.dashboardPreferenceService.findByPreferId(id.longValue()).get()) : new PreferenceDTO();
        return new ResponseEntity((Object)preferenceDTO, HttpStatus.OK);
    }
}

