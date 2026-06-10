/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.user.dto.EmployeeDocumentsDTO
 *  com.estrat.service.user.exception.RequestException
 *  com.estrat.service.user.resource.DocumentsController
 *  com.estrat.service.user.service.DocumentService
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
package com.estrat.service.user.resource;

import com.estrat.service.user.dto.EmployeeDocumentsDTO;
import com.estrat.service.user.exception.RequestException;
import com.estrat.service.user.service.DocumentService;
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
public class DocumentsController {
    @Autowired
    private DocumentService documentService;

    @PostMapping(value={"/documents"})
    public ResponseEntity<EmployeeDocumentsDTO> saveEmployeeDocuments(@RequestBody EmployeeDocumentsDTO employeeDocumentsDTO) throws RequestException {
        return new ResponseEntity((Object)this.documentService.saveEmployeeDocuments(employeeDocumentsDTO), HttpStatus.OK);
    }

    @PutMapping(value={"/documents"})
    public ResponseEntity<EmployeeDocumentsDTO> updateEmployeeDocuments(@RequestBody EmployeeDocumentsDTO employeeGoalsDTO) throws RequestException {
        return new ResponseEntity((Object)this.documentService.updateEmployeeDocuments(employeeGoalsDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/documents/{id}"})
    public ResponseEntity<EmployeeDocumentsDTO> retrieveEmployeeDocuments(@PathVariable(value="id") Long id) throws RequestException {
        return new ResponseEntity((Object)this.documentService.retrieveEmployeeDocuments(id), HttpStatus.OK);
    }

    @DeleteMapping(value={"/documents/{id}"})
    public ResponseEntity<Boolean> removeEmployeeDocuments(@PathVariable(value="id") Long id) throws RequestException {
        this.documentService.removeEmployeeDocuments(id);
        return new ResponseEntity((Object)true, HttpStatus.OK);
    }

    @GetMapping(value={"/documentsList/{empId}"})
    public ResponseEntity<List<EmployeeDocumentsDTO>> findAll(@PathVariable(value="empId") Long empId) throws RequestException {
        return new ResponseEntity((Object)this.documentService.findAll(empId.longValue()), HttpStatus.OK);
    }
}

