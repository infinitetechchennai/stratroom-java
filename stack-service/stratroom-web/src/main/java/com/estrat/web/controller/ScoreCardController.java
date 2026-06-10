/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.controller.ScoreCardController
 *  com.estrat.web.dto.ActivitiesDTO
 *  com.estrat.web.dto.ControlPanelGeneralDTO
 *  com.estrat.web.dto.CustomPerformance
 *  com.estrat.web.dto.Employee
 *  com.estrat.web.dto.HomePreferencesDTO
 *  com.estrat.web.dto.InitiativeAttachmentDto
 *  com.estrat.web.dto.InitiativeTaskDto
 *  com.estrat.web.dto.InitiativesDTO
 *  com.estrat.web.dto.KPIDTO
 *  com.estrat.web.dto.MilestonesDTO
 *  com.estrat.web.dto.ObjectivesDTO
 *  com.estrat.web.dto.PageDTO
 *  com.estrat.web.dto.RiskDTO
 *  com.estrat.web.dto.ScoreCardDTO
 *  com.estrat.web.dto.ScoreCardDetailsDTO
 *  com.estrat.web.dto.ScoreCardResponseDTO
 *  com.estrat.web.dto.ScorecardList
 *  com.estrat.web.dto.StagingChangeDTO
 *  com.estrat.web.dto.StatusCountDto
 *  com.estrat.web.dto.SubInitiativesDTO
 *  com.estrat.web.dto.SubKPIDTO
 *  com.estrat.web.exception.RequestException
 *  com.estrat.web.service.ActivitiesService
 *  com.estrat.web.service.AuditTrailService
 *  com.estrat.web.service.CommentService
 *  com.estrat.web.service.ControlPanelGeneralService
 *  com.estrat.web.service.DashBoardPreferencesService
 *  com.estrat.web.service.EmployeeGoalsService
 *  com.estrat.web.service.EmployeeService
 *  com.estrat.web.service.InitiativeAttachmentService
 *  com.estrat.web.service.InitiativeService
 *  com.estrat.web.service.InitiativeTaskService
 *  com.estrat.web.service.KPIService
 *  com.estrat.web.service.MilestonesService
 *  com.estrat.web.service.ObjectiveService
 *  com.estrat.web.service.PageService
 *  com.estrat.web.service.RiskDetailsService
 *  com.estrat.web.service.RoleService
 *  com.estrat.web.service.ScoreCardService
 *  com.estrat.web.service.StagingChangeService
 *  com.estrat.web.service.SubInitiativeService
 *  com.estrat.web.service.SubKPIService
 *  com.estrat.web.util.DateUtil
 *  com.estrat.web.util.ETLFileUploadUtil
 *  com.estrat.web.util.ETLReaderUtil
 *  com.estrat.web.util.HeaderThreadLocal
 *  com.estrat.web.util.PermissionLocal
 *  com.estrat.web.util.RequestSessionUtil
 *  com.estrat.web.util.ScoreCardReaderUtil
 *  com.estrat.web.util.ScoreCardUtil
 *  com.estrat.web.util.TempUserThreadLocal
 *  com.estrat.web.util.UserThreadLocal
 *  com.fasterxml.jackson.databind.Module
 *  com.fasterxml.jackson.databind.ObjectMapper
 *  com.fasterxml.jackson.datatype.jsr310.JavaTimeModule
 *  javax.servlet.http.HttpServletRequest
 *  javax.servlet.http.HttpServletResponse
 *  org.apache.commons.lang3.StringUtils
 *  org.slf4j.Logger
 *  org.slf4j.LoggerFactory
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.core.io.ByteArrayResource
 *  org.springframework.http.HttpStatus
 *  org.springframework.http.ResponseEntity
 *  org.springframework.stereotype.Controller
 *  org.springframework.ui.Model
 *  org.springframework.web.bind.annotation.DeleteMapping
 *  org.springframework.web.bind.annotation.GetMapping
 *  org.springframework.web.bind.annotation.PathVariable
 *  org.springframework.web.bind.annotation.PostMapping
 *  org.springframework.web.bind.annotation.PutMapping
 *  org.springframework.web.bind.annotation.RequestBody
 *  org.springframework.web.bind.annotation.RequestMapping
 *  org.springframework.web.bind.annotation.RequestMethod
 *  org.springframework.web.bind.annotation.RequestParam
 *  org.springframework.web.bind.annotation.ResponseBody
 *  org.springframework.web.context.request.WebRequest
 *  org.springframework.web.multipart.MultipartFile
 */
package com.estrat.web.controller;

import com.estrat.web.dto.ActivitiesDTO;
import com.estrat.web.dto.ControlPanelGeneralDTO;
import com.estrat.web.dto.CustomPerformance;
import com.estrat.web.dto.Employee;
import com.estrat.web.dto.HomePreferencesDTO;
import com.estrat.web.dto.InitiativeAttachmentDto;
import com.estrat.web.dto.InitiativeTaskDto;
import com.estrat.web.dto.InitiativesDTO;
import com.estrat.web.dto.KPIDTO;
import com.estrat.web.dto.MilestonesDTO;
import com.estrat.web.dto.ObjectivesDTO;
import com.estrat.web.dto.PageDTO;
import com.estrat.web.dto.RiskDTO;
import com.estrat.web.dto.ScoreCardDTO;
import com.estrat.web.dto.ScoreCardDetailsDTO;
import com.estrat.web.dto.ScoreCardResponseDTO;
import com.estrat.web.dto.ScorecardList;
import com.estrat.web.dto.StagingChangeDTO;
import com.estrat.web.dto.StatusCountDto;
import com.estrat.web.dto.SubInitiativesDTO;
import com.estrat.web.dto.SubKPIDTO;
import com.estrat.web.exception.RequestException;
import com.estrat.web.service.ActivitiesService;
import com.estrat.web.service.AuditTrailService;
import com.estrat.web.service.CommentService;
import com.estrat.web.service.ControlPanelGeneralService;
import com.estrat.web.service.DashBoardPreferencesService;
import com.estrat.web.service.EmployeeGoalsService;
import com.estrat.web.service.EmployeeService;
import com.estrat.web.service.InitiativeAttachmentService;
import com.estrat.web.service.InitiativeService;
import com.estrat.web.service.InitiativeTaskService;
import com.estrat.web.service.KPIService;
import com.estrat.web.service.MilestonesService;
import com.estrat.web.service.ObjectiveService;
import com.estrat.web.service.PageService;
import com.estrat.web.service.RiskDetailsService;
import com.estrat.web.service.RoleService;
import com.estrat.web.service.ScoreCardService;
import com.estrat.web.service.StagingChangeService;
import com.estrat.web.service.SubInitiativeService;
import com.estrat.web.service.SubKPIService;
import com.estrat.web.util.DateUtil;
import com.estrat.web.util.ETLFileUploadUtil;
import com.estrat.web.util.ETLReaderUtil;
import com.estrat.web.util.HeaderThreadLocal;
import com.estrat.web.util.PermissionLocal;
import com.estrat.web.util.RequestSessionUtil;
import com.estrat.web.util.ScoreCardReaderUtil;
import com.estrat.web.util.ScoreCardUtil;
import com.estrat.web.util.TempUserThreadLocal;
import com.estrat.web.util.UserThreadLocal;
import com.fasterxml.jackson.databind.Module;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.TreeSet;
import java.util.stream.Collectors;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.multipart.MultipartFile;

@Controller
public class ScoreCardController {
    @Autowired
    private ScoreCardService scoreCardService;
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private PageService pageService;
    @Autowired
    private KPIService kpiService;
    @Autowired
    private ObjectiveService objectiveService;
    @Autowired
    private InitiativeService initiativesService;
    @Autowired
    private SubInitiativeService subInitiativeService;
    @Autowired
    private ActivitiesService activitiesService;
    @Autowired
    private MilestonesService milestonesService;
    @Autowired
    private CommentService commentService;
    @Autowired
    private RiskDetailsService riskDetailService;
    @Autowired
    private ScoreCardReaderUtil scoreCardReaderUtil;
    @Autowired
    private ETLReaderUtil etlReaderUtil;
    @Autowired
    private ETLFileUploadUtil etlFileUploadUtil;
    @Autowired
    private EmployeeGoalsService employeeGoalsService;
    @Autowired
    private ScoreCardUtil scoreCardUtil;
    @Autowired
    private ControlPanelGeneralService controlPanelGeneralService;
    @Autowired
    private RoleService roleService;
    @Autowired
    private DashBoardPreferencesService dashBoardPreferencesService;
    @Autowired
    private AuditTrailService auditTrailService;
    @Autowired
    protected RequestSessionUtil sessionUtil;
    @Autowired
    protected SubKPIService subKPIService;
    @Autowired
    protected StagingChangeService stagingChangeService;
    @Autowired
    protected InitiativeAttachmentService initiativeAttachmentService;
    @Autowired
    protected InitiativeTaskService initiativeTaskService;
    private Logger log = LoggerFactory.getLogger(ScoreCardController.class);

