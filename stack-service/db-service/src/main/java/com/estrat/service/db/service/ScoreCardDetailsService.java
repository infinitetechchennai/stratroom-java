/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.Employee
 *  com.estrat.service.db.bean.po.DepartmentChartMapping
 *  com.estrat.service.db.bean.po.ScoreCardDetails
 *  com.estrat.service.db.dao.EmployeeDepartmentMappingRepository
 *  com.estrat.service.db.dao.PageRepository
 *  com.estrat.service.db.dao.ScoreCardDetailsRepository
 *  com.estrat.service.db.dto.DeptDetails
 *  com.estrat.service.db.dto.ScoreCardDetailsDTO
 *  com.estrat.service.db.dto.ScoreCardResponseDTO
 *  com.estrat.service.db.dto.ScorecardList
 *  com.estrat.service.db.repository.DepartmentChartMappingRepository
 *  com.estrat.service.db.repository.DeptMultipleOwnersMappingRepository
 *  com.estrat.service.db.resource.util.UserThreadLocal
 *  com.estrat.service.db.service.AuditDetailsService
 *  com.estrat.service.db.service.ControlPanelGeneralService
 *  com.estrat.service.db.service.DepartmentDetailsService
 *  com.estrat.service.db.service.EmployeeService
 *  com.estrat.service.db.service.ScoreCardDetailsService
 *  com.estrat.service.db.service.UserRoleManagementService
 *  com.google.common.base.Function
 *  com.google.common.collect.Lists
 *  com.google.common.primitives.Longs
 *  org.slf4j.Logger
 *  org.slf4j.LoggerFactory
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.service.db.service;

