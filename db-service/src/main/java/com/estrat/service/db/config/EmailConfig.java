/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.config.EmailConfig
 *  org.springframework.boot.context.properties.ConfigurationProperties
 *  org.springframework.stereotype.Component
 */
package com.estrat.service.db.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix="mail.smtp")
public class EmailConfig {
    private String host;
    private int port;
    private String userName;
    private String password;
    private String protocol;
    private String auth;
    private String connectionTimeout;
    private boolean startSSLEnable;
    private String timeout;
    private String writeTimeout;
    private String startTlsEnable;

    public boolean isStartSSLEnable() {
        return this.startSSLEnable;
    }

    public void setStartSSLEnable(boolean startSSLEnable) {
        this.startSSLEnable = startSSLEnable;
    }

    public String getConnectionTimeout() {
        return this.connectionTimeout;
    }

    public void setConnectionTimeout(String connectionTimeout) {
        this.connectionTimeout = connectionTimeout;
    }

    public String getWriteTimeout() {
        return this.writeTimeout;
    }

    public void setWriteTimeout(String writeTimeout) {
        this.writeTimeout = writeTimeout;
    }

    public String getHost() {
        return this.host;
    }

    public void setHost(String host) {
        this.host = host;
    }

    public int getPort() {
        return this.port;
    }

    public void setPort(int port) {
        this.port = port;
    }

    public String getUserName() {
        return this.userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getProtocol() {
        return this.protocol;
    }

    public void setProtocol(String protocol) {
        this.protocol = protocol;
    }

    public String getAuth() {
        return this.auth;
    }

    public void setAuth(String auth) {
        this.auth = auth;
    }

    public String getTimeout() {
        return this.timeout;
    }

    public void setTimeout(String timeout) {
        this.timeout = timeout;
    }

    public String getStartTlsEnable() {
        return this.startTlsEnable;
    }

    public void setStartTlsEnable(String startTlsEnable) {
        this.startTlsEnable = startTlsEnable;
    }
}

