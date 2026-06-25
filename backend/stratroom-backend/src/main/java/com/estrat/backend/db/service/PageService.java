/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.Employee
 *  com.estrat.backend.db.bean.po.DepartmentChartMapping
 *  com.estrat.backend.db.bean.po.DeptMultipleOwnersMapping
 *  com.estrat.backend.db.bean.po.EmployeeProfilePo
 *  com.estrat.backend.db.bean.po.HomePagePreferences
 *  com.estrat.backend.db.bean.po.PagesDetails
 *  com.estrat.backend.db.dao.EmployeeDepartmentMappingRepository
 *  com.estrat.backend.db.dao.PageRepository
 *  com.estrat.backend.db.dto.CockpitViewDTO
 *  com.estrat.backend.db.dto.ControlPanelGeneralDTO
 *  com.estrat.backend.db.dto.PageDTO
 *  com.estrat.backend.db.dto.ProjectFormulationDTO
 *  com.estrat.backend.db.dto.RiskFormulationDTO
 *  com.estrat.backend.db.dto.ScoreCardResponseDTO
 *  com.estrat.backend.db.repository.DepartmentChartMappingRepository
 *  com.estrat.backend.db.repository.DeptMultipleOwnersMappingRepository
 *  com.estrat.backend.db.repository.HomePagePreferenceRepository
 *  com.estrat.backend.db.resource.util.UserThreadLocal
 *  com.estrat.backend.db.service.ChartService
 *  com.estrat.backend.db.service.ControlPanelGeneralService
 *  com.estrat.backend.db.service.DashboardPreferenceService
 *  com.estrat.backend.db.service.DepartmentDetailsService
 *  com.estrat.backend.db.service.EmployeeService
 *  com.estrat.backend.db.service.InitiativesService
 *  com.estrat.backend.db.service.MeetingManagementService
 *  com.estrat.backend.db.service.PageService
 *  com.estrat.backend.db.service.PestelAnalysisService
 *  com.estrat.backend.db.service.ProjectFormulationService
 *  com.estrat.backend.db.service.RiskDetailsService
 *  com.estrat.backend.db.service.RiskFormulationService
 *  com.estrat.backend.db.service.ScoreCardDetailsService
 *  com.estrat.backend.db.service.ScoreCardService
 *  com.estrat.backend.db.service.SwotAnalysisService
 *  org.apache.commons.lang3.StringUtils
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.backend.db.service;