    @RequestMapping(value={"/standardView"}, method={RequestMethod.GET})
    public String standardView(WebRequest webRequest, HttpServletRequest request, HttpServletResponse response) {
        return "pages/scorecard/standardview/standard_view";
    }

    @GetMapping(value={"/kpistatuscount/{id}"})
    public ResponseEntity<List<StatusCountDto>> scorecardKpiStatusCount(@PathVariable(value="id") long id, @RequestParam(value="period", required=false) String period) {
        return this.scoreCardService.getkpistatus(id, period);
    }

    @GetMapping(value={"/blankkpi/{id}"})
    public ResponseEntity<List<StatusCountDto>> blankkpi(@PathVariable(value="id") long id, @RequestParam(value="period", required=false) String period) {
        return this.scoreCardService.blankkpi(id, period);
    }

    @RequestMapping(value={"/kpiView"}, method={RequestMethod.GET})
    public String kpiView(@RequestParam(value="kpiId", required=false) String kpiId, @RequestParam(value="flagtype", required=false) String flagtype, @RequestParam(value="scoreCardId", required=false) String scoreCardId, @RequestParam(value="objectiveId", required=false) String objectiveId, @RequestParam(value="pageId", required=false) String pageId, @RequestParam(value="empId", required=false) String employeeID, WebRequest webRequest, HttpServletRequest request, HttpServletResponse response) {
        String empId = null;
        empId = StringUtils.isNotEmpty((CharSequence)employeeID) ? employeeID : UserThreadLocal.get().getProfile().getEmpId();
        List pageList = this.pageService.pageList(Long.valueOf(empId).longValue());
        request.setAttribute("pageList", pageList);
        if (flagtype != null && !flagtype.isEmpty() && flagtype.equalsIgnoreCase("subkpi")) {
            this.updateSubKpiDetails(Long.valueOf(kpiId).longValue(), scoreCardId, objectiveId, pageId, request);
        } else if (StringUtils.isNotEmpty((CharSequence)kpiId)) {
            this.updateKpiDetails(Long.valueOf(kpiId).longValue(), scoreCardId, objectiveId, pageId, request);
        }
        return "pages/organization/kpiView";
    }

    @RequestMapping(value={"/updateKpiDetails/{kpiId}"}, method={RequestMethod.GET})
    public void updateKpiDetails(@PathVariable(value="kpiId") long kpiId, @RequestParam(value="scoreCardId", required=false) String scoreCardId, @RequestParam(value="objectiveId", required=false) String objectiveId, @RequestParam(value="pageId", required=false) String pageId, HttpServletRequest request) {
        long sessionKpiId;
        Object sessionnKpiId = request.getSession().getAttribute("kpiId");
        long l = sessionKpiId = Objects.isNull(sessionnKpiId) ? 0L : Long.valueOf(sessionnKpiId.toString());
        if (kpiId != sessionKpiId) {
            request.getSession().setAttribute("kpiId", kpiId);
            if (StringUtils.isEmpty((CharSequence)scoreCardId) || StringUtils.isEmpty((CharSequence)objectiveId) || StringUtils.isEmpty((CharSequence)pageId)) {
                KPIDTO kpidto = (KPIDTO) (KPIDTO)this.kpiService.getKpiDetails(kpiId, false).getBody();
                ObjectivesDTO objectivesDTO = (ObjectivesDTO) (ObjectivesDTO)this.objectiveService.getObjectiveDetails(kpidto.getObjectiveId()).getBody();
                ScoreCardDTO scoreCardDTO = (ScoreCardDTO) (ScoreCardDTO)this.scoreCardService.getScoreCardDetails(objectivesDTO.getScoreCardId()).getBody();
                request.getSession().setAttribute("scoreCardId", objectivesDTO.getScoreCardId());
                request.getSession().setAttribute("objId", kpidto.getObjectiveId());
                request.getSession().setAttribute("scordCardPageId", scoreCardDTO.getPageId());
            } else {
                request.getSession().setAttribute("scoreCardId", scoreCardId);
                request.getSession().setAttribute("objId", objectiveId);
                request.getSession().setAttribute("scordCardPageId", pageId);
            }
        }
    }

    @RequestMapping(value={"/updateSubKpiDetails/{subkpiId}"}, method={RequestMethod.GET})
    public void updateSubKpiDetails(@PathVariable(value="subkpiId") long subkpiId, @RequestParam(value="scoreCardId", required=false) String scoreCardId, @RequestParam(value="objectiveId", required=false) String objectiveId, @RequestParam(value="pageId", required=false) String pageId, HttpServletRequest request) {
        long sessionKpiId;
        Object sessionnKpiId = request.getSession().getAttribute("subkpiId");
        long l = sessionKpiId = Objects.isNull(sessionnKpiId) ? 0L : Long.valueOf(sessionnKpiId.toString());
        if (subkpiId != sessionKpiId) {
            request.getSession().setAttribute("subkpiId", subkpiId);
            if (StringUtils.isEmpty((CharSequence)scoreCardId) || StringUtils.isEmpty((CharSequence)objectiveId) || StringUtils.isEmpty((CharSequence)pageId)) {
                SubKPIDTO subkpidto = (SubKPIDTO) (SubKPIDTO)this.subKPIService.getSubKpiDetails(subkpiId, false).getBody();
                ObjectivesDTO objectivesDTO = (ObjectivesDTO) (ObjectivesDTO)this.objectiveService.getObjectiveDetails(subkpidto.getObjectiveId()).getBody();
                ScoreCardDTO scoreCardDTO = (ScoreCardDTO) (ScoreCardDTO)this.scoreCardService.getScoreCardDetails(objectivesDTO.getScoreCardId()).getBody();
                request.getSession().setAttribute("scoreCardId", objectivesDTO.getScoreCardId());
                request.getSession().setAttribute("objId", subkpidto.getObjectiveId());
                request.getSession().setAttribute("scordCardPageId", scoreCardDTO.getPageId());
            } else {
                request.getSession().setAttribute("scoreCardId", scoreCardId);
                request.getSession().setAttribute("objId", objectiveId);
                request.getSession().setAttribute("scordCardPageId", pageId);
            }
        }
    }

    @RequestMapping(value={"/standardViewtemplate"}, method={RequestMethod.GET})
    public String standardViewtemplate(WebRequest webRequest, HttpServletRequest request, HttpServletResponse response) {
        return "pages/scorecard/standardview/standard_view_template";
    }

    @RequestMapping(value={"/standardViewtemplateView"}, method={RequestMethod.GET})
    public String standardViewtemplateview(WebRequest webRequest, HttpServletRequest request, HttpServletResponse response) {
        return "pages/scorecardview/standardview/standard_view_template";
    }

    @RequestMapping(value={"/initiativestemplate"}, method={RequestMethod.GET})
    public String initiativestemplate(WebRequest webRequest, HttpServletRequest request, HttpServletResponse response) {
        return "pages/initiatives/initiativestemplate";
    }

    @RequestMapping(value={"/initiativestemplateView"}, method={RequestMethod.GET})
    public String initiativestemplateView(WebRequest webRequest, HttpServletRequest request, HttpServletResponse response) {
        return "pages/initiativesview/initiativestemplate";
    }

    @RequestMapping(value={"/initiatives"}, method={RequestMethod.GET})
    public String initiatives(WebRequest webRequest, HttpServletRequest request, HttpServletResponse response) {
        return "pages/organization/initiative";
    }

    @RequestMapping(value={"/charts"}, method={RequestMethod.GET})
    public String charts(@RequestParam(value="pageId", required=false) String pageId, WebRequest webRequest, HttpServletRequest request, HttpServletResponse response) {
        request.setAttribute("pageId", pageId);
        return "pages/organization/charts";
    }

    @RequestMapping(value={"/strategyMap"}, method={RequestMethod.GET})
    public String strategyMap(@RequestParam(value="pageId", required=false) String pageId, WebRequest webRequest, HttpServletRequest request, HttpServletResponse response) {
        request.setAttribute("pageId", pageId);
        return "pages/organization/strategyMap";
    }

    @RequestMapping(value={"/strategyformulation"}, method={RequestMethod.GET})
    public String strategyformulation(WebRequest webRequest, HttpServletRequest request, HttpServletResponse response) {
        return "pages/organization/strategyformulation";
    }

    @RequestMapping(value={"/projectformulation"}, method={RequestMethod.GET})
    public String projectformulation(WebRequest webRequest, HttpServletRequest request, HttpServletResponse response) {
        return "pages/organization/projectformulation";
    }

    @RequestMapping(value={"/riskformulation"}, method={RequestMethod.GET})
    public String riskformulation(WebRequest webRequest, HttpServletRequest request, HttpServletResponse response) {
        return "pages/organization/riskformulation";
    }

    @RequestMapping(value={"/meeting"}, method={RequestMethod.GET})
    public String meeting(WebRequest webRequest, HttpServletRequest request, HttpServletResponse response) {
        return "pages/organization/meeting";
    }

    @RequestMapping(value={"/swotanalysis"}, method={RequestMethod.GET})
    public String swotanalysis(WebRequest webRequest, HttpServletRequest request, HttpServletResponse response) {
        return "pages/organization/swotanalysis";
    }

