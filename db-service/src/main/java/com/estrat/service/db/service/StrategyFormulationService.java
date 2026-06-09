/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.EmployeeProfilePo
 *  com.estrat.service.db.bean.po.FormulationKPI
 *  com.estrat.service.db.bean.po.FormulationObjectives
 *  com.estrat.service.db.bean.po.FormulationScoreCard
 *  com.estrat.service.db.bean.po.FormulationSubKPI
 *  com.estrat.service.db.bean.po.FormulationUserMapping
 *  com.estrat.service.db.bean.po.ScoreCardDetails
 *  com.estrat.service.db.bean.po.StrategyFormulation
 *  com.estrat.service.db.dao.ScoreCardDetailsRepository
 *  com.estrat.service.db.dto.FormulationKPIDTO
 *  com.estrat.service.db.dto.FormulationObjectiveDTO
 *  com.estrat.service.db.dto.FormulationScoreCardDTO
 *  com.estrat.service.db.dto.FormulationSubKPIDTO
 *  com.estrat.service.db.dto.PageDTO
 *  com.estrat.service.db.dto.ScoreCardDetailsDTO
 *  com.estrat.service.db.dto.ScoreCardResponseDTO
 *  com.estrat.service.db.dto.StrategyFormulationDTO
 *  com.estrat.service.db.repository.FormulationKPIRepository
 *  com.estrat.service.db.repository.FormulationMappingRepository
 *  com.estrat.service.db.repository.FormulationObjectivesRepository
 *  com.estrat.service.db.repository.FormulationScorecardRepository
 *  com.estrat.service.db.repository.FormulationSubKPIRepository
 *  com.estrat.service.db.repository.StrategyFormulationRepository
 *  com.estrat.service.db.resource.util.DateUtil
 *  com.estrat.service.db.resource.util.ScoreCardUtil
 *  com.estrat.service.db.resource.util.UserThreadLocal
 *  com.estrat.service.db.service.StrategyFormulationService
 *  javax.transaction.Transactional
 *  org.apache.commons.collections4.CollectionUtils
 *  org.apache.commons.lang3.StringUtils
 *  org.hibernate.HibernateException
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.service.db.service;

import com.estrat.service.db.bean.po.EmployeeProfilePo;
import com.estrat.service.db.bean.po.FormulationKPI;
import com.estrat.service.db.bean.po.FormulationObjectives;
import com.estrat.service.db.bean.po.FormulationScoreCard;
import com.estrat.service.db.bean.po.FormulationSubKPI;
import com.estrat.service.db.bean.po.FormulationUserMapping;
import com.estrat.service.db.bean.po.ScoreCardDetails;
import com.estrat.service.db.bean.po.StrategyFormulation;
import com.estrat.service.db.dao.ScoreCardDetailsRepository;
import com.estrat.service.db.dto.FormulationKPIDTO;
import com.estrat.service.db.dto.FormulationObjectiveDTO;
import com.estrat.service.db.dto.FormulationScoreCardDTO;
import com.estrat.service.db.dto.FormulationSubKPIDTO;
import com.estrat.service.db.dto.PageDTO;
import com.estrat.service.db.dto.ScoreCardDetailsDTO;
import com.estrat.service.db.dto.ScoreCardResponseDTO;
import com.estrat.service.db.dto.StrategyFormulationDTO;
import com.estrat.service.db.repository.FormulationKPIRepository;
import com.estrat.service.db.repository.FormulationMappingRepository;
import com.estrat.service.db.repository.FormulationObjectivesRepository;
import com.estrat.service.db.repository.FormulationScorecardRepository;
import com.estrat.service.db.repository.FormulationSubKPIRepository;
import com.estrat.service.db.repository.StrategyFormulationRepository;
import com.estrat.service.db.resource.util.DateUtil;
import com.estrat.service.db.resource.util.ScoreCardUtil;
import com.estrat.service.db.resource.util.UserThreadLocal;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.function.Predicate;
import java.util.stream.Collectors;
import jakarta.transaction.Transactional;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.hibernate.HibernateException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional(rollbackOn={HibernateException.class})
public class StrategyFormulationService {
    @Autowired
    private StrategyFormulationRepository formulationRepository;
    @Autowired
    private ScoreCardDetailsRepository scoreCardDetailsRepository;
    @Autowired
    private FormulationObjectivesRepository objectivesRepository;
    @Autowired
    private FormulationScorecardRepository formulationScoreCardRespository;
    @Autowired
    private FormulationKPIRepository kpiRepository;
    @Autowired
    private FormulationMappingRepository formulationUserMapping;
    @Autowired
    private FormulationSubKPIRepository subKPIRepository;
    @Autowired
    private ScoreCardUtil scoreCardUtil;

