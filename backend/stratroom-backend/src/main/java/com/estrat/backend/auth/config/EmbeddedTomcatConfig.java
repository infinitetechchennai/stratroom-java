/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.auth.config.EmbeddedTomcatConfig
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.context.annotation.Configuration
 */
package com.estrat.backend.auth.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class EmbeddedTomcatConfig {
    private boolean useSystemKey;
    private String jasyptAlgorithm;
    private String jasyptPasssword;
    private String secret;
    private long tokenValidity;

    public String getJasyptAlgorithm() {
        return this.jasyptAlgorithm;
    }

    @Value(value="${auth.jasypt.algorithm:PBEWithMD5AndDes}")
    public void setJasyptAlgorithm(String jasyptAlgorithm) {
        this.jasyptAlgorithm = jasyptAlgorithm;
    }

    public String getJasyptPasssword() {
        return this.jasyptPasssword;
    }

    @Value(value="${auth.jasypt.password:123456}")
    public void setJasyptPasssword(String jasyptPasssword) {
        this.jasyptPasssword = jasyptPasssword;
    }

    public String getSecret() {
        return this.secret;
    }

    @Value(value="${jwt.secret}")
    public void setSecret(String secret) {
        this.secret = secret;
    }

    @jakarta.annotation.PostConstruct
    public void validateSecret() {
        if (this.secret == null || this.secret.getBytes().length < 32) {
            throw new IllegalStateException(
                "jwt.secret must be supplied via the JWT_SECRET environment variable and be at least 32 bytes (256 bits)");
        }
    }

    public long getTokenValidity() {
        return this.tokenValidity;
    }

    @Value(value="${jwt.tokenexpiration:900}")
    public void setTokenValidity(long tokenValidity) {
        this.tokenValidity = tokenValidity;
    }

    public boolean isUseSystemKey() {
        return this.useSystemKey;
    }

    @Value(value="${tomcat.embedded.systemkeyenabled:false}")
    public void setUseSystemKey(boolean useSystemKey) {
        this.useSystemKey = useSystemKey;
    }
}

