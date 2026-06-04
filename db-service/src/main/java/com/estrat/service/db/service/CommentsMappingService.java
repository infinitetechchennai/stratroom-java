/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.CommentMapping
 *  com.estrat.service.db.bean.po.EmpCommentMapping
 *  com.estrat.service.db.bean.po.KPICommentMapping
 *  com.estrat.service.db.bean.po.RiskCommentMapping
 *  com.estrat.service.db.dto.CommentsDTO
 *  com.estrat.service.db.dto.RiskCommentsDTO
 *  com.estrat.service.db.repository.CommentMappingRepo
 *  com.estrat.service.db.repository.EmpCommentMappingRepo
 *  com.estrat.service.db.repository.KPICommentMappingRepo
 *  com.estrat.service.db.repository.RiskCommentMappingRepo
 *  com.estrat.service.db.service.CommentsMappingService
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.service.db.service;

import com.estrat.service.db.bean.po.CommentMapping;
import com.estrat.service.db.bean.po.EmpCommentMapping;
import com.estrat.service.db.bean.po.KPICommentMapping;
import com.estrat.service.db.bean.po.RiskCommentMapping;
import com.estrat.service.db.dto.CommentsDTO;
import com.estrat.service.db.dto.RiskCommentsDTO;
import com.estrat.service.db.repository.CommentMappingRepo;
import com.estrat.service.db.repository.EmpCommentMappingRepo;
import com.estrat.service.db.repository.KPICommentMappingRepo;
import com.estrat.service.db.repository.RiskCommentMappingRepo;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommentsMappingService {
    @Autowired
    private EmpCommentMappingRepo empCommentMappingRepo;
    @Autowired
    private RiskCommentMappingRepo riskCommentMappingRepo;
    @Autowired
    private CommentMappingRepo commentMappingRepo;
    @Autowired
    private KPICommentMappingRepo kpiCommentMappingRepo;

    public void empSaveCommentMapping(CommentsDTO commentsDTO) {
        EmpCommentMapping empCommentMapping = new EmpCommentMapping(commentsDTO.getEmpId(), Long.valueOf(commentsDTO.getId()));
        this.empCommentMappingRepo.save(empCommentMapping);
    }

    public void empDeleteCommentMapping(CommentsDTO commentsDTO) {
        EmpCommentMapping empCommentMapping = this.empCommentMappingRepo.findByCmdIdANDEmpId(commentsDTO.getEmpId(), Long.valueOf(commentsDTO.getId()));
        if (empCommentMapping != null) {
            this.empCommentMappingRepo.delete((Object)empCommentMapping);
        }
    }

    public void KpiSaveCommentMapping(CommentsDTO commentsDTO) {
        KPICommentMapping kpiCommentMapping = new KPICommentMapping(commentsDTO.getEmpId(), Long.valueOf(commentsDTO.getId()));
        this.kpiCommentMappingRepo.save(kpiCommentMapping);
    }

    public void KpiDeleteCommentMapping(CommentsDTO commentsDTO) {
        KPICommentMapping kpiCommentMapping = this.kpiCommentMappingRepo.findByCmdIdANDEmpId(commentsDTO.getEmpId(), Long.valueOf(commentsDTO.getId()));
        if (kpiCommentMapping != null) {
            this.kpiCommentMappingRepo.delete((Object)kpiCommentMapping);
        }
    }

    public void riskSaveCommentMapping(RiskCommentsDTO commentsDTO) {
        RiskCommentMapping riskCommentMapping = new RiskCommentMapping(commentsDTO.getEmpId(), Long.valueOf(commentsDTO.getId()));
        this.riskCommentMappingRepo.save(riskCommentMapping);
    }

    public void riskDeleteCommentMapping(RiskCommentsDTO commentsDTO) {
        RiskCommentMapping riskCommentMapping = this.riskCommentMappingRepo.findByCmdIdANDEmpId(commentsDTO.getEmpId(), Long.valueOf(commentsDTO.getId()));
        if (riskCommentMapping != null) {
            this.riskCommentMappingRepo.delete((Object)riskCommentMapping);
        }
    }

    public List<Long> findAllBbyCommentID(Long commentId, String type) {
        if (type.equalsIgnoreCase("kpi")) {
            return this.kpiCommentMappingRepo.findAllByCmdId(commentId);
        }
        if (type.equalsIgnoreCase("risk")) {
            return this.riskCommentMappingRepo.findAllByCmdId(commentId);
        }
        if (type.equalsIgnoreCase("employee")) {
            return this.empCommentMappingRepo.findAllByCmdId(commentId);
        }
        return this.commentMappingRepo.findAllByCmdId(commentId);
    }

    public void saveCommentMapping(CommentsDTO commentsDTO) {
        CommentMapping commentMapping = new CommentMapping(commentsDTO.getEmpId(), Long.valueOf(commentsDTO.getId()));
        this.commentMappingRepo.save(commentMapping);
    }

    public void deleteCommentMapping(CommentsDTO commentsDTO) {
        CommentMapping commentMapping = this.commentMappingRepo.findByCmdIdANDEmpId(commentsDTO.getEmpId(), Long.valueOf(commentsDTO.getId()));
        if (commentMapping != null) {
            this.commentMappingRepo.delete((Object)commentMapping);
        }
    }
}

