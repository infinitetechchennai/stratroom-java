/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.DbServiceApplication
 *  com.estrat.service.db.config.DataBaseProperties
 *  com.estrat.service.db.config.EmailConfig
 *  javax.persistence.EntityManager
 *  javax.persistence.EntityManagerFactory
 *  org.hibernate.jpa.HibernatePersistenceProvider
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.boot.SpringApplication
 *  org.springframework.boot.autoconfigure.SpringBootApplication
 *  org.springframework.boot.web.client.RestTemplateBuilder
 *  org.springframework.context.annotation.Bean
 *  org.springframework.context.support.PropertySourcesPlaceholderConfigurer
 *  org.springframework.core.env.Environment
 *  org.springframework.core.io.FileSystemResource
 *  org.springframework.core.io.Resource
 *  org.springframework.mail.javamail.JavaMailSender
 *  org.springframework.mail.javamail.JavaMailSenderImpl
 *  org.springframework.orm.jpa.JpaTransactionManager
 *  org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean
 *  org.springframework.scheduling.annotation.EnableAsync
 *  org.springframework.scheduling.annotation.EnableScheduling
 *  org.springframework.transaction.PlatformTransactionManager
 *  org.springframework.transaction.annotation.EnableTransactionManagement
 *  org.springframework.web.client.RestTemplate
 */
package com.estrat.service.db;

import com.estrat.service.db.config.DataBaseProperties;
import com.estrat.service.db.config.EmailConfig;
import java.util.Properties;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import javax.sql.DataSource;
import org.hibernate.jpa.HibernatePersistenceProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;
import org.springframework.core.env.Environment;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
@EnableTransactionManagement
@EnableAsync
@EnableScheduling
public class DbServiceApplication {
    public static void main(String[] args) {
        String configName = System.getProperty("service.name");
        System.setProperty("service.name", configName == null ? "db-service" : configName);
        SpringApplication.run(DbServiceApplication.class, (String[])args);
    }

    @Bean(value={"entityManager"})
    @Autowired
    public EntityManager entityManager(EntityManagerFactory emf) {
        return emf.createEntityManager();
    }

    @Bean
    public LocalContainerEntityManagerFactoryBean entityManagerFactory(DataSource dataSource, DataBaseProperties dataBaseProperties) {
        LocalContainerEntityManagerFactoryBean containerEntityManagerFactoryBean = new LocalContainerEntityManagerFactoryBean();
        containerEntityManagerFactoryBean.setPersistenceProviderClass(HibernatePersistenceProvider.class);
        containerEntityManagerFactoryBean.setDataSource(dataSource);
        containerEntityManagerFactoryBean.setPackagesToScan(new String[]{"com.estrat.service.db.bean"});
        containerEntityManagerFactoryBean.setPersistenceUnitName("myJpaPersistenceUnit");
        containerEntityManagerFactoryBean.setJpaProperties(this.hibernateProperties(dataBaseProperties));
        return containerEntityManagerFactoryBean;
    }

    @Bean(name={"transactionManager"})
    public PlatformTransactionManager txManager(DataSource dataSource, DataBaseProperties dataBaseProperties) {
        JpaTransactionManager jpaTransactionManager = new JpaTransactionManager(this.entityManagerFactory(dataSource, dataBaseProperties).getObject());
        jpaTransactionManager.setRollbackOnCommitFailure(true);
        return jpaTransactionManager;
    }

    public Properties hibernateProperties(DataBaseProperties dataBaseProperties) {
        Properties properties = new Properties();
        properties.put("hibernate.dialect", dataBaseProperties.getHibernateDialect());
        properties.put("hibernate.show_sql", (Object)dataBaseProperties.isShowSql());
        properties.put("hibernate.format_sql", (Object)dataBaseProperties.isFormatSQL());
        properties.put("hibernate.naming-strategy", dataBaseProperties.getStrategy());
        return properties;
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
            props.put("mail.smtp.socketFactory.port", (Object)emailConfig.getPort());
            props.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
        } else {
            props.put("mail.smtp.starttls.enable", emailConfig.getStartTlsEnable());
        }
        return mailSender;
    }

    @Bean
    public PropertySourcesPlaceholderConfigurer propertySourcesPlaceholderConfigurer(Environment environment) {
        String configDir = environment.getProperty("config.directory");
        String serviceName = environment.getProperty("service.name");
        PropertySourcesPlaceholderConfigurer propertySourcesPlaceholderConfigurer = new PropertySourcesPlaceholderConfigurer();
        serviceName = serviceName != null ? serviceName : "db-service";
        FileSystemResource fileSystemResource = new FileSystemResource(String.format("%s/%s%s", configDir, serviceName, ".properties"));
        propertySourcesPlaceholderConfigurer.setLocations(new Resource[]{fileSystemResource});
        return propertySourcesPlaceholderConfigurer;
    }

    @Bean
    public RestTemplate restTemplate(RestTemplateBuilder builder) {
        return builder.build();
    }
}

