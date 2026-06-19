/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.Employee
 *  com.estrat.backend.db.bean.po.ApproversHistory
 *  com.estrat.backend.db.bean.po.ControlPanelWorkFlow
 *  com.estrat.backend.db.bean.po.ControlPanelWorkFlowApproverMapping
 *  com.estrat.backend.db.bean.po.ImpactData
 *  com.estrat.backend.db.bean.po.ImpactSurvay
 *  com.estrat.backend.db.bean.po.ProcessEnabler
 *  com.estrat.backend.db.bean.po.RiskActivities
 *  com.estrat.backend.db.bean.po.RiskDetails
 *  com.estrat.backend.db.bean.po.RiskEvent
 *  com.estrat.backend.db.bean.po.RpoTable
 *  com.estrat.backend.db.bean.po.StagingChange
 *  com.estrat.backend.db.dao.ApproversHistoryRepository
 *  com.estrat.backend.db.dao.BudgetDetailRepository
 *  com.estrat.backend.db.dao.ControlPanelWorkFlowRepository
 *  com.estrat.backend.db.dao.ImpactDataRepository
 *  com.estrat.backend.db.dao.ProcessEnablerRepository
 *  com.estrat.backend.db.dao.RiskActivitiesRepository
 *  com.estrat.backend.db.dao.RiskCauseAndConsequenceRepository
 *  com.estrat.backend.db.dao.RiskConsequenceRepository
 *  com.estrat.backend.db.dao.RiskDetailsRepository
 *  com.estrat.backend.db.dao.RiskEventRepository
 *  com.estrat.backend.db.dao.RiskPlanRepository
 *  com.estrat.backend.db.dao.RpoTableRepository
 *  com.estrat.backend.db.dao.StagingChangeRepository
 *  com.estrat.backend.db.dto.ApprovalRequestDTO
 *  com.estrat.backend.db.dto.ApprovalResponseDTO
 *  com.estrat.backend.db.dto.ApproversHistoryDTO
 *  com.estrat.backend.db.dto.ControlPanelWorkFlowDTO
 *  com.estrat.backend.db.dto.EmployeeDTO
 *  com.estrat.backend.db.dto.ImpactDataDto
 *  com.estrat.backend.db.dto.ImpactSurvayDto
 *  com.estrat.backend.db.dto.StagingChangeDTO
 *  com.estrat.backend.db.repository.ControlPanelWorkflowApproverRepository
 *  com.estrat.backend.db.repository.DepartmentChartMappingRepository
 *  com.estrat.backend.db.resource.util.UserThreadLocal
 *  com.estrat.backend.db.service.AuditDetailsService
 *  com.estrat.backend.db.service.EmployeeService
 *  com.estrat.backend.db.service.ImpactSurvayService
 *  com.estrat.backend.db.service.KPIService
 *  com.estrat.backend.db.service.RiskActivitiesService
 *  com.estrat.backend.db.service.RiskCauseAndConsequenceService
 *  com.estrat.backend.db.service.RiskDetailsService
 *  com.estrat.backend.db.service.RiskPlanService
 *  com.estrat.backend.db.service.RpoTableService
 *  com.estrat.backend.db.service.StagingChangeService
 *  com.fasterxml.jackson.databind.Module
 *  com.fasterxml.jackson.databind.ObjectMapper
 *  com.fasterxml.jackson.databind.SerializationFeature
 *  com.fasterxml.jackson.datatype.jsr310.JavaTimeModule
 *  com.google.gson.Gson
 *  com.google.gson.GsonBuilder
 *  javax.persistence.EntityNotFoundException
 *  javax.transaction.Transactional
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.security.access.AccessDeniedException
 *  org.springframework.stereotype.Service
 */
package com.estrat.backend.db.service;

import com.estrat.backend.db.bean.Employee;
import com.estrat.backend.db.bean.po.ApproversHistory;
import com.estrat.backend.db.bean.po.ControlPanelWorkFlow;
import com.estrat.backend.db.bean.po.ControlPanelWorkFlowApproverMapping;
import com.estrat.backend.db.bean.po.ImpactData;
import com.estrat.backend.db.bean.po.ImpactSurvay;
import com.estrat.backend.db.bean.po.ProcessEnabler;
import com.estrat.backend.db.bean.po.RiskActivities;
import com.estrat.backend.db.bean.po.RiskCauseAndConsequence;
import com.estrat.backend.db.bean.po.RiskConsequenceDetails;
import com.estrat.backend.db.bean.po.RiskDetails;
import com.estrat.backend.db.bean.po.RiskEvent;
import com.estrat.backend.db.bean.po.RiskPlan;
import com.estrat.backend.db.bean.po.RpoTable;
import com.estrat.backend.db.bean.po.StagingChange;
import com.estrat.backend.db.dao.ApproversHistoryRepository;
import com.estrat.backend.db.dao.BudgetDetailRepository;
import com.estrat.backend.db.dao.ControlPanelWorkFlowRepository;
import com.estrat.backend.db.dao.ImpactDataRepository;
import com.estrat.backend.db.dao.ProcessEnablerRepository;
import com.estrat.backend.db.dao.RiskActivitiesRepository;
import com.estrat.backend.db.dao.RiskCauseAndConsequenceRepository;
import com.estrat.backend.db.dao.RiskConsequenceRepository;
import com.estrat.backend.db.dao.RiskDetailsRepository;
import com.estrat.backend.db.dao.RiskEventRepository;
import com.estrat.backend.db.dao.RiskPlanRepository;
import com.estrat.backend.db.dao.RpoTableRepository;
import com.estrat.backend.db.dao.StagingChangeRepository;
import com.estrat.backend.db.dto.ApprovalRequestDTO;
import com.estrat.backend.db.dto.ApprovalResponseDTO;
import com.estrat.backend.db.dto.ApproversHistoryDTO;
import com.estrat.backend.db.dto.ControlPanelWorkFlowDTO;
import com.estrat.backend.db.dto.EmployeeDTO;
import com.estrat.backend.db.dto.ImpactDataDto;
import com.estrat.backend.db.dto.ImpactSurvayDto;
import com.estrat.backend.db.dto.StagingChangeDTO;
import com.estrat.backend.db.repository.ControlPanelWorkflowApproverRepository;
import com.estrat.backend.db.repository.DepartmentChartMappingRepository;
import com.estrat.backend.db.resource.util.UserThreadLocal;
import com.estrat.backend.db.service.AuditDetailsService;
import com.estrat.backend.db.service.EmployeeService;
import com.estrat.backend.db.service.ImpactSurvayService;
import com.estrat.backend.db.service.KPIService;
import com.estrat.backend.db.service.RiskActivitiesService;
import com.estrat.backend.db.service.RiskCauseAndConsequenceService;
import com.estrat.backend.db.service.RiskDetailsService;
import com.estrat.backend.db.service.RiskPlanService;
import com.estrat.backend.db.service.RpoTableService;
import com.fasterxml.jackson.databind.Module;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

