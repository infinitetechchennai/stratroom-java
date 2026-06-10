/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.EmployeeComments
 *  com.estrat.backend.db.converter.CommentsConverter
 *  com.estrat.backend.db.dao.EmployeeCommentsRepository
 *  com.estrat.backend.db.dto.CommentsDTO
 *  com.estrat.backend.db.service.CommentsMappingService
 *  com.estrat.backend.db.service.EmployeeCommentService
 *  org.apache.log4j.Logger
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.backend.db.service;

import com.estrat.backend.db.bean.po.EmployeeComments;
import com.estrat.backend.db.converter.CommentsConverter;
import com.estrat.backend.db.dao.EmployeeCommentsRepository;
import com.estrat.backend.db.dto.CommentsDTO;
import com.estrat.backend.db.service.CommentsMappingService;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmployeeCommentService {
    @Autowired
    protected EmployeeCommentsRepository commentsRepository;
    @Autowired
    private CommentsConverter converter;
    @Autowired
    private CommentsMappingService commentsMappingService;
    private Logger log = LoggerFactory.getLogger(EmployeeCommentService.class);

    public CommentsDTO save(EmployeeComments comments) {
        return this.converter.convert((EmployeeComments)this.commentsRepository.save(comments));
    }

    public Optional<EmployeeComments> findById(long id) {
        return this.commentsRepository.findById(id);
    }

    public List<CommentsDTO> findAll(long empId) {
        List<EmployeeComments> dbList = this.commentsRepository.findAllByEmpId(Long.valueOf(empId), 0);
        List<CommentsDTO> commentsList = dbList.stream().map(dbValue -> {
            CommentsDTO commentsDTO = this.converter.convert(dbValue);
            this.getReplyChildList(commentsDTO);
            commentsDTO.setLikeEmpIds(this.commentsMappingService.findAllBbyCommentID(Long.valueOf(commentsDTO.getId()), "employee"));
            return commentsDTO;
        }).collect(Collectors.toList());
        this.log.debug("commentsList populated  into cache");
        return commentsList;
    }

    private CommentsDTO getReplyChildList(CommentsDTO commentsDTO) {
        List<EmployeeComments> listChildComment = this.commentsRepository.findAllByParenId(Long.valueOf(commentsDTO.getId()));
        List<CommentsDTO> commentList = listChildComment.stream().map(dbValue -> {
            CommentsDTO commentsDTOs = this.converter.convert(dbValue);
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

