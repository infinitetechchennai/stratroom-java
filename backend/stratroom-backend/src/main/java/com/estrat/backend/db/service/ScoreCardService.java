/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.Objectives
 *  com.estrat.backend.db.bean.po.ScoreCard
 *  com.estrat.backend.db.bean.po.ScoreCardDetails
 *  com.estrat.backend.db.dao.KPIDAO
 *  com.estrat.backend.db.dao.KPIRepository
 *  com.estrat.backend.db.dao.ObjectivesDAO
 *  com.estrat.backend.db.dao.ObjectivesRepository
 *  com.estrat.backend.db.dao.ScoreCardDAO
 *  com.estrat.backend.db.dao.ScoreCardDetailsRepository
 *  com.estrat.backend.db.dao.ScoreCardRepository
 *  com.estrat.backend.db.dto.ScoreCardDTO
 *  com.estrat.backend.db.dto.ScoreCardDetailsDTO
 *  com.estrat.backend.db.dto.ScoreCardResponseDTO
 *  com.estrat.backend.db.resource.util.UserThreadLocal
 *  com.estrat.backend.db.service.AuditDetailsService
 *  com.estrat.backend.db.service.ScoreCardService
 *  javax.transaction.Transactional
 *  org.apache.commons.lang3.StringUtils
 *  org.hibernate.HibernateException
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.backend.db.service;

import com.estrat.backend.db.bean.po.Objectives;
import com.estrat.backend.db.bean.po.ScoreCard;
import com.estrat.backend.db.bean.po.ScoreCardDetails;
import com.estrat.backend.db.dao.KPIDAO;
import com.estrat.backend.db.dao.KPIRepository;
import com.estrat.backend.db.dao.ObjectivesDAO;
import com.estrat.backend.db.dao.ObjectivesRepository;
import com.estrat.backend.db.dao.ScoreCardDAO;
import com.estrat.backend.db.dao.ScoreCardDetailsRepository;
import com.estrat.backend.db.dao.ScoreCardRepository;
import com.estrat.backend.db.dto.ScoreCardDTO;
import com.estrat.backend.db.dto.ScoreCardDetailsDTO;
import com.estrat.backend.db.dto.ScoreCardResponseDTO;
import com.estrat.backend.db.resource.util.UserThreadLocal;
import com.estrat.backend.db.service.AuditDetailsService;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;
import jakarta.transaction.Transactional;
import org.apache.commons.lang3.StringUtils;
import org.hibernate.HibernateException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional(rollbackOn={HibernateException.class})
public class ScoreCardService {
    @Autowired
    private ScoreCardRepository scoreCardRepository;
    @Autowired
    private ScoreCardDetailsRepository scoreCardDetailsRepository;
    @Autowired
    private ObjectivesDAO objectivesDAO;
    @Autowired
    private ScoreCardDAO scoreCardDAO;
    @Autowired
    private KPIDAO kpidao;
    @Autowired
    private ObjectivesRepository objectivesRepository;
    @Autowired
    private KPIRepository kpiRepository;
    @Autowired
    private AuditDetailsService auditService;

    public Optional<ScoreCard> findById(long id) {
        return this.scoreCardRepository.findByIdAndActive(Long.valueOf(id), 0);
    }

    public ScoreCardResponseDTO save(ScoreCardDTO scoreCard) {
        Boolean updateStatus = false;
        if (scoreCard.getId() != 0L) {
            updateStatus = true;
        }
        scoreCard.setCreatedTime(LocalDateTime.now());
        ScoreCardResponseDTO cardResponseDTO = new ScoreCardResponseDTO();
        cardResponseDTO.setFlag(true);
        this.createPerspectiveId(scoreCard);
        ScoreCard card = new ScoreCard(scoreCard);
        ScoreCardDTO scoreCardDTO = new ScoreCardDTO((ScoreCard)this.scoreCardRepository.save(card), true);
        if (updateStatus.booleanValue()) {
            this.auditService.updateAudit("Scorecard", scoreCardDTO.getId(), scoreCardDTO.getUpdatedBy(), "Perspective Modified");
        } else {
            this.auditService.saveAudit("Scorecard", scoreCardDTO.getId(), scoreCardDTO.getCreatedBy(), "Perspective Created");
        }
        cardResponseDTO.setCardDTO(scoreCardDTO);
        return cardResponseDTO;
    }

    public List<ScoreCardDTO> scoreCardList(long empId, boolean loadFlag) {
        List<ScoreCard> dbList = this.scoreCardRepository.findAllByEmpId(Long.valueOf(empId), 0);
        return dbList.stream().map(dbValue -> new ScoreCardDTO(dbValue, loadFlag)).collect(Collectors.toList());
    }

