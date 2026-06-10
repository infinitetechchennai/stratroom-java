/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.models.EmbedConfig
 *  com.estrat.web.models.EmbedToken
 *  com.estrat.web.models.ReportConfig
 *  com.estrat.web.service.PowerBIService
 *  com.fasterxml.jackson.databind.DeserializationFeature
 *  com.fasterxml.jackson.databind.ObjectMapper
 *  org.json.JSONArray
 *  org.json.JSONObject
 *  org.slf4j.Logger
 *  org.slf4j.LoggerFactory
 *  org.springframework.http.HttpEntity
 *  org.springframework.http.HttpHeaders
 *  org.springframework.http.HttpMethod
 *  org.springframework.http.ResponseEntity
 *  org.springframework.util.MultiValueMap
 *  org.springframework.web.client.RestTemplate
 */
package com.estrat.web.service;

import com.estrat.web.models.EmbedConfig;
import com.estrat.web.models.EmbedToken;
import com.estrat.web.models.ReportConfig;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import org.json.JSONArray;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

/*
 * Exception performing whole class analysis ignored.
 */
public class PowerBIService {
    static final Logger logger = LoggerFactory.getLogger(PowerBIService.class);
    private static JSONObject responseHeader;

    private PowerBIService() {
        throw new IllegalStateException("Power BI service class");
    }

    public static EmbedConfig getEmbedConfig(String accessToken, String workspaceId, String reportId, String ... additionalDatasetIds) throws IOException {
        if (reportId == null || reportId.isEmpty()) {
            throw new RuntimeException("Empty Report Id");
        }
        if (workspaceId == null || workspaceId.isEmpty()) {
            throw new RuntimeException("Empty Workspace Id");
        }
        StringBuilder urlStringBuilder = new StringBuilder("https://api.powerbi.com/v1.0/myorg/groups/");
        urlStringBuilder.append(workspaceId);
        urlStringBuilder.append("/reports/");
        urlStringBuilder.append(reportId);
        HttpHeaders reqHeader = new HttpHeaders();
        reqHeader.put("Content-Type", Arrays.asList("application/json"));
        reqHeader.put("Authorization", Arrays.asList("Bearer " + accessToken));
        HttpEntity reqEntity = new HttpEntity((MultiValueMap)reqHeader);
        String endPointUrl = urlStringBuilder.toString();
        RestTemplate getReportRestTemplate = new RestTemplate();
        ResponseEntity response = getReportRestTemplate.exchange(endPointUrl, HttpMethod.GET, reqEntity, String.class, new Object[0]);
        HttpHeaders responseHeader = response.getHeaders();
        String responseBody = (String)response.getBody();
        EmbedConfig reportEmbedConfig = new EmbedConfig();
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        ReportConfig embedReport = (ReportConfig)mapper.readValue(responseBody, ReportConfig.class);
        reportEmbedConfig.embedReports = new ArrayList();
        reportEmbedConfig.embedReports.add(embedReport);
        JSONObject responseObj = new JSONObject(responseBody);
        ArrayList<String> datasetIds = new ArrayList<String>();
        datasetIds.add(responseObj.getString("datasetId"));
        for (String datasetId : additionalDatasetIds) {
            datasetIds.add(datasetId);
        }
        reportEmbedConfig.embedToken = PowerBIService.getEmbedToken((String)accessToken, (String)reportId, datasetIds, (String[])new String[0]);
        return reportEmbedConfig;
    }

    public static EmbedConfig getEmbedConfig(String accessToken, String workspaceId, List<String> reportIds) throws IOException {
        if (reportIds == null || reportIds.isEmpty()) {
            throw new RuntimeException("Empty Report Ids");
        }
        if (workspaceId == null || workspaceId.isEmpty()) {
            throw new RuntimeException("Empty Workspace Id");
        }
        EmbedConfig reportEmbedConfig = new EmbedConfig();
        reportEmbedConfig.embedReports = new ArrayList();
        ArrayList<String> datasetIds = new ArrayList<String>();
        for (String reportId : reportIds) {
            StringBuilder urlStringBuilder = new StringBuilder("https://api.powerbi.com/v1.0/myorg/groups/");
            urlStringBuilder.append(workspaceId);
            urlStringBuilder.append("/reports/");
            urlStringBuilder.append(reportId);
            HttpHeaders reqHeader = new HttpHeaders();
            reqHeader.put("Content-Type", Arrays.asList("application/json"));
            reqHeader.put("Authorization", Arrays.asList("Bearer " + accessToken));
            HttpEntity reqEntity = new HttpEntity((MultiValueMap)reqHeader);
            String endPointUrl = urlStringBuilder.toString();
            RestTemplate getReportRestTemplate = new RestTemplate();
            ResponseEntity response = getReportRestTemplate.exchange(endPointUrl, HttpMethod.GET, reqEntity, String.class, new Object[0]);
            HttpHeaders responseHeader = response.getHeaders();
            String responseBody = (String)response.getBody();
            ObjectMapper mapper = new ObjectMapper();
            mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
            ReportConfig embedReport = (ReportConfig)mapper.readValue(responseBody, ReportConfig.class);
            reportEmbedConfig.embedReports.add(embedReport);
            JSONObject responseObj = new JSONObject(responseBody);
            datasetIds.add(responseObj.getString("datasetId"));
        }
        reportEmbedConfig.embedToken = PowerBIService.getEmbedToken((String)accessToken, reportIds, datasetIds, (String[])new String[0]);
        return reportEmbedConfig;
    }

