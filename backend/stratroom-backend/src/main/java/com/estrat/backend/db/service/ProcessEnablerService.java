/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.DepartmentChartMapping
 *  com.estrat.backend.db.bean.po.ProcessEnabler
 *  com.estrat.backend.db.dao.PageRepository
 *  com.estrat.backend.db.dao.ProcessEnablerRepository
 *  com.estrat.backend.db.dto.EmployeeDTO
 *  com.estrat.backend.db.dto.PosTradingHoursCountsDto
 *  com.estrat.backend.db.dto.ProcessEnablerDto
 *  com.estrat.backend.db.repository.DepartmentChartMappingRepository
 *  com.estrat.backend.db.resource.util.DateUtil
 *  com.estrat.backend.db.resource.util.UserThreadLocal
 *  com.estrat.backend.db.service.EmployeeService
 *  com.estrat.backend.db.service.ProcessEnablerService
 *  com.google.common.base.Function
 *  com.google.common.collect.Lists
 *  com.google.common.primitives.Longs
 *  org.apache.commons.lang3.StringUtils
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.backend.db.service;

import com.estrat.backend.db.bean.po.DepartmentChartMapping;
import com.estrat.backend.db.bean.po.ProcessEnabler;
import com.estrat.backend.db.dao.PageRepository;
import com.estrat.backend.db.dao.ProcessEnablerRepository;
import com.estrat.backend.db.dto.EmployeeDTO;
import com.estrat.backend.db.dto.PosTradingHoursCountsDto;
import com.estrat.backend.db.dto.ProcessEnablerDto;
import com.estrat.backend.db.repository.DepartmentChartMappingRepository;
import com.estrat.backend.db.resource.util.DateUtil;
import com.estrat.backend.db.resource.util.UserThreadLocal;
import com.estrat.backend.db.service.EmployeeService;
import com.google.common.base.Function;
import com.google.common.collect.Lists;
import com.google.common.primitives.Longs;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
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

/*
 * Exception performing whole class analysis ignored.
 */
@Service
public class ProcessEnablerService {
    @Autowired
    ProcessEnablerRepository processEnablerRepo;
    @Autowired
    PageRepository pageRepository;
    @Autowired
    protected EmployeeService employeeService;
    @Autowired
    protected DepartmentChartMappingRepository deptMappingDetailRepository;
    @Autowired
    protected DateUtil dateUtil;

    public ProcessEnablerDto saveProcessEnabler(ProcessEnabler processEnabler) {
        ProcessEnabler pos = (ProcessEnabler)this.processEnablerRepo.save(processEnabler);
        ProcessEnablerDto processEnablerDto = new ProcessEnablerDto(pos);
        return processEnablerDto;
    }

    public List<ProcessEnablerDto> findAllProcessEnaler() {
        ArrayList<ProcessEnablerDto> posList = new ArrayList<ProcessEnablerDto>();
        List<ProcessEnabler> processList = this.processEnablerRepo.findAll();
        for (ProcessEnabler processEnabler : processList) {
            ProcessEnablerDto processDto = new ProcessEnablerDto(processEnabler);
            posList.add(processDto);
        }
        return posList;
    }

    public Optional<ProcessEnabler> findPosById(long id) {
        return this.processEnablerRepo.findById(id);
    }

    public void delete(ProcessEnabler processEnabler) {
        this.processEnablerRepo.delete(processEnabler);
    }

    public List<ProcessEnablerDto> findAllPosBYEmpId(Long empId) {
        ArrayList<ProcessEnablerDto> posList = new ArrayList<ProcessEnablerDto>();
        List<ProcessEnabler> processList = this.processEnablerRepo.findAllByEmpId(empId);
        for (ProcessEnabler processEnabler : processList) {
            ProcessEnablerDto processDto = new ProcessEnablerDto(processEnabler);
            posList.add(processDto);
        }
        return posList;
    }

