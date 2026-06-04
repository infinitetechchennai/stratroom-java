/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.KPI
 *  com.estrat.service.db.bean.po.SWOTAnalysis
 *  com.estrat.service.db.cache.DBCache
 *  com.estrat.service.db.dto.EmployeeDTO
 *  com.estrat.service.db.dto.KPIDTO
 *  com.estrat.service.db.dto.SWOTAnalysisDTO
 *  com.estrat.service.db.exception.RequestException
 *  com.estrat.service.db.resource.SwotAnalysisController
 *  com.estrat.service.db.resource.util.NotificationUtil
 *  com.estrat.service.db.resource.util.UserThreadLocal
 *  com.estrat.service.db.service.AuditDetailsService
 *  com.estrat.service.db.service.EmployeeService
 *  com.estrat.service.db.service.KPIService
 *  com.estrat.service.db.service.SwotAnalysisService
 *  com.estrat.service.db.service.TaskDetailsService
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

import com.estrat.service.db.bean.po.KPI;
import com.estrat.service.db.bean.po.SWOTAnalysis;
import com.estrat.service.db.cache.DBCache;
import com.estrat.service.db.dto.EmployeeDTO;
import com.estrat.service.db.dto.KPIDTO;
import com.estrat.service.db.dto.SWOTAnalysisDTO;
import com.estrat.service.db.exception.RequestException;
import com.estrat.service.db.resource.util.NotificationUtil;
import com.estrat.service.db.resource.util.UserThreadLocal;
import com.estrat.service.db.service.AuditDetailsService;
import com.estrat.service.db.service.EmployeeService;
import com.estrat.service.db.service.KPIService;
import com.estrat.service.db.service.SwotAnalysisService;
import com.estrat.service.db.service.TaskDetailsService;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
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
public class SwotAnalysisController {
    @Autowired
    protected SwotAnalysisService swotAnalysisService;
    @Autowired
    protected EmployeeService employeeService;
    @Autowired
    protected KPIService kpiService;
    @Autowired
    private DBCache dbCache;
    @Autowired
    private AuditDetailsService auditService;
    @Autowired
    private NotificationUtil notification;
    @Autowired
    private TaskDetailsService taskDetailsService;

