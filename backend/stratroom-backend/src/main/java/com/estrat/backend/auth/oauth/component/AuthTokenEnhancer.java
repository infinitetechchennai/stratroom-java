package com.estrat.backend.auth.oauth.component;

import org.springframework.stereotype.Component;

/**
 * Auth token enhancer - migrated to Spring Security 6.
 * Token enhancement is now handled directly in LoginResource via JwtTokenUtil.
 */
@Component
public class AuthTokenEnhancer {
}
