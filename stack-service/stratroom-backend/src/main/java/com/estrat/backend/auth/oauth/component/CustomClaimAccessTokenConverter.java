package com.estrat.backend.auth.oauth.component;

import org.springframework.stereotype.Component;

/**
 * Custom claim access token converter - migrated to Spring Security 6.
 * Token claim extraction is now handled directly via JwtTokenUtil.
 */
@Component
public class CustomClaimAccessTokenConverter {
}
