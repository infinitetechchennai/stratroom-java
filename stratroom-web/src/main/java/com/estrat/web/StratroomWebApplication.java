/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.StratroomWebApplication
 *  com.estrat.web.config.CommonHttpClientInterceptor
 *  com.estrat.web.config.CommonRestTemplate
 *  com.estrat.web.config.EmailConfig
 *  com.estrat.web.config.SpringDispatcherServlet
 *  com.estrat.web.privilege.PrivilegeAdvisor
 *  com.estrat.web.privilege.PrivilegeInterceptor
 *  com.estrat.web.service.LicenseService
 *  com.estrat.web.service.RoleService
 *  com.estrat.web.valve.EmbeddedValveCollection
 *  com.estrat.web.valve.LicenseVerificationValve
 *  javax.servlet.Servlet
 *  org.apache.catalina.Valve
 *  org.springframework.aop.Advisor
 *  org.springframework.boot.SpringApplication
 *  org.springframework.boot.autoconfigure.SpringBootApplication
 *  org.springframework.boot.context.properties.EnableConfigurationProperties
 *  org.springframework.boot.web.client.RestTemplateBuilder
 *  org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory
 *  org.springframework.boot.web.server.WebServerFactoryCustomizer
 *  org.springframework.boot.web.servlet.ServletRegistrationBean
 *  org.springframework.context.annotation.Bean
 *  org.springframework.context.annotation.EnableAspectJAutoProxy
 *  org.springframework.context.support.PropertySourcesPlaceholderConfigurer
 *  org.springframework.core.env.Environment
 *  org.springframework.core.io.FileSystemResource
 *  org.springframework.core.io.Resource
 *  org.springframework.mail.javamail.JavaMailSender
 *  org.springframework.mail.javamail.JavaMailSenderImpl
 *  org.springframework.web.client.RestTemplate
 *  org.springframework.web.context.WebApplicationContext
 *  org.springframework.web.multipart.commons.CommonsMultipartResolver
 *  org.springframework.web.servlet.FrameworkServlet
 *  org.springframework.web.servlet.view.InternalResourceViewResolver
 */
package com.estrat.web;

import com.estrat.web.config.CommonHttpClientInterceptor;
import com.estrat.web.config.CommonRestTemplate;
import com.estrat.web.config.EmailConfig;
import com.estrat.web.config.SpringDispatcherServlet;
import com.estrat.web.privilege.PrivilegeAdvisor;
import com.estrat.web.privilege.PrivilegeInterceptor;
import com.estrat.web.service.LicenseService;
import com.estrat.web.service.RoleService;
import com.estrat.web.valve.EmbeddedValveCollection;
import com.estrat.web.valve.LicenseVerificationValve;
import java.util.Collection;
import java.util.Properties;
import jakarta.servlet.Servlet;
import org.apache.catalina.Valve;
import org.springframework.aop.Advisor;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.boot.web.server.WebServerFactoryCustomizer;
import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;
import org.springframework.core.env.Environment;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.boot.web.servlet.MultipartConfigFactory;
import org.springframework.util.unit.DataSize;
import jakarta.servlet.MultipartConfigElement;
import org.springframework.web.servlet.FrameworkServlet;
import org.springframework.web.servlet.view.InternalResourceViewResolver;

@SpringBootApplication
@EnableAspectJAutoProxy(proxyTargetClass=true)
@EnableConfigurationProperties
public class StratroomWebApplication {
    public static void main(String[] args) {
        String configName = System.getProperty("service.name");
        System.setProperty("service.name", configName == null ? "stratroom-web" : configName);
        SpringApplication.run(StratroomWebApplication.class, (String[])args);
    }

    @Bean
    public CommonHttpClientInterceptor httpClientInterCeptor() {
        return new CommonHttpClientInterceptor();
    }

    @Bean
    public CommonRestTemplate getRestTemplate() {
        return new CommonRestTemplate(this.httpClientInterCeptor());
    }

