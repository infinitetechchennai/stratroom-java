/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.controller.EmbedController
 *  com.estrat.web.models.EmbedConfig
 *  com.estrat.web.models.ReportConfig
 *  com.estrat.web.service.AzureADService
 *  com.estrat.web.service.PowerBIService
 *  javax.servlet.http.HttpServletRequest
 *  javax.servlet.http.HttpServletResponse
 *  org.json.JSONArray
 *  org.json.JSONObject
 *  org.slf4j.Logger
 *  org.slf4j.LoggerFactory
 *  org.springframework.http.HttpHeaders
 *  org.springframework.http.HttpStatus
 *  org.springframework.http.ResponseEntity
 *  org.springframework.stereotype.Controller
 *  org.springframework.web.bind.annotation.GetMapping
 *  org.springframework.web.bind.annotation.RequestMapping
 *  org.springframework.web.bind.annotation.RequestMethod
 *  org.springframework.web.bind.annotation.ResponseBody
 *  org.springframework.web.client.HttpClientErrorException
 *  org.springframework.web.context.request.WebRequest
 */
package com.estrat.web.controller;

import com.estrat.web.models.EmbedConfig;
import com.estrat.web.models.ReportConfig;
import com.estrat.web.service.AzureADService;
import com.estrat.web.service.PowerBIService;
import java.io.IOException;
import java.net.MalformedURLException;
import java.util.List;
import java.util.concurrent.ExecutionException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.json.JSONArray;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.context.request.WebRequest;

@Controller
@SuppressWarnings({"unchecked", "rawtypes"})
public class EmbedController {
    static final Logger logger = LoggerFactory.getLogger(EmbedController.class);

    @RequestMapping(value={"/powerBi"}, method={RequestMethod.GET})
    public String standardView(WebRequest webRequest, HttpServletRequest request, HttpServletResponse response) {
        return "pages/organization/powerbi";
    }

    @GetMapping(path={"/getembedinfo"})
    @ResponseBody
    public ResponseEntity<String> embedInfoController() throws IOException {
        String accessToken;
        try {
            accessToken = AzureADService.getAccessToken();
        }
        catch (RuntimeException | MalformedURLException | ExecutionException ex) {
            logger.error(ex.getMessage());
            return ResponseEntity.status((HttpStatus)HttpStatus.INTERNAL_SERVER_ERROR).body(ex.getMessage());
        }
        catch (InterruptedException interruptedEx) {
            logger.error(interruptedEx.getMessage());
            Thread.currentThread().interrupt();
            return ResponseEntity.status((HttpStatus)HttpStatus.INTERNAL_SERVER_ERROR).body(interruptedEx.getMessage());
        }
        try {
            EmbedConfig reportEmbedConfig = PowerBIService.getEmbedConfig((String)accessToken, (String)"e02d965a-6c76-4261-96c9-3e9e3f01173c", (String)"e5cbe039-6a7c-49b9-a506-2f262d123c2f", (String[])new String[0]);
            JSONArray jsonArray = new JSONArray();
            for (int i = 0; i < reportEmbedConfig.embedReports.size(); ++i) {
                jsonArray.put(((ReportConfig)reportEmbedConfig.embedReports.get(i)).getJSONObject());
            }
            JSONObject responseObj = new JSONObject();
            responseObj.put("embedToken", reportEmbedConfig.embedToken.token);
            responseObj.put("embedReports", jsonArray);
            responseObj.put("tokenExpiry", reportEmbedConfig.embedToken.expiration);
            String response = responseObj.toString();
            return ResponseEntity.ok(response);
        }
        catch (HttpClientErrorException hcex) {
            hcex.printStackTrace();
            StringBuilder errMsgStringBuilder = new StringBuilder("Error: ");
            errMsgStringBuilder.append(hcex.getMessage());
            HttpHeaders header = hcex.getResponseHeaders();
            List<String> requestIds = header.get("requestId");
            if (requestIds != null) {
                for (String requestId : requestIds) {
                    errMsgStringBuilder.append("\nRequest Id: ");
                    errMsgStringBuilder.append(requestId);
                }
            }
            String errMsg = errMsgStringBuilder.toString();
            logger.error(errMsg);
            return ResponseEntity.status((HttpStatus)HttpStatus.INTERNAL_SERVER_ERROR).body(errMsg);
        }
        catch (RuntimeException rex) {
            rex.printStackTrace();
            logger.error(rex.getMessage());
            return ResponseEntity.status((HttpStatus)HttpStatus.INTERNAL_SERVER_ERROR).body(rex.getMessage());
        }
    }
}

