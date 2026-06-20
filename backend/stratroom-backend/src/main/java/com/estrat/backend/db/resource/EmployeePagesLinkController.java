/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.dto.PageLinkDTO
 *  com.estrat.backend.db.dto.PageLinkResponseDTO
 *  com.estrat.backend.db.exception.RequestException
 *  com.estrat.backend.db.resource.EmployeePagesLinkController
 *  com.estrat.backend.db.service.EmployeePagesLinkDetailsService
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
package com.estrat.backend.db.resource;

import com.estrat.backend.db.dto.PageLinkDTO;
import com.estrat.backend.db.dto.PageLinkResponseDTO;
import com.estrat.backend.db.exception.RequestException;
import com.estrat.backend.db.service.EmployeePagesLinkDetailsService;
import java.time.LocalDateTime;
import java.util.List;
import jakarta.servlet.http.HttpServletRequest;
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
        PageLinkResponseDTO responseDTO = null;
        if (!pageLinkDTOList.isEmpty()) {
            this.pagesLinkDetailsService.updateUser(pageLinkDTOList.get(0).getEmpId());
            for (PageLinkDTO pageLinkDTO : pageLinkDTOList) {
                pageLinkDTO.setCreatedTime(LocalDateTime.now());
                responseDTO = this.pagesLinkDetailsService.save(pageLinkDTO);
            }
        } else {
            responseDTO = new PageLinkResponseDTO();
        }
        return new ResponseEntity((Object)responseDTO, HttpStatus.OK);
    }

    @PutMapping(value={"/pageLink"})
    public ResponseEntity<PageLinkResponseDTO> updatePageLink(@RequestBody List<PageLinkDTO> pageLinkDTOList, HttpServletRequest request) throws RequestException {
        PageLinkResponseDTO responseDTO = null;
        if (!pageLinkDTOList.isEmpty()) {
            for (PageLinkDTO pageLinkDTO : pageLinkDTOList) {
                pageLinkDTO.setUpdatedTime(LocalDateTime.now());
                responseDTO = this.pagesLinkDetailsService.update(pageLinkDTO);
            }
        } else {
            responseDTO = new PageLinkResponseDTO();
        }
        return new ResponseEntity((Object)responseDTO, HttpStatus.OK);
    }

    @GetMapping(value={"/pageLinkListByEmpId/{empId}"})
    public ResponseEntity<PageLinkResponseDTO> get(@PathVariable(value="empId") long empId, HttpServletRequest request) throws RequestException {
        PageLinkResponseDTO responseDTO = new PageLinkResponseDTO();
        responseDTO.setPageLinkDTOS(this.pagesLinkDetailsService.findAll(empId));
        return new ResponseEntity((Object)responseDTO, HttpStatus.OK);
    }
}

