/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.Employee
 *  com.estrat.backend.db.bean.po.Comments
 *  com.estrat.backend.db.cache.DBCache
 *  com.estrat.backend.db.dao.CommentsRepository
 *  com.estrat.backend.db.dto.CommentsDTO
 *  com.estrat.backend.db.dto.EmployeeDTO
 *  com.estrat.backend.db.service.CommentService
 *  com.estrat.backend.db.service.CommentsMappingService
 *  com.estrat.backend.db.service.EmployeeService
 *  org.apache.log4j.Logger
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.backend.db.service;

import com.estrat.backend.db.bean.Employee;
import com.estrat.backend.db.bean.po.Comments;
import com.estrat.backend.db.cache.DBCache;
import com.estrat.backend.db.dao.CommentsRepository;
import com.estrat.backend.db.dto.CommentsDTO;
import com.estrat.backend.db.dto.EmployeeDTO;
import com.estrat.backend.db.service.CommentsMappingService;
import com.estrat.backend.db.service.EmployeeService;
import java.text.DateFormatSymbols;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommentService {
    @Autowired
    protected CommentsRepository commentsRepository;
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    protected CommentsMappingService commentsMappingService;
    @Autowired
    private DBCache dbCache;
    private Logger log = LoggerFactory.getLogger(CommentService.class);

    public Optional<Comments> findById(long id) {
        return this.commentsRepository.findById(id);
    }

    public void delete(Comments comments) {
        this.commentsRepository.delete(comments);
    }

    public CommentsDTO save(Comments comments) {
        return new CommentsDTO((Comments)this.commentsRepository.save(comments));
    }

    public List<CommentsDTO> findAllByInitiativesId(Long initiativesId) {
        List<Comments> commentsList = this.commentsRepository.findAllByInitiativesId(initiativesId);
        return commentsList.stream().map(comments -> {
            CommentsDTO commentsDto = new CommentsDTO(comments);
            this.getReplyChildList(commentsDto);
            commentsDto.setLikeEmpIds(this.commentsMappingService.findAllBbyCommentID(Long.valueOf(commentsDto.getId()), "comment"));
            return commentsDto;
        }).collect(Collectors.toList());
    }

    public List<CommentsDTO> findAll(long empId) {
        String cacheKey = String.join((CharSequence)"_", String.valueOf(empId), "commentsList");
        if (this.dbCache.get((Object)cacheKey, "dbCache") != null) {
            this.log.debug("commentsList returned from cache");
            return (List)this.dbCache.get((Object)cacheKey, "dbCache");
        }
        List<Comments> dbList = this.commentsRepository.findAllByEmpId(Long.valueOf(empId), 0);
        List<CommentsDTO> commentsList = dbList.stream().map(dbValue -> {
            CommentsDTO commentsDTO = new CommentsDTO(dbValue);
            this.getReplyChildList(commentsDTO);
            commentsDTO.setLikeEmpIds(this.commentsMappingService.findAllBbyCommentID(Long.valueOf(commentsDTO.getId()), "comment"));
            return commentsDTO;
        }).collect(Collectors.toList());
        this.log.debug("commentsList populated  into cache");
        this.dbCache.put((Object)cacheKey, commentsList, "dbCache");
        return commentsList;
    }

    public void updateCommentsDetails(CommentsDTO commentsDTO) {
        EmployeeDTO employeeDTO = new EmployeeDTO();
        if (commentsDTO.getCreatedBy() != 0L) {
            employeeDTO.setEmployeeId(commentsDTO.getCreatedBy());
        } else {
            employeeDTO.setEmployeeId(commentsDTO.getUpdatedBy());
        }
        Employee employee = this.employeeService.getEmployee(employeeDTO);
        commentsDTO.getCommentsValue().put("commentsImage", employee.getProfileImage());
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date());
        SimpleDateFormat dateFormat = new SimpleDateFormat("MMM dd,yyyy");
        DateFormatSymbols symbols = new DateFormatSymbols(Locale.getDefault());
        int hour = calendar.get(10);
        String hourValue = hour < 12 ? "AM" : "PM";
        String dayOfMonthStr = symbols.getWeekdays()[calendar.get(7)];
        String hourMin = String.join((CharSequence)":", String.valueOf(calendar.get(11)), String.valueOf(calendar.get(12)));
        commentsDTO.getCommentsValue().put("formattedTime", String.join((CharSequence)" ", dateFormat.format(new Date()), hourMin, hourValue, dayOfMonthStr));
        commentsDTO.getCommentsValue().put("formattedDateTime", this.getCurrentTimeUTC().toString());
    }

    public LocalDateTime getCurrentTimeUTC() {
        LocalDateTime currentTime = LocalDateTime.now();
        ZonedDateTime timeDefault = currentTime.atZone(ZoneId.systemDefault());
        ZonedDateTime timeUTC = timeDefault.withZoneSameInstant(ZoneOffset.UTC);
        return timeUTC.toLocalDateTime();
    }

    private CommentsDTO getReplyChildList(CommentsDTO commentsDTO) {
        List<Comments> listChildComment = this.commentsRepository.findAllByParenId(Long.valueOf(commentsDTO.getId()));
        List<CommentsDTO> commentList = listChildComment.stream().map(dbValue -> {
            CommentsDTO commentsDTOs = new CommentsDTO(dbValue);
            return commentsDTOs;
        }).collect(Collectors.toList());
        if (listChildComment != null) {
            commentsDTO.setReplyComments(commentList);
            for (CommentsDTO comments : commentList) {
                if (comments.getCommentsParendId() == 0L) continue;
                System.out.println("Enter child ");
                this.getReplyChildList(comments);
            }
        }
        return commentsDTO;
    }
}

