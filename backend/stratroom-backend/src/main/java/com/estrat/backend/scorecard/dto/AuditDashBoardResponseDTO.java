/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.scorecard.dto.AuditDashBoardResponseDTO
 *  com.estrat.backend.scorecard.dto.AuditManagementDTO
 */
package com.estrat.backend.scorecard.dto;

import com.estrat.backend.scorecard.dto.AuditManagementDTO;
import java.util.List;
import java.util.Map;

public class AuditDashBoardResponseDTO {
    private long totalAudit;
    private long totalOverDue;
    private List<AuditManagementDTO> auditManageDTO;
    private Map<String, Integer> auditStatusCount;
    private Map<String, Integer> auditTypeCount;
    private Map<String, Integer> frameWorkCount;
    private Map<String, Integer> findingsSeverityCount;

    public long getTotalAudit() {
        return this.totalAudit;
    }

    public void setTotalAudit(long totalAudit) {
        this.totalAudit = totalAudit;
    }

    public long getTotalOverDue() {
        return this.totalOverDue;
    }

    public void setTotalOverDue(long totalOverDue) {
        this.totalOverDue = totalOverDue;
    }

    public List<AuditManagementDTO> getAuditManageDTO() {
        return this.auditManageDTO;
    }

    public void setAuditManageDTO(List<AuditManagementDTO> auditManageDTO) {
        this.auditManageDTO = auditManageDTO;
    }

    public Map<String, Integer> getAuditStatusCount() {
        return this.auditStatusCount;
    }

    public void setAuditStatusCount(Map<String, Integer> auditStatusCount) {
        this.auditStatusCount = auditStatusCount;
    }

    public Map<String, Integer> getAuditTypeCount() {
        return this.auditTypeCount;
    }

    public void setAuditTypeCount(Map<String, Integer> auditTypeCount) {
        this.auditTypeCount = auditTypeCount;
    }

    public Map<String, Integer> getFrameWorkCount() {
        return this.frameWorkCount;
    }

    public void setFrameWorkCount(Map<String, Integer> frameWorkCount) {
        this.frameWorkCount = frameWorkCount;
    }

    public Map<String, Integer> getFindingsSeverityCount() {
        return this.findingsSeverityCount;
    }

    public void setFindingsSeverityCount(Map<String, Integer> findingsSeverityCount) {
        this.findingsSeverityCount = findingsSeverityCount;
    }
}

