/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.controller.BudgetDetailController
 *  com.estrat.web.dto.BudgetDTO
 *  com.estrat.web.exception.RequestException
 *  com.estrat.web.service.BudgetDetailService
 *  com.estrat.web.util.BudgetReaderUtil
 *  com.estrat.web.util.RequestSessionUtil
 *  com.estrat.web.util.UserThreadLocal
 *  javax.servlet.http.HttpServletRequest
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.core.io.ByteArrayResource
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

import com.estrat.web.dto.BudgetDTO;
import com.estrat.web.exception.RequestException;
import com.estrat.web.service.BudgetDetailService;
import com.estrat.web.util.BudgetReaderUtil;
import com.estrat.web.util.RequestSessionUtil;
import com.estrat.web.util.UserThreadLocal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
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

@RestController
public class BudgetDetailController {
    @Autowired
    private BudgetDetailService budgetDetailService;
    @Autowired
    protected RequestSessionUtil sessionUtil;
    @Autowired
    private BudgetReaderUtil budgetReaderUtil;

    @PostMapping(value={"/budgets"})
    public ResponseEntity<BudgetDTO> saveRpoTable(@RequestBody BudgetDTO budgetDTO) {
        budgetDTO.setCreateBy(Long.parseLong(UserThreadLocal.get().getProfile().getEmpId()));
        budgetDTO.setOwner(Long.parseLong(UserThreadLocal.get().getProfile().getEmpId()));
        return new ResponseEntity(this.budgetDetailService.saveBudget(budgetDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/budgets/{id}"})
    public ResponseEntity<BudgetDTO> findRpoById(@PathVariable(value="id") long id) {
        return new ResponseEntity(this.budgetDetailService.findById(id), HttpStatus.OK);
    }

    @DeleteMapping(value={"/budgets/{id}"})
    public ResponseEntity<Boolean> deleteRpoById(@PathVariable(value="id") long id) {
        this.budgetDetailService.removeBudget(id);
        return new ResponseEntity(true, HttpStatus.OK);
    }

    @PutMapping(value={"/budgets"})
    public ResponseEntity<BudgetDTO> updateRpoValue(@RequestBody BudgetDTO budgetDTO) {
        budgetDTO.setUpdateBy(Long.parseLong(UserThreadLocal.get().getProfile().getEmpId()));
        budgetDTO.setOwner(Long.parseLong(UserThreadLocal.get().getProfile().getEmpId()));
        return new ResponseEntity(this.budgetDetailService.updateBudget(budgetDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/budgets/{empId}"})
    public ResponseEntity<List<BudgetDTO>> findAllRpoEmpId(@PathVariable(value="empId") Long empId) {
        return new ResponseEntity(this.budgetDetailService.findAllBYEmpId(empId), HttpStatus.OK);
    }

    @GetMapping(value={"/budgetsList/{pageId}"})
    public ResponseEntity<List<BudgetDTO>> findAllByPageId(@PathVariable(value="pageId") Long pageId, @RequestParam(value="status", required=false) String status, HttpServletRequest request) throws RequestException {
        List eventlist = this.budgetDetailService.findByAllPageId(pageId, status);
        return new ResponseEntity(eventlist, HttpStatus.OK);
    }

    @GetMapping(value={"/budgetsListview"})
    public ResponseEntity<?> findAllBychangId(@RequestParam(value="changeId", required=false) Long changeId, HttpServletRequest request) throws RequestException {
        List eventlist = this.budgetDetailService.findByAllchangeId(changeId);
        return new ResponseEntity(eventlist, HttpStatus.OK);
    }

    @RequestMapping(value={"/importBulkBudgetDetails"}, method={RequestMethod.POST})
    public ResponseEntity<Map> importBulkInitiativesDetails(WebRequest webRequest, @RequestParam(value="budgetData", required=true) MultipartFile budgetData, @RequestParam(value="type", required=false) String type) {
        String Message = "No Records Processed";
        Map mapValue = new HashMap();
        try {
            mapValue = this.budgetReaderUtil.importBulkBudgetDetails(budgetData.getInputStream(), type);
        }
        catch (Exception e) {
            mapValue.put("message", Message);
            return new ResponseEntity(mapValue, HttpStatus.OK);
        }
        return new ResponseEntity(mapValue, HttpStatus.OK);
    }

    @GetMapping(value={"/downloadBudgetDetails"})
    public ResponseEntity<ByteArrayResource> downloadBugetDetails(@RequestParam(value="pageId", required=false) String pageId, @RequestParam(value="status", required=false) String status, HttpServletRequest request) throws Exception {
        List eventlist = this.budgetDetailService.findByAllPageId(Long.valueOf(Long.parseLong(pageId)), status);
        return this.budgetReaderUtil.writeDocForBudgetDetails(eventlist);
    }
}

