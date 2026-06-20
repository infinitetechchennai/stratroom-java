/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.DashBoardPreferences
 *  com.estrat.backend.db.bean.po.HomePagePreferences
 *  com.estrat.backend.db.bean.po.PreferenceSubDetail
 *  com.estrat.backend.db.cache.DBCache
 *  com.estrat.backend.db.dao.DashboardPreferenceRepository
 *  com.estrat.backend.db.dao.PreferenceDetailRepository
 *  com.estrat.backend.db.dto.DashBoardPreferencesDTO
 *  com.estrat.backend.db.dto.HomePreferencesDTO
 *  com.estrat.backend.db.dto.PreferenceDTO
 *  com.estrat.backend.db.repository.HomePagePreferenceRepository
 *  com.estrat.backend.db.resource.util.UserThreadLocal
 *  com.estrat.backend.db.service.AuditDetailsService
 *  com.estrat.backend.db.service.DashboardPreferenceService
 *  com.estrat.backend.db.service.InitiativesService
 *  org.apache.log4j.Logger
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.backend.db.service;

import com.estrat.backend.db.bean.po.DashBoardPreferences;
import com.estrat.backend.db.bean.po.HomePagePreferences;
import com.estrat.backend.db.bean.po.PreferenceSubDetail;
import com.estrat.backend.db.cache.DBCache;
import com.estrat.backend.db.dao.DashboardPreferenceRepository;
import com.estrat.backend.db.dao.PreferenceDetailRepository;
import com.estrat.backend.db.dto.DashBoardPreferencesDTO;
import com.estrat.backend.db.dto.HomePreferencesDTO;
import com.estrat.backend.db.dto.PreferenceDTO;
import com.estrat.backend.db.repository.HomePagePreferenceRepository;
import com.estrat.backend.db.resource.util.UserThreadLocal;
import com.estrat.backend.db.service.AuditDetailsService;
import com.estrat.backend.db.service.InitiativesService;
import java.text.ParseException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DashboardPreferenceService {
    @Autowired
    protected DashboardPreferenceRepository dashboardPreferenceRepository;
    @Autowired
    protected HomePagePreferenceRepository homePagePreferenceRepository;
    @Autowired
    protected PreferenceDetailRepository preferenceDetailRepository;
    @Autowired
    private DBCache dbCache;
    @Autowired
    private AuditDetailsService auditDetailsService;
    private Logger log = LoggerFactory.getLogger(InitiativesService.class);

    public Optional<DashBoardPreferences> findById(long id) {
        return this.dashboardPreferenceRepository.findById(id);
    }

    public DashBoardPreferencesDTO delete(long id) {
        DashBoardPreferencesDTO riskResponseDTO = new DashBoardPreferencesDTO();
        Optional dashBoardPreferences = this.dashboardPreferenceRepository.findById(id);
        this.deleteByDashBoardObj(dashBoardPreferences);
        return riskResponseDTO;
    }

    public boolean deleteByDashBoardObj(Optional<DashBoardPreferences> dashBoardPreferences) {
        if (dashBoardPreferences.isPresent()) {
            DashBoardPreferences boardPreferences = dashBoardPreferences.get();
            DashBoardPreferencesDTO preferencesDTO = new DashBoardPreferencesDTO(boardPreferences);
            if (preferencesDTO.getDashBoardPreferencesValue().containsKey("chartdisplayname") && (preferencesDTO.getDashBoardPreferencesValue().get("chartdisplayname").toString().equalsIgnoreCase("Drill Down Table") || preferencesDTO.getDashBoardPreferencesValue().get("chartdisplayname").toString().equalsIgnoreCase("Risk Register") || preferencesDTO.getDashBoardPreferencesValue().get("chartdisplayname").toString().equalsIgnoreCase("Review Monitoring") || preferencesDTO.getDashBoardPreferencesValue().get("chartdisplayname").toString().equalsIgnoreCase("Initiative Register") || preferencesDTO.getDashBoardPreferencesValue().get("chartdisplayname").toString().equalsIgnoreCase("KPI Register") || preferencesDTO.getDashBoardPreferencesValue().get("chartdisplayname").toString().equalsIgnoreCase("Data Table"))) {
                this.auditDetailsService.saveAudit("Cockpit", preferencesDTO.getId(), Long.valueOf(UserThreadLocal.get()).longValue(), "Cockpit Table Deleted");
            } else if (preferencesDTO.getDashBoardPreferencesValue().containsKey("cardtypeselect") && preferencesDTO.getDashBoardPreferencesValue().get("cardtypeselect").toString().equalsIgnoreCase("Text")) {
                this.auditDetailsService.saveAudit("Cockpit", preferencesDTO.getId(), Long.valueOf(UserThreadLocal.get()).longValue(), "Cockpit Text Deleted");
            } else if (preferencesDTO.getDashBoardPreferencesValue().containsKey("type") && (preferencesDTO.getDashBoardPreferencesValue().get("type").toString().equalsIgnoreCase("BubbleChart") || preferencesDTO.getDashBoardPreferencesValue().get("type").toString().equalsIgnoreCase("ColumnChart") || preferencesDTO.getDashBoardPreferencesValue().get("type").toString().equalsIgnoreCase("LineChart") || preferencesDTO.getDashBoardPreferencesValue().get("type").toString().equalsIgnoreCase("AreaChart") || preferencesDTO.getDashBoardPreferencesValue().get("type").toString().equalsIgnoreCase("WaterfallChart") || preferencesDTO.getDashBoardPreferencesValue().get("type").toString().equalsIgnoreCase("MultiAxis") || preferencesDTO.getDashBoardPreferencesValue().get("type").toString().equalsIgnoreCase("StackedChart") || preferencesDTO.getDashBoardPreferencesValue().get("type").toString().equalsIgnoreCase("RadialMulti") || preferencesDTO.getDashBoardPreferencesValue().get("type").toString().equalsIgnoreCase("HeatMap") || preferencesDTO.getDashBoardPreferencesValue().get("type").toString().equalsIgnoreCase("GanttChart") || preferencesDTO.getDashBoardPreferencesValue().get("type").toString().equalsIgnoreCase("PieChart"))) {
                this.auditDetailsService.saveAudit("Cockpit", preferencesDTO.getId(), Long.valueOf(UserThreadLocal.get()).longValue(), "Cockpit Chart Deleted");
            }
            boardPreferences.setActive(1);
            this.dashboardPreferenceRepository.delete(boardPreferences);
            return true;
        }
        return false;
    }

    public DashBoardPreferencesDTO save(DashBoardPreferences dashBoardPreferences) {
        DashBoardPreferences initResponse = (DashBoardPreferences)this.dashboardPreferenceRepository.save(dashBoardPreferences);
        DashBoardPreferencesDTO responseDTO = new DashBoardPreferencesDTO(initResponse);
        return responseDTO;
    }

    public HomePreferencesDTO save(HomePagePreferences homePagePreferences) {
        HomePagePreferences homeResponse = (HomePagePreferences)this.homePagePreferenceRepository.save(homePagePreferences);
        HomePreferencesDTO responseDTO = new HomePreferencesDTO(homeResponse);
        return responseDTO;
    }

    public List<DashBoardPreferencesDTO> findAllByEmpId(long empId, String pageId) {
        List<DashBoardPreferences> dbList = null;
        dbList = pageId != null && !pageId.isEmpty() ? this.dashboardPreferenceRepository.findAllByEmpId(Long.valueOf(empId), 0, Long.valueOf(pageId)) : this.dashboardPreferenceRepository.findAllByEmpId(Long.valueOf(empId), 0);
        List<DashBoardPreferencesDTO> dashBoardPreferencesDTOS = dbList.stream().map(dbValue -> {
            DashBoardPreferencesDTO preferenceDto = new DashBoardPreferencesDTO(dbValue);
            try {
                this.populateActualData(preferenceDto);
            }
            catch (ParseException e) {
                e.printStackTrace();
            }
            return preferenceDto;
        }).collect(Collectors.toList());
        return dashBoardPreferencesDTOS;
    }

    public List<DashBoardPreferences> findAllByPageId(long pageId) {
        return this.dashboardPreferenceRepository.findAllByPageId(Long.valueOf(pageId));
    }

    public HomePagePreferences findByEmpId(long empId) {
        return this.homePagePreferenceRepository.findPreferencesByEmpId(empId);
    }

    public PreferenceDTO savePreference(PreferenceSubDetail preferenceDetail) {
        PreferenceSubDetail initResponse = (PreferenceSubDetail)this.preferenceDetailRepository.save(preferenceDetail);
        PreferenceDTO responseDTO = new PreferenceDTO(initResponse);
        return responseDTO;
    }

    public Optional<PreferenceSubDetail> findByPreferId(long id) {
        return this.preferenceDetailRepository.findById(id);
    }

    public List<PreferenceDTO> getdashPreferenceId(long dashId) {
        List<PreferenceSubDetail> preferDetail = this.preferenceDetailRepository.findAllByDashId(Long.valueOf(dashId));
        List<PreferenceDTO> preferencesDTOS = preferDetail.stream().map(dbValue -> new PreferenceDTO(dbValue)).collect(Collectors.toList());
        return preferencesDTOS;
    }

    public void populateActualData(DashBoardPreferencesDTO dashBoardPreferencesDTO) throws ParseException {
        List<PreferenceSubDetail> preferDetail;
        if (Objects.nonNull(dashBoardPreferencesDTO.getId()) && (preferDetail = this.preferenceDetailRepository.findAllByDashId(Long.valueOf(dashBoardPreferencesDTO.getId()))) != null) {
            List<PreferenceDTO> preferencesDTOS = preferDetail.stream().map(dbValue -> new PreferenceDTO(dbValue)).collect(Collectors.toList());
            dashBoardPreferencesDTO.setPreferenceDetailList(preferencesDTOS);
        }
    }
}