    @RequestMapping(value={"/pestelanalysis"}, method={RequestMethod.GET})
    public String pestelanalysis(WebRequest webRequest, HttpServletRequest request, HttpServletResponse response) {
        return "pages/organization/pestelanalysis";
    }

    @RequestMapping(value={"/employeeView"}, method={RequestMethod.GET})
    public String employeeView(@RequestParam(value="empId", required=false) String employeeId, @RequestParam(value="pageId", required=false) String pageId, WebRequest webRequest, HttpServletRequest request, HttpServletResponse response) {
        Object activitiesDTO;
        Object subInitiativesDTO;
        String empId = null;
        empId = StringUtils.isNotEmpty((CharSequence)employeeId) ? employeeId : UserThreadLocal.get().getProfile().getEmpId();
        PermissionLocal.get().setPrivilegeMappingDTOS(this.roleService.checkPermissions(request));
        List kpiList = (List) (List)this.kpiService.getKpiList(true).getBody();
        List initiativesDTOS = this.initiativesService.findAll(true, null, UserThreadLocal.get().getProfile().getEmpId(), "date");
        ArrayList subInitiativesDTOS = new ArrayList();
        ArrayList activitiesDTOS = new ArrayList();
        ArrayList milestonesDTOS = new ArrayList();
        ArrayList attachmentDTOS = new ArrayList();
        ArrayList taskDTOS = new ArrayList();
        request.setAttribute("kpiList", kpiList);
        PageDTO pageDTO = this.pageService.getDefaultPage("Standard_View");
        if (pageDTO != null) {
            request.setAttribute("defaultPageId", pageDTO.getId());
        }
        if (initiativesDTOS != null && !initiativesDTOS.isEmpty()) {
            for (Object _obj_initiativesDTO : initiativesDTOS) {
                InitiativesDTO initiativesDTO = (InitiativesDTO) _obj_initiativesDTO;
                if (initiativesDTO == null) continue;
                if (initiativesDTO.getSubInitiativeList() != null && !initiativesDTO.getSubInitiativeList().isEmpty()) {
                    subInitiativesDTOS.addAll(initiativesDTO.getSubInitiativeList());
                }
                if (initiativesDTO.getActivitiesList() != null && !initiativesDTO.getActivitiesList().isEmpty()) {
                    activitiesDTOS.addAll(initiativesDTO.getActivitiesList());
                }
                if (initiativesDTO.getMileStonesList() != null && !initiativesDTO.getMileStonesList().isEmpty()) {
                    milestonesDTOS.addAll(initiativesDTO.getMileStonesList());
                }
                if (initiativesDTO.getAttachmentList() != null && !initiativesDTO.getAttachmentList().isEmpty()) {
                    attachmentDTOS.addAll(initiativesDTO.getAttachmentList());
                }
                if (initiativesDTO.getTaskList() == null || initiativesDTO.getTaskList().isEmpty()) continue;
                taskDTOS.addAll(initiativesDTO.getTaskList());
            }
        }
        request.setAttribute("myInitiativesList", this.initiativesService.findAll(false, null, UserThreadLocal.get().getProfile().getEmpId(), "date"));
        request.setAttribute("initiativesList", initiativesDTOS);
        List subInitiativesDTOList = this.subInitiativeService.findByEmpId(empId);
        if (subInitiativesDTOS != null && !subInitiativesDTOS.isEmpty()) {
            subInitiativesDTOS.addAll(subInitiativesDTOList);
            List dtoList = ((java.util.List<SubInitiativesDTO>)subInitiativesDTOS).stream().collect(Collectors.toCollection(() -> new TreeSet<SubInitiativesDTO>(Comparator.comparing(SubInitiativesDTO::getId)))).stream().collect(Collectors.toList());
            Iterator iterator = dtoList.iterator();
            while (iterator.hasNext()) {
                SubInitiativesDTO subInitDTO = (SubInitiativesDTO)iterator.next();
                subInitDTO.setSubInitiativeValue(DateUtil.formatDates((Map)subInitDTO.getSubInitiativeValue(), (String)"subInitiative"));
            }
            request.setAttribute("subInitiativesList", dtoList);
        } else {
            for (Object _obj_subInitiativesDTO2 : subInitiativesDTOList) {
                SubInitiativesDTO subInitiativesDTO2 = (SubInitiativesDTO) _obj_subInitiativesDTO2;
                subInitiativesDTO2.setSubInitiativeValue(DateUtil.formatDates((Map)subInitiativesDTO2.getSubInitiativeValue(), (String)"subInitiative"));
            }
            request.setAttribute("subInitiativesList", subInitiativesDTOList);
        }
        List taskDTOList = this.initiativeTaskService.findByEmpId(empId);
        if (taskDTOS != null && !taskDTOS.isEmpty()) {
            taskDTOS.addAll(taskDTOList);
            List dtoList = ((java.util.List<InitiativeTaskDto>)taskDTOS).stream().collect(Collectors.toCollection(() -> new TreeSet<InitiativeTaskDto>(Comparator.comparing(InitiativeTaskDto::getId)))).stream().collect(Collectors.toList());
            Iterator _taskIter = dtoList.iterator();
            while (_taskIter.hasNext()) {
                InitiativeTaskDto taskDTO = (InitiativeTaskDto)_taskIter.next();
                taskDTO.setTaskValue(DateUtil.formatDates((Map)taskDTO.getTaskValue(), (String)"initiativetask"));
            }
            request.setAttribute("initiatveTaskList", dtoList);
        } else {
            for (Object _obj_taskDTO : taskDTOList) {
                InitiativeTaskDto taskDTO = (InitiativeTaskDto) _obj_taskDTO;
                taskDTO.setTaskValue(DateUtil.formatDates((Map)taskDTO.getTaskValue(), (String)"initiativetask"));
            }
            request.setAttribute("initiatveTaskList", taskDTOList);
        }
        List attachDTOList = this.initiativeAttachmentService.findByEmpId(empId);
        if (attachmentDTOS != null && !attachmentDTOS.isEmpty()) {
            attachmentDTOS.addAll(attachDTOList);
            List dtoList = ((java.util.List<InitiativeAttachmentDto>)attachmentDTOS).stream().collect(Collectors.toCollection(() -> new TreeSet<InitiativeAttachmentDto>(Comparator.comparing(InitiativeAttachmentDto::getId)))).stream().collect(Collectors.toList());
            request.setAttribute("initiatveAttachList", dtoList);
        } else {
            request.setAttribute("initiatveAttachList", attachDTOList);
        }
        List activitiesDTOList = this.activitiesService.findByEmpId(empId);
        if (subInitiativesDTOS != null && !subInitiativesDTOS.isEmpty()) {
            activitiesDTOS.addAll(activitiesDTOList);
            List dtoList = ((java.util.List<ActivitiesDTO>)activitiesDTOS).stream().collect(Collectors.toCollection(() -> new TreeSet<ActivitiesDTO>(Comparator.comparing(ActivitiesDTO::getId)))).stream().collect(Collectors.toList());
            Iterator iterator = dtoList.iterator();
            while (iterator.hasNext()) {
                ActivitiesDTO actDTO = (ActivitiesDTO)iterator.next();
                actDTO.setActivitiesValue(DateUtil.formatDates((Map)actDTO.getActivitiesValue(), (String)"activities"));
            }
            request.setAttribute("activitiesList", dtoList);
        } else {
            for (Object _obj_activitiesDTO2 : activitiesDTOList) {
                ActivitiesDTO activitiesDTO2 = (ActivitiesDTO) _obj_activitiesDTO2;
                activitiesDTO2.setActivitiesValue(DateUtil.formatDates((Map)activitiesDTO2.getActivitiesValue(), (String)"activities"));
            }
            request.setAttribute("activitiesList", activitiesDTOList);
        }
        List milestonesDTOList = this.milestonesService.findAllByEmpId(empId);
        if (milestonesDTOList != null && !milestonesDTOList.isEmpty()) {
            milestonesDTOS.addAll(milestonesDTOList);
            List dtoList = ((java.util.List<MilestonesDTO>)milestonesDTOS).stream().collect(Collectors.toCollection(() -> new TreeSet<MilestonesDTO>(Comparator.comparing(MilestonesDTO::getId)))).stream().collect(Collectors.toList());
            Iterator _msIter = dtoList.iterator();
            while (_msIter.hasNext()) {
                MilestonesDTO milestonesDTO = (MilestonesDTO)_msIter.next();
                milestonesDTO.setMileStonesValue(DateUtil.singleDateFormatDates((Map)milestonesDTO.getMileStonesValue(), (String)"milestone"));
            }
            request.setAttribute("mileStonesList", dtoList);
        } else {
            for (Object _obj_milestonesDTO : milestonesDTOList) {
                MilestonesDTO milestonesDTO = (MilestonesDTO) _obj_milestonesDTO;
                milestonesDTO.setMileStonesValue(DateUtil.singleDateFormatDates((Map)milestonesDTO.getMileStonesValue(), (String)"milestone"));
            }
            request.setAttribute("mileStonesList", milestonesDTOS);
        }
        List performanceContractList = this.subKPIService.findAllByEmpId(empId);
        request.setAttribute("performanceContract", performanceContractList);
        request.setAttribute("scorecardPermission", this.roleService.getParticularModulePermission(empId, "Scorecard"));
        request.setAttribute("initiativePermission", this.roleService.getParticularModulePermission(empId, "Initiatives & Projects"));
        request.setAttribute("riskPermission", this.roleService.getParticularModulePermission(empId, "Risk"));
        request.setAttribute("mySpacePermission", this.roleService.getParticularModulePermission(empId, "My Space"));
        request.setAttribute("budgetPermission", this.roleService.getParticularModulePermission(empId, "Budget"));
        request.setAttribute("commentsList", this.commentService.findAllEmpIdComments(empId));
        request.setAttribute("riskDetailList", this.riskDetailService.findAll(empId, null, "", ""));
        request.setAttribute("riskcommentsList", this.riskDetailService.findAllByEmpId(Long.valueOf(empId)));
        request.setAttribute("risksummary", this.riskDetailService.findAllRiskDetailsByTableFormat(Long.valueOf(empId).longValue()));
        request.setAttribute("goals", this.employeeGoalsService.findAll(Long.valueOf(empId).longValue()));
        List pageList = this.pageService.pageList(Long.valueOf(empId).longValue());
        System.out.println("pageListforMySpaceView" + pageList);
        request.setAttribute("pageList", pageList);
        return "pages/organization/employee";
    }