@Service
public class StagingChangeService {
    @Autowired
    StagingChangeRepository stagingChangesRepository;
    @Autowired
    ApproversHistoryRepository workflowHistoryRepository;
    @Autowired
    ControlPanelWorkflowApproverRepository workflowApproversMappingRepository;
    @Autowired
    ControlPanelWorkFlowRepository workflowRepository;
    @Autowired
    RiskDetailsRepository riskDetailsRepository;
    @Autowired
    protected RiskPlanService riskPlanService;
    @Autowired
    protected RiskActivitiesService riskActivitiesService;
    @Autowired
    protected RiskDetailsService riskDetailsService;
    @Autowired
    protected RiskCauseAndConsequenceService riskCauseAndConsequenceService;
    @Autowired
    RiskCauseAndConsequenceRepository riskCauseAndConsequenceRepository;
    @Autowired
    RiskConsequenceRepository riskConsequenceRepository;
    @Autowired
    RiskPlanRepository riskPlanRepository;
    @Autowired
    RiskActivitiesRepository riskActivitiesRepository;
    @Autowired
    RiskEventRepository riskEventRepository;
    @Autowired
    ProcessEnablerRepository processEnablerRepo;
    @Autowired
    EmployeeService employeeService;
    @Autowired
    RpoTableService rpotableService;
    @Autowired
    AuditDetailsService auditService;
    @Autowired
    ImpactSurvayService impactSurvayService;
    @Autowired
    ImpactDataRepository impactDataRepository;
    @Autowired
    DepartmentChartMappingRepository deptMappingDetailRepository;
    @Autowired
    private KPIService kpiService;
    @Autowired
    RpoTableRepository rpoTableRepository;
    @Autowired
    BudgetDetailRepository budgetDetailRepository;
    private static final ObjectMapper objectMapper = new ObjectMapper();
    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");
    private static final Set<String> excludedColumns = new HashSet();
    private static final Set<String> immutableExcludedColumns = Collections.unmodifiableSet(excludedColumns);

    public static boolean includeColumn(String columnName) {
        return !immutableExcludedColumns.contains(columnName.toLowerCase());
    }

    public void storeChangesInStaging(String newValues, String oldValues, Long recordId, String tableName, Long createdBy, ControlPanelWorkFlowDTO workflow, Long parentChangeId, Long parentId) {
        StagingChange stagingChange = new StagingChange();
        if (createdBy == 0L) {
            stagingChange.setSubmittedBy(Long.valueOf(UserThreadLocal.get((String)"LOGGED_IN_EMPLOYEE_ID")));
        }
        Long approvedVersion = 1L;
        stagingChange.setApprovedVersion(approvedVersion.longValue());
        stagingChange.setTableName(tableName);
        stagingChange.setRecordId(recordId);
        stagingChange.setOldValue(oldValues);
        stagingChange.setNewValue(newValues);
        stagingChange.setParentId(parentChangeId.longValue());
        stagingChange.setParentRecordId(parentId.longValue());
        stagingChange.setStatus("IN PROGRESS");
        stagingChange.setWorkflowId(Long.valueOf(workflow.getId()));
        stagingChange.setType(workflow.getType());
        stagingChange.setSubmittedBy(createdBy);
        stagingChange.setCreatedAt(LocalDateTime.now());
        stagingChange.setVersion(0L);
        System.out.println("workflow.getConditions()  :: " + workflow.getConditions());
        stagingChange.setConditionType(workflow.getConditions());
        StagingChange stagingsave = (StagingChange)this.stagingChangesRepository.save(stagingChange);
        this.processSubmission(stagingsave.getChangeId(), stagingChange.getSubmittedBy(), "", Long.valueOf(0L));
        this.processApproval(stagingsave.getChangeId(), stagingsave.getSubmittedBy(), "IN PROGRESS", "", Long.valueOf(0L));
        System.out.println("Approver History done");
    }

    public void storeChangesInStaging(String newValues, String oldValues, StagingChange stagingChange, ControlPanelWorkFlowDTO workflow) {
        stagingChange.setOldValue(oldValues);
        stagingChange.setNewValue(newValues);
        stagingChange.setStatus("IN PROGRESS");
        stagingChange.setWorkflowId(Long.valueOf(workflow.getId()));
        stagingChange.setType(workflow.getType());
        stagingChange.setCreatedAt(LocalDateTime.now());
        StagingChange stagingsave = (StagingChange)this.stagingChangesRepository.save(stagingChange);
        System.err.println("Approver History enter");
        this.processSubmission(stagingsave.getChangeId(), stagingChange.getSubmittedBy(), "", Long.valueOf(stagingChange.getVersion()));
        this.processApproval(stagingsave.getChangeId(), stagingChange.getSubmittedBy(), "IN PROGRESS", "", Long.valueOf(stagingChange.getVersion()));
        System.out.println("Approver History done");
    }

