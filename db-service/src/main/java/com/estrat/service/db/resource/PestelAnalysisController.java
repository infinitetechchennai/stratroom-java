/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.KPI
 *  com.estrat.service.db.bean.po.PestelAnalysis
 *  com.estrat.service.db.cache.DBCache
 *  com.estrat.service.db.dto.EmployeeDTO
 *  com.estrat.service.db.dto.KPIDTO
 *  com.estrat.service.db.dto.PestelAnalysisDTO
 *  com.estrat.service.db.exception.RequestException
 *  com.estrat.service.db.resource.PestelAnalysisController
 *  com.estrat.service.db.resource.util.NotificationUtil
 *  com.estrat.service.db.resource.util.UserThreadLocal
 *  com.estrat.service.db.service.AuditDetailsService
 *  com.estrat.service.db.service.EmployeeService
 *  com.estrat.service.db.service.KPIService
 *  com.estrat.service.db.service.PestelAnalysisService
 *  javax.servlet.http.HttpServletRequest
 *  org.apache.commons.lang3.StringUtils
 *  org.apache.log4j.Logger
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
import com.estrat.service.db.bean.po.PestelAnalysis;
import com.estrat.service.db.cache.DBCache;
import com.estrat.service.db.dto.EmployeeDTO;
import com.estrat.service.db.dto.KPIDTO;
import com.estrat.service.db.dto.PestelAnalysisDTO;
import com.estrat.service.db.exception.RequestException;
import com.estrat.service.db.resource.util.NotificationUtil;
import com.estrat.service.db.resource.util.UserThreadLocal;
import com.estrat.service.db.service.AuditDetailsService;
import com.estrat.service.db.service.EmployeeService;
import com.estrat.service.db.service.KPIService;
import com.estrat.service.db.service.PestelAnalysisService;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import javax.servlet.http.HttpServletRequest;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
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
public class PestelAnalysisController {
    private Logger log = Logger.getLogger(PestelAnalysisController.class);
    @Autowired
    protected PestelAnalysisService pestelAnalysisService;
    @Autowired
    protected EmployeeService employeeService;
    @Autowired
    protected KPIService kpiService;
    @Autowired
    private AuditDetailsService auditService;
    @Autowired
    private NotificationUtil notification;
    @Autowired
    private DBCache dbCache;

