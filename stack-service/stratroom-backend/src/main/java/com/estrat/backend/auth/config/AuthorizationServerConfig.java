package com.estrat.backend.auth.config;

import org.springframework.context.annotation.Configuration;

/**
 * Authorization server configuration - migrated to Spring Security 6.
 * Token issuance is now handled directly via JwtTokenUtil in LoginResource.
 */
@Configuration
public class AuthorizationServerConfig {
}
