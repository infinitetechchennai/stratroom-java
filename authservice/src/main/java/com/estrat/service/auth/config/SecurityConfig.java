/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.auth.config.CustomOAuthAuthenticationFilter
 *  com.estrat.service.auth.config.EmbeddedTomcatConfig
 *  com.estrat.service.auth.config.JWTOAuthTokenFilter
 *  com.estrat.service.auth.config.SecurityConfig
 *  com.estrat.service.auth.service.OauthClientDetailsServiceImpl
 *  com.estrat.service.encryption.EncryptionProvider
 *  com.estrat.service.encryption.JasyptEncryptionProvider
 *  com.estrat.service.exception.RequestException
 *  com.estrat.service.jwt.JwtTokenUtil
 *  com.estrat.service.oauth.CustomTokenService
 *  com.estrat.service.oauth.component.AuthTokenEnhancer
 *  com.estrat.service.oauth.component.CustomClaimAccessTokenConverter
 *  javax.servlet.Filter
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.context.annotation.Bean
 *  org.springframework.context.annotation.Configuration
 *  org.springframework.context.annotation.Primary
 *  org.springframework.security.authentication.AuthenticationManager
 *  org.springframework.security.config.annotation.web.builders.HttpSecurity
 *  org.springframework.security.config.annotation.web.builders.WebSecurity
 *  org.springframework.security.config.annotation.web.builders.WebSecurity$IgnoredRequestConfigurer
 *  org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
 *  org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
 *  org.springframework.security.config.annotation.web.configurers.ExpressionUrlAuthorizationConfigurer$AuthorizedUrl
 *  org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
 *  org.springframework.security.crypto.password.PasswordEncoder
 *  org.springframework.security.oauth2.client.filter.OAuth2ClientAuthenticationProcessingFilter
 *  org.springframework.security.oauth2.provider.ClientDetailsService
 *  org.springframework.security.oauth2.provider.authentication.OAuth2AuthenticationManager
 *  org.springframework.security.oauth2.provider.token.AccessTokenConverter
 *  org.springframework.security.oauth2.provider.token.DefaultTokenServices
 *  org.springframework.security.oauth2.provider.token.ResourceServerTokenServices
 *  org.springframework.security.oauth2.provider.token.TokenEnhancer
 *  org.springframework.security.oauth2.provider.token.TokenEnhancerChain
 *  org.springframework.security.oauth2.provider.token.TokenStore
 *  org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter
 *  org.springframework.security.oauth2.provider.token.store.JwtTokenStore
 *  org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter
 */
package com.estrat.service.auth.config;

