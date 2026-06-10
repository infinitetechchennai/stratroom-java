/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.user.config.CommonRestTemplate
 *  com.estrat.service.user.dto.TokenResponseDTO
 *  com.estrat.service.user.service.TokenService
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.stereotype.Service
 */
package com.estrat.service.user.service;

import com.estrat.service.user.config.CommonRestTemplate;
import com.estrat.service.user.dto.TokenResponseDTO;
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

