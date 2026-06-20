/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.ScoreCard
 *  com.estrat.backend.db.bean.po.ScoreCardDetails
 *  com.estrat.backend.db.dto.EmployeeDTO
 *  com.estrat.backend.db.dto.ScoreCardDTO
 *  com.estrat.backend.db.dto.ScoreCardDetailsDTO
 *  com.estrat.backend.db.dto.ScoreCardResponseDTO
 *  com.estrat.backend.db.dto.ScorecardList
 *  com.estrat.backend.db.exception.RequestException
 *  com.estrat.backend.db.resource.ScoreCardController
 *  com.estrat.backend.db.resource.util.NotificationUtil
 *  com.estrat.backend.db.resource.util.ScoreCardUtil
 *  com.estrat.backend.db.resource.util.UserThreadLocal
 *  com.estrat.backend.db.service.EmployeeService
 *  com.estrat.backend.db.service.KPIService
 *  com.estrat.backend.db.service.PageService
 *  com.estrat.backend.db.service.ScoreCardDetailsService
 *  com.estrat.backend.db.service.ScoreCardService
 *  org.apache.commons.lang3.StringUtils
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.http.HttpStatus
 *  org.springframework.http.ResponseEntity
 *  org.springframework.stereotype.Controller
 *  org.springframework.web.bind.annotation.DeleteMapping
 *  org.springframework.web.bind.annotation.GetMapping
 *  org.springframework.web.bind.annotation.PathVariable
 *  org.springframework.web.bind.annotation.PostMapping
 *  org.springframework.web.bind.annotation.PutMapping
 *  org.springframework.web.bind.annotation.RequestBody
 *  org.springframework.web.bind.annotation.RequestParam
 */
package com.estrat.backend.db.resource;

