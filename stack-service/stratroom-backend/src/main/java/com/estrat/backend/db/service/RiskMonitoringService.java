/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.DepartmentChartMapping
 *  com.estrat.backend.db.bean.po.RiskDetails
 *  com.estrat.backend.db.bean.po.RiskPlan
 *  com.estrat.backend.db.cache.DBCache
 *  com.estrat.backend.db.dao.RiskDetailsRepository
 *  com.estrat.backend.db.dao.RiskPlanHistoryRepository
 *  com.estrat.backend.db.dao.RiskPlanMappingRepository
 *  com.estrat.backend.db.dao.RiskPlanRepository
 *  com.estrat.backend.db.dto.RiskDTO
 *  com.estrat.backend.db.dto.RiskMonitoringDTO
 *  com.estrat.backend.db.dto.RiskResponseDTO
 *  com.estrat.backend.db.repository.DepartmentChartMappingRepository
 *  com.estrat.backend.db.resource.util.DateUtil
 *  com.estrat.backend.db.resource.util.RiskUtil
 *  com.estrat.backend.db.resource.util.UserThreadLocal
 *  com.estrat.backend.db.service.EmployeeService
 *  com.estrat.backend.db.service.RiskDetailsService
 *  com.estrat.backend.db.service.RiskMonitoringService
 *  com.google.common.base.Function
 *  com.google.common.collect.Lists
 *  com.google.common.primitives.Longs
 *  org.apache.commons.lang3.StringUtils
 *  org.apache.log4j.Logger
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.backend.db.service;