    /*
     * Enabled force condition propagation
     * Lifted jumps to return sites
     */
    public void processApproval(Long stagingChangeId, Long approverId, String decision, String comments, Long version) {
        StagingChange change = (StagingChange)this.stagingChangesRepository.findById(stagingChangeId).orElseThrow(() -> new IllegalStateException("Change not found"));
        ControlPanelWorkFlow workflow = (ControlPanelWorkFlow)this.workflowRepository.findById(change.getWorkflowId()).orElseThrow(() -> new IllegalStateException("Workflow not found"));
        if (approverId == 0L) {
            approverId = Long.valueOf(UserThreadLocal.get((String)"LOGGED_IN_EMPLOYEE_ID"));
        }
        ApproversHistory history = new ApproversHistory();
        history.setWorkFlow_Id(workflow);
        history.setVersion(version.longValue());
        history.setActionDate(LocalDateTime.now());
        history.setComments(comments);
        if (decision.equals("IN PROGRESS")) {
            System.out.println("workflow.getApproverList().stream() :: " + workflow.getApproverList());
            Optional currentHistory = this.workflowHistoryRepository.findCurrentRejectApprover(Long.valueOf(workflow.getId()), stagingChangeId, Long.valueOf(change.getVersion()), approverId);
            ControlPanelWorkFlowApproverMapping firstApprover = new ControlPanelWorkFlowApproverMapping();
            if (currentHistory.isPresent()) {
                if (((ApproversHistory)currentHistory.get()).getApproverId().getAprovalRoleId().equals(approverId)) {
                    System.out.println("enter after reject approve");
                    firstApprover = ((ApproversHistory)currentHistory.get()).getApproverId();
                }
            } else {
                System.out.println("enter in first approve");
                firstApprover = workflow.getApproverList().stream().filter(approver -> approver.getApproverOrder() == 1).findFirst().orElseThrow(() -> new IllegalStateException("First approver not found"));
            }
            System.out.println("firstApprover :: " + firstApprover);
            history.setApprover(firstApprover);
            history.setActionTaken("IN PROGRESS");
            history.setChangeId(stagingChangeId.longValue());
            history.setActionBy(approverId.longValue());
            history.setActionDate(LocalDateTime.now());
            this.workflowHistoryRepository.save(history);
            if (!change.getConditionType().equalsIgnoreCase("Manual")) return;
            change.setStatus("IN PROGRESS");
            this.updateChildStatuses(change, "IN PROGRESS");
            this.stagingChangesRepository.save(change);
            return;
        } else if ("APPROVED".equals(decision)) {
            ApproversHistory currentHistory = (ApproversHistory)this.workflowHistoryRepository.findCurrentPendingApprover(Long.valueOf(workflow.getId()), stagingChangeId, Long.valueOf(change.getVersion())).orElseThrow(() -> new IllegalStateException("Approver history not found"));
            if (!currentHistory.getApproverId().getAprovalRoleId().equals(approverId)) throw new IllegalStateException("Approver is not valid");
            currentHistory.setActionTaken("APPROVED");
            currentHistory.setComments(comments);
            currentHistory.setActionDate(LocalDateTime.now());
            this.workflowHistoryRepository.save(currentHistory);
            String module = this.determineModule(change.getTableName());
            String actionType = "approve";
            String submodule = this.determineSubModule(change.getTableName());
            String reason = this.determineReason(actionType);
            this.auditService.saveAudit(module, workflow.getId(), approverId.longValue(), submodule + " " + reason);
            List<StagingChange> childChanges = this.stagingChangesRepository.findAllByParenId(change.getChangeId());
            if (this.isFinalApproval(change.getWorkflowId(), approverId, stagingChangeId)) {
                this.applyChangeToDatabase(change, Long.valueOf(0L));
                change.setStatus("APPROVED");
            } else {
                System.out.println("Entr in Approved else next approve");
                Optional nextApprover = this.getNextApprover(workflow, currentHistory.getApproverId().getApproverOrder().intValue());
                if (nextApprover.isPresent()) {
                    ApproversHistory nextHistory = new ApproversHistory();
                    nextHistory.setVersion(version.longValue());
                    nextHistory.setWorkFlow_Id(workflow);
                    nextHistory.setApprover((ControlPanelWorkFlowApproverMapping)nextApprover.get());
                    nextHistory.setActionTaken("IN PROGRESS");
                    nextHistory.setActionBy(((ControlPanelWorkFlowApproverMapping)nextApprover.get()).getAprovalRoleId().longValue());
                    nextHistory.setActionDate(LocalDateTime.now());
                    nextHistory.setChangeId(stagingChangeId.longValue());
                    this.workflowHistoryRepository.save(nextHistory);
                    change.setStatus("IN PROGRESS");
                }
            }
            this.stagingChangesRepository.save(change);
            return;
        } else {
            if (!"REJECTED".equals(decision)) return;
            ApproversHistory currentHistory = (ApproversHistory)this.workflowHistoryRepository.findCurrentPendingApprover(Long.valueOf(workflow.getId()), stagingChangeId, Long.valueOf(change.getVersion())).orElseThrow(() -> new IllegalStateException("Approver history not found"));
            if (!currentHistory.getApproverId().getAprovalRoleId().equals(approverId)) throw new IllegalStateException("Approver is not valid");
            currentHistory.setActionTaken("REJECTED");
            currentHistory.setComments(comments);
            currentHistory.setActionDate(LocalDateTime.now());
            currentHistory.setActionBy(approverId.longValue());
            this.workflowHistoryRepository.save(currentHistory);
            String module = this.determineModule(change.getTableName());
            String actionType = "reject";
            String submodule = this.determineSubModule(change.getTableName());
            String reason = this.determineReason(actionType);
            this.auditService.saveAudit(module, workflow.getId(), approverId.longValue(), submodule + " " + reason);
            change.setStatus("REJECTED");
            this.stagingChangesRepository.save(change);
        }
    }