    public List<ScoreCardDetailsDTO> scoreCardListbyIds(List<String> id) {
        List<ScoreCardDetails> dbList = this.scoreCardDetailsRepository.findByIds(id, 0);
        return dbList.stream().map(dbValue -> new ScoreCardDetailsDTO(dbValue)).collect(Collectors.toList());
    }

    public ScoreCardDetailsDTO scoreCardDetails(Long pageId) {
        ScoreCardDetails dbList = this.scoreCardDetailsRepository.findAllByPageId(pageId.longValue());
        return new ScoreCardDetailsDTO(dbList);
    }

    public List<ScoreCardDTO> scoreCardList(long empId, long pageId, boolean loadFlag) {
        List<ScoreCard> dbList = this.scoreCardRepository.findAllByPageAndEmpId(Long.valueOf(empId), 0, pageId);
        return dbList.stream().map(dbValue -> new ScoreCardDTO(dbValue, loadFlag)).collect(Collectors.toList());
    }

    public List<ScoreCardDTO> getAllScoreCardList() {
        List<ScoreCard> dbList = this.scoreCardRepository.findAllByActive(0);
        return dbList.stream().map(dbValue -> new ScoreCardDTO(dbValue, true)).collect(Collectors.toList());
    }

    public List<ScoreCard> scoreCardListByPage(long pageId) {
        return this.scoreCardRepository.findAllByPageId(pageId);
    }

    public boolean deleteByScoreCardId(long scoreCardId) {
        Optional scoreCardOptional = this.findById(scoreCardId);
        if (scoreCardOptional.isPresent()) {
            ScoreCard scoreCard = (ScoreCard)scoreCardOptional.get();
            scoreCard.getObjectiveList().forEach(objecttive -> objecttive.getKpiList());
            scoreCard.setActive(1);
            this.objectivesDAO.deleteScorecardById(scoreCardId);
            this.scoreCardRepository.save(scoreCard);
            this.auditService.deleteAudit("Scorecard", scoreCardId, Long.valueOf(UserThreadLocal.get()).longValue(), "Perspective Deleted");
            return true;
        }
        return false;
    }

    public boolean deleteByScoreCardObj(ScoreCard scoreCard) {
        if (scoreCard != null) {
            List<Objectives> objectives = this.objectivesRepository.getObjectiveList(Long.valueOf(scoreCard.getId()));
            for (Objectives objId : objectives) {
                this.objectivesDAO.deleteObjectiveById(objId.getId());
                this.objectivesRepository.delete(objId);
            }
            this.scoreCardRepository.delete(scoreCard);
            return true;
        }
        return false;
    }

    private void createPerspectiveId(ScoreCardDTO scoreCardDTO) {
        String perspectiveIdValue;
        String string = perspectiveIdValue = Objects.nonNull(scoreCardDTO.getPerspectiveId()) ? scoreCardDTO.getPerspectiveId() : "";
        if (StringUtils.isEmpty((CharSequence)perspectiveIdValue)) {
            String maxId = this.objectivesDAO.getMaxId(Long.valueOf(scoreCardDTO.getCreatedBy()));
            scoreCardDTO.setPerspectiveId(String.join((CharSequence)"", "", maxId));
            scoreCardDTO.setPerspectiveIdSeq(Long.valueOf(maxId));
        } else {
            scoreCardDTO.setPerspectiveId(perspectiveIdValue);
        }
    }

    public List<ScoreCardDTO> scoreCardListByDate(long detailsId, boolean loadFlag, String dateRange) {
        Date firstDate = null;
        Date secondDate = null;
        String[] dataRanges = null;
        if (Objects.nonNull(dateRange)) {
            String[] stringArray = dataRanges = dateRange.contains("-") ? dateRange.split("-") : dateRange.split(",");
        }
        if (dataRanges != null && dataRanges.length > 1) {
            String startDate = dataRanges[0].trim();
            String endDate = dataRanges[1].trim();
            SimpleDateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy");
            try {
                firstDate = dateFormat.parse(startDate);
                secondDate = dateFormat.parse(endDate);
            }
            catch (ParseException e) {
                throw new RuntimeException(e);
            }
        }
        List<ScoreCard> dbList = this.scoreCardRepository.findAllByDetailsIdANDDate(Long.valueOf(detailsId), 0, firstDate, secondDate);
        return dbList.stream().map(dbValue -> new ScoreCardDTO(dbValue, loadFlag)).collect(Collectors.toList());
    }

