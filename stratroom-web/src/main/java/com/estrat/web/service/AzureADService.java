/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.service.AzureADService
 *  com.microsoft.aad.msal4j.ClientCredentialFactory
 *  com.microsoft.aad.msal4j.ClientCredentialParameters
 *  com.microsoft.aad.msal4j.ConfidentialClientApplication
 *  com.microsoft.aad.msal4j.ConfidentialClientApplication$Builder
 *  com.microsoft.aad.msal4j.IAuthenticationResult
 *  com.microsoft.aad.msal4j.IClientCredential
 *  com.microsoft.aad.msal4j.PublicClientApplication
 *  com.microsoft.aad.msal4j.PublicClientApplication$Builder
 *  com.microsoft.aad.msal4j.UserNamePasswordParameters
 *  org.slf4j.Logger
 *  org.slf4j.LoggerFactory
 */
package com.estrat.web.service;

import com.microsoft.aad.msal4j.ClientCredentialFactory;
import com.microsoft.aad.msal4j.ClientCredentialParameters;
import com.microsoft.aad.msal4j.ConfidentialClientApplication;
import com.microsoft.aad.msal4j.IAuthenticationResult;
import com.microsoft.aad.msal4j.IClientCredential;
import com.microsoft.aad.msal4j.PublicClientApplication;
import com.microsoft.aad.msal4j.UserNamePasswordParameters;
import java.net.MalformedURLException;
import java.util.Collections;
import java.util.concurrent.ExecutionException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/*
 * Exception performing whole class analysis ignored.
 */
public class AzureADService {
    static final Logger logger = LoggerFactory.getLogger(AzureADService.class);

    private AzureADService() {
        throw new IllegalStateException("Authentication service class");
    }

    public static String getAccessToken() throws MalformedURLException, InterruptedException, ExecutionException {
        if ("ServicePrincipal".equalsIgnoreCase("MasterUser")) {
            return AzureADService.getAccessTokenUsingMasterUser((String)"189d3c92-b044-48aa-8bb6-083799131fdf", (String)"", (String)"");
        }
        if ("ServicePrincipal".equalsIgnoreCase("ServicePrincipal")) {
            if ("7e04dfec-3e8f-43f0-8cdb-caed5ad83b9c".isEmpty()) {
                throw new RuntimeException("Tenant Id is empty");
            }
            return AzureADService.getAccessTokenUsingServicePrincipal((String)"189d3c92-b044-48aa-8bb6-083799131fdf", (String)"7e04dfec-3e8f-43f0-8cdb-caed5ad83b9c", (String)"ctm8Q~0Skwfzvkd5xHcTIuvmWdA-KOiAQ1bkzcV5");
        }
        throw new RuntimeException("Invalid authentication type: ServicePrincipal");
    }

    private static String getAccessTokenUsingServicePrincipal(String clientId, String tenantId, String appSecret) throws MalformedURLException, InterruptedException, ExecutionException {
        ConfidentialClientApplication app = ((ConfidentialClientApplication.Builder)ConfidentialClientApplication.builder((String)clientId, (IClientCredential)ClientCredentialFactory.createFromSecret((String)appSecret)).authority("https://login.microsoftonline.com/" + tenantId)).build();
        ClientCredentialParameters clientCreds = ClientCredentialParameters.builder(Collections.singleton("https://analysis.windows.net/powerbi/api/.default")).build();
        IAuthenticationResult result = (IAuthenticationResult)app.acquireToken(clientCreds).get();
        System.out.println("Error here????");
        if (result != null && result.accessToken() != null && !result.accessToken().isEmpty()) {
            System.out.println(result.accessToken());
            return result.accessToken();
        }
        logger.error("Failed to authenticate with Service Principal mode");
        return null;
    }

    private static String getAccessTokenUsingMasterUser(String clientId, String username, String password) throws MalformedURLException, InterruptedException, ExecutionException {
        UserNamePasswordParameters userCreds;
        PublicClientApplication app = ((PublicClientApplication.Builder)PublicClientApplication.builder((String)clientId).authority("https://login.microsoftonline.com/organizations")).build();
        IAuthenticationResult result = (IAuthenticationResult)app.acquireToken(userCreds = UserNamePasswordParameters.builder(Collections.singleton("https://analysis.windows.net/powerbi/api/.default"), (String)username, (char[])password.toCharArray()).build()).get();
        if (result != null && result.accessToken() != null && !result.accessToken().isEmpty()) {
            return result.accessToken();
        }
        logger.error("Failed to authenticate with MasterUser mode");
        return null;
    }
}

