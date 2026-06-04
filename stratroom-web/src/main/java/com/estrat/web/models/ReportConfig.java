/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.controller.EmbedController
 *  com.estrat.web.models.ReportConfig
 *  org.json.JSONException
 *  org.json.JSONObject
 *  org.slf4j.Logger
 *  org.slf4j.LoggerFactory
 */
package com.estrat.web.models;

import com.estrat.web.controller.EmbedController;
import org.json.JSONException;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ReportConfig {
    static final Logger logger = LoggerFactory.getLogger(EmbedController.class);
    public String reportId = "";
    public String embedUrl = "";
    public String reportName = "";
    public Boolean isEffectiveIdentityRolesRequired = false;
    public Boolean isEffectiveIdentityRequired = false;
    public Boolean enableRLS = false;
    public String username;
    public String roles;

    public JSONObject getJSONObject() {
        JSONObject jsonObj = new JSONObject();
        try {
            jsonObj.put("reportId", this.reportId);
            jsonObj.put("embedUrl", this.embedUrl);
            jsonObj.put("reportName", this.reportName);
        }
        catch (JSONException e) {
            logger.error("DefaultListItem.toString JSONException: " + e.getMessage());
        }
        return jsonObj;
    }
}

