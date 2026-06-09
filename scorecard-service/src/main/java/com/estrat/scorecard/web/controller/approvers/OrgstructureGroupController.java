/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.scorecard.dto.OrgstructureGroupDTO
 *  com.estrat.scorecard.exception.RequestException
 *  com.estrat.scorecard.service.OrgstructureGroupService
 *  com.estrat.scorecard.web.controller.approvers.OrgstructureGroupController
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.http.HttpStatus
 *  org.springframework.http.ResponseEntity
 *  org.springframework.web.bind.annotation.DeleteMapping
 *  org.springframework.web.bind.annotation.GetMapping
 *  org.springframework.web.bind.annotation.PathVariable
 *  org.springframework.web.bind.annotation.PostMapping
 *  org.springframework.web.bind.annotation.PutMapping
 *  org.springframework.web.bind.annotation.RequestBody
 *  org.springframework.web.bind.annotation.RestController
 */
package com.estrat.scorecard.web.controller.approvers;

import com.estrat.scorecard.dto.OrgstructureGroupDTO;
import com.estrat.scorecard.exception.RequestException;
import com.estrat.scorecard.service.OrgstructureGroupService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class OrgstructureGroupController {
    @Autowired
    private OrgstructureGroupService orgstructureGroupService;

    @PostMapping(value={"/orgGroup"})
    public ResponseEntity<OrgstructureGroupDTO> saveOrgGroup(@RequestBody OrgstructureGroupDTO orgstructureGroupDTO) throws RequestException {
        return new ResponseEntity((Object)this.orgstructureGroupService.saveOrgGroup(orgstructureGroupDTO), HttpStatus.OK);
    }

    @PutMapping(value={"/orgGroup"})
    public ResponseEntity<OrgstructureGroupDTO> updateOrgGroup(@RequestBody OrgstructureGroupDTO orgstructureGroupDTO) throws RequestException {
        return new ResponseEntity((Object)this.orgstructureGroupService.updateOrgGroup(orgstructureGroupDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/orgGroup/{id}"})
    public ResponseEntity<OrgstructureGroupDTO> getOrgGroupById(@PathVariable(value="id") Long id) throws RequestException {
        return new ResponseEntity((Object)this.orgstructureGroupService.retrieveOrgGroup(id), HttpStatus.OK);
    }

    @DeleteMapping(value={"/orgGroup/{id}"})
    public ResponseEntity<Boolean> deleteOrgGroupById(@PathVariable(value="id") Long id) throws RequestException {
        this.orgstructureGroupService.removeOrgGroup(id);
        return new ResponseEntity((Object)true, HttpStatus.OK);
    }

    @GetMapping(value={"/orgGroupList"})
    public ResponseEntity<List<OrgstructureGroupDTO>> findAllValue() {
        return new ResponseEntity((Object)this.orgstructureGroupService.findAllValue(), HttpStatus.OK);
    }
}

