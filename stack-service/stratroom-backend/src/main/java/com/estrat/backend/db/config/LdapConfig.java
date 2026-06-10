/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.config.LdapConfig
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.context.annotation.Bean
 *  org.springframework.context.annotation.Configuration
 *  org.springframework.ldap.core.ContextSource
 *  org.springframework.ldap.core.LdapTemplate
 *  org.springframework.ldap.core.support.LdapContextSource
 */
package com.estrat.backend.db.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.ldap.core.ContextSource;
import org.springframework.ldap.core.LdapTemplate;
import org.springframework.ldap.core.support.LdapContextSource;

@Configuration
public class LdapConfig {
    @Value(value="${ldap.url}")
    private String ldapUrl;
    @Value(value="${ldap.bind.dn}")
    private String ldapbind;
    @Value(value="${ldap.bind.password}")
    private String ldappwd;

    @Bean
    public LdapTemplate ldapTemplate() {
        LdapContextSource contextSource = new LdapContextSource();
        contextSource.setUrl(this.ldapUrl);
        contextSource.setUserDn(this.ldapbind);
        contextSource.setPassword(this.ldappwd);
        contextSource.afterPropertiesSet();
        return new LdapTemplate((ContextSource)contextSource);
    }
}

