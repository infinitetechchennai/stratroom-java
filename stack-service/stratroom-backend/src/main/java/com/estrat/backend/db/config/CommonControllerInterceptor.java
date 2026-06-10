/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.config.CommonControllerInterceptor
 *  com.estrat.backend.db.resource.util.UserThreadLocal
 *  javax.servlet.http.HttpServletRequest
 *  javax.servlet.http.HttpServletResponse
 *  org.springframework.web.servlet.ModelAndView
 *  org.springframework.web.servlet.handler.HandlerInterceptorAdapter
 */
package com.estrat.backend.db.config;

import com.estrat.backend.db.resource.util.UserThreadLocal;
import java.util.HashMap;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.HandlerInterceptor;

public class CommonControllerInterceptor
implements HandlerInterceptor {
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        HashMap<String, String> commonHeaders = new HashMap<String, String>();
        commonHeaders.put("LOGGED_IN_EMPLOYEE_ID", request.getHeader("LOGGED_IN_EMPLOYEE_ID"));
        commonHeaders.put("DATE_PERIOD", request.getHeader("DATE_PERIOD"));
        commonHeaders.put("BATCH_NAME", request.getHeader("BATCH_NAME"));
        commonHeaders.put("USER_ORG_ID", request.getHeader("USER_ORG_ID"));
        commonHeaders.put("SUPER_USER_ID", request.getHeader("SUPER_USER_ID"));
        commonHeaders.put("LOGGED_IN_DEPT_ID", request.getHeader("LOGGED_IN_DEPT_ID"));
        UserThreadLocal.set(commonHeaders);
        return true;
    }

    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        UserThreadLocal.set(null);
    }
}

