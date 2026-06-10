/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.config.SpringDispatcherServlet
 *  com.estrat.web.formbeans.ProfileFormBean
 *  com.estrat.web.util.HeaderThreadLocal
 *  com.estrat.web.util.TempUserThreadLocal
 *  com.estrat.web.util.UserPrincipal
 *  com.estrat.web.util.UserThreadLocal
 *  javax.servlet.ServletException
 *  javax.servlet.http.HttpServletRequest
 *  javax.servlet.http.HttpServletResponse
 *  org.apache.log4j.Logger
 *  org.springframework.web.context.WebApplicationContext
 *  org.springframework.web.servlet.DispatcherServlet
 */
package com.estrat.web.config;

import com.estrat.web.formbeans.ProfileFormBean;
import com.estrat.web.util.HeaderThreadLocal;
import com.estrat.web.util.TempUserThreadLocal;
import com.estrat.web.util.UserPrincipal;
import com.estrat.web.util.UserThreadLocal;
import java.io.IOException;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.servlet.DispatcherServlet;

public class SpringDispatcherServlet
extends DispatcherServlet {
    private static final Logger log = LoggerFactory.getLogger(SpringDispatcherServlet.class);

    public SpringDispatcherServlet(WebApplicationContext applicationContext) {
        super(applicationContext);
    }

    protected void init(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) throws ServletException, IOException {
        log.debug(("Servlet Context " + this.getServletContext()));
    }

    protected void service(HttpServletRequest httpServletRequest, HttpServletResponse response) throws ServletException, IOException {
        httpServletRequest.setCharacterEncoding("UTF-8");
        httpServletRequest.setAttribute("profileFormBean", new ProfileFormBean());
        this.populateUserDetails(httpServletRequest);
        super.service(httpServletRequest, response);
        UserThreadLocal.set(null);
        TempUserThreadLocal.set(null);
        HeaderThreadLocal.set(null);
    }

    private void populateUserDetails(HttpServletRequest request) {
        if (TempUserThreadLocal.get() != null && TempUserThreadLocal.get().getProfile() != null) {
            request.getSession().setAttribute("userPrincipal", TempUserThreadLocal.get());
            UserPrincipal principal = (UserPrincipal)request.getSession().getAttribute("principal");
            UserThreadLocal.set((UserPrincipal)principal);
        } else {
            UserPrincipal principal = (UserPrincipal)request.getSession().getAttribute("principal");
            if (principal != null) {
                UserThreadLocal.set((UserPrincipal)principal);
            }
        }
    }
}