    public static EmbedConfig getEmbedConfig(String accessToken, String workspaceId, List<String> reportIds, List<String> additionalDatasetIds) throws IOException {
        if (reportIds == null || reportIds.isEmpty()) {
            throw new RuntimeException("Empty Report Ids");
        }
        if (workspaceId == null || workspaceId.isEmpty()) {
            throw new RuntimeException("Empty Workspace Id");
        }
        EmbedConfig reportEmbedConfig = new EmbedConfig();
        reportEmbedConfig.embedReports = new ArrayList();
        for (String reportId : reportIds) {
            StringBuilder urlStringBuilder = new StringBuilder("https://api.powerbi.com/v1.0/myorg/groups/");
            urlStringBuilder.append(workspaceId);
            urlStringBuilder.append("/reports/");
            urlStringBuilder.append(reportId);
            HttpHeaders reqHeader = new HttpHeaders();
            reqHeader.put("Content-Type", Arrays.asList("application/json"));
            reqHeader.put("Authorization", Arrays.asList("Bearer " + accessToken));
            HttpEntity reqEntity = new HttpEntity((MultiValueMap)reqHeader);
            String endPointUrl = urlStringBuilder.toString();
            RestTemplate getReportRestTemplate = new RestTemplate();
            ResponseEntity response = getReportRestTemplate.exchange(endPointUrl, HttpMethod.GET, reqEntity, String.class, new Object[0]);
            HttpHeaders responseHeader = response.getHeaders();
            String responseBody = (String)response.getBody();
            ObjectMapper mapper = new ObjectMapper();
            mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
            ReportConfig embedReport = (ReportConfig)mapper.readValue(responseBody, ReportConfig.class);
            reportEmbedConfig.embedReports.add(embedReport);
            if (additionalDatasetIds == null) {
                additionalDatasetIds = new ArrayList<String>();
            }
            JSONObject responseObj = new JSONObject(responseBody);
            additionalDatasetIds.add(responseObj.getString("datasetId"));
        }
        reportEmbedConfig.embedToken = PowerBIService.getEmbedToken((String)accessToken, reportIds, additionalDatasetIds, (String[])new String[0]);
        return reportEmbedConfig;
    }

    public static EmbedToken getEmbedToken(String accessToken, String reportId, List<String> datasetIds, String ... targetWorkspaceIds) throws IOException {
        String uri = "https://api.powerbi.com/v1.0/myorg/GenerateToken";
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.put("Content-Type", Arrays.asList("application/json"));
        headers.put("Authorization", Arrays.asList("Bearer " + accessToken));
        JSONArray jsonDatasets = new JSONArray();
        for (String datasetId : datasetIds) {
            jsonDatasets.put(new JSONObject().put("id", datasetId));
        }
        JSONArray jsonReports = new JSONArray();
        jsonReports.put(new JSONObject().put("id", reportId));
        JSONArray jsonWorkspaces = new JSONArray();
        for (String targetWorkspaceId : targetWorkspaceIds) {
            jsonWorkspaces.put(new JSONObject().put("id", targetWorkspaceId));
        }
        JSONObject requestBody = new JSONObject();
        requestBody.put("datasets", jsonDatasets);
        requestBody.put("reports", jsonReports);
        requestBody.put("targetWorkspaces", jsonWorkspaces);
        HttpEntity httpEntity = new HttpEntity(requestBody.toString(), (MultiValueMap)headers);
        ResponseEntity response = restTemplate.postForEntity("https://api.powerbi.com/v1.0/myorg/GenerateToken", httpEntity, String.class, new Object[0]);
        HttpHeaders responseHeader = response.getHeaders();
        String responseBody = (String)response.getBody();
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        EmbedToken embedToken = (EmbedToken)mapper.readValue(responseBody, EmbedToken.class);
        return embedToken;
    }

    public static EmbedToken getEmbedToken(String accessToken, List<String> reportIds, List<String> datasetIds, String ... targetWorkspaceIds) throws IOException {
        String uri = "https://api.powerbi.com/v1.0/myorg/GenerateToken";
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.put("Content-Type", Arrays.asList("application/json"));
        headers.put("Authorization", Arrays.asList("Bearer " + accessToken));
        JSONArray jsonDatasets = new JSONArray();
        for (String string : datasetIds) {
            jsonDatasets.put(new JSONObject().put("id", string));
        }
        JSONArray jsonReports = new JSONArray();
        for (String reportId : reportIds) {
            jsonReports.put(new JSONObject().put("id", reportId));
        }
        JSONObject jSONObject = new JSONObject();
        JSONObject visualSettings = new JSONObject();
        visualSettings.put("visualRendered", true);
        jSONObject.put("visualSettings", visualSettings);
        JSONObject requestBody = new JSONObject();
        requestBody.put("datasets", jsonDatasets);
        requestBody.put("reports", jsonReports);
        requestBody.put("settings", jSONObject);
        JSONArray jsonWorkspaces = new JSONArray();
        for (String targetWorkspaceId : targetWorkspaceIds) {
            jsonWorkspaces.put(new JSONObject().put("id", targetWorkspaceId));
        }
        requestBody.put("targetWorkspaces", jsonWorkspaces);
        HttpEntity httpEntity = new HttpEntity(requestBody.toString(), (MultiValueMap)headers);
        ResponseEntity response = restTemplate.postForEntity("https://api.powerbi.com/v1.0/myorg/GenerateToken", httpEntity, String.class, new Object[0]);
        HttpHeaders responseHeader = response.getHeaders();
        String responseBody = (String)response.getBody();
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        EmbedToken embedToken = (EmbedToken)mapper.readValue(responseBody, EmbedToken.class);
        return embedToken;
    }
}

