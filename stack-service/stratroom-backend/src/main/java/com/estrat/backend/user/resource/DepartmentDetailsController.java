/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.user.dto.DeptDetails
 *  com.estrat.backend.user.dto.FindDTO
 *  com.estrat.backend.user.exception.RequestException
 *  com.estrat.backend.user.resource.DepartmentDetailsController
 *  com.estrat.backend.user.service.DepartmentDetailsService
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.http.HttpStatus
 *  org.springframework.http.ResponseEntity
 *  org.springframework.web.bind.annotation.GetMapping
 *  org.springframework.web.bind.annotation.PathVariable
 *  org.springframework.web.bind.annotation.PostMapping
 *  org.springframework.web.bind.annotation.PutMapping
 *  org.springframework.web.bind.annotation.RequestBody
 *  org.springframework.web.bind.annotation.RequestMapping
 *  org.springframework.web.bind.annotation.RequestMethod
 *  org.springframework.web.bind.annotation.RequestParam
 *  org.springframework.web.bind.annotation.ResponseBody
 *  org.springframework.web.bind.annotation.RestController
 */
package com.estrat.backend.user.resource;

import com.estrat.backend.user.dto.DeptDetails;
import com.estrat.backend.user.dto.FindDTO;
import com.estrat.backend.user.exception.RequestException;
import com.estrat.backend.user.service.DepartmentDetailsService;
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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DepartmentDetailsController {
    @Autowired
    protected DepartmentDetailsService departmentDetailsService;

    @PostMapping(value={"/departmentDetails"})
    public ResponseEntity<Map<String, Object>> saveDepartmentDetails(@RequestBody DeptDetails deptDetails) throws RequestException {
        return new ResponseEntity((Object)this.departmentDetailsService.saveDepartmentDetails(deptDetails), HttpStatus.OK);
    }

    @PutMapping(value={"/departmentDetails"})
    public ResponseEntity<Map<String, Object>> updateDepartmentDetails(@RequestBody DeptDetails deptDetails) throws RequestException {
        return new ResponseEntity((Object)this.departmentDetailsService.updateDepartmentDetails(deptDetails), HttpStatus.OK);
    }

    @GetMapping(value={"/allDepartmentList"})
    public ResponseEntity<List<DeptDetails>> allDepartmentList() throws RequestException {
        return new ResponseEntity((Object)this.departmentDetailsService.findAll(), HttpStatus.OK);
    }

    @GetMapping(value={"/allDepartmentListByOrgId"})
    public ResponseEntity<List<DeptDetails>> allDepartmentListByOrgId(@RequestParam(value="orgId") long orgId, @RequestParam(value="datePeriod", required=false) String datePeriod, @RequestParam(value="name", required=false) String name) throws RequestException {
        String date = datePeriod.replace("%20", " ");
        String replaceName = name.replace("%20", " ");
        return new ResponseEntity((Object)this.departmentDetailsService.findAllByOrgId(orgId, date, replaceName), HttpStatus.OK);
    }

    @GetMapping(value={"/departmentListByOrgId"})
    public ResponseEntity<List<DeptDetails>> departmentListByOrgId(@RequestParam(value="orgId") long orgId) throws RequestException {
        return new ResponseEntity((Object)this.departmentDetailsService.findAllByOrgId(orgId), HttpStatus.OK);
    }

    @GetMapping(value={"/findByDeptName"})
    public ResponseEntity<DeptDetails> findByDeptName(@RequestBody FindDTO findDTO) throws RequestException {
        return new ResponseEntity((Object)this.departmentDetailsService.findByDeptName(findDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/findByDeptId/{deptId}"})
    public ResponseEntity<DeptDetails> findById(@PathVariable(value="deptId") Long deptId) throws RequestException {
        return new ResponseEntity((Object)this.departmentDetailsService.findById(deptId), HttpStatus.OK);
    }

    @GetMapping(value={"/findByDeptUniqueId"})
    public ResponseEntity<DeptDetails> findByDeptUniqueId(@RequestBody FindDTO findDTO) throws RequestException {
        return new ResponseEntity((Object)this.departmentDetailsService.findByDeptUniqueId(findDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/allDepartmentListByLoginUser"})
    public ResponseEntity<List<DeptDetails>> allDepartmentListByLoginUser(@RequestParam(value="empId") long empId, @RequestParam(value="datePeriod", required=false) String datePeriod, @RequestParam(value="name", required=false) String name) throws RequestException {
        String date = datePeriod.replace("%20", " ");
        String replaceName = name.replace("%20", " ");
        return new ResponseEntity((Object)this.departmentDetailsService.allDepartmentListByLoginUser(empId, date, replaceName), HttpStatus.OK);
    }

    @GetMapping(value={"/ownerMappingDepartmentList"})
    public ResponseEntity<List<DeptDetails>> ownerMappingDepartmentList(@RequestParam(value="empId") long empId) throws RequestException {
        return new ResponseEntity((Object)this.departmentDetailsService.ownerMappingDepartmentList(empId), HttpStatus.OK);
    }

    @GetMapping(value={"/departmentReportees"})
    public ResponseEntity<List<DeptDetails>> departmentReportees() throws RequestException {
        return new ResponseEntity((Object)this.departmentDetailsService.departmentReportees(), HttpStatus.OK);
    }

    @ResponseBody
    @RequestMapping(value={"/years"}, method={RequestMethod.GET})
    public ResponseEntity<List<Integer>> getYearsForDropdown() {
        List years = this.departmentDetailsService.getYearsForDropdown();
        return new ResponseEntity((Object)years, HttpStatus.OK);
    }
}

