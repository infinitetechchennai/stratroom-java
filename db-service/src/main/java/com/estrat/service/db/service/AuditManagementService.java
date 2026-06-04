/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.AuditManagement
 *  com.estrat.service.db.bean.po.TaskCategorys
 *  com.estrat.service.db.dao.AuditManagementRepository
 *  com.estrat.service.db.dto.AuditDashBoardResponseDTO
 *  com.estrat.service.db.dto.AuditManagementDTO
 *  com.estrat.service.db.dto.TaskCategorysDTO
 *  com.estrat.service.db.service.AuditManagementService
 *  com.estrat.service.db.service.EmployeeService
 *  com.estrat.service.db.service.TaskDetailsService
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.service.db.service;

import com.estrat.service.db.bean.po.AuditManagement;
import com.estrat.service.db.bean.po.TaskCategorys;
import com.estrat.service.db.dao.AuditManagementRepository;
import com.estrat.service.db.dto.AuditDashBoardResponseDTO;
import com.estrat.service.db.dto.AuditManagementDTO;
import com.estrat.service.db.dto.TaskCategorysDTO;
import com.estrat.service.db.service.EmployeeService;
import com.estrat.service.db.service.TaskDetailsService;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuditManagementService {
    @Autowired
    protected AuditManagementRepository auditManagementRepository;
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private TaskDetailsService taskDetailsService;

    public Optional<AuditManagement> findById(long id) {
        return this.auditManagementRepository.findByIdAndActive(Long.valueOf(id), 0);
    }

    public AuditManagementDTO save(AuditManagement auditManagement) {
        AuditManagementDTO auditDTO = new AuditManagementDTO(auditManagement);
        List actions = (List)auditDTO.getManagementValue().get("actions");
        if (actions != null) {
            for (Map action : actions) {
                TaskCategorysDTO taskcategory = new TaskCategorysDTO();
                if (taskcategory.getTaskCategoryValue() == null) {
                    taskcategory.setTaskCategoryValue(new HashMap());
                }
                if (action.get("taskId") != null) {
                    taskcategory.setId(Long.parseLong(action.get("taskId").toString()));
                }
                taskcategory.setCreatedTime(LocalDateTime.now());
                taskcategory.setCreatedBy(auditManagement.getCreatedBy());
                taskcategory.setOwner(auditManagement.getCreatedBy());
                taskcategory.setType("AuditManagement");
                Map objectsValue = taskcategory.getTaskCategoryValue();
                objectsValue.put("category", action.get("name"));
                TaskCategorysDTO taskDTOObj = this.taskDetailsService.save(new TaskCategorys(taskcategory));
                action.put("taskId", taskDTOObj.getId());
            }
        }
        AuditManagement planningResponse = (AuditManagement)this.auditManagementRepository.save(new AuditManagement(auditDTO));
        AuditManagementDTO projectPlanningDTO = new AuditManagementDTO(planningResponse);
        return projectPlanningDTO;
    }

    public List<AuditManagementDTO> findAllByPageId(String pageId) {
        List dbList = new ArrayList();
        System.out.println("pageId plan :: " + pageId);
        dbList = this.auditManagementRepository.findAllByPageId(Long.valueOf(pageId).longValue(), 0);
        List<AuditManagementDTO> riskList = dbList.stream().map(dbValue -> new AuditManagementDTO(dbValue)).collect(Collectors.toList());
        return riskList;
    }

    public AuditManagementDTO deleteByObj(Optional<AuditManagement> auditManagement) {
        AuditManagementDTO responseDTO = new AuditManagementDTO();
        if (auditManagement.isPresent()) {
            AuditManagement management = auditManagement.get();
            management.setActive(1);
            this.auditManagementRepository.save(management);
            return responseDTO;
        }
        return responseDTO;
    }

    public List<AuditManagementDTO> findAllByDeptId(Long deptId) {
        List dbList = new ArrayList();
        dbList = this.auditManagementRepository.findAllByDeptId(deptId.longValue(), 0);
        List<AuditManagementDTO> riskList = dbList.stream().map(dbValue -> new AuditManagementDTO(dbValue)).collect(Collectors.toList());
        return riskList;
    }

    public AuditDashBoardResponseDTO buildIAuditDashboard(List<AuditManagementDTO> auditList) {
        HashMap<String, Integer> auditStatusCount = new HashMap<String, Integer>();
        HashMap<String, Integer> auditTypeCount = new HashMap<String, Integer>();
        HashMap<String, Integer> severityCount = new HashMap<String, Integer>();
        HashMap<String, Integer> frameWorkCount = new HashMap<String, Integer>();
        HashMap frameWorkStatusCount = new HashMap();
        Long totOverDue = 0L;
        for (AuditManagementDTO audit : auditList) {
            String framework;
            Map findingsIssuesData;
            String category;
            if (audit == null || audit.getManagementValue() == null) continue;
            Date currentDate = new Date();
            Date endDate = audit.getEndDate();
            if (currentDate.after(endDate)) {
                Long l = totOverDue;
                Long l2 = totOverDue = Long.valueOf(totOverDue + 1L);
            }
            category = (category = (String)audit.getManagementValue().get("status")) == null || category.trim().isEmpty() ? "UNKNOWN" : category;
            auditStatusCount.put(category, auditStatusCount.getOrDefault(category, 0) + 1);
            String status = String.valueOf(audit.getManagementValue().get("auditType"));
            status = status == null || status.trim().isEmpty() ? "UNKNOWN" : status;
            auditTypeCount.put(status, auditTypeCount.getOrDefault(status, 0) + 1);
            Map managementValue = audit.getManagementValue();
            if (managementValue.get("findingsIssuesData") != null && (findingsIssuesData = (Map)managementValue.get("findingsIssuesData")).get("findings") != null) {
                List findings = (List)findingsIssuesData.get("findings");
                String severityStatus = ((Map)findings.get(0)).get("severity").toString();
                severityStatus = severityStatus == null || severityStatus.trim().isEmpty() ? "UNKNOWN" : severityStatus;
                severityCount.put(severityStatus, severityCount.getOrDefault(severityStatus, 0) + 1);
            }
            framework = (framework = (String)audit.getManagementValue().get("regulatoryFramework")) == null || framework.trim().isEmpty() ? "UNKNOWN" : framework;
            int nofindings = Integer.parseInt(audit.getManagementValue().get("noOfFindings").toString());
            frameWorkCount.put(framework, nofindings);
        }
        AuditDashBoardResponseDTO response = new AuditDashBoardResponseDTO();
        response.setTotalAudit(auditList != null ? (long)auditList.size() : 0L);
        response.setTotalOverDue(totOverDue.longValue());
        response.setAuditStatusCount(auditStatusCount);
        response.setAuditTypeCount(auditTypeCount);
        response.setFindingsSeverityCount(severityCount);
        response.setFrameWorkCount(frameWorkCount);
        response.setAuditManageDTO(auditList);
        return response;
    }
}

