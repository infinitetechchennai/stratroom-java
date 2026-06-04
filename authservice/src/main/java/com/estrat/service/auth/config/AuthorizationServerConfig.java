/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.auth.config.AuthorizationServerConfig
 *  com.estrat.service.auth.service.OauthClientDetailsServiceImpl
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.context.annotation.Configuration
 *  org.springframework.security.authentication.AuthenticationManager
 *  org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
 *  org.springframework.security.crypto.password.PasswordEncoder
 *  org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer
 *  org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerConfigurerAdapter
 *  org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer
 *  org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerSecurityConfigurer
 *  org.springframework.security.oauth2.provider.ClientDetailsService
 *  org.springframework.security.oauth2.provider.token.AccessTokenConverter
 *  org.springframework.security.oauth2.provider.token.AuthorizationServerTokenServices
 *  org.springframework.security.oauth2.provider.token.DefaultTokenServices
 *  org.springframework.security.oauth2.provider.token.TokenStore
 *  org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter
 */
package com.estrat.service.auth.config;

import com.estrat.service.auth.service.OauthClientDetailsServiceImpl;
import javax.sql.DataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.ClientDetailsService;
import org.springframework.security.oauth2.provider.token.AccessTokenConverter;
import org.springframework.security.oauth2.provider.token.AuthorizationServerTokenServices;
import org.springframework.security.oauth2.provider.token.DefaultTokenServices;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter;

@Configuration
public class AuthorizationServerConfig
extends AuthorizationServerConfigurerAdapter {
    private final AuthenticationManager authenticationManager;
    private final DataSource dataSource;
    private final DefaultTokenServices defaultTokenServices;
    private final TokenStore tokenStore;
    private final JwtAccessTokenConverter accessConverter;

    @Autowired
    public AuthorizationServerConfig(AuthenticationManager authenticationManager, DefaultTokenServices defaultTokenServices, DataSource dataSource, TokenStore tokenStore, JwtAccessTokenConverter accessConverter) {
        this.authenticationManager = authenticationManager;
        this.defaultTokenServices = defaultTokenServices;
        this.dataSource = dataSource;
        this.tokenStore = tokenStore;
        this.accessConverter = accessConverter;
    }

    public void configure(AuthorizationServerEndpointsConfigurer configurer) throws Exception {
        configurer.authenticationManager(this.authenticationManager).tokenServices((AuthorizationServerTokenServices)this.defaultTokenServices).tokenStore(this.tokenStore).accessTokenConverter((AccessTokenConverter)this.accessConverter);
    }

    public void configure(ClientDetailsServiceConfigurer clients) throws Exception {
        clients.withClientDetails((ClientDetailsService)new OauthClientDetailsServiceImpl(this.dataSource));
    }

    public void configure(AuthorizationServerSecurityConfigurer oauthServer) throws Exception {
        oauthServer.tokenKeyAccess("permitAll()").checkTokenAccess("isAuthenticated()").passwordEncoder((PasswordEncoder)new BCryptPasswordEncoder());
    }
}

