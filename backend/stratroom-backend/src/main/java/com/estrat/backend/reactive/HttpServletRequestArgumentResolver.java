package com.estrat.backend.reactive;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.core.MethodParameter;
import org.springframework.web.reactive.BindingContext;
import org.springframework.web.reactive.result.method.HandlerMethodArgumentResolver;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

public class HttpServletRequestArgumentResolver implements HandlerMethodArgumentResolver {

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return HttpServletRequest.class.isAssignableFrom(parameter.getParameterType());
    }

    @Override
    public Mono<Object> resolveArgument(
            MethodParameter parameter,
            BindingContext bindingContext,
            ServerWebExchange exchange) {
        return Mono.just(new ExchangeHttpServletRequestAdapter(exchange));
    }
}
