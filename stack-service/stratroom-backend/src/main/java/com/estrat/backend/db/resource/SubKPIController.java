/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.SubKPI
 *  com.estrat.backend.db.dto.EmployeeDTO
 *  com.estrat.backend.db.dto.ScoreCardResponseDTO
 *  com.estrat.backend.db.dto.SubKPIDTO
 *  com.estrat.backend.db.resource.SubKPIController
 *  com.estrat.backend.db.resource.util.KPIUtil
 *  com.estrat.backend.db.resource.util.NotificationUtil
 *  com.estrat.backend.db.resource.util.UserThreadLocal
 *  com.estrat.backend.db.service.AuditDetailsService
 *  com.estrat.backend.db.service.EmployeeService
 *  com.estrat.backend.db.service.SubKPIService
 *  org.apache.commons.collections4.CollectionUtils
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
package com.estrat.backend.db.resource;

import com.estrat.backend.db.bean.po.SubKPI;
import com.estrat.backend.db.dto.EmployeeDTO;
import com.estrat.backend.db.dto.ScoreCardResponseDTO;
import com.estrat.backend.db.dto.SubKPIDTO;
import com.estrat.backend.db.resource.util.KPIUtil;
import com.estrat.backend.db.resource.util.NotificationUtil;
import com.estrat.backend.db.resource.util.UserThreadLocal;
import com.estrat.backend.db.service.AuditDetailsService;
import com.estrat.backend.db.service.EmployeeService;
import com.estrat.backend.db.service.SubKPIService;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import org.apache.commons.collections4.CollectionUtils;
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
public class SubKPIController {
    @Autowired
    private SubKPIService subKpiService;
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private NotificationUtil notification;
    @Autowired
    private AuditDetailsService auditService;

    @GetMapping(value={"/subKpi/{id}"})
    public ResponseEntity<SubKPIDTO> getsubKPIById(@PathVariable long id) {
        Optional kpiOptional = this.subKpiService.findById(id);
        if (kpiOptional.isPresent()) {
            SubKPIDTO kpidto = new SubKPIDTO((SubKPI)kpiOptional.get());
            return new ResponseEntity((Object)kpidto, HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    @PostMapping(value={"/subKpi"})
    public ResponseEntity<SubKPIDTO> saveOrUpdateKPI(@RequestBody SubKPIDTO subkpidto) {
        Boolean updateStatus = false;
        if (subkpidto.getId() != 0L) {
            updateStatus = true;
        }
        EmployeeDTO employeeDTO = new EmployeeDTO();
        if (subkpidto.getCreatedBy() != 0L) {
            employeeDTO.setEmployeeId(subkpidto.getCreatedBy());
            subkpidto.getSubKpiValue().put("createdByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (subkpidto.getUpdatedBy() != 0L) {
            employeeDTO.setEmployeeId(subkpidto.getUpdatedBy());
            subkpidto.getSubKpiValue().put("updatedByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (subkpidto.getOwner() != 0L) {
            employeeDTO.setEmployeeId(subkpidto.getOwner());
            subkpidto.getSubKpiValue().put("ownerName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        SubKPIDTO response = this.subKpiService.save(new KPIUtil().formatDates(subkpidto));
        if (updateStatus.booleanValue()) {
            this.auditService.updateAudit("SubKPI", response.getId(), response.getUpdatedBy(), "SubKPI Modified");
        } else {
            this.auditService.saveAudit("SubKPI", response.getId(), response.getCreatedBy(), "SubKPI Created");
        }
        this.notification.saveNotification((Object)response, UserThreadLocal.getHeaders());
        return new ResponseEntity((Object)response, HttpStatus.OK);
    }

    @DeleteMapping(value={"/subKpi/{id}"})
    public ResponseEntity<ScoreCardResponseDTO> softDeleteKPI(@PathVariable long id) {
        this.auditService.deleteAudit("Scorecard", id, Long.valueOf(UserThreadLocal.get()).longValue(), "SubKPI Deleted");
        return new ResponseEntity((Object)this.subKpiService.deleteKPIById(id), HttpStatus.OK);
    }

    @GetMapping(value={"/subKpidept/{id}"})
    public ResponseEntity<String> getSubKPIDeptById(@PathVariable long id) {
        String dept = this.subKpiService.kpiDeptId(id);
        return new ResponseEntity((Object)dept, HttpStatus.OK);
    }

    @GetMapping(value={"/v2/subkpiList/{objectiveId}"})
    public ResponseEntity<List<SubKPIDTO>> subkpiListFromObjectives(@PathVariable(value="objectiveId") long objectiveId) {
        List kpiList = this.subKpiService.subkpiList(objectiveId);
        if (CollectionUtils.isNotEmpty((Collection)kpiList)) {
            return new ResponseEntity((Object)kpiList, HttpStatus.OK);
        }
        return new ResponseEntity(Collections.emptyList(), HttpStatus.OK);
    }

    @GetMapping(value={"/subkpiEntryList/{scorecardId}"})
    public ResponseEntity<List<SubKPIDTO>> subKpiEntryList(@PathVariable String scorecardId, @RequestParam(value="ownerFlag", required=false) String ownerFlag) {
        boolean flag = ownerFlag != null ? Boolean.valueOf(ownerFlag) : false;
        return new ResponseEntity((Object)this.subKpiService.retrieveSubKpiEntryDataList(Long.valueOf(scorecardId).longValue()), HttpStatus.OK);
    }
}

