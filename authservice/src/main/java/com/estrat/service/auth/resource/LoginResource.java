/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.auth.resource.LoginResource
 *  com.estrat.service.auth.service.DBService
 *  com.estrat.service.dto.AuthenticateResponseDTO
 *  com.estrat.service.dto.LoginDTO
 *  com.estrat.service.dto.LoginResponseDTO
 *  com.estrat.service.dto.TokenResponseDTO
 *  com.estrat.service.encryption.EncryptionProvider
 *  com.estrat.service.exception.AuthorizationException
 *  com.estrat.service.exception.RequestException
 *  com.estrat.service.jwt.JwtTokenUtil
 *  com.estrat.service.util.ServiceRequestThreadLocal
 *  com.estrat.service.util.UserPrincipal
 *  javax.servlet.http.HttpServletRequest
 *  org.apache.commons.lang3.StringUtils
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.security.authentication.UsernamePasswordAuthenticationToken
 *  org.springframework.security.core.authority.AuthorityUtils
 *  org.springframework.security.core.userdetails.User
 *  org.springframework.security.oauth2.common.OAuth2AccessToken
 *  org.springframework.security.oauth2.provider.OAuth2Authentication
 *  org.springframework.security.oauth2.provider.authentication.OAuth2AuthenticationDetails
 *  org.springframework.security.oauth2.provider.endpoint.TokenEndpoint
 *  org.springframework.security.oauth2.provider.token.TokenStore
 *  org.springframework.web.HttpRequestMethodNotSupportedException
 *  org.springframework.web.bind.annotation.RequestBody
 *  org.springframework.web.bind.annotation.RequestMapping
 *  org.springframework.web.bind.annotation.RequestMethod
 *  org.springframework.web.bind.annotation.ResponseBody
 *  org.springframework.web.bind.annotation.RestController
 */
package com.estrat.service.auth.resource;