    @PostMapping(value={"/swotAnalysis"})
    public ResponseEntity<SWOTAnalysisDTO> saveSWOTAnalysisDetails(@RequestBody SWOTAnalysisDTO swotAnalysisDTO, HttpServletRequest request) throws RequestException {
        EmployeeDTO employeeDTO = new EmployeeDTO();
        if (swotAnalysisDTO.getCreatedBy() != 0L) {
            employeeDTO.setEmployeeId(swotAnalysisDTO.getCreatedBy());
            swotAnalysisDTO.getSwotAnalysisValue().put("createdByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (swotAnalysisDTO.getUpdatedBy() != 0L) {
            employeeDTO.setEmployeeId(swotAnalysisDTO.getUpdatedBy());
            swotAnalysisDTO.getSwotAnalysisValue().put("updatedByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (swotAnalysisDTO.getOwner() != 0L) {
            employeeDTO.setEmployeeId(swotAnalysisDTO.getOwner());
            swotAnalysisDTO.getSwotAnalysisValue().put("ownerName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        this.swotAnalysisService.ImpactPapulate(swotAnalysisDTO);
        SWOTAnalysis SWOTAnalysis2 = new SWOTAnalysis(swotAnalysisDTO);
        SWOTAnalysis2.setCreatedTime(LocalDateTime.now());
        SWOTAnalysisDTO responseSWOTAnalysis = this.swotAnalysisService.save(SWOTAnalysis2);
        this.notification.saveNotification((Object)responseSWOTAnalysis, UserThreadLocal.getHeaders());
        this.updateAuditDetails(responseSWOTAnalysis, "created");
        return new ResponseEntity((Object)responseSWOTAnalysis, HttpStatus.OK);
    }

    @GetMapping(value={"/swotAnalysis/{id}"})
    public ResponseEntity<SWOTAnalysisDTO> getSWOTAnalysisDetailsById(@PathVariable(value="id") Long id) throws RequestException {
        SWOTAnalysisDTO swotAnalysisDTO = new SWOTAnalysisDTO((SWOTAnalysis)this.swotAnalysisService.findById(id.longValue()).get());
        return new ResponseEntity((Object)swotAnalysisDTO, HttpStatus.OK);
    }

    @PutMapping(value={"/swotAnalysis"})
    public ResponseEntity<SWOTAnalysisDTO> updateSWOTAnalysisDetailsById(@RequestBody SWOTAnalysisDTO swotAnalysisDTO) throws RequestException {
        Optional kpiOptional;
        EmployeeDTO employeeDTO = new EmployeeDTO();
        if (swotAnalysisDTO.getCreatedBy() != 0L) {
            employeeDTO.setEmployeeId(swotAnalysisDTO.getCreatedBy());
            swotAnalysisDTO.getSwotAnalysisValue().put("createdByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (swotAnalysisDTO.getUpdatedBy() != 0L) {
            employeeDTO.setEmployeeId(swotAnalysisDTO.getUpdatedBy());
            swotAnalysisDTO.getSwotAnalysisValue().put("updatedByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (swotAnalysisDTO.getOwner() != 0L) {
            employeeDTO.setEmployeeId(swotAnalysisDTO.getOwner());
            swotAnalysisDTO.getSwotAnalysisValue().put("ownerName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (StringUtils.isNotEmpty((CharSequence)swotAnalysisDTO.getSwotAnalysisValue().get("impact").toString()) && (kpiOptional = this.kpiService.findById(Long.valueOf(swotAnalysisDTO.getSwotAnalysisValue().get("impact").toString()).longValue())).isPresent()) {
            KPIDTO kpidto = new KPIDTO((KPI)kpiOptional.get());
            swotAnalysisDTO.getSwotAnalysisValue().put("impact_name", kpidto.getKpiName());
        }
        SWOTAnalysis SWOTAnalysis2 = new SWOTAnalysis(swotAnalysisDTO);
        SWOTAnalysis2.setUpdatedTime(LocalDateTime.now());
        SWOTAnalysisDTO responseSWOTAnalysisDTO = this.swotAnalysisService.save(SWOTAnalysis2);
        this.notification.saveNotification((Object)responseSWOTAnalysisDTO, UserThreadLocal.getHeaders());
        if (!swotAnalysisDTO.isRecommendationmethod()) {
            this.updateAuditDetails(responseSWOTAnalysisDTO, "updated");
        }
        return new ResponseEntity((Object)responseSWOTAnalysisDTO, HttpStatus.OK);
    }

    @DeleteMapping(value={"/swotAnalysis/{id}"})
    public ResponseEntity<SWOTAnalysisDTO> deleteSWOTAnalysisDetailsById(@PathVariable(value="id") Long id, HttpServletRequest request) throws RequestException {
        Optional swotAnalysis = this.swotAnalysisService.findById(id.longValue());
        if (swotAnalysis.isPresent()) {
            SWOTAnalysis swotAnalysis1 = (SWOTAnalysis)swotAnalysis.get();
            swotAnalysis1.setActive(1);
            this.deleteAuditDetails(id, Long.valueOf(UserThreadLocal.get()), swotAnalysis1.getFlagType());
            this.swotAnalysisService.delete(swotAnalysis1);
            this.dbCache.remove((Object)("swotAnalysisListByEmpId" + UserThreadLocal.get()), "dbCache");
            return new ResponseEntity(HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    @GetMapping(value={"/retrieveSwotAnalysisList/{empId}"})
    public ResponseEntity<List<SWOTAnalysisDTO>> findAllByEmpId(@PathVariable(value="empId") Long empId, @RequestParam(value="flagType") String flagType, @RequestParam(value="pageId", required=false) String pageId) throws RequestException {
        List swotAnalysisDTOList = null;
        swotAnalysisDTOList = StringUtils.isNotEmpty((CharSequence)pageId) ? this.swotAnalysisService.findAll(empId.longValue(), flagType, Long.valueOf(pageId).longValue()) : this.swotAnalysisService.findAll(empId.longValue(), flagType);
        return new ResponseEntity((Object)swotAnalysisDTOList, HttpStatus.OK);
    }

    private void updateAuditDetails(SWOTAnalysisDTO swotAnalysisDTO, String type) {
        if (type.equals("created")) {
            if (swotAnalysisDTO.getFlagType().equals("Strengths")) {
                this.auditService.saveAudit("SWOT", swotAnalysisDTO.getId(), swotAnalysisDTO.getCreatedBy(), "Strength Created");
            } else if (swotAnalysisDTO.getFlagType().equals("Weaknesses")) {
                this.auditService.saveAudit("SWOT", swotAnalysisDTO.getId(), swotAnalysisDTO.getCreatedBy(), "Weakness Created");
            } else if (swotAnalysisDTO.getFlagType().equals("Oppurtunities")) {
                this.auditService.saveAudit("SWOT", swotAnalysisDTO.getId(), swotAnalysisDTO.getCreatedBy(), "Opportunities Created");
            } else if (swotAnalysisDTO.getFlagType().equals("Threats")) {
                this.auditService.saveAudit("SWOT", swotAnalysisDTO.getId(), swotAnalysisDTO.getCreatedBy(), "Threat Created");
            }
        } else if (type.equals("updated")) {
            if (swotAnalysisDTO.getFlagType().equals("Strengths")) {
                this.auditService.saveAudit("SWOT", swotAnalysisDTO.getId(), swotAnalysisDTO.getUpdatedBy(), "Strength Modified");
            } else if (swotAnalysisDTO.getFlagType().equals("Weaknesses")) {
                this.auditService.saveAudit("SWOT", swotAnalysisDTO.getId(), swotAnalysisDTO.getUpdatedBy(), "Weakness Modified");
            } else if (swotAnalysisDTO.getFlagType().equals("Oppurtunities")) {
                this.auditService.saveAudit("SWOT", swotAnalysisDTO.getId(), swotAnalysisDTO.getUpdatedBy(), "Opportunities Modified");
            } else if (swotAnalysisDTO.getFlagType().equals("Threats")) {
                this.auditService.saveAudit("SWOT", swotAnalysisDTO.getId(), swotAnalysisDTO.getUpdatedBy(), "Threat Modified");
            }
        }
    }

    private void deleteAuditDetails(Long id, Long userId, String type) {
        if (type.equals("Strengths")) {
            this.auditService.saveAudit("SWOT", id.longValue(), userId.longValue(), "Strength Deleted");
        } else if (type.equals("Weaknesses")) {
            this.auditService.saveAudit("SWOT", id.longValue(), userId.longValue(), "Weakness Deleted");
        } else if (type.equals("Oppurtunities")) {
            this.auditService.saveAudit("SWOT", id.longValue(), userId.longValue(), "Opportunities Deleted");
        } else if (type.equals("Threats")) {
            this.auditService.saveAudit("SWOT", id.longValue(), userId.longValue(), "Threat Deleted");
        }
    }
}

