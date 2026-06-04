/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.exception.RequestException
 *  com.estrat.web.security.CustomAuthenticationSuccessHandler
 *  com.estrat.web.security.CustomSessionManagementFilter
 *  com.estrat.web.security.CustomSimpleUrlAuthenticationFailureHandler
 *  com.estrat.web.security.CustomUsernamePasswordAuthenticationFilter
 *  com.estrat.web.security.JWTOAuthTokenFilter
 *  com.estrat.web.security.SSOLoginFilter
 *  com.estrat.web.security.SecurityConfig
 *  com.estrat.web.service.AuditTrailService
 *  com.estrat.web.service.EmployeeService
 *  com.estrat.web.service.LicenseService
 *  javax.servlet.Filter
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.context.annotation.Bean
 *  org.springframework.context.annotation.Configuration
 *  org.springframework.security.authentication.AuthenticationManager
 *  org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity
 *  org.springframework.security.config.annotation.web.builders.HttpSecurity
 *  org.springframework.security.config.annotation.web.builders.WebSecurity
 *  org.springframework.security.config.annotation.web.builders.WebSecurity$IgnoredRequestConfigurer
 *  org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
 *  org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
 *  org.springframework.security.config.annotation.web.configurers.ExpressionUrlAuthorizationConfigurer$AuthorizedUrl
 *  org.springframework.security.web.AuthenticationEntryPoint
 *  org.springframework.security.web.access.channel.ChannelProcessingFilter
 *  org.springframework.security.web.authentication.AuthenticationFailureHandler
 *  org.springframework.security.web.authentication.AuthenticationSuccessHandler
 *  org.springframework.security.web.authentication.LoginUrlAuthenticationEntryPoint
 *  org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter
 *  org.springframework.security.web.context.HttpSessionSecurityContextRepository
 *  org.springframework.security.web.context.SecurityContextRepository
 *  org.springframework.security.web.firewall.HttpFirewall
 *  org.springframework.security.web.firewall.StrictHttpFirewall
 *  org.springframework.security.web.session.SessionManagementFilter
 */
package com.estrat.web.security;

