/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.controller.OrgChartController
 *  com.estrat.web.dto.DashBoardResponseDTO
 *  com.estrat.web.dto.HomePreferencesDTO
 *  com.estrat.web.exception.RequestException
 *  com.estrat.web.service.DashBoardPreferencesService
 *  com.estrat.web.service.OrgChartService
 *  com.estrat.web.util.RequestSessionUtil
 *  javax.servlet.http.HttpServletRequest
 *  javax.servlet.http.HttpServletResponse
 *  org.apache.log4j.Logger
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Controller
 *  org.springframework.web.bind.annotation.PathVariable
 *  org.springframework.web.bind.annotation.RequestMapping
 *  org.springframework.web.bind.annotation.RequestMethod
 *  org.springframework.web.bind.annotation.ResponseBody
 *  org.springframework.web.context.request.WebRequest
 */
package com.estrat.web.controller;

import com.estrat.web.dto.DashBoardResponseDTO;
import com.estrat.web.dto.HomePreferencesDTO;
import com.estrat.web.exception.RequestException;
import com.estrat.web.service.DashBoardPreferencesService;
import com.estrat.web.service.OrgChartService;
import com.estrat.web.util.RequestSessionUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.request.WebRequest;

@Controller
public class OrgChartController {
    private Logger log = LoggerFactory.getLogger(OrgChartController.class);
    @Autowired
    private OrgChartService chartService;
    @Autowired
    private DashBoardPreferencesService dashBoardPreferencesService;
    @Autowired
    protected RequestSessionUtil sessionUtil;

    @RequestMapping(value={"/organizationHome"}, method={RequestMethod.GET})
    public String organizationHome(WebRequest webRequest, HttpServletRequest request, HttpServletResponse response) {
        request.getSession().setAttribute("accessPgFlag", "");
        request.getSession().setAttribute("controlPgFlag", "");
        request.getSession().setAttribute("orgPgFlag", "");
        HomePreferencesDTO homePreferences = this.dashBoardPreferencesService.retrieveHomePagePreferences(Long.valueOf(this.sessionUtil.getSessionId(request)));
        if (homePreferences != null && homePreferences.getPageName() != null && homePreferences.getPageName().equals("Organisation")) {
            request.getSession().setAttribute("orgPgFlag", true);
        }
        return "pages/organization/org_structure_new";
    }

    @ResponseBody
    @RequestMapping(value={"/retrieveOrgChart/{empId}"}, method={RequestMethod.GET})
    public DashBoardResponseDTO retrieveOrgChart(@PathVariable(value="empId") String empId, HttpServletRequest request) throws RequestException {
        this.log.debug("Calling rest controller............");
        DashBoardResponseDTO boardResponseDTO = new DashBoardResponseDTO();
        boardResponseDTO.setNodeList(this.chartService.fetchOrgChartDetails(empId));
        return boardResponseDTO;
    }
}

