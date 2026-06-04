/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.auth0.jwt.JWT
 *  com.auth0.jwt.JWTVerifier
 *  com.auth0.jwt.algorithms.Algorithm
 *  com.auth0.jwt.interfaces.DecodedJWT
 *  com.estrat.service.auth.config.EmbeddedTomcatConfig
 *  com.estrat.service.jwt.JwtTokenUtil
 *  org.apache.log4j.Logger
 *  org.springframework.beans.factory.annotation.Autowired
 */
package com.estrat.service.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.estrat.service.auth.config.EmbeddedTomcatConfig;
import java.io.Serializable;
import java.time.Clock;
import java.time.ZoneId;
import java.util.Date;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

public class JwtTokenUtil
implements Serializable {
    private static final long serialVersionUID = -2550185165626007488L;
    public static final String TOKEN_KEY = "userInfo";
    private Logger logger = Logger.getLogger(JwtTokenUtil.class);
    private EmbeddedTomcatConfig config;
    private JWTVerifier jwtVerifier;

    @Autowired
    public JwtTokenUtil(EmbeddedTomcatConfig config) {
        this.config = config;
        this.jwtVerifier = JWT.require((Algorithm)Algorithm.HMAC256((String)config.getSecret())).build();
    }

    public String getUsernameFromToken(String token) {
        return this.decodedJWT(token).getSubject();
    }

    public Date getExpirationDateFromToken(String token) {
        return this.decodedJWT(token).getExpiresAt();
    }

    public String getAuthority(String token) {
        return this.decodedJWT(token).getClaim("authority").asString();
    }

    public DecodedJWT decodedJWT(String token) {
        DecodedJWT claims = this.decode(token);
        return claims;
    }

    private DecodedJWT decode(String token) {
        return this.jwtVerifier.verify(token);
    }

    public Boolean isTokenExpired(String token) {
        Date expiration = this.getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }

    public String generateToken(String userInfo) {
        return this.doGenerateToken(userInfo);
    }

    private String doGenerateToken(String userInfo) {
        Clock clock = Clock.system(ZoneId.systemDefault());
        String token = JWT.create().withClaim(TOKEN_KEY, userInfo).withSubject(userInfo).withIssuedAt(new Date(System.currentTimeMillis())).withExpiresAt(Date.from(clock.instant().plusSeconds(this.config.getTokenValidity()))).sign(Algorithm.HMAC256((String)this.config.getSecret()));
        this.logger.debug((Object)"Token generated successfully");
        return token;
    }

    public Boolean validateToken(String token, String userInfo) {
        String userName = this.decodedJWT(token).getClaim(TOKEN_KEY).asString();
        return userName != null && userName.equals(userInfo) && this.isTokenExpired(token) == false;
    }
}

