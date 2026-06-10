/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.FormulationRiskActivities
 *  com.estrat.backend.db.bean.po.FormulationRiskDetails
 *  com.estrat.backend.db.bean.po.FormulationSubRiskDetails
 *  com.estrat.backend.db.bean.po.KPI
 *  com.estrat.backend.db.bean.po.RiskFormulation
 *  com.estrat.backend.db.bean.po.RiskFormulationUserMapping
 *  com.estrat.backend.db.dto.FormulationRiskActivitiesDTO
 *  com.estrat.backend.db.dto.FormulationRiskDTO
 *  com.estrat.backend.db.dto.FormulationSubRiskDTO
 *  com.estrat.backend.db.dto.KPIDTO
 *  com.estrat.backend.db.dto.RiskFormulationDTO
 *  com.estrat.backend.db.repository.FormulationRiskActivityRepository
 *  com.estrat.backend.db.repository.FormulationRiskRepository
 *  com.estrat.backend.db.repository.FormulationSubRiskRepository
 *  com.estrat.backend.db.repository.RiskFormulationMappingRepository
 *  com.estrat.backend.db.repository.RiskFormulationRepository
 *  com.estrat.backend.db.resource.util.UserThreadLocal
 *  com.estrat.backend.db.service.AuditDetailsService
 *  com.estrat.backend.db.service.KPIService
 *  com.estrat.backend.db.service.RiskFormulationService
 *  javax.transaction.Transactional
 *  org.apache.commons.collections4.CollectionUtils
 *  org.apache.commons.lang3.StringUtils
 *  org.hibernate.HibernateException
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.backend.db.service;

import com.estrat.backend.db.bean.po.FormulationRiskActivities;
import com.estrat.backend.db.bean.po.FormulationRiskDetails;
import com.estrat.backend.db.bean.po.FormulationSubRiskDetails;
import com.estrat.backend.db.bean.po.KPI;
import com.estrat.backend.db.bean.po.RiskFormulation;
import com.estrat.backend.db.bean.po.RiskFormulationUserMapping;
import com.estrat.backend.db.dto.FormulationRiskActivitiesDTO;
import com.estrat.backend.db.dto.FormulationRiskDTO;
import com.estrat.backend.db.dto.FormulationSubRiskDTO;
import com.estrat.backend.db.dto.KPIDTO;
import com.estrat.backend.db.dto.RiskFormulationDTO;
import com.estrat.backend.db.repository.FormulationRiskActivityRepository;
import com.estrat.backend.db.repository.FormulationRiskRepository;
import com.estrat.backend.db.repository.FormulationSubRiskRepository;
import com.estrat.backend.db.repository.RiskFormulationMappingRepository;
import com.estrat.backend.db.repository.RiskFormulationRepository;
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
public class RiskFormulationService {
    @Autowired
    private RiskFormulationRepository riskFormulationRepository;
    @Autowired
    private FormulationRiskRepository formulationRiskRepository;
    @Autowired
    private FormulationSubRiskRepository formulationSubRiskRepository;
    @Autowired
    private FormulationRiskActivityRepository riskActivityRepository;
    @Autowired
    private KPIService kpiService;
    @Autowired
    private AuditDetailsService auditService;
    @Autowired
    private RiskFormulationMappingRepository riskFormulationMappingRepository;

    public RiskFormulationDTO saveRiskFormulation(RiskFormulationDTO riskFormulationDTO) {
        RiskFormulation riskFormulation = new RiskFormulation(riskFormulationDTO);
        RiskFormulation formulationResponse = (RiskFormulation)this.riskFormulationRepository.save(riskFormulation);
        return new RiskFormulationDTO(formulationResponse, false);
    }

    public RiskFormulationDTO getRiskFormulation(long formulationId, boolean loadFlag) {
        Optional riskFormulation = this.riskFormulationRepository.findById(formulationId);
        if (riskFormulation.isPresent()) {
            RiskFormulationDTO response = new RiskFormulationDTO((RiskFormulation)riskFormulation.get(), loadFlag);
            if (CollectionUtils.isNotEmpty((Collection)response.getRiskList())) {
                response.getRiskList().forEach(risk -> this.populateImpactDesc(risk));
            }
            return response;
        }
        return new RiskFormulationDTO();
    }

