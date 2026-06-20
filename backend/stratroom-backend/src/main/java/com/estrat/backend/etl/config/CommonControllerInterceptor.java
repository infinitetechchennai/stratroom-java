/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.etl.config.CommonControllerInterceptor
 *  com.estrat.backend.etl.util.UserThreadLocal
 *  javax.servlet.http.HttpServletRequest
 *  javax.servlet.http.HttpServletResponse
 *  org.springframework.web.servlet.ModelAndView
 *  org.springframework.web.servlet.handler.HandlerInterceptorAdapter
 */
package com.estrat.backend.etl.config;

import com.estrat.backend.etl.util.UserThreadLocal;
import java.util.HashMap;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

public class CommonControllerInterceptor
implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        HashMap<String, String> commonHeaders = new HashMap<String, String>();
        commonHeaders.put("LOGGED_IN_EMPLOYEE_ID", request.getHeader("LOGGED_IN_EMP_ID"));
        commonHeaders.put("PRELOGINAPI", "TRUE");
        UserThreadLocal.set(commonHeaders);
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        UserThreadLocal.set(null);
    }
}

