/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.resource.util.RoleConstants
 */
package com.estrat.service.db.resource.util;

import java.util.HashMap;
import java.util.Map;

public class RoleConstants {
    public static final String SCORECARD = "Scorecard";
    public static final String INITIATIVES = "Initiatives & Projects";
    public static final String EMPLOYEE = "My Space";
    public static final String RISK = "Risk";
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
    public static final String CREATE = "Create";
    public static final String UPDATE = "Update";
    public static final String VIEW = "View";
    public static final String DELETE = "Delete";
    public static final Map<String, Object> privilegeAll = new HashMap();
    public static final Map<String, Object> privilegeAllWithFALSE = new HashMap();
    public static final Map<String, Object> privilegeView = new HashMap();
    public static final Map<String, Object> privilegeCreate = new HashMap();
    public static final Map<String, Object> privilegeUpdate = new HashMap();
    public static final Map<String, Object> privilegeDelete = new HashMap();
    public static final Map<String, Object> privilegeViewAND_NA_ALL = new HashMap();
    public static final Map<String, Object> privilegeViewAND_NA_ALL_FALSE = new HashMap();
    public static final Map<String, Object> privilegeCreateAND_NA_ALL = new HashMap();
    public static final Map<String, Object> privilegeUpdateAND_NA_ALL = new HashMap();
    public static final Map<String, Object> privilegeDeleteAND_NA_ALL = new HashMap();
    public static final Map<String, Object> privilegeViewAndCreate_NA_ALL = new HashMap();
    public static final Map<String, Object> privilegeViewAndCreate_NA_ALL_FALSE = new HashMap();

    public static Map<String, Object> getPrivilegeAll() {
        return privilegeAll;
    }

    public static Map<String, Object> getPrivilegeAllWithFALSE() {
        return privilegeAllWithFALSE;
    }

    public static Map<String, Object> getPrivilegeView() {
        return privilegeView;
    }

    public static Map<String, Object> getPrivilegeCreate() {
        return privilegeCreate;
    }

    public static Map<String, Object> getPrivilegeUpdate() {
        return privilegeUpdate;
    }

    public static Map<String, Object> getPrivilegeDelete() {
        return privilegeDelete;
    }

    public static Map<String, Object> getPrivilegeViewAND_NA_ALL() {
        return privilegeViewAND_NA_ALL;
    }

    public static Map<String, Object> getPrivilegeCreateAND_NA_ALL() {
        return privilegeCreateAND_NA_ALL;
    }

    public static Map<String, Object> getPrivilegeUpdateAND_NA_ALL() {
        return privilegeUpdateAND_NA_ALL;
    }

    public static Map<String, Object> getPrivilegeDeleteAND_NA_ALL() {
        return privilegeDeleteAND_NA_ALL;
    }

    public static Map<String, Object> getPrivilegeViewAndCreate_NA_ALL() {
        return privilegeViewAndCreate_NA_ALL;
    }

    public static Map<String, Object> getPrivilegeViewAndCreate_NA_ALL_FALSE() {
        return privilegeViewAndCreate_NA_ALL_FALSE;
    }

    public static Map<String, Object> getPrivilegeviewandNaAllFalse() {
        return privilegeViewAND_NA_ALL_FALSE;
    }

    static {
        privilegeAll.put(CREATE, "TRUE");
        privilegeAll.put(VIEW, "TRUE");
        privilegeAll.put(UPDATE, "TRUE");
        privilegeAll.put(DELETE, "TRUE");
        privilegeAllWithFALSE.put(CREATE, "FALSE");
        privilegeAllWithFALSE.put(VIEW, "FALSE");
        privilegeAllWithFALSE.put(UPDATE, "FALSE");
        privilegeAllWithFALSE.put(DELETE, "FALSE");
        privilegeView.put(CREATE, "FALSE");
        privilegeView.put(VIEW, "TRUE");
        privilegeView.put(UPDATE, "FALSE");
        privilegeView.put(DELETE, "FALSE");
        privilegeViewAND_NA_ALL.put(CREATE, "NA");
        privilegeViewAND_NA_ALL.put(VIEW, "TRUE");
        privilegeViewAND_NA_ALL.put(UPDATE, "NA");
        privilegeViewAND_NA_ALL.put(DELETE, "NA");
        privilegeViewAND_NA_ALL_FALSE.put(CREATE, "NA");
        privilegeViewAND_NA_ALL_FALSE.put(VIEW, "FALSE");
        privilegeViewAND_NA_ALL_FALSE.put(UPDATE, "NA");
        privilegeViewAND_NA_ALL_FALSE.put(DELETE, "NA");
        privilegeCreate.put(CREATE, "TRUE");
        privilegeCreate.put(VIEW, "FALSE");
        privilegeCreate.put(UPDATE, "FALSE");
        privilegeCreate.put(DELETE, "FALSE");
        privilegeUpdate.put(CREATE, "FALSE");
        privilegeUpdate.put(VIEW, "FALSE");
        privilegeUpdate.put(UPDATE, "TRUE");
        privilegeUpdate.put(DELETE, "FALSE");
        privilegeDelete.put(CREATE, "FALSE");
        privilegeDelete.put(VIEW, "FALSE");
        privilegeDelete.put(UPDATE, "FALSE");
        privilegeDelete.put(DELETE, "TRUE");
        privilegeViewAndCreate_NA_ALL.put(CREATE, "TRUE");
        privilegeViewAndCreate_NA_ALL.put(VIEW, "TRUE");
        privilegeViewAndCreate_NA_ALL.put(UPDATE, "NA");
        privilegeViewAndCreate_NA_ALL.put(DELETE, "NA");
        privilegeViewAndCreate_NA_ALL_FALSE.put(CREATE, "FALSE");
        privilegeViewAndCreate_NA_ALL_FALSE.put(VIEW, "TRUE");
        privilegeViewAndCreate_NA_ALL_FALSE.put(UPDATE, "NA");
        privilegeViewAndCreate_NA_ALL_FALSE.put(DELETE, "NA");
    }
}

