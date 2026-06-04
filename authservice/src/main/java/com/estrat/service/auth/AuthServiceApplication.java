/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.auth.AuthServiceApplication
 *  com.estrat.service.auth.config.AuthRestTemplate
 *  org.springframework.boot.SpringApplication
 *  org.springframework.boot.autoconfigure.EnableAutoConfiguration
 *  org.springframework.boot.autoconfigure.SpringBootApplication
 *  org.springframework.boot.autoconfigure.jdbc.DataSourceTransactionManagerAutoConfiguration
 *  org.springframework.boot.jdbc.DataSourceBuilder
 *  org.springframework.context.annotation.Bean
 *  org.springframework.context.annotation.ComponentScan
 *  org.springframework.context.support.PropertySourcesPlaceholderConfigurer
 *  org.springframework.core.env.Environment
 *  org.springframework.core.io.FileSystemResource
 *  org.springframework.core.io.Resource
 *  org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer
 *  org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer
 */
package com.estrat.service.auth;

import com.estrat.service.auth.config.AuthRestTemplate;
import javax.sql.DataSource;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceTransactionManagerAutoConfiguration;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;
import org.springframework.core.env.Environment;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;

@SpringBootApplication
@ComponentScan(basePackages={"com"})
@EnableAutoConfiguration(exclude={DataSourceTransactionManagerAutoConfiguration.class})
@EnableAuthorizationServer
@EnableResourceServer
public class AuthServiceApplication {
    public static void main(String[] args) {
        String configName = System.getProperty("service.name");
        System.setProperty("service.name", configName == null ? "auth-service" : configName);
        SpringApplication.run(AuthServiceApplication.class, (String[])args);
    }

    @Bean
    public AuthRestTemplate getRestTemplate() {
        return new AuthRestTemplate();
    }

    @Bean
    public DataSource dataSource(
            @org.springframework.beans.factory.annotation.Value("${spring.datasource.url:jdbc:h2:mem:authdb}") String url,
            @org.springframework.beans.factory.annotation.Value("${spring.datasource.driverClassName:org.h2.Driver}") String driver,
            @org.springframework.beans.factory.annotation.Value("${spring.datasource.username:sa}") String username,
            @org.springframework.beans.factory.annotation.Value("${spring.datasource.password:}") String password) {
        return DataSourceBuilder.create()
                .url(url)
                .driverClassName(driver)
                .username(username)
                .password(password)
                .build();
    }

    @Bean
    public PropertySourcesPlaceholderConfigurer propertySourcesPlaceholderConfigurer(Environment environment) {
        String configDir = environment.getProperty("config.directory");
        String serviceName = environment.getProperty("service.name");
        PropertySourcesPlaceholderConfigurer propertySourcesPlaceholderConfigurer = new PropertySourcesPlaceholderConfigurer();
        serviceName = serviceName != null ? serviceName : "auth-service";
        FileSystemResource fileSystemResource = new FileSystemResource(String.format("%s/%s%s", configDir, serviceName, ".properties"));
        propertySourcesPlaceholderConfigurer.setLocations(new Resource[]{fileSystemResource});
        return propertySourcesPlaceholderConfigurer;
    }
}

