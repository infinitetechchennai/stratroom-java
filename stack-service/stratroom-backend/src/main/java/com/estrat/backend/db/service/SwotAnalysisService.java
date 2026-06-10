/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.SWOTAnalysis
 *  com.estrat.backend.db.bean.po.TaskCategorys
 *  com.estrat.backend.db.cache.DBCache
 *  com.estrat.backend.db.dao.SwotAnalysisRepository
 *  com.estrat.backend.db.dto.KPIDTO
 *  com.estrat.backend.db.dto.SWOTAnalysisDTO
 *  com.estrat.backend.db.dto.TaskCategorysDTO
 *  com.estrat.backend.db.repository.DepartmentDetailsRepository
 *  com.estrat.backend.db.service.KPIService
 *  com.estrat.backend.db.service.PestelAnalysisService
 *  com.estrat.backend.db.service.SwotAnalysisService
 *  com.estrat.backend.db.service.TaskDetailsService
 *  javax.transaction.Transactional
 *  org.apache.log4j.Logger
 *  org.hibernate.HibernateException
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.backend.db.service;

import com.estrat.backend.db.bean.po.SWOTAnalysis;
import com.estrat.backend.db.bean.po.TaskCategorys;
import com.estrat.backend.db.cache.DBCache;
import com.estrat.backend.db.dao.SwotAnalysisRepository;
import com.estrat.backend.db.dto.KPIDTO;
import com.estrat.backend.db.dto.SWOTAnalysisDTO;
import com.estrat.backend.db.dto.TaskCategorysDTO;
import com.estrat.backend.db.repository.DepartmentDetailsRepository;
import com.estrat.backend.db.service.KPIService;
import com.estrat.backend.db.service.PestelAnalysisService;
import com.estrat.backend.db.service.TaskDetailsService;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.hibernate.HibernateException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional(rollbackOn={HibernateException.class})
public class SwotAnalysisService {
    private Logger log = LoggerFactory.getLogger(PestelAnalysisService.class);
    @Autowired
    protected SwotAnalysisRepository swotAnalysisRepository;
    @Autowired
    protected DepartmentDetailsRepository departmentDetailsRepository;
    @Autowired
    protected KPIService kpiService;
    @Autowired
    private DBCache dbCache;
    @Autowired
    private TaskDetailsService taskDetailsService;

    public Optional<SWOTAnalysis> findById(long id) {
        return this.swotAnalysisRepository.findById(id);
    }

    public SWOTAnalysisDTO save(SWOTAnalysis swotAnalysis) {
        SWOTAnalysisDTO taskSave = new SWOTAnalysisDTO(swotAnalysis);
        Map objectsMap = taskSave.getSwotAnalysisValue();
        List actions = (List)taskSave.getSwotAnalysisValue().get("actions");
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
                taskcategory.setCreatedBy(swotAnalysis.getCreatedBy());
                taskcategory.setOwner(swotAnalysis.getCreatedBy());
                taskcategory.setDeptId(swotAnalysis.getDeptId().longValue());
                taskcategory.setType("Swot");
                Map objectsValue = taskcategory.getTaskCategoryValue();
                objectsValue.put("category", action.get("name"));
                TaskCategorysDTO taskDTOObj = this.taskDetailsService.save(new TaskCategorys(taskcategory));
                action.put("taskId", taskDTOObj.getId());
            }
        }
        SWOTAnalysis swotAnalysisResponse = (SWOTAnalysis)this.swotAnalysisRepository.save(new SWOTAnalysis(taskSave));
        SWOTAnalysisDTO responseSWOTAnalysisDTO = new SWOTAnalysisDTO(swotAnalysisResponse);
        return responseSWOTAnalysisDTO;
    }

    public void delete(SWOTAnalysis swotAnalysis) {
        this.swotAnalysisRepository.delete(swotAnalysis);
    }

    public List<SWOTAnalysisDTO> findAll(long empId, String type, long pageId) {
        List<SWOTAnalysis> dbList = this.swotAnalysisRepository.findAllByEmpId(Long.valueOf(empId), 0, type, Long.valueOf(pageId));
        List<SWOTAnalysisDTO> SWOTAnalysisDTOList = dbList.stream().map(dbValue -> {
            SWOTAnalysisDTO swotAnalysisDTO = new SWOTAnalysisDTO(dbValue);
            if (swotAnalysisDTO.getDeptId() != null) {
                swotAnalysisDTO.setDepartment(this.departmentDetailsRepository.findById(swotAnalysisDTO.getDeptId(), "Active").getName());
            }
            return swotAnalysisDTO;
        }).collect(Collectors.toList());
        return SWOTAnalysisDTOList;
    }

    public List<SWOTAnalysisDTO> findAll(long empId, String type) {
        List<SWOTAnalysis> dbList = this.swotAnalysisRepository.findAllByEmpId(Long.valueOf(empId), 0, type);
        List<SWOTAnalysisDTO> SWOTAnalysisDTOList = dbList.stream().map(dbValue -> {
            SWOTAnalysisDTO swotAnalysisDTO = new SWOTAnalysisDTO(dbValue);
            if (swotAnalysisDTO.getDeptId() != null) {
                swotAnalysisDTO.setDepartment(this.departmentDetailsRepository.findById(swotAnalysisDTO.getDeptId(), "Active").getName());
            }
            return swotAnalysisDTO;
        }).collect(Collectors.toList());
        return SWOTAnalysisDTOList;
    }

    public List<SWOTAnalysis> findAllByPageId(long pageId) {
        return this.swotAnalysisRepository.findAllByPageId(Long.valueOf(pageId));
    }

    public void ImpactPapulate(SWOTAnalysisDTO dto) {
        String impactStr;
        Object impactObj = dto.getSwotAnalysisValue().get("impact");
        String string = impactStr = impactObj != null ? impactObj.toString().trim() : "";
        if (!impactStr.isEmpty() && !impactStr.equals("[]")) {
            List<Long> impactIds = Arrays.stream(impactStr.replaceAll("\\[|\\]|\\s", "").split(",")).filter(s -> !s.isEmpty()).map(Long::parseLong).collect(Collectors.toList());
            ArrayList<Map<String, Object>> impactKpiList = new ArrayList<Map<String, Object>>();
            for (Long id : impactIds) {
                this.kpiService.findById(id.longValue()).ifPresent(kpi -> {
                    KPIDTO kpiDTO = new KPIDTO(kpi);
                    HashMap<String, Object> impactKpiObj = new HashMap<String, Object>();
                    impactKpiObj.put("kpiId", id);
                    impactKpiObj.put("kpiName", kpiDTO.getKpiName());
                    impactKpiList.add(impactKpiObj);
                });
            }
            dto.getSwotAnalysisValue().put("impact_name", impactKpiList);
        } else {
            dto.getSwotAnalysisValue().put("impact_name", new ArrayList());
        }
    }
}