    @PostMapping(value={"/pestelAnalysis"})
    public ResponseEntity<PestelAnalysisDTO> savePestelAnalysisDetails(@RequestBody PestelAnalysisDTO pestelAnalysisDTO, HttpServletRequest request) throws RequestException {
        Optional kpiOptional;
        EmployeeDTO employeeDTO = new EmployeeDTO();
        if (pestelAnalysisDTO.getCreatedBy() != 0L) {
            employeeDTO.setEmployeeId(pestelAnalysisDTO.getCreatedBy());
            pestelAnalysisDTO.getPestelAnalysisValue().put("createdByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (pestelAnalysisDTO.getUpdatedBy() != 0L) {
            employeeDTO.setEmployeeId(pestelAnalysisDTO.getUpdatedBy());
            pestelAnalysisDTO.getPestelAnalysisValue().put("updatedByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (pestelAnalysisDTO.getOwner() != 0L) {
            employeeDTO.setEmployeeId(pestelAnalysisDTO.getOwner());
            pestelAnalysisDTO.getPestelAnalysisValue().put("ownerName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (StringUtils.isNotEmpty((CharSequence)pestelAnalysisDTO.getPestelAnalysisValue().get("impact").toString()) && (kpiOptional = this.kpiService.findById(Long.valueOf(pestelAnalysisDTO.getPestelAnalysisValue().get("impact").toString()).longValue())).isPresent()) {
            KPIDTO kpidto = new KPIDTO((KPI)kpiOptional.get());
            pestelAnalysisDTO.getPestelAnalysisValue().put("impact_name", kpidto.getKpiName());
        }
        PestelAnalysis pestelAnalysis = new PestelAnalysis(pestelAnalysisDTO);
        pestelAnalysis.setCreatedTime(LocalDateTime.now());
        PestelAnalysisDTO responsePestelAnalysis = this.pestelAnalysisService.save(pestelAnalysis);
        this.notification.saveNotification((Object)responsePestelAnalysis, UserThreadLocal.getHeaders());
        this.updateAuditDetails(responsePestelAnalysis, "created");
        return new ResponseEntity((Object)responsePestelAnalysis, HttpStatus.OK);
    }

    @GetMapping(value={"/pestelAnalysis/{id}"})
    public ResponseEntity<PestelAnalysisDTO> getPestelAnalysisDetailsById(@PathVariable(value="id") Long id) throws RequestException {
        PestelAnalysisDTO pestelAnalysisDTO = new PestelAnalysisDTO((PestelAnalysis)this.pestelAnalysisService.findById(id.longValue()).get());
        return new ResponseEntity((Object)pestelAnalysisDTO, HttpStatus.OK);
    }

    @PutMapping(value={"/pestelAnalysis"})
    public ResponseEntity<PestelAnalysisDTO> updatePestelAnalysisDetailsById(@RequestBody PestelAnalysisDTO pestelAnalysisDTO) throws RequestException {
        EmployeeDTO employeeDTO = new EmployeeDTO();
        if (pestelAnalysisDTO.getCreatedBy() != 0L) {
            employeeDTO.setEmployeeId(pestelAnalysisDTO.getCreatedBy());
            pestelAnalysisDTO.getPestelAnalysisValue().put("createdByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (pestelAnalysisDTO.getUpdatedBy() != 0L) {
            employeeDTO.setEmployeeId(pestelAnalysisDTO.getUpdatedBy());
            pestelAnalysisDTO.getPestelAnalysisValue().put("updatedByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (pestelAnalysisDTO.getOwner() != 0L) {
            employeeDTO.setEmployeeId(pestelAnalysisDTO.getOwner());
            pestelAnalysisDTO.getPestelAnalysisValue().put("ownerName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (pestelAnalysisDTO.getPestelAnalysisValue().get("impact") != "") {
            Optional kpiOptional = this.kpiService.findById(Long.valueOf(pestelAnalysisDTO.getPestelAnalysisValue().get("impact").toString()).longValue());
            if (kpiOptional.isPresent()) {
                KPIDTO kpidto = new KPIDTO((KPI)kpiOptional.get());
                pestelAnalysisDTO.getPestelAnalysisValue().put("impact_name", kpidto.getKpiName());
            }
        } else {
            pestelAnalysisDTO.getPestelAnalysisValue().put("impact_name", "");
        }
        PestelAnalysis pestelAnalysis = new PestelAnalysis(pestelAnalysisDTO);
        pestelAnalysis.setUpdatedTime(LocalDateTime.now());
        PestelAnalysisDTO responsePestelAnalysisDTO = this.pestelAnalysisService.save(pestelAnalysis);
        this.notification.saveNotification((Object)responsePestelAnalysisDTO, UserThreadLocal.getHeaders());
        if (!pestelAnalysisDTO.isRecommendationmethod()) {
            this.updateAuditDetails(responsePestelAnalysisDTO, "updated");
        }
        return new ResponseEntity((Object)responsePestelAnalysisDTO, HttpStatus.OK);
    }

    @DeleteMapping(value={"/pestelAnalysis/{id}"})
    public ResponseEntity<PestelAnalysisDTO> deletePestelAnalysisDetailsById(@PathVariable(value="id") Long id, HttpServletRequest request) throws RequestException {
        Optional pestelAnalysis = this.pestelAnalysisService.findById(id.longValue());
        if (pestelAnalysis.isPresent()) {
            PestelAnalysis pestelAnalysis1 = (PestelAnalysis)pestelAnalysis.get();
            pestelAnalysis1.setActive(1);
            this.deleteAuditDetails(pestelAnalysis1.getFlagType(), pestelAnalysis1.getId(), Long.valueOf(UserThreadLocal.get((String)"LOGGED_IN_EMPLOYEE_ID")));
            this.pestelAnalysisService.delete(pestelAnalysis1);
            this.dbCache.remove((Object)("pestelAnalysisListByEmpId" + UserThreadLocal.get()), "dbCache");
            return new ResponseEntity(HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    @GetMapping(value={"/retrievePestelAnalysisList/{empId}"})
    public ResponseEntity<List<PestelAnalysisDTO>> findAllByEmpId(@PathVariable(value="empId") Long empId, @RequestParam(value="flagType") String flagType, @RequestParam(value="pageId", required=false) String pageId) throws RequestException {
        List pestelAnalysisDTOList = null;
        pestelAnalysisDTOList = StringUtils.isNotEmpty((CharSequence)pageId) ? this.pestelAnalysisService.findAll(empId.longValue(), flagType, Long.valueOf(pageId).longValue()) : this.pestelAnalysisService.findAll(empId.longValue(), flagType);
        return new ResponseEntity((Object)pestelAnalysisDTOList, HttpStatus.OK);
    }

    private void updateAuditDetails(PestelAnalysisDTO pestelAnalysisDTO, String type) {
        if (type.equals("created")) {
            if (pestelAnalysisDTO.getFlagType().equals("POLITICAL")) {
                this.auditService.saveAudit("PESTEL", pestelAnalysisDTO.getId(), pestelAnalysisDTO.getCreatedBy(), "Political Created");
            } else if (pestelAnalysisDTO.getFlagType().equals("LEGAL")) {
                this.auditService.saveAudit("PESTEL", pestelAnalysisDTO.getId(), pestelAnalysisDTO.getCreatedBy(), "Legal Created");
            } else if (pestelAnalysisDTO.getFlagType().equals("SOCIAL")) {
                this.auditService.saveAudit("PESTEL", pestelAnalysisDTO.getId(), pestelAnalysisDTO.getCreatedBy(), "Social Created");
            } else if (pestelAnalysisDTO.getFlagType().equals("ECONOMICAL")) {
                this.auditService.saveAudit("PESTEL", pestelAnalysisDTO.getId(), pestelAnalysisDTO.getCreatedBy(), "Economical Created");
            } else if (pestelAnalysisDTO.getFlagType().equals("TECHNOLOGICAL")) {
                this.auditService.saveAudit("PESTEL", pestelAnalysisDTO.getId(), pestelAnalysisDTO.getCreatedBy(), "Technology Created");
            } else if (pestelAnalysisDTO.getFlagType().equals("ENVIRONMENTAL")) {
                this.auditService.saveAudit("PESTEL", pestelAnalysisDTO.getId(), pestelAnalysisDTO.getCreatedBy(), "Environmental Created");
            }
        } else if (type.equals("updated")) {
            if (pestelAnalysisDTO.getFlagType().equals("POLITICAL")) {
                this.auditService.saveAudit("PESTEL", pestelAnalysisDTO.getId(), pestelAnalysisDTO.getUpdatedBy(), "Political Modified");
            } else if (pestelAnalysisDTO.getFlagType().equals("LEGAL")) {
                this.auditService.saveAudit("PESTEL", pestelAnalysisDTO.getId(), pestelAnalysisDTO.getUpdatedBy(), "Legal Modified");
            } else if (pestelAnalysisDTO.getFlagType().equals("SOCIAL")) {
                this.auditService.saveAudit("PESTEL", pestelAnalysisDTO.getId(), pestelAnalysisDTO.getUpdatedBy(), "Social Modified");
            } else if (pestelAnalysisDTO.getFlagType().equals("ECONOMICAL")) {
                this.auditService.saveAudit("PESTEL", pestelAnalysisDTO.getId(), pestelAnalysisDTO.getUpdatedBy(), "Economical Modified");
            } else if (pestelAnalysisDTO.getFlagType().equals("TECHNOLOGICAL")) {
                this.auditService.saveAudit("PESTEL", pestelAnalysisDTO.getId(), pestelAnalysisDTO.getUpdatedBy(), "Technology Modified");
            } else if (pestelAnalysisDTO.getFlagType().equals("ENVIRONMENTAL")) {
                this.auditService.saveAudit("PESTEL", pestelAnalysisDTO.getId(), pestelAnalysisDTO.getUpdatedBy(), "Environmental Modified");
            }
        }
    }

    private void deleteAuditDetails(String type, long id, Long updateId) {
        if (type.equals("POLITICAL")) {
            this.auditService.saveAudit("PESTEL", id, updateId.longValue(), "Political Deleted");
        } else if (type.equals("LEGAL")) {
            this.auditService.saveAudit("PESTEL", id, updateId.longValue(), "Legal Deleted");
        } else if (type.equals("SOCIAL")) {
            this.auditService.saveAudit("PESTEL", id, updateId.longValue(), "Social Deleted");
        } else if (type.equals("ECONOMICAL")) {
            this.auditService.saveAudit("PESTEL", id, updateId.longValue(), "Economical Deleted");
        } else if (type.equals("TECHNOLOGICAL")) {
            this.auditService.saveAudit("PESTEL", id, updateId.longValue(), "Technology Deleted");
        } else if (type.equals("ENVIRONMENTAL")) {
            this.auditService.saveAudit("PESTEL", id, updateId.longValue(), "Environmental Deleted");
        }
    }
}

