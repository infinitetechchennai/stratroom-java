package com.estrat.backend.reactive;

import io.r2dbc.spi.ConnectionFactory;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.r2dbc.connection.R2dbcTransactionManager;
import org.springframework.transaction.ReactiveTransactionManager;

/**
 * Reactive DB infrastructure scaffold. JPA remains primary until repositories migrate
 * (see REACTIVE_MIGRATION_PLAN.md). Bean is named explicitly so it does not clash with JPA
 * {@code transactionManager}.
 */
@Configuration
public class R2dbcConfig {

    @Bean(name = "reactiveTransactionManager")
    @ConditionalOnProperty(name = "spring.r2dbc.url")
    public ReactiveTransactionManager reactiveTransactionManager(ConnectionFactory connectionFactory) {
        return new R2dbcTransactionManager(connectionFactory);
    }
}