    @Bean
    public ServletRegistrationBean<FrameworkServlet> dispatcherRegistration(WebApplicationContext applicationContext) {
        ServletRegistrationBean registration = new ServletRegistrationBean((Servlet)new SpringDispatcherServlet(applicationContext), new String[0]);
        registration.addUrlMappings(new String[]{"/"});
        return registration;
    }

    @Bean
    public JavaMailSender getJavaMailSender(EmailConfig emailConfig) {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost(emailConfig.getHost());
        mailSender.setPort(emailConfig.getPort());
        mailSender.setUsername(emailConfig.getUserName());
        mailSender.setPassword(emailConfig.getPassword());
        mailSender.setProtocol(emailConfig.getProtocol());
        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.transport.protocol", emailConfig.getProtocol());
        props.put("mail.smtp.auth", emailConfig.getAuth());
        props.put("mail.smtp.connectiontimeout", emailConfig.getConnectionTimeout());
        props.put("mail.smtp.timeout", emailConfig.getTimeout());
        props.put("mail.smtp.writetimeout", emailConfig.getWriteTimeout());
        props.put("mail.debug", "true");
        if (emailConfig.isStartSSLEnable()) {
            props.put("mail.smtp.socketFactory.port", emailConfig.getPort());
            props.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
        } else {
            props.put("mail.smtp.starttls.enable", emailConfig.getStartTlsEnable());
        }
        return mailSender;
    }

    @Bean
    public WebServerFactoryCustomizer<TomcatServletWebServerFactory> factoryCustomizer(EmbeddedValveCollection embeddedValveCollection) {
        return factory -> {
            if (factory instanceof TomcatServletWebServerFactory) {
                TomcatServletWebServerFactory serverFactory = factory;
                serverFactory.setContextValves((Collection)embeddedValveCollection.getValves());
            }
        };
    }

    @Bean
    public RestTemplate restTemplate(RestTemplateBuilder builder) {
        return builder.build();
    }

    @Bean
    public InternalResourceViewResolver viewResolver() {
        InternalResourceViewResolver internalResourceViewResolver = new InternalResourceViewResolver();
        internalResourceViewResolver.setPrefix("/view/");
        internalResourceViewResolver.setSuffix(".jsp");
        return internalResourceViewResolver;
    }

    @Bean
    public MultipartConfigElement multipartConfigElement() {
        MultipartConfigFactory factory = new MultipartConfigFactory();
        factory.setMaxFileSize(DataSize.ofBytes(500000000L));
        factory.setMaxRequestSize(DataSize.ofBytes(500000000L));
        return factory.createMultipartConfig();
    }

    @Bean(value={"privilegeAdvisor"})
    public Advisor getAdvisor(RoleService roleService) {
        PrivilegeInterceptor interceptor = new PrivilegeInterceptor(roleService);
        PrivilegeAdvisor advisor = new PrivilegeAdvisor(interceptor);
        return advisor;
    }

    @Bean
    public EmbeddedValveCollection embeddedValveCollection(LicenseService licenseService) {
        EmbeddedValveCollection embeddedValveCollection = new EmbeddedValveCollection();
        embeddedValveCollection.withValves(new Valve[]{new LicenseVerificationValve(licenseService)});
        return embeddedValveCollection;
    }

    @Bean
    public PropertySourcesPlaceholderConfigurer propertySourcesPlaceholderConfigurer(Environment environment) {
        String configDir = environment.getProperty("config.directory");
        String serviceName = environment.getProperty("service.name");
        PropertySourcesPlaceholderConfigurer propertySourcesPlaceholderConfigurer = new PropertySourcesPlaceholderConfigurer();
        serviceName = serviceName != null ? serviceName : "stratroom-web";
        FileSystemResource fileSystemResource = new FileSystemResource(String.format("%s/%s%s", configDir, serviceName, ".properties"));
        propertySourcesPlaceholderConfigurer.setLocations(new Resource[]{fileSystemResource});
        return propertySourcesPlaceholderConfigurer;
    }
}

