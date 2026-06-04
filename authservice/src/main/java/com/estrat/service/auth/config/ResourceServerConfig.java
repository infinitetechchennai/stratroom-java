/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.auth.config.ResourceServerConfig
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.context.annotation.Configuration
 *  org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter
 *  org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer
 *  org.springframework.security.oauth2.provider.token.DefaultTokenServices
 *  org.springframework.security.oauth2.provider.token.ResourceServerTokenServices
 *  org.springframework.security.oauth2.provider.token.TokenStore
 */
package com.estrat.service.auth.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.token.DefaultTokenServices;
import org.springframework.security.oauth2.provider.token.ResourceServerTokenServices;
import org.springframework.security.oauth2.provider.token.TokenStore;

@Configuration
public class ResourceServerConfig
extends ResourceServerConfigurerAdapter {
    private final DefaultTokenServices tokenServices;
    private final TokenStore tokenStore;

    @Autowired
    public ResourceServerConfig(DefaultTokenServices tokenServices, TokenStore tokenStor, TokenStore tokenStore) {
        this.tokenServices = tokenServices;
        this.tokenStore = tokenStore;
    }

    public void configure(ResourceServerSecurityConfigurer configurer) {
        configurer.resourceId("authservice").tokenServices((ResourceServerTokenServices)this.tokenServices).tokenStore(this.tokenStore);
    }
}

