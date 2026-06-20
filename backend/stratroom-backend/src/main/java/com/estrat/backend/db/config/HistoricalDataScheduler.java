/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.DepartmentChartMappingHistory
 *  com.estrat.backend.db.bean.po.DepartmentDetailsHistory
 *  com.estrat.backend.db.bean.po.DeptMultipleOwnersMappingHis
 *  com.estrat.backend.db.config.HistoricalDataScheduler
 *  com.estrat.backend.db.repository.DepartmentChartMappingHisRepository
 *  com.estrat.backend.db.repository.DepartmentChartMappingRepository
 *  com.estrat.backend.db.repository.DepartmentDetailsHistoryRepository
 *  com.estrat.backend.db.repository.DepartmentDetailsRepository
 *  com.estrat.backend.db.repository.DeptMultipleOwnersMappingHisRepository
 *  com.estrat.backend.db.repository.DeptMultipleOwnersMappingRepository
 *  javax.transaction.Transactional
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.scheduling.annotation.Scheduled
 *  org.springframework.stereotype.Service
 */
package com.estrat.backend.db.config;

import com.estrat.backend.db.bean.po.DepartmentChartMapping;
import com.estrat.backend.db.bean.po.DepartmentChartMappingHistory;
import com.estrat.backend.db.bean.po.DepartmentDetails;
import com.estrat.backend.db.bean.po.DepartmentDetailsHistory;
import com.estrat.backend.db.bean.po.DeptMultipleOwnersMapping;
import com.estrat.backend.db.bean.po.DeptMultipleOwnersMappingHis;
import com.estrat.backend.db.repository.DepartmentChartMappingHisRepository;
import com.estrat.backend.db.repository.DepartmentChartMappingRepository;
import com.estrat.backend.db.repository.DepartmentDetailsHistoryRepository;
import com.estrat.backend.db.repository.DepartmentDetailsRepository;
import com.estrat.backend.db.repository.DeptMultipleOwnersMappingHisRepository;
import com.estrat.backend.db.repository.DeptMultipleOwnersMappingRepository;
import java.time.Year;
import java.util.List;
import java.util.stream.Collectors;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public class HistoricalDataScheduler {
    @Autowired
    private DepartmentChartMappingRepository departmentChartDetailsRepository;
    @Autowired
    private DepartmentDetailsRepository departmentDetailsRepository;
    @Autowired
    private DeptMultipleOwnersMappingRepository deptOwnerMappingRepository;
    @Autowired
    private DepartmentChartMappingHisRepository departmentChartDetailsHisRepository;
    @Autowired
    private DepartmentDetailsHistoryRepository departmentDetailsHisRepository;
    @Autowired
    private DeptMultipleOwnersMappingHisRepository deptOwnerMappingHisRepository;

    @Scheduled(cron="0 */5 * * * ?")
    @Transactional
    public void copyPreviousYearData() {
        int previousYear = Year.now().getValue() - 1;
        if (!this.departmentChartDetailsHisRepository.existsByYear(previousYear)) {
            System.out.println("Copying data to department_chart_details_his...");
            List<DepartmentChartMapping> currentYearData = this.departmentChartDetailsRepository.findAll();
            List historicalData = currentYearData.stream().map(data -> new DepartmentChartMappingHistory(data, Integer.valueOf(previousYear))).collect(Collectors.toList());
            this.departmentChartDetailsHisRepository.saveAll(historicalData);
        }
        if (!this.departmentDetailsHisRepository.existsByYear(previousYear)) {
            System.out.println("Copying data to org_department_details_his...");
            List<DepartmentDetails> currentDepartmentDetails = this.departmentDetailsRepository.findAll();
            List historicalDepartmentDetailsHistory = currentDepartmentDetails.stream().map(data -> new DepartmentDetailsHistory(data, Integer.valueOf(previousYear))).collect(Collectors.toList());
            this.departmentDetailsHisRepository.saveAll(historicalDepartmentDetailsHistory);
        }
        if (!this.deptOwnerMappingHisRepository.existsByYear(previousYear)) {
            System.out.println("Copying data to dept_owner_mapping_his...");
            List<DeptMultipleOwnersMapping> currentDeptMultipleOwnersMapping = this.deptOwnerMappingRepository.findAll();
            List historicalDeptMultipleOwnersMappingHis = currentDeptMultipleOwnersMapping.stream().map(data -> new DeptMultipleOwnersMappingHis(data, Integer.valueOf(previousYear))).collect(Collectors.toList());
            this.deptOwnerMappingHisRepository.saveAll(historicalDeptMultipleOwnersMappingHis);
        }
    }
}