    public List<ProcessEnablerDto> findAllByPageId(long pageId, String dateRange, String status) {
        ArrayList<ProcessEnablerDto> posList = new ArrayList<ProcessEnablerDto>();
        List<ProcessEnabler> processPageList = null;
        if (Objects.isNull(dateRange)) {
            dateRange = UserThreadLocal.get((String)"DATE_PERIOD");
        }
        System.out.println("Date Range in Pos :" + dateRange);
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
            if (status != null && status.equalsIgnoreCase("DRAFT")) {
                System.out.println("enter in draft");
                processPageList = this.processEnablerRepo.findAllByPageANDDate(Long.valueOf(pageId), this.dateUtil.getFirstDateTime(firstDate), this.dateUtil.getSecondDateTime(secondDate), status);
            } else {
                System.out.println("enter in Approved and All");
                processPageList = this.processEnablerRepo.findAllByPageANDDateNoDRAFT(Long.valueOf(pageId), this.dateUtil.getFirstDateTime(firstDate), this.dateUtil.getSecondDateTime(secondDate));
            }
        } else {
            processPageList = this.processEnablerRepo.findAllByPageId(Long.valueOf(pageId));
        }
        for (ProcessEnabler processEnabler : processPageList) {
            ProcessEnablerDto processDto = new ProcessEnablerDto(processEnabler);
            posList.add(processDto);
        }
        return posList;
    }

    public List<ProcessEnablerDto> findAllByPOSIDList(String posPageIds, String dateRange) {
        Collection<ProcessEnabler> dbList = null;
        if (Objects.isNull(dateRange)) {
            dateRange = UserThreadLocal.get((String)"DATE_PERIOD");
        }
        System.out.println("Date Range in Pos :" + dateRange);
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
            dbList = this.processEnablerRepo.findAllByposPageIds(Lists.transform(Arrays.asList(posPageIds.split("\\,")), (Function)Longs.stringConverter()), this.dateUtil.getFirstDateTime(firstDate), this.dateUtil.getSecondDateTime(secondDate));
        }
        List<ProcessEnablerDto> posList = dbList.stream().map(dbValue -> {
            ProcessEnablerDto posEnablerDto = new ProcessEnablerDto(dbValue);
            if (!dbValue.getPosValue().matches("departmentName")) {
                if (dbValue.getDeptId() != 0L) {
                    DepartmentChartMapping deptData = this.deptMappingDetailRepository.getOne(Long.valueOf(dbValue.getDeptId()));
                    posEnablerDto.getPosValue().put("departmentName", deptData.getDeptName());
                } else {
                    EmployeeDTO employeeDTO = new EmployeeDTO();
                    if (posEnablerDto.getCreateBy() != 0L) {
                        employeeDTO.setEmployeeId(posEnablerDto.getCreateBy());
                        posEnablerDto.setDeptId(this.employeeService.getEmployee(employeeDTO).getDeptDetails().getId());
                        posEnablerDto.getPosValue().put("departmentName", this.employeeService.getEmployee(employeeDTO).getDeptDetails().getName());
                    }
                }
            }
            return posEnablerDto;
        }).collect(Collectors.toList());
        return posList;
    }

    public List<ProcessEnablerDto> findAllByPOSEmpIds(long empId) {
        List childs = this.employeeService.getReporteeListId(empId);
        childs.add(empId);
        List<ProcessEnabler> dbList = this.processEnablerRepo.findAllByEmpIds(childs);
        List<ProcessEnablerDto> posList = dbList.stream().map(dbValue -> {
            ProcessEnablerDto processEnablerDto = new ProcessEnablerDto(dbValue);
            if (!dbValue.getPosValue().matches("departmentName")) {
                if (dbValue.getDeptId() != 0L) {
                    DepartmentChartMapping deptData = this.deptMappingDetailRepository.getOne(Long.valueOf(dbValue.getDeptId()));
                    processEnablerDto.getPosValue().put("departmentName", deptData.getDeptName());
                }
            } else {
                EmployeeDTO employeeDTO = new EmployeeDTO();
                if (processEnablerDto.getCreateBy() != 0L) {
                    employeeDTO.setEmployeeId(processEnablerDto.getCreateBy());
                    processEnablerDto.setDeptId(this.employeeService.getEmployee(employeeDTO).getDeptDetails().getId());
                    processEnablerDto.getPosValue().put("departmentName", this.employeeService.getEmployee(employeeDTO).getDeptDetails().getName());
                }
            }
            return processEnablerDto;
        }).collect(Collectors.toList());
        return posList;
    }

    public List<ProcessEnablerDto> findPOSListDeptIds(String deptIds) {
        List<ProcessEnabler> riskDeptList = this.processEnablerRepo.findAllByDeptIds(Lists.transform(Arrays.asList(deptIds.split("\\,")), (Function)Longs.stringConverter()));
        ArrayList<ProcessEnablerDto> posDtoList = new ArrayList<ProcessEnablerDto>();
        if (!riskDeptList.isEmpty() && riskDeptList != null) {
            List<ProcessEnablerDto> list = riskDeptList.stream().map(dbValue -> {
                ProcessEnablerDto riskDTO = new ProcessEnablerDto(dbValue);
                if (dbValue.getPageId() != null) {
                    riskDTO.getPosValue().put("pageName", dbValue.getPageId().getPageName());
                } else {
                    riskDTO.getPosValue().put("pageName", null);
                }
                posDtoList.add(riskDTO);
                return riskDTO;
            }).collect(Collectors.toList());
        }
        return posDtoList;
    }

    public List<PosTradingHoursCountsDto> posTradingHourseCount(String posPageIds, String dateRange) {
        Collection<ProcessEnabler> dbList = null;
        if (Objects.isNull(dateRange)) {
            dateRange = UserThreadLocal.get((String)"DATE_PERIOD");
        }
        System.out.println("Date Range in Pos :" + dateRange);
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
            dbList = this.processEnablerRepo.findAllByposPageIds(Lists.transform(Arrays.asList(posPageIds.split("\\,")), (Function)Longs.stringConverter()), this.dateUtil.getFirstDateTime(firstDate), this.dateUtil.getSecondDateTime(secondDate));
        }
        List<ProcessEnablerDto> posList = dbList.stream().map(dbValue -> {
            ProcessEnablerDto posEnablerDto = new ProcessEnablerDto(dbValue);
            return posEnablerDto;
        }).collect(Collectors.toList());
        LocalTime startRange1 = LocalTime.of(4, 0);
        LocalTime endRange1 = LocalTime.of(8, 59);
        LocalTime startRange2 = LocalTime.of(9, 0);
        LocalTime endRange2 = LocalTime.of(15, 59);
        LocalTime startRange3 = LocalTime.of(16, 0);
        LocalTime endRange3 = LocalTime.of(3, 59);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm");
        HashMap<Long, PosTradingHoursCountsDto> departmentTradingHours = new HashMap<Long, PosTradingHoursCountsDto>();
        for (ProcessEnablerDto listOfPOS : posList) {
            Map posvalues = listOfPOS.getPosValue();
            String startTimeStr = (String)posvalues.get("workingTimeStart");
            String endTimeStr = (String)posvalues.get("workingTimeEnd");
            LocalTime startTime = LocalTime.parse(startTimeStr, formatter);
            LocalTime endTime = LocalTime.parse(endTimeStr, formatter);
            PosTradingHoursCountsDto posTradingHours = departmentTradingHours.computeIfAbsent(listOfPOS.getDeptId(), k -> new PosTradingHoursCountsDto());
            if (ProcessEnablerService.isTimeInRange((LocalTime)startTime, (LocalTime)endTime, (LocalTime)startRange1, (LocalTime)endRange1)) {
                posTradingHours.setBeforeHourTradingCount(posTradingHours.getBeforeHourTradingCount() + 1);
                continue;
            }
            if (ProcessEnablerService.isTimeInRange((LocalTime)startTime, (LocalTime)endTime, (LocalTime)startRange2, (LocalTime)endRange2)) {
                posTradingHours.setAtTheClockTradingCount(posTradingHours.getAtTheClockTradingCount() + 1);
                continue;
            }
            if (!ProcessEnablerService.isTimeInRange((LocalTime)startTime, (LocalTime)endTime, (LocalTime)startRange3, (LocalTime)endRange3)) continue;
            posTradingHours.setAfterHourTradingCount(posTradingHours.getAfterHourTradingCount() + 1);
        }
        ArrayList<PosTradingHoursCountsDto> listPosTradingHours = new ArrayList<PosTradingHoursCountsDto>();
        for (Map.Entry entry : departmentTradingHours.entrySet()) {
            Long department = (Long)entry.getKey();
            PosTradingHoursCountsDto posTradingHours = (PosTradingHoursCountsDto)entry.getValue();
            String range1 = startRange1.format(formatter) + " - " + endRange1.format(formatter);
            String range2 = startRange2.format(formatter) + " - " + endRange2.format(formatter);
            String range3 = startRange3.format(formatter) + " - " + endRange3.format(formatter);
            posTradingHours.setId(department.longValue());
            if (department != 0L) {
                DepartmentChartMapping deptData = this.deptMappingDetailRepository.getOne(department);
                posTradingHours.setDepartMentName(deptData.getDeptName());
            }
            posTradingHours.setBeforeHourTrading(range1);
            posTradingHours.setAtTheClockTrading(range2);
            posTradingHours.setAfterHourTrading(range3);
            listPosTradingHours.add(posTradingHours);
        }
        return listPosTradingHours;
    }

    public static boolean isTimeInRange(LocalTime startTime, LocalTime endTime, LocalTime rangeStart, LocalTime rangeEnd) {
        if (rangeStart.isAfter(rangeEnd)) {
            return startTime.isAfter(rangeStart) || startTime.isBefore(rangeEnd) || endTime.isAfter(rangeStart) || endTime.isBefore(rangeEnd);
        }
        return startTime.isBefore(rangeEnd) && endTime.isAfter(rangeStart);
    }
}