    public void processSubmission(Long stagingChangeId, Long approverId, String comments, Long version) {
        StagingChange change = (StagingChange)this.stagingChangesRepository.findById(stagingChangeId).orElseThrow(() -> new IllegalStateException("Change not found"));
        ControlPanelWorkFlow workflow = (ControlPanelWorkFlow)this.workflowRepository.findById(change.getWorkflowId()).orElseThrow(() -> new IllegalStateException("Workflow not found"));
        ApproversHistory history = new ApproversHistory();
        history.setWorkFlow_Id(workflow);
        history.setVersion(version.longValue());
        history.setActionDate(LocalDateTime.now());
        history.setComments(comments);
        history.setActionBy(approverId.longValue());
        String actionType = "submit";
        if (version == 0L) {
            history.setActionTaken("SUBMITTED");
        } else {
            history.setActionTaken("RE-SUBMITTED");
            actionType = "resubmit";
        }
        String module = this.determineModule(change.getTableName());
        String submodule = this.determineSubModule(change.getTableName());
        String reason = this.determineReason(actionType);
        this.auditService.saveAudit(module, workflow.getId(), change.getSubmittedBy().longValue(), submodule + " " + reason);
        history.setChangeId(stagingChangeId.longValue());
        this.workflowHistoryRepository.save(history);
    }

    private Optional<ControlPanelWorkFlowApproverMapping> getNextApprover(ControlPanelWorkFlow workflow, int currentOrder) {
        return workflow.getApproverList().stream().filter(approver -> approver.getApproverOrder() == currentOrder + 1).findFirst();
    }

    private boolean isFinalApproval(Long workflowId, Long approverId, Long changeId) {
        List<ControlPanelWorkFlowApproverMapping> approvers = this.workflowApproversMappingRepository.findByWorkflowId(workflowId);
        return approvers.stream().noneMatch(approver -> approver.getApproverOrder() > this.findApproverOrder(approvers, approverId));
    }

    public String serializeObjectToJson(Object obj) {
        try {
            objectMapper.registerModule((Module)new JavaTimeModule());
            objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
            return objectMapper.writeValueAsString(obj);
        }
        catch (Exception e) {
            throw new RuntimeException("Error serializing object to JSON", e);
        }
    }

    private int findApproverOrder(List<ControlPanelWorkFlowApproverMapping> approvers, Long approverId) {
        return approvers.stream().filter(approver -> approver.getAprovalRoleId().equals(approverId)).findFirst().orElseThrow(() -> new IllegalStateException("Approver not found")).getApproverOrder();
    }

