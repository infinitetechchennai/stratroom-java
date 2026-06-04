/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.config.CommonHttpClientInterceptor
 *  com.estrat.web.util.UserThreadLocal
 *  org.apache.log4j.Logger
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.http.HttpRequest
 *  org.springframework.http.client.ClientHttpRequestExecution
 *  org.springframework.http.client.ClientHttpRequestInterceptor
 *  org.springframework.http.client.ClientHttpResponse
 */
package com.estrat.web.config;

import com.estrat.web.util.UserThreadLocal;
import java.io.IOException;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpRequest;
import org.springframework.http.client.ClientHttpRequestExecution;
import org.springframework.http.client.ClientHttpRequestInterceptor;
import org.springframework.http.client.ClientHttpResponse;

public class CommonHttpClientInterceptor
implements ClientHttpRequestInterceptor {
    private Logger logger = Logger.getLogger(CommonHttpClientInterceptor.class);
    @Value(value="${jwt.generation.enabled}")
    private boolean jwtGeneration;

    public ClientHttpResponse intercept(HttpRequest request, byte[] body, ClientHttpRequestExecution execution) throws IOException {
        try {
            if (this.jwtGeneration) {
                if (UserThreadLocal.get() != null && UserThreadLocal.get().getJwtToken() != null) {
                    this.logger.debug("Token populated from thread local ");
                    request.getHeaders().add("Authorization", "Bearer " + UserThreadLocal.get().getJwtToken());
                }
            } else if (UserThreadLocal.get() != null && UserThreadLocal.get().getProfile() != null) {
                request.getHeaders().add("LOGGED_IN_EMPLOYEE_ID", String.valueOf(UserThreadLocal.get().getProfile().getEmpId()));
                request.getHeaders().add("LOGGED_IN_DEPT_ID", String.valueOf(UserThreadLocal.get().getProfile().getDeptId()));
            }
        } catch (Exception e) {
            this.logger.error("Error setting headers", e);
        }
        return execution.execute(request, body);
    }
}

