/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.config.DataBaseProperties
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.context.annotation.Configuration
 */
package com.estrat.backend.db.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataBaseProperties {
    @Value(value="${spring.jpa.show-sql}")
    private boolean showSql;
    @Value(value="${spring.jpa.format-sql}")
    private boolean formatSQL;
    @Value(value="${spring.jpa.properties.hibernate.dialect}")
    private String hibernateDialect;
    @Value(value="${spring.jpa.hibernate.naming-strategy}")
    private String strategy;
    @Value(value="${spring.jpa.properties.hibernate.current_session_context_class}")
    private String contextClass;

    public boolean isShowSql() {
        return this.showSql;
    }

    public void setShowSql(boolean showSql) {
        this.showSql = showSql;
    }

    public boolean isFormatSQL() {
        return this.formatSQL;
    }

    public void setFormatSQL(boolean formatSQL) {
        this.formatSQL = formatSQL;
    }

    public String getHibernateDialect() {
        return this.hibernateDialect;
    }

    public void setHibernateDialect(String hibernateDialect) {
        this.hibernateDialect = hibernateDialect;
    }

    public String getStrategy() {
        return this.strategy;
    }

    public void setStrategy(String strategy) {
        this.strategy = strategy;
    }

    public String getContextClass() {
        return this.contextClass;
    }

    public void setContextClass(String contextClass) {
        this.contextClass = contextClass;
    }
}

