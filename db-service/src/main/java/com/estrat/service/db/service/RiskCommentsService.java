/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.RiskComments
 *  com.estrat.service.db.cache.DBCache
 *  com.estrat.service.db.dao.RiskCommentsRepository
 *  com.estrat.service.db.dto.RiskCommentsDTO
 *  com.estrat.service.db.dto.RiskResponseDTO
 *  com.estrat.service.db.resource.util.UserThreadLocal
 *  com.estrat.service.db.service.CommentsMappingService
 *  com.estrat.service.db.service.RiskCommentsService
 *  javax.persistence.EntityNotFoundException
 *  org.apache.commons.lang3.StringUtils
 *  org.apache.log4j.Logger
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.service.db.service;

import com.estrat.service.db.bean.po.RiskComments;
import com.estrat.service.db.cache.DBCache;
import com.estrat.service.db.dao.RiskCommentsRepository;
import com.estrat.service.db.dto.RiskCommentsDTO;
import com.estrat.service.db.dto.RiskResponseDTO;
import com.estrat.service.db.resource.util.UserThreadLocal;
import com.estrat.service.db.service.CommentsMappingService;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import javax.persistence.EntityNotFoundException;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RiskCommentsService {
    private Logger log = Logger.getLogger(RiskCommentsService.class);
    @Autowired
    protected RiskCommentsRepository riskCommentsRepository;
    @Autowired
    protected CommentsMappingService commentsMappingService;
    @Autowired
    private DBCache dbCache;

    public Optional<RiskComments> findById(long id) {
        Optional optionalRisk = this.riskCommentsRepository.findById(id);
        if (optionalRisk.isPresent()) {
            return optionalRisk;
        }
        throw new EntityNotFoundException("RiskComments not found with ID: " + id);
    }

    public RiskResponseDTO save(RiskComments riskComments) {
        if (StringUtils.isNotEmpty((CharSequence)riskComments.getFromPage())) {
            if (!riskComments.getFromPage().equals("employee")) {
                riskComments.setFromPage("risk");
            }
        } else {
            riskComments.setFromPage("risk");
        }
        RiskComments riskCommentsResponse = (RiskComments)this.riskCommentsRepository.save(riskComments);
        RiskResponseDTO responseDTO = new RiskResponseDTO();
        responseDTO.setFlag(true);
        RiskCommentsDTO riskCommentsDTO = new RiskCommentsDTO(riskCommentsResponse);
        riskCommentsDTO.setLikeEmpIds(this.commentsMappingService.findAllBbyCommentID(Long.valueOf(riskCommentsDTO.getId()), "risk"));
        responseDTO.setRiskCommentsDTO(riskCommentsDTO);
        this.dbCache.remove((Object)("retrieveRiskCommentsByRiskId" + riskComments.getRiskId()), "dbCache");
        this.dbCache.remove((Object)("retrieveRiskCommentsByEmpId" + UserThreadLocal.get()), "dbCache");
        return responseDTO;
    }

    public void delete(RiskComments riskComments) {
        this.riskCommentsRepository.delete((Object)riskComments);
    }

    public List<RiskCommentsDTO> findAll(long empId) {
        List dbList = this.riskCommentsRepository.findAllByEmpId(Long.valueOf(empId), 0);
        List<RiskCommentsDTO> commentList = dbList.stream().map(dbValue -> {
            RiskCommentsDTO riskCommentsDTO = new RiskCommentsDTO(dbValue);
            riskCommentsDTO.setLikeEmpIds(this.commentsMappingService.findAllBbyCommentID(Long.valueOf(riskCommentsDTO.getId()), "risk"));
            return riskCommentsDTO;
        }).collect(Collectors.toList());
        this.dbCache.put((Object)("retrieveRiskCommentsByEmpId" + empId), commentList, "dbCache");
        return commentList;
    }

    public List<RiskCommentsDTO> findAllByRiskDetailsId(Long riskId, Long version) {
        List dbList = new ArrayList();
        dbList = version != 0L ? this.riskCommentsRepository.findAllByRiskDetailsIdNoparendWithVersion(riskId, version) : this.riskCommentsRepository.findAllByRiskDetailsIdNoparend(riskId);
        List<RiskCommentsDTO> commentList = dbList.stream().map(dbValue -> {
            RiskCommentsDTO riskCommentsDTO = new RiskCommentsDTO(dbValue);
            this.getReplyChildList(riskCommentsDTO);
            riskCommentsDTO.setLikeEmpIds(this.commentsMappingService.findAllBbyCommentID(Long.valueOf(riskCommentsDTO.getId()), "risk"));
            return riskCommentsDTO;
        }).collect(Collectors.toList());
        return commentList;
    }

    public List<RiskCommentsDTO> findAllByEmpIdANDFromPage(long empId) {
        List dbList = this.riskCommentsRepository.findAllByEmpId(Long.valueOf(empId), 0, "employee");
        List<RiskCommentsDTO> commentList = dbList.stream().map(dbValue -> {
            RiskCommentsDTO riskCommentsDTO = new RiskCommentsDTO(dbValue);
            this.getReplyChildList(riskCommentsDTO);
            riskCommentsDTO.setLikeEmpIds(this.commentsMappingService.findAllBbyCommentID(Long.valueOf(riskCommentsDTO.getId()), "risk"));
            return riskCommentsDTO;
        }).collect(Collectors.toList());
        return commentList;
    }

    public RiskCommentsDTO updateCommentLike(RiskCommentsDTO riskCommentsDTO) {
        Optional riskComments = this.riskCommentsRepository.findById(riskCommentsDTO.getId());
        RiskCommentsDTO response = null;
        if (riskComments.isPresent()) {
            RiskComments riskComments1 = (RiskComments)riskComments.get();
            riskComments1.setUpdatedTime(LocalDateTime.now());
            riskComments1.setLikeCount(riskCommentsDTO.getLikeCount());
            response = new RiskCommentsDTO((RiskComments)this.riskCommentsRepository.save(riskComments1));
            if (riskCommentsDTO.getType().equalsIgnoreCase("like")) {
                this.commentsMappingService.riskSaveCommentMapping(riskCommentsDTO);
            } else {
                this.commentsMappingService.riskDeleteCommentMapping(riskCommentsDTO);
            }
            response.setLikeEmpIds(this.commentsMappingService.findAllBbyCommentID(Long.valueOf(response.getId()), "risk"));
        }
        return response;
    }

    private RiskCommentsDTO getReplyChildList(RiskCommentsDTO riskCommentsDTO) {
        List listChildComment = this.riskCommentsRepository.findAllByParenId(Long.valueOf(riskCommentsDTO.getId()));
        List commentList = listChildComment.stream().map(dbValue -> {
            RiskCommentsDTO commentsDTO = new RiskCommentsDTO(dbValue);
            System.out.println(commentsDTO);
            return commentsDTO;
        }).collect(Collectors.toList());
        if (listChildComment != null) {
            riskCommentsDTO.setReplyComments(commentList);
            for (RiskCommentsDTO comments : commentList) {
                if (comments.getCommentsParendId() == 0L) continue;
                System.out.println("Enter child ");
                this.getReplyChildList(comments);
            }
        }
        return riskCommentsDTO;
    }
}