    public FormulationRiskDTO saveFormulationRisk(FormulationRiskDTO formulationRiskDTO) {
        FormulationRiskDetails formulationRiskDetails = new FormulationRiskDetails(formulationRiskDTO);
        return new FormulationRiskDTO((FormulationRiskDetails)this.formulationRiskRepository.save(formulationRiskDetails), false);
    }

    public FormulationSubRiskDTO saveFormulationSubRisk(FormulationSubRiskDTO formulationSubRiskDTO) {
        FormulationSubRiskDetails formulationSubRiskDetails = new FormulationSubRiskDetails(formulationSubRiskDTO);
        return new FormulationSubRiskDTO((FormulationSubRiskDetails)this.formulationSubRiskRepository.save(formulationSubRiskDetails), false);
    }

    public FormulationRiskActivitiesDTO saveFormulationRiskActivities(FormulationRiskActivitiesDTO formulationRiskDTO) {
        FormulationRiskActivities formulationRiskDetails = new FormulationRiskActivities(formulationRiskDTO);
        return new FormulationRiskActivitiesDTO((FormulationRiskActivities)this.riskActivityRepository.save(formulationRiskDetails));
    }

    public FormulationSubRiskDTO getFormulationSubRisk(long subRiskId) {
        Optional result = this.formulationSubRiskRepository.findById(subRiskId);
        if (result.isPresent()) {
            return new FormulationSubRiskDTO((FormulationSubRiskDetails)result.get(), false);
        }
        return new FormulationSubRiskDTO();
    }

    public FormulationRiskActivitiesDTO getFormulationRiskActivities(long activityId) {
        Optional result = this.riskActivityRepository.findById(activityId);
        if (result.isPresent()) {
            return new FormulationRiskActivitiesDTO((FormulationRiskActivities)result.get());
        }
        return new FormulationRiskActivitiesDTO();
    }

    public Boolean updateFormulationStatus(RiskFormulationDTO formulationDTO) {
        Optional result = this.riskFormulationRepository.findById(formulationDTO.getId());
        if (result.isPresent()) {
            RiskFormulation riskFormulation = (RiskFormulation)result.get();
            riskFormulation.setApprovedBy(Long.valueOf(UserThreadLocal.get()).longValue());
            riskFormulation.setStatus(formulationDTO.getStatus());
            riskFormulation.setUpdatedTime(LocalDateTime.now());
            this.riskFormulationRepository.save(riskFormulation);
            return this.assignFormulationUser(formulationDTO);
        }
        return false;
    }

    public boolean assignFormulationUser(RiskFormulationDTO formulationDTO) {
        RiskFormulation riskFormulation = new RiskFormulation();
        riskFormulation.setId(formulationDTO.getId());
        this.riskFormulationMappingRepository.deleteByIdRiskFormulationId(riskFormulation);
        for (String empId : formulationDTO.getEmployeeIDs()) {
            RiskFormulationUserMapping riskFormulationUserMapping = new RiskFormulationUserMapping(riskFormulation, empId);
            this.riskFormulationMappingRepository.save(riskFormulationUserMapping);
        }
        return true;
    }

    public FormulationRiskDTO getFormulationRisk(long riskId) {
        Optional result = this.formulationRiskRepository.findById(riskId);
        if (result.isPresent()) {
            return new FormulationRiskDTO((FormulationRiskDetails)result.get(), false);
        }
        return new FormulationRiskDTO();
    }

    public boolean deleteFormulationRiskActivity(long activityId) {
        Optional result = this.riskActivityRepository.findById(activityId);
        if (result.isPresent()) {
            FormulationRiskActivities formulationRiskActivities = (FormulationRiskActivities)result.get();
            if (formulationRiskActivities.getActivityValue().contains("Consequence")) {
                this.auditService.saveAudit("Risk Formulation", formulationRiskActivities.getCreatedBy(), Long.valueOf(UserThreadLocal.get()).longValue(), "Formulation Consequence Deleted");
            } else {
                this.auditService.saveAudit("Risk Formulation", formulationRiskActivities.getCreatedBy(), Long.valueOf(UserThreadLocal.get()).longValue(), "Formulation Action Deleted");
            }
            this.riskActivityRepository.delete(formulationRiskActivities);
            return true;
        }
        return false;
    }

