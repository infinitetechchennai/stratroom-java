/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.controller.CommentsController
 *  com.estrat.web.dto.CommentsDTO
 *  com.estrat.web.dto.UserDTO
 *  com.estrat.web.exception.RequestException
 *  com.estrat.web.service.CommentService
 *  com.estrat.web.service.UserRoleManagementService
 *  com.estrat.web.util.RequestSessionUtil
 *  com.estrat.web.util.UserThreadLocal
 *  javax.servlet.http.HttpServletRequest
 *  org.apache.commons.lang3.StringUtils
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

import com.estrat.web.dto.CommentsDTO;
import com.estrat.web.dto.UserDTO;
import com.estrat.web.exception.RequestException;
import com.estrat.web.service.CommentService;
import com.estrat.web.service.UserRoleManagementService;
import com.estrat.web.util.RequestSessionUtil;
import com.estrat.web.util.UserThreadLocal;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import javax.servlet.http.HttpServletRequest;
import org.apache.commons.lang3.StringUtils;
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
public class CommentsController {
    @Autowired
    protected CommentService commentService;
    @Autowired
    protected RequestSessionUtil sessionUtil;
    @Autowired
    protected UserRoleManagementService userRoleManagementService;

    @PostMapping(value={"/comments"})
    public ResponseEntity<CommentsDTO> saveCommentsDetails(@RequestBody CommentsDTO comments, HttpServletRequest request) throws RequestException {
        this.applyDefaultValues(comments.getCommentsValue());
        comments.setCreatedBy(Long.parseLong(UserThreadLocal.get().getProfile().getEmpId()));
        comments.getCommentsValue().put("createdByName", UserThreadLocal.get().getProfile().getFirstName());
        UserDTO userDTO = this.userRoleManagementService.findById(Long.parseLong(UserThreadLocal.get().getProfile().getEmpId()));
        if (Objects.nonNull(userDTO)) {
            comments.getCommentsValue().put("title", userDTO.getDesignation());
        }
        return new ResponseEntity(this.commentService.createComment(comments), HttpStatus.OK);
    }

    @PutMapping(value={"/comments"})
    public ResponseEntity<CommentsDTO> updateCommentsDetails(@RequestBody CommentsDTO commentsDTO, HttpServletRequest request) throws RequestException {
        this.applyDefaultValues(commentsDTO.getCommentsValue());
        commentsDTO.setUpdatedBy(Long.parseLong(UserThreadLocal.get().getProfile().getEmpId()));
        commentsDTO.getCommentsValue().put("updatedByName", UserThreadLocal.get().getProfile().getFirstName());
        commentsDTO.getCommentsValue().put("createdByName", UserThreadLocal.get().getProfile().getFirstName());
        UserDTO userDTO = this.userRoleManagementService.findById(Long.parseLong(UserThreadLocal.get().getProfile().getEmpId()));
        if (Objects.nonNull(userDTO)) {
            commentsDTO.getCommentsValue().put("title", userDTO.getDesignation());
        }
        return new ResponseEntity(this.commentService.updateComment(commentsDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/comments/{id}"})
    public ResponseEntity<CommentsDTO> getCommentsDetailsById(@PathVariable Long id) throws RequestException {
        return new ResponseEntity(this.commentService.retriveComment(id), HttpStatus.OK);
    }

    @DeleteMapping(value={"/comments/{id}"})
    public ResponseEntity<Boolean> deleteCommentsDetailsById(@PathVariable Long id) throws RequestException {
        this.commentService.removeComment(id);
        return new ResponseEntity(true, HttpStatus.OK);
    }

    @GetMapping(value={"/commentList/{initiativeId}"})
    public ResponseEntity<List<CommentsDTO>> findAllByInitiativesId(@PathVariable(value="initiativeId") Long initiativeId) throws RequestException {
        return new ResponseEntity(this.commentService.findAllByInitiativesId(initiativeId), HttpStatus.OK);
    }

    @GetMapping(value={"/retrieveCommentList/{empId}"})
    public ResponseEntity<List<CommentsDTO>> findAllByEmpId(@PathVariable(value="empId") String empId) throws RequestException {
        List commentsList = this.commentService.findAllByEmpId(empId);
        return new ResponseEntity(commentsList, HttpStatus.OK);
    }

    private void applyDefaultValues(Map<String, Object> subInitiativeValue) {
        if (Objects.isNull(subInitiativeValue.get("progressval")) || StringUtils.isEmpty((CharSequence)subInitiativeValue.get("progressval").toString())) {
            subInitiativeValue.put("progressval", "0");
        }
    }

    @GetMapping(value={"/commentList/kpi/{kpiId}"})
    public ResponseEntity<List<CommentsDTO>> findAllBykpiId(@PathVariable(value="kpiId") String kpiId) throws RequestException {
        List commentsList = this.commentService.findAllByKPIId(kpiId);
        return new ResponseEntity(commentsList, HttpStatus.OK);
    }

    @DeleteMapping(value={"/comments/kpi/{id}"})
    public ResponseEntity<Boolean> deleteKpiCommentsById(@PathVariable(value="id") Long id, HttpServletRequest request) throws RequestException {
        this.commentService.removeKPIComment(id);
        return new ResponseEntity(true, HttpStatus.OK);
    }

    @DeleteMapping(value={"/comments/employee/{id}"})
    public ResponseEntity<Boolean> deleteEmployeeCommentsById(@PathVariable(value="id") Long id, HttpServletRequest request) throws RequestException {
        this.commentService.removeEmployeeComment(id);
        return new ResponseEntity(true, HttpStatus.OK);
    }

    @GetMapping(value={"/commentList/employee/{empId}"})
    public ResponseEntity<List<CommentsDTO>> findAllEmpComments(@PathVariable(value="empId") String empId) throws RequestException {
        List commentsList = this.commentService.findAllEmpIdComments(empId);
        return new ResponseEntity(commentsList, HttpStatus.OK);
    }

    @PutMapping(value={"/commentLike"})
    public ResponseEntity<CommentsDTO> updateCommentLike(@RequestBody CommentsDTO commentsDTO) throws RequestException {
        return new ResponseEntity(this.commentService.updateCommentLike(commentsDTO), HttpStatus.OK);
    }
}

