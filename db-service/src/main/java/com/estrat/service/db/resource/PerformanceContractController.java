/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.KPIEntrys
 *  com.estrat.service.db.bean.po.PerformanceContract
 *  com.estrat.service.db.bean.po.SubKPIEntrys
 *  com.estrat.service.db.dao.KPIEntrysRepository
 *  com.estrat.service.db.dao.SubKPIEntrysRepository
 *  com.estrat.service.db.dto.KPIEntrysDTO
 *  com.estrat.service.db.dto.PerformanceContractDTO
 *  com.estrat.service.db.dto.SubKPIEntrysDTO
 *  com.estrat.service.db.exception.RequestException
 *  com.estrat.service.db.resource.PerformanceContractController
 *  com.estrat.service.db.service.EmployeeService
 *  com.estrat.service.db.service.PerformanceContractService
 *  com.fasterxml.jackson.core.JsonParseException
 *  com.fasterxml.jackson.databind.JsonMappingException
 *  javax.servlet.http.HttpServletRequest
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.http.HttpStatus
 *  org.springframework.http.ResponseEntity
 *  org.springframework.web.bind.annotation.GetMapping
 *  org.springframework.web.bind.annotation.PathVariable
 *  org.springframework.web.bind.annotation.PostMapping
 *  org.springframework.web.bind.annotation.RequestBody
 *  org.springframework.web.bind.annotation.RequestParam
 *  org.springframework.web.bind.annotation.RestController
 */
package com.estrat.service.db.resource;

import com.estrat.service.db.bean.po.KPIEntrys;
import com.estrat.service.db.bean.po.PerformanceContract;
import com.estrat.service.db.bean.po.SubKPIEntrys;
import com.estrat.service.db.dao.KPIEntrysRepository;
import com.estrat.service.db.dao.SubKPIEntrysRepository;
import com.estrat.service.db.dto.KPIEntrysDTO;
import com.estrat.service.db.dto.PerformanceContractDTO;
import com.estrat.service.db.dto.SubKPIEntrysDTO;
import com.estrat.service.db.exception.RequestException;
import com.estrat.service.db.service.EmployeeService;
import com.estrat.service.db.service.PerformanceContractService;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PerformanceContractController {
    @Autowired
    protected PerformanceContractService performanceContractService;
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private SubKPIEntrysRepository subKPIEntrysRepository;
    @Autowired
    private KPIEntrysRepository kpiEntrysRepository;

    @PostMapping(value={"/web/saveSubkpiEntry"})
    public ResponseEntity<PerformanceContractDTO> saveActivitiesAndTasksDetails(@RequestBody PerformanceContractDTO dto, HttpServletRequest request) throws RequestException {
        PerformanceContract pc;
        block3: {
            PerformanceContractDTO saved;
            block2: {
                pc = new PerformanceContract(dto);
                pc.setCreatedTime(LocalDateTime.now());
                saved = this.performanceContractService.save(pc);
                if (dto.getSubKPIEntrysList() == null || dto.getSubKPIEntrysList().isEmpty()) break block2;
                for (SubKPIEntrysDTO entryDTO : dto.getSubKPIEntrysList()) {
                    SubKPIEntrys sub = new SubKPIEntrys(entryDTO);
                    sub.setPreferenceId(new PerformanceContract(saved));
                    this.subKPIEntrysRepository.save(sub);
                }
                break block3;
            }
            if (dto.getKpiEntrysList() == null || dto.getKpiEntrysList().isEmpty()) break block3;
            for (KPIEntrysDTO entryDTO : dto.getKpiEntrysList()) {
                KPIEntrys sub = new KPIEntrys(entryDTO);
                sub.setPreferenceId(new PerformanceContract(saved));
                this.kpiEntrysRepository.save(sub);
            }
        }
        return new ResponseEntity((Object)new PerformanceContractDTO(pc), HttpStatus.OK);
    }

    @GetMapping(value={"/getPerformanceEntry/{empId}"})
    public ResponseEntity<List<PerformanceContractDTO>> findAllByEmpId(@PathVariable(value="empId") Long empId) throws RequestException {
        List preferList = this.performanceContractService.findByEmpId(empId);
        return new ResponseEntity((Object)preferList, HttpStatus.OK);
    }

    @GetMapping(value={"/subkpiEntryByid"})
    public ResponseEntity<?> subKPIGetByid(@RequestParam(value="subkpiId", required=false) String subkpiId, HttpServletRequest request) throws RequestException, JsonParseException, JsonMappingException, NumberFormatException, IOException {
        System.out.println("subkpiId :: " + subkpiId);
        SubKPIEntrysDTO riskeventList = this.performanceContractService.findBysubKPIEntryId(Long.parseLong(subkpiId));
        return ResponseEntity.status((HttpStatus)HttpStatus.OK).body((Object)riskeventList);
    }

    @GetMapping(value={"/kpiEntryByid"})
    public ResponseEntity<?> KpiGetByid(@RequestParam(value="kpiId", required=false) String kpiId, HttpServletRequest request) throws RequestException, JsonParseException, JsonMappingException, NumberFormatException, IOException {
        System.out.println("kpiId :: " + kpiId);
        KPIEntrysDTO riskeventList = this.performanceContractService.findByKPIEntryId(Long.parseLong(kpiId));
        return ResponseEntity.status((HttpStatus)HttpStatus.OK).body((Object)riskeventList);
    }

    @GetMapping(value={"/perfomanceByid"})
    public ResponseEntity<?> performanceId(@RequestParam(value="performanceId", required=false) String performanceId, HttpServletRequest request) throws RequestException, JsonParseException, JsonMappingException, NumberFormatException, IOException {
        PerformanceContractDTO riskeventList = this.performanceContractService.findByPerformanceId(Long.parseLong(performanceId));
        return ResponseEntity.status((HttpStatus)HttpStatus.OK).body((Object)riskeventList);
    }

    @GetMapping(value={"/perfomanceByScorecardId"})
    public ResponseEntity<?> getPerfomanceScorecardId(@RequestParam(value="scoreCardId", required=false) String scoreCardId, HttpServletRequest request) throws RequestException, JsonParseException, JsonMappingException, NumberFormatException, IOException {
        PerformanceContractDTO riskeventList = this.performanceContractService.findByPerformanceScoreCardId(Long.parseLong(scoreCardId));
        return ResponseEntity.status((HttpStatus)HttpStatus.OK).body((Object)riskeventList);
    }
}

