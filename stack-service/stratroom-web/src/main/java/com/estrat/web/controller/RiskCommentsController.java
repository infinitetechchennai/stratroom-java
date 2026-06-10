/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.controller.RiskCommentsController
 *  com.estrat.web.dto.RiskCommentsDTO
 *  com.estrat.web.dto.RiskResponseDTO
 *  com.estrat.web.dto.UserDTO
 *  com.estrat.web.exception.RequestException
 *  com.estrat.web.service.RiskCommentsService
 *  com.estrat.web.service.UserRoleManagementService
 *  com.estrat.web.util.RequestSessionUtil
 *  com.estrat.web.util.UserThreadLocal
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

import com.estrat.web.dto.RiskCommentsDTO;
import com.estrat.web.dto.RiskResponseDTO;
import com.estrat.web.dto.UserDTO;
import com.estrat.web.exception.RequestException;
import com.estrat.web.service.RiskCommentsService;
import com.estrat.web.service.UserRoleManagementService;
import com.estrat.web.util.RequestSessionUtil;
import com.estrat.web.util.UserThreadLocal;
import java.util.List;
import java.util.Objects;
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
public class RiskCommentsController {
    @Autowired
    private RiskCommentsService riskCommentsService;
    @Autowired
    protected RequestSessionUtil sessionUtil;
    @Autowired
    protected UserRoleManagementService userRoleManagementService;

    @PostMapping(value={"/riskComments"})
    public ResponseEntity<RiskResponseDTO> saveRiskComments(@RequestBody RiskCommentsDTO riskCommentsDTO, HttpServletRequest request) throws RequestException {
        System.out.println(" comments :: " + Long.parseLong(UserThreadLocal.get().getProfile().getEmpId()));
        riskCommentsDTO.setCreatedBy(Long.parseLong(UserThreadLocal.get().getProfile().getEmpId()));
        riskCommentsDTO.getRiskCommentsValue().put("createdByName", UserThreadLocal.get().getProfile().getFirstName());
        UserDTO userDTO = this.userRoleManagementService.findById(Long.parseLong(UserThreadLocal.get().getProfile().getEmpId()));
        if (Objects.nonNull(userDTO)) {
            riskCommentsDTO.getRiskCommentsValue().put("title", userDTO.getDesignation());
        }
        return new ResponseEntity(this.riskCommentsService.saveRiskComments(riskCommentsDTO), HttpStatus.OK);
    }

    @PutMapping(value={"/riskComments"})
    public ResponseEntity<RiskResponseDTO> updateRiskComments(@RequestBody RiskCommentsDTO riskCommentsDTO, HttpServletRequest request) throws RequestException {
        riskCommentsDTO.setUpdatedBy(Long.parseLong(UserThreadLocal.get().getProfile().getEmpId()));
        riskCommentsDTO.getRiskCommentsValue().put("createdByName", UserThreadLocal.get().getProfile().getFirstName());
        riskCommentsDTO.getRiskCommentsValue().put("updatedByName", UserThreadLocal.get().getProfile().getFirstName());
        UserDTO userDTO = this.userRoleManagementService.findById(Long.parseLong(UserThreadLocal.get().getProfile().getEmpId()));
        if (Objects.nonNull(userDTO)) {
            riskCommentsDTO.getRiskCommentsValue().put("title", userDTO.getDesignation());
        }
        return new ResponseEntity(this.riskCommentsService.updateRiskComments(riskCommentsDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/riskComments/{id}"})
    public ResponseEntity<RiskCommentsDTO> getRiskCommentsById(@PathVariable Long id) throws RequestException {
        return new ResponseEntity(this.riskCommentsService.retrieveRiskComments(id), HttpStatus.OK);
    }

    @DeleteMapping(value={"/riskComments/{id}"})
    public ResponseEntity<Boolean> deleteRiskCommentsById(@PathVariable(value="id") Long id) throws RequestException {
        this.riskCommentsService.removeRiskComments(id);
        return new ResponseEntity(true, HttpStatus.OK);
    }

    @GetMapping(value={"/riskCommentsList/{riskId}"})
    public ResponseEntity<List<RiskCommentsDTO>> findAllByRiskId(@PathVariable(value="riskId") Long riskId) throws RequestException {
        List RiskCommentsDTOList = this.riskCommentsService.findAllByRiskId(riskId);
        if (!RiskCommentsDTOList.isEmpty()) {
            return new ResponseEntity(RiskCommentsDTOList, HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    @GetMapping(value={"/retrieveRiskCommentsList"})
    public ResponseEntity<List<RiskCommentsDTO>> findAllByEmpId(HttpServletRequest request) throws RequestException {
        List RiskCommentsDTOList = this.riskCommentsService.findAllByEmpId(Long.valueOf(this.sessionUtil.getSessionId(request)));
        return new ResponseEntity(RiskCommentsDTOList, HttpStatus.OK);
    }

    @GetMapping(value={"/employeeRiskCommentsList"})
    public ResponseEntity<List<RiskCommentsDTO>> findAllByEmpIdANDFromPage(HttpServletRequest request) throws RequestException {
        List RiskCommentsDTOList = this.riskCommentsService.findAllByEmpIdANDFromPage(Long.valueOf(this.sessionUtil.getSessionId(request)));
        return new ResponseEntity(RiskCommentsDTOList, HttpStatus.OK);
    }

    @PutMapping(value={"/riskCommentLike"})
    public ResponseEntity<RiskCommentsDTO> updateCommentLike(@RequestBody RiskCommentsDTO commentsDTO) throws RequestException {
        return new ResponseEntity(this.riskCommentsService.updateCommentLike(commentsDTO), HttpStatus.OK);
    }
}

