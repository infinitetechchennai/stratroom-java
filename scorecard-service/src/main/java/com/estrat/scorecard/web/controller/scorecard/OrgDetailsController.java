/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.scorecard.dto.OrgDetails
 *  com.estrat.scorecard.service.OrganizationService
 *  com.estrat.scorecard.web.controller.scorecard.OrgDetailsController
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.http.ResponseEntity
 *  org.springframework.web.bind.annotation.DeleteMapping
 *  org.springframework.web.bind.annotation.GetMapping
 *  org.springframework.web.bind.annotation.PathVariable
 *  org.springframework.web.bind.annotation.PostMapping
 *  org.springframework.web.bind.annotation.RequestBody
 *  org.springframework.web.bind.annotation.RequestParam
 *  org.springframework.web.bind.annotation.RestController
 */
package com.estrat.scorecard.web.controller.scorecard;

import com.estrat.scorecard.dto.OrgDetails;
import com.estrat.scorecard.service.OrganizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class OrgDetailsController {
    @Autowired
    private OrganizationService organizationService;

    @GetMapping(value={"/orgdetails/{id}"})
    public ResponseEntity<OrgDetails> getDeptDetailsById(@PathVariable long id) {
        return this.organizationService.getDeptDetailsById(id);
    }

    @PostMapping(value={"/orgdetails"})
    public ResponseEntity<OrgDetails> saveOrUpdateDeptDetails(@RequestBody OrgDetails orgDetails) {
        return this.organizationService.saveOrUpdateDeptDetails(orgDetails);
    }

    @DeleteMapping(value={"/orgdetails/{id}"})
    public ResponseEntity<String> deleteDeptDetails(@PathVariable long id) {
        return this.organizationService.deleteDeptDetails(id);
    }

    @GetMapping(value={"/orgdetails"})
    public ResponseEntity<OrgDetails> geOrgDetailsByName(@RequestParam(value="name") String name) {
        return this.organizationService.findByName(name);
    }
}

