package com.estrat.service.auth.config;

import com.auth0.jwt.exceptions.TokenExpiredException;
import com.estrat.service.encryption.EncryptionProvider;
import com.estrat.service.exception.RequestException;
import com.estrat.service.jwt.JwtTokenUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Collection;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

public class JWTOAuthTokenFilter extends GenericFilterBean {

    private static final Logger LOGGER = LoggerFactory.getLogger(JWTOAuthTokenFilter.class);

    private AuthenticationManager authenticationManager;
    private EncryptionProvider encryptionProvider;
    private JwtTokenUtil jwtTokenUtil;

    public void setAuthenticationManager(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    public void setEncryptionProvider(EncryptionProvider encryptionProvider) {
        this.encryptionProvider = encryptionProvider;
    }

    public void setJwtTokenUtil(JwtTokenUtil jwtTokenUtil) {
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @Override
    public void doFilter(ServletRequest arg0, ServletResponse arg1, FilterChain arg2) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) arg0;
        String decryptUserInfo = null;
        try {
            String userInfo = request.getHeader("USER_INFO");
            if (userInfo != null && encryptionProvider.isENCFormatted(userInfo)) {
                try {
                    decryptUserInfo = encryptionProvider.decrypt(userInfo);
                } catch (RequestException e) {
                    throw new ServletException(e);
                }
                LOGGER.debug("Decrypted user info in JWTOAuthTokenFilter: {}", decryptUserInfo);
            } else {
                decryptUserInfo = userInfo;
            }

            if (request.getHeader("Authorization") != null) {
                String jwtToken = request.getHeader("Authorization").substring(7);
                LOGGER.debug("JWT Token: {}", jwtToken);
                if (jwtTokenUtil.isTokenExpired(jwtToken)) {
                    LOGGER.debug("JWT Token Expired");
                    request.setAttribute("TokenExpired", "Jwt Token Expired");
                } else if (decryptUserInfo != null && !jwtTokenUtil.validateToken(jwtToken, decryptUserInfo)) {
                    LOGGER.debug("JWT Token not matching with userinfo");
                    request.setAttribute("AU001", "Jwt Token not matching with userinfo");
                } else {
                    if (decryptUserInfo != null) {
                        request.setAttribute("userInfo", decryptUserInfo);
                    }
                    List<String> grantedAuths = List.of("ROLE_USER");
                    UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                            null, null, AuthorityUtils.createAuthorityList("ROLE_USER"));
                    SecurityContextHolder.getContext().setAuthentication(auth);
                }
            } else {
                LOGGER.debug("JWT Token missing in the request");
                request.setAttribute("AU001", "Jwt Token missing in the request");
            }
            arg2.doFilter(request, arg1);
        } catch (TokenExpiredException exception) {
            request.setAttribute("TokenExpired", "Jwt Token Expired");
            arg2.doFilter(request, arg1);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
