/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.RiskCauseAndConsequence
 *  com.estrat.backend.db.bean.po.RiskConsequenceDetails
 *  com.estrat.backend.db.cache.DBCache
 *  com.estrat.backend.db.dao.RiskCauseAndConsequenceHistoryRepository
 *  com.estrat.backend.db.dao.RiskCauseAndConsequenceRepository
 *  com.estrat.backend.db.dao.RiskConsequenceHistoryRepository
 *  com.estrat.backend.db.dao.RiskConsequenceRepository
 *  com.estrat.backend.db.dto.RiskCauseAndConsequenceDTO
 *  com.estrat.backend.db.dto.RiskConsequenceDTO
 *  com.estrat.backend.db.dto.RiskResponseDTO
 *  com.estrat.backend.db.resource.util.UserThreadLocal
 *  com.estrat.backend.db.service.RiskCauseAndConsequenceService
 *  org.apache.log4j.Logger
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.backend.db.service;

import com.estrat.backend.db.bean.po.RiskCauseAndConsequence;
import com.estrat.backend.db.bean.po.RiskCauseAndConsequenceHistory;
import com.estrat.backend.db.bean.po.RiskConsequenceDetails;
import com.estrat.backend.db.bean.po.RiskConsequenceDetailsHistory;
import com.estrat.backend.db.cache.DBCache;
import com.estrat.backend.db.dao.RiskCauseAndConsequenceHistoryRepository;
import com.estrat.backend.db.dao.RiskCauseAndConsequenceRepository;
import com.estrat.backend.db.dao.RiskConsequenceHistoryRepository;
import com.estrat.backend.db.dao.RiskConsequenceRepository;
import com.estrat.backend.db.dto.RiskCauseAndConsequenceDTO;
import com.estrat.backend.db.dto.RiskConsequenceDTO;
import com.estrat.backend.db.dto.RiskResponseDTO;
import com.estrat.backend.db.resource.util.UserThreadLocal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RiskCauseAndConsequenceService {
    private Logger log = LoggerFactory.getLogger(RiskCauseAndConsequenceService.class);
    @Autowired
    protected RiskCauseAndConsequenceRepository riskCauseAndConsequenceRepository;
    @Autowired
    private DBCache dbCache;
    @Autowired
    protected RiskConsequenceRepository riskConsequenceRepository;
    @Autowired
    private RiskCauseAndConsequenceHistoryRepository historyRepository;
    @Autowired
    private RiskConsequenceHistoryRepository riskConsequenceHistoryRepository;

    public Optional<RiskCauseAndConsequence> findById(long id) {
        return this.riskCauseAndConsequenceRepository.findById(id);
    }

    public RiskResponseDTO save(RiskCauseAndConsequence riskCauseAndConsequence) {
        RiskCauseAndConsequence riskCauseAndConsequenceResponse = (RiskCauseAndConsequence)this.riskCauseAndConsequenceRepository.save(riskCauseAndConsequence);
        RiskResponseDTO responseDTO = new RiskResponseDTO();
        responseDTO.setFlag(true);
        RiskCauseAndConsequenceDTO riskCauseAndConsequenceDTO = new RiskCauseAndConsequenceDTO(riskCauseAndConsequenceResponse);
        responseDTO.setRiskCauseAndConsequenceDTO(riskCauseAndConsequenceDTO);
        this.dbCache.remove((Object)("retrieveCauseListByRiskId" + riskCauseAndConsequenceDTO.getRiskId()), "dbCache");
        this.dbCache.remove((Object)("retrieveCauseListByEmpId" + UserThreadLocal.get()), "dbCache");
        return responseDTO;
    }

    public void delete(RiskCauseAndConsequence riskCauseAndConsequence) {
        riskCauseAndConsequence.getConsequenceList();
        this.riskCauseAndConsequenceRepository.delete(riskCauseAndConsequence);
    }

    public List<RiskCauseAndConsequenceDTO> findAll(long empId) {
        if (this.dbCache.get((Object)("retrieveCauseListByEmpId" + empId), "dbCache") != null) {
            this.log.debug("retrieveCauseListByEmpId populated from cache");
            return (List)this.dbCache.get((Object)("retrieveCauseListByEmpId" + empId), "dbCache");
        }
        List<RiskCauseAndConsequence> dbList = this.riskCauseAndConsequenceRepository.findAllByEmpId(Long.valueOf(empId), 0);
        List<RiskCauseAndConsequenceDTO> riskList = dbList.stream().map(dbValue -> new RiskCauseAndConsequenceDTO(dbValue)).collect(Collectors.toList());
        this.dbCache.put((Object)("retrieveCauseListByEmpId" + empId), (Object)empId, "dbCache");
        return riskList;
    }

    public List<RiskCauseAndConsequenceDTO> findAllByRiskDetailsId(Long riskId) {
        if (this.dbCache.get((Object)("retrieveCauseListByRiskId" + riskId), "dbCache") != null) {
            this.log.debug("retrieveCauseListByRiskId populated from cache");
            return (List)this.dbCache.get((Object)("retrieveCauseListByRiskId" + riskId), "dbCache");
        }
        List<RiskCauseAndConsequence> dbList = this.riskCauseAndConsequenceRepository.findAllByRiskDetailsId(riskId, 0);
        List<RiskCauseAndConsequenceDTO> riskList = dbList.stream().map(dbValue -> new RiskCauseAndConsequenceDTO(dbValue)).collect(Collectors.toList());
        this.dbCache.put((Object)("retrieveCauseListByRiskId" + riskId), riskList, "dbCache");
        return riskList;
    }

    public List<RiskCauseAndConsequenceDTO> findAllByRiskVersion(Long riskId, Long version) {
        List<RiskCauseAndConsequenceHistory> dbList = this.historyRepository.findByRiskIdAndVersion(riskId, version);
        List<RiskCauseAndConsequenceDTO> riskList = dbList.stream().map(dbValue -> {
            RiskCauseAndConsequenceDTO causeDto = new RiskCauseAndConsequenceDTO(dbValue);
            List<RiskConsequenceDetailsHistory> concequenList = this.riskConsequenceHistoryRepository.findByRiskIdAndVersion(Long.valueOf(causeDto.getId()), causeDto.getVersion());
            List<RiskConsequenceDTO> riskconcequenceList = concequenList.stream().map(dbdata -> new RiskConsequenceDTO(dbdata)).collect(Collectors.toList());
            causeDto.setConsequenceList(riskconcequenceList);
            return causeDto;
        }).collect(Collectors.toList());
        this.dbCache.put((Object)("retrieveCauseListByRiskId" + riskId), riskList, "dbCache");
        return riskList;
    }

    public Optional<RiskConsequenceDetails> findConqById(long id) {
        return this.riskConsequenceRepository.findById(id);
    }

    public RiskConsequenceDTO save(RiskConsequenceDetails riskCauseAndConsequence) {
        RiskConsequenceDetails riskCauseAndConsequenceResponse = (RiskConsequenceDetails)this.riskConsequenceRepository.save(riskCauseAndConsequence);
        RiskConsequenceDTO riskCauseAndConsequenceDTO = new RiskConsequenceDTO(riskCauseAndConsequenceResponse);
        Optional riskCauseDetails = this.riskCauseAndConsequenceRepository.findById(riskCauseAndConsequenceResponse.getCauseConqId());
        if (riskCauseDetails.isPresent()) {
            this.dbCache.remove((Object)("retrieveCauseListByRiskId" + ((RiskCauseAndConsequence)riskCauseDetails.get()).getRiskId().getId()), "dbCache");
        }
        this.dbCache.remove((Object)("retrieveCauseListByEmpId" + UserThreadLocal.get()), "dbCache");
        this.dbCache.remove((Object)("findAllByConqId" + riskCauseAndConsequenceDTO.getCauseConqId()), "dbCache");
        return riskCauseAndConsequenceDTO;
    }

    public void delete(RiskConsequenceDetails riskCauseAndConsequence) {
        this.riskConsequenceRepository.delete(riskCauseAndConsequence);
    }

    public List<RiskConsequenceDTO> findAllByConqId(Long conqId) {
        if (this.dbCache.get((Object)("findAllByConqId" + conqId), "dbCache") != null) {
            this.log.debug("findAllByConqId populated from cache");
            return (List)this.dbCache.get((Object)("findAllByConqId" + conqId), "dbCache");
        }
        List<RiskConsequenceDetails> dbList = this.riskConsequenceRepository.findAllByCauseAndConqId(conqId);
        List<RiskConsequenceDTO> conqList = dbList.stream().map(dbValue -> new RiskConsequenceDTO(dbValue)).collect(Collectors.toList());
        this.dbCache.put((Object)("findAllByConqId" + conqId), conqList, "dbCache");
        return conqList;
    }

    public List<Map<String, Object>> findAllRiskCause() {
        ArrayList<Map<String, Object>> mapList = new ArrayList<Map<String, Object>>();
        List<RiskCauseAndConsequence> riskCauseAndConsequenceList = this.riskCauseAndConsequenceRepository.findAll();
        List<RiskCauseAndConsequenceDTO> riskCauseAndConsequenceDTOList = riskCauseAndConsequenceList != null ? riskCauseAndConsequenceList.stream().map(obj -> new RiskCauseAndConsequenceDTO(obj)).collect(Collectors.toList()) : null;
        for (RiskCauseAndConsequenceDTO riskCauseAndConsequenceDTO : riskCauseAndConsequenceDTOList) {
            HashMap<String, Object> stringMap = new HashMap<String, Object>();
            stringMap.put("id", riskCauseAndConsequenceDTO.getId());
            stringMap.put("name", (Long)riskCauseAndConsequenceDTO.getCauseAndConsequenceValue().get("name"));
            mapList.add(stringMap);
        }
        return mapList;
    }

    public List<Map<String, Object>> findAllRiskCause(long riskId) {
        ArrayList<Map<String, Object>> mapList = new ArrayList<Map<String, Object>>();
        List<RiskCauseAndConsequence> riskCauseAndConsequenceList = this.riskCauseAndConsequenceRepository.findAllByRiskDetailsByRiskId(Long.valueOf(riskId));
        List<RiskCauseAndConsequenceDTO> riskCauseAndConsequenceDTOList = riskCauseAndConsequenceList != null ? riskCauseAndConsequenceList.stream().map(obj -> new RiskCauseAndConsequenceDTO(obj)).collect(Collectors.toList()) : null;
        for (RiskCauseAndConsequenceDTO riskCauseAndConsequenceDTO : riskCauseAndConsequenceDTOList) {
            HashMap<String, Object> stringMap = new HashMap<String, Object>();
            stringMap.put("id", riskCauseAndConsequenceDTO.getId());
            stringMap.put("name", (Long)riskCauseAndConsequenceDTO.getCauseAndConsequenceValue().get("name"));
            mapList.add(stringMap);
        }
        return mapList;
    }
}