    @Transactional
    public void applyChangeToDatabase(StagingChange stagingChange, Long riskId) {
        List<RpoTable> rpo_list;
        List<ProcessEnabler> pos_list;
        RiskDetails riskDetails;
        List riskDetails_list;
        if ("risk_details".equals(stagingChange.getTableName())) {
            List<RiskActivities> riskactivities_list;
            List<RiskPlan> riskplan_list;
            List<RiskConsequenceDetails> riskconq_list;
            List<RiskCauseAndConsequence> riskcause_list;
            riskDetails_list = this.riskDetailsRepository.findByChangeId(stagingChange.getChangeId());
            if (riskDetails_list != null && riskDetails_list.size() > 0) {
                riskDetails = (RiskDetails)riskDetails_list.get(0);
                riskDetails.setStatus("APPROVED");
                this.riskDetailsRepository.save(riskDetails);
                if (riskDetails.getVersion() > 1L) {
                    this.auditService.saveAudit("Risk", riskDetails.getId(), riskDetails.getCreatedBy(), "Risk Modified");
                } else {
                    this.auditService.saveAudit("Risk", riskDetails.getId(), riskDetails.getCreatedBy(), "Risk Created");
                }
            }
            if ((riskcause_list = this.riskCauseAndConsequenceRepository.findByChangeId(stagingChange.getChangeId())) != null && riskcause_list.size() > 0) {
                for (RiskCauseAndConsequence riskCause : riskcause_list) {
                    riskCause.setStatus("APPROVED");
                    this.riskCauseAndConsequenceRepository.save(riskCause);
                    if (riskCause.getVersion() > 1L) {
                        this.auditService.saveAudit("Risk", riskCause.getId(), riskCause.getCreatedBy(), "Cause Modified");
                        continue;
                    }
                    this.auditService.saveAudit("Risk", riskCause.getId(), riskCause.getCreatedBy(), "Cause Created");
                }
            }
            if ((riskconq_list = this.riskConsequenceRepository.findByChangeId(stagingChange.getChangeId())) != null && riskconq_list.size() > 0) {
                for (RiskConsequenceDetails riskConq : riskconq_list) {
                    riskConq.setStatus("APPROVED");
                    this.riskConsequenceRepository.save(riskConq);
                    if (riskConq.getVersion() > 1L) {
                        this.auditService.saveAudit("Risk", riskConq.getId(), riskConq.getCreatedBy(), "Consequence Modified");
                        continue;
                    }
                    this.auditService.saveAudit("Risk", riskConq.getId(), riskConq.getCreatedBy(), "Consequence Created");
                }
            }
            if ((riskplan_list = this.riskPlanRepository.findByChangeId(stagingChange.getChangeId())) != null && riskplan_list.size() > 0) {
                for (RiskPlan riskplan : riskplan_list) {
                    riskplan.setStatus("APPROVED");
                    this.riskPlanRepository.save(riskplan);
                    if (riskplan.getVersion() > 1L) {
                        this.auditService.saveAudit("Risk", riskplan.getId(), riskplan.getCreatedBy(), "Plan Modified");
                        continue;
                    }
                    this.auditService.saveAudit("Risk", riskplan.getId(), riskplan.getCreatedBy(), "Plan Created");
                }
            }
            if ((riskactivities_list = this.riskActivitiesRepository.findByChangeId(stagingChange.getChangeId())) != null && riskactivities_list.size() > 0) {
                for (RiskActivities riskactivities : riskactivities_list) {
                    riskactivities.setStatus("APPROVED");
                    this.riskActivitiesRepository.save(riskactivities);
                    if (riskactivities.getVersion() > 1L) {
                        this.auditService.saveAudit("Risk", riskactivities.getId(), riskactivities.getCreatedBy(), "Activities Modified");
                        continue;
                    }
                    this.auditService.saveAudit("Risk", riskactivities.getId(), riskactivities.getCreatedBy(), "Activities Created");
                }
            }
        }
        if ("risk_event".equals(stagingChange.getTableName()) && (riskDetails_list = this.riskEventRepository.findByChangeId(stagingChange.getChangeId())) != null && riskDetails_list.size() > 0) {
            RiskEvent riskEvent = (RiskEvent)riskDetails_list.get(0);
            riskEvent.setStatus("APPROVED");
            this.riskEventRepository.save(riskEvent);
            if (riskEvent.getVersion() > 1L) {
                this.auditService.saveAudit("RiskEvent", riskEvent.getId().longValue(), stagingChange.getSubmittedBy().longValue(), "RiskEvent Modified");
            } else {
                this.auditService.saveAudit("RiskEvent", riskEvent.getId().longValue(), stagingChange.getSubmittedBy().longValue(), "RiskEvent Created");
            }
        }
        if ("process_enabler".equals(stagingChange.getTableName()) && (pos_list = this.processEnablerRepo.findByChangeId(stagingChange.getChangeId())) != null && pos_list.size() > 0) {
            ProcessEnabler processEnabler = (ProcessEnabler)pos_list.get(0);
            processEnabler.setStatus("APPROVED");
            this.processEnablerRepo.save(processEnabler);
            if (processEnabler.getVersion() > 1L) {
                this.auditService.saveAudit("POS", processEnabler.getId().longValue(), stagingChange.getSubmittedBy().longValue(), "POS Modified");
            } else {
                this.auditService.saveAudit("POS", processEnabler.getId().longValue(), stagingChange.getSubmittedBy().longValue(), "POS Created");
            }
        }
        if ("rpo".equals(stagingChange.getTableName()) && (rpo_list = this.rpoTableRepository.findByChangeId(stagingChange.getChangeId())) != null && rpo_list.size() > 0) {
            RpoTable rpoTable = (RpoTable)rpo_list.get(0);
            rpoTable.setStatus("APPROVED");
            this.rpoTableRepository.save(rpoTable);
            if (rpoTable.getVersion() > 1L) {
                this.auditService.saveAudit("RPO", rpoTable.getId().longValue(), stagingChange.getSubmittedBy().longValue(), "RPO Modified");
            } else {
                this.auditService.saveAudit("RPO", rpoTable.getId().longValue(), stagingChange.getSubmittedBy().longValue(), "RPO Created");
            }
        }
        if ("impact_survay".equals(stagingChange.getTableName())) {
            ImpactSurvay impactDetails = (ImpactSurvay)this.deserializeJsonToObject(stagingChange.getNewValue(), ImpactSurvay.class);
            ImpactSurvayDto iSurvay = this.impactSurvayService.saveImpact(impactDetails);
            if (iSurvay.getImpactData() != null) {
                for (ImpactDataDto impcatData : iSurvay.getImpactData()) {
                    ImpactData impdata = new ImpactData(impcatData);
                    Optional optionalData = this.impactDataRepository.findById(impdata.getId());
                    if (optionalData.isPresent()) {
                        List<ImpactData> impactData = this.impactDataRepository.findAllByImpactId(impactDetails.getId());
                        for (ImpactData imp : impactData) {
                            if (imp.getId() == impdata.getId()) {
                                impdata.setImpactId(iSurvay.getId());
                                this.impactDataRepository.save(impdata);
                                continue;
                            }
                            if (imp.getId() == impdata.getId()) continue;
                            this.impactDataRepository.deleteById(imp.getId());
                        }
                        continue;
                    }
                    impdata.setImpactId(iSurvay.getId());
                    this.impactDataRepository.save(impdata);
                }
            }
            if (impactDetails.getId() != 0L) {
                this.auditService.saveAudit("Impact Survey", impactDetails.getId().longValue(), stagingChange.getSubmittedBy().longValue(), "Impact Survey Modified");
            } else {
                this.auditService.saveAudit("Impact Survey", impactDetails.getId().longValue(), stagingChange.getSubmittedBy().longValue(), "Impact Survey Created");
            }
        }
    }