    public StrategyFormulationDTO saveStrategyFormulation(StrategyFormulationDTO strategyFormulationDTO) {
        long importFormulationId;
        long l = importFormulationId = StringUtils.isNotEmpty((CharSequence)strategyFormulationDTO.getImportFormulationId()) ? Long.valueOf(strategyFormulationDTO.getImportFormulationId()) : 0L;
        if (importFormulationId != 0L) {
            this.updateFormulationObject(strategyFormulationDTO);
        } else if (strategyFormulationDTO.getId() == 0L) {
            strategyFormulationDTO.setScoreCardList(this.scoreCardUtil.getDefaultScoreCardList(strategyFormulationDTO.getFormulationName()));
        }
        StrategyFormulation strategyFormulation = new StrategyFormulation(strategyFormulationDTO, true);
        if (StringUtils.isNotEmpty((CharSequence)strategyFormulationDTO.getFormulationTeam())) {
            Set formulationList = Arrays.asList(strategyFormulationDTO.getFormulationTeam().split(",")).stream().filter(empId -> !"0".equalsIgnoreCase((String)empId)).map(empId -> new FormulationUserMapping(strategyFormulation, empId.toString())).collect(Collectors.toSet());
            strategyFormulation.setFormulationList(formulationList);
        } else {
            strategyFormulation.setFormulationList(Collections.emptySet());
        }
        StrategyFormulation strategyEntityResponse = (StrategyFormulation)this.formulationRepository.save(strategyFormulation);
        return new StrategyFormulationDTO(strategyEntityResponse, true);
    }

    public FormulationObjectiveDTO saveFormulationObjectives(FormulationObjectiveDTO formulationObjectiveDTO) {
        if (formulationObjectiveDTO.getScoreCardId() == 0L) {
            throw new RuntimeException("Parent id cannot be zero while saving individual Objectives formulation");
        }
        FormulationScoreCard formulationScoreCard = new FormulationScoreCard();
        formulationScoreCard.setId(formulationObjectiveDTO.getScoreCardId());
        FormulationObjectives formulationObjectives = new FormulationObjectives(formulationObjectiveDTO, formulationScoreCard);
        FormulationObjectives strategyEntityResponse = (FormulationObjectives)this.objectivesRepository.save(formulationObjectives);
        return new FormulationObjectiveDTO(strategyEntityResponse, true);
    }

    public FormulationScoreCardDTO saveFormulationScorecard(FormulationScoreCardDTO formulationScoreCardDTO) {
        if (formulationScoreCardDTO.getFormulationId() == 0L) {
            throw new RuntimeException("Parent id cannot be zero while saving individual scorecard formulation");
        }
        StrategyFormulation strategyFormulation = new StrategyFormulation();
        strategyFormulation.setId(formulationScoreCardDTO.getFormulationId());
        FormulationScoreCard formulationScoreCard = new FormulationScoreCard(strategyFormulation, formulationScoreCardDTO);
        FormulationScoreCard strategyEntityResponse = (FormulationScoreCard)this.formulationScoreCardRespository.save(formulationScoreCard);
        return new FormulationScoreCardDTO(strategyEntityResponse, false);
    }

    public FormulationKPIDTO saveFormulationKPI(FormulationKPIDTO formulationKPIDTO) {
        if (formulationKPIDTO.getObjectiveId() == 0L) {
            throw new RuntimeException("Parent id cannot be zero while saving individual KPI formulation");
        }
        FormulationObjectives formulationObjectives = new FormulationObjectives();
        formulationObjectives.setId(formulationKPIDTO.getObjectiveId());
        FormulationKPI formulationKPI = new FormulationKPI(formulationKPIDTO, formulationObjectives);
        FormulationKPI strategyEntityResponse = (FormulationKPI)this.kpiRepository.save(formulationKPI);
        return new FormulationKPIDTO(strategyEntityResponse, false);
    }

