/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.scorecard.dto.LicenseResponseDTO
 *  com.estrat.backend.scorecard.service.LicenseService
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.stereotype.Service
 *  org.springframework.web.client.RestTemplate
 */
package com.estrat.backend.scorecard.service;

import com.estrat.backend.scorecard.dto.LicenseResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class LicenseService {
    @Autowired
    private RestTemplate restTemplate;
    @Value(value="${dbservice.url}")
    private String dbUrl;

    public LicenseResponseDTO validateLicense() {
        String url = this.dbUrl + "/validateLicense";
        return (LicenseResponseDTO)this.restTemplate.getForObject(url, LicenseResponseDTO.class, new Object[0]);
    }
}

