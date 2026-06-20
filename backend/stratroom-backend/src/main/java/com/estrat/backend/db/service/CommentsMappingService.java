/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.CommentMapping
 *  com.estrat.backend.db.bean.po.EmpCommentMapping
 *  com.estrat.backend.db.bean.po.KPICommentMapping
 *  com.estrat.backend.db.bean.po.RiskCommentMapping
 *  com.estrat.backend.db.dto.CommentsDTO
 *  com.estrat.backend.db.dto.RiskCommentsDTO
 *  com.estrat.backend.db.repository.CommentMappingRepo
 *  com.estrat.backend.db.repository.EmpCommentMappingRepo
 *  com.estrat.backend.db.repository.KPICommentMappingRepo
 *  com.estrat.backend.db.repository.RiskCommentMappingRepo
 *  com.estrat.backend.db.service.CommentsMappingService
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.backend.db.service;

import com.estrat.backend.db.bean.po.CommentMapping;
import com.estrat.backend.db.bean.po.EmpCommentMapping;
import com.estrat.backend.db.bean.po.KPICommentMapping;
import com.estrat.backend.db.bean.po.RiskCommentMapping;
import com.estrat.backend.db.dto.CommentsDTO;
import com.estrat.backend.db.dto.RiskCommentsDTO;
import com.estrat.backend.db.repository.CommentMappingRepo;
import com.estrat.backend.db.repository.EmpCommentMappingRepo;
import com.estrat.backend.db.repository.KPICommentMappingRepo;
import com.estrat.backend.db.repository.RiskCommentMappingRepo;
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
            this.empCommentMappingRepo.delete(empCommentMapping);
        }
    }

    public void KpiSaveCommentMapping(CommentsDTO commentsDTO) {
        KPICommentMapping kpiCommentMapping = new KPICommentMapping(commentsDTO.getEmpId(), Long.valueOf(commentsDTO.getId()));
        this.kpiCommentMappingRepo.save(kpiCommentMapping);
    }

    public void KpiDeleteCommentMapping(CommentsDTO commentsDTO) {
        KPICommentMapping kpiCommentMapping = this.kpiCommentMappingRepo.findByCmdIdANDEmpId(commentsDTO.getEmpId(), Long.valueOf(commentsDTO.getId()));
        if (kpiCommentMapping != null) {
            this.kpiCommentMappingRepo.delete(kpiCommentMapping);
        }
    }

    public void riskSaveCommentMapping(RiskCommentsDTO commentsDTO) {
        RiskCommentMapping riskCommentMapping = new RiskCommentMapping(commentsDTO.getEmpId(), Long.valueOf(commentsDTO.getId()));
        this.riskCommentMappingRepo.save(riskCommentMapping);
    }

    public void riskDeleteCommentMapping(RiskCommentsDTO commentsDTO) {
        RiskCommentMapping riskCommentMapping = this.riskCommentMappingRepo.findByCmdIdANDEmpId(commentsDTO.getEmpId(), Long.valueOf(commentsDTO.getId()));
        if (riskCommentMapping != null) {
            this.riskCommentMappingRepo.delete(riskCommentMapping);
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
            this.commentMappingRepo.delete(commentMapping);
        }
    }
}

