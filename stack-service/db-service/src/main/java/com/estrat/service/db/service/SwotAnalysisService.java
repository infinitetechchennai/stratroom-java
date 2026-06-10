/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.SWOTAnalysis
 *  com.estrat.service.db.bean.po.TaskCategorys
 *  com.estrat.service.db.cache.DBCache
 *  com.estrat.service.db.dao.SwotAnalysisRepository
 *  com.estrat.service.db.dto.KPIDTO
 *  com.estrat.service.db.dto.SWOTAnalysisDTO
 *  com.estrat.service.db.dto.TaskCategorysDTO
 *  com.estrat.service.db.repository.DepartmentDetailsRepository
 *  com.estrat.service.db.service.KPIService
 *  com.estrat.service.db.service.PestelAnalysisService
 *  com.estrat.service.db.service.SwotAnalysisService
 *  com.estrat.service.db.service.TaskDetailsService
 *  javax.transaction.Transactional
 *  org.apache.log4j.Logger
 *  org.hibernate.HibernateException
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.service.db.service;

import com.estrat.service.db.bean.po.SWOTAnalysis;
import com.estrat.service.db.bean.po.TaskCategorys;
import com.estrat.service.db.cache.DBCache;
import com.estrat.service.db.dao.SwotAnalysisRepository;
import com.estrat.service.db.dto.KPIDTO;
import com.estrat.service.db.dto.SWOTAnalysisDTO;
import com.estrat.service.db.dto.TaskCategorysDTO;
import com.estrat.service.db.repository.DepartmentDetailsRepository;
import com.estrat.service.db.service.KPIService;
import com.estrat.service.db.service.PestelAnalysisService;
import com.estrat.service.db.service.TaskDetailsService;
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
            for (Map action : actions) {
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
        this.swotAnalysisRepository.delete((Object)swotAnalysis);
    }

    public List<SWOTAnalysisDTO> findAll(long empId, String type, long pageId) {
        List dbList = this.swotAnalysisRepository.findAllByEmpId(Long.valueOf(empId), 0, type, Long.valueOf(pageId));
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
        List dbList = this.swotAnalysisRepository.findAllByEmpId(Long.valueOf(empId), 0, type);
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
            List impactIds = Arrays.stream(impactStr.replaceAll("\\[|\\]|\\s", "").split(",")).filter(s -> !s.isEmpty()).map(Long::parseLong).collect(Collectors.toList());
            ArrayList impactKpiList = new ArrayList();
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

