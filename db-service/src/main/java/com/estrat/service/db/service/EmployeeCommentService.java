/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.EmployeeComments
 *  com.estrat.service.db.converter.CommentsConverter
 *  com.estrat.service.db.dao.EmployeeCommentsRepository
 *  com.estrat.service.db.dto.CommentsDTO
 *  com.estrat.service.db.service.CommentsMappingService
 *  com.estrat.service.db.service.EmployeeCommentService
 *  org.apache.log4j.Logger
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.service.db.service;

import com.estrat.service.db.bean.po.EmployeeComments;
import com.estrat.service.db.converter.CommentsConverter;
import com.estrat.service.db.dao.EmployeeCommentsRepository;
import com.estrat.service.db.dto.CommentsDTO;
import com.estrat.service.db.service.CommentsMappingService;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.apache.log4j.Logger;
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
    private Logger log = Logger.getLogger(EmployeeCommentService.class);

    public CommentsDTO save(EmployeeComments comments) {
        return this.converter.convert((EmployeeComments)this.commentsRepository.save(comments));
    }

    public Optional<EmployeeComments> findById(long id) {
        return this.commentsRepository.findById(id);
    }

    public List<CommentsDTO> findAll(long empId) {
        List dbList = this.commentsRepository.findAllByEmpId(Long.valueOf(empId), 0);
        List<CommentsDTO> commentsList = dbList.stream().map(dbValue -> {
            CommentsDTO commentsDTO = this.converter.convert(dbValue);
            this.getReplyChildList(commentsDTO);
            commentsDTO.setLikeEmpIds(this.commentsMappingService.findAllBbyCommentID(Long.valueOf(commentsDTO.getId()), "employee"));
            return commentsDTO;
        }).collect(Collectors.toList());
        this.log.debug((Object)"commentsList populated  into cache");
        return commentsList;
    }

    private CommentsDTO getReplyChildList(CommentsDTO commentsDTO) {
        List listChildComment = this.commentsRepository.findAllByParenId(Long.valueOf(commentsDTO.getId()));
        List commentList = listChildComment.stream().map(dbValue -> {
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

