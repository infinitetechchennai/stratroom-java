/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.dto.LicenseResponseDTO
 *  com.estrat.web.service.EmployeeService
 *  com.estrat.web.service.LicenseService
 *  org.apache.log4j.Logger
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.web.service;

import com.estrat.web.dto.LicenseResponseDTO;
import com.estrat.web.service.EmployeeService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LicenseService {
    private static final Logger log = Logger.getLogger(LicenseService.class);
    @Autowired
    private EmployeeService employeeService;

    public LicenseResponseDTO validateLicense() {
        return this.employeeService.validateLicense();
    }
}

