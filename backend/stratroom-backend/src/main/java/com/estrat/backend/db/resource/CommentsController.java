/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.Comments
 *  com.estrat.backend.db.bean.po.EmployeeComments
 *  com.estrat.backend.db.bean.po.KPIComments
 *  com.estrat.backend.db.cache.DBCache
 *  com.estrat.backend.db.converter.CommentsConverter
 *  com.estrat.backend.db.dto.CommentsDTO
 *  com.estrat.backend.db.dto.EmployeeDTO
 *  com.estrat.backend.db.dto.InitiativeResponseDTO
 *  com.estrat.backend.db.exception.RequestException
 *  com.estrat.backend.db.resource.CommentsController
 *  com.estrat.backend.db.resource.util.CacheUtil
 *  com.estrat.backend.db.service.CommentService
 *  com.estrat.backend.db.service.CommentsMappingService
 *  com.estrat.backend.db.service.EmployeeCommentService
 *  com.estrat.backend.db.service.EmployeeService
 *  com.estrat.backend.db.service.KPICommentsService
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
package com.estrat.backend.db.resource;

import com.estrat.backend.db.bean.po.Comments;
import com.estrat.backend.db.bean.po.EmployeeComments;
import com.estrat.backend.db.bean.po.KPIComments;
import com.estrat.backend.db.cache.DBCache;
import com.estrat.backend.db.converter.CommentsConverter;
import com.estrat.backend.db.dto.CommentsDTO;
import com.estrat.backend.db.dto.EmployeeDTO;
import com.estrat.backend.db.dto.InitiativeResponseDTO;
import com.estrat.backend.db.exception.RequestException;
import com.estrat.backend.db.resource.util.CacheUtil;
import com.estrat.backend.db.service.CommentService;
import com.estrat.backend.db.service.CommentsMappingService;
import com.estrat.backend.db.service.EmployeeCommentService;
import com.estrat.backend.db.service.EmployeeService;
import com.estrat.backend.db.service.KPICommentsService;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import jakarta.servlet.http.HttpServletRequest;
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
    private EmployeeService employeeService;
    @Autowired
    private DBCache dbCache;
    @Autowired
    private KPICommentsService kpiCommentService;
    @Autowired
    private EmployeeCommentService employeeCommentService;
    @Autowired
    private CommentsConverter commentsConverter;
    @Autowired
    private CommentsMappingService commentsMappingService;
    @Autowired
    private CacheUtil cacheUtil;

    @PostMapping(value={"/comments"})
    public ResponseEntity<CommentsDTO> saveCommentsDetails(@RequestBody CommentsDTO comments, HttpServletRequest request) throws RequestException {
        EmployeeDTO employeeDTO = new EmployeeDTO();
        this.commentService.updateCommentsDetails(comments);
        if (comments.getCreatedBy() != 0L) {
            employeeDTO.setEmployeeId(comments.getCreatedBy());
            comments.getCommentsValue().put("createdByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (comments.getUpdatedBy() != 0L) {
            employeeDTO.setEmployeeId(comments.getUpdatedBy());
            comments.getCommentsValue().put("updatedByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (comments.getOwner() != 0L) {
            employeeDTO.setEmployeeId(comments.getOwner());
            comments.getCommentsValue().put("ownerName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (comments.getCommentsParendId() != null && comments.getCommentsParendId() != 0L) {
            comments.setCommentType(1);
        }
        CommentsDTO commentsDTO = null;
        if (StringUtils.isNotEmpty((CharSequence)comments.getFromPage()) && ("kpi".equalsIgnoreCase(comments.getFromPage()) || "subkpi".equalsIgnoreCase(comments.getFromPage()))) {
            KPIComments commentsBo = this.commentsConverter.convert(comments);
            commentsBo.setCreatedTime(this.getCurrentTimeUTC());
            commentsDTO = this.kpiCommentService.save(commentsBo);
        } else if (StringUtils.isNotEmpty((CharSequence)comments.getFromPage()) && "employee".equalsIgnoreCase(comments.getFromPage())) {
            EmployeeComments commentsBo = this.commentsConverter.convertEmployeeComments(comments);
            commentsBo.setCreatedTime(this.getCurrentTimeUTC());
            commentsDTO = this.employeeCommentService.save(commentsBo);
        } else {
            Comments commentsBo = new Comments(comments);
            commentsBo.setCreatedTime(this.getCurrentTimeUTC());
            commentsDTO = this.commentService.save(commentsBo);
            String loggedInEmpId = request.getHeader("LOGGED_IN_EMPLOYEE_ID");
            String cacheKey = String.join((CharSequence)"_", loggedInEmpId, "commentsList");
            this.dbCache.remove((Object)cacheKey, "dbCache");
            this.cacheUtil.removeCache(loggedInEmpId);
        }
        return new ResponseEntity((Object)commentsDTO, HttpStatus.OK);
    }

    @PutMapping(value={"/comments"})
    public ResponseEntity<CommentsDTO> updateCommentsDetails(@RequestBody CommentsDTO commentsDTO, HttpServletRequest request) throws RequestException {
        CommentsDTO commentsDTOObj = null;
        if (commentsDTO.getCommentsParendId() != null && commentsDTO.getCommentsParendId() != 0L) {
            commentsDTO.setCommentType(1);
        }
        if (Objects.nonNull(commentsDTO.getId()) && commentsDTO.getId() > 0L) {
            if (StringUtils.isNotEmpty((CharSequence)commentsDTO.getFromPage()) && ("kpi".equalsIgnoreCase(commentsDTO.getFromPage()) || "subkpi".equalsIgnoreCase(commentsDTO.getFromPage()))) {
                Optional kpicomments = this.kpiCommentService.findById(commentsDTO.getId());
                if (kpicomments.isPresent()) {
                    CommentsDTO commentsDTO_val = this.commentsConverter.convert((KPIComments)kpicomments.get());
                    commentsDTO_val.getCommentsValue().put("desc", commentsDTO.getCommentsValue().get("desc"));
                    KPIComments commentsBo = this.commentsConverter.convert(commentsDTO_val);
                    commentsDTOObj = this.kpiCommentService.save(commentsBo);
                }
            } else if (StringUtils.isNotEmpty((CharSequence)commentsDTO.getFromPage()) && "employee".equalsIgnoreCase(commentsDTO.getFromPage())) {
                Optional empcomments = this.employeeCommentService.findById(commentsDTO.getId());
                CommentsDTO commentsDTO_val = this.commentsConverter.convert((EmployeeComments)empcomments.get());
                commentsDTO_val.getCommentsValue().put("desc", commentsDTO.getCommentsValue().get("desc"));
                EmployeeComments commentsBo = this.commentsConverter.convertEmployeeComments(commentsDTO);
                commentsBo.setCreatedTime(this.getCurrentTimeUTC());
                commentsDTOObj = this.employeeCommentService.save(commentsBo);
            } else {
                Optional comments = this.commentService.findById(commentsDTO.getId());
                CommentsDTO commentsDTO_val = new CommentsDTO((Comments)comments.get());
                commentsDTO_val.getCommentsValue().put("desc", commentsDTO.getCommentsValue().get("desc"));
                Comments commentsBo = new Comments(commentsDTO_val);
                commentsBo.setUpdatedTime(this.getCurrentTimeUTC());
                commentsDTOObj = this.commentService.save(commentsBo);
                String loggedInEmpId = request.getHeader("LOGGED_IN_EMPLOYEE_ID");
                String cacheKey = String.join((CharSequence)"_", loggedInEmpId, "commentsList");
                this.dbCache.remove((Object)cacheKey, "dbCache");
                this.cacheUtil.removeCache(loggedInEmpId);
            }
        }
        return new ResponseEntity(commentsDTOObj, HttpStatus.OK);
    }

    @GetMapping(value={"/comments/{id}"})
    public ResponseEntity<CommentsDTO> getCommentsDetailsById(@PathVariable(value="id") Long id) throws RequestException {
        CommentsDTO commentsDTO = new CommentsDTO((Comments)this.commentService.findById(id.longValue()).get());
        return new ResponseEntity((Object)commentsDTO, HttpStatus.OK);
    }

    @DeleteMapping(value={"/comments/{id}"})
    public ResponseEntity<InitiativeResponseDTO> deleteCommentsDetailsById(@PathVariable(value="id") Long id, HttpServletRequest request) throws RequestException {
        Optional comments = this.commentService.findById(id.longValue());
        if (comments.isPresent()) {
            Comments commentsBo = (Comments)comments.get();
            commentsBo.setActive(1);
            this.commentService.delete(commentsBo);
            InitiativeResponseDTO initiativeResponseDTO = new InitiativeResponseDTO();
            initiativeResponseDTO.setFlag(true);
            String loggedInEmpId = request.getHeader("LOGGED_IN_EMPLOYEE_ID");
            String cacheKey = String.join((CharSequence)"_", loggedInEmpId, "commentsList");
            this.dbCache.remove((Object)cacheKey, "dbCache");
            this.cacheUtil.removeCache(loggedInEmpId);
            return new ResponseEntity((Object)initiativeResponseDTO, HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping(value={"/comments/kpi/{id}"})
    public ResponseEntity<InitiativeResponseDTO> deleteKpiCommentsById(@PathVariable(value="id") Long id, HttpServletRequest request) throws RequestException {
        Optional comments = this.kpiCommentService.findById(id.longValue());
        if (comments.isPresent()) {
            KPIComments commentsBo = (KPIComments)comments.get();
            commentsBo.setActive(1);
            this.kpiCommentService.save(commentsBo);
            InitiativeResponseDTO initiativeResponseDTO = new InitiativeResponseDTO();
            initiativeResponseDTO.setFlag(true);
            return new ResponseEntity((Object)initiativeResponseDTO, HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    @GetMapping(value={"/commentList/{initiativeId}"})
    public ResponseEntity<List<CommentsDTO>> findAllByInitiativesId(@PathVariable(value="initiativeId") Long initiativeId) throws RequestException {
        return new ResponseEntity((Object)this.commentService.findAllByInitiativesId(initiativeId), HttpStatus.OK);
    }

    @GetMapping(value={"/commentList/kpi/{kpiId}"})
    public ResponseEntity<List<CommentsDTO>> findAllBykpiId(@PathVariable(value="kpiId") Long kpiId) throws RequestException {
        return new ResponseEntity((Object)this.kpiCommentService.findAllByKPIId(kpiId), HttpStatus.OK);
    }

    @GetMapping(value={"/retrieveCommentList/{empId}"})
    public ResponseEntity<List<CommentsDTO>> findAllByEmpId(@PathVariable(value="empId") Long empId) throws RequestException {
        List commentsList = this.commentService.findAll(empId.longValue());
        return new ResponseEntity((Object)commentsList, HttpStatus.OK);
    }

    @DeleteMapping(value={"/comments/employee/{id}"})
    public ResponseEntity<InitiativeResponseDTO> deleteEmployeeCommentsById(@PathVariable(value="id") Long id, HttpServletRequest request) throws RequestException {
        Optional comments = this.employeeCommentService.findById(id.longValue());
        if (comments.isPresent()) {
            EmployeeComments commentsBo = (EmployeeComments)comments.get();
            commentsBo.setActive(1);
            this.employeeCommentService.save(commentsBo);
            InitiativeResponseDTO initiativeResponseDTO = new InitiativeResponseDTO();
            initiativeResponseDTO.setFlag(true);
            return new ResponseEntity((Object)initiativeResponseDTO, HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    @GetMapping(value={"/commentList/employee/{empId}"})
    public ResponseEntity<List<CommentsDTO>> findAllEmpComments(@PathVariable(value="empId") Long empId) throws RequestException {
        return new ResponseEntity((Object)this.employeeCommentService.findAll(empId.longValue()), HttpStatus.OK);
    }

    @PutMapping(value={"/commentLike"})
    public ResponseEntity<CommentsDTO> updateCommentLike(@RequestBody CommentsDTO commentsDTO) throws RequestException {
        CommentsDTO commentsDTOObj = null;
        if (StringUtils.isNotEmpty((CharSequence)commentsDTO.getFromPage()) && "kpi".equalsIgnoreCase(commentsDTO.getFromPage())) {
            Optional kpiComments = this.kpiCommentService.findById(commentsDTO.getId());
            if (kpiComments.isPresent()) {
                KPIComments commentsBo = (KPIComments)kpiComments.get();
                commentsBo.setLikeCount(commentsDTO.getLikeCount());
                commentsBo.setUpdatedTime(this.getCurrentTimeUTC());
                commentsDTOObj = this.kpiCommentService.save(commentsBo);
                if (commentsDTO.getType().equalsIgnoreCase("like")) {
                    List commentsmappinglist = this.commentsMappingService.findAllBbyCommentID(Long.valueOf(commentsDTO.getId()), "kpi");
                    if (Objects.isNull(commentsmappinglist)) {
                        this.commentsMappingService.KpiSaveCommentMapping(commentsDTO);
                    } else if (commentsmappinglist.size() == 0) {
                        this.commentsMappingService.KpiSaveCommentMapping(commentsDTO);
                    }
                } else {
                    this.commentsMappingService.KpiDeleteCommentMapping(commentsDTO);
                }
                commentsDTOObj.setLikeEmpIds(this.commentsMappingService.findAllBbyCommentID(Long.valueOf(commentsDTOObj.getId()), "kpi"));
            }
        } else if (StringUtils.isNotEmpty((CharSequence)commentsDTO.getFromPage()) && "employee".equalsIgnoreCase(commentsDTO.getFromPage())) {
            Optional employeeComments = this.employeeCommentService.findById(commentsDTO.getId());
            if (employeeComments.isPresent()) {
                EmployeeComments commentsBo = (EmployeeComments)employeeComments.get();
                commentsBo.setLikeCount(commentsDTO.getLikeCount());
                commentsBo.setUpdatedTime(this.getCurrentTimeUTC());
                commentsDTOObj = this.employeeCommentService.save(commentsBo);
                if (commentsDTO.getType().equalsIgnoreCase("like")) {
                    List commentsmappinglist = this.commentsMappingService.findAllBbyCommentID(Long.valueOf(commentsDTO.getId()), "employee");
                    if (Objects.isNull(commentsmappinglist)) {
                        this.commentsMappingService.empSaveCommentMapping(commentsDTO);
                    } else if (commentsmappinglist.size() == 0) {
                        this.commentsMappingService.empSaveCommentMapping(commentsDTO);
                    }
                } else {
                    this.commentsMappingService.empDeleteCommentMapping(commentsDTO);
                }
                commentsDTOObj.setLikeEmpIds(this.commentsMappingService.findAllBbyCommentID(Long.valueOf(commentsDTOObj.getId()), "employee"));
            }
        } else {
            Optional comments = this.commentService.findById(commentsDTO.getId());
            if (comments.isPresent()) {
                Comments commentsBo = (Comments)comments.get();
                commentsBo.setUpdatedTime(this.getCurrentTimeUTC());
                commentsBo.setLikeCount(commentsDTO.getLikeCount());
                commentsDTOObj = this.commentService.save(commentsBo);
                if (commentsDTO.getType().equalsIgnoreCase("like")) {
                    List commentsmappinglist = this.commentsMappingService.findAllBbyCommentID(Long.valueOf(commentsDTO.getId()), "");
                    if (Objects.isNull(commentsmappinglist)) {
                        this.commentsMappingService.saveCommentMapping(commentsDTO);
                    } else if (commentsmappinglist.size() == 0) {
                        this.commentsMappingService.saveCommentMapping(commentsDTO);
                    }
                } else {
                    this.commentsMappingService.deleteCommentMapping(commentsDTO);
                }
                commentsDTOObj.setLikeEmpIds(this.commentsMappingService.findAllBbyCommentID(Long.valueOf(commentsDTOObj.getId()), "comment"));
            }
        }
        return new ResponseEntity(commentsDTOObj, HttpStatus.OK);
    }

    public LocalDateTime getCurrentTimeUTC() {
        LocalDateTime currentTime = LocalDateTime.now();
        ZonedDateTime timeDefault = currentTime.atZone(ZoneId.systemDefault());
        ZonedDateTime timeUTC = timeDefault.withZoneSameInstant(ZoneOffset.UTC);
        return timeUTC.toLocalDateTime();
    }
}

