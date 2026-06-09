/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.scorecard.dto.ObjectivesDTO
 *  com.estrat.scorecard.dto.ScoreCardDTO
 *  com.estrat.scorecard.dto.ScoreCardDetailsDTO
 *  com.estrat.scorecard.dto.ScoreCardResponseDTO
 *  com.estrat.scorecard.dto.ScorecardList
 *  com.estrat.scorecard.dto.StatusCountDto
 *  com.estrat.scorecard.exception.RequestException
 *  com.estrat.scorecard.service.KPIService
 *  com.estrat.scorecard.service.ObjectiveService
 *  com.estrat.scorecard.service.ScoreCardService
 *  com.estrat.scorecard.service.ScoreThreadConfig
 *  com.estrat.scorecard.util.DataUtil
 *  com.estrat.scorecard.web.controller.scorecard.ScoreCardController
 *  org.slf4j.Logger
 *  org.slf4j.LoggerFactory
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.http.HttpStatus
 *  org.springframework.http.ResponseEntity
 *  org.springframework.web.bind.annotation.DeleteMapping
 *  org.springframework.web.bind.annotation.GetMapping
 *  org.springframework.web.bind.annotation.PathVariable
 *  org.springframework.web.bind.annotation.PostMapping
 *  org.springframework.web.bind.annotation.PutMapping
 *  org.springframework.web.bind.annotation.RequestBody
 *  org.springframework.web.bind.annotation.RequestParam
 *  org.springframework.web.bind.annotation.RestController
 */
package com.estrat.scorecard.web.controller.scorecard;

