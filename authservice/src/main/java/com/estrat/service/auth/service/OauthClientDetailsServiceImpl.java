/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.auth.service.OauthClientDetailsServiceImpl
 *  org.springframework.security.oauth2.common.exceptions.InvalidClientException
 *  org.springframework.security.oauth2.provider.ClientDetails
 *  org.springframework.security.oauth2.provider.client.BaseClientDetails
 *  org.springframework.security.oauth2.provider.client.JdbcClientDetailsService
 */
package com.estrat.service.auth.service;

import javax.sql.DataSource;
import org.springframework.security.oauth2.common.exceptions.InvalidClientException;
import org.springframework.security.oauth2.provider.ClientDetails;
import org.springframework.security.oauth2.provider.client.BaseClientDetails;
import org.springframework.security.oauth2.provider.client.JdbcClientDetailsService;

public class OauthClientDetailsServiceImpl
extends JdbcClientDetailsService {
    private static final String CLIENT_ID = "STRATROOM_CLINET_ID";
    private static final String RESOURCE_ID = "authservice";
    private static final String SCOPE = "STRATROOM_WEB";
    private static final String GRANT_TYPES = "password,refresh_token";

    public OauthClientDetailsServiceImpl(DataSource dataSource) {
        super(dataSource);
    }

    public ClientDetails loadClientByClientId(String arg0) throws InvalidClientException {
        BaseClientDetails clientDetails = new BaseClientDetails(CLIENT_ID, RESOURCE_ID, SCOPE, GRANT_TYPES, null);
        clientDetails.setClientSecret("$2a$10$84v99miEdA7DRXEswAf3JezziATlV9F83H0KgsF./Lj.mpsjSoNRy");
        return clientDetails;
    }
}