import com.estrat.service.auth.config.CustomOAuthAuthenticationFilter;
import com.estrat.service.auth.config.EmbeddedTomcatConfig;
import com.estrat.service.auth.config.JWTOAuthTokenFilter;
import com.estrat.service.auth.service.OauthClientDetailsServiceImpl;
import com.estrat.service.encryption.EncryptionProvider;
import com.estrat.service.encryption.JasyptEncryptionProvider;
import com.estrat.service.exception.RequestException;
import com.estrat.service.jwt.JwtTokenUtil;
import com.estrat.service.oauth.CustomTokenService;
import com.estrat.service.oauth.component.AuthTokenEnhancer;
import com.estrat.service.oauth.component.CustomClaimAccessTokenConverter;
import java.util.Arrays;
import javax.servlet.Filter;
import javax.sql.DataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.configurers.ExpressionUrlAuthorizationConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.filter.OAuth2ClientAuthenticationProcessingFilter;
import org.springframework.security.oauth2.provider.ClientDetailsService;
import org.springframework.security.oauth2.provider.authentication.OAuth2AuthenticationManager;
import org.springframework.security.oauth2.provider.token.AccessTokenConverter;
import org.springframework.security.oauth2.provider.token.DefaultTokenServices;
import org.springframework.security.oauth2.provider.token.ResourceServerTokenServices;
import org.springframework.security.oauth2.provider.token.TokenEnhancer;
import org.springframework.security.oauth2.provider.token.TokenEnhancerChain;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter;
import org.springframework.security.oauth2.provider.token.store.JwtTokenStore;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig
extends WebSecurityConfigurerAdapter {
    @Value(value="${spring.application.name:authservice}")
    private String appName;
    @Value(value="${jwt.tokenexpiration:90}")
    private int expireSeconds;
    private EmbeddedTomcatConfig embeddedTomcatConfig;
    private CustomClaimAccessTokenConverter customClaimAccessTokenConverter;
    private AuthTokenEnhancer authTokenEnhancer;
    @Autowired
    private DataSource dataSource;

    @Autowired
    public SecurityConfig(EmbeddedTomcatConfig embeddedTomcatConfig, CustomClaimAccessTokenConverter customClaimAccessTokenConverter, AuthTokenEnhancer authTokenEnhancer) {
        this.embeddedTomcatConfig = embeddedTomcatConfig;
        this.customClaimAccessTokenConverter = customClaimAccessTokenConverter;
        this.authTokenEnhancer = authTokenEnhancer;
    }

    @Bean
    public EncryptionProvider encryptionProvider() {
        return new JasyptEncryptionProvider(this.embeddedTomcatConfig.getJasyptAlgorithm(), this.embeddedTomcatConfig.getJasyptPasssword());
    }

    @Bean
    public JwtTokenUtil jwtTokenUtil() {
        return new JwtTokenUtil(this.embeddedTomcatConfig);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    @Primary
    public DefaultTokenServices tokenServices() {
        CustomTokenService defaultTokenServices = new CustomTokenService();
        defaultTokenServices.setTokenStore(this.tokenStore());
        defaultTokenServices.setSupportRefreshToken(true);
        TokenEnhancerChain tokenEnhancerChain = new TokenEnhancerChain();
        tokenEnhancerChain.setTokenEnhancers(Arrays.asList(this.authTokenEnhancer, this.accessTokenConverter()));
        defaultTokenServices.setTokenEnhancer((TokenEnhancer)tokenEnhancerChain);
        defaultTokenServices.setReuseRefreshToken(true);
        defaultTokenServices.setAccessTokenValiditySeconds(this.expireSeconds);
        defaultTokenServices.setRefreshTokenValiditySeconds(7200);
        return defaultTokenServices;
    }

    @Bean
    public TokenStore tokenStore() {
        return new JwtTokenStore(this.accessTokenConverter());
    }

    @Bean
    public JwtAccessTokenConverter accessTokenConverter() {
        JwtAccessTokenConverter converter = new JwtAccessTokenConverter();
        converter.setSigningKey("$2a$10$84v99miEdA7DRXEswAf3JezziATlV9F83H0KgsF./Lj.mpsjSoNRy");
        converter.setAccessTokenConverter((AccessTokenConverter)this.customClaimAccessTokenConverter);
        return converter;
    }

    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    private OAuth2AuthenticationManager oauthAuthenticationManager() {
        OAuth2AuthenticationManager oauthAuthenticationManager = new OAuth2AuthenticationManager();
        oauthAuthenticationManager.setTokenServices((ResourceServerTokenServices)this.tokenServices());
        oauthAuthenticationManager.setClientDetailsService((ClientDetailsService)new OauthClientDetailsServiceImpl(this.dataSource));
        return oauthAuthenticationManager;
    }

    public OAuth2ClientAuthenticationProcessingFilter oauth2ClientAuthenticationProcessingFilter() {
        CustomOAuthAuthenticationFilter filter = new CustomOAuthAuthenticationFilter("/");
        filter.setAuthenticationManager((AuthenticationManager)this.oauthAuthenticationManager());
        return filter;
    }

    public void configure(HttpSecurity http) throws Exception {
        JWTOAuthTokenFilter filter = new JWTOAuthTokenFilter();
        filter.setJwtTokenUtil(this.jwtTokenUtil());
        filter.setAuthenticationManager(this.authenticationManagerBean());
        filter.setAuth2AuthenticationManager(this.oauthAuthenticationManager());
        http.addFilterBefore((Filter)filter, UsernamePasswordAuthenticationFilter.class);
        filter.setEncryptionProvider(this.encryptionProvider());
        ((ExpressionUrlAuthorizationConfigurer.AuthorizedUrl)((HttpSecurity)((HttpSecurity)http.cors().and()).csrf().disable()).authorizeRequests().antMatchers(new String[]{"/"})).hasAuthority("ROLE_USER");
        ((ExpressionUrlAuthorizationConfigurer.AuthorizedUrl)http.authorizeRequests().antMatchers(new String[]{"/**"})).hasAuthority("ROLE_USER");
    }

    public void configure(WebSecurity http) throws Exception {
        try {
            http.ignoring().antMatchers(
                "/login", 
                "/generateToken",
                "/v2/api-docs",
                "/swagger-resources/**",
                "/swagger-ui.html",
                "/webjars/**"
            );
        }
        catch (Exception e) {
            throw new RequestException((Throwable)e);
        }
    }
}

