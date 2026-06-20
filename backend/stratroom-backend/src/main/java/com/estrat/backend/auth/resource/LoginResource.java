package com.estrat.backend.auth.resource;

import com.estrat.backend.auth.service.DBService;
import com.estrat.backend.auth.service.LoginService;
import com.estrat.backend.auth.dto.AuthenticateResponseDTO;
import com.estrat.backend.auth.dto.LoginDTO;
import com.estrat.backend.auth.dto.LoginResponseDTO;
import com.estrat.backend.auth.dto.TokenResponseDTO;
import com.estrat.backend.auth.encryption.EncryptionProvider;
import com.estrat.backend.auth.exception.AuthorizationException;
import com.estrat.backend.auth.exception.RequestException;
import com.estrat.backend.auth.jwt.JwtTokenUtil;
import com.estrat.backend.auth.util.ServiceRequestThreadLocal;
import com.estrat.backend.auth.util.UserPrincipal;
import jakarta.servlet.http.HttpServletRequest;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
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
    private DBService dbService;

    @Autowired
    private LoginService loginService;

    @ResponseBody
    @RequestMapping(value = {"/login"}, method = {RequestMethod.POST})
    public Object login(@RequestBody LoginDTO loginDTO) throws RequestException {
        AuthenticateResponseDTO authenticateResponseDTO = dbService.authoriseUser(loginDTO);
        if (authenticateResponseDTO.isAuthoriseFlag()) {
            // Seed the request-scoped principal with the granted authorities first, because
            // LoginService.getEncryptedUserInfo() reads them from ServiceRequestThreadLocal.
            UserPrincipal userPrincipal = new UserPrincipal();
            userPrincipal.setSsoLogin(loginDTO.isSsoLogin());
            userPrincipal.setAuthority(Arrays.asList("USER", "ROLE_USER"));
            ServiceRequestThreadLocal.set(userPrincipal);

            // Build the login response from the authentication result (the direct DBService
            // login path does not go through CustomAuthenticationProvider, so we populate it here).
            LoginResponseDTO loginResponseDTO = new LoginResponseDTO();
            loginResponseDTO.setLoginFlag(authenticateResponseDTO.isAuthoriseFlag());
            loginResponseDTO.setUserFlag(authenticateResponseDTO.isUserFlag());
            loginResponseDTO.setProfile(authenticateResponseDTO.getEmployee());
            loginResponseDTO.setOrgUserCount(authenticateResponseDTO.getOrgUserCount());
            loginResponseDTO.setUserPermissions(authenticateResponseDTO.getUserPermissions());
            loginResponseDTO.setUserInfo(loginService.getEncryptedUserInfo(loginDTO, authenticateResponseDTO));
            ServiceRequestThreadLocal.get().setLoginResponseDTO(loginResponseDTO);

            String userInfo = loginResponseDTO.getUserInfo();

            String accessToken = jwtTokenUtil.generateToken(userInfo);
            String refreshToken = jwtTokenUtil.generateRefreshToken(userInfo);

            loginResponseDTO.setAccessToken(accessToken);
            loginResponseDTO.setRefreshToken(refreshToken);
            loginResponseDTO.setExpireAt(jwtTokenUtil.getExpirationDateFromToken(accessToken));
            return loginResponseDTO;
        }
        LoginResponseDTO loginResponseDTO = new LoginResponseDTO();
        loginResponseDTO.setUserFlag(authenticateResponseDTO.isUserFlag());
        loginResponseDTO.setLoginFlag(authenticateResponseDTO.isAuthoriseFlag());
        return loginResponseDTO;
    }

    @ResponseBody
    @RequestMapping(value = {"/validateToken"}, method = {RequestMethod.GET})
    public TokenResponseDTO validateToken(HttpServletRequest request) throws RequestException {
        TokenResponseDTO tokenResponseDTO = new TokenResponseDTO();

        if (request.getAttribute("AU001") != null) {
            throw new AuthorizationException("AU001", request.getAttribute("AU001").toString());
        }
        if (request.getAttribute("TokenExpired") != null) {
            tokenResponseDTO.setTokenExpired(true);
            tokenResponseDTO.setValidationSuccess(false);
            return tokenResponseDTO;
        }

        String decryptHeaderUserInfo = null;
        Map<String, Object> additionalInfo = new HashMap<>();

        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String jwtToken = authHeader.substring(7);
            String tokenUserInfo = jwtTokenUtil.getUserInfoFromToken(jwtToken);
            additionalInfo.put("oauthUserInfo", tokenUserInfo);

            if (request.getAttribute("userInfo") == null) {
                String userInfo = StringUtils.isEmpty(request.getHeader("USER_INFO"))
                        ? tokenUserInfo
                        : request.getHeader("USER_INFO");
                decryptHeaderUserInfo = decryptUserInfo(userInfo);
            } else {
                decryptHeaderUserInfo = request.getAttribute("userInfo").toString();
            }

            boolean validationFlag;
            if (StringUtils.isNotEmpty(request.getHeader("USER_INFO"))) {
                String decryptTokenUserInfo = decryptUserInfo(tokenUserInfo);
                validationFlag = decryptTokenUserInfo.equals(decryptHeaderUserInfo);
            } else {
                validationFlag = true;
            }

            additionalInfo.put("decryptUserInfo", decryptHeaderUserInfo);
            tokenResponseDTO.setUserInfo(additionalInfo);
            tokenResponseDTO.setValidationSuccess(validationFlag);
        } else {
            tokenResponseDTO.setValidationSuccess(false);
        }

        return tokenResponseDTO;
    }

    private String decryptUserInfo(String userInfo) throws RequestException {
        if (userInfo == null) return null;
        return encryptionProvider.isENCFormatted(userInfo) ? encryptionProvider.decrypt(userInfo) : userInfo;
    }

    @ResponseBody
    @RequestMapping(value = {"/generateToken"}, method = {RequestMethod.GET})
    public TokenResponseDTO generateToken(HttpServletRequest request) throws RequestException {
        String refreshToken = request.getHeader("REFRESH_TOKEN");
        if (refreshToken != null) {
            return generateOAuthJWTToken(request);
        }
        return generateJWTToken(request);
    }

    private TokenResponseDTO generateJWTToken(HttpServletRequest request) throws RequestException {
        String userInfo = request.getHeader("USER_INFO");
        String decryptUserInfo = null;
        if (encryptionProvider.isENCFormatted(userInfo)) {
            try {
                decryptUserInfo = encryptionProvider.decrypt(userInfo);
            } catch (RequestException e) {
                throw new RequestException(e);
            }
        } else {
            decryptUserInfo = userInfo;
        }
        TokenResponseDTO tokenResponseDTO = new TokenResponseDTO();
        tokenResponseDTO.setToken(jwtTokenUtil.generateToken(decryptUserInfo));
        tokenResponseDTO.setExpireAt(jwtTokenUtil.getExpirationDateFromToken(tokenResponseDTO.getToken()));
        HashMap<String, Object> additionalInfo = new HashMap<>();
        additionalInfo.put("decryptUserInfo", decryptUserInfo);
        tokenResponseDTO.setUserInfo(additionalInfo);
        return tokenResponseDTO;
    }

    private TokenResponseDTO generateOAuthJWTToken(HttpServletRequest request) throws RequestException {
        String userInfo = request.getHeader("USER_INFO");
        String refreshToken = request.getHeader("REFRESH_TOKEN");
        String decryptUserInfo = null;
        if (encryptionProvider.isENCFormatted(userInfo)) {
            try {
                decryptUserInfo = encryptionProvider.decrypt(userInfo);
            } catch (RequestException e) {
                throw new RequestException(e);
            }
        } else {
            decryptUserInfo = userInfo;
        }

        // Validate refresh token and extract user info
        String refreshUserInfo = jwtTokenUtil.getUserInfoFromToken(refreshToken);
        if (jwtTokenUtil.isTokenExpired(refreshToken)) {
            throw new RequestException(new RuntimeException("Refresh token expired"));
        }

        // Generate new access token using info from refresh token
        String newAccessToken = jwtTokenUtil.generateToken(refreshUserInfo);

        TokenResponseDTO tokenResponseDTO = new TokenResponseDTO();
        tokenResponseDTO.setToken(newAccessToken);
        tokenResponseDTO.setExpireAt(jwtTokenUtil.getExpirationDateFromToken(newAccessToken));
        HashMap<String, Object> additionalInfo = new HashMap<>();
        additionalInfo.put("decryptUserInfo", decryptUserInfo != null ? decryptUserInfo : refreshUserInfo);
        tokenResponseDTO.setUserInfo(additionalInfo);
        return tokenResponseDTO;
    }
}
