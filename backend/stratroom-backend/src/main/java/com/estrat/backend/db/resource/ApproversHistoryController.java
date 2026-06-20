/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.ApproversHistory
 *  com.estrat.backend.db.dto.ApproversHistoryDTO
 *  com.estrat.backend.db.exception.RequestException
 *  com.estrat.backend.db.resource.ApproversHistoryController
 *  com.estrat.backend.db.service.ApproversHistoryService
 *  javax.servlet.http.HttpServletRequest
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.http.HttpStatus
 *  org.springframework.http.ResponseEntity
 *  org.springframework.web.bind.annotation.DeleteMapping
 *  org.springframework.web.bind.annotation.GetMapping
 *  org.springframework.web.bind.annotation.PathVariable
 *  org.springframework.web.bind.annotation.PostMapping
 *  org.springframework.web.bind.annotation.RequestBody
 *  org.springframework.web.bind.annotation.RestController
 */
package com.estrat.backend.db.resource;

import com.estrat.backend.db.bean.po.ApproversHistory;
import com.estrat.backend.db.dto.ApproversHistoryDTO;
import com.estrat.backend.db.exception.RequestException;
import com.estrat.backend.db.service.ApproversHistoryService;
import java.time.LocalDateTime;
import java.util.Optional;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ApproversHistoryController {
    @Autowired
    protected ApproversHistoryService approversHistoryService;

    @PostMapping(value={"/saveworkFlowHistory"})
    public ResponseEntity<ApproversHistoryDTO> saveControlPanelWorkFlow(@RequestBody ApproversHistoryDTO approversHistoryDTO, HttpServletRequest request) throws RequestException {
        ApproversHistory approversHistory = new ApproversHistory(approversHistoryDTO);
        approversHistory.setActionDate(LocalDateTime.now());
        ApproversHistoryDTO approverDTO = this.approversHistoryService.save(approversHistory);
        return new ResponseEntity((Object)approverDTO, HttpStatus.OK);
    }

    @GetMapping(value={"/retriveWorkFlowHistory"})
    public ResponseEntity<?> findAllImpact() {
        return ResponseEntity.ok((Object)this.approversHistoryService.findAllHistory());
    }

    @GetMapping(value={"/retriveWorkFlowHistory/{id}"})
    public ResponseEntity<ApproversHistoryDTO> findImpactById(@PathVariable long id) {
        ApproversHistoryDTO approverDto = new ApproversHistoryDTO((ApproversHistory)this.approversHistoryService.findHistoryById(id).get());
        return new ResponseEntity((Object)approverDto, HttpStatus.OK);
    }

    @DeleteMapping(value={"/deleteWorkFlowHistory/{id}"})
    public ResponseEntity<ApproversHistoryDTO> deleteImpact(@PathVariable long id) {
        Optional optionalImpact = this.approversHistoryService.findHistoryById(id);
        ApproversHistory workFlow = (ApproversHistory)optionalImpact.get();
        if (optionalImpact.isPresent()) {
            this.approversHistoryService.delete(workFlow);
            return new ResponseEntity(HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }
}