    @RequestMapping(value={"/risks"}, method={RequestMethod.GET})
    public String risktemplate(@RequestParam(value="kpiId", required=false) String kpiId, @RequestParam(value="pageId", required=false) String pageId, @RequestParam(value="kpiRiskView", required=false) String kpiRiskView, @RequestParam(value="riskId", required=false) String riskId, @RequestParam(value="dateRange", required=false) String dateRange, WebRequest webRequest, HttpServletRequest request, HttpServletResponse response) {
        if (StringUtils.isNotEmpty((CharSequence)kpiId)) {
            long id = Long.valueOf(kpiId);
            if (StringUtils.isNotEmpty((CharSequence)kpiRiskView)) {
                request.getSession().setAttribute("kpiRiskView", "true");
            }
            boolean kpiView = Objects.nonNull(request.getSession().getAttribute("kpiRiskView")) ? Boolean.valueOf(request.getSession().getAttribute("kpiRiskView").toString()) : false;
            request.setAttribute("kpiId", kpiId);
            List riskDTOList = kpiView ? this.riskDetailService.findImpactedRiskDetails(id) : this.riskDetailService.findAll(UserThreadLocal.get().getProfile().getEmpId(), pageId, dateRange, "");
            request.setAttribute("riskList", riskDTOList);
        } else {
            request.getSession().setAttribute("kpiRiskView", "false");
            request.setAttribute("kpiId", "");
            List riskDTOList = this.riskDetailService.findAll(UserThreadLocal.get().getProfile().getEmpId(), pageId, dateRange, "");
            request.setAttribute("riskList", riskDTOList);
        }
        if (StringUtils.isNotEmpty((CharSequence)riskId)) {
            request.setAttribute("riskId", riskId);
            long riskID = Long.valueOf(riskId);
            request.setAttribute("riskDetail", this.riskDetailService.retrieveRiskDetails(Long.valueOf(riskID), false));
            request.setAttribute("riskTreatmentList", this.riskDetailService.retrieveRiskPlanDetails(Long.valueOf(riskID)));
            request.setAttribute("commentsList", this.riskDetailService.retrieveRiskCommentDetails(Long.valueOf(riskID)));
            request.setAttribute("riskMonitoringList", this.riskDetailService.retrieveRiskMonitoringDetails(Long.valueOf(riskID)));
            request.setAttribute("riskCauseAndConqList", this.riskDetailService.retrieveRiskConsequenceDetails(Long.valueOf(riskID)));
        }
        return "pages/organization/risk";
    }

    @RequestMapping(value={"/riskevent"}, method={RequestMethod.GET})
    public String riskeventtemplate(@RequestParam(value="pageId", required=false) String pageId, @RequestParam(value="dateRange", required=false) String dateRange, WebRequest webRequest, HttpServletRequest request, HttpServletResponse response) {
        request.setAttribute("pagenumber", pageId.trim());
        return "pages/organization/riskevent";
    }

    @RequestMapping(value={"/conventionalBsc"}, method={RequestMethod.GET})
    public String conventionalBsc(WebRequest webRequest, HttpServletRequest request, HttpServletResponse response) {
        return "pages/organization/conventional_bsc";
    }

    @RequestMapping(value={"/scoreCardListView"}, method={RequestMethod.GET})
    public String scoreCardListView(WebRequest webRequest, HttpServletRequest request, HttpServletResponse response) {
        return "pages/organization/scoreCardListView";
    }

    @RequestMapping(value={"/dashBoardView"}, method={RequestMethod.GET})
    public String dashBoardView(WebRequest webRequest, HttpServletRequest request, HttpServletResponse response) {
        return "pages/organization/dashboad_view";
    }

    @GetMapping(value={"/scorecard/{id}"})
    public ResponseEntity<ScoreCardDTO> getScoreCardDetails(@PathVariable(value="id") long id) {
        return this.scoreCardService.getScoreCardDetails(id);
    }

    @GetMapping(value={"/measureNames/{id}"})
    public ResponseEntity<Map> measureNames(@PathVariable(value="id") long id, @RequestParam(value="component") String component, HttpServletRequest request) {
        CustomPerformance customPerformance = new CustomPerformance(this.controlPanelGeneralService.findCustomPerformanceByOrgId());
        if (customPerformance.isCustomPerformance()) {
            if ("SCORECARDCONFIG".equalsIgnoreCase(component)) {
                ScoreCardResponseDTO scoreCardResponseDTO = this.scoreCardService.scoreCardList(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue(), String.valueOf(id), false);
                return new ResponseEntity(this.scoreCardUtil.getPerspectiveMap(scoreCardResponseDTO.getScoreCardList()), HttpStatus.OK);
            }
            if ("PERSPECTIVE".equalsIgnoreCase(component)) {
                ScoreCardDTO scoreCardDTO = (ScoreCardDTO) (ScoreCardDTO)this.scoreCardService.getScoreCardDetails(id).getBody();
                if ("KPI".equalsIgnoreCase(customPerformance.getDerivation())) {
                    return new ResponseEntity(this.scoreCardUtil.getKpiMap(scoreCardDTO), HttpStatus.OK);
                }
                return new ResponseEntity(this.scoreCardUtil.getObjectiveMap(scoreCardDTO.getObjectiveList()), HttpStatus.OK);
            }
            ObjectivesDTO objectivesDTO = (ObjectivesDTO) (ObjectivesDTO)this.objectiveService.getObjectiveDetails(id).getBody();
            return new ResponseEntity(this.scoreCardUtil.getKpiMap(objectivesDTO.getKpiList()), HttpStatus.OK);
        }
        return new ResponseEntity(Collections.emptyMap(), HttpStatus.OK);
    }

    @PostMapping(value={"/scorecard"})
    public ResponseEntity<ScoreCardResponseDTO> saveOrUpdateScoreCardDetails(@RequestBody ScoreCardDTO scoreCard, HttpServletRequest request) {
        scoreCard.setCreatedBy(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue());
        return this.scoreCardService.saveOrUpdateScoreCardDetails(scoreCard, "Save");
    }

    @DeleteMapping(value={"/scorecard/{id}"})
    public ResponseEntity<Boolean> deleteScoreCard(@PathVariable long id) {
        return this.scoreCardService.deleteScoreCard(id);
    }

    @PutMapping(value={"/scorecard"})
    public ResponseEntity<ScoreCardResponseDTO> updateDetails(@RequestBody ScoreCardDTO scoreCard, HttpServletRequest request) {
        scoreCard.setUpdatedBy(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue());
        return this.scoreCardService.saveOrUpdateScoreCardDetails(scoreCard, "Update");
    }