import com.estrat.service.db.bean.Employee;
import com.estrat.service.db.bean.po.DepartmentChartMapping;
import com.estrat.service.db.bean.po.ScoreCardDetails;
import com.estrat.service.db.dao.EmployeeDepartmentMappingRepository;
import com.estrat.service.db.dao.PageRepository;
import com.estrat.service.db.dao.ScoreCardDetailsRepository;
import com.estrat.service.db.dto.DeptDetails;
import com.estrat.service.db.dto.ScoreCardDetailsDTO;
import com.estrat.service.db.dto.ScoreCardResponseDTO;
import com.estrat.service.db.dto.ScorecardList;
import com.estrat.service.db.repository.DepartmentChartMappingRepository;
import com.estrat.service.db.repository.DeptMultipleOwnersMappingRepository;
import com.estrat.service.db.resource.util.UserThreadLocal;
import com.estrat.service.db.service.AuditDetailsService;
import com.estrat.service.db.service.ControlPanelGeneralService;
import com.estrat.service.db.service.DepartmentDetailsService;
import com.estrat.service.db.service.EmployeeService;
import com.estrat.service.db.service.UserRoleManagementService;
import com.google.common.base.Function;
import com.google.common.collect.Lists;
import com.google.common.primitives.Longs;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ScoreCardDetailsService {
    private Logger logger = LoggerFactory.getLogger(ScoreCardDetailsService.class);
    @Autowired
    private ScoreCardDetailsRepository scoreCardRepository;
    @Autowired
    private AuditDetailsService auditService;
    @Autowired
    private EmployeeDepartmentMappingRepository departmentMappingRepository;
    @Autowired
    private DepartmentDetailsService departmentDetailsService;
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private ControlPanelGeneralService controlPanelGeneralService;
    @Autowired
    private DeptMultipleOwnersMappingRepository deptMultipleOwnersMappingRepository;
    @Autowired
    private PageRepository pageRepository;
    @Autowired
    UserRoleManagementService userRoleManagement;
    @Autowired
    protected DepartmentChartMappingRepository departmentChartMapping;

    public Optional<ScoreCardDetails> findById(long id) {
        return this.scoreCardRepository.findByIdAndActive(Long.valueOf(id), 0);
    }

    public ScoreCardResponseDTO save(ScoreCardDetailsDTO scoreCard) {
        Boolean updateStatus = false;
        if (scoreCard.getId() != 0L) {
            updateStatus = true;
        }
        scoreCard.setCreatedTime(LocalDateTime.now());
        ScoreCardResponseDTO cardResponseDTO = new ScoreCardResponseDTO();
        cardResponseDTO.setFlag(true);
        ScoreCardDetails card = new ScoreCardDetails(scoreCard);
        ScoreCardDetailsDTO cardDetailsDTO = new ScoreCardDetailsDTO((ScoreCardDetails)this.scoreCardRepository.save(card));
        if (updateStatus.booleanValue()) {
            this.auditService.updateAudit("Scorecard", cardDetailsDTO.getId(), Long.valueOf(UserThreadLocal.get()).longValue(), "Scorecard Modified");
        }
        cardResponseDTO.setCardDetailsDTO(cardDetailsDTO);
        return cardResponseDTO;
    }

    public void update(Long pageId, String pageName, Long updatedBy) {
        ScoreCardDetails scoreCardDetails = this.scoreCardRepository.findByPageId(pageId.longValue(), 0);
        if (scoreCardDetails != null) {
            if (!scoreCardDetails.getScorecardName().equals(pageName)) {
                ScoreCardDetailsDTO scoreCardDetailsDTO = new ScoreCardDetailsDTO(scoreCardDetails);
                scoreCardDetailsDTO.setScorecardName(pageName);
                scoreCardDetailsDTO.setUpdatedBy(updatedBy.longValue());
                scoreCardDetailsDTO.setUpdatedTime(LocalDateTime.now());
                scoreCardDetailsDTO.getScoreCardDetailsValue().put("scoreCardName", pageName);
                ScoreCardDetailsDTO cardDetailsDTO = new ScoreCardDetailsDTO((ScoreCardDetails)this.scoreCardRepository.save(new ScoreCardDetails(scoreCardDetailsDTO)));
                this.auditService.updateAudit("Scorecard", cardDetailsDTO.getId(), cardDetailsDTO.getUpdatedBy(), "Scorecard Modified");
            } else {
                ScoreCardDetailsDTO scoreCardDetailsDTO = new ScoreCardDetailsDTO(scoreCardDetails);
                scoreCardDetailsDTO.setUpdatedBy(updatedBy.longValue());
                scoreCardDetailsDTO.setUpdatedTime(LocalDateTime.now());
                scoreCardDetailsDTO.getScoreCardDetailsValue().put("scoreCardName", pageName);
                ScoreCardDetailsDTO cardDetailsDTO = new ScoreCardDetailsDTO((ScoreCardDetails)this.scoreCardRepository.save(new ScoreCardDetails(scoreCardDetailsDTO)));
                this.auditService.updateAudit("Scorecard", cardDetailsDTO.getId(), cardDetailsDTO.getUpdatedBy(), "Scorecard Modified");
            }
        }
    }

    public ScoreCardDetailsDTO scoreCardDetailsListByDate(long empId, long pageId, boolean loadFlag, String dateRange) {
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
        ScoreCardDetails scoreCardDetails = this.scoreCardRepository.findAllByPageAnddeptIdByDate(0, pageId, firstDate, secondDate);
        ScoreCardDetailsDTO cardDetailsDTO = null;
        if (scoreCardDetails != null) {
            DeptDetails deptDetailsService = this.departmentDetailsService.findById(scoreCardDetails.getDepartmentId());
            cardDetailsDTO = new ScoreCardDetailsDTO(scoreCardDetails);
            cardDetailsDTO.setDepartmentName(deptDetailsService.getName());
        } else {
            cardDetailsDTO = new ScoreCardDetailsDTO();
        }
        return cardDetailsDTO;
    }

    public List<ScoreCardDetailsDTO> scoreCardDetailsListByDatePageIds(long empId, String pageId, boolean loadFlag, String dateRange) {
        List pagIds = Lists.transform(Arrays.asList(pageId.split("\\,")), (Function)Longs.stringConverter());
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
        System.out.println("pagIds == " + pagIds);
        List scoreCardDetails = this.scoreCardRepository.findAllByPageIdsAnddeptIdByDate(0, pagIds, firstDate, secondDate);
        ArrayList<ScoreCardDetailsDTO> detaillist = new ArrayList<ScoreCardDetailsDTO>();
        for (ScoreCardDetails scoreCardDet : scoreCardDetails) {
            ScoreCardDetailsDTO cardDetailsDTO = null;
            DeptDetails deptDetailsService = this.departmentDetailsService.findById(scoreCardDet.getDepartmentId());
            if (scoreCardDet != null) {
                cardDetailsDTO = new ScoreCardDetailsDTO(scoreCardDet);
                cardDetailsDTO.setDepartmentName(deptDetailsService.getName());
                detaillist.add(cardDetailsDTO);
                continue;
            }
            cardDetailsDTO = new ScoreCardDetailsDTO();
            cardDetailsDTO.setDepartmentName(deptDetailsService.getName());
            detaillist.add(cardDetailsDTO);
        }
        System.out.println("detaillist == " + detaillist);
        return detaillist;
    }

    public List<ScoreCardDetailsDTO> scoreCardList(long empId, boolean loadFlag, String dateRange) {
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
        List dbList = this.scoreCardRepository.findAllByEmpIdByDate(Long.valueOf(empId), 0, firstDate, secondDate);
        return dbList.stream().map(dbValue -> new ScoreCardDetailsDTO(dbValue, loadFlag)).collect(Collectors.toList());
    }

    public List<ScoreCardDetailsDTO> scoreCardList(long empId, boolean loadFlag) {
        List dbList = this.scoreCardRepository.findAllByEmpId(Long.valueOf(empId), 0);
        return dbList.stream().map(dbValue -> new ScoreCardDetailsDTO(dbValue)).collect(Collectors.toList());
    }

    public List<ScoreCardDetailsDTO> scoreCardDetailList(long empId, boolean loadFlag) {
        Employee emp = this.employeeService.getProfileDetails(empId);
        long deptId = 0L;
        if (emp.getDeptDetails() != null) {
            deptId = emp.getDeptDetails().getId();
        } else {
            Optional deptMultipleOwnersMapping = this.departmentChartMapping.findOwner(Long.valueOf(emp.getEmpId()), 0);
            if (deptMultipleOwnersMapping.isPresent()) {
                deptId = ((DepartmentChartMapping)deptMultipleOwnersMapping.get()).getDeptId();
            }
        }
        System.out.println("score deptid :: " + deptId);
        List dbList = this.scoreCardRepository.scoreCardDetailListByDeptId(Long.valueOf(deptId), 0);
        return dbList.stream().map(dbValue -> new ScoreCardDetailsDTO(dbValue, loadFlag)).collect(Collectors.toList());
    }

    public ScoreCardDetailsDTO scoreCardDetailPage(long pageId) {
        ScoreCardDetails scoreCardDetails = this.scoreCardRepository.findAllByPageId(pageId);
        if (scoreCardDetails != null && Objects.isNull(scoreCardDetails.getDepartmentId()) && scoreCardDetails.getPageId().getDeptId() != null) {
            scoreCardDetails.setDepartmentId(scoreCardDetails.getPageId().getDeptId());
        }
        return new ScoreCardDetailsDTO(scoreCardDetails);
    }

    public List<ScoreCardDetailsDTO> scoreCardDetailListByDeptId(long deptId, boolean loadFlag) {
        List dbList = this.scoreCardRepository.scoreCardDetailListByDeptId(Long.valueOf(deptId), 0);
        return dbList.stream().map(dbValue -> new ScoreCardDetailsDTO(dbValue, loadFlag)).collect(Collectors.toList());
    }

    public List<ScoreCardDetailsDTO> scoreCardDetailListAll(Boolean loadFlag) {
        List dbList = this.scoreCardRepository.findByAll(0);
        return dbList.stream().map(dbValue -> new ScoreCardDetailsDTO(dbValue, loadFlag.booleanValue())).collect(Collectors.toList());
    }

    public List<ScorecardList> checkscoreCardListByEmpId(long empId, boolean loadFlag) {
        List employees = this.employeeService.getAllReporteeList(empId);
        List empList = employees.stream().map(val -> val.getEmpId()).collect(Collectors.toList());
        List dbList = this.scoreCardRepository.scoreCardListByEmpId(empList, 0);
        return dbList.stream().map(dbValue -> new ScorecardList(dbValue, false)).collect(Collectors.toList());
    }

    public List<ScorecardList> checkscoreCardListByDeptId() {
        List deptDetails = this.departmentDetailsService.childList();
        List deptList = deptDetails.stream().map(val -> val.getId()).collect(Collectors.toList());
        List dbList = this.scoreCardRepository.scoreCardListByDeptId(deptList, 0);
        return dbList.stream().map(dbValue -> new ScorecardList(dbValue, true)).collect(Collectors.toList());
    }

    public List<ScorecardList> getcheckscoreCardListByDeptId(String deptIds) {
        List deptIdList = Arrays.stream(deptIds.split(",")).map(Long::valueOf).collect(Collectors.toList());
        List dbList = this.scoreCardRepository.scoreCardListByDeptId(deptIdList, 0);
        return dbList.stream().map(dbValue -> new ScorecardList(dbValue, true)).collect(Collectors.toList());
    }

    public ScoreCardDetailsDTO scoreCardList(long empId, long pageId, boolean loadFlag) {
        ScoreCardDetails dbList = this.scoreCardRepository.findAllByPageAndDept(0, pageId);
        ScoreCardDetailsDTO cardDetailsDTO = null;
        cardDetailsDTO = dbList != null ? new ScoreCardDetailsDTO(dbList) : new ScoreCardDetailsDTO();
        return cardDetailsDTO;
    }

    public Optional<ScoreCardDetails> checkName(Long empId, String name, Long pageId) {
        return this.scoreCardRepository.checkName(empId, 0, pageId.longValue());
    }

    public void deleteScoreCardDetailsByPageId(long pageId) {
        ScoreCardDetails scoreCardDetails = this.scoreCardRepository.findAllByPageId(pageId);
        if (scoreCardDetails != null) {
            this.scoreCardRepository.delete((Object)scoreCardDetails);
        }
    }

    public String getDefaultPageUrl(long pageId, long owner) {
        ScoreCardDetails scoreCardDetails = this.scoreCardRepository.findAllByPageIdAndOwner(pageId, owner);
        if (scoreCardDetails != null) {
            return String.join((CharSequence)"?pageId=", "dashboard/" + scoreCardDetails.getCreatedBy(), String.valueOf(scoreCardDetails.getPageId().getId()));
        }
        return "";
    }

    public String getDefaultPageUrlByDept(long pageId, long deptId) {
        ScoreCardDetails scoreCardDetails = this.scoreCardRepository.findAllByPageIdANDDeptId(pageId, deptId);
        if (scoreCardDetails != null) {
            return String.join((CharSequence)"?pageId=", "dashboard/" + scoreCardDetails.getCreatedBy(), String.valueOf(scoreCardDetails.getPageId().getId()));
        }
        return "";
    }

    public List<ScoreCardDetailsDTO> formScoreCardDetailList(long empId) {
        List dbList = null;
        Employee employee = this.employeeService.getProfileDetails(empId);
        dbList = this.scoreCardRepository.findAllByPageIds(this.pageRepository.findAll(Long.valueOf(empId)), 0);
        if (!dbList.isEmpty()) {
            return dbList.stream().map(dbValue -> new ScoreCardDetailsDTO(dbValue, false)).collect(Collectors.toList());
        }
        return new ArrayList<ScoreCardDetailsDTO>();
    }

    public Map<String, String> checkScoreCardData(long empId, long pageId) {
        HashMap<String, String> stringMap = new HashMap<String, String>();
        ScoreCardDetails dbList = this.scoreCardRepository.findAllByPageAndEmpId(Long.valueOf(empId), 0, pageId);
        ScoreCardDetailsDTO cardDetailsDTO = null;
        cardDetailsDTO = dbList != null ? new ScoreCardDetailsDTO(dbList) : new ScoreCardDetailsDTO();
        if (cardDetailsDTO.getScoreCardDTOS().isEmpty()) {
            stringMap.put("ScorePage", "notPresent");
            stringMap.put("ScorePageName", cardDetailsDTO.getScorecardName());
        } else {
            stringMap.put("ScorePage", "Present");
            stringMap.put("ScorePageName", cardDetailsDTO.getScorecardName());
        }
        return stringMap;
    }
}

