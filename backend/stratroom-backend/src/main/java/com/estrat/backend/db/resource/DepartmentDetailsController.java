/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.DepartmentDetails
 *  com.estrat.backend.db.dto.DepartmentChartDTO
 *  com.estrat.backend.db.dto.DeptDetails
 *  com.estrat.backend.db.dto.FindDTO
 *  com.estrat.backend.db.exception.InputValidationException
 *  com.estrat.backend.db.exception.RequestException
 *  com.estrat.backend.db.resource.DepartmentDetailsController
 *  com.estrat.backend.db.service.DepartmentDetailsService
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
package com.estrat.backend.db.resource;

import com.estrat.backend.db.bean.po.DepartmentDetails;
import com.estrat.backend.db.dto.DepartmentChartDTO;
import com.estrat.backend.db.dto.DeptDetails;
import com.estrat.backend.db.dto.FindDTO;
import com.estrat.backend.db.exception.InputValidationException;
import com.estrat.backend.db.exception.RequestException;
import com.estrat.backend.db.service.DepartmentDetailsService;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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

    @PostMapping(value={"/departmentDetails"})
    public ResponseEntity<Map<String, Object>> saveDepartmentDetails(@RequestBody DeptDetails deptDetails) throws RequestException {
        HashMap<String, Object> map = new HashMap<String, Object>();
        DepartmentDetails departmentDetails = this.departmentDetailsService.findByName(deptDetails.getName());
        if (departmentDetails != null) {
            throw new InputValidationException("Duplicate departmentName Provided");
        }
        DepartmentDetails departmentDetails1 = new DepartmentDetails(deptDetails);
        this.departmentDetailsService.save(departmentDetails1);
        map.put("message", "successfully added");
        map.put("departmentList", this.departmentDetailsService.findAll());
        return new ResponseEntity(map, HttpStatus.OK);
    }

    @PutMapping(value={"/departmentDetails"})
    public ResponseEntity<Map<String, Object>> updatePageDetails(@RequestBody DeptDetails deptDetails) throws RequestException {
        HashMap<String, Object> map = new HashMap<String, Object>();
        DepartmentDetails departmentDetails = this.departmentDetailsService.findByName(deptDetails.getName());
        if (departmentDetails != null) {
            throw new InputValidationException("Duplicate departmentName Provided");
        }
        DepartmentDetails departmentDetails1 = new DepartmentDetails(deptDetails);
        this.departmentDetailsService.save(departmentDetails1);
        map.put("message", "successfully updated");
        map.put("departmentList", this.departmentDetailsService.findAll());
        return new ResponseEntity(map, HttpStatus.OK);
    }

    @GetMapping(value={"/allDepartmentList"})
    public ResponseEntity<List<DeptDetails>> allDepartmentList() throws RequestException {
        return new ResponseEntity((Object)this.departmentDetailsService.findAll(), HttpStatus.OK);
    }

    @GetMapping(value={"/departmentListByOrgId"})
    public ResponseEntity<List<DeptDetails>> departmentListByOrgId(@RequestParam(value="orgId") long orgId) throws RequestException {
        return new ResponseEntity((Object)this.departmentDetailsService.findAllByOrgId(orgId), HttpStatus.OK);
    }

    @GetMapping(value={"/allDepartmentListByOrgId"})
    public ResponseEntity<List<DeptDetails>> allDepartmentListByOrgId(@RequestParam(value="orgId") long orgId, @RequestParam(value="datePeriod", required=false) String datePeriod, @RequestParam(value="name", required=false) String name) throws RequestException {
        String date = datePeriod.replace("%20", " ");
        String replaceName = name.replace("%20", " ");
        return new ResponseEntity((Object)this.departmentDetailsService.findAllByOrgId(orgId, date, replaceName), HttpStatus.OK);
    }

    @GetMapping(value={"/findByDeptName"})
    public ResponseEntity<DeptDetails> findByDeptName(@RequestBody FindDTO findDTO) throws RequestException {
        return new ResponseEntity((Object)this.departmentDetailsService.findByDeptName(findDTO.getOrgId().longValue(), findDTO.getName()), HttpStatus.OK);
    }

    @GetMapping(value={"/findByDeptUniqueId"})
    public ResponseEntity<DeptDetails> findByDeptUniqueId(@RequestBody FindDTO findDTO) throws RequestException {
        return new ResponseEntity((Object)this.departmentDetailsService.findByDeptUniqueId(findDTO.getOrgId().longValue(), findDTO.getDeptUniqueId()), HttpStatus.OK);
    }

    @GetMapping(value={"/findByDeptId/{deptId}"})
    public ResponseEntity<DeptDetails> findById(@PathVariable(value="deptId") Long deptId) throws RequestException {
        return new ResponseEntity((Object)this.departmentDetailsService.findById(deptId), HttpStatus.OK);
    }

    @GetMapping(value={"/allDepartmentListByLoginUser"})
    public ResponseEntity<List<DeptDetails>> allDepartmentListByLoginUser(@RequestParam(value="empId") long empId, @RequestParam(value="datePeriod", required=false) String datePeriod, @RequestParam(value="name", required=false) String name) throws RequestException {
        String date = datePeriod.replace("%20", " ");
        String replaceName = name.replace("%20", " ");
        return new ResponseEntity((Object)this.departmentDetailsService.findAllByEmpId(empId, date, replaceName), HttpStatus.OK);
    }

    @GetMapping(value={"/ownerMappingDepartmentList"})
    public ResponseEntity<List<DeptDetails>> ownerMappingDepartmentList(@RequestParam(value="empId") long empId) throws RequestException {
        return new ResponseEntity((Object)this.departmentDetailsService.ownerMappingDepartmentList(empId), HttpStatus.OK);
    }

    @GetMapping(value={"/departmentReportees"})
    public ResponseEntity<List<DeptDetails>> departmentReportees() throws RequestException {
        return new ResponseEntity((Object)this.departmentDetailsService.childList(), HttpStatus.OK);
    }

    @GetMapping(value={"/departmentimmedReportees/{deptId}"})
    public ResponseEntity<List<DepartmentChartDTO>> departmentimmedReportees(@PathVariable(value="deptId") Long deptId) throws RequestException {
        return new ResponseEntity((Object)this.departmentDetailsService.departmentimmedReportees(deptId), HttpStatus.OK);
    }

    @GetMapping(value={"/findOwnerByDeptId"})
    public ResponseEntity<DeptDetails> findById() throws RequestException {
        return new ResponseEntity((Object)this.departmentDetailsService.findByOwner(), HttpStatus.OK);
    }

    @GetMapping(value={"/findEmpOwnerByDeptId/{deptId}"})
    public ResponseEntity<Long> findByDeptId(@PathVariable(value="deptId") Long deptId) throws RequestException {
        return new ResponseEntity((Object)this.departmentDetailsService.findByOwner(deptId), HttpStatus.OK);
    }
}

