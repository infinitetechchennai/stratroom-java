/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.etl.config.CommonControllerInterceptor
 *  com.estrat.service.etl.util.UserThreadLocal
 *  javax.servlet.http.HttpServletRequest
 *  javax.servlet.http.HttpServletResponse
 *  org.springframework.web.servlet.ModelAndView
 *  org.springframework.web.servlet.handler.HandlerInterceptorAdapter
 */
package com.estrat.service.etl.config;

import com.estrat.service.etl.util.UserThreadLocal;
import java.util.HashMap;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

public class CommonControllerInterceptor
extends HandlerInterceptorAdapter {
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        HashMap<String, String> commonHeaders = new HashMap<String, String>();
        commonHeaders.put("LOGGED_IN_EMPLOYEE_ID", request.getHeader("LOGGED_IN_EMP_ID"));
        commonHeaders.put("PRELOGINAPI", "TRUE");
        UserThreadLocal.set(commonHeaders);
        return true;
    }

    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        UserThreadLocal.set(null);
        super.postHandle(request, response, handler, modelAndView);
    }
}

