/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.util.RoleConstants
 */
package com.estrat.web.util;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class RoleConstants {
    public static final String SCORECARD = "Scorecard";
    public static final String INITIATIVES = "Initiatives & Projects";
    public static final String EMPLOYEE = "My Space";
    public static final String RISK = "Risk";
    public static final String RISKEVENT = "RiskEvent";
    public static final String SWOT = "SWOT";
    public static final String PESTEL = "PESTEL";
    public static final String MEETING = "Meetings";
    public static final String DASHBOARD = "Cockpit";
    public static final String ORGSTRUCTURE = "Organisation";
    public static final String CHARTS = "Charts";
    public static final String KPI = "KPI";
    public static final String ACCESSCONTROL = "Access Control";
    public static final String WORKFLOWS = "Workflows";
    public static final String NOTIFICATIONS = "Notifications";
    public static final String DATASOURCES = "Data Sources";
    public static final String TEMPLATE = "Template";
    public static final String CONTROL_PANEL = "Control Panel";
    public static final String STRATEGY_FORMULATION = "Strategy Formulation";
    public static final String PROJECT_FORMULATION = "Project Formulation";
    public static final String RISK_FORMULATION = "Risk Formulation";
    public static final String STRATEGY_MAP = "StrategyMap";
    public static final String PROCESS_ENABLER = "ProcessEnabler";
    public static final String IMPACT_SURVEY = "Impact Survey";
    public static final String RPO = "Rpo";
    public static final String APPROVALPAGE = "Approval Page";
    public static final String BUDGET = "Budget";
    public static final String REPORT = "Report";
    public static final String VISIONMISSON = "Vision Misson";
    public static final String STORYOFCHANGE = "StoryOfChange";
    public static final String QUALITATIVEDATA = "Qualitative Data";
    public static final String TASK = "Task";
    public static final String RISKRADAR = "RiskRadar";
    public static final String COMPLIANCE = "Compliance";
    public static final String AUDIT_MANAGEMENT = "AuditManagement";
    public static final String INITIATIVESTRATEGIC = "InitiativeStrategic";
    public static final String COMPLIANCEDASHBOARD = "ComplianceDashboard";
    public static final String SCORECARDDASHBOARD = "ScorecardDashboard";
    public static final String RISKDASHBOARD = "RiskDashboard";
    public static final String INCIDENTMANAGEMENT = "IncidentManagement";
    public static final String INITIATIVEDASHBOARD = "InitiativeDashboard";
    public static final String AUDITDASHBOARD = "AuditDashboard";
    public static final String POWERBI = "PowerBI";
    public static final String CREATE = "Create";
    public static final String UPDATE = "Update";
    public static final String VIEW = "View";
    public static final String DELETE = "Delete";
    public static final Map<String, String> pageMap = new HashMap();
    public static final Map<String, String> dashBoardTypeMap = new HashMap();
    public static final Map<String, String> whiteBoardTypeMap = new HashMap();
    public static final List<String> nonLicenseModules = new ArrayList();

    public static Map<String, String> getPageMap() {
        return pageMap;
    }

    public static Map<String, String> getDashBoardTypeMap() {
        return dashBoardTypeMap;
    }

    public static Map<String, String> getWhiteBoardTypeMap() {
        return whiteBoardTypeMap;
    }

    static {
        pageMap.put("Standard_View", SCORECARD);
        pageMap.put("Standard_View_View", SCORECARD);
        pageMap.put("InitiativesView", INITIATIVES);
        pageMap.put("RiskView", RISK);
        pageMap.put(INITIATIVES, INITIATIVES);
        pageMap.put(SWOT, SWOT);
        pageMap.put(MEETING, MEETING);
        pageMap.put(RISK, RISK);
        pageMap.put(RISKEVENT, RISKEVENT);
        pageMap.put(EMPLOYEE, EMPLOYEE);
        pageMap.put(SCORECARD, SCORECARD);
        pageMap.put(PESTEL, PESTEL);
        pageMap.put(DASHBOARD, DASHBOARD);
        pageMap.put(CHARTS, CHARTS);
        pageMap.put(REPORT, REPORT);
        pageMap.put(STRATEGY_MAP, STRATEGY_MAP);
        pageMap.put(VISIONMISSON, VISIONMISSON);
        pageMap.put(STORYOFCHANGE, STORYOFCHANGE);
        pageMap.put(QUALITATIVEDATA, QUALITATIVEDATA);
        pageMap.put(STRATEGY_FORMULATION, STRATEGY_FORMULATION);
        pageMap.put(PROJECT_FORMULATION, PROJECT_FORMULATION);
        pageMap.put(RISK_FORMULATION, RISK_FORMULATION);
        dashBoardTypeMap.put(SCORECARD, SCORECARD);
        dashBoardTypeMap.put("Scorecardview", "Scorecard View");
        dashBoardTypeMap.put("InitiativesView", "Initiatives View");
        dashBoardTypeMap.put(INITIATIVES, INITIATIVES);
        dashBoardTypeMap.put(SWOT, SWOT);
        dashBoardTypeMap.put(PESTEL, PESTEL);
        dashBoardTypeMap.put(MEETING, MEETING);
        dashBoardTypeMap.put(EMPLOYEE, EMPLOYEE);
        dashBoardTypeMap.put(RISK, RISK);
        dashBoardTypeMap.put(RISKEVENT, RISKEVENT);
        dashBoardTypeMap.put(STRATEGY_FORMULATION, STRATEGY_FORMULATION);
        dashBoardTypeMap.put(PROJECT_FORMULATION, PROJECT_FORMULATION);
        dashBoardTypeMap.put(RISK_FORMULATION, RISK_FORMULATION);
        whiteBoardTypeMap.put(DASHBOARD, DASHBOARD);
        whiteBoardTypeMap.put(CHARTS, CHARTS);
        whiteBoardTypeMap.put(REPORT, REPORT);
        dashBoardTypeMap.put("Strategy Map", "Strategy Map");
        dashBoardTypeMap.put("Process Enabalerr", "Process Enabaler");
        dashBoardTypeMap.put(IMPACT_SURVEY, IMPACT_SURVEY);
        dashBoardTypeMap.put(RPO, RPO);
        dashBoardTypeMap.put(APPROVALPAGE, APPROVALPAGE);
        dashBoardTypeMap.put("Risk View", "Risk View");
        dashBoardTypeMap.put(BUDGET, BUDGET);
        dashBoardTypeMap.put(VISIONMISSON, VISIONMISSON);
        dashBoardTypeMap.put(STORYOFCHANGE, STORYOFCHANGE);
        dashBoardTypeMap.put(QUALITATIVEDATA, QUALITATIVEDATA);
        dashBoardTypeMap.put(TASK, TASK);
        dashBoardTypeMap.put(RISKRADAR, RISKRADAR);
        dashBoardTypeMap.put(COMPLIANCE, COMPLIANCE);
        dashBoardTypeMap.put(AUDIT_MANAGEMENT, AUDIT_MANAGEMENT);
        dashBoardTypeMap.put(INITIATIVESTRATEGIC, INITIATIVESTRATEGIC);
        dashBoardTypeMap.put(COMPLIANCEDASHBOARD, COMPLIANCEDASHBOARD);
        dashBoardTypeMap.put(SCORECARDDASHBOARD, SCORECARDDASHBOARD);
        dashBoardTypeMap.put(RISKDASHBOARD, RISKDASHBOARD);
        dashBoardTypeMap.put(INCIDENTMANAGEMENT, INCIDENTMANAGEMENT);
        dashBoardTypeMap.put(INITIATIVEDASHBOARD, INITIATIVEDASHBOARD);
        dashBoardTypeMap.put(AUDITDASHBOARD, AUDITDASHBOARD);
        nonLicenseModules.add(ACCESSCONTROL);
        nonLicenseModules.add(CONTROL_PANEL);
        nonLicenseModules.add(EMPLOYEE);
        nonLicenseModules.add(DATASOURCES);
    }
}

