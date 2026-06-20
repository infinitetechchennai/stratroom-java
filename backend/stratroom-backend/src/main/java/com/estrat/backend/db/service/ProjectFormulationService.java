/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.FormulationInitiatives
 *  com.estrat.backend.db.bean.po.FormulationSubInitiatives
 *  com.estrat.backend.db.bean.po.KPI
 *  com.estrat.backend.db.bean.po.ProjectFormulation
 *  com.estrat.backend.db.bean.po.ProjectFormulationUserMapping
 *  com.estrat.backend.db.dto.FormulationInitiativesDTO
 *  com.estrat.backend.db.dto.FormulationSubInitiativesDTO
 *  com.estrat.backend.db.dto.KPIDTO
 *  com.estrat.backend.db.dto.ProjectFormulationDTO
 *  com.estrat.backend.db.repository.FormulationInitiativesRepository
 *  com.estrat.backend.db.repository.FormulationSubInitiativesRespository
 *  com.estrat.backend.db.repository.ProjectFormulationMappingRepository
 *  com.estrat.backend.db.repository.ProjectFormulationRepository
 *  com.estrat.backend.db.resource.util.UserThreadLocal
 *  com.estrat.backend.db.service.AuditDetailsService
 *  com.estrat.backend.db.service.KPIService
 *  com.estrat.backend.db.service.ProjectFormulationService
 *  javax.transaction.Transactional
 *  org.apache.commons.collections4.CollectionUtils
 *  org.apache.commons.lang3.StringUtils
 *  org.hibernate.HibernateException
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.backend.db.service;

import com.estrat.backend.db.bean.po.FormulationInitiatives;
import com.estrat.backend.db.bean.po.FormulationSubInitiatives;
import com.estrat.backend.db.bean.po.KPI;
import com.estrat.backend.db.bean.po.ProjectFormulation;
import com.estrat.backend.db.bean.po.ProjectFormulationUserMapping;
import com.estrat.backend.db.dto.FormulationInitiativesDTO;
import com.estrat.backend.db.dto.FormulationSubInitiativesDTO;
import com.estrat.backend.db.dto.KPIDTO;
import com.estrat.backend.db.dto.ProjectFormulationDTO;
import com.estrat.backend.db.repository.FormulationInitiativesRepository;
import com.estrat.backend.db.repository.FormulationSubInitiativesRespository;
import com.estrat.backend.db.repository.ProjectFormulationMappingRepository;
import com.estrat.backend.db.repository.ProjectFormulationRepository;
import com.estrat.backend.db.resource.util.UserThreadLocal;
import com.estrat.backend.db.service.AuditDetailsService;
import com.estrat.backend.db.service.KPIService;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;
import jakarta.transaction.Transactional;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.hibernate.HibernateException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional(rollbackOn={HibernateException.class})
public class ProjectFormulationService {
    @Autowired
    private ProjectFormulationRepository formulationRepository;
    @Autowired
    private FormulationInitiativesRepository initiativesRepository;
    @Autowired
    private FormulationSubInitiativesRespository subInitiativesRepository;
    @Autowired
    private ProjectFormulationMappingRepository projectFormulationMappingRepository;
    @Autowired
    private KPIService kpiService;
    @Autowired
    private AuditDetailsService auditService;

    public ProjectFormulationDTO saveProjectFormulation(ProjectFormulationDTO projectFormulationDTO) {
        ProjectFormulation projectFormulation = new ProjectFormulation(projectFormulationDTO);
        ProjectFormulation formulationResponse = (ProjectFormulation)this.formulationRepository.save(projectFormulation);
        return new ProjectFormulationDTO(formulationResponse, false);
    }

    public ProjectFormulationDTO getProjectFormulation(long formulationId, boolean loadFlag) {
        Optional projectFormulation = this.formulationRepository.findById(formulationId);
        if (projectFormulation.isPresent()) {
            ProjectFormulationDTO response = new ProjectFormulationDTO((ProjectFormulation)projectFormulation.get(), loadFlag);
            if (CollectionUtils.isNotEmpty((Collection)response.getInitiativesList())) {
                response.getInitiativesList().forEach(initiative -> this.populateImpactDesc(initiative));
            }
            return response;
        }
        return new ProjectFormulationDTO();
    }

