/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.user.config.CommonRestTemplate
 *  com.estrat.backend.user.dto.TokenResponseDTO
 *  com.estrat.backend.user.service.TokenService
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.stereotype.Service
 */
package com.estrat.backend.user.service;

import com.estrat.backend.user.config.CommonRestTemplate;
import com.estrat.backend.user.dto.TokenResponseDTO;
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

