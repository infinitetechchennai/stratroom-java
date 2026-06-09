/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.ChartDetails
 *  com.estrat.service.db.dto.ChartDTO
 *  com.estrat.service.db.dto.EmployeeDTO
 *  com.estrat.service.db.exception.RequestException
 *  com.estrat.service.db.resource.ChartServiceController
 *  com.estrat.service.db.resource.util.UserThreadLocal
 *  com.estrat.service.db.service.AuditDetailsService
 *  com.estrat.service.db.service.ChartService
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

import com.estrat.service.db.bean.po.ChartDetails;
import com.estrat.service.db.dto.ChartDTO;
import com.estrat.service.db.dto.EmployeeDTO;
import com.estrat.service.db.exception.RequestException;
import com.estrat.service.db.resource.util.UserThreadLocal;
import com.estrat.service.db.service.AuditDetailsService;
import com.estrat.service.db.service.ChartService;
import com.estrat.service.db.service.EmployeeService;
import java.time.LocalDateTime;
import java.util.List;
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
public class ChartServiceController {
    @Autowired
    protected ChartService chartService;
    @Autowired
    protected EmployeeService employeeService;
    @Autowired
    protected AuditDetailsService auditService;

    @PostMapping(value={"/charts"})
    public ResponseEntity<ChartDTO> saveChartsDetails(@RequestBody ChartDTO chartDTO, HttpServletRequest request) throws RequestException {
        EmployeeDTO employeeDTO = new EmployeeDTO();
        if (chartDTO.getCreatedBy() != 0L) {
            employeeDTO.setEmployeeId(chartDTO.getCreatedBy());
            chartDTO.getChartValue().put("createdByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (chartDTO.getUpdatedBy() != 0L) {
            employeeDTO.setEmployeeId(chartDTO.getUpdatedBy());
            chartDTO.getChartValue().put("updatedByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (chartDTO.getOwner() != 0L) {
            employeeDTO.setEmployeeId(chartDTO.getOwner());
            chartDTO.getChartValue().put("ownerName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        ChartDetails chartDetails = new ChartDetails(chartDTO);
        chartDetails.setCreatedTime(LocalDateTime.now());
        ChartDTO chartDTO1 = this.chartService.save(chartDetails);
        if (chartDTO1.getChartValue().get("chartdisplayname").toString().equalsIgnoreCase("Drill Down Table")) {
            this.auditService.saveAudit("Charts", chartDTO1.getId(), Long.valueOf(UserThreadLocal.get()).longValue(), "Drilldown Chart Created");
        } else {
            this.auditService.saveAudit("Charts", chartDTO1.getId(), Long.valueOf(UserThreadLocal.get()).longValue(), "Chart Created");
        }
        return new ResponseEntity((Object)chartDTO1, HttpStatus.OK);
    }

    @GetMapping(value={"/charts/{id}"})
    public ResponseEntity<ChartDTO> getChartsDetailsById(@PathVariable(value="id") Long id) throws RequestException {
        System.out.println("****************************************");
        System.out.println("chart - id :: " + id);
        System.out.println("chart data :: " + this.chartService.findById(id.longValue()).get());
        ChartDTO chartDTO = new ChartDTO((ChartDetails)this.chartService.findById(id.longValue()).get());
        this.chartService.populateActualData(chartDTO);
        System.out.println("****************************************");
        return new ResponseEntity((Object)chartDTO, HttpStatus.OK);
    }

    @PutMapping(value={"/charts"})
    public ResponseEntity<ChartDTO> updateChartsDetailsById(@RequestBody ChartDTO chartDTO) throws RequestException {
        EmployeeDTO employeeDTO = new EmployeeDTO();
        System.out.println("put apis called :: " + chartDTO);
        if (chartDTO.getCreatedBy() != 0L) {
            employeeDTO.setEmployeeId(chartDTO.getCreatedBy());
            chartDTO.getChartValue().put("createdByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (chartDTO.getUpdatedBy() != 0L) {
            employeeDTO.setEmployeeId(chartDTO.getUpdatedBy());
            chartDTO.getChartValue().put("updatedByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (chartDTO.getOwner() != 0L) {
            employeeDTO.setEmployeeId(chartDTO.getOwner());
            chartDTO.getChartValue().put("ownerName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        ChartDetails chartDetails = new ChartDetails(chartDTO);
        chartDetails.setUpdatedTime(LocalDateTime.now());
        ChartDTO responseChartDTO = this.chartService.save(chartDetails);
        if (responseChartDTO.getChartValue().get("chartdisplayname").toString().equalsIgnoreCase("Drill Down Table")) {
            this.auditService.saveAudit("Charts", responseChartDTO.getId(), Long.valueOf(UserThreadLocal.get()).longValue(), "Drilldown Chart Modified");
        } else {
            this.auditService.saveAudit("Charts", responseChartDTO.getId(), Long.valueOf(UserThreadLocal.get()).longValue(), "Chart Modified");
        }
        return new ResponseEntity((Object)responseChartDTO, HttpStatus.OK);
    }

    @DeleteMapping(value={"/charts/{id}"})
    public ResponseEntity<ChartDTO> deleteChartDetailsById(@PathVariable(value="id") Long id, HttpServletRequest request) throws RequestException {
        Optional chartDetails = this.chartService.findById(id.longValue());
        if (chartDetails.isPresent()) {
            ChartDetails chartDetails1 = (ChartDetails)chartDetails.get();
            ChartDTO chartDTO = new ChartDTO(chartDetails1);
            if (chartDTO.getChartValue().get("chartdisplayname").toString().equalsIgnoreCase("Drill Down Table")) {
                this.auditService.saveAudit("Charts", chartDTO.getId(), Long.valueOf(UserThreadLocal.get()).longValue(), "Drilldown Chart Deleted");
            } else {
                this.auditService.saveAudit("Charts", chartDTO.getId(), Long.valueOf(UserThreadLocal.get()).longValue(), "Chart Deleted");
            }
            chartDetails1.setActive(1);
            this.chartService.delete(chartDetails1);
            return new ResponseEntity(HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    @GetMapping(value={"/retrieveChartsList/{empId}"})
    public ResponseEntity<List<ChartDTO>> findAllByEmpId(@PathVariable(value="empId") Long empId, @RequestParam(value="pageId", required=false) String pageId) throws RequestException {
        List chartDTOList = this.chartService.findAll(empId.longValue(), pageId);
        return new ResponseEntity((Object)chartDTOList, HttpStatus.OK);
    }
}

