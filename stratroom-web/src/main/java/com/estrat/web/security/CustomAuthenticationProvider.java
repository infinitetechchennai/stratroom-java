/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.dto.LoginDTO
 *  com.estrat.web.dto.LoginResponseDTO
 *  com.estrat.web.security.CustomAuthenticationProvider
 *  com.estrat.web.service.EmployeeService
 *  com.estrat.web.util.RoleUtil
 *  com.estrat.web.util.TempUserLocal
 *  com.estrat.web.util.UserPrincipal
 *  com.estrat.web.util.UserThreadLocal
 *  javax.servlet.http.HttpServletRequest
 *  org.apache.log4j.Logger
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.security.authentication.AuthenticationProvider
 *  org.springframework.security.authentication.UsernamePasswordAuthenticationToken
 *  org.springframework.security.core.Authentication
 *  org.springframework.security.core.AuthenticationException
 *  org.springframework.security.core.authority.AuthorityUtils
 *  org.springframework.security.core.userdetails.User
 *  org.springframework.stereotype.Repository
 *  org.springframework.web.context.request.RequestContextHolder
 *  org.springframework.web.context.request.ServletRequestAttributes
 */
package com.estrat.web.security;

import com.estrat.web.dto.LoginDTO;
import com.estrat.web.dto.LoginResponseDTO;
import com.estrat.web.service.EmployeeService;
import com.estrat.web.util.RoleUtil;
import com.estrat.web.util.TempUserLocal;
import com.estrat.web.util.UserPrincipal;
import com.estrat.web.util.UserThreadLocal;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Repository;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Repository
public class CustomAuthenticationProvider
implements AuthenticationProvider {
    private static final Logger log = LoggerFactory.getLogger(CustomAuthenticationProvider.class);
    @Autowired
    private EmployeeService employeeService;
    @Value(value="${date.management.url}")
    private String dataUrl;

    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        log.debug("start of authenticate() method");
        UsernamePasswordAuthenticationToken auth = null;
        String username = authentication.getName();
        String password = authentication.getCredentials().toString();
        try {
            ServletRequestAttributes servletRequestAttributes = (ServletRequestAttributes)RequestContextHolder.currentRequestAttributes();
            log.debug(("servletRequestAttributes  " + servletRequestAttributes));
            HttpServletRequest httpServletRequest = servletRequestAttributes.getRequest();
            log.debug(("httpServletRequest  " + httpServletRequest));
            log.debug(("httpServletRequest  " + httpServletRequest.isSecure()));
            LoginDTO loginDTO = new LoginDTO();
            loginDTO.setUserName(username);
            loginDTO.setPassWord(password);
            LoginResponseDTO loginResponseDTO = this.employeeService.authoriseUser(loginDTO);
            if (loginResponseDTO.isLoginFlag()) {
                UserPrincipal principal = new UserPrincipal();
                principal.setOrgUserCount(loginResponseDTO.getOrgUserCount());
                principal.setLicenseResponseDTO(UserThreadLocal.get() != null ? UserThreadLocal.get().getLicenseResponseDTO() : null);
                principal.setUserInfo(loginResponseDTO.getUserInfo());
                principal.setProfile(loginResponseDTO.getProfile());
                principal.setJwtToken(loginResponseDTO.getAccessToken());
                principal.setExpireAt(loginResponseDTO.getExpireAt());
                principal.setRefreshToken(loginResponseDTO.getRefreshToken());
                principal.setDataManagementUrl(String.join((CharSequence)"?jwtToken=", this.dataUrl, loginResponseDTO.getAccessToken()));
                List grantedAuths = AuthorityUtils.createAuthorityList((String[])new String[]{"ROLE_USER"});
                User userDetails = new User(username, password, (Collection)grantedAuths);
                auth = new UsernamePasswordAuthenticationToken(userDetails, password, (Collection)grantedAuths);
                UserThreadLocal.set((UserPrincipal)principal);
                Map permissions = principal.getLicenseResponseDTO() != null && principal.getLicenseResponseDTO().getModuleList() != null ? RoleUtil.filterPermissionModules((Map)loginResponseDTO.getUserPermissions(), (List)principal.getLicenseResponseDTO().getModuleList()) : loginResponseDTO.getUserPermissions();
                principal.setUserPermissions(permissions);
            } else {
                if (loginResponseDTO.isUserFlag()) {
                    HashMap<String, String> stringMap = new HashMap<String, String>();
                    stringMap.put("userFlag", "User doesnt exist, Pls contact administrator");
                    TempUserLocal.set(stringMap);
                } else {
                    HashMap<String, String> stringMap = new HashMap<String, String>();
                    stringMap.put("userFlag", "Invalid User Name or Password");
                    TempUserLocal.set(stringMap);
                }
                auth = null;
            }
        }
        catch (Exception exp) {
            log.error("Exception Occured ", (Throwable)exp);
        }
        return auth;
    }

    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }
}

