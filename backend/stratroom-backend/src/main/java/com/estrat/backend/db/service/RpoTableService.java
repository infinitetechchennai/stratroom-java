/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.DepartmentChartMapping
 *  com.estrat.backend.db.bean.po.RpoTable
 *  com.estrat.backend.db.dao.RpoTableRepository
 *  com.estrat.backend.db.dto.EmployeeDTO
 *  com.estrat.backend.db.dto.RpoTableDto
 *  com.estrat.backend.db.repository.DepartmentChartMappingRepository
 *  com.estrat.backend.db.resource.util.DateUtil
 *  com.estrat.backend.db.resource.util.UserThreadLocal
 *  com.estrat.backend.db.service.EmployeeService
 *  com.estrat.backend.db.service.RpoTableService
 *  com.google.common.base.Function
 *  com.google.common.collect.Lists
 *  com.google.common.primitives.Longs
 *  org.apache.commons.lang3.StringUtils
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.backend.db.service;

import com.estrat.backend.db.bean.po.DepartmentChartMapping;
import com.estrat.backend.db.bean.po.RpoTable;
import com.estrat.backend.db.dao.RpoTableRepository;
import com.estrat.backend.db.dto.EmployeeDTO;
import com.estrat.backend.db.dto.RpoTableDto;
import com.estrat.backend.db.repository.DepartmentChartMappingRepository;
import com.estrat.backend.db.resource.util.DateUtil;
import com.estrat.backend.db.resource.util.UserThreadLocal;
import com.estrat.backend.db.service.EmployeeService;
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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RpoTableService {
    @Autowired
    RpoTableRepository rpoTableRepository;
    @Autowired
    protected EmployeeService employeeService;
    @Autowired
    protected DepartmentChartMappingRepository deptMappingDetailRepository;
    @Autowired
    protected DateUtil dateUtil;

    public RpoTableDto saveRpoTable(RpoTable rpoTable) {
        RpoTable rpo = (RpoTable)this.rpoTableRepository.save(rpoTable);
        RpoTableDto rpoDto = new RpoTableDto(rpo);
        return rpoDto;
    }

    public List<RpoTableDto> findAllRpo() {
        ArrayList<RpoTableDto> rpoList = new ArrayList<RpoTableDto>();
        List<RpoTable> rpoTableList = this.rpoTableRepository.findAll();
        for (RpoTable rpoTable : rpoTableList) {
            RpoTableDto rpoDto = new RpoTableDto(rpoTable);
            rpoList.add(rpoDto);
        }
        return rpoList;
    }

    public Optional<RpoTable> findRpoById(long id) {
        return this.rpoTableRepository.findById(id);
    }

    public void delete(RpoTable rpoTable) {
        this.rpoTableRepository.delete(rpoTable);
    }

    public List<RpoTableDto> findAllRpoByEmpId(Long empId) {
        ArrayList<RpoTableDto> rpoList = new ArrayList<RpoTableDto>();
        List<RpoTable> rpoTableList = this.rpoTableRepository.findAllByEmpId(empId);
        for (RpoTable rpoTable : rpoTableList) {
            RpoTableDto rpoTableDto = new RpoTableDto(rpoTable);
            rpoList.add(rpoTableDto);
        }
        return rpoList;
    }

    public List<RpoTableDto> findAllByPageId(long pageId, String dateRange, String status) {
        ArrayList<RpoTableDto> rpoList = new ArrayList<RpoTableDto>();
        List<RpoTable> eventlist = null;
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
            eventlist = status != null && status.equalsIgnoreCase("DRAFT") ? this.rpoTableRepository.findAllByPageANDDate(Long.valueOf(pageId), this.dateUtil.getFirstDateTime(firstDate), this.dateUtil.getSecondDateTime(secondDate), status) : this.rpoTableRepository.findAllByPageANDDateNoDraft(Long.valueOf(pageId), this.dateUtil.getFirstDateTime(firstDate), this.dateUtil.getSecondDateTime(secondDate));
        } else {
            eventlist = this.rpoTableRepository.findAllByPageId(Long.valueOf(pageId));
        }
        for (RpoTable rpoTable : eventlist) {
            RpoTableDto rpoTableDto = new RpoTableDto(rpoTable);
            rpoList.add(rpoTableDto);
        }
        return rpoList;
    }

    public List<RpoTableDto> findAllByRPOEmpIds(long empId) {
        List<Long> childs = this.employeeService.getReporteeListId(empId);
        childs.add(empId);
        List<RpoTable> dbList = this.rpoTableRepository.findAllByEmpIds(childs);
        List<RpoTableDto> rpoList = dbList.stream().map(dbValue -> {
            RpoTableDto rpoTableDto = new RpoTableDto(dbValue);
            if (!rpoTableDto.getRpoValues().containsKey("departmentName")) {
                if (rpoTableDto.getDeptId() != 0L) {
                    DepartmentChartMapping deptData = this.deptMappingDetailRepository.getOne(Long.valueOf(rpoTableDto.getDeptId()));
                    rpoTableDto.getRpoValues().put("departmentName", deptData.getDeptName());
                } else {
                    EmployeeDTO employeeDTO = new EmployeeDTO();
                    if (rpoTableDto.getCreateBy() != 0L) {
                        employeeDTO.setEmployeeId(rpoTableDto.getCreateBy());
                        rpoTableDto.setDeptId(this.employeeService.getEmployee(employeeDTO).getDeptDetails().getId());
                        rpoTableDto.getRpoValues().put("departmentName", this.employeeService.getEmployee(employeeDTO).getDeptDetails().getName());
                    }
                }
            }
            return rpoTableDto;
        }).collect(Collectors.toList());
        return rpoList;
    }

    public List<RpoTableDto> findAllByRPOIDList(String pageIds, String dateRange) {
        Collection<RpoTable> dbList = null;
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
            dbList = this.rpoTableRepository.findAllByRpoPageIds(Lists.transform(Arrays.asList(pageIds.split("\\,")), Longs.stringConverter()), this.dateUtil.getFirstDateTime(firstDate), this.dateUtil.getSecondDateTime(secondDate));
        }
        List<RpoTableDto> rpoList = dbList.stream().map(dbValue -> {
            RpoTableDto rpoTableDto = new RpoTableDto(dbValue);
            if (!rpoTableDto.getRpoValues().containsKey("departmentName")) {
                if (rpoTableDto.getDeptId() != 0L) {
                    DepartmentChartMapping deptData = this.deptMappingDetailRepository.getOne(Long.valueOf(rpoTableDto.getDeptId()));
                    rpoTableDto.getRpoValues().put("departmentName", deptData.getDeptName());
                } else {
                    EmployeeDTO employeeDTO = new EmployeeDTO();
                    if (rpoTableDto.getCreateBy() != 0L) {
                        employeeDTO.setEmployeeId(rpoTableDto.getCreateBy());
                        rpoTableDto.setDeptId(this.employeeService.getEmployee(employeeDTO).getDeptDetails().getId());
                        rpoTableDto.getRpoValues().put("departmentName", this.employeeService.getEmployee(employeeDTO).getDeptDetails().getName());
                    }
                }
            }
            return rpoTableDto;
        }).collect(Collectors.toList());
        return rpoList;
    }

    public List<RpoTableDto> findRPOListDeptIds(String deptIds) {
        List<RpoTable> riskDeptList = this.rpoTableRepository.findAllByDeptIds(Lists.transform(Arrays.asList(deptIds.split("\\,")), Longs.stringConverter()));
        ArrayList<RpoTableDto> rpoDtoList = new ArrayList<RpoTableDto>();
        if (!riskDeptList.isEmpty() && riskDeptList != null) {
            List<RpoTableDto> list = riskDeptList.stream().map(dbValue -> {
                RpoTableDto rpoDTO = new RpoTableDto(dbValue);
                rpoDtoList.add(rpoDTO);
                return rpoDTO;
            }).collect(Collectors.toList());
        }
        return rpoDtoList;
    }
}

