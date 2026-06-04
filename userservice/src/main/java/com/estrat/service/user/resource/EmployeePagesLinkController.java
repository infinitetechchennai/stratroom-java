/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.user.dto.PageLinkDTO
 *  com.estrat.service.user.dto.PageLinkResponseDTO
 *  com.estrat.service.user.exception.RequestException
 *  com.estrat.service.user.resource.EmployeePagesLinkController
 *  com.estrat.service.user.service.EmployeePagesLinkDetailsService
 *  javax.servlet.http.HttpServletRequest
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.http.HttpStatus
 *  org.springframework.http.ResponseEntity
 *  org.springframework.web.bind.annotation.GetMapping
 *  org.springframework.web.bind.annotation.PathVariable
 *  org.springframework.web.bind.annotation.PostMapping
 *  org.springframework.web.bind.annotation.PutMapping
 *  org.springframework.web.bind.annotation.RequestBody
 *  org.springframework.web.bind.annotation.RestController
 */
package com.estrat.service.user.resource;

import com.estrat.service.user.dto.PageLinkDTO;
import com.estrat.service.user.dto.PageLinkResponseDTO;
import com.estrat.service.user.exception.RequestException;
import com.estrat.service.user.service.EmployeePagesLinkDetailsService;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @PostMapping(value={"/pageLink"})
    public ResponseEntity<PageLinkResponseDTO> savePageLink(@RequestBody List<PageLinkDTO> pageLinkDTOList, HttpServletRequest request) throws RequestException {
        return new ResponseEntity((Object)this.pagesLinkDetailsService.save(pageLinkDTOList), HttpStatus.OK);
    }

    @PutMapping(value={"/pageLink"})
    public ResponseEntity<PageLinkResponseDTO> updatePageLink(@RequestBody List<PageLinkDTO> pageLinkDTOList, HttpServletRequest request) throws RequestException {
        return new ResponseEntity((Object)this.pagesLinkDetailsService.update(pageLinkDTOList), HttpStatus.OK);
    }

    @GetMapping(value={"/pageLinkListByEmpId/{empId}"})
    public ResponseEntity<PageLinkResponseDTO> get(@PathVariable(value="empId") long empId, HttpServletRequest request) throws RequestException {
        return new ResponseEntity((Object)this.pagesLinkDetailsService.findAll(Long.valueOf(empId)), HttpStatus.OK);
    }

    @GetMapping(value={"/pageLink/{empId}"})
    public ResponseEntity<PageLinkResponseDTO> delete(@PathVariable(value="empId") long empId, HttpServletRequest request) throws RequestException {
        return new ResponseEntity((Object)this.pagesLinkDetailsService.remove(Long.valueOf(empId)), HttpStatus.OK);
    }
}