import com.estrat.backend.db.bean.po.DepartmentChartMapping;
import com.estrat.backend.db.bean.po.RiskDetails;
import com.estrat.backend.db.bean.po.RiskPlan;
import com.estrat.backend.db.bean.po.RiskPlanHistory;
import com.estrat.backend.db.cache.DBCache;
import com.estrat.backend.db.dao.RiskDetailsRepository;
import com.estrat.backend.db.dao.RiskPlanHistoryRepository;
import com.estrat.backend.db.dao.RiskPlanMappingRepository;
import com.estrat.backend.db.dao.RiskPlanRepository;
import com.estrat.backend.db.dto.RiskDTO;
import com.estrat.backend.db.dto.RiskMonitoringDTO;
import com.estrat.backend.db.dto.RiskResponseDTO;
import com.estrat.backend.db.repository.DepartmentChartMappingRepository;
import com.estrat.backend.db.resource.util.DateUtil;
import com.estrat.backend.db.resource.util.RiskUtil;
import com.estrat.backend.db.resource.util.UserThreadLocal;
import com.estrat.backend.db.service.EmployeeService;
import com.estrat.backend.db.service.RiskDetailsService;
import com.google.common.base.Function;
import com.google.common.collect.Lists;
import com.google.common.primitives.Longs;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RiskMonitoringService {
    private Logger log = LoggerFactory.getLogger(RiskMonitoringService.class);
    @Autowired
    private DBCache dbCache;
    @Autowired
    protected RiskPlanRepository riskPlanRepository;
    @Autowired
    protected EmployeeService employeeService;
    @Autowired
    protected RiskPlanMappingRepository planMappingRepository;
    @Autowired
    protected RiskDetailsRepository riskDetailsRepository;
    @Autowired
    protected DepartmentChartMappingRepository deptMappingDetailRepository;
    @Autowired
    protected RiskDetailsService riskDetailsService;
    @Autowired
    private RiskUtil riskUtil;
    @Autowired
    protected DateUtil dateUtil;
    @Autowired
    private RiskPlanHistoryRepository historyRepository;

    public Optional<RiskPlan> findById(long id) {
        return this.riskPlanRepository.findById(id);
    }

    public List<RiskMonitoringDTO> findAll(long empId) {
        if (this.dbCache.get((Object)("retrieveRiskMonitoringByEmpId" + empId), "dbCache") != null) {
            this.log.debug("retrieveRiskMonitoringByEmpId populated from cache");
            return (List)this.dbCache.get((Object)("retrieveRiskMonitoringByEmpId" + empId), "dbCache");
        }
        List<RiskPlan> dbList = this.riskPlanRepository.findAllByEmpIdANDTypeFlag(Long.valueOf(empId), 0, "RiskMonitoring");
        List<RiskMonitoringDTO> riskList = dbList.stream().map(dbValue -> new RiskMonitoringDTO(dbValue, Boolean.valueOf(true))).collect(Collectors.toList());
        this.dbCache.put((Object)("retrieveRiskMonitoringByEmpId" + empId), riskList, "dbCache");
        return riskList;
    }

    public List<RiskMonitoringDTO> findAllByRiskDetailsId(Long riskId) {
        List<RiskPlan> dbList = this.riskPlanRepository.findAllByRiskDetailsIdANDTypeFlag(riskId, "RiskMonitoring");
        List<RiskMonitoringDTO> riskList = dbList.stream().map(dbValue -> new RiskMonitoringDTO(dbValue, Boolean.valueOf(true))).collect(Collectors.toList());
        return riskList;
    }

    public List<RiskMonitoringDTO> findAllByRiskVerson(Long riskId, Long version) {
        List<RiskPlanHistory> dbList = this.historyRepository.findByRiskIdAndVersion(riskId, version, "RiskMonitoring");
        List<RiskMonitoringDTO> riskList = dbList.stream().map(dbValue -> new RiskMonitoringDTO(dbValue)).collect(Collectors.toList());
        return riskList;
    }

    public RiskResponseDTO delete(long id) {
        RiskResponseDTO riskResponseDTO = new RiskResponseDTO();
        Optional riskPlan = this.riskPlanRepository.findById(id);
        if (riskPlan.isPresent()) {
            RiskPlan riskPlan1 = (RiskPlan)riskPlan.get();
            riskPlan1.setActive(1);
            this.riskPlanRepository.save(riskPlan1);
            riskResponseDTO.setFlag(true);
            this.dbCache.remove((Object)("retrieveRiskMonitoringByEmpId" + UserThreadLocal.get()), "dbCache");
            this.dbCache.remove((Object)("retrieveRiskMonitoringByRiskId" + riskPlan1.getRiskId().getId()), "dbCache");
            this.dbCache.remove((Object)("retrieveRiskMonitoringByEmpId" + UserThreadLocal.get()), "dbCache");
        }
        return riskResponseDTO;
    }

    public List<RiskMonitoringDTO> findAllByEmpIds(long empId) {
        List childs = this.employeeService.getReporteeListId(empId);
        childs.add(empId);
        List<RiskPlan> dbList = this.riskPlanRepository.findAllByEmpId(childs, 0, "RiskMonitoring");
        ArrayList<RiskMonitoringDTO> posList = new ArrayList<RiskMonitoringDTO>();
        for (RiskPlan riskPlan : dbList) {
            RiskMonitoringDTO riskMonitorDTO = new RiskMonitoringDTO(riskPlan, Boolean.valueOf(false));
            Optional riskDetails = this.riskDetailsRepository.findById(riskPlan.getRiskId().getId());
            RiskDTO riskDto = new RiskDTO((RiskDetails)riskDetails.get(), false);
            DepartmentChartMapping deptData = this.deptMappingDetailRepository.getOne(riskDto.getDepartmentId());
            riskMonitorDTO.getRiskMonitoringValue().put("departmentName", deptData.getDeptName());
            riskMonitorDTO.getRiskMonitoringValue().put("riskName", riskDto.getRiskValue().get("name").toString());
            posList.add(riskMonitorDTO);
        }
        return posList;
    }

    public List<RiskMonitoringDTO> findAllByRiskIDList(String riskIds, String dateRange) {
        Collection<RiskPlan> dbList = null;
        ArrayList<RiskMonitoringDTO> rList = new ArrayList<RiskMonitoringDTO>();
        if (Objects.isNull(dateRange)) {
            dateRange = UserThreadLocal.get((String)"DATE_PERIOD");
        }
        System.out.println("Date Range in RiskMonitor :" + dateRange);
        if (StringUtils.isNotEmpty((CharSequence)dateRange)) {
            Date firstDate = null;
            Date secondDate = null;
            String[] dataRanges = null;
            String cleanedDateRange = dateRange.replace("%20", "").replace("%2520", "");
            if (Objects.nonNull(dateRange)) {
                String[] stringArray = dataRanges = cleanedDateRange.contains("-") ? cleanedDateRange.split("-") : cleanedDateRange.split(",");
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
            dbList = this.riskPlanRepository.findAllByRiskIds(Lists.transform(Arrays.asList(riskIds.split("\\,")), (Function)Longs.stringConverter()), "RiskMonitoring", this.dateUtil.getFirstDateTime(firstDate), this.dateUtil.getSecondDateTime(secondDate));
        }
        List riskMonitoringList = dbList.stream().map(dbValue -> {
            RiskMonitoringDTO riskMonitorDTO = new RiskMonitoringDTO(dbValue, Boolean.valueOf(false));
            Optional riskDetails = this.riskDetailsRepository.findById(dbValue.getRiskId().getId());
            RiskDTO riskDto = new RiskDTO((RiskDetails)riskDetails.get(), false);
            DepartmentChartMapping deptData = this.deptMappingDetailRepository.getOne(riskDto.getDepartmentId());
            riskMonitorDTO.getRiskMonitoringValue().put("departmentName", deptData.getDeptName());
            riskMonitorDTO.getRiskMonitoringValue().put("riskName", riskDto.getRiskValue().get("name").toString());
            rList.add(riskMonitorDTO);
            return riskMonitorDTO;
        }).collect(Collectors.toList());
        return rList;
    }

    public List<RiskDTO> findRiskMonitorIdListDept(String deptIds) {
        List<RiskDetails> riskDeptList = this.riskDetailsRepository.findAllByDeptIds(Lists.transform(Arrays.asList(deptIds.split("\\,")), (Function)Longs.stringConverter()), 0);
        ArrayList<RiskDTO> riskDtoList = new ArrayList<RiskDTO>();
        if (!riskDeptList.isEmpty() && riskDeptList != null) {
            List list = riskDeptList.stream().map(dbValue -> {
                RiskDTO riskDTO = new RiskDTO(dbValue, false);
                riskDTO.setPageName(dbValue.getPageId().getPageName());
                riskDtoList.add(riskDTO);
                return riskDTO;
            }).collect(Collectors.toList());
        }
        return riskDtoList;
    }
}