    public FormulationInitiativesDTO saveFormulationInitiatives(FormulationInitiativesDTO formulationInitiativesDTO) {
        FormulationInitiatives formulationInitiatives = new FormulationInitiatives(formulationInitiativesDTO, false);
        return new FormulationInitiativesDTO((FormulationInitiatives)this.initiativesRepository.save(formulationInitiatives));
    }

    public FormulationSubInitiativesDTO saveFormulationSubInitiatives(FormulationSubInitiativesDTO subInitiativesDTO) {
        FormulationSubInitiatives formulationInitiatives = new FormulationSubInitiatives(subInitiativesDTO);
        return new FormulationSubInitiativesDTO((FormulationSubInitiatives)this.subInitiativesRepository.save(formulationInitiatives));
    }

    public FormulationSubInitiativesDTO getFormulationSubInitiatives(long subInitiativesId) {
        Optional result = this.subInitiativesRepository.findById(subInitiativesId);
        if (result.isPresent()) {
            return new FormulationSubInitiativesDTO((FormulationSubInitiatives)result.get());
        }
        return new FormulationSubInitiativesDTO();
    }

    public Boolean updateFormulationStatus(ProjectFormulationDTO formulationDTO) {
        Optional result = this.formulationRepository.findById(formulationDTO.getId());
        if (result.isPresent()) {
            ProjectFormulation projectFormulation = (ProjectFormulation)result.get();
            projectFormulation.setApprovedBy(Long.valueOf(UserThreadLocal.get()).longValue());
            projectFormulation.setStatus(formulationDTO.getStatus());
            projectFormulation.setUpdatedTime(LocalDateTime.now());
            this.formulationRepository.save(projectFormulation);
            this.auditService.updateAudit("Project Formulation", projectFormulation.getId(), Long.valueOf(UserThreadLocal.get()).longValue(), "Project Formulation Modified");
            return this.assignFormulationUser(formulationDTO);
        }
        return false;
    }

    public boolean assignFormulationUser(ProjectFormulationDTO formulationDTO) {
        ProjectFormulation projectFormulation = new ProjectFormulation();
        projectFormulation.setId(formulationDTO.getId());
        this.projectFormulationMappingRepository.deleteByIdProjectFormulationId(projectFormulation);
        for (String empId : formulationDTO.getEmployeeIDs()) {
            ProjectFormulationUserMapping projectFormulationUserMapping = new ProjectFormulationUserMapping(projectFormulation, empId);
            this.projectFormulationMappingRepository.save(projectFormulationUserMapping);
        }
        return true;
    }

    public FormulationInitiativesDTO getFormulationInitiatives(long initiativeId) {
        Optional result = this.initiativesRepository.findById(initiativeId);
        if (result.isPresent()) {
            return new FormulationInitiativesDTO((FormulationInitiatives)result.get());
        }
        return new FormulationInitiativesDTO();
    }

    public boolean deleteFormulationSubInitiatives(long subInitiativesId) {
        Optional result = this.subInitiativesRepository.findById(subInitiativesId);
        if (result.isPresent()) {
            FormulationSubInitiatives formulationSubInitiatives = (FormulationSubInitiatives)result.get();
            formulationSubInitiatives.getSubInitiativesUserList();
            if (formulationSubInitiatives.getType().equalsIgnoreCase("Milestone")) {
                this.auditService.updateAudit("Project Formulation", formulationSubInitiatives.getId(), Long.valueOf(UserThreadLocal.get()).longValue(), "Formulation Milestone Deleted");
            }
            if (formulationSubInitiatives.getType().equalsIgnoreCase("Sub Initiative")) {
                this.auditService.updateAudit("Project Formulation", formulationSubInitiatives.getId(), Long.valueOf(UserThreadLocal.get()).longValue(), "Formulation Sub Initiative Deleted");
            }
            if (formulationSubInitiatives.getType().equalsIgnoreCase("Activity")) {
                this.auditService.updateAudit("Project Formulation", formulationSubInitiatives.getId(), Long.valueOf(UserThreadLocal.get()).longValue(), "Formulation Activities Deleted");
            }
            this.subInitiativesRepository.delete(formulationSubInitiatives);
            return true;
        }
        return false;
    }