    private String determineModule(String tableName) {
        switch (tableName) {
            case "risk_details": 
            case "risk_cause_consequence": 
            case "risk_consequence": 
            case "risk_plan": 
            case "risk_activities": {
                return "Risk";
            }
            case "risk_event": {
                return "RiskEvent";
            }
            case "process_enabler": {
                return "ProcessEnabler";
            }
            case "rpo": {
                return "RPO";
            }
            case "kpi_dataform": {
                return "Kpi Data Form";
            }
            case "impact_survay": {
                return "Impact Survey";
            }
        }
        return "";
    }

    private String determineSubModule(String tableName) {
        switch (tableName) {
            case "risk_details": {
                return "Risk";
            }
            case "risk_cause_consequence": {
                return "Cause";
            }
            case "risk_consequence": {
                return "Consequence";
            }
            case "risk_plan": {
                return "Plan";
            }
            case "risk_activities": {
                return "Activities";
            }
            case "risk_event": {
                return "RiskEvent";
            }
            case "process_enabler": {
                return "ProcessEnabler";
            }
            case "rpo": {
                return "RPO";
            }
            case "kpi_dataform": {
                return "Kpi Data Form";
            }
            case "impact_survay": {
                return "ImpactSurvey";
            }
        }
        return "";
    }

    private String determineReason(String actionType) {
        switch (actionType) {
            case "submit": {
                return "Submitted";
            }
            case "resubmit": {
                return "Submitted";
            }
            case "approve": {
                return "Approved";
            }
            case "reject": {
                return "Rejected";
            }
        }
        return "";
    }

    public <T> T deserializeJsonToObject(String jsonString, Class<T> clazz) {
        try {
            Gson gson = new GsonBuilder().registerTypeAdapter(LocalDateTime.class, (com.google.gson.JsonDeserializer<LocalDateTime>) (json, type, jsonDeserializationContext) -> LocalDateTime.parse(json.getAsJsonPrimitive().getAsString(), formatter)).create();
            return (T)gson.fromJson(jsonString, clazz);
        }
        catch (Exception e) {
            throw new RuntimeException("Error deserializing JSON to object", e);
        }
    }

    public List<StagingChangeDTO> getStagingChangesForUser(String loggedInEmpId) {
        Long employeeId = Long.parseLong(loggedInEmpId);
        List<StagingChange> stagingChanges = this.stagingChangesRepository.findAllBySubmittedBy(employeeId);
        List approverChanges_old = this.workflowHistoryRepository.findAllByApproverId(employeeId);
        System.out.println("Approval list " + approverChanges_old.size());
        List<StagingChange> approverChanges = this.workflowHistoryRepository.findAllByApproverId(employeeId).stream().map(ApproversHistory::getChangeId).map(arg_0 -> ((StagingChangeRepository)this.stagingChangesRepository).findBychangeId(arg_0)).filter(Optional::isPresent).map(Optional::get).distinct().collect(Collectors.toList());
        List<StagingChange> combinedChanges = Stream.concat(stagingChanges.stream(), approverChanges.stream()).distinct().collect(Collectors.toList());
        return combinedChanges.stream().map(change -> this.convertToDTO(change, loggedInEmpId)).collect(Collectors.toList());
    }

    public StagingChangeDTO getStagingChangeDetails(Long changeId, String user) {
        Optional<StagingChange> optionalChange = this.stagingChangesRepository.findById(changeId);
        StagingChange change = optionalChange.orElseThrow(() -> new RuntimeException("StagingChange not found with id: " + changeId));
        return this.convertToDTO(change, user);
    }

    public StagingChangeDTO convertToDTO(StagingChange stagingChange, String user) {
        StagingChangeDTO dto = new StagingChangeDTO();
        dto.setId(stagingChange.getChangeId());
        dto.setEventTitle(stagingChange.getType());
        dto.setStatus(stagingChange.getStatus());
        dto.setSubmittedOn(stagingChange.getCreatedAt());
        String usersubmitted = this.getUserNameById(stagingChange.getSubmittedBy());
        dto.setTableName(stagingChange.getTableName());
        dto.setParentId(stagingChange.getParentId());
        dto.setConditionType(stagingChange.getConditionType());
        dto.setSubmittedBy(usersubmitted);
        dto.setApprovedVersion(stagingChange.getApprovedVersion());
        try {
            Map riskDetailsMap = com.estrat.backend.db.util.JsonUtil.parseMap(stagingChange.getNewValue());
            dto.setNewValue(riskDetailsMap);
            if (stagingChange.getOldValue() != null) {
                Map riskDetailsMap2 = com.estrat.backend.db.util.JsonUtil.parseMap(stagingChange.getOldValue());
                dto.setOldValue(riskDetailsMap2);
            }
        }
        catch (Exception e) {
            System.err.println("Error deserializing RiskDTO: " + e.getMessage());
            e.printStackTrace();
        }
        dto.setSubmitter(stagingChange.getSubmittedBy().equals(user));
        dto.setCurrentApprover(this.determineCurrentPendingApproverId(stagingChange).equals(user));
        dto.setCurrentPendingApprover(this.determineCurrentPendingApprover(stagingChange));
        dto.setNextApprover(this.determineNextApprover(stagingChange));
        List<ApproversHistoryDTO> history = this.workflowHistoryRepository.findAllByWorkflowId(stagingChange.getWorkflowId(), stagingChange.getChangeId(), Long.valueOf(stagingChange.getVersion())).stream().map(val -> this.convertApproversHistoryToDTO(val, usersubmitted)).collect(Collectors.toList());
        dto.setApproverHistory(history);
        System.out.println("stagingChange.getChangeId() :: " + stagingChange.getChangeId());
        List setChangesvalues = this.stagingChangesRepository.findAllByParenId(stagingChange.getChangeId());
        if (!setChangesvalues.isEmpty()) {
            // empty if block
        }
        return dto;
    }

