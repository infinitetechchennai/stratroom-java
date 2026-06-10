package com.estrat.backend.db.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;

// Superseded by com.estrat.backend.config.OpenApiConfig in the merged application.
public class SpringFoxConfig {

    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("DB Service API")
                        .version("1.0"));
    }
}