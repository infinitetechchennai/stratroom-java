/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.oauth.component.AuthTokenEnhancer
 *  com.estrat.service.util.ServiceRequestThreadLocal
 *  org.springframework.security.core.GrantedAuthority
 *  org.springframework.security.oauth2.common.DefaultOAuth2AccessToken
 *  org.springframework.security.oauth2.common.OAuth2AccessToken
 *  org.springframework.security.oauth2.provider.OAuth2Authentication
 *  org.springframework.security.oauth2.provider.token.TokenEnhancer
 *  org.springframework.stereotype.Component
 */
package com.estrat.service.oauth.component;

import com.estrat.service.util.ServiceRequestThreadLocal;
import java.util.HashMap;
import java.util.function.Function;
import java.util.stream.Collectors;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.common.DefaultOAuth2AccessToken;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.token.TokenEnhancer;
import org.springframework.stereotype.Component;

@Component
public class AuthTokenEnhancer
implements TokenEnhancer {
    private Function<GrantedAuthority, String> authFunction = auth -> auth.getAuthority().indexOf("=") != -1 ? auth.getAuthority().split("=")[1].replaceAll("\\}", "") : auth.getAuthority();

    public OAuth2AccessToken enhance(OAuth2AccessToken accessToken, OAuth2Authentication authentication) {
        HashMap<String, Object> additionalInfo = new HashMap<String, Object>();
        additionalInfo.put("oauthUserInfo", ServiceRequestThreadLocal.get().getLoginResponseDTO().getUserInfo());
        additionalInfo.put("authorities", authentication.getAuthorities().stream().map(auth -> (String)this.authFunction.apply(auth)).collect(Collectors.toList()));
        additionalInfo.put("userPermissions", ServiceRequestThreadLocal.get().getLoginResponseDTO().getUserPermissions());
        ((DefaultOAuth2AccessToken)accessToken).setAdditionalInformation(additionalInfo);
        authentication.setDetails(additionalInfo);
        return accessToken;
    }
}

