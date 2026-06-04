/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.dto.LoginResponseDTO
 *  com.estrat.service.oauth.component.CustomClaimAccessTokenConverter
 *  com.estrat.service.util.ServiceRequestThreadLocal
 *  com.estrat.service.util.UserPrincipal
 *  org.springframework.security.oauth2.provider.OAuth2Authentication
 *  org.springframework.security.oauth2.provider.token.DefaultAccessTokenConverter
 *  org.springframework.stereotype.Component
 */
package com.estrat.service.oauth.component;

import com.estrat.service.dto.LoginResponseDTO;
import com.estrat.service.util.ServiceRequestThreadLocal;
import com.estrat.service.util.UserPrincipal;
import java.util.Map;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.token.DefaultAccessTokenConverter;
import org.springframework.stereotype.Component;

@Component
public class CustomClaimAccessTokenConverter
extends DefaultAccessTokenConverter {
    public OAuth2Authentication extractAuthentication(Map<String, ?> map) {
        UserPrincipal principal = new UserPrincipal();
        LoginResponseDTO loginResponseDTO = new LoginResponseDTO();
        loginResponseDTO.setUserInfo(map.get("oauthUserInfo").toString());
        loginResponseDTO.setUserPermissions((Map)map.get("userPermissions"));
        principal.setLoginResponseDTO(loginResponseDTO);
        ServiceRequestThreadLocal.set((UserPrincipal)principal);
        OAuth2Authentication auth = super.extractAuthentication(map);
        return auth;
    }
}