import com.estrat.service.auth.service.DBService;
import com.estrat.service.dto.AuthenticateResponseDTO;
import com.estrat.service.dto.LoginDTO;
import com.estrat.service.dto.LoginResponseDTO;
import com.estrat.service.dto.TokenResponseDTO;
import com.estrat.service.encryption.EncryptionProvider;
import com.estrat.service.exception.AuthorizationException;
import com.estrat.service.exception.RequestException;
import com.estrat.service.jwt.JwtTokenUtil;
import com.estrat.service.util.ServiceRequestThreadLocal;
import com.estrat.service.util.UserPrincipal;
import java.security.Principal;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.authentication.OAuth2AuthenticationDetails;
import org.springframework.security.oauth2.provider.endpoint.TokenEndpoint;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginResource {
    @Autowired
    private JwtTokenUtil jwtTokenUtil;
    @Autowired
    private EncryptionProvider encryptionProvider;
    @Autowired
    private TokenEndpoint tokenEndPoint;
    @Autowired
    private TokenStore tokenServices;
    @Autowired
    private DBService dbService;

    @ResponseBody
    @RequestMapping(value={"/login"}, method={RequestMethod.POST})
    public Object login(@RequestBody LoginDTO loginDTO) throws RequestException, HttpRequestMethodNotSupportedException {
        AuthenticateResponseDTO authenticateResponseDTO = this.dbService.authoriseUser(loginDTO);
        if (authenticateResponseDTO.isAuthoriseFlag()) {
            List grantedAuths = AuthorityUtils.createAuthorityList((String[])new String[]{"ROLE_USER"});
            User principal = new User("STRATROOM_CLINET_ID", "", (Collection)grantedAuths);
            UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken((Object)principal, (Object)"", (Collection)grantedAuths);
            HashMap<String, String> parameters = new HashMap<String, String>();
            parameters.put("grant_type", "password");
            parameters.put("username", loginDTO.getUserName());
            parameters.put("password", loginDTO.getPassWord());
            UserPrincipal userPrincipal = new UserPrincipal();
            userPrincipal.setSsoLogin(loginDTO.isSsoLogin());
            ServiceRequestThreadLocal.set((UserPrincipal)userPrincipal);
            OAuth2AccessToken oAuth2AccessToken = (OAuth2AccessToken)this.tokenEndPoint.postAccessToken((Principal)auth, parameters).getBody();
            LoginResponseDTO loginResponseDTO = ServiceRequestThreadLocal.get().getLoginResponseDTO();
            loginResponseDTO.setRefreshToken(oAuth2AccessToken.getRefreshToken().getValue());
            loginResponseDTO.setAccessToken(oAuth2AccessToken.getValue());
            loginResponseDTO.setExpireAt(oAuth2AccessToken.getExpiration());
            return loginResponseDTO;
        }
        LoginResponseDTO loginResponseDTO = new LoginResponseDTO();
        loginResponseDTO.setUserFlag(authenticateResponseDTO.isUserFlag());
        loginResponseDTO.setLoginFlag(authenticateResponseDTO.isAuthoriseFlag());
        return loginResponseDTO;
    }

    @ResponseBody
    @RequestMapping(value={"/validateToken"}, method={RequestMethod.GET})
    public TokenResponseDTO validateToken(HttpServletRequest request, OAuth2Authentication authentication) throws RequestException {
        boolean validationFlag = false;
        TokenResponseDTO tokenResponseDTO = new TokenResponseDTO();
        if (request.getAttribute("AU001") != null) {
            throw new AuthorizationException("AU001", request.getAttribute("AU001").toString());
        }
        if (request.getAttribute("TokenExpired") != null) {
            tokenResponseDTO.setTokenExpired(true);
            tokenResponseDTO.setValidationSuccess(false);
            return tokenResponseDTO;
        }
        OAuth2AuthenticationDetails details = (OAuth2AuthenticationDetails)authentication.getDetails();
        Map additionalInfo = this.tokenServices.readAccessToken(details.getTokenValue()).getAdditionalInformation();
        String decryptHeaderUserInfo = null;
        if (request.getAttribute("userInfo") == null) {
            String userInfo = StringUtils.isEmpty((CharSequence)request.getHeader("USER_INFO")) ? additionalInfo.get("oauthUserInfo").toString() : request.getHeader("USER_INFO");
            decryptHeaderUserInfo = this.decryptUserInfo(userInfo);
        } else {
            decryptHeaderUserInfo = request.getAttribute("userInfo").toString();
        }
        if (StringUtils.isNotEmpty((CharSequence)request.getHeader("USER_INFO"))) {
            String tokenUserInfo = additionalInfo.get("oauthUserInfo").toString();
            String decryptTokenUserInfo = this.decryptUserInfo(tokenUserInfo);
            validationFlag = decryptTokenUserInfo.equals(decryptHeaderUserInfo);
        } else {
            validationFlag = true;
        }
        additionalInfo.put("decryptUserInfo", decryptHeaderUserInfo);
        tokenResponseDTO.setUserInfo(additionalInfo);
        tokenResponseDTO.setValidationSuccess(validationFlag);
        return tokenResponseDTO;
    }

    private String decryptUserInfo(String userInfo) throws RequestException {
        String decryptUserInfo = null;
        decryptUserInfo = this.encryptionProvider.isENCFormatted(userInfo) ? this.encryptionProvider.decrypt(userInfo) : userInfo;
        return decryptUserInfo;
    }

    @ResponseBody
    @RequestMapping(value={"/generateToken"}, method={RequestMethod.GET})
    public TokenResponseDTO generateToken(HttpServletRequest request) throws RequestException, HttpRequestMethodNotSupportedException {
        String refreshToken = request.getHeader("REFRESH_TOKEN");
        if (refreshToken != null) {
            return this.geenrateOAuthJWTToken(request);
        }
        return this.geenrateJWTToken(request);
    }

    private TokenResponseDTO geenrateJWTToken(HttpServletRequest request) throws RequestException {
        String userInfo = request.getHeader("USER_INFO");
        String decryptUserInfo = null;
        if (this.encryptionProvider.isENCFormatted(userInfo)) {
            try {
                decryptUserInfo = this.encryptionProvider.decrypt(userInfo);
            }
            catch (RequestException e) {
                throw new RequestException((Throwable)e);
            }
        } else {
            decryptUserInfo = userInfo;
        }
        TokenResponseDTO tokenResponseDTO = new TokenResponseDTO();
        tokenResponseDTO.setToken(this.jwtTokenUtil.generateToken(decryptUserInfo));
        tokenResponseDTO.setExpireAt(this.jwtTokenUtil.getExpirationDateFromToken(tokenResponseDTO.getToken()));
        HashMap<String, Object> additionalInfo = new HashMap<String, Object>();
        additionalInfo.put("decryptUserInfo", decryptUserInfo);
        tokenResponseDTO.setUserInfo(additionalInfo);
        return tokenResponseDTO;
    }

    private TokenResponseDTO geenrateOAuthJWTToken(HttpServletRequest request) throws RequestException, HttpRequestMethodNotSupportedException {
        String userInfo = request.getHeader("USER_INFO");
        String refreshToken = request.getHeader("REFRESH_TOKEN");
        String decryptUserInfo = null;
        if (this.encryptionProvider.isENCFormatted(userInfo)) {
            try {
                decryptUserInfo = this.encryptionProvider.decrypt(userInfo);
            }
            catch (RequestException e) {
                throw new RequestException((Throwable)e);
            }
        } else {
            decryptUserInfo = userInfo;
        }
        List grantedAuths = AuthorityUtils.createAuthorityList((String[])new String[]{"ROLE_USER"});
        User principal = new User("STRATROOM_CLINET_ID", "", (Collection)grantedAuths);
        UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken((Object)principal, (Object)"", (Collection)grantedAuths);
        HashMap<String, String> parameters = new HashMap<String, String>();
        parameters.put("grant_type", "refresh_token");
        parameters.put("refresh_token", refreshToken);
        OAuth2AccessToken oAuth2AccessToken = (OAuth2AccessToken)this.tokenEndPoint.postAccessToken((Principal)auth, parameters).getBody();
        TokenResponseDTO tokenResponseDTO = new TokenResponseDTO();
        tokenResponseDTO.setToken(oAuth2AccessToken.getValue());
        tokenResponseDTO.setExpireAt(oAuth2AccessToken.getExpiration());
        Map additionalInfo = oAuth2AccessToken.getAdditionalInformation();
        additionalInfo.put("decryptUserInfo", decryptUserInfo);
        tokenResponseDTO.setUserInfo(additionalInfo);
        return tokenResponseDTO;
    }
}

