/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.controller.DepartmentDetailsController
 *  com.estrat.web.dto.DeptDetails
 *  com.estrat.web.dto.FindDTO
 *  com.estrat.web.exception.RequestException
 *  com.estrat.web.service.DepartmentDetailsService
 *  com.estrat.web.util.RequestSessionUtil
 *  com.estrat.web.util.UserThreadLocal
 *  javax.servlet.http.HttpServletRequest
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.http.HttpStatus
 *  org.springframework.http.ResponseEntity
 *  org.springframework.web.bind.annotation.GetMapping
 *  org.springframework.web.bind.annotation.PathVariable
 *  org.springframework.web.bind.annotation.PostMapping
 *  org.springframework.web.bind.annotation.PutMapping
 *  org.springframework.web.bind.annotation.RequestBody
 *  org.springframework.web.bind.annotation.RequestParam
 *  org.springframework.web.bind.annotation.RestController
 */
package com.estrat.web.controller;

import com.estrat.web.dto.DeptDetails;
import com.estrat.web.dto.FindDTO;
import com.estrat.web.exception.RequestException;
import com.estrat.web.service.DepartmentDetailsService;
import com.estrat.web.util.RequestSessionUtil;
import com.estrat.web.util.UserThreadLocal;
import java.util.List;
import java.util.Map;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DepartmentDetailsController {
    @Autowired
    protected DepartmentDetailsService departmentDetailsService;
    @Autowired
    protected RequestSessionUtil sessionUtil;

    @PostMapping(value={"/departmentDetails"})
    public ResponseEntity<Map<String, Object>> saveDepartmentDetails(@RequestBody DeptDetails deptDetails) throws RequestException {
        deptDetails.setOrgId(UserThreadLocal.get().getProfile().getOrgDetails().getOrgId());
        return new ResponseEntity(this.departmentDetailsService.saveDepartmentDetails(deptDetails), HttpStatus.OK);
    }

    @PutMapping(value={"/departmentDetails"})
    public ResponseEntity<Map<String, Object>> updateDepartmentDetails(@RequestBody DeptDetails deptDetails) throws RequestException {
        deptDetails.setOrgId(UserThreadLocal.get().getProfile().getOrgDetails().getOrgId());
        return new ResponseEntity(this.departmentDetailsService.updateDepartmentDetails(deptDetails), HttpStatus.OK);
    }

    @GetMapping(value={"/allDepartmentList"})
    public ResponseEntity<List<DeptDetails>> allDepartmentList() throws RequestException {
        long orgId = UserThreadLocal.get().getProfile().getOrgDetails().getOrgId();
        return new ResponseEntity(this.departmentDetailsService.findAllByOrgId(orgId), HttpStatus.OK);
    }

    @GetMapping(value={"/departmentListByOrgId"})
    public ResponseEntity<List<DeptDetails>> departmentListByOrgId(@RequestParam(value="orgId") long orgId) throws RequestException {
        return new ResponseEntity(this.departmentDetailsService.findAllByOrgId(orgId), HttpStatus.OK);
    }

    @GetMapping(value={"/allDepartmentListByOrgId"})
    public ResponseEntity<List<DeptDetails>> allDepartmentListByOrgId(@RequestParam(value="datePeriod", required=false) String datePeriod, @RequestParam(value="name", required=false) String name) throws RequestException {
        String date = datePeriod.replace("%20", " ");
        long orgId = UserThreadLocal.get().getProfile().getOrgDetails().getOrgId();
        return new ResponseEntity(this.departmentDetailsService.findAllByOrgId(orgId, date, name), HttpStatus.OK);
    }

    @GetMapping(value={"/findByDeptName"})
    public ResponseEntity<DeptDetails> findByDeptName(@RequestParam(value="deptName") String deptName) throws RequestException {
        FindDTO findDTO = new FindDTO();
        findDTO.setOrgId(UserThreadLocal.get().getProfile().getOrgDetails().getOrgId());
        findDTO.setName(deptName);
        return new ResponseEntity(this.departmentDetailsService.findByDeptName(findDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/findByDeptId/{deptId}"})
    public ResponseEntity<DeptDetails> findById(@PathVariable(value="deptId") Long deptId) throws RequestException {
        return new ResponseEntity(this.departmentDetailsService.findById(deptId), HttpStatus.OK);
    }

    @GetMapping(value={"/allDepartmentListByLoginUser"})
    public ResponseEntity<List<DeptDetails>> allDepartmentListByLoginUser(@RequestParam(value="datePeriod", required=false) String datePeriod, @RequestParam(value="name", required=false) String name, HttpServletRequest request) throws RequestException {
        String date = datePeriod.replace("%20", " ");
        long empId = Long.valueOf(this.sessionUtil.getSessionId(request));
        return new ResponseEntity(this.departmentDetailsService.allDepartmentListByLoginUser(empId, date, name), HttpStatus.OK);
    }

    @GetMapping(value={"/ownerMappingDepartmentList"})
    public ResponseEntity<List<DeptDetails>> ownerMappingDepartmentList(@RequestParam(value="empId") long empId) throws RequestException {
        return new ResponseEntity(this.departmentDetailsService.ownerMappingDepartmentList(empId), HttpStatus.OK);
    }

    @GetMapping(value={"/findByDeptUniqueId"})
    public ResponseEntity<DeptDetails> findByDeptUniqueId(@RequestParam(value="deptUniqueId") String deptUniqueId) throws RequestException {
        FindDTO findDTO = new FindDTO();
        findDTO.setDeptUniqueId(deptUniqueId);
        findDTO.setOrgId(UserThreadLocal.get().getProfile().getOrgDetails().getOrgId());
        return new ResponseEntity(this.departmentDetailsService.findByDeptUniqueId(findDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/departmentReportees"})
    public ResponseEntity<List<DeptDetails>> departmentReportees() throws RequestException {
        return new ResponseEntity(this.departmentDetailsService.departmentReportees(), HttpStatus.OK);
    }
}