    public FormulationSubKPIDTO saveFormulationSubKPI(FormulationSubKPIDTO formulationSubKPIDTO) {
        if (formulationSubKPIDTO.getKpiId() == 0L) {
            throw new RuntimeException("Parent id cannot be zero while saving individual SubKPI formulation");
        }
        FormulationKPI formulationkpi = new FormulationKPI();
        formulationkpi.setId(formulationSubKPIDTO.getKpiId());
        FormulationSubKPI formulationsubKPI = new FormulationSubKPI(formulationSubKPIDTO, formulationkpi);
        FormulationSubKPI strategyEntityResponse = (FormulationSubKPI)this.subKPIRepository.save(formulationsubKPI);
        return new FormulationSubKPIDTO(strategyEntityResponse);
    }

    public StrategyFormulationDTO getFormulationDetails(long id) {
        Optional formulation = this.formulationRepository.findById(id);
        if (formulation.isPresent()) {
            return new StrategyFormulationDTO((StrategyFormulation)formulation.get(), true);
        }
        return new StrategyFormulationDTO();
    }

    public boolean deleteFormulationDetails(long id) {
        Optional formulation = this.formulationRepository.findById(id);
        if (formulation.isPresent()) {
            StrategyFormulation strategyFormulation = (StrategyFormulation)formulation.get();
            strategyFormulation.getFormulationList();
            List scoreCardList = strategyFormulation.getScoreCardList();
            if (CollectionUtils.isNotEmpty((Collection)scoreCardList)) {
                scoreCardList.forEach(scorecard -> {
                    if (CollectionUtils.isNotEmpty((Collection)scorecard.getObjectiveList())) {
                        List objList = scorecard.getObjectiveList();
                        objList.forEach(obj -> obj.getKpiList());
                    }
                });
            }
            this.formulationRepository.delete(formulation.get());
            return true;
        }
        return false;
    }

    public boolean deleteFormulationObjectives(long id) {
        Optional formulation = this.objectivesRepository.findById(id);
        if (formulation.isPresent()) {
            ((FormulationObjectives)formulation.get()).getKpiList();
            this.objectivesRepository.delete(formulation.get());
            return true;
        }
        return false;
    }

    public boolean deleteFormulationScorecard(long id) {
        Optional formulation = this.formulationScoreCardRespository.findById(id);
        if (formulation.isPresent()) {
            if (CollectionUtils.isNotEmpty((Collection)((FormulationScoreCard)formulation.get()).getObjectiveList())) {
                ((FormulationScoreCard)formulation.get()).getObjectiveList().stream().forEach(obj -> obj.getKpiList());
            }
            this.formulationScoreCardRespository.delete(formulation.get());
            return true;
        }
        return false;
    }

    public boolean deleteFormulationKPI(long id) {
        Optional formulation = this.kpiRepository.findById(id);
        if (formulation.isPresent()) {
            this.kpiRepository.delete(formulation.get());
            return true;
        }
        return false;
    }

    public boolean deleteFormulationSubKPI(long id) {
        Optional formulation = this.subKPIRepository.findById(id);
        if (formulation.isPresent()) {
            this.subKPIRepository.delete(formulation.get());
            return true;
        }
        return false;
    }

    public FormulationObjectiveDTO getFormulationObjectives(long id) {
        Optional formulation = this.objectivesRepository.findById(id);
        if (formulation.isPresent()) {
            return new FormulationObjectiveDTO((FormulationObjectives)formulation.get(), true);
        }
        return new FormulationObjectiveDTO();
    }

    public FormulationScoreCardDTO getFormulationScoreCard(long id) {
        Optional formulation = this.formulationScoreCardRespository.findById(id);
        if (formulation.isPresent()) {
            return new FormulationScoreCardDTO((FormulationScoreCard)formulation.get(), true);
        }
        return new FormulationScoreCardDTO();
    }

    public FormulationKPIDTO getFormulationKPI(long id) {
        Optional formulation = this.kpiRepository.findById(id);
        if (formulation.isPresent()) {
            return new FormulationKPIDTO((FormulationKPI)formulation.get(), true);
        }
        return new FormulationKPIDTO();
    }

