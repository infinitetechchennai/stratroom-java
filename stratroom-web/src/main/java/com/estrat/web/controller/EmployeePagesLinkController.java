/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.controller.EmployeePagesLinkController
 *  com.estrat.web.dto.PageLinkDTO
 *  com.estrat.web.dto.PageLinkResponseDTO
 *  com.estrat.web.exception.RequestException
 *  com.estrat.web.service.EmployeePagesLinkDetailsService
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

import com.estrat.web.dto.PageLinkDTO;
import com.estrat.web.dto.PageLinkResponseDTO;
import com.estrat.web.exception.RequestException;
import com.estrat.web.service.EmployeePagesLinkDetailsService;
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
public class EmployeePagesLinkController {
    @Autowired
    public EmployeePagesLinkDetailsService pagesLinkDetailsService;
    @Autowired
    protected RequestSessionUtil sessionUtil;

    @PostMapping(value={"/pageLink"})
    public ResponseEntity<PageLinkResponseDTO> savePageLink(@RequestBody List<PageLinkDTO> pageLinkDTOList, HttpServletRequest request) throws RequestException {
        for (Object _obj_pageLinkDTO : pageLinkDTOList) {
            PageLinkDTO pageLinkDTO = (PageLinkDTO) _obj_pageLinkDTO;
            pageLinkDTO.setCreatedBy(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue());
        }
        return new ResponseEntity(this.pagesLinkDetailsService.save(pageLinkDTOList), HttpStatus.OK);
    }

    @PutMapping(value={"/pageLink"})
    public ResponseEntity<PageLinkResponseDTO> updatePageLink(@RequestBody List<PageLinkDTO> pageLinkDTOList, HttpServletRequest request) throws RequestException {
        for (Object _obj_pageLinkDTO : pageLinkDTOList) {
            PageLinkDTO pageLinkDTO = (PageLinkDTO) _obj_pageLinkDTO;
            pageLinkDTO.setUpdatedBy(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue());
        }
        return new ResponseEntity(this.pagesLinkDetailsService.update(pageLinkDTOList), HttpStatus.OK);
    }

    @GetMapping(value={"/pageLinkListByEmpId/{empId}"})
    public ResponseEntity<PageLinkResponseDTO> get(@PathVariable(value="empId") long empId, HttpServletRequest request) throws RequestException {
        return new ResponseEntity(this.pagesLinkDetailsService.findAll(Long.valueOf(empId)), HttpStatus.OK);
    }

    @DeleteMapping(value={"/pageLink/{empId}"})
    public ResponseEntity<PageLinkResponseDTO> delete(@PathVariable(value="empId") long empId, HttpServletRequest request) throws RequestException {
        return new ResponseEntity(this.pagesLinkDetailsService.remove(Long.valueOf(empId)), HttpStatus.OK);
    }
}

