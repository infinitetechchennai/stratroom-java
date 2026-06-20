/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.OrgDetails
 *  com.estrat.backend.db.resource.OrgDetailsController
 *  com.estrat.backend.db.service.OrgDetailsService
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

import com.estrat.backend.db.bean.po.OrgDetails;
import com.estrat.backend.db.service.OrgDetailsService;
import java.util.Optional;
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
public class OrgDetailsController {
    @Autowired
    private OrgDetailsService orgDetailsService;

    @GetMapping(value={"/org_details/{id}"})
    public ResponseEntity<OrgDetails> geOrgDetailsById(@PathVariable long id) {
        Optional deptDetailsOptional = this.orgDetailsService.findById(id);
        if (deptDetailsOptional.isPresent()) {
            return new ResponseEntity(deptDetailsOptional.get(), HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    @PostMapping(value={"/org_details"})
    public ResponseEntity<OrgDetails> saveOrUpdateOrgDetails(@RequestBody OrgDetails orgDetails) {
        return new ResponseEntity((Object)this.orgDetailsService.save(orgDetails), HttpStatus.OK);
    }

    @DeleteMapping(value={"/org_details/{id}"})
    public ResponseEntity<OrgDetails> softDeleteOrgDetails(@PathVariable long id) {
        Optional orgDetailsOptional = this.orgDetailsService.findById(id);
        if (orgDetailsOptional.isPresent()) {
            OrgDetails orgDetails = (OrgDetails)orgDetailsOptional.get();
            return new ResponseEntity((Object)this.orgDetailsService.save(orgDetails), HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    @GetMapping(value={"/org_details"})
    public ResponseEntity<OrgDetails> geOrgDetailsByName(@RequestParam(value="name") String name) {
        return new ResponseEntity((Object)this.orgDetailsService.findByName(name), HttpStatus.OK);
    }
}