    private ApproversHistoryDTO convertApproversHistoryToDTO(ApproversHistory history, String submittedBy) {
        ApproversHistoryDTO dto = new ApproversHistoryDTO();
        if (history.getApproverId() != null) {
            dto.setApproverName(history.getApproverId().getUserName());
            dto.setApproverId(history.getApproverId().getAprovalRoleId().longValue());
        } else {
            dto.setApproverName(submittedBy);
        }
        dto.setActionTaken(history.getActionTaken());
        dto.setActionDate(history.getActionDate());
        dto.setActionBy(history.getActionBy());
        dto.setComments(history.getComments());
        return dto;
    }

    public List<ApproversHistoryDTO> getApprovalHistory(Long changeId, Long user) {
        Optional change = this.stagingChangesRepository.findById(changeId);
        List<ApproversHistoryDTO> history = new ArrayList<ApproversHistoryDTO>();
        if (change.isPresent()) {
            history = this.workflowHistoryRepository.findAllByWorkflowId(((StagingChange)change.get()).getWorkflowId(), changeId).stream().map(val -> this.convertApproversHistoryToDTO(val, this.getUserNameById(((StagingChange)change.get()).getSubmittedBy()))).collect(Collectors.toList());
        }
        return history;
    }

    private String getUserNameById(Long userId) {
        EmployeeDTO employee = new EmployeeDTO();
        employee.setEmployeeId(userId.longValue());
        Employee emp = this.employeeService.getEmployee(employee);
        return emp != null ? emp.getFirstName() : "Unknown User";
    }

    private String determineCurrentPendingApprover(StagingChange stagingChange) {
        Optional currentPending = this.workflowHistoryRepository.findCurrentPendingApprover(stagingChange.getWorkflowId(), stagingChange.getChangeId(), Long.valueOf(stagingChange.getVersion()));
        if (currentPending.isPresent()) {
            return ((ApproversHistory)currentPending.get()).getApproverId().getUserName();
        }
        return "No pending approver";
    }

    private String determineCurrentPendingApproverId(StagingChange stagingChange) {
        Optional currentPending = this.workflowHistoryRepository.findCurrentPendingApprover(stagingChange.getWorkflowId(), stagingChange.getChangeId(), Long.valueOf(stagingChange.getVersion()));
        if (currentPending.isPresent()) {
            return String.valueOf(((ApproversHistory)currentPending.get()).getApproverId().getAprovalRoleId());
        }
        return "";
    }

    private String determineNextApprover(StagingChange stagingChange) {
        ControlPanelWorkFlow workflow = this.workflowRepository.findById(stagingChange.getWorkflowId()).orElse(null);
        if (workflow != null) {
            List<ControlPanelWorkFlowApproverMapping> approvers = workflow.getApproverList().stream().sorted(Comparator.comparing(ControlPanelWorkFlowApproverMapping::getApproverOrder)).collect(Collectors.toList());
            for (ControlPanelWorkFlowApproverMapping approver : approvers) {
                boolean hasAction = this.workflowHistoryRepository.existsByWorkflowAndApproverAndActionTakenAndChangeIdAndVersion(workflow, approver, "Approved", stagingChange.getChangeId(), Long.valueOf(stagingChange.getVersion()));
                if (hasAction) continue;
                return approver.getUserName();
            }
        }
        return "No next approver";
    }

    /*
     * Enabled force condition propagation
     * Lifted jumps to return sites
     */
    public ApprovalResponseDTO approveStagingChange(Long changeId, ApprovalRequestDTO approvalRequest, String user) {
        System.out.println("enter in approve stagging change");
        Optional stagingChange = this.stagingChangesRepository.findById(changeId);
        if (!stagingChange.isPresent()) {
            throw new EntityNotFoundException("Resource not found");
        }
        System.out.println("stagingChange.get().getWorkflowId() :: " + ((StagingChange)stagingChange.get()).getWorkflowId());
        System.out.println("stagingChange.get().getChangeId() :: " + ((StagingChange)stagingChange.get()).getChangeId());
        System.out.println("stagingChange.get().getVersion() ::" + ((StagingChange)stagingChange.get()).getVersion());
        Optional currentHistory = this.workflowHistoryRepository.findCurrentPendingApprover(((StagingChange)stagingChange.get()).getWorkflowId(), ((StagingChange)stagingChange.get()).getChangeId(), Long.valueOf(((StagingChange)stagingChange.get()).getVersion()));
        System.out.println("approvalRequest.getStatus() ==== " + approvalRequest.getStatus());
        if (!approvalRequest.getStatus().equalsIgnoreCase("IN PROGRESS") && !approvalRequest.getStatus().equalsIgnoreCase("PENDING")) {
            if (!currentHistory.isPresent()) {
                throw new IllegalStateException("No pending approval for this workflow");
            }
            if (!((ApproversHistory)currentHistory.get()).getApproverId().getAprovalRoleId().equals(Long.parseLong(user))) {
                throw new AccessDeniedException("You are not authorized to approve or reject this change.");
            }
        }
        if ("REJECTED".equalsIgnoreCase(approvalRequest.getStatus())) {
            if (approvalRequest.getComments() == null || approvalRequest.getComments().trim().isEmpty()) {
                throw new IllegalArgumentException("Comments are mandatory for rejection.");
            }
            this.processApproval(changeId, Long.valueOf(Long.parseLong(user)), approvalRequest.getStatus(), approvalRequest.getComments(), Long.valueOf(((StagingChange)stagingChange.get()).getVersion()));
        } else if ("APPROVED".equalsIgnoreCase(approvalRequest.getStatus())) {
            System.out.println("enter approvel chell");
            this.processApproval(changeId, Long.valueOf(Long.parseLong(user)), approvalRequest.getStatus(), approvalRequest.getComments(), Long.valueOf(((StagingChange)stagingChange.get()).getVersion()));
        } else if ("IN PROGRESS".equalsIgnoreCase(approvalRequest.getStatus())) {
            if (currentHistory.isPresent() && ((ApproversHistory)currentHistory.get()).getActionTaken().equalsIgnoreCase("IN PROGRESS")) return new ApprovalResponseDTO("All Ready Action recorded.", null);
            this.processSubmission(((StagingChange)stagingChange.get()).getChangeId(), ((StagingChange)stagingChange.get()).getSubmittedBy(), "", Long.valueOf(((StagingChange)stagingChange.get()).getVersion()));
            this.processApproval(changeId, Long.valueOf(Long.parseLong(user)), approvalRequest.getStatus(), approvalRequest.getComments(), Long.valueOf(((StagingChange)stagingChange.get()).getVersion()));
        } else {
            if (!"PENDING".equalsIgnoreCase(approvalRequest.getStatus())) throw new IllegalArgumentException("Invalid status. Only 'APPROVED' or 'REJECTED' are allowed.");
            StagingChange change = (StagingChange)stagingChange.get();
            String valid = approvalRequest.getStatus();
            change.setStatus(valid);
            this.updateChildStatuses(change, valid);
            this.stagingChangesRepository.save(change);
        }
        String nextApprover = this.updateStagingChangeStatus((StagingChange)stagingChange.get());
        return new ApprovalResponseDTO("Action recorded successfully.", nextApprover);
    }

