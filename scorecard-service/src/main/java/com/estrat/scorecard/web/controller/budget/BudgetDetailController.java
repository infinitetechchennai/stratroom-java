/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.scorecard.dto.BudgetDTO
 *  com.estrat.scorecard.exception.RequestException
 *  com.estrat.scorecard.service.BudgetDetailService
 *  com.estrat.scorecard.web.controller.budget.BudgetDetailController
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
 *  org.springframework.web.bind.annotation.RequestParam
 *  org.springframework.web.bind.annotation.RestController
 */
package com.estrat.scorecard.web.controller.budget;

import com.estrat.scorecard.dto.BudgetDTO;
import com.estrat.scorecard.exception.RequestException;
import com.estrat.scorecard.service.BudgetDetailService;
import java.util.List;
import jakarta.servlet.http.HttpServletRequest;
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
public class BudgetDetailController {
    @Autowired
    private BudgetDetailService budgetDetailService;

    @PostMapping(value={"/budgets"})
    public ResponseEntity<BudgetDTO> saveRpoTable(@RequestBody BudgetDTO budgetDTO) {
        return new ResponseEntity((Object)this.budgetDetailService.saveBudget(budgetDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/budgets/{id}"})
    public ResponseEntity<BudgetDTO> findRpoById(@PathVariable(value="id") long id) {
        return new ResponseEntity((Object)this.budgetDetailService.findById(id), HttpStatus.OK);
    }

    @DeleteMapping(value={"/budgets/{id}"})
    public ResponseEntity<Boolean> deleteRpoById(@PathVariable(value="id") long id) {
        this.budgetDetailService.removeBudget(id);
        return new ResponseEntity((Object)true, HttpStatus.OK);
    }

    @PutMapping(value={"/budgets"})
    public ResponseEntity<BudgetDTO> updateRpoValue(@RequestBody BudgetDTO budgetDTO) {
        return new ResponseEntity((Object)this.budgetDetailService.updateBudget(budgetDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/budgets/{empId}"})
    public ResponseEntity<List<BudgetDTO>> findAllRpoEmpId(@PathVariable(value="empId") Long empId) {
        return new ResponseEntity((Object)this.budgetDetailService.findAllBYEmpId(empId), HttpStatus.OK);
    }

    @GetMapping(value={"/budgetsList/{pageId}"})
    public ResponseEntity<List<BudgetDTO>> findAllByPageId(@PathVariable(value="pageId") Long pageId, @RequestParam(value="status", required=false) String status, HttpServletRequest request) throws RequestException {
        List eventlist = this.budgetDetailService.findByAllPageId(pageId.longValue(), status);
        return new ResponseEntity((Object)eventlist, HttpStatus.OK);
    }

    @GetMapping(value={"/budgetsListview"})
    public ResponseEntity<?> findAllBychangId(@RequestParam(value="changeId", required=false) Long changeId, HttpServletRequest request) throws RequestException {
        List eventlist = this.budgetDetailService.findByAllchangeId(changeId);
        return new ResponseEntity((Object)eventlist, HttpStatus.OK);
    }
}

