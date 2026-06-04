/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.security.SSOLoginFilter
 *  com.estrat.web.service.EmployeeService
 *  javax.servlet.FilterChain
 *  javax.servlet.ServletException
 *  javax.servlet.ServletRequest
 *  javax.servlet.ServletResponse
 *  javax.servlet.http.HttpServletRequest
 *  org.apache.log4j.Logger
 *  org.springframework.security.core.Authentication
 *  org.springframework.security.core.context.SecurityContextHolder
 *  org.springframework.web.filter.GenericFilterBean
 */
package com.estrat.web.security;

import com.estrat.web.service.EmployeeService;
import java.io.IOException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import org.apache.log4j.Logger;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

public class SSOLoginFilter
extends GenericFilterBean {
    private static final Logger LOGGER = Logger.getLogger(SSOLoginFilter.class);
    private EmployeeService employeeService;
    private String dataUrl;

    public SSOLoginFilter(EmployeeService employeeService, String dataUrl) {
        this.employeeService = employeeService;
        this.dataUrl = dataUrl;
    }

    public void doFilter(ServletRequest servletRequest, ServletResponse response, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest)servletRequest;
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        filterChain.doFilter((ServletRequest)request, response);
    }
}