    public boolean deleteFormulationInitiatives(long initiativeId) {
        Optional result = this.initiativesRepository.findById(initiativeId);
        if (result.isPresent()) {
            FormulationInitiatives formulationInitiatives = (FormulationInitiatives)result.get();
            formulationInitiatives.getSubInitiativeList();
            this.initiativesRepository.delete(formulationInitiatives);
            return true;
        }
        return false;
    }

    public boolean deleteFormulation(long formulationId) {
        Optional projectFormulation = this.formulationRepository.findById(formulationId);
        if (projectFormulation.isPresent()) {
            ProjectFormulation formulation = (ProjectFormulation)projectFormulation.get();
            formulation.getInitiativesList().forEach(initiative -> {
                List<FormulationSubInitiatives> formulationSubInitiatives = initiative.getSubInitiativeList();
                formulationSubInitiatives.forEach(subInitiative -> subInitiative.getSubInitiativesUserList());
            });
            this.formulationRepository.delete(formulation);
            return true;
        }
        return false;
    }

    public List<FormulationInitiativesDTO> getInitiaitivesList(long formulationId, String department) {
        boolean deptFlag;
        boolean bl = deptFlag = StringUtils.isNotEmpty((CharSequence)department) && !"ALL".equalsIgnoreCase(department);
        if (deptFlag) {
            return this.getInitiaitivesListByDept(formulationId, department);
        }
        Optional projectFormulation = this.formulationRepository.findById(formulationId);
        if (projectFormulation.isPresent()) {
            ProjectFormulation formulation = (ProjectFormulation)projectFormulation.get();
            return formulation.getInitiativesList().stream().map(initiative -> {
                FormulationInitiativesDTO formulationDTO = new FormulationInitiativesDTO(initiative);
                this.populateImpactDesc(formulationDTO);
                return formulationDTO;
            }).collect(Collectors.toList());
        }
        return Collections.emptyList();
    }

    public List<FormulationInitiativesDTO> getInitiaitivesListByDept(long formulationId, String department) {
        List<FormulationInitiatives> initiatives = this.initiativesRepository.findByDept(department, Long.valueOf(formulationId));
        if (CollectionUtils.isNotEmpty((Collection)initiatives)) {
            return initiatives.stream().map(initiative -> {
                FormulationInitiativesDTO formulationDTO = new FormulationInitiativesDTO(initiative);
                this.populateImpactDesc(formulationDTO);
                return formulationDTO;
            }).collect(Collectors.toList());
        }
        return Collections.emptyList();
    }

    public void populateImpactDesc(FormulationInitiativesDTO initiativesDTO) {
        Optional kpidto;
        if (Objects.nonNull(initiativesDTO.getImpactId()) && (kpidto = this.kpiService.findById(initiativesDTO.getImpactId().longValue())).isPresent()) {
            initiativesDTO.getInitiativeValue().put("impactDesc", new KPIDTO((KPI)kpidto.get()).getKpiValue().get("name").toString());
        }
    }

    public List<FormulationInitiativesDTO> getFormulationAndOwnerList(long formulationId) {
        List<FormulationInitiatives> initiatives = this.initiativesRepository.findByOwnerFormulation(Long.valueOf(UserThreadLocal.get()), Long.valueOf(formulationId));
        if (CollectionUtils.isNotEmpty((Collection)initiatives)) {
            return initiatives.stream().map(initiative -> {
                FormulationInitiativesDTO formulationDTO = new FormulationInitiativesDTO(initiative);
                this.populateImpactDesc(formulationDTO);
                return formulationDTO;
            }).collect(Collectors.toList());
        }
        return Collections.emptyList();
    }
}

