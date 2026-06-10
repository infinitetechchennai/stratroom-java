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

    @Value(value="${jwt.secret:123456}")
    public void setSecret(String secret) {
        this.secret = secret;
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

