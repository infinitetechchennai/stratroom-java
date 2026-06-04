/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.KPIComments
 *  com.estrat.service.db.converter.CommentsConverter
 *  com.estrat.service.db.dao.KPICommentsRepository
 *  com.estrat.service.db.dto.CommentsDTO
 *  com.estrat.service.db.service.CommentService
 *  com.estrat.service.db.service.CommentsMappingService
 *  com.estrat.service.db.service.KPICommentsService
 *  org.apache.log4j.Logger
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.service.db.service;

import com.estrat.service.db.bean.po.KPIComments;
import com.estrat.service.db.converter.CommentsConverter;
import com.estrat.service.db.dao.KPICommentsRepository;
import com.estrat.service.db.dto.CommentsDTO;
import com.estrat.service.db.service.CommentService;
import com.estrat.service.db.service.CommentsMappingService;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class KPICommentsService {
    @Autowired
    protected KPICommentsRepository commentsRepository;
    @Autowired
    private CommentsConverter converter;
    @Autowired
    private CommentsMappingService commentsMappingService;
    private Logger log = Logger.getLogger(CommentService.class);

    public CommentsDTO save(KPIComments comments) {
        return this.converter.convert((KPIComments)this.commentsRepository.save(comments));
    }

    public Optional<KPIComments> findById(long id) {
        return this.commentsRepository.findById(id);
    }

    public List<CommentsDTO> findAllByKPIId(Long kpiId) {
        List commentsList = this.commentsRepository.findAllByKPIId(kpiId, 0);
        return commentsList.stream().map(comments -> {
            CommentsDTO commentsDTO = this.converter.convert(comments);
            this.getReplyChildList(commentsDTO);
            commentsDTO.setLikeEmpIds(this.commentsMappingService.findAllBbyCommentID(Long.valueOf(commentsDTO.getId()), "kpi"));
            return commentsDTO;
        }).collect(Collectors.toList());
    }

    public List<CommentsDTO> findAll(long empId) {
        List dbList = this.commentsRepository.findAllByEmpId(Long.valueOf(empId), 0);
        List<CommentsDTO> commentsList = dbList.stream().map(dbValue -> {
            CommentsDTO commentsDTO = this.converter.convert(dbValue);
            commentsDTO.setLikeEmpIds(this.commentsMappingService.findAllBbyCommentID(Long.valueOf(commentsDTO.getId()), "kpi"));
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

