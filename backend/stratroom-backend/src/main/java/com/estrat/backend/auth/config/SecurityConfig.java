package com.estrat.backend.auth.config;

import com.estrat.backend.auth.encryption.EncryptionProvider;
import com.estrat.backend.auth.encryption.JasyptEncryptionProvider;
import com.estrat.backend.auth.jwt.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.SecurityWebFiltersOrder;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.security.web.server.authentication.HttpStatusServerEntryPoint;

@Configuration
@EnableWebFluxSecurity
public class SecurityConfig {

    @Value("${spring.application.name:authservice}")
    private String appName;

    @Value("${jwt.tokenexpiration:90}")
    private int expireSeconds;

    private final EmbeddedTomcatConfig embeddedTomcatConfig;

    @Autowired
    public SecurityConfig(EmbeddedTomcatConfig embeddedTomcatConfig) {
        this.embeddedTomcatConfig = embeddedTomcatConfig;
    }

    @Bean
    public EncryptionProvider encryptionProvider() {
        return new JasyptEncryptionProvider(
                embeddedTomcatConfig.getJasyptAlgorithm(), embeddedTomcatConfig.getJasyptPasssword());
    }

    @Bean
    public JwtTokenUtil jwtTokenUtil() {
        return new JwtTokenUtil(embeddedTomcatConfig);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity http) {
        JWTOAuthTokenWebFilter jwtFilter = new JWTOAuthTokenWebFilter(jwtTokenUtil(), encryptionProvider());

        http.csrf(ServerHttpSecurity.CsrfSpec::disable);
        http.cors(cors -> cors.disable());
        http.httpBasic(ServerHttpSecurity.HttpBasicSpec::disable);
        http.formLogin(ServerHttpSecurity.FormLoginSpec::disable);
        // Return a bare 401 (no "WWW-Authenticate: Basic" challenge) so browsers don't pop up
        // the native sign-in dialog; the SPA handles 401s by refreshing the token / redirecting.
        http.exceptionHandling(ex -> ex.authenticationEntryPoint(
                new HttpStatusServerEntryPoint(HttpStatus.UNAUTHORIZED)));
        http.authorizeExchange(exchanges -> exchanges
                .pathMatchers(
                        "/login",
                        "/generateToken",
                        "/validateToken",
                        "/preAuditTrail",
                        "/loginTheme",
                        "/v3/api-docs",
                        "/v3/api-docs/**",
                        "/swagger-resources/**",
                        "/swagger-ui/**",
                        "/swagger-ui.html",
                        "/webjars/**")
                .permitAll()
                .anyExchange()
                .hasAuthority("ROLE_USER"));
        http.addFilterAt(jwtFilter, SecurityWebFiltersOrder.AUTHENTICATION);
        return http.build();
    }
}
