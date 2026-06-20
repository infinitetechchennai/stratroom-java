/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.dto.ApprovalRequestDTO
 *  com.estrat.backend.db.dto.ApprovalResponseDTO
 *  com.estrat.backend.db.dto.ApproversHistoryDTO
 *  com.estrat.backend.db.dto.StagingChangeDTO
 *  com.estrat.backend.db.resource.WorkflowController
 *  com.estrat.backend.db.resource.util.UserThreadLocal
 *  com.estrat.backend.db.service.StagingChangeService
 *  javax.servlet.http.HttpServletRequest
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.http.ResponseEntity
 *  org.springframework.web.bind.annotation.GetMapping
 *  org.springframework.web.bind.annotation.PathVariable
 *  org.springframework.web.bind.annotation.PostMapping
 *  org.springframework.web.bind.annotation.RequestBody
 *  org.springframework.web.bind.annotation.RequestMapping
 *  org.springframework.web.bind.annotation.RestController
 */
package com.estrat.backend.db.resource;

import com.estrat.backend.db.dto.ApprovalRequestDTO;
import com.estrat.backend.db.dto.ApprovalResponseDTO;
import com.estrat.backend.db.dto.ApproversHistoryDTO;
import com.estrat.backend.db.dto.StagingChangeDTO;
import com.estrat.backend.db.resource.util.UserThreadLocal;
import com.estrat.backend.db.service.StagingChangeService;
import java.util.List;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value={"/api/workflowevents"})
public class WorkflowController {
    @Autowired
    private StagingChangeService stagingChangeService;

    @GetMapping
    public ResponseEntity<List<StagingChangeDTO>> getStagingChangesForUser(HttpServletRequest request) {
        String userId = (String)UserThreadLocal.getHeaders().get("LOGGED_IN_EMPLOYEE_ID");
        List<StagingChangeDTO> changes = this.stagingChangeService.getStagingChangesForUser(userId);
        return ResponseEntity.ok(changes);
    }

    @GetMapping(value={"/{changeId}/details"})
    public ResponseEntity<StagingChangeDTO> getStagingChangeDetails(@PathVariable Long changeId, HttpServletRequest request) {
        String userId = (String)UserThreadLocal.getHeaders().get("LOGGED_IN_EMPLOYEE_ID");
        StagingChangeDTO details = this.stagingChangeService.getStagingChangeDetails(changeId, userId);
        return ResponseEntity.ok(details);
    }

    @GetMapping(value={"/{changeId}/history"})
    public ResponseEntity<List<ApproversHistoryDTO>> getApprovalHistory(@PathVariable Long changeId) {
        String userId = (String)UserThreadLocal.getHeaders().get("LOGGED_IN_EMPLOYEE_ID");
        List<ApproversHistoryDTO> history = this.stagingChangeService.getApprovalHistory(changeId, Long.valueOf(Long.parseLong(userId)));
        return ResponseEntity.ok(history);
    }

    @PostMapping(value={"/{changeId}/action"})
    public ResponseEntity<ApprovalResponseDTO> approveStagingChange(@PathVariable Long changeId, @RequestBody ApprovalRequestDTO approvalRequest, HttpServletRequest request) {
        String userId = (String)UserThreadLocal.getHeaders().get("LOGGED_IN_EMPLOYEE_ID");
        ApprovalResponseDTO response = this.stagingChangeService.approveStagingChange(changeId, approvalRequest, userId);
        return ResponseEntity.ok(response);
    }
}

