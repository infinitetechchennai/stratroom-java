/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.scorecard.dto.ApprovalRequestDTO
 *  com.estrat.backend.scorecard.dto.ApprovalResponseDTO
 *  com.estrat.backend.scorecard.dto.ApproversHistoryDTO
 *  com.estrat.backend.scorecard.dto.StagingChangeDTO
 *  com.estrat.backend.scorecard.service.ApproversHistoryService
 *  com.estrat.backend.scorecard.service.StagingChangeService
 *  com.estrat.backend.scorecard.web.controller.approvers.ApproversHistoryController
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.http.HttpStatus
 *  org.springframework.http.ResponseEntity
 *  org.springframework.web.bind.annotation.DeleteMapping
 *  org.springframework.web.bind.annotation.GetMapping
 *  org.springframework.web.bind.annotation.PathVariable
 *  org.springframework.web.bind.annotation.PostMapping
 *  org.springframework.web.bind.annotation.PutMapping
 *  org.springframework.web.bind.annotation.RequestBody
 *  org.springframework.web.bind.annotation.RequestParam
 *  org.springframework.web.bind.annotation.RestController
 */
package com.estrat.backend.scorecard.web.controller.approvers;

import com.estrat.backend.scorecard.dto.ApprovalRequestDTO;
import com.estrat.backend.scorecard.dto.ApprovalResponseDTO;
import com.estrat.backend.scorecard.dto.ApproversHistoryDTO;
import com.estrat.backend.scorecard.dto.StagingChangeDTO;
import com.estrat.backend.scorecard.service.ApproversHistoryService;
import com.estrat.backend.scorecard.service.StagingChangeService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ApproversHistoryController {
    @Autowired
    private ApproversHistoryService approversHistoryService;
    @Autowired
    private StagingChangeService stagingChangeService;

    @PostMapping(value={"/saveworkFlowHistory"})
    public ResponseEntity<ApproversHistoryDTO> saveFlowHistory(@RequestBody ApproversHistoryDTO approversHistoryDTO) {
        return new ResponseEntity((Object)this.approversHistoryService.saveFlowHistory(approversHistoryDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/retriveWorkFlowHistory"})
    public ResponseEntity<List<ApproversHistoryDTO>> findAllFlowHistory() {
        return new ResponseEntity((Object)this.approversHistoryService.findFlowHistory(), HttpStatus.OK);
    }

    @GetMapping(value={"/retriveWorkFlowHistory/{id}"})
    public ResponseEntity<ApproversHistoryDTO> findFLowHistoryId(@PathVariable(value="id") long id) {
        return new ResponseEntity((Object)this.approversHistoryService.findFlowHistoryById(id), HttpStatus.OK);
    }

    @DeleteMapping(value={"/deleteWorkFlowHistory/{id}"})
    public ResponseEntity<Boolean> fLowHistroy(@PathVariable(value="id") long id) {
        this.approversHistoryService.removeFlowHistory(id);
        return new ResponseEntity((Object)true, HttpStatus.OK);
    }

    @PutMapping(value={"/updateWorkFlowHistory"})
    public ResponseEntity<ApproversHistoryDTO> updateWorkFLow(@RequestBody ApproversHistoryDTO approversHistoryDTO) {
        return new ResponseEntity((Object)this.approversHistoryService.updateFlowHistory(approversHistoryDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/api/workflowevents"})
    public ResponseEntity<List<StagingChangeDTO>> getStagingChangesForUser() {
        List changes = this.stagingChangeService.getStagingChangesForUser();
        return new ResponseEntity((Object)changes, HttpStatus.OK);
    }

    @GetMapping(value={"/api/workflowevents/{changeId}/details"})
    public ResponseEntity<StagingChangeDTO> getStagingChangeDetails(@PathVariable Long changeId) {
        StagingChangeDTO details = this.stagingChangeService.getStagingChangeDetails(changeId);
        return new ResponseEntity((Object)details, HttpStatus.OK);
    }

    @GetMapping(value={"/api/workflowevents/{changeId}/history"})
    public ResponseEntity<List<ApproversHistoryDTO>> getApprovalHistory(@PathVariable Long changeId) {
        List history = this.stagingChangeService.getApprovalHistory(changeId);
        return new ResponseEntity((Object)history, HttpStatus.OK);
    }

    @PostMapping(value={"/api/workflowevents/{changeId}/action"})
    public ResponseEntity<ApprovalResponseDTO> approveStagingChange(@PathVariable Long changeId, @RequestBody ApprovalRequestDTO approvalRequest) {
        ApprovalResponseDTO response = this.stagingChangeService.approveStagingChange(changeId, approvalRequest);
        return new ResponseEntity((Object)response, HttpStatus.OK);
    }

    @GetMapping(value={"/approveVersion"})
    public ResponseEntity<List<StagingChangeDTO>> getApproveVersion(@RequestParam(value="tableName", required=false) String tableName, @RequestParam(value="recordId", required=false) Long recordId) {
        List changes = this.stagingChangeService.getApproveVersionr(tableName, recordId);
        return new ResponseEntity((Object)changes, HttpStatus.OK);
    }
}

