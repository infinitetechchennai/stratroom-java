/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.KPIComments
 *  com.estrat.backend.db.converter.CommentsConverter
 *  com.estrat.backend.db.dao.KPICommentsRepository
 *  com.estrat.backend.db.dto.CommentsDTO
 *  com.estrat.backend.db.service.CommentService
 *  com.estrat.backend.db.service.CommentsMappingService
 *  com.estrat.backend.db.service.KPICommentsService
 *  org.apache.log4j.Logger
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.backend.db.service;

import com.estrat.backend.db.bean.po.KPIComments;
import com.estrat.backend.db.converter.CommentsConverter;
import com.estrat.backend.db.dao.KPICommentsRepository;
import com.estrat.backend.db.dto.CommentsDTO;
import com.estrat.backend.db.service.CommentService;
import com.estrat.backend.db.service.CommentsMappingService;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
    private Logger log = LoggerFactory.getLogger(CommentService.class);

    public CommentsDTO save(KPIComments comments) {
        return this.converter.convert((KPIComments)this.commentsRepository.save(comments));
    }

    public Optional<KPIComments> findById(long id) {
        return this.commentsRepository.findById(id);
    }

    public List<CommentsDTO> findAllByKPIId(Long kpiId) {
        List<KPIComments> commentsList = this.commentsRepository.findAllByKPIId(kpiId, 0);
        return commentsList.stream().map(comments -> {
            CommentsDTO commentsDTO = this.converter.convert(comments);
            this.getReplyChildList(commentsDTO);
            commentsDTO.setLikeEmpIds(this.commentsMappingService.findAllBbyCommentID(Long.valueOf(commentsDTO.getId()), "kpi"));
            return commentsDTO;
        }).collect(Collectors.toList());
    }

    public List<CommentsDTO> findAll(long empId) {
        List<KPIComments> dbList = this.commentsRepository.findAllByEmpId(Long.valueOf(empId), 0);
        List<CommentsDTO> commentsList = dbList.stream().map(dbValue -> {
            CommentsDTO commentsDTO = this.converter.convert(dbValue);
            commentsDTO.setLikeEmpIds(this.commentsMappingService.findAllBbyCommentID(Long.valueOf(commentsDTO.getId()), "kpi"));
            return commentsDTO;
        }).collect(Collectors.toList());
        this.log.debug("commentsList populated  into cache");
        return commentsList;
    }

    private CommentsDTO getReplyChildList(CommentsDTO commentsDTO) {
        List<KPIComments> listChildComment = this.commentsRepository.findAllByParenId(Long.valueOf(commentsDTO.getId()));
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

