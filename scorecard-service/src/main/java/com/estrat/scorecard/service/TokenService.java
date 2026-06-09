/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.scorecard.config.CommonRestTemplate
 *  com.estrat.scorecard.dto.TokenResponseDTO
 *  com.estrat.scorecard.service.TokenService
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.stereotype.Service
 */
package com.estrat.scorecard.service;

import com.estrat.scorecard.config.CommonRestTemplate;
import com.estrat.scorecard.dto.TokenResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class TokenService {
    @Autowired
    private CommonRestTemplate commonRestTemplate;
    @Value(value="${authservice.url}")
    private String authUrl;

    public TokenResponseDTO validateToken() {
        String url = String.join((CharSequence)"/", this.authUrl, "validateToken");
        return (TokenResponseDTO)this.commonRestTemplate.getForObject(url, TokenResponseDTO.class);
    }

    public TokenResponseDTO generateToken() {
        String url = String.join((CharSequence)"/", this.authUrl, "generateToken");
        return (TokenResponseDTO)this.commonRestTemplate.getForObject(url, TokenResponseDTO.class);
    }
}

