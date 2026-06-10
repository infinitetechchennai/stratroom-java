/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.ModuleDetailsPo
 *  com.estrat.backend.db.dto.ModuleDTO
 *  com.estrat.backend.db.repository.ModuleRepository
 *  com.estrat.backend.db.repository.PrivilegeRepository
 *  com.estrat.backend.db.resource.util.RoleConstants
 *  com.estrat.backend.db.resource.util.RoleUtil
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Component
 */
package com.estrat.backend.db.resource.util;

import com.estrat.backend.db.bean.po.ModuleDetailsPo;
import com.estrat.backend.db.dto.ModuleDTO;
import com.estrat.backend.db.repository.ModuleRepository;
import com.estrat.backend.db.repository.PrivilegeRepository;
import com.estrat.backend.db.resource.util.RoleConstants;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class RoleUtil {
    @Autowired
    protected ModuleRepository moduleRepository;
    @Autowired
    protected PrivilegeRepository privilegeRepository;

    public List<ModuleDTO> getModuleList(String role) {
        ArrayList<ModuleDTO> moduleDTOList = new ArrayList<ModuleDTO>();
        List moduleDetailsPos = this.moduleRepository.getModuleListByName("Organization");
        moduleDTOList.addAll(this.getModuleList(moduleDetailsPos, role, "Organization"));
        List scorecardPos = this.moduleRepository.getModuleListByName("Scorecard");
        moduleDTOList.addAll(this.getModuleList(scorecardPos, role, "Scorecard"));
        List initiativePos = this.moduleRepository.getModuleListByName("Initiatives & Projects");
        moduleDTOList.addAll(this.getModuleList(initiativePos, role, "Initiatives & Projects"));
        List riskPos = this.moduleRepository.getModuleListByName("Risk");
        moduleDTOList.addAll(this.getModuleList(riskPos, role, "Risk"));
        List swotPos = this.moduleRepository.getModuleListByName("SWOT");
        moduleDTOList.addAll(this.getModuleList(swotPos, role, "SWOT"));
        List pestelPos = this.moduleRepository.getModuleListByName("PESTEL");
        moduleDTOList.addAll(this.getModuleList(pestelPos, role, "PESTEL"));
        List meetingPos = this.moduleRepository.getModuleListByName("Meetings");
        moduleDTOList.addAll(this.getModuleList(meetingPos, role, "Meetings"));
        List mySpacePos = this.moduleRepository.getModuleListByName("My Space");
        moduleDTOList.addAll(this.getModuleList(mySpacePos, role, "My Space"));
        List strategyPos = this.moduleRepository.getModuleListByName("Strategy Formulation");
        moduleDTOList.addAll(this.getModuleList(strategyPos, role, "Strategy Formulation"));
        List projectPos = this.moduleRepository.getModuleListByName("Project Formulation");
        moduleDTOList.addAll(this.getModuleList(projectPos, role, "Project Formulation"));
        List riskFormulationPos = this.moduleRepository.getModuleListByName("Risk Formulation");
        moduleDTOList.addAll(this.getModuleList(riskFormulationPos, role, "Risk Formulation"));
        List cockpitPos = this.moduleRepository.getModuleListByName("Cockpit");
        moduleDTOList.addAll(this.getModuleList(cockpitPos, role, "Cockpit"));
        List strategymapPos = this.moduleRepository.getModuleListByName("StrategyMap");
        moduleDTOList.addAll(this.getModuleList(strategymapPos, role, "StrategyMap"));
        List chartsPos = this.moduleRepository.getModuleListByName("Charts");
        moduleDTOList.addAll(this.getModuleList(chartsPos, role, "Charts"));
        List dataSourcePos = this.moduleRepository.getModuleListByName("Data Sources");
        moduleDTOList.addAll(this.getModuleList(dataSourcePos, role, "Data Source"));
        List templatePos = this.moduleRepository.getModuleListByName("Template");
        moduleDTOList.addAll(this.getModuleList(templatePos, role, "Template"));
        List auditTrailPos = this.moduleRepository.getModuleListByName("Audit Trail");
        moduleDTOList.addAll(this.getModuleList(auditTrailPos, role, "Audit Trail"));
        List controlPanelPos = this.moduleRepository.getModuleListByName("Control Panel");
        moduleDTOList.addAll(this.getModuleList(controlPanelPos, role, "Control Panel"));
        List userManagementPos = this.moduleRepository.getModuleListByName("User Management");
        moduleDTOList.addAll(this.getModuleList(userManagementPos, role, "User Management"));
        List orgTrackerPos = this.moduleRepository.getModuleListByName("Org Tracker");
        moduleDTOList.addAll(this.getModuleList(orgTrackerPos, role, "Org Tracker"));
        return moduleDTOList;
    }

    public List<ModuleDTO> getModuleList(List<ModuleDetailsPo> mpDetailsPos, String role, String type) {
        return mpDetailsPos.stream().map(module -> {
            ModuleDTO moduleDto = new ModuleDTO(module);
            moduleDto.setPrivilegeList(this.getPrivilegeList(role, type, moduleDto.getTagName()));
            return moduleDto;
        }).collect(Collectors.toList());
    }

    public Map<String, Object> getPrivilegeList(String role, String type, String tag) {
        Map detailsPoList = null;
        detailsPoList = role.equalsIgnoreCase("Super User") ? (type.equalsIgnoreCase("Data Source") ? (tag.equalsIgnoreCase("Manual") ? RoleConstants.getPrivilegeViewAndCreate_NA_ALL() : RoleConstants.getPrivilegeAll()) : (type.equalsIgnoreCase("Audit Trail") ? RoleConstants.getPrivilegeViewAND_NA_ALL() : RoleConstants.getPrivilegeAll())) : (role.equalsIgnoreCase("Admin") ? (type.equalsIgnoreCase("Data Source") ? (tag.equalsIgnoreCase("Manual") ? RoleConstants.getPrivilegeViewAndCreate_NA_ALL() : RoleConstants.getPrivilegeAll()) : (type.equalsIgnoreCase("Audit Trail") || type.equalsIgnoreCase("Template") ? RoleConstants.getPrivilegeViewAND_NA_ALL() : RoleConstants.getPrivilegeAll())) : (role.equalsIgnoreCase("Owner") ? (type.equalsIgnoreCase("Cockpit") || type.equalsIgnoreCase("Charts") || type.equalsIgnoreCase("StrategyMap") ? RoleConstants.getPrivilegeView() : (type.equalsIgnoreCase("Data Source") ? (tag.equalsIgnoreCase("Manual") ? RoleConstants.getPrivilegeViewAndCreate_NA_ALL_FALSE() : RoleConstants.getPrivilegeAllWithFALSE()) : (type.equalsIgnoreCase("Audit Trail") ? RoleConstants.getPrivilegeviewandNaAllFalse() : (type.equalsIgnoreCase("Template") || type.equalsIgnoreCase("Control Panel") || type.equalsIgnoreCase("User Management") ? RoleConstants.getPrivilegeAllWithFALSE() : RoleConstants.getPrivilegeAll())))) : (role.equalsIgnoreCase("User") ? (type.equalsIgnoreCase("Data Source") ? (tag.equalsIgnoreCase("Manual") ? RoleConstants.getPrivilegeViewAndCreate_NA_ALL_FALSE() : RoleConstants.getPrivilegeAllWithFALSE()) : (type.equalsIgnoreCase("Audit Trail") ? RoleConstants.getPrivilegeviewandNaAllFalse() : (type.equalsIgnoreCase("Control Panel") || type.equalsIgnoreCase("User Management") || type.equalsIgnoreCase("Template") ? RoleConstants.getPrivilegeAllWithFALSE() : RoleConstants.getPrivilegeView()))) : (type.equalsIgnoreCase("Data Source") ? (tag.equalsIgnoreCase("Manual") ? RoleConstants.getPrivilegeViewAndCreate_NA_ALL_FALSE() : RoleConstants.getPrivilegeAllWithFALSE()) : (type.equalsIgnoreCase("Audit Trail") ? RoleConstants.getPrivilegeviewandNaAllFalse() : (type.equalsIgnoreCase("Control Panel") || type.equalsIgnoreCase("Template") || type.equalsIgnoreCase("User Management") || type.equalsIgnoreCase("Org Tracker") ? RoleConstants.getPrivilegeAllWithFALSE() : RoleConstants.getPrivilegeView()))))));
        if (detailsPoList == null) {
            return new HashMap<String, Object>();
        }
        return detailsPoList;
    }
}