import com.estrat.backend.db.bean.Employee;
import com.estrat.backend.db.bean.po.DepartmentChartMapping;
import com.estrat.backend.db.bean.po.DeptMultipleOwnersMapping;
import com.estrat.backend.db.bean.po.EmployeeProfilePo;
import com.estrat.backend.db.bean.po.HomePagePreferences;
import com.estrat.backend.db.bean.po.PagesDetails;
import com.estrat.backend.db.dao.EmployeeDepartmentMappingRepository;
import com.estrat.backend.db.dao.PageRepository;
import com.estrat.backend.db.dto.CockpitViewDTO;
import com.estrat.backend.db.dto.ControlPanelGeneralDTO;
import com.estrat.backend.db.dto.EmployeeDTO;
import com.estrat.backend.db.dto.PageDTO;
import com.estrat.backend.db.dto.ProjectFormulationDTO;
import com.estrat.backend.db.dto.RiskFormulationDTO;
import com.estrat.backend.db.dto.ScoreCardResponseDTO;
import com.estrat.backend.db.repository.DepartmentChartMappingRepository;
import com.estrat.backend.db.repository.DeptMultipleOwnersMappingRepository;
import com.estrat.backend.db.repository.HomePagePreferenceRepository;
import com.estrat.backend.db.resource.util.UserThreadLocal;
import com.estrat.backend.db.service.ChartService;
import com.estrat.backend.db.service.ControlPanelGeneralService;
import com.estrat.backend.db.service.DashboardPreferenceService;
import com.estrat.backend.db.service.DepartmentDetailsService;
import com.estrat.backend.db.service.EmployeeService;
import com.estrat.backend.db.service.InitiativesService;
import com.estrat.backend.db.service.MeetingManagementService;
import com.estrat.backend.db.service.PestelAnalysisService;
import com.estrat.backend.db.service.ProjectFormulationService;
import com.estrat.backend.db.service.RiskDetailsService;
import com.estrat.backend.db.service.RiskFormulationService;
import com.estrat.backend.db.service.ScoreCardDetailsService;
import com.estrat.backend.db.service.ScoreCardService;
import com.estrat.backend.db.service.SwotAnalysisService;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PageService {
    public static final String PROJECT_FORMULATION = "Project Formulation";
    public static final String RISK_FORMULATION = "Risk Formulation";
    @Autowired
    protected PageRepository pageRepository;
    @Autowired
    protected DepartmentChartMappingRepository departmentChartMappingRepo;
    @Autowired
    protected DeptMultipleOwnersMappingRepository deptMultipleOwnersMapping;
    @Autowired
    protected EmployeeDepartmentMappingRepository departmentMappingRepository;
    @Autowired
    protected ScoreCardService scoreCardService;
    @Autowired
    protected InitiativesService initiativesService;
    @Autowired
    protected RiskDetailsService riskDetailsService;
    @Autowired
    protected MeetingManagementService managementService;
    @Autowired
    protected SwotAnalysisService swotAnalysisService;
    @Autowired
    protected PestelAnalysisService pestelAnalysisService;
    @Autowired
    protected DashboardPreferenceService dashboardPreferenceService;
    @Autowired
    protected ChartService chartService;
    @Autowired
    protected ProjectFormulationService formulationService;
    @Autowired
    protected RiskFormulationService riskFormulationService;
    @Autowired
    protected HomePagePreferenceRepository homePagePreferenceRepository;
    @Autowired
    protected ScoreCardDetailsService scoreCardDetailsService;
    @Autowired
    protected DepartmentDetailsService departmentDetailsService;
    @Autowired
    protected EmployeeService employeeService;
    @Autowired
    protected ControlPanelGeneralService generalService;

    public Optional<PagesDetails> findById(long id) {
        return this.pageRepository.findByIdAndActive(Long.valueOf(id));
    }

    public Optional<PagesDetails> findByName(String pageName, long empId) {
        return this.pageRepository.findByNameAndActive(pageName, Long.valueOf(empId));
    }

    public ScoreCardResponseDTO save(PagesDetails pagesDetails) {
        ScoreCardResponseDTO cardResponseDTO = new ScoreCardResponseDTO();
        cardResponseDTO.setFlag(true);
        pagesDetails.setDefaultPage("N");
        if (StringUtils.isNotEmpty((CharSequence)pagesDetails.getPageType())) {
            long userId = pagesDetails.getCreatedBy();
            if (userId == 0L) {
                userId = Long.valueOf(UserThreadLocal.get());
            }
            if (!this.isDefaultPage(userId, pagesDetails.getPageType())) {
                pagesDetails.setDefaultPage("Y");
            }
        }
        cardResponseDTO.setPageDTO(new PageDTO((PagesDetails)this.pageRepository.save(pagesDetails)));
        if (PROJECT_FORMULATION.equalsIgnoreCase(pagesDetails.getPageType())) {
            ProjectFormulationDTO projectFormulationDTO = new ProjectFormulationDTO();
            projectFormulationDTO.setId(pagesDetails.getId());
            this.formulationService.saveProjectFormulation(projectFormulationDTO);
        }
        if (RISK_FORMULATION.equalsIgnoreCase(pagesDetails.getPageType())) {
            RiskFormulationDTO riskFormulationDTO = new RiskFormulationDTO();
            riskFormulationDTO.setId(pagesDetails.getId());
            this.riskFormulationService.saveRiskFormulation(riskFormulationDTO);
        }
        return cardResponseDTO;
    }

    public List<PageDTO> findAll(long empId) {
        EmployeeDTO employeeDTO = new EmployeeDTO();
        employeeDTO.setEmployeeId(empId);
        Employee employee = this.employeeService.getProfileDetails(employeeDTO);
        List<PagesDetails> dbList = new ArrayList<>();
        Long orgId = employee.getOrgDetails() != null ? employee.getOrgDetails().getOrgId() : 1L;
        ControlPanelGeneralDTO controlPanelGeneralDTO = this.generalService.findByOrgId(orgId);
        boolean deptMode = controlPanelGeneralDTO != null
                && controlPanelGeneralDTO.getImplementationType() != null
                && controlPanelGeneralDTO.getImplementationType().equalsIgnoreCase("Department");
        if (deptMode) {
            if (employee.getDeptDetails() != null) {
                List idList = this.departmentMappingRepository.departmentByEmployeeIdList(employee.getDeptDetails().getId(), "Active");
                idList.add(empId);
                dbList = this.pageRepository.findAllByMultipleEmp(idList, 0);
            } else {
                List ownerList = this.deptMultipleOwnersMapping.getOwnerList(Long.valueOf(employee.getEmpId()));
                if (!ownerList.isEmpty()) {
                    List list = this.departmentMappingRepository.departmentByEmployeeIdList(((DeptMultipleOwnersMapping)ownerList.get(0)).getDeptId().longValue(), "Active");
                    dbList = !list.isEmpty() ? this.pageRepository.findAllByMultipleEmp(list, 0) : this.pageRepository.findAllByDeptId(((DeptMultipleOwnersMapping)ownerList.get(0)).getDeptId(), 0);
                }
            }
        } else {
            dbList.addAll(this.pageRepository.findAllByEmpId(Long.valueOf(empId), 0));
            if (employee.getDeptDetails() != null) {
                this.mergePages(dbList, this.pageRepository.findAllByDeptId(employee.getDeptDetails().getId(), 0));
            }
            Employee adminCheck = new Employee();
            adminCheck.setEmpId(empId);
            if (this.employeeService.checkRole(adminCheck)) {
                List<Long> allDepts = this.departmentChartMappingRepo.getAllDepartmentByOrgId(orgId, 0);
                if (allDepts != null && !allDepts.isEmpty()) {
                    this.mergePages(dbList, this.pageRepository.findAllByDeptList(allDepts, 0));
                }
            }
        }
        if (dbList == null) {
            dbList = new ArrayList<>();
        }
        List<PageDTO> pageDTOList = !dbList.isEmpty()
                ? dbList.stream().map(dbValue -> new PageDTO(dbValue)).collect(Collectors.toList())
                : new ArrayList<>();
        if (!pageDTOList.isEmpty()) {
            for (PageDTO pageDTO : pageDTOList) {
                HomePagePreferences homePagePreferences = this.homePagePreferenceRepository.findPreferences(pageDTO.getCreatedBy(), pageDTO.getPageName());
                if (homePagePreferences == null) continue;
                pageDTO.setHomePgFlag(Boolean.valueOf(true));
            }
        }
        return pageDTOList;
    }

    private void mergePages(List<PagesDetails> target, List<PagesDetails> extra) {
        if (extra == null || extra.isEmpty()) {
            return;
        }
        java.util.Set<Long> seen = target.stream().map(PagesDetails::getId).collect(Collectors.toSet());
        for (PagesDetails page : extra) {
            if (page != null && !seen.contains(page.getId())) {
                target.add(page);
                seen.add(page.getId());
            }
        }
    }

    public List<PageDTO> findAll(long empId, String pageType) {
        List<PagesDetails> dbList = null;
        if (pageType.equals("SCORECARD")) {
            dbList = this.pageRepository.findAllByEmpId(Long.valueOf(empId), "Standard_View", 0);
        } else if (pageType.equals("INITIATIVE")) {
            dbList = this.pageRepository.findAllByEmpId(Long.valueOf(empId), "Initiatives & Projects", 0);
        } else if (pageType.equals("RISK")) {
            dbList = this.pageRepository.findAllByEmpId(Long.valueOf(empId), "Risk", 0);
        }
        List<PageDTO> pageDTOList = dbList.stream().map(dbValue -> new PageDTO(dbValue)).collect(Collectors.toList());
        return pageDTOList;
    }

    public boolean isDefaultPage(long empID, String pageType) {
        PagesDetails pageDetails = this.pageRepository.isDefaultPage(Long.valueOf(empID), pageType);
        return pageDetails != null && pageDetails.getDefaultPage().equals("Y");
    }

    public String getDefaultPageURL(String empID, String pageType) {
        PagesDetails pagesDetails = this.pageRepository.getDefaultPage(Long.valueOf(empID), pageType);
        if (pagesDetails != null) {
            return String.join((CharSequence)"?pageId=", "dashboard/" + empID, String.valueOf(pagesDetails.getId()));
        }
        return "";
    }

    public PageDTO getDefaultPage(String empID, String pageType) {
        PagesDetails pagesDetails = this.pageRepository.getDefaultPage(Long.valueOf(empID), pageType);
        return Objects.nonNull(pagesDetails) ? new PageDTO(pagesDetails) : null;
    }

    public PageDTO getPage(Long pageId) {
        Optional<PagesDetails> pagesDetails = this.pageRepository.findById(pageId);
        return pagesDetails.isPresent() ? new PageDTO((PagesDetails)pagesDetails.get()) : null;
    }

    public boolean deletePageById(long pageId) {
        Optional pagesDetails = this.findById(pageId);
        if (pagesDetails.isPresent()) {
            PagesDetails pagesDetails1 = (PagesDetails)pagesDetails.get();
            pagesDetails1.setActive(1);
            this.deleteHomePreference(pagesDetails1.getId());
            if ("Standard_View".equalsIgnoreCase(pagesDetails1.getPageType()) || "ScoreCard".equalsIgnoreCase(pagesDetails1.getPageType())) {
                this.deleteScoreCardByPageId(pageId);
                this.deleteScoreCardDetailsByPageId(pageId);
            } else if ("Initiative_View".equalsIgnoreCase(pagesDetails1.getPageType()) || "Initiatives & Projects".equalsIgnoreCase(pagesDetails1.getPageType())) {
                this.deleteInitiativesByPageId(pageId);
            } else if ("Swot".equalsIgnoreCase(pagesDetails1.getPageType())) {
                List<com.estrat.backend.db.bean.po.SWOTAnalysis> swotList = this.swotAnalysisService.findAllByPageId(pageId);
                if (!swotList.isEmpty()) {
                    swotList.forEach(swot -> this.swotAnalysisService.delete(swot));
                }
            } else if ("Meeting".equalsIgnoreCase(pagesDetails1.getPageType())) {
                this.deleteMeetingByPageId(pageId);
            } else if ("Risk".equalsIgnoreCase(pagesDetails1.getPageType())) {
                this.deleteRiskByPageId(pageId);
            } else if ("Pestel".equalsIgnoreCase(pagesDetails1.getPageType())) {
                List<com.estrat.backend.db.bean.po.PestelAnalysis> pestelList = this.pestelAnalysisService.findAllByPageId(pageId);
                if (!pestelList.isEmpty()) {
                    pestelList.forEach(pestel -> this.pestelAnalysisService.delete(pestel));
                }
            } else if ("Cockpit".equalsIgnoreCase(pagesDetails1.getPageType())) {
                List<com.estrat.backend.db.bean.po.DashBoardPreferences> dashBoardList = this.dashboardPreferenceService.findAllByPageId(pageId);
                if (!dashBoardList.isEmpty()) {
                    dashBoardList.forEach(dashBoard -> this.dashboardPreferenceService.deleteByDashBoardObj(Optional.of(dashBoard)));
                }
            } else if ("Chart".equalsIgnoreCase(pagesDetails1.getPageType())) {
                List<com.estrat.backend.db.bean.po.ChartDetails> chartList = this.chartService.findAllByPageId(pageId);
                if (!chartList.isEmpty()) {
                    chartList.forEach(chart -> this.chartService.delete(chart));
                }
            } else if ("My Space".equalsIgnoreCase(pagesDetails1.getPageType())) {
                this.deleteInitiativesByPageId(pageId);
                this.deleteRiskByPageId(pageId);
            } else if (PROJECT_FORMULATION.equalsIgnoreCase(pagesDetails1.getPageType())) {
                this.formulationService.deleteFormulation(pageId);
            } else if (RISK_FORMULATION.equalsIgnoreCase(pagesDetails1.getPageType())) {
                this.riskFormulationService.deleteFormulation(pageId);
            }
            this.pageRepository.delete(pagesDetails1);
            return true;
        }
        return false;
    }

    public void deleteScoreCardByPageId(long pageId) {
        List<com.estrat.backend.db.bean.po.ScoreCard> scoreCardList = this.scoreCardService.scoreCardListByPage(pageId);
        if (!scoreCardList.isEmpty()) {
            scoreCardList.forEach(scoreCard -> this.scoreCardService.deleteByScoreCardObj(scoreCard));
        }
    }

    public void deleteInitiativesByPageId(long pageId) {
        List<com.estrat.backend.db.bean.po.Initiatives> initiaitvesList = this.initiativesService.findAllByPageId(pageId);
        if (!initiaitvesList.isEmpty()) {
            initiaitvesList.forEach(initiative -> this.initiativesService.deleteByInitiativeObj(initiative));
        }
    }

    public void deleteRiskByPageId(long pageId) {
        List<com.estrat.backend.db.bean.po.RiskDetails> riskList = this.riskDetailsService.findAllByPageId(pageId);
        if (!riskList.isEmpty()) {
            riskList.forEach(risk -> this.riskDetailsService.deleteRiskDetails(Optional.of(risk)));
        }
    }

    public void deleteMeetingByPageId(long pageId) {
        List<com.estrat.backend.db.bean.po.MeetingManagement> meetingList = this.managementService.findAllByPageId(pageId);
        if (!meetingList.isEmpty()) {
            meetingList.forEach(meeting -> this.managementService.deleteByMeetingObj(Optional.of(meeting)));
        }
    }

    public PageDTO checkPageType(String pageId) {
        Optional<PagesDetails> pagesDetails = this.pageRepository.findById(Long.valueOf(pageId));
        return Objects.nonNull(pagesDetails.get()) ? new PageDTO((PagesDetails)pagesDetails.get()) : null;
    }

    public void deleteScoreCardDetailsByPageId(long pageId) {
        this.scoreCardDetailsService.deleteScoreCardDetailsByPageId(pageId);
    }

    public void updateHomePreference(long empId, long pageId, String pageName) {
        HomePagePreferences homePagePreferences = this.homePagePreferenceRepository.findPreferencesByPageId(empId, pageId);
        if (homePagePreferences != null) {
            homePagePreferences.setPageName(pageName);
            this.homePagePreferenceRepository.save(homePagePreferences);
        }
    }

    public void deleteHomePreference(long pageId) {
        HomePagePreferences homePagePreferences = this.homePagePreferenceRepository.findPreferencesByPageId(pageId);
        if (homePagePreferences != null) {
            this.homePagePreferenceRepository.delete(homePagePreferences);
        }
    }

    public String getPages(Long empId) {
        String pages = null;
        List<PagesDetails> pagesDetails = this.pageRepository.findAllByEmpId(empId, 0);
        if (!pagesDetails.isEmpty()) {
            for (PagesDetails pagesDetails1 : pagesDetails) {
                if (pages == null) {
                    pages = pagesDetails1.getPageName();
                    continue;
                }
                pages = pages + ", " + pagesDetails1.getPageName();
            }
        }
        return pages;
    }

    public Long getDeptId(Long empId) {
        EmployeeProfilePo employeeProfilePo = this.employeeService.getEmployeeProfile(empId);
        if (employeeProfilePo != null) {
            if (employeeProfilePo.getDeptId() != null) {
                return employeeProfilePo.getDeptId().getId();
            }
            Optional<DepartmentChartMapping> departmentChartMapping = this.departmentChartMappingRepo.findOwner(empId, 0);
            if (departmentChartMapping.isPresent()) {
                return ((DepartmentChartMapping)departmentChartMapping.get()).getDeptId();
            }
        }
        return 0L;
    }

    public PageDTO updateColumnView(CockpitViewDTO cockpitViewDTO) {
        Optional<PagesDetails> pagesDetails = this.pageRepository.findById(cockpitViewDTO.getPageId());
        if (pagesDetails.isPresent()) {
            PagesDetails updatePageDetails = (PagesDetails)pagesDetails.get();
            updatePageDetails.setColumnType(cockpitViewDTO.getColumnType());
            return new PageDTO((PagesDetails)this.pageRepository.save(updatePageDetails));
        }
        return new PageDTO((PagesDetails)pagesDetails.get());
    }

    public void updatePageName(Long pageId, String pageName) {
        Optional<PagesDetails> pagesDetails = this.pageRepository.findById(pageId);
        if (pagesDetails.isPresent()) {
            PagesDetails updatePageDetails = (PagesDetails)pagesDetails.get();
            updatePageDetails.setPageName(pageName);
            this.pageRepository.save(updatePageDetails);
        }
    }

    public void deletePage(Long id, String type) {
        List<PagesDetails> pagesDetailsList = null;
        pagesDetailsList = type.equalsIgnoreCase("Dept") ? this.pageRepository.findAllByDeptId(id) : this.pageRepository.findAllByEmpId(id);
        if (pagesDetailsList != null && !pagesDetailsList.isEmpty()) {
            for (PagesDetails pagesDetails : pagesDetailsList) {
                pagesDetails.setActive(1);
                this.deleteHomePreference(pagesDetails.getId());
                if ("Standard_View".equalsIgnoreCase(pagesDetails.getPageType()) || "ScoreCard".equalsIgnoreCase(pagesDetails.getPageType())) {
                    this.deleteScoreCardByPageId(pagesDetails.getId());
                    this.deleteScoreCardDetailsByPageId(pagesDetails.getId());
                } else if ("Initiative_View".equalsIgnoreCase(pagesDetails.getPageType()) || "Initiatives & Projects".equalsIgnoreCase(pagesDetails.getPageType())) {
                    this.deleteInitiativesByPageId(pagesDetails.getId());
                } else if ("Swot".equalsIgnoreCase(pagesDetails.getPageType())) {
                    List<com.estrat.backend.db.bean.po.SWOTAnalysis> swotList = this.swotAnalysisService.findAllByPageId(pagesDetails.getId());
                    swotList.forEach(swot -> this.swotAnalysisService.delete(swot));
                } else if ("Meeting".equalsIgnoreCase(pagesDetails.getPageType())) {
                    this.deleteMeetingByPageId(pagesDetails.getId());
                } else if ("Risk".equalsIgnoreCase(pagesDetails.getPageType())) {
                    this.deleteRiskByPageId(pagesDetails.getId());
                } else if ("Pestel".equalsIgnoreCase(pagesDetails.getPageType())) {
                    List<com.estrat.backend.db.bean.po.PestelAnalysis> pestelList = this.pestelAnalysisService.findAllByPageId(pagesDetails.getId());
                    pestelList.forEach(pestel -> this.pestelAnalysisService.delete(pestel));
                } else if ("Cockpit".equalsIgnoreCase(pagesDetails.getPageType())) {
                    List<com.estrat.backend.db.bean.po.DashBoardPreferences> dashBoardList = this.dashboardPreferenceService.findAllByPageId(pagesDetails.getId());
                    dashBoardList.forEach(dashBoard -> this.dashboardPreferenceService.deleteByDashBoardObj(Optional.of(dashBoard)));
                } else if ("Chart".equalsIgnoreCase(pagesDetails.getPageType())) {
                    List<com.estrat.backend.db.bean.po.ChartDetails> chartList = this.chartService.findAllByPageId(pagesDetails.getId());
                    chartList.forEach(chart -> this.chartService.delete(chart));
                } else if ("My Space".equalsIgnoreCase(pagesDetails.getPageType())) {
                    this.deleteInitiativesByPageId(pagesDetails.getId());
                    this.deleteRiskByPageId(pagesDetails.getId());
                } else if (PROJECT_FORMULATION.equalsIgnoreCase(pagesDetails.getPageType())) {
                    this.formulationService.deleteFormulation(pagesDetails.getId());
                } else if (RISK_FORMULATION.equalsIgnoreCase(pagesDetails.getPageType())) {
                    this.riskFormulationService.deleteFormulation(pagesDetails.getId());
                }
                this.pageRepository.delete(pagesDetails);
            }
        }
    }

    public List<PageDTO> findAllByDept(long deptId, String pageType) {
        List<PagesDetails> dbList = null;
        System.out.println("deptidwith page type:" + deptId + "-" + pageType);
        if (pageType.equals("SCORECARD")) {
            dbList = this.pageRepository.findAllByDeptId(Long.valueOf(deptId), "Standard_View", 0);
        } else if (pageType.equals("INITIATIVE")) {
            dbList = this.pageRepository.findAllByDeptId(Long.valueOf(deptId), "Initiatives & Projects", 0);
        } else if (pageType.equals("RISK")) {
            dbList = this.pageRepository.findAllByDeptId(Long.valueOf(deptId), "Risk", 0);
        } else if (pageType.equals("STRATEGYMAP")) {
            dbList = this.pageRepository.findAllByDeptId(Long.valueOf(deptId), "Strategy Map", 0);
        } else if (pageType.equals("INITIATIVEMAP")) {
            dbList = this.pageRepository.findAllByDeptId(Long.valueOf(deptId), "Initiative Strategic", 0);
        } else if (pageType.equals("SCORECARDDASHBOARD")) {
            dbList = this.pageRepository.findAllByDeptId(Long.valueOf(deptId), "Scorecard Dashboard", 0);
        } else if (pageType.equals("RISKDASHBOARD")) {
            dbList = this.pageRepository.findAllByDeptId(Long.valueOf(deptId), "Risk Dashboard", 0);
        } else if (pageType.equals("INITIATIVEDASHBOARD")) {
            dbList = this.pageRepository.findAllByDeptId(Long.valueOf(deptId), "Initiative Dashboard", 0);
        } else if (pageType.equals("COMPLIANCEDASHBOARD")) {
            dbList = this.pageRepository.findAllByDeptId(Long.valueOf(deptId), "Compliance Dashboard", 0);
        } else if (pageType.equals("RADAR")) {
            dbList = this.pageRepository.findAllByDeptId(Long.valueOf(deptId), "Risk Radar", 0);
        } else if (pageType.equals("AUDITDASHBOARD")) {
            dbList = this.pageRepository.findAllByDeptId(Long.valueOf(deptId), "Audit Dashboard", 0);
        }
        List<PageDTO> pageDTOList = dbList.stream().map(dbValue -> new PageDTO(dbValue)).collect(Collectors.toList());
        return pageDTOList;
    }

    public List<PageDTO> findAllByDeptList(String deptId, String pageType) {
        List<PagesDetails> dbList = null;
        List deptList = Arrays.stream(deptId.split(",")).map(Long::parseLong).collect(Collectors.toList());
        if (pageType.equals("SCORECARD")) {
            dbList = this.pageRepository.findAllByDeptIdList(deptList, "Standard_View", 0);
        } else if (pageType.equals("INITIATIVE")) {
            dbList = this.pageRepository.findAllByDeptIdList(deptList, "Initiatives & Projects", 0);
        } else if (pageType.equals("RISK")) {
            dbList = this.pageRepository.findAllByDeptIdList(deptList, "Risk", 0);
        }
        List<PageDTO> pageDTOList = dbList.stream().map(dbValue -> new PageDTO(dbValue)).collect(Collectors.toList());
        return pageDTOList;
    }

    public List<PageDTO> findAllByDept(List<Long> deptId) {
        List<PagesDetails> dbList = null;
        dbList = this.pageRepository.findAllByDeptList(deptId, 0);
        List<PageDTO> pageDTOList = dbList.stream().map(dbValue -> new PageDTO(dbValue)).collect(Collectors.toList());
        return pageDTOList;
    }

    public List<PageDTO> findAllByPinnedList(long deptId) {
        List<PagesDetails> dbList = null;
        dbList = this.pageRepository.findAllByPinnedList(Long.valueOf(deptId), 0);
        List<PageDTO> pageDTOList = dbList.stream().map(dbValue -> new PageDTO(dbValue)).collect(Collectors.toList());
        return pageDTOList;
    }

    public PagesDetails findAllByPinnedWithType(long deptId, String pageType) {
        PagesDetails dbList = this.pageRepository.findAllByDeptIdPinned(Long.valueOf(deptId), pageType, 0);
        return dbList;
    }
}

