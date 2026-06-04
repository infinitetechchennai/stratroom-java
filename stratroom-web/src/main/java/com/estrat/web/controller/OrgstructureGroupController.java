/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.controller.OrgstructureGroupController
 *  com.estrat.web.dto.OrgstructureGroupDTO
 *  com.estrat.web.exception.RequestException
 *  com.estrat.web.service.OrgstructureGroupService
 *  com.estrat.web.util.RequestSessionUtil
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
 *  org.springframework.web.bind.annotation.RestController
 */
package com.estrat.web.controller;

import com.estrat.web.dto.OrgstructureGroupDTO;
import com.estrat.web.exception.RequestException;
import com.estrat.web.service.OrgstructureGroupService;
import com.estrat.web.util.RequestSessionUtil;
import java.util.List;
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
import org.springframework.web.bind.annotation.RestController;

@RestController
public class OrgstructureGroupController {
    @Autowired
    private OrgstructureGroupService orgstructureGroupService;
    @Autowired
    protected RequestSessionUtil sessionUtil;

    @PostMapping(value={"/orgGroup"})
    public ResponseEntity<OrgstructureGroupDTO> saveOrgGroup(@RequestBody OrgstructureGroupDTO orgstructureGroupDTO, HttpServletRequest request) throws RequestException {
        orgstructureGroupDTO.setCreatedBy(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue());
        return new ResponseEntity(this.orgstructureGroupService.saveOrgGroup(orgstructureGroupDTO), HttpStatus.OK);
    }

    @PutMapping(value={"/orgGroup"})
    public ResponseEntity<OrgstructureGroupDTO> updateOrgGroup(@RequestBody OrgstructureGroupDTO orgstructureGroupDTO, HttpServletRequest request) throws RequestException {
        orgstructureGroupDTO.setUpdatedBy(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue());
        return new ResponseEntity(this.orgstructureGroupService.updateOrgGroup(orgstructureGroupDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/orgGroup/{id}"})
    public ResponseEntity<OrgstructureGroupDTO> getOrgGroupById(@PathVariable(value="id") Long id) throws RequestException {
        return new ResponseEntity(this.orgstructureGroupService.retrieveOrgGroup(id), HttpStatus.OK);
    }

    @DeleteMapping(value={"/orgGroup/{id}"})
    public ResponseEntity<Boolean> deleteOrgGroupById(@PathVariable(value="id") Long id) throws RequestException {
        this.orgstructureGroupService.removeOrgGroup(id);
        return new ResponseEntity(true, HttpStatus.OK);
    }

    @GetMapping(value={"/orgGroupList"})
    public ResponseEntity<List<OrgstructureGroupDTO>> findAllValue() {
        return new ResponseEntity(this.orgstructureGroupService.findAllValue(), HttpStatus.OK);
    }
}

