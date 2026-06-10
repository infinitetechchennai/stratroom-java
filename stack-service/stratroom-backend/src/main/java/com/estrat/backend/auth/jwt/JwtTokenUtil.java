package com.estrat.backend.auth.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.estrat.backend.auth.config.EmbeddedTomcatConfig;
import java.io.Serializable;
import java.time.Clock;
import java.time.ZoneId;
import java.util.Date;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

public class JwtTokenUtil implements Serializable {

    private static final long serialVersionUID = -2550185165626007488L;
    public static final String TOKEN_KEY = "userInfo";
    private static final long REFRESH_TOKEN_VALIDITY_SECONDS = 7200L;

    private Logger logger = LoggerFactory.getLogger(JwtTokenUtil.class);
    private EmbeddedTomcatConfig config;
    private JWTVerifier jwtVerifier;

    @Autowired
    public JwtTokenUtil(EmbeddedTomcatConfig config) {
        this.config = config;
        this.jwtVerifier = JWT.require(Algorithm.HMAC256(config.getSecret())).build();
    }

    public String getUsernameFromToken(String token) {
        return decodedJWT(token).getSubject();
    }

    public Date getExpirationDateFromToken(String token) {
        return decodedJWT(token).getExpiresAt();
    }

    public String getAuthority(String token) {
        return decodedJWT(token).getClaim("authority").asString();
    }

    public String getUserInfoFromToken(String token) {
        return decodedJWT(token).getClaim(TOKEN_KEY).asString();
    }

    public DecodedJWT decodedJWT(String token) {
        return decode(token);
    }

    private DecodedJWT decode(String token) {
        return jwtVerifier.verify(token);
    }

    public Boolean isTokenExpired(String token) {
        Date expiration = getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }

    public String generateToken(String userInfo) {
        return doGenerateToken(userInfo, config.getTokenValidity());
    }

    public String generateRefreshToken(String userInfo) {
        return doGenerateToken(userInfo, REFRESH_TOKEN_VALIDITY_SECONDS);
    }

    private String doGenerateToken(String userInfo, long validitySeconds) {
        Clock clock = Clock.system(ZoneId.systemDefault());
        String token = JWT.create()
                .withClaim(TOKEN_KEY, userInfo)
                .withSubject(userInfo)
                .withIssuedAt(new Date(System.currentTimeMillis()))
                .withExpiresAt(Date.from(clock.instant().plusSeconds(validitySeconds)))
                .sign(Algorithm.HMAC256(config.getSecret()));
        logger.debug("Token generated successfully");
        return token;
    }

    public Boolean validateToken(String token, String userInfo) {
        String userName = decodedJWT(token).getClaim(TOKEN_KEY).asString();
        return userName != null && userName.equals(userInfo) && !isTokenExpired(token);
    }
}
