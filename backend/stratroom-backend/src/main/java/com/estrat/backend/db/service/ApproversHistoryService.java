/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.ApproversHistory
 *  com.estrat.backend.db.dao.ApproversHistoryRepository
 *  com.estrat.backend.db.dto.ApproversHistoryDTO
 *  com.estrat.backend.db.service.ApproversHistoryService
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.backend.db.service;

import com.estrat.backend.db.bean.po.ApproversHistory;
import com.estrat.backend.db.dao.ApproversHistoryRepository;
import com.estrat.backend.db.dto.ApproversHistoryDTO;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ApproversHistoryService {
    @Autowired
    private ApproversHistoryRepository approversHistoryRepo;

    public ApproversHistoryDTO save(ApproversHistory approversHistory) {
        ApproversHistory aproverHistory = (ApproversHistory)this.approversHistoryRepo.save(approversHistory);
        ApproversHistoryDTO approversHistoryDTO = new ApproversHistoryDTO(aproverHistory);
        return approversHistoryDTO;
    }

    public List<ApproversHistoryDTO> findAllHistory() {
        List<ApproversHistory> impactList = this.approversHistoryRepo.findAll();
        List<ApproversHistoryDTO> workflowDtoList = impactList.stream().map(dbValue -> {
            ApproversHistoryDTO workflowDto = new ApproversHistoryDTO(dbValue);
            return workflowDto;
        }).collect(Collectors.toList());
        return workflowDtoList;
    }

    public Optional<ApproversHistory> findHistoryById(long id) {
        return this.approversHistoryRepo.findById(id);
    }

    public void delete(ApproversHistory approversHistory) {
        this.approversHistoryRepo.delete(approversHistory);
    }

    public List<ApproversHistory> getApprovalHistoryForApprover(Long approverId) {
        return this.approversHistoryRepo.findAllByApproverId(approverId);
    }

    public List<ApproversHistory> getPendingApprovalsForApprover(Long approverId) {
        return this.approversHistoryRepo.findAllByApproverIdAndStatus(approverId, "Pending");
    }
}

