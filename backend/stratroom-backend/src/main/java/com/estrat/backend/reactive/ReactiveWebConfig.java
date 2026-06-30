package com.estrat.backend.reactive;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.config.EnableWebFlux;
import org.springframework.web.reactive.config.WebFluxConfigurer;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.result.method.annotation.ArgumentResolverConfigurer;

import org.springframework.http.codec.ServerCodecConfigurer;

@Configuration
@EnableWebFlux
public class ReactiveWebConfig implements WebFluxConfigurer {

    @Override
    public void configureHttpMessageCodecs(ServerCodecConfigurer configurer) {
        configurer.defaultCodecs().maxInMemorySize(100 * 1024 * 1024); // 100MB
    }

    @Override
    public void configureArgumentResolvers(ArgumentResolverConfigurer configurer) {
        configurer.addCustomResolver(new HttpServletRequestArgumentResolver());
        configurer.addCustomResolver(new MultipartFileArgumentResolver());
    }

    @Bean
    public WebClient webClient(WebClient.Builder builder) {
        return builder.build();
    }
}
