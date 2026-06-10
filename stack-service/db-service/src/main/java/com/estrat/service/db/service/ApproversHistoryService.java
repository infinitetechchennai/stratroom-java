/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.ApproversHistory
 *  com.estrat.service.db.dao.ApproversHistoryRepository
 *  com.estrat.service.db.dto.ApproversHistoryDTO
 *  com.estrat.service.db.service.ApproversHistoryService
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.service.db.service;

import com.estrat.service.db.bean.po.ApproversHistory;
import com.estrat.service.db.dao.ApproversHistoryRepository;
import com.estrat.service.db.dto.ApproversHistoryDTO;
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
        List impactList = this.approversHistoryRepo.findAll();
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
        this.approversHistoryRepo.delete((Object)approversHistory);
    }

    public List<ApproversHistory> getApprovalHistoryForApprover(Long approverId) {
        return this.approversHistoryRepo.findAllByApproverId(approverId);
    }

    public List<ApproversHistory> getPendingApprovalsForApprover(Long approverId) {
        return this.approversHistoryRepo.findAllByApproverIdAndStatus(approverId, "Pending");
    }
}

