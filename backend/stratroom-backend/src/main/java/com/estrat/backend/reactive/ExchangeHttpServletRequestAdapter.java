package com.estrat.backend.reactive;

import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.web.server.ServerWebExchange;

/**
 * Minimal {@link jakarta.servlet.http.HttpServletRequest} facade over {@link ServerWebExchange}
 * so legacy controllers can keep their servlet signatures during the WebFlux migration.
 */
public class ExchangeHttpServletRequestAdapter extends MockHttpServletRequest {

    public ExchangeHttpServletRequestAdapter(ServerWebExchange exchange) {
        super(exchange.getRequest().getMethod().name(), exchange.getRequest().getURI().getRawPath());
        exchange.getRequest().getHeaders().forEach((name, values) -> {
            for (String value : values) {
                addHeader(name, value);
            }
        });
        exchange.getAttributes().forEach(this::setAttribute);
        if (exchange.getRequest().getURI().getRawQuery() != null) {
            setQueryString(exchange.getRequest().getURI().getRawQuery());
        }
    }
}