import com.estrat.web.exception.RequestException;
import com.estrat.web.security.CustomAuthenticationSuccessHandler;
import com.estrat.web.security.CustomSessionManagementFilter;
import com.estrat.web.security.CustomSimpleUrlAuthenticationFailureHandler;
import com.estrat.web.security.CustomUsernamePasswordAuthenticationFilter;
import com.estrat.web.security.JWTOAuthTokenFilter;
import com.estrat.web.security.SSOLoginFilter;
import com.estrat.web.service.AuditTrailService;
import com.estrat.web.service.EmployeeService;
import com.estrat.web.service.LicenseService;
import javax.servlet.Filter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.configurers.ExpressionUrlAuthorizationConfigurer;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.access.channel.ChannelProcessingFilter;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.LoginUrlAuthenticationEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.security.web.firewall.HttpFirewall;
import org.springframework.security.web.firewall.StrictHttpFirewall;
import org.springframework.security.web.session.SessionManagementFilter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled=true)
public class SecurityConfig
extends WebSecurityConfigurerAdapter {
    @Value(value="${security.saml2.metadata-url}")
    String metadataUrl;
    @Value(value="${server.ssl.key-alias:}")
    String keyAlias;
    @Value(value="${server.ssl.key-store-password:}")
    String password;
    @Value(value="${server.port}")
    String port;
    @Value(value="${server.ssl.key-store:}")
    String keyStoreFilePath;
    @Value(value="${date.management.url}")
    String dataUrl;
    @Value(value="${saml.sso.auth.host}")
    String hostName;
    private CustomUsernamePasswordAuthenticationFilter authenticationFilter = new CustomUsernamePasswordAuthenticationFilter();
    private CustomSessionManagementFilter customSessionManagementFilter = new CustomSessionManagementFilter((SecurityContextRepository)new HttpSessionSecurityContextRepository());
    @Value(value="${security.invalidsessionurl}")
    private String invalidSessionURL;
    @Value(value="${server.servlet.context-path}")
    private String contextPath;
    @Autowired
    private CustomAuthenticationSuccessHandler authenticationSuccessHandler;
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private AuditTrailService auditTrailService;
    @Autowired
    private LicenseService licenseService;
    @Autowired
    private CustomSimpleUrlAuthenticationFailureHandler authenticationFailureHandler;

    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Bean
    public HttpFirewall allowUrlEncodedSlashHttpFirewall() {
        StrictHttpFirewall fireWall = new StrictHttpFirewall();
        fireWall.setAllowUrlEncodedSlash(true);
        return fireWall;
    }

    protected void configure(HttpSecurity http) throws RequestException {
        try {
            this.customSessionManagementFilter.setContextPath(this.contextPath);
            http.addFilterBefore((Filter)this.customSessionManagementFilter, SessionManagementFilter.class);
            http.httpBasic().authenticationEntryPoint((AuthenticationEntryPoint)new LoginUrlAuthenticationEntryPoint("/"));
            ((ExpressionUrlAuthorizationConfigurer.AuthorizedUrl)http.authorizeRequests().antMatchers(new String[]{"/"})).access("hasAnyRole('ROLE_ANONYMOUS','ROLE_USER')");
            ((ExpressionUrlAuthorizationConfigurer.AuthorizedUrl)http.authorizeRequests().antMatchers(new String[]{"/**"})).access("hasRole('ROLE_USER')");
            this.authenticationFilter.setUsernameParameter("email");
            this.authenticationFilter.setAuthenticationManager(this.authenticationManagerBean());
            this.authenticationFilter.setPasswordParameter("password");
            this.authenticationFilter.setAuthenticationSuccessHandler((AuthenticationSuccessHandler)this.authenticationSuccessHandler);
            this.authenticationFilter.setAuthenticationFailureHandler((AuthenticationFailureHandler)this.authenticationFailureHandler);
            http.addFilterBefore((Filter)this.authenticationFilter, UsernamePasswordAuthenticationFilter.class);
            http.addFilterBefore((Filter)new JWTOAuthTokenFilter(this.employeeService, this.auditTrailService, this.contextPath), ChannelProcessingFilter.class);
            http.addFilterAfter((Filter)new SSOLoginFilter(this.employeeService, this.dataUrl), UsernamePasswordAuthenticationFilter.class);
            http.logout().logoutUrl("/logout").deleteCookies(new String[]{"JSESSIONID"}).logoutSuccessUrl("/index");
            http.sessionManagement().sessionFixation().none();
            http.sessionManagement().invalidSessionUrl(this.invalidSessionURL);
            http.csrf().disable();
        }
        catch (Exception e) {
            throw new RequestException((Throwable)e);
        }
    }

    public void configure(WebSecurity http) throws RequestException {
        try {
            http.httpFirewall(this.allowUrlEncodedSlashHttpFirewall());
            ((WebSecurity.IgnoredRequestConfigurer)((WebSecurity.IgnoredRequestConfigurer)((WebSecurity.IgnoredRequestConfigurer)((WebSecurity.IgnoredRequestConfigurer)((WebSecurity.IgnoredRequestConfigurer)((WebSecurity.IgnoredRequestConfigurer)((WebSecurity.IgnoredRequestConfigurer)((WebSecurity.IgnoredRequestConfigurer)((WebSecurity.IgnoredRequestConfigurer)((WebSecurity.IgnoredRequestConfigurer)((WebSecurity.IgnoredRequestConfigurer)http.ignoring().antMatchers(new String[]{"/*.jsp"})).antMatchers(new String[]{"/css/**"})).antMatchers(new String[]{"/img/**"})).antMatchers(new String[]{"/js/**"})).antMatchers(new String[]{"/index/**"})).antMatchers(new String[]{"/images/**"})).antMatchers(new String[]{"/fonts/**"})).antMatchers(new String[]{"/generateToken/**", "/refreshToken/**", "/forgotPassword/**", "/resetPassword/**", "/validateLink/**"})).antMatchers(new String[]{"/loginTheme/**", "/preAuditTrail/**"})).antMatchers(new String[]{"/favicon.ico"})).antMatchers(new String[]{"/**/*.map"})).mvcMatchers(new String[]{"/swagger-ui.html/**", "/configuration/**", "/swagger-resources/**", "/v2/api-docs"});
        }
        catch (Exception e) {
            throw new RequestException((Throwable)e);
        }
    }
}