    private void updateChildStatuses(StagingChange change, String status) {
        List<StagingChange> childChanges = this.stagingChangesRepository.findAllByParenId(change.getChangeId());
        for (StagingChange childChange : childChanges) {
            childChange.setStatus(status);
            this.updateChildStatuses(childChange, status);
            this.stagingChangesRepository.save(childChange);
        }
    }

    private String updateStagingChangeStatus(StagingChange stagingChange) {
        List<ApproversHistory> historyList = this.workflowHistoryRepository.findAllByWorkflowId(stagingChange.getWorkflowId(), stagingChange.getChangeId(), Long.valueOf(stagingChange.getVersion()));
        boolean allApproved = historyList.stream().allMatch(history -> "APPROVED".equalsIgnoreCase(history.getActionTaken()));
        boolean onereject = historyList.stream().anyMatch(history -> "REJECTED".equalsIgnoreCase(history.getActionTaken()));
        if (!onereject) {
            if (allApproved) {
                stagingChange.setStatus("APPROVED");
                this.stagingChangesRepository.save(stagingChange);
                return null;
            }
            ApproversHistory nextPending = historyList.stream().filter(history -> "IN PROGRESS".equalsIgnoreCase(history.getActionTaken())).findFirst().orElse(null);
            return nextPending != null ? nextPending.getApproverId().getUserName() : null;
        }
        return null;
    }

    public List<StagingChangeDTO> getStagingChangeInStatus(String tableName, String status, Long empId) {
        List<StagingChange> stagingChanges = this.stagingChangesRepository.findAllByStatusAndTable(tableName, status, empId);
        return stagingChanges.stream().map(change -> this.convertToDTO(change, Long.toString(empId))).collect(Collectors.toList());
    }

    public List<StagingChangeDTO> getStagingChangeNotApproved(String tableName, Long empId) {
        List<StagingChange> stagingChanges = this.stagingChangesRepository.findAllByNotApproved(tableName, empId);
        return stagingChanges.stream().map(change -> this.convertToDTO(change, Long.toString(empId))).collect(Collectors.toList());
    }

    public StagingChangeDTO findChangeNotApprovedOrRejectedByParentRecordId(Long parentRecordId, String tableName) {
        if (parentRecordId == null || tableName == null || tableName.isEmpty()) {
            throw new IllegalArgumentException("Parent record ID and table name must not be null or empty");
        }
        List<String> excludedStatuses = Arrays.asList("APPROVED", "REJECTED");
        Optional change = this.stagingChangesRepository.findByParentRecordIdAndTableNameAndStatusNotIn(parentRecordId, tableName, excludedStatuses);
        if (change.isPresent()) {
            return this.convertToDTO((StagingChange)change.get(), String.valueOf(((StagingChange)change.get()).getSubmittedBy()));
        }
        return null;
    }

    public List<StagingChangeDTO> getStagingChangeWRecordId(String tableName, Long recordId) {
        List<StagingChange> stagingChanges = this.stagingChangesRepository.getStagingChangeWRecordId(tableName, recordId);
        return stagingChanges.stream().map(change -> this.convertToDTO(change, Long.toString(change.getSubmittedBy()))).collect(Collectors.toList());
    }

    public List<StagingChangeDTO> getStagingChangeWChangeRecordId(Long parentrecordId, Long parentChangeid) {
        List<StagingChange> stagingChanges = this.stagingChangesRepository.getStagingChangeWChangeRecordId(parentrecordId, parentChangeid);
        return stagingChanges.stream().map(change -> this.convertToDTO(change, Long.toString(change.getSubmittedBy()))).collect(Collectors.toList());
    }

    public List<StagingChangeDTO> getApproveVersion(String tableName, Long empId, long recordId) {
        List<StagingChange> stagingChanges = this.stagingChangesRepository.findAllApprovedVersions(tableName, empId, Long.valueOf(recordId));
        return stagingChanges.stream().map(change -> this.convertToDTO(change, Long.toString(empId))).collect(Collectors.toList());
    }

    static {
        excludedColumns.add("created_at");
        excludedColumns.add("updated_at");
        excludedColumns.add("last_modified_by");
    }
}

