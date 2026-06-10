/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.controller.DocumentsController
 *  com.estrat.web.dto.EmployeeDocumentsDTO
 *  com.estrat.web.exception.RequestException
 *  com.estrat.web.service.DocumentService
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

import com.estrat.web.dto.EmployeeDocumentsDTO;
import com.estrat.web.exception.RequestException;
import com.estrat.web.service.DocumentService;
import com.estrat.web.util.RequestSessionUtil;
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
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DocumentsController {
    @Autowired
    private DocumentService documentService;
    @Autowired
    protected RequestSessionUtil sessionUtil;

    @PostMapping(value={"/documents"})
    public ResponseEntity<EmployeeDocumentsDTO> saveEmployeeDocuments(@RequestBody EmployeeDocumentsDTO employeeDocumentsDTO, HttpServletRequest request) throws RequestException {
        employeeDocumentsDTO.setCreatedBy(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue());
        return new ResponseEntity(this.documentService.saveEmployeeDocuments(employeeDocumentsDTO), HttpStatus.OK);
    }

    @PutMapping(value={"/documents"})
    public ResponseEntity<EmployeeDocumentsDTO> updateEmployeeDocuments(@RequestBody EmployeeDocumentsDTO employeeDocumentsDTO, HttpServletRequest request) throws RequestException {
        employeeDocumentsDTO.setUpdatedBy(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue());
        return new ResponseEntity(this.documentService.updateEmployeeDocuments(employeeDocumentsDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/documents/{id}"})
    public ResponseEntity<EmployeeDocumentsDTO> retrieveEmployeeDocuments(@PathVariable(value="id") Long id) throws RequestException {
        return new ResponseEntity(this.documentService.retrieveEmployeeDocuments(id), HttpStatus.OK);
    }

    @DeleteMapping(value={"/documents/{id}"})
    public ResponseEntity<Boolean> removeEmployeeDocuments(@PathVariable(value="id") Long id) throws RequestException {
        this.documentService.removeEmployeeDocuments(id);
        return new ResponseEntity(true, HttpStatus.OK);
    }

    @GetMapping(value={"/documentsList"})
    public ResponseEntity<List<EmployeeDocumentsDTO>> findAll(HttpServletRequest request) throws RequestException {
        return new ResponseEntity(this.documentService.findAll(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue()), HttpStatus.OK);
    }
}