import com.estrat.scorecard.dto.ObjectivesDTO;
import com.estrat.scorecard.dto.ScoreCardDTO;
import com.estrat.scorecard.dto.ScoreCardDetailsDTO;
import com.estrat.scorecard.dto.ScoreCardResponseDTO;
import com.estrat.scorecard.dto.ScorecardList;
import com.estrat.scorecard.dto.StatusCountDto;
import com.estrat.scorecard.exception.RequestException;
import com.estrat.scorecard.service.KPIService;
import com.estrat.scorecard.service.ObjectiveService;
import com.estrat.scorecard.service.ScoreCardService;
import com.estrat.scorecard.service.ScoreThreadConfig;
import com.estrat.scorecard.util.DataUtil;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ScoreCardController {
    @Autowired
    private ScoreCardService scoreCardService;
    @Autowired
    private ObjectiveService objectiveService;
    @Autowired
    private KPIService kpiService;
    @Autowired
    private DataUtil dataUtil;
    @Autowired
    private ScoreThreadConfig scoreThreadConfig;
    private Logger log = LoggerFactory.getLogger(ScoreCardController.class);

    @GetMapping(value={"/scorecard/{id}"})
    public ResponseEntity<ScoreCardDTO> getScoreCardDetails(@PathVariable long id) {
        return this.scoreCardService.getScoreCardDetails(id);
    }

    @PostMapping(value={"/scorecard"})
    public ResponseEntity<ScoreCardResponseDTO> saveOrUpdateDetails(@RequestBody ScoreCardDTO scoreCard) {
        scoreCard.setCreatedTime(LocalDateTime.now());
        return this.scoreCardService.saveOrUpdateDetails(scoreCard);
    }

    @DeleteMapping(value={"/scorecard/{id}"})
    public ResponseEntity<Boolean> deleteDeptDetails(@PathVariable long id) {
        return this.scoreCardService.deleteDeptDetails(id);
    }

    @PutMapping(value={"/scorecard"})
    public ResponseEntity<ScoreCardResponseDTO> updateDetails(@RequestBody ScoreCardDTO scoreCard) {
        scoreCard.setUpdatedTime(LocalDateTime.now());
        return this.scoreCardService.saveOrUpdateDetails(scoreCard);
    }

    @GetMapping(value={"/scoreCardList/{empId}"})
    public ResponseEntity<ScoreCardResponseDTO> scoreCardList(@PathVariable(value="empId") Long empId, @RequestParam(value="loadFlag", required=false) String loadFlag, @RequestParam(value="statusLightFlag", required=false) String statusLightFlag, @RequestParam(value="pageId", required=false) String pageId) {
        boolean flag = loadFlag != null ? Boolean.valueOf(loadFlag) : true;
        Long departmentId = 0L;
        boolean statusLightEnabled = statusLightFlag != null ? Boolean.valueOf(statusLightFlag) : true;
        ScoreCardResponseDTO responseDTO = new ScoreCardResponseDTO();
        ScoreCardDetailsDTO detailsDTOList = this.scoreCardService.scoreCardDetailList(empId.longValue(), pageId, flag);
        if (Objects.nonNull(detailsDTOList.getDepartmentId())) {
            departmentId = detailsDTOList.getDepartmentId();
        }
        List scoreCardList = this.scoreCardService.scoreCardList(empId.longValue(), pageId, flag);
        responseDTO.setScoreCardList(scoreCardList);
        if (statusLightEnabled) {
            Map scoreCardMap = this.dataUtil.calculateStatusLight(scoreCardList, null, empId.toString(), departmentId);
            this.dataUtil.populateOverallStatusLight(responseDTO, responseDTO.getScoreCardList(), scoreCardMap);
        } else {
            responseDTO.setStatusLight("");
        }
        return new ResponseEntity((Object)responseDTO, HttpStatus.OK);
    }

    @GetMapping(value={"/scoreCardDetailList/{empId}"})
    public ResponseEntity<ScoreCardResponseDTO> scoreCardDetailList(@PathVariable(value="empId") long empId, @RequestParam(value="loadFlag", required=false) String loadFlag, @RequestParam(value="statusLightFlag", required=false) String statusLightFlag, @RequestParam(value="pageId", required=false) String pageId) {
        boolean flag = loadFlag != null ? Boolean.valueOf(loadFlag) : true;
        boolean statusLightEnabled = statusLightFlag != null ? Boolean.valueOf(statusLightFlag) : true;
        ScoreCardResponseDTO responseDTO = new ScoreCardResponseDTO();
        ScoreCardDetailsDTO detailsDTOList = this.scoreCardService.scoreCardDetailList(empId, pageId, flag);
        responseDTO.setCardDetailsDTO(detailsDTOList);
        return new ResponseEntity((Object)responseDTO, HttpStatus.OK);
    }

    @GetMapping(value={"/scoreCardDetailListDept/{deptId}"})
    public ResponseEntity<ScoreCardResponseDTO> scoreCardDetailListDept(@PathVariable(value="deptId") long deptId, @RequestParam(value="loadFlag", required=false) String loadFlag, @RequestParam(value="statusLightFlag", required=false) String statusLightFlag, @RequestParam(value="pageId", required=false) String pageId) {
        boolean flag = loadFlag != null ? Boolean.valueOf(loadFlag) : true;
        boolean statusLightEnabled = statusLightFlag != null ? Boolean.valueOf(statusLightFlag) : true;
        ScoreCardResponseDTO responseDTO = new ScoreCardResponseDTO();
        ScoreCardDetailsDTO detailsDTOList = this.scoreCardService.scoreCardDetailListDept(deptId, pageId, flag);
        responseDTO.setCardDetailsDTO(detailsDTOList);
        return new ResponseEntity((Object)responseDTO, HttpStatus.OK);
    }

    @GetMapping(value={"/kpistatuscount/{id}"})
    public ResponseEntity<List<StatusCountDto>> scorecardKpiStatusCount(@PathVariable(value="id") long id, @RequestParam(value="period", required=false) String period) {
        List statusCountDtos = this.scoreCardService.statusCount(Long.valueOf(id), period);
        return new ResponseEntity((Object)statusCountDtos, HttpStatus.OK);
    }

    @GetMapping(value={"/blankkpi/{id}"})
    public ResponseEntity<List<StatusCountDto>> blankkpi(@PathVariable(value="id") long id, @RequestParam(value="period", required=false) String period) {
        List statusCountDtos = this.scoreCardService.blankkpi(Long.valueOf(id), period);
        return new ResponseEntity((Object)statusCountDtos, HttpStatus.OK);
    }

    @GetMapping(value={"/scoreCardListByDatePageIds/{empId}"})
    public ResponseEntity<List<ScoreCardResponseDTO>> scoreCardListByDate(@PathVariable(value="empId") Long empId, @RequestParam(value="pageId", required=false) String pageId, @RequestParam(value="loadFlag", required=false) String loadFlag, @RequestParam(value="statusLightFlag", required=false) String statusLightFlag, @RequestParam(value="dateRange", required=false) String dateRange) {
        boolean flag = loadFlag != null ? Boolean.valueOf(loadFlag) : true;
        boolean statusLightEnabled = statusLightFlag != null ? Boolean.valueOf(statusLightFlag) : true;
        Long departmentId = 0L;
        ArrayList<ScoreCardResponseDTO> scoredetails = new ArrayList<ScoreCardResponseDTO>();
        List cartdetailsDTO = this.scoreCardService.scoreCardDetailsListByDatePageIds(empId.longValue(), pageId, flag, dateRange);
        System.out.println("cartdetailsDTO :: " + cartdetailsDTO);
        for (com.estrat.scorecard.dto.ScoreCardDetailsDTO detailsDTO : (java.util.List<com.estrat.scorecard.dto.ScoreCardDetailsDTO>)cartdetailsDTO) {
            ScoreCardResponseDTO responseDTO = new ScoreCardResponseDTO();
            if (Objects.nonNull(detailsDTO.getDepartmentId())) {
                departmentId = detailsDTO.getDepartmentId();
            }
            if (detailsDTO != null && detailsDTO.getScorecardName() != null) {
                List scoreCardList = this.scoreCardService.scoreCardListByDate(detailsDTO.getId(), flag, dateRange);
                if (!scoreCardList.isEmpty()) {
                    ArrayList<ScoreCardDTO> finalScoreCardDTOList = new ArrayList<ScoreCardDTO>();
                    for (com.estrat.scorecard.dto.ScoreCardDTO scoreCardDTO : (java.util.List<com.estrat.scorecard.dto.ScoreCardDTO>)scoreCardList) {
                        if (scoreCardDTO == null) continue;
                        List objectivesDTOList = (List)this.objectiveService.objectivesListByDate(scoreCardDTO.getId(), false, dateRange).getBody();
                        if (!objectivesDTOList.isEmpty()) {
                            ArrayList<ObjectivesDTO> finalObjectivesDTOList = new ArrayList<ObjectivesDTO>();
                            for (com.estrat.scorecard.dto.ObjectivesDTO objectivesDTO : (java.util.List<com.estrat.scorecard.dto.ObjectivesDTO>)objectivesDTOList) {
                                if (objectivesDTO == null) continue;
                                List kpidtos = this.kpiService.kpiListByDate(objectivesDTO.getId(), dateRange);
                                if (!kpidtos.isEmpty()) {
                                    objectivesDTO.setKpiList(kpidtos);
                                }
                                finalObjectivesDTOList.add(objectivesDTO);
                            }
                            if (!finalObjectivesDTOList.isEmpty()) {
                                scoreCardDTO.setObjectiveList(finalObjectivesDTOList);
                            }
                        }
                        finalScoreCardDTOList.add(scoreCardDTO);
                    }
                    detailsDTO.setScoreCardDTOS(finalScoreCardDTOList);
                    responseDTO.setCardDetailsDTO(detailsDTO);
                    if (statusLightEnabled) {
                        Map scoreCardMap = this.dataUtil.calculateStatusLight(finalScoreCardDTOList, dateRange, empId.toString(), departmentId);
                        this.dataUtil.populateOverallStatusLight(responseDTO, finalScoreCardDTOList, scoreCardMap);
                    } else {
                        responseDTO.setStatusLight("");
                    }
                } else {
                    responseDTO.setCardDetailsDTO(detailsDTO);
                    responseDTO.setStatusLight("");
                }
            }
            scoredetails.add(responseDTO);
        }
        return new ResponseEntity(scoredetails, HttpStatus.OK);
    }

    @GetMapping(value={"/scoreCardListByDate/{empId}"})
    public ResponseEntity<ScoreCardResponseDTO> getscoreCardListByDatePageIds(@PathVariable(value="empId") Long empId, @RequestParam(value="pageId", required=false) String pageId, @RequestParam(value="loadFlag", required=false) String loadFlag, @RequestParam(value="statusLightFlag", required=false) String statusLightFlag, @RequestParam(value="dateRange", required=false) String dateRange) {
        boolean flag = loadFlag != null ? Boolean.valueOf(loadFlag) : true;
        boolean statusLightEnabled = statusLightFlag != null ? Boolean.valueOf(statusLightFlag) : true;
        ScoreCardResponseDTO responseDTO = new ScoreCardResponseDTO();
        Long departmentId = 0L;
        this.log.info(" 216 check get detailList api  start timing: {} ", (Object)LocalDateTime.now());
        ScoreCardDetailsDTO detailsDTO = this.scoreCardService.scoreCardDetailsListByDate(empId.longValue(), pageId, flag, dateRange);
        this.log.info(" 218 check get detailList method end timing: {} ", (Object)LocalDateTime.now());
        if (Objects.nonNull(detailsDTO.getDepartmentId())) {
            departmentId = detailsDTO.getDepartmentId();
        }
        if (detailsDTO != null && detailsDTO.getScorecardName() != null) {
            List scoreCardList = this.scoreCardService.scoreCardListByDate(detailsDTO.getId(), flag, dateRange);
            if (!scoreCardList.isEmpty()) {
                ArrayList<ScoreCardDTO> finalScoreCardDTOList = new ArrayList<ScoreCardDTO>();
                for (com.estrat.scorecard.dto.ScoreCardDTO scoreCardDTO : (java.util.List<com.estrat.scorecard.dto.ScoreCardDTO>)scoreCardList) {
                    if (scoreCardDTO == null) continue;
                    List objectivesDTOList = (List)this.objectiveService.objectivesListByDate(scoreCardDTO.getId(), false, dateRange).getBody();
                    if (!objectivesDTOList.isEmpty()) {
                        ArrayList<ObjectivesDTO> finalObjectivesDTOList = new ArrayList<ObjectivesDTO>();
                        for (com.estrat.scorecard.dto.ObjectivesDTO objectivesDTO : (java.util.List<com.estrat.scorecard.dto.ObjectivesDTO>)objectivesDTOList) {
                            if (objectivesDTO == null) continue;
                            List kpidtos = this.kpiService.kpiListByDate(objectivesDTO.getId(), dateRange);
                            if (!kpidtos.isEmpty()) {
                                objectivesDTO.setKpiList(kpidtos);
                            }
                            finalObjectivesDTOList.add(objectivesDTO);
                        }
                        if (!finalObjectivesDTOList.isEmpty()) {
                            scoreCardDTO.setObjectiveList(finalObjectivesDTOList);
                        }
                    }
                    finalScoreCardDTOList.add(scoreCardDTO);
                }
                detailsDTO.setScoreCardDTOS(finalScoreCardDTOList);
                responseDTO.setCardDetailsDTO(detailsDTO);
                if (statusLightEnabled) {
                    this.log.info("255 check statuslightEnable api  start timing: {} ", (Object)LocalDateTime.now());
                    Map scoreCardMap = this.dataUtil.calculateStatusLight(finalScoreCardDTOList, dateRange, empId.toString(), departmentId);
                    this.log.info("258 check statuslightEbnabke end timing: {} ", (Object)LocalDateTime.now());
                    this.log.info("260 check populateOveralllight api  start timing: {} ", (Object)LocalDateTime.now());
                    this.dataUtil.populateOverallStatusLight(responseDTO, finalScoreCardDTOList, scoreCardMap);
                    this.log.info(" 262 check populateOverallLight end timing: {} ", (Object)LocalDateTime.now());
                } else {
                    responseDTO.setStatusLight("");
                }
            } else {
                responseDTO.setCardDetailsDTO(detailsDTO);
                responseDTO.setStatusLight("");
            }
        }
        return new ResponseEntity((Object)responseDTO, HttpStatus.OK);
    }

    @GetMapping(value={"/scoreCardListByDateId/{empId}"})
    public ResponseEntity<ScoreCardResponseDTO> scoreCardListByDateId(@PathVariable(value="empId") Long empId, @RequestParam(value="dateRange", required=false) String dateRange, @RequestParam(value="pageId", required=false) String pageId) {
        boolean flag = true;
        boolean statusLightEnabled = true;
        ScoreCardResponseDTO responseDTO = new ScoreCardResponseDTO();
        Long departmentId = 0L;
        ScoreCardDetailsDTO detailsDTO = this.scoreCardService.scoreCardDetailListPage(pageId);
        if (Objects.nonNull(detailsDTO.getDepartmentId())) {
            departmentId = detailsDTO.getDepartmentId();
        }
        if (detailsDTO != null && detailsDTO.getScorecardName() != null) {
            List scoreCardList = this.scoreCardService.scoreCardListByDate(detailsDTO.getId(), flag, dateRange);
            if (!scoreCardList.isEmpty()) {
                ArrayList<ScoreCardDTO> finalScoreCardDTOList = new ArrayList<ScoreCardDTO>();
                for (com.estrat.scorecard.dto.ScoreCardDTO scoreCardDTO : (java.util.List<com.estrat.scorecard.dto.ScoreCardDTO>)scoreCardList) {
                    if (scoreCardDTO == null) continue;
                    List objectivesDTOList = (List)this.objectiveService.objectivesListByDate(scoreCardDTO.getId(), false, dateRange).getBody();
                    if (!objectivesDTOList.isEmpty()) {
                        ArrayList<ObjectivesDTO> finalObjectivesDTOList = new ArrayList<ObjectivesDTO>();
                        for (com.estrat.scorecard.dto.ObjectivesDTO objectivesDTO : (java.util.List<com.estrat.scorecard.dto.ObjectivesDTO>)objectivesDTOList) {
                            if (objectivesDTO == null) continue;
                            List kpidtos = this.kpiService.kpiListByDate(objectivesDTO.getId(), dateRange);
                            if (!kpidtos.isEmpty()) {
                                objectivesDTO.setKpiList(kpidtos);
                            }
                            finalObjectivesDTOList.add(objectivesDTO);
                        }
                        if (!finalObjectivesDTOList.isEmpty()) {
                            scoreCardDTO.setObjectiveList(finalObjectivesDTOList);
                        }
                    }
                    finalScoreCardDTOList.add(scoreCardDTO);
                }
                detailsDTO.setScoreCardDTOS(finalScoreCardDTOList);
                responseDTO.setCardDetailsDTO(detailsDTO);
                if (statusLightEnabled) {
                    Map scoreCardMap = this.dataUtil.calculateStatusLight(finalScoreCardDTOList, dateRange, empId.toString(), departmentId);
                    this.dataUtil.populateOverallStatusLight(responseDTO, finalScoreCardDTOList, scoreCardMap);
                } else {
                    responseDTO.setStatusLight("");
                }
            } else {
                responseDTO.setCardDetailsDTO(detailsDTO);
                responseDTO.setStatusLight("");
            }
        }
        return new ResponseEntity((Object)responseDTO, HttpStatus.OK);
    }

    @PostMapping(value={"/scorecardDetails"})
    public ResponseEntity<ScoreCardResponseDTO> saveScorecardDetails(@RequestBody ScoreCardDetailsDTO detailsDTO) {
        return this.scoreCardService.saveScoreCardDetails(detailsDTO);
    }

    @PutMapping(value={"/scorecardDetails"})
    public ResponseEntity<ScoreCardResponseDTO> UpdateScorecardDetails(@RequestBody ScoreCardDetailsDTO detailsDTO) {
        return this.scoreCardService.updateScoreCardDetails(detailsDTO);
    }

    @GetMapping(value={"/checkScoreName/{empId}"})
    public ResponseEntity<Map<String, Object>> scoreName(@PathVariable(value="empId") long empId, @RequestParam(value="scorename", required=false) String scoreName, @RequestParam(value="pageId", required=false) String pageId) throws RequestException {
        return this.scoreCardService.checkScoreName(empId, scoreName, pageId);
    }

    @GetMapping(value={"/scoreCardDetailListByEmpId/{empId}"})
    public ResponseEntity<List<ScoreCardDetailsDTO>> scoreCardDetailListByEmpId(@PathVariable(value="empId") long empId) {
        return new ResponseEntity((Object)this.scoreCardService.scoreCardDetailListByEmpId(empId), HttpStatus.OK);
    }

    @GetMapping(value={"/scoreCardDetailListByDeptId/{deptId}"})
    public ResponseEntity<List<ScoreCardDetailsDTO>> scoreCardDetailListByDeptId(@PathVariable(value="deptId") long deptId) {
        return new ResponseEntity((Object)this.scoreCardService.scoreCardDetailListByDeptId(deptId), HttpStatus.OK);
    }

    @GetMapping(value={"/scoreCardListByEmpId/{empId}"})
    public ResponseEntity<List<ScorecardList>> checkscoreCardListByEmpId(@PathVariable(value="empId") long empId) {
        return new ResponseEntity((Object)this.scoreCardService.scoreCardListByEmpId(empId), HttpStatus.OK);
    }

    @GetMapping(value={"/scoreCardListByDeptId"})
    public ResponseEntity<List<ScorecardList>> checkscoreCardListByDeptId() {
        return new ResponseEntity((Object)this.scoreCardService.scoreCardListByDeptId(), HttpStatus.OK);
    }

    @GetMapping(value={"/getscoreCardListByDeptIds"})
    public ResponseEntity<List<ScorecardList>> getcheckscoreCardListByDeptId(@RequestParam(value="deptIds", required=false) String deptIds) {
        return new ResponseEntity((Object)this.scoreCardService.getscoreCardListByDeptId(deptIds), HttpStatus.OK);
    }

    @GetMapping(value={"/formScoreCardDetailList/{empId}"})
    public ResponseEntity<List<ScoreCardDetailsDTO>> formScoreCardDetailList(@PathVariable(value="empId") long empId) {
        return new ResponseEntity((Object)this.scoreCardService.formScoreCardDetailList(empId), HttpStatus.OK);
    }

    @GetMapping(value={"/checkScore/{empId}"})
    public ResponseEntity<Map<String, String>> checkScore(@PathVariable(value="empId") Long empId, @RequestParam(value="dateRange", required=false) String dateRange) {
        return new ResponseEntity((Object)this.scoreThreadConfig.executorAValue(empId, dateRange), HttpStatus.OK);
    }

    @GetMapping(value={"/checkScoreCardData/{empId}"})
    public ResponseEntity<Map<String, String>> checkScoreCardData(@PathVariable(value="empId") long empId, @RequestParam(value="pageId", required=false) String pageId) throws RequestException {
        return new ResponseEntity((Object)this.scoreCardService.checkScoreCardData(empId, pageId), HttpStatus.OK);
    }

    @PutMapping(value={"/changePerspectiveName"})
    public ResponseEntity<Map<String, Object>> changeScoreName(@RequestParam(value="scorecardId", required=false) String scorecardId, @RequestParam(value="name", required=false) String name) throws RequestException {
        return this.scoreCardService.changeScoreName(scorecardId, name);
    }
}