    public FormulationSubKPIDTO getFormulationSubKPI(long id) {
        Optional formulation = this.subKPIRepository.findById(id);
        if (formulation.isPresent()) {
            return new FormulationSubKPIDTO((FormulationSubKPI)formulation.get());
        }
        return new FormulationSubKPIDTO();
    }

    public Set<StrategyFormulationDTO> getFormulationList(String statusValue) {
        EmployeeProfilePo profilePo = new EmployeeProfilePo();
        profilePo.setEmpId(Long.valueOf(UserThreadLocal.get()).longValue());
        List mappingList = this.formulationUserMapping.findAllByIdEmpId(profilePo);
        List formulationList = this.formulationRepository.findByEmpId(Long.valueOf(UserThreadLocal.get()));
        HashSet<StrategyFormulationDTO> finalList = new HashSet<StrategyFormulationDTO>();
        Predicate<StrategyFormulation> statusPredicate = formulation -> StringUtils.isNotEmpty((CharSequence)statusValue) ? statusValue.equalsIgnoreCase(formulation.getStatus()) : true;
        Set mappingDTOList = CollectionUtils.isNotEmpty((Collection)mappingList) ? mappingList.stream().filter(formulation -> statusPredicate.test(formulation.getId().getFormulationId())).map(formulation -> new StrategyFormulationDTO(formulation.getId().getFormulationId(), false)).collect(Collectors.toSet()) : Collections.emptySet();
        Set formulationDTOList = CollectionUtils.isNotEmpty((Collection)formulationList) ? formulationList.stream().filter(formulation -> statusPredicate.test((StrategyFormulation)formulation)).map(formulation -> new StrategyFormulationDTO(formulation, false)).collect(Collectors.toSet()) : Collections.emptySet();
        finalList.addAll(mappingDTOList);
        finalList.addAll(formulationDTOList);
        return finalList;
    }

    public Set<StrategyFormulationDTO> getFormulationListWithPageId(String statusValue, String pageId) {
        List formulationList = this.formulationRepository.findByPageId(Long.valueOf(pageId));
        Predicate<StrategyFormulation> statusPredicate = formulation -> StringUtils.isNotEmpty((CharSequence)statusValue) ? statusValue.equalsIgnoreCase(formulation.getStatus()) : true;
        Set<StrategyFormulationDTO> formulationDTOList = CollectionUtils.isNotEmpty((Collection)formulationList) ? formulationList.stream().filter(formulation -> statusPredicate.test((StrategyFormulation)formulation)).map(formulation -> new StrategyFormulationDTO(formulation, false)).collect(Collectors.toSet()) : Collections.emptySet();
        return formulationDTOList;
    }

    public StrategyFormulationDTO applyFormulation(String formulaionId) {
        StrategyFormulationDTO formulationDetails = this.getFormulationDetails(Long.valueOf(formulaionId).longValue());
        ScoreCardResponseDTO scoreCardResponseDTO = this.scoreCardUtil.createPage(formulationDetails);
        PageDTO pageDTO = scoreCardResponseDTO.getPageDTO();
        List scoreCardList = formulationDetails.getScoreCardList();
        ScoreCardDetailsDTO scoreCardDetailsDTO = new ScoreCardDetailsDTO();
        scoreCardDetailsDTO.setActive(0);
        scoreCardDetailsDTO.setScorecardName(formulationDetails.getFormulationName());
        scoreCardDetailsDTO.setOwner(Long.valueOf(UserThreadLocal.get()).longValue());
        scoreCardDetailsDTO.setPageId(Long.valueOf(pageDTO.getId()));
        scoreCardDetailsDTO.setCreatedBy(Long.valueOf(UserThreadLocal.get()).longValue());
        scoreCardDetailsDTO.setCreatedTime(LocalDateTime.now());
        if (UserThreadLocal.get((String)"LOGGED_IN_DEPT_ID") != null) {
            scoreCardDetailsDTO.setDepartmentId(Long.valueOf(UserThreadLocal.get((String)"LOGGED_IN_DEPT_ID")));
        }
        scoreCardDetailsDTO.setStartDate(DateUtil.getStringTODateDDMMYYYY((String)formulationDetails.getStartDate()));
        scoreCardDetailsDTO.setEndDate(DateUtil.getStringTODateDDMMYYYY((String)formulationDetails.getEndDate()));
        scoreCardDetailsDTO.setUpdatedBy(Long.valueOf(UserThreadLocal.get()).longValue());
        HashMap<String, String> scorecardDetailsValueMap = new HashMap<String, String>();
        scorecardDetailsValueMap.put("scoreCardName", formulationDetails.getFormulationName());
        scorecardDetailsValueMap.put("score_card_start_end_date", formulationDetails.getStartDate() + " - " + formulationDetails.getEndDate());
        scoreCardDetailsDTO.setScoreCardDetailsValue(scorecardDetailsValueMap);
        ScoreCardDetails scoreCardDetails = new ScoreCardDetails(scoreCardDetailsDTO);
        ScoreCardDetails response = (ScoreCardDetails)this.scoreCardDetailsRepository.save(scoreCardDetails);
        scoreCardList.stream().forEach(scorecard -> this.scoreCardUtil.saveScoreCard(scorecard, formulationDetails, pageDTO.getId(), response.getId().longValue()));
        StrategyFormulationDTO formulationDTO = new StrategyFormulationDTO();
        formulationDTO.setPageId(pageDTO.getId());
        return formulationDTO;
    }

