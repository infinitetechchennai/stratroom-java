package com.estrat.backend.auth.config;

import com.auth0.jwt.exceptions.TokenExpiredException;
import com.estrat.backend.auth.encryption.EncryptionProvider;
import com.estrat.backend.auth.exception.RequestException;
import com.estrat.backend.auth.jwt.JwtTokenUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;

/**
 * Reactive replacement for {@link JWTOAuthTokenFilter}.
 */
public class JWTOAuthTokenWebFilter implements WebFilter {

    private static final Logger LOGGER = LoggerFactory.getLogger(JWTOAuthTokenWebFilter.class);

    private final JwtTokenUtil jwtTokenUtil;
    private final EncryptionProvider encryptionProvider;

    public JWTOAuthTokenWebFilter(JwtTokenUtil jwtTokenUtil, EncryptionProvider encryptionProvider) {
        this.jwtTokenUtil = jwtTokenUtil;
        this.encryptionProvider = encryptionProvider;
    }

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
        ServerHttpRequest request = exchange.getRequest();
        try {
            String decryptUserInfo = resolveHeaderUserInfo(request);

            String authHeader = request.getHeaders().getFirst("Authorization");
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                String jwtToken = authHeader.substring(7).trim();
                if (jwtToken.isEmpty()) {
                    exchange.getAttributes().put("AU001", "Jwt Token missing in the request");
                } else if (jwtTokenUtil.isTokenExpired(jwtToken)) {
                    exchange.getAttributes().put("TokenExpired", "Jwt Token Expired");
                } else {
                    String resolvedUserInfo = resolveUserInfo(jwtToken, decryptUserInfo);
                    if (resolvedUserInfo != null) {
                        exchange.getAttributes().put("userInfo", resolvedUserInfo);
                    } else if (decryptUserInfo != null && !decryptUserInfo.isEmpty()
                            && !tokenMatchesUserInfo(jwtToken, decryptUserInfo)) {
                        LOGGER.warn("JWT Token userInfo mismatch with USER_INFO header");
                    }
                    UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                            null, null, AuthorityUtils.createAuthorityList("ROLE_USER"));
                    return chain.filter(exchange)
                            .contextWrite(ReactiveSecurityContextHolder.withAuthentication(auth));
                }
            } else if (authHeader != null) {
                exchange.getAttributes().put("AU001", "Jwt Token missing in the request");
            } else {
                exchange.getAttributes().put("AU001", "Jwt Token missing in the request");
            }
            return chain.filter(exchange);
        } catch (TokenExpiredException exception) {
            exchange.getAttributes().put("TokenExpired", "Jwt Token Expired");
            return chain.filter(exchange);
        } catch (Exception e) {
            return Mono.error(e);
        }
    }

    private String resolveHeaderUserInfo(ServerHttpRequest request) throws RequestException {
        String userInfo = request.getHeaders().getFirst("USER_INFO");
        if (userInfo != null && encryptionProvider.isENCFormatted(userInfo)) {
            return encryptionProvider.decrypt(userInfo);
        }
        return userInfo;
    }

    private String resolveUserInfo(String jwtToken, String decryptUserInfo) {
        if (decryptUserInfo != null && !decryptUserInfo.isEmpty()) {
            return decryptUserInfo;
        }
        try {
            String tokenUserInfo = jwtTokenUtil.getUserInfoFromToken(jwtToken);
            if (tokenUserInfo == null) {
                return null;
            }
            return encryptionProvider.isENCFormatted(tokenUserInfo)
                    ? encryptionProvider.decrypt(tokenUserInfo)
                    : tokenUserInfo;
        } catch (Exception e) {
            LOGGER.warn("Failed to resolve userInfo from token: {}", e.getMessage());
            return null;
        }
    }

    private boolean tokenMatchesUserInfo(String jwtToken, String decryptUserInfo) {
        try {
            String tokenUserInfo = jwtTokenUtil.getUserInfoFromToken(jwtToken);
            if (tokenUserInfo == null) {
                return false;
            }
            String decryptTokenUserInfo = encryptionProvider.isENCFormatted(tokenUserInfo)
                    ? encryptionProvider.decrypt(tokenUserInfo)
                    : tokenUserInfo;
            return decryptTokenUserInfo.equals(decryptUserInfo);
        } catch (Exception e) {
            LOGGER.warn("Failed to compare token userInfo: {}", e.getMessage());
            return false;
        }
    }
}
