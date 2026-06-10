/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.DepartmentChartMapping
 *  com.estrat.backend.db.bean.po.ImpactSurvay
 *  com.estrat.backend.db.dao.ImpactDataRepository
 *  com.estrat.backend.db.dao.ImpactSurvayRepository
 *  com.estrat.backend.db.dto.ImpactCrticalCountDTO
 *  com.estrat.backend.db.dto.ImpactDataDto
 *  com.estrat.backend.db.dto.ImpactSurvayDto
 *  com.estrat.backend.db.repository.DepartmentChartMappingRepository
 *  com.estrat.backend.db.resource.util.DateUtil
 *  com.estrat.backend.db.resource.util.UserThreadLocal
 *  com.estrat.backend.db.service.ImpactSurvayService
 *  com.google.common.base.Function
 *  com.google.common.collect.Lists
 *  com.google.common.primitives.Longs
 *  org.apache.commons.lang3.StringUtils
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.backend.db.service;

import com.estrat.backend.db.bean.po.DepartmentChartMapping;
import com.estrat.backend.db.bean.po.ImpactSurvay;
import com.estrat.backend.db.dao.ImpactDataRepository;
import com.estrat.backend.db.dao.ImpactSurvayRepository;
import com.estrat.backend.db.dto.ImpactCrticalCountDTO;
import com.estrat.backend.db.dto.ImpactDataDto;
import com.estrat.backend.db.dto.ImpactSurvayDto;
import com.estrat.backend.db.repository.DepartmentChartMappingRepository;
import com.estrat.backend.db.resource.util.DateUtil;
import com.estrat.backend.db.resource.util.UserThreadLocal;
import com.google.common.collect.Lists;
import com.google.common.primitives.Longs;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ImpactSurvayService {
    @Autowired
    ImpactSurvayRepository impactSurvayRepository;
    @Autowired
    ImpactDataRepository impactDataRepository;
    @Autowired
    protected DepartmentChartMappingRepository deptMappingDetailRepository;
    @Autowired
    protected DateUtil dateUtil;

    public ImpactSurvayDto saveImpact(ImpactSurvay impactSurvay) {
        ImpactSurvay iSurvay = (ImpactSurvay)this.impactSurvayRepository.save(impactSurvay);
        ImpactSurvayDto saveImpact = new ImpactSurvayDto(iSurvay);
        return saveImpact;
    }

    public List<ImpactSurvayDto> findAllImpact() {
        List<ImpactSurvay> impactList = this.impactSurvayRepository.findAll();
        List<ImpactSurvayDto> impactSurvayDtoList = impactList.stream().map(dbValue -> {
            ImpactSurvayDto impactSurvayDto = new ImpactSurvayDto(dbValue);
            return impactSurvayDto;
        }).collect(Collectors.toList());
        return impactSurvayDtoList;
    }

    public Optional<ImpactSurvay> findImpactById(long id) {
        return this.impactSurvayRepository.findById(id);
    }

    public void delete(ImpactSurvay impactSurvay) {
        this.impactSurvayRepository.delete(impactSurvay);
    }

    public List<ImpactSurvayDto> findAllImpactByEmpId(Long empId) {
        ArrayList<ImpactSurvayDto> impList = new ArrayList<ImpactSurvayDto>();
        List<ImpactSurvay> impactTableList = this.impactSurvayRepository.findAllByEmpId(empId);
        for (ImpactSurvay impactSurvay : impactTableList) {
            ImpactSurvayDto impTableDto = new ImpactSurvayDto(impactSurvay);
            impList.add(impTableDto);
        }
        return impList;
    }

    public List<ImpactSurvayDto> findAllByPageId(long pageId, String dateRange) {
        ArrayList<ImpactSurvayDto> impPageList = new ArrayList<ImpactSurvayDto>();
        List<ImpactSurvay> impactTableList = null;
        if (Objects.isNull(dateRange)) {
            dateRange = UserThreadLocal.get((String)"DATE_PERIOD");
        }
        System.out.println("Date Range in Rpo :" + dateRange);
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
            impactTableList = this.impactSurvayRepository.findAllByPageANDDate(Long.valueOf(pageId), this.dateUtil.getFirstDateTime(firstDate), this.dateUtil.getSecondDateTime(secondDate));
        } else {
            impactTableList = this.impactSurvayRepository.findAllByPageId(Long.valueOf(pageId));
        }
        for (ImpactSurvay impactSurvay : impactTableList) {
            ImpactSurvayDto impTableDto = new ImpactSurvayDto(impactSurvay);
            impPageList.add(impTableDto);
        }
        return impPageList;
    }

    public List<ImpactSurvayDto> allImpactListData(String empId, String pageId) {
        ArrayList<ImpactSurvayDto> impactDtoList = new ArrayList<ImpactSurvayDto>();
        List<ImpactSurvay> impList = null;
        impList = pageId != null || !pageId.isEmpty() ? this.impactSurvayRepository.findAllByPageId(Long.valueOf(Long.parseLong(pageId))) : this.impactSurvayRepository.findAllByEmpId(Long.valueOf(Long.parseLong(empId)));
        for (ImpactSurvay impactSurvay : impList) {
            ImpactSurvayDto impTableDto = new ImpactSurvayDto(impactSurvay);
            if (impTableDto.getDepartmentId() != 0L) {
                DepartmentChartMapping deptData = this.deptMappingDetailRepository.getOne(Long.valueOf(impTableDto.getDepartmentId()));
                impTableDto.setDeptUniqueID(deptData.getDeptName());
            }
            impactDtoList.add(impTableDto);
        }
        return impactDtoList;
    }

    public List<ImpactSurvayDto> findimpactSurvayListDept(String deptIds) {
        List<ImpactSurvay> riskDeptList = this.impactSurvayRepository.findAllByDeptIds(Lists.transform(Arrays.asList(deptIds.split("\\,")), Longs.stringConverter()));
        ArrayList<ImpactSurvayDto> impactDtoList = new ArrayList<ImpactSurvayDto>();
        if (!riskDeptList.isEmpty() && riskDeptList != null) {
            riskDeptList.stream().map(dbValue -> {
                ImpactSurvayDto impactDTO = new ImpactSurvayDto(dbValue);
                if (dbValue.getPageId() != null) {
                    impactDTO.setPageName(dbValue.getPageId().getPageName());
                }
                impactDtoList.add(impactDTO);
                return impactDTO;
            }).collect(Collectors.toList());
        }
        return impactDtoList;
    }

    public List<ImpactCrticalCountDTO> findImpactCriticalCountList(String pageIds, String dateRange) {
        List<ImpactSurvay> dbList = null;
        if (Objects.isNull(dateRange)) {
            dateRange = UserThreadLocal.get((String)"DATE_PERIOD");
        }
        System.out.println("Date Range in Rpo :" + dateRange);
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
            dbList = this.impactSurvayRepository.findAllByImpactPageIds(Lists.transform(Arrays.asList(pageIds.split("\\,")), Longs.stringConverter()), this.dateUtil.getFirstDateTime(firstDate), this.dateUtil.getSecondDateTime(secondDate));
        }
        List<ImpactSurvayDto> impactList = dbList.stream().map(dbValue -> {
            ImpactSurvayDto impactDto = new ImpactSurvayDto(dbValue);
            return impactDto;
        }).collect(Collectors.toList());
        HashMap<Long, ImpactCrticalCountDTO> departmentMap = new HashMap<Long, ImpactCrticalCountDTO>();
        for (ImpactSurvayDto impact : impactList) {
            Long departmentId = 0L;
            String departmentName = null;
            if (impact.getDepartmentId() != 0L) {
                departmentId = impact.getDepartmentId();
                DepartmentChartMapping deptData = this.deptMappingDetailRepository.getOne(Long.valueOf(impact.getDepartmentId()));
                departmentName = deptData.getDeptName();
            }
            ImpactCrticalCountDTO impactCritical = departmentMap.getOrDefault(departmentId, new ImpactCrticalCountDTO());
            impactCritical.setId(departmentId);
            impactCritical.setDepartmentName(departmentName);
            ArrayList<String> processList = new ArrayList<String>();
            processList.add(impact.getProcess().toString());
            HashMap<String, Integer> highestValues = new HashMap<String, Integer>();
            highestValues.put("ls2Hours", Integer.MIN_VALUE);
            highestValues.put("ls3Hours", Integer.MIN_VALUE);
            highestValues.put("ls4Hours", Integer.MIN_VALUE);
            highestValues.put("ls5Hours", Integer.MIN_VALUE);
            highestValues.put("ls6Hours", Integer.MIN_VALUE);
            highestValues.put("ls8Hours", Integer.MIN_VALUE);
            List<ImpactDataDto> impactDataList = impact.getImpactData();
            for (ImpactDataDto impactData : impactDataList) {
                Map<String, String> hoursDaysMonths = impactData.getHoursDaysMonths();
                if (hoursDaysMonths == null) continue;
                for (String key : highestValues.keySet()) {
                    int value;
                    String valueStr = (String)hoursDaysMonths.get(key);
                    if (valueStr == null || valueStr.isEmpty() || (value = Integer.parseInt(valueStr)) <= (Integer)highestValues.get(key)) continue;
                    highestValues.put(key, value);
                }
            }
            boolean anyGreaterThan4 = false;
            for (Map.Entry<String, Integer> entry : highestValues.entrySet()) {
                int value = (Integer)entry.getValue();
                if (value < 4) continue;
                anyGreaterThan4 = true;
                break;
            }
            if (anyGreaterThan4) {
                impactCritical.setCritical(impactCritical.getCritical() + 1);
            } else {
                impactCritical.setNonCritical(impactCritical.getNonCritical() + 1);
            }
            impactCritical.setProcessCount(impactCritical.getProcessCount() + 1);
            departmentMap.put(departmentId, impactCritical);
        }
        System.out.println("departmentMap critical Counts :: " + departmentMap);
        ArrayList<ImpactCrticalCountDTO> impactCriticalLists = new ArrayList<ImpactCrticalCountDTO>();
        for (ImpactCrticalCountDTO impactData : departmentMap.values()) {
            ImpactCrticalCountDTO impactCritical = new ImpactCrticalCountDTO();
            double critical = impactData.getCritical();
            double processCount = impactData.getProcessCount();
            double nonCritical = impactData.getNonCritical();
            double criticalPercentage = critical / processCount * 100.0;
            double nonCriticalPercentage = nonCritical / processCount * 100.0;
            System.out.println("critical :: " + critical + " processCount :: " + processCount + " nonCritical :: " + nonCritical + " == criticalPercentage-- " + criticalPercentage + "--nonCriticalPercentage-- " + nonCriticalPercentage);
            impactCritical.setCriticalPercentage(criticalPercentage);
            impactCritical.setNonCriticalPercentage(nonCriticalPercentage);
            impactCritical.setId(impactData.getId());
            impactCritical.setDepartmentName(impactData.getDepartmentName());
            impactCritical.setCritical(impactData.getCritical());
            impactCritical.setNonCritical(impactData.getNonCritical());
            impactCritical.setProcessCount(impactData.getProcessCount());
            impactCriticalLists.add(impactCritical);
        }
        return impactCriticalLists;
    }
}

