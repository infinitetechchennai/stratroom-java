package com.estrat.service.auth.service;

import javax.sql.DataSource;

/**
 * OAuth client details - migrated to Spring Security 6.
 * Client details are now handled by the custom JWT token flow.
 */
public class OauthClientDetailsServiceImpl {

    private static final String CLIENT_ID = "STRATROOM_CLINET_ID";
    private static final String RESOURCE_ID = "authservice";
    private static final String SCOPE = "STRATROOM_WEB";
    private static final String GRANT_TYPES = "password,refresh_token";

    public OauthClientDetailsServiceImpl(DataSource dataSource) {
        // DataSource no longer required for simple JWT flow
    }
}
