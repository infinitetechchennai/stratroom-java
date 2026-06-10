/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.scorecard.dto.CommentsDTO
 *  com.estrat.backend.scorecard.exception.RequestException
 *  com.estrat.backend.scorecard.service.CommentService
 *  com.estrat.backend.scorecard.web.controller.initiatives.CommentsController
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
package com.estrat.backend.scorecard.web.controller.initiatives;

import com.estrat.backend.scorecard.dto.CommentsDTO;
import com.estrat.backend.scorecard.exception.RequestException;
import com.estrat.backend.scorecard.service.CommentService;
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
public class CommentsController {
    @Autowired
    protected CommentService commentService;

    @PostMapping(value={"/comments"})
    public ResponseEntity<CommentsDTO> saveCommentsDetails(@RequestBody CommentsDTO comments) throws RequestException {
        return new ResponseEntity((Object)this.commentService.createComment(comments), HttpStatus.OK);
    }

    @PutMapping(value={"/comments"})
    public ResponseEntity<CommentsDTO> updateCommentsDetails(@RequestBody CommentsDTO commentsDTO) throws RequestException {
        return new ResponseEntity((Object)this.commentService.updateComment(commentsDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/comments/{id}"})
    public ResponseEntity<CommentsDTO> getCommentsDetailsById(@PathVariable Long id) throws RequestException {
        return new ResponseEntity((Object)this.commentService.retriveComment(id), HttpStatus.OK);
    }

    @DeleteMapping(value={"/comments/{id}"})
    public ResponseEntity<Boolean> deleteCommentsDetailsById(@PathVariable Long id) throws RequestException {
        this.commentService.removeComment(id);
        return new ResponseEntity((Object)true, HttpStatus.OK);
    }

    @GetMapping(value={"/commentList/{initiativeId}"})
    public ResponseEntity<List<CommentsDTO>> findAllByInitiativesId(@PathVariable(value="initiativeId") Long initiativeId) throws RequestException {
        return new ResponseEntity((Object)this.commentService.findAllByInitiativesId(initiativeId), HttpStatus.OK);
    }

    @GetMapping(value={"/retrieveCommentList/{empId}"})
    public ResponseEntity<List<CommentsDTO>> findAllByEmpId(@PathVariable(value="empId") Long empId) throws RequestException {
        List commentsList = this.commentService.findAllByEmpId(empId);
        return new ResponseEntity((Object)commentsList, HttpStatus.OK);
    }

    @GetMapping(value={"/commentList/kpi/{kpiId}"})
    public ResponseEntity<List<CommentsDTO>> findAllBykpiId(@PathVariable(value="kpiId") Long kpiId) throws RequestException {
        List commentsList = this.commentService.findAllByKPIId(kpiId);
        return new ResponseEntity((Object)commentsList, HttpStatus.OK);
    }

    @DeleteMapping(value={"/comments/kpi/{id}"})
    public ResponseEntity<Boolean> deleteKpiCommentsById(@PathVariable(value="id") Long id, HttpServletRequest request) throws RequestException {
        this.commentService.removeKPIComment(id);
        return new ResponseEntity((Object)true, HttpStatus.OK);
    }

    @DeleteMapping(value={"/comments/employee/{id}"})
    public ResponseEntity<Boolean> deleteEmployeeCommentsById(@PathVariable(value="id") Long id, HttpServletRequest request) throws RequestException {
        this.commentService.removeEmployeeComment(id);
        return new ResponseEntity((Object)true, HttpStatus.OK);
    }

    @GetMapping(value={"/commentList/employee/{empId}"})
    public ResponseEntity<List<CommentsDTO>> findAllEmpComments(@PathVariable(value="empId") Long empId) throws RequestException {
        List commentsList = this.commentService.findAllEmpIdComments(empId);
        return new ResponseEntity((Object)commentsList, HttpStatus.OK);
    }

    @PutMapping(value={"/commentLike"})
    public ResponseEntity<CommentsDTO> updateCommentLike(@RequestBody CommentsDTO commentsDTO) throws RequestException {
        return new ResponseEntity((Object)this.commentService.updateCommentLike(commentsDTO), HttpStatus.OK);
    }
}