    public void updateFormulationObject(StrategyFormulationDTO strategyFormulationDTO) {
        StrategyFormulationDTO formulationDetails = null;
        formulationDetails = strategyFormulationDTO.getId() != 0L ? this.getFormulationDetails(Long.valueOf(strategyFormulationDTO.getId()).longValue()) : new StrategyFormulationDTO();
        List formulationScoreCardList = formulationDetails.getScoreCardList();
        if (CollectionUtils.isNotEmpty((Collection)formulationScoreCardList)) {
            formulationScoreCardList.forEach(scoreCard -> this.deleteFormulationScorecard(scoreCard.getId()));
        }
        StrategyFormulationDTO toFormulationDetails = this.getFormulationDetails(Long.valueOf(strategyFormulationDTO.getImportFormulationId()).longValue());
        strategyFormulationDTO.setEndDate(toFormulationDetails.getEndDate());
        List toScoreCardList = toFormulationDetails.getScoreCardList();
        strategyFormulationDTO.setScoreCardList(toScoreCardList);
        strategyFormulationDTO.setStartDate(toFormulationDetails.getStartDate());
        strategyFormulationDTO.setFormulationDept(toFormulationDetails.getFormulationDept());
        strategyFormulationDTO.setFormulationTeam(toFormulationDetails.getFormulationTeam());
        strategyFormulationDTO.setPlanType(toFormulationDetails.getPlanType());
        if (CollectionUtils.isNotEmpty((Collection)toScoreCardList)) {
            toScoreCardList.forEach(scoreCard -> {
                scoreCard.setId(0L);
                List objList = scoreCard.getObjectiveList();
                if (CollectionUtils.isNotEmpty((Collection)objList)) {
                    objList.forEach(obj -> {
                        obj.setId(0L);
                        List kpiList = obj.getKpiList();
                        if (CollectionUtils.isNotEmpty((Collection)kpiList)) {
                            kpiList.forEach(kpi -> {
                                kpi.setId(0L);
                                List subkpiList = kpi.getSubKpiList();
                                if (CollectionUtils.isNotEmpty((Collection)kpiList)) {
                                    kpiList.forEach(subkpi -> subkpi.setId(0L));
                                }
                            });
                        }
                    });
                }
            });
        }
    }

    public FormulationScoreCardDTO savePersepctiveFormulationScorecard(FormulationScoreCardDTO formulationScoreCardDTO) {
        HashMap<String, Object> stringObjectMap = new HashMap<String, Object>();
        stringObjectMap.put("defaultscr", true);
        stringObjectMap.put("header1", "ID");
        stringObjectMap.put("header2", "Period");
        stringObjectMap.put("header3", "Actual");
        stringObjectMap.put("header4", "Target");
        stringObjectMap.put("header5", "Trend");
        FormulationScoreCardDTO strategyEntityResponse = this.saveFormulationScorecard(formulationScoreCardDTO);
        return strategyEntityResponse;
    }
}

