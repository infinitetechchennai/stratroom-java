/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.config.ApplicationConfig
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.context.annotation.Configuration
 *  org.springframework.web.servlet.HandlerInterceptor
 *  org.springframework.web.servlet.config.annotation.InterceptorRegistry
 *  org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry
 *  org.springframework.web.servlet.config.annotation.WebMvcConfigurer
 */
package com.estrat.web.config;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.PathMatchConfigurer;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class ApplicationConfig
implements WebMvcConfigurer {
    @Value(value="${interCeptFlag:true}")
    public boolean interCeptFlag;
    @Autowired(required=false)
    private List<HandlerInterceptor> interceptors;

    public void addInterceptors(InterceptorRegistry registry) {
        if (this.interCeptFlag) {
            this.interceptors.forEach(arg_0 -> ((InterceptorRegistry)registry).addInterceptor(arg_0));
        }
    }

    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler(new String[]{"swagger-ui.html"}).addResourceLocations(new String[]{"classpath:/META-INF/resources/"});
        registry.addResourceHandler(new String[]{"/webjars/**"}).addResourceLocations(new String[]{"classpath:/META-INF/resources/webjars/"});
        registry.addResourceHandler(new String[]{"/static/**"}).addResourceLocations(new String[]{"/static/"});
    }

    /**
     * Re-enable trailing-slash matching (default-on in Spring 5, default-off in Spring 6).
     * The legacy frontend AJAX (admin.js getPermissionList etc.) calls /user/permissions
     * with no trailing slash, but several @GetMapping handlers are only matched with
     * the slash form under the current ant_path_matcher + Spring 6 combination, causing
     * them to fall through to the static-resource handler and return 404
     * ("No static resource user/permissions"). This restores the old behaviour so both
     * /user/permissions and /user/permissions/ route to the controller.
     */
    @Override
    @SuppressWarnings("deprecation")
    public void configurePathMatch(PathMatchConfigurer configurer) {
        configurer.setUseTrailingSlashMatch(true);
    }
}

