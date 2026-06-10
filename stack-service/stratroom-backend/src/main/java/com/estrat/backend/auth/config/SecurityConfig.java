package com.estrat.backend.auth.config;

import com.estrat.backend.auth.encryption.EncryptionProvider;
import com.estrat.backend.auth.encryption.JasyptEncryptionProvider;
import com.estrat.backend.auth.exception.RequestException;
import com.estrat.backend.auth.jwt.JwtTokenUtil;
import jakarta.servlet.Filter;
import javax.sql.DataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
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
        return new JasyptEncryptionProvider(embeddedTomcatConfig.getJasyptAlgorithm(), embeddedTomcatConfig.getJasyptPasssword());
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
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, AuthenticationConfiguration authConfig) throws Exception {
        JWTOAuthTokenFilter filter = new JWTOAuthTokenFilter();
        filter.setJwtTokenUtil(jwtTokenUtil());
        filter.setAuthenticationManager(authConfig.getAuthenticationManager());
        filter.setEncryptionProvider(encryptionProvider());

        http.addFilterBefore((Filter) filter, UsernamePasswordAuthenticationFilter.class);
        http.cors(cors -> cors.and());
        http.csrf(csrf -> csrf.disable());
        http.authorizeHttpRequests(auth -> auth
                .requestMatchers("/login", "/generateToken", "/validateToken", "/v3/api-docs", "/v3/api-docs/**",
                        "/swagger-resources/**", "/swagger-ui/**", "/swagger-ui.html", "/webjars/**")
                .permitAll()
                .anyRequest().hasAuthority("ROLE_USER")
        );
        return http.build();
    }

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return web -> web.ignoring().requestMatchers(
                "/login",
                "/generateToken",
                "/v3/api-docs",
                "/swagger-resources/**",
                "/swagger-ui/**",
                "/swagger-ui.html",
                "/webjars/**"
        );
    }
}
