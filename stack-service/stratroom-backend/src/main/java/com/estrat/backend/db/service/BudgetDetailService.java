/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.ActivitiesDetails
 *  com.estrat.backend.db.bean.po.BudgetDetail
 *  com.estrat.backend.db.bean.po.Initiatives
 *  com.estrat.backend.db.bean.po.SubActivitiesDetails
 *  com.estrat.backend.db.bean.po.SubInitiatives
 *  com.estrat.backend.db.dao.BudgetDetailRepository
 *  com.estrat.backend.db.dto.ActivitiesDTO
 *  com.estrat.backend.db.dto.BudgetDTO
 *  com.estrat.backend.db.dto.InitiativesDTO
 *  com.estrat.backend.db.dto.SubActivitiesDTO
 *  com.estrat.backend.db.dto.SubInitiativesDTO
 *  com.estrat.backend.db.repository.DepartmentChartMappingRepository
 *  com.estrat.backend.db.service.ActivitiesService
 *  com.estrat.backend.db.service.BudgetDetailService
 *  com.estrat.backend.db.service.EmployeeService
 *  com.estrat.backend.db.service.InitiativesService
 *  com.estrat.backend.db.service.SubActivitiesService
 *  com.estrat.backend.db.service.SubInitiativesService
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.backend.db.service;

import com.estrat.backend.db.bean.po.ActivitiesDetails;
import com.estrat.backend.db.bean.po.BudgetDetail;
import com.estrat.backend.db.bean.po.Initiatives;
import com.estrat.backend.db.bean.po.SubActivitiesDetails;
import com.estrat.backend.db.bean.po.SubInitiatives;
import com.estrat.backend.db.dao.BudgetDetailRepository;
import com.estrat.backend.db.dto.ActivitiesDTO;
import com.estrat.backend.db.dto.BudgetDTO;
import com.estrat.backend.db.dto.InitiativesDTO;
import com.estrat.backend.db.dto.SubActivitiesDTO;
import com.estrat.backend.db.dto.SubInitiativesDTO;
import com.estrat.backend.db.repository.DepartmentChartMappingRepository;
import com.estrat.backend.db.service.ActivitiesService;
import com.estrat.backend.db.service.EmployeeService;
import com.estrat.backend.db.service.InitiativesService;
import com.estrat.backend.db.service.SubActivitiesService;
import com.estrat.backend.db.service.SubInitiativesService;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BudgetDetailService {
    @Autowired
    protected BudgetDetailRepository budgetDetailRepository;
    @Autowired
    protected EmployeeService employeeService;
    @Autowired
    protected DepartmentChartMappingRepository deptMappingDetailRepository;
    @Autowired
    private InitiativesService initiativesService;
    @Autowired
    private SubInitiativesService subInitiativesService;
    @Autowired
    private ActivitiesService activitiesService;
    @Autowired
    private SubActivitiesService subActivitiesService;

    public BudgetDTO save(BudgetDetail budgetDetail) {
        BudgetDetail budget = (BudgetDetail)this.budgetDetailRepository.save(budgetDetail);
        BudgetDTO budgetDto = new BudgetDTO(budget);
        return budgetDto;
    }

    public Optional<BudgetDetail> findById(long id) {
        return this.budgetDetailRepository.findById(id);
    }

    public BudgetDTO saveDelete(BudgetDetail budgetDetail) {
        this.budgetDetailRepository.delete(budgetDetail);
        return new BudgetDTO(budgetDetail);
    }

    public List<BudgetDTO> findAllByEmpId(Long empId) {
        ArrayList<BudgetDTO> budgetList = new ArrayList<BudgetDTO>();
        List<BudgetDetail> budegtDetailList = this.budgetDetailRepository.findAllByEmpId(empId);
        for (BudgetDetail budgetTable : budegtDetailList) {
            BudgetDTO budgetDTO = new BudgetDTO(budgetTable);
            budgetList.add(budgetDTO);
        }
        return budgetList;
    }

    public List<BudgetDTO> findAllByPageId(long pageId, String status) {
        ArrayList<BudgetDTO> budgetList = new ArrayList<BudgetDTO>();
        List<BudgetDetail> budegtDetailList = new ArrayList();
        budegtDetailList = status != null && status.equalsIgnoreCase("DRAFT") ? this.budgetDetailRepository.findAllByPageIdANDStatus(Long.valueOf(pageId), status) : this.budgetDetailRepository.findAllByPageId(Long.valueOf(pageId));
        for (BudgetDetail budgetTable : budegtDetailList) {
            BudgetDTO budgetDTO = new BudgetDTO(budgetTable);
            this.populateImpactDesc(budgetDTO);
            budgetList.add(budgetDTO);
        }
        return budgetList;
    }

    public List<BudgetDTO> findAllBychangId(long changeId) {
        ArrayList<BudgetDTO> budgetList = new ArrayList<BudgetDTO>();
        List<BudgetDetail> budegtDetailList = this.budgetDetailRepository.findAllByChangeId(Long.valueOf(changeId));
        for (BudgetDetail budgetTable : budegtDetailList) {
            BudgetDTO budgetDTO = new BudgetDTO(budgetTable);
            this.populateImpactDesc(budgetDTO);
            budgetList.add(budgetDTO);
        }
        return budgetList;
    }

    public void populateImpactDesc(BudgetDTO budgetDto) {
        Optional subactivitu;
        Optional activity;
        Optional subInit;
        Optional initdto;
        if (Objects.nonNull(budgetDto.getInitiativeId()) && (initdto = this.initiativesService.findById(budgetDto.getInitiativeId())).isPresent()) {
            budgetDto.getBudgetValues().put("initiativeDesc", new InitiativesDTO((Initiatives)initdto.get(), false).getInitiativeValue().get("name").toString());
        }
        if (Objects.nonNull(budgetDto.getSubInitiativeId()) && (subInit = this.subInitiativesService.findById(budgetDto.getSubInitiativeId())).isPresent()) {
            budgetDto.getBudgetValues().put("subInitiativeDesc", new SubInitiativesDTO((SubInitiatives)subInit.get()).getSubInitiativeValue().get("description").toString());
        }
        if (Objects.nonNull(budgetDto.getActivityId()) && (activity = this.activitiesService.findById(budgetDto.getSubInitiativeId())).isPresent()) {
            budgetDto.getBudgetValues().put("activityDesc", new ActivitiesDTO((ActivitiesDetails)activity.get()).getActivitiesValue().get("desc").toString());
        }
        if (Objects.nonNull(budgetDto.getSubActivityId()) && (subactivitu = this.subActivitiesService.findById(budgetDto.getSubActivityId())).isPresent()) {
            budgetDto.getBudgetValues().put("subActivityDesc", new SubActivitiesDTO((SubActivitiesDetails)subactivitu.get()).getActivitiesValue().get("desc").toString());
        }
    }
}

