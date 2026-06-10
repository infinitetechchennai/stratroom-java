/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.ControlPanelWorkFlow
 *  com.estrat.service.db.bean.po.ControlPanelWorkFlowApproverMapping
 *  com.estrat.service.db.bean.po.StagingChange
 *  com.estrat.service.db.bean.po.WorkflowStagingResponse
 *  com.estrat.service.db.dao.ControlPanelWorkFlowRepository
 *  com.estrat.service.db.dao.StagingChangeRepository
 *  com.estrat.service.db.dto.ControlPanelWorkFlowDTO
 *  com.estrat.service.db.dto.StagingChangeDTO
 *  com.estrat.service.db.resource.util.UserThreadLocal
 *  com.estrat.service.db.service.ControlPanelWorkFlowService
 *  com.estrat.service.db.service.StagingChangeService
 *  com.estrat.service.db.service.WorkflowStagingService
 *  com.fasterxml.jackson.core.JsonProcessingException
 *  com.fasterxml.jackson.databind.DeserializationFeature
 *  com.fasterxml.jackson.databind.Module
 *  com.fasterxml.jackson.databind.ObjectMapper
 *  com.fasterxml.jackson.databind.SerializationFeature
 *  com.fasterxml.jackson.datatype.jsr310.JavaTimeModule
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.service.db.service;