    public List<ScoreCardDTO> scoreCardList(long empId, boolean loadFlag, String dateRange) {
        Date firstDate = null;
        Date secondDate = null;
        String[] dataRanges = null;
        if (Objects.nonNull(dateRange)) {
            String[] stringArray = dataRanges = dateRange.contains("-") ? dateRange.split("-") : dateRange.split(",");
        }
        if (dataRanges != null && dataRanges.length > 1) {
            String startDate = dataRanges[0].trim();
            String endDate = dataRanges[1].trim();
            SimpleDateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy");
            try {
                firstDate = dateFormat.parse(startDate);
                secondDate = dateFormat.parse(endDate);
            }
            catch (ParseException e) {
                throw new RuntimeException(e);
            }
        }
        List<ScoreCard> dbList = this.scoreCardRepository.findAllByEmpIdByDate(Long.valueOf(empId), 0, firstDate, secondDate);
        return dbList.stream().map(dbValue -> new ScoreCardDTO(dbValue, loadFlag)).collect(Collectors.toList());
    }

    public void saveScoreCardDetails() {
        List<ScoreCard> dbList = this.scoreCardRepository.findAll();
        for (ScoreCard scoreCard : dbList) {
            ScoreCardDTO scoreCardDTO = new ScoreCardDTO(scoreCard, false);
            ScoreCardDetails scoreCardDetails = this.scoreCardDetailsRepository.findByName(Long.valueOf(scoreCardDTO.getCreatedBy()), scoreCardDTO.getScorecardName(), scoreCardDTO.getPageId(), 0);
            if (scoreCardDetails != null) {
                scoreCard.setScoreCardDetailsId(scoreCardDetails);
                this.scoreCardRepository.save(scoreCard);
                continue;
            }
            Map stringObjectMap = scoreCardDTO.getScoreCardValue();
            ScoreCardDetailsDTO scoreCardDetailsDTO = new ScoreCardDetailsDTO();
            scoreCardDetailsDTO.setActive(0);
            scoreCardDetailsDTO.setCreatedBy(scoreCardDTO.getCreatedBy());
            scoreCardDetailsDTO.setUpdatedBy(scoreCardDTO.getUpdatedBy());
            scoreCardDetailsDTO.setStartDate(scoreCardDTO.getStartDate());
            scoreCardDetailsDTO.setEndDate(scoreCardDTO.getEndDate());
            scoreCardDetailsDTO.setCreatedTime(scoreCardDTO.getCreatedTime());
            scoreCardDetailsDTO.setUpdatedTime(scoreCardDTO.getUpdatedTime());
            scoreCardDetailsDTO.setOwner(scoreCardDTO.getOwner());
            scoreCardDetailsDTO.setPageId(Long.valueOf(scoreCardDTO.getPageId()));
            scoreCardDetailsDTO.setScorecardName(scoreCardDTO.getScorecardName());
            HashMap<String, Object> ObjectMap = new HashMap<String, Object>();
            ObjectMap.put("scoreCardName", scoreCardDTO.getScorecardName());
            ObjectMap.put("score_card_start_end_date", (String)stringObjectMap.get("perspective_start_end_date"));
            ObjectMap.put("createdByName", (String)stringObjectMap.get("createdByName"));
            ObjectMap.put("ownerName", (String)stringObjectMap.get("ownerName"));
            ObjectMap.put("scorecardFormula", (String)stringObjectMap.get("scorecardFormula"));
            ObjectMap.put("defaultscr", (String)stringObjectMap.get("defaultscr"));
            scoreCardDetailsDTO.setScoreCardDetailsValue(ObjectMap);
            ScoreCardDetails scoreCardDetails1 = (ScoreCardDetails)this.scoreCardDetailsRepository.save(new ScoreCardDetails(scoreCardDetailsDTO));
            scoreCard.setScoreCardDetailsId(scoreCardDetails1);
            this.scoreCardRepository.save(scoreCard);
        }
    }

    public void updateCustomReportee(ScoreCardDetailsDTO cardDetailsDTO) {
        Map stringObjectMap = cardDetailsDTO.getScoreCardDetailsValue();
        if (stringObjectMap.containsKey("customReportees") && stringObjectMap.get("customReportees") != "") {
            this.scoreCardDAO.updateCustomRepotee(cardDetailsDTO.getId(), stringObjectMap.get("customReportees").toString());
            List<ScoreCard> scoreCardList = this.scoreCardRepository.findAllByDetails(Long.valueOf(cardDetailsDTO.getId()), 0);
            for (ScoreCard scoreCard : scoreCardList) {
                this.kpidao.updateCustomRepotee(scoreCard.getId(), scoreCard.isIncludeReportee(), stringObjectMap.get("customReportees").toString());
            }
        }
    }
}

