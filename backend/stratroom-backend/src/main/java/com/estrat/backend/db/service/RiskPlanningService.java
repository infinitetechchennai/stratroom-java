/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.RiskPlanning
 *  com.estrat.backend.db.bean.po.TaskCategorys
 *  com.estrat.backend.db.dao.RiskPlanningRepository
 *  com.estrat.backend.db.dto.RiskPlanningDTO
 *  com.estrat.backend.db.dto.TaskCategorysDTO
 *  com.estrat.backend.db.service.EmployeeService
 *  com.estrat.backend.db.service.RiskPlanningService
 *  com.estrat.backend.db.service.TaskDetailsService
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.backend.db.service;

import com.estrat.backend.db.bean.po.RiskPlanning;
import com.estrat.backend.db.bean.po.TaskCategorys;
import com.estrat.backend.db.dao.RiskPlanningRepository;
import com.estrat.backend.db.dto.RiskPlanningDTO;
import com.estrat.backend.db.dto.TaskCategorysDTO;
import com.estrat.backend.db.service.EmployeeService;
import com.estrat.backend.db.service.TaskDetailsService;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RiskPlanningService {
    @Autowired
    protected RiskPlanningRepository riskPlanningRepository;
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private TaskDetailsService taskDetailsService;

    public Optional<RiskPlanning> findById(long id) {
        return this.riskPlanningRepository.findByIdAndActive(Long.valueOf(id), 0);
    }

    public RiskPlanningDTO save(RiskPlanning riskPlanning) {
        RiskPlanningDTO taskplanningDTO = new RiskPlanningDTO(riskPlanning);
        List actions = (List)taskplanningDTO.getRiskPlanningValue().get("actions");
        if (actions != null) {
            for (Object actionObj : actions) {
                Map action = (Map) actionObj;
                TaskCategorysDTO taskcategory = new TaskCategorysDTO();
                if (taskcategory.getTaskCategoryValue() == null) {
                    taskcategory.setTaskCategoryValue(new HashMap());
                }
                if (action.get("taskId") != null) {
                    taskcategory.setId(Long.parseLong(action.get("taskId").toString()));
                }
                taskcategory.setCreatedTime(LocalDateTime.now());
                taskcategory.setCreatedBy(riskPlanning.getCreatedBy());
                taskcategory.setOwner(riskPlanning.getCreatedBy());
                taskcategory.setType("RiskPlanning");
                Map objectsValue = taskcategory.getTaskCategoryValue();
                objectsValue.put("category", action.get("name"));
                TaskCategorysDTO taskDTOObj = this.taskDetailsService.save(new TaskCategorys(taskcategory));
                action.put("taskId", taskDTOObj.getId());
            }
        }
        RiskPlanning planningResponse = (RiskPlanning)this.riskPlanningRepository.save(new RiskPlanning(taskplanningDTO));
        RiskPlanningDTO planningDTO = new RiskPlanningDTO(planningResponse);
        return planningDTO;
    }

    public RiskPlanningDTO deleteByObj(Optional<RiskPlanning> riskPlanning) {
        RiskPlanningDTO responseDTO = new RiskPlanningDTO();
        if (riskPlanning.isPresent()) {
            RiskPlanning management = riskPlanning.get();
            management.setActive(1);
            this.riskPlanningRepository.save(management);
            return responseDTO;
        }
        return responseDTO;
    }

    public List<RiskPlanningDTO> findAllByPageId(String pageId) {
        System.out.println("pageId plan :: " + pageId);
        List<RiskPlanning> dbList = this.riskPlanningRepository.findAllByPageId(Long.valueOf(pageId).longValue(), 0);
        List<RiskPlanningDTO> riskList = dbList.stream().map(dbValue -> new RiskPlanningDTO(dbValue)).collect(Collectors.toList());
        return riskList;
    }
}

