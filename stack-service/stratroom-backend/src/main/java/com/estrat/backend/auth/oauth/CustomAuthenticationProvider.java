/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.auth.service.LoginService
 *  com.estrat.backend.auth.dto.AuthenticateResponseDTO
 *  com.estrat.backend.auth.dto.LoginDTO
 *  com.estrat.backend.auth.dto.LoginResponseDTO
 *  com.estrat.backend.auth.oauth.CustomAuthenticationProvider
 *  com.estrat.backend.auth.util.ServiceRequestThreadLocal
 *  com.estrat.backend.auth.util.UserPrincipal
 *  javax.servlet.http.HttpServletRequest
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.security.authentication.AuthenticationProvider
 *  org.springframework.security.authentication.UsernamePasswordAuthenticationToken
 *  org.springframework.security.core.Authentication
 *  org.springframework.security.core.AuthenticationException
 *  org.springframework.security.core.authority.AuthorityUtils
 *  org.springframework.security.core.userdetails.User
 *  org.springframework.stereotype.Component
 *  org.springframework.web.context.request.RequestContextHolder
 *  org.springframework.web.context.request.ServletRequestAttributes
 */
package com.estrat.backend.auth.oauth;

import com.estrat.backend.auth.service.LoginService;
import com.estrat.backend.auth.dto.AuthenticateResponseDTO;
import com.estrat.backend.auth.dto.LoginDTO;
import com.estrat.backend.auth.dto.LoginResponseDTO;
import com.estrat.backend.auth.util.ServiceRequestThreadLocal;
import com.estrat.backend.auth.util.UserPrincipal;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Component
public class CustomAuthenticationProvider
implements AuthenticationProvider {
    @Autowired
    private LoginService loginService;

    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        UsernamePasswordAuthenticationToken auth = null;
        String username = authentication.getName();
        String password = authentication.getCredentials().toString();
        try {
            ServletRequestAttributes servletRequestAttributes = (ServletRequestAttributes)RequestContextHolder.currentRequestAttributes();
            HttpServletRequest httpServletRequest = servletRequestAttributes.getRequest();
            LoginDTO loginDTO = new LoginDTO();
            loginDTO.setUserName(username);
            loginDTO.setPassWord(password);
            if (ServiceRequestThreadLocal.get() != null) {
                loginDTO.setSsoLogin(ServiceRequestThreadLocal.get().isSsoLogin());
            }
            AuthenticateResponseDTO authenticateResponseDTO = this.loginService.authoriseUser(loginDTO);
            LoginResponseDTO loginResponseDTO = new LoginResponseDTO();
            if (authenticateResponseDTO.isAuthoriseFlag()) {
                List grantedAuths = AuthorityUtils.createAuthorityList((String[])new String[]{"USER", "ROLE_USER"});
                User principal = new User(username, password, (Collection)grantedAuths);
                auth = new UsernamePasswordAuthenticationToken((Object)principal, (Object)password, (Collection)grantedAuths);
                loginResponseDTO.setLoginFlag(authenticateResponseDTO.isAuthoriseFlag());
                loginResponseDTO.setUserFlag(authenticateResponseDTO.isUserFlag());
                loginResponseDTO.setProfile(authenticateResponseDTO.getEmployee());
                loginResponseDTO.setOrgUserCount(authenticateResponseDTO.getOrgUserCount());
                loginResponseDTO.setUserPermissions(authenticateResponseDTO.getUserPermissions());
                if (ServiceRequestThreadLocal.get() != null) {
                    ServiceRequestThreadLocal.get().setAuthority(Arrays.asList("USER", "ROLE_USER"));
                    loginResponseDTO.setUserInfo(this.loginService.getEncryptedUserInfo(loginDTO, authenticateResponseDTO));
                    ServiceRequestThreadLocal.get().setLoginResponseDTO(loginResponseDTO);
                } else {
                    UserPrincipal userPrincipal = new UserPrincipal();
                    userPrincipal.setAuthority(Arrays.asList("USER", "ROLE_USER"));
                    ServiceRequestThreadLocal.set((UserPrincipal)userPrincipal);
                    loginResponseDTO.setUserInfo(this.loginService.getEncryptedUserInfo(loginDTO, authenticateResponseDTO));
                    ServiceRequestThreadLocal.get().setLoginResponseDTO(loginResponseDTO);
                }
            } else {
                loginResponseDTO.setUserFlag(true);
                auth = null;
            }
        }
        catch (Exception exp) {
            throw new RuntimeException("Authentication failed: " + exp.getMessage());
        }
        return auth;
    }

    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }
}

