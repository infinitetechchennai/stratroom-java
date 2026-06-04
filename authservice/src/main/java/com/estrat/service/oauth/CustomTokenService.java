/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.oauth.CustomTokenService
 *  org.springframework.security.core.AuthenticationException
 *  org.springframework.security.oauth2.common.OAuth2AccessToken
 *  org.springframework.security.oauth2.common.exceptions.InvalidTokenException
 *  org.springframework.security.oauth2.provider.ClientDetailsService
 *  org.springframework.security.oauth2.provider.ClientRegistrationException
 *  org.springframework.security.oauth2.provider.OAuth2Authentication
 *  org.springframework.security.oauth2.provider.token.DefaultTokenServices
 *  org.springframework.security.oauth2.provider.token.TokenStore
 */
package com.estrat.service.oauth;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.common.exceptions.InvalidTokenException;
import org.springframework.security.oauth2.provider.ClientDetailsService;
import org.springframework.security.oauth2.provider.ClientRegistrationException;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.token.DefaultTokenServices;
import org.springframework.security.oauth2.provider.token.TokenStore;

public class CustomTokenService
extends DefaultTokenServices {
    private TokenStore tokenStore;
    private ClientDetailsService clientDetailsService;

    public TokenStore getTokenStore() {
        return this.tokenStore;
    }

    public void setTokenStore(TokenStore tokenStore) {
        super.setTokenStore(tokenStore);
        this.tokenStore = tokenStore;
    }

    public ClientDetailsService getClientDetailsService() {
        return this.clientDetailsService;
    }

    public void setClientDetailsService(ClientDetailsService clientDetailsService) {
        super.setClientDetailsService(clientDetailsService);
        this.clientDetailsService = clientDetailsService;
    }

    public OAuth2Authentication loadAuthentication(String accessTokenValue) throws AuthenticationException, InvalidTokenException {
        OAuth2AccessToken accessToken = this.tokenStore.readAccessToken(accessTokenValue);
        if (accessToken == null) {
            throw new InvalidTokenException("Invalid access token: " + accessTokenValue);
        }
        if (accessToken.isExpired()) {
            this.tokenStore.removeAccessToken(accessToken);
            throw new InvalidTokenException("Custom Access token expired: " + accessTokenValue);
        }
        OAuth2Authentication result = this.tokenStore.readAuthentication(accessToken);
        if (result == null) {
            throw new InvalidTokenException("Invalid access token: " + accessTokenValue);
        }
        if (this.clientDetailsService != null) {
            String clientId = result.getOAuth2Request().getClientId();
            try {
                this.clientDetailsService.loadClientByClientId(clientId);
            }
            catch (ClientRegistrationException e) {
                throw new InvalidTokenException("Client not valid: " + clientId, (Throwable)e);
            }
        }
        return result;
    }
}

