package com.estrat.web.security;

import com.estrat.web.exception.RequestException;
import com.estrat.web.service.AuditTrailService;
import com.estrat.web.service.EmployeeService;
import com.estrat.web.service.LicenseService;
import jakarta.servlet.Filter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.web.SecurityFilterChain;
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
@EnableMethodSecurity(securedEnabled = true)
public class SecurityConfig {

    @Value("${security.saml2.metadata-url:}")
    String metadataUrl;

    @Value("${server.ssl.key-alias:}")
    String keyAlias;

    @Value("${server.ssl.key-store-password:}")
    String password;

    @Value("${server.port}")
    String port;

    @Value("${server.ssl.key-store:}")
    String keyStoreFilePath;

    @Value("${date.management.url}")
    String dataUrl;

    @Value("${saml.sso.auth.host:}")
    String hostName;

    @Value("${security.invalidsessionurl:/}")
    private String invalidSessionURL;

    @Value("${server.servlet.context-path:}")
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
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public HttpFirewall allowUrlEncodedSlashHttpFirewall() {
        StrictHttpFirewall fireWall = new StrictHttpFirewall();
        fireWall.setAllowUrlEncodedSlash(true);
        return fireWall;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, AuthenticationConfiguration authConfig) throws Exception {
        try {
            CustomUsernamePasswordAuthenticationFilter authenticationFilter = new CustomUsernamePasswordAuthenticationFilter();
            SecurityContextRepository repo = new HttpSessionSecurityContextRepository();
            CustomSessionManagementFilter customSessionManagementFilter = new CustomSessionManagementFilter(repo);
            customSessionManagementFilter.setContextPath(contextPath);

            http.addFilterBefore((Filter) customSessionManagementFilter, SessionManagementFilter.class);
            http.httpBasic(basic -> basic.authenticationEntryPoint(new LoginUrlAuthenticationEntryPoint("/")));

            http.authorizeHttpRequests(auth -> auth
                    // JSP views (spring.mvc.view.prefix=/view/) are reached via internal
                    // FORWARD dispatches. Spring Security 6 filters forwards (Security 5 did
                    // not), so these must be permitted or every page render redirect-loops.
                    .requestMatchers("/view/**").permitAll()
                    .requestMatchers("/", "/index", "/authfail").permitAll()
                    .anyRequest().hasRole("USER")
            );

            authenticationFilter.setUsernameParameter("email");
            authenticationFilter.setAuthenticationManager(authConfig.getAuthenticationManager());
            authenticationFilter.setPasswordParameter("password");
            authenticationFilter.setAuthenticationSuccessHandler((AuthenticationSuccessHandler) authenticationSuccessHandler);
            authenticationFilter.setAuthenticationFailureHandler((AuthenticationFailureHandler) authenticationFailureHandler);
            // Spring Security 6 no longer persists the SecurityContext to the HTTP session
            // automatically after authentication. Without this, a successful login is not
            // remembered on the next request, causing a /login <-> / redirect loop.
            authenticationFilter.setSecurityContextRepository(repo);
            http.securityContext(sc -> sc.securityContextRepository(repo));
            http.addFilterBefore((Filter) authenticationFilter, UsernamePasswordAuthenticationFilter.class);
            http.addFilterBefore((Filter) new JWTOAuthTokenFilter(employeeService, auditTrailService, contextPath),
                    org.springframework.security.web.access.channel.ChannelProcessingFilter.class);
            http.addFilterAfter((Filter) new SSOLoginFilter(employeeService, dataUrl), UsernamePasswordAuthenticationFilter.class);

            http.logout(logout -> logout
                    .logoutUrl("/logout")
                    .deleteCookies("JSESSIONID")
                    .logoutSuccessUrl("/index")
            );
            http.sessionManagement(session -> session
                    .sessionFixation().none()
                    .invalidSessionUrl(invalidSessionURL)
            );
            http.csrf(csrf -> csrf.disable());

            return http.build();
        } catch (Exception e) {
            throw new RequestException(e);
        }
    }

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return web -> {
            try {
                web.httpFirewall(allowUrlEncodedSlashHttpFirewall());
                web.ignoring()
                        .requestMatchers("/*.jsp")
                        .requestMatchers("/css/**")
                        .requestMatchers("/img/**")
                        .requestMatchers("/js/**")
                        .requestMatchers("/index/**")
                        .requestMatchers("/images/**")
                        .requestMatchers("/fonts/**")
                        .requestMatchers("/generateToken/**", "/refreshToken/**", "/forgotPassword/**", "/resetPassword/**", "/validateLink/**")
                        .requestMatchers("/loginTheme/**", "/preAuditTrail/**")
                        .requestMatchers("/favicon.ico")
                        .requestMatchers("/**/*.map")
                        .requestMatchers("/swagger-ui/**", "/configuration/**", "/swagger-resources/**", "/v3/api-docs");
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        };
    }
}
