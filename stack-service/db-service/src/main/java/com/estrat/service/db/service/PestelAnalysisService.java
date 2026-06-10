/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.PestelAnalysis
 *  com.estrat.service.db.bean.po.TaskCategorys
 *  com.estrat.service.db.cache.DBCache
 *  com.estrat.service.db.dao.PestelAnalysisRepository
 *  com.estrat.service.db.dto.PestelAnalysisDTO
 *  com.estrat.service.db.dto.TaskCategorysDTO
 *  com.estrat.service.db.repository.DepartmentDetailsRepository
 *  com.estrat.service.db.service.PestelAnalysisService
 *  com.estrat.service.db.service.TaskDetailsService
 *  javax.transaction.Transactional
 *  org.apache.log4j.Logger
 *  org.hibernate.HibernateException
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.service.db.service;

import com.estrat.service.db.bean.po.PestelAnalysis;
import com.estrat.service.db.bean.po.TaskCategorys;
import com.estrat.service.db.cache.DBCache;
import com.estrat.service.db.dao.PestelAnalysisRepository;
import com.estrat.service.db.dto.PestelAnalysisDTO;
import com.estrat.service.db.dto.TaskCategorysDTO;
import com.estrat.service.db.repository.DepartmentDetailsRepository;
import com.estrat.service.db.service.TaskDetailsService;
import java.time.LocalDateTime;
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
public class PestelAnalysisService {
    private Logger log = LoggerFactory.getLogger(PestelAnalysisService.class);
    @Autowired
    protected PestelAnalysisRepository pestelAnalysisRepository;
    @Autowired
    protected DepartmentDetailsRepository departmentDetailsRepository;
    @Autowired
    private DBCache dbCache;
    @Autowired
    private TaskDetailsService taskDetailsService;

    public Optional<PestelAnalysis> findById(long id) {
        return this.pestelAnalysisRepository.findById(id);
    }

    public PestelAnalysisDTO save(PestelAnalysis pestelAnalysis) {
        PestelAnalysisDTO taskSave = new PestelAnalysisDTO(pestelAnalysis);
        Map objectsMap = taskSave.getPestelAnalysisValue();
        List actions = (List)taskSave.getPestelAnalysisValue().get("actions");
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
                taskcategory.setCreatedBy(pestelAnalysis.getCreatedBy());
                taskcategory.setOwner(pestelAnalysis.getCreatedBy());
                taskcategory.setDeptId(pestelAnalysis.getDeptId().longValue());
                taskcategory.setType("Pestel");
                Map objectsValue = taskcategory.getTaskCategoryValue();
                objectsValue.put("category", action.get("name"));
                TaskCategorysDTO taskDTOObj = this.taskDetailsService.save(new TaskCategorys(taskcategory));
                action.put("taskId", taskDTOObj.getId());
            }
        }
        PestelAnalysis pestelAnalysisResponse = (PestelAnalysis)this.pestelAnalysisRepository.save(new PestelAnalysis(taskSave));
        PestelAnalysisDTO responsePestelAnalysisDTO = new PestelAnalysisDTO(pestelAnalysisResponse);
        return responsePestelAnalysisDTO;
    }

    public void delete(PestelAnalysis pestelAnalysis) {
        this.pestelAnalysisRepository.delete((Object)pestelAnalysis);
    }

    public List<PestelAnalysisDTO> findAll(long empId, String type, long pageId) {
        List dbList = this.pestelAnalysisRepository.findAllByEmpId(Long.valueOf(empId), 0, type, Long.valueOf(pageId));
        List<PestelAnalysisDTO> pestelAnalysisDTOList = dbList.stream().map(dbValue -> {
            PestelAnalysisDTO pestelAnalysisDTO = new PestelAnalysisDTO(dbValue);
            if (pestelAnalysisDTO.getDeptId() != null) {
                pestelAnalysisDTO.setDepartment(this.departmentDetailsRepository.findById(pestelAnalysisDTO.getDeptId(), "Active").getName());
            }
            return pestelAnalysisDTO;
        }).collect(Collectors.toList());
        return pestelAnalysisDTOList;
    }

    public List<PestelAnalysisDTO> findAll(long empId, String type) {
        List dbList = this.pestelAnalysisRepository.findAllByEmpId(Long.valueOf(empId), 0, type);
        List<PestelAnalysisDTO> pestelAnalysisDTOList = dbList.stream().map(dbValue -> {
            PestelAnalysisDTO pestelAnalysisDTO = new PestelAnalysisDTO(dbValue);
            if (pestelAnalysisDTO.getDeptId() != null) {
                pestelAnalysisDTO.setDepartment(this.departmentDetailsRepository.findById(pestelAnalysisDTO.getDeptId(), "Active").getName());
            }
            return pestelAnalysisDTO;
        }).collect(Collectors.toList());
        return pestelAnalysisDTOList;
    }

    public List<PestelAnalysis> findAllByPageId(long pageId) {
        return this.pestelAnalysisRepository.findAllByPageId(Long.valueOf(pageId));
    }
}