    @GetMapping(value={"/scoreCardListWithPageIds"})
    public ResponseEntity<List<ScoreCardResponseDTO>> scoreCardList(@RequestParam(value="pageId", required=false) String pageId, @RequestParam(value="datePeriod", required=false) String datePeriod, @RequestParam(value="empId", required=false) String empId, @RequestParam(value="loadFlag", required=false) String loadFlag, HttpServletRequest request) {
        boolean flag = loadFlag != null ? Boolean.valueOf(loadFlag) : true;
        String sessionUserId = this.sessionUtil.getSessionId(request);
        empId = empId.trim();
        String employeeId = StringUtils.isNotEmpty((CharSequence)empId) ? empId : sessionUserId;
        request.getSession().setAttribute("datePeriod", datePeriod);
        UserThreadLocal.get().setDatePeriod(datePeriod);
        if (StringUtils.isNotEmpty((CharSequence)UserThreadLocal.get().getDatePeriod())) {
            UserThreadLocal.get().getCommonHeaders().put("DATE_PERIOD", UserThreadLocal.get().getDatePeriod());
        }
        List scoreCardList = null;
        if (datePeriod != null) {
            scoreCardList = this.scoreCardService.scoreCardListByDatePageIds(Long.valueOf(employeeId).longValue(), pageId, false, datePeriod);
            System.out.println("scoreCardList :: " + scoreCardList);
            for (Object _obj_scorecard : scoreCardList) {
                ScoreCardResponseDTO scorecard = (ScoreCardResponseDTO) _obj_scorecard;
                if (scorecard != null && scorecard.getCardDetailsDTO() == null) {
                    ScoreCardResponseDTO check = this.scoreCardService.scoreCardDetailList(Long.valueOf(employeeId).longValue(), pageId, flag);
                    if (check != null && check.getCardDetailsDTO() != null) {
                        if (check.getCardDetailsDTO().getPageId() != null && check.getCardDetailsDTO().getScorecardName() != null) {
                            scorecard.setScoreCardName(check.getCardDetailsDTO().getScorecardName());
                            return new ResponseEntity(scoreCardList, HttpStatus.OK);
                        }
                        return new ResponseEntity(HttpStatus.NOT_FOUND);
                    }
                    return new ResponseEntity(HttpStatus.NOT_FOUND);
                }
                if (scorecard == null || scorecard.getCardDetailsDTO() == null) continue;
                scorecard.setScoreCardName(scorecard.getCardDetailsDTO().getScorecardName());
            }
        } else {
            ScoreCardResponseDTO scoreCardListvalue = null;
            scoreCardListvalue = this.scoreCardService.scoreCardDetailList(Long.valueOf(employeeId).longValue(), pageId, flag);
            if (scoreCardListvalue != null && scoreCardListvalue.getCardDetailsDTO() != null) {
                scoreCardListvalue.setScoreCardName(scoreCardListvalue.getCardDetailsDTO().getScorecardName());
                return new ResponseEntity(scoreCardList, HttpStatus.OK);
            }
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity(scoreCardList, HttpStatus.OK);
    }

    @GetMapping(value={"/scoreCardList"})
    public ResponseEntity<ScoreCardResponseDTO> getscoreCardList(@RequestParam(value="pageId", required=false) String pageId, @RequestParam(value="datePeriod", required=false) String datePeriod, @RequestParam(value="empId", required=false) String empId, @RequestParam(value="loadFlag", required=false) String loadFlag, HttpServletRequest request) {
        boolean flag = loadFlag != null ? Boolean.valueOf(loadFlag) : true;
        String sessionUserId = this.sessionUtil.getSessionId(request);
        String employeeId = StringUtils.isNotEmpty((CharSequence)empId) ? empId : sessionUserId;
        request.getSession().setAttribute("datePeriod", datePeriod);
        UserThreadLocal.get().setDatePeriod(datePeriod);
        if (StringUtils.isNotEmpty((CharSequence)UserThreadLocal.get().getDatePeriod())) {
            UserThreadLocal.get().getCommonHeaders().put("DATE_PERIOD", UserThreadLocal.get().getDatePeriod());
        }
        ScoreCardResponseDTO scoreCardList = null;
        if (datePeriod != null) {
            this.log.info(" 659 check scoreCardList api  start timing: {} ", LocalDateTime.now());
            scoreCardList = this.scoreCardService.scoreCardListByDate(Long.valueOf(employeeId).longValue(), pageId, false, datePeriod);
            this.log.info(" 661 check scorecard method end timing: {} ", LocalDateTime.now());
            if (scoreCardList != null && scoreCardList.getCardDetailsDTO() == null) {
                ScoreCardResponseDTO check = this.scoreCardService.scoreCardDetailList(Long.valueOf(employeeId).longValue(), pageId, flag);
                if (check != null && check.getCardDetailsDTO() != null) {
                    if (check.getCardDetailsDTO().getPageId() != null && check.getCardDetailsDTO().getScorecardName() != null) {
                        scoreCardList.setScoreCardName(check.getCardDetailsDTO().getScorecardName());
                        return new ResponseEntity(scoreCardList, HttpStatus.OK);
                    }
                    return new ResponseEntity(HttpStatus.NOT_FOUND);
                }
                return new ResponseEntity(HttpStatus.NOT_FOUND);
            }
        } else {
            scoreCardList = this.scoreCardService.scoreCardDetailList(Long.valueOf(employeeId).longValue(), pageId, flag);
        }
        if (scoreCardList != null && scoreCardList.getCardDetailsDTO() != null) {
            scoreCardList.setScoreCardName(scoreCardList.getCardDetailsDTO().getScorecardName());
            return new ResponseEntity(scoreCardList, HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    @GetMapping(value={"/scoreCardListDept"})
    public ResponseEntity<ScoreCardResponseDTO> scoreCardDeptList(@RequestParam(value="pageId", required=false) String pageId, @RequestParam(value="datePeriod", required=false) String datePeriod, @RequestParam(value="deptId", required=false) String deptId, @RequestParam(value="loadFlag", required=false) String loadFlag, HttpServletRequest request) {
        boolean flag = loadFlag != null ? Boolean.valueOf(loadFlag) : true;
        String sessionUserId = this.sessionUtil.getSessionId(request);
        request.getSession().setAttribute("datePeriod", datePeriod);
        UserThreadLocal.get().setDatePeriod(datePeriod);
        if (StringUtils.isNotEmpty((CharSequence)UserThreadLocal.get().getDatePeriod())) {
            UserThreadLocal.get().getCommonHeaders().put("DATE_PERIOD", UserThreadLocal.get().getDatePeriod());
        }
        ScoreCardResponseDTO scoreCardList = null;
        Long empId = this.scoreCardService.getDeptOwner(Long.valueOf(Long.parseLong(deptId)));
        if (empId != null) {
            HeaderThreadLocal.get().put("LOGGED_IN_EMPLOYEE_ID", String.valueOf(empId));
        }
        if (datePeriod != null) {
            scoreCardList = this.scoreCardService.scoreCardListByDate(empId.longValue(), pageId, false, datePeriod);
            if (scoreCardList != null && scoreCardList.getCardDetailsDTO() == null) {
                ScoreCardResponseDTO check = this.scoreCardService.scoreCardDetailList(empId.longValue(), pageId, flag);
                if (check != null && check.getCardDetailsDTO() != null) {
                    if (check.getCardDetailsDTO().getPageId() != null && check.getCardDetailsDTO().getScorecardName() != null) {
                        scoreCardList.setScoreCardName(check.getCardDetailsDTO().getScorecardName());
                        return new ResponseEntity(scoreCardList, HttpStatus.OK);
                    }
                    return new ResponseEntity(HttpStatus.NOT_FOUND);
                }
                return new ResponseEntity(HttpStatus.NOT_FOUND);
            }
        } else {
            scoreCardList = this.scoreCardService.scoreCardDetailListDept(Long.valueOf(deptId).longValue(), pageId, flag);
        }
        if (scoreCardList != null && scoreCardList.getCardDetailsDTO() != null) {
            scoreCardList.setScoreCardName(scoreCardList.getCardDetailsDTO().getScorecardName());
            return new ResponseEntity(scoreCardList, HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    @ResponseBody
    @GetMapping(value={"/reporteeList"})
    public List<Employee> getReporteeList(HttpServletRequest request) {
        List allRepoteeList = this.employeeService.getAllReporteeList(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue());
        List reporteeIds = ((java.util.List<com.estrat.web.dto.Employee>)allRepoteeList).stream().map(employee -> employee.getEmpId()).collect(Collectors.toList());
        if (UserThreadLocal.get().getProfile().getUserAccess() == 1) {
            if (TempUserThreadLocal.get() != null && TempUserThreadLocal.get().getProfile() != null) {
                allRepoteeList.add(TempUserThreadLocal.get().getProfile());
                reporteeIds.add(Long.valueOf(TempUserThreadLocal.get().getProfile().getEmpId()));
            } else {
                allRepoteeList.add(UserThreadLocal.get().getProfile());
                reporteeIds.add(Long.valueOf(UserThreadLocal.get().getProfile().getEmpId()));
            }
        } else if (TempUserThreadLocal.get() != null && TempUserThreadLocal.get().getProfile() != null) {
            allRepoteeList.add(TempUserThreadLocal.get().getProfile());
            reporteeIds.add(Long.valueOf(TempUserThreadLocal.get().getProfile().getEmpId()));
        }
        for (Object _obj_employee2 : allRepoteeList) {
            Employee employee2 = (Employee) _obj_employee2;
            employee2.getEmailAddress();
        }
        request.getSession().setAttribute("reporteeIds", reporteeIds);
        return allRepoteeList;
    }

    @ResponseBody
    @GetMapping(value={"/deptReporteeList"})
    public List<Employee> deptReporteeList(HttpServletRequest request) {
        ControlPanelGeneralDTO cpanel = this.controlPanelGeneralService.findByOrgId(UserThreadLocal.get().getProfile().getOrgDetails().getOrgId());
        List<Employee> allRepoteeList = new ArrayList();
        if (cpanel != null && cpanel.getImplementationType() != null && cpanel.getImplementationType().equalsIgnoreCase("department")) {
            allRepoteeList = this.employeeService.getAllDeptReporteeList(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue());
        } else {
            allRepoteeList = this.employeeService.getAllReporteeList(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue());
            List reporteeIds = ((java.util.List<com.estrat.web.dto.Employee>)allRepoteeList).stream().map(employee -> employee.getEmpId()).collect(Collectors.toList());
            if (UserThreadLocal.get().getProfile().getUserAccess() == 1) {
                if (TempUserThreadLocal.get() != null && TempUserThreadLocal.get().getProfile() != null) {
                    allRepoteeList.add(TempUserThreadLocal.get().getProfile());
                    reporteeIds.add(Long.valueOf(TempUserThreadLocal.get().getProfile().getEmpId()));
                } else {
                    allRepoteeList.add(UserThreadLocal.get().getProfile());
                    reporteeIds.add(Long.valueOf(UserThreadLocal.get().getProfile().getEmpId()));
                }
            } else if (TempUserThreadLocal.get() != null && TempUserThreadLocal.get().getProfile() != null) {
                allRepoteeList.add(TempUserThreadLocal.get().getProfile());
                reporteeIds.add(Long.valueOf(TempUserThreadLocal.get().getProfile().getEmpId()));
            }
            for (Object _obj_employee2 : allRepoteeList) {
                Employee employee2 = (Employee) _obj_employee2;
                employee2.getEmailAddress();
            }
            request.getSession().setAttribute("reporteeIds", reporteeIds);
        }
        return allRepoteeList;
    }

    @ResponseBody
    @GetMapping(value={"/completereporteeList"})
    public List<Employee> getCompleteReporteeList(HttpServletRequest request) {
        List allRepoteeList = this.employeeService.getAllReporteeList(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue());
        if (UserThreadLocal.get().getProfile().getUserAccess() == 1) {
            if (TempUserThreadLocal.get() != null && TempUserThreadLocal.get().getProfile() != null) {
                allRepoteeList.add(TempUserThreadLocal.get().getProfile());
            } else {
                allRepoteeList.add(UserThreadLocal.get().getProfile());
            }
        } else if (TempUserThreadLocal.get() != null && TempUserThreadLocal.get().getProfile() != null) {
            allRepoteeList.add(TempUserThreadLocal.get().getProfile());
        }
        List reporteeIds = ((java.util.List<com.estrat.web.dto.Employee>)allRepoteeList).stream().map(employee -> employee.getEmpId()).collect(Collectors.toList());
        reporteeIds.add(Long.valueOf(this.sessionUtil.getSessionId(request)));
        request.getSession().setAttribute("reporteeIds", reporteeIds);
        return allRepoteeList;
    }

    @RequestMapping(value={"/custompage/{id}"}, method={RequestMethod.GET})
    public String custompage(WebRequest webRequest, HttpServletRequest request, HttpServletResponse response, @PathVariable(value="id") long id) {
        request.getSession().setAttribute("pagenumber", id);
        PageDTO pageDTO = (PageDTO) (PageDTO)this.pageService.getPageDetails(id).getBody();
        if ("Standard_View".equalsIgnoreCase(pageDTO.getPageType())) {
            // empty if block
        }
        return "pages/dashboard/dashboard";
    }

    @RequestMapping(value={"/saveScoreCardDetails"}, method={RequestMethod.POST})
    public ResponseEntity<Map> saveScoreCardDetailsDetails(WebRequest webRequest, @RequestParam(value="scoreCardData", required=true) MultipartFile scoreCardData, @RequestParam(value="type", required=false) String type, @RequestParam(value="language", required=false) String language) {
        String Message = "No Records Processed";
        Map mapValue = new HashMap();
        try {
            mapValue = this.scoreCardReaderUtil.readBulkScoreCardDetails(scoreCardData.getInputStream(), type, language);
        }
        catch (Exception e) {
            mapValue.put("message", Message);
            return new ResponseEntity(mapValue, HttpStatus.OK);
        }
        return new ResponseEntity(mapValue, HttpStatus.OK);
    }

    @RequestMapping(value={"/uploadETLFile"}, method={RequestMethod.POST})
    public ResponseEntity<Map> uploadETLData(WebRequest webRequest, @RequestParam(value="etlFile", required=true) MultipartFile etlFile, @RequestParam(value="type", required=false) String type) {
        String Message = "No Records Processed";
        Map mapValue = new HashMap();
        if (type.equalsIgnoreCase("validation")) {
            try {
                mapValue = this.etlReaderUtil.readEtl(etlFile.getInputStream());
            }
            catch (Exception e) {
                mapValue.put("message", Message);
                return new ResponseEntity(mapValue, HttpStatus.OK);
            }
            return new ResponseEntity(mapValue, HttpStatus.OK);
        }
        Boolean response = this.etlFileUploadUtil.uploadETLFile(etlFile);
        if (response.booleanValue()) {
            mapValue.put("message", "success");
        } else {
            mapValue.put("message", Message);
        }
        this.auditTrailService.save("Excel - ETL Upload");
        return new ResponseEntity(mapValue, HttpStatus.OK);
    }

    @RequestMapping(value={"/uploadXLFile"}, method={RequestMethod.POST})
    public ResponseEntity<Map> uploadXLFile(WebRequest webRequest, @RequestParam(value="xlsfile", required=true) MultipartFile etlFile, @RequestParam(value="type", required=false) String type) {
        String Message = "No Records Processed";
        Map mapValue = new HashMap();
        if (type.equalsIgnoreCase("validation")) {
            try {
                mapValue = this.etlReaderUtil.readxls(etlFile.getInputStream());
            }
            catch (Exception e) {
                mapValue.put("message", Message);
                return new ResponseEntity(mapValue, HttpStatus.OK);
            }
            return new ResponseEntity(mapValue, HttpStatus.OK);
        }
        Boolean response = this.etlFileUploadUtil.uploadETLFile(etlFile);
        this.auditTrailService.save("Excel - XLS Upload");
        return new ResponseEntity(mapValue, HttpStatus.OK);
    }

    @RequestMapping(value={"/risksummary"}, method={RequestMethod.GET})
    public String riskSummary(WebRequest webRequest, HttpServletRequest request, HttpServletResponse response) {
        return "pages/organization/riskSummary";
    }

    @RequestMapping(value={"/dashboardPreference"}, method={RequestMethod.GET})
    public String dashboardPreference(@RequestParam(value="pageId", required=false) String pageId, WebRequest webRequest, HttpServletRequest request, HttpServletResponse response) {
        request.setAttribute("pageId", pageId);
        return "pages/organization/dashboardPreference";
    }

    @RequestMapping(value={"/dashboardMeeting"}, method={RequestMethod.GET})
    public String dashboardMeeting(WebRequest webRequest, HttpServletRequest request, HttpServletResponse response) {
        return "pages/organization/dashboard_meeting";
    }

    @RequestMapping(value={"/dashboardSwotanalysis"}, method={RequestMethod.GET})
    public String dashboardSwotanalysis(WebRequest webRequest, HttpServletRequest request, HttpServletResponse response) {
        return "pages/organization/dashboard_swotanalysis";
    }

    @RequestMapping(value={"/dashboardPestelanalysis"}, method={RequestMethod.GET})
    public String dashboardPestelanalysis(WebRequest webRequest, HttpServletRequest request, HttpServletResponse response) {
        return "pages/organization/dashboard_pestelanalysis";
    }

    @RequestMapping(value={"/accesscontrol"}, method={RequestMethod.GET})
    public String accesscontrol(WebRequest webRequest, HttpServletRequest request, HttpServletResponse response) {
        request.getSession().setAttribute("accessPgFlag", "");
        request.getSession().setAttribute("controlPgFlag", "");
        request.getSession().setAttribute("orgPgFlag", "");
        HomePreferencesDTO homepreferences = this.dashBoardPreferencesService.retrieveHomePagePreferences(Long.valueOf(this.sessionUtil.getSessionId(request)));
        if (homepreferences.getPageName() != null && homepreferences.getPageName().equals("Access Control")) {
            request.getSession().setAttribute("accessPgFlag", true);
        }
        return "pages/organization/accesscontrol";
    }

    @RequestMapping(value={"/controlpanel"}, method={RequestMethod.GET})
    public String controlpanel(WebRequest webRequest, HttpServletRequest request, HttpServletResponse response) {
        request.getSession().setAttribute("accessPgFlag", "");
        request.getSession().setAttribute("controlPgFlag", "");
        request.getSession().setAttribute("orgPgFlag", "");
        HomePreferencesDTO homepreferences = this.dashBoardPreferencesService.retrieveHomePagePreferences(Long.valueOf(this.sessionUtil.getSessionId(request)));
        if (homepreferences != null && homepreferences.getPageName() != null && homepreferences.getPageName().equals("Control Panel")) {
            request.getSession().setAttribute("controlPgFlag", true);
        }
        return "pages/organization/controlpanel";
    }

    @RequestMapping(value={"/kpidataform"}, method={RequestMethod.GET})
    public String kpidataform(WebRequest webRequest, HttpServletRequest request, HttpServletResponse response) {
        return "pages/organization/kpidata_form";
    }

    @GetMapping(value={"/downloadScoreCard"})
    public ResponseEntity<ByteArrayResource> downloadScoreCard(@RequestParam(value="pageId", required=false) String pageId, @RequestParam(value="datePeriod", required=false) String datePeriod, @RequestParam(value="empId", required=false) String empId, @RequestParam(value="loadFlag", required=false) String loadFlag, HttpServletRequest request) throws Exception {
        boolean flag = loadFlag != null ? Boolean.valueOf(loadFlag) : true;
        String sessionId = this.sessionUtil.getSessionId(request);
        String employeeId = StringUtils.isNotEmpty((CharSequence)empId) ? empId : sessionId;
        request.getSession().setAttribute("datePeriod", datePeriod);
        UserThreadLocal.get().setDatePeriod(datePeriod);
        if (StringUtils.isNotEmpty((CharSequence)UserThreadLocal.get().getDatePeriod())) {
            UserThreadLocal.get().getCommonHeaders().put("DATE_PERIOD", UserThreadLocal.get().getDatePeriod());
        }
        ScoreCardResponseDTO scoreCardList = null;
        if (datePeriod != null) {
            scoreCardList = this.scoreCardService.scoreCardListByDate(Long.valueOf(employeeId).longValue(), pageId, false, datePeriod);
            if (scoreCardList != null && scoreCardList.getCardDetailsDTO() != null) {
                scoreCardList.setScoreCardName(scoreCardList.getCardDetailsDTO().getScorecardName());
            } else {
                Map stringMap = this.scoreCardService.checkScoreCardData(Long.valueOf(employeeId).longValue(), pageId);
                scoreCardList.setScoreCardName((String)stringMap.get("ScorePageName"));
            }
        } else {
            scoreCardList = this.scoreCardService.scoreCardList(Long.valueOf(employeeId).longValue(), pageId, flag);
            if (scoreCardList != null && scoreCardList.getCardDetailsDTO() != null) {
                scoreCardList.setScoreCardName(scoreCardList.getCardDetailsDTO().getScorecardName());
            }
        }
        return this.scoreCardReaderUtil.writeDocForScoreCard(scoreCardList);
    }

    @PostMapping(value={"/scorecardDetails"})
    public ResponseEntity<ScoreCardResponseDTO> saveScorecardDetails(@RequestBody ScoreCardDetailsDTO detailsDTO, HttpServletRequest request) {
        detailsDTO.setCreatedBy(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue());
        return this.scoreCardService.saveScoreCardDetails(detailsDTO);
    }

    @PutMapping(value={"/scorecardDetails"})
    public ResponseEntity<ScoreCardResponseDTO> UpdateScorecardDetails(@RequestBody ScoreCardDetailsDTO detailsDTO, HttpServletRequest request) {
        detailsDTO.setUpdatedBy(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue());
        detailsDTO.setUpdatedTime(LocalDateTime.now());
        return this.scoreCardService.updateScoreCardDetails(detailsDTO);
    }

    @GetMapping(value={"/checkScoreName/{empId}"})
    public ResponseEntity<Map> scoreName(@PathVariable(value="empId") long empId, @RequestParam(value="scorename", required=false) String scoreName, @RequestParam(value="pageId", required=false) long pageId) throws RequestException {
        return this.scoreCardService.checkScoreName(empId, scoreName, pageId);
    }

    @PutMapping(value={"/changePerspectiveName"})
    public ResponseEntity<Map> changeScoreName(@RequestParam(value="scorecardId", required=false) String scorecardId, @RequestParam(value="name", required=false) String name) throws RequestException {
        return this.scoreCardService.changeScoreName(scorecardId, name);
    }

    @GetMapping(value={"/check/{empId}"})
    public ResponseEntity<Map<String, ScoreCardDTO>> scoreCardMap(@PathVariable(value="empId") long empId, @RequestParam(value="pageId", required=false) String pageId) throws RequestException {
        Map map = this.scoreCardService.scoreCardMap(empId, pageId, true);
        return new ResponseEntity(map, HttpStatus.OK);
    }

    @GetMapping(value={"/pagesDropDownList/{empId}"})
    public ResponseEntity<Map> pagesDropDownList(@PathVariable(value="empId") Long empId, @RequestParam(value="type") String type, HttpServletRequest request) throws RequestException {
        HashMap<String, List> stringObjectMap = new HashMap<String, List>();
        if (type.equals("SCORECARD")) {
            stringObjectMap.put("resultObject", this.pageService.pageListByPageType(empId.longValue(), type));
        } else if (type.equals("KPI")) {
            stringObjectMap.put("resultObject", this.kpiService.kpiListByEmpId(empId.longValue()));
        } else if (type.equals("INITIATIVE")) {
            stringObjectMap.put("resultObject", this.pageService.pageListByPageType(empId.longValue(), type));
        } else if (type.equals("RISK")) {
            stringObjectMap.put("resultObject", this.pageService.pageListByPageType(empId.longValue(), type));
        }
        return new ResponseEntity(stringObjectMap, HttpStatus.OK);
    }

    @RequestMapping(value={"/excelupload"}, method={RequestMethod.GET})
    public String excelUpload(WebRequest webRequest, HttpServletRequest request, HttpServletResponse response) {
        return "pages/organization/excelupload";
    }

    @RequestMapping(value={"/exceltemplate"}, method={RequestMethod.GET})
    public String excelTemplate(WebRequest webRequest, HttpServletRequest request, HttpServletResponse response) {
        return "pages/organization/exceltemplate";
    }

    @RequestMapping(value={"/audittrailpage"}, method={RequestMethod.GET})
    public String auditTraiPage(WebRequest webRequest, HttpServletRequest request, HttpServletResponse response) {
        return "pages/organization/audittrailpage";
    }

    @GetMapping(value={"/scoreCardDetailListByEmpId/{empId}"})
    public ResponseEntity<List<ScoreCardDetailsDTO>> scoreCardDetailListByEmpId(@PathVariable(value="empId") long empId) {
        return new ResponseEntity(this.scoreCardService.scoreCardDetailListByEmpId(empId), HttpStatus.OK);
    }

    @GetMapping(value={"/scoreCardDetailListByDeptId/{deptId}"})
    public ResponseEntity<List<ScoreCardDetailsDTO>> scoreCardDetailListByDeptId(@PathVariable(value="deptId") long deptId) {
        return new ResponseEntity(this.scoreCardService.scoreCardDetailListByDeptId(deptId), HttpStatus.OK);
    }

    @GetMapping(value={"/scoreCardListByEmpId"})
    public ResponseEntity<List<ScorecardList>> scoreCardListByEmpId() {
        return new ResponseEntity(this.scoreCardService.scoreCardListByEmpId(), HttpStatus.OK);
    }

    @GetMapping(value={"/scoreCardListByDeptId"})
    public ResponseEntity<List<ScorecardList>> scoreCardListByDeptId() {
        return new ResponseEntity(this.scoreCardService.scoreCardListByDeptId(), HttpStatus.OK);
    }

    @GetMapping(value={"/getscoreCardListByDeptIds"})
    public ResponseEntity<List<ScorecardList>> getscoreCardListByDeptId(@RequestParam(value="deptIds", required=false) String deptIds) {
        return new ResponseEntity(this.scoreCardService.getscoreCardListByDeptId(deptIds), HttpStatus.OK);
    }

    @RequestMapping(value={"/userrolemanagement"}, method={RequestMethod.GET})
    public String userrolePage(WebRequest webRequest, HttpServletRequest request, HttpServletResponse response) {
        return "pages/organization/userrolemanagement";
    }

    @RequestMapping(value={"/orgtracker"}, method={RequestMethod.GET})
    public String orgtrackerPage(WebRequest webRequest, HttpServletRequest request, HttpServletResponse response) {
        return "pages/organization/orgtracker";
    }

    @GetMapping(value={"/formScoreCardDetailList"})
    public ResponseEntity<List<ScoreCardDetailsDTO>> formScoreCardDetailList(HttpServletRequest request) {
        return new ResponseEntity(this.scoreCardService.formScoreCardDetailList(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue()), HttpStatus.OK);
    }

    @GetMapping(value={"/checkScore/{empId}"})
    public ResponseEntity<Map<String, String>> checkScore(@PathVariable(value="empId") Long empId, @RequestParam(value="dateRange", required=false) String dateRange) {
        return new ResponseEntity(this.scoreCardService.checkScore(empId.longValue(), dateRange), HttpStatus.OK);
    }

    @GetMapping(value={"/checkScoreCardData/{empId}"})
    public ResponseEntity<Map<String, String>> checkScoreCardData(@PathVariable(value="empId") long empId, @RequestParam(value="pageId", required=false) String pageId) throws RequestException {
        return new ResponseEntity(this.scoreCardService.checkScoreCardData(empId, pageId), HttpStatus.OK);
    }

    @RequestMapping(value={"/masters"}, method={RequestMethod.GET})
    public String masters(Model model, WebRequest webRequest, HttpServletRequest request, HttpServletResponse response) {
        return "pages/organization/masters";
    }

    @RequestMapping(value={"/processenabler"}, method={RequestMethod.GET})
    public String processenable(@RequestParam(value="pageId", required=false) String pageId, Model model, WebRequest webRequest, HttpServletRequest request, HttpServletResponse response) {
        request.setAttribute("pageId", pageId);
        return "pages/organization/processenabler";
    }

    @RequestMapping(value={"/rpo"}, method={RequestMethod.GET})
    public String rpoPage(@RequestParam(value="pageId", required=false) String pageId, Model model, WebRequest webRequest, HttpServletRequest request, HttpServletResponse response) {
        request.setAttribute("pageId", pageId);
        return "pages/organization/rpo";
    }

    @RequestMapping(value={"/impactAssesment"}, method={RequestMethod.GET})
    public String impactSurvey(@RequestParam(value="pageId", required=false) String pageId, WebRequest webRequest, HttpServletRequest request, HttpServletResponse response) {
        request.setAttribute("pageId", pageId);
        return "pages/organization/impactSurvey";
    }

    @RequestMapping(value={"/approvalPage"}, method={RequestMethod.GET})
    public String approvalPage(@RequestParam(value="pageId", required=false) String pageId, WebRequest webRequest, HttpServletRequest request, HttpServletResponse response) {
        request.setAttribute("pageId", pageId);
        return "pages/organization/approvalPage";
    }

    @RequestMapping(value={"/riskView"}, method={RequestMethod.GET})
    public String riskView(@RequestParam(value="pageId", required=false) String pageId, WebRequest webRequest, HttpServletRequest request, HttpServletResponse response) {
        request.setAttribute("pageId", pageId);
        return "pages/organization/riskView";
    }

    @RequestMapping(value={"/riskPageView"}, method={RequestMethod.GET})
    public String riskPageView(@RequestParam(value="riskId", required=false) String riskId, @RequestParam(value="pageId", required=false) String pageId, HttpServletRequest request, HttpServletResponse response) {
        String empId = String.valueOf(UserThreadLocal.get().getProfile().getEmpId());
        List pageList = this.pageService.pageList(Long.valueOf(empId).longValue());
        request.setAttribute("pageList", pageList);
        if (riskId != null) {
            request.setAttribute("riskId", riskId);
            StagingChangeDTO stagingChange = this.stagingChangeService.getStagingChangeDetails(Long.valueOf(riskId));
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.registerModule((Module)new JavaTimeModule());
            Map oldValueMap = stagingChange.getOldValue();
            RiskDTO riskDTO = (RiskDTO)objectMapper.convertValue(oldValueMap, RiskDTO.class);
            riskDTO.setChangeId(stagingChange.getId().longValue());
            if (riskDTO.getPageId() == Long.valueOf(riskId).longValue()) {
                request.setAttribute("riskDetail", riskDTO);
            }
        }
        return "pages/organization/risk";
    }

    @RequestMapping(value={"/budget"}, method={RequestMethod.GET})
    public String budget(@RequestParam(value="pageId", required=false) String pageId, WebRequest webRequest, HttpServletRequest request, HttpServletResponse response) {
        request.setAttribute("pageId", pageId);
        return "pages/organization/budget";
    }

    @RequestMapping(value={"/report"}, method={RequestMethod.GET})
    public String report(@RequestParam(value="pageId", required=false) String pageId, WebRequest webRequest, HttpServletRequest request, HttpServletResponse response) {
        request.setAttribute("pageId", pageId);
        return "pages/organization/report";
    }

    @RequestMapping(value={"/visionmisson"}, method={RequestMethod.GET})
    public String visionmisson(@RequestParam(value="pageId", required=false) String pageId, WebRequest webRequest, HttpServletRequest request, HttpServletResponse response) {
        request.setAttribute("pageId", pageId);
        return "pages/organization/visionmisson";
    }

    @RequestMapping(value={"/storyOfChange"}, method={RequestMethod.GET})
    public String storyofchange(@RequestParam(value="pageId", required=false) String pageId, WebRequest webRequest, HttpServletRequest request, HttpServletResponse response) {
        request.setAttribute("pageId", pageId);
        return "pages/organization/storyofchange";
    }

    @RequestMapping(value={"/qualitativeData"}, method={RequestMethod.GET})
    public String qualitativedata(@RequestParam(value="pageId", required=false) String pageId, WebRequest webRequest, HttpServletRequest request, HttpServletResponse response) {
        request.setAttribute("pageId", pageId);
        return "pages/organization/qualitativedata";
    }

    @RequestMapping(value={"/KpiDataFormView"}, method={RequestMethod.GET})
    public String kpiDataFormView(@RequestParam(value="kpiId", required=false) String kpiId, @RequestParam(value="measureId", required=false) String measureId, @RequestParam(value="subMeasureId", required=false) String subMeasureId, @RequestParam(value="scorecardId", required=false) String scorecardId, @RequestParam(value="changeId", required=false) String changeId, WebRequest webRequest, HttpServletRequest request, HttpServletResponse response) {
        request.setAttribute("kpiId", kpiId);
        request.setAttribute("measureId", measureId);
        request.setAttribute("subMeasureId", subMeasureId);
        request.setAttribute("scorecardId", scorecardId);
        return "pages/organization/kpidata_formView";
    }

    @RequestMapping(value={"/budgetView"}, method={RequestMethod.GET})
    public String budgetView(@RequestParam(value="pageId", required=false) String pageId, @RequestParam(value="changeId", required=false) String changeId, WebRequest webRequest, HttpServletRequest request, HttpServletResponse response) {
        request.setAttribute("pageId", pageId);
        request.setAttribute("changeId", changeId);
        return "pages/organization/budgetView";
    }

    @RequestMapping(value={"/task"}, method={RequestMethod.GET})
    public String task(WebRequest webRequest, HttpServletRequest request, HttpServletResponse response) {
        return "pages/organization/task";
    }

    @RequestMapping(value={"/compliance"}, method={RequestMethod.GET})
    public String compliance(WebRequest webRequest, HttpServletRequest request, HttpServletResponse response) {
        return "pages/organization/compliance";
    }

    @RequestMapping(value={"/kpiPerformanceContract"}, method={RequestMethod.GET})
    public String kpiPerformanceform(WebRequest webRequest, HttpServletRequest request, HttpServletResponse response) {
        return "pages/organization/kpiPerformanceContract";
    }

    @RequestMapping(value={"/riskRadar"}, method={RequestMethod.GET})
    public String riskRadar(WebRequest webRequest, HttpServletRequest request, HttpServletResponse response) {
        return "pages/organization/riskRadar";
    }

    @RequestMapping(value={"/performanceImprovementPlan"}, method={RequestMethod.GET})
    public String performanceImprovementPlan(WebRequest webRequest, HttpServletRequest request, HttpServletResponse response) {
        return "pages/organization/PerformanceImprovementPlan";
    }

    @RequestMapping(value={"/auditManagementPage"}, method={RequestMethod.GET})
    public String auditManagement(WebRequest webRequest, HttpServletRequest request, HttpServletResponse response) {
        return "pages/organization/auditManagementPage";
    }

    @RequestMapping(value={"/initiativeStrategic"}, method={RequestMethod.GET})
    public String initiativeStrategic(WebRequest webRequest, HttpServletRequest request, HttpServletResponse response) {
        return "pages/organization/InitiativeStrategic";
    }

    @RequestMapping(value={"/complianceDashboard"}, method={RequestMethod.GET})
    public String complianceDashboard(WebRequest webRequest, HttpServletRequest request, HttpServletResponse response) {
        return "pages/organization/complianceDashboard";
    }

    @RequestMapping(value={"/scorecardDashboard"}, method={RequestMethod.GET})
    public String scorecardDashBoard(WebRequest webRequest, HttpServletRequest request, HttpServletResponse response) {
        return "pages/organization/scorecardDashboard";
    }

    @RequestMapping(value={"/riskDashboard"}, method={RequestMethod.GET})
    public String riskDashBoard(WebRequest webRequest, HttpServletRequest request, HttpServletResponse response) {
        return "pages/organization/riskDashboard";
    }

    @RequestMapping(value={"/incidentManagement"}, method={RequestMethod.GET})
    public String incidentManagement(WebRequest webRequest, HttpServletRequest request, HttpServletResponse response) {
        return "pages/organization/IncidentManagement";
    }

    @RequestMapping(value={"/initiativeDashboard"}, method={RequestMethod.GET})
    public String initiativeDashboard(WebRequest webRequest, HttpServletRequest request, HttpServletResponse response) {
        return "pages/organization/initiativeDashboard";
    }

    @RequestMapping(value={"/auditDashboard"}, method={RequestMethod.GET})
    public String auditDashboard(WebRequest webRequest, HttpServletRequest request, HttpServletResponse response) {
        return "pages/organization/auditDashboard";
    }
}

