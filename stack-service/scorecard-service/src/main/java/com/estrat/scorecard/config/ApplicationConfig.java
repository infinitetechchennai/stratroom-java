/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.scorecard.config.ApplicationConfig
 *  com.estrat.scorecard.config.CommonControllerInterceptor
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.context.annotation.Bean
 *  org.springframework.context.annotation.Configuration
 *  org.springframework.web.servlet.HandlerInterceptor
 *  org.springframework.web.servlet.config.annotation.InterceptorRegistry
 *  org.springframework.web.servlet.config.annotation.WebMvcConfigurer
 */
package com.estrat.scorecard.config;

import com.estrat.scorecard.config.CommonControllerInterceptor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class ApplicationConfig
implements WebMvcConfigurer {
    @Value(value="${interCeptFlag:true}")
    public boolean interCeptFlag;

    @Bean
    public CommonControllerInterceptor controllerInterceptor() {
        CommonControllerInterceptor commonControllerInterceptor = new CommonControllerInterceptor();
        return commonControllerInterceptor;
    }

    public void addInterceptors(InterceptorRegistry registry) {
        if (this.interCeptFlag) {
            registry.addInterceptor((HandlerInterceptor)this.controllerInterceptor());
        }
    }
}

