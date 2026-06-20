/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.Initiatives
 *  com.estrat.backend.db.bean.po.ProjectPlanning
 *  com.estrat.backend.db.bean.po.TaskCategorys
 *  com.estrat.backend.db.dao.ProjectPlanningRepository
 *  com.estrat.backend.db.dto.EmployeeDTO
 *  com.estrat.backend.db.dto.InitiativeResponseDTO
 *  com.estrat.backend.db.dto.InitiativesDTO
 *  com.estrat.backend.db.dto.ProjectPlanningDTO
 *  com.estrat.backend.db.dto.TaskCategorysDTO
 *  com.estrat.backend.db.resource.util.InitiativeUtil
 *  com.estrat.backend.db.service.EmployeeService
 *  com.estrat.backend.db.service.InitiativesService
 *  com.estrat.backend.db.service.ProjectPlanningService
 *  com.estrat.backend.db.service.TaskDetailsService
 *  org.apache.commons.lang3.StringUtils
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.backend.db.service;

import com.estrat.backend.db.bean.po.Initiatives;
import com.estrat.backend.db.bean.po.ProjectPlanning;
import com.estrat.backend.db.bean.po.TaskCategorys;
import com.estrat.backend.db.dao.ProjectPlanningRepository;
import com.estrat.backend.db.dto.EmployeeDTO;
import com.estrat.backend.db.dto.InitiativeResponseDTO;
import com.estrat.backend.db.dto.InitiativesDTO;
import com.estrat.backend.db.dto.ProjectPlanningDTO;
import com.estrat.backend.db.dto.TaskCategorysDTO;
import com.estrat.backend.db.resource.util.InitiativeUtil;
import com.estrat.backend.db.service.EmployeeService;
import com.estrat.backend.db.service.InitiativesService;
import com.estrat.backend.db.service.TaskDetailsService;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectPlanningService {
    @Autowired
    protected ProjectPlanningRepository projectPlanningRepository;
    @Autowired
    private InitiativeUtil initiativeUtil;
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    protected InitiativesService initiativesService;
    @Autowired
    private TaskDetailsService taskDetailsService;

    public Optional<ProjectPlanning> findById(long id) {
        return this.projectPlanningRepository.findByIdAndActive(Long.valueOf(id), 0);
    }

    public ProjectPlanningDTO save(ProjectPlanning projectPlanning) {
        ProjectPlanning planningResponse = (ProjectPlanning)this.projectPlanningRepository.save(projectPlanning);
        ProjectPlanningDTO projectPlanningDTO = new ProjectPlanningDTO(planningResponse);
        InitiativesDTO initiativeDTO = new InitiativesDTO();
        if (initiativeDTO.getInitiativeValue() == null) {
            initiativeDTO.setInitiativeValue(new HashMap<>());
        }
        initiativeDTO.setCreatedBy(planningResponse.getCreatedBy());
        initiativeDTO.setCreatedTime(LocalDateTime.now());
        initiativeDTO.setPageId(planningResponse.getInitiativePageId().longValue());
        Map<String, Object> objectsMap = projectPlanningDTO.getPlanningValue();
        initiativeDTO.setDepartmentId(Long.valueOf(objectsMap.get("departmentId").toString()));
        String fromdate = (String)objectsMap.get("fromdate");
        String todate = (String)objectsMap.get("enddate");
        String fullDate = fromdate + " - " + todate;
        Map<String, Object> objectsValue = initiativeDTO.getInitiativeValue();
        EmployeeDTO employeeDTO = new EmployeeDTO();
        if (initiativeDTO.getCreatedBy() != 0L) {
            employeeDTO.setEmployeeId(initiativeDTO.getCreatedBy());
            initiativeDTO.getInitiativeValue().put("createdByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        objectsValue.put("actualdaterange", fullDate);
        objectsValue.put("statusType", objectsMap.get("status"));
        objectsValue.put("categoryType", objectsMap.get("category"));
        objectsValue.put("description", objectsMap.get("projectDescription"));
        objectsValue.put("statusType", objectsMap.get("status"));
        objectsValue.put("name", objectsMap.get("projectName"));
        objectsValue.put("actual", "false");
        objectsValue.put("target", "false");
        objectsValue.put("budget", "false");
        objectsValue.put("total", "false");
        objectsValue.put("balance", "false");
        objectsValue.put("utilized", "false");
        objectsValue.put("forecast", "false");
        objectsValue.put("progressval", "0");
        objectsValue.put("impactDesc", "NA");
        this.initiativeUtil.applyDefaultValues(initiativeDTO.getInitiativeValue());
        Initiatives initiatives = new Initiatives(this.initiativeUtil.formatDates(initiativeDTO));
        InitiativeResponseDTO initiativeResponseDTO = this.initiativesService.save(initiatives);
        List<?> actions = (List<?>)projectPlanningDTO.getPlanningValue().get("actions");
        if (actions != null) {
            for (Object actionObj : actions) {
                Map action = (Map)actionObj;
                TaskCategorysDTO taskcategory = new TaskCategorysDTO();
                if (taskcategory.getTaskCategoryValue() == null) {
                    taskcategory.setTaskCategoryValue(new HashMap<>());
                }
                if (action.get("taskId") != null) {
                    taskcategory.setId(Long.parseLong(action.get("taskId").toString()));
                }
                taskcategory.setCreatedTime(LocalDateTime.now());
                taskcategory.setCreatedBy(projectPlanning.getCreatedBy());
                taskcategory.setOwner(projectPlanning.getCreatedBy());
                taskcategory.setType("ProjectPlanning");
                Map<String, Object> taskobjectsValue = taskcategory.getTaskCategoryValue();
                taskobjectsValue.put("category", action.get("name"));
                TaskCategorysDTO taskDTOObj = this.taskDetailsService.save(new TaskCategorys(taskcategory));
                action.put("taskId", taskDTOObj.getId());
            }
        }
        planningResponse.setInitiativeId(Long.valueOf(initiativeResponseDTO.getInitiativesDTO().getId()));
        ProjectPlanning planningNewResponse = (ProjectPlanning)this.projectPlanningRepository.save(new ProjectPlanning(projectPlanningDTO));
        return new ProjectPlanningDTO(planningNewResponse);
    }

    public List<ProjectPlanningDTO> findAllByPageId(String pageId, String dateRange) {
        List<ProjectPlanning> dbList = new ArrayList<>();
        System.out.println("dateRange plane :: " + dateRange);
        System.out.println("pageId plan :: " + pageId);
        if (StringUtils.isNotEmpty((CharSequence)dateRange)) {
            Date firstDate = null;
            Date secondDate = null;
            String[] dataRanges = null;
            if (Objects.nonNull(dateRange)) {
                String[] stringArray = dataRanges = dateRange.contains("-") ? dateRange.split("-") : dateRange.split(",");
            }
            if (dataRanges != null && dataRanges.length > 1) {
                String startDate = dataRanges[0].trim();
                String endDate = dataRanges[1].trim();
                SimpleDateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy");
                try {
                    firstDate = dateFormat.parse(startDate);
                    secondDate = dateFormat.parse(endDate);
                }
                catch (ParseException e) {
                    throw new RuntimeException(e);
                }
            }
            System.out.println("firstDate :: " + firstDate + "and secondDate :: " + secondDate);
            dbList = StringUtils.isNotEmpty((CharSequence)pageId) ? this.projectPlanningRepository.findAllByEmpId(0, Long.valueOf(pageId).longValue(), firstDate, secondDate) : this.projectPlanningRepository.findAllByPageId(Long.valueOf(pageId).longValue(), 0);
        }
        List<ProjectPlanningDTO> riskList = dbList.stream().map(dbValue -> new ProjectPlanningDTO(dbValue)).collect(Collectors.toList());
        return riskList;
    }

    public ProjectPlanningDTO deleteByObj(Optional<ProjectPlanning> projectPlanning) {
        ProjectPlanningDTO responseDTO = new ProjectPlanningDTO();
        if (projectPlanning.isPresent()) {
            ProjectPlanning management = projectPlanning.get();
            management.setActive(1);
            this.projectPlanningRepository.save(management);
            return responseDTO;
        }
        return responseDTO;
    }

    public ProjectPlanningDTO formatDate(ProjectPlanningDTO projectPlanningDTO) {
        Date firstDate = null;
        Date secondDate = null;
        String startDate = null;
        String endDate = null;
        if (projectPlanningDTO.getPlanningValue().containsKey("fromdate")) {
            startDate = projectPlanningDTO.getPlanningValue().get("fromdate").toString();
        }
        if (projectPlanningDTO.getPlanningValue().containsKey("enddate")) {
            endDate = projectPlanningDTO.getPlanningValue().get("enddate").toString();
        }
        if (startDate != null && endDate != null) {
            SimpleDateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy");
            try {
                firstDate = dateFormat.parse(startDate);
                secondDate = dateFormat.parse(endDate);
            }
            catch (ParseException e) {
                throw new RuntimeException(e);
            }
        }
        projectPlanningDTO.setStartDate(firstDate);
        projectPlanningDTO.setEndDate(secondDate);
        return projectPlanningDTO;
    }
}