import com.estrat.service.db.bean.po.ControlPanelWorkFlow;
import com.estrat.service.db.bean.po.ControlPanelWorkFlowApproverMapping;
import com.estrat.service.db.bean.po.StagingChange;
import com.estrat.service.db.bean.po.WorkflowStagingResponse;
import com.estrat.service.db.dao.ControlPanelWorkFlowRepository;
import com.estrat.service.db.dao.StagingChangeRepository;
import com.estrat.service.db.dto.ControlPanelWorkFlowDTO;
import com.estrat.service.db.dto.StagingChangeDTO;
import com.estrat.service.db.resource.util.UserThreadLocal;
import com.estrat.service.db.service.ControlPanelWorkFlowService;
import com.estrat.service.db.service.StagingChangeService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.Module;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WorkflowStagingService {
    @Autowired
    private StagingChangeRepository stagingChangesRepository;
    @Autowired
    private ControlPanelWorkFlowService controlPanelWorkFlowService;
    @Autowired
    StagingChangeService stagingChangeService;
    @Autowired
    ControlPanelWorkFlowRepository workflowRepository;

    public WorkflowStagingResponse handleWorkflowAndStagingChange(String tableName, Long recordId, Long departmentId, String entityType, Object newEntityData, Long currentVersion, Long employeeId) {
        List openChanges = this.stagingChangesRepository.findByRecordIdAndTableNameAndStatusNot(recordId.longValue(), tableName, "APPROVED");
        List workflows = this.controlPanelWorkFlowService.findWorkflowsByTypeAndDept(entityType, departmentId);
        if (workflows.isEmpty()) {
            if (!openChanges.isEmpty()) {
                System.out.println("Work flow is empty ");
                ControlPanelWorkFlow workflow = (ControlPanelWorkFlow)this.workflowRepository.findById(((StagingChange)openChanges.get(0)).getWorkflowId()).orElseThrow(() -> new IllegalStateException("Workflow not found"));
                Long userId = Long.parseLong((String)UserThreadLocal.getHeaders().get("LOGGED_IN_EMPLOYEE_ID"));
                System.out.println("userId ::: " + userId);
                ControlPanelWorkFlowApproverMapping matchedApprover = workflow.getApproverList().stream().filter(approver -> userId.equals(approver.getAprovalRoleId())).findFirst().orElse(null);
                System.out.println("matchedApprover ===> " + matchedApprover);
                boolean isApprover = workflow.getApproverList().stream().anyMatch(approver -> userId.equals(approver.getAprovalRoleId()));
                System.out.println("if user is approver ::: " + isApprover);
                if (isApprover) {
                    workflows.add(new ControlPanelWorkFlowDTO(workflow));
                }
                if (!isApprover) {
                    System.out.println("User is NOT an approver. ");
                    return new WorkflowStagingResponse(false, currentVersion, "APPROVED", null, null);
                }
            } else {
                System.out.println("Openchangs is empty. ");
                return new WorkflowStagingResponse(false, currentVersion, "APPROVED", null, null);
            }
        }
        Long versionToUse = currentVersion;
        StagingChange stagingChange = null;
        if (!openChanges.isEmpty()) {
            stagingChange = (StagingChange)openChanges.get(0);
            stagingChange.setNewValue(this.serializeObjectToJson(newEntityData));
        } else {
            stagingChange = new StagingChange();
            stagingChange.setTableName(tableName);
            stagingChange.setRecordId(recordId);
            stagingChange.setNewValue(this.serializeObjectToJson(newEntityData));
            stagingChange.setStatus("IN PROGRESS");
            stagingChange.setVersion(currentVersion + 1L);
            stagingChange.setWorkflowId(Long.valueOf(((ControlPanelWorkFlowDTO)workflows.get(0)).getId()));
            stagingChange.setType(entityType);
            stagingChange.setSubmittedBy(employeeId);
            stagingChange.setConditionType("Manual");
            stagingChange.setCreatedAt(LocalDateTime.now());
            stagingChange.setUpdatedAt(LocalDateTime.now());
            stagingChange = (StagingChange)this.stagingChangesRepository.save(stagingChange);
            versionToUse = currentVersion + 1L;
        }
        return new WorkflowStagingResponse(true, versionToUse, "DRAFT", stagingChange, (ControlPanelWorkFlowDTO)workflows.get(0));
    }

    public WorkflowStagingResponse handleWorkflowAndStagingChangeForBudget(String tableName, Long recordId, Long departmentId, String entityType, Object newEntityData, Long currentVersion, Long employeeId) {
        System.out.println("Enter in staging flow create");
        System.out.println("departmentId : " + departmentId);
        List openChanges = this.stagingChangesRepository.findByTableNameAndStatus("budget_details", "DRAFT");
        List workflows = this.controlPanelWorkFlowService.findWorkflowsByTypeAndDept(entityType, departmentId);
        if (workflows.isEmpty()) {
            if (!openChanges.isEmpty()) {
                System.out.println("Work flow is empty ");
                ControlPanelWorkFlow workflow = (ControlPanelWorkFlow)this.workflowRepository.findById(((StagingChange)openChanges.get(0)).getWorkflowId()).orElseThrow(() -> new IllegalStateException("Workflow not found"));
                Long userId = Long.parseLong((String)UserThreadLocal.getHeaders().get("LOGGED_IN_EMPLOYEE_ID"));
                System.out.println("userId ::: " + userId);
                ControlPanelWorkFlowApproverMapping matchedApprover = workflow.getApproverList().stream().filter(approver -> userId.equals(approver.getAprovalRoleId())).findFirst().orElse(null);
                System.out.println("matchedApprover ===> " + matchedApprover);
                boolean isApprover = workflow.getApproverList().stream().anyMatch(approver -> userId.equals(approver.getAprovalRoleId()));
                System.out.println("if user is approver ::: " + isApprover);
                if (isApprover) {
                    workflows.add(new ControlPanelWorkFlowDTO(workflow));
                }
                if (!isApprover) {
                    System.out.println("User is NOT an approver. ");
                    return new WorkflowStagingResponse(false, currentVersion, "APPROVED", null, null);
                }
            } else {
                System.out.println("Openchangs is empty. ");
                return new WorkflowStagingResponse(false, currentVersion, "APPROVED", null, null);
            }
        }
        System.out.println("openChanges ++ " + openChanges);
        Long versionToUse = currentVersion;
        StagingChange stagingChange = null;
        if (!openChanges.isEmpty()) {
            stagingChange = (StagingChange)openChanges.get(0);
        } else {
            stagingChange = new StagingChange();
            stagingChange.setTableName(tableName);
            stagingChange.setStatus("DRAFT");
            stagingChange.setWorkflowId(Long.valueOf(((ControlPanelWorkFlowDTO)workflows.get(0)).getId()));
            stagingChange.setType(entityType);
            stagingChange.setSubmittedBy(employeeId);
            stagingChange.setConditionType("Manual");
            stagingChange.setCreatedAt(LocalDateTime.now());
            stagingChange.setUpdatedAt(LocalDateTime.now());
            versionToUse = currentVersion + 1L;
        }
        stagingChange.setVersion(currentVersion + 1L);
        StagingChangeDTO stagingdto = this.stagingChangeService.convertToDTO(stagingChange, String.valueOf(employeeId));
        HashMap<String, Object> maps = stagingdto.getNewValue();
        System.out.println("Before map :: " + maps);
        if (maps == null) {
            maps = new HashMap<String, Object>();
        }
        maps.put(String.valueOf(recordId), newEntityData);
        System.out.println("After map :: " + maps);
        stagingChange.setNewValue(this.serializeObjectToJson(maps));
        stagingChange = (StagingChange)this.stagingChangesRepository.save(stagingChange);
        return new WorkflowStagingResponse(true, versionToUse, "DRAFT", stagingChange, (ControlPanelWorkFlowDTO)workflows.get(0));
    }

    private String serializeObjectToJson(Object object) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            mapper.registerModule((Module)new JavaTimeModule());
            mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
            mapper.disable(DeserializationFeature.ADJUST_DATES_TO_CONTEXT_TIME_ZONE);
            return mapper.writeValueAsString(object);
        }
        catch (JsonProcessingException e) {
            throw new RuntimeException("Error serializing object to JSON", e);
        }
    }
}

