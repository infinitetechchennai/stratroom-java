/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.dto.LicenseResponseDTO
 *  com.estrat.web.service.LicenseService
 *  com.estrat.web.util.UserThreadLocal
 *  com.estrat.web.valve.LicenseVerificationValve
 *  javax.servlet.ServletException
 *  javax.servlet.http.HttpServletRequest
 *  org.apache.catalina.connector.Request
 *  org.apache.catalina.connector.Response
 *  org.apache.catalina.valves.ValveBase
 *  org.apache.log4j.Logger
 *  org.springframework.security.web.util.matcher.AntPathRequestMatcher
 */
package com.estrat.web.valve;

import com.estrat.web.dto.LicenseResponseDTO;
import com.estrat.web.service.LicenseService;
import com.estrat.web.util.UserThreadLocal;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.function.BiPredicate;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import org.apache.catalina.connector.Request;
import org.apache.catalina.connector.Response;
import org.apache.catalina.valves.ValveBase;
import org.apache.log4j.Logger;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

public class LicenseVerificationValve
extends ValveBase {
    private static final Logger LOGGER = Logger.getLogger(LicenseVerificationValve.class);
    private LicenseService licenseService;
    private final List<AntPathRequestMatcher> ignoringList = new ArrayList();
    private BiPredicate<List<AntPathRequestMatcher>, HttpServletRequest> ignoreRequest = (ignoreList, request) -> ignoreList.stream().anyMatch(matcher -> matcher.matches(request));

    public LicenseVerificationValve(LicenseService licenseService) {
        this.licenseService = licenseService;
        this.populateIgnoreList();
    }

    public void invoke(Request request, Response response) throws IOException, ServletException {
        if (this.ignoreRequest.test(this.ignoringList, request)) {
            this.getNext().invoke(request, response);
        } else {
            LicenseResponseDTO licenseResponseDTO = this.validateLicense((HttpServletRequest)request);
            if (UserThreadLocal.get() != null) {
                UserThreadLocal.get().setLicenseResponseDTO(licenseResponseDTO);
            }
            this.getNext().invoke(request, response);
        }
    }

    private LicenseResponseDTO validateLicense(HttpServletRequest request) {
        LicenseResponseDTO licenseResponseDTO;
        Object userPrincipal = null;
        try {
            licenseResponseDTO = this.licenseService.validateLicense();
        }
        catch (Exception e) {
            LOGGER.error("Exception while validating license", (Throwable)e);
            licenseResponseDTO = new LicenseResponseDTO();
            licenseResponseDTO.setValidationSuccess(true);
        }
        return licenseResponseDTO;
    }

    private void populateIgnoreList() {
        this.ignoringList.add(new AntPathRequestMatcher("/*.jsp"));
        this.ignoringList.add(new AntPathRequestMatcher("/css/**"));
        this.ignoringList.add(new AntPathRequestMatcher("/img/**"));
        this.ignoringList.add(new AntPathRequestMatcher("/js/**"));
        this.ignoringList.add(new AntPathRequestMatcher("/index/**"));
        this.ignoringList.add(new AntPathRequestMatcher("/images/**"));
        this.ignoringList.add(new AntPathRequestMatcher("/fonts/**"));
        this.ignoringList.add(new AntPathRequestMatcher("/favicon.ico"));
        this.ignoringList.add(new AntPathRequestMatcher("/swagger-ui.html/**"));
        this.ignoringList.add(new AntPathRequestMatcher("/configuration/**"));
        this.ignoringList.add(new AntPathRequestMatcher("/swagger-resources/**"));
        this.ignoringList.add(new AntPathRequestMatcher("/v2/api-docs"));
    }
}

