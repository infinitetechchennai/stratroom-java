/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.Objectives
 *  com.estrat.service.db.bean.po.ScoreCard
 *  com.estrat.service.db.dao.ObjectivesDAO
 *  com.estrat.service.db.dao.ObjectivesRepository
 *  com.estrat.service.db.dto.ObjectivesDTO
 *  com.estrat.service.db.dto.ScoreCardDTO
 *  com.estrat.service.db.dto.ScoreCardResponseDTO
 *  com.estrat.service.db.service.ObjectivesService
 *  com.estrat.service.db.service.ScoreCardService
 *  javax.transaction.Transactional
 *  org.apache.commons.lang3.StringUtils
 *  org.hibernate.HibernateException
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.service.db.service;

import com.estrat.service.db.bean.po.Objectives;
import com.estrat.service.db.bean.po.ScoreCard;
import com.estrat.service.db.dao.ObjectivesDAO;
import com.estrat.service.db.dao.ObjectivesRepository;
import com.estrat.service.db.dto.ObjectivesDTO;
import com.estrat.service.db.dto.ScoreCardDTO;
import com.estrat.service.db.dto.ScoreCardResponseDTO;
import com.estrat.service.db.service.ScoreCardService;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
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
public class ObjectivesService {
    @Autowired
    private ObjectivesRepository objectivesRepository;
    @Autowired
    private ScoreCardService scoreCardService;
    @Autowired
    private ObjectivesDAO objectivesDAO;

    public Optional<Objectives> findById(long objId) {
        return this.objectivesRepository.findByIdAndActive(Long.valueOf(objId), 0);
    }

    public ObjectivesDTO save(Objectives objectives) {
        if (StringUtils.isEmpty((CharSequence)objectives.getObjectiveId())) {
            this.createObjectiveId(objectives);
        }
        return new ObjectivesDTO((Objectives)this.objectivesRepository.save(objectives), true);
    }

    public ScoreCardResponseDTO softDeleteObjectivesById(long objId) {
        ScoreCardResponseDTO cardResponseDTO = new ScoreCardResponseDTO();
        Optional optional = this.findById(objId);
        if (optional.isPresent()) {
            Objectives objectives = (Objectives)optional.get();
            objectives.getKpiList();
            this.objectivesDAO.deleteObjectiveById(objId);
            this.objectivesRepository.delete((Object)objectives);
            cardResponseDTO.setFlag(true);
            return cardResponseDTO;
        }
        cardResponseDTO.setFlag(false);
        return cardResponseDTO;
    }

    public List<ObjectivesDTO> objectivesList(long scoreCardId, boolean loadFlag) {
        List dbList = this.objectivesRepository.getObjectiveList(Long.valueOf(scoreCardId), 0);
        return dbList.stream().map(dbValue -> new ObjectivesDTO(dbValue, loadFlag)).collect(Collectors.toList());
    }

    private void createObjectiveId(Objectives objectivesDTO) {
        if (objectivesDTO.getId() == 0L) {
            String defaultStart = "1";
            ScoreCard scoreCard = (ScoreCard)this.scoreCardService.findById(objectivesDTO.getScoreCardId().getId()).get();
            ScoreCardDTO scoreCardDTO = new ScoreCardDTO(scoreCard, false);
            String scoreCardName = scoreCardDTO.getScoreCardValue().get("name").toString();
            String scorePrefix = scoreCardName.substring(0, 1);
            String objectiveId = String.join((CharSequence)"", scorePrefix, defaultStart);
            if (this.objectivesDAO.checkIdExist(Long.valueOf(objectivesDTO.getCreatedBy()), objectiveId)) {
                String maxId = this.objectivesDAO.getMaxId(Long.valueOf(objectivesDTO.getCreatedBy()), scorePrefix);
                objectivesDTO.setObjectiveId(String.join((CharSequence)"", scorePrefix, maxId));
                objectivesDTO.setObjectiveIdSeq(Long.valueOf(maxId));
            } else {
                objectivesDTO.setObjectiveId(objectiveId);
                objectivesDTO.setObjectiveIdSeq(Long.valueOf(defaultStart));
            }
        }
    }

    public List<ObjectivesDTO> objectivesListByDate(long scoreCardId, boolean loadFlag, String dateRange) {
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
        List dbList = this.objectivesRepository.objectivesListByDate(Long.valueOf(scoreCardId), 0, firstDate, secondDate);
        return dbList.stream().map(dbValue -> new ObjectivesDTO(dbValue, loadFlag)).collect(Collectors.toList());
    }
}