import com.estrat.backend.db.bean.po.ScoreCard;
import com.estrat.backend.db.bean.po.ScoreCardDetails;
import com.estrat.backend.db.dto.EmployeeDTO;
import com.estrat.backend.db.dto.ScoreCardDTO;
import com.estrat.backend.db.dto.ScoreCardDetailsDTO;
import com.estrat.backend.db.dto.ScoreCardResponseDTO;
import com.estrat.backend.db.dto.ScorecardList;
import com.estrat.backend.db.exception.RequestException;
import com.estrat.backend.db.resource.util.NotificationUtil;
import com.estrat.backend.db.resource.util.ScoreCardUtil;
import com.estrat.backend.db.resource.util.UserThreadLocal;
import com.estrat.backend.db.service.EmployeeService;
import com.estrat.backend.db.service.KPIService;
import com.estrat.backend.db.service.PageService;
import com.estrat.backend.db.service.ScoreCardDetailsService;
import com.estrat.backend.db.service.ScoreCardService;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class ScoreCardController {
    @Autowired
    private ScoreCardService scoreCardService;
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private NotificationUtil notification;
    @Autowired
    private ScoreCardUtil scoreCardUtil;
    @Autowired
    private KPIService kpiservice;
    @Autowired
    private PageService pageService;
    @Autowired
    private ScoreCardDetailsService scoreCardDetailsService;

    @GetMapping(value={"/scorecard/{id}"})
    public ResponseEntity<ScoreCardDTO> getScoreCardById(@PathVariable long id) {
        Optional scoreCard = this.scoreCardService.findById(id);
        if (scoreCard.isPresent()) {
            ScoreCardDTO scoreCardDTO = new ScoreCardDTO((ScoreCard)scoreCard.get(), true);
            return new ResponseEntity((Object)scoreCardDTO, HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    @GetMapping(value={"/scorecardList"})
    public ResponseEntity<List<ScoreCardDetailsDTO>> getScoreCardById(@RequestParam(value="scorecardid", required=false) String scorecardid) {
        String[] scorecard = scorecardid.split(",");
        List<String> scorecardlist = Arrays.asList(scorecard);
        List scoreCard = this.scoreCardService.scoreCardListbyIds(scorecardlist);
        return new ResponseEntity((Object)scoreCard, HttpStatus.OK);
    }

    @GetMapping(value={"/scoreCardList/{empId}"})
    public ResponseEntity<List<ScoreCardDTO>> scoreCardList(@PathVariable(value="empId") long empId, @RequestParam(value="pageId", required=false) String pageId, @RequestParam(value="loadFlag", required=false) String loadFlag) {
        List scoreCardList = null;
        boolean flag = loadFlag != null ? Boolean.valueOf(loadFlag) : true;
        scoreCardList = StringUtils.isNotEmpty((CharSequence)pageId) ? this.scoreCardService.scoreCardList(empId, Long.valueOf(pageId).longValue(), flag) : this.scoreCardService.scoreCardList(empId, flag);
        return new ResponseEntity((Object)scoreCardList, HttpStatus.OK);
    }

    @GetMapping(value={"/scoreCardList"})
    public ResponseEntity<List<ScoreCardDTO>> scoreCardList() {
        return new ResponseEntity((Object)this.scoreCardService.getAllScoreCardList(), HttpStatus.OK);
    }

    // Read endpoint that returns the nested scorecard tree (cardDetailsDTO.scoreCardDTOS)
    // for a page, so the revamp UI can render it directly from the merged backend.
    @GetMapping(value={"/scoreCardDetailsByPage/{pageId}"})
    public ResponseEntity<ScoreCardResponseDTO> getScoreCardDetailsByPage(@PathVariable(value="pageId") Long pageId) {
        ScoreCardResponseDTO response = new ScoreCardResponseDTO();
        response.setCardDetailsDTO(this.scoreCardService.scoreCardDetails(pageId));
        return new ResponseEntity((Object)response, HttpStatus.OK);
    }

    @PostMapping(value={"/scorecard"})
    public ResponseEntity<ScoreCardResponseDTO> saveOrUpdateScoreCard(@RequestBody ScoreCardDTO scoreCard, ScoreCardDetailsDTO scoreCardDetailsDTO) {
        this.populateAdditionalDetails(scoreCard, scoreCardDetailsDTO, "scorecard");
        this.updateReportees(scoreCard);
        this.scoreCardUtil.formatDates(scoreCard);
        ScoreCardResponseDTO response = this.scoreCardService.save(scoreCard);
        this.notification.saveNotification((Object)response.getCardDTO(), UserThreadLocal.getHeaders());
        return new ResponseEntity((Object)response, HttpStatus.OK);
    }

    @DeleteMapping(value={"/scorecard/{id}"})
    public ResponseEntity<ScoreCardResponseDTO> softDeleteScoreCard(@PathVariable long id) {
        ScoreCardResponseDTO cardResponseDTO = new ScoreCardResponseDTO();
        cardResponseDTO.setFlag(this.scoreCardService.deleteByScoreCardId(id));
        return new ResponseEntity((Object)cardResponseDTO, HttpStatus.OK);
    }

    private void populateAdditionalDetails(ScoreCardDTO scoreCard, ScoreCardDetailsDTO scoreCardDetailsDTO, String details) {
        EmployeeDTO employeeDTO = new EmployeeDTO();
        if (details.equals("scorecard")) {
            boolean flag;
            if (scoreCard.getCreatedBy() != 0L) {
                employeeDTO.setEmployeeId(scoreCard.getCreatedBy());
                scoreCard.getScoreCardValue().put("createdByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
            }
            if (scoreCard.getUpdatedBy() != 0L) {
                employeeDTO.setEmployeeId(scoreCard.getUpdatedBy());
                scoreCard.getScoreCardValue().put("updatedByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
            }
            if (scoreCard.getOwner() != 0L) {
                employeeDTO.setEmployeeId(scoreCard.getOwner());
                scoreCard.getScoreCardValue().put("ownerName", this.employeeService.getEmployee(employeeDTO).getFirstName());
            }
            boolean bl = flag = Objects.isNull(scoreCard.getScoreCardValue().get("perspectiveType")) || StringUtils.isEmpty((CharSequence)scoreCard.getScoreCardValue().get("perspectiveType").toString());
            if (flag) {
                if (scoreCard.getId() == 0L) {
                    scoreCard.getScoreCardValue().put("perspectiveType", scoreCard.getScoreCardValue().get("name"));
                } else {
                    Optional dbScoreCard = this.scoreCardService.findById(scoreCard.getId());
                    boolean exist = dbScoreCard.isPresent();
                    if (exist) {
                        Map mapObject = new ScoreCardDTO((ScoreCard)dbScoreCard.get(), false).getScoreCardValue();
                        scoreCard.getScoreCardValue().put("perspectiveType", mapObject.get("perspectiveType"));
                        scoreCard.setPerspectiveId(((ScoreCard)dbScoreCard.get()).getPerspectiveId());
                        scoreCard.setPerspectiveIdSeq(((ScoreCard)dbScoreCard.get()).getPerspectiveIdSeq());
                    }
                }
            }
        } else {
            if (scoreCardDetailsDTO.getCreatedBy() != 0L) {
                employeeDTO.setEmployeeId(scoreCardDetailsDTO.getCreatedBy());
                scoreCardDetailsDTO.getScoreCardDetailsValue().put("createdByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
            }
            if (scoreCardDetailsDTO.getUpdatedBy() != 0L) {
                employeeDTO.setEmployeeId(scoreCardDetailsDTO.getUpdatedBy());
                scoreCardDetailsDTO.getScoreCardDetailsValue().put("updatedByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
            }
            if (scoreCardDetailsDTO.getOwner() != 0L) {
                employeeDTO.setEmployeeId(scoreCardDetailsDTO.getOwner());
                scoreCardDetailsDTO.getScoreCardDetailsValue().put("ownerName", this.employeeService.getEmployee(employeeDTO).getFirstName());
            }
        }
    }

    private void updateReportees(ScoreCardDTO scoreCard) {
        this.kpiservice.updateCustomRepotee(scoreCard.getId(), scoreCard.isIncludeReportee(), scoreCard.getCustomReportees());
    }

    @GetMapping(value={"/scoreCardListByDate"})
    public ResponseEntity<List<ScoreCardDTO>> scoreCardListByDate(@RequestParam(value="detailsId", required=false) String detailsId, @RequestParam(value="loadFlag", required=false) String loadFlag, @RequestParam(value="dateRange", required=false) String dateRange) {
        List scoreCardList = null;
        boolean flag = loadFlag != null ? Boolean.valueOf(loadFlag) : true;
        scoreCardList = this.scoreCardService.scoreCardListByDate(Long.valueOf(detailsId).longValue(), flag, dateRange);
        return new ResponseEntity((Object)scoreCardList, HttpStatus.OK);
    }

    @GetMapping(value={"/scoreCardDetailsListByDate/{empId}"})
    public ResponseEntity<ScoreCardDetailsDTO> scoreCardDetailsListByDate(@PathVariable(value="empId") long empId, @RequestParam(value="pageId", required=false) String pageId, @RequestParam(value="loadFlag", required=false) String loadFlag, @RequestParam(value="dateRange", required=false) String dateRange) {
        boolean flag = loadFlag != null ? Boolean.valueOf(loadFlag) : true;
        return new ResponseEntity((Object)this.scoreCardDetailsService.scoreCardDetailsListByDate(empId, Long.valueOf(pageId).longValue(), flag, dateRange), HttpStatus.OK);
    }

    @GetMapping(value={"/scoreCardDetailsListByDatePageIds/{empId}"})
    public ResponseEntity<List<ScoreCardDetailsDTO>> scoreCardDetailsListByDatePageid(@PathVariable(value="empId") long empId, @RequestParam(value="pageId", required=false) String pageId, @RequestParam(value="loadFlag", required=false) String loadFlag, @RequestParam(value="dateRange", required=false) String dateRange) {
        List scoreCardDetailsDTO = null;
        boolean flag = loadFlag != null ? Boolean.valueOf(loadFlag) : true;
        String[] searchArray = new String[]{"%20", "%2520"};
        String[] replaceArray = new String[]{" ", " "};
        String result = StringUtils.replaceEach((String)pageId, (String[])searchArray, (String[])replaceArray);
        System.out.println("result == " + result);
        if (result != null && !result.isEmpty() && !result.equals("")) {
            scoreCardDetailsDTO = this.scoreCardDetailsService.scoreCardDetailsListByDatePageIds(empId, result, flag, dateRange);
        }
        System.out.println("scoreCardDetailsDTO :: " + scoreCardDetailsDTO);
        return new ResponseEntity((Object)scoreCardDetailsDTO, HttpStatus.OK);
    }

    @GetMapping(value={"/scoreCardDetailList/{empId}"})
    public ResponseEntity<ScoreCardDetailsDTO> scoreCardDetailList(@PathVariable(value="empId") long empId, @RequestParam(value="pageId", required=false) String pageId, @RequestParam(value="loadFlag", required=false) String loadFlag) {
        boolean flag = loadFlag != null ? Boolean.valueOf(loadFlag) : true;
        return new ResponseEntity((Object)this.scoreCardDetailsService.scoreCardList(empId, Long.valueOf(pageId).longValue(), flag), HttpStatus.OK);
    }

    @PostMapping(value={"/scorecardDetails"})
    public ResponseEntity<ScoreCardResponseDTO> saveScorecardDetails(@RequestBody ScoreCardDetailsDTO detailsDTO, ScoreCardDTO scoreCard) {
        this.populateAdditionalDetails(scoreCard, detailsDTO, "scorecarddetails");
        this.scoreCardUtil.formatDates(detailsDTO);
        detailsDTO.setCreatedTime(LocalDateTime.now());
        ScoreCardResponseDTO response = this.scoreCardDetailsService.save(detailsDTO);
        this.scoreCardService.updateCustomReportee(response.getCardDetailsDTO());
        this.pageService.updatePageName(response.getCardDetailsDTO().getPageId(), detailsDTO.getScorecardName());
        return new ResponseEntity((Object)response, HttpStatus.OK);
    }

    @PutMapping(value={"/scorecardDetails"})
    public ResponseEntity<ScoreCardResponseDTO> UpdateScorecardDetails(@RequestBody ScoreCardDetailsDTO detailsDTO, ScoreCardDTO scoreCard) {
        this.populateAdditionalDetails(scoreCard, detailsDTO, "scorecarddetails");
        this.scoreCardUtil.formatDates(detailsDTO);
        detailsDTO.setUpdatedTime(LocalDateTime.now());
        ScoreCardResponseDTO response = this.scoreCardDetailsService.save(detailsDTO);
        this.scoreCardService.updateCustomReportee(response.getCardDetailsDTO());
        this.pageService.updatePageName(response.getCardDetailsDTO().getPageId(), detailsDTO.getScorecardName());
        return new ResponseEntity((Object)response, HttpStatus.OK);
    }

    @GetMapping(value={"/checkScoreName/{empId}"})
    public ResponseEntity<Map<String, Object>> scoreName(@PathVariable(value="empId") long empId, @RequestParam(value="scorename", required=false) String scoreName, @RequestParam(value="pageId", required=false) String pageId) throws RequestException {
        HashMap<String, Object> mapvalue = new HashMap<String, Object>();
        Optional scoreCardDetails = this.scoreCardDetailsService.checkName(Long.valueOf(empId), scoreName, Long.valueOf(pageId));
        if (scoreCardDetails.isPresent()) {
            ScoreCardDetailsDTO cardDetailsDTO = new ScoreCardDetailsDTO((ScoreCardDetails)scoreCardDetails.get());
            mapvalue.put("detailsId", cardDetailsDTO.getId());
            mapvalue.put("success", "success");
            return new ResponseEntity(mapvalue, HttpStatus.OK);
        }
        mapvalue.put("failure", "failure");
        return new ResponseEntity(mapvalue, HttpStatus.OK);
    }

    @GetMapping(value={"/scoreCardDetailListByEmpId/{empId}"})
    public ResponseEntity<List<ScoreCardDetailsDTO>> scoreCardDetailListByEmpId(@PathVariable(value="empId") long empId) {
        return new ResponseEntity((Object)this.scoreCardDetailsService.scoreCardDetailList(empId, false), HttpStatus.OK);
    }

    @GetMapping(value={"/scoreCardDetailListPage/{pageId}"})
    public ResponseEntity<ScoreCardDetailsDTO> scoreCardDetailListPageId(@PathVariable(value="pageId") long pageId) {
        return new ResponseEntity((Object)this.scoreCardDetailsService.scoreCardDetailPage(pageId), HttpStatus.OK);
    }

    @GetMapping(value={"/scoreCardDetailListByDeptId/{deptId}"})
    public ResponseEntity<List<ScoreCardDetailsDTO>> scoreCardDetailListByDeptId(@PathVariable(value="deptId") long deptId) {
        return new ResponseEntity((Object)this.scoreCardDetailsService.scoreCardDetailListByDeptId(deptId, false), HttpStatus.OK);
    }

    @GetMapping(value={"/scoreCardDetailListAll"})
    public ResponseEntity<List<ScoreCardDetailsDTO>> scoreCardDetailListAll() {
        return new ResponseEntity((Object)this.scoreCardDetailsService.scoreCardDetailListAll(Boolean.valueOf(false)), HttpStatus.OK);
    }

    @GetMapping(value={"/checkscoreCardListByEmpId/{empId}"})
    public ResponseEntity<List<ScorecardList>> checkscoreCardListByEmpId(@PathVariable(value="empId") long empId) {
        return new ResponseEntity((Object)this.scoreCardDetailsService.checkscoreCardListByEmpId(empId, false), HttpStatus.OK);
    }

    @GetMapping(value={"/checkscoreCardListByDeptId"})
    public ResponseEntity<List<ScorecardList>> checkscoreCardListByDeptId() {
        return new ResponseEntity((Object)this.scoreCardDetailsService.checkscoreCardListByDeptId(), HttpStatus.OK);
    }

    @GetMapping(value={"/getcheckscoreCardListByDeptId"})
    public ResponseEntity<List<ScorecardList>> getcheckscoreCardListByDeptId(@RequestParam(value="deptIds", required=false) String deptIds) {
        String[] searchArray = new String[]{"%20", "%2520"};
        String[] replaceArray = new String[]{" ", " "};
        List scorecardList = null;
        String result = StringUtils.replaceEach((String)deptIds, (String[])searchArray, (String[])replaceArray);
        if (result != null && !result.isEmpty() && !result.equals("")) {
            scorecardList = this.scoreCardDetailsService.getcheckscoreCardListByDeptId(deptIds);
        }
        return new ResponseEntity(scorecardList, HttpStatus.OK);
    }

    @GetMapping(value={"/formScoreCardDetailList/{empId}"})
    public ResponseEntity<List<ScoreCardDetailsDTO>> formScoreCardDetailList(@PathVariable(value="empId") long empId) {
        return new ResponseEntity((Object)this.scoreCardDetailsService.formScoreCardDetailList(empId), HttpStatus.OK);
    }

    @GetMapping(value={"/scoreCardListFindScore/{empId}"})
    public ResponseEntity<List<ScoreCardDetailsDTO>> scoreCardDetailList(@PathVariable(value="empId") long empId, @RequestParam(value="dateRange", required=false) String dateRange) {
        boolean flag = false;
        return new ResponseEntity((Object)this.scoreCardDetailsService.scoreCardList(empId, flag, dateRange), HttpStatus.OK);
    }

    @GetMapping(value={"/setDate"})
    public ResponseEntity<String> scoreCardListByDate() {
        this.scoreCardService.saveScoreCardDetails();
        return new ResponseEntity((Object)"success", HttpStatus.OK);
    }

    @GetMapping(value={"/checkScoreCardData/{empId}"})
    public ResponseEntity<Map<String, String>> checkScoreCardData(@PathVariable(value="empId") long empId, @RequestParam(value="pageId", required=false) String pageId) throws RequestException {
        return new ResponseEntity((Object)this.scoreCardDetailsService.checkScoreCardData(empId, Long.valueOf(pageId).longValue()), HttpStatus.OK);
    }

    @PutMapping(value={"/changePerspectiveName"})
    public ResponseEntity<Map<String, Object>> changeScoreName(@RequestParam(value="scorecardId", required=false) String scorecardId, @RequestParam(value="name", required=false) String name) throws RequestException {
        System.out.println("scorecardId :: " + scorecardId);
        System.out.println("name :: " + name);
        String[] searchArray = new String[]{"%20", "%2520"};
        String[] replaceArray = new String[]{" ", " "};
        String newName = StringUtils.replaceEach((String)name, (String[])searchArray, (String[])replaceArray);
        HashMap<String, Object> mapvalue = new HashMap<String, Object>();
        Optional scoreCard = this.scoreCardService.findById(Long.valueOf(scorecardId).longValue());
        if (scoreCard.isPresent()) {
            ScoreCardDTO scoreCardDTO = new ScoreCardDTO((ScoreCard)scoreCard.get(), true);
            Map values = scoreCardDTO.getScoreCardValue();
            values.put("modifyName", newName);
            values.put("modifyeType", newName);
            ScoreCardResponseDTO response = this.scoreCardService.save(scoreCardDTO);
            if (response != null) {
                mapvalue.put("detailsId", response.getCardDTO().getId());
                mapvalue.put("success", "success");
                return new ResponseEntity(mapvalue, HttpStatus.OK);
            }
            mapvalue.put("failure", "failure");
        }
        return new ResponseEntity(mapvalue, HttpStatus.OK);
    }
}

