/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.ControlPanelWorkFlow
 *  com.estrat.service.db.bean.po.DepartmentChartMapping
 *  com.estrat.service.db.dao.ControlPanelWorkFlowRepository
 *  com.estrat.service.db.dto.ControlPanelWorkFlowDTO
 *  com.estrat.service.db.repository.DepartmentChartMappingRepository
 *  com.estrat.service.db.service.ControlPanelWorkFlowService
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.service.db.service;

import com.estrat.service.db.bean.po.ControlPanelWorkFlow;
import com.estrat.service.db.bean.po.DepartmentChartMapping;
import com.estrat.service.db.dao.ControlPanelWorkFlowRepository;
import com.estrat.service.db.dto.ControlPanelWorkFlowDTO;
import com.estrat.service.db.repository.DepartmentChartMappingRepository;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ControlPanelWorkFlowService {
    @Autowired
    protected ControlPanelWorkFlowRepository controlPanelWorkFlowRepo;
    @Autowired
    protected DepartmentChartMappingRepository deptMappingDetailRepository;

    public ControlPanelWorkFlowDTO save(ControlPanelWorkFlow controlPanelWorkFlow) {
        ControlPanelWorkFlow WorkFlow = (ControlPanelWorkFlow)this.controlPanelWorkFlowRepo.save(controlPanelWorkFlow);
        ControlPanelWorkFlowDTO controlPanelWorkFlowDTO = new ControlPanelWorkFlowDTO(WorkFlow);
        return controlPanelWorkFlowDTO;
    }

    public List<ControlPanelWorkFlowDTO> findAllWorkFlow() {
        List impactList = this.controlPanelWorkFlowRepo.findAll();
        List<ControlPanelWorkFlowDTO> workflowDtoList = impactList.stream().map(dbValue -> {
            ControlPanelWorkFlowDTO workflowDto = new ControlPanelWorkFlowDTO(dbValue);
            System.out.println("Department id ::: " + dbValue.getDepartment());
            if (dbValue.getDepartment() != 0L) {
                DepartmentChartMapping deptData = this.deptMappingDetailRepository.getOne(Long.valueOf(dbValue.getDepartment()));
                System.out.println("Department name::: " + deptData.getDeptName());
                workflowDto.setDepartmentName(deptData.getDeptName());
            }
            return workflowDto;
        }).collect(Collectors.toList());
        return workflowDtoList;
    }

    public Optional<ControlPanelWorkFlow> findWorkFlowById(long id) {
        return this.controlPanelWorkFlowRepo.findById(id);
    }

    public void delete(ControlPanelWorkFlow controlPanelWorkFlow) {
        this.controlPanelWorkFlowRepo.delete((Object)controlPanelWorkFlow);
    }

    public List<ControlPanelWorkFlowDTO> findWorkflowsByTypeAndDept(String type, Long departmentId) {
        List impactList = this.controlPanelWorkFlowRepo.findWorkflowsByTypeAndDepartment(type, departmentId);
        List<ControlPanelWorkFlowDTO> workflowDtoList = impactList.stream().map(dbValue -> {
            ControlPanelWorkFlowDTO workflowDto = new ControlPanelWorkFlowDTO(dbValue);
            if (dbValue.getDepartment() != 0L) {
                DepartmentChartMapping deptData = this.deptMappingDetailRepository.getOne(Long.valueOf(dbValue.getDepartment()));
                workflowDto.setDepartmentName(deptData.getDeptName());
            }
            return workflowDto;
        }).collect(Collectors.toList());
        return workflowDtoList;
    }
}