    public boolean deleteFormulationSubRisk(long subRiskId) {
        Optional result = this.formulationSubRiskRepository.findById(subRiskId);
        if (result.isPresent()) {
            FormulationSubRiskDetails formulationSubRiskDetails = (FormulationSubRiskDetails)result.get();
            formulationSubRiskDetails.getSubRiskUserList();
            if (formulationSubRiskDetails.getSubRiskValue().contains("Cause")) {
                this.auditService.saveAudit("Risk Formulation", formulationSubRiskDetails.getCreatedBy(), Long.valueOf(UserThreadLocal.get()).longValue(), "Formulation Cause Deleted");
            } else {
                this.auditService.saveAudit("Risk Formulation", formulationSubRiskDetails.getCreatedBy(), Long.valueOf(UserThreadLocal.get()).longValue(), "Formulation Plan Deleted");
            }
            this.formulationSubRiskRepository.delete(formulationSubRiskDetails);
            return true;
        }
        return false;
    }

    public boolean deleteFormulationRisk(long riskId) {
        Optional result = this.formulationRiskRepository.findById(riskId);
        if (result.isPresent()) {
            FormulationRiskDetails formulationRiskDetails = (FormulationRiskDetails)result.get();
            formulationRiskDetails.getSubRiskList();
            this.auditService.saveAudit("Risk Formulation", formulationRiskDetails.getId(), Long.valueOf(UserThreadLocal.get()).longValue(), "Risk Formulation Deleted");
            this.formulationRiskRepository.delete(formulationRiskDetails);
            return true;
        }
        return false;
    }

    public boolean deleteFormulation(long formulationId) {
        Optional riskFormulation = this.riskFormulationRepository.findById(formulationId);
        if (riskFormulation.isPresent()) {
            RiskFormulation formulation = (RiskFormulation)riskFormulation.get();
            formulation.getRiskList().forEach(risk -> {
                List<FormulationSubRiskDetails> formulationSubRiskList = risk.getSubRiskList();
                formulationSubRiskList.forEach(subRisk -> subRisk.getSubRiskUserList());
            });
            this.riskFormulationRepository.delete(formulation);
            return true;
        }
        return false;
    }

    public List<FormulationRiskDTO> getRiskList(long formulationId, String department) {
        boolean deptFlag;
        boolean bl = deptFlag = StringUtils.isNotEmpty((CharSequence)department) && !"ALL".equalsIgnoreCase(department);
        if (deptFlag) {
            return this.getRiskListByDept(formulationId, department);
        }
        Optional riskFormulation = this.riskFormulationRepository.findById(formulationId);
        if (riskFormulation.isPresent()) {
            RiskFormulation formulation = (RiskFormulation)riskFormulation.get();
            return formulation.getRiskList().stream().map(risk -> {
                FormulationRiskDTO formulationDTO = new FormulationRiskDTO(risk, false);
                this.populateImpactDesc(formulationDTO);
                return formulationDTO;
            }).collect(Collectors.toList());
        }
        return Collections.emptyList();
    }

    public List<FormulationRiskDTO> getRiskListByDept(long formulationId, String department) {
        List<FormulationRiskDetails> riskList = this.formulationRiskRepository.findByDept(department, Long.valueOf(formulationId));
        if (CollectionUtils.isNotEmpty((Collection)riskList)) {
            return riskList.stream().map(risk -> {
                FormulationRiskDTO formulationDTO = new FormulationRiskDTO(risk, false);
                this.populateImpactDesc(formulationDTO);
                return formulationDTO;
            }).collect(Collectors.toList());
        }
        return Collections.emptyList();
    }

    public void populateImpactDesc(FormulationRiskDTO riskDTO) {
        Optional kpidto;
        if (Objects.nonNull(riskDTO.getImpactId()) && (kpidto = this.kpiService.findById(riskDTO.getImpactId().longValue())).isPresent()) {
            riskDTO.getRiskValue().put("impactDesc", new KPIDTO((KPI)kpidto.get()).getKpiValue().get("name").toString());
        }
    }
}

