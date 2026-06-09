/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.DeptDetails
 *  com.estrat.service.db.dto.DepartmentChartDTO
 *  com.estrat.service.db.resource.DeptDetailsController
 *  com.estrat.service.db.service.DepartmentDetailsService
 *  com.estrat.service.db.service.DeptDetailsService
 *  javax.validation.Valid
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
package com.estrat.service.db.resource;

import com.estrat.service.db.bean.po.DeptDetails;
import com.estrat.service.db.dto.DepartmentChartDTO;
import com.estrat.service.db.service.DepartmentDetailsService;
import com.estrat.service.db.service.DeptDetailsService;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import jakarta.validation.Valid;
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
public class DeptDetailsController {
    @Autowired
    private DeptDetailsService deptDetailsService;
    @Autowired
    private DepartmentDetailsService departmentDetailsService;

    @GetMapping(value={"/dept_details/{id}"})
    public ResponseEntity<DeptDetails> geDeptDetailsById(@PathVariable long id) {
        Optional deptDetailsOptional = this.deptDetailsService.findById(id);
        if (deptDetailsOptional.isPresent()) {
            return new ResponseEntity(deptDetailsOptional.get(), HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    @GetMapping(value={"/dept_detailsby_List"})
    public ResponseEntity<List<DepartmentChartDTO>> getdeptList(@RequestParam(value="deptId") String deptId) {
        String[] deptList = deptId.split(",");
        List<String> dept_list = Arrays.asList(deptList);
        List departmentChartDTOs = this.departmentDetailsService.findbyDeptIds(dept_list);
        return new ResponseEntity((Object)departmentChartDTOs, HttpStatus.OK);
    }

    @PostMapping(value={"/dept_details"})
    public ResponseEntity<DeptDetails> saveOrUpdateDeptDetails(@Valid @RequestBody DeptDetails deptDetails) {
        return new ResponseEntity((Object)this.deptDetailsService.save(deptDetails), HttpStatus.OK);
    }

    @DeleteMapping(value={"/dept_details/{id}"})
    public ResponseEntity<DeptDetails> softDeleteDeptDetails(@PathVariable long id) {
        Optional deptDetailsOptional = this.deptDetailsService.findById(id);
        if (deptDetailsOptional.isPresent()) {
            DeptDetails deptDetails = (DeptDetails)deptDetailsOptional.get();
            return new ResponseEntity((Object)this.deptDetailsService.save(deptDetails), HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }
}

