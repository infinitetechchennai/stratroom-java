/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.config.Config
 */
package com.estrat.web.config;

public abstract class Config {
    public static final boolean DEBUG = false;
    public static final String authenticationType = "ServicePrincipal";
    public static final String workspaceId = "e02d965a-6c76-4261-96c9-3e9e3f01173c";
    public static final String reportId = "e5cbe039-6a7c-49b9-a506-2f262d123c2f";
    public static final String clientId = "189d3c92-b044-48aa-8bb6-083799131fdf";
    public static final String pbiUsername = "";
    public static final String pbiPassword = "";
    public static final String tenantId = "7e04dfec-3e8f-43f0-8cdb-caed5ad83b9c";
    public static final String appSecret = "ctm8Q~0Skwfzvkd5xHcTIuvmWdA-KOiAQ1bkzcV5";
    public static final String authorityUrl = "https://login.microsoftonline.com/";
    public static final String scopeBase = "https://analysis.windows.net/powerbi/api/.default";

    private Config() {
        throw new IllegalStateException("Config class");
    }
}

