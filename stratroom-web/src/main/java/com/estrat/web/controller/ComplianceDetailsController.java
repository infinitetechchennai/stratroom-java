/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.controller.ComplianceDetailsController
 *  com.estrat.web.dto.ComplianceAreaDTO
 *  com.estrat.web.dto.ComplianceDetailsDTO
 *  com.estrat.web.exception.RequestException
 *  com.estrat.web.service.ComplianceDetailsService
 *  com.estrat.web.util.ComplainceReaderUtil
 *  com.estrat.web.util.UserThreadLocal
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
 *  org.springframework.web.bind.annotation.RequestMapping
 *  org.springframework.web.bind.annotation.RequestMethod
 *  org.springframework.web.bind.annotation.RequestParam
 *  org.springframework.web.bind.annotation.RestController
 *  org.springframework.web.context.request.WebRequest
 *  org.springframework.web.multipart.MultipartFile
 */
package com.estrat.web.controller;

import com.estrat.web.dto.ComplianceAreaDTO;
import com.estrat.web.dto.ComplianceDetailsDTO;
import com.estrat.web.exception.RequestException;
import com.estrat.web.service.ComplianceDetailsService;
import com.estrat.web.util.ComplainceReaderUtil;
import com.estrat.web.util.UserThreadLocal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.multipart.MultipartFile;

@SuppressWarnings({"unchecked", "rawtypes"})
@RestController
public class ComplianceDetailsController {
    @Autowired
    private ComplianceDetailsService complianceDetailsService;
    @Autowired
    private ComplainceReaderUtil complainceReaderUtil;

    @PostMapping(value={"/complainArea"})
    public ResponseEntity<ComplianceAreaDTO> saveCategory(@RequestBody ComplianceAreaDTO complianceAreaDTO) throws RequestException {
        complianceAreaDTO.setCreatedBy(Long.parseLong(UserThreadLocal.get().getProfile().getEmpId()));
        return new ResponseEntity(this.complianceDetailsService.saveArea(complianceAreaDTO), HttpStatus.OK);
    }

    @PutMapping(value={"/complainArea"})
    public ResponseEntity<ComplianceAreaDTO> updateCategory(@RequestBody ComplianceAreaDTO complianceAreaDTO) throws RequestException {
        complianceAreaDTO.setUpdatedBy(Long.parseLong(UserThreadLocal.get().getProfile().getEmpId()));
        return new ResponseEntity(this.complianceDetailsService.updateArea(complianceAreaDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/complainArea/{id}"})
    public ResponseEntity<ComplianceAreaDTO> getCategory(@PathVariable Long id) throws RequestException {
        return new ResponseEntity(this.complianceDetailsService.retrieveArea(id), HttpStatus.OK);
    }

    @DeleteMapping(value={"/complainArea/{id}"})
    public ResponseEntity<Boolean> deleteArea(@PathVariable(value="id") Long id) throws RequestException {
        this.complianceDetailsService.removeArea(id);
        return new ResponseEntity(true, HttpStatus.OK);
    }

    @GetMapping(value={"/retrieveComplinValue"})
    public ResponseEntity<List<ComplianceAreaDTO>> findAll(@RequestParam(value="pageId", required=false) String pageId, @RequestParam(value="dateRange") String dateRange) throws RequestException {
        List dTOList = this.complianceDetailsService.findAll(dateRange, pageId);
        return new ResponseEntity(dTOList, HttpStatus.OK);
    }

    @PostMapping(value={"/compliance"})
    public ResponseEntity<ComplianceDetailsDTO> saveComplain(@RequestBody ComplianceDetailsDTO complianceDetailsDTO, HttpServletRequest request) throws RequestException {
        complianceDetailsDTO.setCreatedBy(Long.parseLong(UserThreadLocal.get().getProfile().getEmpId()));
        return new ResponseEntity(this.complianceDetailsService.saveComplain(complianceDetailsDTO), HttpStatus.OK);
    }

    @PutMapping(value={"/compliance"})
    public ResponseEntity<ComplianceDetailsDTO> updateComplain(@RequestBody ComplianceDetailsDTO complianceDetailsDTO, HttpServletRequest request) throws RequestException {
        complianceDetailsDTO.setUpdatedBy(Long.parseLong(UserThreadLocal.get().getProfile().getEmpId()));
        return new ResponseEntity(this.complianceDetailsService.updateComplain(complianceDetailsDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/compliance/{id}"})
    public ResponseEntity<ComplianceDetailsDTO> getTask(@PathVariable(value="id") Long id) throws RequestException {
        ComplianceDetailsDTO comDTO = this.complianceDetailsService.retrieveComplain(id);
        return new ResponseEntity(comDTO, HttpStatus.OK);
    }

    @DeleteMapping(value={"/compliance/{id}"})
    public ResponseEntity<Boolean> deleteTask(@PathVariable(value="id") Long id, HttpServletRequest request) throws RequestException {
        this.complianceDetailsService.removeComplain(id);
        return new ResponseEntity(true, HttpStatus.OK);
    }

    @RequestMapping(value={"/importBulkComplainceDetails"}, method={RequestMethod.POST})
    public ResponseEntity<Map> importBulkInitiativesDetails(WebRequest webRequest, @RequestParam(value="complianceData", required=true) MultipartFile complianceData, @RequestParam(value="type", required=false) String type) {
        String Message = "No Records Processed";
        Map mapValue = new HashMap();
        try {
            mapValue = this.complainceReaderUtil.importBulkComplainceDetails(complianceData.getInputStream(), type);
        }
        catch (Exception e) {
            mapValue.put("message", Message);
            return new ResponseEntity(mapValue, HttpStatus.OK);
        }
        return new ResponseEntity(mapValue, HttpStatus.OK);
    }
}

