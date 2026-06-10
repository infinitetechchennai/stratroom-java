/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.TaskCategorys
 *  com.estrat.service.db.bean.po.UniversalIncident
 *  com.estrat.service.db.dao.UniversalIncidentAttachmentRepository
 *  com.estrat.service.db.dao.UniversalIncidentRepository
 *  com.estrat.service.db.dto.TaskCategorysDTO
 *  com.estrat.service.db.dto.UniversalIncidentAttachmentDTO
 *  com.estrat.service.db.dto.UniversalIncidentDTO
 *  com.estrat.service.db.service.EmployeeService
 *  com.estrat.service.db.service.TaskDetailsService
 *  com.estrat.service.db.service.UniversalIncidentService
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.service.db.service;

import com.estrat.service.db.bean.po.TaskCategorys;
import com.estrat.service.db.bean.po.UniversalIncident;
import com.estrat.service.db.dao.UniversalIncidentAttachmentRepository;
import com.estrat.service.db.dao.UniversalIncidentRepository;
import com.estrat.service.db.dto.TaskCategorysDTO;
import com.estrat.service.db.dto.UniversalIncidentAttachmentDTO;
import com.estrat.service.db.dto.UniversalIncidentDTO;
import com.estrat.service.db.service.EmployeeService;
import com.estrat.service.db.service.TaskDetailsService;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UniversalIncidentService {
    @Autowired
    protected UniversalIncidentRepository universalIncidentRepository;
    @Autowired
    protected UniversalIncidentAttachmentRepository incidentAttachmentRepository;
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private TaskDetailsService taskDetailsService;

    public Optional<UniversalIncident> findById(long id) {
        return this.universalIncidentRepository.findByIdAndActive(Long.valueOf(id), 0);
    }

    public UniversalIncidentDTO save(UniversalIncident universalIncident) {
        UniversalIncidentDTO incidentDTO = new UniversalIncidentDTO(universalIncident);
        List actions = (List)incidentDTO.getIncidentValue().get("tasks");
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
                taskcategory.setCreatedBy(universalIncident.getCreatedBy());
                taskcategory.setOwner(universalIncident.getCreatedBy());
                taskcategory.setType("Incident");
                Map objectsValue = taskcategory.getTaskCategoryValue();
                objectsValue.put("category", action.get("task"));
                TaskCategorysDTO taskDTOObj = this.taskDetailsService.save(new TaskCategorys(taskcategory));
                action.put("taskId", taskDTOObj.getId());
            }
        }
        UniversalIncident response = (UniversalIncident)this.universalIncidentRepository.save(new UniversalIncident(incidentDTO));
        UniversalIncidentDTO universalDTO = new UniversalIncidentDTO(response);
        return universalDTO;
    }

    public List<UniversalIncidentDTO> findAllByPageId(String pageId) {
        List dbList = new ArrayList();
        System.out.println("pageId plan :: " + pageId);
        dbList = this.universalIncidentRepository.findAllByPageId(Long.valueOf(pageId).longValue(), 0);
        List<UniversalIncidentDTO> riskList = dbList.stream().map(dbValue -> {
            UniversalIncidentDTO universalList = new UniversalIncidentDTO(dbValue);
            this.populateIncidentImpactDesc(universalList);
            return universalList;
        }).collect(Collectors.toList());
        return riskList;
    }

    public UniversalIncidentDTO deleteByObj(Optional<UniversalIncident> universalIncident) {
        UniversalIncidentDTO responseDTO = new UniversalIncidentDTO();
        if (universalIncident.isPresent()) {
            UniversalIncident management = universalIncident.get();
            management.setActive(1);
            this.universalIncidentRepository.save(management);
            return responseDTO;
        }
        return responseDTO;
    }

    public void populateIncidentImpactDesc(UniversalIncidentDTO universalIncidentDTO) {
        List attachment = this.incidentAttachmentRepository.findAllAttachment(universalIncidentDTO.getId());
        List attachmentList = attachment.stream().map(dbValue -> {
            UniversalIncidentAttachmentDTO taskDto = new UniversalIncidentAttachmentDTO(dbValue);
            return taskDto;
        }).collect(Collectors.toList());
        universalIncidentDTO.setIncidentAttachment(attachmentList);
    }
}

